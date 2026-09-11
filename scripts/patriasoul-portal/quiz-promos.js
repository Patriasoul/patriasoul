/* PatriaSoul Portal 2.0 — quiz promotion components */
(function (window, document) {
  'use strict';

  var root = window.PatriaSoulPortal = window.PatriaSoulPortal || {};
  root.quizPromos = root.quizPromos || {};

  var copy = {
    hrvatski: {
      title: 'Koliko dobro poznaješ Hrvatsku?',
      text: 'Povijest, geografija, kultura, baština, Domovina i zanimljivosti Hrvatske. Testiraj svoje znanje i vidi koliko bodova možeš osvojiti.',
      label: '🇭🇷 Hrvatski kviz',
      cta: 'IGRAJ HRVATSKI KVIZ →',
      url: '/quiz.html'
    },
    grad: {
      title: 'Poznaješ li svoj grad dovoljno dobro da ga obraniš?',
      text: 'Upoznaj njegovu povijest, ljude, znamenitosti i događaje — a zatim testiraj svoje znanje.',
      label: '🛡️ Brani svoj grad',
      cta: 'ODABERI GRAD I KRENI →',
      url: '/brani-svoj-grad.html'
    }
  };

  function render(type) {
    var data = copy[type];
    if (!data) return '';

    return '<section class="ps-quiz-promo ps-quiz-promo-' + type + '" data-ps-quiz-promo="' + type + '">' +
      '<div class="ps-quiz-promo-content">' +
        '<div class="ps-quiz-promo-label">' + data.label + '</div>' +
        '<h2>' + data.title + '</h2>' +
        '<p>' + data.text + '</p>' +
        '<a class="ps-quiz-promo-cta" href="' + data.url + '">' + data.cta + '</a>' +
      '</div>' +
    '</section>';
  }

  root.quizPromos.render = render;

  root.quizPromos.mount = function (selector) {
    var nodes = document.querySelectorAll(selector || '[data-ps-quiz-promo-slot]');

    nodes.forEach(function (node) {
      var type = node.getAttribute('data-ps-quiz-promo-slot');
      node.innerHTML = render(type);
    });
  };
})(window, document);
