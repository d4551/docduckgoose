/**
 * Feature Health Types
 *
 * Defines type-safe models for feature-level health monitoring and aggregation.
 * Used by the dashboard and monitoring systems to track the health of individual
 * platform features (AI, Cases, Devices, Scanner, XR, etc.).
 *
 * @shared/types/feature-health.ts
 */

import { isRecord } from "./internal/record.js";

/**
 * Health state for any feature in the platform.
 *
 * Aligned with DaisyUI 5 badge color semantics for consistent UI display:
 * - `healthy` → badge-success (green)
 * - `degraded` → badge-warning (yellow)
 * - `attention` → badge-warning (yellow)
 * - `offline` → badge-error (red)
 * - `not_configured` → badge-ghost (gray)
 * - `unknown` → badge-ghost (gray)
 *
 * @example
 * ```typescript
 * const state: FeatureHealthState = 'healthy';
 * const badgeClass = `badge-${state === 'healthy' ? 'success' : 'warning'}`;
 * ```
 */
export type FeatureHealthState =
  | "healthy"
  | "degraded"
  | "attention"
  | "offline"
  | "not_configured"
  | "unknown";

/**
 * Severity level for health states, used for sorting and aggregation.
 *
 * Lower values indicate better health. Used to determine "worst" state
 * when aggregating multiple health dimensions.
 */
export const HEALTH_STATE_SEVERITY: Record<FeatureHealthState, number> = {
  healthy: 0,
  attention: 1,
  degraded: 2,
  not_configured: 3,
  offline: 4,
  unknown: 5,
};

/**
 * Feature categories for dashboard grouping.
 *
 * Features are organized into categories for logical grouping in the
 * dashboard health overview.
 */
export type FeatureCategory =
  | "core" // Cases, Reports, Notifications
  | "infrastructure" // Storage, Auth, Database
  | "ai" // AI providers, training, inference
  | "hardware" // Devices, Scanner, Calibration
  | "integration" // FHIR, BaoDown, BunBuddies
  | "media" // XR, 3D, Assets
  | "observability"; // Bao Observability (native metrics, traces, logs, alerts)

/**
 * Individual health dimension representing a specific aspect of feature health.
 *
 * Each feature can report multiple dimensions (e.g., API connectivity,
 * provider status, data freshness) that are aggregated into an overall state.
 *
 * @example
 * ```typescript
 * const dimension: HealthDimension = {
 *   key: 'nim',
 *   label: 'NVIDIA NIM',
 *   state: 'healthy',
 *   detail: 'Connected (45ms)',
 *   latencyMs: 45,
 *   checkedAt: new Date().toISOString(),
 * };
 * ```
 */
export interface HealthDimension {
  /** Unique identifier for this dimension (e.g., 'api', 'provider', 'data') */
  key: string;
  /** Human-readable label for UI display */
  label: string;
  /** Current health state of this dimension */
  state: FeatureHealthState;
  /** Optional detail string for tooltips/context */
  detail?: string;
  /** Last check timestamp (ISO 8601) */
  checkedAt: string;
  /** Optional latency in milliseconds for connectivity checks */
  latencyMs?: number;
  /** Optional error message when state is 'offline' or 'degraded' */
  error?: string;
}

/**
 * Optional KPI metrics a feature can expose for dashboard display.
 *
 * @example
 * ```typescript
 * const metrics: FeatureMetrics = {
 *   primary: { label: 'Total Cases', value: 1234 },
 *   secondary: { label: 'Pending', value: 12 },
 *   percentage: { label: 'Success Rate', value: 98.5 },
 * };
 * ```
 */
export interface FeatureMetrics {
  /** Primary count metric (e.g., total cases, online devices) */
  primary?: { label: string; value: number; unit?: string };
  /** Secondary count metric (e.g., pending cases, offline devices) */
  secondary?: { label: string; value: number; unit?: string };
  /** Percentage metric (e.g., storage usage, success rate) */
  percentage?: { label: string; value: number };
}

/**
 * Standardized health interface for all platform features.
 *
 * This is the core contract that all feature health providers must implement.
 * The dashboard consumes this interface to display unified health status
 * without needing to know feature-specific details.
 *
 * @example
 * ```typescript
 * const aiHealth: FeatureHealth = {
 *   featureId: 'ai',
 *   label: 'AI & ML',
 *   category: 'ai',
 *   state: 'healthy',
 *   summary: 'Operational',
 *   dimensions: [
 *     { key: 'nim', label: 'NVIDIA NIM', state: 'healthy', checkedAt: '...' },
 *     { key: 'providers', label: 'Providers', state: 'healthy', checkedAt: '...' },
 *   ],
 *   updatedAt: '2025-01-21T10:30:00Z',
 *   enabled: true,
 *   metrics: {
 *     primary: { label: 'Providers', value: 3 },
 *     secondary: { label: 'Active Jobs', value: 2 },
 *   },
 * };
 * ```
 */
export interface FeatureHealth {
  /** Unique feature identifier (e.g., 'ai', 'cases', 'devices', 'scanner') */
  featureId: string;
  /** Human-readable feature name for UI display */
  label: string;
  /** Category for dashboard grouping */
  category: FeatureCategory;
  /** Aggregated health state (typically worst of all dimensions) */
  state: FeatureHealthState;
  /** Summary text for badges (e.g., 'Operational', '3/5 online', 'NIM Offline') */
  summary: string;
  /** Optional detail text for tooltips */
  detail?: string;
  /** Individual health dimensions */
  dimensions: HealthDimension[];
  /** Last refresh timestamp (ISO 8601) */
  updatedAt: string;
  /** Whether the feature is enabled in configuration */
  enabled: boolean;
  /** Optional KPI metrics for dashboard display */
  metrics?: FeatureMetrics;
}

/**
 * WebSocket payload for real-time health change notifications.
 *
 * Emitted when a feature's health state changes, allowing dashboards
 * to update without polling.
 */
export interface FeatureHealthChangedPayload {
  /** Feature identifier that changed */
  featureId: string;
  /** Previous health state */
  previousState: FeatureHealthState;
  /** Current health state */
  currentState: FeatureHealthState;
  /** Full health snapshot after the change */
  health: FeatureHealth;
  /** ISO 8601 timestamp when the change was detected */
  changedAt: string;
}

/**
 * Runtime type guard for FeatureHealth objects.
 *
 * @param value - Candidate value to check
 * @returns True if value matches the FeatureHealth interface
 *
 * @example
 * ```typescript
 * const log = createLogger('feature-health');
 * if (isFeatureHealth(data)) {
 *   log.info(data.featureId, data.state);
 * }
 * ```
 */
export function isFeatureHealth(value: unknown): value is FeatureHealth {
  if (!isRecord(value)) {
    return false;
  }
  return (
    typeof value.featureId === "string" &&
    typeof value.label === "string" &&
    typeof value.category === "string" &&
    typeof value.state === "string" &&
    typeof value.summary === "string" &&
    Array.isArray(value.dimensions) &&
    typeof value.updatedAt === "string" &&
    typeof value.enabled === "boolean"
  );
}

/**
 * Runtime type guard for HealthDimension objects.
 *
 * @param value - Candidate value to check
 * @returns True if value matches the HealthDimension interface
 */
export function isHealthDimension(value: unknown): value is HealthDimension {
  if (!isRecord(value)) {
    return false;
  }
  return (
    typeof value.key === "string" &&
    typeof value.label === "string" &&
    typeof value.state === "string" &&
    typeof value.checkedAt === "string"
  );
}

/**
 * DaisyUI badge class mapping for health states.
 *
 * @param state - Feature health state
 * @returns DaisyUI badge class name
 *
 * @example
 * ```typescript
 * const badgeClass = getHealthBadgeClass('healthy'); // 'badge-success'
 * ```
 */
export function getHealthBadgeClass(state: FeatureHealthState): string {
  const map: Record<FeatureHealthState, string> = {
    healthy: "badge-success",
    degraded: "badge-warning",
    attention: "badge-warning",
    offline: "badge-error",
    not_configured: "badge-ghost",
    unknown: "badge-ghost",
  };
  return map[state];
}

/**
 * Aggregate multiple health states into a single state.
 *
 * Returns the "worst" state based on severity ordering.
 *
 * @param states - Array of health states to aggregate
 * @returns The worst (highest severity) state
 *
 * @example
 * ```typescript
 * const overall = aggregateHealthStates(['healthy', 'degraded', 'healthy']);
 * // Returns 'degraded'
 * ```
 */
export function aggregateHealthStates(states: FeatureHealthState[]): FeatureHealthState {
  if (states.length === 0) {
    return "unknown";
  }

  let worst: FeatureHealthState = "healthy";
  let worstSeverity = HEALTH_STATE_SEVERITY.healthy;

  for (const state of states) {
    const severity = HEALTH_STATE_SEVERITY[state] ?? HEALTH_STATE_SEVERITY.unknown;
    if (severity > worstSeverity) {
      worstSeverity = severity;
      worst = state;
    }
  }

  return worst;
}
