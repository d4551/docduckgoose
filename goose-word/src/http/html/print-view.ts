import { ROUTES } from "../../config/routes.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import type { DocRecord } from "../../services/doc-store.ts";
import { renderMarkdown } from "../../services/markdown-render.ts";
import { escapeHtml } from "./escape-html.ts";

export const renderPrintPage = (locale: LocaleCode, doc: DocRecord, autoPrint: boolean): string => {
  const title = doc.title.trim() === "" ? translate(locale, "editor.title") : doc.title;
  const renderedBody = renderMarkdown(doc.body);
  const autoPrintScript = autoPrint
    ? `<script type="module" src="${ROUTES.static.clientFile("print-view.js")}"></script>`
    : "";

  return `<!DOCTYPE html>
<html lang="${locale}" class="gw-print-shell">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)} · ${escapeHtml(translate(locale, "editor.print"))}</title>
  <link rel="stylesheet" href="${ROUTES.static.tokens}" />
  <link rel="stylesheet" href="${ROUTES.static.density}" />
  <link rel="stylesheet" href="${ROUTES.static.styles}" />
  ${autoPrintScript}
</head>
<body class="gw-print-body">
  <main class="gw-print-page">
    <header class="gw-print-header">
      <h1>${escapeHtml(title)}</h1>
      <button type="button" class="btn btn-primary btn-sm gw-print-action" data-print-trigger>${escapeHtml(translate(locale, "editor.print"))}</button>
    </header>
    <article class="gw-print-content">
      ${renderedBody}
    </article>
  </main>
</body>
</html>`;
};
