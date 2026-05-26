/**
 * WebSocket client connection state and options.
 *
 * @packageDocumentation
 */

import type { WsTopicType } from "./topics.ts";

/**
 * WebSocket connection state
 */
export type WsConnectionState = "connecting" | "connected" | "disconnecting" | "disconnected";

/**
 * WebSocket client options
 */
export interface WsClientOptions {
  /** WebSocket server URL */
  url?: string;
  /** Auto-reconnect on disconnect */
  autoReconnect?: boolean;
  /** Reconnect delay in milliseconds */
  reconnectDelay?: number;
  /** Maximum reconnect attempts */
  maxReconnectAttempts?: number;
  /** Heartbeat interval in milliseconds */
  heartbeatInterval?: number;
  /** Auto-subscribe topics on connect */
  autoSubscribe?: WsTopicType[];
}
