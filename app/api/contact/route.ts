import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const clean = (value: unknown, maxLength: number) => String(value ?? "").trim().slice(0, maxLength);
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = clean(body.fullName, 100);
    const email = clean(body.email, 160);
    const phone = clean(body.phone, 50);
    const location = clean(body.location, 120);
    const goal = clean(body.goal, 160);
    const message = clean(body.message, 2000);

    if (!fullName || !email || !phone || !location || !goal || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const user = process.env.HOSTINGER_SMTP_USER;
    const password = process.env.HOSTINGER_SMTP_PASSWORD;
    const recipient = process.env.CONTACT_TO_EMAIL;
    if (!user || !password || !recipient) {
      return NextResponse.json({ error: "Email delivery is not configured yet." }, { status: 503 });
    }

    const port = Number(process.env.HOSTINGER_SMTP_PORT ?? "465");
    const transporter = nodemailer.createTransport({
      host: process.env.HOSTINGER_SMTP_HOST ?? "smtp.hostinger.com",
      port,
      secure: port === 465,
      auth: { user, pass: password },
    });

    await transporter.sendMail({
      from: `Andrea Marie Shenocca Website <${user}>`,
      to: recipient,
      replyTo: email,
      subject: `New consultation request from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nGoal: ${goal}\n\nMessage:\n${message || "No additional message."}`,
      html: `<h2>New consultation request</h2><p><strong>Name:</strong> ${escapeHtml(fullName)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone)}</p><p><strong>Location:</strong> ${escapeHtml(location)}</p><p><strong>Goal:</strong> ${escapeHtml(goal)}</p><p><strong>Message:</strong><br>${escapeHtml(message || "No additional message.").replace(/\n/g, "<br>")}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The request could not be sent. Please try again." }, { status: 500 });
  }
}
