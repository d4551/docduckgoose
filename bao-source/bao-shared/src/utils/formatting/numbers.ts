/**
 * Number and currency formatting utilities.
 *
 * @shared/utils/formatting/numbers
 */

import { toResultSync } from "@baohaus/bao-utils/async-result";
import { logger } from "../../logger/browser.js";

const PERCENT_MULTIPLIER = 100;

const consoleWarn = (message: string, ...args: unknown[]): void => {
  logger.warn(`[formatting] ${message}`, ...args);
};

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

export function formatCurrency(amount: number | null | undefined, currency = "USD"): string {
  if (amount == null) {
    return "N/A";
  }
  const result = toResultSync(() =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount),
  );
  if (!result.ok) {
    consoleWarn("Failed to format currency:", result.error);
    return String(amount);
  }
  return result.value;
}

export function formatStoreName(name: string): string {
  return shumaiStartCase(name);
}
