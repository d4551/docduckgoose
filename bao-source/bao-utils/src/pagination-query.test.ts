import { describe, expect, test } from "bun:test";
import {
  clampPageToTotal,
  DEFAULT_PAGE,
  MAX_PAGE_SIZE,
  parsePageParam,
  parsePageSizeParam,
  parseSearchQuery,
  SEARCH_QUERY_MAX_LENGTH,
  totalPagesFromCount,
} from "./pagination-query";

describe("constants", () => {
  test("DEFAULT_PAGE is 1", () => {
    expect(DEFAULT_PAGE).toBe(1);
  });
  test("MAX_PAGE_SIZE caps page size at 500", () => {
    expect(MAX_PAGE_SIZE).toBe(500);
  });
  test("SEARCH_QUERY_MAX_LENGTH caps search input at 128 chars", () => {
    expect(SEARCH_QUERY_MAX_LENGTH).toBe(128);
  });
});

describe("parsePageParam", () => {
  test("returns DEFAULT_PAGE when missing", () => {
    const params = new URLSearchParams();
    expect(parsePageParam(params, "page")).toBe(DEFAULT_PAGE);
  });
  test("returns DEFAULT_PAGE for non-numeric input", () => {
    const params = new URLSearchParams("page=abc");
    expect(parsePageParam(params, "page")).toBe(DEFAULT_PAGE);
  });
  test("returns DEFAULT_PAGE for sub-1 input", () => {
    const params = new URLSearchParams("page=0");
    expect(parsePageParam(params, "page")).toBe(DEFAULT_PAGE);
  });
  test("returns parsed page for valid input", () => {
    const params = new URLSearchParams("page=7");
    expect(parsePageParam(params, "page")).toBe(7);
  });
});

describe("parsePageSizeParam", () => {
  test("falls back to defaultSize when missing", () => {
    const params = new URLSearchParams();
    expect(parsePageSizeParam(params, "size", 20)).toBe(20);
  });
  test("clamps to MAX_PAGE_SIZE when input exceeds cap", () => {
    const params = new URLSearchParams(`size=${MAX_PAGE_SIZE + 100}`);
    expect(parsePageSizeParam(params, "size", 20)).toBe(MAX_PAGE_SIZE);
  });
  test("returns parsed size when within bounds", () => {
    const params = new URLSearchParams("size=50");
    expect(parsePageSizeParam(params, "size", 20)).toBe(50);
  });
});

describe("clampPageToTotal", () => {
  test("returns DEFAULT_PAGE when totalPages < 1", () => {
    expect(clampPageToTotal(5, 0)).toBe(DEFAULT_PAGE);
  });
  test("returns page when within [1, totalPages]", () => {
    expect(clampPageToTotal(3, 10)).toBe(3);
  });
  test("clamps to totalPages when page exceeds it", () => {
    expect(clampPageToTotal(99, 10)).toBe(10);
  });
});

describe("totalPagesFromCount", () => {
  test("returns 1 when totalItems is 0", () => {
    expect(totalPagesFromCount(0, 20)).toBe(1);
  });
  test("rounds up partial pages", () => {
    expect(totalPagesFromCount(21, 20)).toBe(2);
  });
  test("clamps pageSize to MAX_PAGE_SIZE", () => {
    expect(totalPagesFromCount(1000, MAX_PAGE_SIZE + 10_000)).toBe(2);
  });
});

describe("parseSearchQuery", () => {
  test("returns undefined for missing param", () => {
    const params = new URLSearchParams();
    expect(parseSearchQuery(params, "q")).toBeUndefined();
  });
  test("returns undefined for whitespace-only input", () => {
    const params = new URLSearchParams("q=%20%20");
    expect(parseSearchQuery(params, "q")).toBeUndefined();
  });
  test("trims and returns short input verbatim", () => {
    const params = new URLSearchParams("q=%20alpha%20");
    expect(parseSearchQuery(params, "q")).toBe("alpha");
  });
  test("truncates overlong input to SEARCH_QUERY_MAX_LENGTH", () => {
    const long = "x".repeat(SEARCH_QUERY_MAX_LENGTH + 50);
    const params = new URLSearchParams(`q=${long}`);
    const result = parseSearchQuery(params, "q");
    expect(result?.length).toBe(SEARCH_QUERY_MAX_LENGTH);
  });
});
