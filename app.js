/* PatriaSoul — jedinstveni ulazni JS za zajednički header, navigaciju i footer. */
(function () {
  'use strict';

  const NAV_ITEMS = [
    ['Početna', '/index.html'],
    ['Domovina', '/pages/domovina/index.html'],
    ['Branitelji', '/pages/branitelji/index.html'],
    ['Povijest', '/pages/povijest/index.html'],
    ['Baština', '/pages/bastina/index.html'],
    ['Vjera', '/pages/vjera/index.html'],
    ['Gradovi', '/pages/gradovi/index.html'],
    ['Vijesti', '/pages/vijesti/index.html'],
    ['Igra', '/pages/brani-svoj-grad/index.html'],
    ['🧠 Kviz', '/pages/kviz/index.html', 'ps-nav-cta']
  ];

  function currentPath() {
    const path = window.location.pathname.replace(/\\/g, '/');
    return path.replace(/index\.html$/, '') || '/';
  }

  function createNav(mobile) {
    const fragment = document.createDocumentFragment();
    const path = currentPath();

    NAV_ITEMS.forEach(([label, href, extraClass]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;

      if (extraClass) {
        link.className = extraClass;
      }

      const target = href
        .replace(/index\.html$/, '')
        .replace(/\\/g, '/');

      const active = target === '/'
        ? path === '/'
        : path.startsWith(target);

      if (active) {
        link.setAttribute('aria-current', 'page');
      }

      if (mobile) {
        link.addEventListener('click', closeDrawer);
      }

      fragment.appendChild(link);
    });

    return fragment;
  }

  async function loadInto(selector, url) {
    const target = document.querySelector(selector);
    if (!target) return null;

    try {
      const response = await fetch(url, {
        credentials: 'same-origin',
        cache: 'no-cache'
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

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

    if (backdrop) {
      backdrop.hidden = true;
    }

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
      loadInto('#site-header', '/components/header.html'),
      loadInto('#site-footer', '/footer.html')
    ]);

    const desktopNav = document.querySelector('#site-navigation');
    const mobileNav = document.querySelector('#site-mobile-navigation');

    if (desktopNav) {
      desktopNav.replaceChildren(createNav(false));
    }

    if (mobileNav) {
      mobileNav.replaceChildren(createNav(true));
    }

    document.querySelector('[data-ps-menu]')?.addEventListener('click', openDrawer);
    document.querySelector('[data-ps-close]')?.addEventListener('click', closeDrawer);
    document.querySelector('[data-ps-backdrop]')?.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeDrawer();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
