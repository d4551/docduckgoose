/**
 * Sidebar contribution host — host-factory tests.
 *
 * Covers: independent host instances, canonical compare order
 * (section.order → position → id), snapshot-by-section partitioning,
 * owner-scoped unregister, duplicate-id Result discrimination.
 *
 * @packageDocumentation
 */

import { describe, expect, test } from "bun:test";
import {
  SIDEBAR_SECTIONS,
  type SidebarRegistration,
} from "@baohaus/contribution-registry-bao/sidebar";
import { createSidebarHost } from "./sidebar.ts";

function buildRegistration(
  overrides: Partial<SidebarRegistration> & Pick<SidebarRegistration, "id">,
): SidebarRegistration {
  return {
    extensionId: "test:owner",
    section: SIDEBAR_SECTIONS.overview.id,
    position: 0,
    labelKey: "nav.dashboard.label",
    href: "/dashboard",
    ...overrides,
  };
}

describe("createSidebarHost", () => {
  test("returns independent process-local hosts", () => {
    const a = createSidebarHost();
    const b = createSidebarHost();
    a.register(buildRegistration({ id: "a:dashboard" }));
    expect(a.size()).toBe(1);
    expect(b.size()).toBe(0);
  });

  test("orders snapshot by section.order then position then id", () => {
    const host = createSidebarHost();
    host.register(
      buildRegistration({
        id: "system:logs",
        section: SIDEBAR_SECTIONS.system.id,
        position: 100,
        labelKey: "nav.observability.label",
        href: "/observability",
      }),
    );
    host.register(
      buildRegistration({
        id: "overview:dashboard",
        section: SIDEBAR_SECTIONS.overview.id,
        position: 0,
        labelKey: "nav.dashboard.label",
        href: "/dashboard",
      }),
    );
    host.register(
      buildRegistration({
        id: "intelligence:b-models",
        section: SIDEBAR_SECTIONS.intelligence.id,
        position: 50,
        labelKey: "nav.aiModels.label",
        href: "/ai/models",
      }),
    );
    host.register(
      buildRegistration({
        id: "intelligence:a-playground",
        section: SIDEBAR_SECTIONS.intelligence.id,
        position: 50,
        labelKey: "nav.aiPlayground.label",
        href: "/ai/playground",
      }),
    );
    const ids = host.snapshot().map((reg) => reg.id);
    expect(ids).toEqual([
      "overview:dashboard",
      "intelligence:a-playground",
      "intelligence:b-models",
      "system:logs",
    ]);
  });

  test("snapshotBySection partitions to canonical 12-key record", () => {
    const host = createSidebarHost();
    host.register(
      buildRegistration({
        id: "ovr:dashboard",
        section: SIDEBAR_SECTIONS.overview.id,
        labelKey: "nav.dashboard.label",
        href: "/dashboard",
      }),
    );
    host.register(
      buildRegistration({
        id: "dev:repos",
        section: SIDEBAR_SECTIONS.develop.id,
        labelKey: "nav.packages.label",
        href: "/repos",
      }),
    );
    const grouped = host.snapshotBySection();
    expect(grouped.overview.map((r) => r.id)).toEqual(["ovr:dashboard"]);
    expect(grouped.develop.map((r) => r.id)).toEqual(["dev:repos"]);
    expect(grouped.operations).toEqual([]);
    expect(grouped.spatial).toEqual([]);
    const allKeys = Object.keys(grouped).sort();
    const expected = Object.values(SIDEBAR_SECTIONS)
      .map((entry) => entry.id)
      .sort();
    expect(allKeys).toEqual(expected);
  });

  test("unregisterByOwner removes every registration owned by the owner", () => {
    const host = createSidebarHost();
    host.register(buildRegistration({ id: "p1:a", extensionId: "p1" }));
    host.register(buildRegistration({ id: "p1:b", extensionId: "p1" }));
    host.register(buildRegistration({ id: "p2:a", extensionId: "p2" }));
    expect(host.unregisterByOwner("p1")).toBe(2);
    expect(host.size()).toBe(1);
    expect(host.snapshot().map((r) => r.id)).toEqual(["p2:a"]);
  });

  test("duplicate-id by a different owner returns Result.error", () => {
    const host = createSidebarHost();
    const first = host.register(
      buildRegistration({ id: "shared:dashboard", extensionId: "owner-a" }),
    );
    expect(first.ok).toBe(true);
    const second = host.register(
      buildRegistration({ id: "shared:dashboard", extensionId: "owner-b" }),
    );
    expect(second.ok).toBe(false);
    if (!second.ok) {
      expect(second.error.kind).toBe("duplicate-id");
      expect(second.error.currentOwner).toBe("owner-a");
      expect(second.error.attemptedOwner).toBe("owner-b");
    }
  });

  test("re-registering the same id from the same owner is idempotent", () => {
    const host = createSidebarHost();
    const registration = buildRegistration({
      id: "owner:dashboard",
      extensionId: "same-owner",
    });
    expect(host.register(registration).ok).toBe(true);
    expect(host.register(registration).ok).toBe(true);
    expect(host.size()).toBe(1);
  });

  test("hot-swap: re-register same id with new payload replaces snapshot entry and bumps version", () => {
    const host = createSidebarHost();
    const v1 = buildRegistration({
      id: "owner:dashboard",
      extensionId: "same-owner",
      position: 10,
      labelKey: "nav.dashboard.label",
      href: "/dashboard-v1",
    });
    expect(host.register(v1).ok).toBe(true);
    const versionAfterV1 = host.version();
    expect(host.snapshot()[0]?.href).toBe("/dashboard-v1");

    const v2 = buildRegistration({
      id: "owner:dashboard",
      extensionId: "same-owner",
      position: 20,
      labelKey: "nav.dashboard.label",
      href: "/dashboard-v2",
    });
    expect(host.register(v2).ok).toBe(true);
    expect(host.size()).toBe(1);
    expect(host.snapshot()[0]?.href).toBe("/dashboard-v2");
    expect(host.snapshot()[0]?.position).toBe(20);
    expect(host.version()).toBeGreaterThan(versionAfterV1);
  });

  test("hot-swap: unregister then re-register cycle yields fresh snapshot and monotonic version", () => {
    const host = createSidebarHost();
    const reg = buildRegistration({
      id: "owner:dashboard",
      extensionId: "same-owner",
      href: "/dashboard",
    });
    expect(host.register(reg).ok).toBe(true);
    const baselineVersion = host.version();
    expect(host.size()).toBe(1);

    expect(host.unregister("owner:dashboard")).toBe(true);
    expect(host.size()).toBe(0);
    const versionAfterUnregister = host.version();
    expect(versionAfterUnregister).toBeGreaterThan(baselineVersion);

    const replacement = buildRegistration({
      id: "owner:dashboard",
      extensionId: "same-owner",
      href: "/dashboard-replaced",
    });
    expect(host.register(replacement).ok).toBe(true);
    expect(host.size()).toBe(1);
    expect(host.snapshot()[0]?.href).toBe("/dashboard-replaced");
    expect(host.version()).toBeGreaterThan(versionAfterUnregister);
  });
});
