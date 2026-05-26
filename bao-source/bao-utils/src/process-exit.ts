/**
 * Process exit helpers for deterministic, single-source process termination.
 *
 * The helpers intentionally set `process.exitCode` instead of calling
 * `process.exit()` directly so cleanup callbacks and async shutdown tasks
 * can complete before Node/Bun tears down the process.
 */

/**
 * Canonical exit codes used by bunbuddy/server entry points.
 */
export const PROCESS_EXIT_CODES: { readonly SUCCESS: 0; readonly FAILURE: 1 } = {
  /** Successful termination. */
  SUCCESS: 0 as const,
  /** Error termination. */
  FAILURE: 1 as const,
} as const;

/** Supported exit code values. */
export type ProcessExitCode = (typeof PROCESS_EXIT_CODES)[keyof typeof PROCESS_EXIT_CODES];

/**
 * Set the process exit code in a single, idempotent path.
 *
 * @param code - Desired exit code.
 * @returns Void after setting or retaining the final exit code.
 */
export function requestProcessExitCode(code: ProcessExitCode): void {
  if (process.exitCode === undefined) {
    process.exitCode = code;
    return;
  }

  if (process.exitCode === PROCESS_EXIT_CODES.SUCCESS && code === PROCESS_EXIT_CODES.FAILURE) {
    process.exitCode = code;
  }
}

/**
 * Normalize a signal into the canonical exit code.
 *
 * @param signal - Signal name that triggered shutdown.
 * @returns Zero for controlled signals, one for all others.
 */
export function requestProcessExitCodeFromSignal(signal: string): void {
  const exitCode =
    signal === "SIGTERM" || signal === "SIGINT"
      ? PROCESS_EXIT_CODES.SUCCESS
      : PROCESS_EXIT_CODES.FAILURE;
  requestProcessExitCode(exitCode);
}
