import type { TranslationLeaf, TranslationMap } from "./i18n-types.js";
import { enDictionary } from "./locales/en.js";
import { koDictionary } from "./locales/ko.js";

const DICTIONARIES: Record<"en" | "ko", TranslationMap> = {
  en: enDictionary,
  ko: koDictionary,
};

function normalizeLocale(locale: string): "en" | "ko" {
  return locale.toLowerCase().startsWith("ko") ? "ko" : "en";
}

function isTranslationMap(value: unknown): value is TranslationMap {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isTranslationLeaf(value: unknown): value is TranslationLeaf {
  return typeof value === "string" || isTranslationMap(value);
}

function readRecordEntry(value: TranslationLeaf, key: string): TranslationLeaf | undefined {
  if (!isTranslationMap(value)) {
    return undefined;
  }

  const candidate: unknown = Reflect.get(value, key);
  return isTranslationLeaf(candidate) ? candidate : undefined;
}

function lookupTranslation(locale: string, key: string): string {
  const segments = key.split(".");
  let current: TranslationLeaf = DICTIONARIES[normalizeLocale(locale)];
  for (const segment of segments) {
    const next = readRecordEntry(current, segment);
    if (next === undefined) {
      return key;
    }

    current = next;
  }

  return typeof current === "string" ? current : key;
}

function interpolate(text: string, params: Record<string, string>): string {
  let result = text;
  for (const [key, value] of Object.entries(params)) {
    result = result.replaceAll(`{${key}}`, value);
  }

  return result;
}

export function translate(
  locale: string,
  key: string,
  params: Record<string, string> = {},
): string {
  return interpolate(lookupTranslation(locale, key), params);
}

export function resolveLocale(input: Headers | string | null | undefined): "en" | "ko" {
  if (typeof input === "string") {
    return normalizeLocale(input);
  }

  if (input instanceof Headers) {
    return normalizeLocale(input.get("accept-language") ?? "en");
  }

  return "en";
}
