// PatriaSoul — compatibility bridge for the legacy AI widget path.
// Older cached pages may still request this filename. Instead of running the
// retired widget, this bridge boots the complete current AI loader.
(function () {
  'use strict';
  if (window.__PATRIA_LEGACY_WIDGET_BRIDGE__) return;
  window.__PATRIA_LEGACY_WIDGET_BRIDGE__ = true;

  function bootCurrentAI() {
    if (window.PatriaSoulAIReady && typeof window.PatriaSoulAIReady.then === 'function') return;
    if (document.querySelector('script[data-patriasoul-ai-loader="current"]')) return;

    const script = document.createElement('script');
    script.src = '/ai-engine/load-pitaj-patriasoul.js?v=48';
    script.async = false;
    script.dataset.patriasoulAiLoader = 'current';
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootCurrentAI, { once: true });
  } else {
    bootCurrentAI();
  }
})();
