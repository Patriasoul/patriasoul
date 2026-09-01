# PatriaSoul — struktura projekta

> Kanonski arhitekturni dokument za razvoj, sadržaj i podatkovni sloj PatriaSoula.

## 1. Osnovno pravilo

PatriaSoul koristi princip **jednog mjesta istine**.

Svaki važan podatak treba imati jednog vlasnika. Ostali dijelovi aplikacije taj podatak samo čitaju, filtriraju ili prikazuju.

Ne duplicirati:
- popis gradova
- izvore
- biografske podatke
- povijesne događaje
- spomenike
- pitanja kviza
- kategorije

Ako je podatak već u kanonskom registru, novi modul treba koristiti postojeći ID.

---

## 2. Glavne sadržajne cjeline

Glavna arhitektura prati MASTER PLAN:

1. **Domovina**
2. **Branitelji**
3. **Povijest**
4. **Baština**
5. **Vjera**
6. **Gradovi**
7. **Brani svoj grad**
8. **Kviz**
9. **Vijesti**
10. **Video**
11. **Galerija**
12. **O PatriaSoulu**

Svaka cjelina može imati vlastite prikazne stranice i module, ali podatkovni izvori moraju ostati centralizirani.

---

## 3. Kanonski podatkovni sloj

### Gradovi

`gradovi.js`

Jedini kanonski registar **127 gradova Republike Hrvatske**.

Pravila:
- ne stvarati drugi popis gradova
- koristiti stabilni `id` grada
- profil grada povezuje dodatne sadržaje preko ID-a
- županija se čita iz kanonskog zapisa

`gradovi.html`

Hub za pregled, pretragu i filtriranje gradova.

`grad.html`

Jedinstveni predložak profila grada. Ne izrađivati 127 zasebnih HTML stranica.

---

### Izvori

`sources-phase2.js`

Jedini kanonski registar uredničkih izvora.

Izvor se povezuje s tvrdnjama i zapisima preko `sourceIds`.

Izvorni tekstovi se ne kopiraju; koristi se vlastiti urednički opis uz navođenje izvora.

---

### Spomenici i memorijalna baština

`spomenici.js`

Centralni registar spomenika, memorijala i mjesta sjećanja.

Svaki zapis može sadržavati:
- `id`
- naziv
- grad
- županiju
- kategoriju
- razdoblje
- opis
- oznake
- povezane izvore
- status provjere

Novi sadržaji trebaju referencirati postojeći ID umjesto stvaranja kopije.

---

### Pitanja

Postojeće banke pitanja ostaju vlasnici kviz sadržaja.

Pravila:
- ne kopirati ista pitanja u više banaka bez razloga
- kategorija pitanja mora biti jasno određena
- točan odgovor ne smije uvijek biti pod istom opcijom
- dnevni, tjedni i mjesečni kviz koriste centralni engine
- dodatne faze mogu koristiti XP, streak, značke i rang-liste

---

## 4. Utility sloj

`split.js`

Opći utility za sigurno dijeljenje velikih nizova i tekstova.

Predviđene funkcije uključuju:
- chunkanje nizova
- podjelu na grupe
- podjelu teksta
- podjelu prema duljini
- grupiranje prema uvjetu

Utility ne smije sadržavati poslovne podatke PatriaSoula.

---

## 5. Povezivanje entiteta

Preporučeni obrazac:

```text
Grad
 ├── povijest
 ├── znamenitosti
 ├── spomenici
 ├── baština
 ├── osobe
 ├── događaji
 ├── statistika
 └── izvori
```

Primjer:

```js
{
  cityId: "split",
  sourceIds: ["enciklopedija", "min-kultura"]
}
```

Ne spremati puni sadržaj izvora unutar svakog grada ili spomenika.

---

## 6. Pravilo izvora i provjere

Sadržajne tvrdnje trebaju imati izvor kada je to primjenjivo.

Prioritet izvora:

1. službeni državni izvori
2. službeni registri i otvoreni podaci
3. znanstvene i akademske institucije
4. muzeji i ustanove kulture
5. međunarodne institucije
6. provjereni sekundarni izvori

Za osjetljive povijesne i ratne teme koristiti više izvora kada je moguće.

`verified: false` znači da zapis postoji u podatkovnom sloju, ali nije označen kao urednički potvrđen.

---

## 7. Prikazni sloj

HTML stranice i UI komponente trebaju biti što više generičke.

Primjer:

```text
kanonski podatak
      ↓
filter / search
      ↓
predložak
      ↓
UI kartica / profil / stranica
```

Ne unositi velike statične popise izravno u HTML ako podatak već postoji u JS registru.

---

## 8. Faze razvoja

### Faza 1 — Temelj
- početna stranica
- navigacija
- osnovni hubovi
- osnovni vizualni identitet
- osnovni predlošci

### Faza 2 — Sadržaj i podatci
- 127 gradova
- izvori
- spomenici
- baština
- povijesni sadržaj
- povezivanje entiteta
- pretraga i filtriranje
- podatkovna validacija

### Faza 3 — Kviz i igra
- centralni quiz engine
- kategorije
- dnevni kviz
- tjedni kviz
- mjesečni kviz
- rang-liste
- XP i leveli
- streak
- značke
- Brani svoj grad

### Faza 4 — Korisnički sustav
- profili
- korisničke statistike
- spremanje rezultata
- favoriti
- admin panel
- moderacija sadržaja

### Faza 5 — Multiplayer i napredne funkcije
- Duel
- natjecanja
- sezonski sustav
- napredne ljestvice
- društvene funkcije

---

## 9. Pravila za nove datoteke

Prije stvaranja nove datoteke provjeriti:

1. postoji li već kanonski modul za taj podatak
2. može li se koristiti postojeći ID
3. treba li podatak pripadati postojećoj bazi
4. postoji li odgovarajući izvor
5. treba li podatak biti verificiran

Nova datoteka treba imati jasno definiranu odgovornost.

Ne stvarati datoteke samo zato da bi se duplicirao postojeći sadržaj.

---

## 10. Pravila kvalitete

Kod treba biti:
- modularan
- UTF-8
- bez nepotrebnih dupliciranja
- kompatibilan s postojećom arhitekturom
- lako proširiv
- dovoljno jednostavan za održavanje

Sadržaj treba biti:
- provjerljiv
- jasno kategoriziran
- povezan s izvorima
- pisan vlastitim riječima
- bez izmišljanja činjenica

---

## 11. Kanonski registri — trenutno

| Modul | Datoteka | Uloga |
|---|---|---|
| Gradovi | `gradovi.js` | 127 gradova RH |
| Izvori | `sources-phase2.js` | urednički izvori |
| Spomenici | `spomenici.js` | spomenici i memorijali |
| Split/chunk utility | `split.js` | obrada velikih nizova i tekstova |
| Pitanja | postojeće question bank datoteke | kviz sadržaj |

---

## 12. Zlatno pravilo PatriaSoula

**Jedan podatak → jedno mjesto istine → više prikaza.**

Podaci se ne kopiraju da bi stranice bile pune. Podaci se centralno održavaju, povezuju izvorima i zatim prikazuju tamo gdje su korisniku potrebni.
