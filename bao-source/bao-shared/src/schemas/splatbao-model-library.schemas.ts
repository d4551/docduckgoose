/**
 * SplatBao spatial model library schemas.
 *
 * Defines contract-first TypeBox schemas for the spatial model library,
 * detection-to-model matching, and ICP alignment persistence.
 *
 * @shared/schemas/splatbao-model-library
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";
import {
  SplatbaoBBox3DSizeSchema,
  SplatbaoDetection3DSchema,
} from "./splatbao-perception.schemas.ts";

// Model library entry

/**
 * Spatial model library entry schema.
 */
export const SplatbaoModelLibraryEntrySchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    classIds: Type.Array(Type.String({ minLength: 1 }), { minItems: 1 }),
    usdAssetId: Type.String({ minLength: 1 }),
    gaussianModelId: Type.Optional(Type.String({ minLength: 1 })),
    templatePointCloud: Type.Optional(
      Type.String({ description: "Base64-encoded PLY template for ICP" }),
    ),
    boundingBoxSize: SplatbaoBBox3DSizeSchema,
    thumbnailUrl: Type.Optional(Type.String()),
    tags: Type.Array(Type.String()),
    metadata: Type.Optional(JsonObjectSchema),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoModelLibraryEntry. */
export type SplatbaoModelLibraryEntry = Static<typeof SplatbaoModelLibraryEntrySchema>;

/**
 * Create model library entry request.
 */
export const SplatbaoModelLibraryCreateSchema = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    classIds: Type.Array(Type.String({ minLength: 1 }), { minItems: 1 }),
    usdAssetId: Type.String({ minLength: 1 }),
    gaussianModelId: Type.Optional(Type.String({ minLength: 1 })),
    templatePointCloud: Type.Optional(Type.String()),
    boundingBoxSize: SplatbaoBBox3DSizeSchema,
    thumbnailUrl: Type.Optional(Type.String()),
    tags: Type.Optional(Type.Array(Type.String())),
    metadata: Type.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoModelLibraryCreate. */
export type SplatbaoModelLibraryCreate = Static<typeof SplatbaoModelLibraryCreateSchema>;

// Model matching

/**
 * Detection-to-model match request.
 */
export const SplatbaoModelMatchRequestSchema = Type.Object(
  {
    detection: SplatbaoDetection3DSchema,
    maxMatches: Type.Optional(Type.Integer({ minimum: 1, maximum: 20 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoModelMatchRequest. */
export type SplatbaoModelMatchRequest = Static<typeof SplatbaoModelMatchRequestSchema>;

/**
 * Single model match result.
 */
export const SplatbaoModelMatchResultSchema = Type.Object(
  {
    modelId: Type.String({ minLength: 1 }),
    modelName: Type.String({ minLength: 1 }),
    usdAssetId: Type.String({ minLength: 1 }),
    confidence: Type.Number({ minimum: 0, maximum: 1 }),
    alignment: Type.Optional(
      Type.Object({
        transformMatrix: Type.Array(Type.Number(), {
          minItems: 16,
          maxItems: 16,
          description: "4x4 column-major transform",
        }),
        icpFitness: Type.Number({ minimum: 0, maximum: 1 }),
        icpRmse: Type.Number({ minimum: 0 }),
      }),
    ),
    scaleFactor: Type.Optional(Type.Number({ exclusiveMinimum: 0 })),
  },
  { additionalProperties: false },
);

/** Type SplatbaoModelMatchResult. */
export type SplatbaoModelMatchResult = Static<typeof SplatbaoModelMatchResultSchema>;

// Model alignment persistence

/**
 * Persisted model alignment record.
 */
export const SplatbaoModelAlignmentSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    detectionId: Type.String({ minLength: 1 }),
    modelId: Type.String({ minLength: 1 }),
    transformMatrix: Type.Array(Type.Number(), {
      minItems: 16,
      maxItems: 16,
      description: "4x4 column-major transform",
    }),
    icpFitness: Type.Number({ minimum: 0, maximum: 1 }),
    icpRmse: Type.Number({ minimum: 0 }),
    scaleFactor: Type.Number({ exclusiveMinimum: 0 }),
    alignmentMethod: Type.Optional(
      Type.Union([
        Type.Literal("icp"),
        Type.Literal("differentiable"),
        Type.Literal("mesh_sampled"),
        Type.Literal("bbox_fallback"),
      ]),
    ),
    alignmentQuality: Type.Optional(
      Type.Union([Type.Literal("poor"), Type.Literal("fair"), Type.Literal("good")]),
    ),
    sessionId: Type.Optional(Type.String()),
    anchorId: Type.Optional(Type.String()),
    correlationId: Type.Optional(Type.String()),
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoModelAlignment. */
export type SplatbaoModelAlignment = Static<typeof SplatbaoModelAlignmentSchema>;
