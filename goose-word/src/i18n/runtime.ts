import { getUserPreferences } from "../services/user-prefs.ts";
import {
  DEFAULT_LOCALE,
  gooseWordCatalogs,
  type LocaleCode,
  isLocaleCode,
  translate,
} from "./strings.ts";

export type { LocaleCode };
export { DEFAULT_LOCALE, gooseWordCatalogs, isLocaleCode, translate };

const LANGUAGE_LOCALE_MAP: Readonly<Record<string, LocaleCode>> = {
  en: "en",
  zh: "zh-Hans",
  ja: "ja",
  ko: "ko",
};

function resolveLanguageTag(tag: string): LocaleCode | null {
  const language = tag.trim().split(/[-_]/u)[0]?.toLowerCase();
  if (language === undefined || language === "") {
    return null;
  }
  return LANGUAGE_LOCALE_MAP[language] ?? null;
}

export function resolveLocale(acceptLanguage: string | null): LocaleCode {
  if (acceptLanguage === null) {
    return DEFAULT_LOCALE;
  }
  const accepted = acceptLanguage
    .split(",")
    .map((entry, index) => {
      const [rawTag, ...params] = entry.trim().split(";");
      const q = params.map((param) => param.trim()).find((param) => param.startsWith("q="));
      const weight = q === undefined ? 1 : Number(q.slice(2));
      return {
        index,
        tag: rawTag ?? "",
        weight: Number.isFinite(weight) ? weight : 0,
      };
    })
    .filter((entry) => entry.tag !== "" && entry.weight > 0)
    .sort((left, right) => right.weight - left.weight || left.index - right.index);

  for (const entry of accepted) {
    const locale = resolveLanguageTag(entry.tag);
    if (locale !== null) {
      return locale;
    }
  }
  return DEFAULT_LOCALE;
}

export function resolveRequestLocale(_request: Request): LocaleCode {
  return getUserPreferences().locale;
}
