/**
 * Chat conversation websocket payloads.
 *
 * @packageDocumentation
 */

import type { WsJsonValue } from "./json.ts";

/**
 * Allowed event kinds for conversation updates emitted by chat backend services.
 *
 * The payload supports both explicit mutation kinds and a compact `updates` object.
 */
export type ChatConversationUpdatedKind =
  | "created"
  | "resolved"
  | "updated"
  | "message"
  | "assistant"
  | "deleted"
  | "member-updated";

/**
 * Payload for `chat:conversation-updated` websocket events.
 */
export interface ChatConversationUpdatedPayload {
  /** Target conversation identifier. */
  conversationId: string;
  /** Originating action type. */
  kind?: ChatConversationUpdatedKind;
  /** Timestamp for the mutation, ISO-8601 string if available. */
  updatedAt?: string;
  /** Optional partial updates merged into the existing conversation row. */
  updates?: Record<string, WsJsonValue>;
}

/**
 * Payload for `chat:conversation-deleted` websocket events.
 */
export interface ChatConversationDeletedPayload {
  /** Deleted conversation identifier. */
  conversationId: string;
  /** Optional reason for deletion (for audit telemetry and client telemetry). */
  reason?: string;
}
