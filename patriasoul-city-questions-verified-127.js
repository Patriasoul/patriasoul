(function(global){'use strict';
const city='zagreb',S='https://www.zagreb.hr/UserDocsImages/promet/ko%C4%8Dije/Brosura%20-%20kocije.pdf';
const F=[
['dvije povijesne jezgre na kojima se razvio Zagreb',['Kaptol i Gradec','Gornji grad i Novi Zagreb','Maksimir i Medveščak','Trnje i Trešnjevka']],
['godina Zlatne bule kojom je Gradec proglašen slobodnim kraljevskim gradom',['1242.','1142.','1342.','1442.']],
['vladar koji je izdao Zlatnu bulu Gradecu',['Bela IV.','Stjepan II.','Matija Korvin','Ladislav I.']],
['stanovnici koji su pretežno naseljavali Gradec',['obrtnici i sitni trgovci','kanonici','rimski legionari','mletački mornari']],
['stanovnici koji su u srednjem vijeku pretežno živjeli na Kaptolu',['kanonici i crkveni službenici','obrtnici i trgovci','rudari','vojni časnici']],
['značenje imena Kaptol prema gradskom izvoru',['zbor kanonika','slobodni kraljevski grad','trgovačka luka','vojna utvrda']],
['godina osnivanja zagrebačke gimnazije na Gradecu',['1607.','1507.','1707.','1807.']],
['godina osnutka Sveučilišta prema gradskom izvoru',['1669.','1569.','1769.','1869.']],
['godina kada su Gradec i Kaptol administrativno postali jedinstveni grad Zagreb',['1850.','1750.','1880.','1900.']],
['godina velikog potresa koji je teško oštetio zagrebačku katedralu',['1880.','1870.','1890.','1900.']],
['visina Griča prema gradskom izvoru',['158 m','258 m','358 m','108 m']],
['nadmorska visina Sljemena prema gradskom izvoru',['1035 m','835 m','1235 m','635 m']],
['površina Grada Zagreba prema podacima iz gradskog pregleda za 2011.',['641,32 km²','341,32 km²','841,32 km²','541,32 km²']],
['broj gradskih četvrti Zagreba prema gradskom pregledu',['17','10','12','21']],
['broj mjesnih odbora prema gradskom pregledu',['218','118','318','418']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified127_zagreb_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified127={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);
