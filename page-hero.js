/* PatriaSoul — contextual page hero layer */
(function(){
'use strict';
var fallback='/images/1765535164250.png';
var flag=fallback;
var images={
'/branitelji.html':'/images/1eMfdU8Kdg7MZPpwqRNdXr3_aYsXStWoeEAyTNmWNSKzt_4LmGfrw_d6a1jaJDkH8zCzB2kho-VkuyvXLc-ZCqtkdXgfHgqlZW4wsxIZZ9zWAxNGDcs-daDXjmWR9o6OBZF9feynDbknaeHLbneVgh29bRvkWFVSDhfYx5Wsbx5ZIS6AJoyZ6uyyhvZv9NLX.jfif',
'/domovina.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Croatian%20Parliament.jpg',
'/gradovi.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Croatian%20Parliament.jpg',
'/domovinski-rat.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Vukovar%20water%20tower.jpg',
'/postrojbe.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Vukovar%20Water%20Tower.jpg',
'/brigade.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Vukovar%20Water%20Tower.jpg',
'/operacije.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Vukovar%20Water%20Tower.jpg',
'/vukovar.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Vukovar%20Water%20Tower.jpg',
'/spomenici.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Vukovar%20water%20tower.jpg',
'/povijest.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Ba%C5%A1ka%20tablet.jpg',
'/bastina.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Ba%C5%A1ka%20tablet.jpg',
'/gastronomija.html':fallback,
'/govori-i-dijalekti.html':fallback,
'/vjera.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Katedrala%20%28Zagreb%29.jpg',
'/evandelje.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Katedrala%20%28Zagreb%29.jpg',
'/molitve.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Katedrala%20%28Zagreb%29.jpg',
'/krunica.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Katedrala%20%28Zagreb%29.jpg',
'/blagdani.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Katedrala%20%28Zagreb%29.jpg',
'/biblija.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Katedrala%20%28Zagreb%29.jpg',
'/svetac-dana.html':'https://commons.wikimedia.org/wiki/Special:FilePath/Katedrala%20%28Zagreb%29.jpg',
'/video.html':fallback,
'/galerija.html':fallback,
'/vijesti.html':fallback,
'/brani-svoj-grad.html':fallback,
'/quiz.html':fallback,
'/duel.html':fallback,
'/rang-lista.html':fallback,
'/profil.html':fallback,
'/o-nama.html':fallback,
'/o-patriasoul.html':fallback,
'/kontakt.html':fallback
};
var labels={
'/domovina.html':'Hrvatska i domovina','/gradovi.html':'Gradovi Hrvatske','/branitelji.html':'Branitelji i sjećanje','/domovinski-rat.html':'Domovinski rat','/postrojbe.html':'Postrojbe','/brigade.html':'Brigade','/operacije.html':'Operacije i bojišta','/vukovar.html':'Vukovar — grad koji pamti','/spomenici.html':'Spomenici i memorijali','/povijest.html':'Hrvatska povijest','/bastina.html':'Kulturna i povijesna baština','/gastronomija.html':'Hrvatska gastronomija','/govori-i-dijalekti.html':'Govori i dijalekti','/vjera.html':'Vjera i duhovna baština','/evandelje.html':'Evanđelje','/molitve.html':'Molitve','/krunica.html':'Krunica','/blagdani.html':'Crkveni blagdani','/biblija.html':'Biblija','/svetac-dana.html':'Svetac dana','/video.html':'Video arhiva','/galerija.html':'Galerija','/vijesti.html':'Vijesti','/brani-svoj-grad.html':'Brani svoj grad','/quiz.html':'PatriaSoul kviz','/duel.html':'Duel','/rang-lista.html':'Rang-lista','/profil.html':'Moj profil','/o-nama.html':'O projektu PatriaSoul','/o-patriasoul.html':'PatriaSoul','/kontakt.html':'Kontakt'};
function current(){return location.pathname.replace(/\/+$/,'')||'/';}
function style(){if(document.getElementById('ps-page-hero-style'))return;var s=document.createElement('style');s.id='ps-page-hero-style';s.textContent='.ps-page-hero{min-height:330px;display:flex;align-items:center;position:relative;overflow:hidden;background-position:center!important;background-size:cover!important}.ps-page-hero .container{position:relative;z-index:2}.ps-page-hero .ps-kicker{display:inline-block;color:#f3da84!important;font-weight:900;letter-spacing:.12em;text-transform:uppercase;font-size:.72rem;margin-bottom:14px}.ps-page-hero:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,7,11,.96),rgba(4,7,11,.62),rgba(4,7,11,.78));z-index:1}.ps-page-hero .page-hero-credit{display:block;margin-top:14px;color:rgba(255,255,255,.58);font-size:.7rem}.ps-page-hero h1{position:relative}.ps-page-hero p{position:relative}.ps-page-hero .home-actions{position:relative}@media(max-width:560px){.ps-page-hero{min-height:290px}}';document.head.appendChild(s);}
function ensureHero(){if(current()==='/'||current()==='/index.html')return;var main=document.querySelector('main');if(!main)return;var hero=main.querySelector(':scope > .ps-page-hero');var h1=main.querySelector('h1');if(!hero&&!h1)return;style();var path=current();if(hero){hero.style.backgroundImage='url("'+(images[path]||fallback)+'")';hero.classList.add('ps-contextual-hero');var kicker=hero.querySelector('.ps-kicker');if(kicker)kicker.textContent=labels[path]||kicker.textContent.replace(/•/g,'·');return;}var text=h1.textContent.trim();var p=h1.parentElement&&h1.parentElement.querySelector('p');hero=document.createElement('section');hero.className='ps-page-hero ps-contextual-hero';hero.style.backgroundImage='url("'+(images[path]||fallback)+'")';var c=document.createElement('div');c.className='container';var k=document.createElement('span');k.className='ps-kicker';k.textContent=labels[path]||'PatriaSoul';var title=document.createElement('h1');title.textContent=text;var desc=document.createElement('p');desc.textContent=p?p.textContent.trim():'Istraži sadržaj PatriaSoul portala.';c.append(k,title,desc);hero.appendChild(c);main.insertBefore(hero,main.firstChild);h1.style.display='none';if(p&&p!==desc)p.style.display='none';}
function init(){ensureHero();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();