// PatriaSoul — provjerena gradska pitanja, nastavak 14.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'gospic':[
      ['Koje se naselje spominje u ispravi iz 1263. godine kao jedan od začetaka današnjeg Gospića?',['Kaseg/Kasezi','Cissa','Navalia','Arupium']],
      ['Koje je godine Gospić prvi put zabilježen kao naselje pod svojim imenom?',['1604.','1263.','1729.','1785.']],
      ['Koja je povijesna upravna institucija bila posebno važna za razvoj Gospića od 1729. godine?',['Lička i Otočka pukovnija','Senjska kapetanija','Križevačka županija','Mletačka uprava']],
      ['Koja je poznata hrvatska ličnost rođena u Gospiću?',['Ante Starčević','Ivan Gundulić','Marko Marulić','August Šenoa']]
    ],
    'novalja':[
      ['Na kojem se otoku nalazi Grad Novalja?',['Pagu','Rabu','Krku','Cresu']],
      ['Koji se antički grad na području sjeverozapadnog Paga posebno povezuje s poviješću Novalje?',['Cissa','Iovia','Tarsatica','Andautonia']],
      ['Kako se zove rimski akvedukt u Novalji, ukopan u stijenu?',['Talijanova buža','Rimski kanal','Novaljski vodovod','Cezarov tunel']],
      ['Kolika je približna očuvana duljina tunela novaljskog rimskog akvedukta?',['1042 m','420 m','2042 m','742 m']]
    ],
    'otocac':[
      ['Uz koju je rijeku smješten Otočac?',['Gacku','Liku','Kupu','Dobru']],
      ['Koje godine datira prva sačuvana darovnica kojom je Otočac darovan Dujmu II. Krčkom?',['1300.','1100.','1460.','1619.']],
      ['Koja je obitelj stoljećima bila povezana s Otočcem nakon darovnice iz 1300. godine?',['Frankopani','Zrinski','Erdődy','Šubići']],
      ['Koje je godine na brdu iznad Otočca izgrađena utvrda Fortica?',['1619.','1460.','1746.','1829.']]
    ],
    'orahovica':[
      ['Koje godine se Orahovica prvi put spominje u ispravi kralja Andrije II.?',['1228.','1241.','1357.','1543.']],
      ['Kako se zove najpoznatija srednjovjekovna utvrda povezana s Orahovicom?',['Ružica grad','Nehaj','Garić-grad','Cesargrad']],
      ['Koje su godine Turci zauzeli Orahovicu?',['1543.','1522.','1687.','1357.']],
      ['Na kojem se gorju nalazi Ružica grad iznad Orahovice?',['Papuku','Velebitu','Učki','Ivanščici']]
    ]
  };
  const urls={
    gospic:'https://gospic.hr/povijest/',
    novalja:'https://www.novalja.hr/db/db_dir/news/extra_dir/201120238416/strategija_zuo_grad_novalja.pdf',
    otocac:'https://discover-otocac.com/hr/o-nama/o-oto%C4%8Dcu',
    orahovica:'https://www.orahovica.hr/povijest-grada/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified14_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_14=all;
  global.PatriaCityVerified14={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
