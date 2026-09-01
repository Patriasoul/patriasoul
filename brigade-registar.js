// PatriaSoul — dodatni registar ratnih brigada i HOS-a
// Izvor za kartice, profile, povijest i buduće znakovlje.

export const MORH_ZNAKOVLJE_RATNE_BRIGADE = "https://znakovlje.morh.hr/ratne-brigade/";

export const ratneBrigade = [
  [99,"Zagreb"],[100,"Zagreb"],[101,"Zagreb"],[102,"Novi Zagreb"],
  [103,"Krapina"],[104,"Varaždin"],[105,"Bjelovar"],[106,"Osijek"],
  [107,"Valpovo"],[108,"Slavonski Brod"],[109,"Vinkovci"],[110,"Karlovac"],
  [111,"Rijeka"],[112,"Zadar"],[113,"Šibenik"],[114,"Split"],
  [115,"Imotski"],[116,"Metković"],[117,"Koprivnica"],[118,"Gospić"],
  [119,"Pula"],[120,"Sisak"],[121,"Nova Gradiška"],[122,"Đakovo"],
  [123,"Požega"],[124,"Vukovar"],[125,"Novska"],[126,"Sinj"],
  [127,"Virovitica"],[128,"Rijeka"],[129,"Karlovac"],[130,"Osijek"],
  [131,"Županja"],[132,"Našice"],[133,"Otočac"],[134,"Zadar"],
  [135,"Osijek"],[136,"Podravska Slatina"]
].map(([broj,sjediste]) => ({
  id: `${broj}-brigada-hv`,
  naziv: `${broj}. brigada Hrvatske vojske`,
  vrsta: "ratna brigada",
  sastav: "Hrvatska vojska",
  godinaUstrojavanja: 1991,
  sjediste,
  kategorija: "Ratne brigade HV",
  oznake: ["HV","ratna brigada","Domovinski rat"],
  znakovlje: {
    izvor: "MORH — Znakovlje pobjednika",
    izvorUrl: MORH_ZNAKOVLJE_RATNE_BRIGADE
  }
}));

export const hosPostrojbe = [
  {
    id: "hos-glavni-stan",
    naziv: "Hrvatske obrambene snage",
    nadimak: "HOS",
    vrsta: "dragovoljačke obrambene postrojbe",
    sastav: "HOS",
    godinaUstrojavanja: 1991,
    sjediste: "Zagreb",
    kategorija: "HOS",
    ratniPut: ["razna bojišta Republike Hrvatske","Vukovar","Dubrovnik","Bosna i Hercegovina"],
    oznake: ["HOS","dragovoljci","Domovinski rat"],
    napomena: "Zasebna povijesna kategorija; ne miješa se s brigadama Hrvatske vojske."
  },
  {
    id: "9-bojna-hos",
    naziv: "9. bojna HOS-a Rafael vitez Boban",
    nadimak: "9. bojna HOS-a",
    vrsta: "bojna HOS-a",
    sastav: "HOS",
    godinaUstrojavanja: 1991,
    sjediste: "Split",
    kategorija: "HOS",
    ratniPut: ["Dalmacija","južno bojište","Bosna i Hercegovina"],
    oznake: ["HOS","bojna","Domovinski rat"]
  },
  {
    id: "1-bojna-hos",
    naziv: "1. bojna HOS-a Ante Paradžik",
    nadimak: "1. bojna HOS-a",
    vrsta: "bojna HOS-a",
    sastav: "HOS",
    godinaUstrojavanja: 1991,
    sjediste: "Zagreb",
    kategorija: "HOS",
    ratniPut: ["Zagreb","razna bojišta Republike Hrvatske"],
    oznake: ["HOS","bojna","Domovinski rat"]
  }
];

export const brigadeIHOS = [...ratneBrigade, ...hosPostrojbe];
export default brigadeIHOS;
