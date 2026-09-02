// PatriaSoul — provjerena gradska pitanja, nastavak 13.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'opatija':[
      ['Koje je godine Iginio Scarpa izgradio Villu Angiolinu, čime počinje razvoj turizma u Opatiji?',['1844.','1873.','1884.','1889.']],
      ['Koje je godine otvoren Hotel Kvarner, prvi hotel na jadranskoj obali prema opatijskim turističkim izvorima?',['1884.','1844.','1889.','1908.']],
      ['Koje je godine Opatija proglašena carskim klimatskim lječilištem Austro-Ugarske Monarhije?',['1889.','1873.','1884.','1906.']],
      ['Po kojem je benediktinskom samostanu Opatija dobila ime?',['Sv. Jakova','Sv. Vida','Sv. Eufemije','Sv. Petra']]
    ],
    'rab':[
      ['Kako se u antičko rimsko doba zvao grad Rab?',['Arba','Tarsatica','Iovia','Senia']],
      ['Koji je hrvatski kralj potvrdio darovnicu rapskog biskupa Draga benediktincima 16. svibnja 1070.?',['Petar Krešimir IV.','Tomislav','Zvonimir','Branimir']],
      ['Koje je godine sagrađena Gradska loža u Rabu prema službenim gradskim podacima?',['1509.','1070.','1332.','1797.']],
      ['Koja je tradicija posebno povezana s Rabom i njegovom kulturnom baštinom?',['Višestoljetna hrvatsko-glagoljaška tradicija','Tradicija nijemog kola','Dubrovačka renesansna tradicija','Istarska glazbena tradicija']]
    ],
    'rijeka':[
      ['Kako se zvalo rimsko urbano naselje na području današnjeg riječkog Starog grada?',['Tarsatica','Arba','Aquae Iasae','Iovia']],
      ['Koje su godine Habsburgovci preuzeli Rijeku?',['1466.','1242.','1527.','1776.']],
      ['Koje je godine Rijeka i Sušak administrativno udružena u jedan grad?',['1948.','1945.','1924.','1993.']],
      ['Koje je godine Rijeci dodijeljena titula Europske prijestolnice kulture za 2020.?',['2016.','2010.','2018.','2020.']]
    ],
    'vrbovsko':[
      ['Koje se godine Vrbovsko prvi put spominje zajedno s Lukovdolom i Moravicama u ispravi?',['1481.','1399.','1242.','1785.']],
      ['Koja je velika plemićka obitelj u 15. stoljeću navedena kao vlasnik i gospodar vrbovskog kraja?',['Frankopani','Zrinski','Erdődy','Šubići']],
      ['Koje je godine Josip II. dodijelio Vrbovskom položaj povlaštenog kraljevskog trgovišta?',['1785.','1776.','1809.','1886.']],
      ['Koje je godine Vrbovsko dobilo status grada prema službenim podacima?',['1997.','1993.','2001.','1985.']]
    ]
  };
  const urls={
    opatija:'https://www.visitopatija.com/upoznajte-opatiju/povijest',
    rab:'https://www.rab.hr/povijest-raba-novo/',
    rijeka:'https://www.rijeka.hr/gradska-uprava/povijest-rijeke/',
    vrbovsko:'https://www.vrbovsko.hr/grad-vrbovsko/povijest-grada'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified13_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_13=all;
  global.PatriaCityVerified13={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
