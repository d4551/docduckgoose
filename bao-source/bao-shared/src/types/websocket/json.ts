/**
 * JSON value types and runtime guards for WebSocket payloads.
 *
 * @packageDocumentation
 */

/**
 * JSON primitive types for websocket payloads.
 */
export type WsJsonPrimitive = string | number | boolean | null;

/**
 * JSON value type for websocket payloads.
 */
export type WsJsonValue = WsJsonPrimitive | WsJsonValue[] | { [key: string]: WsJsonValue };

/**
 * Runtime guard for websocket JSON payloads.
 *
 * This ensures server-side publishers and client-side consumers can safely treat `data`
 * as a JSON-compatible structure (no functions, symbols, or `undefined`).
 *
 * Note: This intentionally mirrors a strict JSON subset and does not accept `Date`, `BigInt`,
 * `Map`, `Set`, etc. Publishers should serialize those before emitting.
 *
 * @param value - Candidate value.
 * @returns True when value is a valid `WsJsonValue`.
 */
export function isWsJsonValue(value: unknown): value is WsJsonValue {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(isWsJsonValue);
  }

  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    // `value` is now a non-array object; iterating its own values is
    // structurally safe without widening to `Record<string, unknown>`.
    for (const propertyValue of Object.values(value)) {
      if (!isWsJsonValue(propertyValue)) {
        return false;
      }
    }
    return true;
  }

  return false;
}
