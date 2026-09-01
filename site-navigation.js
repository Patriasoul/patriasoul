/* PatriaSoul — canonical site navigation */
(function(){
  'use strict';
  var groups = [
    {label:'Početna',href:'/index.html'},
    {label:'Domovina',href:'/domovina.html'},
    {label:'Branitelji',href:'/branitelji.html',children:[
      ['Branitelji','/branitelji.html'],['Postrojbe','/postrojbe.js'],['Brigade','/brigade.js']
    ]},
    {label:'Povijest',href:'/povijest.html',children:[
      ['Hrvatska povijest','/povijest.html'],['Domovinski rat','/domovinski-rat.js'],['Bitke','/bitke.js'],['Operacije','/operacije.js']
    ]},
    {label:'Baština',href:'/bastina.html',children:[
      ['Baština','/bastina.html'],['Spomenici','/spomenici.js'],['Gradovi i baština','/gradovi.html']
    ]},
    {label:'Vjera',href:'/vjera.html',children:[
      ['Vjera i duhovna baština','/vjera.html'],['Evanđelje','/evandelje.html'],['Svetac dana','/svetac-dana.html'],['Molitve','/molitve.html'],['Krunica','/krunica.html'],['Blagdani','/blagdani.html'],['Biblija','/biblija.html']
    ]},
    {label:'Gradovi',href:'/gradovi.html',children:[
      ['Svi gradovi','/gradovi.html'],['Zagreb','/grad.html?grad=zagreb'],['Vukovar','/grad.html?grad=vukovar'],['Split','/grad.html?grad=split'],['Rijeka','/grad.html?grad=rijeka'],['Osijek','/grad.html?grad=osijek']
    ]},
    {label:'Vijesti',href:'/vijesti.html'},
    {label:'Mediji',href:'/video.html',children:[['Video','/video.html'],['Galerija','/galerija.html'],['Glazba','/music.js']]},
    {label:'Igra',href:'/brani-svoj-grad.html',children:[
      ['Brani svoj grad','/brani-svoj-grad.html'],['Kviz','/quiz.html'],['Rang-lista','/rang-lista.html'],['Profil','/profil.html']
    ]}
  ];
  function path(){return location.pathname.replace(/\\/+$/,'') || '/';}
  function active(href){return href.indexOf('?')===-1 && path()===href.replace(/\\/+$/,'');}
  function makeLink(item){
    var a=document.createElement('a'); a.href=item.href; a.textContent=item.label;
    if(active(item.href)) a.setAttribute('aria-current','page');
    return a;
  }
  function render(){
    var nav=document.querySelector('.ps-mainnav'); if(!nav) return;
    nav.innerHTML=''; nav.setAttribute('data-ps-canonical-nav','true');
    groups.forEach(function(g){
      var wrap=document.createElement(g.children?'div':'span');
      if(g.children){
        wrap.className='ps-nav-group';
        var top=makeLink(g); top.className='ps-nav-parent';
        top.setAttribute('aria-haspopup','true');
        wrap.appendChild(top);
        var menu=document.createElement('div'); menu.className='ps-subnav';
        g.children.forEach(function(c){var a=makeLink({label:c[0],href:c[1]}); menu.appendChild(a);});
        wrap.appendChild(menu);
      } else wrap.appendChild(makeLink(g));
      nav.appendChild(wrap);
    });
    var quiz=makeLink({label:'🧠 Kviz',href:'/quiz.html'}); quiz.className='ps-nav-cta'; nav.appendChild(quiz);
    var button=document.querySelector('[data-ps-menu]');
    if(button){button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','ps-mainnav');}
    nav.id='ps-mainnav';
  }
  function init(){render();var b=document.querySelector('[data-ps-menu]'),n=document.querySelector('.ps-mainnav');
    if(b&&n&&!b.dataset.bound){b.dataset.bound='1';b.addEventListener('click',function(){var open=n.classList.toggle('is-open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'✕':'☰';});}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  window.PatriaSiteNavigation={groups:groups,render:render};
})();
