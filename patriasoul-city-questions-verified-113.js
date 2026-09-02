// PatriaSoul — verified city question layer 113 — Nin
(function(global){'use strict';
const city='nin',S='https://www.nin.hr/pdf/nin-rivijera-bogata-riznica-2026.pdf';
const F=[
['antički naziv Nina',['Aenona','Salona','Oneum','Narona']],
['narod koji je prema turističkom izvoru osnovao Nin',['Liburni','Delmati','Iliri Histri','Rimljani']],
['povijesni status Nina u srednjem vijeku',['prva prijestolnica Hrvata i najstariji hrvatski kraljevski grad','mletačka prijestolnica Istre','rimska vojna prijestolnica Dalmacije','glavni grad Dubrovačke Republike']],
['stoljeće u kojem se prema turističkom izvoru Nin spominje kao Aenona',['9. stoljeće pr. Kr.','1. stoljeće','4. stoljeće','9. stoljeće']],
['stoljeće predromaničke crkve sv. Križa',['9. stoljeće','6. stoljeće','12. stoljeće','18. stoljeće']],
['poznati nadimak crkve sv. Križa',['najmanja katedrala na svijetu','katedrala hrvatskih kraljeva','katedrala soli','mala bazilika sv. Petra']],
['stoljeće crkve sv. Nikole koja se povezuje s predajom o krunidbi kraljeva',['12. stoljeće','9. stoljeće','15. stoljeće','18. stoljeće']],
['starohrvatski brod iz 11. stoljeća pronađen na području Nina',['Condura Croatica','Serilija Liburnica','Bracera','Gajeta']],
['rimskodobni status Nina prema službenom turističkom vodiču',['municipij','kolonija Venecije','samostanska opatija','vojna krajina']],
['godina međunarodnog priznanja Hrvatske povezane s knezom Branimirом u ninskoj tradiciji',['879.','925.','1102.','1242.']],
['papa povezan s blagoslovom iz 879. godine',['Ivan VIII.','Grgur V.','Urban II.','Lav III.']],
['datum koji Nin povezuje s priznanjem iz 879.',['7. lipnja','5. kolovoza','15. kolovoza','30. svibnja']],
['status Nina kao europske destinacije od 2010.',['EDEN – Europska destinacija izvrsnosti','UNESCO grad baštine','Europska prijestolnica kulture','Ramsarsko područje']],
['približna veličina otočića na kojem se nalazi stari dio Nina',['500 metara promjera','50 metara promjera','5 kilometara promjera','2 kilometra promjera']],
['broj kamenih mostova koji povezuju stari Nin s kopnom',['dva','jedan','tri','četiri']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified113_nin_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified113={all:()=>D.slice(),forCity:c=>String(c).toLowerCase()===city?D.slice():[]};
})(typeof window!=='undefined'?window:globalThis);
