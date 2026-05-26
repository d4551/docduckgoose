import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import { renderIcon, renderTemplateIconForId } from "@baohaus/soy-view-kit/templates/icons";
import type { DocsSortDirection, DocsSortKey } from "../../config/docs-table.ts";
import {
  docDeletePath,
  docEditPath,
  docNewPath,
  userTemplateDeletePath,
  userTemplateEditPath,
} from "../../config/routes.ts";
import type { DocsListQuery } from "../docs-query.ts";
import { docsListHref, docsListQueryWithSort } from "../docs-query.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import type { DocumentTemplateRegistration } from "../../install/contribution-surfaces.ts";
import type { DocRecord } from "../../services/doc-store.ts";
import type { UserTemplateRecord } from "../../services/user-templates.ts";
import { escapeAttr, escapeHtml } from "./escape-html.ts";
import { renderDocsPagination } from "./docs-pagination.ts";
import { renderPageShell } from "./layout.ts";
import {
  PAGE_HEADING_HANDWRITING_CLASS,
  SECTION_HEADING_CLASS,
  SORT_INDICATOR_CLASS,
  TABLE_CELL_META_CLASS,
  TABLE_CELL_MONO_CLASS,
  TABLE_SORT_HEADER_LINK_CLASS,
  UI_EMPHASIS_XS_CLASS,
  UI_META_SECONDARY_CLASS,
} from "./surface-typography.ts";

interface TemplateCard {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly href: string;
  readonly deleteHref?: string;
  readonly editHref?: string;
}

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

const renderDocRow = (locale: LocaleCode, doc: DocRecord): string => {
  const updatedLabel = formatUpdatedAt(locale, doc.updatedAt);
  return `<tr class="hover gw-row-enter">
              <th scope="row" class="max-w-56">
                <a class="link link-hover gw-handwriting truncate font-bold" href="${docEditPath(doc.id)}">${escapeHtml(doc.title)}</a>
              </th>
              <td><time class="${TABLE_CELL_META_CLASS}" datetime="${escapeHtml(doc.updatedAt)}" title="${escapeHtml(doc.updatedAt)}">${escapeHtml(updatedLabel)}</time></td>
              <td class="hidden max-w-48 truncate sm:table-cell ${TABLE_CELL_MONO_CLASS}" title="${escapeHtml(doc.filePath)}">${escapeHtml(doc.filePath)}</td>
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

interface DocsSortHeaderInput {
  readonly locale: LocaleCode;
  readonly label: string;
  readonly sortKey: DocsSortKey;
  readonly query: DocsListQuery;
}

const renderDocsSortHeader = (input: DocsSortHeaderInput): string => {
  const isActive = input.query.sort === input.sortKey;
  const nextDir: DocsSortDirection = isActive && input.query.dir === "asc" ? "desc" : "asc";
  const ariaSort = isActive ? (input.query.dir === "asc" ? "ascending" : "descending") : "none";
  const nextQuery = docsListQueryWithSort(input.query, input.sortKey, nextDir);
  const href = docsListHref(nextQuery);
  const sortLabel = translate(
    input.locale,
    nextDir === "asc" ? "settings.table.sort.asc" : "settings.table.sort.desc",
    { column: input.label },
  );
  const indicator = isActive ? (input.query.dir === "asc" ? " ▲" : " ▼") : "";
  return `<th scope="col" aria-sort="${ariaSort}" class="cursor-pointer select-none p-0"><a href="${escapeAttr(href)}" hx-get="${escapeAttr(href)}" hx-target="#gw-main" hx-swap="innerHTML" hx-push-url="true" hx-indicator="#global-indicator" class="${TABLE_SORT_HEADER_LINK_CLASS}" aria-label="${escapeAttr(sortLabel)}"><span>${escapeHtml(input.label)}</span><span class="${SORT_INDICATOR_CLASS}" aria-hidden="true">${indicator}</span></a></th>`;
};

const renderDocsTableHead = (locale: LocaleCode, query: DocsListQuery): string => {
  const titleLabel = translate(locale, "docs.column.title");
  const updatedLabel = translate(locale, "docs.column.updated");
  const pathLabel = translate(locale, "docs.column.path");
  const actionsLabel = translate(locale, "docs.column.actions");
  return `<thead class="sticky top-0 z-10">
            <tr>
              ${renderDocsSortHeader({ locale, label: titleLabel, sortKey: "title", query })}
              ${renderDocsSortHeader({ locale, label: updatedLabel, sortKey: "updated", query })}
              <th scope="col" class="hidden sm:table-cell ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(pathLabel)}</th>
              <th scope="col" class="w-24 ${UI_EMPHASIS_XS_CLASS}">${escapeHtml(actionsLabel)}</th>
            </tr>
          </thead>`;
};

const renderDocsSearchForm = (locale: LocaleCode, query: DocsListQuery): string => {
  const searchLabel = translate(locale, "docs.search.label");
  const searchPlaceholder = translate(locale, "docs.search.placeholder");
  const applyLabel = translate(locale, "docs.search.apply");
  const listHref = docsListHref({ ...query, page: 1 });
  const sortField =
    query.sort !== "updated"
      ? `<input type="hidden" name="sort" value="${escapeAttr(query.sort)}" />`
      : "";
  const dirField =
    query.dir !== "desc"
      ? `<input type="hidden" name="dir" value="${escapeAttr(query.dir)}" />`
      : "";
  return `<form class="gw-docs-search relative z-20 mb-3 flex flex-col gap-2 sm:flex-row sm:items-end" role="search" hx-get="${escapeAttr(listHref)}" hx-target="#gw-main" hx-swap="innerHTML" hx-push-url="true" hx-indicator="#global-indicator">
      ${sortField}
      ${dirField}
      <label class="form-control min-w-0 flex-1">
        <span class="label-text sr-only">${escapeHtml(searchLabel)}</span>
        <input class="input input-bordered input-sm w-full" type="search" name="q" value="${escapeAttr(query.search)}" placeholder="${escapeAttr(searchPlaceholder)}" aria-label="${escapeAttr(searchPlaceholder)}" autocomplete="off" />
      </label>
      <button type="submit" class="${resolveTemplateButtonClasses({ variant: "outline", size: "icon-compact", className: "tooltip tooltip-left" })}" data-tip="${escapeAttr(applyLabel)}" aria-label="${escapeAttr(applyLabel)}">${renderIcon("preview", { ariaHidden: true })}</button>
    </form>`;
};

export const renderDocsListPanel = (
  locale: LocaleCode,
  docs: readonly DocRecord[],
  templates: readonly DocumentTemplateRegistration[],
  userTemplates: readonly UserTemplateRecord[],
  query: DocsListQuery,
  totalCount: number,
): string => {
  const newLabel = translate(locale, "docs.new");
  const emptyMessage =
    query.search.length > 0
      ? translate(locale, "docs.search.empty")
      : translate(locale, "docs.empty.description");
  const pagination = renderDocsPagination({ locale, query, total: totalCount });
  const filterHint =
    query.search.length > 0
      ? `<p class="mb-2 ${UI_META_SECONDARY_CLASS}" role="status">${escapeHtml(translate(locale, "docs.search.status.filtered", { count: totalCount, query: query.search }))}</p>`
      : "";
  const tableBody =
    docs.length === 0
      ? ""
      : `<tbody id="gw-docs-tbody">${docs.map((doc) => renderDocRow(locale, doc)).join("")}</tbody>`;
  const rows =
    docs.length === 0
      ? `<div class="alert alert-soft py-6 text-center ${UI_META_SECONDARY_CLASS}" role="status">${escapeHtml(emptyMessage)}</div>`
      : `<div class="gw-table-surface overflow-x-auto" role="region" aria-label="${escapeHtml(translate(locale, "docs.table.aria"))}" tabindex="0">
        <table class="table table-zebra table-sm">
          ${renderDocsTableHead(locale, query)}
          ${tableBody}
        </table>
      </div>
      ${pagination}`;

  const templateCards: readonly TemplateCard[] = [
    ...templates.map((template) => {
      const label = translate(locale, template.labelKey);
      const desc = template.descriptionKey ? translate(locale, template.descriptionKey) : "";
      return {
        id: template.id,
        label,
        description: desc,
        href: `${docNewPath}?template=${encodeURIComponent(template.id)}`,
      };
    }),
    ...userTemplates.map((template) => ({
      id: `user:${template.id}`,
      label: template.title,
      description: template.description,
      href: `${docNewPath}?template=${encodeURIComponent(`user:${template.id}`)}`,
      deleteHref: userTemplateDeletePath(template.id),
      editHref: userTemplateEditPath(template.id),
    })),
  ];

  const templatePicker =
    templateCards.length > 0
      ? `
    <section class="gw-templates mb-4" aria-label="${escapeHtml(translate(locale, "templates.title"))}">
      <h2 class="mb-2 ${SECTION_HEADING_CLASS}">${escapeHtml(translate(locale, "templates.title"))}</h2>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
        ${templateCards
          .map((template) => {
            const cardActions =
              template.deleteHref && template.editHref
                ? `<div class="absolute right-1 top-1 flex gap-1">
                  <a class="${iconActionBtn("outline", "btn-xs")}" href="${escapeAttr(template.editHref)}" data-tip="${escapeHtml(translate(locale, "templates.edit"))}" aria-label="${escapeHtml(translate(locale, "templates.edit"))}">${renderIcon("open", { className: "size-3.5", ariaHidden: true })}</a>
                  <form method="post" action="${escapeAttr(template.deleteHref)}" hx-post="${escapeAttr(template.deleteHref)}" hx-target="#gw-main" hx-swap="innerHTML" hx-indicator="#global-indicator">
                    <button type="submit" class="${iconActionBtn("error", "btn-xs")}" data-tip="${escapeHtml(translate(locale, "templates.delete"))}" aria-label="${escapeHtml(translate(locale, "templates.delete"))}">${renderIcon("delete", { className: "size-3.5", ariaHidden: true })}</button>
                  </form>
                </div>`
                : "";
            return `
            <div class="relative">
            <a href="${template.href}" class="gw-template-card bao-touch-target tooltip tooltip-top motion-safe:transition" data-tip="${escapeHtml(template.description.length > 0 ? template.description : template.label)}" data-template-id="${escapeHtml(template.id)}" tabindex="0" aria-label="${escapeHtml(template.label)}">
              <span class="gw-template-card__body flex flex-col items-center gap-1 bg-base-100 p-2 text-center">
                ${renderTemplateIconForId(template.id)}
                <span class="gw-template-label ${UI_EMPHASIS_XS_CLASS} leading-tight">${escapeHtml(template.label)}</span>
              </span>
            </a>
            ${cardActions}
            </div>`;
          })
          .join("")}
      </div>
    </section>`
      : "";

  const newBtnClass = resolveTemplateButtonClasses({
    variant: "primary",
    size: "icon-compact",
    className: "tooltip tooltip-left",
  });

  const pageTitle = `${translate(locale, "docs.title")} · ${translate(locale, "app.title")}`;
  return `
    <section class="gw-panel">
      <div class="mb-3 flex items-center justify-between gap-2">
        <h1 class="${PAGE_HEADING_HANDWRITING_CLASS}" data-gw-page-title="${escapeAttr(pageTitle)}">${escapeHtml(translate(locale, "docs.title"))}</h1>
        <a class="${newBtnClass}" href="${docNewPath}" data-tip="${escapeHtml(newLabel)}" aria-label="${escapeHtml(newLabel)}">${renderIcon("new")}</a>
      </div>
      ${renderDocsSearchForm(locale, query)}
      ${filterHint}
      ${templatePicker}
      ${rows}
      ${docs.length === 0 ? pagination : ""}
    </section>`;
};

export const renderDocsListPage = (
  locale: LocaleCode,
  docs: readonly DocRecord[],
  templates: readonly DocumentTemplateRegistration[],
  userTemplates: readonly UserTemplateRecord[],
  query: DocsListQuery,
  totalCount: number,
): string => {
  const body = renderDocsListPanel(locale, docs, templates, userTemplates, query, totalCount);

  return renderPageShell({
    locale,
    titleKey: "docs.title",
    bodyHtml: body,
    activeNav: "docs",
  });
};
