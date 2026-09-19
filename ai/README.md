# PatriaSoul AI

PatriaSoul AI je zamišljen kao **„Pitaj PatriaSoul”** — hrvatski AI chat koji može biti ugrađen izravno u PatriaSoul web aplikaciju.

## Cilj

Napraviti chat koji može raditi **bez vlastitog API ključa i bez obaveznog cloud AI servisa**.

Glavni javni način rada treba biti:

`PatriaSoul web -> AI chat -> lokalni model u pregledniku`

Korisnik otvara PatriaSoul i razgovara s AI-em bez registracije posebnog AI API ključa.

## Kako napraviti chat bez API-ja

Za javnu web verziju predviđen je **browser-local AI**:

- WebGPU kada ga preglednik podržava
- lokalni model koji se preuzima na uređaj korisnika
- obrada upita na korisnikovom uređaju
- bez slanja pitanja na OpenAI, Gemini ili drugi AI API
- bez spremanja razgovora na vanjski AI servis
- mogućnost rada bez vlastitog API ključa

Za ovakav pristup može se koristiti WebLLM ili drugi browser-runtime za lokalne LLM modele.

### Važna napomena

„Bez API-ja” ne znači da AI model ne postoji. Model mora biti preuzet i pokrenut negdje.

Kod browser-local pristupa:

`Preglednik -> WebGPU -> lokalni LLM -> odgovor`

Prvo učitavanje može biti veće jer se model mora preuzeti na uređaj. Nakon toga model može ostati u lokalnom cacheu preglednika.

## PatriaSoul baza znanja

AI treba imati vlastiti sloj znanja o Hrvatskoj:

- hrvatska povijest
- Domovinski rat
- hrvatski gradovi
- geografija
- kultura i baština
- glagoljica
- vjera i duhovnost
- priroda
- hrvatske institucije i javno dostupni izvori
- PatriaSoul sadržaj
- pitanja i objašnjenja iz kviza

Baza znanja treba biti odvojena od samog modela.

Predviđena arhitektura:

`PatriaSoul sadržaj -> Knowledge Base -> relevantni kontekst -> lokalni LLM -> odgovor`

## Pravilo izvora

PatriaSoul AI ne smije izmišljati povijesne činjenice.

Kada nema dovoljno pouzdanih podataka:

> „Nemam dovoljno pouzdanih podataka za siguran odgovor. Ovaj podatak treba dodatno provjeriti.”

Kad je moguće, odgovor treba sadržavati izvor ili poveznicu na relevantan PatriaSoul/kanonski izvor.

## Pravilo tijekom kviza

Tijekom aktivnog kviza AI **ne smije otkrivati točan odgovor na pitanje**.

Može:

- objasniti opće pojmove
- pomoći razumjeti temu
- dati dodatni kontekst
- pomoći nakon predaje odgovora

Nakon predaje pitanja može objasniti zašto je odgovor točan ili netočan.

## Privatnost

Cilj browser-local načina rada:

- nema obaveznog AI API ključa
- pitanje se ne mora slati van uređaja
- razgovor se ne šalje automatski vanjskom AI pružatelju
- korisnik može koristiti chat izravno u pregledniku

Ako se kasnije doda cloud način rada, on mora biti jasno označen kao zaseban način rada.

## Dva moguća načina rada

### 1. PatriaSoul Local — javni web

`Browser -> WebGPU -> lokalni model`

Namijenjeno korisnicima PatriaSoul web aplikacije.

Prednosti:

- nema API ključa korisnika
- nema obaveznog cloud AI računa
- privatniji rad
- može se integrirati izravno u PatriaSoul

Ograničenje:

- kvaliteta i brzina ovise o uređaju
- prvi download modela može biti velik
- stariji mobiteli možda neće podržavati dovoljno snažan lokalni model

### 2. PatriaSoul Ollama — napredni lokalni način

`PatriaSoul -> Ollama -> lokalni model`

Ollama ostaje opcija za razvoj, administraciju i snažnije lokalne modele na računalu.

Ovaj način nije uvjet za javni PatriaSoul chat.

## Predložena struktura

`ai/`

- `README.md`
- `knowledge/`
- `prompts/`
- `browser/`
- `ollama/`
- `sources/`

### `knowledge/`

PatriaSoul znanje i strukturirani podaci.

### `prompts/`

Sustavne upute za identitet, izvore, ponašanje i pravila kviza.

### `browser/`

Kod za lokalni AI koji se izvršava u pregledniku.

### `ollama/`

Lokalna Ollama konfiguracija za razvoj i napredne korisnike.

### `sources/`

Popis i metapodaci provjerenih izvora.

## Konačni cilj

PatriaSoul treba imati vlastiti plutajući chat:

**Pitaj PatriaSoul 🇭🇷**

dostupan na stranicama PatriaSoul projekta.

Chat treba:

1. razumjeti hrvatski jezik
2. odgovarati prvenstveno na hrvatskom
3. koristiti PatriaSoul bazu znanja
4. jasno razlikovati činjenice od nesigurnih podataka
5. poštovati pravilo protiv otkrivanja odgovora tijekom aktivnog kviza
6. raditi bez obaveznog API ključa
7. biti prilagođen računalu i mobitelu
8. vizualno koristiti PatriaSoul identitet
9. ostati odvojen od glavnog kviz-enginea tako da AI promjene ne mogu pokvariti kviz

## Status

Trenutno je ovo arhitekturni plan.

Sljedeći korak je izrada stvarnog `Pitaj PatriaSoul` browser-local chata i povezivanje s PatriaSoul bazom znanja.
