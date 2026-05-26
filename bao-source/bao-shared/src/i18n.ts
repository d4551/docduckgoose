/**
 * Runtime i18n surface for bao-shared.
 *
 * Provides a typed `t()` lookup over the bundled English dictionary, locale
 * registration, and an AsyncLocalStorage-backed scope (`runWithLocale`) so
 * request handlers can resolve copy under a request-local locale without a
 * mutable global.
 *
 * `DEFAULT_FORMAT_LOCALE` is inlined to keep the module self-contained.
 */

import { AsyncLocalStorage } from "node:async_hooks";

import type { EnKey } from "./i18n/en";
import { en } from "./i18n/en";

/** Default BCP 47 format locale used when no scoped locale is set. */
const DEFAULT_FORMAT_LOCALE = "en-GB";

/** Translation key type derived from the English dictionary. */
export type TranslationKey = EnKey;

/** Translation interpolation parameter map. */
export type TranslationParams = Readonly<Record<string, string | number | boolean | Date>>;

/** Locale translation dictionary type. */
export type TranslationMap = Readonly<Record<TranslationKey, string>>;

/** Input locale dictionary type before English fallback hydration. */
export type TranslationMapInput = Readonly<Partial<Record<TranslationKey, string>>>;

/** Locale code type. */
export type LocaleCode = string;

/** Supported top-level UI locale. */
export type SupportedLocaleCode = "en" | "de" | "fr" | "es" | "it" | "pt";

/** Structured language switcher option. */
export type LanguageOption = Readonly<{
  code: SupportedLocaleCode;
  bcp47: string;
  labelKey: TranslationKey;
}>;

const localeRegistry = new Map<LocaleCode, TranslationMap>([["en", en]]);
const localeStorage = new AsyncLocalStorage<LocaleCode>();

const hydrateLocaleDictionary = (dictionary: TranslationMapInput): TranslationMap => ({
  ...en,
  ...dictionary,
});

/** Supported UI locales available to the application shell. */
export const SUPPORTED_LOCALE_OPTIONS: readonly LanguageOption[] = [
  { code: "en", bcp47: "en", labelKey: "locale.option.en" },
  { code: "de", bcp47: "de", labelKey: "locale.option.de" },
  { code: "fr", bcp47: "fr", labelKey: "locale.option.fr" },
  { code: "es", bcp47: "es", labelKey: "locale.option.es" },
  { code: "it", bcp47: "it", labelKey: "locale.option.it" },
  { code: "pt", bcp47: "pt", labelKey: "locale.option.pt" },
] as const;

/** Fallback label key when the current locale is not listed. */
export const DEFAULT_LANGUAGE_LABEL_KEY: TranslationKey =
  SUPPORTED_LOCALE_OPTIONS[0]?.labelKey ?? "locale.option.en";

const SUPPORTED_LOCALE_CODES = new Set<string>(
  SUPPORTED_LOCALE_OPTIONS.map((option) => option.code),
);

const isSupportedLocaleCode = (value: string): value is SupportedLocaleCode =>
  SUPPORTED_LOCALE_CODES.has(value);

/** Registers or replaces a locale dictionary. */
export const registerLocale = (code: LocaleCode, map: TranslationMapInput): void => {
  localeRegistry.set(code, hydrateLocaleDictionary(map));
};

/**
 * Resolves a locale candidate to a supported application locale.
 *
 * Accepts BCP 47 variants like `en-GB` and falls back to English.
 */
export const resolveSupportedLocale = (code: string | null | undefined): SupportedLocaleCode => {
  const normalized = code?.trim().toLowerCase();
  if (!normalized) {
    return "en";
  }

  const base = normalized.split("-")[0];
  return base && isSupportedLocaleCode(base) ? base : "en";
};

/** Returns the supported language options for locale switchers. */
export const getLanguageOptions = (): readonly LanguageOption[] => SUPPORTED_LOCALE_OPTIONS;

const resolveLocaleCode = (code: LocaleCode): LocaleCode =>
  localeRegistry.has(code) ? code : resolveSupportedLocale(code);

const DEFAULT_LOCALE_CODE = resolveSupportedLocale(DEFAULT_FORMAT_LOCALE);

/** Sets the locale for the current execution context with fallback to English. */
export const setLocale = (code: LocaleCode): void => {
  localeStorage.enterWith(resolveLocaleCode(code));
};

/** Returns the current execution locale code. */
export const getLocale = (): LocaleCode => localeStorage.getStore() ?? DEFAULT_LOCALE_CODE;

/** Returns whether a string is a registered English translation key. */
export const hasTranslationKey = (value: string): value is TranslationKey =>
  Object.hasOwn(en, value);

/**
 * Executes a callback inside a request-local locale context.
 *
 * @param code - Requested locale.
 * @param callback - Work executed under the locale context.
 * @returns Callback result.
 */
export const runWithLocale = <T>(code: LocaleCode, callback: () => T): T => {
  return localeStorage.run(resolveLocaleCode(code), callback);
};

/** Converts interpolation values to render-safe strings. */
const stringifyParam = (value: string | number | boolean | Date): string =>
  value instanceof Date ? value.toISOString() : String(value);

/** Interpolates token placeholders in translation templates. */
const interpolate = (template: string, params: TranslationParams): string => {
  let output = template;
  for (const [token, value] of Object.entries(params)) {
    output = output.replaceAll(`{${token}}`, stringifyParam(value));
  }
  return output;
};

/** Resolves a translation and applies interpolation. */
export const t = (key: TranslationKey, params?: TranslationParams): string => {
  const map = localeRegistry.get(getLocale()) ?? en;
  const template = map[key] ?? en[key] ?? key;

  if (params === undefined) {
    return template;
  }

  return interpolate(template, params);
};
