/**
 * Capability ownership matrix, policy, metadata, and MCP resource guards.
 * Extracted from capability-ownership.ts to keep module size under 400 lines.
 */

import type {
  CapabilityOwnershipDeviceInventoryMetadata,
  CapabilityOwnershipMapEntryLimit,
  CapabilityOwnershipMapLimits,
  CapabilityOwnershipMapMetadata,
  CapabilityOwnershipMapResponse,
  CapabilityOwnershipMapSegmentLimit,
  CapabilityOwnershipMatrix,
  CapabilityOwnershipMatrixCell,
  CapabilityOwnershipMatrixRow,
  CapabilityOwnershipMcpResource,
  CapabilityOwnershipMcpResourceMetadata,
  CapabilityOwnershipPolicyGroupSummary,
  CapabilityOwnershipPolicyStats,
  CapabilityOwnershipPolicySummary,
} from "@baohaus/bao-schemas/capability-ownership.schemas";
import {
  isCapabilityOwnershipDeviceInventorySource,
  isCapabilityOwnershipDomain,
  isCapabilityOwnershipFocusMap,
  isCapabilityOwnershipGroup,
  isCapabilityOwnershipKind,
  isCapabilityOwnershipSegment,
  isCapabilityOwnershipSummary,
  isCapabilityOwnershipSurface,
  isNonNegativeNumber,
  isOptionalStringArray,
} from "./capability-ownership-guards-core";
import {
  isCapabilityOwnershipMcpSurface,
  isCapabilityOwnershipOwnerMap,
  isCapabilityOwnershipOwnerMapMatrix,
  isCapabilityOwnershipStackEntry,
  isCapabilityOwnershipStackMap,
} from "./capability-ownership-guards-map";
import { isRecord } from "./internal/record.js";

function isNonEmptyStringField(record: Record<string, unknown>, field: string): boolean {
  const value = record[field];
  return typeof value === "string" && value.trim().length > 0;
}

export function isCapabilityOwnershipMatrixCell(
  value: unknown,
): value is CapabilityOwnershipMatrixCell {
  if (!isRecord(value)) return false;
  return isCapabilityOwnershipKind(value.kind) && isCapabilityOwnershipSummary(value.summary);
}

function isValidMatrixRowIdentity(value: Record<string, unknown>): boolean {
  if (typeof value.id !== "string" || !value.id.trim()) return false;
  if (typeof value.label !== "string" || !value.label.trim()) return false;
  if (value.owner !== undefined && typeof value.owner !== "string") return false;
  if (value.responsibility !== undefined && typeof value.responsibility !== "string") return false;
  return true;
}

function isValidMatrixRowCollections(value: Record<string, unknown>): boolean {
  if (!isOptionalStringArray(value.domainIds)) return false;
  if (!isOptionalStringArray(value.tags)) return false;
  if (!(Array.isArray(value.cells) && value.cells.every(isCapabilityOwnershipMatrixCell)))
    return false;
  return true;
}

export function isCapabilityOwnershipMatrixRow(
  value: unknown,
): value is CapabilityOwnershipMatrixRow {
  if (!isRecord(value)) return false;
  if (!isValidMatrixRowIdentity(value)) return false;
  if (!isValidMatrixRowCollections(value)) return false;
  return isCapabilityOwnershipSummary(value.summary);
}

export function isCapabilityOwnershipMatrix(value: unknown): value is CapabilityOwnershipMatrix {
  if (!isRecord(value)) return false;
  if (!Array.isArray(value.segmentIds)) return false;
  if (!value.segmentIds.every((id: unknown) => typeof id === "string" && id.trim())) return false;
  if (!Array.isArray(value.kindOrder)) return false;
  if (!value.kindOrder.every((kind: unknown) => isCapabilityOwnershipKind(kind))) return false;
  if (!(Array.isArray(value.rows) && value.rows.every(isCapabilityOwnershipMatrixRow)))
    return false;
  return isCapabilityOwnershipSummary(value.summary);
}

export function isCapabilityOwnershipMapResponse(
  value: unknown,
): value is CapabilityOwnershipMapResponse {
  if (!isRecord(value)) return false;
  return (
    value.ok === true &&
    Array.isArray(value.groups) &&
    value.groups.every(isCapabilityOwnershipGroup) &&
    Array.isArray(value.domains) &&
    value.domains.every(isCapabilityOwnershipDomain) &&
    Array.isArray(value.surfaces) &&
    value.surfaces.every(isCapabilityOwnershipSurface) &&
    (value.mcpSurfaces === undefined ||
      (Array.isArray(value.mcpSurfaces) &&
        value.mcpSurfaces.every(isCapabilityOwnershipMcpSurface))) &&
    (value.ownerMap === undefined || isCapabilityOwnershipOwnerMap(value.ownerMap)) &&
    (value.ownerMapMatrix === undefined ||
      isCapabilityOwnershipOwnerMapMatrix(value.ownerMapMatrix)) &&
    Array.isArray(value.segments) &&
    value.segments.every(isCapabilityOwnershipSegment) &&
    (value.matrix === undefined || isCapabilityOwnershipMatrix(value.matrix)) &&
    isCapabilityOwnershipStackMap(value.stackMap) &&
    (value.stacks === undefined ||
      (Array.isArray(value.stacks) && value.stacks.every(isCapabilityOwnershipStackEntry))) &&
    (value.highlights === undefined || isCapabilityOwnershipSummary(value.highlights)) &&
    (value.focus === undefined || isRecord(value.focus)) &&
    (value.focusMap === undefined || isCapabilityOwnershipFocusMap(value.focusMap)) &&
    isCapabilityOwnershipSummary(value.summary) &&
    typeof value.timestamp === "string" &&
    !!value.timestamp.trim() &&
    (value.errors === undefined || Array.isArray(value.errors)) &&
    (value.metadata === undefined || isRecord(value.metadata))
  );
}

export function isCapabilityOwnershipMcpResourceMetadata(
  value: unknown,
): value is CapabilityOwnershipMcpResourceMetadata {
  if (!isRecord(value)) return false;
  if (typeof value.uri !== "string" || !value.uri.trim()) return false;
  if (typeof value.name !== "string" || !value.name.trim()) return false;
  if (value.title !== undefined && typeof value.title !== "string") return false;
  if (value.description !== undefined && typeof value.description !== "string") return false;
  if (value.mimeType !== undefined && typeof value.mimeType !== "string") return false;
  if (value.allowRefresh !== undefined && typeof value.allowRefresh !== "boolean") return false;
  return true;
}

export function isCapabilityOwnershipPolicyStats(
  value: unknown,
): value is CapabilityOwnershipPolicyStats {
  if (!isRecord(value)) return false;
  const totals = [
    value.total,
    value.overridden,
    value.ownerOverrides,
    value.responsibilityOverrides,
  ];
  return totals.every((entry) => typeof entry === "number" && Number.isFinite(entry) && entry >= 0);
}

export function isCapabilityOwnershipEntryPolicy(
  value: unknown,
): value is import("@baohaus/bao-schemas/capability-ownership.schemas").CapabilityOwnershipEntryPolicy {
  if (!isRecord(value)) return false;
  if (typeof value.ownerOverridden !== "boolean") return false;
  if (typeof value.responsibilityOverridden !== "boolean") return false;
  if (value.groupId !== undefined && typeof value.groupId !== "string") return false;
  if (value.groupLabel !== undefined && typeof value.groupLabel !== "string") return false;
  return true;
}

export function isCapabilityOwnershipPolicyGroupSummary(
  value: unknown,
): value is CapabilityOwnershipPolicyGroupSummary {
  if (!isRecord(value)) return false;
  if (typeof value.id !== "string" || !value.id.trim()) return false;
  if (typeof value.label !== "string" || !value.label.trim()) return false;
  return isCapabilityOwnershipPolicyStats(value.stats);
}

export function isCapabilityOwnershipPolicySummary(
  value: unknown,
): value is CapabilityOwnershipPolicySummary {
  if (!isRecord(value)) return false;
  if (!isCapabilityOwnershipPolicyStats(value.total)) return false;
  if (!isRecord(value.byKind)) return false;
  for (const [key, entry] of Object.entries(value.byKind)) {
    if (!isCapabilityOwnershipKind(key)) return false;
    if (!isCapabilityOwnershipPolicyStats(entry)) return false;
  }
  if (!Array.isArray(value.byGroup)) return false;
  return value.byGroup.every(isCapabilityOwnershipPolicyGroupSummary);
}

export function isCapabilityOwnershipMapSegmentLimit(
  value: unknown,
): value is CapabilityOwnershipMapSegmentLimit {
  if (!isRecord(value)) return false;
  return (
    isNonNegativeNumber(value.limit) &&
    isNonNegativeNumber(value.available) &&
    isNonNegativeNumber(value.selected) &&
    typeof value.truncated === "boolean"
  );
}

export function isCapabilityOwnershipMapEntryLimit(
  value: unknown,
): value is CapabilityOwnershipMapEntryLimit {
  if (!isRecord(value)) return false;
  return isNonNegativeNumber(value.limit) && typeof value.truncated === "boolean";
}

export function isCapabilityOwnershipMapLimits(
  value: unknown,
): value is CapabilityOwnershipMapLimits {
  if (!isRecord(value)) return false;
  return (
    isCapabilityOwnershipMapSegmentLimit(value.segments) &&
    isCapabilityOwnershipMapEntryLimit(value.entries)
  );
}

export function isCapabilityOwnershipDeviceInventoryMetadata(
  value: unknown,
): value is CapabilityOwnershipDeviceInventoryMetadata {
  if (!isRecord(value)) return false;
  return (
    isCapabilityOwnershipDeviceInventorySource(value.source) &&
    isNonNegativeNumber(value.count) &&
    isNonNegativeNumber(value.limit) &&
    typeof value.includeSimulated === "boolean"
  );
}

export function isCapabilityOwnershipMapMetadata(
  value: unknown,
): value is CapabilityOwnershipMapMetadata {
  if (!isRecord(value)) return false;
  if (value.disabled !== undefined && typeof value.disabled !== "boolean") return false;
  if (value.mcp !== undefined && !isCapabilityOwnershipMcpResourceMetadata(value.mcp)) return false;
  if (value.policy !== undefined && !isCapabilityOwnershipPolicySummary(value.policy)) return false;
  if (value.limits !== undefined && !isCapabilityOwnershipMapLimits(value.limits)) return false;
  if (
    value.deviceInventory !== undefined &&
    !isCapabilityOwnershipDeviceInventoryMetadata(value.deviceInventory)
  )
    return false;
  return true;
}

function isValidMcpResourceRefresh(refresh: unknown): boolean {
  if (!isRecord(refresh)) return false;
  if (refresh.ok !== true) return false;
  if (typeof refresh.queued !== "boolean") return false;
  if (
    refresh.jobId !== null &&
    (typeof refresh.jobId !== "string" || !(refresh.jobId as string).trim())
  )
    return false;
  if (typeof refresh.refreshed !== "boolean") return false;
  return typeof refresh.timestamp === "string" && !!refresh.timestamp.trim();
}

export function isCapabilityOwnershipMcpResource(
  value: unknown,
): value is CapabilityOwnershipMcpResource {
  if (!isRecord(value)) return false;
  if (!isCapabilityOwnershipMapResponse(value.map)) return false;
  if (value.refresh !== undefined && !isValidMcpResourceRefresh(value.refresh)) return false;
  if (!isNonEmptyStringField(value, "timestamp")) return false;
  return true;
}
