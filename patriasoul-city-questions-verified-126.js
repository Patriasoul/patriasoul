(function(global){'use strict';
const city='prelog',S='https://www.prelog.hr/o-prelogu/https/www.prelog.hr/o-prelogu/povijest/g33';
const F=[
['prvi pisani spomen imena Preloga',['1264. godine','1164. godine','1364. godine','1464. godine']],
['isprava u kojoj se prvi put pisano spominje ime Preloga',['povelja bana Rolanda od Ratolda','Zlatna bula Bele IV.','Statut grada Zagreba','Povelja Nikole Zrinskog']],
['rijeka uz koju se Prelog razvijao kao prijelazno mjesto',['Drava','Mura','Sava','Kupa']],
['antički ruralni kompleks na području Preloga',['villa rustica','castrum','forum','amfiteatar']],
['stoljeće u koje arheolozi smještaju villa rusticu kod Ferenčice, Ciglišća i Varaščine',['3. stoljeće','1. stoljeće','5. stoljeće','8. stoljeće']],
['skupina koja se u željeznom dobu navodi na području Međimurja',['Panoni i Sereti','Liburni i Histri','Dardanci i Tračani','Veneti i Etruščani']],
['skupina doseljenika koja je u 13. stoljeću naselila Prelog i razvijala obrt i trgovinu',['kraljevski gosti – hospitesi','mletački mornari','francuski vojnici','rimski legionari']],
['važna gospodarska uloga Preloga u prošlosti',['obrt i trgovina','isključivo pomorstvo','isključivo rudarstvo','isključivo vinogradarstvo']],
['godina u kojoj je Prelog imao 1.729 stanovnika prema popisu',['1786.','1686.','1886.','1906.']],
['godina kada je osnovana Donjomeđimurska štedionica',['1873.','1773.','1893.','1903.']],
['prva poznata manufaktura u Međimurju osnovana u Prelogu',['filandra – svilana','željezara','brodogradilište','tvornica papira']],
['godina kada je proizvodnja svilane definitivno prestala',['1848.','1748.','1898.','1948.']],
['godina kada je željeznička pruga zaobišla Prelog',['1860.','1760.','1880.','1900.']],
['godina kada je Hrvatski sabor proglasio Prelog gradom',['1997.','1991.','2001.','1987.']],
['broj naselja koja danas uz Prelog čine Grad Prelog',['7','5','9','12']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified126_prelog_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified126={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
