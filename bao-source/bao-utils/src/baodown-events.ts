/**
 * BaoDown event identifier helpers.
 *
 * Provides shared helpers for building and parsing BaoDown event identifiers
 * used across server-side SSE emitters and client-side replay cursors.
 *
 * @packageDocumentation
 */

/**
 * Separator used to compose BaoDown event identifiers.
 */
export const BAODOWN_EVENT_ID_SEPARATOR = ":";

/**
 * Build a BaoDown event identifier from run ID and sequence number.
 *
 * @param runId - BaoDown run identifier.
 * @param sequence - Monotonic event sequence for the run.
 * @returns Composite event identifier string.
 */
export function buildBaoDownEventId(runId: string, sequence: number): string {
  return `${runId}${BAODOWN_EVENT_ID_SEPARATOR}${sequence}`;
}

/**
 * Parse a BaoDown event identifier into its components.
 *
 * @param value - Candidate event identifier.
 * @returns Parsed run ID and sequence or null when invalid.
 */
export function parseBaoDownEventId(value: string): { runId: string; sequence: number } | null {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  const separatorIndex = trimmed.lastIndexOf(BAODOWN_EVENT_ID_SEPARATOR);
  if (separatorIndex <= 0) {
    return null;
  }
  const runId = trimmed.slice(0, separatorIndex);
  const sequenceValue = trimmed.slice(separatorIndex + 1);
  if (!(runId && sequenceValue)) {
    return null;
  }
  const sequence = Number(sequenceValue);
  if (!Number.isFinite(sequence) || sequence < 0) {
    return null;
  }
  return { runId, sequence: Math.floor(sequence) };
}

/**
 * Resolve a numeric BaoDown event sequence from a Last-Event-ID header.
 *
 * @param value - Raw Last-Event-ID header value.
 * @param runId - Optional run ID to validate.
 * @returns Sequence number or null when invalid.
 */
export function parseBaoDownEventSequence(value: string, runId?: string): number | null {
  if (!value) {
    return null;
  }
  const parsed = parseBaoDownEventId(value);
  if (parsed) {
    if (runId && parsed.runId !== runId) {
      return null;
    }
    return parsed.sequence;
  }
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) {
    return null;
  }
  return Math.floor(numeric);
}
