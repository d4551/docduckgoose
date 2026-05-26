/**
 * Chat run, tool, and memory schemas.
 *
 * Defines shared TypeBox schemas for chat orchestration, tool calling,
 * and memory snapshots to keep API contracts aligned across server and UI.
 *
 * @shared/schemas/chat.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { AiProviderKeySchema } from "./ai-provider.schemas.ts";
import { stringEnum } from "./baobox-enum.ts";

const RagSourceTypeSchema = Type.Union(
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
 * Chat tool definition (OpenAI-compatible).
 */
export const ChatToolDefinitionSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"function">;
    readonly function: Type.TObject<
      {
        readonly name: Type.TString;
        readonly description: Type.TOptional<Type.TString>;
        readonly parameters: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
      },
      "name",
      Type.InferOptionalKeys<{
        readonly name: Type.TString;
        readonly description: Type.TOptional<Type.TString>;
        readonly parameters: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
      }>
    >;
  },
  "function" | "type",
  never
> = Type.Object(
  {
    type: Type.Literal("function"),
    function: Type.Object(
      {
        name: Type.String(),
        description: Type.Optional(Type.String()),
        parameters: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatToolDefinition schema. */
export type ChatToolDefinition = Static<typeof ChatToolDefinitionSchema>;

/**
 * Tool choice strategy for chat completions.
 */
export const ChatToolChoiceSchema: Type.TUnion<
  (
    | Type.TLiteral<"auto">
    | Type.TLiteral<"none">
    | Type.TLiteral<"required">
    | Type.TObject<
        {
          readonly type: Type.TLiteral<"function">;
          readonly function: Type.TObject<{ readonly name: Type.TString }, "name", never>;
        },
        "function" | "type",
        never
      >
  )[]
> = Type.Union(
  [
    Type.Literal("auto"),
    Type.Literal("none"),
    Type.Literal("required"),
    Type.Object(
      {
        type: Type.Literal("function"),
        function: Type.Object(
          {
            name: Type.String(),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  ],
  {},
);

/** Inferred type from the ChatToolChoice schema. */
export type ChatToolChoice = Static<typeof ChatToolChoiceSchema>;

/**
 * Tool call payload returned by chat providers.
 */
export const ChatToolCallSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly type: Type.TLiteral<"function">;
    readonly function: Type.TObject<
      { readonly name: Type.TString; readonly arguments: Type.TString },
      "name" | "arguments",
      never
    >;
    readonly parsedArguments: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  },
  "function" | "type" | "id",
  "parsedArguments"
> = Type.Object(
  {
    id: Type.String(),
    type: Type.Literal("function"),
    function: Type.Object(
      {
        name: Type.String(),
        arguments: Type.String(),
      },
      { additionalProperties: false },
    ),
    parsedArguments: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatToolCall schema. */
export type ChatToolCall = Static<typeof ChatToolCallSchema>;

/**
 * Result payload for a tool execution.
 */
export const ChatToolResultSchema: Type.TObject<
  {
    readonly toolCallId: Type.TString;
    readonly name: Type.TString;
    readonly ok: Type.TBoolean;
    readonly output: Type.TOptional<Type.TString>;
    readonly error: Type.TOptional<Type.TString>;
    readonly durationMs: Type.TOptional<Type.TNumber>;
  },
  "toolCallId" | "name" | "ok",
  Type.InferOptionalKeys<{
    readonly toolCallId: Type.TString;
    readonly name: Type.TString;
    readonly ok: Type.TBoolean;
    readonly output: Type.TOptional<Type.TString>;
    readonly error: Type.TOptional<Type.TString>;
    readonly durationMs: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    toolCallId: Type.String(),
    name: Type.String(),
    ok: Type.Boolean(),
    output: Type.Optional(Type.String()),
    error: Type.Optional(Type.String()),
    durationMs: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatToolResult schema. */
export type ChatToolResult = Static<typeof ChatToolResultSchema>;

/**
 * Chat run step types.
 */
export const CHAT_RUN_STEP_TYPES: readonly [
  "prompt",
  "tool",
  "memory",
  "response",
  "policy",
  "guardrail",
  "system",
  "rag",
] = ["prompt", "tool", "memory", "response", "policy", "guardrail", "system", "rag"] as const;

/** Inferred type from the ChatRunStepType schema. */
export type ChatRunStepType = (typeof CHAT_RUN_STEP_TYPES)[number];

/** TypeBox schema for ChatRunStepTypeSchema. */
export const ChatRunStepTypeSchema: Type.TUnion<
  [
    Type.TLiteral<
      "prompt" | "tool" | "memory" | "response" | "policy" | "guardrail" | "system" | "rag"
    >,
    ...Type.TLiteral<
      "prompt" | "tool" | "memory" | "response" | "policy" | "guardrail" | "system" | "rag"
    >[],
  ]
> = stringEnum(CHAT_RUN_STEP_TYPES, {});

/**
 * Chat run step status values.
 */
export const CHAT_RUN_STEP_STATUSES: readonly [
  "pending",
  "running",
  "completed",
  "failed",
  "skipped",
  "blocked",
] = ["pending", "running", "completed", "failed", "skipped", "blocked"] as const;

/** Inferred type from the ChatRunStepStatus schema. */
export type ChatRunStepStatus = (typeof CHAT_RUN_STEP_STATUSES)[number];

/** TypeBox schema for ChatRunStepStatusSchema. */
export const ChatRunStepStatusSchema: Type.TUnion<
  [
    Type.TLiteral<"pending" | "running" | "completed" | "failed" | "skipped" | "blocked">,
    ...Type.TLiteral<"pending" | "running" | "completed" | "failed" | "skipped" | "blocked">[],
  ]
> = stringEnum(CHAT_RUN_STEP_STATUSES, {});

/**
 * Chat run step schema.
 */
export const ChatRunStepSchema = Type.Object(
  {
    id: Type.String(),
    type: ChatRunStepTypeSchema,
    status: ChatRunStepStatusSchema,
    startedAt: Type.String({ format: "date-time" }),
    completedAt: Type.Optional(Type.String({ format: "date-time" })),
    toolCall: Type.Optional(ChatToolCallSchema),
    toolResult: Type.Optional(ChatToolResultSchema),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunStep schema. */
export type ChatRunStep = Static<typeof ChatRunStepSchema>;

/**
 * Chat run status values.
 */
export const CHAT_RUN_STATUSES: readonly [
  "queued",
  "running",
  "requires_action",
  "completed",
  "failed",
  "cancelled",
  "skipped",
] = [
  "queued",
  "running",
  "requires_action",
  "completed",
  "failed",
  "cancelled",
  "skipped",
] as const;

/** Inferred type from the ChatRunStatus schema. */
export type ChatRunStatus = (typeof CHAT_RUN_STATUSES)[number];

/** TypeBox schema for ChatRunStatusSchema. */
export const ChatRunStatusSchema: Type.TUnion<
  [
    Type.TLiteral<
      "queued" | "running" | "requires_action" | "completed" | "failed" | "cancelled" | "skipped"
    >,
    ...Type.TLiteral<
      "queued" | "running" | "requires_action" | "completed" | "failed" | "cancelled" | "skipped"
    >[],
  ]
> = stringEnum(CHAT_RUN_STATUSES, {});

/**
 * Run error payload.
 */
export const ChatRunErrorSchema: Type.TObject<
  {
    readonly code: Type.TOptional<Type.TString>;
    readonly message: Type.TString;
    readonly retryable: Type.TOptional<Type.TBoolean>;
    readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  },
  "message",
  Type.InferOptionalKeys<{
    readonly code: Type.TOptional<Type.TString>;
    readonly message: Type.TString;
    readonly retryable: Type.TOptional<Type.TBoolean>;
    readonly details: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  }>
> = Type.Object(
  {
    code: Type.Optional(Type.String()),
    message: Type.String(),
    retryable: Type.Optional(Type.Boolean()),
    details: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunError schema. */
export type ChatRunError = Static<typeof ChatRunErrorSchema>;

/**
 * Usage summary for chat runs.
 */
export const ChatRunUsageSchema: Type.TObject<
  {
    readonly promptTokens: Type.TOptional<Type.TNumber>;
    readonly completionTokens: Type.TOptional<Type.TNumber>;
    readonly totalTokens: Type.TOptional<Type.TNumber>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly promptTokens: Type.TOptional<Type.TNumber>;
    readonly completionTokens: Type.TOptional<Type.TNumber>;
    readonly totalTokens: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    promptTokens: Type.Optional(Type.Number()),
    completionTokens: Type.Optional(Type.Number()),
    totalTokens: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunUsage schema. */
export type ChatRunUsage = Static<typeof ChatRunUsageSchema>;

/**
 * Chat run response payload.
 */
export const ChatRunSchema = Type.Object(
  {
    id: Type.String(),
    conversationId: Type.String(),
    status: ChatRunStatusSchema,
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
    startedAt: Type.Optional(Type.String({ format: "date-time" })),
    finishedAt: Type.Optional(Type.String({ format: "date-time" })),
    requestId: Type.Optional(Type.String()),
    idempotencyKey: Type.Optional(Type.String()),
    promptKey: Type.Optional(Type.String()),
    provider: Type.Optional(AiProviderKeySchema),
    model: Type.Optional(Type.String()),
    userMessageId: Type.Optional(Type.String()),
    assistantMessageId: Type.Optional(Type.String()),
    steps: Type.Optional(Type.Array(ChatRunStepSchema)),
    toolCalls: Type.Optional(Type.Array(ChatToolCallSchema)),
    usage: Type.Optional(ChatRunUsageSchema),
    error: Type.Optional(ChatRunErrorSchema),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRun schema. */
export type ChatRun = Static<typeof ChatRunSchema>;

/**
 * Chat message schema (API DTO).
 */
export const ChatMessageSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly conversationId: Type.TString;
    readonly userId: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly role: Type.TString;
    readonly content: Type.TString;
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly createdAt: Type.TString;
  },
  "id" | "conversationId" | "createdAt" | "role" | "content",
  Type.InferOptionalKeys<{
    readonly id: Type.TString;
    readonly conversationId: Type.TString;
    readonly userId: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
    readonly role: Type.TString;
    readonly content: Type.TString;
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly createdAt: Type.TString;
  }>
> = Type.Object(
  {
    id: Type.String(),
    conversationId: Type.String(),
    userId: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    role: Type.String(),
    content: Type.String(),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMessage schema. */
export type ChatMessage = Static<typeof ChatMessageSchema>;

/**
 * Last-message summary attached to a conversation list item.
 */
export const ChatConversationLastMessageSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly role: Type.TString;
    readonly content: Type.TString;
    readonly createdAt: Type.TString;
  },
  "id" | "createdAt" | "role" | "content",
  never
> = Type.Object(
  {
    id: Type.String(),
    role: Type.String(),
    content: Type.String(),
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatConversationLastMessage schema. */
export type ChatConversationLastMessage = Static<typeof ChatConversationLastMessageSchema>;

/**
 * Chat conversation schema (list API DTO).
 */
export const ChatConversationSchema = Type.Object(
  {
    id: Type.String(),
    userId: Type.Union([Type.String(), Type.Null()]),
    createdBy: Type.Union([Type.String(), Type.Null()]),
    scopeType: Type.Union([Type.String(), Type.Null()]),
    scopeId: Type.Union([Type.String(), Type.Null()]),
    title: Type.Union([Type.String(), Type.Null()]),
    provider: Type.Union([Type.String(), Type.Null()]),
    visibility: Type.Union([Type.String(), Type.Null()]),
    metadata: Type.Unknown(),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
    lastMessage: Type.Union([ChatConversationLastMessageSchema, Type.Null()]),
    messageCount: Type.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatConversation schema. */
export type ChatConversation = Static<typeof ChatConversationSchema>;

/**
 * Chat conversation list response payload.
 */
export const ChatConversationsListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Array(ChatConversationSchema),
    timestamp: Type.Optional(Type.String({ format: "date-time" })),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatConversationsListResponse schema. */
export type ChatConversationsListResponse = Static<typeof ChatConversationsListResponseSchema>;

/**
 * Memory snapshot payload for a conversation.
 */
export const ChatMemorySnapshotSchema = Type.Object(
  {
    summary: Type.Optional(Type.String()),
    facts: Type.Optional(Type.Array(Type.String())),
    preferences: Type.Optional(Type.Array(Type.String())),
    openTasks: Type.Optional(Type.Array(Type.String())),
    updatedAt: Type.Optional(Type.String({ format: "date-time" })),
    model: Type.Optional(Type.String()),
    provider: Type.Optional(AiProviderKeySchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMemorySnapshot schema. */
export type ChatMemorySnapshot = Static<typeof ChatMemorySnapshotSchema>;

/**
 * Chat run request payload.
 */
export const ChatRunRequestSchema = Type.Object(
  {
    content: Type.String(),
    system: Type.Optional(Type.String()),
    promptKey: Type.Optional(Type.String()),
    rag: Type.Optional(
      Type.Object(
        {
          sources: Type.Array(
            Type.Object(
              {
                sourceType: RagSourceTypeSchema,
                sourceId: Type.String(),
                maxChunks: Type.Optional(Type.Number()),
              },
              { additionalProperties: false },
            ),
          ),
          maxChars: Type.Optional(Type.Number()),
        },
        { additionalProperties: false },
      ),
    ),
    provider: Type.Optional(AiProviderKeySchema),
    model: Type.Optional(Type.String()),
    maxTokens: Type.Optional(Type.Number()),
    temperature: Type.Optional(Type.Number()),
    topP: Type.Optional(Type.Number()),
    autoRespond: Type.Optional(Type.Boolean()),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    idempotencyKey: Type.Optional(Type.String()),
    tools: Type.Optional(
      Type.Object(
        {
          enabled: Type.Optional(Type.Boolean()),
          toolChoice: Type.Optional(ChatToolChoiceSchema),
          toolIds: Type.Optional(Type.Array(Type.String())),
        },
        { additionalProperties: false },
      ),
    ),
    memory: Type.Optional(
      Type.Object(
        {
          enabled: Type.Optional(Type.Boolean()),
          refresh: Type.Optional(Type.Boolean()),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunRequest schema. */
export type ChatRunRequest = Static<typeof ChatRunRequestSchema>;

/**
 * Chat run response data.
 */
export const ChatRunResponseDataSchema = Type.Object(
  {
    run: ChatRunSchema,
    messages: Type.Array(ChatMessageSchema),
    memory: Type.Optional(ChatMemorySnapshotSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunResponseData schema. */
export type ChatRunResponseData = Static<typeof ChatRunResponseDataSchema>;

/**
 * Chat run response envelope.
 */
export const ChatRunResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: ChatRunResponseDataSchema,
    timestamp: Type.Optional(Type.String({ format: "date-time" })),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunResponse schema. */
export type ChatRunResponse = Static<typeof ChatRunResponseSchema>;

/**
 * Chat runs list request payload (query params).
 */
export const ChatRunsListRequestSchema: Type.TObject<
  { readonly limit: Type.TOptional<Type.TInteger>; readonly cursor: Type.TOptional<Type.TString> },
  never,
  Type.InferOptionalKeys<{
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly cursor: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    limit: Type.Optional(Type.Integer({ minimum: 1 })),
    cursor: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunsListRequest schema. */
export type ChatRunsListRequest = Static<typeof ChatRunsListRequestSchema>;

/**
 * Chat runs list response.
 */
export const ChatRunsListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        runs: Type.Array(ChatRunSchema),
        count: Type.Optional(Type.Number()),
        hasMore: Type.Optional(Type.Boolean()),
      },
      { additionalProperties: false },
    ),
    timestamp: Type.Optional(Type.String({ format: "date-time" })),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunsListResponse schema. */
export type ChatRunsListResponse = Static<typeof ChatRunsListResponseSchema>;

/**
 * Chat message list request payload (query params).
 */
export const ChatMessagesListRequestSchema: Type.TObject<
  {
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly cursor: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly limit: Type.TOptional<Type.TUnion<(Type.TString | Type.TInteger)[]>>;
    readonly cursor: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    limit: Type.Optional(Type.Union([Type.Integer({ minimum: 1 }), Type.String({ minLength: 1 })])),
    cursor: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMessagesListRequest schema. */
export type ChatMessagesListRequest = Static<typeof ChatMessagesListRequestSchema>;

/**
 * Chat message list response payload.
 */
export const ChatMessagesListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        messages: Type.Array(ChatMessageSchema),
        count: Type.Optional(Type.Number()),
        hasMore: Type.Optional(Type.Boolean()),
        nextCursor: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      },
      { additionalProperties: false },
    ),
    timestamp: Type.Optional(Type.String({ format: "date-time" })),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMessagesListResponse schema. */
export type ChatMessagesListResponse = Static<typeof ChatMessagesListResponseSchema>;

/**
 * Chat run lookup request payload (path params).
 */
export const ChatRunLookupRequestSchema: Type.TObject<
  { readonly runId: Type.TString },
  "runId",
  never
> = Type.Object(
  {
    runId: Type.String(),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunLookupRequest schema. */
export type ChatRunLookupRequest = Static<typeof ChatRunLookupRequestSchema>;

/**
 * Chat tools list request payload (query params).
 */
export const ChatToolsListRequestSchema: Type.TObject<
  { readonly limit: Type.TOptional<Type.TInteger>; readonly cursor: Type.TOptional<Type.TString> },
  never,
  Type.InferOptionalKeys<{
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly cursor: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    limit: Type.Optional(Type.Integer({ minimum: 1 })),
    cursor: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatToolsListRequest schema. */
export type ChatToolsListRequest = Static<typeof ChatToolsListRequestSchema>;

/**
 * Chat tools list response.
 */
export const ChatToolsListResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        tools: Type.Array(ChatToolDefinitionSchema),
        nextCursor: Type.Optional(Type.Union([Type.String(), Type.Null()])),
      },
      { additionalProperties: false },
    ),
    timestamp: Type.Optional(Type.String({ format: "date-time" })),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatToolsListResponse schema. */
export type ChatToolsListResponse = Static<typeof ChatToolsListResponseSchema>;

/**
 * Chat memory refresh request payload.
 */
export const ChatMemoryRefreshRequestSchema: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = Type.Object(
  {
    idempotencyKey: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMemoryRefreshRequest schema. */
export type ChatMemoryRefreshRequest = Static<typeof ChatMemoryRefreshRequestSchema>;

/**
 * Chat memory response envelope.
 */
export const ChatMemoryResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: ChatMemorySnapshotSchema,
    timestamp: Type.Optional(Type.String({ format: "date-time" })),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMemoryResponse schema. */
export type ChatMemoryResponse = Static<typeof ChatMemoryResponseSchema>;

/**
 * Chat memory refresh response envelope.
 */
export const ChatMemoryRefreshResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        queued: Type.Boolean(),
        refreshed: Type.Boolean(),
        jobId: Type.Union([Type.String(), Type.Null()]),
        memory: Type.Optional(ChatMemorySnapshotSchema),
      },
      { additionalProperties: false },
    ),
    timestamp: Type.Optional(Type.String({ format: "date-time" })),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMemoryRefreshResponse schema. */
export type ChatMemoryRefreshResponse = Static<typeof ChatMemoryRefreshResponseSchema>;
