/**
 * Settings-tab contribution host — host-factory tests.
 *
 * @packageDocumentation
 */

import { describe, expect, test } from "bun:test";
import {
  SETTINGS_TAB_SECTIONS,
  type SettingsTabRegistration,
} from "@baohaus/contribution-registry-bao/settings-tab";
import { createSettingsTabHost } from "./settings-tab.ts";

function buildRegistration(
  overrides: Partial<SettingsTabRegistration> & Pick<SettingsTabRegistration, "id">,
): SettingsTabRegistration {
  return {
    extensionId: "test:owner",
    section: SETTINGS_TAB_SECTIONS.general.id,
    position: 0,
    labelKey: "settings.workbench.tabs.general",
    contentUrl: "/settings/tabs/general",
    ...overrides,
  };
}

describe("createSettingsTabHost", () => {
  test("returns independent process-local hosts", () => {
    const a = createSettingsTabHost();
    const b = createSettingsTabHost();
    a.register(buildRegistration({ id: "a:general" }));
    expect(a.size()).toBe(1);
    expect(b.size()).toBe(0);
  });

  test("orders snapshot by section.order then position then id", () => {
    const host = createSettingsTabHost();
    host.register(
      buildRegistration({
        id: "shortcuts:list",
        section: SETTINGS_TAB_SECTIONS.shortcuts.id,
        position: 0,
        labelKey: "settings.workbench.tabs.shortcuts",
        contentUrl: "/settings/tabs/shortcuts",
      }),
    );
    host.register(
      buildRegistration({
        id: "general:profile",
        section: SETTINGS_TAB_SECTIONS.general.id,
        position: 0,
        labelKey: "settings.workbench.tabs.general",
        contentUrl: "/settings/tabs/general",
      }),
    );
    const ids = host.snapshot().map((reg) => reg.id);
    expect(ids).toEqual(["general:profile", "shortcuts:list"]);
  });

  test("snapshotBySection partitions to canonical 7-key record", () => {
    const host = createSettingsTabHost();
    host.register(
      buildRegistration({
        id: "general:profile",
        section: SETTINGS_TAB_SECTIONS.general.id,
        labelKey: "settings.workbench.tabs.general",
        contentUrl: "/settings/tabs/general",
      }),
    );
    host.register(
      buildRegistration({
        id: "apis:routes",
        section: SETTINGS_TAB_SECTIONS.apis.id,
        labelKey: "settings.workbench.tabs.apis",
        contentUrl: "/settings/tabs/apis",
      }),
    );
    const grouped = host.snapshotBySection();
    expect(grouped.general.map((r) => r.id)).toEqual(["general:profile"]);
    expect(grouped.apis.map((r) => r.id)).toEqual(["apis:routes"]);
    expect(grouped.shortcuts).toEqual([]);
    const allKeys = Object.keys(grouped).sort();
    const expected = Object.values(SETTINGS_TAB_SECTIONS)
      .map((entry) => entry.id)
      .sort();
    expect(allKeys).toEqual(expected);
  });
});
