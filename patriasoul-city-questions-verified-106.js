// PatriaSoul — verified city questions layer 106 — Lipik
(function(global){'use strict';
const city='lipik',S='https://lipik.hr/o-lipiku/o-lipiku-opcenito/';
const F=[
['Lipik je povijesno posebno poznat po',[ 'termalnim izvorima i lječilištu','brodogradnji','rudnicima boksita','morskoj luci']],
['Korijeni naseljenosti Lipika sežu u',[ 'rimsko doba','16. stoljeće','19. stoljeće','20. stoljeće']],
['Lipičke toplice spominju se u zapisu Ivana Kapistranina iz',[ '1517.','1399.','1604.','1777.']],
['Godine 1543. Lipik su zauzeli',[ 'Turci','Mlečani','Francuzi','Osmanlije su ga napustile']],
['Nakon oslobođenja od Turaka Lipik je bio u sastavu',[ 'Vojne krajine','Mletačke Republike','Dubrovnika','Istre']],
['Godine 1728. Lipik je darovan',[ 'barunu von Imbsenu','grofu Jankoviću','Antunu Knollu','Franji Trencu']],
['Godine 1760. Lipik postaje vlasništvo',[ 'obitelji Janković','obitelji Erdödy','obitelji Frankopan','obitelji Zrinski']],
['Zapis iz 1777. u Lipiku spominje',[ 'drvenu zgradu s tri kupaonice','hotel Vindobona','željezničku postaju','ergelu lipicanaca']],
['Godine 1782. lipičke toplice imale su',[ 'četiri kupelji','dvije kupelji','šest kupelji','deset kupelji']],
['Pravi procvat lipičkog lječilišta počinje',[ 'u prvoj polovici 19. stoljeća','u 16. stoljeću','nakon 1945.','u 21. stoljeću']],
['Grof Izidor Janković u Lipiku je izgradio',[ 'novu kupališnu zgradu','tvrđavu','katedralu','željeznički kolodvor']],
['U razvoju Lipika važnu je ulogu imao',[ 'Antun Knoll','Matija Vlačić Ilirik','Ivan Meštrović','Nikola Tesla']],
['Godine 1867. imanje Lipik prodano je',[ 'Antunu Knollu','barunu von Imbsenu','Izidoru Jankoviću','Franji Trencu']],
['U Lipiku je uređivan perivoj površine oko',[ '25 hektara','5 hektara','100 hektara','250 hektara']],
['Uz razvoj lječilišta u Lipiku poznata je i',[ 'Ergela Lipicanaca','morska luka','brodograđevna škola','solana']]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];
const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[...f[1]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified106_lipik_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));
global.PatriaCityVerified106={forCity:c=>String(c).toLowerCase()===city?D:[]};
})(typeof window!=='undefined'?window:globalThis);