// PatriaSoul Knowledge Retriever
// Provider-neutral: priprema relevantne i provjerene zapise za AI.
(function () {
  'use strict';

  const TRUSTED = new Set(['verified', 'published']);

  function normalize(value) {
    return String(value || '')
      .toLocaleLowerCase('hr-HR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function tokenize(value) {
    return normalize(value)
      .split(/[^a-z0-9]+/i)
      .filter(token => token.length >= 3);
  }

  function score(item, query, filters = {}) {
    const q = tokenize(query);
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
      if (haystack.includes(token)) points += 1;
      if (normalize(item.title).includes(token)) points += 3;
    });

    if (filters.type && item.type === filters.type) points += 3;
    if (filters.cityId && item.cityId === filters.cityId) points += 4;
    if (TRUSTED.has(item.status)) points += 5;
    if (item.source) points += 1;

    return points;
  }

  function retrieve(items, query, options = {}) {
    const limit = Math.min(Math.max(Number(options.limit) || 8, 1), 20);
    const filters = options.filters || {};

    return (items || [])
      .filter(item => {
        if (!item) return false;
        if (options.trustedOnly && !TRUSTED.has(item.status)) return false;
        if (filters.type && item.type !== filters.type) return false;
        if (filters.cityId && item.cityId !== filters.cityId) return false;
        return true;
      })
      .map(item => ({ item, score: score(item, query, filters) }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  function buildContext(results) {
    return results.map(({ item }) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      content: item.content,
      source: item.source || null,
      sourceTitle: item.sourceTitle || null,
      status: item.status,
      cityId: item.cityId || null
    }));
  }

  window.PatriaSoulKnowledgeRetriever = {
    retrieve,
    buildContext,
    isTrusted: status => TRUSTED.has(status)
  };
})();
