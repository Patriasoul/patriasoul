// PatriaSoul — provjerena gradska pitanja, nastavak 28.
// Dugo Selo — početni prošireni set, vezan uz službene/lokalne izvore.
(function(global){'use strict';
const extra={
'dugo-selo':[
['Koje se godine u povijesnim izvorima spominje darovnica kralja Andrije II. povezana s područjem današnjeg Dugog Sela?',['1209.','1066.','1242.','1312.']],
['Kojem je crkvenom svetcu posvećena najstarija crkva na Martin Bregu?',['Svetom Martinu','Svetom Jurju','Svetom Nikoli','Svetom Marku']],
['Koje se godine navodi kao godina gradnje crkve svetog Martina na Martin Bregu?',['1209.','1314.','1573.','1900.']],
['Koji je red imao posjede na području Dugog Sela od 1209. godine?',['Templari','Benediktinci','Franjevci','Isusovci']],
['Koji je red preuzeo posjede nakon ukidanja templarskog reda?',['Ivanovci odnosno hospitalci','Franjevci','Dominikanci','Pavlinci']],
['Koje je godine područje templarskih posjeda povezano s prestankom djelovanja templara?',['1312.','1209.','1348.','1573.']],
['Koji je zagrebački arhitekt projektirao noviju župnu crkvu svetog Martina u Dugom Selu?',['Herman Bollé','Viktor Kovačić','Josip Vancaš','Stjepan Podhorsky']],
['Koje je godine izgrađena novija neogotička župna crkva svetog Martina u središtu Dugog Sela?',['1900.','1880.','1209.','1921.']],
['Koji je događaj teško oštetio staru crkvu svetog Martina na Martin Bregu?',['Potres 1880.','Velika poplava 1926.','Požar 1900.','Rat 1941.']],
['Kako se zove brežuljak na kojem se nalazi stara crkva svetog Martina?',['Martin Breg','Draškovićev breg','Kaptol','Prozorje']],
['Koji je poznati povijesni kompleks sačuvan u središnjem gradskom parku Dugog Sela?',['Draškovićev kompleks','Zrinski kompleks','Frankopanski kaštel','Erdödyjev dvor']],
['Kako se zove sačuvana kula povezana s nekadašnjim vlastelinskim posjedom Draškovića?',['Draškovićeva kula','Martinova kula','Templarska kula','Prozorska kula']],
['Koja se građevina u kompleksu Draškovićevih danas koristi kao sudska zgrada?',['Draškovićeva kuća','Draškovićeva kula','Stara škola','Žitnica']],
['U kojoj se ulici nalaze očuvane tradicijske drvene kuće koje Turistička zajednica predstavlja kao etno-kuće?',['Ferenčakovoj ulici','Kolodvorskoj ulici','Zagrebačkoj ulici','Martinskoj ulici']],
['Koliko je visoka drvena skulptura svetog Martina postavljena pod starom crkvom na Martin Bregu?',['7 metara','3 metra','5 metara','10 metara']],
['Tko je izradio drvenu skulpturu svetog Martina na Martin Bregu?',['Josip Cikač','Ivan Meštrović','Antun Augustinčić','Dušan Džamonja']],
['Koja je tradicionalna manifestacija Dugog Sela posvećena očuvanju lokalne gastronomske baštine?',['Stara jela z Dugog Sela','Martinje u Tvrđi','Dani štrukli','Zlatna šajka']],
['Koja se manifestacija u gradskom vinogradu na Martin Bregu održava kao tradicionalni početak nove vinogradarske godine?',['Vincekovo','Fašnik','Uskrs kod Draškovića','Ljetni Martin']],
['Koja je manifestacija Dugog Sela povezana s pokladnim običajima?',['Dugoselski fašnik','Ljetni Martin','Vincekovo','Stara jela z Dugog Sela']],
['Koji je međunarodni hodočasničko-turistički put povezan s kultom svetog Martina, a Dugo Selo mu se pridružilo 2007. godine?',['Put svetog Martina','Via Francigena','Camino de Santiago','Via Adriatica']]
]};
const urls={'dugo-selo':'https://tzds.hr/'};
const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const all=[];Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified28_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[city]})));
global.PATRIA_CITY_VERIFIED_EXTRA_28=all;global.PatriaCityVerified28={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
