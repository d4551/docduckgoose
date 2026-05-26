/**
 * Sandbox usage sample — per-session live resource snapshot emitted by the
 * runtime usage sampler and consumed by dashboards / SSE consumers.
 *
 * Wire-stable shape; consumers (bao-runtime sampler, J6 dashboard, future
 * fleet aggregators) all decode the same field set so a single tick can be
 * rendered without per-consumer adapters.
 *
 * @module @baohaus/bao-sandbox-spec/usage
 */

export interface SandboxUsageSample {
  readonly sessionId: string;
  /** ISO-8601 UTC timestamp of the sample. */
  readonly ts: string;
  /** Current CPU usage in millicores (1000 = 1 core). */
  readonly cpuMilli: number;
  /** Resident memory in MiB. */
  readonly memMiB: number;
  /** Disk bytes used by the session overlay upper, in MiB. */
  readonly diskMiB: number;
  /** Live process count inside the sandbox. */
  readonly pidCount: number;
  /** Cumulative network egress bytes since session start. */
  readonly egressBytes: number;
}
