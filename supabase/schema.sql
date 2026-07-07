-- Renovo Labs waitlist — single table, run once in the Supabase SQL editor.
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  product_interest text,
  created_at timestamptz not null default now()
);

-- Lock the table down: the site writes with the service-role key
-- (which bypasses RLS); nothing else may read or write.
alter table public.waitlist enable row level security;
