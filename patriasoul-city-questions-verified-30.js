// PatriaSoul — verified city questions layer 30
(function(global){'use strict';
const key=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const data={
'omis':[
['Koji se festival u Omišu posvećuje dalmatinskoj klapskoj pjesmi?',['Festival dalmatinskih klapa Omiš','Dubrovačke ljetne igre','Splitski festival','Varaždinske barokne večeri'],0,'https://omis.hr/'],
['Koji je međunarodno prepoznat oblik glazbene baštine posebno povezan s Omišem?',['Klapsko pjevanje','Međimurska popevka','Bećarac','Ojkanje'],0,'https://omis.hr/'],
['Koja rijeka protječe kroz Omiš?',['Cetina','Krka','Zrmanja','Neretva'],0,'https://omis.hr/o-gradu/povijest/'],
['Na kojoj se obali Cetine nalazi povijesno središte Omiša?',['Istočnoj','Zapadnoj','Sjevernoj','Južnoj'],0,'https://omis.hr/o-gradu/povijest/'],
['Koji je naziv srednjovjekovnog imena Omiša naveden u službenoj povijesti?',['Dalmissum','Senia','Oneum','Aequum'],0,'https://omis.hr/o-gradu/povijest/'],
['Koji je drugi oblik imena Omiša iz mletačkog razdoblja naveden u službenoj povijesti?',['Almissa','Salona','Narona','Spalatum'],0,'https://omis.hr/o-gradu/povijest/'],
['Koja je skupina gospodarila Omišem u 12. i 13. stoljeću?',['Kačići','Nelipići','Frankopani','Zrinski'],0,'https://omis.hr/o-gradu/povijest/'],
['Što su omiški kneževi koristili za ovjeravanje svojih ugovora?',['Općinske pečate','Kraljevske krune','Mletačke dukate','Poljičke prstene'],0,'https://omis.hr/o-gradu/povijest/'],
['Što je bilo prikazano na vlastitim pečatima omiških kneževa?',['Srednjovjekovni vitez na konju','Brod s jedrom','Lav sv. Marka','Grb Poljica'],0,'https://omis.hr/o-gradu/povijest/'],
['Koji je dubrovački pravni dokument spomenut u vezi s omiškim gusarima?',['Dubrovački statut','Poljički statut','Vinodolski zakonik','Splitski statut'],0,'https://omis.hr/o-gradu/povijest/'],
['Koja je država preuzela vlast nad Omišem nakon 1805. godine?',['Francuska','Austrija','Venecija','Osmansko Carstvo'],0,'https://omis.hr/o-gradu/povijest/'],
['Koja je država upravljala Omišem od 1797. do 1805.?',['Austrija','Francuska','Venecija','Kraljevina SHS'],0,'https://omis.hr/o-gradu/povijest/'],
['Koji je povijesni fenomen postojao u Poljicima od srednjeg vijeka do početka 19. stoljeća?',['Poljička Knežija','Mletačka kolonija','Rimska provincija','Osmanski sandžak'],0,'https://omis.hr/o-gradu/povijest/'],
['Koji je pravni spomenik Grad Omiš uspoređuje po vrijednosti s Vinodolskim zakonom?',['Poljički statut','Dubrovački statut','Splitski statut','Istarski razvod'],0,'https://omis.hr/o-gradu/povijest/'],
['Koliko je ukupno kulturnih dobara prema podacima Registra kulturnih dobara 2025. na području Grada Omiša?',['67','54','6','3'],0,'https://omis.hr/wp-content/uploads/2025/12/Nacrt-prijedloga-Plana-upravljanja-destinacijom-Omis-za-razdoblje-2026.-%E2%80%93-2029-1.pdf']
],
'sinj':[
['Koja je viteška igra zaštitni znak Sinja?',['Sinjska alka','Moreška','Trka na prstenac','Kliška alka'],0,'https://www.sinj.hr/kultura/'],
['Koji se dan slavi kao Dan Grada Sinja?',['15. kolovoza','5. kolovoza','8. listopada','18. studenoga'],0,'https://www.sinj.hr/kultura/'],
['Koja je svetkovina povezana sa zaštitnicom Sinja i Danom Grada?',['Velika Gospa','Sveta Barbara','Sveta Cecilija','Sveta Lucija'],0,'https://www.sinj.hr/kultura/'],
['Koja se glazbena ustanova u Sinju razvijala od 1958. godine?',['Glazbena škola Jakova Gotovca','Gradska glazba Sinj','Klapa Sinj','Kulturno umjetničko središte'],0,'https://gsjgotovca.hr/o-skoli/povijest-skole'],
['Koje je godine osnovana Gradska glazba Sinj?',['1862.','1958.','1715.','1918.'],0,'https://www.sinj.hr/clanak/gradska-glazba-sinj/'],
['Koji je prvi voditelj zbora Glazbene škole u Sinju bio Marko Rivier?',['Pjevačkog zbora','Orkestra tambura','Klape Sinj','Gradske galerije'],0,'https://gsjgotovca.hr/o-skoli/povijest-skole'],
['Koji rimski grad/logor Grad Sinj navodi na Gardunu?',['Tilurij','Oneum','Salona','Aequum'],0,'https://www.sinj.hr/povijest-grada/'],
['Koji rimski grad Grad Sinj navodi na području Čitluka?',['Aequum','Tilurij','Senia','Narona'],0,'https://www.sinj.hr/povijest-grada/'],
['Koja je obitelj imala sjedište na sinjskom gradu u XIV. i XV. stoljeću?',['Nelipići','Kačići','Šubići','Frankopani'],0,'https://www.sinj.hr/povijest-grada/'],
['Koliko je stoljeća Cetina prema službenoj povijesti bila u sastavu Rimskog Carstva?',['Šest','Tri','Deset','Dvanaest'],0,'https://www.sinj.hr/povijest-grada/']
]};
function forCity(city){return (data[key(city)]||[]).map((x,i)=>({id:`verified30_${key(city)}_${String(i+1).padStart(3,'0')}`,cityId:key(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:x[2],sourceUrl:x[3]}));}
global.PatriaCityVerified30={forCity};
})(typeof window!=='undefined'?window:globalThis);
