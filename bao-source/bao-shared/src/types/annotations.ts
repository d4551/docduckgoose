/**
 * Shared annotation type definitions.
 *
 * Centralizes allowed annotation types across the backend and frontend
 * to keep API validation and Three.js tooling aligned.
 *
 * Supports 2D/3D/XR annotation system with context-aware types.
 *
 * @shared/types/annotations.ts
 */

import type { PrismaJson } from "@baohaus/bao-types/prisma.types";

// Canonical Constants

/**
 * Canonical annotation type identifiers.
 */
export const ANNOTATION_TYPES: {
  readonly POINT: "point";
  readonly LINE: "line";
  readonly POLYGON: "polygon";
  readonly RECTANGLE: "rectangle";
  readonly CIRCLE: "circle";
  readonly TEXT: "text";
  readonly MEASUREMENT: "measurement";
  readonly ARROW: "arrow";
  readonly FREEHAND: "freehand";
  readonly VOLUME_BRUSH: "volume-brush";
  readonly BOUNDING_BOX: "bounding-box";
  readonly SPHERE: "sphere";
  readonly PATH: "path";
  readonly ANGLE: "angle";
  readonly ELLIPSE: "ellipse";
  readonly POLYLINE: "polyline";
  readonly SPLINE: "spline";
} = {
  POINT: "point",
  LINE: "line",
  POLYGON: "polygon",
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  TEXT: "text",
  MEASUREMENT: "measurement",
  ARROW: "arrow",
  FREEHAND: "freehand",
  VOLUME_BRUSH: "volume-brush",
  BOUNDING_BOX: "bounding-box",
  SPHERE: "sphere",
  PATH: "path",
  ANGLE: "angle",
  ELLIPSE: "ellipse",
  POLYLINE: "polyline",
  SPLINE: "spline",
} as const;

/** Inferred type from the AnnotationType schema. */
export type AnnotationType = (typeof ANNOTATION_TYPES)[keyof typeof ANNOTATION_TYPES];

/**
 * Annotation context type discriminator for 2D/3D/XR handling.
 * Maps to Prisma AnnotationContextType enum.
 */
export const ANNOTATION_CONTEXT_TYPES: {
  readonly CONTEXT_2D: "CONTEXT_2D";
  readonly CONTEXT_3D: "CONTEXT_3D";
  readonly XR: "XR";
} = {
  CONTEXT_2D: "CONTEXT_2D",
  CONTEXT_3D: "CONTEXT_3D",
  XR: "XR",
} as const;

/** Inferred type from the AnnotationContextType schema. */
export type AnnotationContextType =
  (typeof ANNOTATION_CONTEXT_TYPES)[keyof typeof ANNOTATION_CONTEXT_TYPES];

/**
 * Coordinate space type for annotation positioning.
 * Maps to Prisma CoordinateSpaceType enum.
 */
export const COORDINATE_SPACE_TYPES: {
  readonly WORLD: "WORLD";
  readonly NORMALIZED_IMAGE: "NORMALIZED_IMAGE";
  readonly PIXEL_IMAGE: "PIXEL_IMAGE";
  readonly VIEWPORT: "VIEWPORT";
  readonly CANVAS: "CANVAS";
  readonly MODEL_LOCAL: "MODEL_LOCAL";
  readonly USD_PRIM_PATH: "USD_PRIM_PATH";
} = {
  WORLD: "WORLD",
  NORMALIZED_IMAGE: "NORMALIZED_IMAGE",
  PIXEL_IMAGE: "PIXEL_IMAGE",
  VIEWPORT: "VIEWPORT",
  CANVAS: "CANVAS",
  MODEL_LOCAL: "MODEL_LOCAL",
  USD_PRIM_PATH: "USD_PRIM_PATH",
} as const;

/** Inferred type from the CoordinateSpaceType schema. */
export type CoordinateSpaceType =
  (typeof COORDINATE_SPACE_TYPES)[keyof typeof COORDINATE_SPACE_TYPES];

/**
 * Coordinate space values accepted by annotation set APIs.
 */
export type AnnotationSetCoordinateSpace = CoordinateSpaceType;

/**
 * Annotation lifecycle status.
 * Maps to Prisma AnnotationStatus enum.
 */
export const ANNOTATION_STATUS: {
  readonly ACTIVE: "ACTIVE";
  readonly ARCHIVED: "ARCHIVED";
  readonly DELETED: "DELETED";
} = {
  ACTIVE: "ACTIVE",
  ARCHIVED: "ARCHIVED",
  DELETED: "DELETED",
} as const;

/** Inferred type from the AnnotationStatus schema. */
export type AnnotationStatus = (typeof ANNOTATION_STATUS)[keyof typeof ANNOTATION_STATUS];

// USD Annotation Types

/**
 * USD-specific annotation properties for prim-level targeting.
 *
 * Used when `coordinateSpace` is `USD_PRIM_PATH` to reference specific
 * prims in the USD scene graph hierarchy.
 */
export interface UsdAnnotationProperties {
  /** USD prim path (e.g., "/World/Model/Mesh_001"). */
  primPath: string;
  /** Optional key within the prim's customData dictionary. */
  customDataKey?: string;
  /** Referenced USD asset ID for cross-referencing. */
  usdAssetId?: string;
}

// Annotation System - Core Types

/**
 * 3D point coordinate (z optional for 2D).
 */
export interface Point3D {
  x: number;
  y: number;
  z?: number;
}

/**
 * Annotation visual style properties.
 */
export interface AnnotationStyle {
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  opacity?: number;
  fontSize?: number;
  fontFamily?: string;
  lineDash?: number[];
  lineJoin?: "miter" | "round" | "bevel";
  lineCap?: "butt" | "round" | "square";
}

/**
 * Measurement data attached to annotations.
 */
export interface MeasurementData {
  value: number;
  unit: string;
  type: "distance" | "area" | "angle" | "volume" | "perimeter" | "radius";
  calibration?: {
    pixelsPerUnit: number;
    unit: string;
  };
  precision?: number;
  formattedValue?: string;
}

/**
 * Annotation record for 2D, 3D, and XR contexts.
 */
export interface AnnotationRecord {
  id: string;
  contextType: AnnotationContextType;
  annotationType: AnnotationType | string;
  coordinateSpace: CoordinateSpaceType;
  coordinates: Point3D[];
  properties: Record<string, unknown> | null;
  measurements: MeasurementData | null;
  style: AnnotationStyle | null;
  label: string | null;
  confidence: number | null;
  notes: string | null;
  color: string | null;
  visible: boolean;
  locked: boolean;
  zIndex: number;
  layerId: string | null;
  setId: string | null;
  parentId: string | null;
  caseId: string | null;
  imageId: string | null;
  assetId: string | null;
  xrExperienceId: string | null;
  subjectType: string | null;
  subjectId: string | null;
  author: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  version: number;
  status: AnnotationStatus;
  createdAt: string;
  updatedAt: string;
  localId: string | null;
  syncedAt: string | null;
}

/**
 * Payload for creating a annotation.
 */
export interface AnnotationCreatePayload {
  contextType: AnnotationContextType;
  annotationType: AnnotationType | string;
  coordinateSpace?: CoordinateSpaceType;
  coordinates: Point3D[];
  properties?: Record<string, unknown>;
  measurements?: MeasurementData;
  style?: AnnotationStyle;
  label?: string;
  confidence?: number;
  notes?: string;
  color?: string;
  visible?: boolean;
  locked?: boolean;
  zIndex?: number;
  layerId?: string;
  setId?: string;
  parentId?: string;
  caseId?: string;
  imageId?: string;
  assetId?: string;
  xrExperienceId?: string;
  subjectType?: string;
  subjectId?: string;
  localId?: string;
}

/**
 * Payload for updating a annotation.
 */
export interface AnnotationUpdatePayload {
  /**
   * Optional optimistic concurrency version check.
   *
   * When provided, the server should only apply the update if the current record's `version`
   * matches this value, otherwise return a 409 conflict with the server snapshot.
   */
  version?: number;
  coordinateSpace?: CoordinateSpaceType;
  coordinates?: Point3D[];
  properties?: Record<string, unknown>;
  measurements?: MeasurementData;
  style?: AnnotationStyle;
  label?: string | null;
  confidence?: number | null;
  notes?: string | null;
  color?: string;
  visible?: boolean;
  locked?: boolean;
  zIndex?: number;
  layerId?: string | null;
  setId?: string | null;
  parentId?: string | null;
  subjectType?: string | null;
  subjectId?: string | null;
  status?: AnnotationStatus;
}

/**
 * Query parameters for listing annotations.
 */
export interface AnnotationQuery {
  contextType?: AnnotationContextType;
  caseId?: string;
  assetId?: string;
  xrExperienceId?: string;
  imageId?: string;
  subjectType?: string;
  subjectId?: string;
  layerId?: string;
  setId?: string;
  annotationType?: AnnotationType | string;
  status?: AnnotationStatus;
  limit?: number;
  offset?: number;
  includeDeleted?: boolean;
  orderBy?: "createdAt" | "updatedAt" | "zIndex" | "label";
  orderDirection?: "asc" | "desc";
}

/**
 * Annotation list response payload.
 */
export interface AnnotationListResponse {
  ok: true;
  annotations: AnnotationRecord[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

/**
 * Query parameters for retrieving annotation changes since a timestamp.
 *
 * This is intended for incremental sync / refresh flows (client polling, offline reconciliation).
 * The server returns records whose `updatedAt` is newer than `since`, optionally scoped by context.
 */
export interface AnnotationChangesQuery {
  /** ISO 8601 timestamp cursor (exclusive). */
  since: string;
  /**
   * Optional cursor id for stable pagination when multiple rows share the same timestamp.
   */
  cursorId?: string;
  contextType?: AnnotationContextType;
  caseId?: string;
  assetId?: string;
  xrExperienceId?: string;
  imageId?: string;
  subjectType?: string;
  subjectId?: string;
  layerId?: string;
  setId?: string;
  annotationType?: AnnotationType | string;
  /**
   * Include deleted rows so clients can apply tombstones.
   * Defaults to true for sync-style usage.
   */
  includeDeleted?: boolean;
  /** Maximum number of records to return per page. */
  limit?: number;
}

/**
 * Annotation changes response payload.
 */
export interface AnnotationChangesResponse {
  ok: true;
  /** Records changed since the cursor. Includes DELETED when requested. */
  annotations: AnnotationRecord[];
  /** Cursor passed by the client. */
  since: string;
  /**
   * Cursor to use for the next request.
   * - When `hasMore` is true, this is the last returned record's `updatedAt` (page forward).
   * - When `hasMore` is false, this is the server timestamp (advance to "now").
   */
  nextSince: string;
  /**
   * Optional cursor id to resume pagination when multiple rows share the same timestamp.
   */
  nextCursorId?: string | null;
  limit: number;
  hasMore: boolean;
  /** Server-side timestamp (ISO 8601) for sync bookkeeping. */
  serverTimestamp: string;
  /** Number of records returned in this page. */
  changedCount: number;
}

/**
 * Annotation response payload.
 */
export interface AnnotationResponse extends AnnotationRecord {
  ok: true;
}

// Annotation Layer Types

/**
 * Annotation layer DTO for grouping and z-ordering.
 */
export interface AnnotationLayerDto {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  visible: boolean;
  locked: boolean;
  opacity: number;
  zIndex: number;
  metadata: Record<string, unknown> | null;
  setId: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  annotationCount?: number;
}

/**
 * Payload for creating an annotation layer.
 */
export interface AnnotationLayerCreatePayload {
  name: string;
  description?: string;
  color?: string;
  visible?: boolean;
  locked?: boolean;
  opacity?: number;
  zIndex?: number;
  metadata?: Record<string, unknown>;
  setId?: string;
}

/**
 * Payload for updating an annotation layer.
 */
export interface AnnotationLayerUpdatePayload {
  name?: string;
  description?: string;
  color?: string;
  visible?: boolean;
  locked?: boolean;
  opacity?: number;
  zIndex?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Annotation layer list response payload.
 */
export interface AnnotationLayerListResponse {
  ok: true;
  layers: AnnotationLayerDto[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

/**
 * Annotation layer response payload.
 */
export interface AnnotationLayerResponse extends AnnotationLayerDto {
  ok: true;
}

// Annotation Set Types

/**
 * Annotation set DTO.
 */
export interface AnnotationSetSummaryDto {
  id: string;
  name: string;
  description: string | null;
  contextType: AnnotationContextType;
  coordinateSpace: CoordinateSpaceType;
  metadata: Record<string, unknown> | null;
  caseId: string | null;
  assetId: string | null;
  xrExperienceId: string | null;
  subjectType: string | null;
  subjectId: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  annotationCount?: number;
  layerCount?: number;
}

/**
 * Payload for creating a annotation set.
 */
export interface AnnotationSetSummaryCreatePayload {
  name: string;
  description?: string;
  contextType: AnnotationContextType;
  coordinateSpace?: CoordinateSpaceType;
  metadata?: Record<string, unknown>;
  caseId?: string;
  assetId?: string;
  xrExperienceId?: string;
  subjectType?: string;
  subjectId?: string;
}

/**
 * Payload for updating a annotation set.
 */
export interface AnnotationSetSummaryUpdatePayload {
  name?: string;
  description?: string;
  contextType?: AnnotationContextType;
  coordinateSpace?: CoordinateSpaceType;
  metadata?: Record<string, unknown>;
  caseId?: string;
  assetId?: string;
  xrExperienceId?: string;
  subjectType?: string;
  subjectId?: string;
}

/**
 * Query parameters for listing annotation sets.
 */
export interface AnnotationSetSummaryListQuery {
  contextType?: AnnotationContextType;
  caseId?: string;
  assetId?: string;
  xrExperienceId?: string;
  subjectType?: string;
  subjectId?: string;
  limit?: number;
  offset?: number;
}

/**
 * Annotation set list response payload.
 */
export interface AnnotationSetSummaryListResponse {
  ok: true;
  sets: AnnotationSetSummaryDto[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

/**
 * Annotation set response payload.
 */
export interface AnnotationSetSummaryResponse extends AnnotationSetSummaryDto {
  ok: true;
}

// Sync Types

/**
 * Offline sync operation for annotations.
 *
 * This is a discriminated union keyed by `type` so that create/update/delete operations
 * can carry different payload shapes while remaining type-safe end-to-end (client ↔ Elysia).
 */
export type AnnotationSyncOperation =
  | {
      type: "create";
      /** Client-side id used for offline tracking (maps to `Annotation.localId`). */
      localId: string;
      /** Annotation payload to create on the server. */
      data: AnnotationCreatePayload;
      /** Client timestamp for conflict resolution / ordering (ISO 8601). */
      timestamp: string;
    }
  | {
      type: "update";
      /** Client-side id used for offline tracking. */
      localId: string;
      /** Server-side id of the annotation to update. */
      serverId: string;
      /** Client-side snapshot version used for optimistic concurrency checks. */
      version?: number;
      /** Partial update payload. */
      data: AnnotationUpdatePayload;
      /** Client timestamp for conflict resolution / ordering (ISO 8601). */
      timestamp: string;
    }
  | {
      type: "delete";
      /** Client-side id used for offline tracking. */
      localId: string;
      /** Server-side id of the annotation to delete. */
      serverId: string;
      /** Client-side snapshot version used for optimistic concurrency checks. */
      version?: number;
      /** Client timestamp for conflict resolution / ordering (ISO 8601). */
      timestamp: string;
    };

/**
 * Annotation sync request payload.
 */
export interface AnnotationSyncPayload {
  operations: AnnotationSyncOperation[];
  lastSyncTimestamp?: string;
}

/**
 * Annotation sync response payload.
 */
export interface AnnotationSyncResponse {
  ok: true;
  synced: Array<{
    localId: string;
    serverId: string;
    operation: "create" | "update" | "delete";
    version: number;
  }>;
  conflicts: Array<{
    localId: string;
    serverId?: string;
    localVersion: number;
    serverVersion: number;
    serverData?: Partial<AnnotationRecord>;
  }>;
  serverTimestamp: string;
  syncedCount: number;
  conflictCount: number;
}

// Coordinate Transform Types

/**
 * Coordinate transformation request.
 */
export interface CoordinateTransformRequest {
  points: Point3D[];
  fromSpace: CoordinateSpaceType;
  toSpace: CoordinateSpaceType;
  imageWidth?: number;
  imageHeight?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  modelMatrix?: number[];
}

/**
 * Coordinate transformation response.
 */
export interface CoordinateTransformResponse {
  ok: true;
  points: Point3D[];
  fromSpace: CoordinateSpaceType;
  toSpace: CoordinateSpaceType;
}

// Case Annotation Types

/**
 * Query parameters for listing annotations.
 */
export interface CaseAnnotationListQuery {
  caseId: string;
  imageId?: string;
  limit?: number;
  offset?: number;
}

/**
 * Payload for creating a new annotation.
 */
export interface CaseAnnotationCreatePayload {
  caseId: string;
  imageId?: string | null;
  annotationType: AnnotationType;
  coordinates: PrismaJson;
  properties?: PrismaJson;
  label?: string | null;
  confidence?: number | null;
  parentId?: string | null;
  color?: string;
  notes?: string;
  aiGenerated?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Payload for updating an existing annotation.
 */
export interface CaseAnnotationUpdatePayload {
  coordinates?: PrismaJson;
  properties?: PrismaJson;
  label?: string | null;
  confidence?: number | null;
  parentId?: string | null;
  color?: string;
  notes?: string;
  aiGenerated?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * API annotation record shared across annotation endpoints.
 */
export interface CaseAnnotationRecord {
  id: string;
  caseId: string;
  imageId: string | null;
  annotationType: AnnotationType;
  coordinates: PrismaJson | null;
  properties: PrismaJson | null;
  label: string | null;
  confidence: number | null;
  author: string | null;
  createdAt: string;
  updatedAt: string;
  version: number | null;
  parentId: string | null;
}

/**
 * Annotation list response payload.
 */
export interface CaseAnnotationListResponse {
  ok: true;
  annotations: CaseAnnotationRecord[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

/**
 * Annotation response payload.
 */
export interface CaseAnnotationResponse extends CaseAnnotationRecord {
  ok: true;
}

/**
 * Query parameters for listing annotation sets.
 */
export interface AnnotationSetListQuery {
  assetId?: string;
  caseId?: string;
  contextType?: AnnotationContextType;
  xrExperienceId?: string;
  subjectType?: string;
  subjectId?: string;
  limit?: number;
  offset?: number;
}

/**
 * Payload for creating a new annotation set.
 */
export interface AnnotationSetCreatePayload {
  assetId?: string | null;
  name?: string;
  description?: string;
  contextType?: AnnotationContextType;
  coordinateSpace?: AnnotationSetCoordinateSpace;
  annotations?: PrismaJson[];
  metadata?: Record<string, PrismaJson>;
  caseId?: string;
  xrExperienceId?: string;
  subjectType?: string;
  subjectId?: string;
}

/**
 * Payload for updating an annotation set.
 */
export type AnnotationSetUpdatePayload = Omit<AnnotationSetCreatePayload, "assetId">;

/**
 * Source descriptor for ingesting annotation sets.
 */
export type AnnotationSetIngestSource =
  | {
      type: "ai";
      jobId?: string;
      assetId?: string;
      provider?: string;
      model?: string;
    }
  | { type: "asset"; assetId: string }
  | { type: "usd"; usdAssetId: string }
  | {
      type: "capture";
      deviceId: string;
      captureParams?: {
        resolution?: { width: number; height: number };
        format?: "jpeg" | "png" | "raw";
        quality?: number;
      };
    }
  | { type: "data-url"; dataUrl: string }
  | {
      type: "pipeline";
      assetId: string;
      pipelineRunId: string;
      pipelineId?: string;
    }
  | {
      type: "xr";
      xrExperienceId: string;
      assetId?: string;
    }
  | {
      type: "hardware";
      imageId?: string;
      dataUrl?: string;
      deviceId?: string;
    };

/**
 * Payload for ingesting an annotation set from a source.
 */
export interface AnnotationSetIngestPayload {
  source: AnnotationSetIngestSource;
  assetName?: string;
  assetMetadata?: Record<string, PrismaJson>;
  name?: string;
  description?: string;
  contextType?: AnnotationContextType;
  coordinateSpace?: AnnotationSetCoordinateSpace;
  annotations?: PrismaJson[];
  metadata?: Record<string, PrismaJson>;
  caseId?: string;
  xrExperienceId?: string;
  subjectType?: string;
  subjectId?: string;
}

/**
 * Annotation set ingest response payload.
 */
export type AnnotationSetIngestResponse = AnnotationSetResponse;

/**
 * Annotation set record shared across Three.js and annotation endpoints.
 */
export interface AnnotationSetDto {
  id: string;
  assetId: string | null;
  name: string | null;
  description: string | null;
  contextType: AnnotationContextType | null;
  coordinateSpace: CoordinateSpaceType | null;
  annotations: PrismaJson[];
  metadata: Record<string, PrismaJson> | null;
  caseId: string | null;
  xrExperienceId: string | null;
  subjectType: string | null;
  subjectId: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * Annotation set list response payload.
 */
export interface AnnotationSetListResponse {
  ok: true;
  items: AnnotationSetDto[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

/**
 * Annotation set response payload.
 */
export interface AnnotationSetResponse extends AnnotationSetDto {
  ok: true;
}

/**
 * Annotation set delete response payload.
 */
export interface AnnotationSetDeleteResponse {
  ok: true;
  deleted: boolean;
}
