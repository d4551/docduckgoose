/**
 * Centralized retry defaults.
 *
 * These defaults align with global configuration to avoid hardcoding
 * retry behavior in individual services.
 *
 * @shared/constants/retries
 */

/**
 * Default retry policy for AI provider requests.
 */
export const DEFAULT_AI_RETRY_CONFIG: {
  readonly provider: {
    readonly maxAttempts: 2;
    readonly baseDelayMs: 500;
    readonly maxDelayMs: 4000;
  };
  readonly stream: {
    readonly maxAttempts: 2;
    readonly baseDelayMs: 500;
    readonly maxDelayMs: 5000;
  };
} = {
  /** Standard provider request retry settings. */
  provider: {
    maxAttempts: 2,
    baseDelayMs: 500,
    maxDelayMs: 4000,
  },
  /** Streaming request retry settings. */
  stream: {
    maxAttempts: 2,
    baseDelayMs: 500,
    maxDelayMs: 5000,
  },
} as const;

/**
 * Default retry policy for local service health checks (scripts + runtime probes).
 *
 * These checks should be fast and conservative:
 * - a small number of attempts
 * - short base delay to smooth transient startup races
 * - low max delay to keep CLI feedback responsive
 */
export const DEFAULT_HEALTHCHECK_RETRY_CONFIG: {
  readonly maxAttempts: 2;
  readonly baseDelayMs: 250;
  readonly maxDelayMs: 2000;
} = {
  /** Max attempts for simple health probes (including initial attempt). */
  maxAttempts: 2,
  /** Base delay between attempts (ms). */
  baseDelayMs: 250,
  /** Maximum backoff delay cap (ms). */
  maxDelayMs: 2000,
} as const;

/**
 * Default retry policy for general exponential-backoff retries.
 *
 * Used by retry-with-backoff utility, HTTP client, and Redis connection.
 */
export const DEFAULT_BACKOFF_RETRY_CONFIG: {
  readonly retries: 3;
  readonly minTimeoutMs: 1000;
  readonly maxTimeoutMs: 30000;
  readonly factor: 2;
} = {
  /** Default retry count (total attempts = retries + 1). */
  retries: 3,
  /** Minimum delay between attempts (ms). */
  minTimeoutMs: 1000,
  /** Maximum delay cap (ms). */
  maxTimeoutMs: 30_000,
  /** Backoff multiplier applied per attempt. */
  factor: 2,
} as const;

/**
 * Default retry policy for Redis connection attempts.
 */
export const DEFAULT_REDIS_RETRY_CONFIG: {
  readonly maxRetries: 5;
  readonly minTimeoutMs: 1000;
  readonly maxTimeoutMs: 30000;
  readonly factor: 2;
} = {
  /** Maximum retry attempts for Redis connections. */
  maxRetries: 5,
  /** Minimum delay between attempts (ms). */
  minTimeoutMs: 1000,
  /** Maximum delay cap (ms). */
  maxTimeoutMs: 30_000,
  /** Backoff multiplier applied per attempt. */
  factor: 2,
} as const;

/**
 * Default retry policy for HTTP client fetch-with-retry.
 */
export const DEFAULT_HTTP_RETRY_CONFIG: { readonly timeoutMs: 30000; readonly maxAttempts: 3 } = {
  /** Default request timeout (ms). */
  timeoutMs: 30_000,
  /** Default max attempts (including initial). */
  maxAttempts: 3,
} as const;
