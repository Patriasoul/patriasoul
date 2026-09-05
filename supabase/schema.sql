-- PatriaSoul Phase 3 — production schema
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null check (char_length(nickname) between 3 and 40),
  avatar_url text,
  xp bigint not null default 0 check (xp >= 0),
  points bigint not null default 0 check (points >= 0),
  quizzes integer not null default 0 check (quizzes >= 0),
  correct integer not null default 0 check (correct >= 0),
  answers integer not null default 0 check (answers >= 0),
  streak integer not null default 0 check (streak >= 0),
  selected_city_slug text,
  badges jsonb not null default '[]'::jsonb,
  favorites jsonb not null default '[]'::jsonb,
  categories jsonb not null default '{}'::jsonb,
  cities jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  category text not null,
  period text not null default 'all' check (period in ('daily','weekly','monthly','all','city')),
  score integer not null default 0 check (score >= 0),
  xp integer not null default 0 check (xp >= 0),
  correct integer not null default 0 check (correct >= 0),
  answers integer not null default 0 check (answers >= 0),
  city_slug text,
  question_count integer not null default 0 check (question_count >= 0),
  duration_ms integer check (duration_ms is null or duration_ms >= 0),
  client_nonce uuid,
  created_at timestamptz not null default now(),
  check (correct <= answers),
  check (answers <= question_count)
);

create table if not exists public.favorite_questions (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create unique index if not exists quiz_results_user_nonce_unique on public.quiz_results(user_id,client_nonce) where client_nonce is not null;
create index if not exists quiz_results_user_created on public.quiz_results(user_id, created_at desc);
create index if not exists quiz_results_period_created on public.quiz_results(period, created_at desc);
create index if not exists quiz_results_city_created on public.quiz_results(city_slug, created_at desc);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles(id,nickname) values (new.id, coalesce(nullif(new.raw_user_meta_data->>'nickname',''),'Igrač')) on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.protect_profile_stats() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if current_user <> 'postgres' and current_user <> 'supabase_admin' then
    if new.xp <> old.xp or new.points <> old.points or new.quizzes <> old.quizzes or new.correct <> old.correct or new.answers <> old.answers or new.streak <> old.streak or new.badges <> old.badges then
      raise exception 'Statistika profila mijenja se samo kroz PatriaSoul sigurni API.';
    end if;
  end if;
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists protect_profile_stats on public.profiles;
create trigger protect_profile_stats before update on public.profiles for each row execute procedure public.protect_profile_stats();

create or replace function public.record_quiz_result(
  p_category text,
  p_period text,
  p_score integer,
  p_xp integer,
  p_correct integer,
  p_answers integer,
  p_city_slug text default null,
  p_question_count integer default 0,
  p_duration_ms integer default null,
  p_client_nonce uuid default null
) returns public.quiz_results
language plpgsql security definer set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_result public.quiz_results;
begin
  if v_user is null then raise exception 'Korisnik nije prijavljen.'; end if;
  if p_category is null or char_length(trim(p_category)) = 0 then raise exception 'Kategorija je obavezna.'; end if;
  if p_period not in ('daily','weekly','monthly','all','city') then raise exception 'Neispravan period.'; end if;
  if p_score < 0 or p_xp < 0 or p_correct < 0 or p_answers < 0 or p_question_count < 0 then raise exception 'Neispravne vrijednosti rezultata.'; end if;
  if p_correct > p_answers or p_answers > p_question_count then raise exception 'Neispravan broj odgovora.'; end if;
  if p_duration_ms is not null and p_duration_ms < 0 then raise exception 'Neispravno trajanje kviza.'; end if;

  if p_client_nonce is not null then
    select * into v_result from public.quiz_results where user_id=v_user and client_nonce=p_client_nonce limit 1;
    if found then return v_result; end if;
  end if;

  insert into public.quiz_results(user_id,category,period,score,xp,correct,answers,city_slug,question_count,duration_ms,client_nonce)
  values(v_user,trim(p_category),p_period,p_score,p_xp,p_correct,p_answers,nullif(trim(coalesce(p_city_slug,'')),''),p_question_count,p_duration_ms,p_client_nonce)
  returning * into v_result;

  update public.profiles
  set xp=xp+p_xp, points=points+p_score, quizzes=quizzes+1, correct=correct+p_correct, answers=answers+p_answers, updated_at=now()
  where id=v_user;

  return v_result;
end; $$;

grant execute on function public.record_quiz_result(text,text,integer,integer,integer,integer,text,integer,integer,uuid) to authenticated;

alter table public.profiles enable row level security;
alter table public.quiz_results enable row level security;
alter table public.favorite_questions enable row level security;

drop policy if exists profiles_select_public on public.profiles;
create policy profiles_select_public on public.profiles for select using (true);
drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles for insert with check (auth.uid() = id);
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists results_select_public on public.quiz_results;
create policy results_select_public on public.quiz_results for select using (true);
drop policy if exists results_insert_own on public.quiz_results;
drop policy if exists results_update_none on public.quiz_results;
drop policy if exists results_delete_none on public.quiz_results;

create policy favorites_select_own on public.favorite_questions for select using (auth.uid() = user_id);
create policy favorites_insert_own on public.favorite_questions for insert with check (auth.uid() = user_id);
create policy favorites_delete_own on public.favorite_questions for delete using (auth.uid() = user_id);

create or replace view public.leaderboard_all as
select p.id,p.nickname,p.xp,p.points,p.quizzes,p.correct,row_number() over(order by p.xp desc,p.points desc,p.id) as rank
from public.profiles p;

create or replace view public.leaderboard_daily as
select p.id,p.nickname,sum(r.score)::bigint as points,sum(r.xp)::bigint as xp,count(r.id)::bigint as quizzes,sum(r.correct)::bigint as correct,
row_number() over(order by sum(r.score) desc,sum(r.xp) desc,p.id) as rank
from public.profiles p join public.quiz_results r on r.user_id=p.id
where r.created_at >= date_trunc('day',now()) group by p.id,p.nickname;

create or replace view public.leaderboard_weekly as
select p.id,p.nickname,sum(r.score)::bigint as points,sum(r.xp)::bigint as xp,count(r.id)::bigint as quizzes,sum(r.correct)::bigint as correct,
row_number() over(order by sum(r.score) desc,sum(r.xp) desc,p.id) as rank
from public.profiles p join public.quiz_results r on r.user_id=p.id
where r.created_at >= date_trunc('week',now()) group by p.id,p.nickname;

create or replace view public.leaderboard_monthly as
select p.id,p.nickname,sum(r.score)::bigint as points,sum(r.xp)::bigint as xp,count(r.id)::bigint as quizzes,sum(r.correct)::bigint as correct,
row_number() over(order by sum(r.score) desc,sum(r.xp) desc,p.id) as rank
from public.profiles p join public.quiz_results r on r.user_id=p.id
where r.created_at >= date_trunc('month',now()) group by p.id,p.nickname;
