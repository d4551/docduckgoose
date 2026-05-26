/**
 * Surfaces, summaries, and category map capability-ownership runtime guards.
 *
 * @shared/types/capability-ownership.guards-surfaces
 */

import type {
  CapabilityOwnershipCategory,
  CapabilityOwnershipCategoryMap,
} from "@baohaus/bao-schemas/capability-ownership/category";
import type { CapabilityOwnershipHighlights } from "@baohaus/bao-schemas/capability-ownership/highlights";
import type {
  CapabilityOwnershipMcpSurface,
  CapabilityOwnershipMcpSurfaceSummary,
} from "@baohaus/bao-schemas/capability-ownership/mcp-surface";
import type { CapabilityOwnershipStackSummary } from "@baohaus/bao-schemas/capability-ownership/stack";
import type { CapabilityOwnershipSummary } from "@baohaus/bao-schemas/capability-ownership/summary";
import type {
  CapabilityOwnershipSurface,
  CapabilityOwnershipSurfaceSummary,
} from "@baohaus/bao-schemas/capability-ownership/surface";
import { isCapabilityOwnershipKind } from "./capability-ownership.guards-foundation";
import {
  isNonEmptyString,
  isOptionalArrayOf,
  isOptionalString,
  isOptionalStringArray,
  isOptionalValue,
  isRecord,
  isStringArray,
} from "./capability-ownership.guards-helpers";

/**
 * Runtime guard for {@link CapabilityOwnershipMcpSurfaceSummary}.
 */
export function isCapabilityOwnershipMcpSurfaceSummary(
  value: unknown,
): value is CapabilityOwnershipMcpSurfaceSummary {
  if (!isRecord(value)) {
    return false;
  }
  const totals = [value.resources, value.tools, value.templates, value.total];
  return totals.every((entry) => typeof entry === "number" && Number.isFinite(entry) && entry >= 0);
}

/**
 * Runtime guard for {@link CapabilityOwnershipSurfaceSummary}.
 */
export function isCapabilityOwnershipSurfaceSummary(
  value: unknown,
): value is CapabilityOwnershipSurfaceSummary {
  if (!isRecord(value)) {
    return false;
  }
  const totals = [
    value.total,
    value.surfaces,
    value.groups,
    value.kinds,
    value.owners,
    value.responsibilities,
    value.domains,
  ];
  return totals.every((entry) => typeof entry === "number" && Number.isFinite(entry) && entry >= 0);
}

/**
 * Runtime guard for {@link CapabilityOwnershipStackSummary}.
 */
export function isCapabilityOwnershipStackSummary(
  value: unknown,
): value is CapabilityOwnershipStackSummary {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.total !== "number" || !Number.isFinite(value.total)) {
    return false;
  }
  if (typeof value.segments !== "number" || !Number.isFinite(value.segments)) {
    return false;
  }
  if (typeof value.owners !== "number" || !Number.isFinite(value.owners)) {
    return false;
  }
  if (typeof value.responsibilities !== "number" || !Number.isFinite(value.responsibilities)) {
    return false;
  }
  if (typeof value.kinds !== "number" || !Number.isFinite(value.kinds)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipHighlights}.
 */
export function isCapabilityOwnershipHighlights(
  value: unknown,
): value is CapabilityOwnershipHighlights {
  if (!isRecord(value)) {
    return false;
  }
  if (!Array.isArray(value.segments)) {
    return false;
  }
  if (!value.segments.every((segment) => typeof segment === "string" && segment.trim().length)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipSummary}.
 */
export function isCapabilityOwnershipSummary(value: unknown): value is CapabilityOwnershipSummary {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.total !== "number" || !Number.isFinite(value.total)) {
    return false;
  }
  if (!(isRecord(value.byKind) && isRecord(value.byStatus))) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for MCP resource definitions.
 */
function isMcpResourceDefinition(value: unknown): value is { uri: string; name: string } {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.uri !== "string" || !value.uri.trim()) {
    return false;
  }
  if (typeof value.name !== "string" || !value.name.trim()) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for MCP tool definitions.
 */
function isMcpToolDefinition(value: unknown): value is { name: string } {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.name !== "string" || !value.name.trim()) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for MCP resource template definitions.
 */
function isMcpResourceTemplateDefinition(
  value: unknown,
): value is { uriTemplate: string; name: string } {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.uriTemplate !== "string" || !value.uriTemplate.trim()) {
    return false;
  }
  if (typeof value.name !== "string" || !value.name.trim()) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipSurface}.
 */
export function isCapabilityOwnershipSurface(value: unknown): value is CapabilityOwnershipSurface {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.groupId) &&
    isNonEmptyString(value.groupLabel) &&
    isCapabilityOwnershipKind(value.kind) &&
    isCapabilityOwnershipSummary(value.summary) &&
    isOptionalString(value.owner) &&
    isOptionalString(value.responsibility) &&
    isOptionalStringArray(value.domainIds) &&
    isOptionalStringArray(value.segmentIds) &&
    isOptionalStringArray(value.tags)
  );
}

/**
 * Runtime guard for {@link CapabilityOwnershipMcpSurface}.
 */
export function isCapabilityOwnershipMcpSurface(
  value: unknown,
): value is CapabilityOwnershipMcpSurface {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.label) &&
    isNonEmptyString(value.domain) &&
    isCapabilityOwnershipMcpSurfaceSummary(value.summary) &&
    isOptionalString(value.groupId) &&
    isOptionalString(value.groupLabel) &&
    isOptionalString(value.owner) &&
    isOptionalString(value.responsibility) &&
    isOptionalStringArray(value.domainIds) &&
    isOptionalArrayOf(value.resources, isMcpResourceDefinition) &&
    isOptionalArrayOf(value.tools, isMcpToolDefinition) &&
    isOptionalArrayOf(value.templates, isMcpResourceTemplateDefinition) &&
    isOptionalStringArray(value.tags)
  );
}

/**
 * Runtime guard for {@link CapabilityOwnershipCategory}.
 */
export function isCapabilityOwnershipCategory(
  value: unknown,
): value is CapabilityOwnershipCategory {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.label) &&
    isCapabilityOwnershipSummary(value.summary) &&
    Array.isArray(value.kinds) &&
    value.kinds.every(isCapabilityOwnershipKind) &&
    isStringArray(value.domainIds) &&
    isStringArray(value.groupIds) &&
    isOptionalString(value.owner) &&
    isOptionalString(value.responsibility) &&
    isOptionalStringArray(value.tags) &&
    isOptionalValue(value.surfaceSummary, isCapabilityOwnershipSurfaceSummary) &&
    isOptionalValue(value.mcpSummary, isCapabilityOwnershipMcpSurfaceSummary)
  );
}

/**
 * Runtime guard for {@link CapabilityOwnershipCategoryMap}.
 */
export function isCapabilityOwnershipCategoryMap(
  value: unknown,
): value is CapabilityOwnershipCategoryMap {
  if (!isRecord(value)) {
    return false;
  }
  if (!Array.isArray(value.categoryIds)) {
    return false;
  }
  if (!value.categoryIds.every((id) => typeof id === "string" && id.trim())) {
    return false;
  }
  if (!(Array.isArray(value.categories) && value.categories.every(isCapabilityOwnershipCategory))) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  if (!isCapabilityOwnershipStackSummary(value.stack)) {
    return false;
  }
  if (value.surfaceSummary !== undefined) {
    if (!isCapabilityOwnershipSurfaceSummary(value.surfaceSummary)) {
      return false;
    }
  }
  if (value.mcpSummary !== undefined) {
    if (!isCapabilityOwnershipMcpSurfaceSummary(value.mcpSummary)) {
      return false;
    }
  }
  return true;
}
