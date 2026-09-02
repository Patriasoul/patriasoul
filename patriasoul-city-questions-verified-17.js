// PatriaSoul — provjerena gradska pitanja, nastavak 17.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'obrovac':[
      ['Koje se godine današnje naselje Obrovac prvi put spominje u ispravama?',['1337.','1242.','1401.','1527.']],
      ['Koja je plemićka obitelj u srednjem vijeku bila posebno povezana s Obrovcem?',['Kurjakovići','Frankopani','Zrinski','Erdődy']],
      ['Koji je poznati glagoljski kodeks iz 1401./1402. povezan s obrovačkim područjem?',['Berlinski misal','Hrvojev misal','Misal po zakonu rimskoga dvora','Senjski glagoljski misal']],
      ['Koje je godine Obrovac oslobođen od Osmanlija pod vodstvom Stojana Jankovića?',['1687.','1647.','1527.','1797.']]
    ],
    'pag':[
      ['Koje je godine Bela IV. Pagu podario povelju slobodnog kraljevskog grada?',['1244.','1192.','1393.','1443.']],
      ['Koje je godine utemeljen novi grad Pag na današnjem položaju?',['1443.','1244.','1433.','1474.']],
      ['Koji je hrvatski graditelj izradio urbanistički plan novoga Paga?',['Juraj Dalmatinac','Andrija Aleši','Radovan','Mihovil Kampor']],
      ['Po kojem je proizvodu Pag posebno poznat kao dio svoje tradicijske baštine?',['Paškoj čipki','Lepoglavskoj čipki','Konavoskom vezu','Tradicijskom drvorezbarstvu']]
    ],
    'zadar':[
      ['Koje je antičko ilirsko pleme živjelo na području Zadra i sjeverne Dalmacije?',['Liburni','Histri','Japodi','Delmati']],
      ['Kako se zvao rimski grad na području današnjeg Zadra?',['Iader','Salona','Tarsatica','Mursa']],
      ['Koja je poznata predromanička crkva jedan od simbola Zadra?',['Sv. Donat','Sv. Križ u Ninu','Sv. Eufemija','Sv. Juraj u Pagu']],
      ['Koja je zadarska znamenitost upisana na UNESCO-ov Popis svjetske baštine kao dio obrambenog sustava iz doba Mletačke Republike?',['Zadarski obrambeni sustav','Morske orgulje','Forum','Pozdrav Suncu']]
    ],
    'beli-manastir':[
      ['Kako se naselje Beli Manastir spominje 1212. godine?',['Pél','Bell','Monostor','Pélmonostor']],
      ['Koje je godine Moys de Daro na svojem imanju u Pélu dao sagraditi samostan?',['1227.','1212.','1333.','1375.']],
      ['Koje je godine Beli Manastir postao općinskim središtem u sastavu Hrvatske?',['1945.','1923.','1918.','1991.']],
      ['Tko je zaštitnik grada Belog Manastira?',['Sveti Martin','Sveti Mihovil','Sveti Juraj','Sveti Ivan Krstitelj']]
    ]
  };
  const urls={
    'obrovac':'https://obrovac.hr/grad-obrovac/grad-obrovac/povijest',
    'pag':'https://www.pag.hr/o-pagu/povijest/19-povijest.html',
    'zadar':'https://www.zadar.hr/hr/dozivljaji/povijest-i-kultura',
    'beli-manastir':'https://www.beli-manastir.hr/beli-manastir/povijest/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified17_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_17=all;
  global.PatriaCityVerified17={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
