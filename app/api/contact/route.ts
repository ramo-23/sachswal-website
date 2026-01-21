import { NextResponse } from "next/server";
import crypto from "crypto";

// In-memory stores (best-effort; serverless instances are ephemeral)
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT = 6; // max submissions per window per IP

// Use globalThis to preserve across module reloads in dev
if (!globalThis.__contact_rate__) {
  // Map<ip, {count, firstTs}>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  globalThis.__contact_rate__ = new Map();
}
if (!globalThis.__contact_cache__) {
  // Set<string> of recent payload hashes for idempotency
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  globalThis.__contact_cache__ = new Map();
}

const rateMap: Map<string, { count: number; firstTs: number }> = // eslint-disable-line no-underscore-dangle
  // @ts-ignore
  globalThis.__contact_rate__;
const recentCache: Map<string, number> = // eslint-disable-line no-underscore-dangle
  // @ts-ignore
  globalThis.__contact_cache__;

function hashPayload(payload: unknown) {
  try {
    const s = JSON.stringify(payload);
    return crypto.createHash("sha256").update(s).digest("hex");
  } catch {
    return null;
  }
}

function cleanCache() {
  const now = Date.now();
  for (const [k, ts] of recentCache.entries()) {
    if (now - ts > RATE_WINDOW_MS) recentCache.delete(k);
  }
  for (const [ip, rec] of rateMap.entries()) {
    if (now - rec.firstTs > RATE_WINDOW_MS) rateMap.delete(ip);
  }
}

export async function POST(req: Request) {
  try {
    cleanCache();

    const ip = (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown").split(",")[0].trim();

    // Rate limiting (silent): increment and check
    const entry = rateMap.get(ip);
    const now = Date.now();
    if (!entry) {
      rateMap.set(ip, { count: 1, firstTs: now });
    } else {
      if (now - entry.firstTs > RATE_WINDOW_MS) {
        rateMap.set(ip, { count: 1, firstTs: now });
      } else {
        entry.count += 1;
        if (entry.count > RATE_LIMIT) {
          // Silent rate limit: return generic success to avoid feedback
          return NextResponse.json({ success: true });
        }
      }
    }

    const data = await req.json();

    // Expect fields: name, email, message, optional subject, honeypot: phone
    const { name, email, message, subject, phone } = data as Record<string, unknown>;

    // Honeypot: fail closed
    if (phone) return NextResponse.json({ success: false }, { status: 400 });

    // Basic presence checks
    if (!name || !email || !message) return NextResponse.json({ success: false }, { status: 400 });

    // Validate types
    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string")
      return NextResponse.json({ success: false }, { status: 400 });

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const trimmedSubject = typeof subject === "string" ? subject.trim() : undefined;

    if (trimmedName.length < 2 || trimmedName.length > 100) return NextResponse.json({ success: false }, { status: 400 });
    if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) return NextResponse.json({ success: false }, { status: 400 });
    if (trimmedSubject && trimmedSubject.length > 200) return NextResponse.json({ success: false }, { status: 400 });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) return NextResponse.json({ success: false }, { status: 400 });

    // Idempotency: check recent identical payloads
    const digest = hashPayload({ name: trimmedName, email: trimmedEmail, message: trimmedMessage, subject: trimmedSubject });
    if (!digest) return NextResponse.json({ success: false }, { status: 400 });
    if (recentCache.has(digest)) {
      // Already processed recently — return success
      return NextResponse.json({ success: true });
    }

    // Prepare envelope
    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject || "Contact form submission",
      message: trimmedMessage,
      receivedAt: new Date().toISOString(),
      source: "website-contact",
    };

    // Forward to configured endpoint or email provider
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    const sendgridKey = process.env.SENDGRID_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL; // required if using sendgrid

    if (sendgridKey && toEmail) {
      // Send email via SendGrid API (no external deps)
      const sgBody = {
        personalizations: [
          { to: [{ email: toEmail }], subject: payload.subject },
        ],
        from: { email: process.env.CONTACT_FROM_EMAIL || "no-reply@localhost" },
        content: [
          { type: "text/plain", value: `${payload.message}\n\nFrom: ${payload.name} <${payload.email}>` },
        ],
      };

      const resp = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sendgridKey}`,
        },
        body: JSON.stringify(sgBody),
      });

      if (!resp.ok) {
        // Fail closed
        return NextResponse.json({ success: false }, { status: 502 });
      }
    } else if (webhook) {
      const resp = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) return NextResponse.json({ success: false }, { status: 502 });
    } else {
      // No provider configured — fail closed in production.
      // In development we still accept but don't persist/send.
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ success: false }, { status: 500 });
      }
      // Development: mark digest so form UX behaves normally without sending
    }

    // Mark processed digest for idempotency
    recentCache.set(digest, Date.now());

    return NextResponse.json({ success: true });
  } catch (err) {
    // Do not log user data. Only log the error object/message.
    // eslint-disable-next-line no-console
    console.error((err as Error).message || "contact handler error");
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
