// PatriaSoul Knowledge Retriever v2
// Provider-neutral: priprema relevantne i provjerene zapise za AI.
// Pravilo: što je izvor pouzdaniji i upit precizniji, zapis je više rangiran.
(function () {
  'use strict';

  const TRUSTED = new Set(['verified', 'published']);
  const STATUS_WEIGHT = { published: 7, verified: 6, review: 1, draft: 0 };

  function normalize(value) {
    return String(value || '')
      .toLocaleLowerCase('hr-HR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokenize(value) {
    return normalize(value)
      .split(/[^a-z0-9]+/i)
      .filter(token => token.length >= 3);
  }

  function compactDate(value) {
    const text = String(value || '');
    const match = text.match(/\b(19|20)\d{2}\b/);
    return match ? match[0] : '';
  }

  function score(item, query, filters = {}) {
    const q = tokenize(query);
    const title = normalize(item.title);
    const content = normalize(item.content);
    const tags = normalize((item.tags || []).join(' '));
    const haystack = normalize([
      item.title,
      item.content,
      ...(item.tags || []),
      item.type,
      item.cityId,
      item.sourceTitle
    ].join(' '));

    let points = 0;

    q.forEach(token => {
      if (title.includes(token)) points += 6;
      else if (tags.includes(token)) points += 4;
      else if (haystack.includes(token)) points += 2;

      // Blago nagrađuje početak riječi, što bolje prati prirodni hrvatski upit.
      const word = new RegExp(`\\b${token}`);
      if (word.test(title)) points += 2;
      if (word.test(content)) points += 1;
    });

    if (q.length > 1 && q.every(token => haystack.includes(token))) points += 3;
    if (filters.type && item.type === filters.type) points += 4;
    if (filters.cityId && item.cityId === filters.cityId) points += 5;
    if (filters.status && item.status === filters.status) points += 4;

    points += STATUS_WEIGHT[item.status] || 0;
    if (item.source) points += 1;

    const year = compactDate(query);
    if (year && compactDate(item.sourceDate || item.updatedAt) === year) points += 1;

    return points;
  }

  function retrieve(items, query, options = {}) {
    const limit = Math.min(Math.max(Number(options.limit) || 8, 1), 20);
    const filters = options.filters || {};
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) return [];

    return (items || [])
      .filter(item => {
        if (!item) return false;
        if (options.trustedOnly && !TRUSTED.has(item.status)) return false;
        if (filters.type && item.type !== filters.type) return false;
        if (filters.cityId && item.cityId !== filters.cityId) return false;
        if (filters.status && item.status !== filters.status) return false;
        return true;
      })
      .map(item => ({ item, score: score(item, normalizedQuery, filters) }))
      .filter(result => result.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return String(b.item.updatedAt || '').localeCompare(String(a.item.updatedAt || ''));
      })
      .slice(0, limit);
  }

  function buildContext(results) {
    return (results || []).map(({ item, score: relevance }) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      content: item.content,
      source: item.source || null,
      sourceTitle: item.sourceTitle || null,
      sourceDate: item.sourceDate || null,
      status: item.status,
      cityId: item.cityId || null,
      relevance
    }));
  }

  function confidence(results) {
    if (!results || !results.length) return 0;
    const top = Number(results[0].score || 0);
    if (top >= 15) return 0.95;
    if (top >= 10) return 0.8;
    if (top >= 6) return 0.6;
    return 0.35;
  }

  function hasTrustedContext(results, minimum = 1) {
    return (results || [])
      .filter(result => result && TRUSTED.has(result.item && result.item.status))
      .length >= minimum;
  }

  window.PatriaSoulKnowledgeRetriever = {
    retrieve,
    buildContext,
    confidence,
    hasTrustedContext,
    isTrusted: status => TRUSTED.has(status)
  };
})();
