/**
 * Managed `setInterval` execution primitive.
 *
 * Runs a single async task on a stable interval handle with:
 * - in-flight guard (overlapping ticks are dropped, not queued),
 * - normalized failure capture via `settleAsync` (no try/catch in callers),
 * - structured logger calls for success / failure / cleanup events.
 *
 * The Elysia / HTMX polling adapter lives in `@baohaus/elysia-plugins-foundation-bao`;
 * this module is the runtime-agnostic core.
 *
 * @baohaus/bao-utils/managed-interval
 */

import { settleAsync } from "./async-result";

/** Stable interval handle type used by lifecycle-managed pollers. */
export type ManagedIntervalHandle = ReturnType<typeof setInterval>;

/** Minimal structured-logger surface consumed by the interval runner. */
export interface ManagedIntervalLogger {
  readonly info: (event: string, payload?: Readonly<Record<string, unknown>>) => void;
  readonly warn: (event: string, payload?: Readonly<Record<string, unknown>>) => void;
}

/**
 * Configuration for one managed async interval tick.
 */
export interface ManagedIntervalTaskOptions<TResult> {
  /** Returns whether an interval tick is already running. */
  readonly isInFlight: () => boolean;
  /** Updates the in-flight flag around task execution. */
  readonly setInFlight: (value: boolean) => void;
  /** Structured logger for success and failure output. */
  readonly logger: ManagedIntervalLogger;
  /** Event name emitted when the task fails. */
  readonly failureEvent: string;
  /** Async work executed on the interval. */
  readonly run: () => Promise<TResult>;
  /** Optional success callback for result-specific logging. */
  readonly onSuccess?: (result: TResult) => void;
  /** Optional failure payload mapper for adding context fields. */
  readonly mapFailureData?: (error: Error) => Readonly<Record<string, unknown>>;
}

/**
 * Executes one guarded async interval tick and prevents overlapping runs.
 *
 * No-op when a previous tick is still in-flight (returns immediately).
 *
 * @param options Managed interval execution options.
 */
export const executeManagedIntervalTask = async <TResult>(
  options: ManagedIntervalTaskOptions<TResult>,
): Promise<void> => {
  if (options.isInFlight()) {
    return;
  }

  options.setInFlight(true);

  const result = await settleAsync(options.run());
  if (result.ok) {
    options.onSuccess?.(result.value);
  } else {
    const error = result.error instanceof Error ? result.error : new Error(String(result.error));
    options.logger.warn(options.failureEvent, {
      message: error.message,
      ...(options.mapFailureData?.(error) ?? {}),
    });
  }

  options.setInFlight(false);
};

/**
 * Clears a managed interval handle and returns the canonical empty value.
 *
 * @param handle Existing interval handle.
 * @returns `null` after cleanup for direct state assignment.
 */
export const clearManagedInterval = (
  handle: ManagedIntervalHandle | null,
): ManagedIntervalHandle | null => {
  if (handle) {
    clearInterval(handle);
  }
  return null;
};
