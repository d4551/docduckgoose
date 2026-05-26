/**
 * Unit tests for the generic contribution registry factory.
 *
 * @packageDocumentation
 */

import { describe, expect, it } from "bun:test";
import { createContributionRegistry } from "../src/registry.ts";
import { type BaseContributionRegistration, ECOSYSTEM_CONTRIBUTION_SURFACE } from "../src/types.ts";

interface SampleRegistration extends BaseContributionRegistration {
  readonly sortKey: number;
  readonly label: string;
}

const sample = (
  overrides: Partial<SampleRegistration> & Pick<SampleRegistration, "id">,
): SampleRegistration => ({
  extensionId: "fixture",
  sortKey: 0,
  label: overrides.label ?? "sample",
  ...overrides,
});

const compare = (a: SampleRegistration, b: SampleRegistration): number => {
  if (a.sortKey !== b.sortKey) {
    return a.sortKey - b.sortKey;
  }
  return a.id.localeCompare(b.id);
};

describe("createContributionRegistry", () => {
  it("returns frozen snapshots in the order produced by the compare function", () => {
    const registry = createContributionRegistry<SampleRegistration>(compare);
    registry.register(sample({ id: "b", sortKey: 2 }));
    registry.register(sample({ id: "a", sortKey: 1 }));
    registry.register(sample({ id: "c", sortKey: 1 }));

    const snapshot = registry.snapshot();
    expect(snapshot.map((r) => r.id)).toEqual(["a", "c", "b"]);
    expect(Object.isFrozen(snapshot)).toBe(true);
  });

  it("treats a re-register by the same owner as idempotent", () => {
    const registry = createContributionRegistry<SampleRegistration>(compare);
    const first = registry.register(sample({ id: "a", label: "v1" }));
    const second = registry.register(sample({ id: "a", label: "v2" }));

    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
    expect(registry.size()).toBe(1);
    expect(registry.snapshot()[0]?.label).toBe("v2");
  });

  it("rejects a re-register from a different owner with the duplicate-id discriminator", () => {
    const registry = createContributionRegistry<SampleRegistration>(compare);
    registry.register(sample({ id: "a", extensionId: "owner-x" }));
    const collision = registry.register(sample({ id: "a", extensionId: "owner-y" }));

    expect(collision.ok).toBe(false);
    if (!collision.ok) {
      expect(collision.error.kind).toBe("duplicate-id");
      expect(collision.error.currentOwner).toBe("owner-x");
      expect(collision.error.attemptedOwner).toBe("owner-y");
    }
    expect(registry.size()).toBe(1);
  });

  it("removes registrations by id and reports presence", () => {
    const registry = createContributionRegistry<SampleRegistration>(compare);
    registry.register(sample({ id: "a" }));
    expect(registry.unregister("a")).toBe(true);
    expect(registry.unregister("a")).toBe(false);
    expect(registry.size()).toBe(0);
  });

  it("clears every registration owned by an extension and reports the removed count", () => {
    const registry = createContributionRegistry<SampleRegistration>(compare);
    registry.register(sample({ id: "a", extensionId: "owner-x", sortKey: 1 }));
    registry.register(sample({ id: "b", extensionId: "owner-x", sortKey: 2 }));
    registry.register(sample({ id: "c", extensionId: "owner-y", sortKey: 3 }));

    expect(registry.unregisterByOwner("owner-x")).toBe(2);
    expect(registry.snapshot().map((r) => r.id)).toEqual(["c"]);
    expect(registry.unregisterByOwner("owner-x")).toBe(0);
  });

  it("re-exports ECOSYSTEM_CONTRIBUTION_SURFACE through ./types for surface discriminators", () => {
    expect(ECOSYSTEM_CONTRIBUTION_SURFACE.sidebar).toBe("sidebar");
    expect(ECOSYSTEM_CONTRIBUTION_SURFACE.settingsTab).toBe("settings-tab");
  });
});
