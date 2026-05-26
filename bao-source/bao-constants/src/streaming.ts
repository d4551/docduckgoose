/**
 * Canonical streaming-response constants.
 *
 * Single source of truth for the SSE / plain-text streaming media types
 * + cache-control directives consumed by every Bao app that exposes a
 * realtime endpoint (registry, bao-runtime, forge, bao-ai-gateway,
 * bao-agent). Redeclaring these strings in implementation paths is the
 * "no duplicated wire shapes" hard-ban violation this module exists to
 * prevent.
 *
 * @packageDocumentation
 */

/** Canonical SSE stream content type. */
export const STREAM_TEXT_EVENT = "text/event-stream; charset=utf-8" as const;

/** Canonical plain-text streaming content type. */
export const STREAM_TEXT_PLAIN = "text/plain; charset=utf-8" as const;

/** Canonical cache-control directive for live streams. */
export const STREAM_NO_CACHE = "no-cache" as const;

/** Canonical cache-control directive for live streams that must also bypass intermediate transformations. */
export const STREAM_NO_CACHE_NO_TRANSFORM = "no-cache, no-transform" as const;

/**
 * Build the canonical SSE response-header set: text/event-stream content
 * type, no-transform cache policy, keep-alive connection, and the
 * `x-accel-buffering: no` header that disables nginx/cloudflare buffering
 * for live streams.
 */
export function buildSseResponseHeaders(): Record<string, string> {
  return {
    "Content-Type": STREAM_TEXT_EVENT,
    "Cache-Control": STREAM_NO_CACHE_NO_TRANSFORM,
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  };
}
