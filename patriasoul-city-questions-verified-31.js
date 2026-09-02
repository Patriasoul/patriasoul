// PatriaSoul — verified city questions layer 31
(function(global){'use strict';
const key=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const data={'senj':[
['Koliko je staro naselje Senj prema službenoj povijesti Grada Senja?',['Više od 3000 godina','Oko 1000 godina','Oko 500 godina','Oko 200 godina'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Na kojem je brdu bilo utemeljeno najstarije naselje Senja?',['Kuk','Trsat','Marjan','Srđ'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Kako se Senj nazivao u rimsko doba?',['Senia','Oneum','Aequum','Salona'],0,'https://www.senj.hr/stari/povijest-grada/'],
['U kojem se stoljeću Senj prvi put spominje pod imenom Attienites?',['IV. stoljeću pr. Kr.','I. stoljeću','IV. stoljeću','VII. stoljeću'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koja je građevinska infrastruktura postojala u rimskoj Seniji?',['Vijećnica, vodovod, terme i hramovi','Samo arena','Samo luka','Samo akvedukt'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koji su književnici navedeni među poznatim osobama povezanima sa Senjem?',['Silvije Strahimir Kranjčević i Vjenceslav Novak','Marko Marulić i Marin Držić','Ivan Gundulić i Petar Zoranić','August Šenoa i Antun Gustav Matoš'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koje je godine izgrađena željeznička pruga Karlovac–Rijeka koja je zaobišla Senj?',['1873.','1860.','1900.','1918.'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Kakav je učinak željeznička pruga Karlovac–Rijeka imala na gospodarski položaj Senja?',['Smanjila je prometni i trgovački značaj grada','Povećala je senjsku luku','Pretvorila je Senj u glavni željeznički čvor','Nije imala nikakav učinak'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koja je glazbena ustanova u Senju osnovana u njegovom gospodarskom i kulturnom usponu?',['Gradska glazba','Opera Senj','Kraljevski orkestar','Mornarička filharmonija'],0,'https://www.senj.hr/stari/povijest-grada/'],
['Koja je luka bila posebno važna za Senj u razdoblju gospodarskog prosperiteta?',['Senjska luka','Riječka luka','Splitska luka','Dubrovčka luka'],0,'https://www.senj.hr/stari/povijest-grada/']
]};
function forCity(city){return (data[key(city)]||[]).map((x,i)=>({id:`verified31_${key(city)}_${String(i+1).padStart(3,'0')}`,cityId:key(city),citySource:'verified',category:'gradovi',question:x[0],answers:x[1],correctIndex:x[2],sourceUrl:x[3]}));}
global.PatriaCityVerified31={forCity};
})(typeof window!=='undefined'?window:globalThis);
