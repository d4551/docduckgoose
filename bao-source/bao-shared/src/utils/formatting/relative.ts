/**
 * Relative time and locale-aware date formatting utilities.
 *
 * @shared/utils/formatting/relative
 */

import { toResultSync } from "@baohaus/bao-utils/async-result";
import { dayjs } from "@baohaus/dayjs-bao";
import { SECONDS_PER_DAY } from "../../constants/time";
import { logger } from "../../logger/browser.js";

const SECONDS_PER_WEEK = 604800;
const DAYS_PER_MONTH_APPROX = 30;
const DAYS_PER_WEEK = 7;
const DAYS_PER_YEAR_APPROX = 365;

const consoleWarn = (message: string, ...args: unknown[]): void => {
  logger.warn(`[formatting] ${message}`, ...args);
};

const RELATIVE_SHORT_UNITS: readonly {
  readonly maxUnits: number;
  readonly unit: string;
  readonly value: (seconds: number) => number;
}[] = [
  { maxUnits: 1, unit: "s", value: (seconds: number) => seconds },
  { maxUnits: 60, unit: "m", value: (seconds: number) => Math.floor(seconds / 60) },
  {
    maxUnits: 24,
    unit: "h",
    value: (seconds: number) => Math.floor(Math.floor(seconds / 60) / 60),
  },
  {
    maxUnits: 7,
    unit: "d",
    value: (seconds: number) => Math.floor(Math.floor(Math.floor(seconds / 60) / 60) / 24),
  },
  {
    maxUnits: 4,
    unit: "w",
    value: (seconds: number): number => Math.floor(seconds / SECONDS_PER_WEEK),
  },
  {
    maxUnits: 12,
    unit: "mo",
    value: (seconds: number): number =>
      Math.floor(seconds / (SECONDS_PER_DAY * DAYS_PER_MONTH_APPROX)),
  },
] as const;

function formatShortRelative(
  diffSeconds: number,
  withSuffix: boolean,
  futureDirection: boolean,
): string {
  const absSeconds = Math.abs(diffSeconds);
  if (absSeconds < 60) {
    return "now";
  }
  const absMinutes = Math.floor(absSeconds / 60);
  const absHours = Math.floor(absMinutes / 60);
  const absDays = Math.floor(absHours / 24);
  const absWeeks = Math.floor(absDays / DAYS_PER_WEEK);
  const absMonths = Math.floor(absDays / DAYS_PER_MONTH_APPROX);
  const absYears = Math.floor(absDays / DAYS_PER_YEAR_APPROX);

  const values = [absSeconds, absMinutes, absHours, absDays, absWeeks, absMonths, absYears];
  const suffix = withSuffix ? (futureDirection ? " from now" : " ago") : "";
  const shortUnit = RELATIVE_SHORT_UNITS.find((entry, index) => {
    const nextValue = values[index + 1];
    if (nextValue === undefined) {
      return false;
    }
    return nextValue < entry.maxUnits;
  });

  if (!shortUnit) {
    return `${absYears}y${suffix}`;
  }
  const unitIndex = RELATIVE_SHORT_UNITS.indexOf(shortUnit);
  if (unitIndex < 0) {
    return `${absYears}y${suffix}`;
  }
  if (unitIndex >= values.length) {
    return `${absYears}y${suffix}`;
  }
  const unitValue = values[unitIndex];
  if (unitValue === undefined) {
    return `${absYears}y${suffix}`;
  }
  return `${shortUnit.value(unitValue)}${shortUnit.unit}${suffix}`;
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
    const sameYear = date.year === now.year;
    return date.format(includeYear || !sameYear ? "MMM D, YYYY" : "MMM D");
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
