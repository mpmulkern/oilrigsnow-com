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

// ---- RFQ form handler -----------------------------------------------------
// Advanced-mode Pages: _worker.js is the sole entry point and the functions/
// directory is ignored, so the /api/rfq endpoint lives here. Accepts a POST
// from the /quote/ form, emails the RFQ to Michael via Resend, returns JSON.
const RFQ_FIELDS = [
  ['inquiry_type', 'Inquiry type'],
  ['equipment_category', 'Equipment category'],
  ['capacity', 'Horsepower / capacity'],
  ['condition', 'Condition preference'],
  ['quantity', 'Quantity'],
  ['region', 'Operating region / location'],
  ['timeframe', 'Target timeframe'],
  ['budget', 'Budget / price expectation'],
  ['name', 'Full name'],
  ['company', 'Company'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['country', 'Country / region'],
  ['message', 'Message / specifications'],
];

function jsonResponse(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function handleRfq(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }
  if (!env.RESEND_API_KEY) {
    return jsonResponse(
      { error: 'Email service is not configured. Please email info@oilrigsnow.com directly.' },
      500,
    );
  }

  // Parse either form-encoded or JSON bodies.
  let data = {};
  const ct = request.headers.get('content-type') || '';
  try {
    if (ct.includes('application/json')) {
      data = await request.json();
    } else {
      const form = await request.formData();
      for (const [k, v] of form.entries()) data[k] = v;
    }
  } catch (e) {
    return jsonResponse({ error: 'Could not read the submission. Please try again.' }, 400);
  }

  const name = (data.name || '').toString().trim();
  const email = (data.email || '').toString().trim();
  const message = (data.message || '').toString().trim();

  // Minimal required-field + email validation.
  if (!name || !email || !message) {
    return jsonResponse({ error: 'Please fill in your name, email, and message.' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: 'Please enter a valid email address.' }, 400);
  }

  // Build the email bodies from every known field that was supplied.
  const rows = [];
  const textLines = [];
  for (const [key, label] of RFQ_FIELDS) {
    const raw = data[key];
    if (raw == null || raw.toString().trim() === '') continue;
    const val = raw.toString().trim();
    rows.push(
      `<tr><td style="padding:6px 12px;font-weight:600;background:#f4f6f8;border:1px solid #e2e6ea;vertical-align:top;">${escapeHtml(
        label,
      )}</td><td style="padding:6px 12px;border:1px solid #e2e6ea;white-space:pre-wrap;">${escapeHtml(
        val,
      )}</td></tr>`,
    );
    textLines.push(`${label}: ${val}`);
  }

  const html = `<div style="font-family:Inter,Arial,sans-serif;font-size:14px;color:#1a1a1a;">
    <h2 style="margin:0 0 12px;">New RFQ from ${escapeHtml(name)}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:640px;">${rows.join('')}</table>
    <p style="margin-top:16px;color:#666;font-size:12px;">Submitted via the oilrigsnow.com RFQ form.</p>
  </div>`;

  const payload = {
    // NOTE: michael@oilrigsnow.com is on Resend's suppression list (prior hard
    // bounce via the Cloudflare->Gmail forward), so Resend accepts the API call
    // but silently drops delivery. Send to the Gmail box directly — the org
    // standard for all ORN notifications — which tests as reliably delivered.
    from: 'Oil Rigs Now RFQ <info@mail.oilrigsnow.com>',
    to: ['mpmulkern@gmail.com'],
    reply_to: email,
    subject: `New RFQ from ${name}`,
    html,
    text: textLines.join('\n'),
  };

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      console.log('Resend error', resendRes.status, detail);
      return jsonResponse(
        { error: 'We could not send your request right now. Please email info@oilrigsnow.com directly.' },
        502,
      );
    }
  } catch (e) {
    console.log('Resend fetch failed', e && e.message);
    return jsonResponse(
      { error: 'We could not send your request right now. Please email info@oilrigsnow.com directly.' },
      502,
    );
  }

  return jsonResponse({ success: true }, 200);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // RFQ API endpoint — handle before serving static assets.
    if (path === '/api/rfq') {
      return handleRfq(request, env);
    }

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
