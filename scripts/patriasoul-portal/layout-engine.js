/* PatriaSoul Portal 2.0 — layout helpers */
(function (window, document) {
  'use strict';

  var root = window.PatriaSoulPortal = window.PatriaSoulPortal || {};
  var utils = root.utils || {};
  var content = root.content || {};
  var feed = root.feed || {};

  root.layout = root.layout || {};

  root.layout.card = function (item, variant) {
    item = content.create(item);
    variant = variant || 'standard';
    var image = item.image ? '<img loading="lazy" src="' + utils.escapeHtml(item.image) + '" alt="">' : '';
    var meta = item.date ? '<time datetime="' + utils.escapeHtml(item.date) + '">' + utils.escapeHtml(item.date) + '</time>' : '';

    return '<article class="ps-card ps-card-' + utils.escapeHtml(variant) + '">' +
      (image ? '<a class="ps-card-media" href="' + utils.escapeHtml(item.url) + '">' + image + '</a>' : '') +
      '<div class="ps-card-body">' +
        (item.section ? '<span class="ps-card-section">' + utils.escapeHtml(item.section) + '</span>' : '') +
        '<h3><a href="' + utils.escapeHtml(item.url) + '">' + utils.escapeHtml(item.title) + '</a></h3>' +
        (item.excerpt ? '<p>' + utils.escapeHtml(item.excerpt) + '</p>' : '') +
        (meta ? '<div class="ps-card-meta">' + meta + '</div>' : '') +
      '</div>' +
    '</article>';
  };

  root.layout.cards = function (items, variant) {
    return utils.toArray(items).map(function (item) {
      return root.layout.card(item, variant);
    }).join('');
  };

  root.layout.feedSection = function (title, items, variant) {
    return '<section class="ps-feed-section">' +
      '<div class="ps-section-heading"><h2>' + utils.escapeHtml(title) + '</h2></div>' +
      '<div class="ps-card-grid ps-card-grid-' + utils.escapeHtml(variant || 'standard') + '">' +
        root.layout.cards(items, variant) +
      '</div>' +
    '</section>';
  };

  root.layout.mountFeed = function (selector, items, options) {
    var node = document.querySelector(selector);
    if (!node) return;
    options = options || {};
    var list = options.feed === 'featured' ? feed.featured(items, options.limit) :
      options.feed === 'section' ? feed.section(items, options.section, options.limit) :
      feed.latest(items, options.limit);
    node.innerHTML = root.layout.feedSection(options.title || 'Najnovije', list, options.variant || 'standard');
  };
})(window, document);
