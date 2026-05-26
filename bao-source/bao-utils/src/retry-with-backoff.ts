/**
 * Retry with exponential backoff (recursive implementation).
 *
 * Avoids await-in-loop by using recursion. Use for sequential retries
 * where each attempt must complete before the next.
 *
 * @baohaus/bao-utils/retry-with-backoff
 */

import { DEFAULT_BACKOFF_RETRY_CONFIG } from "@baohaus/bao-constants/retries";
import { type ResultErrorInput, toResultAsync } from "./async-result";

/** Configuration for exponential-backoff retry behaviour (max attempts, delay bounds, and hooks). */
export interface RetryWithBackoffOptions {
  /** Maximum retry attempts (default: 3). Total attempts = retries + 1. */
  retries?: number;
  /** Minimum delay in ms (default: 1000). */
  minTimeout?: number;
  /** Maximum delay in ms (default: 30000). */
  maxTimeout?: number;
  /** Backoff multiplier (default: 2). */
  factor?: number;
  /** Callback on each retry. */
  onRetry?: (error: ResultErrorInput, attempt: number) => void;
}

/**
 * Retry an async function with exponential backoff (recursive, no loop).
 *
 * @param fn - Async function to retry.
 * @param options - Retry options.
 * @returns Resolved value on success.
 * @throws Last error when all attempts fail.
 */
export function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryWithBackoffOptions = {},
): Promise<T> {
  const {
    retries = DEFAULT_BACKOFF_RETRY_CONFIG.retries,
    minTimeout = DEFAULT_BACKOFF_RETRY_CONFIG.minTimeoutMs,
    maxTimeout = DEFAULT_BACKOFF_RETRY_CONFIG.maxTimeoutMs,
    factor = DEFAULT_BACKOFF_RETRY_CONFIG.factor,
    onRetry,
  } = options;

  async function attempt(remainingAttempts: number): Promise<T> {
    const result = await toResultAsync(fn());
    if (result.ok) {
      return result.value;
    }
    if (remainingAttempts <= 0) {
      throw result.error;
    }
    const delay = Math.min(minTimeout * factor ** (retries - remainingAttempts), maxTimeout);
    onRetry?.(result.error, retries - remainingAttempts + 1);
    await Bun.sleep(delay);
    return attempt(remainingAttempts - 1);
  }

  return attempt(retries);
}
