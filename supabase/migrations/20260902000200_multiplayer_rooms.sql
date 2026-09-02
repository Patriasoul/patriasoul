-- PatriaSoul — realtime multiplayer rooms for Duel / Brani svoj grad.
create table if not exists public.game_rooms (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  host_id uuid not null references auth.users(id) on delete cascade,
  mode text not null default 'duel' check (mode in ('duel','city')),
  city_slug text,
  status text not null default 'waiting' check (status in ('waiting','active','finished')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create table if not exists public.game_room_players (
  room_id uuid not null references public.game_rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  score integer not null default 0,
  ready boolean not null default false,
  joined_at timestamptz not null default now(),
  primary key(room_id,user_id)
);
alter table public.game_rooms enable row level security;
alter table public.game_room_players enable row level security;
create policy game_rooms_read on public.game_rooms for select using (true);
create policy game_rooms_create on public.game_rooms for insert with check (auth.uid()=host_id);
create policy game_rooms_update_host on public.game_rooms for update using (auth.uid()=host_id) with check (auth.uid()=host_id);
create policy game_rooms_delete_host on public.game_rooms for delete using (auth.uid()=host_id);
create policy game_players_read on public.game_room_players for select using (true);
create policy game_players_self_insert on public.game_room_players for insert with check (auth.uid()=user_id);
create policy game_players_self_update on public.game_room_players for update using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy game_players_self_delete on public.game_room_players for delete using (auth.uid()=user_id);
revoke all on public.game_rooms, public.game_room_players from anon;
grant select,insert,update,delete on public.game_rooms to authenticated;
grant select,insert,update,delete on public.game_room_players to authenticated;
-- Realtime publication is enabled by Supabase when this migration is applied in a project
-- configured for realtime. The tables are intentionally kept small and JSON payloads versioned.
