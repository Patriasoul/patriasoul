(function(global){'use strict';
const city='mursko-sredisce',S='https://mursko-sredisce.hr/mursko-sredisce-nekad/';
const F=[
['položaj Murskog Središća',[ 'uz rijeku Muru','uz rijeku Savu','uz rijeku Dravu','uz rijeku Kupu']],
['broj stanovnika Murskog Središća 1802. prema gradskom izvoru',[ '586','386','786','958']],
['broj stanovnika 1857. prema gradskom izvoru',[ '938','839','1.138','1.938']],
['broj domaćinstava 1857. prema gradskom izvoru',[ '138','38','238','318']],
['broj stanovnika na prijelazu između 19. i 20. stoljeća prema gradskom izvoru',[ '1.420','920','2.420','1.020']],
['željeznička pruga važna za razvoj Murskog Središća',[ 'Čakovec–Lendava','Zagreb–Rijeka','Varaždin–Osijek','Koprivnica–Bjelovar']],
['godina izgradnje pruge Čakovec–Lendava',[ '1889.','1879.','1899.','1909.']],
['godina početka eksploatacije nafte u obližnjoj Selnici i Peklenici',[ '1850.','1750.','1880.','1900.']],
['naftovod povezan s Murskim Središćem izgrađen 1901.',[ 'Selnica–Mursko Središće','Peklenica–Čakovec','Mursko Središće–Lendava','Selnica–Varaždin']],
['godina izgradnje naftovoda Selnica–Mursko Središće',[ '1901.','1891.','1911.','1921.']],
['prva jama u Međimurju otvorena radovima započetima 1925.',[ 'Hrastinka 1','Maj 3','Vizivoda 1','Rudar 1']],
['godina početka radova na jami Hrastinka 1',[ '1925.','1915.','1935.','1945.']],
['poduzeće koje se bavilo iskorištavanjem ugljena prije državne uprave',[ 'Kraljić i Majhen','Međimurski ugljenokopi','Hrvatske željeznice','Murs-Ekom']],
['godina kada su Međimurski ugljenokopi osnovani pod državnom upravom',[ '1946.','1936.','1956.','1966.']],
['godina zatvaranja rudnika ugljena u Murskom Središću prema gradskom izvoru',[ '1972.','1962.','1982.','1992.']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified125_mursko_sredisce_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified125={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
