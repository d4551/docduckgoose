/**
 * Capability ownership map builders.
 *
 * Composes category, stack, owner-map, and matrix payloads from segment
 * collections.
 *
 * @baohaus/bao-utils/capability-ownership-maps
 */

import {
  CAPABILITY_OWNERSHIP_KINDS,
  type CapabilityOwnershipCategory,
  type CapabilityOwnershipCategoryMap,
  type CapabilityOwnershipKind,
  type CapabilityOwnershipMatrix,
  type CapabilityOwnershipMatrixCell,
  type CapabilityOwnershipMatrixRow,
  type CapabilityOwnershipMcpSurface,
  type CapabilityOwnershipOwnerMap,
  type CapabilityOwnershipOwnerMapMatrix,
  type CapabilityOwnershipOwnerMapMatrixRow,
  type CapabilityOwnershipSegment,
  type CapabilityOwnershipStackMap,
  type CapabilityOwnershipSummary,
  type CapabilityOwnershipSurface,
} from "@baohaus/bao-schemas/capability-ownership.schemas";
import {
  buildCapabilityOwnershipMcpSurfaceSummary,
  buildCapabilityOwnershipSummary,
  buildCapabilityOwnershipSurfaceSummary,
  mergeCapabilityOwnershipSummary,
} from "./capability-ownership-summary";
import { buildCapabilityOwnershipStackSummary } from "./capability-ownership-surfaces";

const EMPTY_ARRAY: string[] = [];

/**
 * Deduplicate items by id.
 *
 * @param items - Candidate items.
 * @returns Deduplicated items preserving first occurrence.
 */
function dedupeById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    if (seen.has(item.id)) {
      continue;
    }
    seen.add(item.id);
    result.push(item);
  }
  return result;
}

/**
 * Build a single category entry from an ownership segment with surface summaries.
 *
 * @param segment - Ownership segment.
 * @param surfaces - All ownership surfaces.
 * @param mcpSurfaces - All MCP surfaces.
 * @returns Category entry.
 */
function buildCategoryFromSegment(
  segment: CapabilityOwnershipSegment,
  surfaces: CapabilityOwnershipSurface[],
  mcpSurfaces: CapabilityOwnershipMcpSurface[],
): CapabilityOwnershipCategory {
  const surfaceMatches = surfaces.filter((surface) =>
    (surface.segmentIds ?? EMPTY_ARRAY).includes(segment.id),
  );
  const mcpMatches = mcpSurfaces.filter((surface) =>
    (surface.segmentIds ?? EMPTY_ARRAY).includes(segment.id),
  );
  return {
    id: segment.id,
    label: segment.label,
    ...(segment.owner ? { owner: segment.owner } : {}),
    ...(segment.responsibility ? { responsibility: segment.responsibility } : {}),
    summary: segment.summary,
    kinds: segment.kinds ?? [],
    domainIds: segment.domainIds ?? [],
    groupIds: segment.groupIds ?? [],
    ...(segment.tags && segment.tags.length > 0 ? { tags: segment.tags } : {}),
    ...(surfaceMatches.length > 0
      ? { surfaceSummary: buildCapabilityOwnershipSurfaceSummary(surfaceMatches) }
      : {}),
    ...(mcpMatches.length > 0
      ? { mcpSummary: buildCapabilityOwnershipMcpSurfaceSummary(mcpMatches) }
      : {}),
  };
}

/**
 * Build a category map payload for focused ownership segments.
 *
 * @param options - Category map inputs.
 * @returns Category map payload.
 */
export function buildCapabilityOwnershipCategoryMap(options: {
  segmentIds: string[];
  segments: CapabilityOwnershipSegment[];
  surfaces?: CapabilityOwnershipSurface[];
  mcpSurfaces?: CapabilityOwnershipMcpSurface[];
}): CapabilityOwnershipCategoryMap {
  const segmentMap = new Map(
    options.segments.map((segment: CapabilityOwnershipSegment) => [segment.id, segment]),
  );
  const categories: CapabilityOwnershipCategory[] = [];
  const selectedSegments: CapabilityOwnershipSegment[] = [];

  for (const segmentId of options.segmentIds) {
    const segment = segmentMap.get(segmentId);
    if (!segment) {
      continue;
    }
    selectedSegments.push(segment);
    categories.push(
      buildCategoryFromSegment(segment, options.surfaces ?? [], options.mcpSurfaces ?? []),
    );
  }

  const summary = selectedSegments.reduce(
    (acc: CapabilityOwnershipSummary, segment: CapabilityOwnershipSegment) =>
      mergeCapabilityOwnershipSummary(acc, segment.summary),
    buildCapabilityOwnershipSummary([]),
  );
  const stack = buildCapabilityOwnershipStackSummary(selectedSegments);
  const surfaceSummary = dedupeById(
    (options.surfaces ?? []).filter((surface) =>
      categories.some((category) => (surface.segmentIds ?? EMPTY_ARRAY).includes(category.id)),
    ),
  );
  const mcpSummary = dedupeById(
    (options.mcpSurfaces ?? []).filter((surface) =>
      categories.some((category) => (surface.segmentIds ?? EMPTY_ARRAY).includes(category.id)),
    ),
  );

  return {
    categoryIds: categories.map((category) => category.id),
    categories,
    summary,
    stack,
    ...(surfaceSummary.length > 0
      ? { surfaceSummary: buildCapabilityOwnershipSurfaceSummary(surfaceSummary) }
      : {}),
    ...(mcpSummary.length > 0
      ? { mcpSummary: buildCapabilityOwnershipMcpSurfaceSummary(mcpSummary) }
      : {}),
  };
}

/**
 * Build a stack map payload for ownership segments.
 *
 * @param options - Stack map inputs.
 * @returns Stack map payload.
 */
export function buildCapabilityOwnershipStackMap(options: {
  segmentIds: string[];
  segments: CapabilityOwnershipSegment[];
  mcpSurfaces?: CapabilityOwnershipMcpSurface[];
}): CapabilityOwnershipStackMap {
  const segmentIdSet = new Set(options.segmentIds);
  const mcpSummary = dedupeById(
    (options.mcpSurfaces ?? []).filter((surface) =>
      (surface.segmentIds ?? EMPTY_ARRAY).some((segmentId: string) => segmentIdSet.has(segmentId)),
    ),
  );
  return {
    segmentIds: options.segmentIds,
    segments: options.segments,
    summary: buildCapabilityOwnershipStackSummary(options.segments),
    ...(mcpSummary.length > 0
      ? { mcpSummary: buildCapabilityOwnershipMcpSurfaceSummary(mcpSummary) }
      : {}),
  };
}

/**
 * Build an owner-map matrix payload for ownership sections and segments.
 *
 * @param options - Owner-map matrix inputs.
 * @returns Owner-map matrix payload.
 */
export function buildCapabilityOwnershipOwnerMapMatrix(options: {
  ownerMap: CapabilityOwnershipOwnerMap;
  segments: CapabilityOwnershipSegment[];
}): CapabilityOwnershipOwnerMapMatrix {
  const segmentMap = new Map(
    options.segments.map((segment: CapabilityOwnershipSegment) => [segment.id, segment]),
  );
  const rows: CapabilityOwnershipOwnerMapMatrixRow[] = [];
  const segmentIds = options.segments.map((segment: CapabilityOwnershipSegment) => segment.id);

  for (const section of options.ownerMap.sections) {
    const domainIds = section.domainIds ?? [];
    const groupIds = section.groupIds ?? [];
    const domainSet = new Set(domainIds);
    const groupSet = new Set(groupIds);
    const matchedSegmentIds = segmentIds.filter((segmentId) => {
      const segment = segmentMap.get(segmentId);
      if (!segment) {
        return false;
      }
      const domainMatch = (segment.domainIds ?? []).some((id: string) => domainSet.has(id));
      const groupMatch = segment.groupIds.some((id: string) => groupSet.has(id));
      return domainMatch || groupMatch;
    });

    rows.push({
      id: section.id,
      label: section.label,
      ...(section.owner ? { owner: section.owner } : {}),
      ...(section.responsibility ? { responsibility: section.responsibility } : {}),
      domainIds,
      groupIds,
      segmentIds: matchedSegmentIds,
      summary: section.summary,
      ...(section.tags ? { tags: section.tags } : {}),
    });
  }

  return {
    segmentIds,
    rows,
    summary: options.ownerMap.summary,
  };
}

/**
 * Build a matrix payload for ownership segments.
 *
 * @param options - Matrix inputs.
 * @returns Matrix payload.
 */
export function buildCapabilityOwnershipMatrix(options: {
  segmentIds: string[];
  segments: CapabilityOwnershipSegment[];
  kindOrder?: CapabilityOwnershipKind[] | undefined;
}): CapabilityOwnershipMatrix {
  const segmentMap = new Map(
    options.segments.map((segment: CapabilityOwnershipSegment) => [segment.id, segment]),
  );
  const kindOrder =
    options.kindOrder && options.kindOrder.length > 0
      ? options.kindOrder
      : [...CAPABILITY_OWNERSHIP_KINDS];
  const rows: CapabilityOwnershipMatrixRow[] = [];
  let summary = buildCapabilityOwnershipSummary([]);

  for (const segmentId of options.segmentIds) {
    const segment = segmentMap.get(segmentId);
    if (!segment) {
      continue;
    }

    const cells: CapabilityOwnershipMatrixCell[] = kindOrder.map((kind) => {
      let cellSummary = buildCapabilityOwnershipSummary([]);
      for (const surface of segment.surfaces.filter(
        (s: CapabilityOwnershipSurface) => s.kind === kind,
      )) {
        cellSummary = mergeCapabilityOwnershipSummary(cellSummary, surface.summary);
      }
      return { kind, summary: cellSummary };
    });

    rows.push({
      id: segment.id,
      label: segment.label,
      ...(segment.owner ? { owner: segment.owner } : {}),
      ...(segment.responsibility ? { responsibility: segment.responsibility } : {}),
      ...(segment.domainIds ? { domainIds: segment.domainIds } : {}),
      ...(segment.tags ? { tags: segment.tags } : {}),
      summary: segment.summary,
      cells,
    });

    summary = mergeCapabilityOwnershipSummary(summary, segment.summary);
  }

  return {
    segmentIds: options.segmentIds,
    kindOrder,
    rows,
    summary,
  };
}
