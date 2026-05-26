/**
 * Public protocol surface: version, subprotocol, topic, channel types.
 *
 * @internal
 */

/**
 * Current protocol version for realtime FlatBuffers envelopes.
 */
export const REALTIME_FLATBUFFERS_PROTOCOL_VERSION = 1;

/**
 * Internal websocket subprotocol for binary realtime transport.
 */
export const REALTIME_FLATBUFFERS_WS_SUBPROTOCOL = "vv.realtime.fbs.v1";

/**
 * Topic suffix used for binary realtime websocket pub/sub topics.
 */
export const REALTIME_FLATBUFFERS_TOPIC_SUFFIX = ".flatbuffers";

/**
 * Supported realtime channels for drone payloads.
 */
export type RealtimeBinaryChannel = "devices" | "telemetry";

/**
 * Resolve the binary topic name for a plain topic.
 *
 * @param topic - Source topic.
 * @returns Binary-topic variant.
 */
export function resolveFlatBuffersTopic(topic: string): string {
  return `${topic}${REALTIME_FLATBUFFERS_TOPIC_SUFFIX}`;
}

/**
 * Parse requested websocket subprotocols from an HTTP header string.
 *
 * @param headerValue - Raw `Sec-WebSocket-Protocol` header value.
 * @returns Ordered protocol tokens.
 */
export function parseWebSocketSubprotocolHeader(headerValue: string | null): string[] {
  if (!headerValue) {
    return [];
  }
  return headerValue
    .split(",")
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}

/**
 * Check whether a websocket request asks for the binary realtime subprotocol.
 *
 * @param headerValue - Raw `Sec-WebSocket-Protocol` header value.
 * @param subprotocol - Expected subprotocol token.
 * @returns True when the binary subprotocol is present.
 */
export function wantsRealtimeFlatBuffersSubprotocol(
  headerValue: string | null,
  subprotocol: string = REALTIME_FLATBUFFERS_WS_SUBPROTOCOL,
): boolean {
  return parseWebSocketSubprotocolHeader(headerValue).includes(subprotocol);
}

/**
 * Determine if a value is a binary buffer-like websocket payload.
 *
 * @param payload - Candidate websocket payload.
 * @returns True for ArrayBuffer / typed array payloads.
 */
export function isBinaryMessagePayload(payload: unknown): payload is ArrayBuffer | Uint8Array {
  return payload instanceof ArrayBuffer || payload instanceof Uint8Array;
}
