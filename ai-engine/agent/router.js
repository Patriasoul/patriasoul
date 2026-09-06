/* PatriaSoul AI Agent — Router v1
 *
 * Small deterministic router for the first agent layer.
 * It selects an existing read-only ability from the tool registry.
 * No network access, code execution, or write operation is performed here.
 */
(function (global) {
  'use strict';

  const TOOL_MAP = Object.freeze({
    city: 'find_city',
    grad: 'find_city',
    povijest: 'find_history',
    povijesni: 'find_history',
    baština: 'find_heritage',
    bastina: 'find_heritage',
    osoba: 'find_person',
    osoba: 'find_person',
    spomenik: 'find_monument',
    spomenici: 'find_monument',
    kviz: 'find_quiz',
    pitanje: 'find_quiz',
    izvor: 'find_source',
    izvori: 'find_source'
  });

  function normalize(text) {
    return String(text || '').toLocaleLowerCase('hr-HR').trim();
  }

  function route(message) {
    const text = normalize(message);
    if (!text) return { tool: null, reason: 'empty' };

    const matches = [];
    Object.keys(TOOL_MAP).forEach(function (keyword) {
      if (text.indexOf(keyword) !== -1 && matches.indexOf(TOOL_MAP[keyword]) === -1) {
        matches.push(TOOL_MAP[keyword]);
      }
    });

    if (matches.length === 0) {
      return {
        tool: null,
        reason: 'no-match',
        requiresGeneralAnswer: true
      };
    }

    return {
      tool: matches[0],
      candidates: matches,
      reason: 'keyword-match'
    };
  }

  global.PatriaSoulAgentRouter = Object.freeze({
    route: route
  });
})(window);
