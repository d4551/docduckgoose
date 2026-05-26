/**
 * Annotation set, sync, coordinate, case, and ingest types.
 * Extracted from annotations.ts to keep module size under 400 lines.
 */

import type {
  AnnotationContextType,
  AnnotationCreatePayload,
  AnnotationRecord,
  AnnotationSetCoordinateSpace,
  AnnotationType,
  AnnotationUpdatePayload,
  CoordinateSpaceType,
  Point3D,
} from "./annotations";
import type { PrismaJson } from "./prisma.types.ts";

// Annotation Set Types

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

export interface AnnotationSetSummaryListResponse {
  ok: true;
  sets: AnnotationSetSummaryDto[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface AnnotationSetSummaryResponse extends AnnotationSetSummaryDto {
  ok: true;
}

// Sync Types

export type AnnotationSyncOperation =
  | { type: "create"; localId: string; data: AnnotationCreatePayload; timestamp: string }
  | {
      type: "update";
      localId: string;
      serverId: string;
      version?: number;
      data: AnnotationUpdatePayload;
      timestamp: string;
    }
  | { type: "delete"; localId: string; serverId: string; version?: number; timestamp: string };

export interface AnnotationSyncPayload {
  operations: AnnotationSyncOperation[];
  lastSyncTimestamp?: string;
}

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

export interface CoordinateTransformResponse {
  ok: true;
  points: Point3D[];
  fromSpace: CoordinateSpaceType;
  toSpace: CoordinateSpaceType;
}

// Case Annotation Types

export interface CaseAnnotationListQuery {
  caseId: string;
  imageId?: string;
  limit?: number;
  offset?: number;
}

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

export interface CaseAnnotationListResponse {
  ok: true;
  annotations: CaseAnnotationRecord[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface CaseAnnotationResponse extends CaseAnnotationRecord {
  ok: true;
}

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

export type AnnotationSetUpdatePayload = Omit<AnnotationSetCreatePayload, "assetId">;

export type AnnotationSetIngestSource =
  | { type: "ai"; jobId?: string; assetId?: string; provider?: string; model?: string }
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
  | { type: "pipeline"; assetId: string; pipelineRunId: string; pipelineId?: string }
  | { type: "xr"; xrExperienceId: string; assetId?: string }
  | { type: "hardware"; imageId?: string; dataUrl?: string; deviceId?: string };

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

export type AnnotationSetIngestResponse = AnnotationSetResponse;

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

export interface AnnotationSetListResponse {
  ok: true;
  items: AnnotationSetDto[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface AnnotationSetResponse extends AnnotationSetDto {
  ok: true;
}

export interface AnnotationSetDeleteResponse {
  ok: true;
  deleted: boolean;
}
