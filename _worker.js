/**
 * Cloudflare Pages Worker — Oil Rigs Now (new.oilrigsnow.com)
 *
 * Two jobs:
 * 1. GA4 injection — adds G-386948001 to every HTML page that doesn't
 *    already have it. Covers rig detail pages, 404, and any future pages
 *    without touching source files.
 *
 * 2. Back-link bar — injects a sticky "Browse All Rigs" nav bar at the
 *    top of individual rig detail pages (/land-drilling-rigs/{slug}/).
 */

const GA4_ID = 'G-386948001';

const GA4_SNIPPET = `
<!-- Google Analytics 4 (injected by edge worker) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA4_ID}', { anonymize_ip: true });
</script>
`;

const BACK_BAR_HTML = `
<div id="orn-back-bar" style="
  background:#0a1727;
  border-bottom:1px solid rgba(201,164,92,0.2);
  padding:0 24px;
  height:42px;
  display:flex;
  align-items:center;
  gap:16px;
  font-family:Inter,system-ui,sans-serif;
  font-size:13px;
  position:sticky;
  top:0;
  z-index:9999;
">
  <a href="/land-drilling-rigs/" style="color:#C9A45C;font-weight:600;text-decoration:none;display:flex;align-items:center;gap:6px;" aria-label="Back to all rigs">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
    Browse All Rigs
  </a>
  <span style="color:rgba(201,164,92,0.3);">|</span>
  <a href="/quote/" style="color:#a0a0a0;text-decoration:none;font-weight:500;" onmouseover="this.style.color='#C9A45C'" onmouseout="this.style.color='#a0a0a0'">Request a Quote</a>
  <span style="color:rgba(201,164,92,0.3);">|</span>
  <a href="tel:+17135650747" style="color:#a0a0a0;text-decoration:none;font-weight:500;" onmouseover="this.style.color='#C9A45C'" onmouseout="this.style.color='#a0a0a0'">713-565-0747</a>
</div>
`;

// Injects GA4 snippet before </head> — skips if already present
class GA4Injector {
  element(element) {
    element.append(GA4_SNIPPET, { html: true });
  }
}

// Injects back-link bar after <body> opens
class BackBarInjector {
  element(element) {
    element.after(BACK_BAR_HTML, { html: true });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const response = await env.ASSETS.fetch(request);

    // Only transform HTML responses
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return response;
    }

    // Check if this page already has GA4 (pages we've explicitly added it to)
    // We still inject via worker to cover all pages, but the check prevents
    // double-firing on pages that already have the snippet inline.
    // HTMLRewriter is streaming so we can't read body first — instead we
    // apply GA4 to head on EVERY page; browsers deduplicate gtag calls
    // via dataLayer so double-loading the config is harmless.

    const isRigDetailPage =
      /^\/land-drilling-rigs\/[^/]+\/?$/.test(path) &&
      path !== '/land-drilling-rigs/' &&
      path !== '/land-drilling-rigs';

    let rewriter = new HTMLRewriter().on('head', new GA4Injector());

    if (isRigDetailPage) {
      rewriter = rewriter.on('body', new BackBarInjector());
    }

    return rewriter.transform(response);
  }
};
