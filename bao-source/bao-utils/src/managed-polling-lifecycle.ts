/**
 * Lifecycle controller for one non-overlapping polling task.
 *
 * Owns the start/stop semantics outside of any framework adapter — Elysia / HTMX
 * wiring lives in `@baohaus/elysia-plugins-foundation-bao` and composes this
 * primitive. Exactly-once `start()` / `stop()` is guaranteed; in-flight ticks
 * are awaited before `stop()` resolves.
 *
 * @baohaus/bao-utils/managed-polling-lifecycle
 */

import {
  clearManagedInterval,
  executeManagedIntervalTask,
  type ManagedIntervalHandle,
  type ManagedIntervalLogger,
} from "./managed-interval";

/**
 * Configuration for a lifecycle-managed polling task.
 */
export interface ManagedPollingLifecycleOptions<TResult> {
  /** Stable name registered for logging + diagnostics. */
  readonly name: string;
  /** Structured logger used for lifecycle and failure events. */
  readonly logger: ManagedIntervalLogger;
  /** Polling interval in milliseconds. */
  readonly intervalMs: number;
  /** Event emitted when the lifecycle starts. */
  readonly startedEvent: string;
  /** Event emitted when the lifecycle stops. */
  readonly stoppedEvent: string;
  /** Event emitted when one polling task fails. */
  readonly failedEvent: string;
  /** Optional startup work that must complete before polling begins. */
  readonly beforeStart?: () => Promise<void> | void;
  /** Polling task executed on every interval tick. */
  readonly run: () => Promise<TResult>;
  /** Optional result-specific success handler. */
  readonly onSuccess?: (result: TResult) => void;
  /** Optional cleanup executed after the interval has been cleared. */
  readonly afterStop?: () => Promise<void> | void;
  /** Whether to execute one immediate polling cycle during startup. */
  readonly runOnStart?: boolean;
  /** Optional failure payload mapper for adding context to error logs. */
  readonly mapFailureData?: (error: Error) => Readonly<Record<string, unknown>>;
}

/**
 * Explicit lifecycle controller for one polling task outside framework hooks.
 */
export interface ManagedPollingLifecycle {
  /** Stable lifecycle name used for logs and diagnostics. */
  readonly name: string;
  /** Starts the lifecycle exactly once. */
  start(): Promise<void>;
  /** Stops the lifecycle exactly once and waits for in-flight work. */
  stop(): Promise<void>;
}

/**
 * Creates an explicit lifecycle controller for one non-overlapping polling task.
 *
 * @param options Managed polling configuration.
 * @returns Start/stop controller for one polling task.
 */
export const createManagedPollingLifecycle = <TResult>(
  options: ManagedPollingLifecycleOptions<TResult>,
): ManagedPollingLifecycle => {
  let pollerInterval: ManagedIntervalHandle | null = null;
  let pollerInFlight = false;
  let pollerStarted = false;
  let activeRun: Promise<void> | null = null;
  let startPromise: Promise<void> | null = null;
  let stopPromise: Promise<void> | null = null;

  const runManagedTask = (): Promise<void> => {
    if (pollerInFlight && activeRun) {
      return activeRun;
    }

    const execution = executeManagedIntervalTask({
      isInFlight: () => pollerInFlight,
      setInFlight: (value) => {
        pollerInFlight = value;
      },
      logger: options.logger,
      failureEvent: options.failedEvent,
      run: options.run,
      onSuccess: options.onSuccess,
      mapFailureData: options.mapFailureData,
    });

    const trackedExecution = execution.finally(() => {
      if (activeRun === trackedExecution) {
        activeRun = null;
      }
    });
    activeRun = trackedExecution;

    return activeRun;
  };

  const start = async (): Promise<void> => {
    if (pollerStarted) {
      return;
    }
    if (startPromise) {
      return startPromise;
    }

    startPromise = (async () => {
      await options.beforeStart?.();

      pollerInterval = setInterval(() => {
        void runManagedTask();
      }, options.intervalMs);

      if (options.runOnStart !== false) {
        void runManagedTask();
      }

      options.logger.info(options.startedEvent, {
        intervalMs: options.intervalMs,
        runOnStart: options.runOnStart !== false,
      });
      pollerStarted = true;
    })().finally(() => {
      startPromise = null;
    });

    return startPromise;
  };

  const stop = async (): Promise<void> => {
    if (stopPromise) {
      return stopPromise;
    }

    stopPromise = (async () => {
      if (startPromise) {
        await startPromise;
      }
      pollerInterval = clearManagedInterval(pollerInterval);
      if (activeRun) {
        await activeRun;
      }
      pollerInFlight = false;
      if (!pollerStarted) {
        return;
      }
      await options.afterStop?.();
      options.logger.info(options.stoppedEvent);
      pollerStarted = false;
    })().finally(() => {
      stopPromise = null;
    });

    return stopPromise;
  };

  return {
    name: options.name,
    start,
    stop,
  };
};
