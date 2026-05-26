/**
 * Streaming Schemas
 *
 * Baobox schema definitions for Server-Sent Events (SSE) streaming responses.
 * These schemas define the contract between Elysia server SSE endpoints and
 * the client-side useEdenStream composable.
 *
 * @shared/schemas/streaming.ts
 *
 * @remarks
 * These schemas ensure type-safe streaming communication by defining:
 * - Standard SSE event types (meta, chunk, data, progress, done, error, usage)
 * - Error event payload structure for consistent error handling
 * - Validation utilities for client-side schema checking
 *
 * @example Server-side SSE endpoint
 * ```typescript
 * // Elysia route using SSE helper
 * .get('/stream', async function* () {
 *   yield sse({ event: 'meta', data: { requestId: 'abc-123' } });
 *   yield sse({ event: 'chunk', data: 'Hello ' });
 *   yield sse({ event: 'chunk', data: 'World!' });
 *   yield sse({ event: 'done', data: {} });
 * })
 * ```
 *
 * @example Client-side stream consumption
 * ```typescript
 * const { start, error } = useEdenStream();
 * await start(api.stream.get(), {
 *   onError: (err) => {
 *     // err is validated against StreamErrorEventSchema
 *     createLogger('streaming').info(err.code, err.message);
 *   },
 * });
 * ```
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

import { isJsonGuardRecord } from "../types/json-guard.ts";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Standard SSE event types used across streaming endpoints.
 */
export const StreamEventType: Type.TUnion<
  (
    | Type.TLiteral<"meta">
    | Type.TLiteral<"chunk">
    | Type.TLiteral<"data">
    | Type.TLiteral<"progress">
    | Type.TLiteral<"done">
    | Type.TLiteral<"error">
    | Type.TLiteral<"usage">
  )[]
> = Type.Union(
  [
    Type.Literal("meta"),
    Type.Literal("chunk"),
    Type.Literal("data"),
    Type.Literal("progress"),
    Type.Literal("done"),
    Type.Literal("error"),
    Type.Literal("usage"),
  ],
  { description: "SSE event type identifier" },
);

/** TypeScript type for stream event types. */
export type StreamEventType = Static<typeof StreamEventType>;

/**
 * Stream error event payload schema.
 *
 * Defines the structure of error events sent via SSE streams.
 * Used by both server (to emit) and client (to validate) error events.
 */
export const StreamErrorData: Type.TObject<
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
> = Type.Object(
  {
    /** Error code for programmatic handling (e.g., 'RATE_LIMITED', 'INTERNAL_ERROR'). */
    code: Type.String({ description: "Error code for programmatic handling" }),

    /** Human-readable error message. */
    message: Type.String({ description: "Human-readable error description" }),

    /** Optional correlation ID for request tracing. */
    correlationId: Type.Optional(
      Type.String({ description: "Request correlation ID for tracing" }),
    ),

    /** Optional HTTP status code equivalent. */
    status: Type.Optional(Type.Number({ description: "HTTP status code equivalent" })),

    /** Optional additional error details (JSON value). */
    details: Type.Optional(JsonValueSchema),

    /** Optional retry guidance in seconds. */
    retryAfter: Type.Optional(Type.Number({ description: "Seconds to wait before retrying" })),
  },
  {
    description: "Stream error event payload",
    additionalProperties: false,
  },
);

/** TypeScript type for stream error data. */
export type StreamErrorData = Static<typeof StreamErrorData>;

/**
 * Full stream error event schema (event type + data).
 *
 * Represents a complete SSE error event as transmitted over the wire.
 */
export const StreamErrorEvent: Type.TObject<
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
    /** Event type (always 'error' for this schema). */
    event: Type.Literal("error"),

    /** Error payload. */
    data: StreamErrorData,
  },
  { description: "Complete SSE error event" },
);

/** TypeScript type for stream error event. */
export type StreamErrorEvent = Static<typeof StreamErrorEvent>;

/**
 * Stream metadata event payload schema.
 *
 * Defines the structure of metadata events sent at stream start.
 */
export const StreamMetaData: Type.TObject<
  {
    readonly requestId: Type.TOptional<Type.TString>;
    readonly correlationId: Type.TOptional<Type.TString>;
    readonly model: Type.TOptional<Type.TString>;
    readonly sessionId: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly requestId: Type.TOptional<Type.TString>;
    readonly correlationId: Type.TOptional<Type.TString>;
    readonly model: Type.TOptional<Type.TString>;
    readonly sessionId: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    /** Optional request ID for tracing. */
    requestId: Type.Optional(Type.String({ description: "Request identifier" })),

    /** Optional correlation ID. */
    correlationId: Type.Optional(Type.String({ description: "Correlation ID for request chain" })),

    /** Optional model identifier (for AI streams). */
    model: Type.Optional(Type.String({ description: "AI model identifier" })),

    /** Optional stream session ID. */
    sessionId: Type.Optional(Type.String({ description: "Stream session identifier" })),

    /** Additional metadata properties. */
  },
  {
    description: "Stream metadata event payload",
    additionalProperties: true,
  },
);

/** TypeScript type for stream metadata. */
export type StreamMetaData = Static<typeof StreamMetaData>;

/**
 * Full stream meta event schema (event type + data).
 */
export const StreamMetaEvent: Type.TObject<
  {
    readonly event: Type.TLiteral<"meta">;
    readonly data: Type.TObject<
      {
        readonly requestId: Type.TOptional<Type.TString>;
        readonly correlationId: Type.TOptional<Type.TString>;
        readonly model: Type.TOptional<Type.TString>;
        readonly sessionId: Type.TOptional<Type.TString>;
      },
      never,
      Type.InferOptionalKeys<{
        readonly requestId: Type.TOptional<Type.TString>;
        readonly correlationId: Type.TOptional<Type.TString>;
        readonly model: Type.TOptional<Type.TString>;
        readonly sessionId: Type.TOptional<Type.TString>;
      }>
    >;
  },
  "event" | "data",
  never
> = Type.Object(
  {
    event: Type.Literal("meta"),
    data: StreamMetaData,
  },
  { description: "Complete SSE meta event" },
);

/** TypeScript type for stream meta event. */
export type StreamMetaEvent = Static<typeof StreamMetaEvent>;

/**
 * Stream progress event payload schema.
 */
export const StreamProgressData: Type.TObject<
  {
    readonly percent: Type.TOptional<Type.TNumber>;
    readonly step: Type.TOptional<Type.TNumber>;
    readonly totalSteps: Type.TOptional<Type.TNumber>;
    readonly stage: Type.TOptional<Type.TString>;
    readonly bytesProcessed: Type.TOptional<Type.TNumber>;
    readonly bytesTotal: Type.TOptional<Type.TNumber>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly percent: Type.TOptional<Type.TNumber>;
    readonly step: Type.TOptional<Type.TNumber>;
    readonly totalSteps: Type.TOptional<Type.TNumber>;
    readonly stage: Type.TOptional<Type.TString>;
    readonly bytesProcessed: Type.TOptional<Type.TNumber>;
    readonly bytesTotal: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    /** Progress percentage (0-100). */
    percent: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),

    /** Current step number. */
    step: Type.Optional(Type.Number({ minimum: 0 })),

    /** Total steps. */
    totalSteps: Type.Optional(Type.Number({ minimum: 0 })),

    /** Current stage description. */
    stage: Type.Optional(Type.String()),

    /** Bytes processed (for upload/download). */
    bytesProcessed: Type.Optional(Type.Number({ minimum: 0 })),

    /** Total bytes (for upload/download). */
    bytesTotal: Type.Optional(Type.Number({ minimum: 0 })),
  },
  {
    description: "Stream progress event payload",
    additionalProperties: true,
  },
);

/** TypeScript type for stream progress data. */
export type StreamProgressData = Static<typeof StreamProgressData>;

/**
 * Stream usage event payload schema (for AI streams).
 */
export const StreamUsageData: Type.TObject<
  {
    readonly promptTokens: Type.TOptional<Type.TNumber>;
    readonly completionTokens: Type.TOptional<Type.TNumber>;
    readonly totalTokens: Type.TOptional<Type.TNumber>;
    readonly estimatedCost: Type.TOptional<Type.TNumber>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly promptTokens: Type.TOptional<Type.TNumber>;
    readonly completionTokens: Type.TOptional<Type.TNumber>;
    readonly totalTokens: Type.TOptional<Type.TNumber>;
    readonly estimatedCost: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    /** Input tokens consumed. */
    promptTokens: Type.Optional(Type.Number({ minimum: 0 })),

    /** Output tokens generated. */
    completionTokens: Type.Optional(Type.Number({ minimum: 0 })),

    /** Total tokens used. */
    totalTokens: Type.Optional(Type.Number({ minimum: 0 })),

    /** Estimated cost in USD. */
    estimatedCost: Type.Optional(Type.Number({ minimum: 0 })),
  },
  {
    description: "AI stream usage metrics",
    additionalProperties: true,
  },
);

/** TypeScript type for stream usage data. */
export type StreamUsageData = Static<typeof StreamUsageData>;

/**
 * Stream done event payload schema.
 */
export const StreamDoneData = Type.Object(
  {
    /** Optional final status message. */
    message: Type.Optional(Type.String()),

    /** Optional summary data (JSON value). */
    summary: Type.Optional(JsonValueSchema),

    /** Optional usage metrics. */
    usage: Type.Optional(StreamUsageData),
  },
  {
    description: "Stream completion event payload",
    additionalProperties: true,
  },
);

/** TypeScript type for stream done data. */
export type StreamDoneData = Static<typeof StreamDoneData>;

/**
 * Generic SSE event wrapper schema.
 *
 * This is the base structure for all SSE events. Use specific event schemas
 * (StreamErrorEvent, StreamMetaEvent) for type-safe handling.
 */
export const StreamEvent: Type.TObject<
  { readonly event: Type.TString; readonly data: Type.TUnknown },
  "event" | "data",
  never
> = Type.Object(
  {
    /** Event type identifier. */
    event: Type.String({ description: "SSE event type" }),

    /** Event payload (type depends on event). */
    data: JsonValueSchema,
  },
  { description: "Generic SSE event wrapper" },
);

/** TypeScript type for generic stream event. */
export type StreamEvent = Static<typeof StreamEvent>;

/**
 * Commonly used error codes for streaming endpoints.
 */
export const STREAM_ERROR_CODES: {
  readonly RATE_LIMITED: "RATE_LIMITED";
  readonly AUTH_REQUIRED: "AUTH_REQUIRED";
  readonly FORBIDDEN: "FORBIDDEN";
  readonly NOT_FOUND: "NOT_FOUND";
  readonly INTERNAL_ERROR: "INTERNAL_ERROR";
  readonly TIMEOUT: "TIMEOUT";
  readonly ABORTED: "ABORTED";
  readonly VALIDATION_ERROR: "VALIDATION_ERROR";
  readonly SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE";
  readonly AI_PROVIDER_ERROR: "AI_PROVIDER_ERROR";
  readonly CONTENT_FILTERED: "CONTENT_FILTERED";
  readonly AI_CONTENT_FILTER: "AI_CONTENT_FILTER";
  readonly AI_OUTPUT_INCOMPLETE: "AI_OUTPUT_INCOMPLETE";
  readonly AI_INVALID_OUTPUT: "AI_INVALID_OUTPUT";
  readonly QUOTA_EXCEEDED: "QUOTA_EXCEEDED";
} = {
  /** Rate limit exceeded. */
  RATE_LIMITED: "RATE_LIMITED",
  /** Authentication required or failed. */
  AUTH_REQUIRED: "AUTH_REQUIRED",
  /** Permission denied. */
  FORBIDDEN: "FORBIDDEN",
  /** Requested resource not found. */
  NOT_FOUND: "NOT_FOUND",
  /** Internal server error. */
  INTERNAL_ERROR: "INTERNAL_ERROR",
  /** Connection timeout. */
  TIMEOUT: "TIMEOUT",
  /** Stream aborted by client. */
  ABORTED: "ABORTED",
  /** Invalid request parameters. */
  VALIDATION_ERROR: "VALIDATION_ERROR",
  /** Service unavailable. */
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  /** AI provider error. */
  AI_PROVIDER_ERROR: "AI_PROVIDER_ERROR",
  /** AI content filtered (refusal/safety policy). */
  CONTENT_FILTERED: "CONTENT_FILTERED",
  /** AI content filter - alias for platform taxonomy. */
  AI_CONTENT_FILTER: "AI_CONTENT_FILTER",
  /** AI output incomplete (truncation, invalid JSON). */
  AI_OUTPUT_INCOMPLETE: "AI_OUTPUT_INCOMPLETE",
  /** AI invalid output (structured schema validation failed). */
  AI_INVALID_OUTPUT: "AI_INVALID_OUTPUT",
  /** AI quota exceeded. */
  QUOTA_EXCEEDED: "QUOTA_EXCEEDED",
} as const;

/** TypeScript type for stream error codes. */
export type StreamErrorCode = (typeof STREAM_ERROR_CODES)[keyof typeof STREAM_ERROR_CODES];

/**
 * Type guard to check if an unknown value is a valid stream error event.
 *
 * @param event - Unknown event to validate.
 * @returns True if the event matches StreamErrorEvent schema.
 *
 * @example
 * ```typescript
 * if (isStreamErrorEvent(event)) {
 *   // TypeScript knows event.data has code, message, etc.
 *   createLogger('streaming').info(event.data.message);
 * }
 * ```
 */
export function isStreamErrorEvent(event: unknown): event is StreamErrorEvent {
  if (!isJsonGuardRecord(event)) {
    return false;
  }
  if (event.event !== "error") {
    return false;
  }
  if (!isJsonGuardRecord(event.data)) {
    return false;
  }
  return typeof event.data.code === "string" && typeof event.data.message === "string";
}

/**
 * Type guard to check if an unknown value is a valid stream meta event.
 *
 * @param event - Unknown event to validate.
 * @returns True if the event matches StreamMetaEvent schema.
 */
export function isStreamMetaEvent(event: unknown): event is StreamMetaEvent {
  if (!isJsonGuardRecord(event)) {
    return false;
  }
  if (event.event !== "meta") {
    return false;
  }
  return isJsonGuardRecord(event.data);
}

/**
 * Create a standardized stream error event.
 *
 * Helper function for server-side SSE endpoints to emit consistent error events.
 *
 * @param code - Error code from STREAM_ERROR_CODES.
 * @param message - Human-readable error message.
 * @param options - Optional additional error properties.
 * @returns Properly structured StreamErrorEvent.
 *
 * @example
 * ```typescript
 * // In Elysia SSE generator
 * yield sse(createStreamError('RATE_LIMITED', 'Too many requests', { retryAfter: 60 }));
 * ```
 */
export function createStreamError(
  code: StreamErrorCode,
  message: string,
  options?: Partial<Omit<StreamErrorData, "code" | "message">>,
): StreamErrorEvent {
  return {
    event: "error",
    data: {
      code,
      message,
      ...options,
    },
  };
}
