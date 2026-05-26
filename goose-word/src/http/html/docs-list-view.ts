import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import { renderIcon, renderTemplateIconForId } from "@baohaus/soy-view-kit/templates/icons";
import { docDeletePath, docEditPath, docNewPath, ROUTES } from "../../config/routes.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import type { DocumentTemplateRegistration } from "../../install/contribution-surfaces.ts";
import type { DocRecord } from "../../services/doc-store.ts";
import { escapeHtml } from "./escape-html.ts";
import { renderPageShell } from "./layout.ts";

const DOCS_PAGE_SIZE = 20;

const iconActionBtn = (variant: "outline" | "error", extra = ""): string =>
  resolveTemplateButtonClasses({
    variant: variant === "error" ? "error" : "outline",
    size: "icon-compact",
    className: `tooltip tooltip-left ${extra}`.trim(),
  });

const formatUpdatedAt = (locale: LocaleCode, value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const renderDocRow = (locale: LocaleCode, doc: DocRecord, index: number): string => {
  const style = `animation-delay:${index * 24}ms`;
  const updatedLabel = formatUpdatedAt(locale, doc.updatedAt);
  return `<tr class="hover gw-row-enter" style="${style}">
              <th scope="row" class="max-w-[14rem]">
                <a class="link link-hover gw-handwriting truncate font-bold" href="${docEditPath(doc.id)}">${escapeHtml(doc.title)}</a>
              </th>
              <td><time class="text-base-content/70 text-xs" datetime="${escapeHtml(doc.updatedAt)}" title="${escapeHtml(doc.updatedAt)}">${escapeHtml(updatedLabel)}</time></td>
              <td class="hidden max-w-[12rem] truncate font-mono text-xs text-base-content/60 sm:table-cell" title="${escapeHtml(doc.filePath)}">${escapeHtml(doc.filePath)}</td>
              <td>
                <div class="flex items-center gap-1">
                  <a class="${iconActionBtn("outline")}" href="${docEditPath(doc.id)}" data-tip="${escapeHtml(translate(locale, "docs.open"))}" aria-label="${escapeHtml(translate(locale, "docs.open"))}">${renderIcon("open")}</a>
                  <div class="gw-delete-confirm">
                    <button type="button" class="${iconActionBtn("error")}" data-delete-toggle data-delete-href="${docDeletePath(doc.id)}" data-delete-label="${escapeHtml(translate(locale, "docs.delete"))}" data-confirm-label="${escapeHtml(translate(locale, "docs.delete.confirm"))}" aria-label="${escapeHtml(translate(locale, "docs.delete"))}">${renderIcon("delete")}</button>
                  </div>
                </div>
              </td>
            </tr>`;
};

const renderScrollSentinel = (nextOffset: number): string =>
  `<tr class="gw-scroll-sentinel" hx-get="${ROUTES.docs.rowsFragment}?offset=${nextOffset}&limit=${DOCS_PAGE_SIZE}" hx-trigger="intersect once threshold:0.1" hx-swap="outerHTML" hx-target="this"><td colspan="4" class="py-4 text-center text-xs text-base-content/40"><span class="loading loading-dots loading-sm"></span></td></tr>`;

export const renderDocRowsFragment = (
  locale: LocaleCode,
  docs: readonly DocRecord[],
  offset: number,
): string => {
  const rows = docs.map((doc, i) => renderDocRow(locale, doc, i)).join("");
  const sentinel = docs.length >= DOCS_PAGE_SIZE ? renderScrollSentinel(offset + docs.length) : "";
  return rows + sentinel;
};

export const renderDocsListPanel = (
  locale: LocaleCode,
  docs: readonly DocRecord[],
  templates: readonly DocumentTemplateRegistration[] = [],
): string => {
  const newLabel = translate(locale, "docs.new");
  const initialDocs = docs.slice(0, DOCS_PAGE_SIZE);
  const hasMore = docs.length > DOCS_PAGE_SIZE;
  const rows =
    docs.length === 0
      ? `<div class="alert alert-soft py-6 text-center text-sm">${escapeHtml(translate(locale, "docs.empty.description"))}</div>`
      : `<div class="gw-table-surface overflow-x-auto border border-base-300 bg-base-100" role="region" aria-label="${escapeHtml(translate(locale, "docs.table.aria"))}" tabindex="0">
        <table class="table table-zebra table-sm">
          <thead>
            <tr>
              <th scope="col">${escapeHtml(translate(locale, "docs.column.title"))}</th>
              <th scope="col">${escapeHtml(translate(locale, "docs.column.updated"))}</th>
              <th scope="col" class="hidden sm:table-cell">${escapeHtml(translate(locale, "docs.column.path"))}</th>
              <th scope="col" class="w-24">${escapeHtml(translate(locale, "docs.column.actions"))}</th>
            </tr>
          </thead>
          <tbody>${initialDocs.map((doc, i) => renderDocRow(locale, doc, i)).join("")}${hasMore ? renderScrollSentinel(DOCS_PAGE_SIZE) : ""}</tbody>
        </table>
      </div>`;

  const templatePicker =
    templates.length > 0
      ? `
    <section class="gw-templates mb-4" aria-label="${escapeHtml(translate(locale, "templates.title"))}">
      <h2 class="mb-2 text-sm font-semibold">${escapeHtml(translate(locale, "templates.title"))}</h2>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
        ${templates
          .map((t) => {
            const label = translate(locale, t.labelKey);
            const desc = t.descriptionKey ? translate(locale, t.descriptionKey) : "";
            const url = `${docNewPath}?template=${encodeURIComponent(t.id)}`;
            return `
            <a href="${url}" class="gw-template-card bao-touch-target tooltip tooltip-top motion-safe:transition" data-tip="${escapeHtml(label)}" data-template-id="${escapeHtml(t.id)}" tabindex="0" aria-label="${escapeHtml(label)}">
              <span class="gw-template-card__body">
                ${renderTemplateIconForId(t.id)}
                <span class="gw-template-label sr-only">${escapeHtml(label)}</span>
                ${desc ? `<span class="gw-template-desc sr-only">${escapeHtml(desc)}</span>` : ""}
              </span>
            </a>`;
          })
          .join("")}
      </div>
      <p class="mt-2 text-xs text-base-content/60">${escapeHtml(translate(locale, "templates.hint"))}</p>
    </section>`
      : "";

  const newBtnClass = resolveTemplateButtonClasses({
    variant: "primary",
    size: "icon-compact",
    className: "tooltip tooltip-left",
  });

  return `
    <section class="gw-panel">
      <div class="mb-3 flex items-center justify-between gap-2">
        <h1 class="gw-handwriting text-lg font-bold">${escapeHtml(translate(locale, "docs.title"))}</h1>
        <a class="${newBtnClass}" href="${docNewPath}" data-tip="${escapeHtml(newLabel)}" aria-label="${escapeHtml(newLabel)}">${renderIcon("new")}</a>
      </div>
      ${templatePicker}
      ${rows}
    </section>`;
};

export const renderDocsListPage = (
  locale: LocaleCode,
  docs: readonly DocRecord[],
  templates: readonly DocumentTemplateRegistration[] = [],
): string => {
  const body = renderDocsListPanel(locale, docs, templates);

  return renderPageShell({
    locale,
    titleKey: "docs.title",
    bodyHtml: body,
    activeNav: "docs",
  });
};
