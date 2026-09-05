export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = decodeURIComponent(url.pathname);

    // Keep real files and directories working exactly as they are.
    const direct = await env.ASSETS.fetch(request);
    if (direct.status !== 404 || path === "/") return direct;

    // Allow clean URLs such as /branitelji to open /branitelji.html.
    if (!path.includes(".")) {
      const clean = new URL(request.url);
      clean.pathname = path === "/" ? "/index.html" : `${path}.html`;
      const page = await env.ASSETS.fetch(new Request(clean, request));
      if (page.status !== 404) return page;
    }

    return direct;
  }
};
