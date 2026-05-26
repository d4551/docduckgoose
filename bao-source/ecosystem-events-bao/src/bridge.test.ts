/**
 * Cross-process bridge tests.
 *
 * Covers the five invariants the bridge promises:
 *   1. Outbound events from process A reach process B's local subscribers.
 *   2. Process A's own publish never re-enters its own subscribers
 *      (loopback prevention).
 *   3. Broker re-delivery (same idempotencyKey arriving twice from the
 *      transport) is dropped on the second arrival (idempotency LRU).
 *   4. `installCrossProcessBridge` rejects double-install in the same
 *      process.
 *   5. Wire encoder + decoder round-trip every event shape including
 *      optional scope fields and reject malformed payloads.
 *
 * @packageDocumentation
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import {
  createInMemoryEcosystemTransportPair,
  decodeEcosystemEvent,
  encodeEcosystemEvent,
  getActiveBridgeForTests,
  installCrossProcessBridge,
  resetActiveBridgeForTests,
} from "./bridge.ts";
import { dispatchEcosystemEvent, ecosystemEventBus, getLocalInstanceId } from "./service.ts";
import type { EcosystemContributionEvent } from "./types.ts";
import { ECOSYSTEM_CONTRIBUTION_CHANGE, ECOSYSTEM_CONTRIBUTION_SURFACE } from "./types.ts";

function buildEvent(
  overrides: Partial<EcosystemContributionEvent> = {},
): EcosystemContributionEvent {
  return {
    surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
    change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
    extensionId: "test:owner",
    publishedAt: "2026-05-15T05:00:00.000Z",
    originInstanceId: "process-x",
    idempotencyKey: "evt-1",
    ...overrides,
  };
}

describe("installCrossProcessBridge", () => {
  beforeEach(() => {
    ecosystemEventBus.resetForTests();
    resetActiveBridgeForTests();
  });

  afterEach(() => {
    ecosystemEventBus.resetForTests();
    resetActiveBridgeForTests();
  });

  test("forwards local publish to the transport's outbound channel", () => {
    const pair = createInMemoryEcosystemTransportPair();
    const handle = installCrossProcessBridge(pair.a);
    const received: EcosystemContributionEvent[] = [];
    pair.b.onEvent((event) => received.push(event));

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "outbound-test",
    });

    expect(received).toHaveLength(1);
    expect(received[0]?.extensionId).toBe("outbound-test");
    expect(received[0]?.originInstanceId).toBe(getLocalInstanceId());
    void handle.close();
  });

  test("inbound events from peer process dispatch into local subscribers", async () => {
    const pair = createInMemoryEcosystemTransportPair();
    const handle = installCrossProcessBridge(pair.a);
    const localReceived: EcosystemContributionEvent[] = [];
    ecosystemEventBus.subscribe((event) => localReceived.push(event));

    const inbound = buildEvent({
      extensionId: "inbound-test",
      originInstanceId: "remote-instance-xyz",
      idempotencyKey: "remote-1",
    });
    pair.b.publish(inbound);

    expect(localReceived.map((e) => e.extensionId)).toContain("inbound-test");
    expect(handle.inboundCount()).toBe(1);
    expect(handle.loopbackDropCount()).toBe(0);
    expect(handle.duplicateDropCount()).toBe(0);
    await handle.close();
  });

  test("loopback: inbound event with origin == localInstanceId is dropped", async () => {
    const pair = createInMemoryEcosystemTransportPair();
    const handle = installCrossProcessBridge(pair.a);
    const localReceived: EcosystemContributionEvent[] = [];
    ecosystemEventBus.subscribe((event) => localReceived.push(event));

    const loopback = buildEvent({
      extensionId: "loopback-attempt",
      originInstanceId: getLocalInstanceId(),
      idempotencyKey: "loopback-1",
    });
    pair.b.publish(loopback);

    expect(localReceived).toHaveLength(0);
    expect(handle.inboundCount()).toBe(1);
    expect(handle.loopbackDropCount()).toBe(1);
    await handle.close();
  });

  test("idempotency: inbound event with seen idempotencyKey is dropped on replay", async () => {
    const pair = createInMemoryEcosystemTransportPair();
    const handle = installCrossProcessBridge(pair.a);
    const localReceived: EcosystemContributionEvent[] = [];
    ecosystemEventBus.subscribe((event) => localReceived.push(event));

    const event = buildEvent({
      extensionId: "replay-test",
      originInstanceId: "remote-instance",
      idempotencyKey: "replay-key-1",
    });
    pair.b.publish(event);
    pair.b.publish(event);

    expect(localReceived).toHaveLength(1);
    expect(handle.inboundCount()).toBe(2);
    expect(handle.duplicateDropCount()).toBe(1);
    await handle.close();
  });

  test("install rejects double-install in the same process", () => {
    const pair = createInMemoryEcosystemTransportPair();
    const first = installCrossProcessBridge(pair.a);
    expect(() => installCrossProcessBridge(pair.b)).toThrow(/already installed/);
    void first.close();
  });

  test("close releases the slot so a fresh bridge can install", async () => {
    const pair = createInMemoryEcosystemTransportPair();
    const first = installCrossProcessBridge(pair.a);
    await first.close();
    expect(getActiveBridgeForTests()).toBeNull();
    const second = installCrossProcessBridge(pair.b);
    expect(getActiveBridgeForTests()).not.toBeNull();
    await second.close();
  });

  test("locally-stamped event reaches peer with stable idempotencyKey", () => {
    const pair = createInMemoryEcosystemTransportPair();
    const handle = installCrossProcessBridge(pair.a);
    const inboundB: EcosystemContributionEvent[] = [];
    pair.b.onEvent((event) => inboundB.push(event));

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.settingsTab,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "stable-key-test",
    });

    expect(inboundB).toHaveLength(1);
    expect(inboundB[0]?.idempotencyKey.length).toBeGreaterThan(0);
    expect(inboundB[0]?.surface).toBe(ECOSYSTEM_CONTRIBUTION_SURFACE.settingsTab);
    void handle.close();
  });

  test("dispatchEcosystemEvent (used by bridge inbound) does NOT re-publish outbound", () => {
    const pair = createInMemoryEcosystemTransportPair();
    const handle = installCrossProcessBridge(pair.a);
    const peerInbound: EcosystemContributionEvent[] = [];
    pair.b.onEvent((event) => peerInbound.push(event));

    dispatchEcosystemEvent(buildEvent({ originInstanceId: "elsewhere" }));

    expect(peerInbound).toHaveLength(0);
    void handle.close();
  });
});

describe("encodeEcosystemEvent / decodeEcosystemEvent", () => {
  test("round-trips minimum-shape event", () => {
    const event = buildEvent();
    const wire = encodeEcosystemEvent(event);
    const decoded = decodeEcosystemEvent(wire);
    expect(decoded).toEqual(event);
  });

  test("round-trips event with tenantId + userId", () => {
    const event = buildEvent({
      tenantId: "tenant-7",
      userId: "user-42",
    });
    const wire = encodeEcosystemEvent(event);
    const decoded = decodeEcosystemEvent(wire);
    expect(decoded).toEqual(event);
  });

  test("omits absent optional scope fields from wire", () => {
    const event = buildEvent();
    const wire = encodeEcosystemEvent(event);
    expect(wire).not.toContain("tenantId");
    expect(wire).not.toContain("userId");
  });

  test("rejects payload missing required fields", () => {
    expect(decodeEcosystemEvent('{"surface":"sidebar"}')).toBeNull();
  });

  test("rejects payload with non-string field types", () => {
    const malformed = JSON.stringify({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: 7,
      publishedAt: "2026-05-15T00:00:00.000Z",
      originInstanceId: "x",
      idempotencyKey: "y",
    });
    expect(decodeEcosystemEvent(malformed)).toBeNull();
  });

  test("rejects payload with unknown surface literal", () => {
    const malformed = JSON.stringify({
      surface: "not-a-surface",
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "x",
      publishedAt: "2026-05-15T00:00:00.000Z",
      originInstanceId: "x",
      idempotencyKey: "y",
    });
    expect(decodeEcosystemEvent(malformed)).toBeNull();
  });

  test("rejects payload with unknown change literal", () => {
    const malformed = JSON.stringify({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: "not-a-change",
      extensionId: "x",
      publishedAt: "2026-05-15T00:00:00.000Z",
      originInstanceId: "x",
      idempotencyKey: "y",
    });
    expect(decodeEcosystemEvent(malformed)).toBeNull();
  });

  test("round-trips originPeerId (T-19 surgical-invalidate wire field)", () => {
    const event = buildEvent({ originPeerId: "registry" });
    const wire = encodeEcosystemEvent(event);
    expect(wire).toContain("originPeerId");
    expect(wire).toContain("registry");
    const decoded = decodeEcosystemEvent(wire);
    expect(decoded).toEqual(event);
    expect(decoded?.originPeerId).toBe("registry");
  });

  test("round-trips originPeerId alongside tenantId + userId", () => {
    const event = buildEvent({
      originPeerId: "forge",
      tenantId: "tenant-x",
      userId: "user-x",
    });
    const wire = encodeEcosystemEvent(event);
    const decoded = decodeEcosystemEvent(wire);
    expect(decoded).toEqual(event);
    expect(decoded?.originPeerId).toBe("forge");
    expect(decoded?.tenantId).toBe("tenant-x");
    expect(decoded?.userId).toBe("user-x");
  });

  test("omits absent originPeerId from wire", () => {
    const event = buildEvent();
    const wire = encodeEcosystemEvent(event);
    expect(wire).not.toContain("originPeerId");
  });

  test("rejects payload with non-string originPeerId", () => {
    const malformed = JSON.stringify({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "x",
      publishedAt: "2026-05-15T00:00:00.000Z",
      originInstanceId: "x",
      idempotencyKey: "y",
      originPeerId: 42,
    });
    expect(decodeEcosystemEvent(malformed)).toBeNull();
  });

  test("decodes payload WITHOUT originPeerId (legacy publisher backwards-compat)", () => {
    const legacy = JSON.stringify({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "x",
      publishedAt: "2026-05-15T00:00:00.000Z",
      originInstanceId: "x",
      idempotencyKey: "y",
    });
    const decoded = decodeEcosystemEvent(legacy);
    expect(decoded).not.toBeNull();
    expect(decoded?.originPeerId).toBeUndefined();
  });
});
