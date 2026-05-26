/**
 * Correlation Types
 *
 * Defines type-safe models for request correlation and distributed tracing.
 * These types enable cross-feature observability by propagating correlation
 * context through the request chain.
 *
 * @shared/types/correlation.ts
 */

import { isRecord } from "./internal/record.js";

const TRACE_ID_RE: RegExp = /^[0-9a-f]{32}$/i;
const TRACE_ID_ZERO_RE: RegExp = /^0{32}$/i;
const SPAN_ID_RE: RegExp = /^[0-9a-f]{16}$/i;
const SPAN_ID_ZERO_RE: RegExp = /^0{16}$/i;
const HEX_PAIR_RE: RegExp = /^[0-9a-f]{2}$/i;

/**
 * Request correlation context for distributed tracing.
 *
 * Propagated via HTTP headers to enable request tracing across services
 * and features. The correlation ID links related requests together for
 * debugging and observability.
 *
 * @example
 * ```typescript
 * const context: CorrelationContext = {
 *   correlationId: crypto.randomUUID(),
 *   sessionId: authStore.sessionId,
 *   feature: 'cases',
 *   operation: 'create-case',
 *   createdAt: Date.now(),
 * };
 * ```
 */
export interface CorrelationContext {
  /** Unique correlation ID (typically crypto.randomUUID()) */
  correlationId: string;
  /** Session ID from authentication store */
  sessionId?: string;
  /** User ID for audit logging */
  userId?: string;
  /** Feature that initiated the request (e.g., 'ai', 'cases', 'devices') */
  feature?: string;
  /** Operation name for logging and tracing (e.g., 'create-case', 'start-scan') */
  operation?: string;
  /** Creation timestamp in milliseconds since epoch */
  createdAt: number;
  /** Optional metadata for extended tracing */
  metadata?: Record<string, unknown>;
}

/**
 * HTTP header names used for correlation propagation.
 *
 * These headers are added to Eden API requests to enable
 * server-side correlation and tracing.
 */
export const CORRELATION_HEADERS: {
  readonly CORRELATION_ID: "X-Correlation-ID";
  readonly FEATURE: "X-Feature";
  readonly OPERATION: "X-Operation";
  readonly SESSION_ID: "X-Session-ID";
  readonly REQUEST_ID: "X-Request-ID";
} = {
  /** Primary correlation ID header */
  CORRELATION_ID: "X-Correlation-ID",
  /** Feature identifier header */
  FEATURE: "X-Feature",
  /** Operation name header */
  OPERATION: "X-Operation",
  /** Session ID header (in addition to authorization) */
  SESSION_ID: "X-Session-ID",
  /** Request ID header for per-request correlation traces. */
  REQUEST_ID: "X-Request-ID",
} as const;

/**
 * HTTP header names used to expose trace identifiers back to clients.
 *
 * Notes:
 * - These headers are response-oriented; upstream propagation should use W3C
 *   Trace Context headers (`traceparent`, `tracestate`).
 * - Header names are defined in lowercase to match existing server tests and
 *   to avoid ambiguity in environments that preserve original casing.
 */
export const TRACE_HEADERS: {
  readonly TRACE_ID: "x-trace-id";
  readonly SPAN_ID: "x-span-id";
  readonly PARENT_SPAN_ID: "x-parent-span-id";
} = {
  /** Trace identifier (W3C trace id). */
  TRACE_ID: "x-trace-id",
  /** Current span identifier (W3C span id). */
  SPAN_ID: "x-span-id",
  /** Parent span identifier derived from inbound trace context when available. */
  PARENT_SPAN_ID: "x-parent-span-id",
} as const;

/**
 * Type for trace header keys.
 */
export type TraceHeaderKey = keyof typeof TRACE_HEADERS;

/**
 * Type for trace header values.
 */
export type TraceHeaderValue = (typeof TRACE_HEADERS)[TraceHeaderKey];

/**
 * Validate a W3C trace identifier (32 hex chars, not all zeros).
 *
 * @param value - Candidate trace id.
 * @returns True when the value is a valid trace id.
 */
export function isValidTraceId(value: string): boolean {
  const normalized = value.trim();
  return TRACE_ID_RE.test(normalized) && !TRACE_ID_ZERO_RE.test(normalized);
}

/**
 * Validate a W3C span identifier (16 hex chars, not all zeros).
 *
 * @param value - Candidate span id.
 * @returns True when the value is a valid span id.
 */
export function isValidSpanId(value: string): boolean {
  const normalized = value.trim();
  return SPAN_ID_RE.test(normalized) && !SPAN_ID_ZERO_RE.test(normalized);
}

/**
 * Parse a W3C `traceparent` header value.
 *
 * Format: `version-traceId-parentSpanId-flags`.
 *
 * @param value - Raw header value.
 * @returns Parsed trace identifiers or null when invalid.
 */
export function parseTraceParentHeader(
  value: string | null,
): { traceId: string; parentSpanId: string } | null {
  if (!value) {
    return null;
  }
  const candidate = value.trim();
  if (!candidate) {
    return null;
  }
  const parts = candidate.split("-");
  const traceParentSegmentCount = 4;
  if (parts.length !== traceParentSegmentCount) {
    return null;
  }
  const version = parts[0] ?? "";
  const traceId = (parts[1] ?? "").toLowerCase();
  const parentSpanId = (parts[2] ?? "").toLowerCase();
  const flags = parts[3] ?? "";

  if (!HEX_PAIR_RE.test(version)) {
    return null;
  }
  if (!HEX_PAIR_RE.test(flags)) {
    return null;
  }
  if (!(isValidTraceId(traceId) && isValidSpanId(parentSpanId))) {
    return null;
  }
  return { traceId, parentSpanId };
}

/**
 * Type for correlation header keys.
 */
export type CorrelationHeaderKey = keyof typeof CORRELATION_HEADERS;

/**
 * Type for correlation header values.
 */
export type CorrelationHeaderValue = (typeof CORRELATION_HEADERS)[CorrelationHeaderKey];

/**
 * Resolve a header value with case-insensitive matching for plain objects.
 *
 * @param headers - Header source (Headers or record).
 * @param name - Header name to resolve.
 * @returns Header value when present.
 */
export function resolveCorrelationHeaderValue(
  headers: Record<string, string | undefined> | Headers,
  name: CorrelationHeaderValue,
): string | undefined {
  if (headers instanceof Headers) {
    return headers.get(name) ?? undefined;
  }

  if (headers[name]) {
    return headers[name];
  }
  const lower = name.toLowerCase();
  if (headers[lower]) {
    return headers[lower];
  }
  const upper = name.toUpperCase();
  if (headers[upper]) {
    return headers[upper];
  }
  let headerValue: string | undefined;
  return headerValue;
}

/**
 * Build HTTP headers from a correlation context.
 *
 * @param context - Correlation context to convert to headers
 * @returns Record of header name to value
 *
 * @example
 * ```typescript
 * const headers = buildCorrelationHeaders(context);
 * // { 'X-Correlation-ID': '...', 'X-Feature': 'cases', ... }
 * ```
 */
export function buildCorrelationHeaders(
  context: CorrelationContext | null,
): Record<string, string> {
  if (!context) {
    return {};
  }

  const headers: Record<string, string> = {
    [CORRELATION_HEADERS.CORRELATION_ID]: context.correlationId,
  };

  if (context.feature) {
    headers[CORRELATION_HEADERS.FEATURE] = context.feature;
  }

  if (context.operation) {
    headers[CORRELATION_HEADERS.OPERATION] = context.operation;
  }

  if (context.sessionId) {
    headers[CORRELATION_HEADERS.SESSION_ID] = context.sessionId;
  }

  return headers;
}

/**
 * Parse correlation context from HTTP headers.
 *
 * @param headers - HTTP headers object or Headers instance
 * @returns Partial correlation context extracted from headers, or null if no correlation ID
 *
 * @example
 * ```typescript
 * const context = parseCorrelationHeaders(request.headers);
 * if (context) {
 *   logger.info({ correlationId: context.correlationId }, 'Request received');
 * }
 * ```
 */
export function parseCorrelationHeaders(
  headers: Record<string, string | undefined> | Headers,
): Partial<CorrelationContext> | null {
  const correlationId = resolveCorrelationHeaderValue(headers, CORRELATION_HEADERS.CORRELATION_ID);
  if (!correlationId) {
    return null;
  }

  const context: Partial<CorrelationContext> = {
    correlationId,
    createdAt: Date.now(),
  };
  const feature = resolveCorrelationHeaderValue(headers, CORRELATION_HEADERS.FEATURE);
  if (feature !== undefined) {
    context.feature = feature;
  }
  const operation = resolveCorrelationHeaderValue(headers, CORRELATION_HEADERS.OPERATION);
  if (operation !== undefined) {
    context.operation = operation;
  }
  const sessionId = resolveCorrelationHeaderValue(headers, CORRELATION_HEADERS.SESSION_ID);
  if (sessionId !== undefined) {
    context.sessionId = sessionId;
  }
  return context;
}

/**
 * Runtime type guard for CorrelationContext objects.
 *
 * @param value - Candidate value to check
 * @returns True if value matches the CorrelationContext interface
 */
export function isCorrelationContext(value: unknown): value is CorrelationContext {
  if (!isRecord(value)) {
    return false;
  }
  return typeof value.correlationId === "string" && typeof value.createdAt === "number";
}

/**
 * Generate a new correlation ID using crypto.randomUUID().
 *
 * @returns A new UUID v4 string
 */
export function generateCorrelationId(): string {
  return crypto.randomUUID();
}

/**
 * Create a new correlation context with a generated ID.
 *
 * @param options - Optional context values
 * @returns New CorrelationContext with generated correlationId
 *
 * @example
 * ```typescript
 * const ctx = createCorrelationContext({
 *   feature: 'cases',
 *   operation: 'create-case',
 * });
 * ```
 */
export function createCorrelationContext(
  options?: Partial<Omit<CorrelationContext, "correlationId" | "createdAt">>,
): CorrelationContext {
  return {
    correlationId: generateCorrelationId(),
    createdAt: Date.now(),
    ...options,
  };
}
