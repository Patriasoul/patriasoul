// PatriaSoul — verified city questions layer 109 — Mali Lošinj
(function(global){'use strict';
const city='mali-losinj',S='https://mali-losinj.hr/grad-mali-losinj/o-otoku-losinju/';
const F=[
['Mali Lošinj nalazi se u zaštićenoj uvali',[ 'Augusta','Čikat','Čikatina','Mandrać']],
['Razvoj Malog Lošinja kao naselja počinje u',[ '13. stoljeću','15. stoljeću','17. stoljeću','19. stoljeću']],
['Lošinj i Cres u antici su bili poznati pod zajedničkim imenom',[ 'Apsyrtides','Liburnides','Kvarnerides','Curictae']],
['Lošinj je od Cresa umjetno odvojen kanalom kod',[ 'Osora','Krka','Malog Lošinja','Unija']],
['Prvi doseljenici na Lošinj bavili su se prvenstveno',[ 'stočarstvom i poljodjelstvom','rudarstvom','vinogradarstvom','brodogradnjom']],
['Mali Lošinj se u 18. i 19. stoljeću snažno razvija zahvaljujući',[ 'pomorstvu i brodogradnji','rudarstvu','solanama','željezarstvu']],
['U 19. stoljeću Mali Lošinj imao je',[ 'šest brodogradilišta','jedno brodogradilište','deset brodogradilišta','nijedno brodogradilište']],
['Vrhunac plovidbe na jedra na Lošinju bio je između',[ '1855. i 1870.','1750. i 1770.','1885. i 1892.','1905. i 1910.']],
['Godine 1885. počeci turizma na Lošinju povezani su sa',[ 'zdravstvenim turizmom','zimskim sportovima','kongresnim turizmom','nautičkim marinama']],
['Prvi hotel u Malom Lošinju zvao se',[ 'Vindobona','Augusta','Alhambra','Bellevue']],
['Hotel Vindobona izgrađen je',[ '1887.','1885.','1892.','1905.']],
['Mali i Veli Lošinj proglašeni su klimatskim lječilištima',[ '1892.','1887.','1893.','1901.']],
['U Malom Lošinju zvjezdarnica je otvorena',[ '1893.','1885.','1892.','1905.']],
['Narodna čitaonica u Malom Lošinju osnovana je',[ '30. listopada 1887.','21. siječnja 1885.','1. siječnja 1893.','10. listopada 1892.']],
['Grad Mali Lošinj kao samostalna jedinica lokalne samouprave nastaje',[ '1993.','1991.','1947.','1920.']]
];const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified109_mali-losinj_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));global.PatriaCityVerified109={forCity:c=>String(c).toLowerCase()===city?D:[]};})(typeof window!=='undefined'?window:globalThis);