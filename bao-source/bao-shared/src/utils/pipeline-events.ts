/**
 * Pipeline event identifier helpers.
 *
 * Provides shared helpers for building and parsing pipeline event identifiers
 * used across server-side SSE emitters and client-side replay cursors.
 *
 * @packageDocumentation
 */

/**
 * Separator used to compose pipeline event identifiers.
 */
export const PIPELINE_EVENT_ID_SEPARATOR = ":";

/**
 * Build a pipeline event identifier from run ID and sequence number.
 *
 * @param runId - Pipeline run identifier.
 * @param sequence - Monotonic event sequence for the run.
 * @returns Composite event identifier string.
 */
export function buildPipelineEventId(runId: string, sequence: number): string {
  return `${runId}${PIPELINE_EVENT_ID_SEPARATOR}${sequence}`;
}

/**
 * Parse a pipeline event identifier into its components.
 *
 * @param value - Candidate event identifier.
 * @returns Parsed run ID and sequence or null when invalid.
 */
export function parsePipelineEventId(value: string): { runId: string; sequence: number } | null {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  const separatorIndex = trimmed.lastIndexOf(PIPELINE_EVENT_ID_SEPARATOR);
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
 * Resolve a numeric pipeline event sequence from a Last-Event-ID header.
 *
 * @param value - Raw Last-Event-ID header value.
 * @param runId - Optional run ID to validate.
 * @returns Sequence number or null when invalid.
 */
export function parsePipelineEventSequence(value: string, runId?: string): number | null {
  if (!value) {
    return null;
  }
  const parsed = parsePipelineEventId(value);
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
