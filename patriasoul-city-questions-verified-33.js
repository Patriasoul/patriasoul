// PatriaSoul — Omiš completion layer: questions 16–20.
(function(global){'use strict';
const city='omis',S='https://omis.hr/o-gradu/povijest/';
const F=[
['povijesno središte Omiša u odnosu na Cetinu',['na istočnoj obali Cetine','na zapadnoj obali Cetine','na otoku Visu','na ušću Neretve']],
['antičko naselje koje je prethodilo razvoju srednjovjekovnog Omiša',['Oneum','Salona','Narona','Aequum']],
['oblik privređivanja Omišana u srednjem vijeku povezan sa slobodnom plovidbom',['ubiranje tributa','proizvodnja svile','rudarstvo','uzgoj konja']],
['srednjovjekovna obitelj koja je osobito povezana s Omišem',['Kačići','Zrinski','Frankopani','Erdődy']],
['povijesni naziv Omiša iz mletačke tradicije',['Almissa','Spalatum','Ragusa','Curzola']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kako je poznato {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified33_omis_${String(D.length+16).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified33={all:()=>D.slice(),forCity:c=>String(c).toLowerCase().replace(/č/g,'c').replace(/ć/g,'c').replace(/ž/g,'z').replace(/š/g,'s').replace(/đ/g,'d')==='omis'?D.slice():[]};
})(typeof window!=='undefined'?window:globalThis);
