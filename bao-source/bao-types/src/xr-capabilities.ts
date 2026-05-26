/**
 * XR capabilities response types.
 *
 * Provides an XR "capabilities snapshot" that mirrors the bunbuddy capabilities pattern
 * (status, features, endpoints, notes) so UI panels can render Drone + XR consistently.
 *
 * @shared/types/xr-capabilities.ts
 */

import type { HardwareIntegrationSummary } from "./hardware-integration.ts";
import type { OnnxIntegrationSummary } from "./onnx-integration.ts";
import type { PipelineIntegrationSummary } from "./pipeline-integration.ts";
import type { SpatialGeospatialTileIntegrationSummary } from "./spatial-geospatial-tile-integration.ts";
import type { TrainingIntegrationSummary } from "./training-integration.ts";
import type { UsdIntegrationSummary } from "./usd-integration.ts";
import type { XrArFeatureFlags, XrRuntimeConfig } from "./xr.ts";

/**
 * Canonical XR API feature flags emitted by the server.
 */
export const XR_API_FEATURE_KEYS: readonly [
  "runtimeConfig",
  "hardwareSnapshot",
  "experiences",
  "experienceAssets",
  "revisions",
  "shareLinks",
  "sessions",
  "sessionEvents",
  "compositionPlan",
  "ingestScan",
  "ingestAutonomyTelemetry",
  "reviews",
  "inputProfiles",
  "aiPlacementSuggestions",
  "aiOverlays",
  "aiUsdGenerate",
  "antialias",
  "shadows",
  "enableHitTest",
  "enablePlaneDetection",
  "enableLightEstimation",
  "enableDomOverlay",
  "enableImageTracking",
  "enableAnchors",
  "enableDepthSensing",
  "enableMeshDetection",
  "enableCameraAccess",
  "geospatialPlacement",
  "tileTilesetContracts",
  "tilePipelineServing",
  "viewerTileStreaming",
] = [
  "runtimeConfig",
  "hardwareSnapshot",
  "experiences",
  "experienceAssets",
  "revisions",
  "shareLinks",
  "sessions",
  "sessionEvents",
  "compositionPlan",
  "ingestScan",
  "ingestAutonomyTelemetry",
  "reviews",
  "inputProfiles",
  "aiPlacementSuggestions",
  "aiOverlays",
  "aiUsdGenerate",
  "antialias",
  "shadows",
  "enableHitTest",
  "enablePlaneDetection",
  "enableLightEstimation",
  "enableDomOverlay",
  "enableImageTracking",
  "enableAnchors",
  "enableDepthSensing",
  "enableMeshDetection",
  "enableCameraAccess",
  "geospatialPlacement",
  "tileTilesetContracts",
  "tilePipelineServing",
  "viewerTileStreaming",
] as const;

/** Inferred type from the XrApiFeatureKey schema. */
export type XrApiFeatureKey = (typeof XR_API_FEATURE_KEYS)[number];

/** Inferred type from the XrApiFeatureFlags schema. */
export type XrApiFeatureFlags = Record<XrApiFeatureKey, boolean>;

/**
 * XR API capabilities payload (server-reported).
 */
export interface XrApiCapabilities {
  /** Overall status of XR API features. */
  status: "ok" | "degraded";
  /** Service identifier (e.g. `xr-api`). */
  service: string;
  /** Server version string. */
  version: string;
  /** Boolean feature flags describing the XR API surface. */
  features: XrApiFeatureFlags;
  /** Documented endpoint surface for operators. */
  endpoints: string[];
  /** Operator-facing notes/warnings. */
  notes?: string[];
  /** ISO timestamp for the snapshot. */
  timestamp?: string;
  /** USD integration summary for AI/XR asset flows. */
  usd?: UsdIntegrationSummary;
  /** Hardware integration summary for AI/XR device flows. */
  hardware?: HardwareIntegrationSummary;
  /** Pipeline integration summary for automation flows. */
  pipelines?: PipelineIntegrationSummary;
  /** ONNX integration summary for XR inference flows. */
  onnx?: OnnxIntegrationSummary;
  /** Training integration summary for XR training workflows. */
  training?: TrainingIntegrationSummary;
  /** Geospatial/tile integration summary (honest stub until serving ships). */
  geospatialTile?: SpatialGeospatialTileIntegrationSummary;
  /** Current XR runtime defaults applied by the server. */
  runtimeDefaults: XrRuntimeConfig;
  /** Detailed AR feature availability flags (client-detected). */
  arFeatures?: XrArFeatureFlags;
}

/**
 * API v1 response wrapper for XR capabilities.
 */
export interface XrApiCapabilitiesResponse {
  ok: true;
  data: XrApiCapabilities;
  timestamp: string;
}
