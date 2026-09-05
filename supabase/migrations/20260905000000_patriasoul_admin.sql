-- PatriaSoul Faza 4 — uredničke uloge i osnovni admin sloj
alter table public.profiles add column if not exists role text not null default 'user' check (role in ('user','editor','admin'));

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

grant execute on function public.is_admin() to authenticated;

create table if not exists public.editorial_audit (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  action text not null,
  target text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.editorial_audit enable row level security;
create policy if not exists editorial_audit_admin_read on public.editorial_audit for select using (public.is_admin());
create policy if not exists editorial_audit_admin_insert on public.editorial_audit for insert with check (public.is_admin() and auth.uid() = user_id);
create index if not exists editorial_audit_created on public.editorial_audit(created_at desc);
