/**
 * Shared drone summary types.
 *
 * Defines normalized drone status, capabilities, and device summaries that
 * can be reused across server integration snapshots and UI surfaces.
 *
 * @shared/types/drone-summary.ts
 */

import type { BunBuddyCapabilitySnapshot } from "./bunbuddy-capabilities.ts";
import type { DroneRealtimeChannel } from "./drone-realtime.ts";

/**
 * Normalized drone health status summary.
 */
export interface DroneStatusSummary {
  status: string | null;
  service: string | null;
  version: string | null;
  protocols: string[];
  activeVehicles: number;
  cacheTtlMs: number | null;
  lastScanTime: string | null;
  pendingRequests: number | null;
  pendingWebSockets: number | null;
}

/**
 * Normalized drone capabilities summary.
 */
export interface DroneCapabilitiesSummary {
  status: string | null;
  service: string | null;
  version: string | null;
  protocols: string[];
  endpoints: string[];
  features: Record<string, boolean>;
}

/**
 * Normalized drone device summary entry.
 */
export interface DroneDeviceSummary {
  id: string | null;
  name: string | null;
  protocol: string | null;
  type: string | null;
  connectionState: string | null;
}

/**
 * Normalized realtime + history summary for drone operations.
 */
export interface DroneRealtimeSummary {
  activeChannels: DroneRealtimeChannel[];
  history: {
    enabled: boolean;
    running: boolean;
    lastFlushAt: string | null;
    lastPruneAt: string | null;
    buffer: { telemetry: number; events: number };
  };
}

/**
 * Aggregated drone summary snapshot for integration contexts.
 */
export interface DroneSummarySnapshot {
  status: DroneStatusSummary | null;
  capabilities: DroneCapabilitiesSummary | null;
  devices: DroneDeviceSummary[];
  realtime: DroneRealtimeSummary | null;
  bunbuddySnapshot: BunBuddyCapabilitySnapshot | null;
  baseUrl: string | null;
  timestamp: string;
}
