/**
 * Normalize unknown API error payloads for UI hydration.
 *
 * @shared/types/api/normalize.ts
 */

import {
  buildNormalizedApiError,
  extractProblemDetailsMeta,
  extractRateLimitInfoFromRecordValue,
  getRecordDetails,
  getRecordErrorMessage,
  getRecordFiniteNumber,
  getRecordString,
  isRecord,
  type ProblemDetailsMeta,
} from "./internal.ts";
import type { NormalizedApiError } from "./types.ts";

/**
 * Normalize API envelope failures (`{ ok: false, ... }`) into UI metadata.
 *
 * @param record - Candidate record.
 * @returns Normalized API error or null.
 */
function normalizeEnvelopeApiError(record: Record<string, unknown>): NormalizedApiError | null {
  if (record.ok !== false) {
    return null;
  }

  const details = getRecordDetails(record);
  return buildNormalizedApiError({
    code: getRecordString(record, "code"),
    message: getRecordErrorMessage(record),
    status: getRecordFiniteNumber(record, "status"),
    retryAfter: record.retryAfter,
    details,
    rateLimit: extractRateLimitInfoFromRecordValue(record.rateLimit),
    correlationId: getRecordString(record, "correlationId"),
    requestId: getRecordString(record, "requestId"),
    path: getRecordString(record, "path"),
    raw: record,
  });
}

/**
 * Normalize error-like records that do not include an API envelope marker.
 *
 * @param record - Candidate record.
 * @returns Normalized API error or null.
 */
function normalizeLooseApiErrorRecord(record: Record<string, unknown>): NormalizedApiError | null {
  const code = getRecordString(record, "code");
  const message = getRecordErrorMessage(record);
  const status = getRecordFiniteNumber(record, "status");
  if (!(code || message) && status === undefined) {
    return null;
  }

  const details = getRecordDetails(record);
  return buildNormalizedApiError({
    code,
    message,
    status,
    retryAfter: record.retryAfter,
    details,
    correlationId: getRecordString(record, "correlationId"),
    requestId: getRecordString(record, "requestId"),
    path: getRecordString(record, "path"),
    raw: record,
  });
}

/**
 * Normalize Problem Details payloads into API error metadata.
 *
 * @param problem - Extracted problem details payload.
 * @param raw - Raw payload.
 * @returns Normalized API error.
 */
function normalizeProblemDetailsApiError(
  problem: ProblemDetailsMeta,
  raw: unknown,
): NormalizedApiError {
  return buildNormalizedApiError({
    code: problem.code,
    message: problem.detail ?? problem.title,
    status: problem.status,
    details: problem.details,
    correlationId: problem.correlationId,
    requestId: problem.requestId,
    path: problem.instance,
    raw,
  });
}

/**
 * Normalize unknown API error payloads for UI hydration.
 *
 * @param input - Candidate error payload.
 * @returns Normalized error metadata when available.
 */
export function normalizeApiError(input: unknown): NormalizedApiError | null {
  if (!input) {
    return null;
  }

  if (isRecord(input)) {
    const envelopeError = normalizeEnvelopeApiError(input);
    if (envelopeError) {
      return envelopeError;
    }
  }

  const problem = extractProblemDetailsMeta(input);
  if (problem) {
    return normalizeProblemDetailsApiError(problem, input);
  }

  if (isRecord(input)) {
    return normalizeLooseApiErrorRecord(input);
  }

  return null;
}
