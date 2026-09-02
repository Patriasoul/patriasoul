// PatriaSoul — verified city questions layer 77 — Čazma
(function(global){'use strict';const city='cazma',S='https://www.cazma.hr/index.php/upoznajte-cazmu';const F=[
['930 godina',['obljetnica koju je Čazma obilježila 2024.',['930 godina','500 godina','700 godina','1000 godina']]],
['1094.',['godina kada je područje Čazme kao dio posjeda Dubrava darovano zagrebačkom biskupu',['1094.','1226.','1333.','1579.']]],
['zagrebački biskup',['crkveni poglavar kojem je kralj Ladislav I. Arpadović darovao posjed Dubrava',['zagrebački biskup','splitski nadbiskup','senjski biskup','dubrovački biskup']]],
['sv. Marija Magdalena',['današnja župna crkva u Čazmi građena u drugoj četvrtini 13. stoljeća',['sv. Marija Magdalena','sv. Marko','sv. Nikola','sv. Juraj']]],
['druga četvrtina 13. stoljeća',['razdoblje izgradnje današnje crkve sv. Marije Magdalene',['druga četvrtina 13. stoljeća','16. stoljeće','18. stoljeće','20. stoljeće']]],
['Stjepan II.',['zagrebački biskup koji se u povijesnim izvorima navodi kao graditelj crkve sv. Marije Magdalene',['Stjepan II.','Augustin Kažotić','Ivan Vitez','Nikola Zrinski']]],
['Koloman',['slavonski herceg povezan s gradnjom crkve sv. Marije Magdalene i pokopan u Čazmi',['Koloman','Ladislav I.','Matija Korvin','Žigmund']]],
['zapadna rozeta',['istaknuti arhitektonski element crkve sv. Marije Magdalene promjera većeg od šest metara',['zapadna rozeta','južni toranj','kripta','zvonik']]],
['Moslavina',['šira hrvatska regija u kojoj se nalazi Čazma',['Moslavina','Istra','Lika','Baranja']]],
['Moslavačka gora',['gorje uz čazmansko područje s ostacima Garić-grada, Jelengrada i Košuta grada',['Moslavačka gora','Medvednica','Papuk','Učka']]],
['Garić-grad',['poznata stara utvrda na području Moslavačke gore',['Garić-grad','Medvedgrad','Klis','Nehaj']]],
['utvrda Gumnik',['lokalitet kod Bosiljeva povezan sa srednjovjekovnom utvrdom zagrebačkih biskupa',['utvrda Gumnik','dvorac Trakošćan','Nehaj','Kamerlengo']]],
['1586.',['godina bitke kod Gumnika u kojoj je poginuo Ali-beg',['1586.','1526.','1648.','1711.']]],
['Ali-beg',['osmanski zapovjednik poginuo u bitci kod Gumnika 1586.',['Ali-beg','Hasan-paša','Mehmed-paša','Mustafa-paša']]],
['Crkva sv. Marije Magdalene',['jedna od rijetkih župnih crkava u Hrvatskoj s dva tornja, prema gradskom predstavljanju Čazme',['Crkva sv. Marije Magdalene','Crkva sv. Marka','Crkva sv. Donata','Crkva sv. Eufemije']]]
];const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[f[1][0],...f[1][2]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified77_${city}_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));global.PatriaCityVerified77={forCity:c=>String(c).toLowerCase()===city?D:[]};})(typeof window!=='undefined'?window:globalThis);