create table if not exists public.lead_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  role text not null,
  utm_source text null,
  utm_medium text null,
  utm_campaign text null,
  utm_term text null,
  utm_content text null,
  page_url text null,
  created_at timestamptz not null default now()
);

alter table public.lead_submissions enable row level security;
