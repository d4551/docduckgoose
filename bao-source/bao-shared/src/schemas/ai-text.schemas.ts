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

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { AiProviderHealthKeySchema } from "./ai-provider-health.schemas.ts";
import { JsonValueSchema } from "./json.schemas.ts";
import { StreamErrorData } from "./streaming.schemas.ts";

/**
 * Supported AI providers for text generation requests.
 */
export const AiTextProviderSchema: Type.TUnion<
  (
    | Type.TLiteral<"auto">
    | Type.TLiteral<"openai">
    | Type.TLiteral<"anthropic">
    | Type.TLiteral<"gemini">
    | Type.TLiteral<"azure">
    | Type.TLiteral<"huggingface">
    | Type.TLiteral<"local">
    | Type.TLiteral<"nim">
    | Type.TLiteral<"ollama">
    | Type.TLiteral<"ramalama">
    | Type.TLiteral<"onnx">
  )[]
> = Type.Union(
  [
    Type.Literal("auto"),
    Type.Literal("openai"),
    Type.Literal("anthropic"),
    Type.Literal("gemini"),
    Type.Literal("azure"),
    Type.Literal("huggingface"),
    Type.Literal("local"),
    Type.Literal("nim"),
    Type.Literal("ollama"),
    Type.Literal("ramalama"),
    Type.Literal("onnx"),
  ],
  {},
);

/**
 * Request body schema for `POST /api/v1/ai/text` and `POST /api/v1/ai/text/stream`.
 *
 * Note: `promptId` and `promptVersion` allow callers to select a registered prompt template
 * (system instructions + expected structured output schema) without sending the full system prompt.
 */
export const AiTextGenerateRequestSchema = Type.Object(
  {
    prompt: Type.String({ minLength: 1, maxLength: 12_000 }),
    system: Type.Optional(Type.String({ maxLength: 8_000 })),
    provider: Type.Optional(AiTextProviderSchema),
    model: Type.Optional(Type.String({ maxLength: 255 })),
    maxTokens: Type.Optional(Type.Integer({ minimum: 1, maximum: 16_384 })),
    temperature: Type.Optional(Type.Number({ minimum: 0, maximum: 2 })),
    topP: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
    stop: Type.Optional(
      Type.Array(Type.String({ maxLength: 200 }), {
        maxItems: 10,
        description: "Stop sequences that end generation when matched.",
      }),
    ),
    offlineRequested: Type.Optional(
      Type.Boolean({ description: "Prefer offline/local providers when available." }),
    ),
    promptId: Type.Optional(
      Type.String({
        maxLength: 128,
        description: "Prompt registry identifier in `domain:key` format.",
      }),
    ),
    promptVersion: Type.Optional(
      Type.String({
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
export const AiTextUsageSchema: Type.TObject<
  {
    readonly promptTokens: Type.TNumber;
    readonly completionTokens: Type.TNumber;
    readonly totalTokens: Type.TNumber;
  },
  "promptTokens" | "completionTokens" | "totalTokens",
  never
> = Type.Object(
  {
    promptTokens: Type.Number({ minimum: 0 }),
    completionTokens: Type.Number({ minimum: 0 }),
    totalTokens: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * Successful text generation response payload.
 */
export const AiTextGenerateSuccessDataSchema: Type.TObject<
  {
    readonly text: Type.TString;
    readonly usage: Type.TUnion<
      (
        | Type.TObject<
            {
              readonly promptTokens: Type.TNumber;
              readonly completionTokens: Type.TNumber;
              readonly totalTokens: Type.TNumber;
            },
            "promptTokens" | "completionTokens" | "totalTokens",
            never
          >
        | Type.TNull
      )[]
    >;
    readonly model: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly offlineMode: Type.TBoolean;
    readonly offlineReason: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly structured: Type.TOptional<Type.TUnknown>;
  },
  "model" | "usage" | "offlineReason" | "text" | "offlineMode",
  "structured"
> = Type.Object(
  {
    text: Type.String(),
    usage: Type.Union([AiTextUsageSchema, Type.Null()]),
    model: Type.Union([Type.String(), Type.Null()]),
    offlineMode: Type.Boolean(),
    offlineReason: Type.Union([Type.String(), Type.Null()]),
    structured: Type.Optional(JsonValueSchema),
  },
  { additionalProperties: false },
);

/**
 * Successful response envelope for `POST /api/v1/ai/text`.
 */
export const AiTextGenerateSuccessResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    provider: AiProviderHealthKeySchema,
    requestId: Type.String({ minLength: 1 }),
    data: AiTextGenerateSuccessDataSchema,
  },
  { additionalProperties: false },
);

/**
 * SSE meta event payload for AI text streaming.
 */
export const AiTextStreamMetaSchema = Type.Object(
  {
    provider: AiProviderHealthKeySchema,
    model: Type.Union([Type.String(), Type.Null()]),
    startedAt: Type.String({ minLength: 1 }),
    requestId: Type.String({ minLength: 1 }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    feature: Type.Optional(Type.String({ minLength: 1 })),
    operation: Type.Optional(Type.String({ minLength: 1 })),
    sessionId: Type.Optional(Type.String({ minLength: 1 })),
    offlineMode: Type.Optional(Type.Boolean()),
    offlineReason: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { additionalProperties: false },
);

/**
 * SSE usage event payload for AI text streaming.
 */
export const AiTextStreamUsageSchema: Type.TObject<
  {
    readonly promptTokens: Type.TUnion<(Type.TNull | Type.TNumber)[]>;
    readonly completionTokens: Type.TUnion<(Type.TNull | Type.TNumber)[]>;
    readonly totalTokens: Type.TUnion<(Type.TNull | Type.TNumber)[]>;
    readonly estimated: Type.TOptional<Type.TBoolean>;
  },
  "promptTokens" | "completionTokens" | "totalTokens",
  "estimated"
> = Type.Object(
  {
    promptTokens: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    completionTokens: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    totalTokens: Type.Union([Type.Number({ minimum: 0 }), Type.Null()]),
    estimated: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Finish reasons used by AI streaming endpoints.
 */
export const AiTextStreamFinishReasonSchema: Type.TUnion<
  (
    | Type.TLiteral<"stop">
    | Type.TLiteral<"length">
    | Type.TLiteral<"content_filter">
    | Type.TLiteral<"error">
    | Type.TLiteral<"unknown">
    | Type.TLiteral<"cancelled">
  )[]
> = Type.Union(
  [
    Type.Literal("stop"),
    Type.Literal("length"),
    Type.Literal("content_filter"),
    Type.Literal("error"),
    Type.Literal("unknown"),
    Type.Literal("cancelled"),
  ],
  {},
);

/**
 * SSE done event payload for AI text streaming.
 */
export const AiTextStreamDoneSchema: Type.TObject<
  {
    readonly finishedAt: Type.TString;
    readonly latencyMs: Type.TNumber;
    readonly finishReason: Type.TUnion<
      (
        | Type.TLiteral<"stop">
        | Type.TLiteral<"length">
        | Type.TLiteral<"content_filter">
        | Type.TLiteral<"error">
        | Type.TLiteral<"unknown">
        | Type.TLiteral<"cancelled">
      )[]
    >;
    readonly usage: Type.TOptional<
      Type.TObject<
        {
          readonly promptTokens: Type.TUnion<(Type.TNull | Type.TNumber)[]>;
          readonly completionTokens: Type.TUnion<(Type.TNull | Type.TNumber)[]>;
          readonly totalTokens: Type.TUnion<(Type.TNull | Type.TNumber)[]>;
          readonly estimated: Type.TOptional<Type.TBoolean>;
        },
        "promptTokens" | "completionTokens" | "totalTokens",
        "estimated"
      >
    >;
  },
  "finishedAt" | "latencyMs" | "finishReason",
  "usage"
> = Type.Object(
  {
    finishedAt: Type.String({ minLength: 1 }),
    latencyMs: Type.Number({ minimum: 0 }),
    finishReason: AiTextStreamFinishReasonSchema,
    usage: Type.Optional(AiTextStreamUsageSchema),
  },
  { additionalProperties: false },
);

/**
 * SSE event: meta.
 */
export const AiTextStreamMetaEventSchema = Type.Object(
  {
    event: Type.Literal("meta"),
    data: AiTextStreamMetaSchema,
  },
  { additionalProperties: false },
);

/**
 * SSE event: chunk.
 */
export const AiTextStreamChunkEventSchema: Type.TObject<
  { readonly event: Type.TLiteral<"chunk">; readonly data: Type.TString },
  "event" | "data",
  never
> = Type.Object(
  {
    event: Type.Literal("chunk"),
    data: Type.String(),
  },
  { additionalProperties: false },
);

/**
 * SSE event: usage.
 */
export const AiTextStreamUsageEventSchema: Type.TObject<
  {
    readonly event: Type.TLiteral<"usage">;
    readonly data: Type.TObject<
      {
        readonly promptTokens: Type.TUnion<(Type.TNull | Type.TNumber)[]>;
        readonly completionTokens: Type.TUnion<(Type.TNull | Type.TNumber)[]>;
        readonly totalTokens: Type.TUnion<(Type.TNull | Type.TNumber)[]>;
        readonly estimated: Type.TOptional<Type.TBoolean>;
      },
      "promptTokens" | "completionTokens" | "totalTokens",
      "estimated"
    >;
  },
  "event" | "data",
  never
> = Type.Object(
  {
    event: Type.Literal("usage"),
    data: AiTextStreamUsageSchema,
  },
  { additionalProperties: false },
);

/**
 * SSE event: done.
 */
export const AiTextStreamDoneEventSchema = Type.Object(
  {
    event: Type.Literal("done"),
    data: AiTextStreamDoneSchema,
  },
  { additionalProperties: false },
);

/**
 * SSE event: error.
 */
export const AiTextStreamErrorEventSchema: Type.TObject<
  {
    readonly event: Type.TLiteral<"error">;
    readonly data: Type.TObject<
      {
        readonly code: Type.TString;
        readonly message: Type.TString;
        readonly correlationId: Type.TOptional<Type.TString>;
        readonly status: Type.TOptional<Type.TNumber>;
        readonly details: Type.TOptional<Type.TUnknown>;
        readonly retryAfter: Type.TOptional<Type.TNumber>;
      },
      "code" | "message",
      Type.InferOptionalKeys<{
        readonly code: Type.TString;
        readonly message: Type.TString;
        readonly correlationId: Type.TOptional<Type.TString>;
        readonly status: Type.TOptional<Type.TNumber>;
        readonly details: Type.TOptional<Type.TUnknown>;
        readonly retryAfter: Type.TOptional<Type.TNumber>;
      }>
    >;
  },
  "event" | "data",
  never
> = Type.Object(
  {
    event: Type.Literal("error"),
    data: StreamErrorData,
  },
  { additionalProperties: false },
);

/**
 * Union schema for SSE events emitted by `POST /api/v1/ai/text/stream` when SSE is requested.
 */
export const AiTextStreamEventSchema = Type.Union(
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
