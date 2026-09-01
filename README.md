# PatriaSoul 🇭🇷

PatriaSoul je digitalni projekt posvećen hrvatskoj povijesti, gradovima, baštini, vjeri, sjećanju i znanju.

## Jezgra

- 127 hrvatskih gradova u `gradovi.js`
- zajednički grad template `grad.html`
- centralni kviz engine `quiz.js`
- 800 + dodatna banka pitanja
- dnevni, tjedni, mjesečni i miješani kviz
- jedinstveni profil/XP/streak/bedževi u `patriasoul-profile.js`
- rang-lista i `Brani svoj grad`
- Vjera, Baština, Povijest, Branitelji, Vijesti i Vrijeme
- AI + Knowledge Base
- Video + Galerija
- PWA/service worker
- Supabase schema, RLS i leaderboard views

## Arhitektura

**Jedan podatak → jedno mjesto istine → više prikaza.**

Ne duplicirati registre ili profilne sustave. Kanonski podaci žive u centralnim JS/JSON registrima, a HTML stranice ih samo prikazuju.

## Test

Otvori `/qa.html` za automatsku provjeru jezgre projekta.

## Supabase

Schema: `supabase/schema.sql`

Migracija: `supabase/migrations/20260901000000_patriasoul_core.sql`

Ključevi se ne spremaju u javni repozitorij. Browser smije koristiti samo javni publishable/anon ključ uz uključene RLS politike; service-role ključ nikada ne ide u frontend.

## Dokumentacija

- `struktura.md` — arhitektura i pravilo izvora istine
- `FAZE-1-2-ZAVRSENO.md` — posljednja fazna kontrola
- `STATUS-PROJEKTA.md` — širi audit i otvorene uredničke/vanjske stavke
