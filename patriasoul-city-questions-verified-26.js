// PatriaSoul — provjerena gradska pitanja, nastavak 26.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'ploce':[
      ['Na kojem je području smješten grad Ploče?',['U delti Neretve','U delti Cetine','Na otoku Korčuli','U Konavlima']],
      ['Koje je godine započela izgradnja luke Ploče?',['1939.','1918.','1945.','1952.']],
      ['S kojim je gradom Ploče željeznički povezane prugom preko doline Neretve?',['Sarajevom','Zagrebom','Splitom','Dubrovnikom']],
      ['Koja rijeka neposredno oblikuje područje ušća uz Ploče?',['Neretva','Krka','Zrmanja','Cetina']]
    ],
    'mursko-sredisce':[
      ['Uz koju rijeku se nalazi Mursko Središće?',['Muru','Dravu','Bednju','Kupu']],
      ['Koja je gospodarska djelatnost povijesno posebno obilježila Mursko Središće?',['Rudarstvo ugljena','Brodogradnja','Pomorstvo','Proizvodnja soli']],
      ['Koje je godine Mursko Središće dobilo status grada?',['1997.','1991.','2001.','1980.']],
      ['Kako se zove granični prijelaz prema Sloveniji u neposrednoj blizini Murskog Središća?',['Mursko Središće – Petišovci','Goričan – Letenye','Macelj – Gruškovje','Trnovec – Središče ob Dravi']]
    ],
    'prelog':[
      ['Uz koju se rijeku nalazi Prelog?',['Dravu','Muru','Kupu','Bednju']],
      ['Koje se godine Prelog prvi put spominje u pisanom izvoru?',['1264.','1209.','1334.','1402.']],
      ['Koji je status Prelog dobio 1997. godine?',['Status grada','Status županijskog središta','Status slobodne kraljevske luke','Status općine']],
      ['Koji je poznati vodeni prostor povezan s područjem Preloga?',['Akumulacijsko jezero HE Čakovec','Vransko jezero','Baćinska jezera','Modro jezero']]
    ],
    'zagreb':[
      ['Na kojoj se rijeci razvio Zagreb?',['Savi','Dravi','Kupi','Neretvi']],
      ['Koje su se dvije srednjovjekovne gradske cjeline razvile na zagrebačkom području?',['Gradec i Kaptol','Gornji i Donji grad','Kaptol i Dubrava','Gradec i Maksimir']],
      ['Koje je godine izdana Zlatna bula Bele IV. kojom je Gradec dobio status slobodnog kraljevskog grada?',['1242.','1094.','1217.','1358.']],
      ['Koja je gora neposredno iznad Zagreba?',['Medvednica','Papuk','Ivanščica','Žumberak']]
    ]
  };
  const urls={
    ploce:'https://ploce.hr/',
    'mursko-sredisce':'https://mursko-sredisce.hr/',
    prelog:'https://www.prelog.hr/',
    zagreb:'https://www.zagreb.hr/povijest-zagreba/941'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified26_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_26=all;
  global.PatriaCityVerified26={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
