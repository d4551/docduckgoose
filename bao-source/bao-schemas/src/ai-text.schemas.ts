/**
 * AI text generation and streaming schemas.
 *
 * Defines shared TypeBox schemas for:
 * - `POST /api/v1/ai/text` (request + response envelope)
 * - `POST /api/v1/ai/text/stream` SSE event payloads (meta|chunk|usage|done|error)
 *
 * These schemas are used by contract tests and should remain stable.
 *
 * @shared/schemas/ai-text
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { AiProviderHealthKeySchema } from "./ai-provider-health.schemas.ts";
import { JsonValueSchema } from "./json.schemas.ts";
import { StreamErrorData } from "./streaming.schemas.ts";

/**
 * Supported AI providers for text generation requests.
 */
export const AiTextProviderSchema: TUnion<
  (
    | TLiteral<"auto">
    | TLiteral<"openai">
    | TLiteral<"anthropic">
    | TLiteral<"gemini">
    | TLiteral<"azure">
    | TLiteral<"huggingface">
    | TLiteral<"local">
    | TLiteral<"nim">
    | TLiteral<"ollama">
    | TLiteral<"ramalama">
    | TLiteral<"onnx">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("auto"),
    TypeExports.Literal("openai"),
    TypeExports.Literal("anthropic"),
    TypeExports.Literal("gemini"),
    TypeExports.Literal("azure"),
    TypeExports.Literal("huggingface"),
    TypeExports.Literal("local"),
    TypeExports.Literal("nim"),
    TypeExports.Literal("ollama"),
    TypeExports.Literal("ramalama"),
    TypeExports.Literal("onnx"),
  ],
  {},
);

/**
 * Request body schema for `POST /api/v1/ai/text` and `POST /api/v1/ai/text/stream`.
 *
 * Note: `promptId` and `promptVersion` allow callers to select a registered prompt template
 * (system instructions + expected structured output schema) without sending the full system prompt.
 */
export const AiTextGenerateRequestSchema = TypeExports.Object(
  {
    prompt: TypeExports.String({ minLength: 1, maxLength: 12_000 }),
    system: TypeExports.Optional(TypeExports.String({ maxLength: 8_000 })),
    provider: TypeExports.Optional(AiTextProviderSchema),
    model: TypeExports.Optional(TypeExports.String({ maxLength: 255 })),
    maxTokens: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 16_384 })),
    temperature: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 2 })),
    topP: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 1 })),
    stop: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ maxLength: 200 }), {
        maxItems: 10,
        description: "Stop sequences that end generation when matched.",
      }),
    ),
    offlineRequested: TypeExports.Optional(
      TypeExports.Boolean({ description: "Prefer offline/local providers when available." }),
    ),
    promptId: TypeExports.Optional(
      TypeExports.String({
        maxLength: 128,
        description: "Prompt registry identifier in `domain:key` format.",
      }),
    ),
    promptVersion: TypeExports.Optional(
      TypeExports.String({
        maxLength: 32,
        description: "Optional prompt registry version (semver-like).",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * Token usage payload for AI text generation.
 */
export const AiTextUsageSchema: TObject<
  {
    readonly promptTokens: TNumber;
    readonly completionTokens: TNumber;
    readonly totalTokens: TNumber;
  },
  "promptTokens" | "completionTokens" | "totalTokens",
  never
> = TypeExports.Object(
  {
    promptTokens: TypeExports.Number({ minimum: 0 }),
    completionTokens: TypeExports.Number({ minimum: 0 }),
    totalTokens: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * Successful text generation response payload.
 */
export const AiTextGenerateSuccessDataSchema: TObject<
  {
    readonly text: TString;
    readonly usage: TUnion<
      (
        | TObject<
            {
              readonly promptTokens: TNumber;
              readonly completionTokens: TNumber;
              readonly totalTokens: TNumber;
            },
            "promptTokens" | "completionTokens" | "totalTokens",
            never
          >
        | TNull
      )[]
    >;
    readonly model: TUnion<(TString | TNull)[]>;
    readonly offlineMode: TBoolean;
    readonly offlineReason: TUnion<(TString | TNull)[]>;
    readonly structured: TOptional<TUnknown>;
  },
  "model" | "usage" | "offlineReason" | "text" | "offlineMode",
  "structured"
> = TypeExports.Object(
  {
    text: TypeExports.String(),
    usage: TypeExports.Union([AiTextUsageSchema, TypeExports.Null()]),
    model: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    offlineMode: TypeExports.Boolean(),
    offlineReason: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    structured: TypeExports.Optional(JsonValueSchema),
  },
  { additionalProperties: false },
);

/**
 * Successful response envelope for `POST /api/v1/ai/text`.
 */
export const AiTextGenerateSuccessResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    provider: AiProviderHealthKeySchema,
    requestId: TypeExports.String({ minLength: 1 }),
    data: AiTextGenerateSuccessDataSchema,
  },
  { additionalProperties: false },
);

/**
 * SSE meta event payload for AI text streaming.
 */
export const AiTextStreamMetaSchema = TypeExports.Object(
  {
    provider: AiProviderHealthKeySchema,
    model: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    startedAt: TypeExports.String({ minLength: 1 }),
    requestId: TypeExports.String({ minLength: 1 }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    feature: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    operation: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    sessionId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    offlineMode: TypeExports.Optional(TypeExports.Boolean()),
    offlineReason: TypeExports.Optional(
      TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    ),
  },
  { additionalProperties: false },
);

/**
 * SSE usage event payload for AI text streaming.
 */
export const AiTextStreamUsageSchema: TObject<
  {
    readonly promptTokens: TUnion<(TNull | TNumber)[]>;
    readonly completionTokens: TUnion<(TNull | TNumber)[]>;
    readonly totalTokens: TUnion<(TNull | TNumber)[]>;
    readonly estimated: TOptional<TBoolean>;
  },
  "promptTokens" | "completionTokens" | "totalTokens",
  "estimated"
> = TypeExports.Object(
  {
    promptTokens: TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
    completionTokens: TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
    totalTokens: TypeExports.Union([TypeExports.Number({ minimum: 0 }), TypeExports.Null()]),
    estimated: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Finish reasons used by AI streaming endpoints.
 */
export const AiTextStreamFinishReasonSchema: TUnion<
  (
    | TLiteral<"stop">
    | TLiteral<"length">
    | TLiteral<"content_filter">
    | TLiteral<"error">
    | TLiteral<"unknown">
    | TLiteral<"cancelled">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("stop"),
    TypeExports.Literal("length"),
    TypeExports.Literal("content_filter"),
    TypeExports.Literal("error"),
    TypeExports.Literal("unknown"),
    TypeExports.Literal("cancelled"),
  ],
  {},
);

/**
 * SSE done event payload for AI text streaming.
 */
export const AiTextStreamDoneSchema: TObject<
  {
    readonly finishedAt: TString;
    readonly latencyMs: TNumber;
    readonly finishReason: TUnion<
      (
        | TLiteral<"stop">
        | TLiteral<"length">
        | TLiteral<"content_filter">
        | TLiteral<"error">
        | TLiteral<"unknown">
        | TLiteral<"cancelled">
      )[]
    >;
    readonly usage: TOptional<
      TObject<
        {
          readonly promptTokens: TUnion<(TNull | TNumber)[]>;
          readonly completionTokens: TUnion<(TNull | TNumber)[]>;
          readonly totalTokens: TUnion<(TNull | TNumber)[]>;
          readonly estimated: TOptional<TBoolean>;
        },
        "promptTokens" | "completionTokens" | "totalTokens",
        "estimated"
      >
    >;
  },
  "finishedAt" | "latencyMs" | "finishReason",
  "usage"
> = TypeExports.Object(
  {
    finishedAt: TypeExports.String({ minLength: 1 }),
    latencyMs: TypeExports.Number({ minimum: 0 }),
    finishReason: AiTextStreamFinishReasonSchema,
    usage: TypeExports.Optional(AiTextStreamUsageSchema),
  },
  { additionalProperties: false },
);

/**
 * SSE event: meta.
 */
export const AiTextStreamMetaEventSchema = TypeExports.Object(
  {
    event: TypeExports.Literal("meta"),
    data: AiTextStreamMetaSchema,
  },
  { additionalProperties: false },
);

/**
 * SSE event: chunk.
 */
export const AiTextStreamChunkEventSchema: TObject<
  { readonly event: TLiteral<"chunk">; readonly data: TString },
  "event" | "data",
  never
> = TypeExports.Object(
  {
    event: TypeExports.Literal("chunk"),
    data: TypeExports.String(),
  },
  { additionalProperties: false },
);

/**
 * SSE event: usage.
 */
export const AiTextStreamUsageEventSchema: TObject<
  {
    readonly event: TLiteral<"usage">;
    readonly data: TObject<
      {
        readonly promptTokens: TUnion<(TNull | TNumber)[]>;
        readonly completionTokens: TUnion<(TNull | TNumber)[]>;
        readonly totalTokens: TUnion<(TNull | TNumber)[]>;
        readonly estimated: TOptional<TBoolean>;
      },
      "promptTokens" | "completionTokens" | "totalTokens",
      "estimated"
    >;
  },
  "event" | "data",
  never
> = TypeExports.Object(
  {
    event: TypeExports.Literal("usage"),
    data: AiTextStreamUsageSchema,
  },
  { additionalProperties: false },
);

/**
 * SSE event: done.
 */
export const AiTextStreamDoneEventSchema = TypeExports.Object(
  {
    event: TypeExports.Literal("done"),
    data: AiTextStreamDoneSchema,
  },
  { additionalProperties: false },
);

/**
 * SSE event: error.
 */
export const AiTextStreamErrorEventSchema: TObject<
  {
    readonly event: TLiteral<"error">;
    readonly data: TObject<
      {
        readonly code: TString;
        readonly message: TString;
        readonly correlationId: TOptional<TString>;
        readonly status: TOptional<TNumber>;
        readonly details: TOptional<TUnknown>;
        readonly retryAfter: TOptional<TNumber>;
      },
      "code" | "message",
      InferOptionalKeys<{
        readonly code: TString;
        readonly message: TString;
        readonly correlationId: TOptional<TString>;
        readonly status: TOptional<TNumber>;
        readonly details: TOptional<TUnknown>;
        readonly retryAfter: TOptional<TNumber>;
      }>
    >;
  },
  "event" | "data",
  never
> = TypeExports.Object(
  {
    event: TypeExports.Literal("error"),
    data: StreamErrorData,
  },
  { additionalProperties: false },
);

/**
 * Union schema for SSE events emitted by `POST /api/v1/ai/text/stream` when SSE is requested.
 */
export const AiTextStreamEventSchema = TypeExports.Union(
  [
    AiTextStreamMetaEventSchema,
    AiTextStreamChunkEventSchema,
    AiTextStreamUsageEventSchema,
    AiTextStreamDoneEventSchema,
    AiTextStreamErrorEventSchema,
  ],
  {},
);

/** Inferred type from the AiTextGenerateRequest schema. */
export type AiTextGenerateRequest = Static<typeof AiTextGenerateRequestSchema>;

/** Inferred type from the AiTextUsage schema. */
export type AiTextUsage = Static<typeof AiTextUsageSchema>;

/** Inferred type from the AiTextGenerateSuccessResponse schema. */
export type AiTextGenerateSuccessResponse = Static<typeof AiTextGenerateSuccessResponseSchema>;

/** Inferred type from the AiTextStreamEvent schema. */
export type AiTextStreamEvent = Static<typeof AiTextStreamEventSchema>;
