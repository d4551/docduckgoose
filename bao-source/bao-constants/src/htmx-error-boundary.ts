/**
 * HTMX error-boundary retry policy.
 *
 * Centralizes progressive-enhancement retry behavior for server-rendered HTMX
 * surfaces so the HTML route layer and client extension share one contract.
 *
 * @packageDocumentation
 */

/** Default retry policy for HTMX error-boundary fallbacks. */
export const HTMX_ERROR_BOUNDARY_RETRY_POLICY: {
  readonly maxRetries: 3;
  readonly retryDelayMs: 2000;
} = {
  /** Maximum manual retry attempts before the retry action disables itself. */
  maxRetries: 3,
  /** Delay between a retry click and the replayed HTMX request. */
  retryDelayMs: 2000,
} as const;
