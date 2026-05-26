/**
 * Shared HTTP client with timeout and retries (native fetch).
 *
 * Use for scripts, libs, and bunbuddies. No server-only dependencies.
 * For apps/server, use fetchWithPolicy which adds config, telemetry, and correlation.
 *
 * @packageDocumentation
 */

import { toResultAsync } from "@baohaus/bao-utils/async-result";
import { DEFAULT_HTTP_RETRY_CONFIG } from "../constants/retries";
import { createExtensionTimeoutSignal } from "./extension-primitives";
import { isRetryableError, sleep } from "./retry";

const HTTP_REQUEST_TIMEOUT = 408;
const HTTP_CONFLICT = 409;
const HTTP_TOO_EARLY = 425;
const HTTP_TOO_MANY = 429;
const HTTP_INTERNAL = 500;
const HTTP_BAD_GATEWAY = 502;
const HTTP_UNAVAILABLE = 503;
const HTTP_GATEWAY_TIMEOUT = 504;
const DEFAULT_BASE_DELAY_MS = 1000;
const DEFAULT_MAX_DELAY_MS = 10000;
const DEFAULT_JITTER_RATIO = 0.2;

/** Default retryable status codes. */
const DEFAULT_RETRY_STATUS_CODES: readonly number[] = [
  HTTP_REQUEST_TIMEOUT,
  HTTP_CONFLICT,
  HTTP_TOO_EARLY,
  HTTP_TOO_MANY,
  HTTP_INTERNAL,
  HTTP_BAD_GATEWAY,
  HTTP_UNAVAILABLE,
  HTTP_GATEWAY_TIMEOUT,
];

/** Methods that are safe to retry by default. */
const DEFAULT_RETRYABLE_METHODS: readonly string[] = ["GET", "HEAD", "OPTIONS"];

/** Optional hook for per-retry logging/metrics. */
export type FetchRetryAttemptHook = (params: {
  /** Zero-based attempt index. */
  attempt: number;
  /** HTTP status code when retry was triggered by response, if available. */
  status?: number;
  /** Delay before next attempt in ms. */
  delayMs: number;
  /** Error that triggered retry, when available. */
  error?: unknown;
}) => void | Promise<void>;

/** Predicate for status-based retry decisions. */
export type FetchRetryStatusPredicate = (status: number) => boolean;

/**
 * Options for fetchWithRetry.
 */
export interface FetchWithRetryOptions {
  /** Timeout in ms. */
  timeoutMs?: number;
  /** Max attempts (includes first). Default 3. */
  maxAttempts?: number;
  /**
   * Retry on retryable status codes:
   * - `true` => use configured retryStatusCodes
   * - `false` => never retry HTTP statuses
   * - function => custom predicate for status codes
   */
  retryOnStatus?: boolean | FetchRetryStatusPredicate;
  /** Status codes to retry on when `retryOnStatus === true`. */
  retryStatusCodes?: number[];
  /** Base delay for backoff (ms). Default 1000. */
  baseDelayMs?: number;
  /** Max delay cap (ms). Default 10000. */
  maxDelayMs?: number;
  /** Jitter ratio 0-1. Default 0.2. */
  jitterRatio?: number;
  /** Optional retry hook for logs/metrics. */
  onRetry?: FetchRetryAttemptHook;
  /** Operation label for instrumentation (optional). */
  operation?: string;
}

type BunTlsOptions = {
  /** Disable TLS verification (development-only). */
  rejectUnauthorized?: boolean;
  /** CA bundle(s). */
  ca?: unknown[];
};

type NativeFetchInit = RequestInit & {
  tls?: BunTlsOptions;
  unix?: string;
};

function normalizeMethod(input: RequestInfo | URL, init?: NativeFetchInit): string {
  if (typeof init?.method === "string" && init.method.trim()) {
    return init.method.toUpperCase();
  }
  if (input instanceof Request) {
    return input.method.toUpperCase();
  }
  return "GET";
}

function resolveHeaders(input: RequestInfo | URL, init?: NativeFetchInit): HeadersInit | undefined {
  const headers = init?.headers ?? (input instanceof Request ? input.headers : undefined);
  return headers;
}

function buildFetchInput(
  input: RequestInfo | URL,
  init: NativeFetchInit | undefined,
): { fetchInput: Request | string; baseInit: NativeFetchInit } {
  if (typeof input === "string") {
    return { fetchInput: input, baseInit: init ? { ...init } : {} };
  }

  if (input instanceof URL) {
    return { fetchInput: input.href, baseInit: init ? { ...init } : {} };
  }

  if (!(input instanceof Request)) {
    return { fetchInput: input, baseInit: init ? { ...init } : {} };
  }

  const request = input;
  const normalizedMethod = init?.method ?? request.method;
  const normalizedHeaders = init?.headers ?? request.headers;
  const baseInit: NativeFetchInit = {
    ...init,
    method: normalizedMethod,
    headers: normalizedHeaders,
  };

  return { fetchInput: request.clone(), baseInit };
}

/**
 * Normalize a retry predicate from option shape.
 */
function resolveRetryOnStatus(
  retryOnStatus: FetchWithRetryOptions["retryOnStatus"],
  retryableMethods: readonly string[],
  method: string,
  retryStatusCodes: readonly number[],
): FetchRetryStatusPredicate | undefined {
  let predicate: FetchRetryStatusPredicate | undefined;
  if (retryableMethods.includes(method)) {
    if (typeof retryOnStatus === "function") {
      predicate = retryOnStatus;
    } else if (retryOnStatus !== false) {
      const statusSet = new Set(retryStatusCodes.filter((code) => code > 0));
      predicate = (status: number): boolean => statusSet.has(status);
    }
  }
  return predicate;
}

function computeBackoffMs(
  attempt: number,
  baseMs: number,
  maxMs: number,
  jitterRatio: number,
): number {
  const exp = 2 ** Math.max(0, attempt);
  const raw = Math.min(maxMs, baseMs * exp);
  if (jitterRatio <= 0) {
    return Math.trunc(raw);
  }
  const jitter = raw * jitterRatio;
  const delta = (Math.random() * 2 - 1) * jitter;
  return Math.max(0, Math.trunc(raw + delta));
}

function isRetryableMethod(method: string, retryableMethods: readonly string[]): boolean {
  return retryableMethods.includes(method.toUpperCase());
}

function isRetryableNetworkError(error: unknown): boolean {
  return isRetryableError(error);
}

type RetryContext = {
  canRetry: boolean;
  retryOnStatus: FetchRetryStatusPredicate | undefined;
  baseDelayMs: number;
  maxDelayMs: number;
  jitterRatio: number;
  upstreamSignal: AbortSignal | undefined;
  onRetry?: FetchRetryAttemptHook;
};

async function applyRetryDelay(
  attempt: number,
  ctx: RetryContext,
  extra: { status?: number; error?: unknown },
): Promise<void> {
  const delayMs = computeBackoffMs(attempt, ctx.baseDelayMs, ctx.maxDelayMs, ctx.jitterRatio);
  await ctx.onRetry?.({ attempt, delayMs, ...extra });
  if (ctx.upstreamSignal?.aborted) {
    throw new Error("Request aborted while retrying");
  }
  if (delayMs > 0) {
    await sleep(delayMs, ctx.upstreamSignal ? { signal: ctx.upstreamSignal } : undefined);
  }
}

async function executeFetchAttempt(
  input: RequestInfo | URL,
  baseInit: NativeFetchInit,
  normalizedHeaders: HeadersInit | undefined,
  hasExplicitBody: boolean,
  init: NativeFetchInit | undefined,
  signal: AbortSignal | undefined,
): Promise<{ ok: true; value: Response } | { ok: false; error: unknown }> {
  const fetchTarget: RequestInfo =
    input instanceof Request ? input.clone() : input instanceof URL ? input.href : input;
  const fetchInit: RequestInit = {
    ...baseInit,
    ...(normalizedHeaders != null && { headers: normalizedHeaders }),
    ...(hasExplicitBody && init?.body !== undefined && { body: init.body }),
    ...(signal != null && { signal }),
  };
  const result = await toResultAsync(fetch(fetchTarget, fetchInit));
  return result.ok ? { ok: true, value: result.value } : { ok: false, error: result.error };
}

function buildFetchRetryContext(
  input: RequestInfo | URL,
  init: NativeFetchInit | undefined,
  options: FetchWithRetryOptions,
): { ctx: RetryContext; timeoutMs: number; maxAttempts: number } {
  const method = normalizeMethod(input, init);
  const retryableMethods = options?.retryOnStatus === false ? [] : DEFAULT_RETRYABLE_METHODS;
  const retryStatusCodes =
    options.retryStatusCodes && options.retryStatusCodes.length > 0
      ? options.retryStatusCodes
      : DEFAULT_RETRY_STATUS_CODES;
  const retryOnStatus = resolveRetryOnStatus(
    options.retryOnStatus ?? true,
    retryableMethods,
    method,
    retryStatusCodes,
  );
  const ctx: RetryContext = {
    canRetry: isRetryableMethod(method, DEFAULT_RETRYABLE_METHODS),
    retryOnStatus,
    baseDelayMs: options.baseDelayMs ?? DEFAULT_BASE_DELAY_MS,
    maxDelayMs: options.maxDelayMs ?? DEFAULT_MAX_DELAY_MS,
    jitterRatio: options.jitterRatio ?? DEFAULT_JITTER_RATIO,
    upstreamSignal: init?.signal ?? undefined,
    onRetry: options.onRetry,
  };
  return {
    ctx,
    timeoutMs: options.timeoutMs ?? DEFAULT_HTTP_RETRY_CONFIG.timeoutMs,
    maxAttempts: Math.max(1, options.maxAttempts ?? DEFAULT_HTTP_RETRY_CONFIG.maxAttempts),
  };
}

/**
 * Fetch with timeout and retries (Bun-native).
 *
 * No server dependencies. Use in scripts, libs, bunbuddies.
 *
 * @param input - URL or Request.
 * @param init - Fetch init.
 * @param options - Timeout and retry options.
 * @returns Response.
 */
export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: NativeFetchInit,
  options: FetchWithRetryOptions = {},
): Promise<Response> {
  const { ctx, timeoutMs, maxAttempts } = buildFetchRetryContext(input, init, options);
  const normalizedHeaders = resolveHeaders(input, init);
  const hasExplicitBody = init?.body !== undefined;
  const { baseInit } = buildFetchInput(input, init);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const outcome = await runSingleRetryAttempt(
      input,
      baseInit,
      normalizedHeaders,
      hasExplicitBody,
      init,
      ctx,
      timeoutMs,
      attempt,
      attempt === maxAttempts - 1,
    );
    if (outcome.done) {
      return outcome.response;
    }
  }

  throw new Error(`fetchWithRetry failed after ${maxAttempts} attempts`);
}

async function runSingleRetryAttempt(
  input: RequestInfo | URL,
  baseInit: NativeFetchInit,
  normalizedHeaders: HeadersInit | undefined,
  hasExplicitBody: boolean,
  init: NativeFetchInit | undefined,
  ctx: RetryContext,
  timeoutMs: number,
  attempt: number,
  isFinalAttempt: boolean,
): Promise<{ done: true; response: Response } | { done: false }> {
  const { signal, cleanup } = createExtensionTimeoutSignal({
    ...(timeoutMs > 0 && { timeoutMs }),
    ...(ctx.upstreamSignal != null && { upstreamSignal: ctx.upstreamSignal }),
  });
  const result = await executeFetchAttempt(
    input,
    baseInit,
    normalizedHeaders,
    hasExplicitBody,
    init,
    signal ?? undefined,
  );
  cleanup?.();

  if (result.ok) {
    return handleRetrySuccess(result.value, ctx, attempt, isFinalAttempt);
  }

  return handleRetryFailure(result.error, ctx, attempt, isFinalAttempt);
}

function normalizeRetryError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}

async function handleRetrySuccess(
  response: Response,
  ctx: RetryContext,
  attempt: number,
  isFinalAttempt: boolean,
): Promise<{ done: true; response: Response } | { done: false }> {
  const shouldRetry = ctx.canRetry && ctx.retryOnStatus?.(response.status) === true;
  if (!shouldRetry || isFinalAttempt) {
    return { done: true, response };
  }

  await applyRetryDelay(attempt, ctx, { status: response.status });
  return { done: false };
}

async function handleRetryFailure(
  error: unknown,
  ctx: RetryContext,
  attempt: number,
  isFinalAttempt: boolean,
): Promise<{ done: false }> {
  if (ctx.upstreamSignal?.aborted) {
    throw normalizeRetryError(error);
  }

  const shouldRetry = ctx.canRetry && isRetryableNetworkError(error);
  if (!shouldRetry || isFinalAttempt) {
    throw normalizeRetryError(error);
  }

  await applyRetryDelay(attempt, ctx, { error });
  return { done: false };
}
