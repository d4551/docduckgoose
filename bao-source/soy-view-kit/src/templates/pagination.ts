/**
 * Pagination primitive — daisyUI join with HTMX-aware prev/next links.
 *
 * Wraps the controls in a `<nav>` landmark with `aria-label` and tags the
 * current page indicator with `role="status"` so screen readers announce
 * progress on each page change.
 *
 * @packageDocumentation
 */

import { escapeAttr, escapeHtml } from "../html.js";
import { resolveTemplateButtonClasses } from "./buttons.js";
import { MAIN_CONTENT_ID } from "./design-tokens.js";
import { buildShellHtmxNavigationAttributes } from "./htmx.js";
import type { TranslateFn } from "./types.js";

/** Props for the pagination primitive. */
export interface PaginationProps {
  /** Current page (1-based). */
  readonly page: number;
  /** Total number of pages. */
  readonly totalPages: number;
  /**
   * Base URL used for page links. Existing query params are preserved and the
   * `page` parameter is overwritten per link.
   */
  readonly baseUrl: string;
  /** Translator callback. */
  readonly translate: TranslateFn;
  /** Optional `aria-label` for the nav landmark. Defaults to `common.pagination.pageNavigation`. */
  readonly navLabel?: string;
  /** Optional HTMX swap target selector. Defaults to `#main-content`. */
  readonly hxTarget?: string;
}

function buildPageUrl(baseUrl: string, page: number): string {
  const [path, query] = baseUrl.split("?");
  const params = new URLSearchParams(query ?? "");
  params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${path}?${qs}` : (path ?? baseUrl);
}

/**
 * Render pagination controls with ARIA wiring and HTMX navigation.
 *
 * @param props - Pagination props.
 * @returns HTML string. Empty when `totalPages` ≤ 1.
 */
export function renderPagination(props: PaginationProps): string {
  if (props.totalPages <= 1) {
    return "";
  }
  const translate = props.translate;
  const navLabel = props.navLabel ?? translate("common.pagination.pageNavigation");
  const target = props.hxTarget ?? `#${MAIN_CONTENT_ID}`;
  const prevPage = props.page > 1 ? props.page - 1 : 1;
  const nextPage = props.page < props.totalPages ? props.page + 1 : props.totalPages;
  const prevUrl = buildPageUrl(props.baseUrl, prevPage);
  const nextUrl = buildPageUrl(props.baseUrl, nextPage);
  const prevDisabled = props.page <= 1;
  const nextDisabled = props.page >= props.totalPages;

  const compactButtonClass = resolveTemplateButtonClasses({
    variant: "ghost",
    size: "compact",
    joinItem: true,
  });
  const compactDisabledButtonClass = `${compactButtonClass} btn-disabled`;

  const prevAriaLabel = translate("common.pagination.previousPage");
  const nextAriaLabel = translate("common.pagination.nextPage");
  const prevLabel = translate("common.actions.previous");
  const nextLabel = translate("common.actions.next");

  const prevHxAttrs = buildShellHtmxNavigationAttributes(prevUrl, { target });
  const nextHxAttrs = buildShellHtmxNavigationAttributes(nextUrl, { target });

  const prevElement = prevDisabled
    ? `<button type="button" class="${escapeAttr(compactDisabledButtonClass)}" disabled tabindex="-1" aria-label="${escapeAttr(prevAriaLabel)}" aria-disabled="true">${escapeHtml(prevLabel)}</button>`
    : `<a class="${escapeAttr(compactButtonClass)}" href="${escapeAttr(prevUrl)}" ${prevHxAttrs} aria-label="${escapeAttr(prevAriaLabel)}">${escapeHtml(prevLabel)}</a>`;
  const nextElement = nextDisabled
    ? `<button type="button" class="${escapeAttr(compactDisabledButtonClass)}" disabled tabindex="-1" aria-label="${escapeAttr(nextAriaLabel)}" aria-disabled="true">${escapeHtml(nextLabel)}</button>`
    : `<a class="${escapeAttr(compactButtonClass)}" href="${escapeAttr(nextUrl)}" ${nextHxAttrs} aria-label="${escapeAttr(nextAriaLabel)}">${escapeHtml(nextLabel)}</a>`;

  const indicatorLabel = translate("common.pagination.page", { page: props.page });

  return `
  <nav aria-label="${escapeAttr(navLabel)}" class="join flex justify-center shadow-sm select-none">
    ${prevElement}
    <span class="join-item btn btn-sm btn-disabled font-mono text-xs tabular-nums" role="status" tabindex="-1" aria-current="page" aria-disabled="true">${escapeHtml(indicatorLabel)} / ${escapeHtml(String(props.totalPages))}</span>
    ${nextElement}
  </nav>`;
}
