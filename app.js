/* PatriaSoul — jedinstveni ulazni JS za zajednički header, navigaciju i footer. */
(function () {
  'use strict';

  // Resolve the site's actual root from this script location. This keeps the
  // portal working both at a custom domain (/) and at a GitHub Pages project
  // URL (/patriasoul/), without hard-coded root-relative paths.
  const SCRIPT_SRC = document.currentScript?.src || new URL('app.js', window.location.href).href;
  const ROOT = new URL('.', SCRIPT_SRC).pathname.replace(/\/$/, '') + '/';

  const NAV_ITEMS = [
    ['Početna', 'index.html'],
    ['Domovina', 'domovina.html'],
    ['Branitelji', 'branitelji.html'],
    ['Povijest', 'povijest.html'],
    ['Baština', 'bastina.html'],
    ['Vjera', 'vjera.html'],
    ['Gradovi', 'gradovi.html'],
    ['Vijesti', 'vijesti.html'],
    ['Rang-lista', 'rang-lista.html'],
    ['Igra', 'brani-svoj-grad.html'],
    ['🧠 Kviz', 'quiz.html', 'ps-nav-cta']
  ];

  function absolutePath(path) {
    return new URL(path, window.location.origin + ROOT).pathname;
  }

  function normalizePath(path) {
    const value = String(path || '/').replace(/\\/g, '/');
    if (value === '' || value === '/') return '/';
    const withoutRoot = value.startsWith(ROOT) ? value.slice(ROOT.length) : value;
    const normalized = withoutRoot.replace(/^\/+/, '').replace(/index\.html$/, '');
    return normalized || '/';
  }

  function currentPath() {
    return normalizePath(window.location.pathname);
  }

  function isActive(href) {
    return normalizePath(absolutePath(href)) === currentPath();
  }

  function createNav() {
    const fragment = document.createDocumentFragment();
    NAV_ITEMS.forEach(([label, href, extraClass]) => {
      const link = document.createElement('a');
      link.href = absolutePath(href);
      link.textContent = label;
      if (extraClass) link.className = extraClass;
      if (isActive(href)) link.setAttribute('aria-current', 'page');
      fragment.appendChild(link);
    });
    return fragment;
  }

  function rewriteInternalLinks() {
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('//') || href.startsWith('/#')) return;
      try {
        const target = new URL(href, window.location.origin);
        if (target.origin !== window.location.origin) return;
        const rootPath = target.pathname.replace(/^\/+/, '');
        link.setAttribute('href', ROOT + rootPath + target.search + target.hash);
      } catch (_) {
        // Leave malformed or special links untouched.
      }
    });
  }

  function polishKnownContent() {
    // Small terminology correction kept here temporarily so the existing
    // Domovina page remains correct without duplicating or rebuilding it.
    if (window.location.pathname.endsWith('/domovina.html')) {
      document.querySelectorAll('.domovina-fact strong').forEach(node => {
        if (node.textContent.trim() === 'Dalmatia') node.textContent = 'Dalmacija';
      });
    }
  }

  async function loadInto(selector, url) {
    const target = document.querySelector(selector);
    if (!target) return null;
    try {
      const response = await fetch(new URL(url, window.location.origin + ROOT).href, {
        credentials: 'same-origin',
        cache: 'no-cache'
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      target.innerHTML = await response.text();
      return target;
    } catch (error) {
      console.error(`PatriaSoul: nije moguće učitati ${url}`, error);
      return null;
    }
  }

  function closeDrawer() {
    const drawer = document.querySelector('[data-ps-drawer]');
    const backdrop = document.querySelector('[data-ps-backdrop]');
    const menu = document.querySelector('[data-ps-menu]');
    drawer?.classList.remove('is-open');
    backdrop?.classList.remove('is-open');
    if (backdrop) backdrop.hidden = true;
    drawer?.setAttribute('aria-hidden', 'true');
    menu?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  function openDrawer() {
    const drawer = document.querySelector('[data-ps-drawer]');
    const backdrop = document.querySelector('[data-ps-backdrop]');
    const menu = document.querySelector('[data-ps-menu]');
    drawer?.classList.add('is-open');
    if (backdrop) {
      backdrop.hidden = false;
      requestAnimationFrame(() => backdrop.classList.add('is-open'));
    }
    drawer?.setAttribute('aria-hidden', 'false');
    menu?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  async function init() {
    await Promise.all([
      loadInto('#site-header', 'components/header.html'),
      loadInto('#site-footer', 'footer.html')
    ]);
    const desktopNav = document.querySelector('#site-navigation');
    const mobileNav = document.querySelector('#site-mobile-navigation');
    if (desktopNav) desktopNav.replaceChildren(createNav());
    if (mobileNav) mobileNav.replaceChildren(createNav());
    rewriteInternalLinks();
    polishKnownContent();
    document.querySelector('[data-ps-menu]')?.addEventListener('click', openDrawer);
    document.querySelector('[data-ps-close]')?.addEventListener('click', closeDrawer);
    document.querySelector('[data-ps-backdrop]')?.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeDrawer(); });
  }

  window.PatriaSoul = Object.freeze({
    root: ROOT,
    navItems: NAV_ITEMS.map(([label, href]) => ({ label, href: absolutePath(href) })),
    currentPath,
    loadInto,
    openDrawer,
    closeDrawer
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
