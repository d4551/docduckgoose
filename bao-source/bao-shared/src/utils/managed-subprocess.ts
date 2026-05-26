/**
 * Shared detached subprocess ownership for long-lived runtime services.
 *
 * Centralizes guarded Bun spawning, managed-process registry registration,
 * process-group aware signaling, descendant cleanup, and live `resourceUsage()`
 * sampling so application services and script owners use one lifecycle owner.
 *
 * @packageDocumentation
 */

import { toResultSync } from "@baohaus/bao-utils/async-result";
import { DEFAULT_TIMEOUTS } from "../constants/timeouts.ts";
import { type BunExecOptions, type BunExecResult, spawnBunCommand } from "./bun-exec.ts";
import {
  type ManagedProcessHandleRegistration,
  registerManagedProcessHandle,
} from "./managed-process-registry.ts";
import { isProcessAlive, isSignalablePid, waitForProcessExit } from "./process-liveness.ts";

const NEWLINE_RE: RegExp = /\r?\n/u;
const WHITESPACE_RE: RegExp = /\s+/u;
const MIN_PROCESS_EXIT_POLL_INTERVAL_MS = 25;

/**
 * Shared shutdown policy for managed subprocess termination.
 */
export interface ManagedSubprocessTerminationOptions {
  /** Grace period after SIGTERM before SIGKILL escalation. */
  gracefulShutdownMs?: number;
  /** Wait period after SIGKILL before reporting failure. */
  forceKillWaitMs?: number;
  /** Poll interval used while confirming process exit. */
  pollIntervalMs?: number;
}

/**
 * Shared detached managed-process handle.
 *
 * @typeParam TResult - Exit payload resolved by `waitForExit()`.
 */
export interface DetachedManagedProcessHandle<TResult = number | null> {
  /** Spawned subprocess handle. */
  process: Bun.Subprocess;
  /** Process identifier for lifecycle operations. */
  pid: number;
  /** Read live or final subprocess resource-usage data when available. */
  resourceUsage: () => ReturnType<Bun.Subprocess["resourceUsage"]>;
  /** Await process completion and return the owned exit result. */
  waitForExit: () => Promise<TResult>;
  /** Send a signal to the subprocess and its process group when possible. */
  kill: (signal?: NodeJS.Signals) => void;
  /** Terminate the subprocess tree and confirm exit. */
  terminate: (options?: ManagedSubprocessTerminationOptions) => Promise<boolean>;
}

/**
 * Canonical registration envelope for a detached managed subprocess.
 */
export interface ManagedDetachedProcessRegistration
  extends Omit<ManagedProcessHandleRegistration, "process"> {}

/**
 * Spawn request for a detached managed subprocess.
 */
export interface ManagedDetachedProcessSpawnRequest<TResult = number | null> {
  /** Persisted managed-process metadata. */
  managedProcess: ManagedDetachedProcessRegistration;
  /** Guarded Bun spawn options. */
  spawn: BunExecOptions;
  /** Optional custom exit promise owned by the caller. */
  waitForExit?: (process: Bun.Subprocess) => Promise<TResult>;
}

/**
 * Result envelope for managed detached subprocess spawning.
 */
export type ManagedDetachedProcessSpawnResult<TResult = number | null> =
  | {
      ok: true;
      handle: DetachedManagedProcessHandle<TResult>;
    }
  | {
      ok: false;
      result: BunExecResult;
    };

function getErrnoCode(error: unknown): string | undefined {
  let errno: string | undefined;
  if (error && typeof error === "object" && "code" in error) {
    const candidate = Reflect.get(error, "code");
    errno = typeof candidate === "string" ? candidate : undefined;
    return errno;
  }
  return errno;
}

function resolveTimeoutOverride(value: number | undefined, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }
  return Math.max(0, Math.floor(value));
}

function resolvePollInterval(value: number | undefined): number {
  return Math.max(
    MIN_PROCESS_EXIT_POLL_INTERVAL_MS,
    resolveTimeoutOverride(value, DEFAULT_TIMEOUTS.apiSmokeReadyPollMs),
  );
}

function parseProcessTable(stdout: string): Array<{ pid: number; ppid: number }> {
  const entries: Array<{ pid: number; ppid: number }> = [];
  const lines = stdout
    .split(NEWLINE_RE)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  for (const line of lines) {
    const [pidRaw, ppidRaw] = line.split(WHITESPACE_RE);
    const pid = Number.parseInt(pidRaw ?? "", 10);
    const ppid = Number.parseInt(ppidRaw ?? "", 10);
    if (!isSignalablePid(pid)) {
      continue;
    }
    if (!Number.isSafeInteger(ppid) || ppid < 0) {
      continue;
    }
    entries.push({ pid, ppid });
  }

  return entries;
}

function readProcessTable(): Array<{ pid: number; ppid: number }> {
  const psPath = Bun.which("ps");
  if (!psPath) {
    return [];
  }

  const result = Bun.spawnSync([psPath, "-axo", "pid,ppid"], {
    stdin: "ignore",
    stdout: "pipe",
    stderr: "ignore",
  });
  if (result.exitCode !== 0 || !result.stdout) {
    return [];
  }

  return parseProcessTable(new TextDecoder().decode(result.stdout));
}

function resolveDescendantProcessIds(rootPid: number): number[] {
  const childrenByParent = new Map<number, number[]>();
  for (const entry of readProcessTable()) {
    const children = childrenByParent.get(entry.ppid) ?? [];
    children.push(entry.pid);
    childrenByParent.set(entry.ppid, children);
  }

  const descendants: number[] = [];
  const visited = new Set<number>();
  const queue = [...(childrenByParent.get(rootPid) ?? [])];

  while (queue.length > 0) {
    const pid = queue.shift();
    if (!pid || visited.has(pid)) {
      continue;
    }
    visited.add(pid);
    descendants.push(pid);
    queue.push(...(childrenByParent.get(pid) ?? []));
  }

  return descendants;
}

function signalProcessId(pid: number, signal: NodeJS.Signals): boolean {
  if (!isSignalablePid(pid)) {
    return false;
  }
  const result = toResultSync(() => {
    process.kill(pid, signal);
  });
  if (result.ok) {
    return true;
  }

  const errno = getErrnoCode(result.error);
  if (errno === "ESRCH") {
    return false;
  }
  return false;
}

function signalProcessIds(pids: readonly number[], signal: NodeJS.Signals): number {
  let signaled = 0;
  for (const pid of pids) {
    if (signalProcessId(pid, signal)) {
      signaled += 1;
    }
  }
  return signaled;
}

function signalProcessGroup(rootPid: number, signal: NodeJS.Signals): boolean {
  if (!isSignalablePid(rootPid) || process.platform === "win32") {
    return false;
  }

  const result = toResultSync(() => {
    process.kill(-rootPid, signal);
  });
  if (result.ok) {
    return true;
  }

  const errno = getErrnoCode(result.error);
  if (errno === "ESRCH") {
    return false;
  }
  return false;
}

async function terminateDetachedProcessTree(
  processHandle: Bun.Subprocess,
  options: ManagedSubprocessTerminationOptions = {},
): Promise<boolean> {
  if (processHandle.exitCode !== null || processHandle.signalCode !== null) {
    return true;
  }

  const pid = processHandle.pid;
  if (!isSignalablePid(pid)) {
    const gracefulShutdownMs = resolveTimeoutOverride(
      options.gracefulShutdownMs,
      DEFAULT_TIMEOUTS.scriptGracefulShutdownMs,
    );
    const forceKillWaitMs = resolveTimeoutOverride(
      options.forceKillWaitMs,
      DEFAULT_TIMEOUTS.processShutdownDrainMs,
    );
    toResultSync(() => processHandle.kill("SIGTERM"));
    const exitedAfterTerm = await Promise.race([
      processHandle.exited.then(() => true),
      Bun.sleep(gracefulShutdownMs).then(() => false),
    ]);
    if (exitedAfterTerm) {
      return true;
    }

    toResultSync(() => processHandle.kill("SIGKILL"));
    return await Promise.race([
      processHandle.exited.then(() => true),
      Bun.sleep(forceKillWaitMs).then(() => false),
    ]);
  }

  if (!isProcessAlive(pid)) {
    return true;
  }

  const gracefulShutdownMs = resolveTimeoutOverride(
    options.gracefulShutdownMs,
    DEFAULT_TIMEOUTS.scriptGracefulShutdownMs,
  );
  const forceKillWaitMs = resolveTimeoutOverride(
    options.forceKillWaitMs,
    DEFAULT_TIMEOUTS.processShutdownDrainMs,
  );
  const pollIntervalMs = resolvePollInterval(options.pollIntervalMs);

  signalProcessIds(resolveDescendantProcessIds(pid), "SIGTERM");
  signalProcessGroup(pid, "SIGTERM");
  signalProcessId(pid, "SIGTERM");

  const exitedAfterTerm = await waitForProcessExit(pid, gracefulShutdownMs, pollIntervalMs);
  if (exitedAfterTerm) {
    return true;
  }

  signalProcessIds(resolveDescendantProcessIds(pid), "SIGKILL");
  signalProcessGroup(pid, "SIGKILL");
  signalProcessId(pid, "SIGKILL");

  return await waitForProcessExit(pid, forceKillWaitMs, pollIntervalMs);
}

function signalDetachedManagedProcess(processHandle: Bun.Subprocess, signal: NodeJS.Signals): void {
  if (isSignalablePid(processHandle.pid)) {
    signalProcessGroup(processHandle.pid, signal);
  }
  toResultSync(() => processHandle.kill(signal));
}

/**
 * Create a detached managed-process handle for an existing subprocess.
 *
 * @param params - Existing subprocess and optional wait-for-exit owner.
 * @returns Detached managed-process handle.
 */
export function createDetachedManagedProcessHandle<TResult = number | null>(params: {
  process: Bun.Subprocess;
  waitForExit?: (process: Bun.Subprocess) => Promise<TResult>;
}): DetachedManagedProcessHandle<TResult> {
  const waitForExit = params.waitForExit;
  return {
    process: params.process,
    pid: params.process.pid,
    resourceUsage: () => params.process.resourceUsage(),
    waitForExit: waitForExit
      ? () => waitForExit(params.process)
      : () => params.process.exited as Promise<TResult>,
    kill: (signal: NodeJS.Signals = "SIGTERM") => {
      signalDetachedManagedProcess(params.process, signal);
    },
    terminate: (options?: ManagedSubprocessTerminationOptions) =>
      terminateDetachedProcessTree(params.process, options),
  };
}

/**
 * Register an existing detached subprocess under the managed-process registry
 * and return the shared detached handle.
 *
 * @param params - Existing subprocess plus managed-process metadata.
 * @returns Shared detached managed-process handle.
 */
export async function registerDetachedManagedProcess<TResult = number | null>(params: {
  managedProcess: ManagedDetachedProcessRegistration;
  process: Bun.Subprocess;
  waitForExit?: (process: Bun.Subprocess) => Promise<TResult>;
}): Promise<DetachedManagedProcessHandle<TResult>> {
  await registerManagedProcessHandle({
    ...params.managedProcess,
    process: params.process,
  });

  return createDetachedManagedProcessHandle({
    process: params.process,
    waitForExit: params.waitForExit,
  });
}

/**
 * Spawn, register, and return a detached managed subprocess handle.
 *
 * @param params - Managed-process metadata plus guarded spawn configuration.
 * @returns Spawn result envelope.
 */
export async function spawnManagedSubprocess<TResult = number | null>(
  params: ManagedDetachedProcessSpawnRequest<TResult>,
): Promise<ManagedDetachedProcessSpawnResult<TResult>> {
  const spawnResult = spawnBunCommand({
    ...params.spawn,
    cmd: [...params.spawn.cmd],
    detached: true,
  });
  if (!spawnResult.ok) {
    return spawnResult;
  }

  const handle = await registerDetachedManagedProcess({
    managedProcess: params.managedProcess,
    process: spawnResult.process,
    waitForExit: params.waitForExit,
  });
  return { ok: true, handle };
}
