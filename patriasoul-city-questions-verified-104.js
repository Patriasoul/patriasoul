// PatriaSoul — verified city questions layer 104 — Labin
(function(global){'use strict';
const city='labin',S='https://rabac-labin.com/dozivi-i-istrazi/povijest-i-kultura/';
const F=[
['antički naziv Labina',['Albona','Parentium','Pola','Tarsatica']],
['prvo spominjanje Albona datira u',['285. poslije Krista','1249.','1257.','1604.']],
['položaj starog Labina',['na brežuljku iznad Rapca','uz Savu','na otoku','u dolini Kupe']],
['visina labinskog brežuljka',['320 metara','120 metara','520 metara','80 metara']],
['Labin je udaljen od mora približno',['3 kilometra','30 kilometara','15 kilometara','50 kilometara']],
['Matija Vlačić Ilirik bio je',['reformator','vojskovođa','kralj','biskup']],
['Matija Vlačić bio je suradnik',['Martina Luthera','Nikole Tesle','Ruđera Boškovića','Ivana Gundulića']],
['Porta Sanfior su gradska vrata iz',['1589.','1336.','1604.','1848.']],
['Porta Sanfior posvećena su svetom',['Floru','Justu','Nikoli','Antunu']],
['Crkva Rođenja Blažene Djevice Marije podignuta je',['1336.','1589.','1604.','1688.']],
['crkva Rođenja BDM građena je na temeljima crkvice iz',['11. stoljeća','13. stoljeća','16. stoljeća','19. stoljeća']],
['venecijanski lav na pročelje crkve postavljen je',['1604.','1336.','1589.','1688.']],
['relikvije svetog Justa prenesene su iz Rima',['1664.','1604.','1688.','1336.']],
['Gradski muzej Labin ima i model',['rudnika','brodogradilišta','tvrđave','željezničke pruge']],
['Forma viva u Dubrovi ima više od',['70 radova','10 radova','30 radova','150 radova']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified104_labin_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified104={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
