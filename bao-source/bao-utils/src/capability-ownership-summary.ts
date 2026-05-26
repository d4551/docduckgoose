/**
 * Capability ownership summary primitives.
 *
 * Aggregate counters for ownership entries, surfaces, and MCP surfaces.
 *
 * @baohaus/bao-utils/capability-ownership-summary
 */

import {
  CAPABILITY_OWNERSHIP_KINDS,
  CAPABILITY_OWNERSHIP_STATUSES,
  type CapabilityOwnershipEntry,
  type CapabilityOwnershipKind,
  type CapabilityOwnershipMcpSurface,
  type CapabilityOwnershipStatus,
  type CapabilityOwnershipSummary,
  type CapabilityOwnershipSurface,
} from "@baohaus/bao-schemas/capability-ownership.schemas";

/** Inferred type from the CapabilityOwnershipSurfaceSummary schema. */
export type CapabilityOwnershipSurfaceSummary = {
  total: number;
  surfaces: number;
  groups: number;
  kinds: number;
  owners: number;
  responsibilities: number;
  domains: number;
};

/** Inferred type from the CapabilityOwnershipMcpSurfaceSummary schema. */
export type CapabilityOwnershipMcpSurfaceSummary = {
  resources: number;
  tools: number;
  templates: number;
  total: number;
};

/**
 * Summarize MCP surfaces into aggregate counts.
 *
 * @param surfaces - MCP surfaces.
 * @returns Summary totals or null when unavailable.
 */
export function summarizeMcpSurfaces(
  surfaces: CapabilityOwnershipMcpSurface[] | null | undefined,
): CapabilityOwnershipMcpSurfaceSummary | null {
  if (!surfaces || surfaces.length === 0) {
    return null;
  }
  return surfaces.reduce(
    (accumulator, surface) => ({
      resources: accumulator.resources + surface.summary.resources,
      tools: accumulator.tools + surface.summary.tools,
      templates: accumulator.templates + surface.summary.templates,
      total: accumulator.total + surface.summary.total,
    }),
    { resources: 0, tools: 0, templates: 0, total: 0 },
  );
}

/**
 * Build ownership summary counts.
 *
 * @param entries - Ownership entries.
 * @returns Summary counts.
 */
export function buildCapabilityOwnershipSummary(
  entries: CapabilityOwnershipEntry[],
): CapabilityOwnershipSummary {
  const byKind: Record<CapabilityOwnershipKind, number> = {
    plugin: 0,
    bunbuddy: 0,
    library: 0,
    driver: 0,
    device: 0,
    bao: 0,
  };
  const byStatus: Record<CapabilityOwnershipStatus, number> = {
    registered: 0,
    healthy: 0,
    degraded: 0,
    unavailable: 0,
    available: 0,
    unreachable: 0,
    "not-configured": 0,
  };

  for (const entry of entries) {
    byKind[entry.kind] += 1;
    byStatus[entry.status] += 1;
  }

  return {
    total: entries.length,
    byKind,
    byStatus,
  };
}

/**
 * Merge two ownership summaries into a new summary.
 *
 * @param base - Base summary.
 * @param next - Additional summary to merge.
 * @returns Merged summary.
 */
export function mergeCapabilityOwnershipSummary(
  base: CapabilityOwnershipSummary,
  next: CapabilityOwnershipSummary,
): CapabilityOwnershipSummary {
  const merged: CapabilityOwnershipSummary = {
    total: base.total + next.total,
    byKind: { ...base.byKind },
    byStatus: { ...base.byStatus },
  };

  for (const kind of CAPABILITY_OWNERSHIP_KINDS) {
    merged.byKind[kind] += next.byKind[kind];
  }
  for (const status of CAPABILITY_OWNERSHIP_STATUSES) {
    merged.byStatus[status] += next.byStatus[status];
  }

  return merged;
}

/**
 * Build a summary for ownership surfaces.
 *
 * @param surfaces - Ownership surfaces to summarize.
 * @returns Surface summary counts.
 */
export function buildCapabilityOwnershipSurfaceSummary(
  surfaces: CapabilityOwnershipSurface[],
): CapabilityOwnershipSurfaceSummary {
  const groups = new Set<string>();
  const kinds = new Set<CapabilityOwnershipKind>();
  const owners = new Set<string>();
  const responsibilities = new Set<string>();
  const domains = new Set<string>();
  let total = 0;

  for (const surface of surfaces) {
    total += surface.summary.total;
    groups.add(surface.groupId);
    kinds.add(surface.kind);
    if (surface.owner) {
      owners.add(surface.owner);
    }
    if (surface.responsibility) {
      responsibilities.add(surface.responsibility);
    }
    for (const domainId of surface.domainIds ?? []) {
      domains.add(domainId);
    }
  }

  return {
    total,
    surfaces: surfaces.length,
    groups: groups.size,
    kinds: kinds.size,
    owners: owners.size,
    responsibilities: responsibilities.size,
    domains: domains.size,
  };
}

/**
 * Build a summary for MCP ownership surfaces.
 *
 * @param surfaces - MCP ownership surfaces to summarize.
 * @returns MCP surface summary counts.
 */
export function buildCapabilityOwnershipMcpSurfaceSummary(
  surfaces: CapabilityOwnershipMcpSurface[],
): CapabilityOwnershipMcpSurfaceSummary {
  return surfaces.reduce<CapabilityOwnershipMcpSurfaceSummary>(
    (acc, surface) => {
      acc.resources += surface.summary.resources;
      acc.tools += surface.summary.tools;
      acc.templates += surface.summary.templates;
      acc.total += surface.summary.total;
      return acc;
    },
    { resources: 0, tools: 0, templates: 0, total: 0 },
  );
}

/**
 * Resolve a summary count for a capability kind.
 *
 * @param summary - Ownership summary payload.
 * @param kind - Capability ownership kind.
 * @returns Count for the specified kind.
 */
export function resolveCapabilityOwnershipKindCount(
  summary: CapabilityOwnershipSummary,
  kind: CapabilityOwnershipKind,
): number {
  return summary.byKind[kind];
}

/**
 * Resolve a summary count for a capability status.
 *
 * @param summary - Ownership summary payload.
 * @param status - Capability ownership status.
 * @returns Count for the specified status.
 */
export function resolveCapabilityOwnershipStatusCount(
  summary: CapabilityOwnershipSummary,
  status: CapabilityOwnershipStatus,
): number {
  return summary.byStatus[status];
}
