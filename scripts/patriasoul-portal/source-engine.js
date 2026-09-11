/* PatriaSoul Portal 2.0 — source engine */
(function (window) {
  'use strict';

  var root = window.PatriaSoulPortal = window.PatriaSoulPortal || {};
  var utils = root.utils || {};

  root.sources = root.sources || {};

  root.sources.normalize = function (items) {
    return utils.toArray(items).map(function (item) {
      item = item || {};
      return {
        id: utils.cleanText(item.id),
        name: utils.cleanText(item.name),
        organization: utils.cleanText(item.organization),
        url: utils.cleanText(item.url),
        date: utils.cleanText(item.date),
        verified: item.verified === true
      };
    }).filter(function (item) { return item.id && item.name; });
  };

  root.sources.find = function (items, id) {
    id = utils.cleanText(id);
    return root.sources.normalize(items).find(function (item) {
      return item.id === id;
    }) || null;
  };

  root.sources.forContent = function (items, sourceIds) {
    var ids = utils.toArray(sourceIds);
    return root.sources.normalize(items).filter(function (item) {
      return ids.indexOf(item.id) !== -1;
    });
  };

  root.sources.render = function (items, sourceIds) {
    var list = root.sources.forContent(items, sourceIds);
    if (!list.length) return '';
    return '<section class="ps-sources"><h2>Izvori</h2><ul>' +
      list.map(function (item) {
        var link = item.url ? '<a href="' + utils.escapeHtml(item.url) + '" rel="noopener noreferrer" target="_blank">' + utils.escapeHtml(item.name) + '</a>' : utils.escapeHtml(item.name);
        return '<li>' + link + (item.organization ? ' — ' + utils.escapeHtml(item.organization) : '') + '</li>';
      }).join('') +
      '</ul></section>';
  };
})(window);
