/**
 * Chat run, tool, and memory schemas.
 *
 * Defines shared TypeBox schemas for chat orchestration, tool calling,
 * and memory snapshots to keep API contracts aligned across server and UI.
 *
 * @shared/schemas/chat.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { AiProviderKeySchema } from "./ai-provider.schemas.ts";
import { stringEnum } from "./baobox-enum.ts";

const RagSourceTypeSchema = TypeExports.Union(
  [
    TypeExports.Literal("case"),
    TypeExports.Literal("report"),
    TypeExports.Literal("document"),
    TypeExports.Literal("image"),
    TypeExports.Literal("annotation"),
    TypeExports.Literal("custom"),
    TypeExports.Literal("memory"),
    TypeExports.Literal("mcp"),
  ],
  {},
);

/**
 * Chat tool definition (OpenAI-compatible).
 */
export const ChatToolDefinitionSchema: TObject<
  {
    readonly type: TLiteral<"function">;
    readonly function: TObject<
      {
        readonly name: TString;
        readonly description: TOptional<TString>;
        readonly parameters: TOptional<TRecord<TString, TUnknown>>;
      },
      "name",
      InferOptionalKeys<{
        readonly name: TString;
        readonly description: TOptional<TString>;
        readonly parameters: TOptional<TRecord<TString, TUnknown>>;
      }>
    >;
  },
  "function" | "type",
  never
> = TypeExports.Object(
  {
    type: TypeExports.Literal("function"),
    function: TypeExports.Object(
      {
        name: TypeExports.String(),
        description: TypeExports.Optional(TypeExports.String()),
        parameters: TypeExports.Optional(
          TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
        ),
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
export const ChatToolChoiceSchema: TUnion<
  (
    | TLiteral<"auto">
    | TLiteral<"none">
    | TLiteral<"required">
    | TObject<
        {
          readonly type: TLiteral<"function">;
          readonly function: TObject<{ readonly name: TString }, "name", never>;
        },
        "function" | "type",
        never
      >
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("auto"),
    TypeExports.Literal("none"),
    TypeExports.Literal("required"),
    TypeExports.Object(
      {
        type: TypeExports.Literal("function"),
        function: TypeExports.Object(
          {
            name: TypeExports.String(),
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
export const ChatToolCallSchema: TObject<
  {
    readonly id: TString;
    readonly type: TLiteral<"function">;
    readonly function: TObject<
      { readonly name: TString; readonly arguments: TString },
      "name" | "arguments",
      never
    >;
    readonly parsedArguments: TOptional<TRecord<TString, TUnknown>>;
  },
  "function" | "type" | "id",
  "parsedArguments"
> = TypeExports.Object(
  {
    id: TypeExports.String(),
    type: TypeExports.Literal("function"),
    function: TypeExports.Object(
      {
        name: TypeExports.String(),
        arguments: TypeExports.String(),
      },
      { additionalProperties: false },
    ),
    parsedArguments: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatToolCall schema. */
export type ChatToolCall = Static<typeof ChatToolCallSchema>;

/**
 * Result payload for a tool execution.
 */
export const ChatToolResultSchema: TObject<
  {
    readonly toolCallId: TString;
    readonly name: TString;
    readonly ok: TBoolean;
    readonly output: TOptional<TString>;
    readonly error: TOptional<TString>;
    readonly durationMs: TOptional<TNumber>;
  },
  "toolCallId" | "name" | "ok",
  InferOptionalKeys<{
    readonly toolCallId: TString;
    readonly name: TString;
    readonly ok: TBoolean;
    readonly output: TOptional<TString>;
    readonly error: TOptional<TString>;
    readonly durationMs: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    toolCallId: TypeExports.String(),
    name: TypeExports.String(),
    ok: TypeExports.Boolean(),
    output: TypeExports.Optional(TypeExports.String()),
    error: TypeExports.Optional(TypeExports.String()),
    durationMs: TypeExports.Optional(TypeExports.Number()),
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
export const ChatRunStepTypeSchema: TUnion<
  [
    TLiteral<"prompt" | "tool" | "memory" | "response" | "policy" | "guardrail" | "system" | "rag">,
    ...TLiteral<
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
export const ChatRunStepStatusSchema: TUnion<
  [
    TLiteral<"pending" | "running" | "completed" | "failed" | "skipped" | "blocked">,
    ...TLiteral<"pending" | "running" | "completed" | "failed" | "skipped" | "blocked">[],
  ]
> = stringEnum(CHAT_RUN_STEP_STATUSES, {});

/**
 * Chat run step schema.
 */
export const ChatRunStepSchema = TypeExports.Object(
  {
    id: TypeExports.String(),
    type: ChatRunStepTypeSchema,
    status: ChatRunStepStatusSchema,
    startedAt: TypeExports.String({ format: "date-time" }),
    completedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    toolCall: TypeExports.Optional(ChatToolCallSchema),
    toolResult: TypeExports.Optional(ChatToolResultSchema),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
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
export const ChatRunStatusSchema: TUnion<
  [
    TLiteral<
      "queued" | "running" | "requires_action" | "completed" | "failed" | "cancelled" | "skipped"
    >,
    ...TLiteral<
      "queued" | "running" | "requires_action" | "completed" | "failed" | "cancelled" | "skipped"
    >[],
  ]
> = stringEnum(CHAT_RUN_STATUSES, {});

/**
 * Run error payload.
 */
export const ChatRunErrorSchema: TObject<
  {
    readonly code: TOptional<TString>;
    readonly message: TString;
    readonly retryable: TOptional<TBoolean>;
    readonly details: TOptional<TRecord<TString, TUnknown>>;
  },
  "message",
  InferOptionalKeys<{
    readonly code: TOptional<TString>;
    readonly message: TString;
    readonly retryable: TOptional<TBoolean>;
    readonly details: TOptional<TRecord<TString, TUnknown>>;
  }>
> = TypeExports.Object(
  {
    code: TypeExports.Optional(TypeExports.String()),
    message: TypeExports.String(),
    retryable: TypeExports.Optional(TypeExports.Boolean()),
    details: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunError schema. */
export type ChatRunError = Static<typeof ChatRunErrorSchema>;

/**
 * Usage summary for chat runs.
 */
export const ChatRunUsageSchema: TObject<
  {
    readonly promptTokens: TOptional<TNumber>;
    readonly completionTokens: TOptional<TNumber>;
    readonly totalTokens: TOptional<TNumber>;
  },
  never,
  InferOptionalKeys<{
    readonly promptTokens: TOptional<TNumber>;
    readonly completionTokens: TOptional<TNumber>;
    readonly totalTokens: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    promptTokens: TypeExports.Optional(TypeExports.Number()),
    completionTokens: TypeExports.Optional(TypeExports.Number()),
    totalTokens: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunUsage schema. */
export type ChatRunUsage = Static<typeof ChatRunUsageSchema>;

/**
 * Chat run response payload.
 */
export const ChatRunSchema = TypeExports.Object(
  {
    id: TypeExports.String(),
    conversationId: TypeExports.String(),
    status: ChatRunStatusSchema,
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
    startedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    finishedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    requestId: TypeExports.Optional(TypeExports.String()),
    idempotencyKey: TypeExports.Optional(TypeExports.String()),
    promptKey: TypeExports.Optional(TypeExports.String()),
    provider: TypeExports.Optional(AiProviderKeySchema),
    model: TypeExports.Optional(TypeExports.String()),
    userMessageId: TypeExports.Optional(TypeExports.String()),
    assistantMessageId: TypeExports.Optional(TypeExports.String()),
    steps: TypeExports.Optional(TypeExports.Array(ChatRunStepSchema)),
    toolCalls: TypeExports.Optional(TypeExports.Array(ChatToolCallSchema)),
    usage: TypeExports.Optional(ChatRunUsageSchema),
    error: TypeExports.Optional(ChatRunErrorSchema),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRun schema. */
export type ChatRun = Static<typeof ChatRunSchema>;

/**
 * Chat message schema (API DTO).
 */
export const ChatMessageSchema: TObject<
  {
    readonly id: TString;
    readonly conversationId: TString;
    readonly userId: TOptional<TUnion<(TString | TNull)[]>>;
    readonly role: TString;
    readonly content: TString;
    readonly metadata: TOptional<TRecord<TString, TUnknown>>;
    readonly createdAt: TString;
  },
  "id" | "conversationId" | "createdAt" | "role" | "content",
  InferOptionalKeys<{
    readonly id: TString;
    readonly conversationId: TString;
    readonly userId: TOptional<TUnion<(TString | TNull)[]>>;
    readonly role: TString;
    readonly content: TString;
    readonly metadata: TOptional<TRecord<TString, TUnknown>>;
    readonly createdAt: TString;
  }>
> = TypeExports.Object(
  {
    id: TypeExports.String(),
    conversationId: TypeExports.String(),
    userId: TypeExports.Optional(TypeExports.Union([TypeExports.String(), TypeExports.Null()])),
    role: TypeExports.String(),
    content: TypeExports.String(),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    createdAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMessage schema. */
export type ChatMessage = Static<typeof ChatMessageSchema>;

/**
 * Last-message summary attached to a conversation list item.
 */
export const ChatConversationLastMessageSchema: TObject<
  {
    readonly id: TString;
    readonly role: TString;
    readonly content: TString;
    readonly createdAt: TString;
  },
  "id" | "createdAt" | "role" | "content",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String(),
    role: TypeExports.String(),
    content: TypeExports.String(),
    createdAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatConversationLastMessage schema. */
export type ChatConversationLastMessage = Static<typeof ChatConversationLastMessageSchema>;

/**
 * Chat conversation schema (list API DTO).
 */
export const ChatConversationSchema = TypeExports.Object(
  {
    id: TypeExports.String(),
    userId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    createdBy: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    scopeType: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    scopeId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    title: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    provider: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    visibility: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    metadata: TypeExports.Unknown(),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
    lastMessage: TypeExports.Union([ChatConversationLastMessageSchema, TypeExports.Null()]),
    messageCount: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatConversation schema. */
export type ChatConversation = Static<typeof ChatConversationSchema>;

/**
 * Chat conversation list response payload.
 */
export const ChatConversationsListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Array(ChatConversationSchema),
    timestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatConversationsListResponse schema. */
export type ChatConversationsListResponse = Static<typeof ChatConversationsListResponseSchema>;

/**
 * Memory snapshot payload for a conversation.
 */
export const ChatMemorySnapshotSchema = TypeExports.Object(
  {
    summary: TypeExports.Optional(TypeExports.String()),
    facts: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
    preferences: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
    openTasks: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
    updatedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    model: TypeExports.Optional(TypeExports.String()),
    provider: TypeExports.Optional(AiProviderKeySchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMemorySnapshot schema. */
export type ChatMemorySnapshot = Static<typeof ChatMemorySnapshotSchema>;

/**
 * Chat run request payload.
 */
export const ChatRunRequestSchema = TypeExports.Object(
  {
    content: TypeExports.String(),
    system: TypeExports.Optional(TypeExports.String()),
    promptKey: TypeExports.Optional(TypeExports.String()),
    rag: TypeExports.Optional(
      TypeExports.Object(
        {
          sources: TypeExports.Array(
            TypeExports.Object(
              {
                sourceType: RagSourceTypeSchema,
                sourceId: TypeExports.String(),
                maxChunks: TypeExports.Optional(TypeExports.Number()),
              },
              { additionalProperties: false },
            ),
          ),
          maxChars: TypeExports.Optional(TypeExports.Number()),
        },
        { additionalProperties: false },
      ),
    ),
    provider: TypeExports.Optional(AiProviderKeySchema),
    model: TypeExports.Optional(TypeExports.String()),
    maxTokens: TypeExports.Optional(TypeExports.Number()),
    temperature: TypeExports.Optional(TypeExports.Number()),
    topP: TypeExports.Optional(TypeExports.Number()),
    autoRespond: TypeExports.Optional(TypeExports.Boolean()),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    idempotencyKey: TypeExports.Optional(TypeExports.String()),
    tools: TypeExports.Optional(
      TypeExports.Object(
        {
          enabled: TypeExports.Optional(TypeExports.Boolean()),
          toolChoice: TypeExports.Optional(ChatToolChoiceSchema),
          toolIds: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
        },
        { additionalProperties: false },
      ),
    ),
    memory: TypeExports.Optional(
      TypeExports.Object(
        {
          enabled: TypeExports.Optional(TypeExports.Boolean()),
          refresh: TypeExports.Optional(TypeExports.Boolean()),
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
export const ChatRunResponseDataSchema = TypeExports.Object(
  {
    run: ChatRunSchema,
    messages: TypeExports.Array(ChatMessageSchema),
    memory: TypeExports.Optional(ChatMemorySnapshotSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunResponseData schema. */
export type ChatRunResponseData = Static<typeof ChatRunResponseDataSchema>;

/**
 * Chat run response envelope.
 */
export const ChatRunResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: ChatRunResponseDataSchema,
    timestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunResponse schema. */
export type ChatRunResponse = Static<typeof ChatRunResponseSchema>;

/**
 * Chat runs list request payload (query params).
 */
export const ChatRunsListRequestSchema: TObject<
  { readonly limit: TOptional<TInteger>; readonly cursor: TOptional<TString> },
  never,
  InferOptionalKeys<{
    readonly limit: TOptional<TInteger>;
    readonly cursor: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    cursor: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunsListRequest schema. */
export type ChatRunsListRequest = Static<typeof ChatRunsListRequestSchema>;

/**
 * Chat runs list response.
 */
export const ChatRunsListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Object(
      {
        runs: TypeExports.Array(ChatRunSchema),
        count: TypeExports.Optional(TypeExports.Number()),
        hasMore: TypeExports.Optional(TypeExports.Boolean()),
      },
      { additionalProperties: false },
    ),
    timestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatRunsListResponse schema. */
export type ChatRunsListResponse = Static<typeof ChatRunsListResponseSchema>;

/**
 * Chat message list request payload (query params).
 */
export const ChatMessagesListRequestSchema: TObject<
  {
    readonly limit: TOptional<TUnion<(TString | TInteger)[]>>;
    readonly cursor: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly limit: TOptional<TUnion<(TString | TInteger)[]>>;
    readonly cursor: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    limit: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Integer({ minimum: 1 }),
        TypeExports.String({ minLength: 1 }),
      ]),
    ),
    cursor: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMessagesListRequest schema. */
export type ChatMessagesListRequest = Static<typeof ChatMessagesListRequestSchema>;

/**
 * Chat message list response payload.
 */
export const ChatMessagesListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Object(
      {
        messages: TypeExports.Array(ChatMessageSchema),
        count: TypeExports.Optional(TypeExports.Number()),
        hasMore: TypeExports.Optional(TypeExports.Boolean()),
        nextCursor: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
      },
      { additionalProperties: false },
    ),
    timestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMessagesListResponse schema. */
export type ChatMessagesListResponse = Static<typeof ChatMessagesListResponseSchema>;

/**
 * Chat run lookup request payload (path params).
 */
export const ChatRunLookupRequestSchema: TObject<{ readonly runId: TString }, "runId", never> =
  TypeExports.Object(
    {
      runId: TypeExports.String(),
    },
    { additionalProperties: false },
  );

/** Inferred type from the ChatRunLookupRequest schema. */
export type ChatRunLookupRequest = Static<typeof ChatRunLookupRequestSchema>;

/**
 * Chat tools list request payload (query params).
 */
export const ChatToolsListRequestSchema: TObject<
  { readonly limit: TOptional<TInteger>; readonly cursor: TOptional<TString> },
  never,
  InferOptionalKeys<{
    readonly limit: TOptional<TInteger>;
    readonly cursor: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    cursor: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatToolsListRequest schema. */
export type ChatToolsListRequest = Static<typeof ChatToolsListRequestSchema>;

/**
 * Chat tools list response.
 */
export const ChatToolsListResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Object(
      {
        tools: TypeExports.Array(ChatToolDefinitionSchema),
        nextCursor: TypeExports.Optional(
          TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        ),
      },
      { additionalProperties: false },
    ),
    timestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatToolsListResponse schema. */
export type ChatToolsListResponse = Static<typeof ChatToolsListResponseSchema>;

/**
 * Chat memory refresh request payload.
 */
export const ChatMemoryRefreshRequestSchema: TObject<
  { readonly idempotencyKey: TOptional<TString> },
  never,
  "idempotencyKey"
> = TypeExports.Object(
  {
    idempotencyKey: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMemoryRefreshRequest schema. */
export type ChatMemoryRefreshRequest = Static<typeof ChatMemoryRefreshRequestSchema>;

/**
 * Chat memory response envelope.
 */
export const ChatMemoryResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: ChatMemorySnapshotSchema,
    timestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMemoryResponse schema. */
export type ChatMemoryResponse = Static<typeof ChatMemoryResponseSchema>;

/**
 * Chat memory refresh response envelope.
 */
export const ChatMemoryRefreshResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Object(
      {
        queued: TypeExports.Boolean(),
        refreshed: TypeExports.Boolean(),
        jobId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        memory: TypeExports.Optional(ChatMemorySnapshotSchema),
      },
      { additionalProperties: false },
    ),
    timestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the ChatMemoryRefreshResponse schema. */
export type ChatMemoryRefreshResponse = Static<typeof ChatMemoryRefreshResponseSchema>;
