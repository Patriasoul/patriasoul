// PatriaSoul — verified city question layer 114 — Nova Gradiška
(function(global){'use strict';
const city='nova-gradiska',S='https://novagradiska.hr/zivot-u-novoj-gradiski/povijest/';
const F=[
['godina utemeljenja Nove Gradiške',['1748.','1648.','1848.','1784.']],
['datum utemeljenja Nove Gradiške',['1. svibnja 1748.','1. svibnja 1848.','5. kolovoza 1748.','30. svibnja 1748.']],
['povijesni karakter Nove Gradiške pri osnutku',['graničarsko naselje Slavonske vojne krajine','mletačka trgovačka kolonija','rimski vojni logor','slobodni kraljevski grad']],
['vladarica čija se odluka povezuje s osnutkom grada',['Marija Terezija','Marija Antoaneta','Katarina II.','Elizabeta Austrijska']],
['vojna postrojba kojoj je Nova Gradiška bila zapovjedno mjesto',['Gradiška graničarska pukovnija','Senjska uskočka pukovnija','Križevačka pukovnija','Varaždinska pukovnija']],
['časnik koji je rukovodio izgradnjom novoosnovanog vojnog naselja',['Phillip Lewin Beck','Ivo Kramarić','Dragutin Lobe','Josip Pliverić']],
['godina ukidanja Vojne krajine',['1871.','1881.','1748.','1888.']],
['godina sjedinjenja Vojne krajine s civilnom Hrvatskom',['1881.','1871.','1891.','1901.']],
['godina željezničkog povezivanja Nove Gradiške sa Zagrebom',['1888.','1878.','1898.','1908.']],
['godina izgradnje velike pivovare Dragutina Lobea',['1873.','1883.','1863.','1893.']],
['godina osnutka Dobrovoljnog vatrogasnog društva u Novoj Gradiški',['1871.','1874.','1886.','1906.']],
['godina osnutka Hrvatske čitaonice',['1874.','1871.','1882.','1906.']],
['godina osnutka prve tiskare u Novoj Gradiški',['1882.','1872.','1892.','1902.']],
['godina prvih električnih žarulja na ulicama grada',['1913.','1903.','1923.','1888.']],
['vojno-redarstvena operacija kojom je 1995. oslobođena zapadna Slavonija',['Bljesak','Oluja','Maslenica','Medački džep']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified114_nova_gradiska_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified114={all:()=>D.slice(),forCity:c=>String(c).toLowerCase()===city?D.slice():[]};
})(typeof window!=='undefined'?window:globalThis);
