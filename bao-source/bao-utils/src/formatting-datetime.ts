/**
 * Date/time formatting helpers.
 * Extracted from formatting.ts to keep module size under 400 lines.
 *
 * @baohaus/bao-utils/formatting-datetime
 */

import { MS_PER_SECOND, SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "@baohaus/bao-constants/time";
import { dayjs } from "@baohaus/dayjs-bao";
import { toResultSync } from "./async-result";
import { formatShortRelative } from "./formatting-relative";
import { logger } from "./logger-browser";

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
const DAY_FORMATS: Record<IntlDayFormat, string> = { numeric: "D", "2-digit": "DD" };
const YEAR_FORMATS: Record<IntlYearFormat, string> = { numeric: "YYYY", "2-digit": "YY" };
const HOUR_FORMATS: Record<IntlHourClock, Record<DateHourFormat, string>> = {
  h12: { numeric: "h", "2-digit": "hh" },
  h24: { numeric: "H", "2-digit": "HH" },
};
const MINUTE_SECOND_FORMATS: Record<DateHourFormat, string> = { numeric: "m", "2-digit": "mm" };

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
    const dayjsFormat = resolveIntlOptionsToDayjsFormat(format);
    return date.format(dayjsFormat);
  });
  if (!result.ok) {
    consoleWarn("Date formatting failed", { value, error: result.error });
    return fallback;
  }
  return result.value;
}

export function formatRelative(value: string | Date | number | null | undefined): string {
  if (!value) {
    return "now";
  }
  const result = toResultSync(() => dayjs(value).fromNow());
  if (!result.ok) {
    consoleWarn("Failed to format relative time:", result.error);
    return String(value);
  }
  return result.value;
}

export function formatDuration(ms: number | null | undefined): string {
  if (ms == null || ms < 0) {
    return "N/A";
  }
  const result = toResultSync(() => dayjs.duration(ms).humanize());
  if (!result.ok) {
    consoleWarn("Failed to format duration:", result.error);
    return `${Math.floor(ms / MS_PER_SECOND)}s`;
  }
  return result.value;
}

function formatDurationSecondsShort(hours: number, minutes: number, secs: number): string {
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}

function formatDurationSecondsVerbose(hours: number, minutes: number, secs: number): string {
  const parts: string[] = [];
  if (hours > 0) {
    parts.push(`${hours} hour${hours === 1 ? "" : "s"}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);
  }
  if (secs > 0 || parts.length === 0) {
    parts.push(`${secs} second${secs === 1 ? "" : "s"}`);
  }
  return parts.join(", ");
}

export function formatDurationSeconds(seconds: number | null | undefined, short = false): string {
  if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds < 0) {
    return "—";
  }
  const d = dayjs.duration(seconds, "seconds");
  const hours = Math.floor(d.asHours());
  const minutes = d.minutes();
  const secs = d.seconds();
  return short
    ? formatDurationSecondsShort(hours, minutes, secs)
    : formatDurationSecondsVerbose(hours, minutes, secs);
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
  fallback = "—",
): string {
  if (!value) {
    return fallback;
  }
  const formatted = formatDate(value, format, fallback);
  return formatted || fallback;
}

export interface RelativeTimeFormatOptions {
  short?: boolean;
  withSuffix?: boolean;
  fallback?: string;
}

export function formatRelativeTime(
  value: string | Date | number | null | undefined,
  options: RelativeTimeFormatOptions | string = {},
): string {
  const {
    short = false,
    withSuffix = true,
    fallback = "N/A",
  } = typeof options === "string" ? { fallback: options } : options || {};

  if (!value) {
    return fallback;
  }
  const result = toResultSync(() => {
    const target = dayjs(value);
    if (!target.isValid()) {
      return fallback;
    }
    if (!short) {
      return withSuffix ? target.fromNow() : target.fromNow(true);
    }
    const now = dayjs();
    const diffSeconds = now.diff(target, "second");
    const futureDirection = diffSeconds < 0;
    return formatShortRelative(diffSeconds, withSuffix, futureDirection);
  });
  if (!result.ok) {
    consoleWarn("Failed to format relative time with options:", result.error);
    return fallback;
  }
  return result.value;
}

export function formatSince(
  value: string | Date | number | null | undefined,
  fallback = "N/A",
): string {
  return formatRelativeTime(value, { short: true, withSuffix: true, fallback });
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

export function formatISOToLocale(
  value: string | Date | number | null | undefined,
  locale?: string,
): string {
  if (!value) {
    return "";
  }
  const result = toResultSync(() => {
    const date = dayjs(value);
    if (!date.isValid()) {
      return String(value);
    }
    return date.toDate().toLocaleString(locale);
  });
  if (!result.ok) {
    consoleWarn("Failed to format ISO to locale:", result.error);
    return String(value);
  }
  return result.value;
}

export function formatLocaleDate(
  value: string | Date | number | null | undefined,
  locale: string,
  options: Intl.DateTimeFormatOptions = {},
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
    return new Intl.DateTimeFormat(locale, options).format(date.toDate());
  });
  if (!result.ok) {
    consoleWarn("Failed to format locale date:", result.error);
    return fallback;
  }
  return result.value;
}

export function formatShortDate(
  value: string | Date | number | null | undefined,
  includeYear = false,
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
    const now = dayjs();
    const sameYear = date.format("YYYY") === now.format("YYYY");
    const format = includeYear || !sameYear ? "MMM D, YYYY" : "MMM D";
    return date.format(format);
  });
  if (!result.ok) {
    consoleWarn("Failed to format short date:", result.error);
    return fallback;
  }
  return result.value;
}

export function formatTime(
  value: string | Date | number | null | undefined,
  includeSeconds = false,
  fallback = "N/A",
): string {
  if (!value) {
    return fallback;
  }
  const result = toResultSync(() => {
    const format = includeSeconds ? "h:mm:ss A" : "h:mm A";
    return dayjs(value).format(format);
  });
  if (!result.ok) {
    consoleWarn("Failed to format time:", result.error);
    return fallback;
  }
  return result.value;
}

// Date comparison functions re-exported from formatting-datecheck.ts
export {
  daysBetween,
  getDaysDifference,
  getTimezoneOffset,
  isFuture,
  isPast,
  isToday,
  isWithinDays,
  isYesterday,
  parseDate,
} from "./formatting-datecheck";

export function formatUptime(value: string | number | null | undefined, fallback = "n/a"): string {
  if (value == null || value === "") {
    return fallback;
  }
  const seconds = typeof value === "string" ? Number.parseFloat(value) : value;
  if (!Number.isFinite(seconds) || seconds < 0) {
    return fallback;
  }
  const hours = Math.floor(seconds / SECONDS_PER_HOUR);
  const minutes = Math.floor((seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  return `${hours}h ${minutes}m`;
}

export function formatDurationMs(ms: number | null | undefined, fallback = "n/a"): string {
  if (ms == null || !Number.isFinite(ms) || ms < 0) {
    return fallback;
  }
  if (ms < MS_PER_SECOND) {
    return `${Math.round(ms)}ms`;
  }
  return `${(ms / MS_PER_SECOND).toFixed(1)}s`;
}
