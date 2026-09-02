// PatriaSoul — verified city questions layer 76 — Čakovec
(function(global){'use strict';
const city='cakovec',S='https://www.cakovec.hr/o-gradu-cakovcu/';
const F=[
['Aquama',['rimski naziv prvog poznatog naselja na području današnjeg Čakovca',['Aquama','Salona','Andautonia','Siscia']]],
['Čakov turen',['drvena utvrda koju je početkom 13. stoljeća podigao Dimitrije Csaky',['Čakov turen','Kaptol','Zrinski grad','Stari grad']]],
['1333',['godina prvog izričitog spomena Čakovca kao utvrđenog grada u ispravi kralja Roberta',['1333.','1225.','1450.','1579.']]],
['obitelj Zrinski',['obitelj koja je u 16. i 17. stoljeću od čakovečke utvrde razvila raskošan dvorac',['Zrinski','Frankopani','Šubići','Erdödy']]],
['29. svibnja 1579.',['datum Povelje Jurja IV. Zrinskog kojom je Čakovec dobio status slobodnog trgovišta',['29. svibnja 1579.','30. travnja 1671.','7. rujna 1566.','1. siječnja 1848.']]],
['slobodno trgovište',['status koji je podgrađu čakovečke utvrde dodijeljen Poveljom Jurja IV. Zrinskog',['slobodno trgovište','slobodna luka','kraljevska prijestolnica','vojna krajina']]],
['1848.',['godina kada je Čakovec proglašen slobodnim kraljevskim gradom',['1848.','1579.','1691.','1993.']]],
['Gradsko vijeće 1848.',['broj članova prvog Gradskog vijeća nakon proglašenja slobodnim kraljevskim gradom',['30','10','15','50']]],
['Savjet Grada Čakovca',['izvršni organ koji je 1848. imao 10 članova',['Savjet Grada Čakovca','Kraljevski senat','Banovinsko vijeće','Gradski kaptol']]],
['druga polovica 19. stoljeća',['razdoblje snažnog gospodarskog i društvenog razvoja Čakovca povezanog s izgradnjom željeznice',['druga polovica 19. stoljeća','početak 15. stoljeća','kraj 17. stoljeća','početak 21. stoljeća']]],
['Nikola Zrinski Čakovečki',['ban uz čije su se vrijeme u Čakovcu održavale banske konferencije',['Nikola Zrinski Čakovečki','Petar Zrinski','Fran Krsto Frankopan','Juraj IV. Zrinski']]],
['1546.–1691.',['razdoblje u kojem su Zrinski bili povezani s Čakovcem prema gradskim povijesnim podacima',['1546.–1691.','1320.–1400.','1671.–1750.','1848.–1918.']]],
['30. travnja 1671.',['datum pogubljenja Petra Zrinskog i Frana Krste Frankopana u Bečkom Novom Mjestu',['30. travnja 1671.','29. svibnja 1579.','7. rujna 1566.','24. prosinca 1542.']]],
['1993.',['godina kada Čakovec ponovno dobiva status grada u novom sustavu lokalne uprave i samouprave Republike Hrvatske',['1993.','1848.','1579.','1945.']]],
['Dan Grada Čakovca',['datum kojim se obilježava povijesna Povelja Jurja IV. Zrinskog',['29. svibnja','30. travnja','7. rujna','1. listopada']]]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[f[1][0],...f[1][2]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified76_${city}_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified76={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);