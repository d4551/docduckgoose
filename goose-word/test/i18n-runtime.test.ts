import { describe, expect, test } from "bun:test";
import { resolveLocale, translate } from "../src/i18n/runtime.ts";

describe("resolveLocale", () => {
  test("resolves Japanese from Accept-Language", () => {
    expect(resolveLocale("ja-JP, en;q=0.8")).toBe("ja");
  });

  test("resolves Korean from Accept-Language", () => {
    expect(resolveLocale("ko-KR, en;q=0.8")).toBe("ko");
  });

  test("honors Accept-Language quality weights", () => {
    expect(resolveLocale("ja-JP;q=0.4, ko-KR;q=0.9")).toBe("ko");
  });

  test("falls back to English for unsupported languages", () => {
    expect(resolveLocale("fr-FR")).toBe("en");
  });
});

describe("translate", () => {
  test("returns Japanese messages", () => {
    expect(translate("ja", "docs.new")).toBe("新規ドキュメント");
  });

  test("returns Korean messages", () => {
    expect(translate("ko", "docs.new")).toBe("새 문서");
  });
});
