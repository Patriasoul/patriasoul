// PatriaSoul — provjerena gradska pitanja, nastavak 5.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    sveti_ivan_zelina:[
      ['Koje se godine prvi put pisano spominje ime Zelina?',['1185.','1200.','1242.','1328.']],
      ['Koje je godine Zelina dobila povlastice slobodnog kraljevskog trgovišta?',['1328.','1257.','1397.','1450.']],
      ['Koji hrvatski pjesnik rođen u zelinskom kraju nosi ime Dragutin Domjanić?',['Dragutin Domjanić','Antun Gustav Matoš','August Šenoa','Silvije Strahimir Kranjčević']],
      ['Koja je poznata srednjovjekovna utvrda povezana sa Svetim Ivanom Zelinom?',['Zelingrad','Medvedgrad','Trakošćan','Dubovac']]
    ],
    zapresic:[
      ['Koje je godine zabilježen najstariji pisani spomen zaprešićkoga kraja?',['1209.','1185.','1242.','1328.']],
      ['Koji se kompleks u Zaprešiću povezuje s banom Josipom Jelačićem?',['Novi dvori','Stari grad','Lužnica','Kamenita vrata']],
      ['Koja je povijesna prometnica prolazila zaprešićkim krajem u rimsko doba?',['Emona–Neviodunum–Siscia','Salona–Siscia','Mursa–Sirmij','Tarsatica–Siscia']],
      ['Uz koju se rijeku nalazi Zaprešić?',['Savu','Dravu','Kupu','Dunav']]
    ],
    velika_gorica:[
      ['Koje se godine Velika Gorica prvi put spominje kao sjedište župe?',['1228.','1209.','1242.','1328.']],
      ['U kojoj se hrvatskoj povijesno-geografskoj regiji nalazi Velika Gorica?',['Turopolju','Moslavini','Hrvatskom zagorju','Posavini']],
      ['Koje je godine osnovana Hrvatska čitaonica u Velikoj Gorici?',['1885.','1876.','1862.','1900.']],
      ['Koji muzej se nalazi u tzv. Turopoljskom gradu?',['Muzej Turopolja','Muzej Mimara','Muzej Slavonije','Arheološki muzej Istre']]
    ],
    sveta_nedelja:[
      ['Koje je razdoblje potvrđeno arheološkim nalazima kao dio najstarije poznate naseljenosti Svete Nedelje?',['Rimsko doba','Brončano doba','Srednji vijek','Barok']],
      ['Koji je rimski prometni pravac prolazio područjem današnje Svete Nedelje?',['Emona–Siscia','Salona–Narona','Siscia–Mursa','Aquileia–Tarsatica']],
      ['U kojem je današnjem naselju pronađena vrijedna rimska brončana fibula na području Svete Nedelje?',['Jagnjić Dol','Rakitje','Kerestinec','Novaki']],
      ['Koji je važan rimski lokalitet posebno istaknut u povijesti Svete Nedelje?',['Kerestinec','Komin','Siscia','Andautonija']]
    ]
  };
  const urls={
    sveti-ivan-zelina:'https://www.visitzelina.hr/sveti-ivan-zelina/item/59-povijest',
    zapresic:'https://zapresic.hr/upoznajte-zapresic/',
    velika-gorica:'https://gorica.hr/povijest/',
    sveta-nedelja:'https://www.svetanedelja.hr/povijest-c2'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified5_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_5=all;
  global.PatriaCityVerified5={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
