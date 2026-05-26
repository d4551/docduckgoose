/**
 * Capability ownership surface builders.
 *
 * Produces ownership surfaces, attaches segment ids, and rolls up stack-level
 * summaries from segment collections.
 *
 * @baohaus/bao-utils/capability-ownership-surfaces
 */

import {
  CAPABILITY_OWNERSHIP_KINDS,
  type CapabilityOwnershipDomain,
  type CapabilityOwnershipEntry,
  type CapabilityOwnershipGroup,
  type CapabilityOwnershipKind,
  type CapabilityOwnershipMcpSurface,
  type CapabilityOwnershipSegment,
  type CapabilityOwnershipStackSummary,
  type CapabilityOwnershipSurface,
} from "@baohaus/bao-schemas/capability-ownership.schemas";
import { buildCapabilityOwnershipSummary } from "./capability-ownership-summary";

const EMPTY_ARRAY: string[] = [];

type SurfaceAttributeKey = "owner" | "responsibility";

/**
 * Resolve a shared attribute when all entries agree on the same value.
 *
 * @param entries - Ownership entries to inspect.
 * @param key - Attribute key to resolve.
 * @returns Shared attribute value or undefined when mixed.
 */
function resolveSurfaceAttribute(
  entries: CapabilityOwnershipEntry[],
  key: SurfaceAttributeKey,
): string | undefined {
  const values = new Set<string>();
  for (const entry of entries) {
    const raw = entry[key];
    if (typeof raw === "string" && raw.trim()) {
      values.add(raw);
    }
  }
  if (values.size !== 1) {
    return;
  }
  return Array.from(values.values())[0];
}

/**
 * Build surfaces for each ownership kind within a single group.
 *
 * @param group - Ownership group.
 * @param groupDomainMap - Map of group id to domain id list.
 * @param surfaces - Mutable surface accumulator.
 */
function buildGroupKindSurfaces(
  group: CapabilityOwnershipGroup,
  groupDomainMap: Map<string, string[]>,
  surfaces: CapabilityOwnershipSurface[],
): void {
  for (const kind of CAPABILITY_OWNERSHIP_KINDS) {
    const entries = group.entries.filter((entry: CapabilityOwnershipEntry) => entry.kind === kind);
    if (entries.length === 0) {
      continue;
    }

    const summary = buildCapabilityOwnershipSummary(entries);
    const domainIds = groupDomainMap.get(group.id) ?? EMPTY_ARRAY;
    const owner = group.owner ?? resolveSurfaceAttribute(entries, "owner");
    const responsibility =
      group.responsibility ?? resolveSurfaceAttribute(entries, "responsibility");

    surfaces.push({
      id: `${group.id}:${kind}`,
      groupId: group.id,
      groupLabel: group.label,
      kind,
      summary,
      ...(owner ? { owner } : {}),
      ...(responsibility ? { responsibility } : {}),
      ...(group.tags && group.tags.length > 0 ? { tags: group.tags } : {}),
      ...(domainIds.length > 0 ? { domainIds } : {}),
    });
  }
}

/**
 * Build ownership surfaces (group + kind slices) for capability ownership maps.
 *
 * @param options - Surface build inputs.
 * @returns Surface summaries.
 */
export function buildCapabilityOwnershipSurfaces(options: {
  groups: CapabilityOwnershipGroup[];
  domains?: CapabilityOwnershipDomain[];
}): CapabilityOwnershipSurface[] {
  const groupDomainMap = new Map<string, string[]>();
  for (const domain of options.domains ?? []) {
    for (const groupId of domain.groupIds ?? []) {
      const existing = groupDomainMap.get(groupId) ?? [];
      if (!existing.includes(domain.id)) {
        groupDomainMap.set(groupId, [...existing, domain.id]);
      }
    }
  }

  const surfaces: CapabilityOwnershipSurface[] = [];

  for (const group of options.groups) {
    buildGroupKindSurfaces(group, groupDomainMap, surfaces);
  }

  return surfaces;
}

/**
 * Attach segment identifiers to ownership surfaces based on segment membership.
 *
 * @param options - Surface/segment inputs.
 * @returns Updated surfaces and segments.
 */
export function attachSegmentIdsToSurfaces(options: {
  surfaces: CapabilityOwnershipSurface[];
  segments: CapabilityOwnershipSegment[];
}): { surfaces: CapabilityOwnershipSurface[]; segments: CapabilityOwnershipSegment[] } {
  const segmentIdsBySurface = new Map<string, string[]>();

  for (const segment of options.segments) {
    for (const surface of segment.surfaces) {
      const existing = segmentIdsBySurface.get(surface.id);
      if (!existing) {
        segmentIdsBySurface.set(surface.id, [segment.id]);
        continue;
      }
      if (!existing.includes(segment.id)) {
        existing.push(segment.id);
      }
    }
  }

  const surfaces = options.surfaces.map((surface) => {
    const segmentIds = segmentIdsBySurface.get(surface.id);
    if (!segmentIds || segmentIds.length === 0) {
      return surface;
    }
    return {
      ...surface,
      segmentIds,
    };
  });

  const surfaceMap = new Map(surfaces.map((surface) => [surface.id, surface]));
  const segments = options.segments.map((segment: CapabilityOwnershipSegment) => ({
    ...segment,
    surfaces: segment.surfaces.map(
      (surface: CapabilityOwnershipSurface) => surfaceMap.get(surface.id) ?? surface,
    ),
  }));

  return { surfaces, segments };
}

/**
 * Build segment lookup indexes by group id and domain id.
 *
 * @param segments - Ownership segments.
 * @returns Segment indexes by group and domain.
 */
function buildSegmentIndex(segments: CapabilityOwnershipSegment[]): {
  byGroup: Map<string, string[]>;
  byDomain: Map<string, string[]>;
} {
  const byGroup = new Map<string, string[]>();
  const byDomain = new Map<string, string[]>();

  for (const segment of segments) {
    for (const groupId of segment.groupIds) {
      const existing = byGroup.get(groupId) ?? [];
      if (!existing.includes(segment.id)) {
        byGroup.set(groupId, [...existing, segment.id]);
      }
    }
    for (const domainId of segment.domainIds ?? []) {
      const existing = byDomain.get(domainId) ?? [];
      if (!existing.includes(segment.id)) {
        byDomain.set(domainId, [...existing, segment.id]);
      }
    }
  }
  return { byGroup, byDomain };
}

/**
 * Resolve segment ids for an MCP surface from group/domain indexes.
 *
 * @param surface - MCP surface.
 * @param index - Segment indexes.
 * @returns Set of matched segment ids.
 */
function resolveSegmentIdsForSurface(
  surface: CapabilityOwnershipMcpSurface,
  index: { byGroup: Map<string, string[]>; byDomain: Map<string, string[]> },
): Set<string> {
  const segmentIds = new Set<string>();
  if (surface.groupId) {
    for (const segmentId of index.byGroup.get(surface.groupId) ?? []) {
      segmentIds.add(segmentId);
    }
  }
  if (segmentIds.size === 0) {
    for (const domainId of surface.domainIds ?? []) {
      for (const segmentId of index.byDomain.get(domainId) ?? []) {
        segmentIds.add(segmentId);
      }
    }
  }
  return segmentIds;
}

/**
 * Enrich each MCP surface with the segment identifiers that own it, preserving
 * the input array when either collection is empty.
 *
 * @param options - MCP surfaces and the candidate segments to match against.
 * @returns A new surface array with `segmentIds` populated, or the original when no matches apply.
 */
export function attachSegmentIdsToMcpSurfaces(options: {
  mcpSurfaces: CapabilityOwnershipMcpSurface[];
  segments: CapabilityOwnershipSegment[];
}): CapabilityOwnershipMcpSurface[] {
  if (options.mcpSurfaces.length === 0 || options.segments.length === 0) {
    return options.mcpSurfaces;
  }

  const index = buildSegmentIndex(options.segments);

  return options.mcpSurfaces.map((surface) => {
    const segmentIds = resolveSegmentIdsForSurface(surface, index);

    if (segmentIds.size === 0) {
      return surface;
    }

    return {
      ...surface,
      segmentIds: Array.from(segmentIds.values()),
    };
  });
}

/**
 * Build a stack summary for ownership segments.
 *
 * @param segments - Ownership segments included in the stack map.
 * @returns Stack summary counts.
 */
export function buildCapabilityOwnershipStackSummary(
  segments: CapabilityOwnershipSegment[],
): CapabilityOwnershipStackSummary {
  const owners = new Set<string>();
  const responsibilities = new Set<string>();
  const kinds = new Set<CapabilityOwnershipKind>();
  let total = 0;

  for (const segment of segments) {
    total += segment.summary.total;
    if (segment.owner) {
      owners.add(segment.owner);
    }
    if (segment.responsibility) {
      responsibilities.add(segment.responsibility);
    }
    for (const kind of segment.kinds ?? []) {
      kinds.add(kind);
    }
  }

  return {
    total,
    segments: segments.length,
    owners: owners.size,
    responsibilities: responsibilities.size,
    kinds: kinds.size,
  };
}
