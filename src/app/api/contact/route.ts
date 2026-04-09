import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/microsoft-graph";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
  // Honeypot — must be empty
  website: z.string().max(0, "Bot detected").optional(),
});

const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3;
const ipTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipTimestamps.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (recent.length >= RATE_LIMIT_MAX) {
    return true;
  }

  recent.push(now);
  ipTimestamps.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, company, message, website } = result.data;

    // Honeypot triggered — silently accept to not tip off bots
    if (website) {
      return NextResponse.json({ success: true });
    }

    const recipient = process.env.CONTACT_EMAIL_TO;
    if (!recipient) {
      console.error("CONTACT_EMAIL_TO is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const htmlBody = `
      <h2>New Demo Request from ChurroStack Landing</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr>
          <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">Name</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">Email</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">
            <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;">Company</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(company || "—")}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold;vertical-align:top;">Message</td>
          <td style="padding:8px 12px;white-space:pre-wrap;">${escapeHtml(message)}</td>
        </tr>
      </table>
      <hr style="margin-top:24px;border:none;border-top:1px solid #eee;" />
      <p style="font-size:12px;color:#999;">
        Sent from the ChurroStack landing page contact form.
        IP: ${escapeHtml(request.headers.get("x-forwarded-for") || "unknown")}
      </p>
    `;

    await sendEmail({
      to: recipient,
      subject: `[ChurroStack] Demo request from ${name}${company ? ` (${company})` : ""}`,
      htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
