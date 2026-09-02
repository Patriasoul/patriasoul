/* PatriaSoul — dynamic editorial layer for the portal homepage.
   Činjenice i arhivski zapisi dolaze iz kanonskih registara. */
(function(){
  'use strict';

  function byId(id){ return document.getElementById(id); }
  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c];});
  }

  function cityCount(){
    return Array.isArray(window.PATRIA_CITY_DATA) ? window.PATRIA_CITY_DATA.length : 0;
  }
  function monumentCount(){
    var data=window.PATRIA_SPOMENICI;
    if(Array.isArray(data)) return data.length;
    if(data && Array.isArray(data.items)) return data.items.length;
    return 0;
  }

  function renderStats(){
    var target=byId('portal-live-stats');
    if(!target) return;
    var cities=cityCount();
    var monuments=monumentCount();
    var questions=(window.PatriaQuiz && Array.isArray(window.PatriaQuiz.bank)) ? window.PatriaQuiz.bank.length : 0;
    target.innerHTML=[
      '<div class="portal-stat"><strong>'+esc(cities || 127)+'</strong><span>gradova u registru</span></div>',
      '<div class="portal-stat"><strong>'+esc(questions || 2000)+'+</strong><span>kviz pitanja</span></div>',
      '<div class="portal-stat"><strong>'+esc(monuments || '—')+'</strong><span>memorijalnih zapisa</span></div>',
      '<div class="portal-stat"><strong>1</strong><span>mjesto istine</span></div>'
    ].join('');
  }

  function renderTimeline(){
    var target=byId('portal-timeline');
    if(!target) return;
    if(window.PatriaSoulTragoviVremena && typeof window.PatriaSoulTragoviVremena.renderHome==='function'){
      window.PatriaSoulTragoviVremena.renderHome();
      return;
    }
  }

  function init(){
    renderStats();
    renderTimeline();
    document.documentElement.classList.add('portal-home-ready');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.PatriaPortalHome={renderStats:renderStats,renderTimeline:renderTimeline};
})();
