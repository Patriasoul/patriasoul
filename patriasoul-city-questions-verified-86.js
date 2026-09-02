// PatriaSoul — verified city questions layer 86 — Đakovo
(function(global){'use strict';
const city='đakovo',S='https://www.djakovo.hr/index.php/grad/o-gradu.html';
const F=[
['prvi pisani spomen Đakova',['1239. godina','1057. godina','1494. godina','1604. godina']],
['darovnica kneza Kolomana',['bosanskom biskupu Ponsi','zagrebačkom biskupu Timoteju','biskupu Strossmayeru','kralju Ferdinandu I.']],
['status Đakova',['sjedište Đakovačko-osječke nadbiskupije','sjedište Ličke pukovnije','sjedište Križevačke regimente','sjedište Dubrovačke Republike']],
['osmansko osvajanje Đakova',['1536. godine','1527. godine','1664. godine','1683. godine']],
['naziv JAKOVA u osmanskom razdoblju',['Đakovo','Garešnica','Gospić','Đurđevac']],
['povratak biskupa u Đakovo nakon Osmanlija',['1690. godine','1706. godine','1773. godine','1849. godine']],
['početak gradnje današnje katedrale-bazilike sv. Petra',['1866. godine','1849. godine','1873. godine','1882. godine']],
['završetak gradnje današnje katedrale',['1882. godine','1866. godine','1893. godine','1900. godine']],
['stil katedrale sv. Petra',['neogotičko-romanski','barokni','renesansni','klasicistički']],
['arhitekti katedrale',['Karlo Rősner i Fridrich Schmidt','Herman Bollé i Viktor Kovačić','Ivan Meštrović i Jože Plečnik','Stanko Kliska i Hugo Ehrlich']],
['biskup koji je katedralu počeo graditi',['Josip Juraj Strossmayer','Antun Mandić','Josip Patačić','Petar Bakić']],
['godina imenovanja Strossmayera biskupom',['1849.','1773.','1866.','1882.']],
['godina koja se uzima kao godina osnutka Ergele Đakovo',['1506.','1374.','1706.','1813.']],
['udruženje obrtnika CEH u Đakovu',['1813. godine','1773. godine','1849. godine','1967. godine']],
['osnutak Đakovačkih vezova',['1967. godine','1506. godine','1813. godine','1882. godine']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[f[1][0],...f[1].slice(1)],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified86_đakovo_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified86={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);