/**
 * AI embeddings response schemas.
 *
 * Defines shared response envelopes for embedding generation so API and UI
 * layers can validate consistent payload shapes.
 *
 * @shared/schemas/ai-embeddings.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { AiProviderHealthKeySchema } from "./ai-provider-health.schemas.ts";

/**
 * Successful embedding response schema.
 */
export const AiEmbeddingResultSchema = Type.Object(
  {
    ok: Type.Literal(true),
    embedding: Type.Array(Type.Number()),
    dimensions: Type.Number({ minimum: 0 }),
    provider: AiProviderHealthKeySchema,
    model: Type.String(),
    tokenCount: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/**
 * Error embedding response schema.
 */
export const AiEmbeddingErrorSchema = Type.Object(
  {
    ok: Type.Literal(false),
    error: Type.String(),
    provider: AiProviderHealthKeySchema,
  },
  { additionalProperties: false },
);

/**
 * Union schema for embedding responses.
 */
export const AiEmbeddingResponseSchema = Type.Union(
  [AiEmbeddingResultSchema, AiEmbeddingErrorSchema],
  {},
);

/** Inferred type from the AiEmbeddingResult schema. */
export type AiEmbeddingResult = Static<typeof AiEmbeddingResultSchema>;
/** Inferred type from the AiEmbeddingError schema. */
export type AiEmbeddingError = Static<typeof AiEmbeddingErrorSchema>;
/** Inferred type from the AiEmbeddingResponse schema. */
export type AiEmbeddingResponse = Static<typeof AiEmbeddingResponseSchema>;
