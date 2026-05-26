import { describe, expect, test } from "bun:test";
import { detectLocale } from "./detect.js";

function buildRequest(init: { url?: string; headers?: Record<string, string> } = {}): Request {
  return new Request(init.url ?? "https://example.com/", { headers: init.headers });
}

describe("detectLocale", () => {
  test("prefers query parameter when supported", () => {
    const request = buildRequest({ url: "https://example.com/?locale=fr-FR" });
    expect(detectLocale(request)).toBe("fr-FR");
  });

  test("falls back to cookie when query is absent", () => {
    const request = buildRequest({ headers: { cookie: "locale=ja-JP; session=abc" } });
    expect(detectLocale(request)).toBe("ja-JP");
  });

  test("falls back to Accept-Language when cookie is absent", () => {
    const request = buildRequest({
      headers: { "accept-language": "zh-CN,en-US;q=0.8" },
    });
    expect(detectLocale(request)).toBe("zh-CN");
  });

  test("matches language family on Accept-Language", () => {
    const request = buildRequest({
      headers: { "accept-language": "en-AU" },
    });
    expect(detectLocale(request, { supported: ["en-GB", "de-DE"] })).toBe("en-GB");
  });

  test("returns default locale when nothing matches", () => {
    const request = buildRequest();
    expect(detectLocale(request)).toBe("en-GB");
  });
});
