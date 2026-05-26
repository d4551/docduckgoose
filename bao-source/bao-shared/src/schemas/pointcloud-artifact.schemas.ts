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
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { GeospatialBoundsSchema, GeospatialCrsSchema } from "./geospatial.schemas";

/**
 * Pointcloud artifact output contract.
 *
 * Scanner session exports and other pointcloud-producing flows emit validated
 * pointcloud artifacts that feed downstream import consumers.
 */
export const PointcloudArtifactContractSchema = Type.Object(
  {
    /** Output format. */
    format: Type.Union([
      Type.Literal("ply"),
      Type.Literal("pcd"),
      Type.Literal("las"),
      Type.Literal("laz"),
      Type.Literal("e57"),
      Type.Literal("xyz"),
    ]),
    /** Canonical API or storage URI for the artifact. */
    artifactUri: Type.String({ minLength: 1 }),
    /** Downstream consumers for the artifact. */
    downstreamConsumers: Type.Array(
      Type.Union([
        Type.Literal("usd-import"),
        Type.Literal("three-import"),
        Type.Literal("xr-import"),
      ]),
      { minItems: 1 },
    ),
    /** Optional metadata for XR placement. */
    placementHint: Type.Optional(
      Type.Object({
        bounds: Type.Optional(GeospatialBoundsSchema),
        crs: Type.Optional(GeospatialCrsSchema),
      }),
    ),
  },
  { additionalProperties: false },
);

/** TypeScript type for {@link PointcloudArtifactContractSchema}. */
export type PointcloudArtifactContract = Static<typeof PointcloudArtifactContractSchema>;
