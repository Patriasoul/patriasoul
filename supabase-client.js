// PatriaSoul — Supabase browser client.
// ANON key je javni client ključ, ali se ne upisuje u repo dok projekt ne bude povezan.
(function(global){
  const config=global.PATRIA_SUPABASE_CONFIG||{};
  const url=config.url||'https://azerctpwfzdivydsxyex.supabase.co';
  const anonKey=config.anonKey||'';
  global.PatriaSupabase={url,anonKey,ready:Boolean(anonKey),client:null};
  if(!anonKey)return;
  const boot=()=>{if(global.supabase?.createClient)global.PatriaSupabase.client=global.supabase.createClient(url,anonKey)};
  if(global.supabase?.createClient)boot();else document.addEventListener('DOMContentLoaded',boot,{once:true});
})(window);
