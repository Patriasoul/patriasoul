// PatriaSoul — compatibility bridge for the legacy AI widget path.
// Keep this path alive so older cached loaders cannot execute the retired widget.
(function () {
  'use strict';
  if (window.__PATRIA_LEGACY_WIDGET_BRIDGE__) return;
  window.__PATRIA_LEGACY_WIDGET_BRIDGE__ = true;

  function loadV2() {
    if (window.__PATRIA_ASK_WIDGET_V2__) return;
    const existing = document.querySelector('script[data-patriasoul-ai-widget="v2"]');
    if (existing) return;
    const script = document.createElement('script');
    script.src = '/ai-engine/pitaj-patriasoul-widget-v2.js?psai=47';
    script.async = false;
    script.dataset.patriasoulAiWidget = 'v2';
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadV2, { once: true });
  } else {
    loadV2();
  }
})();
