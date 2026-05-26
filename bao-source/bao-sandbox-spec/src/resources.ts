/**
 * Resource-quota schema for `.bao` sandboxed targets.
 *
 * Cohesion plan §3.5 — every quota dimension a sandbox tier must enforce is
 * modeled as a {@link CapabilityResourceQuota} with a `request` floor, a
 * hard `limit`, and optional `burst` headroom plus an `eviction` posture.
 * The aggregate {@link CapabilityResourceSchema} pins the canonical field
 * set so every consumer (registry admission, runtime spawner, sandbox
 * cgroup writer, telemetry meter) references the same shape.
 *
 * @module @baohaus/bao-sandbox-spec/resources
 */

/** Eviction posture when a sandbox crosses {@link CapabilityResourceQuota.limit}. */
export const CAPABILITY_RESOURCE_EVICTION = {
  soft: "soft",
  hard: "hard",
  snapshot: "snapshot",
} as const;
export type CapabilityResourceEviction =
  (typeof CAPABILITY_RESOURCE_EVICTION)[keyof typeof CAPABILITY_RESOURCE_EVICTION];

/** Single resource dimension envelope shared by every quota field. */
export interface CapabilityResourceQuota {
  /** Guaranteed reservation; admission MUST refuse if unavailable. */
  readonly request: number;
  /** Hard ceiling; sandbox MUST refuse to exceed. */
  readonly limit: number;
  /** Optional headroom permitted above {@link limit} for transient bursts. */
  readonly burst?: number;
  /** Eviction posture when {@link limit} is crossed; defaults to `hard`. */
  readonly eviction?: CapabilityResourceEviction;
}

/**
 * Canonical resource-quota schema enforced per sandboxed target.
 *
 * Field semantics align with the runtime cgroup writer + Firecracker tier
 * spawner; renaming or expanding the field set requires a coordinated bump
 * across `bao-sandbox-spec`, the runtime sandbox plugin, and the OCI
 * admission controller.
 */
export interface CapabilityResourceSchema {
  /** CPU quota in millicores (1000 = one full core). */
  readonly cpuMilli: CapabilityResourceQuota;
  /** Memory quota in MiB. */
  readonly memMiB: CapabilityResourceQuota;
  /** Process count cap. */
  readonly pidLimit: CapabilityResourceQuota;
  /** Disk quota in MiB. */
  readonly diskMiB: CapabilityResourceQuota;
  /**
   * GPU quota in millicores (1000 = one full device). Optional — only
   * tier B3 advertises GPU resources; B0/B1/B2/Bw omit this field.
   */
  readonly gpuMilli?: CapabilityResourceQuota;
  /**
   * Network bandwidth quota in kilobits per second. Optional — sandbox
   * tiers without a managed network namespace omit this field.
   */
  readonly bandwidthKbps?: CapabilityResourceQuota;
  /** Maximum concurrent in-flight requests served by the target. */
  readonly concurrencyLimit: CapabilityResourceQuota;
  /** Sustained request rate in requests per second. */
  readonly requestsPerSecond: CapabilityResourceQuota;
  /** Wall-clock execution budget in milliseconds (one-shot targets). */
  readonly wallClockMs: CapabilityResourceQuota;
}
