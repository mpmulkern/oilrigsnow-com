/**
 * Cloudflare Pages Worker — Oil Rigs Now
 * Injects a "Browse all rigs" back-link bar into individual rig detail pages
 * without modifying the Watcher-generated source files.
 *
 * Targets: /land-drilling-rigs/{slug}/  (NOT /land-drilling-rigs/ itself)
 */

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

class BackBarInjector {
  element(element) {
    element.after(BACK_BAR_HTML, { html: true });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Only inject on individual rig pages: /land-drilling-rigs/{slug}/
    // Not on /land-drilling-rigs/ itself (browse page)
    const isRigDetailPage = /^\/land-drilling-rigs\/[^/]+\/?$/.test(path) &&
                            path !== '/land-drilling-rigs/' &&
                            path !== '/land-drilling-rigs';

    // Pass through everything else unchanged
    const response = await env.ASSETS.fetch(request);

    if (!isRigDetailPage) {
      return response;
    }

    // Only transform HTML responses
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return response;
    }

    // Inject back bar after the opening <body> tag
    return new HTMLRewriter()
      .on('body', new BackBarInjector())
      .transform(response);
  }
};
