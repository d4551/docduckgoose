/**
 * Pointcloud artifact contract.
 *
 * Documents how perception-bunbuddy outputs feed XR/USD/Three.
 * Downstream: XR composition (scene placement), USD import (mesh/pointcloud),
 * Three.js viewer (PointCloud geometry).
 *
 * @shared/schemas/pointcloud-artifact
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { GeospatialBoundsSchema, GeospatialCrsSchema } from "./geospatial.schemas";

/**
 * Pointcloud artifact output contract.
 *
 * Scanner session exports and other pointcloud-producing flows emit validated
 * pointcloud artifacts that feed downstream import consumers.
 */
export const PointcloudArtifactContractSchema = TypeExports.Object(
  {
    /** Output format. */
    format: TypeExports.Union([
      TypeExports.Literal("ply"),
      TypeExports.Literal("pcd"),
      TypeExports.Literal("las"),
      TypeExports.Literal("laz"),
      TypeExports.Literal("e57"),
      TypeExports.Literal("xyz"),
    ]),
    /** Canonical API or storage URI for the artifact. */
    artifactUri: TypeExports.String({ minLength: 1 }),
    /** Downstream consumers for the artifact. */
    downstreamConsumers: TypeExports.Array(
      TypeExports.Union([
        TypeExports.Literal("usd-import"),
        TypeExports.Literal("three-import"),
        TypeExports.Literal("xr-import"),
      ]),
      { minItems: 1 },
    ),
    /** Optional metadata for XR placement. */
    placementHint: TypeExports.Optional(
      TypeExports.Object({
        bounds: TypeExports.Optional(GeospatialBoundsSchema),
        crs: TypeExports.Optional(GeospatialCrsSchema),
      }),
    ),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link PointcloudArtifactContractSchema}. */
export type PointcloudArtifactContract = Static<typeof PointcloudArtifactContractSchema>;
