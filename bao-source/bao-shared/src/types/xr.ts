/**
 * Shared XR experience API types.
 *
 * Centralizes the shapes consumed by XR/AR HTML pages and composables
 * that integrate with /api/v1/xr endpoints.
 *
 * @shared/types/xr.ts
 */

import {
  XR_EXPERIENCE_CONFIG_TYPES,
  XR_EXPERIENCE_SCOPES,
  XR_EXPERIENCE_STATUSES,
  XR_EXPERIENCE_VISIBILITIES,
} from "../constants/xr-experience.options.ts";
import type { DeviceTypeType } from "../schemas/device.schemas.ts";
import type {
  XrExperienceConfigType,
  XrExperienceVisibility,
} from "../schemas/xr-experience.schemas.ts";

/** Core XR experience schema types (CRUD requests, responses, status, visibility). */
export type {
  XrExperience,
  XrExperienceConfigType,
  XrExperienceCreateRequest,
  XrExperienceDeleteResponse,
  XrExperienceListResponse,
  XrExperienceResponse,
  XrExperienceStatus,
  XrExperienceUpdateRequest,
  XrExperienceVisibility,
} from "../schemas/xr-experience.schemas.ts";
/** XR experience operations types (assets, revisions, share links, workflow). */
export type {
  XrExperienceAssetDto,
  XrExperienceAssetFromScanResponse,
  XrExperienceAssetLink,
  XrExperienceAssetLinkResponse,
  XrExperienceAssetsListResponse,
  XrExperienceAssetUnlinkResponse,
  XrExperienceGenerateShareLinkResponse,
  XrExperienceRestoreRevisionResponse,
  XrExperienceRevisionCompareResponse,
  XrExperienceRevisionDetail,
  XrExperienceRevisionDiff,
  XrExperienceRevisionListResponse,
  XrExperienceRevisionResponse,
  XrExperienceRevisionSummary,
  XrExperienceRevokeShareLinkResponse,
  XrExperienceShareLink,
  XrExperienceShareLinkInfo,
  XrExperienceShareLinkInfoResponse,
  XrExperienceWorkflowResponse,
} from "../schemas/xr-experience-ops.schemas.ts";
/** Canonical XR experience option arrays (config types, scopes, statuses, visibilities). */
export {
  XR_EXPERIENCE_CONFIG_TYPES,
  XR_EXPERIENCE_SCOPES,
  XR_EXPERIENCE_STATUSES,
  XR_EXPERIENCE_VISIBILITIES,
};

/**
 * XR experience list query params.
 */
export interface XrExperienceListQuery {
  limit?: number;
  offset?: number;
  page?: number;
  pageSize?: number;
  search?: string;
  scope?: XrExperienceScope;
  visibility?: XrExperienceVisibility;
}

/**
 * XR experience scope filters for list queries.
 */
export type XrExperienceScope =
  typeof import("../constants/xr-experience.options.ts").XR_EXPERIENCE_SCOPES[number];

/**
 * XR render mode options for WebXR sessions.
 */
export type XrRenderMode = "inline" | "immersive-vr" | "immersive-ar";

/**
 * XR reference space types supported by the platform runtime config.
 *
 * @remarks
 * This intentionally mirrors the WebXR {@link XRReferenceSpaceType} string union
 * while keeping the server/client contract stable and bounded.
 */
export const XR_REFERENCE_SPACE_TYPES: readonly [
  "local",
  "local-floor",
  "bounded-floor",
  "unbounded",
] = ["local", "local-floor", "bounded-floor", "unbounded"] as const;

/**
 * Supported XR reference space types.
 */
export type XrReferenceSpaceType = (typeof XR_REFERENCE_SPACE_TYPES)[number];

/**
 * XR device class targets for runtime defaults.
 */
export type XrDeviceClass = "desktop" | "mobile" | "headset";

/**
 * Supported XR annotation placement modes for client workflows.
 */
export const XR_ANNOTATION_PLACEMENT_MODES: readonly [
  "hit-test",
  "raycast",
  "fixed-distance",
  "manual",
] = ["hit-test", "raycast", "fixed-distance", "manual"] as const;

/**
 * XR annotation placement mode string union.
 */
export type XrAnnotationPlacementMode = (typeof XR_ANNOTATION_PLACEMENT_MODES)[number];

function isOneOf<const T extends string>(values: readonly T[], value: string): value is T {
  return values.some((candidate) => candidate === value);
}

/**
 * Narrow a raw string to a supported XR experience visibility.
 */
export function isXrExperienceVisibility(value: string): value is XrExperienceVisibility {
  return isOneOf(XR_EXPERIENCE_VISIBILITIES, value);
}

/**
 * Narrow a raw string to a supported XR experience config type.
 */
export function isXrExperienceConfigType(value: string): value is XrExperienceConfigType {
  return isOneOf(XR_EXPERIENCE_CONFIG_TYPES, value);
}

/**
 * Narrow a raw string to a supported XR experience scope.
 */
export function isXrExperienceScope(value: string): value is XrExperienceScope {
  return isOneOf(XR_EXPERIENCE_SCOPES, value);
}

/**
 * XR annotation placement runtime tuning values.
 *
 * @remarks
 * These values are returned by the XR runtime config endpoint and exposed via
 * `vault://xr/runtime` so XR/annotation clients can tune previews per device class.
 */
export interface XrAnnotationPlacementConfig {
  /** Placement modes that should be available to clients. */
  modes: XrAnnotationPlacementMode[];
  /** Default distance (meters) used for fixed-distance placement mode. */
  fixedPlacementDistance: number;
  /** Preview reticle size (meters). */
  previewSize: number;
  /** Preview opacity (0-1). */
  previewOpacity: number;
  /** Segment count for ring/reticle geometries. */
  ringSegments: number;
  /** Segment count for sphere preview geometry. */
  sphereSegments: number;
  /** Pulse speed for preview animation. */
  pulseSpeed: number;
  /** Pulse scale amplitude for preview animation. */
  pulseScaleAmplitude: number;
}

/**
 * AR image tracking target definition.
 *
 * XrImageTarget
 * {string} id - Unique identifier for the image target.
 * {string} imageUrl - URL to the reference image asset.
 * {number} physicalWidthMeters - Physical width in meters for real-world sizing.
 * {string} [label] - Optional label for UI display.
 */
export interface XrImageTarget {
  /** Unique identifier for the image target. */
  id: string;
  /** URL to the reference image asset. */
  imageUrl: string;
  /** Physical width in meters for real-world sizing. */
  physicalWidthMeters: number;
  /** Optional label for UI display. */
  label?: string;
}

/**
 * AR session-local anchor for spatial persistence within an XR session.
 *
 * XrSessionAnchor
 * {string} id - Unique anchor identifier from the WebXR runtime.
 * {string} [semanticLabel] - Semantic label (wall, floor, ceiling, etc.).
 * {number[]} transform - 4x4 column-major transform matrix.
 * {string} createdAt - ISO 8601 timestamp when anchor was created.
 */
export interface XrSessionAnchor {
  /** Unique anchor identifier from the WebXR runtime. */
  id: string;
  /** Semantic label (wall, floor, ceiling, etc.). */
  semanticLabel?: string;
  /** 4x4 column-major transform matrix. */
  transform: number[];
  /** ISO 8601 timestamp when anchor was created. */
  createdAt: string;
}

/**
 * AR feature availability flags for capability detection.
 *
 * XrArFeatureFlags
 */
export interface XrArFeatureFlags {
  /** Whether hit-test is available. */
  hitTest: boolean;
  /** Whether plane detection is available. */
  planeDetection: boolean;
  /** Whether light estimation is available. */
  lightEstimation: boolean;
  /** Whether image tracking is available. */
  imageTracking: boolean;
  /** Whether session-local anchors are available. */
  anchors: boolean;
  /** Whether depth sensing is available. */
  depthSensing: boolean;
  /** Whether mesh detection is available. */
  meshDetection: boolean;
  /** Whether camera access is available. */
  cameraAccess: boolean;
  /** Whether hand tracking is available. */
  handTracking: boolean;
  /** Whether DOM overlay is available. */
  domOverlay: boolean;
}

/**
 * Runtime configuration for XR experiences.
 */
export interface XrRuntimeConfig {
  /** Preferred WebXR session mode. */
  defaultMode: XrRenderMode;
  /** Preferred WebXR reference space type (must be set before session start). */
  referenceSpaceType: XrReferenceSpaceType;
  /** Preferred device class for runtime tuning. */
  defaultDeviceClass: XrDeviceClass;
  /** Annotation placement defaults for XR/AR workflows. */
  annotationPlacement: XrAnnotationPlacementConfig;
  /** Frame budget in milliseconds for XR rendering. */
  frameBudgetMs: number;
  /** Foveation level (0-1) when supported by the runtime. */
  foveationLevel: number;
  /** Enable antialiasing on the WebGL renderer. */
  antialias: boolean;
  /** Enable renderer shadow maps. */
  shadows: boolean;
  /** Maximum pixel ratio for XR rendering. */
  maxPixelRatio: number;
  /** Enable WebXR hit-test feature for AR placement. */
  enableHitTest: boolean;
  /** Enable light estimation for immersive AR sessions. */
  enableLightEstimation: boolean;
  /** Enable plane detection for immersive AR sessions. */
  enablePlaneDetection: boolean;
  /** Enable DOM overlay support for immersive sessions. */
  enableDomOverlay: boolean;
  /** Enable WebXR image tracking for marker-based AR. */
  enableImageTracking: boolean;
  /** Enable WebXR anchors for session-local spatial persistence. */
  enableAnchors: boolean;
  /** Enable depth sensing for realistic AR occlusion (progressive enhancement). */
  enableDepthSensing: boolean;
  /** Enable mesh detection for environment understanding. */
  enableMeshDetection: boolean;
  /** Enable camera access for AR passthrough effects. */
  enableCameraAccess: boolean;
}

/**
 * XR runtime config update payload.
 */
export type XrRuntimeConfigUpdatePayload = Partial<XrRuntimeConfig>;

/**
 * XR runtime config response data payload.
 */
export interface XrRuntimeConfigResponseData {
  config: XrRuntimeConfig;
  source: "default" | "settings";
  updatedAt: string | null;
  /**
   * Whether the server was able to access the database for this request.
   *
   * When false, the response may still include defaults so the UI can operate, but
   * persistence operations (saving settings, listing experiences) will likely fail until
   * the database is restored.
   */
  dbAvailable?: boolean;
  /**
   * Optional warning message surfaced by the server (e.g., database unreachable).
   */
  warning?: string;
}

/**
 * XR runtime config response envelope.
 */
export interface XrRuntimeConfigResponse {
  ok: true;
  data: XrRuntimeConfigResponseData;
  timestamp: string;
  correlationId?: string;
  requestId?: string;
}

/**
 * Supported XR render modes.
 */
export const XR_RENDER_MODES: readonly XrRenderMode[] = ["inline", "immersive-vr", "immersive-ar"];

/**
 * Display labels for XR experience scopes.
 */
export const XR_EXPERIENCE_SCOPE_LABELS: Record<XrExperienceScope, string> = {
  mine: "Mine",
  shared: "Shared",
  all: "All",
};

/**
 * Supported XR device classes.
 */
export const XR_DEVICE_CLASSES: readonly XrDeviceClass[] = ["desktop", "mobile", "headset"];

/**
 * XR hardware device types used for capability snapshots.
 */
export const XR_HARDWARE_DEVICE_TYPES: readonly DeviceTypeType[] = [
  "camera",
  "depth-camera",
  "tracking-camera",
  "xr-headset",
  "basler",
  "csi",
  "imager",
  "scanner",
  "3d-scanner",
  "turntable",
];

/**
 * Display labels for XR render modes.
 */
export const XR_RENDER_MODE_LABELS: Record<XrRenderMode, string> = {
  inline: "Inline",
  "immersive-vr": "Immersive VR",
  "immersive-ar": "Immersive AR",
};

/**
 * Display labels for XR reference space types.
 */
export const XR_REFERENCE_SPACE_TYPE_LABELS: Record<XrReferenceSpaceType, string> = {
  local: "Local",
  "local-floor": "Local Floor",
  "bounded-floor": "Bounded Floor",
  unbounded: "Unbounded",
};

/**
 * Display labels for XR device classes.
 */
export const XR_DEVICE_CLASS_LABELS: Record<XrDeviceClass, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  headset: "Headset",
};

/**
 * Display labels for XR experience visibility.
 */
export const XR_EXPERIENCE_VISIBILITY_LABELS: Record<XrExperienceVisibility, string> = {
  private: "Private",
  team: "Team",
  public: "Public",
};

/**
 * Display labels for XR experience config schema identifiers.
 */
export const XR_EXPERIENCE_CONFIG_TYPE_LABELS: Record<XrExperienceConfigType, string> = {
  generic: "Generic",
  placement: "Placement",
  scene: "Scene",
  composition: "Composition",
};

/**
 * Default XR runtime configuration.
 */
export const DEFAULT_XR_RUNTIME_CONFIG: XrRuntimeConfig = {
  defaultMode: "inline",
  referenceSpaceType: "local-floor",
  defaultDeviceClass: "desktop",
  annotationPlacement: {
    modes: [...XR_ANNOTATION_PLACEMENT_MODES],
    fixedPlacementDistance: 1.0,
    previewSize: 0.1,
    previewOpacity: 0.7,
    ringSegments: 32,
    sphereSegments: 16,
    pulseSpeed: 3,
    pulseScaleAmplitude: 0.1,
  },
  frameBudgetMs: 16,
  foveationLevel: 0,
  antialias: true,
  shadows: false,
  maxPixelRatio: 2,
  enableHitTest: true,
  enableLightEstimation: false,
  enablePlaneDetection: false,
  enableDomOverlay: true,
  enableImageTracking: false,
  enableAnchors: false,
  enableDepthSensing: false,
  enableMeshDetection: false,
  enableCameraAccess: false,
};

/**
 * XR config validation request payload.
 */
export interface XrValidateConfigBody {
  configType: XrExperienceConfigType;
  config: unknown;
}

/**
 * XR config validation error entry.
 */
export interface XrValidateConfigError {
  path: string;
  message: string;
}

/**
 * XR config validation response payload.
 */
export interface XrValidateConfigResponse {
  ok: boolean;
  valid: boolean;
  configType: string;
  errors?: XrValidateConfigError[];
}

/**
 * AI quota usage snapshot (returned when an AI request is throttled).
 */
export interface AiQuotaInfo {
  tokensUsed: number;
  requestsToday: number;
  tokensRemaining: number | null;
  requestsRemaining: number | null;
  resetsAt: string;
}

/**
 * Discriminated AI quota exceeded response shape.
 */
export interface AiQuotaExceededResult {
  ok: false;
  error: string;
  code: string;
  quota: AiQuotaInfo;
}

/**
 * XR transform payload for AI suggestions/overlays.
 */
export interface XrTransform {
  position?: [number, number, number];
  rotation?: [number, number, number] | [number, number, number, number];
  scale?: number | [number, number, number];
}

/**
 * XR AI placement suggestion.
 */
export interface XrAiPlacementSuggestion {
  transform: XrTransform;
  confidence: number;
  rationale: string;
}

/**
 * XR AI placement suggestions request body.
 */
export interface XrAiPlacementSuggestionsBody {
  deviceHint?: string;
  mode?: string;
  maxSuggestions?: number;
  cameraPose?: {
    position?: [number, number, number];
    rotation?: [number, number, number, number];
  };
  notes?: string;
}

/**
 * XR AI placement suggestions response.
 */
export interface XrAiPlacementSuggestionsResponseData {
  provider: string;
  suggestions: XrAiPlacementSuggestion[];
}

/**
 * XR AI placement suggestions response envelope.
 */
export interface XrAiPlacementSuggestionsResponse {
  ok: true;
  data: XrAiPlacementSuggestionsResponseData;
  timestamp: string;
  correlationId?: string;
  requestId?: string;
}

/**
 * XR AI overlay primitive.
 */
export interface XrAiOverlayPrimitive {
  id: string;
  label: string;
  kind: "label" | "billboard" | "marker";
  confidence: number;
  transform?: XrTransform;
}

/**
 * XR AI overlay generation request body.
 */
export interface XrAiOverlayBody {
  notes: string;
}

/**
 * XR AI overlay generation response.
 */
export interface XrAiOverlayResponseData {
  provider: string;
  primitives: XrAiOverlayPrimitive[];
}

/**
 * XR AI overlay generation response envelope.
 */
export interface XrAiOverlayResponse {
  ok: true;
  data: XrAiOverlayResponseData;
  timestamp: string;
  correlationId?: string;
  requestId?: string;
}

/**
 * XR AI USD generation request body.
 */
export interface XrAiUsdGenerateBody {
  prompt: string;
  name?: string;
  role?: string;
  deviceId?: string;
  deviceHint?: string;
}

/**
 * XR AI USD generation response.
 */
export interface XrAiUsdGenerateResponseData {
  provider: string;
  usdAssetId: string;
  linkId?: string;
  offline?: boolean;
}

/**
 * XR AI USD generation response envelope.
 */
export interface XrAiUsdGenerateResponse {
  ok: true;
  data: XrAiUsdGenerateResponseData;
  timestamp: string;
  correlationId?: string;
  requestId?: string;
}
