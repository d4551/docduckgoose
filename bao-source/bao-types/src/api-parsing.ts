/**
 * API response parsing helpers — envelope/problem extraction, record accessors.
 * Extracted from api.ts to keep module size under 400 lines.
 */

import { MS_PER_SECOND } from "@baohaus/bao-constants/time";
import type { ApiEnvelopeResponse } from "@baohaus/bao-schemas/api-response.schemas";
import type { ProblemDetails } from "@baohaus/bao-schemas/problem.schemas";

const RATE_LIMIT_HEADERS = {
  limit: "RateLimit-Limit",
  remaining: "RateLimit-Remaining",
  reset: "RateLimit-Reset",
  policy: "RateLimit-Policy",
  retryAfter: "Retry-After",
  tokenLimit: "RateLimit-Token-Limit",
  tokenRemaining: "RateLimit-Token-Remaining",
  tokenReset: "RateLimit-Token-Reset",
} as const;

export interface RateLimitInfo {
  limit?: number;
  remaining?: number;
  reset?: number;
  resetAfter?: number;
  retryAfter?: number;
  policy?: string;
  tokenLimit?: number;
  tokenRemaining?: number;
  tokenReset?: number;
}

type HeaderRecord = Record<string, string | number | undefined>;
type HeaderSource = HeadersInit | HeaderRecord;

export const HTTP_BAD_REQUEST = 400;
export const HTTP_UNAUTHORIZED = 401;
export const HTTP_FORBIDDEN = 403;
export const HTTP_NOT_FOUND = 404;
export const HTTP_CONFLICT = 409;
export const HTTP_TOO_MANY = 429;
export const HTTP_SERVER_ERROR_MIN = 500;
export const HTTP_SERVER_ERROR_MAX = 600;

export type ApiError = {
  ok: false;
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

export type ApiResult<T> = { ok: true; data: T } | ApiError;

export type ApiEnvelope<T = unknown> = Omit<ApiEnvelopeResponse, "data"> & {
  data?: T;
};

export interface EdenResult<T> {
  data: T | null;
  error: { status: number | unknown; value: unknown } | unknown | null;
  headers?: HeadersInit;
  response?: Response;
}

export interface NormalizedApiError {
  code?: string;
  message?: string;
  status?: number;
  retryAfterMs?: number;
  details?: unknown;
  fields?: Record<string, string[]>;
  correlationId?: string;
  requestId?: string;
  path?: string;
  raw?: unknown;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

function normalizeHeaderRecord(record: HeaderRecord): Record<string, string> {
  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(record)) {
    if (value !== undefined) {
      normalized[key.toLowerCase()] = String(value);
    }
  }
  return normalized;
}

function getHeaderValue(headers: HeaderSource, key: string): string | null {
  if (headers instanceof Headers) {
    return headers.get(key);
  }
  if (Array.isArray(headers)) {
    const normalized: Record<string, string> = {};
    for (const entry of headers) {
      const [rawKey, rawValue] = entry;
      normalized[String(rawKey).toLowerCase()] = String(rawValue);
    }
    return normalized[key.toLowerCase()] ?? null;
  }
  const normalized = normalizeHeaderRecord(headers);
  return normalized[key.toLowerCase()] ?? null;
}

function parseHeaderNumber(value: string | null): number | undefined {
  if (!value) {
    return undefined;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function parseRateLimitHeaders(headers: HeaderSource): RateLimitInfo {
  const limit = parseHeaderNumber(getHeaderValue(headers, RATE_LIMIT_HEADERS.limit));
  const remaining = parseHeaderNumber(getHeaderValue(headers, RATE_LIMIT_HEADERS.remaining));
  const resetAfter = parseHeaderNumber(getHeaderValue(headers, RATE_LIMIT_HEADERS.reset));
  const retryAfter = parseHeaderNumber(getHeaderValue(headers, RATE_LIMIT_HEADERS.retryAfter));
  const policy = getHeaderValue(headers, RATE_LIMIT_HEADERS.policy);
  const tokenLimit = parseHeaderNumber(getHeaderValue(headers, RATE_LIMIT_HEADERS.tokenLimit));
  const tokenRemaining = parseHeaderNumber(
    getHeaderValue(headers, RATE_LIMIT_HEADERS.tokenRemaining),
  );
  const tokenReset = parseHeaderNumber(getHeaderValue(headers, RATE_LIMIT_HEADERS.tokenReset));

  return {
    ...(limit === undefined ? {} : { limit }),
    ...(remaining === undefined ? {} : { remaining }),
    ...(resetAfter === undefined ? {} : { resetAfter }),
    ...(retryAfter === undefined ? {} : { retryAfter }),
    ...(policy === null ? {} : { policy }),
    ...(tokenLimit === undefined ? {} : { tokenLimit }),
    ...(tokenRemaining === undefined ? {} : { tokenRemaining }),
    ...(tokenReset === undefined ? {} : { tokenReset }),
  };
}

function hasRateLimitInfo(info: RateLimitInfo): boolean {
  return Object.values(info).some((value) => value !== undefined);
}

export function isEdenErrorShape(
  value: unknown,
): value is { status: number | unknown; value: unknown } {
  if (!isRecord(value)) return false;
  return "status" in value && "value" in value;
}

export type EnvelopeMeta = {
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
};

export function extractEnvelopeMeta(value: unknown): EnvelopeMeta | null {
  if (!isRecord(value)) return null;
  if (!("ok" in value)) return null;
  const record = value;
  const okValue = record.ok;
  if (typeof okValue !== "boolean") return null;

  const meta: EnvelopeMeta = { ok: okValue };
  if (typeof record.error === "string") meta.error = record.error;
  if (typeof record.message === "string") meta.message = record.message;
  if (typeof record.messageKey === "string") meta.messageKey = record.messageKey;
  if (typeof record.code === "string") meta.code = record.code;
  if ("details" in record && record.details !== undefined) meta.details = record.details;
  if (typeof record.timestamp === "string") meta.timestamp = record.timestamp;
  if (typeof record.correlationId === "string") meta.correlationId = record.correlationId;
  if (typeof record.requestId === "string") meta.requestId = record.requestId;
  if (typeof record.path === "string") meta.path = record.path;
  return meta;
}

export type ProblemDetailsMeta = Pick<
  ProblemDetails,
  "title" | "detail" | "status" | "instance" | "code" | "details" | "correlationId" | "requestId"
>;

export function extractOptionalRecordString(
  record: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

export function extractOptionalRecordNumber(
  record: Record<string, unknown>,
  key: string,
): number | undefined {
  const value = record[key];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export function assignDefinedProperty<T extends object, K extends keyof T>(
  target: T,
  key: K,
  value: T[K] | undefined,
): void {
  if (value !== undefined) target[key] = value;
}

export function resolveProblemDetailsMessage(
  problem: ProblemDetailsMeta | null,
  envelopeMessage?: string,
): string | undefined {
  if (envelopeMessage !== undefined) return envelopeMessage;
  if (problem?.detail && problem.title && problem.detail !== problem.title) return problem.detail;
  return undefined;
}

export function extractProblemDetailsMeta(value: unknown): ProblemDetailsMeta | null {
  if (!isRecord(value)) return null;
  const record = value;
  if ("ok" in record) return null;

  const hasIndicator = ["type", "title", "status", "detail", "instance", "code"].some(
    (key) => key in record,
  );
  if (!hasIndicator) return null;

  const status = extractOptionalRecordNumber(record, "status");
  const title = extractOptionalRecordString(record, "title");
  const detail = extractOptionalRecordString(record, "detail");
  const instance = extractOptionalRecordString(record, "instance");
  const code = extractOptionalRecordString(record, "code");
  const details: unknown = "details" in record ? record.details : undefined;
  const correlationId = extractOptionalRecordString(record, "correlationId");
  const requestId = extractOptionalRecordString(record, "requestId");

  if (
    status === undefined &&
    title === undefined &&
    detail === undefined &&
    instance === undefined &&
    code === undefined
  )
    return null;

  const problemMeta: ProblemDetailsMeta = {};
  assignDefinedProperty(problemMeta, "status", status);
  assignDefinedProperty(problemMeta, "title", title);
  assignDefinedProperty(problemMeta, "detail", detail);
  assignDefinedProperty(problemMeta, "instance", instance);
  assignDefinedProperty(problemMeta, "code", code);
  assignDefinedProperty(problemMeta, "details", details);
  assignDefinedProperty(problemMeta, "correlationId", correlationId);
  assignDefinedProperty(problemMeta, "requestId", requestId);
  return problemMeta;
}

export function extractRetryAfter(details: unknown): number | undefined {
  if (isRecord(details) && typeof details.retryAfter === "number") return details.retryAfter;
  return undefined;
}

export function extractFieldErrors(details: unknown): Record<string, string[]> | undefined {
  if (!isRecord(details) || !isRecord(details.fields)) return undefined;
  const normalized: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(details.fields)) {
    if (typeof value === "string") {
      normalized[key] = [value];
    } else if (isStringArray(value)) {
      normalized[key] = value;
    }
  }
  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

export function resolveRetryAfterMs(params: {
  retryAfter?: unknown;
  details?: unknown;
  rateLimit?: RateLimitInfo;
}): number | undefined {
  if (typeof params.retryAfter === "number") {
    return Math.max(0, Math.round(params.retryAfter * MS_PER_SECOND));
  }
  if (params.rateLimit?.retryAfter === undefined) {
    const detailRetry = extractRetryAfter(params.details);
    if (detailRetry !== undefined) return Math.max(0, Math.round(detailRetry * MS_PER_SECOND));
  } else {
    return Math.max(0, Math.round(params.rateLimit.retryAfter * MS_PER_SECOND));
  }
  return undefined;
}

export function getRecordString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

export function getRecordFiniteNumber(
  record: Record<string, unknown>,
  key: string,
): number | undefined {
  const value = record[key];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export function getRecordErrorMessage(record: Record<string, unknown>): string | undefined {
  return getRecordString(record, "message") ?? getRecordString(record, "error");
}

export function getRecordDetails(record: Record<string, unknown>): unknown {
  return "details" in record ? record.details : undefined;
}

export function extractRateLimitInfoFromRecordValue(value: unknown): RateLimitInfo | undefined {
  if (!isRecord(value)) return undefined;
  const limit = getRecordFiniteNumber(value, "limit");
  const remaining = getRecordFiniteNumber(value, "remaining");
  const reset = getRecordFiniteNumber(value, "reset");
  const resetAfter = getRecordFiniteNumber(value, "resetAfter");
  const retryAfter = getRecordFiniteNumber(value, "retryAfter");
  const policy = getRecordString(value, "policy");
  const tokenLimit = getRecordFiniteNumber(value, "tokenLimit");
  const tokenRemaining = getRecordFiniteNumber(value, "tokenRemaining");
  const tokenReset = getRecordFiniteNumber(value, "tokenReset");
  const rateLimit: RateLimitInfo = {
    ...(limit === undefined ? {} : { limit }),
    ...(remaining === undefined ? {} : { remaining }),
    ...(reset === undefined ? {} : { reset }),
    ...(resetAfter === undefined ? {} : { resetAfter }),
    ...(retryAfter === undefined ? {} : { retryAfter }),
    ...(policy === undefined ? {} : { policy }),
    ...(tokenLimit === undefined ? {} : { tokenLimit }),
    ...(tokenRemaining === undefined ? {} : { tokenRemaining }),
    ...(tokenReset === undefined ? {} : { tokenReset }),
  };
  return hasRateLimitInfo(rateLimit) ? rateLimit : undefined;
}

export function resolveRateLimitInfo(result: {
  headers?: HeadersInit;
  response?: Response;
}): RateLimitInfo | undefined {
  const headers = result.headers ?? result.response?.headers;
  if (!headers) return undefined;
  const parsed = parseRateLimitHeaders(headers);
  return hasRateLimitInfo(parsed) ? parsed : undefined;
}
