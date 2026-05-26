/**
 * Chat message streaming SSE schemas.
 *
 * Defines shared TypeBox schemas for the chat message stream endpoint:
 * - `POST /api/v1/chat/conversations/:id/messages/stream` SSE event payloads
 *   (meta|chunk|usage|done|error)
 *
 * These schemas are used by contract tests and runtime stream validators and should remain stable.
 *
 * @shared/schemas/chat-stream
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { AiProviderHealthKeySchema } from "./ai-provider-health.schemas.ts";
import { AiTextStreamUsageSchema } from "./ai-text.schemas.ts";
import { StreamErrorData } from "./streaming.schemas.ts";

/**
 * Provider keys allowed in chat streaming metadata.
 *
 * Chat stream endpoints can emit `auto` early (before provider resolution) while still
 * emitting a resolved provider key once a provider is selected.
 */
export const ChatStreamProviderSchema = Type.Union(
  [Type.Literal("auto"), AiProviderHealthKeySchema],
  {},
);

/**
 * SSE meta event payload for chat message streaming.
 */
export const ChatStreamMetaSchema = Type.Object(
  {
    provider: ChatStreamProviderSchema,
    model: Type.Union([Type.String(), Type.Null()]),
    startedAt: Type.String({ minLength: 1 }),
    requestId: Type.String({ minLength: 1 }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    feature: Type.Optional(Type.String({ minLength: 1 })),
    operation: Type.Optional(Type.String({ minLength: 1 })),
    sessionId: Type.Optional(Type.String({ minLength: 1 })),
    conversationId: Type.String({ minLength: 1 }),
    userMessageId: Type.String({ minLength: 1 }),
    assistantMessageId: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Finish reasons used by chat streaming endpoints.
 */
export const ChatStreamFinishReasonSchema: Type.TUnion<
  (
    | Type.TLiteral<"cancelled">
    | Type.TLiteral<"stop">
    | Type.TLiteral<"length">
    | Type.TLiteral<"content_filter">
    | Type.TLiteral<"tool_calls">
    | Type.TLiteral<"error">
    | Type.TLiteral<"unknown">
  )[]
> = Type.Union(
  [
    Type.Literal("stop"),
    Type.Literal("length"),
    Type.Literal("content_filter"),
    Type.Literal("tool_calls"),
    Type.Literal("error"),
    Type.Literal("cancelled"),
    Type.Literal("unknown"),
  ],
  {},
);

/**
 * SSE done event payload for chat streaming.
 */
export const ChatStreamDoneSchema: Type.TObject<
  {
    readonly finishedAt: Type.TString;
    readonly latencyMs: Type.TNumber;
    readonly finishReason: Type.TUnion<
      (
        | Type.TLiteral<"cancelled">
        | Type.TLiteral<"stop">
        | Type.TLiteral<"length">
        | Type.TLiteral<"content_filter">
        | Type.TLiteral<"tool_calls">
        | Type.TLiteral<"error">
        | Type.TLiteral<"unknown">
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
    finishReason: ChatStreamFinishReasonSchema,
    usage: Type.Optional(AiTextStreamUsageSchema),
  },
  { additionalProperties: false },
);

/**
 * SSE event: meta.
 */
export const ChatStreamMetaEventSchema = Type.Object(
  { event: Type.Literal("meta"), data: ChatStreamMetaSchema },
  { additionalProperties: false },
);

/**
 * SSE event: chunk.
 */
export const ChatStreamChunkEventSchema: Type.TObject<
  { readonly event: Type.TLiteral<"chunk">; readonly data: Type.TString },
  "event" | "data",
  never
> = Type.Object(
  { event: Type.Literal("chunk"), data: Type.String() },
  { additionalProperties: false },
);

/**
 * SSE event: usage.
 */
export const ChatStreamUsageEventSchema: Type.TObject<
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
  { event: Type.Literal("usage"), data: AiTextStreamUsageSchema },
  { additionalProperties: false },
);

/**
 * SSE event: done.
 */
export const ChatStreamDoneEventSchema = Type.Object(
  { event: Type.Literal("done"), data: ChatStreamDoneSchema },
  { additionalProperties: false },
);

/**
 * SSE event: error.
 */
export const ChatStreamErrorEventSchema: Type.TObject<
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
  { event: Type.Literal("error"), data: StreamErrorData },
  { additionalProperties: false },
);

/**
 * Union schema for SSE events emitted by chat message streaming endpoints.
 */
export const ChatStreamEventSchema = Type.Union(
  [
    ChatStreamMetaEventSchema,
    ChatStreamChunkEventSchema,
    ChatStreamUsageEventSchema,
    ChatStreamDoneEventSchema,
    ChatStreamErrorEventSchema,
  ],
  {},
);

/** Inferred type from the ChatStreamMeta schema. */
export type ChatStreamMeta = Static<typeof ChatStreamMetaSchema>;

/** Inferred type from the ChatStreamDone schema. */
export type ChatStreamDone = Static<typeof ChatStreamDoneSchema>;

/** Inferred type from the ChatStreamEvent schema. */
export type ChatStreamEvent = Static<typeof ChatStreamEventSchema>;
