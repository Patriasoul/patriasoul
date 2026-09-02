-- PatriaSoul — produkcijska jezgra korisnika, rezultata, znački i gradskih bodova.
-- Sigurnost: korisnički identitet dolazi iz Supabase Auth (auth.uid()).

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null default 'PatriaSoul igrač',
  avatar_url text,
  xp bigint not null default 0 check (xp >= 0),
  points bigint not null default 0 check (points >= 0),
  quizzes integer not null default 0 check (quizzes >= 0),
  correct integer not null default 0 check (correct >= 0),
  answers integer not null default 0 check (answers >= 0),
  streak integer not null default 0 check (streak >= 0),
  last_played date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null default 'mijesano',
  period text not null default 'all' check (period in ('daily','weekly','monthly','all')),
  points integer not null default 0 check (points >= 0 and points <= 100000),
  xp integer not null default 0 check (xp >= 0 and xp <= 100000),
  correct integer not null default 0 check (correct >= 0),
  answers integer not null default 0 check (answers >= 0),
  city text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.favorite_questions (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create table if not exists public.city_scores (
  user_id uuid not null references auth.users(id) on delete cascade,
  city_slug text not null,
  points bigint not null default 0 check (points >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, city_slug)
);

create table if not exists public.user_badges (
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_id text not null,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

create index if not exists quiz_results_period_created_idx on public.quiz_results(period, created_at desc);
create index if not exists quiz_results_user_created_idx on public.quiz_results(user_id, created_at desc);
create index if not exists quiz_results_city_idx on public.quiz_results(city, created_at desc);

alter table public.profiles enable row level security;
alter table public.quiz_results enable row level security;
alter table public.favorite_questions enable row level security;
alter table public.city_scores enable row level security;
alter table public.user_badges enable row level security;

drop policy if exists profiles_select_public on public.profiles;
create policy profiles_select_public on public.profiles for select using (true);
drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self on public.profiles for insert with check (auth.uid() = id);
drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists quiz_results_select_public on public.quiz_results;
create policy quiz_results_select_public on public.quiz_results for select using (true);
drop policy if exists quiz_results_insert_self on public.quiz_results;
create policy quiz_results_insert_self on public.quiz_results for insert with check (auth.uid() = user_id);
drop policy if exists quiz_results_update_none on public.quiz_results;
create policy quiz_results_update_none on public.quiz_results for update using (false);
drop policy if exists quiz_results_delete_self on public.quiz_results;
create policy quiz_results_delete_self on public.quiz_results for delete using (auth.uid() = user_id);

create policy favorite_questions_self on public.favorite_questions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy city_scores_select_public on public.city_scores for select using (true);
create policy city_scores_self on public.city_scores for insert with check (auth.uid() = user_id);
create policy city_scores_update_self on public.city_scores for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy city_scores_delete_self on public.city_scores for delete using (auth.uid() = user_id);
create policy user_badges_select_public on public.user_badges for select using (true);
create policy user_badges_self on public.user_badges for insert with check (auth.uid() = user_id);
create policy user_badges_delete_self on public.user_badges for delete using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles(id, username)
  values (new.id, coalesce(nullif(trim(new.raw_user_meta_data->>'name'), ''), 'PatriaSoul igrač'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace view public.leaderboard_all as
select p.id, p.username, p.avatar_url, p.xp, p.points, p.quizzes, p.correct,
       row_number() over(order by p.points desc, p.xp desc, p.correct desc, p.id) as rank
from public.profiles p;

create or replace view public.leaderboard_period as
select r.user_id, p.username, p.avatar_url, r.period,
       sum(r.points)::bigint as points,
       sum(r.xp)::bigint as xp,
       count(*)::integer as quizzes,
       sum(r.correct)::integer as correct,
       row_number() over(partition by r.period order by sum(r.points) desc, sum(r.xp) desc, sum(r.correct) desc, r.user_id) as rank
from public.quiz_results r
join public.profiles p on p.id = r.user_id
group by r.user_id, p.username, p.avatar_url, r.period;

revoke all on table public.profiles from anon;
grant select on table public.profiles to anon, authenticated;
grant insert, update on table public.profiles to authenticated;
grant select on table public.quiz_results to anon, authenticated;
grant insert on table public.quiz_results to authenticated;
grant select, insert, update, delete on table public.favorite_questions to authenticated;
grant select, insert, update, delete on table public.city_scores to authenticated;
grant select, insert, delete on table public.user_badges to authenticated;
grant select on public.leaderboard_all, public.leaderboard_period to anon, authenticated;
