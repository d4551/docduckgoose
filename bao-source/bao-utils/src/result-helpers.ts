/**
 * Result helpers built on {@link AsyncResult} / {@link SyncResult}.
 *
 * Provides small utilities for folding, matching, and mapping results so call sites
 * can avoid `try/catch` and remain fully type-safe.
 *
 * @baohaus/bao-utils/result-helpers
 */

import type { AsyncResult, SyncResult } from "./async-result";
import { getErrorMessage, toResult, toResultSync } from "./async-result";

/**
 * Union of sync and async result types.
 *
 * T - Successful value type.
 */
export type Result<T> = AsyncResult<T> | SyncResult<T>;

/**
 * Fallback value or factory used when a result contains an error.
 *
 * T - Fallback type.
 */
export type ResultFallback<T> = T | (() => T);

function resolveFallback<T>(fallback: ResultFallback<T>): T {
  // When `T` itself is a function type, `typeof fallback === 'function'` is ambiguous.
  // We intentionally treat function fallbacks as factories.
  return typeof fallback === "function" ? (fallback as () => T)() : fallback;
}

/**
 * Fold a result into a fallback when it contains an error.
 *
 * @param result - Result to fold.
 * @param fallback - Fallback value (or factory) to use on error.
 * @returns Successful value or fallback.
 */
export function resultOrDefault<T>(result: Result<T>, fallback: ResultFallback<T>): T {
  return result.ok ? result.value : resolveFallback(fallback);
}

/**
 * Match on success or failure and return the matching handler result.
 *
 * @param result - Result to match.
 * @param handlers - Handlers for success and error branches.
 * @returns Handler return value.
 */
export function matchResult<T, R>(
  result: Result<T>,
  handlers: {
    ok: (value: T) => R;
    error: (error: unknown) => R;
  },
): R {
  return result.ok ? handlers.ok(result.value) : handlers.error(result.error);
}

/**
 * Unwrap a result, throwing when it contains an error. Optionally customize the thrown error.
 *
 * Note: Prefer {@link resultOrDefault} at application boundaries that should not throw.
 *
 * @param result - Result to unwrap.
 * @param options - Optional error factory.
 * @returns Successful value.
 * @throws When result is an error.
 */
export function resultOrThrow<T>(
  result: Result<T>,
  options?: { errorFactory?: (error: unknown) => Error },
): T {
  if (result.ok) {
    return result.value;
  }

  const error = options?.errorFactory?.(result.error) ?? new Error(getErrorMessage(result.error));

  throw error;
}

/**
 * Map the success branch of an async result without losing errors.
 *
 * @param result - Async result to map.
 * @param mapper - Mapper for the success value.
 * @returns Mapped async result.
 */
export function mapAsyncResult<T, U>(
  result: AsyncResult<T>,
  mapper: (value: T) => Promise<U> | U,
): Promise<AsyncResult<U>> {
  if (!result.ok) {
    return Promise.resolve(result as AsyncResult<U>);
  }
  return toResult(() => mapper(result.value));
}

/**
 * Map the success branch of a sync result without losing errors.
 *
 * @param result - Sync result to map.
 * @param mapper - Mapper for the success value.
 * @returns Mapped sync result.
 */
export function mapSyncResult<T, U>(result: SyncResult<T>, mapper: (value: T) => U): SyncResult<U> {
  if (!result.ok) {
    return result as SyncResult<U>;
  }
  return toResultSync(() => mapper(result.value));
}
