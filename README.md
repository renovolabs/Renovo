# Renovo Labs — Launch Site

v1 launch + waitlist site. **Display and email capture only** — no cart, no
checkout, no accounts, no commerce backend.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (one hero entrance + restrained scroll reveals)
- Supabase for waitlist storage via a single serverless route
- Deploys to Vercel

## Local development

```bash
npm install
cp .env.example .env.local   # fill in Supabase values
npm run dev
```

Without Supabase env vars the site runs fine; the waitlist endpoint returns
a graceful 503 until configured.

## Waitlist storage

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor (single `waitlist` table:
   `email`, `product_interest`, `created_at`; unique on email; RLS enabled).
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (server-side only —
   never prefixed `NEXT_PUBLIC_`).

The API route (`src/app/api/waitlist/route.ts`) talks to Supabase's REST
endpoint directly, so any PostgREST-compatible DB works by swapping the env
vars.

## Deploying to Vercel

Import the repo, add the two env vars, deploy. No other configuration.

## Compliance guardrails (do not remove)

- Persistent research-use disclaimer bar in the fixed header.
- Full disclaimer block in the footer; jurisdiction-specific legal block is
  marked pending counsel.
- Waitlist submits are gated behind an age / research-use acknowledgment.
- Zero benefit, dosage, or therapeutic language anywhere — including
  metadata. Product cards are name + image only. Keep it that way.

## Placeholders pending brand assets

See `public/assets/README.md` — logo, palette, and product photography are
tasteful placeholders and clearly marked (`RENDER PENDING` tags on cards).
Brand copy (hero line, philosophy section) is provisional pending founder
review.
