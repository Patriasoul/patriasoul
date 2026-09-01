/* PatriaSoul — dynamic editorial layer for the portal homepage.
   Reads canonical registries instead of duplicating their data. */
(function(){
  'use strict';

  function byId(id){ return document.getElementById(id); }
  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
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
    var events=[
      ['25. 8. 1991.','Vukovar','Početak intenzivnih borbi za Vukovar.','/vukovar.html'],
      ['18. 11. 1991.','Vukovar','Dan sjećanja na žrtvu Vukovara i Škabrnje.','/vukovar.html'],
      ['20. 11. 1991.','Ovčara','Mjesto stradanja ranjenika, civila i branitelja odvedenih iz vukovarske bolnice.','/vukovar.html'],
      ['15. 1. 1998.','Mirna reintegracija','Završetak procesa mirne reintegracije hrvatskog Podunavlja.','/vukovar.html']
    ];
    target.innerHTML=events.map(function(e){
      return '<a class="portal-timeline-item" href="'+e[3]+'"><span class="portal-timeline-date">'+esc(e[0])+'</span><span><b>'+esc(e[1])+'</b><strong>'+esc(e[2])+'</strong></span><i>→</i></a>';
    }).join('');
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
