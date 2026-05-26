/**
 * Shared drone history DTO types.
 *
 * Re-exports contract-first types from `@baohaus/bao-schemas/*` to prevent drift
 * between:
 * - Elysia route schemas
 * - Eden treaty inference
 * - HTML hydration types
 *
 * @shared/types/drone-history
 */

import type {
  DroneEventHistoryResponse as SchemaDroneEventHistoryResponse,
  DroneEventHistoryRow as SchemaDroneEventHistoryRow,
  DroneGlobalEventHistoryResponse as SchemaDroneGlobalEventHistoryResponse,
  DroneTelemetryHistoryResponse as SchemaDroneTelemetryHistoryResponse,
  DroneTelemetryHistoryRow as SchemaDroneTelemetryHistoryRow,
} from "@baohaus/bao-schemas/drone-history.schemas";

/**
 * Persisted telemetry sample row.
 */
export type DroneTelemetryHistoryRow = SchemaDroneTelemetryHistoryRow;

/**
 * Persisted drone event log row.
 */
export type DroneEventHistoryRow = SchemaDroneEventHistoryRow;

/**
 * Telemetry history API response.
 */
export type DroneTelemetryHistoryResponse = SchemaDroneTelemetryHistoryResponse;

/**
 * Event history API response (per vehicle).
 */
export type DroneEventHistoryResponse = SchemaDroneEventHistoryResponse;

/**
 * Event history API response (global across vehicles).
 */
export type DroneGlobalEventHistoryResponse = SchemaDroneGlobalEventHistoryResponse;
