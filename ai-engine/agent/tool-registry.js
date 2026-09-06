/* PatriaSoul AI Agent — Tool Registry v1
 *
 * Central registry for read-only AI abilities.
 * This layer does not execute tools by itself; it only defines the
 * capabilities that the Agent Router may request.
 */
(function (global) {
  'use strict';

  const tools = Object.freeze({
    find_city: {
      id: 'find_city',
      description: 'Pronađi kanonske podatke o hrvatskom gradu.',
      mode: 'read'
    },
    find_history: {
      id: 'find_history',
      description: 'Pronađi povijesne događaje i povezane podatke.',
      mode: 'read'
    },
    find_heritage: {
      id: 'find_heritage',
      description: 'Pronađi podatke o hrvatskoj baštini.',
      mode: 'read'
    },
    find_person: {
      id: 'find_person',
      description: 'Pronađi kanonske podatke o osobi.',
      mode: 'read'
    },
    find_monument: {
      id: 'find_monument',
      description: 'Pronađi podatke o spomeniku ili memorijalnoj lokaciji.',
      mode: 'read'
    },
    find_quiz: {
      id: 'find_quiz',
      description: 'Pronađi pitanja i sadržaj iz postojećeg PatriaSoul kviz sustava.',
      mode: 'read'
    },
    find_source: {
      id: 'find_source',
      description: 'Pronađi izvor povezan s podatkom ili tvrdnjom.',
      mode: 'read'
    }
  });

  function get(id) {
    return tools[id] || null;
  }

  function list() {
    return Object.keys(tools).map(function (id) {
      return tools[id];
    });
  }

  global.PatriaSoulAgentTools = Object.freeze({
    get: get,
    list: list
  });
})(window);
