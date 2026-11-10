create table if not exists public.posts (id text primary key,title text not null,excerpt text not null,content text not null,image_url text,category text,ad_code text, published boolean not null default false,created_at timestamptz not null default now());
alter table public.posts enable row level security;
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts" on public.posts for select using (published = true);
drop policy if exists "Admins can manage posts" on public.posts;
create policy "Admins can manage posts" on public.posts for all to authenticated using ((auth.jwt()->'app_metadata'->>'role') = 'admin') with check ((auth.jwt()->'app_metadata'->>'role') = 'admin');