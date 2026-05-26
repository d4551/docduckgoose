/**
 * OpenUSD annotation round-trip schemas.
 *
 * Defines a versioned payload for embedding annotations in USD customData and
 * round-tripping them back into the platform.
 *
 * @shared/schemas/usd-annotations
 */

import type { Static, TNumber, TObject } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";

/**
 * Current schema version for USD annotation round-trip payloads.
 */
export const USD_ANNOTATION_SCHEMA_VERSION = "1.0.0";

/**
 * USD annotation point schema.
 */
export const UsdAnnotationPointSchema: TObject<
  { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
  "x" | "y" | "z",
  never
> = TypeExports.Object(
  {
    x: TypeExports.Number(),
    y: TypeExports.Number(),
    z: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/**
 * USD annotation record schema.
 */
export const UsdAnnotationRecordSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    contextType: TypeExports.String({ minLength: 1 }),
    annotationType: TypeExports.String({ minLength: 1 }),
    coordinateSpace: TypeExports.String({ minLength: 1 }),
    coordinates: TypeExports.Array(UsdAnnotationPointSchema, { minItems: 1 }),
    properties: TypeExports.Optional(JsonObjectSchema),
    measurements: TypeExports.Optional(JsonObjectSchema),
    style: TypeExports.Optional(JsonObjectSchema),
    label: TypeExports.Optional(TypeExports.String()),
    confidence: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 1 })),
    notes: TypeExports.Optional(TypeExports.String()),
    color: TypeExports.Optional(TypeExports.String()),
    visible: TypeExports.Optional(TypeExports.Boolean()),
    locked: TypeExports.Optional(TypeExports.Boolean()),
    zIndex: TypeExports.Optional(TypeExports.Integer()),
    metadata: TypeExports.Optional(JsonObjectSchema),
    createdAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    updatedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    version: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    status: TypeExports.Optional(TypeExports.String()),
    author: TypeExports.Optional(TypeExports.String()),
    localId: TypeExports.Optional(TypeExports.String()),
    syncedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    assetId: TypeExports.Optional(TypeExports.String()),
    xrExperienceId: TypeExports.Optional(TypeExports.String()),
    setId: TypeExports.Optional(TypeExports.String()),
    layerId: TypeExports.Optional(TypeExports.String()),
    parentId: TypeExports.Optional(TypeExports.String()),
    subjectType: TypeExports.Optional(TypeExports.String()),
    subjectId: TypeExports.Optional(TypeExports.String()),
    spatialMeasurementId: TypeExports.Optional(TypeExports.String()),
    spatialAnchorId: TypeExports.Optional(TypeExports.String()),
    detectionClassId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * USD annotation round-trip entry schema.
 */
export const UsdAnnotationRoundTripEntrySchema = TypeExports.Object(
  {
    primPath: TypeExports.String({ minLength: 1 }),
    customDataKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    annotation: UsdAnnotationRecordSchema,
  },
  { additionalProperties: false },
);

/**
 * USD annotation round-trip payload schema.
 */
export const UsdAnnotationRoundTripSchema = TypeExports.Object(
  {
    schemaVersion: TypeExports.Literal(USD_ANNOTATION_SCHEMA_VERSION),
    annotations: TypeExports.Array(UsdAnnotationRoundTripEntrySchema, { minItems: 1 }),
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
