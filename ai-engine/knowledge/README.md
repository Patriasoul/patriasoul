# PatriaSoul Knowledge Base

Ovo je centralni ugovor za znanje koje koriste PatriaSoul AI, pametna pretraga, Vijesti, Gradovi i buduće funkcije.

## Datoteke znanja

- `index.json` — glavni generirani indeks PatriaSoul sadržaja.
- `core-knowledge.json` — ručno kurirani i provjereni temeljni zapisi koji nadopunjuju glavni indeks. Sadrži važne gradove, povijesne događaje, osobe, baštinu, vjeru i Domovinski rat.

AI učitava oba sloja i spaja ih prema jedinstvenom `id`-ju. Time se glavni indeks može ponovno generirati bez gubitka ručno provjerenog znanja iz `core-knowledge.json`.

## Izvori

Prioritet imaju vlastiti PatriaSoul sadržaji i provjereni vanjski izvori koji se smiju koristiti. Za vijesti se izvor čuva kao metapodatak; PatriaSoul generira vlastiti urednički tekst, ali ne skriva niti briše podatak o izvorniku.

## Statusi

- `draft` — radni zapis
- `review` — čeka uredničku provjeru
- `verified` — provjeren za AI činjenične odgovore
- `published` — objavljen na portalu

## Dohvat

Retriever treba rangirati rezultate prema:

1. točnosti/statusu (`verified` i `published` imaju prednost),
2. relevantnosti za pitanje,
3. povezanom gradu/kategoriji,
4. svježini za vremenski osjetljive vijesti.

AI treba dobiti samo mali broj najrelevantnijih zapisa, zajedno s njihovim izvorima. Ako nema dovoljno pouzdanog konteksta, odgovor treba jasno reći da podatak nije potvrđen u PatriaSoul bazi.

## Pokrivenost

Glavni indeks trenutno sadrži 127 gradova, 100 kvizova i 138 stranica. `core-knowledge.json` dodaje provjerene temeljne zapise iz više kategorija bez brisanja postojećeg sadržaja.

Cilj je postupno obogatiti svih 127 gradova te dodati povezane zapise za povijest, osobe, događaje, baštinu, vjeru, vijesti i kviz tako da PatriaSoul AI može povezivati teme, a ne samo prepoznavati nazive.

## Budući izvori

Predviđene kolekcije: 127 gradova, povijesni događaji, osobe, baština, vjera, vijesti i kviz. Vrijeme ostaje živi podatak iz vremenskog API-ja i nije trajna povijesna činjenica.
