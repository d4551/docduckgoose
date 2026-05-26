/**
 * USD annotation round-trip helpers.
 *
 * Converts annotations to/from USD customData payloads using a versioned schema.
 *
 * @shared/utils/usd-annotation-roundtrip
 */

import { Check } from "@baohaus/baobox/value";
import {
  USD_ANNOTATION_SCHEMA_VERSION,
  UsdAnnotationRoundTripSchema,
} from "../schemas/usd-annotations.schemas.ts";
import type { AnnotationRecord } from "../types/annotations.ts";
import type {
  UsdAnnotationRecordPayload,
  UsdAnnotationRoundTripEntryPayload,
  UsdAnnotationRoundTripPayload,
  UsdAnnotationSchemaVersion,
} from "../types/usd-annotations.ts";

/**
 * Build options for USD annotation round-trip payloads.
 */
export interface UsdAnnotationRoundTripBuildOptions {
  /** Override schema version when a future version is negotiated. */
  schemaVersion?: UsdAnnotationSchemaVersion;
  /** Optional customData key to associate with every entry. */
  customDataKey?: string;
}

/**
 * Result type for USD annotation round-trip payload construction.
 */
export type UsdAnnotationRoundTripBuildResult =
  | { ok: true; payload: UsdAnnotationRoundTripPayload; warnings: string[] }
  | { ok: false; error: string; warnings: string[] };

/**
 * Result type for USD annotation round-trip payload parsing.
 */
export type UsdAnnotationRoundTripParseResult =
  | { ok: true; payload: UsdAnnotationRoundTripPayload; warnings: string[] }
  | { ok: false; error: string; warnings: string[] };

function toUsdAnnotationCoordinates(
  annotation: AnnotationRecord,
): UsdAnnotationRecordPayload["coordinates"] {
  return annotation.coordinates.map((point) => ({
    x: point.x,
    y: point.y,
    z: point.z ?? 0,
  }));
}

function toUsdAnnotationContentFields(
  annotation: AnnotationRecord,
): Pick<
  UsdAnnotationRecordPayload,
  "color" | "confidence" | "label" | "measurements" | "notes" | "properties" | "style"
> {
  return {
    properties: annotation.properties ?? undefined,
    measurements: annotation.measurements ? { ...annotation.measurements } : undefined,
    style: annotation.style ? { ...annotation.style } : undefined,
    label: annotation.label ?? undefined,
    confidence: annotation.confidence ?? undefined,
    notes: annotation.notes ?? undefined,
    color: annotation.color ?? undefined,
  };
}

function toUsdAnnotationIdentityFields(
  annotation: AnnotationRecord,
): Pick<
  UsdAnnotationRecordPayload,
  | "author"
  | "createdAt"
  | "localId"
  | "locked"
  | "metadata"
  | "status"
  | "syncedAt"
  | "updatedAt"
  | "version"
  | "visible"
  | "zIndex"
> {
  return {
    visible: annotation.visible,
    locked: annotation.locked,
    zIndex: annotation.zIndex,
    metadata: undefined,
    createdAt: annotation.createdAt,
    updatedAt: annotation.updatedAt,
    version: annotation.version,
    status: annotation.status,
    author: annotation.author ?? undefined,
    localId: annotation.localId ?? undefined,
    syncedAt: annotation.syncedAt ?? undefined,
  };
}

function toUsdAnnotationAssociationFields(
  annotation: AnnotationRecord,
): Pick<
  UsdAnnotationRecordPayload,
  "assetId" | "layerId" | "parentId" | "setId" | "subjectId" | "subjectType" | "xrExperienceId"
> {
  return {
    assetId: annotation.assetId ?? undefined,
    xrExperienceId: annotation.xrExperienceId ?? undefined,
    setId: annotation.setId ?? undefined,
    layerId: annotation.layerId ?? undefined,
    parentId: annotation.parentId ?? undefined,
    subjectType: annotation.subjectType ?? undefined,
    subjectId: annotation.subjectId ?? undefined,
  };
}

/**
 * Create a USD annotation payload from a platform annotation record.
 *
 * @param annotation - Source annotation record.
 * @returns USD annotation payload.
 */
export function toUsdAnnotationRecordPayload(
  annotation: AnnotationRecord,
): UsdAnnotationRecordPayload {
  return {
    id: annotation.id,
    contextType: annotation.contextType,
    annotationType: annotation.annotationType,
    coordinateSpace: annotation.coordinateSpace,
    coordinates: toUsdAnnotationCoordinates(annotation),
    ...toUsdAnnotationContentFields(annotation),
    ...toUsdAnnotationIdentityFields(annotation),
    ...toUsdAnnotationAssociationFields(annotation),
  };
}

/**
 * Build a USD annotation round-trip payload from annotation records.
 *
 * @param annotations - Annotation records to include.
 * @param options - Build options.
 * @returns Build result with payload or error.
 */
export function buildUsdAnnotationRoundTripPayload(
  annotations: AnnotationRecord[],
  options: UsdAnnotationRoundTripBuildOptions = {},
): UsdAnnotationRoundTripBuildResult {
  const warnings: string[] = [];
  if (!Array.isArray(annotations) || annotations.length === 0) {
    return { ok: false, error: "No annotations provided for USD round-trip payload.", warnings };
  }

  const entries: UsdAnnotationRoundTripEntryPayload[] = [];
  for (const annotation of annotations) {
    const properties = annotation.properties ?? {};
    const primPath = typeof properties.primPath === "string" ? properties.primPath.trim() : "";
    if (!primPath) {
      warnings.push(`Annotation ${annotation.id} is missing primPath; skipping.`);
      continue;
    }

    entries.push({
      primPath,
      customDataKey: options.customDataKey,
      annotation: toUsdAnnotationRecordPayload(annotation),
    });
  }

  if (entries.length === 0) {
    return { ok: false, error: "No USD-compatible annotations were found.", warnings };
  }

  const schemaVersion = options.schemaVersion ?? USD_ANNOTATION_SCHEMA_VERSION;

  return {
    ok: true,
    payload: {
      schemaVersion,
      annotations: entries,
    },
    warnings,
  };
}

/**
 * Parse a USD annotation round-trip payload.
 *
 * @param payload - Candidate payload.
 * @returns Parse result with normalized payload or error.
 */
export function parseUsdAnnotationRoundTripPayload(
  payload: unknown,
): UsdAnnotationRoundTripParseResult {
  const warnings: string[] = [];
  if (!Check(UsdAnnotationRoundTripSchema, payload)) {
    return { ok: false, error: "Invalid USD annotation round-trip payload.", warnings };
  }

  return {
    ok: true,
    payload: payload as UsdAnnotationRoundTripPayload,
    warnings,
  };
}
