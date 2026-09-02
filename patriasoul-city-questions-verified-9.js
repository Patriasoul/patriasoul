// PatriaSoul — provjerena gradska pitanja, nastavak 9.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'lepoglava':[
      ['Koje se godine Lepoglava prvi put spominje u povijesnim dokumentima?',['1399.','1209.','1242.','1503.']],
      ['Koji je red osnovao samostan u Lepoglavi početkom 15. stoljeća?',['Pavlini','Franjevci','Dominikanci','Benediktinci']],
      ['Koje je godine pavlinski seminar u Lepoglavi prerastao u prvu javnu gimnaziju u Hrvatskoj?',['1582.','1503.','1656.','1674.']],
      ['Po kojem je tradicijskom proizvodu Lepoglava posebno poznata?',['Lepoglavskoj čipki','Paškoj čipki','Hvarskoj čipki','Konavoskom vezu']]
    ],
    'ludbreg':[
      ['Kako se zvalo rimsko naselje na području današnjeg Ludbrega?',['Iovia','Aquae Iasae','Andautonia','Mursa']],
      ['Koje se godine dovršava gradnja današnje župne crkve u Ludbregu prema gradskoj povijesti?',['1410.','1244.','1556.','1635.']],
      ['Koja je plemićka obitelj od 1635. godine bila vlasnik Ludbrega?',['Erdődy','Zrinski','Frankopani','Batthyány']],
      ['Uz koju je rijeku Ludbreg povijesno nastao na važnom prijelazu?',['Bednju','Dravu','Muru','Kupu']]
    ],
    'novi-marof':[
      ['Koja se srednjovjekovna utvrda posebno povezuje s poviješću područja Novog Marofa?',['Grebengrad','Nehaj','Ozalj','Trsat']],
      ['Koja je plemićka obitelj u 17. stoljeću povezana s Grebengradom i kasnijim razvojem novomarofskog kraja?',['Erdődy','Frankopan','Zrinski','Šubić']],
      ['Koje je godine Novi Marof dobio status grada?',['1997.','1990.','2001.','1985.']],
      ['Koliko naselja danas obuhvaća Grad Novi Marof?',['23','12','18','31']]
    ],
    'varazdinske-toplice':[
      ['Kako se zvalo rimsko naselje na području današnjih Varaždinskih Toplica?',['Aquae Iasae','Iovia','Siscia','Andautonia']],
      ['Kako su Rimljani nazvali termalni kompleks koji je bio lječilište, svetište i kupalište?',['Aquae Iasae','Colonia Iulia','Andautonia','Siscia']],
      ['Koliko je približno iznosila temperatura termalne vode na mjestu izvora prema gradskim podacima?',['58 °C','38 °C','78 °C','28 °C']],
      ['Koje su godine Varaždinske Toplice dobile status grada?',['1997.','1875.','1953.','2001.']]
    ]
  };
  const urls={
    lepoglava:'https://www.lepoglava.hr/povijest-lepoglave/',
    ludbreg:'https://ludbreg.hr/o-ludbregu/',
    novi-marof:'https://www.novi-marof.hr/',
    varazdinske-toplice:'https://www.varazdinske-toplice.hr/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified9_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_9=all;
  global.PatriaCityVerified9={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
