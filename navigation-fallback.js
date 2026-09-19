/* PatriaSoul — navigation fallback
 * Canonical fallback: keeps the current portal structure visible even when
 * site-navigation.js is delayed or blocked by a stale cache.
 */
(function () {
  'use strict';

  var links = [
    ['Početna', '/index.html'],
    ['Članci i priče', '/clanci-i-price.html'],
    ['Istinite priče', '/istinite-price.html'],
    ['Čuvari nasljeđa', '/cuvari-nasljeda.html'],
    ['Pjesme i stihovi', '/pjesme-i-stihovi.html'],
    ['Galerija / Mediji', '/galerija-mediji.html'],
    ['Vaše priče', '/vase-price.html'],
    ['Zajednica', '/zajednica.html'],
    ['Pretraži', '/pretrazi.html'],
    ['Newsletter', '/newsletter.html'],
    ['Igraj kviz', '/quiz.html'],
    ['Brani svoj grad', '/brani-svoj-grad.html']
  ];

  function build() {
    var nav = document.querySelector('.ps-mainnav');
    if (!nav || nav.children.length) return;

    var frag = document.createDocumentFragment();
    links.forEach(function (item) {
      var wrap = document.createElement('div');
      wrap.className = 'ps-nav-fallback-item';

      var a = document.createElement('a');
      a.href = item[1];
      a.textContent = item[0];
      a.className = 'ps-nav-parent';
      wrap.appendChild(a);
      frag.appendChild(wrap);
    });

    nav.appendChild(frag);
    nav.classList.add('ps-nav-fallback-visible');
  }

  function init() {
    build();
    setTimeout(build, 250);
    setTimeout(build, 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
