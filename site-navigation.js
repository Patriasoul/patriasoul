/* PatriaSoul — canonical site navigation */
(function(){
  'use strict';
  var groups=[
    {label:'Početna',href:'/index.html'},
    {label:'Domovina',href:'/domovina.html'},
    {label:'Branitelji',href:'/branitelji.html',mega:true,sections:[
      {title:'Pregled',items:[['🛡️ Branitelji','/branitelji.html'],['⚔️ Domovinski rat','/domovinski-rat.html']]},
      {title:'Postrojbe',items:[['🏛️ Postrojbe','/postrojbe.html'],['🪖 Brigade','/brigade.html']]},
      {title:'Operacije i bojišta',items:[['⚔️ Operacije','/operacije.html'],['🗺️ Vukovar','/vukovar.html']]},
      {title:'Sjećanje',items:[['🕯️ Spomenici i memorijali','/spomenici.html']]}
    ]},
    {label:'Povijest',href:'/povijest.html',children:[['Hrvatska povijest','/povijest.html'],['Domovinski rat','/domovinski-rat.html'],['Bitke i bojišta','/operacije.html']]},
    {label:'Baština',href:'/bastina.html',children:[['Baština','/bastina.html'],['Spomenici','/spomenici.html']]},
    {label:'Vjera',href:'/vjera.html',children:[['Vjera i duhovna baština','/vjera.html'],['Evanđelje','/evandelje.html'],['Svetac dana','/svetac-dana.html'],['Molitve','/molitve.html'],['Krunica','/krunica.html'],['Blagdani','/blagdani.html'],['Biblija','/biblija.html']]},
    {label:'Gradovi',href:'/gradovi.html',children:[['Svi gradovi','/gradovi.html'],['Zagreb','/grad.html?grad=zagreb'],['Vukovar','/grad.html?grad=vukovar'],['Split','/grad.html?grad=split'],['Rijeka','/grad.html?grad=rijeka'],['Osijek','/grad.html?grad=osijek']]},
    {label:'Vijesti',href:'/vijesti.html'},
    {label:'Mediji',href:'/video.html',children:[['Video','/video.html'],['Galerija','/galerija.html']]},
    {label:'Igra',href:'/brani-svoj-grad.html',children:[['🛡️ Brani svoj grad','/brani-svoj-grad.html'],['🧠 Kviz','/quiz.html'],['🏆 Rang-lista','/rang-lista.html'],['👤 Profil','/profil.html'],['🏅 Značke','/profil.html#znacke']]}
  ];
  function current(){return location.pathname.replace(/\/+$/,'')||'/';}
  function active(href){return href.indexOf('?')===-1&&href.indexOf('#')===-1&&current()===href.replace(/\/+$/,'');}
  function makeLink(item){var a=document.createElement('a');a.href=item.href;a.textContent=item.label;if(active(item.href))a.setAttribute('aria-current','page');return a;}
  function makeGroup(g){
    var wrap=document.createElement('div');wrap.className='ps-nav-group'+(g.mega?' ps-nav-mega-group':'');
    var top=makeLink(g);top.className='ps-nav-parent';top.setAttribute('aria-haspopup','true');
    wrap.appendChild(top);
    var menu=document.createElement('div');menu.className='ps-subnav'+(g.mega?' ps-mega-menu':'');
    if(g.mega){
      g.sections.forEach(function(section){
        var col=document.createElement('section');col.className='ps-subnav-section';
        var h=document.createElement('div');h.className='ps-subnav-title';h.textContent=section.title;col.appendChild(h);
        section.items.forEach(function(c){col.appendChild(makeLink({label:c[0],href:c[1]}));});
        menu.appendChild(col);
      });
    } else {
      g.children.forEach(function(c){menu.appendChild(makeLink({label:c[0],href:c[1]}));});
    }
    wrap.appendChild(menu);return wrap;
  }
  function render(){
    var nav=document.querySelector('.ps-mainnav');if(!nav)return;
    nav.innerHTML='';nav.id='ps-mainnav';nav.setAttribute('data-ps-canonical-nav','true');
    groups.forEach(function(g){nav.appendChild((g.children||g.mega)?makeGroup(g):makeLink(g));});
    var quiz=makeLink({label:'🧠 Kviz',href:'/quiz.html'});quiz.className='ps-nav-cta';nav.appendChild(quiz);
  }
  function init(){
    render();
    var b=document.querySelector('[data-ps-menu]'),n=document.querySelector('.ps-mainnav');
    if(b&&n&&!b.dataset.bound){
      b.dataset.bound='1';b.setAttribute('aria-controls','ps-mainnav');b.setAttribute('aria-expanded','false');
      b.addEventListener('click',function(){var open=n.classList.toggle('is-open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'✕':'☰';});
      n.addEventListener('click',function(e){
        var parent=e.target.closest('.ps-nav-parent');
        if(!parent||window.matchMedia('(min-width:861px)').matches)return;
        var group=parent.closest('.ps-nav-group');if(!group)return;
        e.preventDefault();group.classList.toggle('is-expanded');
      });
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.PatriaSiteNavigation={groups:groups,render:render};
})();
