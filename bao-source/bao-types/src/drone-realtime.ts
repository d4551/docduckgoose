/**
 * Shared Drone Realtime Event Types
 *
 * Defines a lightweight, JSON-safe envelope for relaying drone-bunbuddy WebSocket events
 * through the Elysia `/ws/events` real-time channel.
 *
 * @shared/types/drone-realtime.ts
 */

import { isRecord } from "./internal/record.js";
import type { WsJsonValue } from "./ws-types-system.ts";

/**
 * Realtime channels emitted by the drone bunbuddy relay.
 */
export type DroneRealtimeChannel = "devices" | "telemetry";

/**
 * Canonical realtime envelope for drone bunbuddy events published on WebSocket topic `devices`.
 */
export interface DroneRealtimeMessage {
  /** Marker used for filtering mixed device events on topic `devices`. */
  kind: "drone";
  /** Source channel in the drone bunbuddy. */
  channel: DroneRealtimeChannel;
  /** BunBuddy event name (e.g. `telemetry`, `device_added`, `device_removed`). */
  event: string;
  /** JSON-safe event payload. */
  data: WsJsonValue;
  /** ISO timestamp as provided by the emitting bunbuddy. */
  timestamp: string;
  /** Optional bunbuddy base URL the server is connected to. */
  baseUrl?: string | null;
}

/**
 * Runtime guard for drone realtime messages.
 *
 * @param value - Candidate payload.
 * @returns True when value matches the expected envelope.
 */
export function isDroneRealtimeMessage(value: unknown): value is DroneRealtimeMessage {
  if (!isRecord(value)) {
    return false;
  }
  const record = value;
  if (record.kind !== "drone") {
    return false;
  }
  if (record.channel !== "devices" && record.channel !== "telemetry") {
    return false;
  }
  if (typeof record.event !== "string" || record.event.trim().length === 0) {
    return false;
  }
  if (typeof record.timestamp !== "string" || record.timestamp.trim().length === 0) {
    return false;
  }
  return "data" in record;
}
