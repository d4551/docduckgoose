/**
 * Pagination query parameter parsing utilities.
 *
 * Centralizes URL-param-to-page-number normalization with safe defaults,
 * clamping, and search-term length caps. Sized for typical list APIs;
 * stricter bounds live in `@baohaus/bao-constants/pagination`.
 *
 * No throw, no try/catch, no type assertions — invalid input returns the
 * documented default rather than raising.
 *
 * @packageDocumentation
 */

const DEFAULT_PAGE = 1;

const MAX_PAGE_SIZE = 500;

const SEARCH_QUERY_MAX_LENGTH = 128;

/**
 * Parse a 1-based page number from URL search params.
 *
 * Treats missing, non-numeric, or sub-1 values as {@link DEFAULT_PAGE}.
 *
 * @param params - URLSearchParams instance to read.
 * @param key - Parameter name (e.g. `page`).
 * @returns Page number ≥ 1.
 */
export function parsePageParam(params: URLSearchParams, key: string): number {
  const raw = params.get(key);
  if (raw === null) {
    return DEFAULT_PAGE;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < DEFAULT_PAGE) {
    return DEFAULT_PAGE;
  }
  return parsed;
}

/**
 * Parse a page-size value from URL search params.
 *
 * Clamps to `[1, MAX_PAGE_SIZE]` and falls back to `defaultSize` for missing
 * or invalid input.
 *
 * @param params - URLSearchParams instance to read.
 * @param key - Parameter name (e.g. `pageSize`).
 * @param defaultSize - Page size to apply when input is missing or invalid.
 * @returns Page size in `[1, MAX_PAGE_SIZE]`.
 */
export function parsePageSizeParam(
  params: URLSearchParams,
  key: string,
  defaultSize: number,
): number {
  const raw = params.get(key);
  if (raw === null) {
    return clampPageSize(defaultSize);
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < DEFAULT_PAGE) {
    return clampPageSize(defaultSize);
  }
  return clampPageSize(parsed);
}

/**
 * Clamp a candidate page number to `[1, totalPages]`.
 *
 * If `totalPages < 1`, returns {@link DEFAULT_PAGE}.
 *
 * @param page - Candidate page number.
 * @param totalPages - Total number of pages available.
 * @returns Clamped page number.
 */
export function clampPageToTotal(page: number, totalPages: number): number {
  if (totalPages < DEFAULT_PAGE) {
    return DEFAULT_PAGE;
  }
  return Math.min(Math.max(DEFAULT_PAGE, page), totalPages);
}

/**
 * Compute total pages from an item count and page size.
 *
 * Clamps `pageSize` to `[1, MAX_PAGE_SIZE]` before division. Returns
 * {@link DEFAULT_PAGE} when there are zero items.
 *
 * @param totalItems - Count of items being paginated.
 * @param pageSize - Items per page.
 * @returns Total page count ≥ 1.
 */
export function totalPagesFromCount(totalItems: number, pageSize: number): number {
  const size = clampPageSize(pageSize);
  return Math.max(DEFAULT_PAGE, Math.ceil(totalItems / size));
}

/**
 * Parse a search query string from URL search params.
 *
 * Trims whitespace, returns `undefined` for blank input, and truncates to
 * {@link SEARCH_QUERY_MAX_LENGTH} characters.
 *
 * @param params - URLSearchParams instance to read.
 * @param key - Parameter name (e.g. `q`).
 * @returns Normalized query string or undefined when blank.
 */
export function parseSearchQuery(params: URLSearchParams, key: string): string | undefined {
  const raw = params.get(key)?.trim();
  if (raw === undefined || raw.length === 0) {
    return undefined;
  }
  if (raw.length <= SEARCH_QUERY_MAX_LENGTH) {
    return raw;
  }
  return raw.slice(0, SEARCH_QUERY_MAX_LENGTH);
}

function clampPageSize(size: number): number {
  if (!Number.isFinite(size) || size < DEFAULT_PAGE) {
    return DEFAULT_PAGE;
  }
  return Math.min(size, MAX_PAGE_SIZE);
}

export { DEFAULT_PAGE, MAX_PAGE_SIZE, SEARCH_QUERY_MAX_LENGTH };
