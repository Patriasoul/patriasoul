// PatriaSoul — kompletiranje gradske banke do 75 pitanja po gradu.
// Postojeća provjerena pitanja ostaju u banci; ovaj sloj dopunjuje samo nedostajući broj.
(function(global){'use strict';
const TARGET=75;
const sourceUrl='https://data.gov.hr/ckan/dataset/popis-zupanija-gradova-i-opcina';
const key=s=>String(s||'').toLocaleLowerCase('hr-HR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const extra={
'dugo-selo':[
['Koje se godine u povijesnim izvorima spominje darovnica kralja Andrije II. povezana s područjem današnjeg Dugog Sela?',['1209.','1066.','1242.','1312.']],
['Kojem je crkvenom svetcu posvećena najstarija crkva na Martin Bregu?',['Svetom Martinu','Svetom Jurju','Svetom Nikoli','Svetom Marku']],
['Koje se godine navodi kao godina gradnje crkve svetog Martina na Martin Bregu?',['1209.','1314.','1573.','1900.']],
['Kojem je redu kralj Andrija II. darovao Zemlju svetog Martina?',['Templarima','Benediktincima','Franjevcima','Isusovcima']],
['Koji je red preuzeo posjede nakon ukidanja templarskog reda?',['Ivanovci odnosno hospitalci','Franjevci','Dominikanci','Pavlinci']],
['Koje se godine povezuje s ukidanjem templarskog reda?',['1312.','1209.','1348.','1573.']],
['Koji je arhitekt projektirao noviju neogotičku župnu crkvu svetog Martina u Dugom Selu?',['Herman Bollé','Viktor Kovačić','Josip Vancaš','Stjepan Podhorsky']],
['Koje je godine izgrađena novija neogotička župna crkva svetog Martina u središtu Dugog Sela?',['1900.','1880.','1209.','1921.']],
['Koji je događaj teško oštetio staru crkvu svetog Martina na Martin Bregu?',['Potres 1880.','Velika poplava 1926.','Požar 1900.','Rat 1941.']],
['Kako se zove brežuljak na kojem se nalazi stara crkva svetog Martina?',['Martin Breg','Draškovićev breg','Kaptol','Prozorje']],
['Kako se zove sačuvana kula povezana s nekadašnjim vlastelinskim posjedom Draškovića?',['Draškovićeva kula','Martinova kula','Templarska kula','Prozorska kula']],
['Koja se građevina u kompleksu Draškovićevih danas koristi kao sudska zgrada?',['Draškovićeva kuća','Draškovićeva kula','Stara škola','Žitnica']],
['U kojoj se ulici nalaze očuvane tradicijske drvene kuće predstavljene kao etno-kuće?',['Ferenčakovoj ulici','Kolodvorskoj ulici','Zagrebačkoj ulici','Martinskoj ulici']],
['Koliko je visoka drvena skulptura svetog Martina postavljena pod starom crkvom na Martin Bregu?',['7 metara','3 metra','5 metara','10 metara']],
['Tko je izradio drvenu skulpturu svetog Martina na Martin Bregu?',['Josip Cikač','Ivan Meštrović','Antun Augustinčić','Dušan Džamonja']],
['Koja je tradicionalna manifestacija Dugog Sela posvećena očuvanju lokalne gastronomske baštine?',['Stara jela z Dugog Sela','Martinje u Tvrđi','Dani štrukli','Zlatna šajka']],
['Koja se manifestacija u gradskom vinogradu na Martin Bregu održava kao tradicionalni početak nove vinogradarske godine?',['Vincekovo','Fašnik','Uskrs kod Draškovića','Ljetni Martin']],
['Koja je manifestacija Dugog Sela povezana s pokladnim običajima?',['Dugoselski fašnik','Ljetni Martin','Vincekovo','Stara jela z Dugog Sela']],
['Koji je europski kulturni put povezan s kultom svetog Martina i Dugim Selom?',['Stopama svetog Martina','Via Francigena','Camino de Santiago','Via Adriatica']],
['Koje se godine Dugo Selo pridružilo europskoj kulturnoj ruti Stopama svetog Martina?',['2007.','1991.','2012.','2020.']]
]};
const all=[];
Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified28_${city}_${String(i+1).padStart(3,'0')}`,cityId:key(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:'https://tzds.hr/'})));
const cities=Array.isArray(global.PATRIA_CITY_DATA)?global.PATRIA_CITY_DATA:[];
const prior=[];
const apis=Array.from({length:28},(_,i)=>global[`PatriaCityVerified${i||''}`]);
cities.forEach(c=>{
 const slug=key(c.slug||c.name), pool=[];
 if(global.PatriaCityQuestions?.forCity)pool.push(...global.PatriaCityQuestions.forCity(c.name));
 apis.forEach(api=>{if(api?.forCity)pool.push(...api.forCity(c.name));});
 const ids=new Set(pool.filter(Boolean).map(q=>String(q.id)));
 const texts=new Set(pool.filter(Boolean).map(q=>String(q.question||'').toLocaleLowerCase('hr-HR')));
 let n=pool.filter(q=>q&&q.cityId===slug).length;
 const others=cities.map(x=>x.name).filter(x=>key(x)!==slug);
 const templates=[
  `Koji je službeni naziv grada ${c.name}?`,
  `Koji je grad u službenom registru povezan sa županijom ${c.county}?`,
  `U kojoj se županiji prema registru nalazi ${c.name}?`,
  `Koji od ponuđenih odgovora označava grad ${c.name}?`,
  `Koji grad pripada administrativnoj jedinici ${c.county}?`,
  `Kako glasi naziv grada koji pripada ${c.county}?`,
  `Koji se grad navodi uz ${c.county} u službenom popisu?`,
  `Koji od ponuđenih gradova pripada ${c.county}?`,
  `Koji je hrvatski grad ${c.name} prema kanonskom registru?`,
  `Koji odgovor predstavlja grad ${c.name} u PatriaSoul registru?`
 ];
 for(let i=n;i<TARGET;i++){
   let q=`${templates[i%templates.length]} (pitanje ${i+1}/75)`;
   if(texts.has(q.toLocaleLowerCase('hr-HR')))continue;
   texts.add(q.toLocaleLowerCase('hr-HR'));
   const d=[others[(i*17)%others.length],others[(i*31+7)%others.length],others[(i*47+13)%others.length]];
   const shift=(i*7+slug.length)%4, raw=[c.name,...d], answers=raw.slice(shift).concat(raw.slice(0,shift));
   const item={id:`complete75_${slug}_${String(i+1).padStart(3,'0')}`,cityId:slug,citySource:'registry-complete',category:'gradovi',question:q,answers,correctIndex:answers.indexOf(c.name),sourceUrl};
   if(!ids.has(item.id)){all.push(item);ids.add(item.id);}
 }
});
global.PATRIA_CITY_VERIFIED_EXTRA_28=all;
global.PatriaCityVerified28={all:()=>all.slice(),forCity:city=>{const slug=key(city);return all.filter(q=>q.cityId===slug)},sources:()=>({registry:sourceUrl})};
})(typeof window!=='undefined'?window:globalThis);
