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
import { AiTextStreamUsageSchema } from "./ai-text.schemas.ts";
import { StreamErrorData } from "./streaming.schemas.ts";

/**
 * Provider keys allowed in chat streaming metadata.
 *
 * Chat stream endpoints can emit `auto` early (before provider resolution) while still
 * emitting a resolved provider key once a provider is selected.
 */
export const ChatStreamProviderSchema = TypeExports.Union(
  [TypeExports.Literal("auto"), AiProviderHealthKeySchema],
  {},
);

/**
 * SSE meta event payload for chat message streaming.
 */
export const ChatStreamMetaSchema = TypeExports.Object(
  {
    provider: ChatStreamProviderSchema,
    model: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    startedAt: TypeExports.String({ minLength: 1 }),
    requestId: TypeExports.String({ minLength: 1 }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    feature: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    operation: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    sessionId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    conversationId: TypeExports.String({ minLength: 1 }),
    userMessageId: TypeExports.String({ minLength: 1 }),
    assistantMessageId: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Finish reasons used by chat streaming endpoints.
 */
export const ChatStreamFinishReasonSchema: TUnion<
  (
    | TLiteral<"cancelled">
    | TLiteral<"stop">
    | TLiteral<"length">
    | TLiteral<"content_filter">
    | TLiteral<"tool_calls">
    | TLiteral<"error">
    | TLiteral<"unknown">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("stop"),
    TypeExports.Literal("length"),
    TypeExports.Literal("content_filter"),
    TypeExports.Literal("tool_calls"),
    TypeExports.Literal("error"),
    TypeExports.Literal("cancelled"),
    TypeExports.Literal("unknown"),
  ],
  {},
);

/**
 * SSE done event payload for chat streaming.
 */
export const ChatStreamDoneSchema: TObject<
  {
    readonly finishedAt: TString;
    readonly latencyMs: TNumber;
    readonly finishReason: TUnion<
      (
        | TLiteral<"cancelled">
        | TLiteral<"stop">
        | TLiteral<"length">
        | TLiteral<"content_filter">
        | TLiteral<"tool_calls">
        | TLiteral<"error">
        | TLiteral<"unknown">
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
    finishReason: ChatStreamFinishReasonSchema,
    usage: TypeExports.Optional(AiTextStreamUsageSchema),
  },
  { additionalProperties: false },
);

/**
 * SSE event: meta.
 */
export const ChatStreamMetaEventSchema = TypeExports.Object(
  { event: TypeExports.Literal("meta"), data: ChatStreamMetaSchema },
  { additionalProperties: false },
);

/**
 * SSE event: chunk.
 */
export const ChatStreamChunkEventSchema: TObject<
  { readonly event: TLiteral<"chunk">; readonly data: TString },
  "event" | "data",
  never
> = TypeExports.Object(
  { event: TypeExports.Literal("chunk"), data: TypeExports.String() },
  { additionalProperties: false },
);

/**
 * SSE event: usage.
 */
export const ChatStreamUsageEventSchema: TObject<
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
  { event: TypeExports.Literal("usage"), data: AiTextStreamUsageSchema },
  { additionalProperties: false },
);

/**
 * SSE event: done.
 */
export const ChatStreamDoneEventSchema = TypeExports.Object(
  { event: TypeExports.Literal("done"), data: ChatStreamDoneSchema },
  { additionalProperties: false },
);

/**
 * SSE event: error.
 */
export const ChatStreamErrorEventSchema: TObject<
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
  { event: TypeExports.Literal("error"), data: StreamErrorData },
  { additionalProperties: false },
);

/**
 * Union schema for SSE events emitted by chat message streaming endpoints.
 */
export const ChatStreamEventSchema = TypeExports.Union(
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
