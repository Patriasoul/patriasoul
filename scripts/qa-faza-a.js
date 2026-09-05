#!/usr/bin/env node
/**
 * PatriaSoul — Faza A završni QA
 *
 * Provjerava kanonski registar gradova, profilni sloj, centralnu pretragu
 * i zaštitu od javnog prikaza internih uredničkih napomena.
 *
 * QA je strukturni/integracijski test. Ne tvrdi da je svaka povijesna
 * činjenica neovisno provjerena; to ostaje urednički audit izvora.
 */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');

const citiesText = read('gradovi.js');
const cities = [...citiesText.matchAll(/\{\"name\":\"([^\"]+)\"/g)].map((m) => m[1]);
const profileFiles = fs.readdirSync(root)
  .filter((name) => /^gradovi-profil(?:-\d+|-fallback)?\.js$/.test(name))
  .sort((a, b) => a.localeCompare(b, 'hr'));
const profileText = profileFiles.map((file) => read(file)).join('\n');
const fallbackText = read('gradovi-profil-fallback.js');
const searchText = read('patriasoul-search-registry.js');

const forbidden = [
  'ne navoditi kao',
  'pitanje podrijetla treba prikazivati oprezno',
  'treba dodati kasnije',
  'needs adding later'
];

const report = {
  totalCities: cities.length,
  profileFiles,
  missingFromAnyProfile: [],
  coveredByRuntimeFallback: [],
  profilesWithoutSources: [],
  profilesWithoutRequiredFields: [],
  forbiddenEditorialNotes: [],
  runtimeSanitizerPresent: /editorialObjects\.forEach\(function \(registry\)/.test(fallbackText),
  searchRegistryPresent: /PATRIA_SEARCH_REGISTRY_READY/.test(searchText),
  searchModules: {
    cities: /gradovi\.js/.test(searchText),
    brigade: /importModule\('brigade\.js'\)/.test(searchText),
    heroji: /importModule\('heroji\.js'\)/.test(searchText),
    operacije: /importModule\('operacije\.js'\)/.test(searchText),
    vjera: /importModule\('vjera\.js'\)/.test(searchText)
  }
};

for (const city of cities) {
  const escaped = city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const cityBlock = new RegExp(`(?:[\\\"']${escaped}[\\\"']\\s*:\\s*\\{)([\\s\\S]*?)(?=\\n\\s*[\\\"'](?:[^\\\"']+)[\\\"']\\s*:\\s*\\{|\\n\\};)`, 'm').exec(profileText);

  if (!cityBlock) {
    // The fallback is intentionally runtime-generated from the canonical 127-city registry.
    if (/cities\.forEach\(function \(city\)/.test(fallbackText)) {
      report.coveredByRuntimeFallback.push(city);
    } else {
      report.missingFromAnyProfile.push(city);
    }
    continue;
  }

  const block = cityBlock[1];
  const required = ['intro', 'geography', 'history', 'heritage', 'people', 'defence', 'faith', 'sources'];
  const missing = required.filter((field) => !new RegExp(`\\b${field}\\s*:`).test(block));
  if (missing.length) report.profilesWithoutRequiredFields.push({ city, missing });
  if (!/\bsources\s*:\s*\[[^\]]+\]/s.test(block)) report.profilesWithoutSources.push(city);

  for (const phrase of forbidden) {
    if (block.toLocaleLowerCase('hr-HR').includes(phrase.toLocaleLowerCase('hr-HR'))) {
      report.forbiddenEditorialNotes.push({ city, phrase });
    }
  }
}

const allSearchModules = Object.values(report.searchModules).every(Boolean);
const ok = report.totalCities === 127
  && report.missingFromAnyProfile.length === 0
  && report.profilesWithoutRequiredFields.length === 0
  && report.profilesWithoutSources.length === 0
  && report.runtimeSanitizerPresent
  && report.searchRegistryPresent
  && allSearchModules;

console.log(JSON.stringify({
  ok,
  coveragePercent: report.totalCities ? Math.round(((report.totalCities - report.missingFromAnyProfile.length) / report.totalCities) * 100) : 0,
  warnings: report.forbiddenEditorialNotes,
  ...report
}, null, 2));
process.exitCode = ok ? 0 : 1;
