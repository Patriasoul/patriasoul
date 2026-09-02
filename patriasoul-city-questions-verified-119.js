// PatriaSoul — verified city questions layer 119 — Dubrovnik
(function(global){'use strict';
const city='dubrovnik',S='https://www.dubrovnik.hr/uploads/pages/350/PLAN-UPRAVLJANJA-stari-grad-dubrovnik-HR.pdf';
const F=[
['Dubrovnik je u povijesnom smislu opisan kao',['srednjovjekovni planirani grad','rimski vojni logor','mletačka kolonija','novovjekovna industrijska luka']],
['Najranija svjedočanstva o nastanjenosti na mjestu današnje dubrovačke gradske luke datiraju iz',['helenističkog doba','ranog srednjeg vijeka','rimskog carstva nakon 400.','19. stoljeća']],
['Jačanje Dubrovnika u kasnoj antici odvijalo se usporedno s opadanjem Epidaura, odnosno',['Cavtata','Stona','Korčule','Kotora']],
['Preseljenje sjedišta biskupa iz Epidaura povezano je s razvojem',['crkvenog kompleksa na mjestu današnje barokne katedrale i Bunićeve poljane','Lovrijenca','Straduna nakon 1667.','Mincete']],
['Srednjovjekovni gospodarski uspon Dubrovnik je temeljio na',['brodarstvu, posredničkoj trgovini i diplomaciji','rudarstvu i stočarstvu','vinogradarstvu i šumarstvu','proizvodnji oružja i ugljena']],
['Krajem 10. stoljeća papa Grgur V. uzdigao je dubrovačku biskupiju na rang',['nadbiskupije i metropolijskog središta','patrijaršije','kaptola','samostanske opatije']],
['Prema istraživanjima, sv. Vlaho postaje zaštitnikom Dubrovnika između',['1153. i 1158.','972. i 975.','1272. i 1275.','1358. i 1360.']],
['Godine 1272. Dubrovnik je donio',['Statut','Pomorski zakonik Venecije','Zakonik cara Justinijana','Zlatnu bulu']],
['Od 1337. Dubrovnik je počeo kovati svoj novac u vlastitoj',['kovnici Sponza','kovnici Minceta','kovnici Lovrijenac','kovnici Revelin']],
['Velika epidemija kuge koja je pogodila Dubrovnik zbila se',['1348. godine','1272. godine','1358. godine','1433. godine']],
['Mirom u Zadru 1358. Venecija se odrekla',['cijele istočne obale Jadrana','Dubrovnika samo','Istre i Trsta','Dalmacije južno od Splita']],
['Godina 1358. važna je jer je Dubrovnik tada stekao zaštitu',['ugarsko-hrvatske krune','Mletačke Republike','Napoleona','Osmanskog Carstva']],
['Dubrovačka se zajednica nazivala republikom',['Respublica Ragusina','Respublica Pola','Republica Veneta','Respublica Curzola']],
['Katastrofalni potres koji je snažno razorio Dubrovnik dogodio se',['6. travnja 1667.','6. svibnja 1945.','1. siječnja 1808.','29. listopada 1991.']],
['Dubrovačku Republiku ukinuo je 1808. godine maršal',['Marmont','Napoleon III.','Wellington','Eugène de Beauharnais']],
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified119_dubrovnik_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified119={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
