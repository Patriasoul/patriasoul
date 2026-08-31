// PatriaSoul – 100 pitanja kategorije Hrvatski sport.
(function(){
'use strict';
const facts=[
['Koji je hrvatski nogometni klub osvojio naslov prvaka Europe 1991.?','Crvena zvezda',['Dinamo Zagreb','Hajduk Split','Rijeka']],
['Koji je hrvatski klub osvojio Kup velesajamskih gradova 1967.?','Dinamo Zagreb',['Hajduk Split','Rijeka','Osijek']],
['Koji je splitski klub osvojio Kup prvaka 1991.?','Nijedan',['Hajduk Split','Dinamo Zagreb','Rijeka']],
['Koji je hrvatski nogometaš osvojio Zlatnu loptu 2018.?','Luka Modrić',['Davor Šuker','Zvonimir Boban','Robert Prosinečki']],
['Koji je hrvatski nogometaš bio najbolji strijelac Svjetskog prvenstva 1998.?','Davor Šuker',['Luka Modrić','Mario Mandžukić','Robert Prosinečki']],
['Koju je medalju Hrvatska osvojila na SP-u 1998.?','Brončanu',['Zlatnu','Srebrnu','Nije osvojila medalju']],
['Koju je medalju Hrvatska osvojila na SP-u 2018.?','Srebrnu',['Zlatnu','Brončanu','Nije osvojila medalju']],
['Koju je medalju Hrvatska osvojila na SP-u 2022.?','Brončanu',['Zlatnu','Srebrnu','Nije osvojila medalju']],
['Koji je grad bio domaćin završnice Svjetskog prvenstva u rukometu 2009.?','Zagreb',['Split','Rijeka','Osijek']],
['Koji je hrvatski rukometaš poznat kao Ivano Balić?','Ivano Balić',['Domagoj Duvnjak','Mirza Džomba','Igor Vori']],
['Koji je hrvatski tenisač osvojio Wimbledon 2001.?','Goran Ivanišević',['Marin Čilić','Ivo Karlović','Ivan Ljubičić']],
['Koji je hrvatski tenisač osvojio US Open 2014.?','Marin Čilić',['Goran Ivanišević','Borna Ćorić','Ivan Ljubičić']],
['Koji je hrvatski košarkaš bio član Chicago Bullsa i osvojio NBA naslov?','Toni Kukoč',['Dražen Petrović','Dino Rađa','Stojko Vranković']],
['Koji je hrvatski košarkaš igrao za Portland i New Jersey Nets?','Dražen Petrović',['Toni Kukoč','Dino Rađa','Nikola Vujčić']],
['Koji je hrvatski košarkaš bio član Boston Celticsa?','Dino Rađa',['Dražen Petrović','Toni Kukoč','Stojko Vranković']],
['Koji je hrvatski vaterpolski klub iz Dubrovnika?','Jug',['Mladost','Jadran','Primorje']],
['Koji je zagrebački vaterpolski klub poznat kao Mladost?','HAVK Mladost',['Jug','Jadran','Primorje']],
['Koji je hrvatski veslač osvojio olimpijsko zlato s Nikolom Bralićem kao trenerom?','Martin Sinković',['Blanka Vlašić','Sandra Perković','Damir Martin']],
['Koji hrvatski veslački dvojac čine braća Sinković?','Martin i Valent Sinković',['Nikola i Luka Sinković','Damir i Martin Sinković','Ivica i Valent Sinković']],
['Koja je hrvatska atletičarka osvojila olimpijsko zlato u bacanju diska 2012.?','Sandra Perković',['Blanka Vlašić','Sara Kolak','Vesna Fabjan']],
];
const forms=[q=>q,q=>q+' Odaberi točan odgovor.',q=>q+' Koji je odgovor točan?',q=>q+' Što je točno?',q=>q+' Označi točnu mogućnost.'];
const out=[];facts.forEach(f=>forms.forEach(make=>out.push([make(f[0]),f[1],...f[2]])));
window.PATRIA_EXTRA_QUESTIONS=window.PATRIA_EXTRA_QUESTIONS||{};
window.PATRIA_EXTRA_QUESTIONS.sport=out;
})();
