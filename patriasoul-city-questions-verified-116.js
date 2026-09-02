// PatriaSoul — verified city questions layer 116 — Pula
(function(global){'use strict';
const city='pula',S='https://www.pula.hr/hr/o-puli-pola/povijest-pule/';
const F=[
['Prvo gradinsko naselje u Puli nastalo je na brežuljku',['Kaštelu','Srđu','Marjanu','Trsatu']],
['Službeno rimsko ime Pule bilo je',['Colonia Pietas Iulia Pola','Colonia Flavia Pula','Municipium Pietas Histria','Pola Augusta']],
['Od VII. stoljeća u pulsku širu okolicu naseljavaju se',['Slaveni i Hrvati','Normani i Franci','Mlečani i Langobardi','Avari i Mađari']],
['Pula je 1331. godine došla pod vlast',['Mletačke Republike','Austrijskog Carstva','Napoleona','Dubrovačke Republike']],
['Mlečanima je Pula posebno bila važna kao',['tranzitna luka prema Levantu','rudarsko središte','sjedište kopnene vojske','poljoprivredno središte']],
['Među bolestima koje su snažno pogodile povijesnu Pulu bile su',['kuga i malarija','kolera i tifus','ospice i gripa','boginje i tuberkuloza']],
['Na kraju XVII. stoljeća u Puli je živjelo približno',['600 ljudi','6.000 ljudi','60.000 ljudi','160 ljudi']],
['Pulski antički spomenici koji su privlačili europske umjetnike uključivali su',['Arenu, slavoluk Sergijevaca i Augustov hram','Dioklecijanovu palaču, Peristil i Rivu','Eufrazijevu baziliku, Forum i Kaštel','Katedralu, Stradun i Lovrijenac']],
['Nakon propasti Venecije Pula je došla pod',['austrijsku krunu','osmansku vlast','francusku krunu','papinsku vlast']],
['Od 1815. do kraja Prvog svjetskog rata Pula je bila dio',['austrijskog Primorja (Küstenlanda)','Kraljevine Italije','Dubrovačke Republike','Ilirskih provincija']],
['Godine 1856. u Puli je otvoren',['Arsenal, glavna baza austrijske ratne mornarice','prvi hrvatski aerodrom','veliki željeznički kolodvor','slobodni trgovački bazen']],
['Godine 1876. Pula je željeznicom povezana s linijom',['Beč – Trst','Zagreb – Split','Rijeka – Zadar','Venecija – Dubrovnik']],
['Početke turizma na Brijunima potaknula je i željeznička povezanost Pule od',['1876. godine','1856. godine','1918. godine','1945. godine']],
['Pula je tijekom Drugoga svjetskog rata',['pretrpjela teška bombardiranja','ostala potpuno neoštećena','izgubila željeznicu zbog poplave','postala sjedište Republike Hrvatske']],
['U drugoj polovici XX. stoljeća Pula se razvila kao važan grad osobito zbog',['brodogradnje i turizma','rudarstva i tekstila','poljoprivrede i šumarstva','svilarstva i stočarstva']],
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified116_pula_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified116={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
