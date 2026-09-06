// PatriaSoul — global "Pitaj PatriaSoul" widget
(function () {
  'use strict';
  if (window.__PATRIA_ASK_WIDGET__) return;
  window.__PATRIA_ASK_WIDGET__ = true;

  const style = document.createElement('style');
  style.textContent = `
    .ps-ai-fab{position:fixed;right:20px;bottom:20px;z-index:1500;border:1px solid rgba(217,184,76,.45);border-radius:999px;background:linear-gradient(135deg,#d9b84c,#f0d777);color:#111;padding:13px 18px;font-weight:900;box-shadow:0 12px 35px rgba(0,0,0,.35);cursor:pointer}
    .ps-ai-panel{position:fixed;right:20px;bottom:78px;width:min(430px,calc(100vw - 28px));height:min(650px,calc(100vh - 110px));z-index:1501;display:none;flex-direction:column;overflow:hidden;border:1px solid rgba(217,184,76,.28);border-radius:20px;background:#0b0f15;color:#f4f6f8;box-shadow:0 25px 80px rgba(0,0,0,.5)}
    .ps-ai-panel.is-open{display:flex}.ps-ai-head{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid rgba(255,255,255,.09)}
    .ps-ai-title{font-weight:900}.ps-ai-sub{display:block;color:#929ba7;font-size:11px;font-weight:600;margin-top:2px}.ps-ai-close{background:none;border:0;color:#fff;font-size:20px;cursor:pointer}
    .ps-ai-actions{display:flex;gap:6px;overflow:auto;padding:9px 10px;border-bottom:1px solid rgba(255,255,255,.07)}.ps-ai-action{flex:0 0 auto;border:1px solid rgba(217,184,76,.22);background:#111720;color:#e9edf2;border-radius:10px;padding:7px 9px;font-size:11px;font-weight:800;cursor:pointer}.ps-ai-action:hover{border-color:rgba(217,184,76,.55)}
    .ps-ai-log{flex:1;overflow:auto;padding:16px;display:grid;align-content:start;gap:10px}.ps-ai-msg{max-width:90%;padding:11px 13px;border-radius:14px;line-height:1.5;font-size:14px;white-space:pre-wrap}.ps-ai-msg.bot{background:#151c25;border:1px solid rgba(255,255,255,.07)}.ps-ai-msg.user{justify-self:end;background:#d9b84c;color:#111}.ps-ai-form{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(255,255,255,.09)}.ps-ai-input{flex:1;min-width:0;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:#111720;color:#fff;padding:11px 12px;outline:none}.ps-ai-send{border:0;border-radius:12px;background:#d9b84c;color:#111;font-weight:900;padding:0 14px;cursor:pointer}.ps-ai-brand{text-align:center;padding:0 12px 10px;color:#77818d;font-size:10px}
    @media(max-width:560px){.ps-ai-fab{right:14px;bottom:14px}.ps-ai-panel{right:14px;bottom:68px}}
  `;
  document.head.appendChild(style);

  const fab = document.createElement('button');
  fab.className = 'ps-ai-fab'; fab.type = 'button'; fab.textContent = '🧠 Pitaj PatriaSoul';
  fab.setAttribute('aria-label','Otvori Pitaj PatriaSoul');
  const panel = document.createElement('section'); panel.className='ps-ai-panel'; panel.setAttribute('aria-label','Pitaj PatriaSoul');
  panel.innerHTML = `<div class="ps-ai-head"><div><div class="ps-ai-title">🧠 Pitaj PatriaSoul</div><span class="ps-ai-sub">AI vodič · istraživanje · stvaranje sadržaja</span></div><button class="ps-ai-close" type="button" aria-label="Zatvori">×</button></div><div class="ps-ai-actions"><button class="ps-ai-action" data-action="article">📰 Članak</button><button class="ps-ai-action" data-action="summary">📝 Sažetak</button><button class="ps-ai-action" data-action="social">📱 Objava</button><button class="ps-ai-action" data-action="seo">🔎 SEO</button></div><div class="ps-ai-log"></div><div class="ps-ai-brand">Powered by Puter.js · PatriaSoul AI · sadržaj je nacrt</div><form class="ps-ai-form"><input class="ps-ai-input" autocomplete="off" placeholder="Pitaj nešto…" aria-label="Pitanje"><button class="ps-ai-send" type="submit">➤</button></form>`;
  document.body.append(fab,panel);
  const log=panel.querySelector('.ps-ai-log'), input=panel.querySelector('.ps-ai-input');
  function add(text, cls){const el=document.createElement('div');el.className='ps-ai-msg '+cls;el.textContent=text;log.appendChild(el);log.scrollTop=log.scrollHeight;return el;}
  function getAgent(){return window.PatriaSoulAgent || null;}
  function getContent(){return window.PatriaSoulContent || null;}

  fab.addEventListener('click',()=>{panel.classList.toggle('is-open'); if(panel.classList.contains('is-open')) input.focus();});
  panel.querySelector('.ps-ai-close').addEventListener('click',()=>panel.classList.remove('is-open'));
  add('Pozdrav! 👋 Ja sam PatriaSoul AI. Mogu odgovarati na pitanja, pretražiti PatriaSoul bazu i izraditi nacrt članka, sažetka, objave ili SEO sadržaja. Tijekom aktivnog kviza ne otkrivam odgovore. 🇭🇷','bot');

  async function ensurePuterSignedIn(){
    if(!window.puter || !window.puter.ai || typeof window.puter.ai.chat !== 'function'){
      throw new Error('Puter.js nije učitan.');
    }
    if(window.puter.auth && typeof window.puter.auth.isSignedIn === 'function' && !window.puter.auth.isSignedIn()){
      if(typeof window.puter.auth.signIn !== 'function') throw new Error('Puter prijava nije dostupna.');
      add('Za korištenje PatriaSoul AI-ja potrebno je prijaviti se na Puter. Otvaram prijavu…','bot');
      await window.puter.auth.signIn({attempt_temp_user_creation:true});
    }
  }

  async function askQuestion(q){
    const wait=add('Razmišljam i provjeravam PatriaSoul bazu…','bot');
    try {
      // Sign-in is intentionally triggered directly by the user's Send click,
      // so the browser allows Puter's authentication popup.
      await ensurePuterSignedIn();
      const agent=getAgent();
      if (!agent) throw new Error('PatriaSoul Agent nije učitan.');
      const r=await agent.ask(q,{quizActive:document.body.dataset.quizActive==='true'});
      wait.textContent=r?.text||'Trenutno nemam dovoljno potvrđenih podataka za odgovor.';
    } catch(err){
      console.error('[PatriaSoul AI]',err);
      const code=err && (err.error || err.code);
      if(code==='popup_blocked') wait.textContent='Prijava je blokirana. Dopusti skočni prozor za PatriaSoul i pokušaj ponovno.';
      else if(code==='auth_window_closed') wait.textContent='Prijava je otkazana. Pokušaj ponovno kada budeš spreman.';
      else if(code==='Unauthorized') wait.textContent='Puter prijava je potrebna za korištenje ovog AI-ja.';
      else wait.textContent='PatriaSoul AI trenutno nije dostupan. Detalj: '+(err?.message || 'nepoznata greška');
    }
  }

  async function generate(type){
    const topic=window.prompt('Za koju temu želiš napraviti sadržaj?');
    if(!topic || !topic.trim()) return;
    add(`${type === 'article' ? '📰 Članak' : type === 'summary' ? '📝 Sažetak' : type === 'social' ? '📱 Objava' : '🔎 SEO'}: ${topic}`,'user');
    const wait=add('Izrađujem nacrt iz potvrđenih podataka…','bot');
    try {
      await ensurePuterSignedIn();
      const content=getContent();
      if(!content) throw new Error('PatriaSoul Content Generator nije učitan.');
      const result=await content.generate(type,topic);
      wait.textContent=result?.text||'Nije moguće izraditi sadržaj.';
    } catch(err){
      console.error('[PatriaSoul Content]',err);
      wait.textContent='Nije moguće izraditi sadržaj. '+(err?.message || 'Provjeri Puter prijavu.');
    }
  }

  panel.querySelectorAll('.ps-ai-action').forEach(btn=>btn.addEventListener('click',()=>generate(btn.dataset.action)));
  panel.querySelector('form').addEventListener('submit',async e=>{
    e.preventDefault(); const q=input.value.trim(); if(!q)return; input.value=''; add(q,'user'); await askQuestion(q);
  });
})();
