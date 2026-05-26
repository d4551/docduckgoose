import { resolveTemplateButtonClasses } from "@baohaus/soy-view-kit/templates/buttons";
import { SETTINGS_TABLE_PAGE_SIZE } from "../../config/constants.ts";
import { settingsPath } from "../../config/routes.ts";
import type { LocaleCode } from "../../i18n/runtime.ts";
import { translate } from "../../i18n/runtime.ts";
import { escapeAttr, escapeHtml } from "./escape-html.ts";
import {
  SORT_INDICATOR_CLASS,
  TABLE_CELL_MONO_CLASS,
  TABLE_SORT_HEADER_LINK_CLASS,
  UI_META_SECONDARY_CLASS,
} from "./surface-typography.ts";

export type SortDirection = "asc" | "desc";

export interface PaginatedResult<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

export interface SettingsTableQuery {
  readonly pluginsPage: number;
  readonly enterprisePage: number;
  readonly pluginsSort: "id" | "version" | "source";
  readonly pluginsDir: SortDirection;
  readonly enterpriseSort: "label" | "type";
  readonly enterpriseDir: SortDirection;
}

export const DEFAULT_SETTINGS_TABLE_QUERY: SettingsTableQuery = {
  pluginsPage: 1,
  enterprisePage: 1,
  pluginsSort: "id",
  pluginsDir: "asc",
  enterpriseSort: "label",
  enterpriseDir: "asc",
};

const parsePositiveInt = (value: string | null, fallback: number): number => {
  if (value === null || value.length === 0) {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }
  return parsed;
};

const parseSortDirection = (value: string | null): SortDirection =>
  value === "desc" ? "desc" : "asc";

export function parseSettingsTableQuery(searchParams: URLSearchParams): SettingsTableQuery {
  const pluginsSortRaw = searchParams.get("pluginsSort");
  const pluginsSort =
    pluginsSortRaw === "version" || pluginsSortRaw === "source" ? pluginsSortRaw : "id";
  const enterpriseSortRaw = searchParams.get("enterpriseSort");
  const enterpriseSort = enterpriseSortRaw === "type" ? "type" : "label";
  return {
    pluginsPage: parsePositiveInt(searchParams.get("pluginsPage"), 1),
    enterprisePage: parsePositiveInt(searchParams.get("enterprisePage"), 1),
    pluginsSort,
    pluginsDir: parseSortDirection(searchParams.get("pluginsDir")),
    enterpriseSort,
    enterpriseDir: parseSortDirection(searchParams.get("enterpriseDir")),
  };
}

export function buildSettingsUrl(query: SettingsTableQuery): string {
  const params = new URLSearchParams();
  if (query.pluginsPage > 1) {
    params.set("pluginsPage", String(query.pluginsPage));
  }
  if (query.enterprisePage > 1) {
    params.set("enterprisePage", String(query.enterprisePage));
  }
  if (query.pluginsSort !== "id") {
    params.set("pluginsSort", query.pluginsSort);
  }
  if (query.pluginsDir !== "asc") {
    params.set("pluginsDir", query.pluginsDir);
  }
  if (query.enterpriseSort !== "label") {
    params.set("enterpriseSort", query.enterpriseSort);
  }
  if (query.enterpriseDir !== "asc") {
    params.set("enterpriseDir", query.enterpriseDir);
  }
  const qs = params.toString();
  return qs.length > 0 ? `${settingsPath}?${qs}` : settingsPath;
}

export function paginateSlice<T>(
  items: readonly T[],
  page: number,
  pageSize: number = SETTINGS_TABLE_PAGE_SIZE,
): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export function sortStrings(left: string, right: string, direction: SortDirection): number {
  const cmp = left.localeCompare(right);
  return direction === "asc" ? cmp : -cmp;
}

const paginationButtonClass = resolveTemplateButtonClasses({
  variant: "ghost",
  size: "compact",
  joinItem: true,
});

const paginationDisabledClass = `${paginationButtonClass} btn-disabled`;

interface SettingsPaginationInput {
  readonly locale: LocaleCode;
  readonly query: SettingsTableQuery;
  readonly pageField: "pluginsPage" | "enterprisePage";
  readonly totalPages: number;
  readonly total: number;
}

export function renderSettingsPagination(input: SettingsPaginationInput): string {
  if (input.totalPages <= 1) {
    return "";
  }
  const currentPage =
    input.pageField === "pluginsPage" ? input.query.pluginsPage : input.query.enterprisePage;
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < input.totalPages ? currentPage + 1 : input.totalPages;
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= input.totalPages;

  const prevUrl = buildSettingsUrl({ ...input.query, [input.pageField]: prevPage });
  const nextUrl = buildSettingsUrl({ ...input.query, [input.pageField]: nextPage });

  const prevLabel = translate(input.locale, "settings.pagination.previous");
  const nextLabel = translate(input.locale, "settings.pagination.next");
  const navLabel = translate(input.locale, "settings.pagination.nav.aria");
  const pageLabel = translate(input.locale, "settings.pagination.page", { page: currentPage });
  const from = (currentPage - 1) * SETTINGS_TABLE_PAGE_SIZE + 1;
  const to = Math.min(currentPage * SETTINGS_TABLE_PAGE_SIZE, input.total);
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

  return `<nav class="gw-settings-pagination join flex flex-wrap items-center justify-between gap-2 pt-2" aria-label="${escapeAttr(navLabel)}">
    <p class="${UI_META_SECONDARY_CLASS} tabular-nums" role="status">${escapeHtml(summary)}</p>
    <div class="join flex shadow-sm select-none">
      ${prevElement}
      <span class="join-item btn btn-sm btn-disabled ${TABLE_CELL_MONO_CLASS} tabular-nums" role="status" tabindex="-1" aria-current="page" aria-disabled="true">${escapeHtml(pageLabel)} / ${escapeHtml(String(input.totalPages))}</span>
      ${nextElement}
    </div>
  </nav>`;
}

interface SortHeaderInput {
  readonly locale: LocaleCode;
  readonly label: string;
  readonly sortKey: string;
  readonly activeSort: string;
  readonly activeDir: SortDirection;
  readonly query: SettingsTableQuery;
  readonly sortField: "pluginsSort" | "enterpriseSort";
  readonly dirField: "pluginsDir" | "enterpriseDir";
}

export function renderSettingsSortHeader(input: SortHeaderInput): string {
  const isActive = input.activeSort === input.sortKey;
  const nextDir: SortDirection = isActive && input.activeDir === "asc" ? "desc" : "asc";
  const ariaSort = isActive ? (input.activeDir === "asc" ? "ascending" : "descending") : "none";
  const nextQuery: SettingsTableQuery = {
    ...input.query,
    [input.sortField]: input.sortKey as SettingsTableQuery[typeof input.sortField],
    [input.dirField]: nextDir,
    pluginsPage: input.sortField === "pluginsSort" ? 1 : input.query.pluginsPage,
    enterprisePage: input.sortField === "enterpriseSort" ? 1 : input.query.enterprisePage,
  };
  const href = buildSettingsUrl(nextQuery);
  const sortLabel = translate(
    input.locale,
    nextDir === "asc" ? "settings.table.sort.asc" : "settings.table.sort.desc",
    { column: input.label },
  );
  const indicator = isActive ? (input.activeDir === "asc" ? " ▲" : " ▼") : "";
  return `<th scope="col" aria-sort="${ariaSort}" class="cursor-pointer select-none p-0"><a href="${escapeAttr(href)}" hx-get="${escapeAttr(href)}" hx-target="#gw-main" hx-swap="innerHTML" hx-push-url="true" hx-indicator="#global-indicator" class="${TABLE_SORT_HEADER_LINK_CLASS}" aria-label="${escapeAttr(sortLabel)}"><span>${escapeHtml(input.label)}</span><span class="${SORT_INDICATOR_CLASS}" aria-hidden="true">${indicator}</span></a></th>`;
}
