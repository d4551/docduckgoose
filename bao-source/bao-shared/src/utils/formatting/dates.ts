/**
 * Dayjs date/time formatting utilities.
 *
 * @shared/utils/formatting/dates
 */

import { toResultSync } from "@baohaus/bao-utils/async-result";
import { dayjs } from "@baohaus/dayjs-bao";
import { logger } from "../../logger/browser.js";

const consoleWarn = (message: string, ...args: unknown[]): void => {
  logger.warn(`[formatting] ${message}`, ...args);
};

type DatePreset = "short" | "medium" | "long" | "full";
type DateHourFormat = "numeric" | "2-digit";
type IntlMonthFormat = Exclude<Intl.DateTimeFormatOptions["month"], undefined>;
type IntlDayFormat = Exclude<Intl.DateTimeFormatOptions["day"], undefined>;
type IntlYearFormat = Exclude<Intl.DateTimeFormatOptions["year"], undefined>;
type IntlHourClock = "h12" | "h24";

const DATE_PRESET_FORMATS: Record<DatePreset, string> = {
  short: "MM/DD/YY",
  medium: "MMM D, YYYY",
  long: "MMMM D, YYYY",
  full: "dddd, MMMM D, YYYY",
};

const MONTH_FORMATS: Record<IntlMonthFormat, string> = {
  numeric: "MM",
  "2-digit": "MM",
  short: "MMM",
  long: "MMMM",
  narrow: "MMMM",
};

const DAY_FORMATS: Record<IntlDayFormat, string> = {
  numeric: "D",
  "2-digit": "DD",
};

const YEAR_FORMATS: Record<IntlYearFormat, string> = {
  numeric: "YYYY",
  "2-digit": "YY",
};

const HOUR_FORMATS: Record<IntlHourClock, Record<DateHourFormat, string>> = {
  h12: { numeric: "h", "2-digit": "hh" },
  h24: { numeric: "H", "2-digit": "HH" },
};

const MINUTE_SECOND_FORMATS: Record<DateHourFormat, string> = {
  numeric: "m",
  "2-digit": "mm",
};

function resolvePresetFormat(format: string): string {
  const key = format as DatePreset;
  return DATE_PRESET_FORMATS[key] || format;
}

function resolveDateSegment(
  value: Intl.DateTimeFormatOptions["month"],
  unit: "month",
): string | undefined;
function resolveDateSegment(
  value: Intl.DateTimeFormatOptions["day"],
  unit: "day",
): string | undefined;
function resolveDateSegment(
  value: Intl.DateTimeFormatOptions["year"],
  unit: "year",
): string | undefined;
function resolveDateSegment(
  value: Intl.DateTimeFormatOptions["month" | "day" | "year"],
  unit: "month" | "day" | "year",
): string | undefined {
  if (!value) {
    return;
  }
  if (unit === "month") {
    return MONTH_FORMATS[value as IntlMonthFormat];
  }
  if (unit === "day") {
    return DAY_FORMATS[value as IntlDayFormat];
  }
  return YEAR_FORMATS[value as IntlYearFormat];
}

function resolveHourSegment(
  value: Intl.DateTimeFormatOptions["hour"] | undefined,
  hour12: boolean,
): string | undefined {
  if (!value) {
    return;
  }
  return (hour12 ? HOUR_FORMATS.h24 : HOUR_FORMATS.h12)[value];
}

function resolveIntlOptionsToDayjsFormat(options: Intl.DateTimeFormatOptions): string {
  const dateSegments = [
    resolveDateSegment(options.month, "month"),
    resolveDateSegment(options.day, "day"),
    resolveDateSegment(options.year, "year"),
  ].filter(Boolean) as string[];

  const is24Hour = options.hour12 === false;
  const timeSegments = [resolveHourSegment(options.hour, is24Hour)].filter(Boolean) as string[];
  if (options.minute) {
    timeSegments.push(
      options.minute === "2-digit"
        ? MINUTE_SECOND_FORMATS["2-digit"]
        : MINUTE_SECOND_FORMATS.numeric,
    );
  }
  if (options.second) {
    timeSegments.push(
      options.second === "2-digit"
        ? MINUTE_SECOND_FORMATS["2-digit"]
        : MINUTE_SECOND_FORMATS.numeric,
    );
  }

  let format = dateSegments.join(" ");
  if (timeSegments.length) {
    const time = timeSegments.join(":");
    format = format ? `${format} ${time}` : time;
    if (options.hour12 !== false && options.hour) {
      format += " A";
    }
  }

  return format || "MMM D, YYYY h:mm:ss A";
}

export function formatTimestamp(
  value: string | Date | number | null | undefined,
  format = "MMM D, YYYY h:mm A",
): string {
  if (!value) {
    return "N/A";
  }
  const result = toResultSync(() => {
    const formatted = dayjs(value).format(format);
    return formatted === "Invalid Date" ? "N/A" : formatted;
  });
  if (!result.ok) {
    consoleWarn("Failed to format timestamp:", result.error);
    return String(value);
  }
  return result.value;
}

export function formatDateTime(
  value: string | Date | number | null | undefined,
  format: string | Intl.DateTimeFormatOptions = "MMM D, YYYY h:mm:ss A",
  fallback = "Invalid Date",
): string {
  if (!value) {
    return fallback;
  }
  const result = toResultSync(() => {
    const date = dayjs(value);
    if (!date.isValid()) {
      return fallback;
    }
    if (typeof format === "string") {
      return date.format(resolvePresetFormat(format));
    }
    return date.format(resolveIntlOptionsToDayjsFormat(format));
  });
  if (!result.ok) {
    consoleWarn("Date formatting failed", { value, error: result.error });
    return fallback;
  }
  return result.value;
}

export function formatDate(
  value: string | Date | number | null | undefined,
  options: Intl.DateTimeFormatOptions | string = {},
  fallback = "N/A",
): string {
  if (!value) {
    return fallback;
  }
  const result = toResultSync(() => {
    const date = dayjs(value);
    if (!date.isValid()) {
      return fallback;
    }
    if (typeof options === "string") {
      return date.format(resolvePresetFormat(options));
    }
    return new Intl.DateTimeFormat(undefined, options).format(date.toDate());
  });
  if (!result.ok) {
    consoleWarn("Failed to format date:", result.error);
    return fallback;
  }
  return result.value;
}

export function formatNullableDate(
  value: string | Date | number | null | undefined,
  format: Intl.DateTimeFormatOptions | string = "medium",
  fallback = "\u2014",
): string {
  if (!value) {
    return fallback;
  }
  const formatted = formatDate(value, format, fallback);
  return formatted || fallback;
}

export function formatISO(value: string | Date | number | null | undefined, fallback = ""): string {
  if (!value) {
    return fallback;
  }
  const result = toResultSync(() => {
    const date = dayjs(value);
    return date.isValid() ? date.toISOString() : fallback;
  });
  if (!result.ok) {
    consoleWarn("Failed to format ISO date:", result.error);
    return fallback;
  }
  return result.value;
}
