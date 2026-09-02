// PatriaSoul — verified city questions layer 108 — Makarska
(function(global){'use strict';
const city='makarska',S='https://makarska.hr/povijest-grada';
const F=[
['Najstariji poznati lokalitet iznad Makarske je pećina',[ 'Bubnjavača','Vela jama','Vindija','Gospodska pećina']],
['Bubnjavača je nastanjena u kontinuitetu od približno',[ '6000. pr. Kr.','2000. pr. Kr.','1000. pr. Kr.','500. pr. Kr.']],
['Utvrđeni lokalitet na makarskom poluotoku je',[ 'Sv. Petar','Biokovo','Vepric','Marineta']],
['Naselje na Sv. Petru razvija se oko 1200. pr. Kr. kao',[ 'fenička kolonija Mukron','rimski municipij','grčka kolonija Pharos','osmanska utvrda']],
['Rimsko naselje na području današnje Makarske nosilo je ime',[ 'Muccurum','Ninia','Curicum','Emona']],
['Makarsko naselje dobilo je status biskupije',[ '533.','548.','879.','1499.']],
['U bitci kod Makarske 887. poginuo je mletački dužd',[ 'Petar Candiano','Francesco Morosini','Enrico Dandolo','Pietro Orseolo']],
['Bitka neretvanske mornarice protiv Mlečana dogodila se',[ '18. rujna 887.','4. listopada 1075.','25. lipnja 1991.','5. kolovoza 1995.']],
['Makarskom je krajem 15. stoljeća zavladalo',[ 'Osmansko Carstvo','Austrija','Francuska','Dubrovnik']],
['Osmanska vlast u Makarskoj trajala je uglavnom do',[ '1684.','1571.','1797.','1813.']],
['Barokna katedrala sv. Marka i sv. Jeronima građena je',[ '1700.–1758.','1647.–1669.','1806.–1809.','1897.–1901.']],
['Tijelo zaštitnika grada sv. Klementa preneseno je iz Rima',[ '1725.','1700.','1758.','1832.']],
['Makarska je 24. listopada 1865. uvela u službenu uporabu',[ 'hrvatski jezik','talijanski jezik','francuski jezik','latinski jezik']],
['Svjetionik Sv. Petar izgrađen je',[ '1884.','1879.','1890.','1897.']],
['Makarska je gradski vodovod izgradila',[ '1897.','1884.','1901.','1909.']]
];const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified108_makarska_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));global.PatriaCityVerified108={forCity:c=>String(c).toLowerCase()===city?D:[]};})(typeof window!=='undefined'?window:globalThis);