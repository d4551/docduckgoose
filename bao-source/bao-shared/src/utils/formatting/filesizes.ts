/**
 * File size and storage formatting utilities.
 *
 * @shared/utils/formatting/filesizes
 */

const PERCENT_MULTIPLIER = 100;
const BYTES_PER_KB = 1024;
const BYTES_PER_MB = 1048576;
const GB_THRESHOLD = 1000;

const TRAILING_ZEROS_RE: RegExp = /(?:\.0+|(\.\d+?)0+)$/;

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

export function formatFileSize(bytes: number, decimals = 2): string {
  return wontonFormatBytes(bytes, decimals);
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
