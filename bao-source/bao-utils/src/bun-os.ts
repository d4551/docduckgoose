/**
 * Bun-first OS utilities.
 *
 * Consolidates environment-derived and runtime-derived process metadata so module
 * consumers have one stable host boundary.
 *
 * @packageDocumentation
 */

import { readEnvStringOrNull } from "@baohaus/bao-config/env";
import { join } from "./bun-path.ts";

const MEMORY_SIZE_RE: RegExp = /^(?<amount>-?\d+(\.\d+)?)\s*(?<unit>kb|mb|gb|tb|bytes)?$/i;

/**
 * CPU accounting fields for a single logical processor.
 */
interface CpuTimes {
  /** User-mode execution time. */
  user: number;
  /** Nice-mode execution time. */
  nice: number;
  /** Kernel-mode execution time. */
  sys: number;
  /** Idle execution time. */
  idle: number;
  /** Interrupt handling execution time. */
  irq: number;
}

/**
 * Bun-native CPU metadata shaped to match Node's `os.cpus()` consumer needs.
 */
interface CpuInfo {
  /** Human-readable model name when available. */
  model: string;
  /** Approximate clock speed in MHz. */
  speed: number;
  /** Resource accounting for the CPU instance. */
  times: CpuTimes;
}

/**
 * Minimal network interface entry shape used by Bun runtime adapters.
 */
interface NetworkInterfaceEntry {
  /** Resolved IP address as text. */
  address: string;
  /** Interface netmask, if known. */
  netmask: string;
  /** Protocol family returned by discovery logic. */
  family: "IPv4" | "IPv6";
  /** When true, interface is a loopback or internal adapter. */
  internal: boolean;
}

/**
 * Minimal map shape compatible with Node's `os.networkInterfaces()` return type.
 */
type NetworkInterfaces = Record<string, NetworkInterfaceEntry[]>;

const ZERO_CPU_TIMES: CpuTimes = {
  user: 0,
  nice: 0,
  sys: 0,
  idle: 0,
  irq: 0,
};

const BYTES_IN_GIB = 1073741824;
const BYTES_PER_KB = 1024;
const KB_PER_MB = 1024;
const DEFAULT_MEMORY_PER_CPU_MULTIPLIER = 2;
const DEFAULT_MEMORY_PER_CPU_BYTES: number = DEFAULT_MEMORY_PER_CPU_MULTIPLIER * BYTES_IN_GIB;
const DEFAULT_MIN_MEMORY_MULTIPLIER = 4;
const DEFAULT_MIN_MEMORY_BYTES: number = DEFAULT_MIN_MEMORY_MULTIPLIER * BYTES_IN_GIB;
const MIN_PARALLELISM = 1;
const MEMORY_ENV_KEYS: readonly string[] = [
  "TOTAL_MEMORY_BYTES",
  "PROCESS_MEMORY_BYTES",
  "MEMORY_LIMIT_BYTES",
  "APP_MEMORY_BYTES",
  "BUN_MEMORY_BYTES",
] as const;
const PARALLELISM_ENV_KEYS: readonly string[] = [
  "BUN_PARALLELISM",
  "CPU_PARALLELISM",
  "NUMBER_OF_PROCESSORS",
] as const;

type KnownBunRuntime = {
  availableParallelism?: () => number;
  cpuCount?: () => number;
};

function toInt(value: string | undefined): number | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  const parsed = Number.parseInt(trimmed, 10);
  if (Number.isNaN(parsed)) {
    return null;
  }
  return Number.isFinite(parsed) ? parsed : null;
}

function toPositiveInteger(value: string | undefined, minValue = 1): number | null {
  const parsed = toInt(value);
  if (parsed === null) {
    return null;
  }
  if (!Number.isInteger(parsed) || parsed < minValue) {
    return null;
  }
  return parsed;
}

function resolveNumericEnvValue(keys: readonly string[]): number | null {
  for (const key of keys) {
    const value = toPositiveInteger(safeEnvValue(key), 1);
    if (value !== null) {
      return value;
    }
  }
  return null;
}

function resolveBunRuntime(): KnownBunRuntime | null {
  const runtime = globalThis as { Bun?: KnownBunRuntime };
  return runtime.Bun ?? null;
}

function normalizeByteValue(value: string | undefined): number | null {
  if (typeof value !== "string") {
    return null;
  }
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }

  const parsed = normalized.match(MEMORY_SIZE_RE);
  if (!parsed?.groups?.amount) {
    return null;
  }

  const amount = Number.parseFloat(parsed.groups.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  const scaleByUnit = parsed.groups.unit?.toLowerCase();
  switch (scaleByUnit) {
    case "tb": {
      return Math.trunc(amount * BYTES_IN_GIB * BYTES_PER_KB);
    }
    case "gb":
    case undefined: {
      return Math.trunc(amount * BYTES_IN_GIB);
    }
    case "mb": {
      return Math.trunc((amount * BYTES_IN_GIB) / BYTES_PER_KB);
    }
    case "kb": {
      return Math.trunc((amount * BYTES_IN_GIB) / (BYTES_PER_KB * KB_PER_MB));
    }
    case "bytes": {
      return Math.trunc(amount);
    }
    default: {
      return null;
    }
  }
}

function resolveTotalMemoryFromEnvironment(): number | null {
  for (const key of MEMORY_ENV_KEYS) {
    const normalized = normalizeByteValue(safeEnvValue(key));
    if (normalized !== null) {
      return normalized;
    }
  }
  return null;
}

function safeEnvValue(key: string): string | undefined {
  const value = readEnvStringOrNull(key);
  if (typeof value !== "string") {
    return;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function resolvePlatform(): string {
  if (typeof process !== "undefined" && typeof process.platform === "string") {
    return process.platform;
  }
  return "unknown";
}

function resolveArch(): string {
  if (typeof process !== "undefined" && typeof process.arch === "string") {
    return process.arch;
  }
  return "unknown";
}

function resolveHostname(): string {
  return safeEnvValue("HOSTNAME") ?? safeEnvValue("COMPUTERNAME") ?? `bun-${resolveArch()}`;
}

function resolveTmpDir(): string {
  const envTmp = safeEnvValue("TMPDIR") ?? safeEnvValue("TMP") ?? safeEnvValue("TEMP");
  if (typeof process === "undefined" || typeof process.cwd !== "function") {
    return envTmp ?? ".bun-temp";
  }
  return envTmp ?? join(process.cwd(), ".bun-temp");
}

function resolveHomeDir(): string {
  return (
    safeEnvValue("HOME") ??
    safeEnvValue("USERPROFILE") ??
    safeEnvValue("HOMEDRIVE") ??
    (typeof process !== "undefined" && typeof process.cwd === "function" ? process.cwd() : ".")
  );
}

function resolveNetworkInterfaces(): NetworkInterfaces {
  return {};
}

/**
 * Resolve CPU metadata from available environment/process signals.
 *
 * This implementation avoids hard dependency on Node's `os` module and returns
 * deterministic metadata when exact hardware introspection is unavailable.
 */
function resolveCpus(): CpuInfo[] {
  const model =
    safeEnvValue("PROCESSOR_IDENTIFIER") ??
    safeEnvValue("PROCESSOR_NAME") ??
    safeEnvValue("VENDOR") ??
    `${resolveArch()} CPU`;

  if (!model) {
    return [];
  }

  return [
    {
      model,
      speed: 0,
      times: ZERO_CPU_TIMES,
    },
  ];
}

/**
 * Current platform identifier from Bun/process runtime.
 */
export function platform(): string {
  return resolvePlatform();
}

/**
 * Current architecture identifier from Bun/process runtime.
 */
export function arch(): string {
  return resolveArch();
}

/**
 * Resolve current hostname from runtime environment.
 */
export function hostname(): string {
  return resolveHostname();
}

/**
 * Resolve temporary directory path from env/runtime.
 */
export function tmpdir(): string {
  return resolveTmpDir();
}

/**
 * Resolve home directory.
 */
export function homedir(): string {
  return resolveHomeDir();
}

/**
 * Resolve network interfaces.
 */
export function networkInterfaces(): NetworkInterfaces {
  return resolveNetworkInterfaces();
}

/**
 * Resolve CPU information in Node-like shape.
 */
export function cpus(): CpuInfo[] {
  return resolveCpus().map((cpu) => ({
    ...cpu,
    times: {
      ...cpu.times,
    },
  }));
}

/**
 * Total system memory in bytes.
 * Falls back to a conservative configured floor and CPU-count heuristic when runtime
 * introspection is unavailable.
 */
function totalmem(): number {
  const envTotal = resolveTotalMemoryFromEnvironment();
  if (envTotal !== null) {
    return envTotal;
  }

  const runtimeCpuCount = availableParallelism();
  return Math.max(DEFAULT_MIN_MEMORY_BYTES, runtimeCpuCount * DEFAULT_MEMORY_PER_CPU_BYTES);
}

/**
 * Available parallelism (CPU count). Resolves from Bun runtime hints, then env
 * and finally CPU metadata.
 */
function availableParallelism(): number {
  const bunRuntime = resolveBunRuntime();
  if (bunRuntime && typeof bunRuntime.availableParallelism === "function") {
    const resolved = bunRuntime.availableParallelism();
    const numeric = toPositiveInteger(String(resolved), MIN_PARALLELISM);
    if (numeric !== null) {
      return numeric;
    }
  }

  const envCount = resolveNumericEnvValue(PARALLELISM_ENV_KEYS);
  if (envCount !== null) {
    return envCount;
  }

  if (bunRuntime && typeof bunRuntime.cpuCount === "function") {
    const parsed = toPositiveInteger(String(bunRuntime.cpuCount()), MIN_PARALLELISM);
    if (parsed !== null) {
      return parsed;
    }
  }

  return Math.max(MIN_PARALLELISM, cpus().length);
}

/**
 * User identity shape compatible with Node's os.userInfo().
 */
export interface UserInfo {
  username: string;
  uid: number;
  gid: number;
  shell: string;
  homedir: string;
}

/**
 * Resolve user identity from environment when native os.userInfo is unavailable.
 *
 * Bun's minimal os does not include userInfo; this provides env-based fallback.
 */
function userInfo(): UserInfo {
  const username =
    safeEnvValue("USER") ?? safeEnvValue("USERNAME") ?? safeEnvValue("LOGNAME") ?? "unknown";
  const homedirPath = resolveHomeDir();
  return {
    username,
    uid: -1,
    gid: -1,
    shell: safeEnvValue("SHELL") ?? "",
    homedir: homedirPath,
  };
}

/** Bun-native OS module facade type. */
interface BunOsFacade {
  arch: typeof arch;
  availableParallelism: typeof availableParallelism;
  cpus: typeof cpus;
  hostname: typeof hostname;
  homedir: typeof homedir;
  networkInterfaces: typeof networkInterfaces;
  platform: typeof platform;
  tmpdir: typeof tmpdir;
  totalmem: typeof totalmem;
  userInfo: typeof userInfo;
}

/** Bun-native OS module facade. */
export const os: BunOsFacade = {
  arch,
  availableParallelism,
  cpus,
  hostname,
  homedir,
  networkInterfaces,
  platform,
  tmpdir,
  totalmem,
  userInfo,
};
