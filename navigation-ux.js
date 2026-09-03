/* PatriaSoul — navigation UX compatibility layer */
(function () {
  'use strict';
  function injectStyles() {
    if (document.getElementById('ps-navigation-ux-css')) return;
    var s=document.createElement('style'); s.id='ps-navigation-ux-css';
    s.textContent=`
      html,body{overflow-x:hidden!important;overflow-y:auto!important}
      .ps-header,.ps-nav,.ps-mainnav,.ps-mainnav *{pointer-events:auto}
      .ps-header{position:sticky!important;z-index:5000!important}
      .ps-nav{width:100%!important;max-width:none!important;box-sizing:border-box!important}
      .ps-mainnav{position:relative!important;flex:1 1 auto!important;min-width:0!important;justify-content:flex-start!important;gap:2px!important}
      .ps-nav-group{position:relative!important;isolation:isolate!important;flex:0 0 auto!important}
      .ps-nav-parent{white-space:nowrap!important;cursor:pointer!important;text-decoration:none!important}
      .ps-nav-toggle,.ps-nav-nested-toggle{cursor:pointer!important}
      @media (min-width:861px){
        .ps-nav-group::after{content:"";position:absolute;left:0;right:0;top:100%;height:16px;z-index:5099}
        .ps-mainnav .ps-subnav{display:none!important;position:absolute!important;top:calc(100% - 1px)!important;left:0!important;right:auto!important;z-index:5100!important;pointer-events:auto!important}
        .ps-nav-group.is-expanded>.ps-subnav,.ps-nav-group:hover>.ps-subnav,.ps-nav-group:focus-within>.ps-subnav{display:block!important}
        .ps-subnav{min-width:280px!important;max-width:min(520px,calc(100vw - 30px))!important}
        .ps-sub-link{white-space:normal!important;word-break:normal!important}
      }
      @media (max-width:1100px) and (min-width:861px){
        .ps-nav{padding-inline:12px!important;gap:8px!important}
        .ps-mainnav{gap:0!important}
        .ps-nav-parent{font-size:12px!important;padding-inline:5px!important}
        .ps-nav-toggle{width:24px!important}
      }
      @media (max-width:860px){
        .ps-nav{min-height:72px!important;padding:8px 14px!important}
        .ps-mainnav.is-open{display:flex!important;flex-direction:column!important;align-items:stretch!important;position:absolute!important;left:10px!important;right:10px!important;top:100%!important;z-index:5100!important;max-height:calc(100vh - 84px)!important;overflow-y:auto!important;pointer-events:auto!important}
        .ps-nav-group{width:100%!important}
        .ps-nav-parent-row{width:100%!important}
        .ps-nav-parent{flex:1 1 auto!important;white-space:normal!important}
        .ps-nav-group>.ps-subnav{display:none!important;position:static!important;min-width:0!important;width:100%!important}
        .ps-nav-group.is-expanded>.ps-subnav{display:block!important}
        .ps-nav-group:hover>.ps-subnav{display:none!important}
        .ps-nav-group.is-expanded:hover>.ps-subnav{display:block!important}
      }
    `;
    document.head.appendChild(s);
  }
  function ensureFallbackNavigation(){
    var nav=document.querySelector('.ps-mainnav'); if(!nav||nav.children.length)return;
    [['Početna','/index.html'],['Domovina','/domovina.html'],['Branitelji','/branitelji.html'],['Povijest','/povijest.html'],['Baština','/bastina.html'],['Vjera','/vjera.html'],['Mediji','/video.html'],['Igra','/brani-svoj-grad.html'],['O nama','/o-nama.html'],['Kontakt','/kontakt.html']].forEach(function(i){var w=document.createElement('div');w.className='ps-nav-fallback-item';var a=document.createElement('a');a.href=i[1];a.textContent=i[0];a.className='ps-nav-parent';w.appendChild(a);nav.appendChild(w)});
  }
  function init(){injectStyles();ensureFallbackNavigation();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  setTimeout(init,300);setTimeout(init,1000);
})();
