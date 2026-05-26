import { describe, expect, test } from "bun:test";
import { safeDecodeUri } from "./safe-decode-uri";

describe("safeDecodeUri", () => {
  test("returns the input unchanged when no %xx escapes are present", () => {
    expect(safeDecodeUri("plain/path/file.txt")).toBe("plain/path/file.txt");
  });

  test("decodes a single-pass %xx escape", () => {
    expect(safeDecodeUri("hello%20world")).toBe("hello world");
  });

  test("decodes nested double-encoded sequences across multiple passes", () => {
    expect(safeDecodeUri("hello%2520world")).toBe("hello world");
  });

  test("returns null for malformed multi-byte UTF-8 escape sequences", () => {
    // %E0 alone is a leading byte of a 3-byte UTF-8 sequence; decodeURIComponent rejects.
    expect(safeDecodeUri("%E0%A4")).toBeNull();
  });

  test("pass-through inputs lacking a valid %XX pattern are returned unchanged", () => {
    // Strings with stray '%' but no two-hex-digits don't match the escape regex;
    // by design we return as-is rather than treat as malformed.
    expect(safeDecodeUri("100%discount")).toBe("100%discount");
    expect(safeDecodeUri("%ZZ")).toBe("%ZZ");
    expect(safeDecodeUri("incomplete%2")).toBe("incomplete%2");
  });

  test("decodes Unicode escapes correctly", () => {
    expect(safeDecodeUri("caf%C3%A9")).toBe("café");
  });
});
