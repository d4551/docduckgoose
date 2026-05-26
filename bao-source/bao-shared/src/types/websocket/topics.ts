/**
 * WebSocket topic registry, run-scoped patterns, and guards.
 *
 * @packageDocumentation
 */

const FLEET_RUN_EVENTS_RE: RegExp = /^fleet\.run\.[A-Za-z0-9_-]+\.events$/;
const FLEET_RUN_STATUS_RE: RegExp = /^fleet\.run\.[A-Za-z0-9_-]+\.status$/;

/**
 * WebSocket topic types for pub/sub
 */
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
  // Automation / orchestration topics
  "baodown",
  // Notification topics
  "notifications",
  // Training topics
  "training",
  "training:jobs",
  // AI job topics
  "ai:jobs",
  // Calibration topics
  "calibration",
  // Asset topics
  "assets",
  // Scanner topics
  "devices:scanners",
  "devices:turntables",
  "scanner:progress",
  "scanner:frame-captured",
  "scanner:complete",
  "scanner:error",
  // Chat topics
  "chat",
  // Annotation topics (2D/3D/XR)
  "annotations",
  // Feature health topics
  "feature:health",
  // RPA (Robot Framework) topics
  "rpa",
  "rpa:executions",
  "rpa:workflows",
  // Vision AI topics
  "vision",
  "vision:inference",
  // Gaussian Splatting topics
  "gaussian",
  "gaussian:training",
  "gaussian:render",
  // Fleet orchestration topics
  "fleet.events",
  "fleet.status",
  "fleet.alerts",
] as const;

/**
 * Run-scoped fleet topic patterns.
 */
export type FleetRunScopedTopic = `fleet.run.${string}.events` | `fleet.run.${string}.status`;

/**
 * Union of all supported WebSocket subscription topics.
 */
export type WsTopicType = (typeof WS_TOPIC_TYPES)[number] | FleetRunScopedTopic;

/**
 * Runtime guard for WebSocket topic types.
 *
 * @param value - Candidate topic string
 * @returns True if the value is a valid `WsTopicType`
 */
export function isWsTopicType(value: string): value is WsTopicType {
  if ((WS_TOPIC_TYPES as readonly string[]).includes(value)) {
    return true;
  }

  return FLEET_RUN_EVENTS_RE.test(value) || FLEET_RUN_STATUS_RE.test(value);
}
