/* PatriaSoul — canonical, accessible, mobile-first portal navigation */
(function(){
'use strict';

var groups=[
 {label:'Početna',href:'/index.html'},
 {label:'Domovina',href:'/domovina.html',sections:[
  {title:'Hrvatska',items:[['🇭🇷 Hrvatska','/domovina.html'],['🏙️ Gradovi','/gradovi.html'],['🗺️ Krajevi i geografija','/krajevi-i-geografija.html']]},
  {title:'Hrvatska danas',items:[['📰 Vijesti','/vijesti.html'],['🌤️ Vrijeme','/vrijeme.html']]}
 ]},
 {label:'Branitelji',href:'/branitelji.html',sections:[
  {title:'Domovinski rat',items:[['🛡️ Branitelji','/branitelji.html'],['⚔️ Domovinski rat','/domovinski-rat.html'],['🗺️ Vukovar','/vukovar.html']]},
  {title:'Postrojbe i operacije',items:[['🏛️ Postrojbe','/postrojbe.html'],['🪖 Brigade','/brigade.html'],['⚔️ Operacije i bojišta','/operacije.html']]},
  {title:'Sjećanje',items:[['🕯️ Spomenici i memorijali','/spomenici.html']]}
 ]},
 {label:'Povijest',href:'/povijest.html',sections:[
  {title:'Razdoblja i vladari',items:[['🏰 Hrvatska povijest','/hrvatska-povijest.html'],['👑 Hrvatski kraljevi','/hrvatski-kraljevi.html'],['⚜️ Knezovi i vladari','/knezovi-i-vladari.html'],['📜 Srednji vijek','/srednji-vijek.html']]},
  {title:'Kasnija povijest',items:[['🏛️ Habsburško razdoblje','/habsbursko-razdoblje.html'],['🇭🇷 Hrvatski narodni preporod','/hrvatski-narodni-preporod.html'],['📖 20. stoljeće','/20-stoljece.html'],['👤 Povijesne osobe','/povijesne-osobe.html']]}
 ]},
 {label:'Baština',href:'/bastina.html',sections:[
  {title:'Kulturna baština',items:[['🏛️ Baština','/bastina.html'],['⛪ Sakralna baština','/sakralna-bastina.html'],['🪶 Glagoljica','/glagoljica.html'],['🎭 Tradicija i običaji','/tradicija-i-obicaji.html']]},
  {title:'Živa baština',items:[['👗 Narodne nošnje','/narodne-nosnje.html'],['🍲 Gastronomija','/gastronomija.html'],['🎵 Glazba','/glazba.html'],['🗣️ Govori i dijalekti','/govori-i-dijalekti.html']]}
 ]},
 {label:'Vjera',href:'/vjera.html',children:[['✝️ Vjera i duhovna baština','/vjera.html'],['📖 Evanđelje','/evandelje.html'],['🙏 Molitve','/molitve.html'],['📿 Krunica','/krunica.html'],['⛪ Blagdani','/blagdani.html'],['📚 Biblija','/biblija.html'],['🕯️ Svetac dana','/svetac-dana.html']]},
 {label:'Igra',href:'/brani-svoj-grad.html',sections:[
  {title:'Igre',items:[['🛡️ Brani svoj grad','/brani-svoj-grad.html'],['🧠 Kviz','/quiz.html'],['⚔️ Duel','/duel.html']]},
  {title:'Rezultati i profil',items:[['🏆 Rang-lista','/rang-lista.html'],['👤 Profil','/profil.html']]}
 ]},
 {label:'Više',href:'/o-nama.html',children:[['🎬 Video','/video.html'],['📷 Galerija','/galerija.html'],['👥 O nama','/o-nama.html'],['✉️ Kontakt','/kontakt.html']]}
];

function current(){return location.pathname.replace(/\/+$/,'')||'/';}
function samePath(a,b){return a.replace(/\/+$/,'')===b.replace(/\/+$/,'');}
function isDescendant(h){var p=current(),t=h.replace(/\/+$/,'');return t!=='/'&&p.indexOf(t+'/')===0;}
function active(h){return h.indexOf('?')===-1&&samePath(current(),h);}
function makeLink(label,href,cls){var a=document.createElement('a');a.href=href;a.textContent=label;if(cls)a.className=cls;if(active(href))a.setAttribute('aria-current','page');return a;}

function group(g){
 var w=document.createElement('div');
 w.className='ps-nav-group';
 if(active(g.href)||isDescendant(g.href))w.classList.add('is-active');
 var row=document.createElement('div');row.className='ps-nav-parent-row';
 var t=makeLink(g.label,g.href,'ps-nav-parent');
 row.appendChild(t);
 var hasChildren=!!(g.children||g.sections);
 if(hasChildren){
  var toggle=document.createElement('button');
  toggle.type='button';toggle.className='ps-nav-toggle';toggle.setAttribute('aria-label','Otvori podizbornik '+g.label);toggle.setAttribute('aria-expanded','false');toggle.textContent='⌄';
  row.appendChild(toggle);w.appendChild(row);
  var m=document.createElement('div');m.className='ps-subnav';m.setAttribute('role','menu');
  if(g.sections){
   g.sections.forEach(function(s){
    var sec=document.createElement('section');sec.className='ps-mega-section';
    var h=document.createElement('h3');h.textContent=s.title;sec.appendChild(h);
    s.items.forEach(function(i){var a=makeLink(i[0],i[1],'ps-sub-link');a.setAttribute('role','menuitem');sec.appendChild(a);});
    m.appendChild(sec);
   });
  }else{
   g.children.forEach(function(i){var a=makeLink(i[0],i[1],'ps-sub-link');a.setAttribute('role','menuitem');m.appendChild(a);});
  }
  w.appendChild(m);
  toggle.addEventListener('click',function(e){
   e.preventDefault();e.stopPropagation();
   var open=w.classList.toggle('is-expanded');toggle.setAttribute('aria-expanded',String(open));
   toggle.textContent=open?'⌃':'⌄';
  });
 }else{w.appendChild(row);}
 return w;
}

function shell(){
 var h=document.querySelector('.ps-header');
 if(!h){h=document.createElement('header');h.className='ps-header';document.body.insertBefore(h,document.body.firstChild);}
 var c=h.querySelector('.ps-nav');
 if(!c){c=document.createElement('div');c.className='container ps-nav';h.appendChild(c);}
 var b=c.querySelector('.ps-brand');
 if(!b){b=document.createElement('a');b.className='ps-brand';b.href='/index.html';b.setAttribute('aria-label','PatriaSoul — početna stranica');c.insertBefore(b,c.firstChild);}
 var n=c.querySelector('.ps-mainnav');
 if(!n){n=document.createElement('nav');n.className='ps-mainnav';n.id='ps-mainnav';n.setAttribute('aria-label','Glavna navigacija');c.appendChild(n);}
 var mb=c.querySelector('[data-ps-menu]');
 if(!mb){mb=document.createElement('button');mb.className='ps-menu';mb.type='button';mb.setAttribute('data-ps-menu','');mb.setAttribute('aria-label','Otvori glavni izbornik');mb.setAttribute('aria-controls','ps-mainnav');mb.setAttribute('aria-expanded','false');mb.innerHTML='<span></span><span></span><span></span>';c.appendChild(mb);}
}
function logo(){var b=document.querySelector('.ps-brand');if(!b)return;b.innerHTML='<img class="ps-nav-logo" src="/images/file_0000000082ec81f4a6fc17bdbd959622_114540.png" alt="PatriaSoul" width="256" height="256"><span class="sr-only">PatriaSoul</span>';}

function styles(){
 if(document.getElementById('ps-navigation-pro-css'))return;
 var s=document.createElement('style');s.id='ps-navigation-pro-css';
 s.textContent=''
 +'html{scroll-behavior:smooth}body{overflow-x:hidden!important;overflow-y:auto!important}.ps-header{position:sticky!important;top:0!important;z-index:5000!important;width:100%;background:rgba(7,11,17,.96)!important;border-bottom:1px solid rgba(224,189,85,.16);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}'
 +'.ps-nav{min-height:72px!important;display:flex!important;align-items:center!important;gap:22px!important;padding:8px 18px!important;position:relative}.ps-brand{display:flex!important;align-items:center!important;flex:0 0 auto!important;width:46px!important;height:46px!important;text-decoration:none!important}.ps-nav-logo{display:block!important;width:46px!important;height:46px!important;max-width:46px!important;max-height:46px!important;object-fit:contain!important}.sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}'
 +'.ps-mainnav{display:flex!important;align-items:stretch!important;justify-content:flex-end!important;gap:3px!important;flex:1 1 auto!important;min-width:0!important}.ps-nav-group{position:relative!important;display:flex!important;align-items:center!important}.ps-nav-parent-row{display:flex!important;align-items:center!important;border-radius:10px}.ps-nav-parent{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:44px!important;padding:9px 11px!important;border-radius:10px 0 0 10px!important;color:#eef2f5!important;text-decoration:none!important;font-size:15px!important;font-weight:750!important;white-space:nowrap!important;transition:background .18s,color .18s!important}.ps-nav-toggle{width:28px!important;height:44px!important;border:0!important;border-radius:0 10px 10px 0!important;background:transparent!important;color:#f1d57b!important;cursor:pointer!important;font-size:15px!important;padding:0!important}.ps-nav-parent-row:hover,.ps-nav-group:focus-within .ps-nav-parent-row,.ps-nav-group.is-active .ps-nav-parent-row{background:rgba(224,189,85,.10)!important}.ps-nav-parent:hover,.ps-nav-group.is-active>.ps-nav-parent-row .ps-nav-parent{color:#f5d879!important}.ps-nav-toggle:hover{background:rgba(224,189,85,.12)!important}.ps-nav-group:has(.ps-subnav:hover) .ps-nav-parent-row{background:rgba(224,189,85,.10)!important}'
 +'.ps-subnav{position:absolute!important;top:calc(100% + 8px)!important;left:0!important;min-width:250px!important;max-width:min(760px,calc(100vw - 28px))!important;padding:10px!important;display:none!important;grid-template-columns:repeat(2,minmax(190px,1fr))!important;gap:6px!important;background:rgba(11,16,24,.985)!important;border:1px solid rgba(224,189,85,.22)!important;border-radius:14px!important;box-shadow:0 18px 45px rgba(0,0,0,.42)!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important}.ps-nav-group:hover>.ps-subnav,.ps-nav-group:focus-within>.ps-subnav,.ps-nav-group.is-expanded>.ps-subnav{display:grid!important}.ps-mega-section{min-width:0!important;padding:8px!important}.ps-mega-section h3{margin:3px 8px 7px!important;padding-bottom:6px!important;color:#f1d57b!important;font-size:12px!important;letter-spacing:.07em!important;text-transform:uppercase!important;border-bottom:1px solid rgba(224,189,85,.15)!important}.ps-sub-link{display:flex!important;align-items:center!important;min-height:38px!important;padding:8px 10px!important;border-radius:8px!important;color:#e9edf0!important;text-decoration:none!important;font-size:14px!important;line-height:1.25!important}.ps-sub-link:hover,.ps-sub-link:focus-visible{background:rgba(224,189,85,.11)!important;color:#fff!important;outline:none!important}.ps-sub-link[aria-current=page]{background:rgba(224,189,85,.14)!important;color:#f5d879!important;font-weight:800!important}'
 +'.ps-menu{display:none!important;flex:0 0 44px!important;width:44px!important;height:44px!important;border:1px solid rgba(224,189,85,.25)!important;border-radius:10px!important;background:rgba(224,189,85,.06)!important;cursor:pointer!important;padding:9px!important}.ps-menu span{display:block!important;height:2px!important;margin:5px 2px!important;background:#f1d57b!important;border-radius:2px!important;transition:transform .2s,opacity .2s!important}.ps-search-trigger{flex:0 0 44px!important;width:44px!important;height:44px!important;border:1px solid rgba(224,189,85,.20)!important;border-radius:10px!important;background:rgba(224,189,85,.05)!important;color:#f1d57b!important;font-size:22px!important;cursor:pointer!important}.ps-search-trigger:hover{background:rgba(224,189,85,.12)!important}'
 +'@media(max-width:980px) and (min-width:861px){.ps-nav{gap:10px!important;padding-inline:12px!important}.ps-nav-parent{font-size:13px!important;padding-inline:7px!important}.ps-nav-toggle{width:23px!important}.ps-brand,.ps-nav-logo{width:42px!important;height:42px!important}.ps-search-trigger{width:40px!important}}
 +'@media(max-width:860px){.ps-nav{min-height:64px!important;padding:8px 12px!important;gap:10px!important}.ps-brand,.ps-nav-logo{width:42px!important;height:42px!important}.ps-menu{display:block!important;margin-left:auto!important}.ps-mainnav{position:absolute!important;left:10px!important;right:10px!important;top:calc(100% + 8px)!important;display:none!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;gap:2px!important;max-height:calc(100vh - 84px)!important;overflow:auto!important;padding:8px!important;background:rgba(8,13,20,.99)!important;border:1px solid rgba(224,189,85,.20)!important;border-radius:14px!important;box-shadow:0 18px 45px rgba(0,0,0,.45)!important}.ps-mainnav.is-open{display:flex!important}.ps-nav-group,.ps-nav-group>*{width:100%!important}.ps-nav-parent-row{width:100%!important;background:rgba(255,255,255,.025)!important}.ps-nav-parent{flex:1!important;justify-content:flex-start!important;min-height:48px!important;padding:11px 12px!important;border-radius:10px 0 0 10px!important;font-size:15px!important}.ps-nav-toggle{width:48px!important;height:48px!important;border-radius:0 10px 10px 0!important;font-size:18px!important}.ps-subnav{position:static!important;display:none!important;width:100%!important;max-width:none!important;min-width:0!important;grid-template-columns:1fr!important;padding:4px 4px 7px 12px!important;margin:0!important;background:rgba(0,0,0,.18)!important;border:0!important;border-radius:0!important;box-shadow:none!important;backdrop-filter:none!important}.ps-nav-group:hover>.ps-subnav,.ps-nav-group:focus-within>.ps-subnav{display:none!important}.ps-nav-group.is-expanded>.ps-subnav{display:grid!important}.ps-mega-section{padding:2px 4px!important}.ps-mega-section h3{font-size:11px!important;margin:7px 8px 4px!important}.ps-sub-link{min-height:42px!important;font-size:14px!important}.ps-search-trigger{width:42px!important;height:42px!important;flex-basis:42px!important}.ps-mainnav.is-open + .ps-menu{}body.ps-mobile-nav-open{overflow:hidden!important}.ps-menu[aria-expanded=true] span:nth-child(1){transform:translateY(7px) rotate(45deg)!important}.ps-menu[aria-expanded=true] span:nth-child(2){opacity:0!important}.ps-menu[aria-expanded=true] span:nth-child(3){transform:translateY(-7px) rotate(-45deg)!important}}
 +'@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.ps-nav-parent,.ps-sub-link,.ps-menu span{transition:none!important}}'
 +'.ps-search-overlay{position:fixed!important;inset:0!important;z-index:6000!important;display:none!important;align-items:flex-start!important;justify-content:center!important;padding:12vh 18px 30px!important;background:rgba(2,5,9,.78)!important;backdrop-filter:blur(8px)!important}.ps-search-overlay.is-open{display:flex!important}.ps-search-panel{position:relative!important;width:min(680px,100%)!important;padding:28px!important;background:#0c131d!important;border:1px solid rgba(224,189,85,.25)!important;border-radius:18px!important;box-shadow:0 25px 70px rgba(0,0,0,.55)!important}.ps-search-close{position:absolute!important;right:14px!important;top:14px!important;border:0!important;background:transparent!important;color:#dce2e6!important;font-size:20px!important;cursor:pointer!important}.ps-search-title{font-size:24px!important;font-weight:850!important;color:#f1d57b!important}.ps-search-subtitle{margin:6px 0 18px!important;color:#9eaab4!important;font-size:14px!important}.ps-search-input{width:100%!important;box-sizing:border-box!important;padding:13px 15px!important;border:1px solid rgba(224,189,85,.25)!important;border-radius:10px!important;background:#070c12!important;color:#fff!important;font-size:16px!important;outline:none!important}.ps-search-input:focus{border-color:rgba(224,189,85,.65)!important;box-shadow:0 0 0 3px rgba(224,189,85,.10)!important}.ps-search-results{margin-top:12px!important;display:grid!important;gap:4px!important;max-height:55vh!important;overflow:auto!important}.ps-search-result{display:block!important;padding:10px 12px!important;border-radius:9px!important;color:#e9edf0!important;text-decoration:none!important}.ps-search-result:hover{background:rgba(224,189,85,.10)!important;color:#f5d879!important}.ps-search-hint{padding:12px;color:#8995a0!important}.ps-search-lock{overflow:hidden!important}.ps-back-nav{width:min(1240px,calc(100% - 32px));margin:10px auto 0;display:flex}.ps-back-nav a{display:inline-flex;align-items:center;min-height:38px;padding:7px 12px;border:1px solid rgba(224,189,85,.22);border-radius:9px;background:rgba(10,15,22,.9);color:#f1d57b;text-decoration:none;font-weight:750}.ps-scroll-top{position:fixed;right:16px;bottom:16px;z-index:1800;width:44px;height:44px;border:1px solid rgba(224,189,85,.30);border-radius:11px;background:rgba(10,14,20,.95);color:#f1d57b;font-size:18px;font-weight:900;cursor:pointer;opacity:0;visibility:hidden;transform:translateY(8px);transition:.2s}.ps-scroll-top.is-visible{opacity:1;visibility:visible;transform:none}';
 document.head.appendChild(s);
}

function back(){
 if(location.pathname==='/'||/\/index\.html$/.test(location.pathname)||document.querySelector('.ps-back-nav'))return;
 var box=document.createElement('div');box.className='ps-back-nav';var a=document.createElement('a');a.href='#';a.textContent='← Natrag';a.addEventListener('click',function(e){e.preventDefault();if(history.length>1)history.back();else location.href='/index.html';});box.appendChild(a);
 var h=document.querySelector('.ps-header');if(h)h.insertAdjacentElement('afterend',box);else document.body.insertBefore(box,document.body.firstChild);
}
function scrollTop(){
 if(document.querySelector('.ps-scroll-top'))return;var b=document.createElement('button');b.type='button';b.className='ps-scroll-top';b.textContent='↑';b.setAttribute('aria-label','Povratak na vrh');b.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});document.body.appendChild(b);var toggle=function(){b.classList.toggle('is-visible',window.scrollY>420);};window.addEventListener('scroll',toggle,{passive:true});toggle();
}
function search(){
 if(document.querySelector('.ps-search-overlay'))return;var c=document.querySelector('.ps-nav');if(!c)return;
 var b=document.createElement('button');b.type='button';b.className='ps-search-trigger';b.setAttribute('aria-label','Pretraži PatriaSoul');b.textContent='⌕';c.appendChild(b);
 var overlay=document.createElement('div');overlay.className='ps-search-overlay';overlay.innerHTML='<div class="ps-search-panel" role="dialog" aria-modal="true" aria-label="Pretraga PatriaSoul"><button type="button" class="ps-search-close" aria-label="Zatvori pretragu">✕</button><div class="ps-search-title">Pretraži PatriaSoul</div><div class="ps-search-subtitle">Brzo pronađi rubriku ili podstranicu.</div><input class="ps-search-input" type="search" autocomplete="off" placeholder="Npr. Vukovar, gastronomija, Glagoljica…"><div class="ps-search-results"></div></div>';
 document.body.appendChild(overlay);var input=overlay.querySelector('.ps-search-input'),results=overlay.querySelector('.ps-search-results');
 function entries(){var out=[];groups.forEach(function(g){out.push({label:g.label,href:g.href});(g.children||[]).forEach(function(i){out.push({label:i[0],href:i[1]})});(g.sections||[]).forEach(function(s){s.items.forEach(function(i){out.push({label:i[0],href:i[1]})})});});return out.filter(function(x,i,a){return a.findIndex(function(y){return y.href===x.href})===i;});}
 var all=entries();function render(q){results.innerHTML='';if(!q){results.innerHTML='<div class="ps-search-hint">Upiši pojam za pretragu.</div>';return;}var needle=q.toLocaleLowerCase('hr-HR');var found=all.filter(function(x){return x.label.toLocaleLowerCase('hr-HR').indexOf(needle)!==-1}).slice(0,12);if(!found.length){results.innerHTML='<div class="ps-search-hint">Nema rezultata za „'+q.replace(/[&<>]/g,'')+'“.</div>';return;}found.forEach(function(x){var a=document.createElement('a');a.href=x.href;a.className='ps-search-result';a.textContent=x.label;results.appendChild(a);});}
 function open(){overlay.classList.add('is-open');document.body.classList.add('ps-search-lock');setTimeout(function(){input.focus();},20);render(input.value.trim());}function close(){overlay.classList.remove('is-open');document.body.classList.remove('ps-search-lock');}
 b.addEventListener('click',open);overlay.querySelector('.ps-search-close').addEventListener('click',close);overlay.addEventListener('click',function(e){if(e.target===overlay)close();});input.addEventListener('input',function(){render(input.value.trim());});document.addEventListener('keydown',function(e){if((e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName))||(e.ctrlKey&&e.key.toLowerCase()==='k')){e.preventDefault();open();}if(e.key==='Escape'&&overlay.classList.contains('is-open'))close();});render('');
}
function render(){var n=document.querySelector('.ps-mainnav');if(!n)return;n.innerHTML='';groups.forEach(function(g){n.appendChild((g.children||g.sections)?group(g):makeLink(g.label,g.href));});logo();}
function footer(){var f=document.querySelector('footer');if(!f)return;f.classList.add('ps-footer');f.innerHTML='<div class="container"><div class="ps-footer-grid"><div><a class="ps-footer-brand" href="/index.html"><img src="/images/file_0000000082ec81f4a6fc17bdbd959622_114540.png" alt="PatriaSoul" width="256" height="256"></a><p>Hrvatska. Povijest. Znanje. Identitet. Digitalni prostor za čuvanje nasljeđa i njegovo prenošenje novim generacijama.</p></div><div><h4>Domovina</h4><div class="ps-footer-links"><a href="/domovina.html">Hrvatska</a><a href="/gradovi.html">Gradovi</a><a href="/krajevi-i-geografija.html">Krajevi i geografija</a><a href="/vijesti.html">Vijesti</a><a href="/vrijeme.html">Vrijeme</a></div></div><div><h4>Branitelji</h4><div class="ps-footer-links"><a href="/branitelji.html">Branitelji</a><a href="/domovinski-rat.html">Domovinski rat</a><a href="/postrojbe.html">Postrojbe</a><a href="/brigade.html">Brigade</a><a href="/operacije.html">Operacije i bojišta</a><a href="/vukovar.html">Vukovar</a><a href="/spomenici.html">Spomenici</a></div></div><div><h4>Zajednica</h4><div class="ps-footer-links"><a href="/povijest.html">Povijest</a><a href="/bastina.html">Baština</a><a href="/vjera.html">Vjera</a><a href="/video.html">Video</a><a href="/galerija.html">Galerija</a><a href="/quiz.html">Kviz</a><a href="/duel.html">Duel</a><a href="/profil.html">Profil</a><a href="/o-nama.html">O nama</a><a href="/kontakt.html">Kontakt</a></div></div></div><div class="ps-footer-bottom"><span>© 2026 PatriaSoul</span><span>Čuvaj nasljeđe. Prenesi ga dalje.</span></div></div>';}
function menu(){var b=document.querySelector('[data-ps-menu]'),n=document.querySelector('.ps-mainnav');if(!b||!n||b.dataset.bound)return;b.dataset.bound='1';b.addEventListener('click',function(){var open=n.classList.toggle('is-open');b.setAttribute('aria-expanded',String(open));document.body.classList.toggle('ps-mobile-nav-open',open);});}
function closeOtherGroups(){document.querySelectorAll('.ps-nav-group.is-expanded').forEach(function(g){g.classList.remove('is-expanded');var t=g.querySelector('.ps-nav-toggle');if(t){t.setAttribute('aria-expanded','false');t.textContent='⌄';}});}
function globalInteractions(){
 document.addEventListener('click',function(e){if(!e.target.closest('.ps-nav-group'))closeOtherGroups();});
 document.addEventListener('keydown',function(e){if(e.key==='Escape')closeOtherGroups();});
 window.addEventListener('resize',function(){if(window.matchMedia('(min-width:861px)').matches){var n=document.querySelector('.ps-mainnav'),b=document.querySelector('[data-ps-menu]');if(n){n.classList.remove('is-open');}if(b){b.setAttribute('aria-expanded','false');}document.body.classList.remove('ps-mobile-nav-open');}});
}
function init(){styles();shell();render();footer();back();scrollTop();search();menu();globalInteractions();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.PatriaSiteNavigation={groups:groups,render:render,normalizeFooter:footer,addBackButton:back,addScrollTop:scrollTop,openSearch:function(){var b=document.querySelector('.ps-search-trigger');if(b)b.click();}};
})();
