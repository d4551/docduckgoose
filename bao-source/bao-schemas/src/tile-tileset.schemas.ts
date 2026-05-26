/**
 * Tile/tileset subsystem schemas.
 *
 * Tileset ingestion/serving contract for Bao-native raster, vector, and
 * 3D Tiles pipeline state. No full tile server yet; schema-only for subsystem ownership.
 *
 * @shared/schemas/tile-tileset
 */

import type {
  InferOptionalKeys,
  Static,
  TNumber,
  TObject,
  TOptional,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Tileset metadata for ingestion/serving.
 */
export const TileTilesetMetadataSchema: TObject<
  {
    readonly assetVersion: TOptional<TString>;
    readonly geometricError: TOptional<TNumber>;
    readonly root: TOptional<TObject<Record<string, never>, never, never>>;
  },
  never,
  InferOptionalKeys<{
    readonly assetVersion: TOptional<TString>;
    readonly geometricError: TOptional<TNumber>;
    readonly root: TOptional<TObject<Record<string, never>, never, never>>;
  }>
> = TypeExports.Object(
  {
    assetVersion: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    geometricError: TypeExports.Optional(TypeExports.Number()),
    root: TypeExports.Optional(TypeExports.Object({})),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link TileTilesetMetadataSchema}. */
export type TileTilesetMetadata = Static<typeof TileTilesetMetadataSchema>;

/**
 * Tileset ingestion/serving contract.
 */
export const TileTilesetContractSchema = TypeExports.Object(
  {
    tilesetPath: TypeExports.String({ minLength: 1 }),
    metadata: TypeExports.Optional(TileTilesetMetadataSchema),
    contentType: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link TileTilesetContractSchema}. */
export type TileTilesetContract = Static<typeof TileTilesetContractSchema>;
