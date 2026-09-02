// PatriaSoul — provjerena gradska pitanja, nastavak 16.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'pleternica':[
      ['Koje se godine Pleternica spominje pod imenom sv. Nikola?',['1335.','1270.','1427.','1536.']],
      ['Kako se Pleternica zvala u 15. stoljeću prije nego što je ponovno prihvatila ženski oblik imena?',['Pleternik','Pleternica Nova','Nikolinje','Pletergrad']],
      ['Koje su godine Osmanlije zauzele Pleternicu?',['1536.','1688.','1427.','1728.']],
      ['Uz koju je rijeku smještena Pleternica?',['Orljavu','Savу','Kupu','Česmu']]
    ],
    'benkovac':[
      ['Koje je godine Ivan Benković započeo gradnju utvrde koja je označila početak povijesti grada Benkovca?',['1468.','1409.','1527.','1683.']],
      ['Po kojoj je obitelji dobila ime utvrda i grad Benkovac?',['Benković','Šubić','Zrinski','Frankopan']],
      ['Koje je godine Benkovac zauzet od Osmanlija?',['1527.','1468.','1683.','1797.']],
      ['Koja je željeznička pruga izgrađena 1966. prolazila kroz Benkovac?',['Zadar–Knin','Split–Sinj','Šibenik–Drniš','Zagreb–Karlovac']]
    ],
    'biograd-na-moru':[
      ['Koje godine Biograd postaje hrvatskim kraljevskim gradom za vladavine Krešimira III.?',['1018.','1102.','1125.','1202.']],
      ['Koji je hrvatski kralj posebno povezan s razvojem Biograda u 11. stoljeću?',['Petar Krešimir IV.','Tomislav','Zvonimir','Stjepan Držislav']],
      ['Koje je godine mletačka vojska razorila Biograd?',['1125.','1018.','1202.','1409.']],
      ['Koji je poznati samostan na otoku Pašmanu povezan s benediktincima koji su nakon razaranja Biograda napustili grad?',['Sv. Kuzme i Damjana na Ćokovcu','Sv. Krševana','Sv. Marije','Sv. Mihovila']]
    ],
    'nin':[
      ['Kako se zvao rimski municipij na području današnjeg Nina?',['Aenona','Iovia','Andautonia','Asseria']],
      ['Koji se knez posebno povezuje s Ninom kao središtem srednjovjekovne hrvatske države?',['Branimir','Domagoj','Zdeslav','Muncimir']],
      ['Kako se zove predromanička crkva iz 9. stoljeća, jedan od simbola Nina?',['Sv. Križa','Sv. Anselma','Sv. Nikole','Gospe od Zečeva']],
      ['Koje je godine Nin dobio status grada nakon što mu je 1993. vraćen status općine?',['1997.','1993.','1982.','1409.']]
    ]
  };
  const urls={
    'pleternica':'https://pleternica.hr/wp-content/uploads/2025/03/Plan-upravljanja-destinacijom-Pleternica-za-razdoblje-2025.-2029.pdf',
    'benkovac':'https://benkovac.hr/o-benkovcu/povijest.html',
    'biograd-na-moru':'https://www.biogradnamoru.hr/o-biogradu/povijest-biograda',
    'nin':'https://grad-nin.hr/kultura/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified16_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_16=all;
  global.PatriaCityVerified16={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
