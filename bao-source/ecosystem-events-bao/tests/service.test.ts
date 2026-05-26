/**
 * Unit tests for the in-process ecosystem event bus.
 *
 * @packageDocumentation
 */

import { afterEach, describe, expect, it } from "bun:test";
import { ecosystemEventBus } from "../src/service.ts";
import {
  ECOSYSTEM_CONTRIBUTION_CHANGE,
  ECOSYSTEM_CONTRIBUTION_SURFACE,
  type EcosystemContributionEvent,
} from "../src/types.ts";

afterEach(() => {
  ecosystemEventBus.resetForTests();
});

describe("ecosystemEventBus", () => {
  it("delivers published events to every subscribed listener", () => {
    const received: EcosystemContributionEvent[] = [];
    const otherReceived: EcosystemContributionEvent[] = [];

    ecosystemEventBus.subscribe((event) => received.push(event));
    ecosystemEventBus.subscribe((event) => otherReceived.push(event));

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "pkg-a",
    });

    expect(received).toHaveLength(1);
    expect(otherReceived).toHaveLength(1);
    expect(received[0]?.surface).toBe(ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar);
    expect(received[0]?.change).toBe(ECOSYSTEM_CONTRIBUTION_CHANGE.installed);
    expect(received[0]?.extensionId).toBe("pkg-a");
    expect(typeof received[0]?.publishedAt).toBe("string");
  });

  it("stops delivering events after unsubscribe", () => {
    const received: EcosystemContributionEvent[] = [];
    const unsubscribe = ecosystemEventBus.subscribe((event) => received.push(event));

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "pkg-a",
    });
    unsubscribe();
    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.uninstalled,
      extensionId: "pkg-a",
    });

    expect(received).toHaveLength(1);
    expect(received[0]?.change).toBe(ECOSYSTEM_CONTRIBUTION_CHANGE.installed);
  });

  it("treats a second unsubscribe call as a Set.delete no-op without throwing", () => {
    const received: EcosystemContributionEvent[] = [];
    const recorder = (event: EcosystemContributionEvent): void => {
      received.push(event);
    };
    const unsubscribe = ecosystemEventBus.subscribe(recorder);
    expect(ecosystemEventBus.listenerCount()).toBe(1);

    unsubscribe();
    expect(ecosystemEventBus.listenerCount()).toBe(0);
    unsubscribe();
    expect(ecosystemEventBus.listenerCount()).toBe(0);

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.uninstalled,
      extensionId: "pkg-z",
    });
    expect(received).toHaveLength(0);
  });

  it("preserves caller-supplied publishedAt when present", () => {
    const fixedTimestamp = "2026-05-14T15:00:00.000Z";
    const received: EcosystemContributionEvent[] = [];
    ecosystemEventBus.subscribe((event) => received.push(event));

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.settingsTab,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.capabilityReevaluated,
      extensionId: "pkg-b",
      userId: "user-1",
      publishedAt: fixedTimestamp,
    });

    expect(received[0]?.publishedAt).toBe(fixedTimestamp);
    expect(received[0]?.userId).toBe("user-1");
  });

  it("preserves a listener that unsubscribes during dispatch without skipping siblings", () => {
    const order: string[] = [];
    const cleanupHandle: { current: (() => void) | null } = { current: null };
    const first = (): void => {
      order.push("first");
      const unsubscribeFirst = cleanupHandle.current;
      if (unsubscribeFirst !== null) {
        unsubscribeFirst();
      }
    };
    const second = (): void => {
      order.push("second");
    };
    cleanupHandle.current = ecosystemEventBus.subscribe(first);
    ecosystemEventBus.subscribe(second);

    ecosystemEventBus.publish({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
      extensionId: "pkg-c",
    });

    expect(order).toEqual(["first", "second"]);
    expect(ecosystemEventBus.listenerCount()).toBe(1);
  });
});
