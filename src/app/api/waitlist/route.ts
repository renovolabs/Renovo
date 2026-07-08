import { NextResponse } from "next/server";
import { PRODUCT_SLUGS } from "@/lib/products";

/**
 * POST /api/waitlist — the only backend surface on this site.
 *
 * Stores { email, product_interest, created_at } in a Supabase table via
 * the PostgREST endpoint (no client SDK needed server-side; the DB is
 * env-configurable through SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).
 * Duplicate emails are merged so re-submitting reads as success.
 */

// Pragmatic email shape check — the real gate is the confirmation email
// flow that will follow post-launch.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface WaitlistPayload {
  email?: unknown;
  product_interest?: unknown;
}

export async function POST(request: Request) {
  let payload: WaitlistPayload;
  try {
    payload = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // product_interest is optional but must be one of the known catalog slugs.
  let productInterest: string | null = null;
  if (typeof payload.product_interest === "string" && payload.product_interest !== "") {
    if (!PRODUCT_SLUGS.includes(payload.product_interest)) {
      return NextResponse.json({ error: "Unknown product selection." }, { status: 400 });
    }
    productInterest = payload.product_interest;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Fail loudly in dev, gracefully in prod — nothing user-hostile.
    console.error("[waitlist] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured.");
    return NextResponse.json(
      { error: "The waitlist is momentarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      // Merge on the unique email column: re-joining is idempotent.
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({ email, product_interest: productInterest }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error(`[waitlist] Supabase insert failed (${response.status}): ${detail}`);
    return NextResponse.json(
      { error: "We couldn't save your spot. Please try again." },
      { status: 502 },
    );
  }

  // Best-effort owner notification — a failed email must never fail a signup.
  await notifyOwner(email, productInterest);

  return NextResponse.json({ ok: true }, { status: 201 });
}

/**
 * Emails the site owner about a new signup via Resend.
 * No-ops unless RESEND_API_KEY is configured. Duplicate re-submissions
 * of the same address will notify again — harmless at launch volume.
 */
async function notifyOwner(email: string, productInterest: string | null) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  // Sandbox sender works out of the box; switch to a renovolabs.eu sender
  // once the domain is verified in Resend.
  const from = process.env.WAITLIST_NOTIFY_FROM ?? "Renovo Labs <onboarding@resend.dev>";
  const to = process.env.WAITLIST_NOTIFY_TO ?? "info@renovolabs.eu";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Waitlist signup: ${email}`,
        text: [
          "New Renovo Labs waitlist signup",
          "",
          `Email:    ${email}`,
          `Interest: ${productInterest ?? "General interest"}`,
          `Time:     ${new Date().toISOString()}`,
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      console.error(`[waitlist] Notification email failed (${res.status}): ${await res.text().catch(() => "")}`);
    }
  } catch (error) {
    console.error("[waitlist] Notification email failed:", error);
  }
}
