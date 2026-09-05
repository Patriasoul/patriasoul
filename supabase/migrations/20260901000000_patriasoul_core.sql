-- PatriaSoul Phase 3 hardening — safe to run after the original core migration.
create unique index if not exists quiz_results_user_nonce_unique on public.quiz_results(user_id,client_nonce) where client_nonce is not null;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='quiz_results_correct_le_answers') THEN
    ALTER TABLE public.quiz_results ADD CONSTRAINT quiz_results_correct_le_answers CHECK (correct <= answers);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='quiz_results_answers_le_questions') THEN
    ALTER TABLE public.quiz_results ADD CONSTRAINT quiz_results_answers_le_questions CHECK (answers <= question_count);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='quiz_results_duration_nonnegative') THEN
    ALTER TABLE public.quiz_results ADD CONSTRAINT quiz_results_duration_nonnegative CHECK (duration_ms IS NULL OR duration_ms >= 0);
  END IF;
END $$;

create or replace function public.protect_profile_stats() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if current_user <> 'postgres' and current_user <> 'supabase_admin' then
    if new.xp <> old.xp or new.points <> old.points or new.quizzes <> old.quizzes or new.correct <> old.correct or new.answers <> old.answers or new.streak <> old.streak or new.badges <> old.badges then
      raise exception 'Statistika profila mijenja se samo kroz PatriaSoul sigurni API.';
    end if;
  end if;
  new.updated_at=now();
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
language plpgsql security definer set search_path=public
as $$
declare
  v_user uuid := auth.uid();
  v_result public.quiz_results;
begin
  if v_user is null then raise exception 'Korisnik nije prijavljen.'; end if;
  if p_category is null or char_length(trim(p_category))=0 then raise exception 'Kategorija je obavezna.'; end if;
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
  update public.profiles set xp=xp+p_xp,points=points+p_score,quizzes=quizzes+1,correct=correct+p_correct,answers=answers+p_answers,updated_at=now() where id=v_user;
  return v_result;
end; $$;

grant execute on function public.record_quiz_result(text,text,integer,integer,integer,integer,text,integer,integer,uuid) to authenticated;

drop policy if exists results_insert_own on public.quiz_results;
drop policy if exists results_update_none on public.quiz_results;
drop policy if exists results_delete_none on public.quiz_results;
