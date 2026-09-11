/* PatriaSoul — contextual open-license photography layer */
(function(){
  'use strict';

  var commons = {
    zagreb: ['/images/gallery/zagreb-jelacic.jpg','Zagreb · Trg bana Jelačića','Nick Savchenko','CC BY-SA 2.0','https://commons.wikimedia.org/wiki/File:Zagreb_(29255640143).jpg'],
    north: ['/images/gallery/varazdin-vijecnica.jpg','Varaždin · sjeverozapadna Hrvatska','Pudelek (Marcin Szala)','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Vara%C5%BEdin_-_town_hall.JPG'],
    panonia: ['/images/gallery/slavonija.jpg','Slavonija · panonska Hrvatska','Ljeto','CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Slavonija3_8292855.jpg'],
    istra: ['/images/gallery/istra-batana.jpg','Istra · pomorska baština','Shabicht','CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Batana_istrska.jpg'],
    opatija: ['/images/gallery/opatija.jpg','Opatija · Kvarner','Vzach~commonswiki','Public domain','https://commons.wikimedia.org/wiki/File:Opatija.JPG'],
    split: ['/images/gallery/split-marjan.jpg','Split · Marjan','dominkod','CC BY 3.0','https://commons.wikimedia.org/wiki/File:Split_-_a_view_from_Marjan_-_panoramio.jpg'],
    vukovar: ['/images/gallery/vukovar-ulica.jpg','Vukovar','Pudelek (Marcin Szala)','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Vukovar_-_street.JPG'],
    memorial: ['/images/gallery/vukovar-groblje.jpg','Memorijalna mjesta · Vukovar','Damir Čolja','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Memorijalno_groblje_Vukovar.jpg'],
    ston: ['/images/gallery/ston.jpg','Ston · krška i povijesna Hrvatska','Bernard Gagnon','CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:View_of_Ston,_Croatia.jpg'],
    dubrovnik: ['/images/gallery/dubrovnik-stari-grad.jpg','Dubrovnik · hrvatska baština i Jadran','dronepicr','CC BY 2.0','https://commons.wikimedia.org/wiki/File:A_distant_view_of_Divovici_Beach_and_the_Old_Town_of_Dubrovnik,_Croatia_(48739125537).jpg']
  };

  var visuals = {
    '/domovina.html': commons.zagreb,
    '/gradovi.html': commons.zagreb,
    '/krajevi-i-geografija.html': commons.panonia,
    '/regionalni-vodic.html': commons.ston,
    '/zagorje-i-prigorje.html': commons.north,
    '/medimurje.html': commons.north,
    '/podravina-i-bilogora.html': commons.panonia,
    '/slavonija-i-baranja.html': commons.panonia,
    '/posavina-i-pokuplje.html': commons.panonia,
    '/lika-i-gorski-kotar.html': commons.ston,
    '/istra.html': commons.istra,
    '/kvarner-i-primorje.html': commons.opatija,
    '/dalmacija.html': commons.split,
    '/priroda.html': commons.ston,
    '/povijest.html': commons.north,
    '/hrvatska-povijest.html': commons.north,
    '/20-stoljece.html': commons.vukovar,
    '/stvaranje-moderne-hrvatske.html': commons.vukovar,
    '/bastina.html': commons.istra,
    '/tradicija-i-obicaji.html': commons.istra,
    '/glazba.html': commons.istra,
    '/gastronomija.html': commons.istra,
    '/vukovar.html': commons.vukovar,
    '/branitelji.html': commons.vukovar,
    '/domovinski-rat.html': commons.vukovar,
    '/spomenici.html': commons.memorial,
    '/vjera.html': commons.north,
    '/hrvatska-i-dijaspora.html': commons.dubrovnik,
    '/vijesti.html': commons.zagreb
  };

  function contextual(path){
    var p=path.toLowerCase();
    if(/dubrovnik/.test(p)) return commons.dubrovnik;
    if(/ston/.test(p)) return commons.ston;
    if(/vukovar|branitelj|domovinski-rat|operacije|brigade|postrojbe|spomenici|memorijal/.test(p)) return commons.vukovar;
    if(/istra|pula|porec|rovinj|umag|pazin|labin|buzet|novigrad/.test(p)) return commons.istra;
    if(/dalmacija|split|zadar|sibenik|omis|sinj|makarska|trogir|solin|knin/.test(p)) return commons.split;
    if(/kvarner|primorje|rijeka|opatija|krk|cres|losinj|senj/.test(p)) return commons.opatija;
    if(/zagorje|prigorje|varazdin|krapina|zabok|cakovec|medimurje/.test(p)) return commons.north;
    if(/slavonija|baranja|osijek|vinkovci|slavonski-brod|pozega|dakovo|ilok/.test(p)) return commons.panonia;
    if(/podravina|bilogora|koprivnica|virovitica|djurdjevac|bjelovar/.test(p)) return commons.panonia;
    if(/posavina|pokuplje|sisak|karlovac|petrinja|glina|kutina/.test(p)) return commons.panonia;
    if(/lika|gorski-kotar|gospic|otocac|ogulin|delnice/.test(p)) return commons.ston;
    if(/vjera|evandelje|molitve|krunica|sakramenti|liturgija|svetac|blagdani|svetista/.test(p)) return commons.north;
    if(/bastina|tradicija|glazba|gastronomija|kultura/.test(p)) return commons.istra;
    if(/povijest|stoljece|kraljev|srednji-vijek|antika/.test(p)) return commons.north;
    return null;
  }

  function cityPhoto(){
    if(location.pathname!=='/grad.html') return null;
    var q=new URLSearchParams(location.search).get('city');
    if(!q) return commons.zagreb;
    q=q.toLowerCase();
    if(/vukovar/.test(q)) return commons.vukovar;
    if(/dubrovnik/.test(q)) return commons.dubrovnik;
    if(/ston/.test(q)) return commons.ston;
    if(/pula|porec|rovinj|umag|pazin|labin|buzet|novigrad/.test(q)) return commons.istra;
    if(/rijeka|opatija|krk|cres|losinj|senj/.test(q)) return commons.opatija;
    if(/varazdin|cakovec|prelog|mursko|krapina|zabok|zagreb|samobor/.test(q)) return commons.north;
    if(/osijek|vinkovci|slavonski|pozega|dakovo|ilok|virovitica|koprivnica|djurdjevac|bjelovar/.test(q)) return commons.panonia;
    if(/split|solin|sinj|zadar|sibenik|omis|makarska|trogir|knin/.test(q)) return commons.split;
    return null;
  }

  function css(){
    if(document.getElementById('ps-visuals-css')) return;
    var s=document.createElement('style');
    s.id='ps-visuals-css';
    s.textContent='.ps-context-photo{max-width:1180px;margin:0 auto 30px;padding:0 20px}.ps-context-photo figure{position:relative;overflow:hidden;margin:0;border-radius:24px;background:#0b1016;border:1px solid rgba(255,255,255,.1);box-shadow:0 18px 55px rgba(0,0,0,.28)}.ps-context-photo img{display:block;width:100%;height:clamp(240px,34vw,430px);object-fit:cover}.ps-context-photo figcaption{position:absolute;left:0;right:0;bottom:0;padding:48px 24px 18px;color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.88))}.ps-context-photo strong{display:block;color:#f1d47d;font-size:clamp(18px,2.3vw,28px);margin-bottom:5px}.ps-context-photo span{font-size:12px;color:#d0d5da}.ps-context-photo a{color:#f1d47d;text-decoration:none}.ps-context-photo small{display:block;margin-top:6px;color:#aeb7c0;font-size:10px}.ps-context-photo .ps-photo-credit{position:absolute;right:12px;bottom:10px;z-index:2;background:rgba(0,0,0,.58);padding:5px 8px;border-radius:8px;color:#fff;font-size:10px}.ps-context-photo .ps-photo-credit a{color:#fff}';
    document.head.appendChild(s);
  }

  function render(){
    var key=location.pathname.replace(/\/+$/,'')||'/';
    var item=visuals[key] || cityPhoto() || contextual(key);
    if(!item || document.getElementById('ps-context-photo')) return;
    var main=document.querySelector('main');
    if(!main) return;
    css();
    var box=document.createElement('section');
    box.id='ps-context-photo';
    box.className='ps-context-photo';
    box.setAttribute('aria-label','Tematska fotografija stranice');
    box.innerHTML='<figure><img loading="lazy" decoding="async" src="'+item[0]+'" alt="'+item[1]+'"><figcaption><strong>'+item[1]+'</strong><span>Fotografija: '+item[2]+' · '+item[3]+'</span><small><a href="'+item[4]+'" target="_blank" rel="noopener noreferrer">Izvor fotografije i licenca</a></small></figcaption><span class="ps-photo-credit">Wikimedia Commons</span></figure></section>';
    var hero=main.querySelector('.ps-page-hero');
    if(hero && hero.nextSibling) main.insertBefore(box,hero.nextSibling); else main.insertBefore(box,main.firstChild);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render); else render();
})();
