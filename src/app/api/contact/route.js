import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 8_192;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestCounts = new Map();

function json(body, status = 200, headers = {}) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function cleanText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getClientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const current = requestCounts.get(ip);
  if (!current || current.resetAt <= now) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  current.count += 1;
  if (requestCounts.size > 1_000) {
    for (const [key, value] of requestCounts) {
      if (value.resetAt <= now) requestCounts.delete(key);
    }
  }
  return current.count > RATE_LIMIT_MAX;
}

function hasAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (allowedOrigin) return origin === new URL(allowedOrigin).origin;
  return origin === new URL(request.url).origin;
}

function validatePayload(payload) {
  const data = {
    name: cleanText(payload?.name, 80),
    email: cleanText(payload?.email, 120).toLowerCase(),
    message: cleanText(payload?.message, 3000),
    website: cleanText(payload?.website, 200),
  };
  if (data.website) return { bot: true };
  if (!data.name || !EMAIL_PATTERN.test(data.email) || data.message.length < 10) {
    return { error: "Name, valid email, and message are required." };
  }
  return { data };
}

async function sendEmail({ name, email, message }, config) {
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  return fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({
      from: `Portfolio Contact <${config.senderEmail}>`,
      to: [config.receiverEmail],
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827"><h2>New portfolio contact</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${safeMessage}</p></div>`,
    }),
  });
}

export async function POST(request) {
  if (!hasAllowedOrigin(request)) return json({ error: "Origin not allowed." }, 403);
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return json({ error: "Request too large." }, 413);
  if (isRateLimited(getClientIp(request))) {
    return json({ error: "Too many requests. Try again later." }, 429, { "Retry-After": "600" });
  }

  const config = {
    resendApiKey: process.env.RESEND_API_KEY,
    senderEmail: process.env.SENDER_EMAIL,
    receiverEmail: process.env.CONTACT_RECEIVER_EMAIL || process.env.SENDER_EMAIL,
  };
  if (!config.resendApiKey || !config.senderEmail || !config.receiverEmail) {
    return json({ error: "Email service is not configured." }, 500);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const result = validatePayload(payload);
  if (result.bot) return json({ ok: true });
  if (result.error) return json({ error: result.error }, 400);

  try {
    const response = await sendEmail(result.data, config);
    if (!response.ok) return json({ error: "Email delivery failed." }, 502);
    return json({ ok: true });
  } catch {
    return json({ error: "Email service unavailable." }, 503);
  }
}
