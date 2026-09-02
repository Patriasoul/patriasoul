// PatriaSoul — provjerena gradska pitanja, nastavak 21.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'zupanja':[
      ['Koje se godine ime Županje prvi put bilježi na Merkatorovoj karti?',['1554.','1402.','1687.','1244.']],
      ['Kako je Županja zabilježena na Merkatorovoj karti iz 1554. godine?',['Zupana blacia','Zupania nova','Zupana civitas','Zupanja flumen']],
      ['Uz koju je veliku rijeku leži Županja?',['Savu','Dravu','Dunav','Bosut']],
      ['Koji je sport, prema gradskoj povijesti, povezan s dolaskom Engleza u Županju 1880. godine?',['Nogomet','Tenis','Rugby','Veslanje']]
    ],
    'hvar':[
      ['Koje su godine Grci s otoka Parosa osnovali koloniju Pharos na mjestu današnjeg Staroga Grada?',['385./384. pr. Kr.','300. pr. Kr.','52. pr. Kr.','9. pr. Kr.']],
      ['Koje je godine Hvar stupio pod mletačku upravu?',['1278.','1244.','1358.','1420.']],
      ['Koje je godine u Hvaru otvorena prva meteorološka postaja u Hrvatskoj?',['1858.','1868.','1844.','1884.']],
      ['Tko je Hvaranin poznat kao utemeljitelj daktiloskopije?',['Ivan Vučetić','Hanibal Lucić','Grga Novak','Petar Hektorović']]
    ],
    'imotski':[
      ['Pod kojim se imenom Imotski prvi put spominje kao župa 950. godine?',['Emotha','Imora','Ymot','Imoschi']],
      ['Koje se ime za Imotski pojavljuje u ispravi Andrije II. iz 1210. godine?',['Ymot locus','Emotha civitas','Imora castrum','Oppidium Imoschi']],
      ['Kako se zove poznata tvrđava iznad Modrog jezera u Imotskom?',['Topana','Kula Zvonimira','Fortica','Ružica grad']],
      ['Koje je prirodno obilježje jedan od najpoznatijih simbola Imotskog?',['Modro jezero','Plitvička jezera','Crveno jezero u Istri','Vransko jezero']]
    ],
    'kastela':[
      ['Koliko povijesnih naselja obuhvaća današnji Grad Kaštela?',['Sedam','Pet','Osam','Deset']],
      ['Koji je povijesni dokument posebno povezan s područjem Kaštela i knezom Trpimirom?',['Trpimirova darovnica','Vinodolski zakonik','Povaljska listina','Bašćanska ploča']],
      ['Koje je godine izdana Trpimirova darovnica prema Statutu Grada Kaštela?',['852.','879.','925.','1102.']],
      ['Između kojih se prirodnih obilježja proteže područje Kaštela?',['Kozjaka i Kaštelanskog zaljeva','Biokova i Jadranskog mora','Mosora i Cetine','Učke i Kvarnera']]
    ]
  };
  const urls={
    zupanja:'https://zupanja.hr/povijest-grada/',
    hvar:'https://www.hvar.hr/portal/o-hvaru/povijest-i-kulturna-bastina/',
    imotski:'https://imotski.hr/wp-content/uploads/2019/07/Strateski-plan-razvoja-Grada-Imotskog-Finalna-verzija.pdf',
    kastela:'https://kastela.hr/wp-content/uploads/datoteke/dokumenti/gradsko-vijece/sjednice/2017-2021/07/statut---vazece-odredbe.pdf'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified21_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_21=all;
  global.PatriaCityVerified21={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
