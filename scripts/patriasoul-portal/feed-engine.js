/* PatriaSoul Portal 2.0 — feed engine */
(function (window) {
  'use strict';

  var root = window.PatriaSoulPortal = window.PatriaSoulPortal || {};
  var content = root.content;
  var utils = root.utils || {};

  root.feed = root.feed || {};

  root.feed.latest = function (items, limit) {
    var list = content.normalize(items);
    list = utils.sortByDateDesc(list);
    return typeof limit === 'number' ? list.slice(0, limit) : list;
  };

  root.feed.featured = function (items, limit) {
    var list = content.filter(items, { featured: true });
    list = utils.sortByDateDesc(list);
    return typeof limit === 'number' ? list.slice(0, limit) : list;
  };

  root.feed.section = function (items, section, limit) {
    var list = content.filter(items, { section: section });
    list = utils.sortByDateDesc(list);
    return typeof limit === 'number' ? list.slice(0, limit) : list;
  };

  root.feed.related = function (items, current, limit) {
    current = content.create(current);
    var source = content.normalize(items);

    var scored = source
      .filter(function (item) { return item.id && item.id !== current.id; })
      .map(function (item) {
        var score = 0;

        if (current.section && item.section === current.section) score += 5;
        if (current.subsection && item.subsection === current.subsection) score += 4;
        if (current.region && item.region === current.region) score += 3;

        utils.toArray(current.tags).forEach(function (tag) {
          if (utils.hasTag(item, tag)) score += 2;
        });

        utils.toArray(current.cityIds).forEach(function (cityId) {
          if (utils.toArray(item.cityIds).indexOf(cityId) !== -1) score += 3;
        });

        return { item: item, score: score };
      })
      .filter(function (entry) { return entry.score > 0; })
      .sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return (Date.parse(b.item.date || '') || 0) - (Date.parse(a.item.date || '') || 0);
      })
      .map(function (entry) { return entry.item; });

    return typeof limit === 'number' ? scored.slice(0, limit) : scored;
  };
})(window);
