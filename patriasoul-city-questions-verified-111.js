// PatriaSoul — verified city question layer 111 — Mursko Središće
(function(global){'use strict';
const city='mursko-sredisce',S='https://mursko-sredisce.hr/mursko-sredisce-nekad/';
const F=[
['položaj Murskog Središća',['uz rijeku Muru','uz rijeku Savu','uz rijeku Dravu','uz rijeku Kupu']],
['povijesni gospodarski razvoj Murskog Središća posebno povezan s',['rudarstvom ugljena i nafte','brodogradnjom','morskim ribarstvom','proizvodnjom soli']],
['željeznička pruga važna za razvoj Murskog Središća',['Čakovec–Lendava','Zagreb–Rijeka','Varaždin–Osijek','Koprivnica–Bjelovar']],
['godina izgradnje pruge Čakovec–Lendava',['1889.','1879.','1899.','1909.']],
['godina početka eksploatacije nafte u obližnjoj Selnici i Peklenici',['1850.','1750.','1880.','1900.']],
['naftovod povezan s Murskim Središćem izgrađen 1901.',['Selnica–Mursko Središće','Peklenica–Čakovec','Mursko Središće–Lendava','Selnica–Varaždin']],
['godina izgradnje naftovoda Selnica–Mursko Središće',['1901.','1891.','1911.','1921.']],
['prva jama u Međimurju otvorena radovima započetima 1925.',['Hrastinka 1','Maj 3','Vizivoda 1','Rudar 1']],
['godina početka radova na jami Hrastinka 1',['1925.','1915.','1935.','1945.']],
['poduzeće koje se bavilo iskorištavanjem ugljena prije državne uprave',['Kraljić i Majhen','Međimurski ugljenokopi','Hrvatske željeznice','Murs-Ekom']],
['godina kada su Međimurski ugljenokopi osnovani pod državnom upravom',['1946.','1936.','1956.','1966.']],
['godina zatvaranja rudnika ugljena u Murskom Središću prema gradskom izvoru',['1972.','1962.','1982.','1992.']],
['rijeka uz koju se danas opisuje Mursko Središće',['Mura','Drava','Sava','Kupa']],
['posebna povijesna baština Murskog Središća',['rudarska baština','pomorska baština','vinogradarska baština','mletačka brodogradnja']],
['status Murskog Središća u suvremenom teritorijalnom ustroju',['grad u Međimurskoj županiji','grad u Varaždinskoj županiji','općina u Koprivničko-križevačkoj županiji','grad u Krapinsko-zagorskoj županiji']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified111_mursko_sredisce_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified111={all:()=>D.slice(),forCity:c=>String(c).toLowerCase().replace(/č/g,'c').replace(/ć/g,'c').replace(/ž/g,'z').replace(/š/g,'s').replace(/đ/g,'d')===city?D.slice():[]};
})(typeof window!=='undefined'?window:globalThis);
