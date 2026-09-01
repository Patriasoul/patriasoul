/* PatriaSoul — shared Vjera subpage renderer */
(function(){
  const data={
    evandelje:{title:'Evanđelje',icon:'📖',intro:'Evanđeoske misli i sadržaji za svakodnevno čitanje i razmišljanje.'},
    molitve:{title:'Molitve',icon:'🙏',intro:'Mjesto za tradicionalne i svakodnevne molitve, sabrano u mirnom i preglednom prostoru.'},
    krunica:{title:'Krunica',icon:'📿',intro:'Vodič kroz molitvu krunice i njezina otajstva.'},
    blagdani:{title:'Blagdani',icon:'⛪',intro:'Pregled važnih liturgijskih i hrvatskih vjerskih blagdana.'},
    biblija:{title:'Biblija',icon:'📚',intro:'Ulaz u biblijske tekstove, teme, knjige i izvore.'}
  };
  function init(){const key=document.body.dataset.vjeraPage;if(!key||!data[key])return;const d=data[key];const t=document.querySelector('[data-vjera-title]'),i=document.querySelector('[data-vjera-intro]');if(t)t.textContent=d.icon+' '+d.title;if(i)i.textContent=d.intro;document.title=d.title+' — PatriaSoul';}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
