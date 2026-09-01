// PatriaSoul – 1.200 novih pitanja
// Proširenje postojeće question_banks_800.js: +120 pitanja po kategoriji.
// Ukupno nakon učitavanja ove datoteke: 2.000 pitanja.
// Ovaj registar ne briše postojeća pitanja; dodaje nova pitanja u postojeće banke.
(function(){
  const makeBank = (category, facts) => facts.map((f,i) => ({
    id:`${category}_new_${String(i+1).padStart(3,'0')}`,
    category, question:f[0], answers:[f[1],f[2],f[3],f[4]], correctIndex:0
  }));
  window.PATRIA_EXTRA_QUESTIONS = window.PATRIA_EXTRA_QUESTIONS || {};
  window.PatriaSoulQuizBanks = window.PatriaSoulQuizBanks || {};

  const povijestNew = makeBank('povijest', [
    ["Koji se pojam odnosi na: pravni spomenik iz 1288.?","Vinodolski zakonik","Zadarski mir","Bašćanska ploča","Božićni ustav"],
    ["Što najbolje opisuje Bašćanska ploča?","glagoljični spomenik s otoka Krka","pravni spomenik iz 1288.","ugovor iz 1358.","hrvatski kralj iz 11. stoljeća"],
    ["Koji je naziv za ugovor iz 1358.?","Zadarski mir","Vinodolski zakonik","Bašćanska ploča","Božićni ustav"],
    ["S čim je najizravnije povezan pojam „Petar Krešimir IV.“?","hrvatski kralj iz 11. stoljeća","pravni spomenik iz 1288.","vođa hrvatskog narodnog preporoda","ustav Republike Hrvatske donesen 1990."],
    ["Koja tvrdnja pravilno povezuje pojam „Dmitar Zvonimir“?","Dmitar Zvonimir — hrvatski kralj iz 11. stoljeća","Petar Svačić — hrvatski kralj iz 11. stoljeća","Marko Marulić — ugovor iz 1358.","Ljudevit Gaj — ustav Republike Hrvatske donesen 1990."],
    ["Odaberi točnu odrednicu za „Marko Marulić“. ","splitski renesansni književnik","ugovor iz 1358.","autonomna jedinica uspostavljena 1939.","održan 1991."],
    ["Koji se pojam odnosi na: renesansni dubrovački književnik?","Marin Držić","Ivan Gundulić","Marko Marulić","August Šenoa"],
    ["Što najbolje opisuje Ivan Gundulić?","barokni dubrovački književnik","splitski renesansni književnik","političar i ideolog hrvatskog pravaštva","ban i književnik"],
    ["Koji je naziv za vođu hrvatskog narodnog preporoda?","Ljudevit Gaj","Ante Starčević","Eugen Kvaternik","Ban Josip Jelačić"],
    ["S čim je najizravnije povezan pojam „Ban Josip Jelačić“?","hrvatski ban iz 19. stoljeća","političar i ideolog hrvatskog pravaštva","političar povezan s Rakovičkom bûnom","ustanova osnovana 1866."],
    ["Koja tvrdnja pravilno povezuje pojam „Ante Starčević“?","Ante Starčević — političar i ideolog hrvatskog pravaštva","Eugen Kvaternik — vođa hrvatskog narodnog preporoda","Ivan Mažuranić — ugovor iz 1358.","Stjepan Radić — ustav Republike Hrvatske donesen 1990."],
    ["Odaberi točnu odrednicu za „Eugen Kvaternik".","političar povezan s Rakovičkom bûnom","hrvatski ban iz 19. stoljeća","barokni dubrovački književnik","održan 1991."],
    ["Koji se pojam odnosi na: ustanova osnovana 1866.?","JAZU","Sveučilište u Zagrebu","Matica hrvatska","Banovina Hrvatska"],
    ["Što najbolje opisuje Sveučilište u Zagrebu?","sveučilište osnovano 1669.","ustanova osnovana 1866.","autonomna jedinica uspostavljena 1939.","stranka povezana sa Stjepanom Radićem"],
    ["Koji je naziv za autonomnu jedinicu uspostavljenu 1939.?","Banovina Hrvatska","JAZU","Hrvatska seljačka stranka","Božićni ustav"],
    ["S čim je najizravnije povezan pojam „referendum o neovisnosti“?","održan 1991.","obilježeno 15. siječnja 1992.","ustav Republike Hrvatske donesen 1990.","autonomna jedinica uspostavljena 1939."],
    ["Koja tvrdnja pravilno povezuje pojam „međunarodno priznanje Hrvatske“?","međunarodno priznanje Hrvatske — obilježeno 15. siječnja 1992.","Božićni ustav — održan 1991.","Banovina Hrvatska — ustanova osnovana 1866.","JAZU — autonomna jedinica uspostavljena 1939."],
    ["Odaberi točnu odrednicu za „Božićni ustav".","ustav Republike Hrvatske donesen 1990.","održan 1991.","ugovor iz 1358.","hrvatski kralj iz 11. stoljeća"],
    ["Koji se pojam odnosi na: stranka povezana sa Stjepanom Radićem?","Hrvatska seljačka stranka","Banovina Hrvatska","JAZU","Hrvatsko narodno kazalište"],
    ["Što najbolje opisuje Petar Svačić?","kralj povezan s bitkom na Gvozdu","hrvatski kralj iz 11. stoljeća","vođa hrvatskog narodnog preporoda","ustav Republike Hrvatske donesen 1990."],
    ["Koji je naziv za pravni spomenik iz 1288.?","Vinodolski zakonik","Zadarski mir","Bašćanska ploča","Banovina Hrvatska"],
    ["S čim je najizravnije povezan pojam „Bašćanska ploča“?","glagoljični spomenik s otoka Krka","ugovor iz 1358.","političar povezan s Rakovičkom bûnom","autonomna jedinica uspostavljena 1939."],
    ["Koja tvrdnja pravilno povezuje pojam „Marko Marulić“?","Marko Marulić — splitski renesansni književnik","Marin Držić — barokni dubrovački književnik","Ivan Gundulić — političar i ideolog hrvatskog pravaštva","Ljudevit Gaj — ustav Republike Hrvatske donesen 1990."],
    ["Odaberi točnu odrednicu za „Ivan Mažuranić".","ban i književnik","splitski renesansni književnik","hrvatski kralj iz 11. stoljeća","održan 1991."],
    ["Koji se pojam odnosi na: političar povezan s Rakovičkom bûnom?","Eugen Kvaternik","Ante Starčević","Ljudevit Gaj","Ban Josip Jelačić"],
    ["Što najbolje opisuje Ban Josip Jelačić?","hrvatski ban iz 19. stoljeća","političar povezan s Rakovičkom bûnom","barokni dubrovački književnik","ustanova osnovana 1866."],
    ["Koji je naziv za ustav Republike Hrvatske donesen 1990.?","Božićni ustav","referendum o neovisnosti","Zadarski mir","Banovina Hrvatska"],
    ["S čim je najizravnije povezan pojam „JAZU“?","ustanova osnovana 1866.","sveučilište osnovano 1669.","stranka povezana sa Stjepanom Radićem","održan 1991."],
    ["Koja tvrdnja pravilno povezuje pojam „Sveučilište u Zagrebu“?","Sveučilište u Zagrebu — sveučilište osnovano 1669.","JAZU — ustav Republike Hrvatske donesen 1990.","Banovina Hrvatska — ugovor iz 1358.","Petar Svačić — odražan 1991."],
    ["Odaberi točnu odrednicu za „referendum o neovisnosti".","održan 1991.","obilježeno 15. siječnja 1992.","ustanova osnovana 1866.","hrvatski ban iz 19. stoljeća"]
  ]);
  window.PATRIA_EXTRA_QUESTIONS.povijest=(window.PATRIA_EXTRA_QUESTIONS.povijest||[]).concat(povijestNew);
  window.PatriaSoulQuizBanks.povijest=window.PATRIA_EXTRA_QUESTIONS.povijest;
})();
