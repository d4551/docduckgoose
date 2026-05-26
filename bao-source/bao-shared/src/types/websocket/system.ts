/**
 * System service status and alert websocket payloads.
 *
 * @packageDocumentation
 */

import type { InfraServiceStatus as RestInfraServiceStatus } from "../../schemas/system-health.schemas.ts";

/**
 * Infrastructure service status record emitted by the backend.
 *
 * This mirrors the REST shape returned by `GET /api/v1/services/status`.
 */
export type InfraServiceStatus = RestInfraServiceStatus;

/**
 * Payload for `system:services-status` websocket messages.
 */
export interface SystemServicesStatusEventPayload {
  /** ISO timestamp for the probe batch. */
  checkedAt: string;
  /** Current service status list. */
  services: InfraServiceStatus[];
}

/**
 * Payload for `system:service-changed` websocket messages.
 */
export interface SystemServiceChangedEventPayload {
  /** ISO timestamp for the probe batch. */
  checkedAt: string;
  /** New service state. */
  service: InfraServiceStatus;
  /** Previous service state (from the last snapshot). */
  previous: InfraServiceStatus;
}

/**
 * Payload for `system:alert-fired` websocket messages.
 */
export interface SystemAlertFiredEventPayload {
  /** Alert rule ID. */
  ruleId: string;
  /** Alert rule name. */
  ruleName: string;
  /** Alert severity (critical, warning, info). */
  severity: string;
  /** Current metric value that triggered the alert. */
  value: number;
  /** Threshold that was exceeded. */
  threshold: number;
  /** Alert fingerprint (rule + labels). */
  fingerprint: string;
}

/**
 * Payload for `system:alert-resolved` websocket messages.
 */
export interface SystemAlertResolvedEventPayload {
  /** Alert rule ID. */
  ruleId: string;
  /** Alert rule name. */
  ruleName: string;
  /** Alert severity (critical, warning, info). */
  severity: string;
  /** Current metric value at resolution. */
  value: number;
  /** Alert fingerprint (rule + labels). */
  fingerprint: string;
}
