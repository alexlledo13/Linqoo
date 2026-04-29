alter table public.profiles
add column if not exists full_name text null;

comment on column public.profiles.full_name is 'Display name collected during sign up.';

