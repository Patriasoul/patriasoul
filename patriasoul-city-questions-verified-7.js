// PatriaSoul — provjerena gradska pitanja, nastavak 7.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'duga-resa':[
      ['Koje se godine Duga Resa prvi put spominje kao malo mjesto?',['1380.','1209.','1477.','1500.']],
      ['Koje je godine osnovana Pamučna industrija Duga Resa?',['1884.','1873.','1896.','1901.']],
      ['Koja rijeka predstavlja najpoznatiji prirodni simbol Duge Rese?',['Mrežnica','Kupa','Korana','Dobra']],
      ['Koje je godine Duga Resa dobila službeni status grada?',['1993.','1896.','1873.','1990.']]
    ],
    'ogulin':[
      ['S kojom je plemićkom obitelji povezano utemeljenje Ogulina?',['Frankopanima','Zrinskima','Erdődyjima','Šubićima']],
      ['Oko koje je godine Bernardin Frankopan dao izgraditi ogulinski kaštel?',['Oko 1500.','Oko 1400.','Oko 1600.','Oko 1700.']],
      ['Uz koju se rijeku nalazi Stari grad Ogulin?',['Dobru','Mrežnicu','Kupu','Koranu']],
      ['Koja je poznata hrvatska književnica rođena u Ogulinu?',['Ivana Brlić-Mažuranić','Marija Jurić Zagorka','Dragojla Jarnević','Jagoda Truhelka']]
    ],
    'ozalj':[
      ['Koje se godine ime Ozlja prvi put zapisuje u povijesnim izvorima?',['1244.','1209.','1258.','1398.']],
      ['Koja je velikaška obitelj preuzela Ozalj 1550. godine?',['Zrinski','Frankopani','Babonići','Erdődy']],
      ['Koji je ban Zrinski stolovao u Ozlju u 17. stoljeću?',['Petar Zrinski','Nikola Šubić Zrinski','Juraj IV. Zrinski','Nikola VII. Zrinski']],
      ['Koje su godine pogubljeni Petar Zrinski i Fran Krsto Frankopan?',['1671.','1667.','1683.','1699.']]
    ],
    'slunj':[
      ['Koje se godine Slunj prvi put spominje u pisanim izvorima kao utvrđeni grad?',['1390.','1323.','1409.','1579.']],
      ['Koja je plemićka obitelj izgradila Slunj kao jedno od svojih središta?',['Frankopani','Zrinski','Babonići','Erdődy']],
      ['Kako se zove poznato naselje na sutoku Slunjčice i Korane?',['Rastoke','Točak','Primišlje','Tržac']],
      ['Koje su godine hrvatske snage oslobodile Slunj u operaciji Oluja?',['1995.','1991.','1992.','1994.']]
    ]
  };
  const urls={'duga-resa':'https://dugaresa.hr/povijest-grada/','ogulin':'https://www.ogulin.hr/o-ogulinu/povijest/','ozalj':'https://ozalj.hr/o-gradu/','slunj':'https://slunj.hr/povijest/'};
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified7_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_7=all;
  global.PatriaCityVerified7={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
