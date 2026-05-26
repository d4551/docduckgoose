/**
 * RAG retrieval contract v1.
 *
 * Defines the versioned contract for permission-aware RAG retrieval:
 * - Ingestion: documents, MCP resources, telemetry
 * - Retrieval: first-class API with access policy and auditable traces
 *
 * @shared/contracts/versions/v1/rag
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for identification.
 */
export const CONTRACT_NAME = "rag-retrieve";

/**
 * RAG source type union for retrieval.
 */
export const RagSourceTypeUnionSchema: Type.TUnion<
  (
    | Type.TLiteral<"case">
    | Type.TLiteral<"report">
    | Type.TLiteral<"document">
    | Type.TLiteral<"image">
    | Type.TLiteral<"annotation">
    | Type.TLiteral<"custom">
    | Type.TLiteral<"memory">
    | Type.TLiteral<"mcp">
  )[]
> = Type.Union(
  [
    Type.Literal("case"),
    Type.Literal("report"),
    Type.Literal("document"),
    Type.Literal("image"),
    Type.Literal("annotation"),
    Type.Literal("custom"),
    Type.Literal("memory"),
    Type.Literal("mcp"),
  ],
  {},
);

/**
 * RAG source reference for retrieval.
 */
export const RagSourceRefSchema = Type.Object(
  {
    sourceType: RagSourceTypeUnionSchema,
    sourceId: Type.String({ minLength: 1 }),
    maxChunks: Type.Optional(Type.Number({ minimum: 1, maximum: 50 })),
    label: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * RAG retrieval request schema.
 */
export const RagRetrieveRequestV1 = Type.Object(
  {
    sources: Type.Array(RagSourceRefSchema, { minItems: 1, maxItems: 20 }),
    queryText: Type.Optional(Type.String()),
    maxChars: Type.Optional(Type.Number({ minimum: 100, maximum: 100_000 })),
    preferVectorSearch: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * RAG match metadata for audit trails.
 */
export const RagMatchMetaSchema: Type.TObject<
  {
    readonly sourceType: Type.TString;
    readonly sourceId: Type.TString;
    readonly chunkIndex: Type.TNumber;
    readonly score: Type.TNumber;
    readonly strategy: Type.TUnion<
      (Type.TLiteral<"mcp"> | Type.TLiteral<"vector"> | Type.TLiteral<"deterministic">)[]
    >;
    readonly chars: Type.TNumber;
    readonly truncated: Type.TBoolean;
  },
  "strategy" | "sourceType" | "sourceId" | "chunkIndex" | "score" | "chars" | "truncated",
  never
> = Type.Object(
  {
    sourceType: Type.String(),
    sourceId: Type.String(),
    chunkIndex: Type.Number(),
    score: Type.Number(),
    strategy: Type.Union([
      Type.Literal("vector"),
      Type.Literal("deterministic"),
      Type.Literal("mcp"),
    ]),
    chars: Type.Number(),
    truncated: Type.Boolean(),
  },
  { additionalProperties: true },
);

/**
 * RAG retrieval response schema.
 */
export const RagRetrieveResponseV1 = Type.Object(
  {
    prompt: Type.Union([Type.String(), Type.Null()]),
    meta: Type.Object(
      {
        sources: Type.Array(
          Type.Object({
            sourceType: Type.String(),
            sourceId: Type.String(),
            chunksIncluded: Type.Number(),
          }),
        ),
        chunksIncluded: Type.Number(),
        charsIncluded: Type.Number(),
        matches: Type.Array(RagMatchMetaSchema),
        traceId: Type.Optional(Type.String()),
      },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: false },
);

const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for RAG retrieval.
 */
export const RagRetrieveErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * RAG retrieval contract definition (v1).
 */
export const RagRetrieveContractV1 = {
  name: CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: RagRetrieveRequestV1,
  response: RagRetrieveResponseV1,
  errors: RagRetrieveErrorV1,
} as const satisfies VersionedContractV1;
