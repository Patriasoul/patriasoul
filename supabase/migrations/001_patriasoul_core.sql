create extension if not exists pgcrypto;

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  nickname text not null unique,
  city text not null,
  xp bigint not null default 0 check (xp >= 0),
  points bigint not null default 0 check (points >= 0),
  quizzes integer not null default 0 check (quizzes >= 0),
  correct integer not null default 0 check (correct >= 0),
  streak integer not null default 0 check (streak >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  city text not null,
  quiz_type text not null default 'brani-svoj-grad',
  score integer not null default 0 check (score >= 0),
  correct integer not null default 0 check (correct >= 0),
  total_questions integer not null default 10 check (total_questions > 0),
  challenge_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  seed bigint not null,
  challenger_player_id uuid references public.players(id) on delete set null,
  challenger_nickname text not null,
  challenger_city text not null,
  opponent_city text not null,
  status text not null default 'open' check (status in ('open','completed','expired')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '7 days')
);

create table if not exists public.challenge_results (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  nickname text not null,
  city text not null,
  score integer not null default 0 check (score >= 0),
  correct integer not null default 0 check (correct >= 0),
  created_at timestamptz not null default now(),
  unique (challenge_id, player_id)
);

create table if not exists public.city_scores (
  city text primary key,
  total_points bigint not null default 0 check (total_points >= 0),
  wins integer not null default 0 check (wins >= 0),
  losses integer not null default 0 check (losses >= 0),
  draws integer not null default 0 check (draws >= 0),
  players_count integer not null default 0 check (players_count >= 0),
  updated_at timestamptz not null default now()
);

create index if not exists quiz_results_player_idx on public.quiz_results(player_id);
create index if not exists quiz_results_city_idx on public.quiz_results(city);
create index if not exists quiz_results_created_idx on public.quiz_results(created_at desc);
create index if not exists challenge_results_challenge_idx on public.challenge_results(challenge_id);
create index if not exists city_scores_points_idx on public.city_scores(total_points desc);

alter table public.players enable row level security;
alter table public.quiz_results enable row level security;
alter table public.challenges enable row level security;
alter table public.challenge_results enable row level security;
alter table public.city_scores enable row level security;

-- Public game mode: no account login is required yet. Only the minimum
-- operations needed by the GitHub Pages client are exposed.
drop policy if exists players_public_read on public.players;
create policy players_public_read on public.players for select using (true);

drop policy if exists players_public_insert on public.players;
create policy players_public_insert on public.players for insert with check (char_length(nickname) between 3 and 20 and char_length(city) > 0);

drop policy if exists players_public_update on public.players;
create policy players_public_update on public.players for update using (true) with check (char_length(nickname) between 3 and 20 and char_length(city) > 0);

drop policy if exists results_public_read on public.quiz_results;
create policy results_public_read on public.quiz_results for select using (true);

drop policy if exists results_public_insert on public.quiz_results;
create policy results_public_insert on public.quiz_results for insert with check (score >= 0 and correct >= 0 and total_questions > 0);

drop policy if exists challenges_public_read on public.challenges;
create policy challenges_public_read on public.challenges for select using (true);

drop policy if exists challenges_public_insert on public.challenges;
create policy challenges_public_insert on public.challenges for insert with check (char_length(code) > 0 and char_length(challenger_nickname) between 3 and 20);

drop policy if exists challenges_public_update on public.challenges;
create policy challenges_public_update on public.challenges for update using (true) with check (status in ('open','completed','expired'));

drop policy if exists challenge_results_public_read on public.challenge_results;
create policy challenge_results_public_read on public.challenge_results for select using (true);

drop policy if exists challenge_results_public_insert on public.challenge_results;
create policy challenge_results_public_insert on public.challenge_results for insert with check (score >= 0 and correct >= 0);

drop policy if exists city_scores_public_read on public.city_scores;
create policy city_scores_public_read on public.city_scores for select using (true);

drop policy if exists city_scores_public_insert on public.city_scores;
create policy city_scores_public_insert on public.city_scores for insert with check (total_points >= 0);

drop policy if exists city_scores_public_update on public.city_scores;
create policy city_scores_public_update on public.city_scores for update using (true) with check (total_points >= 0);
