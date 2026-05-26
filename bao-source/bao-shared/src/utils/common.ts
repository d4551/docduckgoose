/**
 * Common Utility Functions
 *
 * Provides general-purpose utility functions used across both client and server
 * environments including runtime detection and promise timeout handling.
 *
 * Features:
 * - Browser/server runtime detection
 * - Promise timeout wrapper with automatic cleanup
 * - Cross-platform compatibility
 *
 * @example Runtime detection
 * ```typescript
 * if (isBrowserRuntime()) {
 *   // Browser-specific code
 *   window.localStorage.setItem('key', 'value');
 * } else {
 *   // Server-specific code
 *   runtimeEnv.KEY: string = 'value';
 * }
 * ```
 *
 * @example Promise with timeout
 * ```typescript
 * const result = await toResultAsync(
 *   withTimeout(
 *     fetchWithRetry('https://api.example.com/data', undefined, {
 *       retryOnStatus: false,
 *     }),
 *     5000,
 *   ),
 * );
 * if (result.ok) {
 *   logger.info('Success', { data: result.value });
 * } else {
 *   logger.error('Request timed out or failed', { error: result.error });
 * }
 * ```
 */

/**
 * Checks if code is running in a browser environment.
 *
 * @returns True if window and document are defined (browser), false otherwise (server)
 *
 * @description
 * Detects browser environment by checking for window and document globals.
 * Useful for conditional imports and platform-specific code paths.
 *
 * @example
 * ```typescript
 * if (isBrowserRuntime()) {
 *   // Safe to use DOM APIs
 *   document.getElementById('app');
 * }
 * ```
 */
export const isBrowserRuntime: () => boolean = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

/**
 * Executes a promise with a timeout constraint.
 *
 * T - Type of the promise result
 * @param promise - The promise to execute with timeout
 * @param timeoutMs - Timeout duration in milliseconds
 * @returns Result of the promise if completed within timeout
 * @throws If operation times out before promise resolves/rejects
 *
 * @description
 * Races the provided promise against a timeout. Automatically cleans up the
 * timeout handle regardless of which promise wins the race. Useful for adding
 * timeout constraints to operations that don't natively support them.
 *
 * @example Basic timeout usage
 * ```typescript
 * const result = await withTimeout(
 *   fetchWithRetry('https://slow-api.com', undefined, { retryOnStatus: false }),
 *   3000 // 3 second timeout
 * );
 * ```
 *
 * @example With error handling via Result pattern
 * ```typescript
 * const result = await toResultAsync(withTimeout(longRunningOperation(), 10000));
 * if (!result.ok) {
 *   const msg = getErrorMessage(result.error);
 *   logger.error(msg.includes('timed out') ? 'Request took too long' : 'Request failed', {
 *     error: result.error,
 *   });
 * }
 * ```
 */
export function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutHandle: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => reject(new Error("Operation timed out")), timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutHandle));
}
