/**
 * OpenUSD annotation round-trip schemas.
 *
 * Defines a versioned payload for embedding annotations in USD customData and
 * round-tripping them back into the platform.
 *
 * @shared/schemas/usd-annotations
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";

/**
 * Current schema version for USD annotation round-trip payloads.
 */
export const USD_ANNOTATION_SCHEMA_VERSION = "1.0.0";

/**
 * USD annotation point schema.
 */
export const UsdAnnotationPointSchema: Type.TObject<
  { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
  "x" | "y" | "z",
  never
> = Type.Object(
  {
    x: Type.Number(),
    y: Type.Number(),
    z: Type.Number(),
  },
  { additionalProperties: false },
);

/**
 * USD annotation record schema.
 */
export const UsdAnnotationRecordSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    contextType: Type.String({ minLength: 1 }),
    annotationType: Type.String({ minLength: 1 }),
    coordinateSpace: Type.String({ minLength: 1 }),
    coordinates: Type.Array(UsdAnnotationPointSchema, { minItems: 1 }),
    properties: Type.Optional(JsonObjectSchema),
    measurements: Type.Optional(JsonObjectSchema),
    style: Type.Optional(JsonObjectSchema),
    label: Type.Optional(Type.String()),
    confidence: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
    notes: Type.Optional(Type.String()),
    color: Type.Optional(Type.String()),
    visible: Type.Optional(Type.Boolean()),
    locked: Type.Optional(Type.Boolean()),
    zIndex: Type.Optional(Type.Integer()),
    metadata: Type.Optional(JsonObjectSchema),
    createdAt: Type.Optional(Type.String({ format: "date-time" })),
    updatedAt: Type.Optional(Type.String({ format: "date-time" })),
    version: Type.Optional(Type.Integer({ minimum: 0 })),
    status: Type.Optional(Type.String()),
    author: Type.Optional(Type.String()),
    localId: Type.Optional(Type.String()),
    syncedAt: Type.Optional(Type.String({ format: "date-time" })),
    assetId: Type.Optional(Type.String()),
    xrExperienceId: Type.Optional(Type.String()),
    setId: Type.Optional(Type.String()),
    layerId: Type.Optional(Type.String()),
    parentId: Type.Optional(Type.String()),
    subjectType: Type.Optional(Type.String()),
    subjectId: Type.Optional(Type.String()),
    spatialMeasurementId: Type.Optional(Type.String()),
    spatialAnchorId: Type.Optional(Type.String()),
    detectionClassId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * USD annotation round-trip entry schema.
 */
export const UsdAnnotationRoundTripEntrySchema = Type.Object(
  {
    primPath: Type.String({ minLength: 1 }),
    customDataKey: Type.Optional(Type.String({ minLength: 1 })),
    annotation: UsdAnnotationRecordSchema,
  },
  { additionalProperties: false },
);

/**
 * USD annotation round-trip payload schema.
 */
export const UsdAnnotationRoundTripSchema = Type.Object(
  {
    schemaVersion: Type.Literal(USD_ANNOTATION_SCHEMA_VERSION),
    annotations: Type.Array(UsdAnnotationRoundTripEntrySchema, { minItems: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the UsdAnnotationPoint schema. */
export type UsdAnnotationPoint = Static<typeof UsdAnnotationPointSchema>;

/** Inferred type from the UsdAnnotationRecord schema. */
export type UsdAnnotationRecord = Static<typeof UsdAnnotationRecordSchema>;

/** Inferred type from the UsdAnnotationRoundTripEntry schema. */
export type UsdAnnotationRoundTripEntry = Static<typeof UsdAnnotationRoundTripEntrySchema>;

/** Inferred type from the UsdAnnotationRoundTrip schema. */
export type UsdAnnotationRoundTrip = Static<typeof UsdAnnotationRoundTripSchema>;
