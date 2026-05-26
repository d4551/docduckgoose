/**
 * Capability negotiation algorithm.
 *
 * Cohesion plan §3.4 — given a package's declared {@link BaoCapabilityDescriptor}
 * (what it asks for) plus a tenant budget plus a system policy, produce the
 * grant body (tier + resource envelope + fs rules + net policy + syscalls)
 * that the runtime spawner is authorized to enforce. Negotiation is a pure
 * function over three inputs; the issuer wraps the result with `issuedAt`,
 * `expiresAt`, and a detached Ed25519 signature.
 *
 * The result is a discriminated `Result` — `ok: true` carries the grant
 * body; `ok: false` carries a structured denial that the HTTP plugin maps
 * onto a 403 with i18n-keyed copy. No `try/catch`, no `unknown`.
 *
 * @module @baohaus/bao-sandbox-spec/negotiate
 */

import {
  type BaoCapabilityDescriptor,
  type BaoCapabilityFsLevel,
  type BaoCapabilityNetLevel,
  type BaoIsolationTier,
  capabilitySubsumes,
  tierAtLeast,
  validateCapability,
} from "./capabilities.ts";
import type { CapabilityResourceQuota, CapabilityResourceSchema } from "./resources.ts";
import type { BaoSandboxLandlockFsRule, BaoSandboxNet, BaoSandboxNetEgress } from "./schema.ts";

/**
 * Tenant-scoped resource budget that the orchestrator deducts from on each
 * grant issuance. Pulled from the registry's tenant config at negotiation
 * time; never trusted from the request body.
 */
export interface TenantCapabilityBudget {
  readonly tenantId: string;
  readonly maxTier: BaoIsolationTier;
  readonly resources: CapabilityResourceSchema;
  readonly fsAllowlist: readonly BaoSandboxLandlockFsRule[];
  readonly egressAllowlist: readonly BaoSandboxNetEgress[];
  readonly syscallAllowlist: readonly string[];
}

/**
 * System-level policy — global hard ceilings the orchestrator enforces
 * regardless of tenant budget. Sourced from the runtime config seam.
 */
export interface SystemCapabilityPolicy {
  readonly maxTier: BaoIsolationTier;
  readonly maxResources: CapabilityResourceSchema;
  readonly globalSyscallAllowlist: readonly string[];
  readonly globalFsAllowlist: readonly BaoSandboxLandlockFsRule[];
  readonly globalEgressAllowlist: readonly BaoSandboxNetEgress[];
}

/** Grant body — everything except issuer-stamped `issuedAt`/`expiresAt`/`signature`. */
export interface CapabilityGrantBody {
  readonly id: string;
  readonly packageId: string;
  readonly tenantId: string;
  readonly tier: BaoIsolationTier;
  readonly resources: CapabilityResourceSchema;
  readonly fs: readonly BaoSandboxLandlockFsRule[];
  readonly net: BaoSandboxNet;
  readonly syscalls: readonly string[];
}

/** Structured denial reason returned when negotiation refuses the request. */
export type NegotiationDenial =
  | { readonly kind: "package-invalid"; readonly field: string; readonly reason: string }
  | {
      readonly kind: "tier-exceeds-tenant";
      readonly requested: BaoIsolationTier;
      readonly tenantMax: BaoIsolationTier;
    }
  | {
      readonly kind: "tier-exceeds-system";
      readonly requested: BaoIsolationTier;
      readonly systemMax: BaoIsolationTier;
    }
  | {
      readonly kind: "resource-exceeds-tenant";
      readonly field: keyof CapabilityResourceSchema;
      readonly requested: number;
      readonly limit: number;
    }
  | {
      readonly kind: "resource-exceeds-system";
      readonly field: keyof CapabilityResourceSchema;
      readonly requested: number;
      readonly limit: number;
    }
  | {
      readonly kind: "fs-level-forbidden";
      readonly requested: BaoCapabilityFsLevel;
      readonly tenantMax: BaoCapabilityFsLevel;
    }
  | {
      readonly kind: "net-level-forbidden";
      readonly requested: BaoCapabilityNetLevel;
      readonly tenantMax: BaoCapabilityNetLevel;
    }
  | { readonly kind: "fs-path-not-allowlisted"; readonly path: string }
  | { readonly kind: "egress-not-allowlisted"; readonly host: string; readonly port: number }
  | { readonly kind: "tenant-budget-not-loaded"; readonly tenantId: string };

export type NegotiationResult =
  | { readonly ok: true; readonly grant: CapabilityGrantBody }
  | { readonly ok: false; readonly denial: NegotiationDenial };

interface NegotiationInput {
  readonly grantId: string;
  readonly packageId: string;
  readonly requested: BaoCapabilityDescriptor;
  readonly requestedFsRules: readonly BaoSandboxLandlockFsRule[];
  readonly requestedSyscalls: readonly string[];
  readonly tenant: TenantCapabilityBudget;
  readonly system: SystemCapabilityPolicy;
}

const FS_RANK: Readonly<Record<BaoCapabilityFsLevel, number>> = {
  none: 0,
  readonly: 1,
  scoped: 2,
  full: 3,
};

const NET_RANK: Readonly<Record<BaoCapabilityNetLevel, number>> = {
  none: 0,
  loopback: 1,
  "egress-allowlist": 2,
  full: 3,
};

function intersectQuota(
  requestedValue: number,
  tenant: CapabilityResourceQuota,
  system: CapabilityResourceQuota,
): CapabilityResourceQuota {
  const limit = Math.min(requestedValue, tenant.limit, system.limit);
  const request = Math.min(requestedValue, tenant.request, system.request, limit);
  const burst =
    tenant.burst !== undefined && system.burst !== undefined
      ? Math.min(tenant.burst, system.burst)
      : (tenant.burst ?? system.burst);
  const eviction = tenant.eviction ?? system.eviction ?? "hard";
  return burst !== undefined ? { request, limit, burst, eviction } : { request, limit, eviction };
}

function intersectOptionalQuota(
  requestedValue: number | undefined,
  tenant: CapabilityResourceQuota | undefined,
  system: CapabilityResourceQuota | undefined,
): CapabilityResourceQuota | undefined {
  if (requestedValue === undefined || tenant === undefined || system === undefined) {
    return undefined;
  }
  return intersectQuota(requestedValue, tenant, system);
}

function quotaBreaches(requestedValue: number, ceiling: CapabilityResourceQuota): boolean {
  return requestedValue > ceiling.limit;
}

function fsPathAllowed(
  rule: BaoSandboxLandlockFsRule,
  allowlist: readonly BaoSandboxLandlockFsRule[],
): boolean {
  for (const allowed of allowlist) {
    if (
      (rule.path === allowed.path || rule.path.startsWith(`${allowed.path}/`)) &&
      rule.access.every((access) => allowed.access.includes(access))
    ) {
      return true;
    }
  }
  return false;
}

function egressAllowed(
  entry: BaoSandboxNetEgress,
  allowlist: readonly BaoSandboxNetEgress[],
): boolean {
  for (const allowed of allowlist) {
    if (
      allowed.host === entry.host &&
      allowed.port === entry.port &&
      allowed.protocol === entry.protocol
    ) {
      return true;
    }
  }
  return false;
}

function projectResources(
  requested: BaoCapabilityDescriptor,
  tenant: CapabilityResourceSchema,
  system: CapabilityResourceSchema,
): CapabilityResourceSchema {
  return {
    cpuMilli: intersectQuota(requested.cpuMilli, tenant.cpuMilli, system.cpuMilli),
    memMiB: intersectQuota(requested.memMiB, tenant.memMiB, system.memMiB),
    pidLimit: intersectQuota(requested.pidLimit, tenant.pidLimit, system.pidLimit),
    diskMiB: {
      request: tenant.diskMiB.request,
      limit: Math.min(tenant.diskMiB.limit, system.diskMiB.limit),
      eviction: tenant.diskMiB.eviction ?? "hard",
    },
    concurrencyLimit: {
      request: tenant.concurrencyLimit.request,
      limit: Math.min(tenant.concurrencyLimit.limit, system.concurrencyLimit.limit),
      eviction: tenant.concurrencyLimit.eviction ?? "hard",
    },
    requestsPerSecond: {
      request: tenant.requestsPerSecond.request,
      limit: Math.min(tenant.requestsPerSecond.limit, system.requestsPerSecond.limit),
      eviction: tenant.requestsPerSecond.eviction ?? "hard",
    },
    wallClockMs: {
      request: requested.wallMs ?? tenant.wallClockMs.request,
      limit: Math.min(
        requested.wallMs ?? tenant.wallClockMs.limit,
        tenant.wallClockMs.limit,
        system.wallClockMs.limit,
      ),
      eviction: tenant.wallClockMs.eviction ?? "hard",
    },
    ...(intersectOptionalQuota(
      requested.gpu ? tenant.gpuMilli?.request : undefined,
      tenant.gpuMilli,
      system.gpuMilli,
    ) !== undefined
      ? {
          gpuMilli: intersectOptionalQuota(
            tenant.gpuMilli?.request ?? 0,
            tenant.gpuMilli,
            system.gpuMilli,
          ),
        }
      : {}),
    ...(tenant.bandwidthKbps !== undefined && system.bandwidthKbps !== undefined
      ? {
          bandwidthKbps: intersectQuota(
            tenant.bandwidthKbps.request,
            tenant.bandwidthKbps,
            system.bandwidthKbps,
          ),
        }
      : {}),
  };
}

function buildNetPolicy(
  requested: BaoCapabilityDescriptor,
  tenantEgress: readonly BaoSandboxNetEgress[],
  systemEgress: readonly BaoSandboxNetEgress[],
):
  | { readonly ok: true; readonly net: BaoSandboxNet }
  | { readonly ok: false; readonly denial: NegotiationDenial } {
  if (requested.net === "none") {
    return { ok: true, net: { mode: "none" } };
  }
  if (requested.net === "loopback") {
    return { ok: true, net: { mode: "loopback" } };
  }
  if (requested.net === "full") {
    return { ok: true, net: { mode: "full" } };
  }
  const egress = requested.egress ?? [];
  for (const entry of egress) {
    const sandboxEntry: BaoSandboxNetEgress = {
      host: entry.host,
      port: entry.port,
      protocol: entry.protocol === "https" ? "tcp" : entry.protocol,
    };
    if (!egressAllowed(sandboxEntry, tenantEgress) || !egressAllowed(sandboxEntry, systemEgress)) {
      return {
        ok: false,
        denial: { kind: "egress-not-allowlisted", host: entry.host, port: entry.port },
      };
    }
  }
  const projected: readonly BaoSandboxNetEgress[] = egress.map((entry) => ({
    host: entry.host,
    port: entry.port,
    protocol: entry.protocol === "https" ? "tcp" : entry.protocol,
  }));
  return { ok: true, net: { mode: "egress-allowlist", egress: projected } };
}

/**
 * Negotiate a capability grant.
 *
 * Three inputs intersect:
 *   1. **Requested** — what the package asks for in its manifest.
 *   2. **Tenant** — what the registered org / user is allowed to consume.
 *   3. **System** — the orchestrator's global ceiling.
 *
 * The resulting grant body is the intersection. If any of the three steps
 * cannot be satisfied, a structured `NegotiationDenial` is returned.
 */
export function negotiateCapability(input: NegotiationInput): NegotiationResult {
  const baseValidation = validateCapability(input.requested);
  if (!baseValidation.ok) {
    return {
      ok: false,
      denial: {
        kind: "package-invalid",
        field: baseValidation.field,
        reason: baseValidation.reason,
      },
    };
  }

  if (!tierAtLeast(input.tenant.maxTier, input.requested.minTier)) {
    return {
      ok: false,
      denial: {
        kind: "tier-exceeds-tenant",
        requested: input.requested.minTier,
        tenantMax: input.tenant.maxTier,
      },
    };
  }
  if (!tierAtLeast(input.system.maxTier, input.requested.minTier)) {
    return {
      ok: false,
      denial: {
        kind: "tier-exceeds-system",
        requested: input.requested.minTier,
        systemMax: input.system.maxTier,
      },
    };
  }

  const tenantCeilingDescriptor: BaoCapabilityDescriptor = {
    fs: input.tenant.maxTier === "B3" ? "full" : "scoped",
    net: input.tenant.maxTier === "B3" ? "full" : "egress-allowlist",
    cpuMilli: input.tenant.resources.cpuMilli.limit,
    memMiB: input.tenant.resources.memMiB.limit,
    pidLimit: input.tenant.resources.pidLimit.limit,
    gpu: input.tenant.resources.gpuMilli !== undefined,
    persistentVolume: true,
    minTier: input.tenant.maxTier,
  };
  if (!capabilitySubsumes(tenantCeilingDescriptor, input.requested)) {
    if (FS_RANK[input.requested.fs] > FS_RANK[tenantCeilingDescriptor.fs]) {
      return {
        ok: false,
        denial: {
          kind: "fs-level-forbidden",
          requested: input.requested.fs,
          tenantMax: tenantCeilingDescriptor.fs,
        },
      };
    }
    if (NET_RANK[input.requested.net] > NET_RANK[tenantCeilingDescriptor.net]) {
      return {
        ok: false,
        denial: {
          kind: "net-level-forbidden",
          requested: input.requested.net,
          tenantMax: tenantCeilingDescriptor.net,
        },
      };
    }
  }

  if (quotaBreaches(input.requested.cpuMilli, input.tenant.resources.cpuMilli)) {
    return {
      ok: false,
      denial: {
        kind: "resource-exceeds-tenant",
        field: "cpuMilli",
        requested: input.requested.cpuMilli,
        limit: input.tenant.resources.cpuMilli.limit,
      },
    };
  }
  if (quotaBreaches(input.requested.memMiB, input.tenant.resources.memMiB)) {
    return {
      ok: false,
      denial: {
        kind: "resource-exceeds-tenant",
        field: "memMiB",
        requested: input.requested.memMiB,
        limit: input.tenant.resources.memMiB.limit,
      },
    };
  }
  if (quotaBreaches(input.requested.pidLimit, input.tenant.resources.pidLimit)) {
    return {
      ok: false,
      denial: {
        kind: "resource-exceeds-tenant",
        field: "pidLimit",
        requested: input.requested.pidLimit,
        limit: input.tenant.resources.pidLimit.limit,
      },
    };
  }

  if (quotaBreaches(input.requested.cpuMilli, input.system.maxResources.cpuMilli)) {
    return {
      ok: false,
      denial: {
        kind: "resource-exceeds-system",
        field: "cpuMilli",
        requested: input.requested.cpuMilli,
        limit: input.system.maxResources.cpuMilli.limit,
      },
    };
  }
  if (quotaBreaches(input.requested.memMiB, input.system.maxResources.memMiB)) {
    return {
      ok: false,
      denial: {
        kind: "resource-exceeds-system",
        field: "memMiB",
        requested: input.requested.memMiB,
        limit: input.system.maxResources.memMiB.limit,
      },
    };
  }

  for (const rule of input.requestedFsRules) {
    if (
      !fsPathAllowed(rule, input.tenant.fsAllowlist) ||
      !fsPathAllowed(rule, input.system.globalFsAllowlist)
    ) {
      return { ok: false, denial: { kind: "fs-path-not-allowlisted", path: rule.path } };
    }
  }

  const netResult = buildNetPolicy(
    input.requested,
    input.tenant.egressAllowlist,
    input.system.globalEgressAllowlist,
  );
  if (!netResult.ok) {
    return netResult;
  }

  const projectedResources = projectResources(
    input.requested,
    input.tenant.resources,
    input.system.maxResources,
  );

  const syscalls = input.requestedSyscalls.filter(
    (call) =>
      input.tenant.syscallAllowlist.includes(call) &&
      input.system.globalSyscallAllowlist.includes(call),
  );

  return {
    ok: true,
    grant: {
      id: input.grantId,
      packageId: input.packageId,
      tenantId: input.tenant.tenantId,
      tier: input.requested.minTier,
      resources: projectedResources,
      fs: input.requestedFsRules,
      net: netResult.net,
      syscalls,
    },
  };
}

export type { NegotiationInput };
