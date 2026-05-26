/**
 * Managed process registry helpers.
 *
 * Provides a shared persisted registry for long-lived subprocess owners plus
 * process-local live handles so runtime status surfaces can combine durable
 * metadata with live Bun `resourceUsage()` samples when available.
 *
 * @shared/utils/managed-process-registry
 */

import { toResult } from "@baohaus/bao-utils/async-result";
import type {
  ManagedProcessObservedUsage,
  ManagedProcessRegistryEntry,
  ManagedProcessRegistrySnapshot,
  ManagedProcessRestartPolicy,
  ManagedProcessStartupState,
} from "../schemas/platform-runtime.schemas.ts";
import { mkdir, readdir, rm } from "./bun-fs.ts";
import { path } from "./bun-path.ts";
import { safeJsonParse } from "./safe-json-parse.ts";
import { resolveCurrentIsoTimestamp } from "./timestamp.ts";

/**
 * Root-relative directory used for persisted managed process entries.
 */
export const MANAGED_PROCESS_REGISTRY_DIR: "run/managed-processes" =
  "run/managed-processes" as const;

/**
 * Exit-retention policy for registered managed processes.
 */
export type ManagedProcessExitPolicy = "retain" | "remove";

/**
 * Live managed process handle stored inside the current Bun process.
 */
export interface LiveManagedProcessHandle {
  /** Canonical managed-process id. */
  id: string;
  /** Workspace root used for persisted registry state. */
  rootDir: string;
  /** Spawned subprocess handle. */
  process: Bun.Subprocess;
  /** Live resource-usage sampler for the handle. */
  resourceUsage: () => ReturnType<Bun.Subprocess["resourceUsage"]>;
}

/**
 * Registration parameters for a long-lived managed subprocess.
 */
export interface ManagedProcessHandleRegistration {
  /** Workspace root used for persisted registry state. */
  rootDir: string;
  /** Canonical managed-process id. */
  id: string;
  /** Human-readable process name for UI/status tables. */
  name: string;
  /** Logical owner responsible for this subprocess. */
  owner: string;
  /** Human-readable purpose token. */
  purpose: string;
  /** Canonical command vector. */
  command: string[];
  /** Working directory used for the subprocess. */
  cwd?: string | null;
  /** Process mode. */
  mode: ManagedProcessRegistryEntry["mode"];
  /** Startup state reported at registration time. */
  startupState?: ManagedProcessStartupState;
  /** Restart policy for this subprocess. */
  restartPolicy?: ManagedProcessRestartPolicy;
  /** Whether the process already requires restart. */
  restartRequired?: boolean;
  /** Optional initial error state. */
  lastError?: string | null;
  /** Optional detail string for status surfaces. */
  details?: string | null;
  /** Process handle. */
  process: Bun.Subprocess;
  /** Whether the registry entry should be retained after exit. */
  onExit?: ManagedProcessExitPolicy;
}

type LiveManagedProcessRecord = {
  handle: LiveManagedProcessHandle;
  onExit: ManagedProcessExitPolicy;
  exitMonitor: Promise<void>;
};

const liveManagedProcesses: Map<string, LiveManagedProcessRecord> = new Map<
  string,
  LiveManagedProcessRecord
>();

function resolveRegistryKey(rootDir: string, id: string): string {
  return `${rootDir}::${id}`;
}

function encodeManagedProcessFileName(id: string): string {
  return Buffer.from(id, "utf8").toString("base64url");
}

/**
 * Resolve the managed-process registry directory for a workspace.
 *
 * @param rootDir - Workspace root directory.
 * @returns Absolute registry directory path.
 */
export function resolveManagedProcessRegistryDirectory(rootDir: string): string {
  return path.join(rootDir, MANAGED_PROCESS_REGISTRY_DIR);
}

/**
 * Resolve the persisted file path for a managed-process id.
 *
 * @param rootDir - Workspace root directory.
 * @param id - Canonical managed-process id.
 * @returns Absolute entry file path.
 */
export function resolveManagedProcessRegistryEntryPath(rootDir: string, id: string): string {
  return path.join(
    resolveManagedProcessRegistryDirectory(rootDir),
    `${encodeManagedProcessFileName(id)}.json`,
  );
}

function buildManagedProcessObservedUsage(
  usage: ReturnType<Bun.Subprocess["resourceUsage"]> | undefined,
): ManagedProcessObservedUsage {
  const normalizeIntegerMetric = (value: unknown): number | null => {
    if (typeof value === "number") {
      return Number.isInteger(value) && value >= 0 ? value : null;
    }

    if (typeof value === "bigint") {
      if (value < 0n) {
        return null;
      }
      const maxSafeInteger = BigInt(Number.MAX_SAFE_INTEGER);
      return Number(value > maxSafeInteger ? maxSafeInteger : value);
    }

    return null;
  };

  if (!usage) {
    return {
      sampledAt: resolveCurrentIsoTimestamp(),
      sampleSource: "none",
      stale: true,
      cpuPercent: null,
      memoryPercent: null,
      residentSetKb: null,
      maxResidentSetBytes: null,
      cpuTimeUserMicros: null,
      cpuTimeSystemMicros: null,
      cpuTimeTotalMicros: null,
    };
  }

  return {
    sampledAt: resolveCurrentIsoTimestamp(),
    sampleSource: "live",
    stale: false,
    cpuPercent: null,
    memoryPercent: null,
    residentSetKb: null,
    maxResidentSetBytes: normalizeIntegerMetric(usage.maxRSS),
    cpuTimeUserMicros: normalizeIntegerMetric(usage.cpuTime.user),
    cpuTimeSystemMicros: normalizeIntegerMetric(usage.cpuTime.system),
    cpuTimeTotalMicros: normalizeIntegerMetric(usage.cpuTime.total),
  };
}

async function readManagedProcessSnapshotFile(
  filePath: string,
): Promise<ManagedProcessRegistrySnapshot | null> {
  const file = Bun.file(filePath);
  if (!(await file.exists())) {
    return null;
  }

  const parsed = safeJsonParse<ManagedProcessRegistrySnapshot>(await file.text());
  if (!(parsed && isManagedProcessRegistrySnapshot(parsed))) {
    return null;
  }

  return parsed;
}

function isOptionalIsoTimestamp(value: unknown): value is string | null {
  return value === null || (typeof value === "string" && value.trim().length > 0);
}

function isManagedProcessObservedUsageValue(value: unknown): value is ManagedProcessObservedUsage {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Partial<ManagedProcessObservedUsage>;
  return (
    isOptionalIsoTimestamp(candidate.sampledAt) &&
    typeof candidate.sampleSource === "string" &&
    typeof candidate.stale === "boolean" &&
    (candidate.cpuPercent === null ||
      candidate.cpuPercent === undefined ||
      typeof candidate.cpuPercent === "number") &&
    (candidate.memoryPercent === null ||
      candidate.memoryPercent === undefined ||
      typeof candidate.memoryPercent === "number") &&
    (candidate.residentSetKb === null ||
      candidate.residentSetKb === undefined ||
      (typeof candidate.residentSetKb === "number" &&
        Number.isInteger(candidate.residentSetKb) &&
        candidate.residentSetKb >= 0)) &&
    (candidate.maxResidentSetBytes === null ||
      candidate.maxResidentSetBytes === undefined ||
      (typeof candidate.maxResidentSetBytes === "number" &&
        Number.isInteger(candidate.maxResidentSetBytes) &&
        candidate.maxResidentSetBytes >= 0)) &&
    (candidate.cpuTimeUserMicros === null ||
      candidate.cpuTimeUserMicros === undefined ||
      (typeof candidate.cpuTimeUserMicros === "number" &&
        Number.isInteger(candidate.cpuTimeUserMicros) &&
        candidate.cpuTimeUserMicros >= 0)) &&
    (candidate.cpuTimeSystemMicros === null ||
      candidate.cpuTimeSystemMicros === undefined ||
      (typeof candidate.cpuTimeSystemMicros === "number" &&
        Number.isInteger(candidate.cpuTimeSystemMicros) &&
        candidate.cpuTimeSystemMicros >= 0)) &&
    (candidate.cpuTimeTotalMicros === null ||
      candidate.cpuTimeTotalMicros === undefined ||
      (typeof candidate.cpuTimeTotalMicros === "number" &&
        Number.isInteger(candidate.cpuTimeTotalMicros) &&
        candidate.cpuTimeTotalMicros >= 0))
  );
}

function isManagedProcessRegistryEntryValue(value: unknown): value is ManagedProcessRegistryEntry {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Partial<ManagedProcessRegistryEntry>;
  return (
    typeof candidate.id === "string" &&
    candidate.id.trim().length > 0 &&
    typeof candidate.name === "string" &&
    candidate.name.trim().length > 0 &&
    typeof candidate.owner === "string" &&
    candidate.owner.trim().length > 0 &&
    typeof candidate.purpose === "string" &&
    candidate.purpose.trim().length > 0 &&
    Array.isArray(candidate.command) &&
    candidate.command.every((token) => typeof token === "string" && token.trim().length > 0) &&
    (candidate.cwd === null ||
      candidate.cwd === undefined ||
      (typeof candidate.cwd === "string" && candidate.cwd.trim().length > 0)) &&
    (candidate.pid === null ||
      candidate.pid === undefined ||
      (typeof candidate.pid === "number" &&
        Number.isInteger(candidate.pid) &&
        candidate.pid > 0)) &&
    typeof candidate.state === "string" &&
    typeof candidate.mode === "string" &&
    typeof candidate.startupState === "string" &&
    isOptionalIsoTimestamp(candidate.startedAt) &&
    isOptionalIsoTimestamp(candidate.lastSeenAt) &&
    isOptionalIsoTimestamp(candidate.lastRestartAt) &&
    (candidate.exitCode === null ||
      candidate.exitCode === undefined ||
      (typeof candidate.exitCode === "number" && Number.isInteger(candidate.exitCode))) &&
    (candidate.signalCode === null ||
      candidate.signalCode === undefined ||
      typeof candidate.signalCode === "string") &&
    typeof candidate.restartCount === "number" &&
    Number.isInteger(candidate.restartCount) &&
    candidate.restartCount >= 0 &&
    typeof candidate.restartPolicy === "string" &&
    typeof candidate.restartRequired === "boolean" &&
    (candidate.lastError === null ||
      candidate.lastError === undefined ||
      typeof candidate.lastError === "string") &&
    (candidate.details === null ||
      candidate.details === undefined ||
      typeof candidate.details === "string") &&
    (candidate.resourceUsage === null ||
      candidate.resourceUsage === undefined ||
      isManagedProcessObservedUsageValue(candidate.resourceUsage))
  );
}

function isManagedProcessRegistrySnapshot(value: unknown): value is ManagedProcessRegistrySnapshot {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Partial<ManagedProcessRegistrySnapshot>;
  return (
    candidate.version === 1 &&
    typeof candidate.updatedAt === "string" &&
    candidate.updatedAt.trim().length > 0 &&
    isManagedProcessRegistryEntryValue(candidate.process)
  );
}

async function writeManagedProcessSnapshotFile(
  rootDir: string,
  entry: ManagedProcessRegistryEntry,
): Promise<ManagedProcessRegistryEntry> {
  const registryDirectory = resolveManagedProcessRegistryDirectory(rootDir);
  await mkdir(registryDirectory, { recursive: true });
  const snapshot: ManagedProcessRegistrySnapshot = {
    version: 1,
    updatedAt: resolveCurrentIsoTimestamp(),
    process: entry,
  };
  await Bun.write(
    resolveManagedProcessRegistryEntryPath(rootDir, entry.id),
    `${JSON.stringify(snapshot, null, 2)}\n`,
  );
  return entry;
}

function createManagedProcessExitMonitor(
  registration: ManagedProcessHandleRegistration,
  registryKey: string,
  trackedPid: number,
): Promise<void> {
  return registration.process.exited.then(
    (exitCode) => handleManagedProcessExit(registration, registryKey, trackedPid, exitCode),
    () => undefined,
  );
}

async function handleManagedProcessExit(
  registration: ManagedProcessHandleRegistration,
  registryKey: string,
  trackedPid: number,
  exitCode: number | null,
): Promise<void> {
  await toResult(() => persistProcessExitState(registration, registryKey, trackedPid, exitCode));
}

function mergeManagedProcessEntry(params: {
  existing: ManagedProcessRegistryEntry | null;
  incoming: ManagedProcessRegistryEntry;
}): ManagedProcessRegistryEntry {
  const now = resolveCurrentIsoTimestamp();
  const existing = params.existing;
  const incoming = params.incoming;
  const restarted =
    existing !== null &&
    existing.pid !== null &&
    incoming.pid !== null &&
    existing.pid !== incoming.pid;

  return {
    ...incoming,
    restartCount: restarted
      ? existing.restartCount + 1
      : (existing?.restartCount ?? incoming.restartCount),
    lastRestartAt: restarted ? now : (incoming.lastRestartAt ?? existing?.lastRestartAt ?? null),
    startedAt: incoming.startedAt ?? existing?.startedAt ?? now,
    lastSeenAt: incoming.lastSeenAt ?? now,
    exitCode: incoming.exitCode ?? existing?.exitCode ?? null,
    signalCode: incoming.signalCode ?? existing?.signalCode ?? null,
    lastError: incoming.lastError ?? existing?.lastError ?? null,
    resourceUsage: incoming.resourceUsage ?? existing?.resourceUsage ?? null,
  };
}

/**
 * List persisted managed-process entries for a workspace.
 *
 * @param rootDir - Workspace root directory.
 * @returns Canonical managed-process entries sorted by owner then id.
 */
export async function readManagedProcessRegistryEntries(
  rootDir: string,
): Promise<ManagedProcessRegistryEntry[]> {
  const registryDirectory = resolveManagedProcessRegistryDirectory(rootDir);
  const directoryEntries = await toResult(() => readdir(registryDirectory, { onlyFiles: true }));
  if (!directoryEntries.ok) {
    return [];
  }

  const fileNames = directoryEntries.value as string[];
  const entries: ManagedProcessRegistryEntry[] = [];
  for (const fileName of fileNames.sort()) {
    if (!fileName.endsWith(".json") || path.basename(fileName).startsWith("._")) {
      continue;
    }
    const snapshot = await readManagedProcessSnapshotFile(path.join(registryDirectory, fileName));
    if (snapshot) {
      entries.push(snapshot.process);
    }
  }

  return entries.sort((left, right) =>
    left.owner === right.owner
      ? left.id.localeCompare(right.id)
      : left.owner.localeCompare(right.owner),
  );
}

/**
 * Read one managed-process entry from the persisted registry.
 *
 * @param rootDir - Workspace root directory.
 * @param id - Canonical managed-process id.
 * @returns Entry when present.
 */
export async function readManagedProcessRegistryEntry(
  rootDir: string,
  id: string,
): Promise<ManagedProcessRegistryEntry | null> {
  const snapshot = await readManagedProcessSnapshotFile(
    resolveManagedProcessRegistryEntryPath(rootDir, id),
  );
  return snapshot?.process ?? null;
}

/**
 * Persist or update a managed-process registry entry.
 *
 * @param rootDir - Workspace root directory.
 * @param entry - Entry to persist.
 * @returns Canonical persisted entry.
 */
export async function upsertManagedProcessRegistryEntry(
  rootDir: string,
  entry: ManagedProcessRegistryEntry,
): Promise<ManagedProcessRegistryEntry> {
  const existing = await readManagedProcessRegistryEntry(rootDir, entry.id);
  const merged = mergeManagedProcessEntry({
    existing,
    incoming: entry,
  });
  return await writeManagedProcessSnapshotFile(rootDir, merged);
}

/**
 * Patch a managed-process entry when it already exists.
 *
 * @param rootDir - Workspace root directory.
 * @param id - Canonical managed-process id.
 * @param patch - Partial patch to apply.
 * @returns Updated entry or `null` when the entry does not exist.
 */
export async function patchManagedProcessRegistryEntry(
  rootDir: string,
  id: string,
  patch: Partial<ManagedProcessRegistryEntry>,
): Promise<ManagedProcessRegistryEntry | null> {
  const existing = await readManagedProcessRegistryEntry(rootDir, id);
  if (!existing) {
    return null;
  }

  const next: ManagedProcessRegistryEntry = {
    ...existing,
    ...patch,
    id: existing.id,
    name: patch.name ?? existing.name,
    owner: patch.owner ?? existing.owner,
    purpose: patch.purpose ?? existing.purpose,
    command: patch.command ? [...patch.command] : [...existing.command],
    lastSeenAt: patch.lastSeenAt ?? resolveCurrentIsoTimestamp(),
  };

  return await writeManagedProcessSnapshotFile(rootDir, next);
}

/**
 * Remove a managed-process entry from the persisted registry.
 *
 * @param rootDir - Workspace root directory.
 * @param id - Canonical managed-process id.
 */
export async function removeManagedProcessRegistryEntry(
  rootDir: string,
  id: string,
): Promise<void> {
  liveManagedProcesses.delete(resolveRegistryKey(rootDir, id));
  await rm(resolveManagedProcessRegistryEntryPath(rootDir, id), { force: true });
}

/**
 * Mark a managed process as ready.
 *
 * @param rootDir - Workspace root directory.
 * @param id - Canonical managed-process id.
 * @returns Updated entry when present.
 */
export async function markManagedProcessReady(
  rootDir: string,
  id: string,
): Promise<ManagedProcessRegistryEntry | null> {
  return await patchManagedProcessRegistryEntry(rootDir, id, {
    state: "active",
    startupState: "ready",
    restartRequired: false,
    lastError: null,
    lastSeenAt: resolveCurrentIsoTimestamp(),
  });
}

/**
 * Mark a managed process as requiring restart.
 *
 * @param rootDir - Workspace root directory.
 * @param id - Canonical managed-process id.
 * @param lastError - Optional restart-required error detail.
 * @returns Updated entry when present.
 */
export async function markManagedProcessRestartRequired(
  rootDir: string,
  id: string,
  lastError?: string | null,
): Promise<ManagedProcessRegistryEntry | null> {
  return await patchManagedProcessRegistryEntry(rootDir, id, {
    restartRequired: true,
    lastError: lastError ?? null,
    lastSeenAt: resolveCurrentIsoTimestamp(),
  });
}

/**
 * Register a live managed subprocess and persist its initial entry.
 *
 * @param registration - Registration parameters.
 * @returns Canonical persisted entry.
 */
export async function registerManagedProcessHandle(
  registration: ManagedProcessHandleRegistration,
): Promise<ManagedProcessRegistryEntry> {
  const now = resolveCurrentIsoTimestamp();
  const entry: ManagedProcessRegistryEntry = {
    id: registration.id,
    name: registration.name,
    owner: registration.owner,
    purpose: registration.purpose,
    command: [...registration.command],
    cwd: registration.cwd ?? null,
    pid: registration.process.pid,
    state: "active",
    mode: registration.mode,
    startupState: registration.startupState ?? "ready",
    startedAt: now,
    lastSeenAt: now,
    lastRestartAt: null,
    exitCode: null,
    signalCode: null,
    restartCount: 0,
    restartPolicy: registration.restartPolicy ?? "manual",
    restartRequired: registration.restartRequired ?? false,
    lastError: registration.lastError ?? null,
    details: registration.details ?? null,
    resourceUsage: buildManagedProcessObservedUsage(registration.process.resourceUsage()),
  };

  const persisted = await upsertManagedProcessRegistryEntry(registration.rootDir, entry);
  const registryKey = resolveRegistryKey(registration.rootDir, registration.id);
  const liveHandle: LiveManagedProcessHandle = {
    id: registration.id,
    rootDir: registration.rootDir,
    process: registration.process,
    resourceUsage: () => registration.process.resourceUsage(),
  };
  const trackedPid = registration.process.pid;

  liveManagedProcesses.set(registryKey, {
    handle: liveHandle,
    onExit: registration.onExit ?? "retain",
    exitMonitor: createManagedProcessExitMonitor(registration, registryKey, trackedPid),
  });

  return persisted;
}

/**
 * Persist process exit state by cleaning up the live map and patching or
 * removing the on-disk registry entry.
 *
 * @param registration - Original registration parameters.
 * @param registryKey - Composite live-map key.
 * @param trackedPid - PID captured at registration time.
 * @param exitCode - Exit code from the exited promise.
 */
async function persistProcessExitState(
  registration: ManagedProcessHandleRegistration,
  registryKey: string,
  trackedPid: number,
  exitCode: number | null,
): Promise<void> {
  const current = liveManagedProcesses.get(registryKey);
  if (current && current.handle.process.pid === trackedPid) {
    liveManagedProcesses.delete(registryKey);
  }

  const latest = await readManagedProcessRegistryEntry(registration.rootDir, registration.id);
  if (!latest || latest.pid !== trackedPid) {
    return;
  }

  if ((registration.onExit ?? "retain") === "remove") {
    await removeManagedProcessRegistryEntry(registration.rootDir, registration.id);
    return;
  }

  const nextStartupState: ManagedProcessStartupState =
    exitCode === 0 && registration.process.signalCode === null ? "stopped" : "failed";
  const signalSuffix = registration.process.signalCode
    ? ` (${registration.process.signalCode})`
    : "";
  await patchManagedProcessRegistryEntry(registration.rootDir, registration.id, {
    state: "inactive",
    startupState: nextStartupState,
    exitCode,
    signalCode: registration.process.signalCode,
    lastSeenAt: resolveCurrentIsoTimestamp(),
    restartRequired:
      nextStartupState === "failed" && (registration.restartPolicy ?? "manual") !== "never",
    lastError:
      nextStartupState === "failed" ? `Process exited with code ${exitCode}${signalSuffix}` : null,
  });
}

/**
 * List live managed subprocess handles owned by the current Bun process.
 *
 * @param rootDir - Optional workspace root filter.
 * @returns Live managed subprocess handles.
 */
export function listLiveManagedProcessHandles(rootDir?: string): LiveManagedProcessHandle[] {
  const handles: LiveManagedProcessHandle[] = [];
  for (const record of liveManagedProcesses.values()) {
    if (rootDir && record.handle.rootDir !== rootDir) {
      continue;
    }
    handles.push(record.handle);
  }
  return handles.sort((left, right) => left.id.localeCompare(right.id));
}
