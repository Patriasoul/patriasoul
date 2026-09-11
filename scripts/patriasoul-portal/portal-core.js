/* PatriaSoul Portal 2.0 — isolated core */
(function (window) {
  'use strict';

  var root = window.PatriaSoulPortal = window.PatriaSoulPortal || {};

  root.version = '2.0.0-alpha.1';

  root.config = root.config || {
    siteName: 'PatriaSoul',
    motto: 'Upoznaj. Pamti. Čuvaj.',
    quizzes: {
      hrvatski: '/quiz.html',
      grad: '/brani-svoj-grad.html'
    }
  };

  root.utils = root.utils || {};

  root.utils.toArray = function (value) {
    if (Array.isArray(value)) return value.slice();
    if (value == null) return [];
    return [value];
  };

  root.utils.cleanText = function (value) {
    return String(value == null ? '' : value).trim();
  };

  root.utils.hasTag = function (item, tag) {
    var tags = root.utils.toArray(item && item.tags);
    return tags.indexOf(tag) !== -1;
  };

  root.utils.matches = function (item, filters) {
    filters = filters || {};

    if (filters.section && item.section !== filters.section) return false;
    if (filters.subsection && item.subsection !== filters.subsection) return false;
    if (filters.type && item.type !== filters.type) return false;
    if (filters.featured === true && item.featured !== true) return false;
    if (filters.cityId && root.utils.toArray(item.cityIds).indexOf(filters.cityId) === -1) return false;
    if (filters.tag && !root.utils.hasTag(item, filters.tag)) return false;

    return true;
  };

  root.utils.sortByDateDesc = function (items) {
    return items.slice().sort(function (a, b) {
      var ad = Date.parse(a && a.date || '') || 0;
      var bd = Date.parse(b && b.date || '') || 0;
      return bd - ad;
    });
  };

  root.utils.escapeHtml = function (value) {
    return root.utils.cleanText(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };
})(window);
