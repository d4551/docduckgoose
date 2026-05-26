/**
 * Scheduler contract — typed inputs / outputs for the bao-runtime sandbox
 * scheduler.
 *
 * Cohesion plan §4b.1 — single canonical placement contract consumed by
 * `bao-runtime/src/sandbox/manager/scheduler.ts`. The fields below mirror the
 * scheduler model in `bao-source/bao-spec/SCALING.md` §2: declared
 * requests/limits/concurrency from the manifest, live system capacity and
 * per-spawner utilisation, tenant fairness weight, and an output placement
 * decision carrying a signed grant reference.
 *
 * No actual scheduler implementation lives here — only the typed surface so
 * registry, runtime, and forge consume identical shapes via
 * `@baohaus/bao-sandbox-spec/scheduler`.
 *
 * @module @baohaus/bao-sandbox-spec/scheduler
 */

import type { BaoSandboxResources, BaoSandboxTier } from "./schema.ts";

/**
 * Spawner family identifier as declared in SCALING.md §3.
 */
export const SPAWNER_FAMILY = {
  b1: "b1",
  b2: "b2",
  b3: "b3",
  bw: "bw",
} as const;
export type SpawnerFamily = (typeof SPAWNER_FAMILY)[keyof typeof SPAWNER_FAMILY];

/**
 * Quota-field shape per SCALING.md §1: every resource carries a guaranteed
 * reservation, a hard cap, an optional short-window burst cap, and an
 * eviction policy applied on host pressure.
 */
export const EVICTION_POLICY = {
  oomKill: "oom-kill",
  throttle: "throttle",
  snapshotAndEvict: "snapshot-and-evict",
} as const;
export type EvictionPolicy = (typeof EVICTION_POLICY)[keyof typeof EVICTION_POLICY];

export interface ResourceQuotaField {
  readonly request: number;
  readonly limit: number;
  readonly burst: number | null;
  readonly evictionPolicy: EvictionPolicy;
}

/**
 * Live system capacity probed at boot and refreshed by the scheduler. Mirrors
 * `appConfig.systemCapacity` in bao-runtime.
 */
export interface SystemCapacity {
  readonly cpuMilli: number;
  readonly memMiB: number;
  readonly gpuMilli: number;
  readonly bandwidthKbps: number;
  readonly diskMiB: number;
}

/**
 * Per-spawner-family live utilisation snapshot.
 */
export interface SpawnerUtilisation {
  readonly family: SpawnerFamily;
  readonly cpuMilliInUse: number;
  readonly memMiBInUse: number;
  readonly activeReplicas: number;
  readonly queueDepth: number;
}

/**
 * Scheduler input — every field required for a single placement decision.
 */
export interface SchedulerInput {
  readonly tenantId: string;
  readonly packageId: string;
  readonly tier: BaoSandboxTier;
  readonly requests: BaoSandboxResources;
  readonly limits: BaoSandboxResources;
  readonly concurrencyLimit: number;
  readonly systemCapacity: SystemCapacity;
  readonly utilisation: readonly SpawnerUtilisation[];
  readonly tenantFairnessWeight: number;
}

/**
 * Outcome of the placement attempt. `placed` returns a signed grant reference
 * the caller exchanges for a runtime handle; `queued` returns a backpressure
 * ETA (SCALING.md §6); `rejected` carries a typed reason.
 */
export const SCHEDULER_OUTCOME = {
  placed: "placed",
  queued: "queued",
  rejected: "rejected",
} as const;
export type SchedulerOutcome = (typeof SCHEDULER_OUTCOME)[keyof typeof SCHEDULER_OUTCOME];

export const SCHEDULER_REJECT_REASON = {
  capacityExceeded: "capacity-exceeded",
  capabilityUnsatisfied: "capability-unsatisfied",
  tenantQuotaExhausted: "tenant-quota-exhausted",
  signingUnavailable: "signing-unavailable",
} as const;
export type SchedulerRejectReason =
  (typeof SCHEDULER_REJECT_REASON)[keyof typeof SCHEDULER_REJECT_REASON];

/**
 * Reference to an Ed25519-signed `CapabilityGrant` token. The grant payload
 * itself lives in the registry-issued grant store; this reference is the only
 * thing the scheduler returns.
 */
export interface SignedGrantRef {
  readonly grantId: string;
  readonly signatureAlgorithm: "ed25519";
  readonly issuedAt: string;
  readonly expiresAt: string;
}

export interface SchedulerPlacement {
  readonly outcome: typeof SCHEDULER_OUTCOME.placed;
  readonly spawner: SpawnerFamily;
  readonly replicaId: string;
  readonly grant: SignedGrantRef;
}

export interface SchedulerQueued {
  readonly outcome: typeof SCHEDULER_OUTCOME.queued;
  readonly position: number;
  readonly etaMs: number;
}

export interface SchedulerRejected {
  readonly outcome: typeof SCHEDULER_OUTCOME.rejected;
  readonly reason: SchedulerRejectReason;
}

export type SchedulerDecision = SchedulerPlacement | SchedulerQueued | SchedulerRejected;

/**
 * Snapshot dispatched by `CapacityManagerPort.subscribe` listeners. Carries
 * the system capacity, per-family utilisation, a monotonic `revision`
 * counter for dedupe, and the ISO timestamp of the sample window that
 * produced this snapshot.
 */
export interface CapacitySnapshot {
  readonly system: SystemCapacity;
  readonly families: readonly SpawnerUtilisation[];
  /** Monotonic counter; consumers dedupe by this. */
  readonly revision: number;
  /** ISO timestamp of the sample window that produced this snapshot. */
  readonly emittedAt: string;
}

/**
 * Listener invoked when `CapacityManagerPort` dispatches a new snapshot.
 * Implementations MUST emit at most one event per `sampleWindowMs` and
 * only when a watched threshold crosses.
 */
export type CapacityListener = (snapshot: CapacitySnapshot) => void;

/**
 * Live capacity broker port — implementations expose the system-wide
 * capacity snapshot and per-spawner-family utilisation derived from
 * runtime samples. The scheduler reads this every placement attempt;
 * the autoscale loop reads this every control tick.
 *
 * Cohesion plan §4b.1 — single canonical broker shape so registry,
 * bao-runtime, and any future cluster member share one wire type for
 * the capacity surface.
 */
export interface CapacityManagerPort {
  /** Latest probed system capacity (CPU / mem / GPU / bandwidth / disk). */
  getSystemCapacity(): SystemCapacity;

  /** Per-family utilisation snapshot. One entry per active SpawnerFamily. */
  getUtilisation(): readonly SpawnerUtilisation[];

  /** Single-family lookup — convenience for the autoscale loop. */
  getFamilyUtilisation(family: SpawnerFamily): SpawnerUtilisation | null;

  /**
   * Subscribe to capacity/utilisation deltas. Emits at most one event
   * per `sampleWindowMs` and only when a watched threshold crosses.
   * Returns an unsubscribe fn the caller MUST invoke on teardown.
   */
  subscribe(listener: CapacityListener): () => void;
}
