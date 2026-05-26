/**
 * Shared XR experience API types.
 *
 * AI types re-exported from xr-ai.
 * @shared/types/xr.ts
 */

import {
  XR_EXPERIENCE_CONFIG_TYPES,
  XR_EXPERIENCE_SCOPES,
  XR_EXPERIENCE_STATUSES,
  XR_EXPERIENCE_VISIBILITIES,
} from "@baohaus/bao-constants/xr-experience.options";
import type { DeviceTypeType } from "@baohaus/bao-schemas/device.schemas";
import type {
  XrExperienceConfigType,
  XrExperienceVisibility,
} from "@baohaus/bao-schemas/xr-experience.schemas";

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
} from "@baohaus/bao-schemas/xr-experience.schemas";
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
} from "@baohaus/bao-schemas/xr-experience-ops.schemas";
export {
  XR_EXPERIENCE_CONFIG_TYPES,
  XR_EXPERIENCE_SCOPES,
  XR_EXPERIENCE_STATUSES,
  XR_EXPERIENCE_VISIBILITIES,
};

export interface XrExperienceListQuery {
  limit?: number;
  offset?: number;
  page?: number;
  pageSize?: number;
  search?: string;
  scope?: XrExperienceScope;
  visibility?: XrExperienceVisibility;
}

export type XrExperienceScope =
  typeof import("@baohaus/bao-constants/xr-experience.options").XR_EXPERIENCE_SCOPES[number];

export type XrRenderMode = "inline" | "immersive-vr" | "immersive-ar";

export const XR_REFERENCE_SPACE_TYPES: readonly [
  "local",
  "local-floor",
  "bounded-floor",
  "unbounded",
] = ["local", "local-floor", "bounded-floor", "unbounded"] as const;

export type XrReferenceSpaceType = (typeof XR_REFERENCE_SPACE_TYPES)[number];

export type XrDeviceClass = "desktop" | "mobile" | "headset";

export const XR_ANNOTATION_PLACEMENT_MODES: readonly [
  "hit-test",
  "raycast",
  "fixed-distance",
  "manual",
] = ["hit-test", "raycast", "fixed-distance", "manual"] as const;

export type XrAnnotationPlacementMode = (typeof XR_ANNOTATION_PLACEMENT_MODES)[number];

function isOneOf<const T extends string>(values: readonly T[], value: string): value is T {
  return values.some((candidate) => candidate === value);
}

export function isXrExperienceVisibility(value: string): value is XrExperienceVisibility {
  return isOneOf(XR_EXPERIENCE_VISIBILITIES, value);
}

export function isXrExperienceConfigType(value: string): value is XrExperienceConfigType {
  return isOneOf(XR_EXPERIENCE_CONFIG_TYPES, value);
}

export function isXrExperienceScope(value: string): value is XrExperienceScope {
  return isOneOf(XR_EXPERIENCE_SCOPES, value);
}

export interface XrAnnotationPlacementConfig {
  modes: XrAnnotationPlacementMode[];
  fixedPlacementDistance: number;
  previewSize: number;
  previewOpacity: number;
  ringSegments: number;
  sphereSegments: number;
  pulseSpeed: number;
  pulseScaleAmplitude: number;
}

export interface XrImageTarget {
  id: string;
  imageUrl: string;
  physicalWidthMeters: number;
  label?: string;
}

export interface XrSessionAnchor {
  id: string;
  semanticLabel?: string;
  transform: number[];
  createdAt: string;
}

export interface XrArFeatureFlags {
  hitTest: boolean;
  planeDetection: boolean;
  lightEstimation: boolean;
  imageTracking: boolean;
  anchors: boolean;
  depthSensing: boolean;
  meshDetection: boolean;
  cameraAccess: boolean;
  handTracking: boolean;
  domOverlay: boolean;
}

export interface XrRuntimeConfig {
  defaultMode: XrRenderMode;
  referenceSpaceType: XrReferenceSpaceType;
  defaultDeviceClass: XrDeviceClass;
  annotationPlacement: XrAnnotationPlacementConfig;
  frameBudgetMs: number;
  foveationLevel: number;
  antialias: boolean;
  shadows: boolean;
  maxPixelRatio: number;
  enableHitTest: boolean;
  enableLightEstimation: boolean;
  enablePlaneDetection: boolean;
  enableDomOverlay: boolean;
  enableImageTracking: boolean;
  enableAnchors: boolean;
  enableDepthSensing: boolean;
  enableMeshDetection: boolean;
  enableCameraAccess: boolean;
}

export type XrRuntimeConfigUpdatePayload = Partial<XrRuntimeConfig>;

export interface XrRuntimeConfigResponseData {
  config: XrRuntimeConfig;
  source: "default" | "settings";
  updatedAt: string | null;
  dbAvailable?: boolean;
  warning?: string;
}

export interface XrRuntimeConfigResponse {
  ok: true;
  data: XrRuntimeConfigResponseData;
  timestamp: string;
  correlationId?: string;
  requestId?: string;
}

export const XR_RENDER_MODES = [
  "inline",
  "immersive-vr",
  "immersive-ar",
] as const satisfies readonly XrRenderMode[];

export const XR_EXPERIENCE_SCOPE_LABELS: Record<XrExperienceScope, string> = {
  mine: "Mine",
  shared: "Shared",
  all: "All",
};

export const XR_DEVICE_CLASSES = [
  "desktop",
  "mobile",
  "headset",
] as const satisfies readonly XrDeviceClass[];

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

export const XR_RENDER_MODE_LABELS: Record<XrRenderMode, string> = {
  inline: "Inline",
  "immersive-vr": "Immersive VR",
  "immersive-ar": "Immersive AR",
};

export const XR_REFERENCE_SPACE_TYPE_LABELS: Record<XrReferenceSpaceType, string> = {
  local: "Local",
  "local-floor": "Local Floor",
  "bounded-floor": "Bounded Floor",
  unbounded: "Unbounded",
};

export const XR_DEVICE_CLASS_LABELS: Record<XrDeviceClass, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  headset: "Headset",
};

export const XR_EXPERIENCE_VISIBILITY_LABELS: Record<XrExperienceVisibility, string> = {
  private: "Private",
  team: "Team",
  public: "Public",
};

export const XR_EXPERIENCE_CONFIG_TYPE_LABELS: Record<XrExperienceConfigType, string> = {
  generic: "Generic",
  placement: "Placement",
  scene: "Scene",
  composition: "Composition",
};

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

export interface XrValidateConfigBody {
  configType: XrExperienceConfigType;
  config: unknown;
}

export interface XrValidateConfigError {
  path: string;
  message: string;
}

export interface XrValidateConfigResponse {
  ok: boolean;
  valid: boolean;
  configType: string;
  errors?: XrValidateConfigError[];
}

// Re-export AI types from split module
export type {
  AiQuotaExceededResult,
  AiQuotaInfo,
  XrAiOverlayBody,
  XrAiOverlayPrimitive,
  XrAiOverlayResponse,
  XrAiOverlayResponseData,
  XrAiPlacementSuggestion,
  XrAiPlacementSuggestionsBody,
  XrAiPlacementSuggestionsResponse,
  XrAiPlacementSuggestionsResponseData,
  XrAiUsdGenerateBody,
  XrAiUsdGenerateResponse,
  XrAiUsdGenerateResponseData,
  XrTransform,
} from "./xr-ai";
