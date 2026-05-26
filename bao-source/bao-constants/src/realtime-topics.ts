/**
 * Canonical WebSocket pub/sub topic registry.
 *
 * Single source of truth for all realtime event topics used by the
 * Elysia server (publisher) and the htmx/HTML client (subscriber).
 *
 * @shared/constants/realtime-topics
 */

/**
 * Canonical WebSocket pub/sub topics.
 *
 * Used by the server's realtime plugin and the client's WebSocket composable
 * to ensure topic strings stay in sync.
 */
export const REALTIME_TOPICS = {
  /** System-level health, alerts, and status events. */
  SYSTEM: "system",
  /** Device status, hotplug, and telemetry events. */
  DEVICES: "devices",
  /** Lighting controller events. */
  LIGHTING: "devices:lighting",
  /** Imaging device events. */
  IMAGERS: "devices:imagers",
  /** Footpedal input events. */
  FOOTPEDALS: "devices:footpedals",
  /** Hardware device state change events. */
  HARDWARE_STATE: "hardware:device-state",
  /** Calibration progress and result events. */
  HARDWARE_CALIBRATION: "hardware:calibration-update",
  /** Hardware image capture events. */
  HARDWARE_IMAGE: "hardware:image-captured",
  /** User notification delivery events. */
  NOTIFICATIONS: "notifications",
  /** AI training progress and completion events. */
  TRAINING: "training",
  /** Media asset lifecycle events. */
  ASSETS: "assets",
  /** 3D scanner progress events. */
  SCANNER_PROGRESS: "scanner:progress",
  /** 3D scanner frame capture events. */
  SCANNER_FRAME_CAPTURED: "scanner:frame-captured",
  /** 3D scan completion events. */
  SCANNER_COMPLETE: "scanner:complete",
  /** 3D scanner error events. */
  SCANNER_ERROR: "scanner:error",
  /** Chat message and conversation events. */
  CHAT: "chat",
  /** Annotation lifecycle events. */
  ANNOTATIONS: "annotations",
  /** Vision AI inference events. */
  VISION: "vision",
  /** Vision inference result events. */
  VISION_INFERENCE: "vision:inference",
  /** Gaussian splatting events. */
  GAUSSIAN: "gaussian",
  /** Gaussian training events. */
  GAUSSIAN_TRAINING: "gaussian:training",
  /** Gaussian render events. */
  GAUSSIAN_RENDER: "gaussian:render",
  /** Fleet aggregate event stream topic. */
  FLEET_EVENTS: "fleet.events",
  /** Fleet aggregate status topic. */
  FLEET_STATUS: "fleet.status",
  /** Fleet run-scoped event topic template. */
  FLEET_RUN_EVENTS_TEMPLATE: "fleet.run.{runId}.events",
  /** Fleet run-scoped status topic template. */
  FLEET_RUN_STATUS_TEMPLATE: "fleet.run.{runId}.status",
  /** Fleet incident topic. */
  FLEET_ALERTS: "fleet.alerts",
} as const;

/** Union type of all valid realtime topic strings. */
export type RealtimeTopic = (typeof REALTIME_TOPICS)[keyof typeof REALTIME_TOPICS];
