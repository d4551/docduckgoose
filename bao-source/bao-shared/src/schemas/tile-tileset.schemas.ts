/**
 * Tile/tileset subsystem schemas.
 *
 * Tileset ingestion/serving contract for future 3D Tiles support.
 * Stub schema-only for subsystem ownership.
 *
 * @shared/schemas/tile-tileset
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Tileset metadata for ingestion/serving.
 */
export const TileTilesetMetadataSchema: Type.TObject<
  {
    readonly assetVersion: Type.TOptional<Type.TString>;
    readonly geometricError: Type.TOptional<Type.TNumber>;
    readonly root: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly assetVersion: Type.TOptional<Type.TString>;
    readonly geometricError: Type.TOptional<Type.TNumber>;
    readonly root: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
  }>
> = Type.Object(
  {
    assetVersion: Type.Optional(Type.String({ minLength: 1 })),
    geometricError: Type.Optional(Type.Number()),
    root: Type.Optional(Type.Object({})),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link TileTilesetMetadataSchema}. */
export type TileTilesetMetadata = Static<typeof TileTilesetMetadataSchema>;

/**
 * Tileset ingestion/serving contract.
 */
export const TileTilesetContractSchema = Type.Object(
  {
    tilesetPath: Type.String({ minLength: 1 }),
    metadata: Type.Optional(TileTilesetMetadataSchema),
    contentType: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link TileTilesetContractSchema}. */
export type TileTilesetContract = Static<typeof TileTilesetContractSchema>;
