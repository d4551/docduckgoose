/**
 * Geospatial subsystem schemas.
 *
 * CRS/transform/bounds contracts for future 3D Tiles and geospatial placement.
 * No full implementation yet; schema-only for subsystem ownership.
 *
 * @shared/schemas/geospatial
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Coordinate reference system identifier.
 */
export const GeospatialCrsSchema: Type.TObject<
  {
    readonly authority: Type.TString;
    readonly code: Type.TUnion<(Type.TString | Type.TNumber)[]>;
    readonly wkt: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
  },
  "code" | "authority",
  "wkt"
> = Type.Object(
  {
    authority: Type.String({ minLength: 1 }),
    code: Type.Union([Type.Number(), Type.String({ minLength: 1 })]),
    wkt: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link GeospatialCrsSchema}. */
export type GeospatialCrs = Static<typeof GeospatialCrsSchema>;

/**
 * Bounding box in a given CRS.
 */
export const GeospatialBoundsSchema = Type.Object(
  {
    crs: GeospatialCrsSchema,
    minX: Type.Number(),
    minY: Type.Number(),
    minZ: Type.Optional(Type.Number()),
    maxX: Type.Number(),
    maxY: Type.Number(),
    maxZ: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link GeospatialBoundsSchema}. */
export type GeospatialBounds = Static<typeof GeospatialBoundsSchema>;

/**
 * Transform from local to world coordinates.
 */
export const GeospatialTransformSchema = Type.Object(
  {
    crs: GeospatialCrsSchema,
    position: Type.Tuple([Type.Number(), Type.Number(), Type.Number()]),
    rotation: Type.Optional(
      Type.Tuple([Type.Number(), Type.Number(), Type.Number(), Type.Number()]),
    ),
    scale: Type.Optional(Type.Tuple([Type.Number(), Type.Number(), Type.Number()])),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link GeospatialTransformSchema}. */
export type GeospatialTransform = {
  crs: GeospatialCrs;
  position: [number, number, number];
  rotation?: [number, number, number, number];
  scale?: [number, number, number];
};
