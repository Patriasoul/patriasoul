/* PatriaSoul — shared Vjera subpage renderer */
(function(){
  'use strict';
  const fallback={
    evandelje:{title:'Evanđelje',icon:'📖',intro:'Dnevna riječ Evanđelja i prostor za kratko razmatranje.',body:'Ovdje se prikazuje evanđeoski odlomak, kratko razmatranje, biblijski izvor i povezane teme.'},
    molitve:{title:'Molitve',icon:'🙏',intro:'Tradicionalne i prigodne molitve za svakodnevni život.',body:'Molitve će biti organizirane po prigodama kako bi ih bilo jednostavno pronaći, čitati i dijeliti.'},
    krunica:{title:'Krunica',icon:'📿',intro:'Vodič kroz molitvu svete krunice i njezina otajstva.',body:'Ovdje se okupljaju struktura molitve krunice, otajstva, redoslijed molitve i povezani marijanski sadržaji.'},
    blagdani:{title:'Blagdani',icon:'⛪',intro:'Liturgijski blagdani i važni dani katoličke godine.',body:'Blagdani se organiziraju prema crkvenoj godini, uz datum, značenje, običaje i izvore.'},
    biblija:{title:'Biblija',icon:'📚',intro:'Knjige Svetoga pisma, poznati odlomci i pomoć za čitanje Biblije.',body:'Biblijski sadržaj organizira se prema knjigama, zavjetima, temama i odabranim odlomcima.'}
  };
  async function init(){const key=document.body.dataset.vjeraPage;if(!key)return;let d=fallback[key];try{const m=await import('/vjera.js');const x=(m.VJERA_SEKCIJE||[]).find(s=>s.id===key);if(x)d={...d,...x};}catch(e){}const t=document.querySelector('[data-vjera-title]'),i=document.querySelector('[data-vjera-intro]'),b=document.querySelector('[data-vjera-body]');if(t)t.textContent=d.icon+' '+d.title;if(i)i.textContent=d.description||d.intro;if(b)b.textContent=d.body||d.description||d.intro;document.title=d.title+' — PatriaSoul';}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
