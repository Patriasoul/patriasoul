// PatriaSoul — provjerena gradska pitanja, nastavak 6.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'donja-stubica':[
      ['Koje se godine Stubica prvi put spominje u povelji ugarskog kralja Andrije II.?',['1209.','1185.','1242.','1334.']],
      ['Koji je povijesni događaj 1573. snažno obilježio Stubicu?',['Seljačka buna Matije Gupca','Krvavi sabor križevački','Zrinsko-frankopanska urota','Bitka kod Siska']],
      ['Kako se zove povijesni kompleks povezan s velikaškim obiteljima na području Donje Stubice?',['Dvorac Golubovec','Novi dvori Jelačićevi','Cesargrad','Stari grad Ozalj']],
      ['Koji je poznati pripravak proizvodio ljekarnik Eugen Viktor Feller u Donjoj Stubici?',['Elsa-fluid','Kalodont','Pliva 45','Andol']]
    ],
    'klanjec':[
      ['Koje se godine Klanjec prvi put javlja u povijesnim dokumentima?',['1463.','1399.','1521.','1598.']],
      ['Kako se zove utvrda čiji se ostaci nalaze iznad Klanjca?',['Cesargrad','Kostelgrad','Lukavec','Medvedgrad']],
      ['Koja je plemićka obitelj gotovo četiri stoljeća bila gospodar kraja oko Cesargrada?',['Erdődy','Zrinski','Frankopan','Keglević']],
      ['Koji je znameniti hrvatski kipar rođen u Klanjcu?',['Antun Augustinčić','Ivan Meštrović','Frano Kršinić','Robert Frangeš-Mihanović']]
    ],
    'oroslavje':[
      ['Koje se godine ime Oroslavje prvi put pojavljuje u poznatim povijesnim izvorima?',['1477.','1334.','1209.','1598.']],
      ['Koje su plemićke obitelji među najvažnijima za povijest Oroslavja?',['Vojković-Vojkffy, Čikulini i Sermage','Zrinski, Frankopan i Šubić','Erdődy, Keglević i Drašković','Pejačević, Jelačić i Oršić']],
      ['Koji je oroslavski dvorac izgorio 1949. godine?',['Oroslavje Gornje','Oroslavje Donje','Dvorac Bežanec','Dvorac Gorica']],
      ['Uz koji se povijesni dvorac danas najviše veže očuvana baština Oroslavja?',['Oroslavje Donje','Cesargrad','Novi Dvori','Kostelgrad']]
    ],
    'pregrada':[
      ['Koje se godine ime Pregrada prvi put spominje u popisu župa arhiđakona Ivana Goričkog?',['1334.','1209.','1598.','1818.']],
      ['Koja je utvrda povezana s poviješću Pregrade i obitelji Keglević?',['Kostelgrad','Cesargrad','Lukavec','Medvedgrad']],
      ['Kako se popularno naziva župna crkva Uznesenja Blažene Djevice Marije u Pregradi?',['Zagorska katedrala','Mala zagorska bazilika','Kostelska crkva','Vinagorska katedrala']],
      ['Koje je godine dovršena gradnja crkve Uznesenja Blažene Djevice Marije u Pregradi?',['1818.','1708.','1842.','1857.']]
    ]
  };
  const urls={
    'donja-stubica':'https://www.donjastubica.hr/povijest/',
    'klanjec':'https://www.klanjec.hr/o-nama/povijest/',
    'oroslavje':'https://oroslavje.hr/grad/povijest-oroslavja/',
    'pregrada':'https://www.pregrada.hr/node/51'
  };
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified6_${city}_${String(i+1).padStart(3,'0')}`,cityId:city,citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[city]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_6=all;
  global.PatriaCityVerified6={all:()=>all.slice(),forCity:city=>{const slug=String(city).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
