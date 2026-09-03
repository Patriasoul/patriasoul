/* PatriaSoul — navigation UX compatibility layer */
(function () {
  'use strict';

  function injectStyles() {
    if (document.getElementById('ps-navigation-ux-css')) return;
    var s = document.createElement('style');
    s.id = 'ps-navigation-ux-css';
    s.textContent = `
      html,body{overflow-x:hidden!important;overflow-y:auto!important}
      .ps-header,.ps-nav,.ps-mainnav,.ps-mainnav *{pointer-events:auto}
      .ps-header{position:sticky!important;top:0!important;z-index:5000!important;width:100%!important}
      .ps-nav{width:100%!important;max-width:none!important;box-sizing:border-box!important;min-height:158px!important;display:flex!important;align-items:center!important;gap:8px!important;padding:8px 14px!important}
      .ps-brand{flex:0 0 148px!important;width:148px!important;height:148px!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important;z-index:2!important}
      .ps-nav-logo{width:148px!important;height:148px!important;max-width:none!important;object-fit:contain!important;display:block!important}
      .ps-mainnav{position:relative!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:0!important;flex:1 1 auto!important;min-width:0!important;white-space:nowrap!important}
      .ps-nav-home,.ps-nav-group{position:relative!important;flex:0 0 auto!important;min-width:0!important}
      .ps-nav-parent-row{display:flex!important;align-items:center!important;border-radius:7px!important}
      .ps-nav-parent{display:inline-flex!important;align-items:center!important;gap:2px!important;min-height:40px!important;padding:5px 3px!important;border-radius:7px!important;color:#eef2f5!important;text-decoration:none!important;font:750 11px/1.05 system-ui,sans-serif!important;white-space:nowrap!important;letter-spacing:-.15px!important}
      .ps-nav-home .ps-nav-parent{padding-inline:5px!important}
      .ps-nav-parent-icon{font-size:12px!important}
      .ps-nav-toggle{width:15px!important;height:40px!important;padding:0!important;border:0!important;border-radius:0 7px 7px 0!important;background:transparent!important;color:#f1d57b!important;cursor:pointer!important;font-size:12px!important}
      .ps-nav-parent-row:hover,.ps-nav-group.is-active>.ps-nav-parent-row,.ps-nav-home.is-active{background:rgba(224,189,85,.10)!important;border-radius:7px!important}
      .ps-nav-parent:hover{color:#f5d879!important}
      .ps-subnav{position:absolute!important;top:calc(100% - 1px)!important;left:0!important;z-index:5100!important;display:none!important;min-width:280px!important;max-width:min(560px,calc(100vw - 24px))!important;padding:10px!important;background:rgba(10,15,22,.99)!important;border:1px solid rgba(224,189,85,.22)!important;border-radius:0 12px 12px 12px!important;box-shadow:0 20px 55px rgba(0,0,0,.48)!important;pointer-events:auto!important}
      .ps-nav-group:hover>.ps-subnav,.ps-nav-group:focus-within>.ps-subnav,.ps-nav-group.is-expanded>.ps-subnav{display:block!important}
      .ps-nav-group::after{content:"";position:absolute;left:0;right:0;top:100%;height:14px;z-index:5099}
      .ps-simple-section{padding:2px!important}
      .ps-nav-item-row{display:flex!important;align-items:center!important;width:100%!important}
      .ps-sub-link{display:flex!important;align-items:center!important;flex:1 1 auto!important;min-height:36px!important;padding:7px 9px!important;border-radius:7px!important;color:#e9edf0!important;text-decoration:none!important;font:500 13px/1.25 system-ui,sans-serif!important;white-space:normal!important}
      .ps-sub-link:hover{background:rgba(224,189,85,.11)!important;color:#fff!important}
      .ps-sub-link[aria-current=page]{color:#f5d879!important;font-weight:800!important}
      .ps-nav-nested-toggle{width:34px!important;height:34px!important;flex:0 0 34px!important;border:0!important;background:transparent!important;color:#f1d57b!important;cursor:pointer!important;font-size:18px!important;line-height:1!important}
      .ps-nav-nested{display:none!important;margin-left:10px!important;padding:3px 0 3px 8px!important;border-left:1px solid rgba(224,189,85,.16)!important}
      .ps-nav-item.is-expanded>.ps-nav-nested,.ps-nav-nested.is-open{display:block!important}
      .ps-nav-nested .ps-nav-item-row{position:relative!important}
      .ps-nav-nested .ps-sub-link{min-height:34px!important;font-size:12px!important}
      .ps-menu{display:none!important}
      @media(max-width:1250px) and (min-width:861px){
        .ps-nav{gap:4px!important;padding-inline:8px!important}
        .ps-brand{flex-basis:132px!important;width:132px!important;height:132px!important}
        .ps-nav-logo{width:132px!important;height:132px!important}
        .ps-nav-parent{font-size:10px!important;padding-inline:2px!important;letter-spacing:-.25px!important}
        .ps-nav-parent-icon{font-size:11px!important}
        .ps-nav-toggle{width:13px!important;font-size:11px!important}
      }
      @media(max-width:1050px) and (min-width:861px){
        .ps-brand{flex-basis:116px!important;width:116px!important;height:116px!important}
        .ps-nav-logo{width:116px!important;height:116px!important}
        .ps-nav-parent{font-size:9px!important}
      }
      @media(max-width:860px){
        .ps-nav{min-height:76px!important;height:76px!important;padding:6px 12px!important}
        .ps-brand{flex-basis:72px!important;width:72px!important;height:72px!important}
        .ps-nav-logo{width:72px!important;height:72px!important}
        .ps-menu{display:block!important;width:46px!important;height:46px!important;margin-left:auto!important;border:1px solid rgba(224,189,85,.25)!important;border-radius:10px!important;background:rgba(224,189,85,.06)!important;padding:9px!important;cursor:pointer!important}
        .ps-menu span{display:block!important;height:2px!important;margin:5px 2px!important;background:#f1d57b!important}
        .ps-mainnav{position:absolute!important;left:10px!important;right:10px!important;top:100%!important;display:none!important;flex-direction:column!important;align-items:stretch!important;gap:3px!important;max-height:calc(100vh - 84px)!important;overflow-y:auto!important;padding:8px!important;background:rgba(8,13,20,.995)!important;border:1px solid rgba(224,189,85,.20)!important;border-radius:14px!important;box-shadow:0 18px 45px rgba(0,0,0,.5)!important;white-space:normal!important}
        .ps-mainnav.is-open{display:flex!important}
        .ps-nav-group,.ps-nav-parent-row,.ps-nav-home{width:100%!important}
        .ps-nav-parent{flex:1 1 auto!important;justify-content:flex-start!important;min-height:46px!important;padding:10px 12px!important;font-size:15px!important;letter-spacing:0!important}
        .ps-nav-toggle{width:46px!important;height:46px!important;font-size:15px!important}
        .ps-subnav{position:static!important;width:100%!important;max-width:none!important;min-width:0!important;padding:5px 4px 8px 12px!important;margin:0!important;background:rgba(0,0,0,.18)!important;border:0!important;border-radius:0!important;box-shadow:none!important}
        .ps-nav-group::after{display:none!important}
        .ps-sub-link{min-height:40px!important;font-size:14px!important}
        .ps-nav-nested{margin-left:8px!important}
        body.ps-mobile-nav-open{overflow:hidden!important}
        .ps-menu[aria-expanded=true] span:nth-child(1){transform:translateY(7px) rotate(45deg)!important}
        .ps-menu[aria-expanded=true] span:nth-child(2){opacity:0!important}
        .ps-menu[aria-expanded=true] span:nth-child(3){transform:translateY(-7px) rotate(-45deg)!important}
      }
    `;
    document.head.appendChild(s);
  }

  function ensureFallbackNavigation(){
    var nav=document.querySelector('.ps-mainnav');
    if(!nav||nav.children.length)return;
    [['Početna','/index.html'],['Domovina','/domovina.html'],['Branitelji','/branitelji.html'],['Povijest','/povijest.html'],['Baština','/bastina.html'],['Vjera','/vjera.html'],['Mediji','/video.html'],['Igra','/brani-svoj-grad.html'],['O nama','/o-nama.html'],['Kontakt','/kontakt.html']].forEach(function(i){var w=document.createElement('div');w.className='ps-nav-fallback-item';var a=document.createElement('a');a.href=i[1];a.textContent=i[0];a.className='ps-nav-parent';w.appendChild(a);nav.appendChild(w)});
  }

  function bindNestedMenus(){
    if(document.body.dataset.psNestedBound)return;
    document.body.dataset.psNestedBound='1';
    document.addEventListener('click',function(e){
      var b=e.target.closest('.ps-nav-nested-toggle');
      if(!b)return;
      e.preventDefault();
      e.stopPropagation();
      var item=b.closest('.ps-nav-item');
      if(!item)return;
      var nested=item.querySelector(':scope > .ps-nav-nested');
      if(!nested)return;
      var open=!item.classList.contains('is-expanded');
      item.classList.toggle('is-expanded',open);
      nested.classList.toggle('is-open',open);
      b.setAttribute('aria-expanded',String(open));
      b.textContent=open?'⌄':'›';
    },true);
  }

  function ensureFooter(){
    if(document.querySelector('.ps-footer'))return;
    if(!document.body)return;
    var f=document.createElement('footer');
    f.className='ps-footer';
    f.innerHTML=`
      <div class="ps-footer-container">
        <div class="ps-footer-hero">
          <div class="ps-footer-brand-block">
            <a class="ps-footer-logo" href="/index.html" aria-label="PatriaSoul početna">
              <img src="/images/file_0000000082ec81f4a6fc17bdbd959622_114540.png" alt="PatriaSoul" width="74" height="74">
              <span class="ps-footer-logo-text"><span>PATRIA</span><strong>SOUL</strong></span>
            </a>
            <p>Hrvatska. Povijest. Znanje. Identitet. Digitalno mjesto koje povezuje hrvatsku povijest, baštinu, vjeru, gradove, branitelje i sjećanje.</p>
            <div class="ps-footer-signature">Čuvamo ono što vrijedi zapamtiti.</div>
          </div>
          <div class="ps-footer-motto"><span class="ps-footer-motto-line"></span><p>„Jedan podatak. Jedno mjesto istine. Više kvalitetnih prikaza.”</p></div>
        </div>
        <div class="ps-footer-grid">
          <div><h4>Domovina</h4><nav class="ps-footer-links"><a href="/domovina.html">Hrvatska</a><a href="/gradovi.html">Gradovi</a><a href="/krajevi-i-geografija.html">Krajevi i geografija</a><a href="/regionalni-vodic.html">Regionalni vodič</a><a href="/vijesti.html">Vijesti</a><a href="/vrijeme.html">Vrijeme</a></nav></div>
          <div><h4>Branitelji</h4><nav class="ps-footer-links"><a href="/branitelji.html">Branitelji</a><a href="/domovinski-rat.html">Domovinski rat</a><a href="/postrojbe.html">Postrojbe</a><a href="/brigade.html">Brigade</a><a href="/operacije.html">Operacije i bojišta</a><a href="/vukovar.html">Vukovar</a><a href="/spomenici.html">Spomenici i memorijali</a></nav></div>
          <div><h4>Povijest i baština</h4><nav class="ps-footer-links"><a href="/povijest.html">Povijest</a><a href="/hrvatska-povijest.html">Hrvatska povijest</a><a href="/hrvatski-kraljevi.html">Hrvatski kraljevi</a><a href="/bastina.html">Baština</a><a href="/glagoljica.html">Glagoljica</a><a href="/gastronomija.html">Gastronomija</a><a href="/govori-i-dijalekti.html">Govori i dijalekti</a></nav></div>
          <div><h4>Vjera i zajednica</h4><nav class="ps-footer-links"><a href="/vjera.html">Vjera</a><a href="/evandelje.html">Evanđelje</a><a href="/molitve.html">Molitve</a><a href="/krunica.html">Krunica</a><a href="/blagdani.html">Blagdani</a><a href="/biblija.html">Biblija</a><a href="/svetac-dana.html">Svetac dana</a><a href="/quiz.html">Kviz</a><a href="/brani-svoj-grad.html">Brani svoj grad</a><a href="/rang-lista.html">Rang-lista</a></nav></div>
        </div>
        <div class="ps-footer-bottom"><div><strong>© 2026 PatriaSoul</strong><span>Hrvatska. Povijest. Znanje. Identitet.</span></div><div class="ps-footer-bottom-links"><a href="/o-nama.html">O nama</a> · <a href="/kontakt.html">Kontakt</a></div></div>
      </div>`;
    document.body.appendChild(f);
  }

  function init(){
    injectStyles();
    ensureFallbackNavigation();
    bindNestedMenus();
    ensureFooter();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  setTimeout(init,300);
  setTimeout(init,1000);
})();
