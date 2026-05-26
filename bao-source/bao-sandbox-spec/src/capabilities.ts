/**
 * Capability descriptor for `.bao` targets.
 *
 * A target's capabilities declare the *maximum* resource surface it may
 * touch at runtime. Sandboxes enforce these declarations; declarations
 * exceeding the allowed surface for a given isolation tier MUST fail
 * manifest validation before install.
 *
 * BaoSandbox tier ladder:
 *   B0  — same-process trusted built-ins (no isolation)
 *   B1  — bao-jail user-namespace + cgroup v2 + seccomp-BPF + Landlock
 *   B2  — bao-jail with pty + persistent overlay (interactive shell, dev sessions)
 *   B3  — Firecracker microVM (hostile / cross-tenant)
 *   Bw  — Wasmtime / WasmEdge (WASM-compiled `.bao` payloads)
 *
 * Cohesion plan §1.1 — `bao-sandbox-spec` is the single source of truth for
 * sandbox-shape contracts. The capability descriptor surface lives here;
 * consumers MUST import from `@baohaus/bao-sandbox-spec/capabilities`.
 *
 * @module @baohaus/bao-sandbox-spec/capabilities
 */

/** Filesystem capability levels. */
export const BAO_CAPABILITY_FS_LEVELS = {
  none: "none",
  readonly: "readonly",
  scoped: "scoped",
  full: "full",
} as const;
export type BaoCapabilityFsLevel =
  (typeof BAO_CAPABILITY_FS_LEVELS)[keyof typeof BAO_CAPABILITY_FS_LEVELS];

/** Network capability levels. */
export const BAO_CAPABILITY_NET_LEVELS = {
  none: "none",
  loopback: "loopback",
  egressAllowlist: "egress-allowlist",
  full: "full",
} as const;
export type BaoCapabilityNetLevel =
  (typeof BAO_CAPABILITY_NET_LEVELS)[keyof typeof BAO_CAPABILITY_NET_LEVELS];

/** BaoSandbox isolation tiers — match the runtime sandbox tier ladder. */
export const BAO_ISOLATION_TIERS = {
  b0InProcess: "B0",
  b1Jail: "B1",
  b2InteractiveJail: "B2",
  b3MicroVm: "B3",
  bwWasm: "Bw",
} as const;
export type BaoIsolationTier = (typeof BAO_ISOLATION_TIERS)[keyof typeof BAO_ISOLATION_TIERS];

const BAO_ISOLATION_TIER_VALUES: ReadonlySet<string> = new Set(Object.values(BAO_ISOLATION_TIERS));

/** Narrow an unknown string to {@link BaoIsolationTier}. */
export function isBaoIsolationTier(value: unknown): value is BaoIsolationTier {
  return typeof value === "string" && BAO_ISOLATION_TIER_VALUES.has(value);
}

/** Filesystem mount declaration for `scoped` fs capability. */
export interface BaoCapabilityFsMount {
  /** Logical name within the sandbox (e.g. "data", "tmp"). */
  readonly name: string;
  /** Mount mode. */
  readonly mode: "ro" | "rw";
  /** Maximum size in MiB. */
  readonly maxMiB: number;
}

/** Egress allowlist entry for `egress-allowlist` net capability. */
export interface BaoCapabilityNetAllowEntry {
  /** Hostname (FQDN) — wildcards forbidden. */
  readonly host: string;
  /** Port. */
  readonly port: number;
  /** Protocol. */
  readonly protocol: "tcp" | "udp" | "https";
}

/** Capability descriptor declared per target in the manifest. */
export interface BaoCapabilityDescriptor {
  /** Filesystem access level. */
  readonly fs: BaoCapabilityFsLevel;
  /** Network access level. */
  readonly net: BaoCapabilityNetLevel;
  /** Required mounts when fs === "scoped". */
  readonly mounts?: readonly BaoCapabilityFsMount[];
  /** Egress allowlist when net === "egress-allowlist". */
  readonly egress?: readonly BaoCapabilityNetAllowEntry[];
  /** CPU quota in millicores (1000 = one full core). */
  readonly cpuMilli: number;
  /** Memory quota in MiB. */
  readonly memMiB: number;
  /** Wall-clock execution budget in milliseconds (one-shot targets). */
  readonly wallMs?: number;
  /** Process count cap. */
  readonly pidLimit: number;
  /** GPU access required. */
  readonly gpu: boolean;
  /** Persistent volume access required. */
  readonly persistentVolume: boolean;
  /** Required minimum isolation tier. */
  readonly minTier: BaoIsolationTier;
}

/** Validation result for a capability descriptor. */
export type BaoCapabilityValidation =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: string; readonly field: string };

/**
 * Strength rank used by {@link tierAtLeast}. Bw shares B2's strength because
 * a wasm sandbox virtualizes syscalls entirely (capability-based) — its
 * isolation is comparable to the userland-namespace-plus-syscall-filter B2,
 * not the VM-level B3.
 */
const TIER_RANK: Readonly<Record<BaoIsolationTier, number>> = {
  B0: 0,
  B1: 1,
  B2: 2,
  Bw: 2,
  B3: 3,
};

const MAX_CAPS_BY_TIER: Readonly<
  Record<
    BaoIsolationTier,
    {
      fs: readonly BaoCapabilityFsLevel[];
      net: readonly BaoCapabilityNetLevel[];
      gpu: boolean;
      persistentVolume: boolean;
    }
  >
> = {
  B0: { fs: ["none", "readonly"], net: ["none", "loopback"], gpu: false, persistentVolume: false },
  B1: {
    fs: ["none", "readonly", "scoped"],
    net: ["none", "loopback", "egress-allowlist"],
    gpu: false,
    persistentVolume: true,
  },
  B2: {
    fs: ["none", "readonly", "scoped"],
    net: ["none", "loopback", "egress-allowlist"],
    gpu: false,
    persistentVolume: true,
  },
  B3: {
    fs: ["none", "readonly", "scoped", "full"],
    net: ["none", "loopback", "egress-allowlist", "full"],
    gpu: true,
    persistentVolume: true,
  },
  Bw: {
    fs: ["none", "readonly", "scoped"],
    net: ["none", "loopback", "egress-allowlist"],
    gpu: false,
    persistentVolume: false,
  },
};

/** Predicate: tier B is at least as strong as tier A. */
export function tierAtLeast(actual: BaoIsolationTier, required: BaoIsolationTier): boolean {
  return TIER_RANK[actual] >= TIER_RANK[required];
}

/** Validate a capability descriptor against its declared minimum tier. */
export function validateCapability(cap: BaoCapabilityDescriptor): BaoCapabilityValidation {
  const tierCaps = MAX_CAPS_BY_TIER[cap.minTier];
  if (!tierCaps.fs.includes(cap.fs)) {
    return { ok: false, reason: `fs=${cap.fs} forbidden at tier ${cap.minTier}`, field: "fs" };
  }
  if (!tierCaps.net.includes(cap.net)) {
    return { ok: false, reason: `net=${cap.net} forbidden at tier ${cap.minTier}`, field: "net" };
  }
  if (cap.gpu && !tierCaps.gpu) {
    return { ok: false, reason: `gpu requires tier B3`, field: "gpu" };
  }
  if (cap.persistentVolume && !tierCaps.persistentVolume) {
    return {
      ok: false,
      reason: `persistentVolume forbidden at tier ${cap.minTier}`,
      field: "persistentVolume",
    };
  }
  if (cap.fs === "scoped" && (cap.mounts === undefined || cap.mounts.length === 0)) {
    return { ok: false, reason: `fs=scoped requires non-empty mounts`, field: "mounts" };
  }
  if (cap.net === "egress-allowlist" && (cap.egress === undefined || cap.egress.length === 0)) {
    return { ok: false, reason: `net=egress-allowlist requires non-empty egress`, field: "egress" };
  }
  if (cap.cpuMilli <= 0) {
    return { ok: false, reason: `cpuMilli must be positive`, field: "cpuMilli" };
  }
  if (cap.memMiB <= 0) {
    return { ok: false, reason: `memMiB must be positive`, field: "memMiB" };
  }
  if (cap.pidLimit <= 0) {
    return { ok: false, reason: `pidLimit must be positive`, field: "pidLimit" };
  }
  return { ok: true };
}

/** Fs capability rank for subset comparisons. */
export const FS_LEVEL_RANK: Readonly<Record<BaoCapabilityFsLevel, number>> = {
  none: 0,
  readonly: 1,
  scoped: 2,
  full: 3,
};

/** Net capability rank for subset comparisons. */
export const NET_LEVEL_RANK: Readonly<Record<BaoCapabilityNetLevel, number>> = {
  none: 0,
  loopback: 1,
  "egress-allowlist": 2,
  full: 3,
};

/** Predicate: descriptor B grants no more than descriptor A. */
export function capabilitySubsumes(
  granted: BaoCapabilityDescriptor,
  requested: BaoCapabilityDescriptor,
): boolean {
  if (FS_LEVEL_RANK[requested.fs] > FS_LEVEL_RANK[granted.fs]) {
    return false;
  }
  if (NET_LEVEL_RANK[requested.net] > NET_LEVEL_RANK[granted.net]) {
    return false;
  }
  if (requested.gpu && !granted.gpu) {
    return false;
  }
  if (requested.persistentVolume && !granted.persistentVolume) {
    return false;
  }
  if (requested.cpuMilli > granted.cpuMilli) {
    return false;
  }
  if (requested.memMiB > granted.memMiB) {
    return false;
  }
  return tierAtLeast(granted.minTier, requested.minTier);
}
