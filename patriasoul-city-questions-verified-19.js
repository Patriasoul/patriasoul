// PatriaSoul — provjerena gradska pitanja, nastavak 19.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'drnis':[
      ['Koje se godine Drniš prvi put spominje u pisanim izvorima?',['1494.','1242.','1397.','1522.']],
      ['Koji je narod vladao Drnišem od prodora u 15. stoljeću do pred kraj 17. stoljeća?',['Osmanlije','Mlečani','Habsburgovci','Francuzi']],
      ['Koji je prirodni proizvod posebno poznat kao dio tradicije drniškog kraja?',['Drniški pršut','Paški sir','Samoborska salama','Komiški pogač']],
      ['Koji je grad danas posebno povezan s drniškim krajem kao važnim prometnim i kulturnim središtem?',['Šibenik','Zadar','Knin','Split']]
    ],
    'knin':[
      ['Koje godine Konstantin Porfirogenet prvi put spominje Knin kao Tenen?',['950.','879.','1078.','1102.']],
      ['Koji je hrvatski kralj učinio Knin svojom stalnom prijestolnicom?',['Dmitar Zvonimir','Petar Krešimir IV.','Tomislav','Branimir']],
      ['Koje je godine kninska tvrđava pala pod osmansku vlast?',['1522.','1494.','1688.','1102.']],
      ['Kako se zove velika povijesna utvrda koja dominira Kninom?',['Kninska tvrđava','Nehaj','Ružica grad','Cesargrad']]
    ],
    'skradin':[
      ['Kako se zvao antički grad na području današnjeg Skradina?',['Scardona','Tarsatica','Iovia','Arba']],
      ['Uz koju se rijeku nalazi Skradin?',['Krku','Cetinu','Zrmanju','Neretvu']],
      ['Koje je važno crkveno središte Skradin postao početkom 6. stoljeća?',['Biskupsko središte','Nadbiskupsko sjedište','Samostanska provincija','Kaptolsko sjedište']],
      ['Koji je rimski objekt u Rokovači potvrđivao trgovačku važnost antičke Scardone?',['Lučko postrojenje Horea','Amfiteatar','Cirkus','Vodovod']]
    ],
    'sibenik':[
      ['Koje se godine Šibenik prvi put spominje u darovnici kralja Petra Krešimira IV.?',['1066.','1169.','1412.','1647.']],
      ['Kako se Šibenik često naziva zbog povezanosti s Petrom Krešimirom IV.?',['Krešimirov grad','Zvonimirov grad','Kraljevski grad','Grad tvrđava']],
      ['Koje je godine Šibenik dobio status grada prema službenim turističkim podacima?',['1169.','1066.','1412.','1647.']],
      ['Koji je događaj iz 1647. posebno poznat u povijesti obrane Šibenika?',['Veliki osmanski napad','Oslobođenje od Mlečana','Veliki potres','Osnivanje biskupije']]
    ]
  };
  const urls={
    drnis:'https://drnis.hr/turizam/grad-drnis/povijest',
    knin:'https://knin.hr/povijest/',
    skradin:'https://www.grad-skradin.hr/stranice/kratak-povijesno-geografski-retrospekt/3.html',
    sibenik:'https://www.sibenik.hr/stranice/opci-podaci/183.html'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified19_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_19=all;
  global.PatriaCityVerified19={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
