/**
 * Retry Utilities Module - Bun 1.3.11+ Native Implementation
 *
 * This module provides robust retry functionality with exponential backoff and jitter
 * for handling transient failures in HTTP requests and other asynchronous operations.
 * Built using Bun native APIs without external dependencies for optimal performance.
 *
 * Key Features:
 * - Zero external dependencies for retry logic
 * - Exponential backoff with configurable factor and maximum delay
 * - Optional jitter to prevent thundering herd problem
 * - Native AbortSignal support for cancellation
 * - Timeout support per attempt
 * - Customizable retry conditions via shouldRetry callback
 * - Progress tracking via onRetry callback
 * - Smaller bundle size compared to library-based solutions
 *
 * Common Use Cases:
 * - HTTP API requests with transient network failures
 * - Database connection retry logic
 * - External service integration with temporary unavailability
 * - Resource acquisition with backoff
 *
 * Error Handling Strategy:
 * - AbortError: Non-retryable, immediately thrown
 * - RangeError: Client-side logic error, converted to AbortError
 * - Custom shouldRetry: User-defined retry conditions
 * - Default: All other errors are retried up to maxAttempts
 *
 * @packageDocumentation
 */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Custom AbortError for signaling non-retryable failures.
 *
 * This error type is used to immediately abort retry loops without further attempts.
 * When thrown or returned from shouldRetry, the retry logic stops and propagates
 * the error to the caller.
 *
 * Use Cases:
 * - Client-side validation failures (RangeError, TypeError)
 * - Business logic errors that should not be retried
 * - Manual abort via AbortSignal
 * - Custom shouldRetry logic returning false
 *
 * Error
 *
 * @example
 * ```ts
 * // Throw AbortError to stop retrying
 * if (response.status === 400) {
 *   throw new AbortError('Client error, cannot retry');
 * }
 *
 * // Wrap existing error
 * throw new AbortError(validationError);
 * ```
 */
const HTTP_REQUEST_TIMEOUT = 408;
const HTTP_TOO_MANY_REQUESTS = 429;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_BAD_GATEWAY = 502;
const HTTP_SERVICE_UNAVAILABLE = 503;
const HTTP_GATEWAY_TIMEOUT = 504;

/**
 * Error thrown by retry loops to short-circuit further attempts.
 *
 * Wraps the underlying cause so callers can still inspect the original failure.
 */
export class AbortError extends Error {
  override readonly name: string = "AbortError";
  /** Original error that caused the abort, if any */
  readonly originalError?: Error;

  /**
   * Creates a new AbortError instance.
   *
   * @param messageOrError - Error message or existing error to wrap
   */
  constructor(messageOrError: string | Error) {
    super(typeof messageOrError === "string" ? messageOrError : messageOrError.message);
    if (messageOrError instanceof Error) {
      this.originalError = messageOrError;
    }
  }
}

/**
 * Configuration options for retry behavior.
 *
 * RetryOptions
 * {number} [maxAttempts=3] - Maximum number of retry attempts (including initial attempt)
 * {number} [baseDelay=1000] - Initial delay in milliseconds before first retry
 * {number} [maxDelay=30000] - Maximum delay in milliseconds (caps exponential growth)
 * {number} [factor=2] - Exponential backoff factor (delay multiplier per attempt)
 * {boolean} [useJitter=true] - Add random jitter to delays (prevents thundering herd)
 * {Function} [shouldRetry] - Custom function to determine if error is retryable
 * {Function} [onRetry] - Callback invoked before each retry attempt
 * {number} [timeout] - Timeout in milliseconds per attempt (uses AbortSignal)
 * {AbortSignal} [signal] - External abort signal for manual cancellation
 *
 * @example
 * ```ts
 * const options: RetryOptions = {
 *   maxAttempts: 5,
 *   baseDelay: 2000,
 *   maxDelay: 60000,
 *   factor: 3,
 *   useJitter: true,
 *   shouldRetry: (error, attempt) => {
 *     // Only retry on network errors
 *     return error.name === 'NetworkError' && attempt < 3;
 *   },
 *   onRetry: async (error, attempt, delay) => {
 *     createLogger('retry').info(`Retry attempt ${attempt} after ${delay}ms: ${error.message}`);
 *   },
 *   timeout: 5000, // 5 second timeout per attempt
 * };
 * ```
 */
/** Configuration for retry backoff, cancellation, and retry hooks. */
export interface RetryOptions {
  /** Maximum number of retry attempts (default: 3) */
  maxAttempts?: number;
  /** Initial delay in milliseconds (default: 1000) */
  baseDelay?: number;
  /** Maximum delay cap in milliseconds (default: 30000) */
  maxDelay?: number;
  /** Exponential backoff factor (default: 2) */
  factor?: number;
  /** Enable jitter to randomize delays (default: true) */
  useJitter?: boolean;
  /** Custom retry condition function */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
  /** Callback invoked before each retry */
  onRetry?: (error: unknown, attempt: number, delay: number) => void | Promise<void>;
  /** Timeout per attempt in milliseconds */
  timeout?: number;
  /** External abort signal for cancellation */
  signal?: AbortSignal;
}

function combineAbortSignals(signals: Array<AbortSignal | undefined | null>): {
  signal: AbortSignal | undefined;
  cleanup?: () => void;
} {
  const active = signals.filter((entry): entry is AbortSignal => Boolean(entry));
  if (active.length === 0) {
    return {
      signal: undefined,
    };
  }
  if (active.length === 1) {
    return {
      signal: active[0],
    };
  }

  const controller = new AbortController();
  const disposers: Array<() => void> = [];

  for (const signal of active) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return {
        signal: controller.signal,
      };
    }

    const onAbort = (): void => controller.abort(signal.reason);
    signal.addEventListener("abort", onAbort, { once: true });
    disposers.push(() => signal.removeEventListener("abort", onAbort));
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      for (const dispose of disposers) {
        dispose();
      }
    },
  };
}

type RetryAttemptResult<T> = { ok: true; value: T } | { ok: false; error: Error };

function toAttemptResult<T>(value: T): RetryAttemptResult<T> {
  return { ok: true, value };
}

function toFailureResult<T>(error: unknown): RetryAttemptResult<T> {
  return { ok: false, error: error instanceof Error ? error : new Error(String(error)) };
}

function isRetryableClass(error: Error): boolean {
  if (error instanceof AbortError) {
    return false;
  }
  if (error instanceof RangeError) {
    return false;
  }
  return true;
}

async function executeAttempt<T>(
  fn: (context: { attempt: number; signal?: AbortSignal }) => Promise<T>,
  attempt: number,
  signal?: AbortSignal,
  timeout?: number | null,
): Promise<RetryAttemptResult<T>> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let timeoutController: AbortController | undefined;

  if (timeout) {
    timeoutController = new AbortController();
    timeoutId = setTimeout(() => timeoutController?.abort(), timeout);
  }

  const combined = combineAbortSignals([timeoutController?.signal, signal]);
  const combinedCleanup = combined.cleanup;
  const attemptResult = await fn({ attempt, signal: combined.signal }).then(
    (value) => toAttemptResult(value),
    (error) => toFailureResult<T>(error),
  );
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  combinedCleanup?.();
  return attemptResult;
}

type RetryFlowDecision =
  | { readonly type: "terminal"; readonly error: Error }
  | { readonly type: "retry"; readonly error: Error; readonly delayMs: number };

interface BuildRetryDecisionInput {
  readonly attempt: number;
  readonly maxAttempts: number;
  readonly baseDelay: number;
  readonly maxDelay: number;
  readonly factor: number;
  readonly useJitter: boolean;
  readonly error: Error;
  readonly shouldRetry: RetryOptions["shouldRetry"];
}

function buildRetryDecision(input: BuildRetryDecisionInput): RetryFlowDecision {
  const { attempt, maxAttempts, baseDelay, maxDelay, factor, useJitter, error, shouldRetry } =
    input;
  if (!isRetryableClass(error)) {
    if (error instanceof AbortError) {
      return { type: "terminal", error };
    }

    const terminalError =
      error instanceof RangeError ? new AbortError(error) : new AbortError(error);
    return { type: "terminal", error: terminalError };
  }

  if (shouldRetry && !shouldRetry(error, attempt)) {
    return { type: "terminal", error: new AbortError("Retry aborted by shouldRetry function") };
  }

  const retriesLeft = maxAttempts - attempt - 1;
  if (retriesLeft <= 0) {
    return { type: "terminal", error };
  }

  const delayMs = calculateRetryDelay(attempt, baseDelay, factor, maxDelay, useJitter);
  return { type: "retry", error, delayMs };
}

/**
 * Browser-safe sleep implementation using setTimeout with AbortSignal support.
 *
 * Provides a promise-based delay mechanism compatible with both browser and Bun
 * environments. Supports cancellation via AbortSignal for early termination.
 *
 * @param ms - Milliseconds to sleep (0 or negative values resolve immediately)
 * @param [options] - Configuration options
 * @param [options.signal] - Abort signal for cancellation
 * @returns Promise that resolves after the delay or rejects if aborted
 * @throws If signal is aborted before delay completes
 *
 * @example
 * ```ts
 * // Simple delay
 * await sleep(1000); // Wait 1 second
 *
 * // With abort signal
 * const controller = new AbortController();
 * const promise = sleep(5000, { signal: controller.signal });
 * controller.abort(); // Cancel the sleep
 * // promise rejects with AbortError
 *
 * // In retry logic
 * await sleep(calculateBackoff(attempt), { signal });
 * ```
 */
/** Pause for a bounded delay and support cooperative cancellation via AbortSignal. */
export function sleep(ms: number, options?: { signal?: AbortSignal }): Promise<void> {
  const signal = options?.signal;
  if (!ms || ms <= 0) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new AbortError("Sleep aborted"));
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    const onAbort = () => {
      clearTimeout(timeoutId);
      reject(new AbortError("Sleep aborted"));
    };

    if (signal) {
      signal.addEventListener("abort", onAbort, { once: true });
    }

    timeoutId = setTimeout(() => {
      if (signal) {
        signal.removeEventListener("abort", onAbort);
      }
      resolve();
    }, ms);
  });
}

/**
 * Calculate delay with exponential backoff and optional jitter.
 *
 * Implements exponential backoff algorithm with configurable parameters and optional
 * jitter to prevent thundering herd problem. The delay is capped at maxDelay to
 * prevent excessively long wait times.
 *
 * Algorithm:
 * 1. Calculate exponential delay: baseDelay * (factor ^ attempt)
 * 2. Cap delay at maxDelay
 * 3. If jitter enabled, multiply by random value between 1.0 and 2.0
 *
 * @param attempt - Current attempt number (0-indexed)
 * @param baseDelay - Initial delay in milliseconds
 * @param factor - Exponential growth factor
 * @param maxDelay - Maximum delay cap in milliseconds
 * @param useJitter - Whether to apply random jitter
 * @returns Calculated delay in milliseconds
 *
 * @example
 * ```ts
 * // Without jitter: 1000, 2000, 4000, 8000, ...
 * calculateRetryDelay(0, 1000, 2, 30000, false); // 1000ms
 * calculateRetryDelay(1, 1000, 2, 30000, false); // 2000ms
 * calculateRetryDelay(2, 1000, 2, 30000, false); // 4000ms
 *
 * // With jitter: adds randomness
 * calculateRetryDelay(0, 1000, 2, 30000, true); // 1000-2000ms (random)
 * calculateRetryDelay(1, 1000, 2, 30000, true); // 2000-4000ms (random)
 *
 * // Capped at maxDelay
 * calculateRetryDelay(10, 1000, 2, 30000, false); // 30000ms (capped)
 * ```
 */
/** Calculate the next retry delay using exponential backoff and optional jitter. */
export function calculateRetryDelay(
  attempt: number,
  baseDelay: number,
  factor: number,
  maxDelay: number,
  useJitter: boolean,
): number {
  const exponentialDelay = baseDelay * factor ** attempt;
  const cappedDelay = Math.min(exponentialDelay, maxDelay);

  if (useJitter) {
    // Add jitter: random value between 1x and 2x the delay (matches p-retry behavior)
    return cappedDelay * (1 + Math.random());
  }

  return cappedDelay;
}

/**
 * Retry an asynchronous function with exponential backoff and configurable retry logic.
 *
 * This is the primary retry function providing full control over retry behavior including
 * exponential backoff, jitter, timeout per attempt, custom retry conditions, and progress
 * callbacks. Ideal for handling transient failures in HTTP requests, database operations,
 * and external service calls.
 *
 * Retry Flow:
 * 1. Execute function with attempt context (attempt number, abort signal)
 * 2. On success, return result immediately
 * 3. On failure:
 *    - Check if error is AbortError or RangeError (non-retryable) → throw
 *    - Check custom shouldRetry callback → if false, throw AbortError
 *    - If max attempts reached → throw last error
 *    - Call onRetry callback (if provided)
 *    - Wait with exponential backoff + jitter
 *    - Repeat from step 1
 *
 * Timeout Handling:
 * If timeout option is provided, each attempt gets its own AbortSignal that fires
 * after the timeout duration. This is independent of the external signal parameter.
 *
 * T - Return type of the function being retried
 * @param fn - Async function to retry, receives context object with attempt number and signal
 * @param [options={}] - Retry configuration options
 * @returns Result from successful function execution
 * @throws If retry is aborted (non-retryable error, shouldRetry returns false, or signal aborted)
 * @throws If all retry attempts exhausted, throws the last error encountered
 *
 * @example
 * ```ts
 * // Basic retry for HTTP request
 * const log = createLogger('retry');
 * const data = await retryWithBackoff(
 *   async ({ attempt }) => {
 *     log.info(`Attempt ${attempt + 1}`);
 *     return await fetchWithRetry('https://api.example.com/data', undefined, {
 *       retryOnStatus: false,
 *     }).then((r) => r.json());
 *   },
 *   {
 *     maxAttempts: 3,
 *     baseDelay: 1000,
 *   }
 * );
 *
 * // Advanced retry with custom logic
 * const result = await retryWithBackoff(
 *   async ({ attempt, signal }) => {
 *     const response = await fetchWithRetry(
 *       'https://api.example.com/data',
 *       { signal },
 *       { retryOnStatus: false },
 *     );
 *     if (!response.ok) {
 *       // Don't retry client errors
 *       if (response.status >= 400 && response.status < 500) {
 *         throw new AbortError(`Client error: ${response.status}`);
 *       }
 *       throw new Error(`Server error: ${response.status}`);
 *     }
 *     return response.json();
 *   },
 *   {
 *     maxAttempts: 5,
 *     baseDelay: 2000,
 *     maxDelay: 60000,
 *     factor: 3,
 *     useJitter: true,
 *     timeout: 10000, // 10 second timeout per attempt
 *     shouldRetry: (error, attempt) => {
 *       // Only retry on network errors and server errors (5xx)
 *       const isRetryable = error instanceof Error &&
 *         (error.name === 'NetworkError' || error.message.includes('Server error: 5'));
 *       return isRetryable && attempt < 3;
 *     },
 *     onRetry: async (error, attempt, delay) => {
 *       logger.info(`Retry attempt ${attempt} after ${delay}ms`, { error: error.message });
 *       // Optional: Log to monitoring service
 *       await logRetryAttempt({ error, attempt, delay });
 *     },
 *   }
 * );
 *
 * // With abort signal
 * const controller = new AbortController();
 * setTimeout(() => controller.abort(), 30000); // Cancel after 30 seconds
 *
 * const result = await toResultAsync(
 *   retryWithBackoff(
 *     async ({ signal }) => {
 *       return await longRunningOperation({ signal });
 *     },
 *     {
 *       maxAttempts: 10,
 *       signal: controller.signal,
 *     },
 *   ),
 * );
 * if (!result.ok && result.error instanceof AbortError) {
 *   logger.info('Operation aborted');
 * }
 * ```
 */
export async function retryWithBackoff<T>(
  fn: (context: { attempt: number; signal?: AbortSignal }) => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    factor = 2,
    useJitter = true,
    shouldRetry,
    onRetry,
    timeout = null,
    signal,
  } = options;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Check if externally aborted
    if (signal?.aborted) {
      throw new AbortError("Retry aborted by signal");
    }

    const attemptResult = await executeAttempt(fn, attempt, signal, timeout);

    if (attemptResult.ok) {
      return attemptResult.value;
    }

    const error = attemptResult.error;
    const normalizedError = error instanceof Error ? error : new Error(String(error));
    const decision = buildRetryDecision({
      attempt,
      maxAttempts,
      baseDelay,
      maxDelay,
      factor,
      useJitter,
      error: normalizedError,
      shouldRetry,
    });

    if (decision.type === "terminal") {
      throw decision.error;
    }

    if (onRetry) {
      await onRetry(normalizedError, attempt + 1, decision.delayMs);
    }

    await sleep(decision.delayMs, { signal });
  }

  // Should not reach here, but just in case
  throw new Error("Retry failed");
}

/**
 * Default HTTP status codes considered retryable (transient/server errors).
 *
 * - 408: Request Timeout
 * - 429: Too Many Requests (rate limit)
 * - 500, 502, 503, 504: Server errors
 */
export const DEFAULT_RETRYABLE_HTTP_STATUSES: readonly number[] = [
  HTTP_REQUEST_TIMEOUT,
  HTTP_TOO_MANY_REQUESTS,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_BAD_GATEWAY,
  HTTP_SERVICE_UNAVAILABLE,
  HTTP_GATEWAY_TIMEOUT,
] as const;

/**
 * Error message/code patterns indicating transient failures.
 * Used when no HTTP status is available (e.g. network/DB errors).
 */
const RETRYABLE_ERROR_PATTERNS: readonly RegExp[] = [
  /ECONNREFUSED/i,
  /ETIMEDOUT/i,
  /ENOTFOUND/i,
  /ECONNRESET/i,
  /P1001/i,
  /P1017/i,
  /connection/i,
  /timeout/i,
  /rate limit/i,
  /429/,
  /50\d/,
  /unhandled/i, // Unexpected/unhandled errors treated as potentially transient
];

/**
 * Extract HTTP status from an error object.
 *
 * Handles various error shapes: direct status, nested error, or response.
 *
 * @param error - Error to extract status from.
 * @returns HTTP status code or undefined.
 */
export function extractHttpStatus(error: unknown): number | undefined {
  if (!isRecord(error)) {
    return;
  }

  // Direct status property
  const status = error.status;
  if (typeof status === "number") {
    return status;
  }

  // Nested error (Eden format)
  const nestedError = error.error;
  if (isRecord(nestedError) && typeof nestedError.status === "number") {
    return nestedError.status;
  }

  // Response object (fetch format)
  const response = error.response;
  return isRecord(response) && typeof response.status === "number" ? response.status : undefined;
}

/**
 * Check if an HTTP error (by status code) is retryable.
 *
 * @param status - HTTP status code.
 * @param retryableStatuses - Allowed statuses; defaults to 408, 429, 5xx.
 * @returns True when the status indicates a transient failure.
 */
export function isRetryableHttpError(
  status: number,
  retryableStatuses?: readonly number[],
): boolean {
  const allowed = retryableStatuses ?? DEFAULT_RETRYABLE_HTTP_STATUSES;
  return allowed.includes(status);
}

/**
 * Unified predicate: is this error retryable?
 *
 * Covers:
 * - HTTP errors via status (429, 5xx, configurable)
 * - Transient network/DB errors via message/code patterns
 * - Explicit retryable flag on error objects
 *
 * @param error - Error to check.
 * @param config - Optional config; retryableStatuses defaults to 408, 429, 5xx.
 * @returns True when the error suggests a retry may succeed.
 */
export function isRetryableError(
  error: unknown,
  config?: { retryableStatuses?: readonly number[] },
): boolean {
  const retryableStatuses = config?.retryableStatuses ?? DEFAULT_RETRYABLE_HTTP_STATUSES;

  // Explicit retryable flag (e.g. BaoDownNodeError)
  const withFlag = error as { retryable?: boolean };
  if (typeof withFlag?.retryable === "boolean") {
    return withFlag.retryable;
  }

  // HTTP status
  const status = extractHttpStatus(error);
  if (typeof status === "number") {
    return isRetryableHttpError(status, retryableStatuses);
  }

  // Network errors (TypeError from fetch)
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return true;
  }

  // Message/code heuristics for non-HTTP errors
  if (error instanceof Error) {
    const msg = error.message ?? "";
    const code = (error as Error & { code?: string }).code ?? "";
    const combined = `${msg} ${code}`;
    return RETRYABLE_ERROR_PATTERNS.some((re) => re.test(combined));
  }

  return false;
}

// Export sleep function aliases for convenience
/** wait constant. */
export const wait: typeof sleep = sleep;
/** delay constant. */
export const delay: typeof sleep = sleep;
