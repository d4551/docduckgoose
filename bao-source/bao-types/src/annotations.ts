/**
 * Shared annotation type definitions.
 *
 * Re-exports from split modules for sets, sync, and case types.
 * @baohaus/bao-types/annotations
 */

import type { JsonObject } from "@baohaus/bao-schemas/json.schemas";

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

export type AnnotationType = (typeof ANNOTATION_TYPES)[keyof typeof ANNOTATION_TYPES];

export const ANNOTATION_CONTEXT_TYPES: {
  readonly CONTEXT_2D: "CONTEXT_2D";
  readonly CONTEXT_3D: "CONTEXT_3D";
  readonly XR: "XR";
} = { CONTEXT_2D: "CONTEXT_2D", CONTEXT_3D: "CONTEXT_3D", XR: "XR" } as const;

export type AnnotationContextType =
  (typeof ANNOTATION_CONTEXT_TYPES)[keyof typeof ANNOTATION_CONTEXT_TYPES];

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

export type CoordinateSpaceType =
  (typeof COORDINATE_SPACE_TYPES)[keyof typeof COORDINATE_SPACE_TYPES];

export type AnnotationSetCoordinateSpace = CoordinateSpaceType;

export const ANNOTATION_STATUS: {
  readonly ACTIVE: "ACTIVE";
  readonly ARCHIVED: "ARCHIVED";
  readonly DELETED: "DELETED";
} = { ACTIVE: "ACTIVE", ARCHIVED: "ARCHIVED", DELETED: "DELETED" } as const;

export type AnnotationStatus = (typeof ANNOTATION_STATUS)[keyof typeof ANNOTATION_STATUS];

export interface UsdAnnotationProperties {
  primPath: string;
  customDataKey?: string;
  usdAssetId?: string;
}

export interface Point3D {
  x: number;
  y: number;
  z?: number;
}

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

export interface MeasurementData {
  value: number;
  unit: string;
  type: "distance" | "area" | "angle" | "volume" | "perimeter" | "radius";
  calibration?: { pixelsPerUnit: number; unit: string };
  precision?: number;
  formattedValue?: string;
}

export interface AnnotationRecord {
  id: string;
  contextType: AnnotationContextType;
  annotationType: AnnotationType | string;
  coordinateSpace: CoordinateSpaceType;
  coordinates: Point3D[];
  properties: JsonObject | null;
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

export interface AnnotationCreatePayload {
  contextType: AnnotationContextType;
  annotationType: AnnotationType | string;
  coordinateSpace?: CoordinateSpaceType;
  coordinates: Point3D[];
  properties?: JsonObject;
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

export interface AnnotationUpdatePayload {
  version?: number;
  coordinateSpace?: CoordinateSpaceType;
  coordinates?: Point3D[];
  properties?: JsonObject;
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

export interface AnnotationListResponse {
  ok: true;
  annotations: AnnotationRecord[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface AnnotationChangesQuery {
  since: string;
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
  includeDeleted?: boolean;
  limit?: number;
}

export interface AnnotationChangesResponse {
  ok: true;
  annotations: AnnotationRecord[];
  since: string;
  nextSince: string;
  nextCursorId?: string | null;
  limit: number;
  hasMore: boolean;
  serverTimestamp: string;
  changedCount: number;
}

export interface AnnotationResponse extends AnnotationRecord {
  ok: true;
}

export interface AnnotationLayerDto {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  visible: boolean;
  locked: boolean;
  opacity: number;
  zIndex: number;
  metadata: JsonObject | null;
  setId: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  annotationCount?: number;
}

export interface AnnotationLayerCreatePayload {
  name: string;
  description?: string;
  color?: string;
  visible?: boolean;
  locked?: boolean;
  opacity?: number;
  zIndex?: number;
  metadata?: JsonObject;
  setId?: string;
}

export interface AnnotationLayerUpdatePayload {
  name?: string;
  description?: string;
  color?: string;
  visible?: boolean;
  locked?: boolean;
  opacity?: number;
  zIndex?: number;
  metadata?: JsonObject;
}

export interface AnnotationLayerListResponse {
  ok: true;
  layers: AnnotationLayerDto[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface AnnotationLayerResponse extends AnnotationLayerDto {
  ok: true;
}

// Re-export from split module
export type {
  AnnotationSetCreatePayload,
  AnnotationSetDeleteResponse,
  AnnotationSetDto,
  AnnotationSetIngestPayload,
  AnnotationSetIngestResponse,
  AnnotationSetIngestSource,
  AnnotationSetListQuery,
  AnnotationSetListResponse,
  AnnotationSetResponse,
  AnnotationSetSummaryCreatePayload,
  AnnotationSetSummaryDto,
  AnnotationSetSummaryListQuery,
  AnnotationSetSummaryListResponse,
  AnnotationSetSummaryResponse,
  AnnotationSetSummaryUpdatePayload,
  AnnotationSetUpdatePayload,
  AnnotationSyncOperation,
  AnnotationSyncPayload,
  AnnotationSyncResponse,
  CaseAnnotationCreatePayload,
  CaseAnnotationListQuery,
  CaseAnnotationListResponse,
  CaseAnnotationRecord,
  CaseAnnotationResponse,
  CaseAnnotationUpdatePayload,
  CoordinateTransformRequest,
  CoordinateTransformResponse,
} from "./annotation-sets";
