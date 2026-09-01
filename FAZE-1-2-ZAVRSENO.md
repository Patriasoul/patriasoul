# PatriaSoul — fazna kontrola nakon implementacije

**Datum:** 1. rujna 2026.
**Grana:** `main`
**Implementacijski commit:** `e0e4faf7d5571f1494a9b26bd0cf6e2d16bba6ab`

## Faza 1 — završeno

- Jedinstveni profil: `patriasoul-profile.js` je jedini izvor XP-a, bodova, streaka, kategorija, gradova, favorita i rezultata.
- `xp-engine.js`, `badges.js`, `profil.html`, `quiz.html`, `brani-svoj-grad.html` više ne trebaju paralelne profile.
- 100 razina ostaje u `levels.js` kao jedini registar razina.
- Značke su proširene i čitaju centralni profil.
- Omiljena pitanja imaju centralni API.
- Brani svoj grad koristi isti profil/XP sustav.
- Rang-lista ima dnevni/tjedni/mjesečni/ukupni način rada i adapter za backend.
- Kviz koristi centralni profil i ne stvara drugi profilni ključ.
- `pages/kviz/index.html` je moderniziran ulaz u centralni kviz.
- Video i galerija imaju jedan centralni media registar i zasebne prikaze.
- `O PatriaSoul` je dovršen kao zasebna stranica.
- PWA jezgra: service worker + registracija + cache shell.
- QA stranica: `/qa.html` provjerava banku, gradove, razine, profil i značke.

## Faza 2 — implementirano

- Supabase produkcijska shema u `supabase/schema.sql`.
- Idempotentna migracija u `supabase/migrations/20260901000000_patriasoul_core.sql`.
- `profiles`, `quiz_results`, `favorite_questions`.
- RLS politike za vlastiti profil, rezultate i favorite.
- Javne leaderboard view-e za ukupno/dnevno/tjedno/mjesečno.
- Auth trigger za automatsko kreiranje profila nakon registracije.
- `patriasoul-supabase.js` adapter za Auth, profile rezultate i leaderboard.
- Nema service-role ključa u browser kodu.
- Multimedijski registry i vizualni fallback SVG resursi.

## Važno za testiranje

Repozitorij sada ima kompletan **lokalni/demo put** bez vanjskih ključeva. Supabase produkcijski put je spreman, ali stvarna javna baza se aktivira tek kada se na Supabase projektu primijeni migracija i u runtime se doda javni publishable/anon ključ. To nije hardkodirano u repozitorij radi sigurnosti.

## QA pravilo

Ne označavamo sadržaj kao urednički verificiran samo zato što je tehnički generiran. Posebno se prije javne objave moraju potvrditi izvori pojedinačnih povijesnih zapisa i pitanje-po-pitanje kvaliteta kviz banke. Tehnički engine ih sada može automatski prijaviti kroz `/qa.html` i `PatriaQuiz.validate()`.

## Arhitektonsko pravilo

**Jedan podatak → jedno mjesto istine → više prikaza.**

Ne stvarati paralelne profile, rang-liste, grad-registre, media registre ili kopirane sadržaje.
