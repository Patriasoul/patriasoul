// PatriaSoul — verified city questions layer 77 — Čazma
(function(global){'use strict';
const city='cazma',S='https://cazma.hr/';
const F=[
['Čazma',['grad u Bjelovarsko-bilogorskoj županiji',['Čazma','Daruvar','Bjelovar','Garešnica']]],
['Čazmanski kaptol',['povijesna institucija koja je snažno obilježila razvoj Čazme',['Čazmanski kaptol','Varaždinski generalat','Senjska kapetanija','Križevački sandžak']]],
['1226.',['godina koja se povezuje s osnutkom Čazmanskog kaptola',['1226.','1094.','1333.','1579.']]],
['srednji vijek',['razdoblje u kojem Čazma postaje važno crkveno i upravno središte',['srednji vijek','antika','renesansa','20. stoljeće']]],
['Čazmanska katedrala',['poznata povijesna crkvena građevina vezana uz srednjovjekovnu Čazmu',['Čazmanska katedrala','Eufrazijeva bazilika','Katedrala sv. Jakova','Katedrala sv. Duje']]],
['Ivanovci',['red koji je bio povezan sa srednjovjekovnom Čazmom',['Ivanovci','Templari','Isusovci','Benediktinci']]],
['biskupija',['crkvena ustanova čije se sjedište u srednjem vijeku povezivalo s Čazmom',['biskupija','nadbiskupija u Dubrovniku','opatija na Krku','kaptol u Zagrebu']]],
['Moslavina',['šire hrvatsko povijesno-geografsko područje kojem pripada Čazma',['Moslavina','Istra','Lika','Konavle']]],
['Bjelovarsko-bilogorska županija',['županija u kojoj se danas nalazi Čazma',['Bjelovarsko-bilogorska županija','Međimurska županija','Istarska županija','Varaždinska županija']]],
['Čazmanski kaptol',['naziv koji je sačuvan u imenu središnjeg gradskog trga',['Čazmanski kaptol','Zrinski trg','Kaptol dubrovački','Pazinski kaptol']]],
['gradski status',['status koji Čazma ima u sustavu lokalne samouprave Republike Hrvatske',['grad','općina','županija','kotar']]],
['kulturna baština',['područje u kojem Čazma čuva tragove srednjovjekovne i novije povijesti',['kulturna baština','pomorska baština','rudarska baština Dalmacije','otočna baština']]],
['Trg Čazmanskog kaptola',['središnji gradski prostor čiji naziv podsjeća na povijesni kaptol',['Trg Čazmanskog kaptola','Trg bana Jelačića','Trg kralja Tomislava','Trg sv. Marka']]],
['Moslavina i Prigorje',['prostorni kontekst u kojem se nalazi područje Čazme',['Moslavina i Prigorje','Kvarner i Gorski kotar','Baranja i Srijem','Istra i Kvarner']]],
['povijesno središte',['dio grada u kojem se susreću važni tragovi čazmanske prošlosti',['povijesno središte','industrijska zona','zračna luka','morska luka']]]
];
const T=['Koji je točan podatak o {}?','Što je povezano s {}?','Kada se navodi {}?','Koja tvrdnja opisuje {}?','Što treba zapamtiti o {}?'];const D=[];F.forEach((f,i)=>T.forEach((t,j)=>{let a=[f[1][0],...f[1][2]],c=(i+j)%4;[a[0],a[c]]=[a[c],a[0]];D.push({id:`verified77_${city}_${String(D.length+1).padStart(3,'0')}`,cityId:city,citySource:'verified',quality:'verified',category:'gradovi',question:t.replace('{}',f[0]),answers:a,correctIndex:c,sourceUrl:S})}));global.PatriaCityVerified77={forCity:c=>String(c).toLowerCase()===city?D:[]};})(typeof window!=='undefined'?window:globalThis);