```javascript
/* PatriaSoul — canonical portal navigation */
(function () {
  'use strict';

  var groups = [
    {
      label: 'Domovina',
      href: '/domovina.html',
      sections: [{
        items: [
          { label: 'Hrvatska', href: '/domovina.html' },
          { label: 'Gradovi', href: '/gradovi.html' },
          {
            label: 'Krajevi i geografija',
            href: '/krajevi-i-geografija.html',
            children: [
              { label: 'Krajevi', href: '/krajevi-i-geografija.html' },
              { label: 'Priroda Hrvatske', href: '/priroda.html' },
              {
                label: 'Veliki regionalni vodič',
                href: '/regionalni-vodic.html',
                children: [
                  { label: 'Zagorje i Prigorje', href: '/zagorje-i-prigorje.html' },
                  { label: 'Međimurje', href: '/medimurje.html' },
                  { label: 'Podravina i Bilogora', href: '/podravina-i-bilogora.html' },
                  { label: 'Lika i Gorski kotar', href: '/lika-i-gorski-kotar.html' },
                  { label: 'Slavonija i Baranja', href: '/slavonija-i-baranja.html' },
                  { label: 'Istra', href: '/istra.html' },
                  { label: 'Kvarner i Primorje', href: '/kvarner-i-primorje.html' },
                  { label: 'Dalmacija', href: '/dalmacija.html' },
                  { label: 'Posavina i Pokuplje', href: '/posavina-i-pokuplje.html' }
                ]
              }
            ]
          },
          { label: 'Vijesti', href: '/vijesti.html' },
          { label: 'Vrijeme', href: '/vrijeme.html' }
        ]
      }]
    },

    {
      label: 'Branitelji',
      href: '/branitelji.html',
      sections: [{
        items: [
          { label: 'Branitelji', href: '/branitelji.html' },
          {
            label: 'Domovinski rat',
            href: '/domovinski-rat.html',
            children: [
              { label: 'Vukovar', href: '/vukovar.html' },
              { label: 'Operacije i bojišta', href: '/operacije.html' }
            ]
          },
          {
            label: 'Postrojbe',
            href: '/postrojbe.html',
            children: [
              { label: 'Brigade', href: '/brigade.html' }
            ]
          },
          { label: 'Spomenici i memorijali', href: '/spomenici.html' }
        ]
      }]
    },

    {
      label: 'Povijest',
      href: '/povijest.html',
      sections: [{
        items: [
          { label: 'Povijest Hrvatske', href: '/hrvatska-povijest.html' },
          { label: 'Hrvatski kraljevi', href: '/hrvatski-kraljevi.html' },
          { label: 'Knezovi i vladari', href: '/knezovi-i-vladari.html' },
          { label: 'Srednji vijek', href: '/srednji-vijek.html' },
          { label: 'Habsburško razdoblje', href: '/habsbursko-razdoblje.html' },
          { label: 'Hrvatski narodni preporod', href: '/hrvatski-narodni-preporod.html' },
          { label: '20. stoljeće', href: '/20-stoljece.html' },
          { label: 'Povijesne osobe', href: '/povijesne-osobe.html' }
        ]
      }]
    },

    {
      label: 'Baština',
      href: '/bastina.html',
      sections: [{
        items: [
          { label: 'Baština', href: '/bastina.html' },
          { label: 'Sakralna baština', href: '/sakralna-bastina.html' },
          { label: 'Glagoljica', href: '/glagoljica.html' },
          { label: 'Tradicija i običaji', href: '/tradicija-i-obicaji.html' },
          { label: 'Narodne nošnje', href: '/narodne-nosnje.html' },
          { label: 'Gastronomija', href: '/gastronomija.html' },
          { label: 'Glazba', href: '/glazba.html' },
          { label: 'Govori i dijalekti', href: '/govori-i-dijalekti.html' }
        ]
      }]
    },

    {
      label: 'Vjera',
      href: '/vjera.html',
      sections: [{
        items: [
          { label: 'Vjera i duhovna baština', href: '/vjera.html' },
          { label: 'Evanđelje', href: '/evandelje.html' },
          { label: 'Biblija', href: '/biblija.html' },
          { label: 'Molitve', href: '/molitve.html' },
          { label: 'Krunica', href: '/krunica.html' },
          { label: 'Blagdani', href: '/blagdani.html' },
          { label: 'Svetac dana', href: '/svetac-dana.html' }
        ]
      }]
    },

    {
      label: 'Mediji',
      href: '/video.html',
      sections: [{
        items: [
          { label: 'Video', href: '/video.html' },
          { label: 'Galerija', href: '/galerija.html' },
          { label: 'Vijesti', href: '/vijesti.html' }
        ]
      }]
    },

    {
      label: 'Igra',
      href: '/brani-svoj-grad.html',
      sections: [{
        items: [
          { label: 'Brani svoj grad', href: '/brani-svoj-grad.html' },
          { label: 'Kviz', href: '/quiz.html' },
          { label: 'Duel', href: '/duel.html' },
          { label: 'Rang-lista', href: '/rang-lista.html' },
          { label: 'Profil', href: '/profil.html' }
        ]
      }]
    },

    {
      label: 'O nama',
      href: '/o-nama.html',
      sections: []
    },

    {
      label: 'Kontakt',
      href: '/kontakt.html',
      sections: []
    }
  ];

  function current() {
    return location.pathname.replace(/\/+$/, '') || '/';
  }

  function normalize(href) {
    return href.replace(/\/+$/, '') || '/';
  }

  function active(href) {
    return normalize(href) === current();
  }

  function containsActive(item) {
    return active(item.href) ||
      (item.children || []).some(containsActive);
  }

  function makeLink(item) {
    var a = document.createElement('a');

    a.href = item.href;
    a.textContent = item.label;
    a.className = 'ps-sub-link';

    if (active(item.href)) {
      a.setAttribute('aria-current', 'page');
    }

    return a;
  }

  function nestedItem(item, level) {
    var li = document.createElement('div');
    li.className = 'ps-nav-item ps-nav-item-level-' + level;

    if (containsActive(item)) {
      li.classList.add('is-active');
    }

    var row = document.createElement('div');
    row.className = 'ps-nav-item-row';

    row.appendChild(makeLink(item));
    li.appendChild(row);

    if (item.children && item.children.length) {
      var button = document.createElement('button');

      button.type = 'button';
      button.className = 'ps-nav-nested-toggle';

      var open = containsActive(item);

      button.setAttribute('aria-expanded', String(open));
      button.setAttribute(
        'aria-label',
        'Otvori podizbornik ' + item.label
      );

      button.textContent = open ? '⌄' : '›';

      row.appendChild(button);

      var child = document.createElement('div');

      child.className = 'ps-nav-nested';
      child.setAttribute('role', 'group');

      if (open) {
        child.classList.add('is-open');
      }

      item.children.forEach(function (x) {
        child.appendChild(nestedItem(x, level + 1));
      });

      li.appendChild(child);

      button.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var state = child.classList.toggle('is-open');

        button.setAttribute(
          'aria-expanded',
          String(state)
        );

        button.textContent = state ? '⌄' : '›';
      });
    }

    return li;
  }

  function group(g) {
    var w = document.createElement('div');
    w.className = 'ps-nav-group';

    if (
      active(g.href) ||
      (g.sections || []).some(function (s) {
        return s.items.some(containsActive);
      })
    ) {
      w.classList.add('is-active');
    }

    var row = document.createElement('div');
    row.className = 'ps-nav-parent-row';

    var parent = document.createElement('a');

    parent.href = g.href;
    parent.className = 'ps-nav-parent';
    parent.textContent = g.label;

    if (active(g.href)) {
      parent.setAttribute('aria-current', 'page');
    }

    row.appendChild(parent);

    var hasMenu = (g.sections || []).some(function (s) {
      return s.items && s.items.length;
    });

    if (hasMenu) {
      var toggle = document.createElement('button');

      toggle.type = 'button';
      toggle.className = 'ps-nav-toggle';

      toggle.setAttribute(
        'aria-expanded',
        'false'
      );

      toggle.setAttribute(
        'aria-label',
        'Otvori izbornik ' + g.label
      );

      toggle.textContent = '▼';

      row.appendChild(toggle);

      w.appendChild(row);

      var panel = document.createElement('div');

      panel.className = 'ps-subnav';
      panel.setAttribute('role', 'menu');

      var list = document.createElement('div');

      list.className = 'ps-simple-section';

      (g.sections || []).forEach(function (section) {
        section.items.forEach(function (item) {
          list.appendChild(
            nestedItem(item, 1)
          );
        });
      });

      panel.appendChild(list);
      w.appendChild(panel);

      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        closeOtherGroups(w);

        var open = w.classList.toggle(
          'is-expanded'
        );

        toggle.setAttribute(
          'aria-expanded',
          String(open)
        );
      });

    } else {
      w.appendChild(row);
    }

    return w;
  }

  function homeLink() {
    var w = document.createElement('div');
    w.className = 'ps-nav-home';

    var a = document.createElement('a');

    a.href = '/index.html';
    a.className = 'ps-nav-parent';
    a.textContent = 'Početna';

    if (
      current() === '/' ||
      current() === '/index.html'
    ) {
      a.setAttribute('aria-current', 'page');
      w.classList.add('is-active');
    }

    w.appendChild(a);

    return w;
  }

  function shell() {
    var header = document.querySelector('.ps-header');

    if (!header) {
      header = document.createElement('header');
      header.className = 'ps-header';

      document.body.insertBefore(
        header,
        document.body.firstChild
      );
    }

    var wrap = header.querySelector('.ps-nav');

    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'container ps-nav';
      header.appendChild(wrap);
    }

    var brand = wrap.querySelector('.ps-brand');

    if (!brand) {
      brand = document.createElement('a');
      brand.className = 'ps-brand';

      wrap.insertBefore(
        brand,
        wrap.firstChild
      );
    }

    brand.href = '/index.html';

    brand.setAttribute(
      'aria-label',
      'PatriaSoul — početna stranica'
    );

    var nav = wrap.querySelector('.ps-mainnav');

    if (!nav) {
      nav = document.createElement('nav');

      nav.className = 'ps-mainnav';
      nav.id = 'ps-mainnav';

      nav.setAttribute(
        'aria-label',
        'Glavna navigacija'
      );

      wrap.appendChild(nav);
    }

    var menu = wrap.querySelector('[data-ps-menu]');

    if (!menu) {
      menu = document.createElement('button');

      menu.className = 'ps-menu';
      menu.type = 'button';

      menu.setAttribute(
        'data-ps-menu',
        ''
      );

      menu.setAttribute(
        'aria-label',
        'Otvori glavni izbornik'
      );

      menu.setAttribute(
        'aria-controls',
        'ps-mainnav'
      );

      menu.setAttribute(
        'aria-expanded',
        'false'
      );

      menu.innerHTML =
        '<span></span><span></span><span></span>';

      wrap.appendChild(menu);
    }
  }

  function logo() {
    var brand = document.querySelector(
      '.ps-brand'
    );

    if (!brand) return;

    brand.innerHTML =
      '<img class="ps-nav-logo" ' +
      'src="/images/file_0000000082ec81f4a6fc17bdbd959622_114540.png" ' +
      'alt="PatriaSoul" width="256" height="256">' +
      '<span class="sr-only">PatriaSoul</span>';
  }

  function styles() {
    if (
      document.getElementById(
        'ps-navigation-pro-css'
      )
    ) return;

    var s = document.createElement('style');

    s.id = 'ps-navigation-pro-css';

    s.textContent = `
html{scroll-behavior:smooth}
body{overflow-x:hidden!important;overflow-y:auto!important}

.ps-header{
position:sticky!important;
top:0!important;
z-index:5000!important;
width:100%;
background:rgba(7,11,17,.97)!important;
border-bottom:1px solid rgba(224,189,85,.16);
backdrop-filter:blur(14px);
-webkit-backdrop-filter:blur(14px)
}

.ps-nav{
min-height:72px!important;
display:flex!important;
align-items:center!important;
gap:16px!important;
padding:8px 18px!important;
position:relative
}

.ps-brand{
display:flex!important;
align-items:center!important;
justify-content:center!important;
flex:0 0 48px!important;
width:48px!important;
height:48px!important;
text-decoration:none!important
}

.ps-nav-logo{
display:block!important;
width:46px!important;
height:46px!important;
max-width:46px!important;
max-height:46px!important;
object-fit:contain!important
}

.sr-only{
position:absolute!important;
width:1px!important;
height:1px!important;
padding:0!important;
margin:-1px!important;
overflow:hidden!important;
clip:rect(0,0,0,0)!important;
white-space:nowrap!important;
border:0!important
}

.ps-mainnav{
display:flex!important;
align-items:center!important;
justify-content:flex-end!important;
gap:2px!important;
flex:1 1 auto!important;
min-width:0!important
}

.ps-nav-group,
.ps-nav-home{
position:relative!important;
display:block!important
}

.ps-nav-parent-row{
display:flex!important;
align-items:center!important;
border-radius:10px!important
}

.ps-nav-parent{
display:inline-flex!important;
align-items:center!important;
justify-content:center!important;
gap:6px!important;
min-height:44px!important;
padding:8px 9px!important;
border-radius:10px 0 0 10px!important;
color:#eef2f5!important;
text-decoration:none!important;
font-size:14px!important;
font-weight:750!important;
white-space:nowrap!important
}

.ps-nav-home .ps-nav-parent{
border-radius:10px!important
}

.ps-nav-toggle{
width:27px!important;
height:44px!important;
border:0!important;
border-radius:0 10px 10px 0!important;
background:transparent!important;
color:#f1d57b!important;
cursor:pointer!important;
font-size:13px!important;
padding:0!important
}

.ps-nav-parent-row:hover,
.ps-nav-group.is-active>.ps-nav-parent-row,
.ps-nav-home.is-active{
background:rgba(224,189,85,.10)!important
}

.ps-nav-parent:hover,
.ps-nav-group.is-active>.ps-nav-parent-row .ps-nav-parent,
.ps-nav-home.is-active .ps-nav-parent{
color:#f5d879!important
}

.ps-nav-toggle:hover{
background:rgba(224,189,85,.12)!important
}

.ps-subnav{
position:absolute!important;
top:calc(100% + 8px)!important;
left:0!important;
z-index:5100!important;
display:none!important;
min-width:300px!important;
max-width:min(920px,calc(100vw - 28px))!important;
padding:12px!important;
background:rgba(10,15,22,.99)!important;
border:1px solid rgba(224,189,85,.22)!important;
border-radius:14px!important;
box-shadow:0 20px 55px rgba(0,0,0,.48)!important
}

.ps-nav-group:hover>.ps-subnav,
.ps-nav-group:focus-within>.ps-subnav,
.ps-nav-group.is-expanded>.ps-subnav{
display:block!important
}

.ps-simple-section{
min-width:0!important;
padding:3px!important
}

.ps-nav-item{
position:relative!important
}

.ps-nav-item-row{
display:flex!important;
align-items:center!important;
width:100%!important
}

.ps-sub-link{
display:flex!important;
align-items:center!important;
flex:1 1 auto!important;
min-height:38px!important;
padding:8px 10px!important;
border-radius:8px!important;
color:#e9edf0!important;
text-decoration:none!important;
font-size:14px!important;
line-height:1.25!important
}

.ps-sub-link:hover,
.ps-sub-link:focus-visible{
background:rgba(224,189,85,.11)!important;
color:#fff!important;
outline:none!important
}

.ps-sub-link[aria-current=page]{
background:rgba(224,189,85,.14)!important;
color:#f5d879!important;
font-weight:800!important
}

.ps-nav-nested-toggle{
flex:0 0 34px!important;
width:34px!important;
height:36px!important;
border:0!important;
border-radius:7px!important;
background:transparent!important;
color:#f1d57b!important;
cursor:pointer!important;
font-size:17px!important
}

.ps-nav-nested-toggle:hover{
background:rgba(224,189,85,.10)!important
}

.ps-nav-nested{
display:none!important;
margin-left:12px!important;
padding-left:8px!important;
border-left:1px solid rgba(224,189,85,.16)!important
}

.ps-nav-nested.is-open{
display:block!important
}

.ps-nav-item-level-2 .ps-sub-link{
font-size:13px!important;
min-height:34px!important
}

.ps-nav-item-level-3 .ps-sub-link{
font-size:12px!important;
min-height:32px!important
}

.ps-menu{
display:none!important;
flex:0 0 44px!important;
width:44px!important;
height:44px!important;
border:1px solid rgba(224,189,85,.25)!important;
border-radius:10px!important;
background:rgba(224,189,85,.06)!important;
cursor:pointer!important;
padding:9px!important
}

.ps-menu span{
display:block!important;
height:2px!important;
margin:5px 2px!important;
background:#f1d57b!important;
border-radius:2px!important;
transition:transform .2s,opacity .2s!important
}

.ps-search-trigger{
flex:0 0 44px!important;
width:44px!important;
height:44px!important;
border:1px solid rgba(224,189,85,.20)!important;
border-radius:10px!important;
background:rgba(224,189,85,.05)!important;
color:#f1d57b!important;
font-size:22px!important;
cursor:pointer!important
}

@media(max-width:1100px) and (min-width:861px){

.ps-nav{
gap:8px!important;
padding-inline:10px!important
}

.ps-nav-parent{
font-size:12px!important;
padding-inline:6px!important
}

.ps-nav-toggle{
width:21px!important
}

.ps-brand{
flex-basis:42px!important;
width:42px!important
}

.ps-nav-logo{
width:42px!important;
height:42px!important
}

.ps-search-trigger{
width:40px!important
}

}

@media(max-width:860px){

.ps-nav{
min-height:64px!important;
padding:8px 12px!important;
gap:8px!important
}

.ps-brand{
flex-basis:42px!important;
width:42px!important
}

.ps-nav-logo{
width:42px!important;
height:42px!important
}

.ps-menu{
display:block!important;
margin-left:auto!important
}

.ps-mainnav{
position:absolute!important;
left:10px!important;
right:10px!important;
top:calc(100% + 8px)!important;
display:none!important;
flex-direction:column!important;
align-items:stretch!important;
justify-content:flex-start!important;
gap:3px!important;
max-height:calc(100vh - 84px)!important;
overflow:auto!important;
padding:8px!important;
background:rgba(8,13,20,.995)!important;
border:1px solid rgba(224,189,85,.20)!important;
border-radius:14px!important;
box-shadow:0 18px 45px rgba(0,0,0,.5)!important
}

.ps-mainnav.is-open{
display:flex!important
}

.ps-nav-group,
.ps-nav-home,
.ps-nav-parent-row{
width:100%!important
}

.ps-nav-parent-row{
background:rgba(255,255,255,.025)!important
}

.ps-nav-home .ps-nav-parent{
width:100%!important;
justify-content:flex-start!important
}

.ps-nav-parent{
flex:1!important;
justify-content:flex-start!important;
min-height:48px!important;
padding:11px 12px!important;
border-radius:10px 0 0 10px!important;
font-size:15px!important
}

.ps-nav-toggle{
width:48px!important;
height:48px!important;
border-radius:0 10px 10px 0!important;
font-size:18px!important
}

.ps-nav-group:hover>.ps-subnav,
.ps-nav-group:focus-within>.ps-subnav{
display:none!important
}

.ps-nav-group.is-expanded>.ps-subnav{
display:block!important
}

.ps-subnav{
position:static!important;
width:100%!important;
max-width:none!important;
min-width:0!important;
padding:5px 4px 8px 12px!important;
margin:0!important;
background:rgba(0,0,0,.18)!important;
border:0!important;
border-radius:0!important;
box-shadow:none!important
}

.ps-sub-link{
min-height:42px!important;
font-size:14px!important
}

.ps-nav-nested{
margin-left:8px!important
}

.ps-nav-item-level-2 .ps-sub-link{
font-size:13px!important;
min-height:38px!important
}

.ps-nav-item-level-3 .ps-sub-link{
font-size:12px!important;
min-height:36px!important
}

body.ps-mobile-nav-open{
overflow:hidden!important
}

.ps-menu[aria-expanded=true] span:nth-child(1){
transform:translateY(7px) rotate(45deg)!important
}

.ps-menu[aria-expanded=true] span:nth-child(2){
opacity:0!important
}

.ps-menu[aria-expanded=true] span:nth-child(3){
transform:translateY(-7px) rotate(-45deg)!important
}

}

@media(prefers-reduced-motion:reduce){

html{
scroll-behavior:auto
}

.ps-menu span{
transition:none!important
}

}
`;

    document.head.appendChild(s);
  }

  function render() {
    var nav = document.querySelector('.ps-mainnav');

    if (!nav) return;

    nav.innerHTML = '';

    nav.appendChild(homeLink());

    groups.forEach(function (g) {
      nav.appendChild(group(g));
    });

    logo();
  }

  function closeOtherGroups(except) {
    document
      .querySelectorAll('.ps-nav-group.is-expanded')
      .forEach(function (g) {
        if (g === except) return;

        g.classList.remove(
          'is-expanded'
        );

        var b = g.querySelector(
          ':scope > .ps-nav-parent-row .ps-nav-toggle'
        );

        if (b) {
          b.setAttribute(
            'aria-expanded',
            'false'
          );
        }
      });
  }

  function menu() {
    var b = document.querySelector(
      '[data-ps-menu]'
    );

    var nav = document.querySelector(
      '.ps-mainnav'
    );

    if (!b || !nav || b.dataset.bound) return;

    b.dataset.bound = '1';

    b.addEventListener('click', function () {
      var open = nav.classList.toggle(
        'is-open'
      );

      b.setAttribute(
        'aria-expanded',
        String(open)
      );

      document.body.classList.toggle(
        'ps-mobile-nav-open',
        open
      );

      if (!open) {
        closeOtherGroups();
      }
    });
  }

  function interactions() {
    if (
      document.body.dataset.psNavInteractions
    ) return;

    document.body.dataset.psNavInteractions = '1';

    document.addEventListener(
      'click',
      function (e) {
        if (
          !e.target.closest('.ps-nav-group')
        ) {
          closeOtherGroups();
        }
      }
    );

    document.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'Escape') {
          closeOtherGroups();

          var nav = document.querySelector(
            '.ps-mainnav'
          );

          var menu = document.querySelector(
            '.ps-menu'
          );

          if (nav) {
            nav.classList.remove(
              'is-open'
            );
          }

          if (menu) {
            menu.setAttribute(
              'aria-expanded',
              'false'
            );
          }

          document.body.classList.remove(
            'ps-mobile-nav-open'
          );
        }
      }
    );

    window.addEventListener(
      'resize',
      function () {
        if (
          window.matchMedia(
            '(min-width:861px)'
          ).matches
        ) {
          var nav = document.querySelector(
            '.ps-mainnav'
          );

          var menu = document.querySelector(
            '.ps-menu'
          );

          if (nav) {
            nav.classList.remove(
              'is-open'
            );
          }

          if (menu) {
            menu.setAttribute(
              'aria-expanded',
              'false'
            );
          }

          document.body.classList.remove(
            'ps-mobile-nav-open'
          );
        }
      }
    );
  }

  function search() {
    if (
      document.querySelector(
        '.ps-search-overlay'
      )
    ) return;

    var wrap = document.querySelector(
      '.ps-nav'
    );

    if (!wrap) return;

    var trigger = document.createElement(
      'button'
    );

    trigger.type = 'button';
    trigger.className = 'ps-search-trigger';

    trigger.setAttribute(
      'aria-label',
      'Pretraži PatriaSoul'
    );

    trigger.textContent = '⌕';

    wrap.appendChild(trigger);

    var overlay = document.createElement(
      'div'
    );

    overlay.className =
      'ps-search-overlay';

    overlay.innerHTML =
      '<div class="ps-search-panel" role="dialog" aria-modal="true" aria-label="Pretraga PatriaSoul">' +
      '<button type="button" class="ps-search-close" aria-label="Zatvori pretragu">✕</button>' +
      '<div class="ps-search-title">Pretraži PatriaSoul</div>' +
      '<div class="ps-search-subtitle">Brzo pronađi rubriku ili podstranicu.</div>' +
      '<input class="ps-search-input" type="search" autocomplete="off" placeholder="Npr. Vukovar, gastronomija, Glagoljica…">' +
      '<div class="ps-search-results"></div>' +
      '</div>';

    document.body.appendChild(overlay);

    var input = overlay.querySelector(
      '.ps-search-input'
    );

    var results = overlay.querySelector(
      '.ps-search-results'
    );

    function walk(item, out) {
      out.push({
        label: item.label,
        href: item.href
      });

      (item.children || []).forEach(
        function (c) {
          walk(c, out);
        }
      );
    }

    var all = [];

    all.push({
      label: 'Početna',
      href: '/index.html'
    });

    groups.forEach(function (g) {
      all.push({
        label: g.label,
        href: g.href
      });

      (g.sections || []).forEach(
        function (s) {
          s.items.forEach(
            function (i) {
              walk(i, all);
            }
          );
        }
      );
    });

    all = all.filter(
      function (x, i, a) {
        return a.findIndex(
          function (y) {
            return y.href === x.href;
          }
        ) === i;
      }
    );

    function renderResults(q) {
      results.innerHTML = '';

      if (!q) {
        results.innerHTML =
          '<div class="ps-search-hint">Upiši pojam za pretragu.</div>';

        return;
      }

      var needle = q.toLocaleLowerCase(
        'hr-HR'
      );

      var found = all.filter(
        function (x) {
          return x.label
            .toLocaleLowerCase('hr-HR')
            .indexOf(needle) !== -1;
        }
      ).slice(0, 12);

      if (!found.length) {
        results.innerHTML =
          '<div class="ps-search-hint">Nema rezultata.</div>';

        return;
      }

      found.forEach(function (x) {
        var a = document.createElement(
          'a'
        );

        a.href = x.href;
        a.className =
          'ps-search-result';

        a.textContent = x.label;

        results.appendChild(a);
      });
    }

    function openSearch() {
      overlay.classList.add(
        'is-open'
      );

      document.body.classList.add(
        'ps-search-lock'
      );

      setTimeout(
        function () {
          input.focus();
        },
        20
      );
    }

    function closeSearch() {
      overlay.classList.remove(
        'is-open'
      );

      document.body.classList.remove(
        'ps-search-lock'
      );
    }

    trigger.addEventListener(
      'click',
      openSearch
    );

    overlay
      .querySelector('.ps-search-close')
      .addEventListener(
        'click',
        closeSearch
      );

    overlay.addEventListener(
      'click',
      function (e) {
        if (e.target === overlay) {
          closeSearch();
        }
      }
    );

    input.addEventListener(
      'input',
      function () {
        renderResults(
          input.value.trim()
        );
      }
    );

    document.addEventListener(
      'keydown',
      function (e) {
        if (
          (
            e.key === '/' &&
            !/input|textarea|select/i.test(
              document.activeElement.tagName
            )
          ) ||
          (
            e.ctrlKey &&
            e.key.toLowerCase() === 'k'
          )
        ) {
          e.preventDefault();
          openSearch();
        }

        if (
          e.key === 'Escape' &&
          overlay.classList.contains(
            'is-open'
          )
        ) {
          closeSearch();
        }
      }
    );

    renderResults('');
  }

  function back() {
    if (
      location.pathname === '/' ||
      /\/index\.html$/.test(
        location.pathname
      ) ||
      document.querySelector(
        '.ps-back-nav'
      )
    ) return;

    var box = document.createElement(
      'div'
    );

    box.className = 'ps-back-nav';

    var a = document.createElement(
      'a'
    );

    a.href = '#';
    a.textContent = '← Natrag';

    a.addEventListener(
      'click',
      function (e) {
        e.preventDefault();

        if (history.length > 1) {
          history.back();
        } else {
          location.href =
            '/index.html';
        }
      }
    );

    box.appendChild(a);

    var h = document.querySelector(
      '.ps-header'
    );

    if (h) {
      h.insertAdjacentElement(
        'afterend',
        box
      );
    } else {
      document.body.insertBefore(
        box,
        document.body.firstChild
      );
    }
  }

  function scrollTop() {
    if (
      document.querySelector(
        '.ps-scroll-top'
      )
    ) return;

    var b = document.createElement(
      'button'
    );

    b.type = 'button';
    b.className = 'ps-scroll-top';
    b.textContent = '↑';

    b.setAttribute(
      'aria-label',
      'Povratak na vrh'
    );

    b.addEventListener(
      'click',
      function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    );

    document.body.appendChild(b);

    function toggle() {
      b.classList.toggle(
        'is-visible',
        window.scrollY > 420
      );
    }

    window.addEventListener(
      'scroll',
      toggle,
      { passive: true }
    );

    toggle();
  }

  function footer() {
    var f = document.querySelector(
      'footer'
    );

    if (f) {
      f.classList.add(
        'ps-footer'
      );
    }
  }

  function init() {
    styles();
    shell();
    render();
    menu();
    interactions();
    search();
    back();
    scrollTop();
    footer();
  }

  if (
    document.readyState === 'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      init
    );
  } else {
    init();
  }

  window.PatriaSiteNavigation = {
    groups: groups,
    render: render,
    addBackButton: back,
    addScrollTop: scrollTop,
    openSearch: function () {
      var b = document.querySelector(
        '.ps-search-trigger'
      );

      if (b) b.click();
    }
  };

})();
```
