/**
 * Core WebSocket message envelope types and runtime guards.
 *
 * @packageDocumentation
 */

import { isWsEventType, type WsEventType } from "./events.ts";
import type { WsJsonValue } from "./json.ts";
import { isWsTopicType, type WsTopicType } from "./topics.ts";

/**
 * Type guard for plain object records.
 *
 * @param value - Candidate value
 * @returns True when value is a non-null object record
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

/**
 * Incoming WebSocket message from client
 */
export interface WsIncomingMessage {
  /** Event type */
  event: WsEventType;
  /** Event data payload */
  data?: WsJsonValue;
  /** Target topic for subscribe/unsubscribe/publish */
  topic?: WsTopicType;
  /** List of topics for bulk subscribe/unsubscribe */
  topics?: WsTopicType[];
  /** Device ID for device-specific messages */
  deviceId?: string;
}

/**
 * Outgoing WebSocket message from server
 */
export interface WsOutgoingMessage {
  /** Event type */
  event: WsEventType;
  /** Event data payload */
  data: WsJsonValue;
  /** ISO timestamp when message was sent */
  timestamp: string;
  /** Optional topic for pub/sub messages */
  topic?: WsTopicType;
}

/**
 * Runtime guard for WebSocket messages emitted by the server.
 *
 * This is intentionally strict to keep client handlers safe:
 * - `event` must be one of `WS_EVENT_TYPES`
 * - `timestamp` must be an ISO-like string
 * - `data` must exist (can be any value)
 * - `topic` must be one of `WS_TOPIC_TYPES` when present
 *
 * @param value - Candidate message payload
 * @returns True when value matches `WsOutgoingMessage`
 */
export function isWsOutgoingMessage(value: unknown): value is WsOutgoingMessage {
  if (!isRecord(value)) {
    return false;
  }

  const event = value.event;
  if (typeof event !== "string" || !isWsEventType(event)) {
    return false;
  }

  const timestamp = value.timestamp;
  if (typeof timestamp !== "string" || timestamp.trim().length === 0) {
    return false;
  }

  if (!("data" in value)) {
    return false;
  }

  const topic = value.topic;
  if (topic !== undefined) {
    if (typeof topic !== "string" || !isWsTopicType(topic)) {
      return false;
    }
  }

  return true;
}

/**
 * Lightweight envelope for embedding an explicit `event` inside a topic payload.
 *
 * This is useful when publishing into a broad topic like `devices` while still
 * preserving a more specific event type (e.g. `device:connected`).
 *
 * The server-side realtime delivery layer may unwrap this envelope and emit the contained
 * `event` as the WebSocket `WsOutgoingMessage.event`.
 */
export interface WsTopicEnvelope {
  /** Event type to publish to consumers. */
  event: WsEventType;
  /** JSON payload for the event. */
  data: WsJsonValue;
  /** Optional ISO timestamp associated with the event (server may fall back to now). */
  timestamp?: string;
}

/**
 * Runtime guard for topic envelopes.
 *
 * This intentionally validates shape only (and does not recursively validate `data`),
 * matching the strictness level used for `isWsOutgoingMessage`.
 *
 * @param value - Candidate payload.
 * @returns True when value matches `WsTopicEnvelope`.
 */
export function isWsTopicEnvelope(value: unknown): value is WsTopicEnvelope {
  if (!isRecord(value)) {
    return false;
  }
  const event = value.event;
  if (typeof event !== "string" || !isWsEventType(event)) {
    return false;
  }
  if (!("data" in value)) {
    return false;
  }
  const timestamp = value.timestamp;
  if (timestamp !== undefined && typeof timestamp !== "string") {
    return false;
  }
  return true;
}

/**
 * WebSocket error message
 */
export interface WsErrorMessage extends WsOutgoingMessage {
  event: "error";
  data: {
    error: string;
    message?: string;
    code?: string;
    details?: WsJsonValue;
  };
}

/**
 * System connection message
 */
export interface WsSystemMessage extends WsOutgoingMessage {
  event: "system";
  data: {
    status?: "connected" | "disconnected";
    event?: string;
    id?: string;
    serverTime?: string;
    message?: string;
    channels?: string[];
  };
}

/**
 * Subscribe/Unsubscribe acknowledgment
 */
export interface WsSubscriptionMessage extends WsOutgoingMessage {
  event: "subscribed" | "unsubscribed";
  data: {
    topics: string[];
  };
}

/**
 * Publish acknowledgment
 */
export interface WsPublishMessage extends WsOutgoingMessage {
  event: "published";
  data: {
    topic: string;
  };
}

/**
 * Ping/Pong message
 */
export interface WsPingPongMessage extends WsOutgoingMessage {
  event: "pong";
  data: {
    serverTime: string;
  };
}
