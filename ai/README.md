# PatriaSoul AI

Ovaj direktorij je rezerviran za lokalni AI sloj projekta PatriaSoul.

## Cilj

PatriaSoul AI koristi Ollamu kao lokalni AI motor, bez obaveznog API ključa i bez cloud servisa.

AI sloj treba ostati odvojen od postojećih stranica, kvizova i kanonskih registara kako se postojeća struktura ne bi rušila.

## Plan

- lokalni chat
- PatriaSoul baza znanja
- pomoć pri pisanju i uređivanju sadržaja
- provjera izvora i činjenica
- pomoć pri održavanju stranice
- buduća WordPress integracija

## Pravilo izvora

AI ne smije izmišljati povijesne činjenice. Kada nema dovoljno pouzdanih podataka, treba jasno reći da podatak treba provjeru.

## Arhitektura

`PatriaSoul sadržaj -> AI sloj -> Ollama -> lokalni model`

Ovaj direktorij je početna točka. Konkretna integracija s webom dolazi nakon provjere postojeće strukture i QA sustava.
