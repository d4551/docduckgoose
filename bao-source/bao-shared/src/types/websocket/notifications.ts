/**
 * Notification websocket payloads and messages.
 *
 * @packageDocumentation
 */

import type { WsOutgoingMessage } from "./core.ts";
import type { WsJsonValue } from "./json.ts";

/**
 * Notification event payload
 */
export interface NotificationEventPayload {
  /** Allow JSON indexing */
  [key: string]: WsJsonValue;
  /** Notification ID */
  id: string;
  /** User ID the notification belongs to */
  userId: string;
  /** Notification type/category */
  type: string;
  /** Notification title */
  title: string;
  /** Notification message body */
  message: string;
  /** Whether the notification has been read */
  read: boolean;
  /** ISO timestamp of creation */
  createdAt: string;
}

/**
 * Notification new event message
 */
export interface NotificationNewMessage extends WsOutgoingMessage {
  event: "notification:new";
  data: NotificationEventPayload;
}
