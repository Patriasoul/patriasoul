/* PatriaSoul — kanonski gradski profili. Sadržaj se proširuje po istom modelu bez dupliranja. */
(function () {
  'use strict';
  const profiles = {};
  const facts = {
    Zagreb: {region:'Grad Zagreb',intro:'Glavni grad Republike Hrvatske i političko, kulturno, znanstveno i gospodarsko središte zemlje.',highlights:['Gornji grad i Gradec','Kaptol i Zagrebačka katedrala','Trg bana Josipa Jelačića','Medvednica i Sljeme']},
    Split: {region:'Splitsko-dalmatinska županija',intro:'Najveći grad Dalmacije, izrastao iz povijesne jezgre povezane s Dioklecijanovom palačom.',highlights:['Dioklecijanova palača','Riva','Peristil','Marjan']},
    Dubrovnik: {region:'Dubrovačko-neretvanska županija',intro:'Povijesni grad na južnom Jadranu, poznat po zidinama, pomorskoj tradiciji i Republici Dubrovnik.',highlights:['Dubrovačke zidine','Stradun','Tvrđava Lovrijenac','Stara gradska luka']},
    Zadar: {region:'Zadarska županija',intro:'Povijesno središte sjeverne Dalmacije, s bogatom rimskom, srednjovjekovnom i hrvatskom baštinom.',highlights:['Crkva sv. Donata','Morske orgulje','Pozdrav Suncu','Rimski forum']},
    Šibenik: {region:'Šibensko-kninska županija',intro:'Povijesni dalmatinski grad s jedinstvenom katedralom sv. Jakova i snažnom pomorskom baštinom.',highlights:['Katedrala sv. Jakova','Tvrđava sv. Mihovila','Tvrđava Barone','Stara gradska jezgra']},
    Trogir: {region:'Splitsko-dalmatinska županija',intro:'Povijesni grad na otoku povezanom mostovima s kopnom i Čiovom, s iznimno očuvanom srednjovjekovnom jezgrom.',highlights:['Katedrala sv. Lovre','Kamerlengo','Riva','Stara gradska jezgra']},
    Sinj: {region:'Splitsko-dalmatinska županija',intro:'Grad Cetinske krajine snažno povezan s Alkom, Sinjskom Gospom i bogatom vojnom i kulturnom tradicijom.',highlights:['Sinjska alka','Svetište Gospe Sinjske','Tvrđava Kamičak','Stari grad Sinj']},
    Vukovar: {region:'Vukovarsko-srijemska županija',intro:'Grad na Dunavu, simbol stradanja i otpora u Domovinskom ratu te važan dio hrvatske memorije.',highlights:['Vukovarski vodotoranj','Memorijalno groblje','Ovčara','Muzej vučedolske kulture']},
    Knin: {region:'Šibensko-kninska županija',intro:'Povijesni kraljevski grad podno Dinare, snažno povezan s hrvatskom državnom poviješću i Domovinskim ratom.',highlights:['Kninska tvrđava','Spomenik hrvatske pobjede','Krka i okolni krajolik','Dinara']},
    Omiš: {region:'Splitsko-dalmatinska županija',intro:'Grad na ušću Cetine poznat po gusarskoj prošlosti, tvrđavama, klapskoj tradiciji i prirodnom položaju.',highlights:['Tvrđava Mirabela','Tvrđava Fortica','Kanjon Cetine','Stara jezgra']},
    Trilj: {region:'Splitsko-dalmatinska županija',intro:'Grad u Cetinskoj krajini na prostoru bogate antičke i hrvatske baštine, povezan s rijekom Cetinom i okolnim naseljima.',highlights:['Arheološki lokalitet Tilurij','Muzej triljskog kraja','Cetina','Krajolik Cetinske krajine']}
  };
  Object.keys(facts).forEach(name => profiles[name] = Object.freeze(facts[name]));
  window.PATRIA_CITY_PROFILES = Object.freeze(profiles);
})();
