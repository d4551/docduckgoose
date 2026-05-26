/**
 * Scanner bunbuddy type definitions.
 *
 * Defines TypeScript types for the 3D scanner bunbuddy API, including
 * scanner/turntable discovery, scan sessions, processing, and export.
 * API responses and WebSocket messages re-exported from scanner-responses.
 *
 * @shared/types/scanner.ts
 */

export type ScannerModel = "POP" | "MINI" | "RANGE" | "MetroX" | "MetroY" | "unknown";
export type ScannerStatus = "disconnected" | "connecting" | "connected" | "scanning" | "error";
export type TurntableStatus =
  | "disconnected"
  | "connecting"
  | "connected"
  | "moving"
  | "idle"
  | "error";
export type ScanSessionStatus = "active" | "scanning" | "completed" | "error";
export type ExportFormat = "ply" | "obj" | "stl" | "gltf" | "glb";
export type ProcessingAlgorithm = "poisson" | "ball_pivoting";

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

export interface ScannerCapabilities {
  depthCamera: boolean;
  colorCamera: boolean;
  maxScanRate?: number;
  resolution?: string;
  workingDistance?: { min: number; max: number };
}

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

export interface TurntableCapabilities {
  tiltRange: { min: number; max: number };
  rotationContinuous: boolean;
  maxWeightKg?: number;
}

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

export interface ScanSessionStats {
  total: number;
  completed: number;
  failed: number;
  totalPoints: number;
}

export interface ScanSessionConfig {
  rotations: number;
  tiltAngles: number[];
  framesPerRotation: number;
  autoExposure: boolean;
  depthGain: number;
}

export interface ScanProgress {
  phase: "capturing" | "aligning" | "meshing" | "exporting";
  currentStep: number;
  totalSteps: number;
  percentage: number;
  message: string;
  estimatedRemainingSeconds?: number;
}

export interface TurntableTiltCommand {
  angle: number;
  speed?: number;
}

export interface TurntableRotateCommand {
  angle: number;
  speed?: number;
}

export interface TurntablePosition {
  tilt: number;
  rotation: number;
}

export interface RegistrationOptions {
  algorithm: "icp" | "ransac" | "colored_icp";
  voxelSize?: number;
  maxIterations?: number;
}

export interface MeshOptions {
  algorithm: ProcessingAlgorithm;
  depth?: number;
  densityThreshold?: number;
  targetFaces?: number;
}

export interface ProcessRequest {
  scanId: string;
  operations: ProcessingOperation[];
}

export type ProcessingOperation =
  | { type: "align"; options?: RegistrationOptions }
  | { type: "mesh"; options?: MeshOptions }
  | { type: "export"; format: ExportFormat };

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

export interface ProcessingResult {
  operation: string;
  success: boolean;
  vertexCount?: number;
  faceCount?: number;
  outputPath?: string;
  fileSizeBytes?: number;
  error?: string;
}

export interface ExportRequest {
  scanId: string;
  format: ExportFormat;
  options?: ExportOptions;
}

export interface ExportOptions {
  simplify?: boolean;
  targetFaces?: number;
  includeTextures?: boolean;
}

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

export interface AutomatedScanConfig {
  scannerId: string;
  turntableId?: string;
  sessionName?: string;
  scanConfig?: ScanSessionConfig;
  processingOperations?: ProcessingOperation[];
  exportFormat?: ExportFormat;
}

export interface AutomatedScanResponse {
  ok: boolean;
  sessionId: string;
  scanId: string;
  status: string;
  message?: string;
}

// Re-export from split module
export type {
  ApiOkEnvelope,
  DbScanSessionDeleteResponse,
  DbScanSessionResponse,
  DbScanSessionRestoreResponse,
  DbScanSessionsResponse,
  ScannerBunBuddyCapabilities,
  ScannerBunBuddyHealth,
  ScannerCapabilitiesResponse,
  ScannerDeviceSyncError,
  ScannerDeviceSyncResult,
  ScannerDeviceSyncSummary,
  ScannerListResponse,
  ScannerScannersResponse,
  ScannerStatsResponse,
  ScannerStatusResponse,
  ScannerTurntablesResponse,
  ScannerWsErrorMessage,
  ScannerWsFrameMessage,
  ScannerWsHeartbeatMessage,
  ScannerWsMessage,
  ScannerWsMessageBase,
  ScannerWsMessageType,
  ScannerWsProgressMessage,
  ScannerWsSessionStateMessage,
  ScannerWsStoppedMessage,
  TurntableListResponse,
} from "./scanner-responses";
