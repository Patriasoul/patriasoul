// PatriaSoul – centralni registar heroja
// Jedinstveni izvor podataka za rubriku Heroji.
// Struktura je namjerno jednostavna kako bi se isti podaci mogli koristiti
// na karticama, profilima, pretrazi, filtrima i budućem admin sučelju.

export const heroji = [
  {
    id: "nikola-subic-zrinski",
    ime: "Nikola Šubić Zrinski",
    kategorija: "povijest",
    razdoblje: "1508–1566",
    mjesto: "Zrin",
    naslov: "Branitelj Sigeta",
    opis: "Hrvatski ban i vojskovođa, poznat po obrani Sigeta 1566. godine.",
    oznake: ["ban", "vojskovođa", "Siget"]
  },
  {
    id: "petar-zrinski",
    ime: "Petar Zrinski",
    kategorija: "povijest",
    razdoblje: "1621–1671",
    mjesto: "Vrbovec",
    naslov: "Ban i velikaš",
    opis: "Hrvatski ban i jedan od najistaknutijih predstavnika obitelji Zrinski.",
    oznake: ["ban", "Zrinski", "povijest"]
  },
  {
    id: "fran-krsto-frankopan",
    ime: "Fran Krsto Frankopan",
    kategorija: "povijest",
    razdoblje: "1643–1671",
    mjesto: "Bosiljevo",
    naslov: "Pjesnik i velikaš",
    opis: "Hrvatski velikaš i pjesnik, povezan s otporom habsburškom apsolutizmu.",
    oznake: ["Frankopan", "pjesnik", "povijest"]
  },
  {
    id: "janko-kamauf",
    ime: "Janko Drašković",
    kategorija: "preporod",
    razdoblje: "1770–1856",
    mjesto: "Zagreb",
    naslov: "Prvak hrvatskog narodnog preporoda",
    opis: "Političar i jedan od važnih nositelja hrvatskog narodnog preporoda.",
    oznake: ["preporod", "politika", "hrvatski jezik"]
  },
  {
    id: "ljudevit-gaj",
    ime: "Ljudevit Gaj",
    kategorija: "preporod",
    razdoblje: "1809–1872",
    mjesto: "Krapina",
    naslov: "Vođa narodnog preporoda",
    opis: "Središnja osoba hrvatskog narodnog preporoda i važan promicatelj jezičnog jedinstva.",
    oznake: ["preporod", "jezik", "novinstvo"]
  },
  {
    id: "ivan-mazuranic",
    ime: "Ivan Mažuranić",
    kategorija: "kultura",
    razdoblje: "1814–1890",
    mjesto: "Novi Vinodolski",
    naslov: "Ban i književnik",
    opis: "Hrvatski ban, književnik i jedan od najvažnijih autora hrvatskog romantizma.",
    oznake: ["ban", "književnost", "kultura"]
  },
  {
    id: "josip-juraj-strossmayer",
    ime: "Josip Juraj Strossmayer",
    kategorija: "vjera",
    razdoblje: "1815–1905",
    mjesto: "Osijek",
    naslov: "Biskup i mecena",
    opis: "Đakovački biskup, mecena kulture i jedan od najvažnijih hrvatskih javnih djelatnika 19. stoljeća.",
    oznake: ["biskup", "kultura", "Đakovo"]
  },
  {
    id: "ante-starcevic",
    ime: "Ante Starčević",
    kategorija: "preporod",
    razdoblje: "1823–1896",
    mjesto: "Žitnik",
    naslov: "Otac domovine",
    opis: "Političar, publicist i jedan od najvažnijih hrvatskih političkih mislilaca 19. stoljeća.",
    oznake: ["politika", "domovina", "publicistika"]
  },
  {
    id: "ivan-mestrovic",
    ime: "Ivan Meštrović",
    kategorija: "kultura",
    razdoblje: "1883–1962",
    mjesto: "Vrpolje",
    naslov: "Veliki hrvatski kipar",
    opis: "Svjetski poznati hrvatski kipar i arhitekt čija su djela obilježila europsku umjetnost 20. stoljeća.",
    oznake: ["kiparstvo", "umjetnost", "kultura"]
  },
  {
    id: "ruđer-boskovic",
    ime: "Ruđer Bošković",
    kategorija: "znanost",
    razdoblje: "1711–1787",
    mjesto: "Dubrovnik",
    naslov: "Znanstvenik svjetskog glasa",
    opis: "Dubrovčanin, fizičar, astronom, matematičar i filozof čiji je rad imao snažan europski odjek.",
    oznake: ["znanost", "astronomija", "Dubrovnik"]
  },
  {
    id: "nikola-tesla",
    ime: "Nikola Tesla",
    kategorija: "znanost",
    razdoblje: "1856–1943",
    mjesto: "Smiljan",
    naslov: "Pionir elektrotehnike",
    opis: "Izumitelj i elektrotehničar rođen u Smiljanu, čiji je rad snažno utjecao na razvoj moderne elektrifikacije.",
    oznake: ["izumitelj", "elektrotehnika", "Smiljan"]
  },
  {
    id: "blaženi-a-kažić",
    ime: "Marko Križevčanin",
    kategorija: "vjera",
    razdoblje: "1589–1619",
    mjesto: "Križevci",
    naslov: "Mučenik i svetac",
    opis: "Katolički svećenik iz Križevaca i jedan od košičkih mučenika, kanoniziran 1995. godine.",
    oznake: ["mučenik", "svetac", "Križevci"]
  },
  {
    id: "leopold-mandic",
    ime: "Leopold Mandić",
    kategorija: "vjera",
    razdoblje: "1866–1942",
    mjesto: "Herceg Novi",
    naslov: "Apostol ispovijedi",
    opis: "Kapucin hrvatskog podrijetla, poznat po služenju sakramentu pomirenja i proglašen svetim 1983. godine.",
    oznake: ["svetac", "kapucin", "ispovijed"]
  },
  {
    id: "alojzije-stepinac",
    ime: "Alojzije Stepinac",
    kategorija: "vjera",
    razdoblje: "1898–1960",
    mjesto: "Krašić",
    naslov: "Zagrebački nadbiskup",
    opis: "Zagrebački nadbiskup i kardinal, važna osoba hrvatske crkvene povijesti 20. stoljeća.",
    oznake: ["nadbiskup", "kardinal", "Krašić"]
  },
  {
    id: "blazeni-ivan-merz",
    ime: "Ivan Merz",
    kategorija: "vjera",
    razdoblje: "1896–1928",
    mjesto: "Banja Luka",
    naslov: "Apostol hrvatske katoličke mladeži",
    opis: "Katolički laik i intelektualac, proglašen blaženim 2003. godine.",
    oznake: ["blaženik", "mladi", "katolištvo"]
  },
  {
    id: "franjo-tudman",
    ime: "Franjo Tuđman",
    kategorija: "domovinski-rat",
    razdoblje: "1922–1999",
    mjesto: "Veliko Trgovišće",
    naslov: "Prvi predsjednik Republike Hrvatske",
    opis: "Prvi predsjednik samostalne Republike Hrvatske i vrhovni zapovjednik tijekom Domovinskog rata.",
    oznake: ["predsjednik", "država", "Domovinski rat"]
  },
  {
    id: "gordan-ledic",
    ime: "Blago Zadro",
    kategorija: "domovinski-rat",
    razdoblje: "1944–1991",
    mjesto: "Donji Mamići",
    naslov: "Branitelj Vukovara",
    opis: "General-bojnik Hrvatske vojske i jedan od najpoznatijih zapovjednika obrane Vukovara.",
    oznake: ["Vukovar", "branitelj", "zapovjednik"]
  },
  {
    id: "marko-babic",
    ime: "Marko Babić",
    kategorija: "domovinski-rat",
    razdoblje: "1965–2007",
    mjesto: "Vukovar",
    naslov: "Branitelj Vukovara",
    opis: "Hrvatski branitelj i zapovjednik obrane Trpinjske ceste u Vukovaru.",
    oznake: ["Vukovar", "Trpinjska cesta", "branitelj"]
  },
  {
    id: "josip-jovic",
    ime: "Josip Jović",
    kategorija: "domovinski-rat",
    razdoblje: "1969–1991",
    mjesto: "Aržano",
    naslov: "Prva hrvatska ratna žrtva",
    opis: "Pripadnik hrvatskih redarstvenih snaga poginuo je 31. ožujka 1991. na Plitvicama.",
    oznake: ["Plitvice", "branitelj", "redarstvene snage"]
  },
  {
    id: "andrija-matijasevic",
    ime: "Andrija Matijaš Pauk",
    kategorija: "domovinski-rat",
    razdoblje: "1947–1995",
    mjesto: "Marina",
    naslov: "Zapovjednik 4. gardijske brigade",
    opis: "Hrvatski general i zapovjednik 4. gardijske brigade, poginuo tijekom operacije Ljeto '95.",
    oznake: ["4. gardijska", "general", "Domovinski rat"]
  },
  {
    id: "josip-stjepan-stojanovic",
    ime: "Josip Jović",
    kategorija: "sjecanje",
    razdoblje: "1969–1991",
    mjesto: "Aržano",
    naslov: "Simbol početka obrane Hrvatske",
    opis: "Njegovo stradanje na Plitvicama ostalo je trajnim dijelom kolektivnog sjećanja na početak Domovinskog rata.",
    oznake: ["sjećanje", "Plitvice", "1991"]
  }
];

export const HEROJI_KATEGORIJE = {
  povijest: "Povijest",
  preporod: "Narodni preporod",
  kultura: "Kultura i umjetnost",
  znanost: "Znanost",
  vjera: "Vjera",
  "domovinski-rat": "Domovinski rat",
  sjecanje: "Sjećanje"
};

export const getHerojById = (id) =>
  heroji.find((heroj) => heroj.id === id) || null;

export const getHerojiByCategory = (kategorija) =>
  heroji.filter((heroj) => heroj.kategorija === kategorija);

export const searchHeroji = (query) => {
  const normalized = String(query || "").trim().toLocaleLowerCase("hr-HR");
  if (!normalized) return heroji;

  return heroji.filter((heroj) => {
    const haystack = [
      heroj.ime,
      heroj.naslov,
      heroj.opis,
      heroj.mjesto,
      heroj.razdoblje,
      heroj.kategorija,
      ...heroj.oznake
    ].join(" ").toLocaleLowerCase("hr-HR");

    return haystack.includes(normalized);
  });
};

export default heroji;
