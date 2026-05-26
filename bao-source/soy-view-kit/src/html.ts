import { resolveLocale, translate } from "./i18n.js";
import { SURFACE_GLASS } from "./templates/design-tokens.js";
import { renderSectionCard } from "./templates/section-card.js";

export { resolveLocale, translate };

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function isHtmxRequest(headers: Headers): boolean {
  return headers.get("hx-request") === "true";
}

export function hxHeaders(overrides: Record<string, string> = {}): Record<string, string> {
  return {
    "Content-Type": "text/html; charset=utf-8",
    ...overrides,
  };
}

export function hxPushUrl(url: string): Record<string, string> {
  return { "HX-Push-Url": url };
}

export function hxTrigger(events: Record<string, unknown>): Record<string, string> {
  return { "HX-Trigger": JSON.stringify(events) };
}

export function hxRedirect(url: string): Record<string, string> {
  return { "HX-Redirect": url };
}

export function hxRetarget(selector: string): Record<string, string> {
  return { "HX-Retarget": selector };
}

export function hxReswap(strategy: string): Record<string, string> {
  return { "HX-Reswap": strategy };
}

function targetSelector(id: string): string {
  return `#${escapeAttr(id)}`;
}

export function loadingState(id: string, locale = "en"): string {
  return renderSectionCard({
    id,
    bodyClassName: "items-center gap-3 text-center",
    body: `
    <span class="loading loading-spinner loading-lg htmx-indicator" aria-hidden="true"></span>
    <p class="font-semibold">${escapeHtml(translate(locale, "status.loading"))}</p>`,
  });
}

export function emptyState(id: string, message: string, locale = "en"): string {
  const selector = targetSelector(id);
  return renderSectionCard({
    id,
    bodyClassName: "items-center gap-4 text-center",
    body: `
    <span class="status status-warning status-lg" aria-hidden="true"></span>
    <div class="space-y-2">
      <h2 class="text-xl font-semibold">${escapeHtml(translate(locale, "status.emptyTitle"))}</h2>
      <p class="text-base-content/60">${escapeHtml(message)}</p>
    </div>
    <button class="btn btn-primary btn-md" type="button" hx-get="." hx-target="${selector}" hx-swap="innerHTML">${escapeHtml(translate(locale, "status.refresh"))}</button>`,
  });
}

export function errorState(id: string, message: string, locale = "en"): string {
  const selector = targetSelector(id);
  return renderSectionCard({
    id,
    bodyClassName: "gap-4",
    body: `
    <div role="alert" class="alert alert-error">
      <span>${escapeHtml(translate(locale, "ui.errorTitle"))}: ${escapeHtml(message)}</span>
    </div>
    <div class="flex justify-center">
      <button class="btn btn-outline btn-md" type="button" hx-get="." hx-target="${selector}" hx-swap="innerHTML">${escapeHtml(translate(locale, "status.retry"))}</button>
    </div>`,
  });
}

export function renderPageHeader(input: {
  action?: string;
  description: string;
  eyebrow?: string;
  id?: string;
  title: string;
}): string {
  const headingId = input.id ?? "page-header-title";
  const eyebrow = input.eyebrow
    ? `<p class="text-sm font-semibold uppercase tracking-wide text-base-content/60">${escapeHtml(
        input.eyebrow,
      )}</p>`
    : "";

  return `<header class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
  <div class="space-y-2">
    ${eyebrow}
    <div class="space-y-1">
      <h1 id="${escapeAttr(headingId)}" class="text-3xl font-semibold">${escapeHtml(input.title)}</h1>
      <p class="max-w-3xl text-base-content/60">${escapeHtml(input.description)}</p>
    </div>
  </div>
  ${input.action ?? ""}
</header>`;
}

export function seoMeta(input: {
  canonical?: string;
  description: string;
  locale?: string;
  title: string;
}): string {
  const locale = input.locale ?? "en";
  const openGraphLocale = locale.toLowerCase().startsWith("ko") ? "ko_KR" : "en_US";
  const canonicalTag =
    typeof input.canonical === "string"
      ? `\n<link rel="canonical" href="${escapeAttr(input.canonical)}">`
      : "";

  return `<title>${escapeHtml(input.title)}</title>
<meta name="description" content="${escapeAttr(input.description)}">
<meta property="og:title" content="${escapeAttr(input.title)}">
<meta property="og:description" content="${escapeAttr(input.description)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${escapeAttr(openGraphLocale)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttr(input.title)}">
<meta name="twitter:description" content="${escapeAttr(input.description)}">${canonicalTag}`;
}

export function jsonLdScript(schema: object): string {
  const payload = JSON.stringify(schema).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${payload}</script>`;
}

export function renderPageShell(input: {
  body: string;
  description?: string;
  locale?: string;
  scripts?: readonly string[];
  stylesheets?: readonly string[];
  title: string;
}): string {
  const locale = resolveLocale(input.locale);
  const scripts = input.scripts ?? [];
  const stylesheets = input.stylesheets ?? [];
  const stylesheetTags = stylesheets
    .map((href) => `<link rel="stylesheet" href="${escapeAttr(href)}"/>`)
    .join("\n");
  const scriptTags = scripts.map((src) => `<script src="${escapeAttr(src)}"></script>`).join("\n");
  const description = input.description ?? input.title;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  ${seoMeta({ description, locale, title: input.title })}
  ${stylesheetTags}
</head>
<body class="min-h-screen ${SURFACE_GLASS} text-base-content">
${input.body}
${scriptTags}
</body>
</html>`;
}

export function renderToastContainer(): string {
  return '<div class="toast toast-end toast-top z-50" aria-live="polite" id="baohaus-toast-container"></div>';
}

export function renderAlert(input: {
  locale?: string;
  message: string;
  variant: "error" | "info" | "success" | "warning";
}): string {
  return `<div class="alert alert-${input.variant}" role="alert"><span>${escapeHtml(
    input.message,
  )}</span></div>`;
}

export function renderAuthCardPage(input: {
  locale?: string;
  title: string;
  intro?: string;
  feedback?: string;
  form: string;
}): string {
  const locale = resolveLocale(input.locale);
  const intro = input.intro
    ? `<p class="text-sm text-base-content/70">${escapeHtml(input.intro)}</p>`
    : "";

  return renderPageShell({
    body: `<main class="min-h-screen flex items-center justify-center px-4">
  <section class="card bg-base-100 shadow-xl w-full max-w-md">
    <div class="card-body gap-4">
      <h1 class="card-title">${escapeHtml(input.title)}</h1>
      ${intro}
      ${input.feedback ?? ""}
      ${input.form}
    </div>
  </section>
</main>`,
    description: input.intro ?? input.title,
    locale,
    title: `${input.title} | ${translate(locale, "app.name")}`,
  });
}
