// PatriaSoul — provjerena gradska pitanja, nastavak 23.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'pula':[
      ['Kako se zvala rimska kolonija na području današnje Pule?',['Colonia Pietas Iulia Pola','Colonia Iader','Colonia Salona','Colonia Tarsatica']],
      ['Koje je godine otvoren Arsenal u Puli, glavna baza austrijske ratne mornarice?',['1856.','1815.','1876.','1884.']],
      ['Koji je veliki antički spomenik jedan od najpoznatijih simbola Pule?',['Pulska Arena','Dioklecijanova palača','Eufrazijeva bazilika','Katedrala sv. Stošije']],
      ['Kako se zove ranokršćanska bazilika u Puli podignuta u drugoj polovici VI. stoljeća?',['Sv. Marija Formosa','Sv. Donat','Sv. Eufemija','Sv. Juraj']]
    ],
    'porec':[
      ['Koja je najpoznatija ranokršćanska građevina u Poreču, zaštićena kao UNESCO-va baština?',['Eufrazijeva bazilika','Katedrala sv. Vida','Crkva sv. Donata','Sv. Marija Formosa']],
      ['Koje je godine osnovan Zavičajni muzej Poreštine?',['1884.','1856.','1895.','1910.']],
      ['Tko je 1845. napisao prvi vodič kroz grad Poreč?',['Pietro Kandler','Iginio Scarpa','Domenico Martinelli','Juraj Dobrila']],
      ['Koje je godine na otoku Sv. Nikola uređeno prvo porečko morsko kupalište?',['1895.','1886.','1910.','1876.']]
    ],
    'rovinj':[
      ['Kako se Rovinj navodi u djelu Ravenskog Anonimusa iz VII. stoljeća?',['Castrum Rubini','Colonia Pola','Arba','Albona']],
      ['Koje se godine Rovinj priklonio Mletačkoj Republici?',['1283.','1188.','1379.','1595.']],
      ['Koje je godine prvi vlak iz Kanfanara stigao u Rovinj?',['1876.','1859.','1888.','1906.']],
      ['Koje je godine Rovinj, prema službenoj gradskoj povijesti, postao grad na poluotoku nakon zatrpavanja kanala?',['1763.','1650.','1797.','1821.']]
    ],
    'umag':[
      ['Kako se zvao antički oblik imena Umaga?',['Humagum','Scardona','Cibalae','Iovia']],
      ['Koje je godine Umag oslobođen na kraju Drugog svjetskog rata?',['1945.','1943.','1947.','1954.']],
      ['Koje godine Umag dobiva status grada?',['1997.','1991.','1995.','2001.']],
      ['Koje je godine u Umagu izgrađen hotel-restoran Al Cervo d’oro, povezan sa začecima organiziranog turizma?',['1877.','1884.','1891.','1905.']]
    ]
  };
  const urls={
    pula:'https://www.pula.hr/hr/o-puli-pola/povijest-pule/',
    porec:'https://www.porec.hr/prva.aspx?stranica=25',
    rovinj:'https://www.rovinj-rovigno.hr/o-rovinju/povijest/',
    umag:'https://umag.hr/o-umagu/povijest'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified23_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_23=all;
  global.PatriaCityVerified23={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
