// PatriaSoul — verified city question layer 115 — Novi Marof
(function(global){'use strict';
const city='novi-marof',S='https://katalog.mgipu.hr/service/api/public/metadata/prilog/26eabbd0-ea7b-4e0f-aa6e-1ffced12b5e6/64358';
const F=[
['položaj Novog Marofa',['u dolini rijeke Bednje','uz rijeku Dravu','na obali Jadrana','u dolini Neretve']],
['vlastelinstvo s kojim se povezuje postanak Novog Marofa',['Greben','Trakošćan','Ozlje','Medvedgrad']],
['stoljeće osnutka vlastelinstva Greben',['12. stoljeće','10. stoljeće','14. stoljeće','18. stoljeće']],
['godina požara koji je uništio Grebengrad prema urbanističkom planu',['1710.','1610.','1810.','1910.']],
['obitelj koja je napustila stari majur i osnovala novi u dolini Bednje',['Erdődy','Zrinski','Frankopani','Pejačević']],
['godina izgradnje novog dvorca koji je temelj današnjeg Novog Marofa',['1776.','1676.','1876.','1976.']],
['obitelj čiji je dvorac u Novom Marofu izgrađen 1776.',['Erdődy','Pejačević','Drašković','Zrinski']],
['prirodni problem doline Bednje koji je utjecao na razvoj naselja',['poplave','suša','snježne lavine','morske plime']],
['razdoblje u kojem je Novi Marof bio sjedište obitelji Erdődy',['od druge polovice 18. stoljeća do 1925.','od 15. do 16. stoljeća','od 1925. do 1945.','od 13. do 14. stoljeća']],
['institucije koje su se u Novom Marofu razvile kao dio feudalne uprave',['feudalna uprava i sud','pomorska kapetanija i luka','rudarska uprava i kovnica','biskupski kaptol i nadbiskupija']],
['županija kojoj je novomarofski kotar pripadao do 1886.',['Koprivničko-križevačka županija','Varaždinska županija','Zagrebačka županija','Krapinsko-zagorska županija']],
['županija kojoj je novomarofski kotar pripao nakon reorganizacije 1886.',['Varaždinska županija','Koprivničko-križevačka županija','Zagrebačka županija','Međimurska županija']],
['poznata građevina obitelji Erdődy u Novom Marofu',['dvorac s perivojem','mletačka tvrđava','rimski amfiteatar','srednjovjekovna gradska loža']],
['stoljeće gotičko-barokne samostanske crkve Blažene Djevice Marije Kraljice Sv. krunice',['15. stoljeće','12. stoljeće','18. stoljeće','19. stoljeće']],
['kulturna ustanova koja čuva zavičajnu građu Novog Marofa',['Gradska knjižnica i čitaonica Novi Marof','Zavičajni muzej Našice','Gradski muzej Nina','Muzej Međimurja']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified115_novi_marof_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified115={all:()=>D.slice(),forCity:c=>String(c).toLowerCase()===city?D.slice():[]};
})(typeof window!=='undefined'?window:globalThis);
