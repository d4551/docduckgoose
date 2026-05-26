/**
 * SplatBao dumpling annotation schemas.
 *
 * Dumpling-based annotation model (filling + wrapper + metadata) aligned with
 * BaoDown, BaoControlPlane, Happydumpling naming. Supports mask/region annotations,
 * anchor hierarchy, and USD round-trip via conversion utilities.
 *
 * @shared/schemas/splatbao-dumpling
 */

import type {
  InferOptionalKeys,
  Static,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";
import { Position3DSchema } from "./navigation.schemas.ts";
import { SplatbaoBBox3DSizeSchema, SplatbaoFillingSchema } from "./splatbao-perception.schemas.ts";
import type { UsdAnnotationRecord } from "./usd-annotations.schemas.ts";
import { UsdAnnotationPointSchema } from "./usd-annotations.schemas.ts";

// Basket (coordinate frame context)

/**
 * Basket — frame and coordinate reference for a set of dumplings.
 */
export const SplatbaoBasketSchema: TObject<
  {
    readonly frameId: TString;
    readonly crs: TOptional<TString>;
    readonly epoch: TOptional<TString>;
  },
  "frameId",
  InferOptionalKeys<{
    readonly frameId: TString;
    readonly crs: TOptional<TString>;
    readonly epoch: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    frameId: TypeExports.String({ minLength: 1 }),
    crs: TypeExports.Optional(TypeExports.String({ description: "e.g. EPSG:4326" })),
    epoch: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoBasket. */
export type SplatbaoBasket = Static<typeof SplatbaoBasketSchema>;

// Pleat (vertex / 3D point with optional metadata)

/**
 * Pleat — vertex or 3D point with optional normal and confidence.
 */
export const SplatbaoPleatSchema: TObject<
  {
    readonly x: TNumber;
    readonly y: TNumber;
    readonly z: TOptional<TNumber>;
    readonly normal: TOptional<
      TObject<
        { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
        "z" | "x" | "y",
        never
      >
    >;
    readonly confidence: TOptional<TNumber>;
  },
  "x" | "y",
  InferOptionalKeys<{
    readonly x: TNumber;
    readonly y: TNumber;
    readonly z: TOptional<TNumber>;
    readonly normal: TOptional<
      TObject<
        { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
        "z" | "x" | "y",
        never
      >
    >;
    readonly confidence: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    x: TypeExports.Number(),
    y: TypeExports.Number(),
    z: TypeExports.Optional(TypeExports.Number()),
    normal: TypeExports.Optional(Position3DSchema),
    confidence: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 1 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoPleat. */
export type SplatbaoPleat = Static<typeof SplatbaoPleatSchema>;

// Wrapper (geometry boundary)

/**
 * Wrapper type discriminant.
 */
export const SplatbaoWrapperTypeSchema: TUnion<
  (
    | TLiteral<"polygon">
    | TLiteral<"bbox2d">
    | TLiteral<"bbox3d">
    | TLiteral<"sdf">
    | TLiteral<"freeform">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("polygon"),
    TypeExports.Literal("bbox2d"),
    TypeExports.Literal("bbox3d"),
    TypeExports.Literal("sdf"),
    TypeExports.Literal("freeform"),
  ],
  {},
);

/** Type SplatbaoWrapperType. */
export type SplatbaoWrapperType = Static<typeof SplatbaoWrapperTypeSchema>;

/**
 * Wrapper — geometry boundary (vertices, bbox3d, sdf).
 */
export const SplatbaoWrapperSchema = TypeExports.Object(
  {
    type: SplatbaoWrapperTypeSchema,
    vertices: TypeExports.Array(SplatbaoPleatSchema, { minItems: 1 }),
    closed: TypeExports.Optional(TypeExports.Boolean()),
    sdfField: TypeExports.Optional(TypeExports.String()),
    bbox3d: TypeExports.Optional(SplatbaoBBox3DSizeSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoWrapper. */
export type SplatbaoWrapper = Static<typeof SplatbaoWrapperSchema>;

// Dumpling status

/**
 * Dumpling lifecycle status.
 */
export const SplatbaoDumplingStatusSchema: TUnion<
  (TLiteral<"draft"> | TLiteral<"confirmed"> | TLiteral<"reviewed"> | TLiteral<"exported">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("draft"),
    TypeExports.Literal("confirmed"),
    TypeExports.Literal("reviewed"),
    TypeExports.Literal("exported"),
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
export const SplatbaoDumplingRecordSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    contextType: TypeExports.String({ minLength: 1 }),
    annotationType: TypeExports.String({ minLength: 1 }),
    coordinateSpace: TypeExports.String({ minLength: 1 }),
    coordinates: TypeExports.Array(UsdAnnotationPointSchema, { minItems: 1 }),
    wrapper: TypeExports.Optional(SplatbaoWrapperSchema),
    filling: TypeExports.Optional(SplatbaoFillingSchema),
    basket: TypeExports.Optional(SplatbaoBasketSchema),
    status: TypeExports.Optional(SplatbaoDumplingStatusSchema),
    parentDumplingId: TypeExports.Optional(TypeExports.String()),
    label: TypeExports.Optional(TypeExports.String()),
    confidence: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 1 })),
    color: TypeExports.Optional(TypeExports.String()),
    visible: TypeExports.Optional(TypeExports.Boolean()),
    locked: TypeExports.Optional(TypeExports.Boolean()),
    zIndex: TypeExports.Optional(TypeExports.Integer()),
    notes: TypeExports.Optional(TypeExports.String()),
    spatialAnchorId: TypeExports.Optional(TypeExports.String()),
    detectionClassId: TypeExports.Optional(TypeExports.String()),
    spatialMeasurementId: TypeExports.Optional(TypeExports.String()),
    properties: TypeExports.Optional(JsonObjectSchema),
    measurements: TypeExports.Optional(JsonObjectSchema),
    style: TypeExports.Optional(JsonObjectSchema),
    metadata: TypeExports.Optional(JsonObjectSchema),
    createdAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    updatedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    version: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    author: TypeExports.Optional(TypeExports.String()),
    setId: TypeExports.Optional(TypeExports.String()),
    layerId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Type SplatbaoDumplingRecord. */
export type SplatbaoDumplingRecord = Static<typeof SplatbaoDumplingRecordSchema>;

// Dimsum (collection of dumplings)

/**
 * Dimsum — collection of dumplings with optional basket and metadata.
 */
export const SplatbaoDimsumSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    dumplings: TypeExports.Array(SplatbaoDumplingRecordSchema),
    basket: TypeExports.Optional(SplatbaoBasketSchema),
    setId: TypeExports.Optional(TypeExports.String()),
    layerId: TypeExports.Optional(TypeExports.String()),
    metadata: TypeExports.Optional(JsonObjectSchema),
    createdAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    updatedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
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
