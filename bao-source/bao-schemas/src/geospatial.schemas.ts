/**
 * Geospatial subsystem schemas.
 *
 * CRS/transform/bounds contracts for future 3D Tiles and geospatial placement.
 * No full implementation yet; schema-only for subsystem ownership.
 *
 * @shared/schemas/geospatial
 */

import type {
  Static,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Coordinate reference system identifier.
 */
export const GeospatialCrsSchema: TObject<
  {
    readonly authority: TString;
    readonly code: TUnion<(TString | TNumber)[]>;
    readonly wkt: TOptional<TUnion<(TString | TNull)[]>>;
  },
  "code" | "authority",
  "wkt"
> = TypeExports.Object(
  {
    authority: TypeExports.String({ minLength: 1 }),
    code: TypeExports.Union([TypeExports.Number(), TypeExports.String({ minLength: 1 })]),
    wkt: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link GeospatialCrsSchema}. */
export type GeospatialCrs = Static<typeof GeospatialCrsSchema>;

/**
 * Bounding box in a given CRS.
 */
export const GeospatialBoundsSchema = TypeExports.Object(
  {
    crs: GeospatialCrsSchema,
    minX: TypeExports.Number(),
    minY: TypeExports.Number(),
    minZ: TypeExports.Optional(TypeExports.Number()),
    maxX: TypeExports.Number(),
    maxY: TypeExports.Number(),
    maxZ: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link GeospatialBoundsSchema}. */
export type GeospatialBounds = Static<typeof GeospatialBoundsSchema>;

/**
 * Transform from local to world coordinates.
 */
export const GeospatialTransformSchema = TypeExports.Object(
  {
    crs: GeospatialCrsSchema,
    position: TypeExports.Tuple([TypeExports.Number(), TypeExports.Number(), TypeExports.Number()]),
    rotation: TypeExports.Optional(
      TypeExports.Tuple([
        TypeExports.Number(),
        TypeExports.Number(),
        TypeExports.Number(),
        TypeExports.Number(),
      ]),
    ),
    scale: TypeExports.Optional(
      TypeExports.Tuple([TypeExports.Number(), TypeExports.Number(), TypeExports.Number()]),
    ),
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
