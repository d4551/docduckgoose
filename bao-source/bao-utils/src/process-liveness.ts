/**
 * Shared process liveness helpers.
 *
 * Treats zombie/defunct processes as exited so process-group cleanup and stale
 * lock detection do not misclassify reaped descendants that are waiting on an
 * external init process.
 *
 * @packageDocumentation
 */

import { toResultSync } from "./async-result";

const MAX_SIGNALABLE_PID = 2_147_483_647;
const MIN_PROCESS_EXIT_POLL_INTERVAL_MS = 25;

/**
 * Validate PID values before probing process state.
 *
 * @param pid - Candidate process identifier.
 * @returns True when the PID is safe to pass to native process APIs.
 */
export function isSignalablePid(pid: number): pid is number {
  return Number.isSafeInteger(pid) && pid > 0 && pid <= MAX_SIGNALABLE_PID;
}

function getErrnoCode(error: unknown): string | undefined {
  let errno: string | undefined;
  if (error && typeof error === "object" && "code" in error) {
    const candidate = Reflect.get(error, "code");
    errno = typeof candidate === "string" ? candidate : undefined;
    return errno;
  }
  return errno;
}

function readProcessState(pid: number): string | null {
  if (!isSignalablePid(pid) || process.platform === "win32") {
    return null;
  }

  const psPath = Bun.which("ps");
  if (!psPath) {
    return null;
  }

  const result = Bun.spawnSync([psPath, "-o", "stat=", "-p", String(pid)], {
    stdin: "ignore",
    stdout: "pipe",
    stderr: "ignore",
  });
  if (result.exitCode !== 0 || !result.stdout) {
    return null;
  }

  const state = new TextDecoder().decode(result.stdout).trim();
  return state.length > 0 ? state : null;
}

/**
 * Determine whether a process is a zombie/defunct entry.
 *
 * @param pid - Candidate process identifier.
 * @returns True when the process exists but is already defunct.
 */
export function isZombieProcess(pid: number): boolean {
  const state = readProcessState(pid);
  return state?.includes("Z") ?? false;
}

/**
 * Determine whether a process should be considered alive.
 *
 * Zombie/defunct entries are treated as exited even when `process.kill(pid, 0)`
 * still succeeds.
 *
 * @param pid - Process identifier to probe.
 * @returns True when the process is actively running or signalable.
 */
export function isProcessAlive(pid: number): boolean {
  if (!isSignalablePid(pid)) {
    return false;
  }

  const probe = toResultSync(() => {
    process.kill(pid, 0);
  });
  if (probe.ok) {
    return !isZombieProcess(pid);
  }

  const errno = getErrnoCode(probe.error);
  if (errno === "ESRCH") {
    return false;
  }
  if (errno === "EPERM") {
    return !isZombieProcess(pid);
  }
  return false;
}

/**
 * Wait until a process exits or a timeout elapses.
 *
 * @param pid - Process identifier to observe.
 * @param timeoutMs - Maximum wait time in milliseconds.
 * @param pollIntervalMs - Poll interval in milliseconds.
 * @returns True when the process is no longer alive before the timeout.
 */
export async function waitForProcessExit(
  pid: number,
  timeoutMs: number,
  pollIntervalMs: number = MIN_PROCESS_EXIT_POLL_INTERVAL_MS,
): Promise<boolean> {
  if (!isSignalablePid(pid)) {
    return false;
  }
  if (!isProcessAlive(pid)) {
    return true;
  }
  if (timeoutMs <= 0) {
    return !isProcessAlive(pid);
  }

  const normalizedPollInterval = Math.max(
    MIN_PROCESS_EXIT_POLL_INTERVAL_MS,
    Number.isFinite(pollIntervalMs)
      ? Math.trunc(pollIntervalMs)
      : MIN_PROCESS_EXIT_POLL_INTERVAL_MS,
  );
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (!isProcessAlive(pid)) {
      return true;
    }
    await Bun.sleep(normalizedPollInterval);
  }

  return !isProcessAlive(pid);
}
