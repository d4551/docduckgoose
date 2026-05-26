export const SUPPORTED_LOCALES = [
  "en-GB",
  "en-US",
  "fr-FR",
  "de-DE",
  "es-ES",
  "it-IT",
  "ja-JP",
  "zh-CN",
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export type Locale = SupportedLocale | (string & {});

export const DEFAULT_LOCALE: SupportedLocale = "en-GB";

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function normalizeLocale(value: string): string {
  const parts = value.trim().split(/[-_]/u);
  const first = parts[0];
  if (first === undefined || first === "") {
    return "";
  }
  const language = first.toLowerCase();
  if (parts.length === 1) {
    return language;
  }
  const last = parts[parts.length - 1];
  if (last === undefined) {
    return language;
  }
  return `${language}-${last.toUpperCase()}`;
}
