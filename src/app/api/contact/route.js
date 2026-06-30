import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function POST(request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || senderEmail;

  if (!resendApiKey || !senderEmail || !receiverEmail) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = cleanText(payload.name, 80);
  const email = cleanText(payload.email, 120).toLowerCase();
  const message = cleanText(payload.message, 3000);
  const website = cleanText(payload.website, 200);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !EMAIL_PATTERN.test(email) || message.length < 10) {
    return NextResponse.json(
      { error: "Name, valid email, and message are required." },
      { status: 400 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const resendResponse = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Portfolio Contact <${senderEmail}>`,
      to: [receiverEmail],
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2>New portfolio contact</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    }),
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { error: "Email delivery failed." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
