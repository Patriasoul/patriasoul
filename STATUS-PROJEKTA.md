# PatriaSoul — stvarni status projekta

**Datum kontrole:** 2. rujna 2026.  
**Grana:** `main`  

> Ovaj dokument je kontrolna ploča projekta. **Postoji kod ≠ završena funkcija.** Funkcija je zelena tek kada je implementirana, povezana, sadržajno dovoljno popunjena i osnovno provjerena.

## Legenda
- 🟢 **ZAVRŠENO** — implementirano i osnovno povezano.
- 🟡 **PROŠIRITI / DOVRŠITI** — funkcionalna osnova postoji, ali sadržaj, integracija ili produkcijska dorada nisu završeni.
- 🔴 **NEDOVRŠENO** — ključni dio još nedostaje.
- 🔵 **QA** — treba završnu tehničku, sadržajnu ili izvorsku provjeru.

---

## 1. Jezgra i dizajn

| Područje | Status | Stvarno stanje |
|---|---|---|
| Početna stranica | 🟢 | Moderna početna i glavni moduli postoje. |
| Navigacija | 🟡 | Centralni obrazac postoji, ali treba završiti provjeru svih starijih stranica. |
| Dizajn sustav | 🟢 | Moderne varijable, globalni stilovi i responsive pravila postoje. |
| 404 | 🟢 | Moderna 404 stranica postoji. |
| Dokumentacija | 🟢 | `README.md`, `struktura.md`, `plan-razvoja.md` i ovaj status postoje. |
| Jedan izvor istine | 🟡 | Pravilo postoji, ali ga treba dosljedno primijeniti na sve registre. |

## 2. Gradovi — PRIORITET

Kanonski registar `gradovi.js` postoji i sadrži 127 gradova. fileciteturn5file0

| Područje | Status | Stvarno stanje |
|---|---|---|
| 127 gradova u registru | 🟢 | Registar je centraliziran. |
| Gradovi hub | 🟢 | Pretraga i županijsko grupiranje postoje. |
| Zajednički profil | 🟢 | `grad.html` je proširen u bogatiji zajednički predložak. |
| 127 punih uredničkih profila | 🔴 | Još nisu napisani stvarni sadržajni profili za svih 127 gradova. |
| Grbovi i vizuali | 🔴 | Nema sustavno riješenog vizualnog paketa za svih 127 gradova. |
| Povijest po gradu | 🟡 | Profil sada ima mjesto i poveznicu za povijesne zapise, ali treba puniti stvarnim izvorima. |
| Baština po gradu | 🟡 | Struktura postoji; sadržaj treba proširiti. |
| Ljudi po gradu | 🟡 | Predviđeno povezivanje s centralnom pretragom; registar osoba treba dodatno razviti. |
| Branitelji/brigade po gradu | 🟡 | Povezivanje je predviđeno; treba centralni odnos grad ↔ postrojba. |
| Vjera po gradu | 🟡 | Profil povezuje centralni Vjera hub; lokalni sadržaj još treba urediti. |

**Nova dorada:** gradski profil sada nije više samo šest praznih kartica; ima brzi pregled, kanonske podatke, povijest, baštinu, ljude, Domovinu/branitelje, vjeru, vrijeme, kviz, Brani svoj grad, pretragu i uredničku napomenu.

## 3. Kviz

| Područje | Status | Stvarno stanje |
|---|---|---|
| Centralni engine | 🟢 | Radi i objedinjuje banke. |
| Preslagivanje odgovora | 🟢 | Točan odgovor nije vezan uz A/B/C/D. |
| Timer i brzo bodovanje | 🟢 | 15 s i bonus postoje. |
| Miješani/dnevni/tjedni/mjesečni | 🟢 | Deterministički setovi postoje. |
| 800 postojećih pitanja | 🟢 | Banka postoji i ostavljena je netaknuta. |
| +1.200 pitanja | 🟡 | Tehnički postoji, ali dio sadržaja treba uredničko prepisivanje. |
| 2.000+ kvalitetno provjerenih pitanja | 🟡 | Količina nije isto što i završna kvaliteta. |
| Provjera svih pitanja | 🔵 | Potrebna sustavna kontrola izvora, duplikata i odgovora. |
| Zaštita rezultata | 🔴 | Rezultati nisu još server-side autoritativni. |

## 4. Profil, XP, razine i statistika

| Područje | Status | Stvarno stanje |
|---|---|---|
| 100 razina | 🟢 | Definirane u `levels.js`. |
| Značke | 🟡 | Postoje, ali sustav treba proširiti. |
| XP engine | 🟡 | Postoji, ali treba jedan centralni profilni model. |
| Profil | 🟡 | UI i lokalni podaci postoje; treba centralizacija. |
| Streak | 🟡 | Postoji podatak, ali treba jedinstveno spremanje. |
| Statistika kategorija | 🔴 | Nije dovršena kao centralni sustav. |
| Omiljena pitanja | 🔴 | Treba implementirati. |

## 5. Supabase i javna rang-lista

| Područje | Status | Stvarno stanje |
|---|---|---|
| Lokalni leaderboard UI | 🟢 | Postoji. |
| TOP 3 | 🟡 | Vizualni elementi postoje; treba puni javni sustav. |
| Supabase korisnici | 🔴 | Nije potvrđen dovršen produkcijski auth/profil tok. |
| Dnevna rang-lista | 🔴 | Nema zajedničke server-side liste. |
| Tjedna rang-lista | 🔴 | Nema zajedničke server-side liste. |
| Mjesečna rang-lista | 🔴 | Nema zajedničke server-side liste. |
| Ukupna javna rang-lista | 🔴 | Lokalni podaci nisu javni sustav. |

## 6. Brani svoj grad

| Područje | Status | Stvarno stanje |
|---|---|---|
| Odabir/pretraga grada | 🟢 | Radi nad registrom gradova. |
| Izazov od 5 pitanja | 🟢 | Implementiran. |
| Bodovanje | 🟡 | Radi lokalno, nije centralno natjecanje. |
| Spremanje rezultata | 🟡 | Lokalno spremanje. |
| Gradska rang-lista | 🟡 | Lokalna; treba Supabase. |
| Puni profil grada | 🟡 | Sada povezan s gradskim predloškom. |
| Misije/napredovanje grada | 🔴 | Nije implementirano. |
| Multiplayer | 🔴 | Kasnija faza. |

## 7. Vjera

| Područje | Status | Stvarno stanje |
|---|---|---|
| Vjera hub | 🟢 | Postoji. |
| Centralni `vjera.js` | 🟢 | Postoji. |
| Evanđelje | 🟡 | Treba centralni dnevni/izvorski sustav. |
| Svetac dana | 🟡 | Treba dovršiti kalendar i podatke. |
| Molitve | 🟡 | Treba centralnu strukturu i više sadržaja. |
| Krunica | 🟡 | Stranica postoji; treba sadržajni audit. |
| Blagdani | 🟡 | Treba dovršiti kalendar. |
| Biblija | 🟡 | Treba jasno definirati opseg i izvore. |
| Jedan izvor istine | 🔵 | Potrebno ukloniti dupliciranje između HTML-a i JS-a. |

## 8. Povijest i baština

| Područje | Status | Stvarno stanje |
|---|---|---|
| Povijest hub | 🟡 | Velik sadržaj postoji; treba konsolidacija i QA. |
| Povijest registar | 🟡 | Više izvora datoteka treba objediniti. |
| Baština | 🟡 | Postoji, ali treba više zapisa i izvora. |
| Bitke | 🟡 | Registar postoji; treba završnu provjeru. |
| Obljetnice | 🟢 | Centralni registar i renderer postoje. |
| Spomenici | 🟡 | Registar postoji; treba provjeru i proširenje. |

## 9. Branitelji, brigade i heroji

| Područje | Status | Stvarno stanje |
|---|---|---|
| Branitelji hub | 🟡 | Osnova postoji. |
| Postrojbe | 🟡 | Registar postoji; treba završni audit. |
| Brigade | 🟡 | Registar postoji; prikaz je sada proširen filtriranjem, statistikama i povezanim zapisima. |
| Heroji | 🟡 | Registar postoji; trebaju izvori i bogatiji profili. |
| Operacije | 🟡 | Registar postoji; treba urednički audit. |
| Vukovar | 🟡 | Poseban memorijalni sadržaj postoji; treba završna integracija. |

**Nova dorada:** `brigade.html` sada ima broj zapisa, broj gardijskih/ostalih brigada, filter po vrsti, bogatiji opis i poveznice prema centralnoj pretrazi i profilu sjedišta. Osnovni registar ostaje odvojen od budućih detaljnih monografija. fileciteturn8file0

## 10. Vijesti / feed

| Područje | Status | Stvarno stanje |
|---|---|---|
| Vijesti UI | 🟡 | Postoji. |
| RSS workflow | 🟢 | Workflow postoji. |
| Feed podaci | 🔴 | Posljednja kontrola je pokazala prazan `news-feed.json`; treba potvrditi zašto se ne puni. |
| Izvori | 🟡 | Konfigurirana su najmanje tri službena izvora. fileciteturn11file0 |
| Kategorije | 🟢 | Schema kategorija postoji. |
| Siguran admin | 🔴 | Postojeći admin nije zamjena za server-side autentificirani CMS. |

## 11. Vrijeme

| Područje | Status | Stvarno stanje |
|---|---|---|
| Vremenska stranica | 🟢 | Postoji. |
| Horizontalna traka | 🟢 | Postoji. |
| Najbliži gradovi | 🟢 | Postoji. |
| DHMZ workflow | 🟡 | Automatizacija postoji; treba kontinuirani QA. |
| Hrvatska baza lokacija | 🟡 | Proširena; treba završno mapiranje stanica. |

## 12. AI / Knowledge Base

| Područje | Status | Stvarno stanje |
|---|---|---|
| AI client | 🟢 | Postoji. |
| Pitaj PatriaSoul | 🟢 | UI i widget postoje. |
| Provider | 🟡 | Postoji, treba produkcijsko testiranje. |
| Knowledge schema | 🟢 | Postoji. |
| Retriever | 🟢 | Postoji rangiranje i confidence. |
| Knowledge index | 🟡 | Velik indeks postoji; treba provjeriti obnovu workflowa. |
| Pokrivenost | 🟡 | Treba više provjerenih zapisa po temama. |

## 13. Centralna pretraga — PRIORITET

Trenutna pretraga pretražuje javne HTML stranice preko sitemap-a, ali nije još pravi pretraživač svih kanonskih JS registara. fileciteturn12file0

| Područje | Status | Stvarno stanje |
|---|---|---|
| Pretraga javnih stranica | 🟢 | Radi preko sitemap-a. |
| Filteri kategorija | 🟢 | UI postoji. |
| Direktna pretraga gradova registra | 🟡 | Treba direktno spojiti `gradovi.js`. |
| Direktna pretraga brigada/registara | 🟡 | Treba centralno indeksiranje registara. |
| Jedan rezultatni model | 🔴 | Još nije objedinjen za sve registre. |
| Brzina | 🟡 | Browser učitava više HTML stranica; treba optimizacija. |

## 14. Video i galerija

| Područje | Status | Stvarno stanje |
|---|---|---|
| Video stilovi | 🟡 | CSS osnova postoji. |
| Video portal | 🔴 | Nije dovršen kao pravi centralni sustav. |
| Galerija | 🟡 | Osnovni asseti postoje; treba stvarni katalog galerija. |
| Povezivanje s gradovima/poviješću | 🔴 | Nije centralizirano. |

---

# Što sada širimo

## A. Sadržaj po stranicama
Nećemo više samo povećavati broj kartica. Svaki veći modul treba dobiti:
1. uvodni tekst koji objašnjava temu;
2. kanonske podatke;
3. stvarne zapise;
4. povezane registre;
5. izvore;
6. pretragu/filter;
7. poveznice prema drugim PatriaSoul modulima.

## B. Prioritet proširenja
1. **127 gradova** — stvarni sadržajni profili, ne samo predložak.
2. **Centralna pretraga registara** — gradovi, povijest, baština, vjera, brigade, heroji, operacije i kviz.
3. **Supabase profil + XP + statistika + rang-lista.**
4. **Brani svoj grad** — misije, napredovanje i gradsko natjecanje.
5. **Branitelji/brigade/heroji** — detaljniji zapisi i izvori.
6. **Vjera** — jedan centralni izvor i više provjerenog sadržaja.
7. **Povijest/baština** — konsolidacija i povećanje dubine zapisa.
8. **Vijesti/feed** — popraviti prazan feed i urediti workflow.
9. **Video/galerija** — napraviti pravi katalog umjesto samo vizualne osnove.
10. **Kviz** — urednički provjeriti 2.000+ pitanja.

## Pravilo kvalitete
**Ne punimo stranice izmišljenim činjenicama samo da izgledaju bogatije.** Kad podatak nije potvrđen, označava se kao sadržaj koji čeka izvor. Cilj je bogat PatriaSoul, ali i točan PatriaSoul.
