// PatriaSoul — verified city questions layer 88 — Garešnica
(function(global){'use strict';
const city='garešnica',S='https://www.enciklopedija.hr/clanak/garesnica';
const F=[
['prvi spomen Garešnice',['1257. godine','1237. godine','1334. godine','1578. godine']],
['Garešnica u prvom spomenu 1257.',['središte istoimene županije','sjedište Đurđevačke kapetanije','sjedište Križevačke regimente','slobodni kraljevski grad']],
['povelja iz 1277. povezana s Garešnicom',['kralj Ladislav IV. Kumanac potvrdio je posjede zagrebačkom biskupu Timoteju','kralj Ferdinand I. predao je utvrdu Luki Sekelju','Strossmayer je imenovan biskupom','ukinuta je Vojna krajina']],
['osnutak crkvene župe sv. Marije u Garešnici',['1334. godine','1257. godine','1578. godine','1752. godine']],
['pad Garića 1544.',['dio stanovništva pobjegao je pred Osmanlijama','osnovana je čitaonica','otvorena je željeznička pruga','Garešnica je dobila status grada']],
['Garešnica u sastavu Slavonske krajine',['od 1578. godine','od 1257. godine','od 1746. godine','od 1871. godine']],
['preustroj 1746.',['Garešnica je potpala pod Križevačku regimentu','ukinuta je Vojna krajina','osnovano je vatrogasno društvo','otvorena je pruga prema Bjelovaru']],
['priključenje Garešnice Hrvatskoj',['1871. godine','1746. godine','1910. godine','1893. godine']],
['željeznička povezanost s Bjelovarom',['od 1910. godine','od 1871. godine','od 1926. godine','od 1893. godine']],
['prva čitaonica u Garešnici',['1887. godine','1893. godine','1910. godine','1926. godine']],
['vatrogasno društvo u Garešnici',['osnovano 1893. godine','osnovano 1887. godine','osnovano 1910. godine','osnovano 1926. godine']],
['Šegrtska škola u Garešnici',['osnovana 1926. godine','osnovana 1887. godine','osnovana 1893. godine','osnovana 1910. godine']],
['status Garešnice od 17. siječnja 1997.',['grad','županija','regimenta','biskupija']],
['broj naselja koje obuhvaća Grad Garešnica prema povijesnom prikazu',['23','12','20','50']],
['rijeka uz koju leži Garešnica',['Garešnica','Kupa','Novčica','Mrežnica']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[f[1][0],...f[1].slice(1)],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified88_garešnica_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified88={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);