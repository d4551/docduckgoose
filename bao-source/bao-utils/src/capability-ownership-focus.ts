/**
 * Capability ownership focus and coverage builders.
 *
 * Produces focus snapshots, focused/coverage map payloads, and the highlight
 * ordering used to surface specific ownership segments.
 *
 * @baohaus/bao-utils/capability-ownership-focus
 */

import type {
  CapabilityOwnershipCategoryMap,
  CapabilityOwnershipCoverageMap,
  CapabilityOwnershipCoverageSegment,
  CapabilityOwnershipDomain,
  CapabilityOwnershipFocus,
  CapabilityOwnershipFocusMap,
  CapabilityOwnershipKind,
  CapabilityOwnershipMapResponse,
  CapabilityOwnershipMatrixCell,
  CapabilityOwnershipMcpSurface,
  CapabilityOwnershipSegment,
  CapabilityOwnershipSummary,
  CapabilityOwnershipSurface,
} from "@baohaus/bao-schemas/capability-ownership.schemas";
import { buildCapabilityOwnershipMatrix } from "./capability-ownership-maps";
import {
  buildCapabilityOwnershipSummary,
  mergeCapabilityOwnershipSummary,
} from "./capability-ownership-summary";

const EMPTY_ARRAY: string[] = [];

/**
 * Resolve focus metadata for capability ownership map payloads.
 *
 * @param map - Capability ownership map response payload.
 * @returns Focus metadata with resolved segments/domains.
 */
export function resolveCapabilityOwnershipFocus(
  map: CapabilityOwnershipMapResponse | null,
): CapabilityOwnershipFocus {
  if (!map) {
    return { segmentIds: [], domainIds: [] };
  }

  const segments = map.segments ?? [];
  const domains = map.domains ?? [];
  const focus = map.focus;

  const fallbackSegmentIds = map.highlights?.segments?.length
    ? map.highlights.segments
    : (map.stackMap?.segmentIds ?? []);
  const candidateSegmentIds = focus?.segmentIds?.length ? focus.segmentIds : fallbackSegmentIds;

  const segmentMap = new Map(
    segments.map((segment: CapabilityOwnershipSegment) => [segment.id, segment]),
  );
  const resolvedSegmentIds = candidateSegmentIds.filter((id: string) => segmentMap.has(id));
  const resolvedSegments = resolvedSegmentIds
    .map((id: string) => segmentMap.get(id))
    .filter(
      (segment: CapabilityOwnershipSegment | undefined): segment is CapabilityOwnershipSegment =>
        Boolean(segment),
    );

  const domainMap = new Map(domains.map((domain: { id: string }) => [domain.id, domain]));
  const candidateDomainIds: string[] = (
    focus?.domainIds?.length
      ? focus.domainIds
      : resolvedSegments.flatMap(
          (segment: CapabilityOwnershipSegment) => segment.domainIds ?? EMPTY_ARRAY,
        )
  ) as string[];
  const resolvedDomainIds = Array.from(
    new Set(candidateDomainIds.filter((id) => domainMap.has(id))),
  );

  return {
    segmentIds: resolvedSegmentIds,
    domainIds: resolvedDomainIds,
  };
}

/**
 * Resolve highlight segment ordering against available segments.
 *
 * @param options - Highlight ordering inputs.
 * @returns Ordered segment ids present in the segment list.
 */
export function resolveCapabilityOwnershipHighlightOrder(options: {
  highlightSegmentIds?: string[];
  segments: CapabilityOwnershipSegment[];
}): string[] {
  const highlightSegmentIds = options.highlightSegmentIds ?? EMPTY_ARRAY;
  if (highlightSegmentIds.length === 0) {
    return [];
  }
  const segmentIdSet = new Set(
    options.segments.map((segment: CapabilityOwnershipSegment) => segment.id),
  );
  return highlightSegmentIds.filter((segmentId) => segmentIdSet.has(segmentId));
}

/**
 * Focused ownership snapshot derived from a capability ownership map.
 */
export type CapabilityOwnershipFocusSnapshot = {
  focus?: CapabilityOwnershipFocus;
  segments: CapabilityOwnershipSegment[];
  summary: CapabilityOwnershipSummary;
};

/**
 * Build a focus snapshot from a capability ownership map.
 *
 * @param map - Capability ownership map payload.
 * @returns Focus snapshot with resolved segments and summary.
 */
export function buildCapabilityOwnershipFocusSnapshot(
  map: CapabilityOwnershipMapResponse | null,
): CapabilityOwnershipFocusSnapshot {
  const emptySummary = buildCapabilityOwnershipSummary([]);
  if (!map) {
    return { segments: [], summary: emptySummary };
  }

  const resolvedFocus = resolveCapabilityOwnershipFocus(map);
  const segments = map.segments ?? [];
  const segmentMap = new Map(
    segments.map((segment: CapabilityOwnershipSegment) => [segment.id, segment]),
  );
  const focusSegments = resolvedFocus.segmentIds.length
    ? resolvedFocus.segmentIds
        .map((segmentId: string) => segmentMap.get(segmentId))
        .filter(
          (
            segment: CapabilityOwnershipSegment | undefined,
          ): segment is CapabilityOwnershipSegment => Boolean(segment),
        )
    : segments;
  const summary =
    focusSegments.length > 0
      ? focusSegments.reduce(
          (acc: CapabilityOwnershipSummary, segment: CapabilityOwnershipSegment) =>
            mergeCapabilityOwnershipSummary(acc, segment.summary),
          emptySummary,
        )
      : emptySummary;

  return {
    ...(resolvedFocus.segmentIds.length > 0 ? { focus: resolvedFocus } : {}),
    segments: focusSegments,
    summary,
  };
}

/**
 * Build a focused ownership map for a subset of segments/domains.
 *
 * @param options - Focus map inputs.
 * @returns Focus ownership map payload.
 */
export function buildCapabilityOwnershipFocusMap(options: {
  focus: CapabilityOwnershipFocus;
  segments: CapabilityOwnershipSegment[];
  domains: CapabilityOwnershipDomain[];
  surfaces: CapabilityOwnershipSurface[];
  mcpSurfaces?: CapabilityOwnershipMcpSurface[];
  categoryMap?: CapabilityOwnershipCategoryMap;
  highlights?: string[];
}): CapabilityOwnershipFocusMap {
  const focusSegmentIds = new Set(options.focus.segmentIds);
  const focusDomainIds = new Set(options.focus.domainIds);

  const segments =
    focusSegmentIds.size > 0
      ? options.segments.filter((segment) => focusSegmentIds.has(segment.id))
      : options.segments;

  const domains =
    focusDomainIds.size > 0
      ? options.domains.filter((domain) => focusDomainIds.has(domain.id))
      : options.domains;

  const surfaces =
    focusSegmentIds.size > 0 || focusDomainIds.size > 0
      ? options.surfaces.filter((surface) => {
          const segmentMatch =
            surface.segmentIds?.some((segmentId: string) => focusSegmentIds.has(segmentId)) ??
            false;
          const domainMatch =
            surface.domainIds?.some((domainId: string) => focusDomainIds.has(domainId)) ?? false;
          return segmentMatch || domainMatch;
        })
      : options.surfaces;

  const mcpSurfaces = options.mcpSurfaces
    ? focusSegmentIds.size > 0 || focusDomainIds.size > 0
      ? options.mcpSurfaces.filter((surface) => {
          const segmentMatch =
            surface.segmentIds?.some((segmentId: string) => focusSegmentIds.has(segmentId)) ??
            false;
          const domainMatch =
            surface.domainIds?.some((domainId: string) => focusDomainIds.has(domainId)) ?? false;
          return segmentMatch || domainMatch;
        })
      : options.mcpSurfaces
    : undefined;

  const summary =
    segments.length > 0
      ? segments.reduce(
          (acc: CapabilityOwnershipSummary, segment: CapabilityOwnershipSegment) =>
            mergeCapabilityOwnershipSummary(acc, segment.summary),
          buildCapabilityOwnershipSummary([]),
        )
      : buildCapabilityOwnershipSummary([]);

  const highlightSegments = options.highlights
    ? resolveCapabilityOwnershipHighlightOrder({
        highlightSegmentIds: options.highlights,
        segments,
      })
    : [];

  return {
    focus: options.focus,
    segments,
    domains,
    surfaces,
    ...(mcpSurfaces ? { mcpSurfaces } : {}),
    ...(options.categoryMap ? { categoryMap: options.categoryMap } : {}),
    ...(highlightSegments.length > 0 ? { highlights: { segments: highlightSegments } } : {}),
    summary,
  };
}

/**
 * Build a coverage ownership map for a subset of segments/domains.
 *
 * @param options - Coverage map inputs.
 * @returns Coverage ownership map payload.
 */
export function buildCapabilityOwnershipCoverageMap(options: {
  focus: CapabilityOwnershipFocus;
  segments: CapabilityOwnershipSegment[];
  domains: CapabilityOwnershipDomain[];
  surfaces: CapabilityOwnershipSurface[];
  mcpSurfaces?: CapabilityOwnershipMcpSurface[];
  kindOrder?: CapabilityOwnershipKind[];
}): CapabilityOwnershipCoverageMap {
  const focusSegmentIds = new Set(options.focus.segmentIds);
  const focusDomainIds = new Set(options.focus.domainIds);

  const segments =
    focusSegmentIds.size > 0
      ? options.segments.filter((segment) => focusSegmentIds.has(segment.id))
      : options.segments;

  const domains =
    focusDomainIds.size > 0
      ? options.domains.filter((domain) => focusDomainIds.has(domain.id))
      : options.domains;

  const surfaces =
    focusSegmentIds.size > 0 || focusDomainIds.size > 0
      ? options.surfaces.filter((surface) => {
          const segmentMatch =
            surface.segmentIds?.some((segmentId: string) => focusSegmentIds.has(segmentId)) ??
            false;
          const domainMatch =
            surface.domainIds?.some((domainId: string) => focusDomainIds.has(domainId)) ?? false;
          return segmentMatch || domainMatch;
        })
      : options.surfaces;

  const mcpSurfaces =
    options.mcpSurfaces && (focusSegmentIds.size > 0 || focusDomainIds.size > 0)
      ? options.mcpSurfaces.filter((surface) => {
          const segmentMatch =
            surface.segmentIds?.some((segmentId: string) => focusSegmentIds.has(segmentId)) ??
            false;
          const domainMatch =
            surface.domainIds?.some((domainId: string) => focusDomainIds.has(domainId)) ?? false;
          return segmentMatch || domainMatch;
        })
      : options.mcpSurfaces;

  const segmentIds = segments.map((segment: CapabilityOwnershipSegment) => segment.id);
  const matrix = buildCapabilityOwnershipMatrix({
    segmentIds,
    segments,
    ...(options.kindOrder === undefined ? {} : { kindOrder: options.kindOrder }),
  });

  const fallbackSummary = buildCapabilityOwnershipSummary([]);
  const kindSummaryFallback = matrix.kindOrder.map((kind: CapabilityOwnershipKind) => ({
    kind,
    summary: fallbackSummary,
  }));
  const kindSummaryBySegment = new Map(
    matrix.rows.map((row: { id: string; cells: CapabilityOwnershipMatrixCell[] }) => [
      row.id,
      row.cells,
    ]),
  );

  const coverageSegments: CapabilityOwnershipCoverageSegment[] = segments.map(
    (segment: CapabilityOwnershipSegment) => ({
      id: segment.id,
      label: segment.label,
      ...(segment.owner ? { owner: segment.owner } : {}),
      ...(segment.responsibility ? { responsibility: segment.responsibility } : {}),
      ...(segment.domainIds ? { domainIds: segment.domainIds } : {}),
      groupIds: segment.groupIds,
      ...(segment.kinds ? { kinds: segment.kinds } : {}),
      summary: segment.summary,
      surfaces: segment.surfaces,
      kindSummary: kindSummaryBySegment.get(segment.id) ?? kindSummaryFallback,
      ...(segment.tags ? { tags: segment.tags } : {}),
    }),
  );

  return {
    focus: options.focus,
    segments: coverageSegments,
    domains,
    surfaces,
    ...(mcpSurfaces ? { mcpSurfaces } : {}),
    matrix,
    summary: matrix.summary,
  };
}
