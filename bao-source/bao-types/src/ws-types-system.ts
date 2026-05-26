/**
 * WebSocket system/infrastructure types — core types, guards, topic definitions.
 *
 * @bao-types/ws-types-system
 */

import type { InfraServiceStatus as RestInfraServiceStatus } from "@baohaus/bao-schemas/system-health.schemas";

const FLEET_RUN_EVENTS_RE: RegExp = /^fleet\.run\.[A-Za-z0-9_-]+\.events$/;
const FLEET_RUN_STATUS_RE: RegExp = /^fleet\.run\.[A-Za-z0-9_-]+\.status$/;

/**
 * WebSocket event types.
 */
export const WS_EVENT_TYPES: readonly string[] = [
  "ping",
  "pong",
  "subscribe",
  "unsubscribe",
  "subscribed",
  "unsubscribed",
  "publish",
  "published",
  "error",
  "system",
  "device:status",
  "device:event",
  "device:detected",
  "device:connected",
  "device:disconnected",
  "device:error",
  "hardware:device-state",
  "hardware:calibration-update",
  "hardware:image-captured",
  "lighting:command",
  "lighting:response",
  "imager:capture",
  "imager:preview",
  "footpedal:press",
  "system:health",
  "system:services-status",
  "system:service-changed",
  "system:alert-fired",
  "system:alert-resolved",
  "notification:new",
  "notification:read",
  "notification:deleted",
  "training:created",
  "training:started",
  "training:progress",
  "training:completed",
  "training:failed",
  "training:canceled",
  "ai:job:queued",
  "ai:job:started",
  "ai:job:completed",
  "ai:job:failed",
  "calibration:started",
  "calibration:progress",
  "calibration:completed",
  "calibration:failed",
  "asset:uploaded",
  "asset:deleted",
  "asset:processing",
  "scanner:progress",
  "scanner:frame-captured",
  "scanner:complete",
  "scanner:error",
  "chat:conversation-updated",
  "chat:conversation-deleted",
  "chat:message-created",
  "chat:members-updated",
  "annotation:created",
  "annotation:updated",
  "annotation:deleted",
  "feature:health-changed",
  "feature:health-snapshot",
  "rpa:execution:queued",
  "rpa:execution:started",
  "rpa:execution:progress",
  "rpa:execution:completed",
  "rpa:execution:failed",
  "rpa:execution:cancelled",
  "rpa:keyword:started",
  "rpa:keyword:completed",
  "rpa:workflow:created",
  "rpa:workflow:updated",
  "rpa:workflow:deleted",
  "vision:inference:started",
  "vision:inference:progress",
  "vision:inference:completed",
  "vision:inference:failed",
  "gaussian:training:queued",
  "gaussian:training:started",
  "gaussian:training:progress",
  "gaussian:training:completed",
  "gaussian:training:failed",
  "gaussian:training:canceled",
  "gaussian:render:started",
  "gaussian:render:completed",
  "gaussian:render:failed",
  "fleet:run:event",
  "fleet:run:status",
  "fleet:alert",
] as const;

export type WsEventType = (typeof WS_EVENT_TYPES)[number];

export const WS_TOPIC_TYPES: readonly [
  "system",
  "devices",
  "hardware:device-state",
  "hardware:calibration-update",
  "hardware:image-captured",
  "devices:lighting",
  "devices:imagers",
  "devices:footpedals",
  "baodown",
  "notifications",
  "training",
  "training:jobs",
  "ai:jobs",
  "calibration",
  "assets",
  "devices:scanners",
  "devices:turntables",
  "scanner:progress",
  "scanner:frame-captured",
  "scanner:complete",
  "scanner:error",
  "chat",
  "annotations",
  "feature:health",
  "rpa",
  "rpa:executions",
  "rpa:workflows",
  "vision",
  "vision:inference",
  "gaussian",
  "gaussian:training",
  "gaussian:render",
  "fleet.events",
  "fleet.status",
  "fleet.alerts",
] = [
  "system",
  "devices",
  "hardware:device-state",
  "hardware:calibration-update",
  "hardware:image-captured",
  "devices:lighting",
  "devices:imagers",
  "devices:footpedals",
  "baodown",
  "notifications",
  "training",
  "training:jobs",
  "ai:jobs",
  "calibration",
  "assets",
  "devices:scanners",
  "devices:turntables",
  "scanner:progress",
  "scanner:frame-captured",
  "scanner:complete",
  "scanner:error",
  "chat",
  "annotations",
  "feature:health",
  "rpa",
  "rpa:executions",
  "rpa:workflows",
  "vision",
  "vision:inference",
  "gaussian",
  "gaussian:training",
  "gaussian:render",
  "fleet.events",
  "fleet.status",
  "fleet.alerts",
] as const;

export type FleetRunScopedTopic = `fleet.run.${string}.events` | `fleet.run.${string}.status`;

export type WsTopicType = (typeof WS_TOPIC_TYPES)[number] | FleetRunScopedTopic;

export type WsJsonPrimitive = string | number | boolean | null;
export type WsJsonValue = WsJsonPrimitive | WsJsonValue[] | { [key: string]: WsJsonValue };

export type InfraServiceStatus = RestInfraServiceStatus;

export type WsConnectionState = "connecting" | "connected" | "disconnecting" | "disconnected";

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
  if (isRecord(value)) {
    return Object.values(value).every(isWsJsonValue);
  }
  return false;
}

export function isWsEventType(value: string): value is WsEventType {
  return (WS_EVENT_TYPES as readonly string[]).includes(value);
}

export function isWsTopicType(value: string): value is WsTopicType {
  if ((WS_TOPIC_TYPES as readonly string[]).includes(value)) {
    return true;
  }
  return FLEET_RUN_EVENTS_RE.test(value) || FLEET_RUN_STATUS_RE.test(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

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

export interface WsIncomingMessage {
  event: WsEventType;
  data?: WsJsonValue;
  topic?: WsTopicType;
  topics?: WsTopicType[];
  deviceId?: string;
}

export interface WsOutgoingMessage {
  event: WsEventType;
  data: WsJsonValue;
  timestamp: string;
  topic?: WsTopicType | undefined;
}

export interface WsTopicEnvelope {
  event: WsEventType;
  data: WsJsonValue;
  timestamp?: string;
}

export interface WsErrorMessage extends WsOutgoingMessage {
  event: "error";
  data: {
    error: string;
    message?: string;
    code?: string;
    details?: WsJsonValue;
  };
}

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

export interface WsSubscriptionMessage extends WsOutgoingMessage {
  event: "subscribed" | "unsubscribed";
  data: { topics: string[] };
}

export interface WsPublishMessage extends WsOutgoingMessage {
  event: "published";
  data: { topic: string };
}

export interface WsPingPongMessage extends WsOutgoingMessage {
  event: "pong";
  data: { serverTime: string };
}

export interface WsClientOptions {
  url?: string;
  autoReconnect?: boolean;
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
  autoSubscribe?: WsTopicType[];
}

export type ChatConversationUpdatedKind =
  | "created"
  | "resolved"
  | "updated"
  | "message"
  | "assistant"
  | "deleted"
  | "member-updated";

export interface ChatConversationUpdatedPayload {
  conversationId: string;
  kind?: ChatConversationUpdatedKind;
  updatedAt?: string;
  updates?: Record<string, WsJsonValue>;
}

export interface ChatConversationDeletedPayload {
  conversationId: string;
  reason?: string;
}

export interface SystemServicesStatusEventPayload {
  checkedAt: string;
  services: InfraServiceStatus[];
}

export interface SystemServiceChangedEventPayload {
  checkedAt: string;
  service: InfraServiceStatus;
  previous: InfraServiceStatus;
}

export interface SystemAlertFiredEventPayload {
  ruleId: string;
  ruleName: string;
  severity: string;
  value: number;
  threshold: number;
  fingerprint: string;
}

export interface SystemAlertResolvedEventPayload {
  ruleId: string;
  ruleName: string;
  severity: string;
  value: number;
  fingerprint: string;
}
