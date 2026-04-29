create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text null,
  plan text not null default 'free' check (plan in ('free', 'premium')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  slug text not null unique check (char_length(slug) between 4 and 32),
  target_url text not null,
  active boolean not null default true,
  ad_enabled boolean not null default false,
  click_count integer not null default 0 check (click_count >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz null
);

create table if not exists public.clicks (
  id uuid primary key default gen_random_uuid(),
  link_id uuid not null references public.links(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  referrer text null,
  country text null,
  device text null,
  ip_hash text null
);

create table if not exists public.usage_monthly (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  month date not null,
  links_created integer not null default 0 check (links_created >= 0),
  clicks_served integer not null default 0 check (clicks_served >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, month)
);

create index if not exists links_user_id_created_at_idx
  on public.links (user_id, created_at desc);

create index if not exists links_slug_active_idx
  on public.links (slug, active);

create index if not exists clicks_link_id_created_at_idx
  on public.clicks (link_id, created_at desc);

create index if not exists usage_monthly_user_id_month_idx
  on public.usage_monthly (user_id, month desc);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.increment_link_metrics(input_link_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid;
  current_month date := date_trunc('month', timezone('utc', now()))::date;
begin
  update public.links
  set click_count = click_count + 1
  where id = input_link_id
  returning user_id into current_user_id;

  if current_user_id is null then
    return;
  end if;

  insert into public.usage_monthly (user_id, month, links_created, clicks_served)
  values (current_user_id, current_month, 0, 1)
  on conflict (user_id, month)
  do update set clicks_served = public.usage_monthly.clicks_served + 1;
end;
$$;

comment on table public.profiles is 'Application profile data synchronized from auth.users.';
comment on table public.links is 'Short links created by authenticated users.';
comment on table public.clicks is 'Basic click analytics per shortened link.';
comment on table public.usage_monthly is 'Monthly counters for quotas and plan enforcement.';

-- RLS notes:
-- 1. Enable RLS on all public tables.
-- 2. profiles: allow users to select/update only their own row.
-- 3. links: allow authenticated users to CRUD only rows where user_id = auth.uid().
-- 4. clicks: usually deny direct client inserts/selects and write through server-side flows only.
-- 5. usage_monthly: allow users to read only their own counters; writes should stay server-side.
-- 6. Keep service-role access for redirect tracking and admin-only maintenance tasks.
