#!/usr/bin/env node
/**
 * PatriaSoul — Faza A urednički QA
 *
 * Provjerava kanonski registar gradova i sve gradova-profil*.js registre.
 * Ne procjenjuje istinitost činjenica; provjerava da je struktura profila
 * potpuna, da izvori postoje i da se interne uredničke napomene ne probijaju
 * u javne profile.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');

const citiesText = read('gradovi.js');
const cityMatches = [...citiesText.matchAll(/\{\"name\":\"([^\"]+)\"/g)];
const cities = cityMatches.map((m) => m[1]);

const profileFiles = fs.readdirSync(root)
  .filter((name) => /^gradovi-profil(?:-\d+|-fallback)?\.js$/.test(name))
  .sort((a, b) => a.localeCompare(b, 'hr'));

const profileText = profileFiles.map((file) => read(file)).join('\n');

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
  profilesWithoutSources: [],
  profilesWithoutRequiredFields: [],
  forbiddenEditorialNotes: []
};

for (const city of cities) {
  const escaped = city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const cityBlock = new RegExp(`(?:[\\\"']${escaped}[\\\"']\\s*:\\s*\\{)([\\s\\S]*?)(?=\\n\\s*[\\\"'](?:[^\\\"']+)[\\\"']\\s*:\\s*\\{|\\n\\};)`, 'm').exec(profileText);

  if (!cityBlock) {
    report.missingFromAnyProfile.push(city);
    continue;
  }

  const block = cityBlock[1];
  const required = ['intro', 'geography', 'history', 'heritage', 'people', 'defence', 'faith', 'sources'];
  const missing = required.filter((field) => !new RegExp(`\\b${field}\\s*:`).test(block));
  if (missing.length) report.profilesWithoutRequiredFields.push({ city, missing });

  if (!/\bsources\s*:\s*\[[^\]]+\]/s.test(block)) {
    report.profilesWithoutSources.push(city);
  }

  for (const phrase of forbidden) {
    if (block.toLocaleLowerCase('hr-HR').includes(phrase.toLocaleLowerCase('hr-HR'))) {
      report.forbiddenEditorialNotes.push({ city, phrase });
    }
  }
}

const ok = report.missingFromAnyProfile.length === 0
  && report.profilesWithoutRequiredFields.length === 0
  && report.profilesWithoutSources.length === 0
  && report.forbiddenEditorialNotes.length === 0;

console.log(JSON.stringify({ ok, ...report }, null, 2));
process.exitCode = ok ? 0 : 1;
