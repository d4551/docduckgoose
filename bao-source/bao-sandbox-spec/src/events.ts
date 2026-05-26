/**
 * Capability lifecycle event topics + payload union.
 *
 * Cohesion plan §3.4 — capability state changes are observed via a fixed
 * topic vocabulary so registry admission, runtime sandbox controllers, and
 * telemetry consumers all subscribe to the same wire-stable strings and
 * decode identical payloads.
 *
 * Plain `as const` literal-union pattern — no TypeScript `enum`.
 *
 * @module @baohaus/bao-sandbox-spec/events
 */

export const CAPABILITY_EVENT_TOPIC = {
  granted: "capability.granted",
  revoked: "capability.revoked",
  exceeded: "capability.exceeded",
  escalationRequested: "capability.escalation-requested",
  backpressure: "capability.backpressure",
} as const;
export type CapabilityEventTopic =
  (typeof CAPABILITY_EVENT_TOPIC)[keyof typeof CAPABILITY_EVENT_TOPIC];

interface CapabilityEventBase {
  readonly tenantId: string;
  readonly packageId: string;
  readonly grantId: string;
  readonly emittedAt: string;
}

export interface CapabilityGrantedEvent extends CapabilityEventBase {
  readonly topic: typeof CAPABILITY_EVENT_TOPIC.granted;
  readonly issuedAt: string;
  readonly expiresAt: string;
}

export interface CapabilityRevokedEvent extends CapabilityEventBase {
  readonly topic: typeof CAPABILITY_EVENT_TOPIC.revoked;
  readonly reason: "expired" | "policy-change" | "operator-action" | "tenant-action";
}

export interface CapabilityExceededEvent extends CapabilityEventBase {
  readonly topic: typeof CAPABILITY_EVENT_TOPIC.exceeded;
  readonly capability: string;
  readonly observedValue: number;
  readonly limitValue: number;
}

export interface CapabilityEscalationRequestedEvent extends CapabilityEventBase {
  readonly topic: typeof CAPABILITY_EVENT_TOPIC.escalationRequested;
  readonly requestedCapability: string;
  readonly requestedTier: string;
  readonly justification: string;
}

export interface CapabilityBackpressureEvent extends CapabilityEventBase {
  readonly topic: typeof CAPABILITY_EVENT_TOPIC.backpressure;
  readonly spawner: string;
  readonly queueDepth: number;
  readonly etaMs: number;
}

export type CapabilityEvent =
  | CapabilityGrantedEvent
  | CapabilityRevokedEvent
  | CapabilityExceededEvent
  | CapabilityEscalationRequestedEvent
  | CapabilityBackpressureEvent;
