/**
 * AI embeddings response schemas.
 *
 * Defines shared response envelopes for embedding generation so API and UI
 * layers can validate consistent payload shapes.
 *
 * @shared/schemas/ai-embeddings.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { AiProviderHealthKeySchema } from "./ai-provider-health.schemas.ts";

/**
 * Successful embedding response schema.
 */
export const AiEmbeddingResultSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    embedding: TypeExports.Array(TypeExports.Number()),
    dimensions: TypeExports.Number({ minimum: 0 }),
    provider: AiProviderHealthKeySchema,
    model: TypeExports.String(),
    tokenCount: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/**
 * Error embedding response schema.
 */
export const AiEmbeddingErrorSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(false),
    error: TypeExports.String(),
    provider: AiProviderHealthKeySchema,
  },
  { additionalProperties: false },
);

/**
 * Union schema for embedding responses.
 */
export const AiEmbeddingResponseSchema = TypeExports.Union(
  [AiEmbeddingResultSchema, AiEmbeddingErrorSchema],
  {},
);

/** Inferred type from the AiEmbeddingResult schema. */
export type AiEmbeddingResult = Static<typeof AiEmbeddingResultSchema>;
/** Inferred type from the AiEmbeddingError schema. */
export type AiEmbeddingError = Static<typeof AiEmbeddingErrorSchema>;
/** Inferred type from the AiEmbeddingResponse schema. */
export type AiEmbeddingResponse = Static<typeof AiEmbeddingResponseSchema>;
