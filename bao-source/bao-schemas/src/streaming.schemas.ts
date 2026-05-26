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

import type {
  InferOptionalKeys,
  Static,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Standard SSE event types used across streaming endpoints.
 */
export const StreamEventType: TUnion<
  (
    | TLiteral<"meta">
    | TLiteral<"chunk">
    | TLiteral<"data">
    | TLiteral<"progress">
    | TLiteral<"done">
    | TLiteral<"error">
    | TLiteral<"usage">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("meta"),
    TypeExports.Literal("chunk"),
    TypeExports.Literal("data"),
    TypeExports.Literal("progress"),
    TypeExports.Literal("done"),
    TypeExports.Literal("error"),
    TypeExports.Literal("usage"),
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
export const StreamErrorData: TObject<
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
> = TypeExports.Object(
  {
    /** Error code for programmatic handling (e.g., 'RATE_LIMITED', 'INTERNAL_ERROR'). */
    code: TypeExports.String({ description: "Error code for programmatic handling" }),

    /** Human-readable error message. */
    message: TypeExports.String({ description: "Human-readable error description" }),

    /** Optional correlation ID for request tracing. */
    correlationId: TypeExports.Optional(
      TypeExports.String({ description: "Request correlation ID for tracing" }),
    ),

    /** Optional HTTP status code equivalent. */
    status: TypeExports.Optional(
      TypeExports.Number({ description: "HTTP status code equivalent" }),
    ),

    /** Optional additional error details (JSON value). */
    details: TypeExports.Optional(JsonValueSchema),

    /** Optional retry guidance in seconds. */
    retryAfter: TypeExports.Optional(
      TypeExports.Number({ description: "Seconds to wait before retrying" }),
    ),
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
export const StreamErrorEvent: TObject<
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
    /** Event type (always 'error' for this schema). */
    event: TypeExports.Literal("error"),

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
export const StreamMetaData: TObject<
  {
    readonly requestId: TOptional<TString>;
    readonly correlationId: TOptional<TString>;
    readonly model: TOptional<TString>;
    readonly sessionId: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly requestId: TOptional<TString>;
    readonly correlationId: TOptional<TString>;
    readonly model: TOptional<TString>;
    readonly sessionId: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    /** Optional request ID for tracing. */
    requestId: TypeExports.Optional(TypeExports.String({ description: "Request identifier" })),

    /** Optional correlation ID. */
    correlationId: TypeExports.Optional(
      TypeExports.String({ description: "Correlation ID for request chain" }),
    ),

    /** Optional model identifier (for AI streams). */
    model: TypeExports.Optional(TypeExports.String({ description: "AI model identifier" })),

    /** Optional stream session ID. */
    sessionId: TypeExports.Optional(
      TypeExports.String({ description: "Stream session identifier" }),
    ),

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
export const StreamMetaEvent: TObject<
  {
    readonly event: TLiteral<"meta">;
    readonly data: TObject<
      {
        readonly requestId: TOptional<TString>;
        readonly correlationId: TOptional<TString>;
        readonly model: TOptional<TString>;
        readonly sessionId: TOptional<TString>;
      },
      never,
      InferOptionalKeys<{
        readonly requestId: TOptional<TString>;
        readonly correlationId: TOptional<TString>;
        readonly model: TOptional<TString>;
        readonly sessionId: TOptional<TString>;
      }>
    >;
  },
  "event" | "data",
  never
> = TypeExports.Object(
  {
    event: TypeExports.Literal("meta"),
    data: StreamMetaData,
  },
  { description: "Complete SSE meta event" },
);

/** TypeScript type for stream meta event. */
export type StreamMetaEvent = Static<typeof StreamMetaEvent>;

/**
 * Stream progress event payload schema.
 */
export const StreamProgressData: TObject<
  {
    readonly percent: TOptional<TNumber>;
    readonly step: TOptional<TNumber>;
    readonly totalSteps: TOptional<TNumber>;
    readonly stage: TOptional<TString>;
    readonly bytesProcessed: TOptional<TNumber>;
    readonly bytesTotal: TOptional<TNumber>;
  },
  never,
  InferOptionalKeys<{
    readonly percent: TOptional<TNumber>;
    readonly step: TOptional<TNumber>;
    readonly totalSteps: TOptional<TNumber>;
    readonly stage: TOptional<TString>;
    readonly bytesProcessed: TOptional<TNumber>;
    readonly bytesTotal: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    /** Progress percentage (0-100). */
    percent: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 100 })),

    /** Current step number. */
    step: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),

    /** Total steps. */
    totalSteps: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),

    /** Current stage description. */
    stage: TypeExports.Optional(TypeExports.String()),

    /** Bytes processed (for upload/download). */
    bytesProcessed: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),

    /** Total bytes (for upload/download). */
    bytesTotal: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
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
export const StreamUsageData: TObject<
  {
    readonly promptTokens: TOptional<TNumber>;
    readonly completionTokens: TOptional<TNumber>;
    readonly totalTokens: TOptional<TNumber>;
    readonly estimatedCost: TOptional<TNumber>;
  },
  never,
  InferOptionalKeys<{
    readonly promptTokens: TOptional<TNumber>;
    readonly completionTokens: TOptional<TNumber>;
    readonly totalTokens: TOptional<TNumber>;
    readonly estimatedCost: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    /** Input tokens consumed. */
    promptTokens: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),

    /** Output tokens generated. */
    completionTokens: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),

    /** Total tokens used. */
    totalTokens: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),

    /** Estimated cost in USD. */
    estimatedCost: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
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
export const StreamDoneData = TypeExports.Object(
  {
    /** Optional final status message. */
    message: TypeExports.Optional(TypeExports.String()),

    /** Optional summary data (JSON value). */
    summary: TypeExports.Optional(JsonValueSchema),

    /** Optional usage metrics. */
    usage: TypeExports.Optional(StreamUsageData),
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
export const StreamEvent: TObject<
  { readonly event: TString; readonly data: TUnknown },
  "event" | "data",
  never
> = TypeExports.Object(
  {
    /** Event type identifier. */
    event: TypeExports.String({ description: "SSE event type" }),

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
  if (!event || typeof event !== "object") {
    return false;
  }
  if (!("event" in event) || event.event !== "error") {
    return false;
  }
  if (!("data" in event) || !event.data || typeof event.data !== "object") {
    return false;
  }
  return (
    "code" in event.data &&
    typeof event.data.code === "string" &&
    "message" in event.data &&
    typeof event.data.message === "string"
  );
}

/**
 * Type guard to check if an unknown value is a valid stream meta event.
 *
 * @param event - Unknown event to validate.
 * @returns True if the event matches StreamMetaEvent schema.
 */
export function isStreamMetaEvent(event: unknown): event is StreamMetaEvent {
  if (!event || typeof event !== "object") {
    return false;
  }
  if (!("event" in event) || event.event !== "meta") {
    return false;
  }
  if (!("data" in event) || !event.data || typeof event.data !== "object") {
    return false;
  }
  return true;
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
