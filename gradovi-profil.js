/*
 * PatriaSoul — urednički registar profila gradova
 *
 * gradovi.js ostaje kanonski izvor naziva, županije i identifikatora.
 * Ovaj registar sadrži samo urednički sadržaj: sažetak, povijest,
 * baštinu, ljude, Domovinski rat, vjeru i izvore.
 */
window.PATRIA_CITY_EDITORIAL = {
  "Zagreb": {
    intro: "Zagreb je glavni grad Republike Hrvatske i političko, upravno, kulturno, znanstveno i gospodarsko središte zemlje.",
    geography: "Grad se razvija između južnih obronaka Medvednice i doline Save, na važnom prometnom i prirodnom dodiru kontinentalne Hrvatske.",
    history: "Zagreb se u pisanim izvorima spominje 1094. uz osnutak Zagrebačke biskupije. Gradec je 1242. Zlatnom bulom Bele IV. dobio status slobodnog kraljevskog grada. Zagreb se kao prijestolnica Hrvatske prvi put izrijekom spominje 1557., a hrvatska se uprava 1776. seli iz Varaždina u Zagreb. Razvojem Donjeg grada i povezivanjem povijesnih naselja Zagreb postupno prerasta u modernu metropolu.",
    heritage: ["Gornji grad i Gradec", "Kaptol i Zagrebačka katedrala", "Markov trg i crkva sv. Marka", "Medvednica i kulturni krajolik grada", "Muzeji, galerije i parkovi Donjeg grada"],
    people: ["Ljudevit Gaj", "August Šenoa", "Antun Gustav Matoš", "Ivan Meštrović"],
    defence: "Zagreb je tijekom Domovinskog rata bio političko i institucionalno središte obrane Hrvatske, a njegovi stanovnici i dragovoljci sudjelovali su na bojištima diljem zemlje. Grad je također primao prognanike i izbjeglice.",
    faith: "Zagreb je sjedište Zagrebačke nadbiskupije, a katedrala Uznesenja Blažene Djevice Marije jedan je od najprepoznatljivijih sakralnih simbola grada.",
    sources: ["Grad Zagreb — Zagreb in brief", "croatia.eu — Croatia in brief"]
  },
  "Split": {
    intro: "Split je najveći grad Dalmacije i jedno od najvažnijih hrvatskih urbanih, pomorskih i kulturnih središta.",
    geography: "Smješten je na istočnoj obali Jadrana, između Kaštelanskog zaljeva i Splitskog kanala, podno Marjana i okolnih planina.",
    history: "Središte Splita oblikovano je unutar i oko Dioklecijanove palače, građene početkom 4. stoljeća. Antički kompleks nastavio je živjeti kroz srednjovjekovni i novovjekovni grad, pa je današnji Split izniman primjer kontinuiteta urbanog života. Povijesna jezgra s Dioklecijanovom palačom nalazi se na UNESCO-ovu Popisu svjetske baštine od 1979.",
    heritage: ["Dioklecijanova palača", "Peristil i Vestibul", "Katedrala sv. Dujma", "Riva i povijesna jezgra", "Marjan"],
    people: ["Marko Marulić", "Ivan Meštrović", "Emanuel Vidović", "Oliver Dragojević"],
    defence: "Split i njegova okolica imali su važnu ulogu u obrani juga Hrvatske tijekom Domovinskog rata. Grad je bio logističko, pomorsko i zdravstveno središte te polazište brojnih ljudi i postrojbi prema bojištu.",
    faith: "Katedrala sv. Dujma nastala je iz mauzoleja cara Dioklecijana i jedno je od najvažnijih mjesta splitske sakralne i kulturne baštine.",
    sources: ["UNESCO — Historical Complex of Split with the Palace of Diocletian", "Grad Split / službeni gradski izvori"]
  },
  "Rijeka": {
    intro: "Rijeka je najveća hrvatska luka i važno pomorsko, industrijsko, sveučilišno i kulturno središte Kvarnera.",
    geography: "Grad leži uz Riječki zaljev na ušću Rječine, između mora i strmih padina zaleđa, s Trsatom kao važnom povijesnom točkom iznad grada.",
    history: "Područje Rijeke naseljeno je od pretpovijesti, a rimska Tarsatica razvila se na prostoru današnjeg Starog grada. Srednjovjekovni izvori razlikuju Trsat i Rijeku, a grad je kroz stoljeća bio povezan s Frankopanima i Habsburgovcima. Nakon burnih političkih promjena početkom 20. stoljeća, Rijeka je 1947. mirovnim ugovorom u Parizu ponovno ušla u sastav Hrvatske u okviru tadašnje Jugoslavije, a 1948. Rijeka i Sušak sjedinjeni su u jedinstveni grad.",
    heritage: ["Trsatska gradina", "Korzo i povijesna jezgra", "Katedrala sv. Vida", "Guvernerova palača", "Luka Rijeka i pomorska baština"],
    people: ["Ivan Zajc", "Janko Polić Kamov", "Milan Smokvina", "Rikard Benčić"],
    defence: "Tijekom Domovinskog rata Rijeka je bila važno zaleđe i logističko središte. Grad je pomagao frontu i prihvaćao velik broj prognanika, dok su brojni Riječani i Primorci sudjelovali kao dragovoljci i pripadnici hrvatskih postrojbi.",
    faith: "Rijeka je sjedište Riječke nadbiskupije. Katedrala sv. Vida i Trsat s bazilikom Majke Božje Trsatske čine važan dio duhovnog identiteta grada.",
    sources: ["Grad Rijeka — Povijest Rijeke"]
  },
  "Osijek": {
    intro: "Osijek je najveći grad istočne Hrvatske i povijesno, gospodarsko i kulturno središte Slavonije i Baranje.",
    geography: "Smješten je uz Dravu, na prijelazu između ravničarskih prostora Slavonije i Baranje, s rijekom koja je stoljećima određivala razvoj grada.",
    history: "Osijek ima dugu povijest koja seže do rimskog Mursae. Posebno je važna Tvrđa, barokna vojna i urbana cjelina nastala u sklopu habsburške obrane nakon osmanskog razdoblja. Grad je tijekom 20. stoljeća snažno industrijski i prometno rastao, a u Domovinskom ratu pretrpio je teška granatiranja i velika razaranja.",
    heritage: ["Tvrđa", "Trg sv. Trojstva", "Konkatedrala sv. Petra i Pavla", "Promenada uz Dravu", "Muzejska i secesijska baština"],
    people: ["Josip Juraj Strossmayer", "Franjo Kuhač", "Miroslav Kraljević", "Vladimir Becić"],
    defence: "Osijek je 1991. bio jedno od ključnih obrambenih središta Hrvatske. Grad i okolica bili su izloženi intenzivnim napadima, a obranu su nosile hrvatske postrojbe, policija, ZNG i dragovoljci.",
    faith: "Konkatedrala sv. Petra i Pavla jedan je od simbola Osijeka i važan dio vjerskog života Slavonije.",
    sources: ["UNESCO — Tvrđa na Tentativnoj listi", "Grad Osijek — službeni gradski izvori"]
  },
  "Zadar": {
    intro: "Zadar je povijesno središte sjeverne Dalmacije, grad iznimne antičke, srednjovjekovne i mletačke baštine.",
    geography: "Grad je smješten na jadranskoj obali i poluotoku koji duboko ulazi u zadarski kanal, uz brojne otoke i pomorske putove zadarskog područja.",
    history: "Zadar ima kontinuitet urbanog života od antičkog razdoblja. Kroz srednji vijek bio je važno središte hrvatskog kraljevstva i dalmatinske politike, a kasnije je snažno obilježen mletačkom upravom. Mletački obrambeni sustav zidina i vrata uvršten je 2017. na UNESCO-ov Popis svjetske baštine.",
    heritage: ["Crkva sv. Donata", "Rimski forum", "Katedrala sv. Stošije", "Morske orgulje i Pozdrav Suncu", "Zadarske gradske zidine"],
    people: ["Petar Zoranić", "Juraj Dalmatinac", "Šime Budinić", "Krešimir Ćosić"],
    defence: "Zadar i zadarsko područje bili su jedno od važnih bojišta Domovinskog rata. Grad je bio izložen napadima, a obranu su nosile hrvatske snage i lokalno stanovništvo.",
    faith: "Zadar je sjedište Zadarske nadbiskupije. Katedrala sv. Stošije i crkva sv. Donata svjedoče o dugoj kršćanskoj tradiciji grada.",
    sources: ["UNESCO — Venetian Works of Defence", "Turistička zajednica Zadarske županije — UNESCO heritage"]
  },
  "Pula": {
    intro: "Pula je najveći grad Istre i poznata je po iznimno očuvanoj rimskoj baštini te važnoj pomorskoj tradiciji.",
    geography: "Smještena je na južnom vrhu istarskog poluotoka, uz dobro zaštićen zaljev koji je stoljećima pogodovao razvoju luke.",
    history: "Pula je bila važno rimsko središte, a njezin najpoznatiji spomenik je amfiteatar. Kroz noviju povijest grad je prolazio kroz različite državne uprave, a u 20. stoljeću snažno se razvio kao vojno-pomorsko i industrijsko središte.",
    heritage: ["Pulska Arena", "Augustov hram", "Sergijevci luk", "Povijesna jezgra", "Kaštel i fortifikacije"],
    people: ["Mate Balota", "Antonio Smareglia", "Alida Valli", "Sergio Endrigo"],
    defence: "Istra nije bila klasično bojište poput dijelova kontinentalne Hrvatske, ali su građani Pule sudjelovali u obrani Hrvatske, a grad je imao važnu prometnu i logističku ulogu.",
    faith: "Pulska katedrala Uznesenja Blažene Djevice Marije i brojni sakralni objekti svjedoče o višestoljetnom kršćanskom kontinuitetu grada.",
    sources: ["Grad Pula — službeni gradski izvori", "Turistička zajednica Pula — značajne osobe rođene u Puli"]
  },
  "Slavonski Brod": {
    intro: "Slavonski Brod je važan grad Posavine, smješten uz Savu nasuprot Bosanskom Brodu i povijesno povezan s prometom između srednje Europe i Balkana.",
    geography: "Grad se prostire uz lijevu obalu Save, na važnom ravničarskom prometnom koridoru istočne Hrvatske.",
    history: "Položaj uz Savu odredio je razvoj Broda kao prometnog i obrambenog mjesta. Najpoznatija baštinska cjelina je velika barokna tvrđava Brod, građena u 18. stoljeću u sklopu habsburškog obrambenog sustava.",
    heritage: ["Tvrđava Brod", "Franjevački samostan", "Korzo i povijesna jezgra", "Sava i savski krajolik"],
    people: ["Dragutin Tadijanović", "Branko Ružić", "Mia Čorak Slavenska", "Ivana Brlić-Mažuranić — snažno povezana s Brodom iako rođena u Ogulinu"],
    defence: "Slavonski Brod bio je tijekom Domovinskog rata važno obrambeno i logističko središte. Grad je pretrpio napade, a položaj uz Savu imao je strateško značenje.",
    faith: "Franjevački samostan i crkva Presvetog Trojstva važan su dio duhovne i kulturne baštine grada.",
    sources: ["Turistička zajednica Brodsko-posavske županije — kulturni turizam", "Grad Slavonski Brod — službeni gradski izvori"]
  },
  "Karlovac": {
    intro: "Karlovac je grad na četiri rijeke, planski utemeljen kao renesansna tvrđava i važna prometna poveznica središnje Hrvatske.",
    geography: "Grad leži na području susreta Korane, Kupe, Mrežnice i Dobre, između Zagreba i jadranskog zaleđa.",
    history: "Karlovac je osnovan 1579. kao tvrđava na strateškom prostoru prema Osmanskom Carstvu. Zvjezdoliki oblik stare tvrđave jedan je od prepoznatljivih primjera renesansnog fortifikacijskog urbanizma u Hrvatskoj. Grad se kasnije razvio u prometno, obrtničko i industrijsko središte.",
    heritage: ["Zvijezda", "Stari grad Dubovac", "Korana i gradski parkovi", "Gradski muzej", "Povijesne fortifikacije"],
    people: ["Ivan Mažuranić", "Braća Mirko i Stevo Seljan", "Dragojla Jarnević", "Vjekoslav Karas"],
    defence: "Karlovac je u Domovinskom ratu bio jedno od ključnih bojišta i obrambenih središta. Grad i okolna naselja bili su izloženi granatiranju i borbama, a obrana Karlovca imala je važnu ulogu u zaštiti središnje Hrvatske.",
    faith: "Crkve povijesne Zvijezde i okolice čine dio gradske sakralne baštine, dok je Dubovac važna povijesna točka karlovačkog prostora.",
    sources: ["Gradski muzej Karlovac", "Karlovačka županija — poznate ličnosti"]
  },
  "Varaždin": {
    intro: "Varaždin je povijesni grad sjeverne Hrvatske, poznat po baroknoj urbanoj cjelini, kulturi i dugoj tradiciji školstva i glazbe.",
    geography: "Smješten je uz Dravu u sjeverozapadnoj Hrvatskoj, na prijelazu između Međimurja, Hrvatskog zagorja i Podravine.",
    history: "Varaždin se razvio iz srednjovjekovnog naselja i utvrde te je u 18. stoljeću postao sjedište hrvatske uprave. Hrvatski sabor i banovinska uprava djelovali su u gradu do velikog požara 1776., nakon čega se upravno središte preselilo u Zagreb.",
    heritage: ["Stari grad Varaždin", "Barokna gradska jezgra", "Katedrala Uznesenja Marijina", "Crkva sv. Ivana Krstitelja", "Gradsko groblje"],
    people: ["Ivan Kukuljević Sakcinski", "Vatroslav Jagić", "Miljenko Stančić", "Mirko Rački"],
    defence: "Varaždin je u Domovinskom ratu imao važnu ulogu u sjevernoj Hrvatskoj, osobito tijekom događaja u rujnu 1991. i preuzimanja vojarni JNA, čime je osigurana značajna količina naoružanja za obranu Hrvatske.",
    faith: "Varaždin je sjedište Varaždinske biskupije. Katedrala, franjevačka crkva i brojni barokni sakralni objekti dio su prepoznatljivog identiteta grada.",
    sources: ["Grad Varaždin — službeni gradski izvori", "UNESCO — Tentative List: Varaždin historic nucleus"]
  },
  "Šibenik": {
    intro: "Šibenik je povijesni dalmatinski grad na ušću Krke, poznat po katedrali sv. Jakova i snažnoj pomorskoj i fortifikacijskoj baštini.",
    geography: "Grad je smješten uz Šibenski zaljev i kanal Sv. Ante, na prostoru koji povezuje jadransku obalu s krškim zaleđem i rijekom Krkom.",
    history: "Šibenik se u pisanim izvorima spominje u 11. stoljeću, a kroz srednji i novi vijek razvija se kao važan dalmatinski grad. Katedrala sv. Jakova, građena od 15. do 16. stoljeća, jedno je od najvećih ostvarenja hrvatske renesansne arhitekture i od 2000. je na UNESCO-ovu Popisu svjetske baštine.",
    heritage: ["Katedrala sv. Jakova", "Tvrđava sv. Mihovila", "Tvrđava sv. Nikole", "Tvrđava Barone", "Povijesna jezgra"],
    people: ["Juraj Dalmatinac", "Faust Vrančić", "Antun Vrančić", "Arsen Dedić"],
    defence: "Šibensko područje imalo je važnu obrambenu ulogu tijekom Domovinskog rata, posebno u obrani šibenskog područja i tijekom Rujanskog rata 1991.",
    faith: "Katedrala sv. Jakova središnji je simbol šibenske sakralne baštine, a grad je dio dugog katoličkog kontinuiteta Dalmacije.",
    sources: ["UNESCO — The Cathedral of St James in Šibenik", "Grad Šibenik — službeni gradski izvori"]
  }
};
