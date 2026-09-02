// PatriaSoul — verified city questions layer 90 — Gospić
(function(global){'use strict';
const city='gospić',S='https://gospic.hr/povijest/';
const F=[
['najstariji tragovi naseljenosti gospićkog područja',['pretpovijest i starije kameno doba','isključivo rimsko doba','tek srednji vijek','tek 19. stoljeće']],
['željeznodobno pleme povezano s gospićkim područjem',['Japodi','Liburni','Delmati','Histri']],
['antička prometna komunikacija preko gospićkog područja',['pravac Siscia–Salona','pravac Aquileia–Ravenna','pravac Narona–Epidaurum','pravac Zadar–Tarsatica']],
['naselje Kaseg iz isprave',['1263. godine','1239. godine','1494. godine','1604. godine']],
['rijeka uz koju se navodi Kaseg',['Lika','Novčica','Kupa','Garešnica']],
['naselje Gospić u popisu 1604.',['navodi se kao naselje Gospić','navodi se kao Kaseg','navodi se kao Gospojina samo','ne spominje se']],
['kula age Senkovića',['na prijelazu preko Novčice','na vrhu Velebita','uz rijeku Gacku','u Jasikovcu']],
['katedrala Navještenja Blažene Djevice Marije',['sagrađena 1781.–1783.','sagrađena 1866.–1882.','sagrađena 1893.–1894.','sagrađena 1900.–1921.']],
['Gospić kao sjedište Ličke i Otočke pukovnije',['od 1729. godine','od 1604. godine','od 1781. godine','od 1921. godine']],
['prva pučka škola u Gospiću',['osnovana 1729. godine','osnovana 1766. godine','osnovana 1799. godine','osnovana 1823. godine']],
['Vodarica Marta',['brončani kip povezan s dovršenjem gradskog vodovoda','spomenik prvoj školi','kula na Novčici','kip hrvatskog bana']],
['puštanje u rad vodovoda Brušane–Gospić',['1. siječnja 1894.','31. prosinca 1893.','1. siječnja 1921.','31. prosinca 1900.']],
['željeznica u Gospiću',['prvi vlak 1921. godine','prvi vlak 1894. godine','prvi vlak 1900. godine','prvi vlak 1932. godine']],
['poznati rođeni Gospićanin i svjetski izumitelj',['Nikola Tesla','Ivan Meštrović','Ruđer Bošković','Faust Vrančić']],
['tenisko igralište u Jasikovcu',['1900. godine','1893. godine','1921. godine','1932. godine']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[f[1][0],...f[1].slice(1)],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified90_gospić_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified90={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);