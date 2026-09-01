// PatriaSoul — global "Pitaj PatriaSoul" widget
(function () {
  'use strict';
  if (window.__PATRIA_ASK_WIDGET__) return;
  window.__PATRIA_ASK_WIDGET__ = true;

  const style = document.createElement('style');
  style.textContent = `
    .ps-ai-fab{position:fixed;right:20px;bottom:20px;z-index:1500;border:1px solid rgba(217,184,76,.45);border-radius:999px;background:linear-gradient(135deg,#d9b84c,#f0d777);color:#111;padding:13px 18px;font-weight:900;box-shadow:0 12px 35px rgba(0,0,0,.35);cursor:pointer}
    .ps-ai-panel{position:fixed;right:20px;bottom:78px;width:min(390px,calc(100vw - 28px));height:min(570px,calc(100vh - 110px));z-index:1501;display:none;flex-direction:column;overflow:hidden;border:1px solid rgba(217,184,76,.28);border-radius:20px;background:#0b0f15;color:#f4f6f8;box-shadow:0 25px 80px rgba(0,0,0,.5)}
    .ps-ai-panel.is-open{display:flex}.ps-ai-head{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid rgba(255,255,255,.09)}
    .ps-ai-title{font-weight:900}.ps-ai-sub{display:block;color:#929ba7;font-size:11px;font-weight:600;margin-top:2px}.ps-ai-close{background:none;border:0;color:#fff;font-size:20px;cursor:pointer}
    .ps-ai-log{flex:1;overflow:auto;padding:16px;display:grid;align-content:start;gap:10px}.ps-ai-msg{max-width:88%;padding:11px 13px;border-radius:14px;line-height:1.5;font-size:14px;white-space:pre-wrap}.ps-ai-msg.bot{background:#151c25;border:1px solid rgba(255,255,255,.07)}.ps-ai-msg.user{justify-self:end;background:#d9b84c;color:#111}.ps-ai-form{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(255,255,255,.09)}.ps-ai-input{flex:1;min-width:0;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:#111720;color:#fff;padding:11px 12px;outline:none}.ps-ai-send{border:0;border-radius:12px;background:#d9b84c;color:#111;font-weight:900;padding:0 14px;cursor:pointer}.ps-ai-brand{text-align:center;padding:0 12px 10px;color:#77818d;font-size:10px}
    @media(max-width:560px){.ps-ai-fab{right:14px;bottom:14px}.ps-ai-panel{right:14px;bottom:68px}}
  `;
  document.head.appendChild(style);

  const fab = document.createElement('button');
  fab.className = 'ps-ai-fab'; fab.type = 'button'; fab.textContent = '🧠 Pitaj PatriaSoul';
  fab.setAttribute('aria-label','Otvori Pitaj PatriaSoul');
  const panel = document.createElement('section'); panel.className='ps-ai-panel'; panel.setAttribute('aria-label','Pitaj PatriaSoul');
  panel.innerHTML = `<div class="ps-ai-head"><div><div class="ps-ai-title">🧠 Pitaj PatriaSoul</div><span class="ps-ai-sub">Tvoj vodič kroz sadržaj PatriaSoula</span></div><button class="ps-ai-close" type="button" aria-label="Zatvori">×</button></div><div class="ps-ai-log"></div><div class="ps-ai-brand">Powered by Puter.js · PatriaSoul AI</div><form class="ps-ai-form"><input class="ps-ai-input" autocomplete="off" placeholder="Pitaj nešto…" aria-label="Pitanje"><button class="ps-ai-send" type="submit">➤</button></form>`;
  document.body.append(fab,panel);
  const log=panel.querySelector('.ps-ai-log'), input=panel.querySelector('.ps-ai-input');
  function add(text, cls){const el=document.createElement('div');el.className='ps-ai-msg '+cls;el.textContent=text;log.appendChild(el);log.scrollTop=log.scrollHeight;}
  fab.addEventListener('click',()=>{panel.classList.toggle('is-open'); if(panel.classList.contains('is-open')) input.focus();});
  panel.querySelector('.ps-ai-close').addEventListener('click',()=>panel.classList.remove('is-open'));
  add('Pozdrav! 👋 Ja sam PatriaSoul AI. Pitaj me o sadržaju portala. Tijekom aktivnog kviza ne otkrivam odgovore. 🇭🇷','bot');
  panel.querySelector('form').addEventListener('submit',async e=>{
    e.preventDefault(); const q=input.value.trim(); if(!q)return; input.value=''; add(q,'user');
    const wait=document.createElement('div');wait.className='ps-ai-msg bot';wait.textContent='Razmišljam…';log.appendChild(wait);
    try { const r=window.PatriaSoulAI&&await window.PatriaSoulAI.ask(q,{quizActive:document.body.dataset.quizActive==='true'}); wait.textContent=r?.text||'Trenutno ne mogu odgovoriti.'; }
    catch(err){ wait.textContent='Pitaj PatriaSoul trenutno nije dostupan. Pokušaj ponovno.'; console.error(err); }
    log.scrollTop=log.scrollHeight;
  });
})();
