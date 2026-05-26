/**
 * Robotics summary API response types.
 *
 * Defines the aggregated robotics summary payload returned by
 * `GET /api/v1/robotics/summary` for UI dashboards.
 *
 * @shared/types/robotics-summary.ts
 */

import type { BunBuddyCapabilitySnapshot } from "./bunbuddy-capabilities.ts";
import { isRecord } from "./internal/record.js";

/**
 * Robotics cache summary payload.
 */
export interface RoboticsCacheSummary {
  cacheTtlMs: number | null;
  cacheAgeMs: number | null;
  lastScanTime: string | null;
  cachedDevices: number | null;
}

/**
 * Robotics bunbuddy health payload.
 */
export interface RoboticsStatusSummary {
  status: string | null;
  service: string | null;
  version: string | null;
  simulation: boolean | null;
  protocols: string[];
  activeRobots: number | null;
  cacheTtlMs: number | null;
  lastScanTime: string | null;
  timestamp: string | null;
}

/**
 * Robotics bunbuddy capabilities payload.
 */
export interface RoboticsCapabilitiesSummary {
  status: string | null;
  service: string | null;
  version: string | null;
  features: Record<string, boolean>;
  protocols: string[];
  endpoints: string[];
  cache: RoboticsCacheSummary | null;
  timestamp: string | null;
}

/**
 * Robotics bunbuddy metrics payload.
 */
export interface RoboticsMetricsSummary {
  pendingRequests: number | null;
  totalRequests: number | null;
  connectedRobots: number | null;
  totalRobots: number | null;
  cacheAgeMs: number | null;
  timestamp: string | null;
}

/**
 * Robotics device entry (normalized from bunbuddy response).
 */
export interface RoboticsDeviceSummary {
  id: string;
  name: string;
  type: string | null;
  protocol: string | null;
  status: string | null;
  connected: boolean;
  mode: string | null;
  vendor: string | null;
  model: string | null;
  capabilities: Record<string, unknown> | null;
  discovery: Record<string, unknown> | null;
  simulated: boolean;
}

/**
 * Aggregated robotics summary response payload.
 */
export interface RoboticsSummaryResponse {
  ok: true;
  data: {
    status: RoboticsStatusSummary | null;
    capabilities: RoboticsCapabilitiesSummary | null;
    metrics: RoboticsMetricsSummary | null;
    bunbuddySnapshot: BunBuddyCapabilitySnapshot | Record<string, unknown> | null;
    devices: RoboticsDeviceSummary[];
    timestamp: string;
  };
  errors: string[];
  timestamp: string;
}

function isNonEmptyTimestamp(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringErrorList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry: unknown) => typeof entry === "string");
}

function isNullableRecord(value: unknown): value is Record<string, unknown> | null | undefined {
  return value === null || value === undefined || isRecord(value);
}

function isRoboticsSummaryDataRecord(value: Record<string, unknown>): boolean {
  return (
    isNonEmptyTimestamp(value.timestamp) &&
    Array.isArray(value.devices) &&
    isNullableRecord(value.status) &&
    isNullableRecord(value.capabilities) &&
    isNullableRecord(value.metrics) &&
    isNullableRecord(value.bunbuddySnapshot)
  );
}

/**
 * Runtime guard for {@link RoboticsSummaryResponse}.
 *
 * @param value - Candidate payload.
 * @returns True when value matches {@link RoboticsSummaryResponse}.
 */
export function isRoboticsSummaryResponse(value: unknown): value is RoboticsSummaryResponse {
  return (
    isRecord(value) &&
    value.ok === true &&
    isNonEmptyTimestamp(value.timestamp) &&
    isStringErrorList(value.errors) &&
    isRecord(value.data) &&
    isRoboticsSummaryDataRecord(value.data)
  );
}
