/**
 * Capability-matrix wire envelope.
 *
 * Canonical shape returned by the registry's
 * `GET /api/v1/registry/capability-matrix` endpoint. Every consumer
 * (registry HTML governance views, bao-runtime admission paths,
 * documentation generators) imports these types from
 * `@baohaus/bao-sandbox-spec/matrix` — no duplicate definitions are
 * permitted elsewhere.
 *
 * Cohesion plan §1.5 / §3.4 — the matrix surfaces:
 *
 * - declared capability tier + resource caps (sourced from each `.bao`
 *   manifest's capability descriptor),
 * - live utilization snapshot (rolling 5-minute window),
 * - rolling 7-day forecast (p50/p95 cpu/mem from longer-window
 *   aggregator). Forecast is `null` when no rolled-up samples exist.
 *
 * @module @baohaus/bao-sandbox-spec/matrix
 */

/**
 * Live utilization snapshot — short rolling window (typically 5 minutes).
 * `null` packageRef means the snapshot covers the package-wide rollup.
 */
export interface CapabilityMatrixUtilization {
  readonly cpuMilliP50: number;
  readonly cpuMilliP95: number;
  readonly memMiBP50: number;
  readonly memMiBP95: number;
  /** ISO-8601 timestamp of the most recent contributing sample. */
  readonly sampledAt: string;
}

/**
 * Rolling 7-day forecast — long-window p50/p95 utilization.
 *
 * Forecast values mirror the live snapshot's shape so consumers can render
 * them with the same components. `null` indicates the long-window
 * aggregator has not yet collected enough samples for the package.
 */
export interface CapabilityMatrixForecast {
  readonly windowDays: 7;
  readonly cpuMilliP50: number;
  readonly cpuMilliP95: number;
  readonly memMiBP50: number;
  readonly memMiBP95: number;
  /** ISO-8601 timestamp of the most recent contributing sample. */
  readonly sampledAt: string;
}

/**
 * Capability matrix entry — one row per registered `.bao` package.
 *
 * Fields are read-only; the wire envelope is canonical-JSON-friendly
 * (no `Date` objects, no `Map`, no functions).
 */
export interface CapabilityMatrixEntry {
  readonly id: string;
  readonly packageName: string;
  readonly packageVersion: string;
  readonly ociRepository: string;
  readonly packageKind: string;
  readonly canonicalBaoOutputPath: string;
  readonly runtimeInstallable: boolean;
  readonly registryRequired: boolean;
  readonly publicEntrypoints: readonly string[];
  readonly governance: CapabilityMatrixGovernance | null;
  readonly utilization: CapabilityMatrixUtilization | null;
  /**
   * Rolling 7-day forecast. `null` when no long-window aggregate exists.
   *
   * The field is part of the canonical schemaVersion 4 envelope; older
   * consumers (schemaVersion 3) that ignore unknown fields keep working
   * — the addition is strictly additive.
   */
  readonly forecast: CapabilityMatrixForecast | null;
}

/**
 * Governance block surfaced alongside each capability matrix entry.
 */
export interface CapabilityMatrixGovernance {
  readonly classification: {
    readonly channel: string;
    readonly visibility: string;
    readonly packageKind: string;
  };
  readonly runtimeInstallable: boolean;
  readonly composeDependencies: readonly string[];
  readonly publishGateProfile: string;
  readonly specRevision: string | null;
  readonly mediaType: string | null;
  readonly provenance: string | null;
  readonly sbom: string | null;
}

/**
 * Capability matrix wire envelope.
 *
 * `schemaVersion: 4` adds the per-entry `forecast` block over
 * schemaVersion 3 (which added `utilization`). The bump is additive —
 * existing entry fields keep their shape.
 */
export interface CapabilityMatrixResponse {
  readonly schemaVersion: 4;
  readonly generatedAt: string;
  readonly catalogPath: string;
  readonly entries: readonly CapabilityMatrixEntry[];
}
