import { DEFAULT_LOCALE, type SupportedLocale } from "./bcp47.js";
import type { CatalogBundle, MessageCatalog } from "./catalog.js";
import { type IcuParams, interpolate } from "./icu.js";

export type TranslateFn = (key: string, params?: IcuParams) => string;

export type FormatFn = Readonly<{
  number(value: number, options?: Intl.NumberFormatOptions): string;
  date(value: Date | number, options?: Intl.DateTimeFormatOptions): string;
  time(value: Date | number, options?: Intl.DateTimeFormatOptions): string;
  relative(value: Date | number, unit?: Intl.RelativeTimeFormatUnit): string;
}>;

export type Translator = Readonly<{
  locale: SupportedLocale;
  t: TranslateFn;
  format: FormatFn;
}>;

export type TranslatorOptions = Readonly<{
  locale: SupportedLocale;
  catalogs: CatalogBundle;
  fallbackLocale?: SupportedLocale;
}>;

const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

function resolveTemplate(key: string, primary: MessageCatalog, fallback: MessageCatalog): string {
  const primaryValue = primary[key];
  if (primaryValue !== undefined) {
    return primaryValue;
  }
  const fallbackValue = fallback[key];
  if (fallbackValue !== undefined) {
    return fallbackValue;
  }
  return key;
}

function buildFormat(locale: SupportedLocale): FormatFn {
  return {
    number(value, options) {
      return new Intl.NumberFormat(locale, options).format(value);
    },
    date(value, options) {
      return new Intl.DateTimeFormat(locale, options).format(value);
    },
    time(value, options) {
      const merged: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        ...(options ?? {}),
      };
      return new Intl.DateTimeFormat(locale, merged).format(value);
    },
    relative(value, unit) {
      const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
      const diffMs = new Date(value).getTime() - Date.now();
      if (unit !== undefined) {
        return formatter.format(diffMs / MS_PER_SECOND, unit);
      }
      const seconds = Math.round(diffMs / MS_PER_SECOND);
      if (Math.abs(seconds) < SECONDS_PER_MINUTE) {
        return formatter.format(seconds, "second");
      }
      const minutes = Math.round(seconds / SECONDS_PER_MINUTE);
      if (Math.abs(minutes) < MINUTES_PER_HOUR) {
        return formatter.format(minutes, "minute");
      }
      const hours = Math.round(minutes / MINUTES_PER_HOUR);
      if (Math.abs(hours) < HOURS_PER_DAY) {
        return formatter.format(hours, "hour");
      }
      const days = Math.round(hours / HOURS_PER_DAY);
      return formatter.format(days, "day");
    },
  };
}

export function createT(options: TranslatorOptions): Translator {
  const fallbackLocale = options.fallbackLocale ?? DEFAULT_LOCALE;
  const primary = options.catalogs[options.locale];
  const fallback = options.catalogs[fallbackLocale];
  const t: TranslateFn = (key, params) => {
    const template = resolveTemplate(key, primary, fallback);
    if (params === undefined) {
      return template;
    }
    return interpolate(template, params, options.locale);
  };
  return {
    locale: options.locale,
    t,
    format: buildFormat(options.locale),
  };
}
