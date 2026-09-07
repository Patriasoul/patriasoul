export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = decodeURIComponent(url.pathname);

    // Legacy compatibility: older pages requested these files.
    if (path === '/images/Hrvatske_kockice.png') {
      const replacementUrl = new URL('/images/flag-of-croatia-free-vector.jpg', request.url);
      return env.ASSETS.fetch(new Request(replacementUrl, request));
    }

    if (path === '/ai-engine/puter-ai.js') {
      return new Response('// Legacy Puter AI compatibility shim. PatriaSoul now uses its native AI engine.\n', {
        status: 200,
        headers: {
          'Content-Type': 'application/javascript; charset=utf-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    // Serve the canonical SVG favicon even when browsers request /favicon.ico.
    if (path === '/favicon.ico') {
      const faviconUrl = new URL('/favicon.svg', request.url);
      const favicon = await env.ASSETS.fetch(new Request(faviconUrl, request));
      if (favicon.status === 200) {
        const headers = new Headers(favicon.headers);
        headers.set('Content-Type', 'image/svg+xml');
        headers.set('Cache-Control', 'public, max-age=86400');
        return new Response(favicon.body, { status: favicon.status, headers });
      }
    }

    const direct = await env.ASSETS.fetch(request);
    if (direct.status !== 404 && !path.endsWith('.html') && path !== '/') return direct;

    let page = direct;
    if (page.status === 404 && !path.includes('.')) {
      const clean = new URL(request.url);
      clean.pathname = path === '/' ? '/index.html' : `${path}.html`;
      page = await env.ASSETS.fetch(new Request(clean, request));
    }

    if (page.status === 404) return page;
    const contentType = page.headers.get('Content-Type') || '';
    if (!contentType.toLowerCase().includes('text/html')) return page;

    return new HTMLRewriter().on('head', {
      element(head) {
        head.append('<link rel="icon" href="/favicon.svg" type="image/svg+xml">', { html: true });
      }
    }).transform(page);
  }
};
