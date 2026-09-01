# PatriaSoul — fazna kontrola nakon implementacije

**Datum:** 1. rujna 2026.
**Grana:** `main`
**Aktualni commit:** `a2f8000b364b90211ce013babc2a830cc58cc26a`

## Faza 1 — završeno

- Jedinstveni profil: `patriasoul-profile.js` je jedini izvor XP-a, bodova, streaka, kategorija, gradova, favorita i rezultata.
- `xp-engine.js`, `badges.js`, `profil.html`, `quiz.html`, `brani-svoj-grad.html` više ne stvaraju paralelne profile.
- 100 razina ostaje u `levels.js` kao jedini registar razina.
- Značke su proširene i čitaju centralni profil.
- Omiljena pitanja imaju centralni API.
- Brani svoj grad koristi isti profil/XP sustav.
- Rang-lista ima dnevni/tjedni/mjesečni/ukupni način rada i backend adapter.
- Kviz koristi centralni profil i centralno spremanje rezultata.
- `pages/kviz/index.html` je moderan ulaz u središnji kviz.
- Video i galerija imaju jedan centralni media registar i zasebne prikaze.
- `O PatriaSoul` je zasebna završena stranica.
- PWA jezgra: service worker + registracija + cache shell.
- `/qa.html` automatski provjerava jezgru projekta.

## Faza 2 — tehnička implementacija završena

- Supabase produkcijska shema u `supabase/schema.sql`.
- Samostalna SQL migracija u `supabase/migrations/20260901000000_patriasoul_core.sql`.
- `profiles`, `quiz_results`, `favorite_questions`.
- RLS politike za profile, rezultate i favorite.
- Javne leaderboard view-e za ukupno/dnevno/tjedno/mjesečno.
- Auth trigger za automatsko kreiranje profila nakon registracije.
- `patriasoul-supabase.js` adapter za Auth, rezultate i rang-listu.
- Service-role ključ se ne nalazi u frontend kodu.
- Multimedijski registry i SVG fallback vizuali.

## Što je spremno za stvarni test

**Lokalni/demo put je odmah testabilan** bez ikakvog vanjskog ključa: kviz → centralni profil → XP → značke → Brani svoj grad → lokalna rang-lista → PWA → QA.

**Supabase produkcijski put je kodno spreman.** Za stvarnu javnu zajedničku rang-listu treba samo primijeniti migraciju na povezani Supabase projekt i u runtime dodati javni publishable/anon ključ. Taj ključ nije i neće biti spremljen u javni repozitorij.

## Urednička kvaliteta

Tehnički sustav sada može validirati strukturu pitanja i detektirati duplikate, ali tehnička validacija nije isto što i povijesna/editorijalna provjera činjenica. Zato se prije javne objave moraju završno potvrditi izvori pojedinačnih povijesnih zapisa i pitanje-po-pitanje kvaliteta kviz banke. Nismo namjerno lažno označili takav sadržaj kao verificiran.

## Arhitektonsko pravilo

**Jedan podatak → jedno mjesto istine → više prikaza.**

Ne stvarati paralelne profile, rang-liste, grad-registre, media registre ili kopirane sadržaje.
