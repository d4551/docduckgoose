/**
 * Unit tests for the runtime i18n surface.
 */

import { describe, expect, it } from "bun:test";
import {
  DEFAULT_LANGUAGE_LABEL_KEY,
  getLanguageOptions,
  hasTranslationKey,
  registerLocale,
  resolveSupportedLocale,
  runWithLocale,
  SUPPORTED_LOCALE_OPTIONS,
  t,
} from "./i18n";
import { en } from "./i18n/en";

const TEST_LOCALE = "en-bao-shared-test";

describe("translation lookup", () => {
  it("returns the English template when no params are supplied", () => {
    expect(t("app.name")).toBe(en["app.name"]);
  });

  it("interpolates {token} placeholders against supplied params", () => {
    registerLocale(TEST_LOCALE, {
      ...en,
      "layout.languageCurrent": "Visible language: {language}",
    });
    const rendered = runWithLocale(TEST_LOCALE, () =>
      t("layout.languageCurrent", { language: "German" }),
    );
    expect(rendered).toBe("Visible language: German");
  });

  it("falls back to the English value when the active locale lacks an entry", () => {
    registerLocale(TEST_LOCALE, {
      "layout.languageCurrent": "Scoped only",
    });
    const fallback = runWithLocale(TEST_LOCALE, () => t("app.name"));
    expect(fallback).toBe(en["app.name"]);
  });

  it("scopes runWithLocale to the callback only", () => {
    registerLocale(TEST_LOCALE, {
      ...en,
      "app.name": "Scoped App Name",
    });

    const scopedAppName = runWithLocale(TEST_LOCALE, () => t("app.name"));
    expect(scopedAppName).toBe("Scoped App Name");
    expect(t("app.name")).toBe(en["app.name"]);
  });
});

describe("locale option helpers", () => {
  it("recognises every shipped English key via hasTranslationKey", () => {
    expect(hasTranslationKey("app.name")).toBe(true);
    expect(hasTranslationKey("definitely-not-a-real-key")).toBe(false);
  });

  it("normalises BCP 47 variants down to a supported base locale", () => {
    expect(resolveSupportedLocale("en-GB")).toBe("en");
    expect(resolveSupportedLocale("DE-de")).toBe("de");
    expect(resolveSupportedLocale("zz")).toBe("en");
    expect(resolveSupportedLocale(null)).toBe("en");
  });

  it("returns the canonical supported language options", () => {
    const options = getLanguageOptions();
    expect(options).toBe(SUPPORTED_LOCALE_OPTIONS);
    expect(options.map((option) => option.code)).toEqual(["en", "de", "fr", "es", "it", "pt"]);
  });

  it("exposes a default language label key matching the first supported option", () => {
    expect(DEFAULT_LANGUAGE_LABEL_KEY).toBe(SUPPORTED_LOCALE_OPTIONS[0]?.labelKey ?? "");
  });
});
