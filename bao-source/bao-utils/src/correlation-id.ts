/**
 * Canonical correlation-ID header helper.
 *
 * Sources the correlation ID from the incoming request header
 * `x-correlation-id` (case-insensitive) and propagates it onto the response
 * header object so downstream services + logs can stitch the same request.
 * Generates a new UUID when the request does not carry one.
 *
 * Pure helper — no IO, no async — usable from any runtime that exposes
 * `Request` + `crypto.randomUUID()`.
 *
 * @baohaus/bao-utils/correlation-id
 */

/** Canonical header name for the request correlation ID. */
export const CORRELATION_ID_HEADER = "x-correlation-id" as const;

/**
 * Minimal response-header sink accepted by {@link ensureCorrelationIdHeader}.
 *
 * Accepts both a `Headers` instance and a plain object dictionary so Elysia,
 * Bun, and Fetch handlers can share one correlation-ID contract.
 */
export type MutableResponseHeaders =
  | Headers
  | Record<string, string | number | string[] | undefined>;

const readHeader = (headers: MutableResponseHeaders, name: string): string | null => {
  if (headers instanceof Headers) {
    return headers.get(name);
  }
  const value = headers[name] ?? headers[name.toLowerCase()];
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }
  return null;
};

const writeHeader = (headers: MutableResponseHeaders, name: string, value: string): void => {
  if (headers instanceof Headers) {
    headers.set(name, value);
    return;
  }
  headers[name] = value;
};

/**
 * Reads the inbound `x-correlation-id` header (or generates a fresh UUID),
 * writes it onto the response headers, and returns the resolved value.
 *
 * @param request Incoming request.
 * @param responseHeaders Mutable response headers (Headers or plain dict).
 * @returns Correlation ID propagated onto the response.
 */
export const ensureCorrelationIdHeader = (
  request: Request,
  responseHeaders: MutableResponseHeaders,
): string => {
  const fromRequest = request.headers.get(CORRELATION_ID_HEADER);
  const correlationId =
    typeof fromRequest === "string" && fromRequest.trim().length > 0
      ? fromRequest.trim()
      : (readHeader(responseHeaders, CORRELATION_ID_HEADER) ?? crypto.randomUUID());
  writeHeader(responseHeaders, CORRELATION_ID_HEADER, correlationId);
  return correlationId;
};
