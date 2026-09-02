// PatriaSoul — verified city questions layer 87 — Đurđevac
(function(global){'use strict';
const city='đurđevac',S='https://djurdjevac.hr/o-durdevcu/povijest/';
const F=[
['prvi spomen Đurđevca',['1237. godine','1257. godine','1494. godine','1536. godine']],
['razvoj Đurđevca u gradsko naselje – trgovište',['15. stoljeću','13. stoljeću','16. stoljeću','18. stoljeću']],
['Đurđevac u 16. stoljeću',['sjedište Đurđevačke kapetanije','sjedište Bosansko-đakovačke biskupije','sjedište Ličke pukovnije','sjedište Križevačke županije']],
['Stari grad Đurđevac',['utvrda tipa Wasserburg','barokna katedrala','rimskodobni amfiteatar','srednjovjekovni samostan']],
['početak gradnje Staroga grada',['14. stoljeće','12. stoljeće','16. stoljeće','18. stoljeće']],
['Legenda o Picokima',['obrana Đurđevca od Osmanlija','osnutak Đurđevačke pukovnije','gradnja željeznice','osnutak muzeja']],
['godina osmanske prijetnje povezana s Legendom o Picokima',['1552. godina','1532. godina','1554. godina','1632. godina']],
['Ulama-beg u Legendi o Picokima',['osmanski vojskovođa koji opsjeda utvrdu','đurđevački kapetan','kraljevski inženjer','zapovjednik Vojne krajine']],
['nadimak stanovnika Đurđevca povezan s legendom',['Picoki','Šokci','Krajišnici','Podravci']],
['Martin Stier i Đurđevac',['opisao je utvrdu 1657. godine','osnovao školu 1892. godine','osnovao muzej 2014. godine','sagradio željeznicu 1910. godine']],
['ukidanje Vojne krajine',['1871. godine','1746. godine','1657. godine','1892. godine']],
['Čivićevac',['kanal nazvan po Vatroslavu Čiviću pl. Rohru','srednjovjekovna kula','gradska škola','željeznička pruga']],
['Djevojačka đurđevačka škola u Starom gradu',['1892.–1909.','1852.–1869.','1706.–1773.','1921.–1924.']],
['Muzej Grada Đurđevca',['osnovan 2014. godine','osnovan 1871. godine','osnovan 1552. godine','osnovan 1991. godine']],
['Đurđevački pijesci',['jedinstveni prirodni fenomen Podravine','srednjovjekovna utvrda','gradski trg','željeznička postaja']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[f[1][0],...f[1].slice(1)],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified87_đurđevac_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified87={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);