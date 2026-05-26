/**
 * WebSocket event type registry and guards.
 *
 * @packageDocumentation
 */

/**
 * WebSocket event types.
 *
 * Keep this list in sync with the server TypeBox schema (`apps/server/elysia/schemas/websocket.schemas.ts`).
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
  // Notification events
  "notification:new",
  "notification:read",
  "notification:deleted",
  // Training job events
  "training:created",
  "training:started",
  "training:progress",
  "training:completed",
  "training:failed",
  "training:canceled",
  // AI annotation job events
  "ai:job:queued",
  "ai:job:started",
  "ai:job:completed",
  "ai:job:failed",
  // Calibration events
  "calibration:started",
  "calibration:progress",
  "calibration:completed",
  "calibration:failed",
  // Asset events
  "asset:uploaded",
  "asset:deleted",
  "asset:processing",
  // Scanner events
  "scanner:progress",
  "scanner:frame-captured",
  "scanner:complete",
  "scanner:error",
  // Chat events
  "chat:conversation-updated",
  "chat:conversation-deleted",
  "chat:message-created",
  "chat:members-updated",
  // Annotation events (2D/3D/XR)
  "annotation:created",
  "annotation:updated",
  "annotation:deleted",
  // Feature health events
  "feature:health-changed",
  "feature:health-snapshot",
  // RPA (Robot Framework) events
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
  // Vision AI events
  "vision:inference:started",
  "vision:inference:progress",
  "vision:inference:completed",
  "vision:inference:failed",
  // Gaussian Splatting events
  "gaussian:training:queued",
  "gaussian:training:started",
  "gaussian:training:progress",
  "gaussian:training:completed",
  "gaussian:training:failed",
  "gaussian:training:canceled",
  "gaussian:render:started",
  "gaussian:render:completed",
  "gaussian:render:failed",
  // Fleet orchestration events
  "fleet:run:event",
  "fleet:run:status",
  "fleet:alert",
] as const;

/**
 * Union of all supported WebSocket event types.
 */
export type WsEventType = (typeof WS_EVENT_TYPES)[number];

/**
 * Runtime guard for WebSocket event types.
 *
 * @param value - Candidate event string
 * @returns True if the value is a valid `WsEventType`
 */
export function isWsEventType(value: string): value is WsEventType {
  return (WS_EVENT_TYPES as readonly string[]).includes(value);
}
