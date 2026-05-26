import { DOCS_PAGE_SIZE } from "../config/constants.ts";
import {
  DEFAULT_DOCS_SORT,
  DEFAULT_DOCS_SORT_DIR,
  type DocsSortDirection,
  type DocsSortKey,
} from "../config/docs-table.ts";
import { routePaths } from "../config/routes.ts";

export type { DocsSortDirection, DocsSortKey };

export interface DocsListQuery {
  readonly search: string;
  readonly page: number;
  readonly pageSize: number;
  readonly sort: DocsSortKey;
  readonly dir: DocsSortDirection;
}

const MAX_SEARCH_LENGTH = 120;

export const normalizeDocsSearch = (raw: string | undefined): string => {
  if (raw === undefined) {
    return "";
  }
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return "";
  }
  return trimmed.length > MAX_SEARCH_LENGTH ? trimmed.slice(0, MAX_SEARCH_LENGTH) : trimmed;
};

const parseSortDirection = (raw: string | undefined): DocsSortDirection =>
  raw === "asc" ? "asc" : DEFAULT_DOCS_SORT_DIR;

const parseSortKey = (raw: string | undefined): DocsSortKey =>
  raw === "title" ? "title" : DEFAULT_DOCS_SORT;

const parsePositiveInt = (raw: string | undefined, fallback: number): number => {
  if (raw === undefined || raw.length === 0) {
    return fallback;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }
  return parsed;
};

export const docsListOffset = (query: DocsListQuery): number => (query.page - 1) * query.pageSize;

export const docsListTotalPages = (total: number, pageSize: number): number =>
  Math.max(1, Math.ceil(total / pageSize));

export const docsListPageClamped = (query: DocsListQuery, total: number): number => {
  const totalPages = docsListTotalPages(total, query.pageSize);
  return Math.min(Math.max(1, query.page), totalPages);
};

const appendDocsQueryParams = (params: URLSearchParams, query: DocsListQuery): void => {
  if (query.search.length > 0) {
    params.set("q", query.search);
  }
  if (query.page > 1) {
    params.set("page", String(query.page));
  }
  if (query.pageSize !== DOCS_PAGE_SIZE) {
    params.set("pageSize", String(query.pageSize));
  }
  if (query.sort !== DEFAULT_DOCS_SORT) {
    params.set("sort", query.sort);
  }
  if (query.dir !== DEFAULT_DOCS_SORT_DIR) {
    params.set("dir", query.dir);
  }
};

export const parseDocsListQuery = (input: {
  readonly q?: string | string[];
  readonly page?: string | string[];
  readonly pageSize?: string | string[];
  readonly offset?: string | string[];
  readonly limit?: string | string[];
  readonly sort?: string | string[];
  readonly dir?: string | string[];
}): DocsListQuery => {
  const qRaw = Array.isArray(input.q) ? input.q[0] : input.q;
  const pageRaw = Array.isArray(input.page) ? input.page[0] : input.page;
  const pageSizeRaw = Array.isArray(input.pageSize) ? input.pageSize[0] : input.pageSize;
  const offsetRaw = Array.isArray(input.offset) ? input.offset[0] : input.offset;
  const limitRaw = Array.isArray(input.limit) ? input.limit[0] : input.limit;
  const sortRaw = Array.isArray(input.sort) ? input.sort[0] : input.sort;
  const dirRaw = Array.isArray(input.dir) ? input.dir[0] : input.dir;
  const pageSizeCandidate = parsePositiveInt(pageSizeRaw, DOCS_PAGE_SIZE);
  const pageSize = Math.min(pageSizeCandidate, 50);
  const pageFromParam = parsePositiveInt(pageRaw, 0);
  const offsetParsed = Number(offsetRaw);
  const limitParsed = Number(limitRaw);
  const pageFromOffset =
    Number.isInteger(offsetParsed) && offsetParsed >= 0 && pageFromParam === 0
      ? Math.floor(offsetParsed / pageSize) + 1
      : 0;
  const page = pageFromParam > 0 ? pageFromParam : pageFromOffset > 0 ? pageFromOffset : 1;
  const limit =
    Number.isInteger(limitParsed) && limitParsed > 0 ? Math.min(limitParsed, 50) : pageSize;
  return {
    search: normalizeDocsSearch(qRaw),
    page,
    pageSize: limit,
    sort: parseSortKey(sortRaw),
    dir: parseSortDirection(dirRaw),
  };
};

export const docsListHref = (query: DocsListQuery): string => {
  const params = new URLSearchParams();
  appendDocsQueryParams(params, query);
  const suffix = params.size > 0 ? `?${params.toString()}` : "";
  return `${routePaths.docList}${suffix}`;
};

export const docsListQueryWithSort = (
  query: DocsListQuery,
  sort: DocsSortKey,
  dir: DocsSortDirection,
): DocsListQuery => ({
  ...query,
  sort,
  dir,
  page: 1,
});

export const docsListQueryWithPage = (query: DocsListQuery, page: number): DocsListQuery => ({
  ...query,
  page: Math.max(1, page),
});
