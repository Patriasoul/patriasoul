// PatriaSoul — provjerena gradska pitanja, nastavak 10.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'djurdjevac':[
      ['Koje se godine Đurđevac prvi put spominje?',['1237.','1253.','1397.','1532.']],
      ['Kako se zove poznata srednjovjekovna utvrda u središtu Đurđevca?',['Stari grad','Nehaj','Garić-grad','Cesargrad']],
      ['Koja je obitelj bila vlasnik Đurđevca u vrijeme osmanske prijetnje početkom 16. stoljeća?',['Ernušt','Zrinski','Frankopani','Erdődy']],
      ['Koji je prirodni fenomen posebno poznat u okolici Đurđevca?',['Đurđevački pijesci','Kopački rit','Crveno jezero','Modro jezero']]
    ],
    'cazma':[
      ['Koji je crkveni kaptol povijesno bio smješten u Čazmi?',['Čazmanski kaptol','Zagrebački kaptol','Splitski kaptol','Senjski kaptol']],
      ['Koji je narod u 16. stoljeću zauzeo Čazmu i ondje osnovao sandžak?',['Osmanlije','Mlečani','Napoleonove postrojbe','Tatari']],
      ['Čime je Čazma bila posebno važna u srednjem vijeku?',['Crkvenim i strateškim središtem','Pomorskom lukom','Rudarskim središtem','Kraljevskom prijestolnicom']],
      ['Uz koju se rijeku nalazi današnji grad Čazma?',['Česmu','Dravu','Kupu','Muru']]
    ],
    'garesnica':[
      ['Koje se godine Garešnica prvi put spominje u povijesnim izvorima?',['1257.','1242.','1277.','1334.']],
      ['Što je osnovano u Garešnici 1334. godine?',['Župa sv. Marije','Kapetanija','Kraljevski sud','Pavlinski samostan']],
      ['Kojoj je regimenti Garešnica pripala nakon preustroja 1746. godine?',['Križevačkoj regimenti','Đurđevačkoj pukovniji','Slunjskoj regimenti','Senjskoj kapetaniji']],
      ['Koje je godine Garešnica dobila status grada?',['1997.','1871.','1910.','1993.']]
    ],
    'grubisno-polje':[
      ['Koji se toponim prvi put bilježi 1272. na području današnjeg Grubišnog Polja?',['Zdencz','Grubisinez','Imbrino Polje','Bilogora']],
      ['Koje se godine u izvorima prvi put spominje trgovište Grubisinez?',['1457.','1272.','1478.','1539.']],
      ['Koje je godine otvorena željeznička pruga Pavlovac–Dražica–Grubišno Polje?',['1913.','1876.','1897.','1909.']],
      ['Na kojem se gorju nalazi Grubišno Polje?',['Bilogori','Moslavačkoj gori','Ivanščici','Papuku']]
    ]
  };
  const urls={
    djurdjevac:'https://djurdjevac.hr/o-durdevcu/povijest/',
    cazma:'https://www.cazma.hr/index.php/grad-cazma',
    garesnica:'https://www.garesnica.garesnica.hr/',
    grubisno-polje:'https://grubisnopolje.hr/o-grubisnom-polju/detaljnije/povijest'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified10_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_10=all;
  global.PatriaCityVerified10={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
