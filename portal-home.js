/* PatriaSoul — dynamic editorial layer for the portal homepage.
   Činjenice i arhivski zapisi dolaze iz kanonskih registara. */
(function(){
  'use strict';

  function byId(id){ return document.getElementById(id); }
  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c];});
  }
  function cityCount(){ return Array.isArray(window.PATRIA_CITY_DATA) ? window.PATRIA_CITY_DATA.length : 0; }
  function monumentCount(){ var data=window.PATRIA_SPOMENICI; if(Array.isArray(data)) return data.length; if(data && Array.isArray(data.items)) return data.items.length; return 0; }
  function questionCount(){
    if(window.PatriaQuiz && typeof window.PatriaQuiz.bank === 'function'){
      try { return window.PatriaQuiz.bank().length; } catch(e) {}
    }
    return Array.isArray(window.PATRIA_QUESTIONS) ? window.PATRIA_QUESTIONS.length : 0;
  }

  function syncHomepageLabels(){
    var cityLinks=document.querySelectorAll('.home-card[href="/gradovi.html"] h3');
    var cities=cityCount();
    if(cities && cityLinks.length){ Array.prototype.forEach.call(cityLinks,function(el){ el.textContent=cities+' gradova'; }); }
    var heads=document.querySelectorAll('.home-section-head h2');
    Array.prototype.forEach.call(heads,function(el){
      if(el.textContent.trim()==='Četiri ulaza u hrvatsko sjećanje') el.textContent='Tragovi vremena';
    });
  }

  function renderStats(){
    var target=byId('portal-live-stats');
    if(!target) return;
    var cities=cityCount();
    var monuments=monumentCount();
    var questions=questionCount();
    target.innerHTML=[
      '<div class="portal-stat"><strong>'+esc(cities)+'</strong><span>gradova u registru</span></div>',
      '<div class="portal-stat"><strong>'+esc(questions)+'</strong><span>kviz pitanja</span></div>',
      '<div class="portal-stat"><strong>'+esc(monuments)+'</strong><span>memorijalnih zapisa</span></div>',
      '<div class="portal-stat"><strong>1</strong><span>mjesto istine</span></div>'
    ].join('');
  }
  function renderTimeline(){
    var target=byId('portal-timeline');
    if(!target) return;
    if(window.PatriaSoulTragoviVremena && typeof window.PatriaSoulTragoviVremena.renderHome==='function') window.PatriaSoulTragoviVremena.renderHome();
  }
  function init(){ syncHomepageLabels(); renderStats(); renderTimeline(); document.documentElement.classList.add('portal-home-ready'); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  window.PatriaPortalHome={renderStats:renderStats,renderTimeline:renderTimeline,syncHomepageLabels:syncHomepageLabels};
})();
