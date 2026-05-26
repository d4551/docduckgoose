/**
 * XR hardware snapshot response types.
 *
 * Defines the payload returned by the XR hardware snapshot endpoint, combining
 * device registry data with bunbuddy capability context for the XR lab UI.
 *
 * @shared/types/xr-hardware.ts
 */

import type { UnknownRecord } from "@baohaus/bao-types/common";
import type { XrInputProfile } from "@baohaus/bao-types/xr-session";
import type { DeviceStatusType, DeviceTypeType } from "../schemas/device.schemas.ts";
import { isRecord } from "../utils/type-guards.ts";
import type { BunBuddyCapabilitySnapshot } from "./bunbuddy-capabilities.ts";

/**
 * XR hardware device summary entry.
 */
export interface XrHardwareDevice {
  /** Device identifier. */
  id: string;
  /** Human-readable device name. */
  name: string;
  /** Canonical device type. */
  type: DeviceTypeType;
  /** Operational status label. */
  status?: DeviceStatusType | null;
  /** Whether the device is currently connected. */
  connected?: boolean;
  /** Transport or interface hint. */
  transport?: string | null;
  /** Discovery source identifier. */
  source?: string | null;
  /** Last-seen timestamp (ISO). */
  lastSeen?: string | null;
  /** Normalized capability flags. */
  capabilities?: Record<string, boolean>;
  /** Additional metadata. */
  metadata?: UnknownRecord;
}

/**
 * XR hardware snapshot payload.
 */
export interface XrHardwareSnapshot {
  /** Overall status for XR hardware availability. */
  status: "ok" | "degraded";
  /** XR-relevant devices. */
  devices: XrHardwareDevice[];
  /** Derived XR input profiles for session orchestration. */
  inputProfiles?: XrInputProfile[];
  /** BunBuddy capability snapshots. */
  bunbuddies: BunBuddyCapabilitySnapshot[];
  /** Optional notes for operators. */
  notes?: string[];
  /** Whether the payload is served from cache. */
  cached?: boolean;
  /** Snapshot timestamp (ISO). */
  timestamp: string;
}

/**
 * XR hardware snapshot API response wrapper.
 */
export interface XrHardwareSnapshotResponse {
  ok: true;
  data: XrHardwareSnapshot;
  timestamp: string;
}

/**
 * Runtime guard for {@link XrHardwareSnapshotResponse}.
 *
 * @param value - Candidate payload.
 * @returns True when the payload matches {@link XrHardwareSnapshotResponse}.
 */
export function isXrHardwareSnapshotResponse(value: unknown): value is XrHardwareSnapshotResponse {
  if (!isRecord(value)) {
    return false;
  }
  if (value.ok !== true) {
    return false;
  }
  if (typeof value.timestamp !== "string") {
    return false;
  }
  if (!isRecord(value.data)) {
    return false;
  }
  const data = value.data as UnknownRecord;
  if (data.status !== "ok" && data.status !== "degraded") {
    return false;
  }
  if (!Array.isArray(data.devices)) {
    return false;
  }
  if (!Array.isArray(data.bunbuddies)) {
    return false;
  }
  if (typeof data.timestamp !== "string") {
    return false;
  }
  return true;
}
