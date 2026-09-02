// PatriaSoul — provjerena gradska pitanja, nastavak 22.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'komiza':[
      ['Na kojem se otoku nalazi grad Komiža?',['Visu','Hvaru','Braču','Šolti']],
      ['Koja je gospodarska djelatnost posebno obilježila povijest Komiže?',['Ribarstvo','Rudarstvo','Solinarstvo','Vinogradarstvo']],
      ['Kako se zove tradicionalna komiška ribarska brodica?',['Falkuša','Gajeta','Trabakul','Bracera']],
      ['Koji je prirodni zaljev neposredno povezan s položajem Komiže?',['Komiški zaljev','Starogradski zaljev','Viška luka','Lučica Palmižana']]
    ],
    'buje':[
      ['Između kojih se rijeka nalazi područje Grada Buja?',['Mirne i Dragonje','Raše i Mirne','Dragonje i Raše','Pazinčice i Mirne']],
      ['Koje je godine Buje potpisalo čin predaje Mletačkoj Republici?',['1412.','1427.','1200.','1548.']],
      ['Koje je godine proglašen Statut grada Buja?',['1427.','1412.','1234.','1548.']],
      ['Koji je kaštel na području Buja u literaturi spomenut 1234. godine?',['Momjanski kaštel','Petrapilosa','Kaštel Rota u Bujama','Sveti Martin']]
    ],
    'buzet':[
      ['Koje se godine Buzet prvi put spominje u povijesnim izvorima?',['804.','879.','1102.','1242.']],
      ['Kako se Buzet nazivao u antičko doba?',['Pinguentum','Albona','Parentium','Nesactium']],
      ['Koji je poznati srednjovjekovni kaštel povezan s područjem Buzeštine?',['Petrapilosa','Momjanski kaštel','Dvigrad','Kaštel Morosini']],
      ['Na kojem se području nalazi povijesna jezgra Buzeta?',['Na brežuljku iznad doline Mirne','Na obali Jadranskog mora','Na otoku Cresu','Uz rijeku Rašu']]
    ],
    'labin':[
      ['Kako se Labin nazivao u antičko doba?',['Albona ili Alvona','Pinguentum','Parentium','Nesactium']],
      ['Koje godine Labin dobiva svoj Statut?',['1341.','1297.','1420.','1599.']],
      ['Koja je poznata povijesna osoba rođena u Labinu 1520. godine?',['Matija Vlačić Ilirik','Juraj Dobrila','Matija Petar Katančić','Vinko Coce']],
      ['Kako se zvao ustanak labinskih rudara iz 1921. godine?',['Labinska republika','Istarska komuna','Rudarska buna Labinština','Labinski preporod']]
    ]
  };
  const urls={
    komiza:'https://www.komiza.hr/o-gradu/',
    buje:'https://buje.hr/buje-kroz-povijest/',
    buzet:'https://www.buzet.hr/images/uploads/files/Strategija_zelene_urbane_obnove_Grada_Buzeta_NACRT_komprimirano_za_dostavu_putem_linka_ako_je_dokument_prevelik.pdf',
    labin:'https://old.labin.hr/povijest'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified22_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_22=all;
  global.PatriaCityVerified22={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
