/**
 * SplatBao spatial model library schemas.
 *
 * Defines contract-first TypeBox schemas for the spatial model library,
 * detection-to-model matching, and ICP alignment persistence.
 *
 * @shared/schemas/splatbao-model-library
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";
import {
  SplatbaoBBox3DSizeSchema,
  SplatbaoDetection3DSchema,
} from "./splatbao-perception.schemas.ts";

// Model library entry

/**
 * Spatial model library entry schema.
 */
export const SplatbaoModelLibraryEntrySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    classIds: TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
    usdAssetId: TypeExports.String({ minLength: 1 }),
    gaussianModelId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    templatePointCloud: TypeExports.Optional(
      TypeExports.String({ description: "Base64-encoded PLY template for ICP" }),
    ),
    boundingBoxSize: SplatbaoBBox3DSizeSchema,
    thumbnailUrl: TypeExports.Optional(TypeExports.String()),
    tags: TypeExports.Array(TypeExports.String()),
    metadata: TypeExports.Optional(JsonObjectSchema),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoModelLibraryEntry. */
export type SplatbaoModelLibraryEntry = Static<typeof SplatbaoModelLibraryEntrySchema>;

/**
 * Create model library entry request.
 */
export const SplatbaoModelLibraryCreateSchema = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    classIds: TypeExports.Array(TypeExports.String({ minLength: 1 }), { minItems: 1 }),
    usdAssetId: TypeExports.String({ minLength: 1 }),
    gaussianModelId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    templatePointCloud: TypeExports.Optional(TypeExports.String()),
    boundingBoxSize: SplatbaoBBox3DSizeSchema,
    thumbnailUrl: TypeExports.Optional(TypeExports.String()),
    tags: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
    metadata: TypeExports.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoModelLibraryCreate. */
export type SplatbaoModelLibraryCreate = Static<typeof SplatbaoModelLibraryCreateSchema>;

// Model matching

/**
 * Detection-to-model match request.
 */
export const SplatbaoModelMatchRequestSchema = TypeExports.Object(
  {
    detection: SplatbaoDetection3DSchema,
    maxMatches: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 20 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoModelMatchRequest. */
export type SplatbaoModelMatchRequest = Static<typeof SplatbaoModelMatchRequestSchema>;

/**
 * Single model match result.
 */
export const SplatbaoModelMatchResultSchema = TypeExports.Object(
  {
    modelId: TypeExports.String({ minLength: 1 }),
    modelName: TypeExports.String({ minLength: 1 }),
    usdAssetId: TypeExports.String({ minLength: 1 }),
    confidence: TypeExports.Number({ minimum: 0, maximum: 1 }),
    alignment: TypeExports.Optional(
      TypeExports.Object({
        transformMatrix: TypeExports.Array(TypeExports.Number(), {
          minItems: 16,
          maxItems: 16,
          description: "4x4 column-major transform",
        }),
        icpFitness: TypeExports.Number({ minimum: 0, maximum: 1 }),
        icpRmse: TypeExports.Number({ minimum: 0 }),
      }),
    ),
    scaleFactor: TypeExports.Optional(TypeExports.Number({ exclusiveMinimum: 0 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoModelMatchResult. */
export type SplatbaoModelMatchResult = Static<typeof SplatbaoModelMatchResultSchema>;

// Model alignment persistence

/**
 * Persisted model alignment record.
 */
export const SplatbaoModelAlignmentSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    detectionId: TypeExports.String({ minLength: 1 }),
    modelId: TypeExports.String({ minLength: 1 }),
    transformMatrix: TypeExports.Array(TypeExports.Number(), {
      minItems: 16,
      maxItems: 16,
      description: "4x4 column-major transform",
    }),
    icpFitness: TypeExports.Number({ minimum: 0, maximum: 1 }),
    icpRmse: TypeExports.Number({ minimum: 0 }),
    scaleFactor: TypeExports.Number({ exclusiveMinimum: 0 }),
    alignmentMethod: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Literal("icp"),
        TypeExports.Literal("differentiable"),
        TypeExports.Literal("mesh_sampled"),
        TypeExports.Literal("bbox_fallback"),
      ]),
    ),
    alignmentQuality: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Literal("poor"),
        TypeExports.Literal("fair"),
        TypeExports.Literal("good"),
      ]),
    ),
    sessionId: TypeExports.Optional(TypeExports.String()),
    anchorId: TypeExports.Optional(TypeExports.String()),
    correlationId: TypeExports.Optional(TypeExports.String()),
    createdAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoModelAlignment. */
export type SplatbaoModelAlignment = Static<typeof SplatbaoModelAlignmentSchema>;
