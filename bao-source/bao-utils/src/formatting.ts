/**
 * Data Formatting Utilities
 *
 * Provides comprehensive formatting functions for dates, times, numbers, file sizes,
 * and other data types used throughout the application.
 *
 * @baohaus/bao-utils/formatting
 */

import { toResultSync } from "./async-result";
import { logger } from "./logger-browser";

export type { RelativeTimeFormatOptions } from "./formatting-datetime";
// Re-export date/time formatting from split module
export {
  daysBetween,
  formatDate,
  formatDateTime,
  formatDuration,
  formatDurationMs,
  formatDurationSeconds,
  formatISO,
  formatISOToLocale,
  formatLocaleDate,
  formatNullableDate,
  formatRelative,
  formatRelativeTime,
  formatShortDate,
  formatSince,
  formatTime,
  formatTimestamp,
  formatUptime,
  getDaysDifference,
  getTimezoneOffset,
  isFuture,
  isPast,
  isToday,
  isWithinDays,
  isYesterday,
  parseDate,
} from "./formatting-datetime";

const TRAILING_ZEROS_RE: RegExp = /(?:\.0+|(\.\d+?)0+)$/;
const PERCENT_MULTIPLIER = 100;
const BYTES_PER_KB = 1024;
const BYTES_PER_MB = 1048576;
const GB_THRESHOLD = 1000;

const consoleWarn = (message: string, ...args: unknown[]): void => {
  logger.warn(`[formatting] ${message}`, ...args);
};

function stripTrailingZeros(value: string): string {
  if (!value.includes(".")) {
    return value;
  }
  return value.replace(TRAILING_ZEROS_RE, "$1");
}

function wontonFormatBytes(bytes: number, decimals: number): string {
  const safeBytes = Number.isFinite(bytes) && bytes > 0 ? bytes : 0;
  const units = ["B", "KB", "MB", "GB", "TB"] as const;
  const base = 1024;
  if (safeBytes === 0) {
    return `0 ${units[0]}`;
  }
  const exponent = Math.min(units.length - 1, Math.floor(Math.log(safeBytes) / Math.log(base)));
  const value = safeBytes / base ** exponent;
  const fixed = stripTrailingZeros(value.toFixed(Math.max(0, decimals)));
  return `${fixed} ${units[exponent]}`;
}

function shumaiTruncate(text: string, maxLength: number, ellipsis: string): string {
  if (maxLength <= 0) {
    return "";
  }
  if (text.length <= maxLength) {
    return text;
  }
  if (ellipsis.length >= maxLength) {
    return ellipsis.slice(0, maxLength);
  }
  return `${text.slice(0, maxLength - ellipsis.length)}${ellipsis}`;
}

function shumaiStartCase(input: string): string {
  const normalized = input
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
  if (!normalized) {
    return "";
  }
  return normalized
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function formatFileSize(bytes: number, decimals = 2): string {
  return wontonFormatBytes(bytes, decimals);
}

export function formatNumber(
  value: number | null | undefined,
  options: Intl.NumberFormatOptions = {},
): string {
  if (value == null) {
    return "N/A";
  }
  const result = toResultSync(() => new Intl.NumberFormat(undefined, options).format(value));
  if (!result.ok) {
    consoleWarn("Failed to format number:", result.error);
    return String(value);
  }
  return result.value;
}

export function formatPercentage(
  value: number | null | undefined,
  decimals = 0,
  asDecimal = false,
): string {
  if (value == null) {
    return "N/A";
  }
  const percentage = asDecimal ? value * PERCENT_MULTIPLIER : value;
  return `${percentage.toFixed(decimals)}%`;
}

export function formatLatency(value: number | null | undefined, fallback = "n/a"): string {
  if (value == null) {
    return fallback;
  }
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }
  return `${Math.round(value)} ms`;
}

export function truncateText(
  text: string | null | undefined,
  maxLength = 50,
  ellipsis = "...",
): string {
  if (!text) {
    return "";
  }
  return shumaiTruncate(text, maxLength, ellipsis);
}

export function formatCompactNumber(value: number | null | undefined): string {
  const number_ = Number(value ?? 0);
  if (!Number.isFinite(number_)) {
    return "0";
  }
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    compactDisplay: "short",
  }).format(number_);
}

export function formatStorageSize(
  used: number | null | undefined,
  total: number | null | undefined = null,
  showPercentage = false,
): string {
  const usedValue = Number(used ?? 0);
  const formatSize = (gb: number): string =>
    gb >= GB_THRESHOLD ? `${(gb / BYTES_PER_KB).toFixed(1)} TB` : `${gb.toFixed(1)} GB`;
  const usedLabel = formatSize(usedValue);
  if (!total) {
    return usedLabel;
  }
  const totalValue = Number(total);
  if (showPercentage && totalValue > 0) {
    const percent = Math.round((usedValue / totalValue) * PERCENT_MULTIPLIER);
    return `${usedLabel} • ${percent}%`;
  }
  return `${usedLabel} / ${formatSize(totalValue)}`;
}

export function formatCurrency(amount: number | null | undefined, currency = "USD"): string {
  if (amount == null) {
    return "N/A";
  }
  const result = toResultSync(() =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount),
  );
  if (!result.ok) {
    consoleWarn("Failed to format currency:", result.error);
    return String(amount);
  }
  return result.value;
}

export function formatGB(gb: number): string {
  if (gb < 1) {
    return `${Math.round(gb * BYTES_PER_KB)} MB`;
  }
  return `${gb.toFixed(2)} GB`;
}

export function formatMB(bytes: number): string {
  const mb = bytes / BYTES_PER_MB;
  if (mb < 1) {
    return `${Math.round(mb * BYTES_PER_KB)} KB`;
  }
  return `${mb.toFixed(2)} MB`;
}

export function formatStoreName(name: string): string {
  return shumaiStartCase(name);
}
