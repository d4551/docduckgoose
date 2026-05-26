/**
 * Tests for the capability event-bus publisher seam.
 *
 * Validates topic admission, base-field validation, and the broker
 * `publish` contract. The tests use a hand-rolled fake broker rather
 * than `@baohaus/queue-bao` so the spec stays broker-implementation-free.
 *
 * @module @baohaus/bao-sandbox-spec/event-bus.test
 */

import { describe, expect, test } from "bun:test";
import { type CapabilityEventBus, publishCapabilityEvent } from "./event-bus.ts";
import {
  CAPABILITY_EVENT_TOPIC,
  type CapabilityEvent,
  type CapabilityGrantedEvent,
} from "./events.ts";

interface RecordedPublish {
  readonly topic: string;
  readonly payload: unknown;
}

function makeFakeBus(): {
  readonly bus: CapabilityEventBus;
  readonly recorded: RecordedPublish[];
} {
  const recorded: RecordedPublish[] = [];
  const bus: CapabilityEventBus = {
    publish: async (topic, payload) => {
      recorded.push({ topic, payload });
    },
  };
  return { bus, recorded };
}

const validGrantedEvent: CapabilityGrantedEvent = {
  topic: CAPABILITY_EVENT_TOPIC.granted,
  tenantId: "tenant-1",
  packageId: "pkg.alpha",
  grantId: "grant-1",
  emittedAt: "2026-05-11T00:00:00.000Z",
  issuedAt: "2026-05-11T00:00:00.000Z",
  expiresAt: "2026-05-18T00:00:00.000Z",
};

describe("publishCapabilityEvent", () => {
  test("publishes a valid granted event to the broker", async () => {
    const { bus, recorded } = makeFakeBus();
    const result = await publishCapabilityEvent(bus, validGrantedEvent);
    expect(result.ok).toBe(true);
    expect(recorded).toHaveLength(1);
    const first = recorded[0];
    expect(first).not.toBeUndefined();
    if (first === undefined) {
      return;
    }
    expect(first.topic).toBe(CAPABILITY_EVENT_TOPIC.granted);
    expect(first.payload).toBe(validGrantedEvent);
  });

  test("rejects an event with an unknown topic without publishing", async () => {
    const { bus, recorded } = makeFakeBus();
    const masquerade = {
      ...validGrantedEvent,
      topic: "capability.unknown",
    } as CapabilityEvent;
    const result = await publishCapabilityEvent(bus, masquerade);
    expect(result.ok).toBe(false);
    if (result.ok) {
      return;
    }
    expect(result.reason).toBe("invalid_topic");
    expect(recorded).toHaveLength(0);
  });

  test("rejects an event missing a required base field", async () => {
    const { bus, recorded } = makeFakeBus();
    const missingField = { ...validGrantedEvent, tenantId: "" };
    const result = await publishCapabilityEvent(bus, missingField);
    expect(result.ok).toBe(false);
    if (result.ok) {
      return;
    }
    expect(result.reason).toBe("missing_field");
    expect(result.field).toBe("tenantId");
    expect(recorded).toHaveLength(0);
  });

  test("publishes each canonical lifecycle topic shape", async () => {
    const { bus, recorded } = makeFakeBus();

    await publishCapabilityEvent(bus, validGrantedEvent);
    await publishCapabilityEvent(bus, {
      topic: CAPABILITY_EVENT_TOPIC.revoked,
      tenantId: "tenant-1",
      packageId: "pkg.alpha",
      grantId: "grant-1",
      emittedAt: "2026-05-11T00:00:00.000Z",
      reason: "expired",
    });
    await publishCapabilityEvent(bus, {
      topic: CAPABILITY_EVENT_TOPIC.exceeded,
      tenantId: "tenant-1",
      packageId: "pkg.alpha",
      grantId: "grant-1",
      emittedAt: "2026-05-11T00:00:00.000Z",
      capability: "cpuMilli",
      observedValue: 1200,
      limitValue: 1000,
    });
    await publishCapabilityEvent(bus, {
      topic: CAPABILITY_EVENT_TOPIC.escalationRequested,
      tenantId: "tenant-1",
      packageId: "pkg.alpha",
      grantId: "grant-1",
      emittedAt: "2026-05-11T00:00:00.000Z",
      requestedCapability: "net",
      requestedTier: "B3",
      justification: "egress required for upstream sync",
    });
    await publishCapabilityEvent(bus, {
      topic: CAPABILITY_EVENT_TOPIC.backpressure,
      tenantId: "tenant-1",
      packageId: "pkg.alpha",
      grantId: "grant-1",
      emittedAt: "2026-05-11T00:00:00.000Z",
      spawner: "bao-jail",
      queueDepth: 12,
      etaMs: 5_000,
    });

    expect(recorded.map((r) => r.topic)).toEqual([
      CAPABILITY_EVENT_TOPIC.granted,
      CAPABILITY_EVENT_TOPIC.revoked,
      CAPABILITY_EVENT_TOPIC.exceeded,
      CAPABILITY_EVENT_TOPIC.escalationRequested,
      CAPABILITY_EVENT_TOPIC.backpressure,
    ]);
  });
});
