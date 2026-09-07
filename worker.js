export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = decodeURIComponent(url.pathname);

    // Serve the canonical SVG favicon even when browsers request /favicon.ico.
    if (path === '/favicon.ico') {
      const faviconUrl = new URL('/favicon.svg', request.url);
      const favicon = await env.ASSETS.fetch(new Request(faviconUrl, request));
      if (favicon.status === 200) {
        const headers = new Headers(favicon.headers);
        headers.set('Content-Type', 'image/svg+xml');
        headers.set('Cache-Control', 'public, max-age=86400');
        return new Response(favicon.body, {
          status: favicon.status,
          headers
        });
      }
    }

    // Keep real files and directories working exactly as they are.
    const direct = await env.ASSETS.fetch(request);
    if (direct.status !== 404 && !path.endsWith('.html') && path !== '/') return direct;

    let page = direct;

    // Allow clean URLs such as /branitelji to open /branitelji.html.
    if (page.status === 404 && !path.includes('.')) {
      const clean = new URL(request.url);
      clean.pathname = path === '/' ? '/index.html' : `${path}.html`;
      page = await env.ASSETS.fetch(new Request(clean, request));
    }

    if (page.status === 404) return page;

    // Add the canonical favicon link centrally to every HTML page.
    const contentType = page.headers.get('Content-Type') || '';
    if (!contentType.toLowerCase().includes('text/html')) return page;

    return new HTMLRewriter()
      .on('head', {
        element(head) {
          head.append(
            '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
            { html: true }
          );
        }
      })
      .transform(page);
  }
};
