// PatriaSoul — provjerena gradska pitanja, nastavak 24.
// Nije nova glavna banka; pitanja pripadaju sloju Brani svoj grad.
(function(global){'use strict';
  const extra={
    'pazin':[
      ['Koje se godine Pazin prvi put spominje kao Castrum Pisinum?',['983.','804.','1150.','1242.']],
      ['Koji je poznati prirodni fenomen neposredno povezan s povijesnom jezgrom Pazina?',['Pazinska jama','Limski kanal','Limska draga','Raški zaljev']],
      ['Koje je godine u Pazinu osnovana Velika državna gimnazija s nastavom na hrvatskom jeziku?',['1899.','1876.','1905.','1912.']],
      ['Koje su povijesne odluke donesene u Pazinu u rujnu 1943. posebno važne za Istru?',['Odluke o sjedinjenju Istre s domovinom Hrvatskom','Odluke o osnivanju Pazinske grofovije','Odluke o osnivanju Mletačke Republike','Odluke o ukidanju Pazinske grofovije']]
    ],
    'vodnjan':[
      ['Kako se Vodnjan prvi put bilježi u pisanim izvorima 1150. godine?',['Vicus Atinianus','Castrum Pisinum','Albona','Humagum']],
      ['Koje je godine Vodnjan potpao pod vlast Venecije?',['1331.','1283.','1412.','1492.']],
      ['Koja je vodnjanska crkva poznata po velikoj zbirci sakralne umjetnosti i relikvija?',['Župna crkva sv. Blaža','Crkva sv. Jakova','Gospa od Karmela','Sv. Marija Traversa']],
      ['Koje je godine vodnjanska komuna dobila svoj novi statut, obnovljenu verziju starijeg statuta?',['1492.','1331.','1388.','1571.']]
    ]
  };
  const urls={
    pazin:'https://www.pazin.hr/o-pazinu/povijest/',
    vodnjan:'https://www.enciklopedija.hr/clanak/vodnjan'
  };
  const normalizeCity=s=>String(s).toLocaleLowerCase('hr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const all=[];
  Object.entries(extra).forEach(([city,items])=>items.forEach((x,i)=>all.push({id:`verified24_${city}_${String(i+1).padStart(3,'0')}`,cityId:normalizeCity(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:0,sourceUrl:urls[normalizeCity(city)]})));
  global.PATRIA_CITY_VERIFIED_EXTRA_24=all;
  global.PatriaCityVerified24={all:()=>all.slice(),forCity:city=>{const slug=normalizeCity(city);return all.filter(q=>q.cityId===slug)},sources:()=>({...urls})};
})(typeof window!=='undefined'?window:globalThis);
