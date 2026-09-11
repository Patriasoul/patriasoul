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

  function ensureHomeNavigation(){
    var nav=document.querySelector('.ps-mainnav');
    if(!nav || nav.querySelector('.ps-nav-home')) return;
    var style=document.getElementById('ps-home-nav-style');
    if(!style){
      style=document.createElement('style');
      style.id='ps-home-nav-style';
      style.textContent='.ps-nav-home{position:relative!important;flex:0 0 auto!important}.ps-nav-home-link{display:inline-flex!important;align-items:center!important;gap:5px!important;min-height:48px!important;padding:9px 12px!important;border-radius:10px!important;background:rgba(224,189,85,.12)!important;color:#f5d879!important;text-decoration:none!important;font:800 14px/1.1 system-ui,sans-serif!important;white-space:nowrap!important}.ps-nav-home-link:hover{background:rgba(224,189,85,.20)!important;color:#fff!important}.ps-nav-home-link .ps-nav-parent-icon{font-size:15px!important}';
      document.head.appendChild(style);
    }
    var wrap=document.createElement('div');
    wrap.className='ps-nav-home is-active';
    var link=document.createElement('a');
    link.className='ps-nav-parent ps-nav-home-link';
    link.href='/index.html';
    link.innerHTML='<span class="ps-nav-parent-icon">⌂</span><span>Početna</span>';
    link.setAttribute('aria-current','page');
    wrap.appendChild(link);
    nav.insertBefore(wrap,nav.firstChild);
  }

  function watchHomeNavigation(){
    ensureHomeNavigation();
    var nav=document.querySelector('.ps-mainnav');
    if(!nav || nav.__patriaHomeObserver) return;
    var observer=new MutationObserver(function(){ ensureHomeNavigation(); });
    observer.observe(nav,{childList:true,subtree:false});
    nav.__patriaHomeObserver=observer;
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
    watchHomeNavigation();
    renderStats();
    renderTimeline();
    document.documentElement.classList.add('portal-home-ready');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.PatriaPortalHome={renderStats:renderStats,renderTimeline:renderTimeline};
})();
