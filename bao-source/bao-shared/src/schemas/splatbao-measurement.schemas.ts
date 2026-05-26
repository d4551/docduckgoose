/**
 * SplatBao spatial measurement schemas.
 *
 * Defines contract-first TypeBox schemas for spatial measurements
 * (distance, area, volume, angle, bounding box, cross section).
 *
 * @shared/schemas/splatbao-measurement
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";
import { Position3DSchema as SplatbaoPosition3DSchema } from "./navigation.schemas.ts";

// Measurement enums

/**
 * Spatial measurement type.
 */
export const SplatbaoMeasurementTypeSchema: Type.TUnion<
  (
    | Type.TLiteral<"distance">
    | Type.TLiteral<"area">
    | Type.TLiteral<"volume">
    | Type.TLiteral<"angle">
    | Type.TLiteral<"bounding_box">
    | Type.TLiteral<"cross_section">
  )[]
> = Type.Union([
  Type.Literal("distance"),
  Type.Literal("area"),
  Type.Literal("volume"),
  Type.Literal("angle"),
  Type.Literal("bounding_box"),
  Type.Literal("cross_section"),
]);

/** Type SplatbaoMeasurementType. */
export type SplatbaoMeasurementType = Static<typeof SplatbaoMeasurementTypeSchema>;

/**
 * Measurement unit.
 */
export const SplatbaoMeasurementUnitSchema: Type.TUnion<
  (
    | Type.TLiteral<"m">
    | Type.TLiteral<"cm">
    | Type.TLiteral<"mm">
    | Type.TLiteral<"deg">
    | Type.TLiteral<"rad">
    | Type.TLiteral<"m2">
    | Type.TLiteral<"m3">
  )[]
> = Type.Union([
  Type.Literal("m"),
  Type.Literal("cm"),
  Type.Literal("mm"),
  Type.Literal("deg"),
  Type.Literal("rad"),
  Type.Literal("m2"),
  Type.Literal("m3"),
]);

/** Type SplatbaoMeasurementUnit. */
export type SplatbaoMeasurementUnit = Static<typeof SplatbaoMeasurementUnitSchema>;

/**
 * Measurement mode (Euclidean vs geodesic).
 */
export const SplatbaoMeasurementModeSchema: Type.TUnion<
  (Type.TLiteral<"euclidean"> | Type.TLiteral<"geodesic">)[]
> = Type.Union([Type.Literal("euclidean"), Type.Literal("geodesic")]);

/** Type SplatbaoMeasurementMode. */
export type SplatbaoMeasurementMode = Static<typeof SplatbaoMeasurementModeSchema>;

// Measurement record

/**
 * Spatial measurement record.
 */
export const SplatbaoMeasurementSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    type: SplatbaoMeasurementTypeSchema,
    anchorIds: Type.Array(Type.String({ minLength: 1 })),
    frameId: Type.String({ minLength: 1 }),
    value: Type.Number(),
    unit: SplatbaoMeasurementUnitSchema,
    pointA: Type.Optional(SplatbaoPosition3DSchema),
    pointB: Type.Optional(SplatbaoPosition3DSchema),
    visualizationGeometry: Type.Optional(JsonObjectSchema),
    metadata: Type.Optional(JsonObjectSchema),
    precisionEstimate: Type.Optional(Type.Number({ minimum: 0 })),
    sessionId: Type.Optional(Type.String()),
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoMeasurement. */
export type SplatbaoMeasurement = Static<typeof SplatbaoMeasurementSchema>;

// Measurement request/response

/**
 * Compute measurement request.
 */
export const SplatbaoMeasurementRequestSchema = Type.Object(
  {
    type: SplatbaoMeasurementTypeSchema,
    anchorIds: Type.Optional(Type.Array(Type.String({ minLength: 1 }), { minItems: 1 })),
    points: Type.Optional(Type.Array(SplatbaoPosition3DSchema, { minItems: 2 })),
    frameId: Type.String({ minLength: 1 }),
    mode: Type.Optional(SplatbaoMeasurementModeSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoMeasurementRequest. */
export type SplatbaoMeasurementRequest = Static<typeof SplatbaoMeasurementRequestSchema>;

/**
 * Compute measurement response.
 */
export const SplatbaoMeasurementResponseSchema = Type.Object(
  {
    measurement: SplatbaoMeasurementSchema,
    visualizationGeometry: Type.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoMeasurementResponse. */
export type SplatbaoMeasurementResponse = Static<typeof SplatbaoMeasurementResponseSchema>;
