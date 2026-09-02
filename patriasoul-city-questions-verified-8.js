// PatriaSoul — provjerena gradska pitanja, nastavak 8.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'zabok':[
      ['Koje se godine ime Zabok prvi put pojavljuje u poznatim pisanim dokumentima?',['1335.','1242.','1345.','1397.']],
      ['Koji je ugarsko-hrvatski kralj 1335. darovao posjed Zabok Petru, sinu Nuzlina?',['Karlo I.','Ljudevit I.','Bela IV.','Matija Korvin']],
      ['Koja je župna crkva u Zaboku posvećena svetici?',['Sv. Jeleni Križarici','Sv. Ani','Sv. Katarini','Sv. Margareti']],
      ['Koje je godine Zabok dobio status grada?',['1993.','1886.','1910.','2000.']]
    ],
    'zlatar':[
      ['Kako glasi najstariji do sada poznati oblik imena Zlatar?',['Zlatharia','Zlataria','Zlatarium','Aurelia']],
      ['Koje je godine kralj Leopold dodijelio Zlataru pravo održavanja sajmova?',['1659.','1598.','1699.','1762.']],
      ['Koje je godine središte crkvene župe preneseno iz Martinščine u Zlatar?',['1699.','1659.','1762.','1842.']],
      ['Koje je godine Zlatar postao središte podžupanije?',['1875.','1868.','1886.','1907.']]
    ],
    'popovaca':[
      ['Uz koju se srednjovjekovnu utvrdu razvila Popovača?',['Moslavinagrad','Jelengrad','Garićgrad','Košutagrad']],
      ['Od koje se godine Moslavinagrad spominje u povijesnim izvorima prema Gradu Popovači?',['1316.','1242.','1397.','1545.']],
      ['Koja je plemićka obitelj 1746. započela gradnju novog dvorca uz ruševine Moslavinagrada?',['Erdődy','Zrinski','Frankopan','Keglević']],
      ['Koje je godine Popovača dobila željezničku prugu?',['1897.','1886.','1907.','1913.']]
    ],
    'ivanec':[
      ['Po kojoj je prirodnoj znamenitosti Ivanec posebno povezan s Ivanščicom?',['Planinom Ivanščicom','Rijekom Dravom','Kamenitim otokom','Moslavačkom gorom']],
      ['Koja je povijesna utvrda smještena na području Ivanščice iznad Ivanca?',['Grebengrad','Nehaj','Medvedgrad','Trsat']],
      ['Koja je plemićka obitelj bila povezana s posjedom i razvojem Ivanca?',['Gisingovci','Zrinski','Frankopani','Erdődy']],
      ['Koji je status Ivanec dobio 1997. godine?',['Status grada','Status županijskog sjedišta','Status slobodnog kraljevskog grada','Status biskupskog sjedišta']]
    ]
  };
  const urls={
    zabok:'https://www.zabok.hr/povijest-zaboka/',
    zlatar:'https://zlatar.hr/povijest/',
    popovaca:'https://www.popovaca.hr/o-gradu-popovaca/povijest/2169-povijest',
    ivanec:'https://ivanec.hr/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified8_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_8=all;
  global.PatriaCityVerified8={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
