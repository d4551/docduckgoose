import { describe, expect, test } from "bun:test";
import { parseAcceptLanguage } from "./accept-language.js";

describe("parseAcceptLanguage", () => {
  test("returns empty array for null header", () => {
    expect(parseAcceptLanguage(null)).toEqual([]);
  });

  test("parses a single locale at default quality", () => {
    expect(parseAcceptLanguage("en-GB")).toEqual([{ locale: "en-GB", quality: 1 }]);
  });

  test("sorts by quality descending", () => {
    const result = parseAcceptLanguage("fr-FR;q=0.5, en-GB;q=0.9, de-DE");
    expect(result).toEqual([
      { locale: "de-DE", quality: 1 },
      { locale: "en-GB", quality: 0.9 },
      { locale: "fr-FR", quality: 0.5 },
    ]);
  });

  test("normalizes casing and separator", () => {
    expect(parseAcceptLanguage("en_gb")).toEqual([{ locale: "en-GB", quality: 1 }]);
  });

  test("rejects malformed quality tokens by falling back to default", () => {
    expect(parseAcceptLanguage("en-GB;q=oops")).toEqual([{ locale: "en-GB", quality: 1 }]);
  });
});
