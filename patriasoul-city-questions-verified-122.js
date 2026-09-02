(function(global){'use strict';
const city='opuzen',S='https://www.opuzen.hr/sggo/2016/SLUZBENI_GLASNIK_-BROJ_6-7.pdf';
const F=[
['tvrđava po kojoj se, prema jednoj pretpostavci, povezuje ime Opuzen',[ 'Fort Opus','Fortica','Kamerlengo','Lovrijenac']],
['godina gradnje tvrđave Forte Opus',[ '1684.','1584.','1784.','1884.']],
['pentagonalna kula na čijim su ostacima Mlečani gradili Forte Opus',[ 'Koš','Brštanik','Norin','Drijeva']],
['središnji trg starog dijela Opuzena',[ 'pjaca','forum Romanum u Saloni','Stradun','Kampanel']],
['crkva na glavnom trgu Opuzena',[ 'sv. Stjepana','sv. Vlaha','sv. Duje','sv. Marka']],
['utvrda sagrađena u srednjem vijeku na području Opuzena',[ 'Brštanik','Forte Opus','Koš','Lovrijenac']],
['razdoblje gradnje utvrde Brštanik prema gradskom izvoru',[ '1254.–1264.','1154.–1164.','1354.–1364.','1454.–1464.']],
['vladar povezan s financiranjem utvrde Brštanik',[ 'bosanski kralj Tvrtko II.','kralj Zvonimir','kralj Tomislav','kralj Petar Krešimir IV.']],
['narod koji je pomogao Mlečanima u ratu protiv Turaka na području Dalmacije',[ 'domaće stanovništvo','Normani','Mlečani iz Venecije','Franci']],
['datum osvajanja turske kule kod Norina',[ '19. studenoga 1684.','19. listopada 1684.','29. studenoga 1784.','5. kolovoza 1684.']],
['povijesna uloga Opuzena nakon mletačkog osvajanja',[ 'zemljopisno središte doline Neretve','sjedište Dubrovačke Republike','glavni grad Istre','središte Slavonije']],
['razdoblje u kojem je na glavnom trgu podignuta današnja crkva sv. Stjepana',[ 'kraj 19. stoljeća','kraj 17. stoljeća','početak 16. stoljeća','sredina 18. stoljeća']],
['razdoblje gradnje stare škole nasuprot crkvi sv. Stjepana',[ 'početak 20. stoljeća','početak 18. stoljeća','kraj 16. stoljeća','sredina 19. stoljeća']],
['godina rušenja stare školske zgrade',[ '1992.','1982.','2002.','1972.']],
['arhitektonski stil dobro očuvanih stambeno-gospodarskih sklopova u najstarijem dijelu grada',[ 'kasni barok','gotika','renesansa','secesija']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified122_opuzen_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified122={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
