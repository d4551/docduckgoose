import { describe, expect, test } from "bun:test";
import {
  buildDroneCapabilityPortfolioSystems,
  DRONE_CAPABILITY_PORTFOLIO_DEFAULTS,
  DRONE_HARDWARE_MCP_TOOL_NAMES,
  isUavCapabilityId,
  listPackageCapabilitiesForPackage,
  UAV_CAPABILITY_COUNT,
  UAV_CAPABILITY_REGISTRY,
  UAV_PORTFOLIO_SYSTEM_IDS,
} from "./uav-capability-registry.ts";

describe("uav-capability-registry", () => {
  test("defines exactly 100 capabilities across 10 systems", () => {
    expect(UAV_CAPABILITY_COUNT).toBe(100);
    expect(UAV_PORTFOLIO_SYSTEM_IDS.length).toBe(10);
    for (const systemId of UAV_PORTFOLIO_SYSTEM_IDS) {
      const slice = UAV_CAPABILITY_REGISTRY.filter((entry) => entry.systemId === systemId);
      expect(slice.length).toBe(10);
    }
  });

  test("portfolio defaults expose 10 configured systems", () => {
    const systems = buildDroneCapabilityPortfolioSystems();
    expect(systems.length).toBe(10);
    expect(DRONE_CAPABILITY_PORTFOLIO_DEFAULTS.systems.length).toBe(10);
    for (const system of systems) {
      expect(system.capabilityIds.length).toBe(10);
      expect(system.mcpTools.length).toBeGreaterThan(0);
    }
  });

  test("recognizes canonical capability ids", () => {
    expect(isUavCapabilityId("uav.registry.catalog")).toBe(true);
    expect(isUavCapabilityId("not-a-capability")).toBe(false);
  });

  test("lists mission package capabilities from registry slice", () => {
    const caps = listPackageCapabilitiesForPackage("drone-mission-bao");
    expect(caps.includes("uav.mission.compile")).toBe(true);
    expect(caps.includes("drone.mission.compile")).toBe(true);
  });

  test("tracks full hardware MCP drone tool catalog", () => {
    expect(DRONE_HARDWARE_MCP_TOOL_NAMES.length).toBe(39);
  });
});
