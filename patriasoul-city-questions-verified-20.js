// PatriaSoul — provjerena gradska pitanja, nastavak 20.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'vodice':[
      ['Koje se godine Vodice prvi put spominju u jednom šibenskom zapisu?',['1402.','1251.','1493.','1646.']],
      ['Koja je crkva povezana s početkom nastanka današnjih Vodica?',['Crkva sv. Križa','Crkva sv. Ilije','Crkva sv. Ivana','Crkva sv. Roka']],
      ['Koje je godine izgrađen Čorićev toranj u Vodicama?',['1646.','1402.','1521.','1749.']],
      ['Koje je godine Vodice postale samostalna općina?',['1891.','1878.','1906.','1746.']]
    ],
    'ilok':[
      ['Koje se godine ime Ilok prvi put spominje u pisanim izvorima?',['1267.','1228.','1332.','1401.']],
      ['Kako se zvala rimska pogranična utvrda na području današnjeg Iloka?',['Cuccium','Cibalae','Iader','Scardona']],
      ['Koji je plemić posebno povezan s razvojem srednjovjekovnog Iloka u 15. stoljeću?',['Nikola Iločki','Petar Zrinski','Ivan Morović','Bernardin Frankopan']],
      ['Po kojoj je sorti vina Ilok posebno poznat?',['Iločkom tramincu','Pošipu','Malvaziji istarskoj','Plavcu malom']]
    ],
    'otok':[
      ['Od kojeg se stoljeća Otok u povijesnim izvorima spominje kao vlastelinstvo?',['13. stoljeća','11. stoljeća','15. stoljeća','17. stoljeća']],
      ['Koja je rijeka posebno povezana s položajem Otoka i njegove bosutske nizine?',['Bosut','Drava','Dunav','Sava']],
      ['Koja je prapovijesna kultura potvrđena arheološkim istraživanjima na Gradini kod Otoka?',['Sopotsko-lenđerska kultura','Vučedolska kultura','Starčevačka kultura','Korenovska kultura']],
      ['Koje se godine u povijesnim zapisima pojavljuje oblik imena Oppidum Athak?',['1473.','1428.','1464.','1478.']]
    ],
    'vinkovci':[
      ['Kako se zvao antički rimski grad na području današnjih Vinkovaca?',['Cibalae','Mursa','Sirmium','Iader']],
      ['Koja su dva rimska cara rođena u Cibalama?',['Valentinijan I. i Valens','Konstantin i Licinije','Dioklecijan i Maksimijan','Trajan i Hadrijan']],
      ['Koje je godine Vinkovci dobili status vojnog komuniteta?',['1766.','1780.','1745.','1809.']],
      ['Koje se ime uz Sveti Ilija pojavljuje na starim kartama kao narodno ime današnjih Vinkovaca?',['Vinko/Vinkovci','Cibalae','Zenthelye','Athak']]
    ]
  };
  const urls={
    vodice:'https://www.vodice.hr/hr/o-vodicama/povijest-vodica',
    ilok:'https://www.ilok.hr/o-iloku/',
    otok:'https://www.otok.hr/hr/povijest-otoka',
    vinkovci:'https://www.vinkovci.hr/povijest-grada'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified20_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_20=all;
  global.PatriaCityVerified20={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
