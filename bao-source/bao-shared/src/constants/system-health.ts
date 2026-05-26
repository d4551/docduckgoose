/**
 * System health monitoring env keys and defaults.
 */
import { DEFAULT_TIMEOUTS } from "./timeouts";

/**
 * Canonical environment keys for system health controls.
 */
export const SYSTEM_HEALTH_ENV_KEYS: {
  readonly enabled: "SYSTEM_HEALTH_ENABLED";
  readonly intervalMs: "SYSTEM_HEALTH_INTERVAL_MS";
  readonly loadThreshold: "SYSTEM_HEALTH_LOAD_THRESHOLD";
} = {
  enabled: "SYSTEM_HEALTH_ENABLED",
  intervalMs: "SYSTEM_HEALTH_INTERVAL_MS",
  loadThreshold: "SYSTEM_HEALTH_LOAD_THRESHOLD",
} as const;

/**
 * Shared system health defaults.
 */
export const SYSTEM_HEALTH_DEFAULTS: {
  readonly intervalMs: 30000;
  readonly cpuTempThreshold: 80;
  readonly memoryPercentThreshold: 90;
  readonly diskPercentThreshold: 85;
  readonly networkLatencyThresholdMs: 1000;
  readonly loadThreshold: 80;
  readonly maxHistorySize: 100;
} = {
  intervalMs: DEFAULT_TIMEOUTS.bunbuddyHealthcheckIntervalMs,
  cpuTempThreshold: 80,
  memoryPercentThreshold: 90,
  diskPercentThreshold: 85,
  networkLatencyThresholdMs: 1000,
  loadThreshold: 80,
  maxHistorySize: 100,
} as const;
