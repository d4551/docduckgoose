/**
 * Centralized WebSocket defaults.
 *
 * Avoids scattering magic numbers like payload size caps and idle timeouts
 * across bunbuddies and services.
 *
 * @shared/constants/websocket
 */

/**
 * Default WebSocket settings shared across bunbuddies.
 */
export const DEFAULT_WEBSOCKET_SETTINGS: {
  readonly idleTimeoutSeconds: 120;
  readonly maxPayloadBytes: number;
} = {
  /** Idle timeout in seconds (Bun.serve websocket option). */
  idleTimeoutSeconds: 120,
  /** Maximum payload size in bytes (Bun.serve websocket option). */
  maxPayloadBytes: 65536,
} as const;

type WebSocketSettingKey = keyof typeof DEFAULT_WEBSOCKET_SETTINGS;

/**
 * Resolve a WebSocket setting key while allowing explicit overrides.
 *
 * @param key - Identifier from DEFAULT_WEBSOCKET_SETTINGS.
 * @param override - Optional runtime override to prefer when provided.
 * @returns Resolved value.
 */
export function resolveWebSocketSetting(key: WebSocketSettingKey, override?: number): number {
  if (typeof override === "number" && Number.isFinite(override) && override > 0) {
    return override;
  }
  return DEFAULT_WEBSOCKET_SETTINGS[key];
}
