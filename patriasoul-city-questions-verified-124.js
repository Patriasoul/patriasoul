(function(global){'use strict';
const city='cakovec',S='https://www.cakovec.hr/o-gradu-cakovcu/';
const F=[
['antički naziv rimskog naselja na području današnjeg Čakovca',[ 'Aquama','Andautonia','Mursa','Siscia']],
['svrha rimske utvrde Aquama',[ 'vojne potrebe','trgovina začinima','pomorska obrana','rudarenje']],
['osoba po kojoj je Čakovec dobio ime',[ 'grof Dimitrije Csaky (Čaki)','Nikola Šubić Zrinski','Juraj IV. Zrinski','Petar Zrinski']],
['naziv drvene utvrde koju je početkom 13. stoljeća podigao Dimitrije Csaky',[ 'Čakov turen','Zrinski grad','Aquama','Međimurska kula']],
['godina prvog izričitog spomena Čakovca kao utvrđenog grada',[ '1333.','1233.','1433.','1533.']],
['vladar u čijoj se ispravi 1333. spominje Čakovec',[ 'kralj Robert','kralj Koloman','kralj Matija Korvin','kralj Zvonimir']],
['obitelj koja je u 16. i 17. stoljeću imala sjedište u Čakovcu',[ 'Zrinski','Frankopani','Šubići','Erdődy']],
['razdoblje najznačajnijeg uspona Čakovca pod Zrinskima',[ '16. i 17. stoljeće','12. i 13. stoljeće','18. i 19. stoljeće','20. i 21. stoljeće']],
['poznati Zrinski povezan s bitkom kod Sigeta 1566.',[ 'Nikola Šubić Zrinski','Petar Zrinski','Juraj IV. Zrinski','Nikola Zrinski Čakovečki']],
['godina pogibije Nikole Šubića Zrinskog u Sigetu',[ '1566.','1579.','1620.','1671.']],
['godina povelje Jurja IV. Zrinskog kojom podgrađe dobiva status slobodnog trgovišta',[ '1579.','1479.','1679.','1779.']],
['datum koji Grad Čakovec obilježava kao Dan Grada',[ '29. svibnja','30. travnja','5. kolovoza','1. svibnja']],
['status koji je Čakovec proglašen 1848.',[ 'slobodni kraljevski grad','kraljevska luka','vojna krajina','slobodno carsko selo']],
['broj članova prvog Gradskog vijeća 1848.',[ '30','10','20','50']],
['godina ponovnog dobivanja statusa grada nakon uspostave lokalne samouprave Republike Hrvatske',[ '1993.','1990.','1995.','2000.']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified124_cakovec_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified124={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
