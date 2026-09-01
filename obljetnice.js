// PatriaSoul — središnji registar hrvatskih povijesnih obljetnica
//
// Format je namjerno jednostavan kako bi isti podaci mogli biti korišteni
// na početnoj stranici, u Vijestima, Povijesti i budućem kalendaru.
// Datum se čuva kao MM-DD jer se obljetnica ponavlja svake godine.
// `year` označava godinu izvornog događaja.
//
// Napomena: događaji su formulirani kratko i neutralno; detaljniji tekstovi
// i izvori mogu se naknadno povezati preko `url` i `source` polja.

export const obljetnice = [
  {
    id: "petar-zrinski-fran-krsto-frankopan",
    date: "04-30",
    year: 1671,
    title: "Pogubljenje Petra Zrinskog i Frana Krste Frankopana",
    description: "Petar Zrinski i Fran Krsto Frankopan pogubljeni su u Bečkom Novom Mjestu nakon Zrinsko-frankopanske urote.",
    category: "Povijest",
    importance: "visoka"
  },
  {
    id: "ban-josip-jelacic",
    date: "05-25",
    year: 1848,
    title: "Josip Jelačić proglašen banom",
    description: "Josip Jelačić preuzeo je bansku čast u burnom razdoblju hrvatskog narodnog preporoda i revolucije 1848.",
    category: "Povijest",
    importance: "visoka"
  },
  {
    id: "krunidba-kralja-tomislava",
    date: "05-20",
    year: 925,
    title: "Kralj Tomislav i hrvatsko kraljevstvo",
    description: "Godina 925. tradicionalno se povezuje s Tomislavovim naslovom kralja u sačuvanim papinskim i splitskim izvorima.",
    category: "Srednji vijek",
    importance: "visoka"
  },
  {
    id: "gospic-hrvatska-pobjeda",
    date: "09-09",
    year: 1991,
    title: "Dan oslobođenja Gospića u Domovinskom ratu",
    description: "Rujan 1991. obilježen je teškim borbama za Gospić i obranu grada u Domovinskom ratu.",
    category: "Domovinski rat",
    importance: "visoka"
  },
  {
    id: "zadar-hrvatski-sjeverni-dio",
    date: "10-05",
    year: 1991,
    title: "Obrana Zadra u Domovinskom ratu",
    description: "Početak listopada 1991. bio je među najtežim razdobljima obrane Zadra tijekom Domovinskog rata.",
    category: "Domovinski rat",
    importance: "visoka"
  },
  {
    id: "vukovar-herojska-obrana",
    date: "11-18",
    year: 1991,
    title: "Dan sjećanja na žrtve Domovinskog rata i žrtvu Vukovara i Škabrnje",
    description: "18. studenoga obilježava se spomen na žrtve Domovinskog rata, osobito žrtvu Vukovara i Škabrnje.",
    category: "Domovinski rat",
    importance: "najviša"
  },
  {
    id: "medunarodno-priznanje-hrvatske",
    date: "01-15",
    year: 1992,
    title: "Međunarodno priznanje Republike Hrvatske",
    description: "15. siječnja 1992. Hrvatska je dobila međunarodno priznanje od država Europske zajednice, uz priznanja i drugih država.",
    category: "Domovina",
    importance: "najviša"
  },
  {
    id: "dan-drzavnosti",
    date: "05-30",
    year: 1990,
    title: "Dan državnosti Republike Hrvatske",
    description: "30. svibnja obilježava se Dan državnosti Republike Hrvatske, u spomen na konstituiranje prvog demokratski izabranog višestranačkog Sabora 1990.",
    category: "Domovina",
    importance: "najviša"
  },
  {
    id: "dan-neovisnosti-odluka",
    date: "06-25",
    year: 1991,
    title: "Odluka o suverenosti i samostalnosti Republike Hrvatske",
    description: "25. lipnja 1991. Hrvatski sabor donio je odluku o suverenosti i samostalnosti Republike Hrvatske.",
    category: "Domovina",
    importance: "najviša"
  },
  {
    id: "dan-pobjede-oluja",
    date: "08-05",
    year: 1995,
    title: "Dan pobjede i domovinske zahvalnosti i Dan hrvatskih branitelja",
    description: "5. kolovoza obilježava se Dan pobjede i domovinske zahvalnosti i Dan hrvatskih branitelja, u spomen na vojno-redarstvenu operaciju Oluja.",
    category: "Domovinski rat",
    importance: "najviša"
  },
  {
    id: "bljesak",
    date: "05-01",
    year: 1995,
    title: "Operacija Bljesak",
    description: "1. svibnja 1995. započela je vojno-redarstvena operacija Bljesak kojom je oslobođen najveći dio okupiranog područja zapadne Slavonije.",
    category: "Domovinski rat",
    importance: "najviša"
  },
  {
    id: "maslenica",
    date: "01-22",
    year: 1993,
    title: "Operacija Maslenica",
    description: "22. siječnja 1993. započela je vojno-redarstvena operacija Maslenica.",
    category: "Domovinski rat",
    importance: "visoka"
  },
  {
    id: "medunarodno-priznanje-879",
    date: "06-07",
    year: 879,
    title: "Pismo pape Ivana VIII. hrvatskom knezu Branimiru",
    description: "Papa Ivan VIII. u pismu knezu Branimiru 879. iskazao je potporu i blagoslov hrvatskom knezu i narodu.",
    category: "Vjera i povijest",
    importance: "visoka"
  },
  {
    id: "franjo-tudman-rodenje",
    date: "05-14",
    year: 1922,
    title: "Rođenje Franje Tuđmana",
    description: "14. svibnja 1922. rođen je Franjo Tuđman, prvi predsjednik Republike Hrvatske nakon uvođenja višestranačja.",
    category: "Domovina",
    importance: "visoka"
  },
  {
    id: "dan-hrvatske-vojske",
    date: "05-28",
    year: 1991,
    title: "Dan Hrvatske vojske",
    description: "28. svibnja 1991. održana je smotra Zbora narodne garde na stadionu u Zagrebu, događaj koji se obilježava kao Dan Hrvatske vojske.",
    category: "Domovinski rat",
    importance: "visoka"
  }
];

export default obljetnice;
