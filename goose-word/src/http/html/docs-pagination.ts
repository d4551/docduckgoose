import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import type { DocsListQuery } from "../docs-query.ts";
import {
  docsListHref,
  docsListPageClamped,
  docsListQueryWithPage,
  docsListTotalPages,
} from "../docs-query.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import { escapeAttr, escapeHtml } from "./escape-html.ts";
import { TABLE_CELL_MONO_CLASS, UI_META_SECONDARY_CLASS } from "./surface-typography.ts";

const paginationButtonClass = resolveTemplateButtonClasses({
  variant: "ghost",
  size: "compact",
  joinItem: true,
});

const paginationDisabledClass = `${paginationButtonClass} btn-disabled`;

interface DocsPaginationInput {
  readonly locale: LocaleCode;
  readonly query: DocsListQuery;
  readonly total: number;
}

export const renderDocsPagination = (input: DocsPaginationInput): string => {
  const totalPages = docsListTotalPages(input.total, input.query.pageSize);
  if (totalPages <= 1 && input.total <= input.query.pageSize) {
    const from = input.total === 0 ? 0 : 1;
    const to = input.total;
    const summary = translate(input.locale, "settings.pagination.summary", {
      from,
      to,
      total: input.total,
    });
    const navLabel = translate(input.locale, "docs.pagination.nav.aria");
    return `<nav class="gw-docs-pagination flex flex-wrap items-center justify-between gap-2 pt-2" aria-label="${escapeAttr(navLabel)}">
      <p class="${UI_META_SECONDARY_CLASS} tabular-nums" role="status">${escapeHtml(summary)}</p>
    </nav>`;
  }

  const currentPage = docsListPageClamped(input.query, input.total);
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  const prevUrl = docsListHref(docsListQueryWithPage(input.query, prevPage));
  const nextUrl = docsListHref(docsListQueryWithPage(input.query, nextPage));

  const prevLabel = translate(input.locale, "settings.pagination.previous");
  const nextLabel = translate(input.locale, "settings.pagination.next");
  const navLabel = translate(input.locale, "docs.pagination.nav.aria");
  const pageLabel = translate(input.locale, "settings.pagination.page", { page: currentPage });
  const from = input.total === 0 ? 0 : (currentPage - 1) * input.query.pageSize + 1;
  const to = Math.min(currentPage * input.query.pageSize, input.total);
  const summary = translate(input.locale, "settings.pagination.summary", {
    from,
    to,
    total: input.total,
  });

  const prevElement = prevDisabled
    ? `<button type="button" class="${escapeAttr(paginationDisabledClass)}" disabled tabindex="-1" aria-label="${escapeAttr(prevLabel)}" aria-disabled="true">${escapeHtml(prevLabel)}</button>`
    : `<a class="${escapeAttr(paginationButtonClass)}" href="${escapeAttr(prevUrl)}" hx-get="${escapeAttr(prevUrl)}" hx-target="#gw-main" hx-swap="innerHTML" hx-push-url="true" hx-indicator="#global-indicator" aria-label="${escapeAttr(prevLabel)}">${escapeHtml(prevLabel)}</a>`;
  const nextElement = nextDisabled
    ? `<button type="button" class="${escapeAttr(paginationDisabledClass)}" disabled tabindex="-1" aria-label="${escapeAttr(nextLabel)}" aria-disabled="true">${escapeHtml(nextLabel)}</button>`
    : `<a class="${escapeAttr(paginationButtonClass)}" href="${escapeAttr(nextUrl)}" hx-get="${escapeAttr(nextUrl)}" hx-target="#gw-main" hx-swap="innerHTML" hx-push-url="true" hx-indicator="#global-indicator" aria-label="${escapeAttr(nextLabel)}">${escapeHtml(nextLabel)}</a>`;

  return `<nav class="gw-docs-pagination join flex flex-wrap items-center justify-between gap-2 pt-2" aria-label="${escapeAttr(navLabel)}">
    <p class="${UI_META_SECONDARY_CLASS} tabular-nums" role="status">${escapeHtml(summary)}</p>
    <div class="join flex shadow-sm select-none">
      ${prevElement}
      <span class="join-item btn btn-sm btn-disabled ${TABLE_CELL_MONO_CLASS} tabular-nums" role="status" tabindex="-1" aria-current="page" aria-disabled="true">${escapeHtml(pageLabel)} / ${escapeHtml(String(totalPages))}</span>
      ${nextElement}
    </div>
  </nav>`;
};
