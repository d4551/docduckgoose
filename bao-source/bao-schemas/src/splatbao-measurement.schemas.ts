/**
 * SplatBao spatial measurement schemas.
 *
 * Defines contract-first TypeBox schemas for spatial measurements
 * (distance, area, volume, angle, bounding box, cross section).
 *
 * @shared/schemas/splatbao-measurement
 */

import type { Static, TLiteral, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";
import { Position3DSchema as SplatbaoPosition3DSchema } from "./navigation.schemas.ts";

// Measurement enums

/**
 * Spatial measurement type.
 */
export const SplatbaoMeasurementTypeSchema: TUnion<
  (
    | TLiteral<"distance">
    | TLiteral<"area">
    | TLiteral<"volume">
    | TLiteral<"angle">
    | TLiteral<"bounding_box">
    | TLiteral<"cross_section">
  )[]
> = TypeExports.Union([
  TypeExports.Literal("distance"),
  TypeExports.Literal("area"),
  TypeExports.Literal("volume"),
  TypeExports.Literal("angle"),
  TypeExports.Literal("bounding_box"),
  TypeExports.Literal("cross_section"),
]);

/** Type SplatbaoMeasurementType. */
export type SplatbaoMeasurementType = Static<typeof SplatbaoMeasurementTypeSchema>;

/**
 * Measurement unit.
 */
export const SplatbaoMeasurementUnitSchema: TUnion<
  (
    | TLiteral<"m">
    | TLiteral<"cm">
    | TLiteral<"mm">
    | TLiteral<"deg">
    | TLiteral<"rad">
    | TLiteral<"m2">
    | TLiteral<"m3">
  )[]
> = TypeExports.Union([
  TypeExports.Literal("m"),
  TypeExports.Literal("cm"),
  TypeExports.Literal("mm"),
  TypeExports.Literal("deg"),
  TypeExports.Literal("rad"),
  TypeExports.Literal("m2"),
  TypeExports.Literal("m3"),
]);

/** Type SplatbaoMeasurementUnit. */
export type SplatbaoMeasurementUnit = Static<typeof SplatbaoMeasurementUnitSchema>;

/**
 * Measurement mode (Euclidean vs geodesic).
 */
export const SplatbaoMeasurementModeSchema: TUnion<
  (TLiteral<"euclidean"> | TLiteral<"geodesic">)[]
> = TypeExports.Union([TypeExports.Literal("euclidean"), TypeExports.Literal("geodesic")]);

/** Type SplatbaoMeasurementMode. */
export type SplatbaoMeasurementMode = Static<typeof SplatbaoMeasurementModeSchema>;

// Measurement record

/**
 * Spatial measurement record.
 */
export const SplatbaoMeasurementSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    type: SplatbaoMeasurementTypeSchema,
    anchorIds: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    frameId: TypeExports.String({ minLength: 1 }),
    value: TypeExports.Number(),
    unit: SplatbaoMeasurementUnitSchema,
    pointA: TypeExports.Optional(SplatbaoPosition3DSchema),
    pointB: TypeExports.Optional(SplatbaoPosition3DSchema),
    visualizationGeometry: TypeExports.Optional(JsonObjectSchema),
    metadata: TypeExports.Optional(JsonObjectSchema),
    precisionEstimate: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    sessionId: TypeExports.Optional(TypeExports.String()),
    createdAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoMeasurement. */
export type SplatbaoMeasurement = Static<typeof SplatbaoMeasurementSchema>;

// Measurement request/response

/**
 * Compute measurement request.
 */
export const SplatbaoMeasurementRequestSchema = TypeExports.Object(
  {
    type: SplatbaoMeasurementTypeSchema,
    anchorIds: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
    ),
    points: TypeExports.Optional(TypeExports.Array(SplatbaoPosition3DSchema, { minItems: 2 })),
    frameId: TypeExports.String({ minLength: 1 }),
    mode: TypeExports.Optional(SplatbaoMeasurementModeSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoMeasurementRequest. */
export type SplatbaoMeasurementRequest = Static<typeof SplatbaoMeasurementRequestSchema>;

/**
 * Compute measurement response.
 */
export const SplatbaoMeasurementResponseSchema = TypeExports.Object(
  {
    measurement: SplatbaoMeasurementSchema,
    visualizationGeometry: TypeExports.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoMeasurementResponse. */
export type SplatbaoMeasurementResponse = Static<typeof SplatbaoMeasurementResponseSchema>;
