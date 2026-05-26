/**
 * Poll until a condition is met or timeout.
 *
 * Uses recursion to avoid await-in-loop. Use for cache/status polling
 * where each check must complete before the next.
 *
 * @baohaus/bao-utils/poll-until
 */

export interface PollUntilOptions {
  /** Interval between checks in ms. */
  intervalMs: number;
  /** Maximum wait time in ms. */
  timeoutMs: number;
}

/**
 * Poll until condition returns a non-null value or timeout.
 *
 * @param condition - Async function returning value or null.
 * @param options - Poll interval and timeout.
 * @returns The first non-null value from condition.
 * @throws Error when timeout is reached.
 */
export function pollUntil<T>(
  condition: () => Promise<T | null>,
  options: PollUntilOptions,
): Promise<T> {
  const { intervalMs, timeoutMs } = options;
  const deadline = Date.now() + timeoutMs;

  async function poll(): Promise<T> {
    const value = await condition();
    if (value != null) {
      return value;
    }
    if (Date.now() >= deadline) {
      throw new Error(`Poll timeout after ${timeoutMs}ms`);
    }
    await Bun.sleep(intervalMs);
    return poll();
  }

  return poll();
}
