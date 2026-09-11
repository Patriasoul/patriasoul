/* PatriaSoul AI Agent — Knowledge-only Agent v8
 * Unified Croatian Knowledge Base + canonical 127-city registry + local Answer Engine.
 * No external AI API is used.
 */
(function (global) {
  'use strict';

  const MAX_CONTEXT_ITEMS = 8;
  const KNOWLEDGE_FILES = [
    '/ai-engine/knowledge/index.json',
    '/ai-engine/knowledge/core-knowledge.json',
    '/ai-engine/knowledge/croatia-core-expansion.json'
  ];
  const CITY_FILES = [
    '/gradovi.js','/gradovi-profil.js','/gradovi-profil-2.js','/gradovi-profil-3.js',
    '/gradovi-profil-4.js','/gradovi-profil-5.js','/gradovi-profil-6.js','/gradovi-profil-7.js',
    '/gradovi-profil-8.js','/gradovi-profil-9.js','/gradovi-profil-10.js','/gradovi-profil-11.js',
    '/gradovi-profil-12.js','/gradovi-profil-regije.js','/gradovi-profil-fallback.js'
  ];
  let cityPromise = null;
  let cityItems = [];

  const normalize = value => String(value || '').toLocaleLowerCase('hr-HR')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();

  function isQuizQuestion(q) {
    return /\b(kviz|pitanje|točan odgovor|tocan odgovor|odgovori|odgovor je|koji je odgovor)\b/.test(String(q || '').toLocaleLowerCase('hr-HR'));
  }

  function isCityQuestion(q) {
    const text = normalize(q);
    if (/\b(grad|grada|gradu|gradom|gradovi|gradovima)\b/.test(text)) return true;
    return cityItems.some(item => {
      const name = normalize(item.title);
      return name && (text === name || text.includes(name));
    });
  }

  async function loadJson(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error('Ne mogu učitati PatriaSoul Knowledge Base: ' + path);
    const data = await response.json();
    return Array.isArray(data) ? data : (data && Array.isArray(data.items) ? data.items : []);
  }

  async function runFirstPartyScript(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error('Ne mogu učitati gradski registar: ' + path);
    const code = await response.text();
    new Function(code + '\n//# sourceURL=' + path).call(global);
  }

  function editorialMap() {
    const registries = [global.PATRIA_CITY_EDITORIAL, global.PATRIA_CITY_EDITORIAL_2, global.PATRIA_CITY_EDITORIAL_3,
      global.PATRIA_CITY_EDITORIAL_4, global.PATRIA_CITY_EDITORIAL_5, global.PATRIA_CITY_EDITORIAL_6,
      global.PATRIA_CITY_EDITORIAL_7, global.PATRIA_CITY_EDITORIAL_8, global.PATRIA_CITY_EDITORIAL_9,
      global.PATRIA_CITY_EDITORIAL_10, global.PATRIA_CITY_EDITORIAL_11, global.PATRIA_CITY_EDITORIAL_12].filter(Boolean);
    const map = new Map();
    registries.forEach(reg => Object.keys(reg).forEach(name => { if (!map.has(name)) map.set(name, reg[name]); }));
    return map;
  }

  function buildCities() {
    const cities = Array.isArray(global.PATRIA_CITY_DATA) ? global.PATRIA_CITY_DATA : [];
    const editorial = editorialMap();
    const fallback = global.PATRIA_CITY_EDITORIAL_FALLBACK || {};
    const regional = global.PATRIA_CITY_REGIONAL_CONTEXT || {};

    return cities.map(city => {
      const data = editorial.get(city.name) || fallback[city.name] || {};
      const region = regional[city.county] || {};
      const list = value => Array.isArray(value) ? value.join('. ') : String(value || '');
      const regionalText = [region.region, region.nature, region.culture, region.economy].filter(Boolean).join('. ');
      const content = [data.intro, data.geography, data.history, list(data.heritage), list(data.people), data.defence, data.faith, regionalText]
        .filter(value => String(value || '').trim()).join(' ');
      return {
        id: 'city-profile-' + city.slug,
        type: 'grad',
        title: city.name,
        content: content || (city.name + ' je grad u ' + city.county + '.'),
        tags: [city.name, city.county, 'grad', 'Hrvatska', region.region].filter(Boolean),
        cityId: city.slug,
        source: 'https://mpudt.gov.hr/gradjani-21417/iz-djelokruga/lokalna-i-podrucna-regionalna-samouprava-24398/popis-zupanija-gradova-i-opcina-24402/24402',
        sourceTitle: 'MPUDT RH — kanonski registar gradova; PatriaSoul urednički registar',
        status: 'verified',
        updatedAt: '2026-09-11T13:00:00+02:00'
      };
    });
  }

  async function loadCityKnowledge() {
    if (cityPromise) return cityPromise;
    cityPromise = (async () => {
      for (const path of CITY_FILES) {
        try { await runFirstPartyScript(path); }
        catch (error) { if (path === '/gradovi.js') throw error; }
      }
      cityItems = buildCities();
      return cityItems;
    })();
    return cityPromise;
  }

  async function loadKnowledge() {
    const loaded = await Promise.all(KNOWLEDGE_FILES.map(loadJson));
    const cities = await loadCityKnowledge();
    const seen = new Set();
    const merged = [];
    loaded.flat().concat(cities).forEach(item => {
      if (!item || !item.id || seen.has(item.id)) return;
      seen.add(item.id); merged.push(item);
    });
    return merged;
  }

  function ensureDependencies() {
    if (!global.PatriaSoulAgentRouter) throw new Error('PatriaSoul Agent Router nije učitan.');
    if (!global.PatriaSoulAgentTools) throw new Error('PatriaSoul Agent Tool Registry nije učitan.');
    if (!global.PatriaSoulKnowledgeRetriever) throw new Error('PatriaSoul Knowledge Retriever nije učitan.');
    if (!global.PatriaSoulAI || typeof global.PatriaSoulAI.ask !== 'function') throw new Error('PatriaSoul AI provider nije učitan.');
  }

  async function ask(question, options) {
    const opts = options || {};
    const q = String(question || '').trim();
    if (!q) throw new Error('Upiši pitanje.');
    ensureDependencies();
    if (global.PatriaSoulQuizGuard) {
      const guard = global.PatriaSoulQuizGuard.guard(q, { quizActive: !!opts.quizActive, pathname: global.location && global.location.pathname });
      if (guard.blocked) return { text: guard.text, blocked: true, route: null, results: [], context: [], provider: 'patriasoul-quiz-guard', model: '', fallback: false };
    }
    const route = global.PatriaSoulAgentRouter.route(q);
    const items = await loadKnowledge();
    const quizQuestion = isQuizQuestion(q);
    const cityQuestion = isCityQuestion(q);
    let results = global.PatriaSoulKnowledgeRetriever.retrieve(items, q, {
      trustedOnly: opts.trustedOnly !== false,
      limit: opts.limit || MAX_CONTEXT_ITEMS,
      filters: opts.filters || {}
    }).filter(result => quizQuestion || !result.item || result.item.type !== 'kviz');
    if (cityQuestion) {
      results.sort((a, b) => {
        const ac = a.item && (a.item.type === 'grad' || a.item.cityId) ? 1 : 0;
        const bc = b.item && (b.item.type === 'grad' || b.item.cityId) ? 1 : 0;
        return bc - ac || Number(b.score || 0) - Number(a.score || 0);
      });
    }
    const context = global.PatriaSoulKnowledgeRetriever.buildContext(results.slice(0, MAX_CONTEXT_ITEMS));
    const result = await global.PatriaSoulAI.ask(q, { knowledge: context });
    return {
      text: result && result.text ? result.text : 'Trenutno nema odgovora.', route, results, context,
      provider: result && result.provider ? result.provider : 'patriasoul-answer-engine',
      model: result && result.model ? result.model : 'knowledge-only',
      fallback: !!(result && result.fallback)
    };
  }

  global.PatriaSoulAgent = Object.freeze({ ask, knowledgeVersion: '8.0.0' });
})(window);
