/* PatriaSoul — contextual open-license photography layer */
(function(){
  'use strict';

  var visuals = {
    '/domovina.html': ['/images/gallery/zagreb-jelacic.jpg','Hrvatska · Zagreb','Nick Savchenko','CC BY-SA 2.0','https://commons.wikimedia.org/wiki/File:Zagreb_(29255640143).jpg'],
    '/gradovi.html': ['/images/gallery/zagreb-jelacic.jpg','Gradovi Hrvatske','Nick Savchenko','CC BY-SA 2.0','https://commons.wikimedia.org/wiki/File:Zagreb_(29255640143).jpg'],
    '/zagorje-i-prigorje.html': ['/images/gallery/varazdin-vijecnica.jpg','Sjeverozapadna Hrvatska','Pudelek (Marcin Szala)','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Vara%C5%BEdin_-_town_hall.JPG'],
    '/medimurje.html': ['/images/gallery/varazdin-vijecnica.jpg','Sjever Hrvatske','Pudelek (Marcin Szala)','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Vara%C5%BEdin_-_town_hall.JPG'],
    '/podravina-i-bilogora.html': ['/images/gallery/slavonija.jpg','Panonska Hrvatska','Ljeto','CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Slavonija3_8292855.jpg'],
    '/slavonija-i-baranja.html': ['/images/gallery/slavonija.jpg','Slavonija','Ljeto','CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Slavonija3_8292855.jpg'],
    '/posavina-i-pokuplje.html': ['/images/gallery/slavonija.jpg','Panonska i riječna Hrvatska','Ljeto','CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Slavonija3_8292855.jpg'],
    '/lika-i-gorski-kotar.html': ['/images/gallery/ston.jpg','Krška Hrvatska','Bernard Gagnon','CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:View_of_Ston,_Croatia.jpg'],
    '/istra.html': ['/images/gallery/istra-batana.jpg','Istra · pomorska baština','Shabicht','CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Batana_istrska.jpg'],
    '/kvarner-i-primorje.html': ['/images/gallery/opatija.jpg','Kvarner i Primorje · Opatija','Kiki273','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Opatija.jpg'],
    '/dalmacija.html': ['/images/gallery/split-marjan.jpg','Dalmacija · Split i Marjan','dominkod','CC BY 3.0','https://commons.wikimedia.org/wiki/File:Split_-_a_view_from_Marjan_-_panoramio.jpg'],
    '/povijest.html': ['/images/gallery/varazdin-vijecnica.jpg','Povijesna Hrvatska','Pudelek (Marcin Szala)','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Vara%C5%BEdin_-_town_hall.JPG'],
    '/bastina.html': ['/images/gallery/istra-batana.jpg','Hrvatska kulturna baština','Shabicht','CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Batana_istrska.jpg'],
    '/vukovar.html': ['/images/gallery/vukovar-ulica.jpg','Vukovar','Pudelek (Marcin Szala)','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Vukovar_-_street.JPG'],
    '/branitelji.html': ['/images/gallery/vukovar-ulica.jpg','Sjećanje i obrana Hrvatske','Pudelek (Marcin Szala)','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Vukovar_-_street.JPG'],
    '/domovinski-rat.html': ['/images/gallery/vukovar-ulica.jpg','Domovinski rat · Vukovar','Pudelek (Marcin Szala)','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Vukovar_-_street.JPG'],
    '/spomenici.html': ['/images/gallery/vukovar-groblje.jpg','Memorijalna mjesta','Damir Čolja','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Memorijalno_groblje_Vukovar.jpg'],
    '/vjera.html': ['/images/gallery/varazdin-vijecnica.jpg','Vjera i hrvatska baština','Pudelek (Marcin Szala)','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Vara%C5%BEdin_-_town_hall.JPG'],
    '/hrvatska-i-dijaspora.html': ['/images/gallery/dubrovnik-stari-grad.jpg','Hrvatska povezana sa svijetom','dronepicr','CC BY 2.0','https://commons.wikimedia.org/wiki/File:A_distant_view_of_Divovici_Beach_and_the_Old_Town_of_Dubrovnik,_Croatia_(48739125537).jpg']
  };

  function css(){
    if(document.getElementById('ps-visuals-css')) return;
    var s=document.createElement('style');
    s.id='ps-visuals-css';
    s.textContent='.ps-context-photo{max-width:1180px;margin:0 auto 30px;padding:0 20px}.ps-context-photo figure{position:relative;overflow:hidden;margin:0;border-radius:24px;background:#0b1016;border:1px solid rgba(255,255,255,.1);box-shadow:0 18px 55px rgba(0,0,0,.28)}.ps-context-photo img{display:block;width:100%;height:clamp(240px,34vw,430px);object-fit:cover}.ps-context-photo figcaption{position:absolute;left:0;right:0;bottom:0;padding:48px 24px 18px;color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.88))}.ps-context-photo strong{display:block;color:#f1d47d;font-size:clamp(18px,2.3vw,28px);margin-bottom:5px}.ps-context-photo span{font-size:12px;color:#d0d5da}.ps-context-photo a{color:#f1d47d;text-decoration:none}.ps-context-photo small{display:block;margin-top:6px;color:#aeb7c0;font-size:10px}.ps-context-photo .ps-photo-credit{position:absolute;right:12px;bottom:10px;z-index:2;background:rgba(0,0,0,.58);padding:5px 8px;border-radius:8px;color:#fff;font-size:10px}.ps-context-photo .ps-photo-credit a{color:#fff}';
    document.head.appendChild(s);
  }

  function render(){
    var key=location.pathname.replace(/\/+$/,'')||'/';
    var item=visuals[key];
    if(!item || document.getElementById('ps-context-photo')) return;
    var main=document.querySelector('main');
    if(!main) return;
    css();
    var box=document.createElement('section');
    box.id='ps-context-photo';
    box.className='ps-context-photo';
    box.setAttribute('aria-label','Tematska fotografija stranice');
    box.innerHTML='<figure><img loading="lazy" src="'+item[0]+'" alt="'+item[1]+'"><figcaption><strong>'+item[1]+'</strong><span>Fotografija: '+item[2]+' · '+item[3]+'</span><small><a href="'+item[4]+'" target="_blank" rel="noopener noreferrer">Izvor fotografije i licenca</a></small></figcaption><span class="ps-photo-credit">Wikimedia Commons</span></figure></section>';
    var hero=main.querySelector('.ps-page-hero');
    if(hero && hero.nextSibling) main.insertBefore(box,hero.nextSibling); else main.insertBefore(box,main.firstChild);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render); else render();
})();
