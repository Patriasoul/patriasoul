/* PatriaSoul — navigation fallback
 * Keeps the main navigation visible even if the canonical navigation script is
 * delayed or blocked by a stale cache. The canonical site-navigation.js remains
 * the source of truth and may replace this markup when it loads.
 */
(function () {
  'use strict';

  var links = [
    ['Početna', '/index.html'],
    ['Domovina', '/domovina.html'],
    ['Branitelji', '/branitelji.html'],
    ['Povijest', '/povijest.html'],
    ['Baština', '/bastina.html'],
    ['Vjera', '/vjera.html'],
    ['Mediji', '/video.html'],
    ['Igra', '/brani-svoj-grad.html'],
    ['O nama', '/o-nama.html'],
    ['Kontakt', '/kontakt.html']
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
