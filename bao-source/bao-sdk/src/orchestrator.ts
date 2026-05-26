/**
 * Sandbox orchestrator interface for `.bao` target execution.
 *
 * The orchestrator dispatches a target's execution into the appropriate
 * BaoSandbox tier. Implementations include:
 *   - InProcessOrchestrator (B0; bao-runtime built-in)
 *   - JailOrchestrator (B1; bao-runtime + bao-jail)
 *   - InteractiveJailOrchestrator (B2; B1 + pty + persistent overlay)
 *   - MicroVmOrchestrator (B3; Firecracker)
 *   - WasmOrchestrator (Bw; Wasmtime / WasmEdge)
 *
 * SDK exposes the *interface* only — concrete implementations live in
 * bao-runtime so consumers (forge, registry) can implement custom
 * orchestrators without depending on bao-runtime internals.
 *
 * @module @baohaus/bao-sdk/orchestrator
 */

import type {
  BaoCapabilityDescriptor,
  BaoIsolationTier,
} from "@baohaus/bao-sandbox-spec/capabilities";
import type { BaoInstallTargetBase } from "./manifest.ts";

/** Tenancy identifier — opaque, stable across orchestrator restarts. */
export interface BaoTenantId {
  readonly value: string;
}

/** Workload identifier issued by the orchestrator on dispatch. */
export interface BaoWorkloadId {
  readonly value: string;
}

/** Workload kinds — match the lifecycle expected by the orchestrator. */
export const BAO_WORKLOAD_KINDS = {
  oneShot: "one-shot",
  scheduled: "scheduled",
  longRunning: "long-running",
} as const;
export type BaoWorkloadKind = (typeof BAO_WORKLOAD_KINDS)[keyof typeof BAO_WORKLOAD_KINDS];

/** Workload phases. */
export const BAO_WORKLOAD_PHASES = {
  pending: "pending",
  scheduled: "scheduled",
  running: "running",
  succeeded: "succeeded",
  failed: "failed",
  cancelled: "cancelled",
} as const;
export type BaoWorkloadPhase = (typeof BAO_WORKLOAD_PHASES)[keyof typeof BAO_WORKLOAD_PHASES];

/** Workload exit information. */
export interface BaoWorkloadExit {
  readonly code: number;
  readonly signal?: string;
  readonly reason?: string;
  readonly oomKilled: boolean;
  readonly wallMs: number;
}

/** Status snapshot for a dispatched workload. */
export interface BaoWorkloadStatus {
  readonly workload: BaoWorkloadId;
  readonly tenant: BaoTenantId;
  readonly tier: BaoIsolationTier;
  readonly phase: BaoWorkloadPhase;
  readonly startedAt?: string;
  readonly finishedAt?: string;
  readonly exit?: BaoWorkloadExit;
}

/** Stream chunk for logs/metrics from an active workload. */
export interface BaoWorkloadStreamChunk {
  readonly stream: "stdout" | "stderr" | "metric" | "trace";
  readonly timestamp: string;
  readonly data: Uint8Array;
}

/** Dispatch request — what the runtime hands the orchestrator. */
export interface BaoDispatchRequest {
  readonly tenant: BaoTenantId;
  readonly workloadKind: BaoWorkloadKind;
  readonly target: BaoInstallTargetBase;
  readonly capability: BaoCapabilityDescriptor;
  readonly archiveDigest: string;
  readonly archiveSizeBytes: number;
  readonly archiveMediaType: string;
  readonly correlationId: string;
  readonly traceparent?: string;
  readonly env: Readonly<Record<string, string>>;
  readonly schedule?: string;
}

/** Dispatch result envelope. */
export type BaoDispatchResult =
  | { readonly ok: true; readonly workload: BaoWorkloadId; readonly tier: BaoIsolationTier }
  | { readonly ok: false; readonly reason: string; readonly field?: string };

/** Cancel result envelope. */
export type BaoCancelResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: string };

/** Tenant lifecycle result envelope. */
export type BaoTenantResult =
  | { readonly ok: true; readonly tenant: BaoTenantId }
  | { readonly ok: false; readonly reason: string };

/** Capabilities advertised by an orchestrator implementation. */
export interface BaoOrchestratorCapabilities {
  readonly supportedTiers: readonly BaoIsolationTier[];
  readonly supportsScheduledWorkloads: boolean;
  readonly supportsLongRunning: boolean;
  readonly supportsGpu: boolean;
  readonly supportsPersistentVolume: boolean;
  readonly platform: "linux" | "darwin" | "windows" | "kubernetes" | "browser";
}

/**
 * Orchestrator contract.
 *
 * All methods are async, all return result envelopes (no thrown errors —
 * the runtime aggregates failures into typed dispatch reports). Orchestrator
 * implementations enforce per-tenant isolation; the runtime never bypasses
 * this surface to reach the underlying platform.
 */
export interface BaoOrchestrator {
  /** Static capability advertisement. */
  readonly capabilities: BaoOrchestratorCapabilities;

  /** Provision a tenant (cgroup root + reservation slot for B1/B2; VM pool for B3). */
  provisionTenant(tenant: BaoTenantId): Promise<BaoTenantResult>;

  /** Tear down a tenant (cascade-deletes all owned workloads). */
  decommissionTenant(tenant: BaoTenantId): Promise<BaoTenantResult>;

  /** Dispatch a workload. */
  dispatch(request: BaoDispatchRequest): Promise<BaoDispatchResult>;

  /** Cancel a running workload. */
  cancel(workload: BaoWorkloadId): Promise<BaoCancelResult>;

  /** Read a status snapshot for a workload. */
  status(workload: BaoWorkloadId): Promise<BaoWorkloadStatus>;

  /** Async-iterate status transitions until terminal phase. */
  watch(workload: BaoWorkloadId): AsyncIterable<BaoWorkloadStatus>;

  /** Async-iterate log/metric/trace chunks for a workload. */
  stream(workload: BaoWorkloadId): AsyncIterable<BaoWorkloadStreamChunk>;
}
