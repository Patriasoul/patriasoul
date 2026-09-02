// PatriaSoul — provjerena gradska pitanja, nastavak 4.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    vrbovec:[
      ['Koje se godine Vrbovec prvi put spominje u pisanom tragu?',['1244.','1193.','1257.','1398.']],
      ['Koji je kralj izdao ispravu iz 1244. godine u kojoj se spominje Vrbovec?',['Bela IV.','Andrija II.','Ladislav IV.','Matija Korvin']],
      ['Koje je godine u Vrbovec stigla željeznica?',['1870.','1848.','1888.','1900.']],
      ['Koja je poznata obitelj u 16. i 17. stoljeću branila Vrbovec od Osmanlija?',['Zrinski','Frankopani','Erdődy','Šubići']]
    ],
    jastrebarsko:[
      ['Koje se godine Jastrebarsko prvi put spominje u ispravi bana Stjepana?',['1249.','1257.','1193.','1268.']],
      ['Koje je godine kralj Bela IV. dodijelio Jastrebarskom povlastice slobodnog kraljevskog trgovišta?',['1257.','1249.','1270.','1397.']],
      ['Po kome je Jastrebarsko dobilo ime?',['Po jastrebarima, uzgajivačima lovnih ptica','Po rijeci Jastrebici','Po kralju Jastrebu','Po tvrđavi Jastreb']],
      ['Koja je vlastelinska obitelj snažno utjecala na Jastrebarsko od 1519. do 1848.?',['Erdődy','Zrinski','Frankopan','Pejačević']]
    ],
    ivanic_grad:[
      ['Koje se godine Ivanić-Grad prvi put spominje u pisanim zapisima?',['1246.','1209.','1257.','1314.']],
      ['Iz čega se razvilo naselje Ivanić-Grad?',['Iz ivanićke tvrđave','Iz samostana templara','Iz rimskog logora','Iz srednjovjekovnog kaštela Zrinskih']],
      ['Uz koju se rijeku razvila ivanićka tvrđava?',['Lonju','Savu','Kupu','Česmu']],
      ['Koji je graditeljski element podignut u Ivanić-Gradu u prvoj polovici 16. stoljeća radi obrane?',['Tvrđava','Katedrala','Most','Gradska vijećnica']]
    ],
    dugo_selo:[
      ['Koje se godine u darovnici kralja Andrije II. spominje Zemlja sv. Martina na području današnjeg Dugog Sela?',['1209.','1244.','1257.','1312.']],
      ['Kojem je viteškom redu 1209. darovana Zemlja sv. Martina?',['Templarima','Ivanovcima','Benediktincima','Pavlinima']],
      ['Na kojem se brežuljku nalazi stara crkva sv. Martina?',['Martin Bregu','Medvednici','Tepecu','Kleku']],
      ['Koji je europski kulturni put povezan sa starom crkvom sv. Martina u Dugom Selu?',['Put sv. Martina','Via Francigena','Camino de Santiago','Put sv. Jakova']]
    ]
  };
  const urls={
    vrbovec:'https://vrbovec.hr/author/miki-dev/page/37/',
    jastrebarsko:'https://jastrebarsko.hr/posjetitelji/jaska_kroz_povijest/povijest_jaske/',
    ivanic-grad:'https://ivanic-grad.hr/grad/povijest',
    dugo-selo:'https://dugoselo.hr/nastavak-arheoloskih-istrazivanja-na-martinu-ususret-proslosti/'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified4_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_4=all;
  global.PatriaCityVerified4={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
