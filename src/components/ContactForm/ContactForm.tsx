"use client";

import { useState, useEffect, useRef } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isMounted.current) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message, website: honeypot }),
      });
      // Handle responses that may not be valid JSON (500, empty body, etc.)
      const text = await res.text();
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = null;
      }

      if (res.ok && json && json.success) {
        if (isMounted.current) {
          setStatus("success");
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          setHoneypot("");
          setErrorMessage(null);
        }
      } else {
        // Prefer API-provided `message` or `error` fields when available.
        // Fallback to raw response text or HTTP status.
        const serverMsg = json && (json.message || json.error) ? (json.message || json.error) : null;
        const diag = serverMsg || text || `status:${res.status}`;
        // eslint-disable-next-line no-console
        console.error("Contact API error:", diag, { status: res.status, body: json || text });
        if (isMounted.current) {
          setStatus("error");
          setErrorMessage(serverMsg ? String(serverMsg) : (text ? String(text) : 'Unable to send message.'));
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      if (isMounted.current) {
        setStatus("error");
        setErrorMessage('Unable to send message.');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-describedby="contact-status">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* Honeypot field - hidden from users */}
        <input
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden={true}
          style={{ display: "none" }}
        />

        <label className="flex flex-col">
          <div className="text-sm font-medium">Full name <span className="text-rose-600">*</span></div>
          <input
            className="mt-1 block h-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </label>

        <label className="flex flex-col">
          <div className="text-sm font-medium">Email address <span className="text-rose-600">*</span></div>
          <input
            type="email"
            className="mt-1 block h-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </label>

        <label className="md:col-span-2 flex flex-col">
          <div className="text-sm font-medium">Subject <span className="text-gray-400 text-xs">(optional)</span></div>
          <input
            className="mt-1 block h-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            placeholder="How can we help?"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>

        <label className="md:col-span-2 flex flex-col">
          <div className="text-sm font-medium">Message <span className="text-rose-600">*</span></div>
          <textarea
            className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your enquiry..."
            required
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-amber-600 px-6 py-3 text-white hover:bg-amber-700 disabled:opacity-60"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </button>
        </div>

        <div id="contact-status" className="text-sm mt-2 md:col-span-2" aria-live="polite">
          {status === "loading" && <span>Sending — please wait.</span>}
          {status === "success" && <span className="text-green-700">Message sent. Thank you!</span>}
          {status === "error" && <span className="text-red-600">{errorMessage || 'There was an error sending your message.'}</span>}
        </div>
      </div>
    </form>
  );
}
