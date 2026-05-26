import { afterEach, describe, expect, test } from "bun:test";
import { unlinkSync } from "node:fs";
import { join } from "node:path";
import { resolveLocale, resolveRequestLocale, translate } from "../src/i18n/runtime.ts";
import {
  closeUserPrefsStore,
  patchUserPreferences,
  resetUserPrefsStoreForTests,
} from "../src/services/user-prefs.ts";

const tempDb = (): string => join(import.meta.dir, `.prefs-i18n-${crypto.randomUUID()}.sqlite`);

afterEach(() => {
  closeUserPrefsStore();
});

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

describe("resolveRequestLocale", () => {
  test("prefers stored locale over Accept-Language", () => {
    const dbPath = tempDb();
    resetUserPrefsStoreForTests(dbPath);
    patchUserPreferences({ locale: "ja" });
    const request = new Request("http://127.0.0.1/", {
      headers: { "accept-language": "en-US,en;q=0.9" },
    });
    expect(resolveRequestLocale(request)).toBe("ja");
    closeUserPrefsStore();
    unlinkSync(dbPath);
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
