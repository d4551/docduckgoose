/**
 * Timeout signal utility for bounded async operations.
 *
 * Provides AbortSignal with optional cleanup for environments where
 * AbortSignal.timeout may not be available.
 *
 * @packageDocumentation
 */

/**
 * Create an AbortSignal that fires after the given timeout.
 *
 * Uses AbortController + setTimeout so callers can always cancel the timer
 * after the bounded operation settles.
 *
 * @param timeoutMs - Timeout in milliseconds.
 * @returns Signal plus cleanup handler for fallback timers.
 */
export function createTimeoutSignal(timeoutMs: number): {
  signal: AbortSignal;
  cleanup: () => void;
} {
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    cleanup: () => clearTimeout(timerId),
  };
}
