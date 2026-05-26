/**
 * Unit tests for the CapabilityRegistry.
 */

import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import {
  type CapabilityRefreshEvent,
  CapabilityRegistry,
  getCapabilityRegistry,
  resetCapabilityRegistry,
} from "./capability-registry";
import { createDomainModuleDescriptor } from "./domain-module.contract";
import { ModuleContractRegistry } from "./module-contract-registry";

function createTestRegistry(): ModuleContractRegistry {
  return new ModuleContractRegistry();
}

function registerTestModule(
  registry: ModuleContractRegistry,
  moduleId: string,
  capabilities: Array<{ capabilityId: string; name: string; description: string }> = [],
): void {
  registry.register(
    createDomainModuleDescriptor({
      moduleId,
      kind: "service",
      version: "1.0.0",
      description: `Test module ${moduleId}`,
      capabilities,
      transport: { protocol: "http", basePath: "/" },
    }),
  );
}

describe("CapabilityRegistry", () => {
  let moduleRegistry: ModuleContractRegistry;
  let capabilityRegistry: CapabilityRegistry;

  beforeEach(() => {
    moduleRegistry = createTestRegistry();
    capabilityRegistry = new CapabilityRegistry(moduleRegistry);
  });

  afterEach(() => {
    capabilityRegistry.dispose();
    moduleRegistry.clear();
    resetCapabilityRegistry();
  });

  describe("hasCapability", () => {
    it("returns false for unregistered module", () => {
      expect(capabilityRegistry.hasCapability("nonexistent", "any")).toBe(false);
    });

    it("returns false when module lacks capability", () => {
      registerTestModule(moduleRegistry, "mod-a", [
        { capabilityId: "cap:one", name: "Cap One", description: "First" },
      ]);
      expect(capabilityRegistry.hasCapability("mod-a", "cap:two")).toBe(false);
    });

    it("returns true when module has the capability", () => {
      registerTestModule(moduleRegistry, "mod-a", [
        { capabilityId: "cap:one", name: "Cap One", description: "First" },
      ]);
      expect(capabilityRegistry.hasCapability("mod-a", "cap:one")).toBe(true);
    });
  });

  describe("getCapabilities", () => {
    it("returns empty array for unregistered module", () => {
      expect(capabilityRegistry.getCapabilities("nonexistent")).toEqual([]);
    });

    it("returns capabilities for registered module", () => {
      registerTestModule(moduleRegistry, "mod-a", [
        { capabilityId: "cap:one", name: "Cap One", description: "First" },
        { capabilityId: "cap:two", name: "Cap Two", description: "Second" },
      ]);
      const caps = capabilityRegistry.getCapabilities("mod-a");
      expect(caps).toHaveLength(2);
      expect(caps.map((c) => c.capabilityId)).toEqual(["cap:one", "cap:two"]);
    });
  });

  describe("checkCapability", () => {
    it("returns granted=false when no module has the capability", () => {
      const result = capabilityRegistry.checkCapability({
        capabilityId: "cap:nonexistent",
        userId: "user-1",
        correlationId: "corr-1",
      });
      expect(result.granted).toBe(false);
      expect(result.capabilityId).toBe("cap:nonexistent");
      expect(result.userId).toBe("user-1");
      expect(result.correlationId).toBe("corr-1");
      expect(result.checkedAt).toBeTruthy();
      expect(result.reason).toContain("No module");
    });

    it("returns granted=true when a module advertises the capability", () => {
      registerTestModule(moduleRegistry, "mod-a", [
        { capabilityId: "cap:one", name: "Cap One", description: "First" },
      ]);
      const result = capabilityRegistry.checkCapability({ capabilityId: "cap:one" });
      expect(result.granted).toBe(true);
      expect(result.reason).toContain("mod-a");
    });

    it("reports multiple modules granting the same capability", () => {
      registerTestModule(moduleRegistry, "mod-a", [
        { capabilityId: "cap:shared", name: "Shared", description: "Shared cap" },
      ]);
      registerTestModule(moduleRegistry, "mod-b", [
        { capabilityId: "cap:shared", name: "Shared", description: "Shared cap" },
      ]);
      const result = capabilityRegistry.checkCapability({ capabilityId: "cap:shared" });
      expect(result.granted).toBe(true);
      expect(result.reason).toContain("2 module(s)");
    });
  });

  describe("refreshCapabilities", () => {
    it("returns null for unregistered module", () => {
      const result = capabilityRegistry.refreshCapabilities("nonexistent");
      expect(result).toBeNull();
    });

    it("returns refresh event for registered module", () => {
      registerTestModule(moduleRegistry, "mod-a", [
        { capabilityId: "cap:one", name: "Cap One", description: "First" },
      ]);
      const event = capabilityRegistry.refreshCapabilities("mod-a", "corr-1");
      expect(event).not.toBeNull();
      expect(event?.moduleId).toBe("mod-a");
      expect(event?.current).toEqual(["cap:one"]);
      expect(event?.correlationId).toBe("corr-1");
      expect(event?.refreshedAt).toBeTruthy();
    });
  });

  describe("onCapabilityChange", () => {
    it("fires when a module is registered", () => {
      const events: CapabilityRefreshEvent[] = [];
      capabilityRegistry.onCapabilityChange((e) => events.push(e));

      registerTestModule(moduleRegistry, "mod-a", [
        { capabilityId: "cap:one", name: "Cap One", description: "First" },
      ]);

      expect(events).toHaveLength(1);
      expect(events[0].moduleId).toBe("mod-a");
      expect(events[0].current).toEqual(["cap:one"]);
    });

    it("fires when a module is unregistered", () => {
      registerTestModule(moduleRegistry, "mod-a", [
        { capabilityId: "cap:one", name: "Cap One", description: "First" },
      ]);

      const events: CapabilityRefreshEvent[] = [];
      capabilityRegistry.onCapabilityChange((e) => events.push(e));

      moduleRegistry.unregister("mod-a");
      expect(events).toHaveLength(1);
      expect(events[0].moduleId).toBe("mod-a");
      expect(events[0].current).toEqual([]);
    });

    it("returns unsubscribe function", () => {
      const events: CapabilityRefreshEvent[] = [];
      const unsub = capabilityRegistry.onCapabilityChange((e) => events.push(e));

      registerTestModule(moduleRegistry, "mod-a", [
        { capabilityId: "cap:one", name: "Cap One", description: "First" },
      ]);
      expect(events).toHaveLength(1);

      unsub();
      registerTestModule(moduleRegistry, "mod-b", [
        { capabilityId: "cap:two", name: "Cap Two", description: "Second" },
      ]);
      expect(events).toHaveLength(1);
    });

    it("does not propagate listener errors", () => {
      capabilityRegistry.onCapabilityChange(() => {
        throw new Error("listener error");
      });
      const events: CapabilityRefreshEvent[] = [];
      capabilityRegistry.onCapabilityChange((e) => events.push(e));

      registerTestModule(moduleRegistry, "mod-a", [
        { capabilityId: "cap:one", name: "Cap One", description: "First" },
      ]);
      expect(events).toHaveLength(1);
    });
  });

  describe("singleton", () => {
    it("returns the same instance on repeated calls", () => {
      const a = getCapabilityRegistry();
      const b = getCapabilityRegistry();
      expect(a).toBe(b);
    });

    it("returns a new instance after reset", () => {
      const a = getCapabilityRegistry();
      resetCapabilityRegistry();
      const b = getCapabilityRegistry();
      expect(a).not.toBe(b);
    });
  });

  describe("dispose", () => {
    it("stops forwarding registry events after dispose", () => {
      const events: CapabilityRefreshEvent[] = [];
      capabilityRegistry.onCapabilityChange((e) => events.push(e));

      capabilityRegistry.dispose();

      registerTestModule(moduleRegistry, "mod-a", [
        { capabilityId: "cap:one", name: "Cap One", description: "First" },
      ]);
      expect(events).toHaveLength(0);
    });
  });
});
