import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SETTINGS_TABLE_PAGE_SIZE } from "../src/config/constants.ts";
import {
  buildSettingsUrl,
  paginateSlice,
  parseSettingsTableQuery,
  sortStrings,
} from "../src/http/html/settings-pagination.ts";
import { renderSettingsPanel } from "../src/http/html/settings-view.ts";

const settingsViewSource = readFileSync(
  join(import.meta.dir, "../src/http/html/settings-view.ts"),
  "utf8",
);

const samplePlugins = Array.from({ length: 7 }, (_, index) => ({
  id: `plugin-${String(index + 1).padStart(2, "0")}-bao`,
  version: "0.1.0",
  targets: ["settings-tab"],
  source: "dev" as const,
  enabled: true,
}));

describe("settings pagination helpers", () => {
  it("paginates slices with stable page bounds", () => {
    const items = Array.from({ length: 12 }, (_, index) => index);
    const page = paginateSlice(items, 2, SETTINGS_TABLE_PAGE_SIZE);
    expect(page.total).toBe(12);
    expect(page.page).toBe(2);
    expect(page.totalPages).toBe(3);
    expect(page.items).toEqual([5, 6, 7, 8, 9]);
  });

  it("parses settings table query params", () => {
    const params = new URLSearchParams(
      "pluginsPage=2&enterprisePage=3&pluginsSort=version&pluginsDir=desc&enterpriseSort=type&enterpriseDir=desc",
    );
    expect(parseSettingsTableQuery(params)).toEqual({
      pluginsPage: 2,
      enterprisePage: 3,
      pluginsSort: "version",
      pluginsDir: "desc",
      enterpriseSort: "type",
      enterpriseDir: "desc",
    });
  });

  it("builds settings URLs without default params", () => {
    expect(buildSettingsUrl(parseSettingsTableQuery(new URLSearchParams()))).toBe("/settings");
    expect(
      buildSettingsUrl(
        parseSettingsTableQuery(new URLSearchParams("pluginsPage=2&pluginsSort=version")),
      ),
    ).toBe("/settings?pluginsPage=2&pluginsSort=version");
  });

  it("sorts strings by direction", () => {
    expect(sortStrings("b", "a", "asc")).toBeGreaterThan(0);
    expect(sortStrings("b", "a", "desc")).toBeLessThan(0);
  });
});

describe("renderSettingsPanel admin UX", () => {
  const panel = renderSettingsPanel("en", [
    {
      id: "spellcheck-bao",
      version: "0.1.0",
      targets: ["settings-tab"],
      source: "dev",
      enabled: true,
    },
  ]);

  it("uses gw-admin-surface without handwriting on settings chrome", () => {
    expect(panel).toContain('class="gw-panel gw-admin-surface"');
    expect(panel).not.toMatch(/<h1[^>]*gw-handwriting/);
  });

  it("renders plugin ids with mono token class in table", () => {
    expect(panel).toContain('class="gw-plugin-id truncate"');
    expect(panel).toContain("spellcheck-bao");
    expect(panel).toContain("gw-table-surface");
    expect(panel).toContain('id="gw-plugins-section"');
  });

  it("renders paginated plugins table with sort headers", () => {
    const paginated = renderSettingsPanel("en", samplePlugins, {
      pluginsPage: 2,
      enterprisePage: 1,
      pluginsSort: "id",
      pluginsDir: "asc",
      enterpriseSort: "label",
      enterpriseDir: "asc",
    });
    const pluginsTable = paginated.slice(paginated.indexOf('id="gw-plugins-section"'));
    expect(pluginsTable).toContain("plugin-06-bao");
    expect(pluginsTable).not.toContain(">plugin-01-bao<");
    expect(paginated).toContain("gw-settings-pagination");
    expect(paginated).toContain("Showing 6–7 of 7");
    expect(paginated).toContain('aria-sort="none"');
  });

  it("reload plugins shows visible label", () => {
    expect(panel).toContain("gw-plugins-reload");
    expect(panel).toContain("Reload plugins");
  });

  it("renders plugin enable/disable controls", () => {
    expect(panel).toContain("Enabled");
    expect(panel).toContain("Disable");
    expect(panel).toContain("/settings/plugins/spellcheck-bao/toggle");
    expect(panel).toContain("0 disabled");
    expect(panel).toContain("Disable spellcheck-bao");
  });

  it("renders plugin remove controls with confirm panel", () => {
    expect(panel).toContain("Remove");
    expect(panel).toContain("data-gw-remove-arm");
    expect(panel).toContain("data-gw-remove-id");
    expect(panel).toContain("gw-confirm-popover");
    expect(panel).toContain("gw-plugin-remove-trigger");
    expect(panel).toContain("gw-delete-armed");
    expect(panel).toContain("Remove spellcheck-bao");
  });

  it("shows plugin directory path and add hint", () => {
    expect(panel).toContain("Plugin directory");
    expect(panel).toContain("select-all");
    expect(panel).toContain("Drop a .bao plugin folder here to install.");
  });

  it("enterprise activate template uses labeled control in table", () => {
    expect(settingsViewSource).toContain("gw-enterprise-activate");
    expect(settingsViewSource).toContain(
      `<span class="\${UI_EMPHASIS_XS_CLASS}">\${escapeHtml(activate)}</span>`,
    );
    expect(settingsViewSource).toContain('aria-pressed="true"');
    expect(settingsViewSource).toContain('hx-indicator="#global-indicator"');
    expect(settingsViewSource).toContain('id="gw-enterprise-contexts-section"');
    expect(settingsViewSource).toContain("table-pin-rows");
  });

  it("device shell section wires health probes and local session row", () => {
    expect(panel).toContain('id="gw-device-shell-section"');
    expect(panel).toContain('data-gw-shell-row="local"');
    expect(panel).toContain("data-gw-device-labels");
    expect(panel).toContain("data-gw-shell-status");
    expect(panel).toContain("gw-typography-status");
  });
});
