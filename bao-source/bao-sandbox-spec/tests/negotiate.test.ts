import { describe, expect, test } from "bun:test";
import type { BaoCapabilityDescriptor } from "../src/capabilities.ts";
import {
  negotiateCapability,
  type SystemCapabilityPolicy,
  type TenantCapabilityBudget,
} from "../src/negotiate.ts";
import type { CapabilityResourceSchema } from "../src/resources.ts";

const quota = (request: number, limit: number) => ({
  request,
  limit,
  eviction: "hard" as const,
});

const fullResources = (factor: number): CapabilityResourceSchema => ({
  cpuMilli: quota(1000 * factor, 2000 * factor),
  memMiB: quota(512 * factor, 2048 * factor),
  pidLimit: quota(32 * factor, 256 * factor),
  diskMiB: quota(1024 * factor, 8192 * factor),
  concurrencyLimit: quota(4 * factor, 32 * factor),
  requestsPerSecond: quota(10 * factor, 100 * factor),
  wallClockMs: quota(5_000 * factor, 30_000 * factor),
});

const baseTenant = (): TenantCapabilityBudget => ({
  tenantId: "tenant-a",
  maxTier: "B3",
  resources: fullResources(2),
  fsAllowlist: [{ path: "/work", access: ["read", "write"] }],
  egressAllowlist: [{ host: "api.example.com", port: 443, protocol: "tcp" }],
  syscallAllowlist: ["read", "write", "openat"],
});

const baseSystem = (): SystemCapabilityPolicy => ({
  maxTier: "B3",
  maxResources: fullResources(4),
  globalSyscallAllowlist: ["read", "write", "openat", "fstat"],
  globalFsAllowlist: [{ path: "/work", access: ["read", "write"] }],
  globalEgressAllowlist: [{ host: "api.example.com", port: 443, protocol: "tcp" }],
});

const baseRequested = (): BaoCapabilityDescriptor => ({
  fs: "scoped",
  net: "egress-allowlist",
  cpuMilli: 500,
  memMiB: 256,
  pidLimit: 16,
  gpu: false,
  persistentVolume: true,
  minTier: "B1",
  mounts: [{ name: "data", mode: "rw", maxMiB: 64 }],
  egress: [{ host: "api.example.com", port: 443, protocol: "tcp" }],
});

describe("negotiateCapability", () => {
  test("ok path: returns grant with intersected resources", () => {
    const result = negotiateCapability({
      grantId: "g1",
      packageId: "pkg-a@1.0.0",
      requested: baseRequested(),
      requestedFsRules: [{ path: "/work/data", access: ["read", "write"] }],
      requestedSyscalls: ["read", "write"],
      tenant: baseTenant(),
      system: baseSystem(),
    });
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.grant.id).toBe("g1");
    expect(result.grant.tenantId).toBe("tenant-a");
    expect(result.grant.tier).toBe("B1");
    expect(result.grant.resources.cpuMilli.limit).toBeLessThanOrEqual(500);
    expect(result.grant.syscalls).toEqual(["read", "write"]);
    expect(result.grant.net.mode).toBe("egress-allowlist");
  });

  test("denies when requested CPU exceeds tenant limit", () => {
    const tenant = baseTenant();
    const result = negotiateCapability({
      grantId: "g2",
      packageId: "pkg-a@1.0.0",
      requested: { ...baseRequested(), cpuMilli: tenant.resources.cpuMilli.limit + 1 },
      requestedFsRules: [],
      requestedSyscalls: [],
      tenant,
      system: baseSystem(),
    });
    expect(result.ok).toBe(false);
    if (result.ok) {
      return;
    }
    expect(result.denial.kind).toBe("resource-exceeds-tenant");
    if (result.denial.kind === "resource-exceeds-tenant") {
      expect(result.denial.field).toBe("cpuMilli");
    }
  });

  test("denies when fs path is outside tenant allowlist", () => {
    const result = negotiateCapability({
      grantId: "g3",
      packageId: "pkg-a@1.0.0",
      requested: baseRequested(),
      requestedFsRules: [{ path: "/etc/passwd", access: ["read"] }],
      requestedSyscalls: [],
      tenant: baseTenant(),
      system: baseSystem(),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.denial.kind).toBe("fs-path-not-allowlisted");
    }
  });

  test("denies when egress entry not in tenant allowlist", () => {
    const result = negotiateCapability({
      grantId: "g4",
      packageId: "pkg-a@1.0.0",
      requested: { ...baseRequested(), egress: [{ host: "evil.com", port: 443, protocol: "tcp" }] },
      requestedFsRules: [],
      requestedSyscalls: [],
      tenant: baseTenant(),
      system: baseSystem(),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.denial.kind).toBe("egress-not-allowlisted");
    }
  });

  test("filters syscalls down to intersection of tenant + system", () => {
    const result = negotiateCapability({
      grantId: "g5",
      packageId: "pkg-a@1.0.0",
      requested: baseRequested(),
      requestedFsRules: [],
      requestedSyscalls: ["read", "write", "execve", "openat", "fstat"],
      tenant: baseTenant(),
      system: baseSystem(),
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.grant.syscalls).toEqual(["read", "write", "openat"]);
    }
  });

  test("denies when tier exceeds tenant max", () => {
    const tenant: TenantCapabilityBudget = { ...baseTenant(), maxTier: "B1" };
    const result = negotiateCapability({
      grantId: "g6",
      packageId: "pkg-a@1.0.0",
      requested: { ...baseRequested(), minTier: "B3" },
      requestedFsRules: [],
      requestedSyscalls: [],
      tenant,
      system: baseSystem(),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.denial.kind).toBe("tier-exceeds-tenant");
    }
  });
});
