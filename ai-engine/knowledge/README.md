# PatriaSoul Knowledge Base

Ovo je centralni ugovor za znanje koje koriste PatriaSoul AI, pametna pretraga, Vijesti, Gradovi i buduće funkcije.

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

## Budući izvori

Predviđene kolekcije: 127 gradova, povijesni događaji, osobe, baština, vjera, vijesti i kviz. Vrijeme ostaje živi podatak iz vremenskog API-ja i nije trajna povijesna činjenica.
