/**
 * Unit tests for the per-subscriber event filter.
 *
 * @packageDocumentation
 */

import { describe, expect, it } from "bun:test";
import { shouldDeliverEvent } from "../src/filter.ts";
import {
  ECOSYSTEM_CONTRIBUTION_CHANGE,
  ECOSYSTEM_CONTRIBUTION_SURFACE,
  type EcosystemContributionEvent,
} from "../src/types.ts";

const baseline = (
  overrides: Partial<EcosystemContributionEvent> = {},
): EcosystemContributionEvent => ({
  surface: ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
  change: ECOSYSTEM_CONTRIBUTION_CHANGE.installed,
  extensionId: "fixture",
  publishedAt: "2026-05-14T00:00:00.000Z",
  ...overrides,
});

describe("shouldDeliverEvent", () => {
  it("delivers tenant-broadcast + user-broadcast events to every subscriber on the matching surface", () => {
    expect(
      shouldDeliverEvent(
        baseline(),
        { userId: "user-1", tenantId: "tenant-A" },
        ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      ),
    ).toBe(true);
    expect(
      shouldDeliverEvent(
        baseline(),
        { userId: null, tenantId: null },
        ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      ),
    ).toBe(true);
  });

  it("drops tenant-scoped events for subscribers in a different tenant", () => {
    const event = baseline({ tenantId: "tenant-A" });
    expect(
      shouldDeliverEvent(
        event,
        { userId: "user-1", tenantId: "tenant-A" },
        ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      ),
    ).toBe(true);
    expect(
      shouldDeliverEvent(
        event,
        { userId: "user-1", tenantId: "tenant-B" },
        ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      ),
    ).toBe(false);
    expect(
      shouldDeliverEvent(
        event,
        { userId: "user-1", tenantId: null },
        ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      ),
    ).toBe(false);
  });

  it("drops user-scoped events for subscribers other than the targeted user", () => {
    const event = baseline({
      change: ECOSYSTEM_CONTRIBUTION_CHANGE.capabilityReevaluated,
      userId: "user-1",
    });
    expect(
      shouldDeliverEvent(
        event,
        { userId: "user-1", tenantId: null },
        ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      ),
    ).toBe(true);
    expect(
      shouldDeliverEvent(
        event,
        { userId: "user-2", tenantId: null },
        ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      ),
    ).toBe(false);
    expect(
      shouldDeliverEvent(
        event,
        { userId: null, tenantId: null },
        ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      ),
    ).toBe(false);
  });

  it("drops events targeted at a different surface", () => {
    const event = baseline({
      surface: ECOSYSTEM_CONTRIBUTION_SURFACE.settingsTab,
    });
    expect(
      shouldDeliverEvent(
        event,
        { userId: "user-1", tenantId: "tenant-A" },
        ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar,
      ),
    ).toBe(false);
  });
});
