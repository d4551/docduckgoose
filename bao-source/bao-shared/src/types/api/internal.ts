/**
 * Internal helpers shared by API result helpers.
 *
 * Not part of the public API surface — these are imported by sibling
 * modules within `./api/` only and are not re-exported by the entry.
 *
 * @shared/types/api/internal.ts
 */

import { MS_PER_SECOND } from "../../constants/time";
import type { ProblemDetails } from "../../schemas/problem.schemas.ts";
import { hasRateLimitInfo, type RateLimitInfo } from "../../utils/rate-limit.ts";
import type { ApiError, NormalizedApiError } from "./types.ts";

/**
 * Runtime type guard for plain objects.
 *
 * @param value - Candidate value.
 * @returns True when value is a record-like object.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Type guard for string arrays. */
export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

/**
 * Extract standard API envelope metadata from an unknown payload.
 *
 * @param value - Candidate payload.
 * @returns Extracted envelope metadata when value looks like an API envelope.
 */
export function extractEnvelopeMeta(value: unknown): {
  error?: string;
  message?: string;
  messageKey?: string;
  code?: string;
  details?: unknown;
  ok?: boolean;
  timestamp?: string;
  correlationId?: string;
  requestId?: string;
  path?: string;
} | null {
  if (!isRecord(value) || !("ok" in value)) {
    return null;
  }
  const okValue = value.ok;
  if (typeof okValue !== "boolean") {
    return null;
  }

  return {
    ok: okValue,
    error: typeof value.error === "string" ? value.error : undefined,
    message: typeof value.message === "string" ? value.message : undefined,
    messageKey: typeof value.messageKey === "string" ? value.messageKey : undefined,
    code: typeof value.code === "string" ? value.code : undefined,
    details: "details" in value ? value.details : undefined,
    timestamp: typeof value.timestamp === "string" ? value.timestamp : undefined,
    correlationId: typeof value.correlationId === "string" ? value.correlationId : undefined,
    requestId: typeof value.requestId === "string" ? value.requestId : undefined,
    path: typeof value.path === "string" ? value.path : undefined,
  };
}

/**
 * RFC 9457 problem details metadata extracted from a payload.
 */
export type ProblemDetailsMeta = Pick<
  ProblemDetails,
  "title" | "detail" | "status" | "instance" | "code" | "details" | "correlationId" | "requestId"
>;

/**
 * Extract RFC 9457 Problem Details metadata from an unknown payload.
 *
 * @param value - Candidate payload.
 * @returns Extracted problem details metadata when value matches the shape.
 */
export function extractProblemDetailsMeta(value: unknown): ProblemDetailsMeta | null {
  if (!isRecord(value)) {
    return null;
  }
  if ("ok" in value) {
    return null;
  }

  const hasIndicator = ["type", "title", "status", "detail", "instance", "code"].some(
    (key) => key in value,
  );
  if (!hasIndicator) {
    return null;
  }

  const status =
    typeof value.status === "number" && Number.isFinite(value.status) ? value.status : undefined;
  const title = typeof value.title === "string" ? value.title : undefined;
  const detail = typeof value.detail === "string" ? value.detail : undefined;
  const instance = typeof value.instance === "string" ? value.instance : undefined;
  const code = typeof value.code === "string" ? value.code : undefined;
  const details: unknown = "details" in value ? value.details : undefined;
  const correlationId = typeof value.correlationId === "string" ? value.correlationId : undefined;
  const requestId = typeof value.requestId === "string" ? value.requestId : undefined;

  if (!(status || title || detail || instance || code)) {
    return null;
  }

  return {
    status,
    title,
    detail,
    instance,
    code,
    details,
    correlationId,
    requestId,
  };
}

/**
 * Extract retry-after information from an error details payload.
 *
 * @param details - Error details payload.
 * @returns Retry delay in seconds, or undefined when missing.
 */
export function extractRetryAfter(details: unknown): number | undefined {
  let retryAfterSeconds: number | undefined;
  if (isRecord(details) && typeof details.retryAfter === "number") {
    retryAfterSeconds = details.retryAfter;
  }
  return retryAfterSeconds;
}

/**
 * Normalize field-level validation errors from details payloads.
 *
 * @param details - Candidate details payload.
 * @returns Normalized field map or undefined when unavailable.
 */
export function extractFieldErrors(details: unknown): Record<string, string[]> | undefined {
  let fieldErrors: Record<string, string[]> | undefined;
  if (isRecord(details) && isRecord(details.fields)) {
    const normalized: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(details.fields)) {
      if (typeof value === "string") {
        normalized[key] = [value];
        continue;
      }
      if (isStringArray(value)) {
        normalized[key] = value;
      }
    }
    if (Object.keys(normalized).length > 0) {
      fieldErrors = normalized;
    }
  }
  return fieldErrors;
}

/**
 * Resolve retry-after metadata in milliseconds.
 *
 * @param params - Retry-after candidates.
 * @returns Retry delay in milliseconds when available.
 */
export function resolveRetryAfterMs(params: {
  retryAfter?: unknown;
  details?: unknown;
  rateLimit?: RateLimitInfo;
}): number | undefined {
  let retryAfterMs: number | undefined;
  if (typeof params.retryAfter === "number") {
    retryAfterMs = Math.max(0, Math.round(params.retryAfter * MS_PER_SECOND));
  } else if (params.rateLimit?.retryAfter === undefined) {
    const detailRetry = extractRetryAfter(params.details);
    if (detailRetry !== undefined) {
      retryAfterMs = Math.max(0, Math.round(detailRetry * MS_PER_SECOND));
    }
  } else {
    retryAfterMs = Math.max(0, Math.round(params.rateLimit.retryAfter * MS_PER_SECOND));
  }
  return retryAfterMs;
}

/**
 * Read a string property from a record when available.
 *
 * @param record - Source record.
 * @param key - Property key.
 * @returns String value or undefined.
 */
export function getRecordString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  let resolved: string | undefined;
  if (typeof value === "string") {
    resolved = value;
  }
  return resolved;
}

/**
 * Read a finite numeric property from a record when available.
 *
 * @param record - Source record.
 * @param key - Property key.
 * @returns Numeric value or undefined.
 */
export function getRecordFiniteNumber(
  record: Record<string, unknown>,
  key: string,
): number | undefined {
  const value = record[key];
  let resolved: number | undefined;
  if (typeof value === "number" && Number.isFinite(value)) {
    resolved = value;
  }
  return resolved;
}

/**
 * Resolve a best-effort message from an error-like record.
 *
 * @param record - Source record.
 * @returns Preferred message candidate.
 */
export function getRecordErrorMessage(record: Record<string, unknown>): string | undefined {
  return getRecordString(record, "message") ?? getRecordString(record, "error");
}

/**
 * Extract explicit details payload from a record.
 *
 * @param record - Source record.
 * @returns Details payload or undefined when absent.
 */
export function getRecordDetails(record: Record<string, unknown>): unknown {
  return "details" in record ? record.details : undefined;
}

/**
 * Normalize optional rate-limit metadata embedded in a record.
 *
 * @param value - Candidate value.
 * @returns Parsed rate-limit metadata when present.
 */
export function extractRateLimitInfoFromRecordValue(value: unknown): RateLimitInfo | undefined {
  let resolved: RateLimitInfo | undefined;
  if (!isRecord(value)) {
    return resolved;
  }

  const rateLimit: RateLimitInfo = {
    limit: getRecordFiniteNumber(value, "limit"),
    remaining: getRecordFiniteNumber(value, "remaining"),
    reset: getRecordFiniteNumber(value, "reset"),
    resetAfter: getRecordFiniteNumber(value, "resetAfter"),
    retryAfter: getRecordFiniteNumber(value, "retryAfter"),
    policy: getRecordString(value, "policy"),
    tokenLimit: getRecordFiniteNumber(value, "tokenLimit"),
    tokenRemaining: getRecordFiniteNumber(value, "tokenRemaining"),
    tokenReset: getRecordFiniteNumber(value, "tokenReset"),
  };

  if (hasRateLimitInfo(rateLimit)) {
    resolved = rateLimit;
  }
  return resolved;
}

/** Initialization payload for {@link buildNormalizedApiError}. */
export type NormalizedApiErrorInit = {
  code?: string;
  message?: string;
  status?: number;
  retryAfter?: unknown;
  details?: unknown;
  rateLimit?: RateLimitInfo;
  correlationId?: string;
  requestId?: string;
  path?: string;
  raw: unknown;
};

/**
 * Build normalized API error metadata from primitive inputs.
 *
 * @param params - Primitive metadata components.
 * @returns Normalized error.
 */
export function buildNormalizedApiError(params: NormalizedApiErrorInit): NormalizedApiError {
  return {
    code: params.code,
    message: params.message,
    status: params.status,
    details: params.details,
    fields: extractFieldErrors(params.details),
    retryAfterMs: resolveRetryAfterMs({
      retryAfter: params.retryAfter,
      details: params.details,
      rateLimit: params.rateLimit,
    }),
    correlationId: params.correlationId,
    requestId: params.requestId,
    path: params.path,
    raw: params.raw,
  };
}

/** Initialization payload for {@link buildApiErrorResult}. */
export type ApiErrorBuildParams = {
  error: string;
  status?: number;
  code?: string;
  message?: string;
  messageKey?: string;
  details?: unknown;
  retryAfter?: number;
  timestamp?: string;
  correlationId?: string;
  requestId?: string;
  path?: string;
  rateLimit?: RateLimitInfo;
  raw?: unknown;
};

/**
 * Build a standardized API error result.
 *
 * @param params - Error metadata.
 * @returns API error payload.
 */
export function buildApiErrorResult(params: ApiErrorBuildParams): ApiError {
  return {
    ok: false,
    error: params.error,
    ...(params.status === undefined ? {} : { status: params.status }),
    ...(params.code ? { code: params.code } : {}),
    ...(params.message ? { message: params.message } : {}),
    ...(params.messageKey ? { messageKey: params.messageKey } : {}),
    ...(params.details === undefined ? {} : { details: params.details }),
    ...(params.retryAfter === undefined ? {} : { retryAfter: params.retryAfter }),
    ...(params.timestamp ? { timestamp: params.timestamp } : {}),
    ...(params.correlationId ? { correlationId: params.correlationId } : {}),
    ...(params.requestId ? { requestId: params.requestId } : {}),
    ...(params.path ? { path: params.path } : {}),
    ...(params.rateLimit ? { rateLimit: params.rateLimit } : {}),
    ...(params.raw === undefined ? {} : { raw: params.raw }),
  };
}
