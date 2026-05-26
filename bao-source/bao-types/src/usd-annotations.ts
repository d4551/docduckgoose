/**
 * Shared OpenUSD annotation round-trip types.
 *
 * Mirrors the USD annotation round-trip schema for cross-service use.
 *
 * @shared/types/usd-annotations.ts
 */

import type { AnnotationRecord } from "./annotations.ts";

/**
 * USD annotation schema version literal.
 */
export type UsdAnnotationSchemaVersion = "1.0.0";

/**
 * USD annotation point coordinates.
 */
export interface UsdAnnotationPoint {
  x: number;
  y: number;
  z: number;
}

/**
 * USD annotation record payload embedded in customData.
 */
export interface UsdAnnotationRecordPayload {
  id: string;
  contextType: string;
  annotationType: string;
  coordinateSpace: string;
  coordinates: UsdAnnotationPoint[];
  properties?: Record<string, unknown>;
  measurements?: Record<string, unknown>;
  style?: Record<string, unknown>;
  label?: string;
  confidence?: number;
  notes?: string;
  color?: string;
  visible?: boolean;
  locked?: boolean;
  zIndex?: number;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
  status?: string;
  author?: string;
  localId?: string;
  syncedAt?: string;
  assetId?: string;
  xrExperienceId?: string;
  setId?: string;
  layerId?: string;
  parentId?: string;
  subjectType?: string;
  subjectId?: string;
}

/**
 * USD annotation round-trip entry payload.
 */
export interface UsdAnnotationRoundTripEntryPayload {
  primPath: string;
  customDataKey?: string;
  annotation: UsdAnnotationRecordPayload;
}

/**
 * USD annotation round-trip payload.
 */
export interface UsdAnnotationRoundTripPayload {
  schemaVersion: UsdAnnotationSchemaVersion;
  annotations: UsdAnnotationRoundTripEntryPayload[];
}

/**
 * Convert a full annotation record into a USD annotation payload.
 */
export type UsdAnnotationRecordMapper = (
  annotation: AnnotationRecord,
) => UsdAnnotationRecordPayload;
