/* PatriaSoul Portal 2.0 — search engine */
(function (window) {
  'use strict';

  var root = window.PatriaSoulPortal = window.PatriaSoulPortal || {};
  var content = root.content || {};
  var utils = root.utils || {};

  root.search = root.search || {};

  root.search.query = function (items, query, limit) {
    var needle = utils.cleanText(query).toLocaleLowerCase('hr-HR');
    if (!needle) return [];

    var scored = content.normalize(items).map(function (item) {
      var score = 0;
      var title = item.title.toLocaleLowerCase('hr-HR');
      var excerpt = item.excerpt.toLocaleLowerCase('hr-HR');
      var section = item.section.toLocaleLowerCase('hr-HR');
      var tags = utils.toArray(item.tags).join(' ').toLocaleLowerCase('hr-HR');

      if (title.indexOf(needle) !== -1) score += 10;
      if (section.indexOf(needle) !== -1) score += 5;
      if (tags.indexOf(needle) !== -1) score += 4;
      if (excerpt.indexOf(needle) !== -1) score += 2;

      return { item: item, score: score };
    }).filter(function (entry) {
      return entry.score > 0;
    }).sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return (Date.parse(b.item.date || '') || 0) - (Date.parse(a.item.date || '') || 0);
    }).map(function (entry) {
      return entry.item;
    });

    return typeof limit === 'number' ? scored.slice(0, limit) : scored;
  };
})(window);
