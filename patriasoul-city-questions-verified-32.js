// PatriaSoul — verified city questions layer 32
// Additional verified Senj questions from the official City history page.
(function(global){'use strict';
const key=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const data={'senj':[
['Koja je bila važna gospodarska djelatnost Senja u XVIII. i XIX. stoljeću?',['Trgovina i pomorstvo','Rudarstvo ugljena','Uzgoj riže','Proizvodnja svile'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Što se kroz senjsku luku u prosperitetnom razdoblju posebno uvozilo i izvozilo?',['Uvoz soli i izvoz žita i drveta','Uvoz čaja i izvoz pamuka','Uvoz kave i izvoz vina','Uvoz svile i izvoz željeza'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koja je prometna građevina izgrađena u Senju u razdoblju njegova novog gospodarskog uspona?',['Nova Jozefinska cesta','Lička željeznica','Dalmatinska cesta','Karolinska pruga'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koji je objekt u Senju obnovljen tijekom njegova gospodarskog uspona?',['Luka','Dioklecijanova palača','Arena','Gradske zidine Dubrovnika'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koji je književnik rođen u Senju 1865. godine prema službenoj stranici Grada?',['Silvije Strahimir Kranjčević','Vjenceslav Novak','Milutin Cihlar Nehajev','Milan Ogrizović'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koji je književnik rođen u Senju 1859. godine?',['Vjenceslav Novak','Silvije Strahimir Kranjčević','Milutin Cihlar Nehajev','Milan Ogrizović'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koji je književnik rođen u Senju 1880. godine?',['Milutin Cihlar Nehajev','Vjenceslav Novak','Silvije Strahimir Kranjčević','Milan Ogrizović'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koji je književnik rođen u Senju 1877. godine?',['Milan Ogrizović','Silvije Strahimir Kranjčević','Vjenceslav Novak','Milutin Cihlar Nehajev'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koja je kulturna institucija osnovana u Senju tijekom gospodarskog procvata?',['Čitaonica','Opera','Filmski studio','Akademija likovnih umjetnosti'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koja je djelatnost u Senju bila povezana s razvojem trgovine i luke?',['Brodogradnja','Proizvodnja zrakoplova','Rudarstvo nafte','Šumarstvo isključivo'],0,'https://www.senj.hr/stari/povijest-grada/']
]};
function forCity(city){return (data[key(city)]||[]).map((x,i)=>({id:`verified32_${key(city)}_${String(i+1).padStart(3,'0')}`,cityId:key(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:x[2],sourceUrl:x[3]}));}
global.PatriaCityVerified32={forCity};
})(typeof window!=='undefined'?window:globalThis);
