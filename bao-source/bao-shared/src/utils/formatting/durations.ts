/**
 * Duration formatting utilities.
 *
 * @shared/utils/formatting/durations
 */

import { toResultSync } from "@baohaus/bao-utils/async-result";
import { dayjs } from "@baohaus/dayjs-bao";
import { MS_PER_SECOND, SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from "../../constants/time";
import { logger } from "../../logger/browser.js";

const consoleWarn = (message: string, ...args: unknown[]): void => {
  logger.warn(`[formatting] ${message}`, ...args);
};

type DurationParts = {
  hours: number;
  minutes: number;
  seconds: number;
};

function isValidDurationSeconds(seconds: number | null | undefined): seconds is number {
  return typeof seconds === "number" && Number.isFinite(seconds) && seconds >= 0;
}

function resolveDurationParts(seconds: number): DurationParts {
  const durationValue = dayjs.duration(seconds, "seconds");
  return {
    hours: Math.floor(durationValue.asHours()),
    minutes: durationValue.minutes(),
    seconds: durationValue.seconds(),
  };
}

function formatShortDurationParts(parts: DurationParts): string {
  if (parts.hours > 0) {
    return `${parts.hours}h ${parts.minutes}m`;
  }
  if (parts.minutes > 0) {
    return `${parts.minutes}m ${parts.seconds}s`;
  }
  return `${parts.seconds}s`;
}

function formatDurationUnit(value: number, unit: string): string {
  return `${value} ${unit}${value === 1 ? "" : "s"}`;
}

function formatLongDurationParts(parts: DurationParts): string {
  const formattedParts: string[] = [];
  if (parts.hours > 0) {
    formattedParts.push(formatDurationUnit(parts.hours, "hour"));
  }
  if (parts.minutes > 0) {
    formattedParts.push(formatDurationUnit(parts.minutes, "minute"));
  }
  if (parts.seconds > 0 || formattedParts.length === 0) {
    formattedParts.push(formatDurationUnit(parts.seconds, "second"));
  }
  return formattedParts.join(", ");
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

export function formatDurationSeconds(seconds: number | null | undefined, short = false): string {
  if (!isValidDurationSeconds(seconds)) {
    return "\u2014";
  }
  const parts = resolveDurationParts(seconds);
  if (short) {
    return formatShortDurationParts(parts);
  }
  return formatLongDurationParts(parts);
}

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
