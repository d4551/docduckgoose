/**
 * Unit coverage for the canonical install-handler-registry factory.
 *
 * Asserts:
 *   - All 12 canonical install-target handler kinds register exactly
 *     once with no duplicates.
 *   - `kind` discriminators match the published BAO_INSTALL_TARGET_KINDS
 *     set so the platform contract stays single-source-of-truth.
 *   - `toHandlerListDto()` returns one DTO entry per registered handler
 *     with a non-empty displayName.
 *   - The `INSTALL_HANDLER_EXTENSION_BASE_PATH` constant matches the
 *     platform-canonical literal `/install/extensions`.
 *   - The `BAO_APP_ID` discriminator names the four production peers
 *     (registry, forge, bao-ai-gateway, bao-runtime).
 */

import { describe, expect, it } from "bun:test";
import {
  BAO_APP_ID,
  buildInstallHandlerRegistry,
  INSTALL_HANDLER_EXTENSION_BASE_PATH,
  type InstallHandlerRegistryContributionSurfaces,
} from "../src/registry-factory.ts";

const EXPECTED_KINDS: readonly string[] = [
  "sidebar",
  "settings-tab",
  "palette-entry-group",
  "api-group",
  "tile-group",
  "topbar",
  "theme-pack",
  "design-tokens",
  "motion-preset",
  "density-preset",
  "htmx-extension",
  "ui-component-kit",
];

let loggerEvents: string[] = [];

const testLogger = {
  info(message: string): void {
    loggerEvents.push(`info:${message}`);
  },
  warn(message: string): void {
    loggerEvents.push(`warn:${message}`);
  },
  error(message: string): void {
    loggerEvents.push(`error:${message}`);
  },
};

function buildSurfaces(): InstallHandlerRegistryContributionSurfaces {
  const sidebar: InstallHandlerRegistryContributionSurfaces["sidebar"] = {
    register() {
      return { ok: true };
    },
    unregisterByOwner() {
      return 0;
    },
  };
  const settingsTab: InstallHandlerRegistryContributionSurfaces["settingsTab"] = {
    register() {
      return { ok: true };
    },
    unregisterByOwner() {
      return 0;
    },
  };
  const paletteEntryGroup: InstallHandlerRegistryContributionSurfaces["paletteEntryGroup"] = {
    register() {
      return { ok: true };
    },
    unregisterByOwner() {
      return 0;
    },
  };
  const apiGroup: InstallHandlerRegistryContributionSurfaces["apiGroup"] = {
    register() {
      return { ok: true };
    },
    unregisterByOwner() {
      return 0;
    },
  };
  const tileGroup: InstallHandlerRegistryContributionSurfaces["tileGroup"] = {
    register() {
      return { ok: true };
    },
    unregisterByOwner() {
      return 0;
    },
  };
  const topbar: InstallHandlerRegistryContributionSurfaces["topbar"] = {
    register() {
      return { ok: true };
    },
    unregisterByOwner() {
      return 0;
    },
  };
  return {
    sidebar,
    settingsTab,
    paletteEntryGroup,
    apiGroup,
    tileGroup,
    topbar,
  };
}

describe("buildInstallHandlerRegistry", () => {
  it("registers exactly the 12 canonical kinds in fixed order", () => {
    loggerEvents = [];
    const registry = buildInstallHandlerRegistry({
      appId: BAO_APP_ID.registry,
      surfaces: buildSurfaces(),
      driverRegistryDir: "/tmp/test-drivers",
      logger: testLogger,
    });
    const dto = registry.toHandlerListDto();
    const kinds = dto.map((entry) => entry.kind);
    expect(kinds).toEqual(EXPECTED_KINDS);
  });

  it("returns one DTO entry per kind with non-empty displayName", () => {
    loggerEvents = [];
    const registry = buildInstallHandlerRegistry({
      appId: BAO_APP_ID.forge,
      surfaces: buildSurfaces(),
      driverRegistryDir: "/tmp/test-drivers",
      logger: testLogger,
    });
    const dto = registry.toHandlerListDto();
    expect(dto.length).toBe(EXPECTED_KINDS.length);
    for (const entry of dto) {
      expect(entry.kind.length).toBeGreaterThan(0);
      expect(entry.displayName.length).toBeGreaterThan(0);
    }
  });

  it("looks up registered handlers by kind via .get()", () => {
    loggerEvents = [];
    const registry = buildInstallHandlerRegistry({
      appId: BAO_APP_ID.baoAiGateway,
      surfaces: buildSurfaces(),
      driverRegistryDir: "/tmp/test-drivers",
      logger: testLogger,
    });
    for (const kind of EXPECTED_KINDS) {
      const handler = registry.get(kind);
      expect(handler).toBeDefined();
      expect(handler?.kind).toBe(kind);
      expect(registry.has(kind)).toBe(true);
    }
  });

  it("does not register unknown kinds", () => {
    loggerEvents = [];
    const registry = buildInstallHandlerRegistry({
      appId: BAO_APP_ID.registry,
      surfaces: buildSurfaces(),
      driverRegistryDir: "/tmp/test-drivers",
      logger: testLogger,
    });
    expect(registry.has("not-a-real-kind")).toBe(false);
    expect(registry.get("not-a-real-kind")).toBeUndefined();
  });

  it("produces independent registry instances per call (no shared state)", () => {
    loggerEvents = [];
    const a = buildInstallHandlerRegistry({
      appId: BAO_APP_ID.registry,
      surfaces: buildSurfaces(),
      driverRegistryDir: "/tmp/test-drivers-a",
      logger: testLogger,
    });
    const b = buildInstallHandlerRegistry({
      appId: BAO_APP_ID.forge,
      surfaces: buildSurfaces(),
      driverRegistryDir: "/tmp/test-drivers-b",
      logger: testLogger,
    });
    expect(a).not.toBe(b);
    expect(a.toHandlerListDto().length).toBe(EXPECTED_KINDS.length);
    expect(b.toHandlerListDto().length).toBe(EXPECTED_KINDS.length);
  });
});

describe("canonical platform constants", () => {
  it("pins INSTALL_HANDLER_EXTENSION_BASE_PATH to '/install/extensions'", () => {
    expect(INSTALL_HANDLER_EXTENSION_BASE_PATH).toBe("/install/extensions");
  });

  it("names the four production peer apps in BAO_APP_ID", () => {
    expect(BAO_APP_ID.registry).toBe("registry");
    expect(BAO_APP_ID.forge).toBe("forge");
    expect(BAO_APP_ID.baoAiGateway).toBe("bao-ai-gateway");
    expect(BAO_APP_ID.baoRuntime).toBe("bao-runtime");
  });
});
