/**
 * SplatBao dumpling annotation schemas.
 *
 * Dumpling-based annotation model (filling + wrapper + metadata) aligned with
 * BaoDown, BaoControlPlane, Happydumpling naming. Supports mask/region annotations,
 * anchor hierarchy, and USD round-trip via conversion utilities.
 *
 * @shared/schemas/splatbao-dumpling
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";
import { Position3DSchema } from "./navigation.schemas.ts";
import { SplatbaoBBox3DSizeSchema, SplatbaoFillingSchema } from "./splatbao-perception.schemas.ts";
import type { UsdAnnotationRecord } from "./usd-annotations.schemas.ts";
import { UsdAnnotationPointSchema } from "./usd-annotations.schemas.ts";

// Basket (coordinate frame context)

/**
 * Basket — frame and coordinate reference for a set of dumplings.
 */
export const SplatbaoBasketSchema: Type.TObject<
  {
    readonly frameId: Type.TString;
    readonly crs: Type.TOptional<Type.TString>;
    readonly epoch: Type.TOptional<Type.TString>;
  },
  "frameId",
  Type.InferOptionalKeys<{
    readonly frameId: Type.TString;
    readonly crs: Type.TOptional<Type.TString>;
    readonly epoch: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    frameId: Type.String({ minLength: 1 }),
    crs: Type.Optional(Type.String({ description: "e.g. EPSG:4326" })),
    epoch: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoBasket. */
export type SplatbaoBasket = Static<typeof SplatbaoBasketSchema>;

// Pleat (vertex / 3D point with optional metadata)

/**
 * Pleat — vertex or 3D point with optional normal and confidence.
 */
export const SplatbaoPleatSchema: Type.TObject<
  {
    readonly x: Type.TNumber;
    readonly y: Type.TNumber;
    readonly z: Type.TOptional<Type.TNumber>;
    readonly normal: Type.TOptional<
      Type.TObject<
        { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
        "z" | "x" | "y",
        never
      >
    >;
    readonly confidence: Type.TOptional<Type.TNumber>;
  },
  "x" | "y",
  Type.InferOptionalKeys<{
    readonly x: Type.TNumber;
    readonly y: Type.TNumber;
    readonly z: Type.TOptional<Type.TNumber>;
    readonly normal: Type.TOptional<
      Type.TObject<
        { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
        "z" | "x" | "y",
        never
      >
    >;
    readonly confidence: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    x: Type.Number(),
    y: Type.Number(),
    z: Type.Optional(Type.Number()),
    normal: Type.Optional(Position3DSchema),
    confidence: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoPleat. */
export type SplatbaoPleat = Static<typeof SplatbaoPleatSchema>;

// Wrapper (geometry boundary)

/**
 * Wrapper type discriminant.
 */
export const SplatbaoWrapperTypeSchema: Type.TUnion<
  (
    | Type.TLiteral<"polygon">
    | Type.TLiteral<"bbox2d">
    | Type.TLiteral<"bbox3d">
    | Type.TLiteral<"sdf">
    | Type.TLiteral<"freeform">
  )[]
> = Type.Union(
  [
    Type.Literal("polygon"),
    Type.Literal("bbox2d"),
    Type.Literal("bbox3d"),
    Type.Literal("sdf"),
    Type.Literal("freeform"),
  ],
  {},
);

/** Type SplatbaoWrapperType. */
export type SplatbaoWrapperType = Static<typeof SplatbaoWrapperTypeSchema>;

/**
 * Wrapper — geometry boundary (vertices, bbox3d, sdf).
 */
export const SplatbaoWrapperSchema = Type.Object(
  {
    type: SplatbaoWrapperTypeSchema,
    vertices: Type.Array(SplatbaoPleatSchema, { minItems: 1 }),
    closed: Type.Optional(Type.Boolean()),
    sdfField: Type.Optional(Type.String()),
    bbox3d: Type.Optional(SplatbaoBBox3DSizeSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoWrapper. */
export type SplatbaoWrapper = Static<typeof SplatbaoWrapperSchema>;

// Dumpling status

/**
 * Dumpling lifecycle status.
 */
export const SplatbaoDumplingStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"draft">
    | Type.TLiteral<"confirmed">
    | Type.TLiteral<"reviewed">
    | Type.TLiteral<"exported">
  )[]
> = Type.Union(
  [
    Type.Literal("draft"),
    Type.Literal("confirmed"),
    Type.Literal("reviewed"),
    Type.Literal("exported"),
  ],
  {},
);

/** Type SplatbaoDumplingStatus. */
export type SplatbaoDumplingStatus = Static<typeof SplatbaoDumplingStatusSchema>;

// Dumpling record (core annotation + dumpling extensions)

/**
 * Dumpling record — re-declares UsdAnnotationRecord fields plus dumpling-specific
 * extensions (wrapper, filling, basket, status, parentDumplingId).
 */
export const SplatbaoDumplingRecordSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    contextType: Type.String({ minLength: 1 }),
    annotationType: Type.String({ minLength: 1 }),
    coordinateSpace: Type.String({ minLength: 1 }),
    coordinates: Type.Array(UsdAnnotationPointSchema, { minItems: 1 }),
    wrapper: Type.Optional(SplatbaoWrapperSchema),
    filling: Type.Optional(SplatbaoFillingSchema),
    basket: Type.Optional(SplatbaoBasketSchema),
    status: Type.Optional(SplatbaoDumplingStatusSchema),
    parentDumplingId: Type.Optional(Type.String()),
    label: Type.Optional(Type.String()),
    confidence: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
    color: Type.Optional(Type.String()),
    visible: Type.Optional(Type.Boolean()),
    locked: Type.Optional(Type.Boolean()),
    zIndex: Type.Optional(Type.Integer()),
    notes: Type.Optional(Type.String()),
    spatialAnchorId: Type.Optional(Type.String()),
    detectionClassId: Type.Optional(Type.String()),
    spatialMeasurementId: Type.Optional(Type.String()),
    properties: Type.Optional(JsonObjectSchema),
    measurements: Type.Optional(JsonObjectSchema),
    style: Type.Optional(JsonObjectSchema),
    metadata: Type.Optional(JsonObjectSchema),
    createdAt: Type.Optional(Type.String({ format: "date-time" })),
    updatedAt: Type.Optional(Type.String({ format: "date-time" })),
    version: Type.Optional(Type.Integer({ minimum: 0 })),
    author: Type.Optional(Type.String()),
    setId: Type.Optional(Type.String()),
    layerId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Type SplatbaoDumplingRecord. */
export type SplatbaoDumplingRecord = Static<typeof SplatbaoDumplingRecordSchema>;

// Dimsum (collection of dumplings)

/**
 * Dimsum — collection of dumplings with optional basket and metadata.
 */
export const SplatbaoDimsumSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    dumplings: Type.Array(SplatbaoDumplingRecordSchema),
    basket: Type.Optional(SplatbaoBasketSchema),
    setId: Type.Optional(Type.String()),
    layerId: Type.Optional(Type.String()),
    metadata: Type.Optional(JsonObjectSchema),
    createdAt: Type.Optional(Type.String({ format: "date-time" })),
    updatedAt: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoDimsum. */
export type SplatbaoDimsum = Static<typeof SplatbaoDimsumSchema>;

// Conversion utilities

/**
 * Convert a dumpling record to a USD annotation record.
 *
 * Dumpling-specific fields (`wrapper`, `filling`, `basket`, `status`,
 * `parentDumplingId`) are **not** preserved in the USD annotation.
 * A `dumpling → annotation → dumpling` round-trip will lose those fields.
 * To persist them through USD, store them in the `metadata` object before conversion.
 *
 * @param d - Dumpling record.
 * @returns USD annotation record (dumpling-specific fields omitted).
 */
export function dumplingToAnnotation(d: SplatbaoDumplingRecord): UsdAnnotationRecord {
  return {
    id: d.id,
    contextType: d.contextType,
    annotationType: d.annotationType,
    coordinateSpace: d.coordinateSpace,
    coordinates: d.coordinates,
    properties: d.properties,
    measurements: d.measurements,
    style: d.style,
    label: d.label,
    confidence: d.confidence,
    notes: d.notes,
    color: d.color,
    visible: d.visible,
    locked: d.locked,
    zIndex: d.zIndex,
    metadata: d.metadata,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    version: d.version,
    author: d.author,
    setId: d.setId,
    layerId: d.layerId,
    spatialMeasurementId: d.spatialMeasurementId,
    spatialAnchorId: d.spatialAnchorId,
    detectionClassId: d.detectionClassId,
  };
}

/**
 * Convert a USD annotation record to a dumpling record.
 *
 * The resulting dumpling will have `wrapper`, `filling`, `basket`, `status`,
 * and `parentDumplingId` set to `undefined`. If the original dumpling stored
 * those values in `metadata` before the forward conversion, they can be
 * restored manually after calling this function.
 *
 * @param a - USD annotation record.
 * @returns Dumpling record (wrapper, filling, basket, status, parentDumplingId undefined).
 */
export function annotationToDumpling(a: UsdAnnotationRecord): SplatbaoDumplingRecord {
  return {
    id: a.id,
    contextType: a.contextType,
    annotationType: a.annotationType,
    coordinateSpace: a.coordinateSpace,
    coordinates: a.coordinates,
    label: a.label,
    confidence: a.confidence,
    color: a.color,
    visible: a.visible,
    locked: a.locked,
    zIndex: a.zIndex,
    notes: a.notes,
    spatialAnchorId: a.spatialAnchorId,
    detectionClassId: a.detectionClassId,
    spatialMeasurementId: a.spatialMeasurementId,
    properties: a.properties,
    measurements: a.measurements,
    style: a.style,
    metadata: a.metadata,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
    version: a.version,
    author: a.author,
    setId: a.setId,
    layerId: a.layerId,
  };
}
