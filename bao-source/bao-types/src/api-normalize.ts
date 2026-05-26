/**
 * API error normalization and Eden unwrapping helpers.
 * Extracted from api.ts to keep module size under 400 lines.
 */

import {
  type ApiError,
  type ApiResult,
  assignDefinedProperty,
  type EnvelopeMeta,
  extractEnvelopeMeta,
  extractFieldErrors,
  extractProblemDetailsMeta,
  extractRateLimitInfoFromRecordValue,
  extractRetryAfter,
  getRecordErrorMessage,
  getRecordFiniteNumber,
  getRecordString,
  HTTP_BAD_REQUEST,
  isEdenErrorShape,
  isRecord,
  type NormalizedApiError,
  type ProblemDetailsMeta,
  type RateLimitInfo,
  resolveProblemDetailsMessage,
  resolveRateLimitInfo,
  resolveRetryAfterMs,
} from "./api-parsing";

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

function buildNormalizedApiError(params: NormalizedApiErrorInit): NormalizedApiError {
  const fields = extractFieldErrors(params.details);
  const retryAfterMs = resolveRetryAfterMs({
    ...(params.retryAfter === undefined ? {} : { retryAfter: params.retryAfter }),
    ...(params.details === undefined ? {} : { details: params.details }),
    ...(params.rateLimit === undefined ? {} : { rateLimit: params.rateLimit }),
  });
  return {
    ...(params.code === undefined ? {} : { code: params.code }),
    ...(params.message === undefined ? {} : { message: params.message }),
    ...(params.status === undefined ? {} : { status: params.status }),
    ...(params.details === undefined ? {} : { details: params.details }),
    ...(fields === undefined ? {} : { fields }),
    ...(retryAfterMs === undefined ? {} : { retryAfterMs }),
    ...(params.correlationId === undefined ? {} : { correlationId: params.correlationId }),
    ...(params.requestId === undefined ? {} : { requestId: params.requestId }),
    ...(params.path === undefined ? {} : { path: params.path }),
    raw: params.raw,
  };
}

function normalizeEnvelopeApiError(record: Record<string, unknown>): NormalizedApiError | null {
  if (record.ok !== false) return null;
  const init: NormalizedApiErrorInit = { raw: record };
  const code = getRecordString(record, "code");
  if (code !== undefined) init.code = code;
  const message = getRecordErrorMessage(record);
  if (message !== undefined) init.message = message;
  const status = getRecordFiniteNumber(record, "status");
  if (status !== undefined) init.status = status;
  if ("retryAfter" in record) init.retryAfter = record.retryAfter;
  const details = "details" in record ? record.details : undefined;
  if (details !== undefined) init.details = details;
  const rateLimit = extractRateLimitInfoFromRecordValue(record.rateLimit);
  if (rateLimit !== undefined) init.rateLimit = rateLimit;
  const correlationId = getRecordString(record, "correlationId");
  if (correlationId !== undefined) init.correlationId = correlationId;
  const requestId = getRecordString(record, "requestId");
  if (requestId !== undefined) init.requestId = requestId;
  const path = getRecordString(record, "path");
  if (path !== undefined) init.path = path;
  return buildNormalizedApiError(init);
}

function normalizeLooseApiErrorRecord(record: Record<string, unknown>): NormalizedApiError | null {
  const code = getRecordString(record, "code");
  const message = getRecordErrorMessage(record);
  const status = getRecordFiniteNumber(record, "status");
  if (!(code || message) && status === undefined) return null;

  const init: NormalizedApiErrorInit = { raw: record };
  if (code !== undefined) init.code = code;
  if (message !== undefined) init.message = message;
  if (status !== undefined) init.status = status;
  if ("retryAfter" in record) init.retryAfter = record.retryAfter;
  const details = "details" in record ? record.details : undefined;
  if (details !== undefined) init.details = details;
  const correlationId = getRecordString(record, "correlationId");
  if (correlationId !== undefined) init.correlationId = correlationId;
  const requestId = getRecordString(record, "requestId");
  if (requestId !== undefined) init.requestId = requestId;
  const path = getRecordString(record, "path");
  if (path !== undefined) init.path = path;
  return buildNormalizedApiError(init);
}

function normalizeProblemDetailsApiError(
  problem: ProblemDetailsMeta,
  raw: unknown,
): NormalizedApiError {
  const init: NormalizedApiErrorInit = { raw };
  if (problem.code !== undefined) init.code = problem.code;
  const message = problem.detail ?? problem.title;
  if (message !== undefined) init.message = message;
  if (problem.status !== undefined) init.status = problem.status;
  if (problem.details !== undefined) init.details = problem.details;
  if (problem.correlationId !== undefined) init.correlationId = problem.correlationId;
  if (problem.requestId !== undefined) init.requestId = problem.requestId;
  if (problem.instance !== undefined) init.path = problem.instance;
  return buildNormalizedApiError(init);
}

export function normalizeApiError(input: unknown): NormalizedApiError | null {
  if (!input) return null;
  if (isRecord(input)) {
    const envelopeError = normalizeEnvelopeApiError(input);
    if (envelopeError) return envelopeError;
  }
  const problem = extractProblemDetailsMeta(input);
  if (problem) return normalizeProblemDetailsApiError(problem, input);
  if (isRecord(input)) return normalizeLooseApiErrorRecord(input);
  return null;
}

function extractNonEdenErrorMessage(error: unknown): string {
  if (typeof error === "string") return error || "Request failed";
  if (error instanceof Error) return error.message;
  return "Request failed";
}

function extractEdenErrorValueMessage(value: unknown, status: number | unknown): string {
  if (typeof value === "string") return value || `Request failed (HTTP ${status})`;
  if (value instanceof Error) return value.message;
  if (!isRecord(value)) return `Request failed (HTTP ${status})`;

  const envelope = extractEnvelopeMeta(value);
  if (envelope?.error) return envelope.error;
  if (envelope?.message) return envelope.message;

  const problem = extractProblemDetailsMeta(value);
  if (problem?.detail) return problem.detail;
  if (problem?.title) return problem.title;

  return getRecordErrorMessage(value) ?? `Request failed (HTTP ${status})`;
}

export function extractEdenError(
  error: { status: number | unknown; value: unknown } | unknown,
): string {
  if (!error) return "Unknown error";
  if (isRecord(error) && "status" in error && "value" in error) {
    return extractEdenErrorValueMessage(error.value, error.status);
  }
  return extractNonEdenErrorMessage(error);
}

type ApiErrorBuildParams = {
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

function buildApiErrorResult(params: ApiErrorBuildParams): ApiError {
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

function buildUnknownEdenApiError(error: unknown, rateLimit?: RateLimitInfo): ApiError {
  const params: ApiErrorBuildParams = {
    error: extractEdenError(error),
    raw: error,
  };
  if (rateLimit?.retryAfter !== undefined) params.retryAfter = rateLimit.retryAfter;
  if (rateLimit !== undefined) params.rateLimit = rateLimit;
  return buildApiErrorResult(params);
}

function buildNormalizedEdenApiError(
  edenError: { status: number | unknown; value: unknown },
  rateLimit?: RateLimitInfo,
): ApiError {
  const envelope = extractEnvelopeMeta(edenError.value);
  const problem = envelope ? null : extractProblemDetailsMeta(edenError.value);
  const details = envelope?.details ?? problem?.details;
  const retryAfter = extractRetryAfter(details) ?? rateLimit?.retryAfter;
  const status = typeof edenError.status === "number" ? edenError.status : problem?.status;

  const params: ApiErrorBuildParams = {
    error:
      envelope?.error ??
      envelope?.message ??
      problem?.detail ??
      problem?.title ??
      extractEdenError(edenError),
    raw: edenError.value,
  };
  assignDefinedProperty(params, "status", status);
  assignDefinedProperty(params, "code", problem?.code ?? envelope?.code);
  assignDefinedProperty(
    params,
    "message",
    resolveProblemDetailsMessage(problem, envelope?.message),
  );
  assignDefinedProperty(params, "messageKey", envelope?.messageKey);
  assignDefinedProperty(params, "details", details);
  assignDefinedProperty(params, "retryAfter", retryAfter);
  assignDefinedProperty(params, "timestamp", envelope?.timestamp);
  assignDefinedProperty(params, "correlationId", problem?.correlationId ?? envelope?.correlationId);
  assignDefinedProperty(params, "requestId", problem?.requestId ?? envelope?.requestId);
  assignDefinedProperty(params, "path", problem?.instance ?? envelope?.path);
  assignDefinedProperty(params, "rateLimit", rateLimit);
  return buildApiErrorResult(params);
}

function buildProblemDataApiError(
  problem: ProblemDetailsMeta,
  raw: unknown,
  rateLimit?: RateLimitInfo,
): ApiError {
  const retryAfter = extractRetryAfter(problem.details) ?? rateLimit?.retryAfter;
  const message =
    problem.detail && problem.title && problem.detail !== problem.title
      ? problem.detail
      : undefined;

  const params: ApiErrorBuildParams = {
    error: problem.detail ?? problem.title ?? "Request failed",
    raw,
  };
  if (problem.status !== undefined) params.status = problem.status;
  if (problem.code !== undefined) params.code = problem.code;
  if (message !== undefined) params.message = message;
  if (problem.details !== undefined) params.details = problem.details;
  if (retryAfter !== undefined) params.retryAfter = retryAfter;
  if (problem.correlationId !== undefined) params.correlationId = problem.correlationId;
  if (problem.requestId !== undefined) params.requestId = problem.requestId;
  if (problem.instance !== undefined) params.path = problem.instance;
  if (rateLimit !== undefined) params.rateLimit = rateLimit;
  return buildApiErrorResult(params);
}

function buildEnvelopeDataApiError(
  envelope: EnvelopeMeta | null,
  raw: unknown,
  rateLimit?: RateLimitInfo,
): ApiError {
  const retryAfter = extractRetryAfter(envelope?.details) ?? rateLimit?.retryAfter;
  const params: ApiErrorBuildParams = {
    error: envelope?.error || envelope?.message || "Request failed",
    raw,
  };
  if (envelope?.code !== undefined) params.code = envelope.code;
  if (envelope?.message !== undefined) params.message = envelope.message;
  if (envelope?.messageKey !== undefined) params.messageKey = envelope.messageKey;
  if (envelope?.details !== undefined) params.details = envelope.details;
  if (retryAfter !== undefined) params.retryAfter = retryAfter;
  if (envelope?.timestamp !== undefined) params.timestamp = envelope.timestamp;
  if (envelope?.correlationId !== undefined) params.correlationId = envelope.correlationId;
  if (envelope?.requestId !== undefined) params.requestId = envelope.requestId;
  if (envelope?.path !== undefined) params.path = envelope.path;
  if (rateLimit !== undefined) params.rateLimit = rateLimit;
  return buildApiErrorResult(params);
}

export function unwrapEden<T>(result: {
  data: T | null;
  error: unknown;
  headers?: HeadersInit;
  response?: Response;
}): ApiResult<NonNullable<T>>;
export function unwrapEden<T>(result: {
  data: unknown | null;
  error: unknown;
  headers?: HeadersInit;
  response?: Response;
}): ApiResult<NonNullable<T>>;
export function unwrapEden<T>(result: {
  data: unknown | null;
  error: unknown;
  headers?: HeadersInit;
  response?: Response;
}): ApiResult<NonNullable<T>> {
  const normalizedError = isEdenErrorShape(result.error) ? result.error : null;
  const rateLimit = resolveRateLimitInfo(result);

  if (result.error) {
    return normalizedError
      ? buildNormalizedEdenApiError(normalizedError, rateLimit)
      : buildUnknownEdenApiError(result.error, rateLimit);
  }

  if (!result.data) return buildApiErrorResult({ error: "Empty response from server" });

  const problemFromData = extractProblemDetailsMeta(result.data);
  if (problemFromData?.status && problemFromData.status >= HTTP_BAD_REQUEST) {
    return buildProblemDataApiError(problemFromData, result.data, rateLimit);
  }

  const maybeEnvelope = extractEnvelopeMeta(result.data);
  if (maybeEnvelope?.ok === false) {
    return buildEnvelopeDataApiError(maybeEnvelope, result.data, rateLimit);
  }

  return { ok: true, data: result.data as NonNullable<T> };
}

export function unwrapEdenData<T>(result: {
  data: unknown | null;
  error: unknown;
  headers?: HeadersInit;
  response?: Response;
}): ApiResult<T> {
  const base = unwrapEden(result);
  if (!base.ok) return base;
  const value: unknown = base.data;
  if (isRecord(value) && value.ok === true && "data" in value) {
    return { ok: true, data: value.data as T };
  }
  return { ok: true, data: value as T };
}
