/**
 * Shared drone realtime status DTO types.
 *
 * Re-exports contract-first types from `@baohaus/bao-schemas/*` to prevent drift.
 *
 * @shared/types/drone-realtime-status
 */

import type {
  DroneHistoryRecorderStatus as SchemaDroneHistoryRecorderStatus,
  DroneRealtimeRelayStatus as SchemaDroneRealtimeRelayStatus,
  DroneRealtimeStatusResponse as SchemaDroneRealtimeStatusResponse,
} from "@baohaus/bao-schemas/drone-realtime.schemas";

/**
 * Realtime relay status payload.
 */
export type DroneRealtimeRelayStatus = SchemaDroneRealtimeRelayStatus;

/**
 * History recorder status payload.
 */
export type DroneHistoryRecorderStatus = SchemaDroneHistoryRecorderStatus;

/**
 * `/api/v1/drone/realtime/status` response payload.
 */
export type DroneRealtimeStatusResponse = SchemaDroneRealtimeStatusResponse;
