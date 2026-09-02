// PatriaSoul — verified city question layer 112 — Našice
(function(global){'use strict';
const city='nasice',S='https://nasice.hr/o-nasicama/povijest-grada-nasica/';
const F=[
['prvi poznati spomen Našica',['1229. godine','1129. godine','1329. godine','1429. godine']],
['obitelj koja je držala našički posjed od kraja 18. stoljeća do 1945.',['Pejačević','Zrinski','Frankopani','Erdődy']],
['redovi povezani s crkvenim vlasništvom Našica u srednjem vijeku',['templari, ivanovci i franjevci','benediktinci, dominikanci i isusovci','cisterciti, pavlinci i kartuzijanci','franjevci, kapucini i trapisti']],
['razdoblje osmanske vlasti u Našicama',['16. i 17. stoljeće','12. i 13. stoljeće','18. i 19. stoljeće','20. stoljeće']],
['godina starog dvorca Pejačević',['1811.','1711.','1911.','1907.']],
['godina novog dvorca Pejačević',['1907.','1807.','1881.','1917.']],
['godina mauzoleja i kapelice grofa Pejačevića',['1881.','1781.','1811.','1907.']],
['poznata hrvatska skladateljica rođena u Našicama',['Dora Pejačević','Ivana Brlić-Mažuranić','Slava Raškaj','Milka Trnina']],
['mjesto gdje je smješten Zavičajni muzej Našice',['dvorac Pejačević','crkva sv. Antuna','stara škola','gradska vijećnica']],
['prirodna cjelina uz koju se Našice razvijaju',['spoj slavonske ravnice i brežuljkastih dijelova Krndije','područje Velebita i mora','delta Neretve','Kvarnerski zaljev']],
['povijesna templarska građevina u Martinu kod Našica',['crkva sv. Martina','crkva sv. Antuna','kapelica Pejačević','crkva sv. Nikole']],
['stoljeće gradnje crkve sv. Martina u Martinu',['13. stoljeće','9. stoljeće','16. stoljeće','18. stoljeće']],
['manifestacija koja oživljava templarsku baštinu Našica',['Našička viteška priča','Dani Pejačevića','Slavonske večeri','Našički dani mora']],
['godina prve organizacije Našičke viteške priče',['2022.','2012.','1992.','2026.']],
['kulturna ustanova koja čuva baštinu Našica',['Zavičajni muzej Našice','Muzej grada Splita','Gradski muzej Nina','Muzej Međimurja']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified112_nasice_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified112={all:()=>D.slice(),forCity:c=>String(c).toLowerCase()===city?D.slice():[]};
})(typeof window!=='undefined'?window:globalThis);
