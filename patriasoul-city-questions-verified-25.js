// PatriaSoul — provjerena gradska pitanja, nastavak 25.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'dubrovnik':[
      ['Koje je godine Zadarskim mirom započelo razdoblje dubrovačke političke samostalnosti pod zaštitom ugarsko-hrvatske krune?',['1358.','1205.','1380.','1808.']],
      ['Kako se nazivala srednjovjekovna država Dubrovnika?',['Respublica Ragusina','Respublica Veneta','Regnum Ragusinum','Communitas Dalmata']],
      ['Koje je godine Dubrovnik pogodio veliki katastrofalni potres?',['1667.','1571.','1808.','1358.']],
      ['Tko je 1808. ukinuo Dubrovačku Republiku?',['Napoleonova francuska vlast','Mletačka Republika','Habsburška Monarhija','Osmansko Carstvo']]
    ],
    'korcula':[
      ['Koje je godine donesen Korčulanski statut?',['1214.','1102.','1358.','1420.']],
      ['Kako se zove mačevalački ples koji je prema povijesnim dokumentima u Korčuli udomaćen najmanje od 1666. godine?',['Moreška','Kumpanija','Linđo','Alka']],
      ['U kojem je razdoblju Korčula bila u sastavu Mletačke Republike?',['1420.–1797.','1358.–1420.','1205.–1358.','1797.–1815.']],
      ['Koje se godine prema službenim podacima Grada Korčule prvi put spominje Moreška?',['1666.','1214.','1420.','1571.']]
    ],
    'metkovic':[
      ['Koje se godine Metković prvi put spominje u pisanom dokumentu?',['1422.','1256.','1494.','1718.']],
      ['Koji se antički grad razvio nedaleko od današnjeg Metkovića?',['Narona','Salona','Cibalae','Scardona']],
      ['Koje je godine svečano otvoren Arheološki muzej Narona?',['2007.','1995.','2004.','2015.']],
      ['Koja je prirodna rijeka temelj položaja i razvoja Metkovića?',['Neretva','Cetina','Krka','Zrmanja']]
    ],
    'opuzen':[
      ['Kako se prema jednoj poznatoj pretpostavci zvala mletačka tvrđava od koje je izvedeno ime Opuzen?',['Fort Opus','Fort Stjepan','Fort Posrednica','Fort Neretva']],
      ['Koje su godine Mlečani sagradili tvrđavu Fort Opus?',['1684.','1718.','1570.','1494.']],
      ['Kako se zove rijeka uz koju se nalazi Opuzen?',['Neretva','Cetina','Krka','Kupa']],
      ['Koji je svetac zaštitnik Grada Opuzena i gradski blagdan 3. kolovoza?',['sv. Stjepan Prvomučenik','sv. Vlaho','sv. Ilija','sv. Marko']]
    ]
  };
  const urls={
    dubrovnik:'https://www.dubrovnik.hr/uploads/pages/350/PLAN-UPRAVLJANJA-stari-grad-dubrovnik-HR.pdf',
    korcula:'https://www.korcula.hr/o-korculi/povijesni-pregled/',
    metkovic:'https://grad-metkovic.hr/grad-metkovic/o-gradu/',
    opuzen:'https://tz-opuzen.hr/povijest-opuzena/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified25_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_25=all;
  global.PatriaCityVerified25={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
