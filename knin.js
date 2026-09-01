// PatriaSoul – Knin
// Centralni izvor podataka za profil grada Knina.

export const knin = {
  id: "knin",
  naziv: "Knin",
  zupanija: "Šibensko-kninska županija",
  regija: "Dalmacija",
  slogan: "Kraljevski grad i simbol hrvatske državnosti",
  opis:
    "Knin je povijesni hrvatski grad smješten u zaleđu Dalmacije, poznat po tvrđavi, srednjovjekovnoj hrvatskoj državnosti i važnoj ulozi u novijoj hrvatskoj povijesti.",
  lokacija: {
    drzava: "Hrvatska",
    zupanija: "Šibensko-kninska",
    koordinate: {
      lat: 44.0406,
      lng: 16.1975
    }
  },
  simboli: {
    tvrđava: "Kninska tvrđava",
    rijeke: ["Krka", "Butižnica"]
  },
  povijest: [
    {
      naslov: "Središte srednjovjekovne hrvatske države",
      opis:
        "Knin je u srednjem vijeku bio jedno od važnih političkih i crkvenih središta hrvatske države te je povezan s hrvatskim kraljevima i banovima."
    },
    {
      naslov: "Kninska tvrđava",
      opis:
        "Tvrđava iznad grada jedan je od najprepoznatljivijih simbola Knina i važan spomenik njegove višestoljetne vojne i političke povijesti."
    },
    {
      naslov: "Domovinski rat",
      opis:
        "Knin je imao iznimno važnu stratešku ulogu tijekom Domovinskog rata i posebno mjesto u završnim operacijama Hrvatske vojske 1995. godine."
    }
  ],
  domovinskiRat: {
    uloga: "Jedno od ključnih strateških središta u završnim operacijama Domovinskog rata.",
    operacija: "Oluja",
    datum: "5. kolovoza 1995.",
    znacaj:
      "Knin je 5. kolovoza 1995. oslobođen u operaciji Oluja, a hrvatska zastava podignuta je na kninskoj tvrđavi kao jedan od najpoznatijih simbola završetka oslobodilačkih operacija."
  },
  znamenitosti: [
    {
      id: "kninska-tvrdava",
      naziv: "Kninska tvrđava",
      tip: "povijesna znamenitost",
      opis:
        "Veliki fortifikacijski kompleks iznad grada i jedan od glavnih simbola Knina."
    },
    {
      id: "izvor-krke",
      naziv: "Izvor rijeke Krke",
      tip: "prirodna znamenitost",
      opis:
        "Izvor Krke nalazi se u blizini Knina i predstavlja važno prirodno obilježje ovog kraja."
    },
    {
      id: "crkva-sv-spasa",
      naziv: "Crkva sv. Spasa",
      tip: "sakralna baština",
      opis:
        "Predromanička crkva u okolici Knina, značajan spomenik ranosrednjovjekovne hrvatske baštine."
    }
  ],
  tags: [
    "Knin",
    "Šibensko-kninska županija",
    "kninska tvrđava",
    "hrvatski kraljevi",
    "Domovinski rat",
    "Oluja",
    "baština"
  ],
  quiz: {
    kategorija: "gradovi",
    pitanja: [
      {
        pitanje: "Koja je najpoznatija povijesna znamenitost Knina?",
        odgovor: "Kninska tvrđava"
      },
      {
        pitanje: "Koja je vojno-redarstvena operacija povezana s oslobođenjem Knina 1995.?",
        odgovor: "Oluja"
      },
      {
        pitanje: "Na kojoj je kninskoj znamenitosti 5. kolovoza 1995. podignuta hrvatska zastava?",
        odgovor: "Na Kninskoj tvrđavi"
      }
    ]
  }
};

export const KNIN = knin;
export default knin;
