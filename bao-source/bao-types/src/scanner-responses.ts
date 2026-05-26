/**
 * Scanner API responses, device sync, and WebSocket message types.
 * Extracted from scanner.ts to keep module size under 400 lines.
 */

import type { ScanSessionRecord, ScanSessionStats } from "./scanner";

// API RESPONSES

export interface ScannerBunBuddyHealth {
  status: "ok" | "degraded" | "error";
  service: string;
  version: string;
  simulation: boolean;
  revopointAvailable: boolean;
  realsenseAvailable: boolean;
  open3dAvailable: boolean;
  bleakAvailable: boolean;
  trimeshAvailable: boolean;
  connectedScanners: number;
  connectedTurntables: number;
  activeScans: number;
  uptimeSeconds: number;
  startedAt: string;
  timestamp: string;
  features: Record<string, boolean>;
}

export interface ScannerBunBuddyCapabilities {
  status: "ok" | "degraded" | "error";
  service: string;
  version: string;
  features: Record<string, unknown>;
  supportedFormats: string[];
  endpoints: string[];
  notes: string[];
  timestamp: string;
}

export interface ScannerListResponse {
  devices: import("./scanner").ScannerInfo[];
  meta: { cached: boolean; total: number };
}

export interface TurntableListResponse {
  devices: import("./scanner").TurntableInfo[];
  meta: { cached: boolean; total: number };
}

export type ApiOkEnvelope<T> = {
  ok: true;
  data: T;
  timestamp: string;
  count?: number;
  hasMore?: boolean;
  baseUrl?: string;
} & Record<string, unknown>;

export type ScannerStatusResponse = ApiOkEnvelope<ScannerBunBuddyHealth>;
export type ScannerCapabilitiesResponse = ApiOkEnvelope<ScannerBunBuddyCapabilities>;
export type ScannerScannersResponse = ApiOkEnvelope<ScannerListResponse>;
export type ScannerTurntablesResponse = ApiOkEnvelope<TurntableListResponse>;
export type DbScanSessionsResponse = ApiOkEnvelope<{ sessions: ScanSessionRecord[] }> & {
  sessions?: ScanSessionRecord[];
};
export type DbScanSessionResponse = ApiOkEnvelope<{ session: ScanSessionRecord }> & {
  session?: ScanSessionRecord;
};
export type DbScanSessionDeleteResponse = ApiOkEnvelope<{ deleted: boolean }> & {
  deleted?: boolean;
};
export type DbScanSessionRestoreResponse = ApiOkEnvelope<{ restored: boolean }> & {
  restored?: boolean;
};
export type ScannerStatsResponse = ApiOkEnvelope<ScanSessionStats> & Partial<ScanSessionStats>;

export interface ScannerDeviceSyncSummary {
  scanners: { upserted: number; matched: number };
  turntables: { upserted: number; matched: number };
}

export interface ScannerDeviceSyncError {
  source: "scanners" | "turntables" | "db";
  error: string;
}

export interface ScannerDeviceSyncResult {
  ok: boolean;
  scannedAt: string;
  baseUrl: string | null;
  summary: ScannerDeviceSyncSummary;
  errors: ScannerDeviceSyncError[];
}

// WEBSOCKET MESSAGES

export type ScannerWsMessageType =
  | "session_state"
  | "scan_progress"
  | "frame_captured"
  | "scan_stopped"
  | "error"
  | "heartbeat";

export interface ScannerWsMessageBase {
  type: ScannerWsMessageType;
  scanId: string;
}

export interface ScannerWsProgressMessage extends ScannerWsMessageBase {
  type: "scan_progress";
  currentStep: number;
  totalSteps: number;
  framesCaptured: number;
  currentRotation?: number;
  currentTilt?: number;
  message?: string;
}

export interface ScannerWsFrameMessage extends ScannerWsMessageBase {
  type: "frame_captured";
  framesCaptured: number;
  pointCount?: number;
}

export interface ScannerWsErrorMessage extends ScannerWsMessageBase {
  type: "error";
  error: string;
}

export interface ScannerWsStoppedMessage extends ScannerWsMessageBase {
  type: "scan_stopped";
  reason: string;
}

export interface ScannerWsSessionStateMessage extends ScannerWsMessageBase {
  type: "session_state";
  status: string;
}

export interface ScannerWsHeartbeatMessage extends ScannerWsMessageBase {
  type: "heartbeat";
  timestamp: string;
}

export type ScannerWsMessage =
  | ScannerWsProgressMessage
  | ScannerWsFrameMessage
  | ScannerWsErrorMessage
  | ScannerWsStoppedMessage
  | ScannerWsSessionStateMessage
  | ScannerWsHeartbeatMessage;
