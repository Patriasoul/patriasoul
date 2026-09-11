/* PatriaSoul Portal 2.0 — content engine */
(function (window) {
  'use strict';

  var root = window.PatriaSoulPortal = window.PatriaSoulPortal || {};
  var utils = root.utils || {};

  root.content = root.content || {};

  root.content.create = function (item) {
    var value = item || {};

    return {
      id: utils.cleanText(value.id),
      type: utils.cleanText(value.type || 'article'),
      title: utils.cleanText(value.title),
      excerpt: utils.cleanText(value.excerpt),
      url: utils.cleanText(value.url),
      image: utils.cleanText(value.image),
      section: utils.cleanText(value.section),
      subsection: utils.cleanText(value.subsection),
      topics: utils.toArray(value.topics),
      tags: utils.toArray(value.tags),
      cityIds: utils.toArray(value.cityIds),
      region: utils.cleanText(value.region),
      featured: value.featured === true,
      date: utils.cleanText(value.date),
      author: utils.cleanText(value.author),
      sourceIds: utils.toArray(value.sourceIds),
      imageCredit: utils.cleanText(value.imageCredit)
    };
  };

  root.content.normalize = function (items) {
    return utils.toArray(items).map(root.content.create).filter(function (item) {
      return !!item.id && !!item.title;
    });
  };

  root.content.filter = function (items, filters) {
    return root.content.normalize(items).filter(function (item) {
      return utils.matches(item, filters || {});
    });
  };

  root.content.findById = function (items, id) {
    id = utils.cleanText(id);
    return root.content.normalize(items).find(function (item) {
      return item.id === id;
    }) || null;
  };
})(window);
