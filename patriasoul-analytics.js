/* PatriaSoul — privacy-friendly local analytics v2 */
(function () {
  'use strict';

  var key = 'patriasoul.analytics.v2';

  function read() {
    try {
      var value = localStorage.getItem(key);
      return value ? JSON.parse(value) : [];
    } catch (e) {
      return [];
    }
  }

  function send(type, data) {
    try {
      var events = read();
      events.push({
        type: type,
        path: window.location.pathname,
        at: new Date().toISOString(),
        data: data || {}
      });
      if (events.length > 200) events = events.slice(-200);
      localStorage.setItem(key, JSON.stringify(events));
    } catch (e) {}
  }

  window.PatriaAnalytics = {
    track: send,
    get: read,
    clear: function () {
      try { localStorage.removeItem(key); } catch (e) {}
    }
  };

  send('pageview');

  document.addEventListener('click', function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest('a') : null;
    if (!link) return;

    send('click', {
      href: link.getAttribute('href'),
      text: (link.textContent || '').trim().slice(0, 100)
    });
  });
})();
