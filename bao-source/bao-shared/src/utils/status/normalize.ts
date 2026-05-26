/**
 * Status normalization and label formatting helpers.
 *
 * Pure string utilities used by every status category module.
 */

const WORD_BOUNDARY_RE: RegExp = /[-_\s]+/u;

/**
 * Normalize status input to a consistent lowercase identifier.
 *
 * @param value - Raw status input.
 * @returns Normalized status string (empty when invalid).
 */
export function normalizeStatus(value: unknown): string {
  const status = String(value ?? "")
    .toLowerCase()
    .trim();
  if (!status || status === "undefined" || status === "null") {
    return "";
  }
  return status;
}

/**
 * Format a normalized status string into a human-readable label.
 *
 * @param status - Status input.
 * @param [fallback='Unknown'] - Fallback label when input is invalid.
 * @returns Human-friendly status label.
 */
export function formatStatusLabel(status: unknown, fallback = "Unknown"): string {
  const normalized = normalizeStatus(status);
  if (!normalized) {
    return fallback;
  }
  return normalized
    .split(WORD_BOUNDARY_RE)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}
