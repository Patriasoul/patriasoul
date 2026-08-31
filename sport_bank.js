// PatriaSoul – 100 pitanja kategorije Hrvatski sport.
(function(){
'use strict';
const facts=[
['Koji je hrvatski nogometni klub osvojio Kup velesajamskih gradova 1967.?','Dinamo Zagreb',['Hajduk Split','Rijeka','Osijek']],
['Koji je hrvatski nogometni klub iz Splita poznat kao Hajduk?','Hajduk Split',['Dinamo Zagreb','Rijeka','Osijek']],
['Koji je hrvatski nogometaš osvojio Zlatnu loptu 2018.?','Luka Modrić',['Davor Šuker','Zvonimir Boban','Robert Prosinečki']],
['Koji je hrvatski nogometaš bio najbolji strijelac Svjetskog prvenstva 1998.?','Davor Šuker',['Luka Modrić','Mario Mandžukić','Robert Prosinečki']],
['Koju je medalju Hrvatska osvojila na SP-u 1998.?','Brončanu',['Zlatnu','Srebrnu','Nije osvojila medalju']],
['Koju je medalju Hrvatska osvojila na SP-u 2018.?','Srebrnu',['Zlatnu','Brončanu','Nije osvojila medalju']],
['Koju je medalju Hrvatska osvojila na SP-u 2022.?','Brončanu',['Zlatnu','Srebrnu','Nije osvojila medalju']],
['Koji je grad bio domaćin završnice Svjetskog prvenstva u rukometu 2009.?','Zagreb',['Split','Rijeka','Osijek']],
['Koji hrvatski rukometaš poznat je po nadimku Balić?','Ivano Balić',['Domagoj Duvnjak','Mirza Džomba','Igor Vori']],
['Koji hrvatski tenisač osvojio je Wimbledon 2001.?','Goran Ivanišević',['Marin Čilić','Ivo Karlović','Ivan Ljubičić']],
['Koji hrvatski tenisač osvojio je US Open 2014.?','Marin Čilić',['Goran Ivanišević','Borna Ćorić','Ivan Ljubičić']],
['Koji hrvatski košarkaš bio je član Chicago Bullsa i osvojio NBA naslov?','Toni Kukoč',['Dražen Petrović','Dino Rađa','Stojko Vranković']],
['Koji hrvatski košarkaš igrao je za Portland Trail Blazerse i New Jersey Netse?','Dražen Petrović',['Toni Kukoč','Dino Rađa','Nikola Vujčić']],
['Koji hrvatski košarkaš bio je član Boston Celticsa?','Dino Rađa',['Dražen Petrović','Toni Kukoč','Stojko Vranković']],
['Koji je hrvatski vaterpolski klub iz Dubrovnika?','Jug',['Mladost','Jadran','Primorje']],
['Koji je zagrebački vaterpolski klub poznat kao Mladost?','HAVK Mladost',['Jug','Jadran','Primorje']],
['Koji hrvatski veslač osvojio je olimpijsko zlato u dvojcu bez kormilara?','Martin Sinković',['Damir Martin','Luka Špiček','Nikola Bralić']],
['Koji hrvatski veslački dvojac čine braća Sinković?','Martin i Valent Sinković',['Damir i Martin Sinković','Nikola i Luka Sinković','Ivica i Valent Sinković']],
['Koja je hrvatska atletičarka osvojila olimpijsko zlato u bacanju diska 2012.?','Sandra Perković',['Blanka Vlašić','Sara Kolak','Vesna Fabjan']],
['Koja je hrvatska atletičarka osvojila olimpijsko zlato u bacanju koplja 2016.?','Sara Kolak',['Sandra Perković','Blanka Vlašić','Ivana Španović']]
];
const forms=[q=>q,q=>q+' Odaberi točan odgovor.',q=>q+' Koji je odgovor točan?',q=>q+' Što je točno?',q=>q+' Označi točnu mogućnost.'];
const out=[];facts.forEach(f=>forms.forEach(make=>out.push([make(f[0]),f[1],...f[2]])));
window.PATRIA_EXTRA_QUESTIONS=window.PATRIA_EXTRA_QUESTIONS||{};
window.PATRIA_EXTRA_QUESTIONS.sport=out;
})();
