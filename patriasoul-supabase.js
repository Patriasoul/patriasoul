// PatriaSoul — Supabase adapter. Ključevi se konfiguriraju runtimeom.
(function(global){'use strict';
  const cfg=global.PATRIA_SUPABASE_CONFIG||{}; let client=null;
  async function load(){
    if(client)return client;
    if(!cfg.url||!cfg.anonKey||!global.supabase?.createClient)return null;
    client=global.supabase.createClient(cfg.url,cfg.anonKey); return client;
  }
  async function signUp(email,password,nickname){
    const c=await load(); if(!c)throw Error('Supabase nije konfiguriran.');
    return c.auth.signUp({email,password,options:{data:{nickname}}});
  }
  async function signIn(email,password){
    const c=await load(); if(!c)throw Error('Supabase nije konfiguriran.');
    return c.auth.signInWithPassword({email,password});
  }
  async function signOut(){const c=await load();return c?c.auth.signOut():null;}
  async function session(){const c=await load();if(!c)return null;const r=await c.auth.getSession();return r.data.session;}
  async function submitResult(result){
    const c=await load(); const s=await session();
    if(!c||!s?.user)return {local:true};
    const r=result||{};
    return c.rpc('record_quiz_result',{
      p_category:String(r.category||'Mješoviti kviz'),
      p_period:String(r.period||'all'),
      p_score:Number(r.score||0),
      p_xp:Number(r.xp||0),
      p_correct:Number(r.correct||0),
      p_answers:Number(r.answers||0),
      p_city_slug:r.city_slug||null,
      p_question_count:Number(r.question_count||r.answers||0),
      p_duration_ms:r.duration_ms==null?null:Number(r.duration_ms),
      p_client_nonce:r.client_nonce||null
    });
  }
  async function leaderboard(period='all'){
    const c=await load();if(!c)return null;
    const table=period==='daily'?'leaderboard_daily':period==='weekly'?'leaderboard_weekly':period==='monthly'?'leaderboard_monthly':'leaderboard_all';
    return c.from(table).select('*').order('rank',{ascending:true}).limit(100);
  }
  global.PatriaSupabase={configure:x=>{Object.assign(cfg,x||{});client=null;},load,signUp,signIn,signOut,session,submitResult,leaderboard};
})(typeof window!=='undefined'?window:globalThis);
