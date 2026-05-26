/**
 * Scanner bunbuddy type definitions.
 *
 * Defines TypeScript types for the 3D scanner bunbuddy API, including
 * scanner/turntable discovery, scan sessions, processing, and export.
 *
 * @shared/types/scanner.ts
 */

// ENUMS

/**
 * Supported scanner models.
 */
export type ScannerModel = "POP" | "MINI" | "RANGE" | "MetroX" | "MetroY" | "unknown";

/**
 * Scanner connection status.
 */
export type ScannerStatus = "disconnected" | "connecting" | "connected" | "scanning" | "error";

/**
 * Turntable connection status.
 */
export type TurntableStatus =
  | "disconnected"
  | "connecting"
  | "connected"
  | "moving"
  | "idle"
  | "error";

/**
 * Scan session status.
 */
export type ScanSessionStatus = "active" | "scanning" | "completed" | "error";

/**
 * Supported export formats.
 */
export type ExportFormat = "ply" | "obj" | "stl" | "gltf" | "glb";

/**
 * Processing algorithm types.
 */
export type ProcessingAlgorithm = "poisson" | "ball_pivoting";

// SCANNER INFO

/**
 * Scanner device information.
 */
export interface ScannerInfo {
  id: string;
  name?: string;
  model: string;
  firmwareVersion?: string;
  ipAddress?: string;
  status: ScannerStatus;
  simulated: boolean;
  capabilities?: Record<string, unknown>;
}

/**
 * Scanner capabilities.
 */
export interface ScannerCapabilities {
  depthCamera: boolean;
  colorCamera: boolean;
  maxScanRate?: number;
  resolution?: string;
  workingDistance?: {
    min: number;
    max: number;
  };
}

// TURNTABLE INFO

/**
 * Turntable device information.
 */
export interface TurntableInfo {
  id: string;
  name: string;
  macAddress?: string;
  status: TurntableStatus;
  simulated: boolean;
  currentTilt?: number;
  currentRotation?: number;
  capabilities?: Record<string, unknown>;
}

/**
 * Turntable capabilities.
 */
export interface TurntableCapabilities {
  tiltRange: {
    min: number;
    max: number;
  };
  rotationContinuous: boolean;
  maxWeightKg?: number;
}

// SCAN SESSION

/**
 * Scan session state.
 */
export interface ScanSession {
  id: string;
  name?: string;
  scannerId: string;
  turntableId?: string | null;
  status: ScanSessionStatus | string;
  framesCaptured: number;
  pointCount: number;
  startedAt: string;
  completedAt?: string | null;
  storagePath?: string | null;
  settings?: Record<string, unknown>;
}

// DB (PRISMA) SCAN SESSION RECORDS

/**
 * Database-backed scan session record (Prisma `ScanSession` model).
 *
 * Note: This is distinct from the bunbuddy scan session shape returned by the scanner service.
 */
export interface ScanSessionRecord {
  id: string;
  name: string | null;
  scannerId: string;
  turntableId: string | null;
  status: string;
  framesCount: number;
  pointCount: number;
  storageUrl: string | null;
  storageBucket: string | null;
  storageKey: string | null;
  exportFormat: string | null;
  qualityScore: number | null;
  bboxVolume: number | null;
  errorMessage: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  updatedAt: string;
}

/**
 * Aggregate scan statistics for a scanner device.
 */
export interface ScanSessionStats {
  total: number;
  completed: number;
  failed: number;
  totalPoints: number;
}

/**
 * Scan session configuration.
 */
export interface ScanSessionConfig {
  rotations: number;
  tiltAngles: number[];
  framesPerRotation: number;
  autoExposure: boolean;
  depthGain: number;
}

/**
 * Scan progress information.
 */
export interface ScanProgress {
  phase: "capturing" | "aligning" | "meshing" | "exporting";
  currentStep: number;
  totalSteps: number;
  percentage: number;
  message: string;
  estimatedRemainingSeconds?: number;
}

// TURNTABLE CONTROL

/**
 * Turntable tilt command.
 */
export interface TurntableTiltCommand {
  angle: number;
  speed?: number;
}

/**
 * Turntable rotate command.
 */
export interface TurntableRotateCommand {
  /**
   * Rotation amount in degrees.
   *
   * This is the canonical field expected by the scanner bunbuddy + server proxy.
   */
  angle: number;
  speed?: number;
}

/**
 * Turntable position response.
 */
export interface TurntablePosition {
  tilt: number;
  rotation: number;
}

// PROCESSING

/**
 * Registration options.
 */
export interface RegistrationOptions {
  algorithm: "icp" | "ransac" | "colored_icp";
  voxelSize?: number;
  maxIterations?: number;
}

/**
 * Mesh reconstruction options.
 */
export interface MeshOptions {
  algorithm: ProcessingAlgorithm;
  depth?: number;
  densityThreshold?: number;
  targetFaces?: number;
}

/**
 * Processing request payload.
 */
export interface ProcessRequest {
  scanId: string;
  operations: ProcessingOperation[];
}

/**
 * Individual processing operation.
 */
export type ProcessingOperation =
  | { type: "align"; options?: RegistrationOptions }
  | { type: "mesh"; options?: MeshOptions }
  | { type: "export"; format: ExportFormat };

/**
 * Processing response.
 */
export interface ProcessResponse {
  success: boolean;
  scanId: string;
  outputPath?: string;
  pointCount?: number;
  vertexCount?: number;
  faceCount?: number;
  processingTimeMs?: number;
  message?: string;
  error?: string;
}

/**
 * Individual processing result.
 */
export interface ProcessingResult {
  operation: string;
  success: boolean;
  vertexCount?: number;
  faceCount?: number;
  outputPath?: string;
  fileSizeBytes?: number;
  error?: string;
}

// EXPORT

/**
 * Export request payload.
 */
export interface ExportRequest {
  scanId: string;
  format: ExportFormat;
  options?: ExportOptions;
}

/**
 * Export options.
 */
export interface ExportOptions {
  simplify?: boolean;
  targetFaces?: number;
  includeTextures?: boolean;
}

/**
 * Export response.
 */
export interface ExportResponse {
  success: boolean;
  outputPath?: string;
  format?: ExportFormat;
  fileSizeBytes?: number;
  vertexCount?: number;
  faceCount?: number;
  downloadUrl?: string;
  error?: string;
}

// API RESPONSES

/**
 * Health check response.
 */
export interface ScannerBunBuddyHealth {
  /** Overall bunbuddy health status. */
  status: "ok" | "degraded" | "error";
  /** Service identifier (e.g. `scanner-bunbuddy`). */
  service: string;
  /** BunBuddy version string. */
  version: string;
  /** Whether the bunbuddy is running in explicit simulation mode. */
  simulation: boolean;

  /** Dependency availability flags. */
  revopointAvailable: boolean;
  realsenseAvailable: boolean;
  open3dAvailable: boolean;
  bleakAvailable: boolean;
  trimeshAvailable: boolean;

  /** Connected device counts. */
  connectedScanners: number;
  connectedTurntables: number;
  activeScans: number;

  /** Uptime metrics. */
  uptimeSeconds: number;
  startedAt: string;
  timestamp: string;

  /** Feature availability map (e.g. `scannerAcquisition`, `turntableControl`). */
  features: Record<string, boolean>;
}

/**
 * Scanner capabilities response.
 */
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

/**
 * Scanner list response.
 */
export interface ScannerListResponse {
  devices: ScannerInfo[];
  meta: {
    cached: boolean;
    total: number;
  };
}

/**
 * Turntable list response.
 */
export interface TurntableListResponse {
  devices: TurntableInfo[];
  meta: {
    cached: boolean;
    total: number;
  };
}

// ELYSIA (API PROXY) ENVELOPES

/**
 * Standard API v1 success envelope returned by Elysia `apiOk(...)`.
 *
 * T - The `data` payload shape.
 */
export type ApiOkEnvelope<T> = {
  ok: true;
  data: T;
  timestamp: string;
  count?: number;
  hasMore?: boolean;
  /**
   * Optional bunbuddy base URL (when the server proxy resolves the scanner bunbuddy origin).
   *
   * @remarks
   * This field is provided as an *extra top-level* property by some scanner proxy endpoints.
   */
  baseUrl?: string;
} & Record<string, unknown>;

/**
 * `GET /api/v1/scanner/status` (and `/health`) success envelope.
 */
export type ScannerStatusResponse = ApiOkEnvelope<ScannerBunBuddyHealth>;

/**
 * `GET /api/v1/scanner/capabilities` success envelope.
 */
export type ScannerCapabilitiesResponse = ApiOkEnvelope<ScannerBunBuddyCapabilities>;

/**
 * `GET /api/v1/scanner/scanners` success envelope.
 */
export type ScannerScannersResponse = ApiOkEnvelope<ScannerListResponse>;

/**
 * `GET /api/v1/scanner/turntables` success envelope.
 */
export type ScannerTurntablesResponse = ApiOkEnvelope<TurntableListResponse>;

/**
 * `GET /api/v1/scanner/sessions` success envelope.
 */
export type DbScanSessionsResponse = ApiOkEnvelope<{ sessions: ScanSessionRecord[] }> & {
  sessions?: ScanSessionRecord[];
};

/**
 * `GET /api/v1/scanner/sessions/:sessionId` success envelope.
 */
export type DbScanSessionResponse = ApiOkEnvelope<{ session: ScanSessionRecord }> & {
  session?: ScanSessionRecord;
};

/**
 * `DELETE /api/v1/scanner/sessions/:sessionId` success envelope.
 */
export type DbScanSessionDeleteResponse = ApiOkEnvelope<{ deleted: boolean }> & {
  deleted?: boolean;
};

/**
 * `POST /api/v1/scanner/sessions/:sessionId/restore` success envelope.
 */
export type DbScanSessionRestoreResponse = ApiOkEnvelope<{ restored: boolean }> & {
  restored?: boolean;
};

/**
 * `GET /api/v1/scanner/stats/:scannerId` success envelope.
 */
export type ScannerStatsResponse = ApiOkEnvelope<ScanSessionStats> & Partial<ScanSessionStats>;

/**
 * Device-sync summary counts grouped by scanner device class.
 */
export interface ScannerDeviceSyncSummary {
  scanners: { upserted: number; matched: number };
  turntables: { upserted: number; matched: number };
}

/**
 * Device-sync failure entry.
 */
export interface ScannerDeviceSyncError {
  source: "scanners" | "turntables" | "db";
  error: string;
}

/**
 * Scanner/turntable registry synchronization result payload.
 *
 * Returned by `POST /api/v1/scanner/devices/sync`.
 */
export interface ScannerDeviceSyncResult {
  ok: boolean;
  scannedAt: string;
  baseUrl: string | null;
  summary: ScannerDeviceSyncSummary;
  errors: ScannerDeviceSyncError[];
}

// WEBSOCKET MESSAGES

/**
 * WebSocket message types.
 */
export type ScannerWsMessageType =
  | "session_state"
  | "scan_progress"
  | "frame_captured"
  | "scan_stopped"
  | "error"
  | "heartbeat";

/**
 * WebSocket message base.
 */
export interface ScannerWsMessageBase {
  type: ScannerWsMessageType;
  scanId: string;
}

/**
 * Progress WebSocket message.
 */
export interface ScannerWsProgressMessage extends ScannerWsMessageBase {
  type: "scan_progress";
  currentStep: number;
  totalSteps: number;
  framesCaptured: number;
  currentRotation?: number;
  currentTilt?: number;
  message?: string;
}

/**
 * Frame captured WebSocket message.
 */
export interface ScannerWsFrameMessage extends ScannerWsMessageBase {
  type: "frame_captured";
  framesCaptured: number;
  pointCount?: number;
}

/**
 * Error WebSocket message.
 */
export interface ScannerWsErrorMessage extends ScannerWsMessageBase {
  type: "error";
  error: string;
}

/**
 * Complete WebSocket message.
 */
export interface ScannerWsSessionStateMessage extends ScannerWsMessageBase {
  type: "session_state";
  status: string;
  framesCaptured: number;
  pointCount: number;
}

/**
 * Interface ScannerWsStoppedMessage.
 */
export interface ScannerWsStoppedMessage extends ScannerWsMessageBase {
  type: "scan_stopped";
  status: string;
  framesCaptured: number;
  pointCount: number;
}

/**
 * Interface ScannerWsHeartbeatMessage.
 */
export interface ScannerWsHeartbeatMessage {
  type: "heartbeat";
}

/**
 * Union of all WebSocket message types.
 */
export type ScannerWsMessage =
  | ScannerWsProgressMessage
  | ScannerWsFrameMessage
  | ScannerWsErrorMessage
  | ScannerWsSessionStateMessage
  | ScannerWsStoppedMessage
  | ScannerWsHeartbeatMessage;

// AUTOMATED SCAN

/**
 * Automated scan configuration.
 */
export interface AutomatedScanConfig {
  scannerId: string;
  turntableId: string;
  rotations?: number;
  tiltAngles?: number[];
  name?: string;
  exportFormat?: ExportFormat;
}

/**
 * Automated scan response.
 */
export interface AutomatedScanResponse {
  success: boolean;
  session?: ScanSession;
  message?: string;
  error?: string;
}
