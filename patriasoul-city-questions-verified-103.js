// PatriaSoul — verified city questions layer 103 — Kutina
(function(global){'use strict';
const city='kutina',S='https://www.kutina.hr/assets/files/610/09_23.pdf';
const F=[
['prvo spominjanje Kutine u pisanim dokumentima',['1256.','1209.','1334.','1397.']],
['isprava u kojoj se Kutina prvi put spominje',['Povelja Bele IV.','Zlatna bula','Vinodolski zakonik','Bašćanska ploča']],
['datum isprave Bele IV. iz 1256.',['10. studenoga','12. siječnja','4. ožujka','29. svibnja']],
['rimsko naselje na području današnje Kutine',['Varianis','Siscia','Andautonia','Salona']],
['Kutina se razvijala uz istoimeni',['potok','kanal','rukavac Save','jezero']],
['funkcija Kutine kroz razvoj bila je',['trgovište','pomorska luka','rudarska kolonija','vojna prijestolnica']],
['formalni status trgovišta Kutina stječe',['u prvoj polovici 19. stoljeća','u 13. stoljeću','u 16. stoljeću','nakon 1945.']],
['Kutina je u srednjem vijeku bila pogođena',['osmanskim osvajanjima','mletačkim opsadama','napoleonskim ratovima','normanskim pohodima']],
['nakon oslobođenja od Osmanlija Kutina je vraćena obitelji',['Erdődy','Zrinski','Frankopan','Šubić']],
['obnova Kutine u drugoj polovici 18. stoljeća povezana je s',['Erdődyjima','Frankopanima','Mlečanima','Templarima']],
['početkom 20. stoljeća Kutina je bila',['kotarsko središte','županijsko sjedište','slobodni kraljevski grad','vojna prijestolnica']],
['kotarsko područje početkom 20. stoljeća uključivalo je Kutinu, Popovaču i',['Ludinu','Novsku','Sisak','Moslavinu']],
['Kutina je industrijsko i administrativno središte',['Moslavine','Podravine','Istre','Like']],
['važan industrijski kompleks Kutine povezan je s',['Petrokemijom','Đurom Đakovićem','Uljanikom','Jadrankom']],
['među djelatnostima kutinskog područja ističu se',['poljoprivreda i stočarstvo','brodogradnja i ribarstvo','pomorski promet','maslinarstvo i solane']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified103_kutina_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified103={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
