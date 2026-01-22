"use server";

import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

// Rate limiting windows (server-side, in-memory best-effort)
const SHORT_WINDOW_MS = 15 * 1000; // 15 seconds
const SHORT_LIMIT = 1; // 1 submission per short window per IP
const LONG_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const LONG_LIMIT = 20; // higher hourly cap

// Preserve maps across reloads when possible
if (!globalThis.__contact_rate__) globalThis.__contact_rate__ = new Map();
if (!globalThis.__contact_cache__) globalThis.__contact_cache__ = new Map();

type RateBucket = { count: number; firstTs: number };
type RateRecord = { short: RateBucket; long: RateBucket };

const rateMap: Map<string, RateRecord> = globalThis.__contact_rate__;
const recentCache: Map<string, number> = globalThis.__contact_cache__;

function hashPayload(payload: unknown) {
  try {
    const s = JSON.stringify(payload);
    return crypto.createHash("sha256").update(s).digest("hex");
  } catch {
    return null;
  }
}

function cleanMaps() {
  const now = Date.now();
  for (const [k, ts] of recentCache.entries()) if (now - ts > LONG_WINDOW_MS) recentCache.delete(k);
  for (const [ip, rec] of rateMap.entries()) {
    if (now - rec.long.firstTs > LONG_WINDOW_MS && now - rec.short.firstTs > LONG_WINDOW_MS) rateMap.delete(ip);
  }
}

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string; // honeypot - must be empty
}

function genericValidationError() {
  return NextResponse.json({ success: false, message: "Invalid submission." }, { status: 400 });
}

// Returns a validation error with a clear message in dev, and a generic one in production.
function validationError(reason: string) {
  // Log server-side for operators (may include non-sensitive context)
  // eslint-disable-next-line no-console
  console.warn('Contact validation failed:', reason);

  if (process.env.NODE_ENV === 'production') {
    return genericValidationError();
  }

  return NextResponse.json({ success: false, message: reason }, { status: 400 });
}

function genericServerError() {
  return NextResponse.json({ success: false, message: "An error occurred. Please try again later." }, { status: 500 });
}

export async function POST(req: Request) {
  try {
    cleanMaps();

    const ip = (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown").split(",")[0].trim();

    const now = Date.now();
    let rec = rateMap.get(ip) as RateRecord | undefined;
    if (!rec) {
      rec = { short: { count: 1, firstTs: now }, long: { count: 1, firstTs: now } };
      rateMap.set(ip, rec);
    } else {
      if (now - rec.short.firstTs > SHORT_WINDOW_MS) rec.short = { count: 1, firstTs: now };
      else rec.short.count += 1;

      if (now - rec.long.firstTs > LONG_WINDOW_MS) rec.long = { count: 1, firstTs: now };
      else rec.long.count += 1;

      if (rec.short.count > SHORT_LIMIT || rec.long.count > LONG_LIMIT) {
        return NextResponse.json({ success: false, message: "Please try again later." }, { status: 429 });
      }
    }

    const data = await req.json().catch(() => null);
    if (!data || typeof data !== "object") return validationError('Malformed JSON body');

    const { name, email, subject, message, website } = data as Partial<ContactPayload>;

    // Honeypot: must be empty
    if (website) return validationError('Honeypot field filled');

    // Required fields
    if (!name || !email || !message) return validationError('Missing required field');
    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") return validationError('Invalid field types');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const trimmedSubject = typeof subject === "string" ? subject.trim() : undefined;

    if (trimmedName.length < 2 || trimmedName.length > 200) return validationError('Name must be between 2 and 200 characters');
    if (trimmedMessage.length < 10 || trimmedMessage.length > 10000) return validationError('Message must be between 10 and 10000 characters');
    if (trimmedSubject && trimmedSubject.length > 300) return validationError('Subject too long');

    // Email validation (reasonable, not overly permissive)
    const emailRegex = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-.]+$/;
    if (!emailRegex.test(trimmedEmail)) return validationError('Invalid email address');

    // Idempotency: prevent duplicate inserts
    const digest = hashPayload({ name: trimmedName, email: trimmedEmail, message: trimmedMessage, subject: trimmedSubject });
    if (!digest) return genericValidationError();
    if (recentCache.has(digest)) return NextResponse.json({ success: true, message: "Thank you for your message!" });

    // Insert into Supabase using service role key (server-only)
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      // Missing server config — fail safely
      // eslint-disable-next-line no-console
      console.error("Supabase config missing");
      return genericServerError();
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    const insertPayload = { name: trimmedName, email: trimmedEmail, subject: trimmedSubject || null, message: trimmedMessage };

    const { data: sbData, error: sbError } = await supabase.from("contacts").insert(insertPayload).select("id, created_at").single();
    if (sbError) {
      // Log for operators, but return generic message
      // eslint-disable-next-line no-console
      console.error("Supabase insert error:", sbError.message);
      return genericServerError();
    }

    // Mark digest after successful DB write
    recentCache.set(digest, Date.now());

    // Send notification email via SMTP (NodeMailer) if SMTP config + recipient present
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || `no-reply@${new URL(SUPABASE_URL).hostname}`;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = process.env.SMTP_SECURE === "true" || (smtpPort === 465);

    // Only attempt SMTP send when recipient + SMTP host/port and credentials are present
    if (toEmail && smtpHost && smtpPort && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // Build dynamic replyTo using the user's name/email
        const replyToEmail = trimmedEmail;
        const replyToName = trimmedName;

        const mailSubject = `${trimmedName}${trimmedSubject ? ` — ${trimmedSubject}` : ""}`;
        const textBody = `${trimmedMessage}\n\nFrom: ${trimmedName} <${trimmedEmail}>`;

        // eslint-disable-next-line no-console
        console.log("Attempting to send email:", {
          from: fromEmail,
          to: toEmail,
          replyTo: `${replyToName} <${replyToEmail}>`,
          subject: mailSubject,
        });

        const htmlBody = `
          <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5; max-width: 600px; margin: 0 auto; padding: 16px;">
            <div style="background-color: #f97316; padding: 12px 16px; border-radius: 8px; color: #fff; text-align: center; font-size: 18px; font-weight: bold;">
              SaCHSWAL Contact Form
            </div>

            <div style="background-color: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-top: 16px;">
              <p style="margin-bottom: 8px;"><strong>Name:</strong> ${trimmedName}</p>
              <p style="margin-bottom: 8px;"><strong>Email:</strong> <a href="mailto:${trimmedEmail}" style="color: #f97316;">${trimmedEmail}</a></p>
              ${trimmedSubject ? `<p style="margin-bottom: 8px;"><strong>Subject:</strong> ${trimmedSubject}</p>` : ""}
              <p style="margin-bottom: 8px;"><strong>Message:</strong></p>
              <div style="border-left: 4px solid #f97316; padding-left: 8px; margin-bottom: 16px; white-space: pre-line;">
                ${trimmedMessage}
              </div>
              <p style="margin-bottom: 0;"><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 16px;">
              This message was sent from the SaCHSWAL website.
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: fromEmail, // must match Gmail SMTP user
          to: toEmail,
          replyTo: `${replyToName} <${replyToEmail}>`,
          subject: mailSubject,
          text: textBody,
          html: htmlBody,
        });

        // eslint-disable-next-line no-console
        console.log("Email sent successfully!");
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Email send error:", (e as Error).message || e);
      }
    }

    return NextResponse.json({ success: true, message: "Thank you for your message!" });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("contact handler error:", (err as Error).message || err);
    return genericServerError();
  }
}
