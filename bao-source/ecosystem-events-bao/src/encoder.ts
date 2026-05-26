/**
 * SSE wire-format encoder.
 *
 * Encodes an HTML fragment as a Server-Sent Events `event:`/`retry:`/`data:`
 * message. Multi-line HTML is split per the SSE spec so the consumer
 * (HTMX `sse-swap` extension, in our case) receives a single concatenated
 * payload with the original `\n` characters preserved.
 *
 * Comment-only frames (the heartbeat) use a different encoder path so the
 * SSE consumer skips them without firing a swap.
 *
 * @packageDocumentation
 */

/** Default heartbeat comment, matching the SSE keep-alive convention. */
const HEARTBEAT_COMMENT = ": heartbeat\n\n";

/**
 * Encode a named SSE event with HTML payload.
 *
 * @param eventName - SSE event name (the consumer's `sse-swap` value).
 * @param html - HTML fragment body. Multi-line input is split per the SSE wire spec.
 * @param retryMs - `retry:` field value in milliseconds. Tells the consumer how long to wait before reconnecting after a transport failure.
 * @param encoder - Caller-supplied `TextEncoder` so the encoder allocates only once per stream.
 * @returns UTF-8 bytes ready to enqueue on a `ReadableStream<Uint8Array>` controller.
 */
export function encodeSseFragment(
  eventName: string,
  html: string,
  retryMs: number,
  encoder: TextEncoder,
): Uint8Array {
  const dataLines = html
    .split("\n")
    .map((line) => `data: ${line}`)
    .join("\n");
  const payload = `event: ${eventName}\nretry: ${retryMs}\n${dataLines}\n\n`;
  return encoder.encode(payload);
}

/**
 * Encode a transport-level heartbeat comment. SSE consumers skip comment
 * lines so this never triggers a swap; it only keeps intermediate
 * proxies from terminating the long-lived connection.
 */
export function encodeHeartbeatComment(encoder: TextEncoder): Uint8Array {
  return encoder.encode(HEARTBEAT_COMMENT);
}
