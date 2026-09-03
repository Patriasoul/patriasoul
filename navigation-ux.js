/* PatriaSoul — navigation UX layer
 * Keeps the canonical menu data in site-navigation.js and improves discoverability.
 */
(function () {
  'use strict';

  function injectStyles() {
    if (document.getElementById('ps-navigation-ux-css')) return;
    var s = document.createElement('style');
    s.id = 'ps-navigation-ux-css';
    s.textContent = `
      .ps-mainnav{gap:4px!important}
      .ps-nav-group{isolation:isolate!important}
      .ps-nav-parent-row{background:transparent!important}
      .ps-nav-parent{font-size:14px!important;letter-spacing:.01em!important}
      .ps-nav-parent-icon{font-size:16px!important}
      .ps-nav-group.is-expanded .ps-nav-parent-row,
      .ps-nav-group:hover .ps-nav-parent-row{background:rgba(255,255,255,.055)!important}
      .ps-nav-group.is-expanded .ps-nav-parent,
      .ps-nav-group:hover .ps-nav-parent{color:#fff!important}
      .ps-subnav{min-width:310px!important;max-width:min(920px,calc(100vw - 28px))!important;padding:18px!important;border:1px solid rgba(224,189,85,.18)!important;border-radius:14px!important;box-shadow:0 20px 55px rgba(0,0,0,.34)!important}
      .ps-mega-section h3{font-size:11px!important;text-transform:uppercase!important;letter-spacing:.12em!important;margin:0 0 8px!important;opacity:.72!important}
      .ps-nav-item-row{min-height:38px!important}
      .ps-sub-link{font-size:14px!important;padding:8px 10px!important;border-radius:8px!important}
      .ps-sub-link:hover,.ps-nav-item.is-active>.ps-nav-item-row>.ps-sub-link{background:rgba(255,255,255,.07)!important;color:#fff!important}
      .ps-nav-nested-toggle{width:30px!important;height:30px!important;border-radius:7px!important}
      .ps-regional-explore{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:0 0 28px;padding:18px;border:1px solid rgba(212,175,55,.18);border-radius:18px;background:rgba(255,255,255,.025)}
      .ps-regional-explore h2{grid-column:1/-1;margin:0 0 2px;font-size:1.05rem}
      .ps-regional-explore a{display:block;padding:11px 12px;border-radius:10px;background:rgba(255,255,255,.035);color:#d4af37!important;text-decoration:none;font-weight:700}
      .ps-regional-explore a:hover{background:rgba(255,255,255,.08)!important;color:#fff!important}
      @media (min-width:861px){
        .ps-mainnav .ps-subnav{display:none!important;position:absolute!important;top:calc(100% + 8px)!important;right:0!important;z-index:5100!important;background:#111720!important}
        .ps-nav-group.is-expanded>.ps-subnav{display:grid!important;grid-template-columns:repeat(2,minmax(210px,1fr))!important;gap:20px!important}
        .ps-nav-group:hover>.ps-subnav{display:grid!important;grid-template-columns:repeat(2,minmax(210px,1fr))!important;gap:20px!important}
        .ps-nav-group:has(.ps-nav-item-level-3)>.ps-subnav{min-width:650px!important}
        .ps-nav-group:has(.ps-nav-item-level-3)>.ps-subnav .ps-mega-section:first-child{grid-column:1 / -1!important}
      }
      @media (max-width:860px){
        .ps-mainnav{align-items:stretch!important}
        .ps-nav-group{width:100%!important}
        .ps-nav-parent-row{width:100%!important}
        .ps-nav-parent{flex:1 1 auto!important;justify-content:flex-start!important}
        .ps-subnav{max-width:none!important;width:100%!important;box-sizing:border-box!important;border-radius:10px!important;margin:4px 0 8px!important;padding:12px!important}
        .ps-nav-group.is-expanded>.ps-subnav{display:block!important}
        .ps-mega-section{margin-bottom:14px!important}
        .ps-mega-section:last-child{margin-bottom:0!important}
        .ps-regional-explore{grid-template-columns:1fr 1fr!important}
      }
      @media(max-width:520px){.ps-regional-explore{grid-template-columns:1fr!important}}
    `;
    document.head.appendChild(s);
  }

  function sanitizeCanonicalNav() {
    var nav = document.querySelector('.ps-mainnav');
    if (!nav) return;
    Array.prototype.slice.call(nav.children).forEach(function (child) {
      if (!child.classList.contains('ps-nav-group')) child.remove();
    });
  }

  function improveRegionalDiscovery() {
    var root = document.querySelector('main .rg');
    if (!root || document.getElementById('ps-regional-explore')) return;

    var breadcrumb = root.querySelector('.ps-breadcrumbs');
    var text = breadcrumb ? breadcrumb.textContent : '';
    var regionalSlugs = [
      'zagorje-i-prigorje','medimurje','podravina-i-bilogora','lika-i-gorski-kotar',
      'slavonija-i-baranja','istra','kvarner-i-primorje','dalmacija','posavina-i-pokuplje'
    ];
    var isRegional = regionalSlugs.some(function (slug) { return location.pathname.indexOf(slug) !== -1; }) || /Krajevi i geografija/.test(text);
    if (!isRegional) return;

    var current = location.pathname.split('/').pop() || '';
    var links = [
      ['🗺️ Veliki regionalni vodič', '/regionalni-vodic.html'],
      ['🏙️ Gradovi', '/gradovi.html'],
      ['🏛️ Baština', '/bastina.html'],
      ['🍽️ Gastronomija', '/gastronomija.html'],
      ['🗣️ Govori i dijalekti', '/govori-i-dijalekti.html'],
      ['🌲 Priroda Hrvatske', '/priroda.html']
    ];

    var box = document.createElement('section');
    box.id = 'ps-regional-explore';
    box.className = 'ps-regional-explore';
    var heading = document.createElement('h2');
    heading.textContent = '🔎 Istraži ovaj kraj kroz cijeli PatriaSoul';
    box.appendChild(heading);
    links.forEach(function (entry) {
      var a = document.createElement('a');
      a.href = entry[1];
      a.textContent = entry[0];
      if (entry[1].split('/').pop() === current) a.setAttribute('aria-current', 'page');
      box.appendChild(a);
    });

    root.querySelectorAll('aside.card').forEach(function (aside) {
      var h = aside.querySelector('h2');
      if (h && /Istraži dalje/.test(h.textContent)) aside.remove();
    });

    var back = root.querySelector('.back');
    if (back) back.parentNode.insertBefore(box, back);
    else root.appendChild(box);
  }

  function improveKeyboardAndOutsideClick() {
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.ps-nav-group.is-expanded').forEach(function (group) {
        group.classList.remove('is-expanded');
        var button = group.querySelector('.ps-nav-toggle');
        if (button) button.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', function (e) {
      if (e.target.closest('.ps-nav-group')) return;
      document.querySelectorAll('.ps-nav-group.is-expanded').forEach(function (group) {
        group.classList.remove('is-expanded');
        var button = group.querySelector('.ps-nav-toggle');
        if (button) button.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function init() {
    sanitizeCanonicalNav();
    injectStyles();
    improveRegionalDiscovery();
    improveKeyboardAndOutsideClick();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
