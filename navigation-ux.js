/* PatriaSoul — navigation UX compatibility layer
 * Fixes interaction after the canonical navigation structure changed.
 * Top-level links remain real links; only arrow buttons open menus.
 */
(function () {
  'use strict';

  function injectStyles() {
    if (document.getElementById('ps-navigation-ux-css')) return;

    var s = document.createElement('style');
    s.id = 'ps-navigation-ux-css';
    s.textContent = `
      /* Interaction safety: navigation must never create a page-wide click blocker. */
      html { overflow-x:hidden !important; overflow-y:auto !important; }
      body { overflow-x:hidden !important; overflow-y:auto !important; }
      .ps-header, .ps-nav, .ps-mainnav, .ps-mainnav * { pointer-events:auto; }
      .ps-header { position:sticky !important; z-index:5000 !important; }

      .ps-mainnav { position:relative; }
      .ps-nav-group { position:relative; isolation:isolate; }
      .ps-nav-parent-row { display:flex; align-items:center; }
      .ps-nav-parent { text-decoration:none !important; cursor:pointer !important; }
      .ps-nav-toggle, .ps-nav-nested-toggle { cursor:pointer !important; }

      @media (min-width:861px) {
        .ps-mainnav .ps-subnav {
          display:none !important;
          position:absolute !important;
          top:calc(100% + 8px) !important;
          right:0 !important;
          z-index:5100 !important;
          pointer-events:auto !important;
        }
        .ps-nav-group.is-expanded > .ps-subnav,
        .ps-nav-group:hover > .ps-subnav {
          display:block !important;
        }
      }

      @media (max-width:860px) {
        .ps-mainnav.is-open {
          display:flex !important;
          flex-direction:column !important;
          align-items:stretch !important;
          position:absolute !important;
          left:0 !important;
          right:0 !important;
          top:100% !important;
          z-index:5100 !important;
          max-height:calc(100vh - 76px) !important;
          overflow-y:auto !important;
          -webkit-overflow-scrolling:touch !important;
          pointer-events:auto !important;
        }
        .ps-nav-group { width:100% !important; }
        .ps-nav-parent-row { width:100% !important; }
        .ps-nav-parent { flex:1 1 auto !important; }
        .ps-nav-group > .ps-subnav { display:none !important; position:static !important; }
        .ps-nav-group.is-expanded > .ps-subnav { display:block !important; }
        .ps-nav-group:hover > .ps-subnav { display:none !important; }
        .ps-nav-group.is-expanded:hover > .ps-subnav { display:block !important; }
      }
    `;
    document.head.appendChild(s);
  }

  function closeOtherGroups(current) {
    document.querySelectorAll('.ps-nav-group.is-expanded').forEach(function (group) {
      if (group === current) return;
      group.classList.remove('is-expanded');
      var toggle = group.querySelector(':scope > .ps-nav-parent-row .ps-nav-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }

  function bindNavigation() {
    var nav = document.querySelector('.ps-mainnav');
    if (!nav || nav.dataset.psUxBound === '1') return;
    nav.dataset.psUxBound = '1';

    /* Never cancel clicks on real navigation links. */
    nav.addEventListener('click', function (event) {
      var toggle = event.target.closest('.ps-nav-toggle, .ps-nav-nested-toggle');
      if (!toggle) return;

      event.preventDefault();
      event.stopPropagation();

      if (toggle.classList.contains('ps-nav-toggle')) {
        var group = toggle.closest('.ps-nav-group');
        if (!group) return;
        closeOtherGroups(group);
        var open = group.classList.toggle('is-expanded');
        toggle.setAttribute('aria-expanded', String(open));
      } else {
        var item = toggle.closest('.ps-nav-item');
        var nested = item && item.querySelector(':scope > .ps-nav-nested');
        if (!nested) return;
        var state = nested.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(state));
        toggle.textContent = state ? '⌄' : '›';
      }
    }, true);

    document.addEventListener('click', function (event) {
      if (!event.target.closest('.ps-nav-group')) {
        document.querySelectorAll('.ps-nav-group.is-expanded').forEach(function (group) {
          group.classList.remove('is-expanded');
          var toggle = group.querySelector(':scope > .ps-nav-parent-row .ps-nav-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      document.querySelectorAll('.ps-nav-group.is-expanded').forEach(function (group) {
        group.classList.remove('is-expanded');
        var toggle = group.querySelector(':scope > .ps-nav-parent-row .ps-nav-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function bindMenuButton() {
    var button = document.querySelector('[data-ps-menu]');
    var nav = document.querySelector('.ps-mainnav');
    if (!button || !nav || button.dataset.psUxMenuBound === '1') return;
    button.dataset.psUxMenuBound = '1';

    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      var open = nav.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Zatvori glavni izbornik' : 'Otvori glavni izbornik');
    });
  }

  function ensureFallbackNavigation() {
    var nav = document.querySelector('.ps-mainnav');
    if (!nav || nav.children.length) return;

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

    links.forEach(function (item) {
      var wrap = document.createElement('div');
      wrap.className = 'ps-nav-fallback-item';
      var a = document.createElement('a');
      a.href = item[1];
      a.textContent = item[0];
      a.className = 'ps-nav-parent';
      wrap.appendChild(a);
      nav.appendChild(wrap);
    });
  }

  function removeInteractionBlockers() {
    /* Disable only obvious full-viewport empty overlays created by navigation layers. */
    document.querySelectorAll('body *').forEach(function (el) {
      if (el.id === 'ps-mainnav' || el.closest('.ps-header')) return;
      var cs = window.getComputedStyle(el);
      var r = el.getBoundingClientRect();
      if (
        cs.position === 'fixed' &&
        cs.pointerEvents !== 'none' &&
        r.width >= window.innerWidth * 0.98 &&
        r.height >= window.innerHeight * 0.98 &&
        !el.querySelector('input,button,a,textarea,select')
      ) {
        el.style.pointerEvents = 'none';
      }
    });
  }

  function init() {
    injectStyles();
    ensureFallbackNavigation();
    bindNavigation();
    bindMenuButton();
    removeInteractionBlockers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  setTimeout(init, 300);
  setTimeout(init, 1000);
  setTimeout(removeInteractionBlockers, 1500);
})();
