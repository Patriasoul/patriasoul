// PatriaSoul — verified city questions layer 89 — Glina
(function(global){'use strict';
const city='glina',S='https://www.glina.hr/obiljezena-280-obljetnica-zasjedanja-hrvatskog-sabora-u-glini/';
const F=[
['povijesni spomen Gline',['13. stoljeće','11. stoljeće','15. stoljeće','17. stoljeće']],
['Hrvatski sabor i Glina',['u Glini je održano zasjedanje Sabora prije 280 godina prema gradskom obilježavanju','Sabor je u Glini zasjedao 1991.','Sabor je u Glini osnovao Vojnu krajinu','Sabor je u Glini osnovao 20. domobransku pukovniju']],
['Glina i hrvatska himna',['Glina je povezana sa skladanjem hrvatske himne','Glina je mjesto nastanka grba','Glina je mjesto prvog izvođenja opere','Glina je mjesto osnutka HAZU-a']],
['Dan grada Gline',['6. kolovoza','26. lipnja','8. kolovoza','29. studenoga']],
['početak oružanog otpora u Glini 1991.',['26. lipnja 1991.','1. svibnja 1991.','5. kolovoza 1995.','8. kolovoza 1995.']],
['napad 26. lipnja 1991.',['Policijsku postaju Glina napali su pobunjeni Srbi uz potporu JNA','željezničku postaju napala je talijanska vojska','gradsku vijećnicu napala je Francuska vojska','katedralu je napala austro-ugarska vojska']],
['Tomislav Rom',['poginuli hrvatski pričuvni policajac u napadu na Glini 1991.','zapovjednik 20. domobranske pukovnije','gradonačelnik Gline','arhitekt glinske crkve']],
['trajanje početnog otpora glinskih policajaca',['oko četiri sata','oko četiri dana','oko četrnaest sati','oko četrdeset minuta']],
['Gornji Viduševac i 1995.',['mjesto predaje 21. korpusa vojske tzv. srpske krajine','mjesto osnutka Đurđevačke pukovnije','mjesto izgradnje katedrale','mjesto prvog glinskog sajma']],
['datum predaje 21. korpusa u Gornjem Viduševcu',['8. kolovoza 1995.','4. kolovoza 1995.','5. kolovoza 1995.','6. kolovoza 1995.']],
['hrvatski general kojem je predan 21. korpus',['Petar Stipetić','Mirko Norac','Ante Gotovina','Ivan Čermak']],
['20. domobranska pukovnija',['ustrojena 1. rujna 1994.','ustrojena 26. lipnja 1991.','ustrojena 8. kolovoza 1995.','ustrojena 5. kolovoza 1995.']],
['sudjelovanje 20. domobranske pukovnije u Oluji',['sudjelovala je u oslobađanju Gline 1995.','sudjelovala je u izgradnji katedrale','sudjelovala je u osnivanju Sabora','sudjelovala je u gradnji željeznice']],
['crkva sv. Ivana Nepomuka u Glini',['mjesto održavanja mise u sklopu obilježavanja Dana grada','sjedište 20. domobranske pukovnije','stari gradski kaštel','zgrada prve škole']],
['spomen-obilježje „Suza“',['spomen-obilježje poginulim hrvatskim braniteljima i civilnim žrtvama','srednjovjekovna utvrda','željeznička postaja','gradska knjižnica']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[f[1][0],...f[1].slice(1)],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified89_glina_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified89={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);