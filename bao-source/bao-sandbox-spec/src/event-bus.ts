/**
 * Capability event-bus publisher seam.
 *
 * Cohesion plan §3.4 — capability lifecycle events flow through the
 * single canonical broker `@baohaus/bao-boss`. This module exposes a
 * minimal `publishCapabilityEvent` entrypoint that the registry's
 * admission paths and bao-runtime's sandbox controller call. The
 * broker reference is supplied by the caller (registry / runtime each
 * own the `BaoBoss` lifecycle) — this module never instantiates a
 * broker. The shape mirrors `BaoBoss#publish` from
 * `@baohaus/bao-boss/BaoBoss` without importing the concrete class so
 * sandbox-spec stays broker-implementation-free.
 *
 * The mapping from {@link CapabilityEventTopic} to the wire-format
 * queue topic is locked here. The validator returns a `Result`-shaped
 * payload so callers can surface validation failures without
 * `try/catch`.
 *
 * @module @baohaus/bao-sandbox-spec/event-bus
 */

import {
  CAPABILITY_EVENT_TOPIC,
  type CapabilityEvent,
  type CapabilityEventTopic,
} from "./events.ts";

/**
 * Minimal broker shape consumed by {@link publishCapabilityEvent}.
 *
 * Allows this package to be used in environments (validation tooling,
 * doc generators) that do not link the broker.
 */
export interface CapabilityEventBus {
  readonly publish: (topic: string, payload: unknown) => Promise<void>;
}

/**
 * Validation outcome for {@link publishCapabilityEvent}.
 */
export type CapabilityEventPublishResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly reason: "invalid_topic" | "missing_field" | "publish_failed";
      readonly field?: string;
      readonly detail?: string;
    };

const TOPIC_VALUES: ReadonlySet<string> = new Set(Object.values(CAPABILITY_EVENT_TOPIC));

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isCapabilityEventTopic(value: string): value is CapabilityEventTopic {
  return TOPIC_VALUES.has(value);
}

function validateBaseFields(
  event: CapabilityEvent,
): CapabilityEventPublishResult | { readonly ok: true } {
  for (const field of ["tenantId", "packageId", "grantId", "emittedAt"] as const) {
    const value = event[field as keyof CapabilityEvent];
    if (!isNonEmptyString(value)) {
      return { ok: false, reason: "missing_field", field };
    }
  }
  return { ok: true };
}

/**
 * Publish a capability lifecycle event to the canonical broker.
 *
 * The event topic is read from the discriminated union — callers never
 * pass a raw string. The function awaits the broker's `publish` call so
 * upstream error handling (Elysia `onError`) surfaces transport
 * failures without `try/catch` here.
 *
 * @param bus - Broker handle conforming to {@link CapabilityEventBus}.
 * @param event - Discriminated capability event payload.
 * @returns `{ ok: true }` on success; `{ ok: false, reason }` on validation
 *   failure. The function does not throw; transport failures bubble
 *   through the awaited promise so upstream framework boundaries handle
 *   them.
 */
export async function publishCapabilityEvent(
  bus: CapabilityEventBus,
  event: CapabilityEvent,
): Promise<CapabilityEventPublishResult> {
  if (!isCapabilityEventTopic(event.topic)) {
    return { ok: false, reason: "invalid_topic", detail: event.topic };
  }
  const baseValidation = validateBaseFields(event);
  if (baseValidation.ok === false) {
    return baseValidation;
  }
  await bus.publish(event.topic, event);
  return { ok: true };
}
