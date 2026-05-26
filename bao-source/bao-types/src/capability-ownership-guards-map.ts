/**
 * Capability ownership MCP, owner-map, matrix, and policy guards.
 * Extracted from capability-ownership.ts to keep module size under 400 lines.
 */

import type {
  CapabilityOwnershipCategory,
  CapabilityOwnershipCategoryMap,
  CapabilityOwnershipMcpSurface,
  CapabilityOwnershipMcpSurfaceSummary,
  CapabilityOwnershipOwnerMap,
  CapabilityOwnershipOwnerMapMatrix,
  CapabilityOwnershipOwnerMapMatrixRow,
  CapabilityOwnershipOwnerMapSection,
  CapabilityOwnershipStackEntry,
  CapabilityOwnershipStackMap,
  CapabilityOwnershipStackSummary,
  CapabilityOwnershipSurfaceSummary,
} from "@baohaus/bao-schemas/capability-ownership.schemas";
import {
  isCapabilityOwnershipFocusMap,
  isCapabilityOwnershipKind,
  isCapabilityOwnershipSegment,
  isCapabilityOwnershipSummary,
  isCapabilityOwnershipSurface,
  isOptionalString,
  isOptionalStringArray,
} from "./capability-ownership-guards-core";
import { isRecord } from "./internal/record.js";

function isNonEmptyStringField(record: Record<string, unknown>, field: string): boolean {
  const value = record[field];
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalStringField(record: Record<string, unknown>, field: string): boolean {
  return record[field] === undefined || typeof record[field] === "string";
}

function isNonEmptyStringArrayField(record: Record<string, unknown>, field: string): boolean {
  const value = record[field];
  return (
    Array.isArray(value) &&
    value.every((item: unknown) => typeof item === "string" && item.trim().length > 0)
  );
}

function isStringArrayField(record: Record<string, unknown>, field: string): boolean {
  const value = record[field];
  return (
    value === undefined ||
    (Array.isArray(value) && value.every((item: unknown) => typeof item === "string"))
  );
}

function isMcpResourceDefinition(value: unknown): value is { uri: string; name: string } {
  return (
    isRecord(value) &&
    typeof value.uri === "string" &&
    !!value.uri.trim() &&
    typeof value.name === "string" &&
    !!value.name.trim()
  );
}

function isMcpToolDefinition(value: unknown): value is { name: string } {
  return isRecord(value) && typeof value.name === "string" && !!value.name.trim();
}

function isMcpResourceTemplateDefinition(
  value: unknown,
): value is { uriTemplate: string; name: string } {
  return (
    isRecord(value) &&
    typeof value.uriTemplate === "string" &&
    !!value.uriTemplate.trim() &&
    typeof value.name === "string" &&
    !!value.name.trim()
  );
}

export function isCapabilityOwnershipMcpSurfaceSummary(
  value: unknown,
): value is CapabilityOwnershipMcpSurfaceSummary {
  if (!isRecord(value)) return false;
  const totals = [value.resources, value.tools, value.templates, value.total];
  return totals.every((entry) => typeof entry === "number" && Number.isFinite(entry) && entry >= 0);
}

export function isCapabilityOwnershipSurfaceSummary(
  value: unknown,
): value is CapabilityOwnershipSurfaceSummary {
  if (!isRecord(value)) return false;
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

export function isCapabilityOwnershipMcpSurface(
  value: unknown,
): value is CapabilityOwnershipMcpSurface {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.id !== "string" || !value.id.trim()) {
    return false;
  }
  if (typeof value.label !== "string" || !value.label.trim()) {
    return false;
  }
  if (!isCapabilityOwnershipKind(value.kind)) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  if (value.resources !== undefined) {
    if (!Array.isArray(value.resources) || !value.resources.every(isMcpResourceDefinition)) {
      return false;
    }
  }
  if (value.tools !== undefined) {
    if (!Array.isArray(value.tools) || !value.tools.every(isMcpToolDefinition)) {
      return false;
    }
  }
  if (value.templates !== undefined) {
    if (
      !Array.isArray(value.templates) ||
      !value.templates.every(isMcpResourceTemplateDefinition)
    ) {
      return false;
    }
  }
  if (value.mcpSummary !== undefined && !isCapabilityOwnershipMcpSurfaceSummary(value.mcpSummary)) {
    return false;
  }
  if (!isOptionalString(value.owner)) {
    return false;
  }
  if (!isOptionalString(value.responsibility)) {
    return false;
  }
  if (!isOptionalStringArray(value.domainIds)) {
    return false;
  }
  if (!isOptionalStringArray(value.segmentIds)) {
    return false;
  }
  if (!isOptionalStringArray(value.tags)) {
    return false;
  }
  return true;
}

export function isCapabilityOwnershipCategory(
  value: unknown,
): value is CapabilityOwnershipCategory {
  if (!isRecord(value)) {
    return false;
  }
  if (!isNonEmptyStringField(value, "id")) {
    return false;
  }
  if (!isNonEmptyStringField(value, "label")) {
    return false;
  }
  if (!Array.isArray(value.groupIds)) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  if (!isStringArrayField(value, "tags")) {
    return false;
  }
  return true;
}

export function isCapabilityOwnershipCategoryMap(
  value: unknown,
): value is CapabilityOwnershipCategoryMap {
  if (!isRecord(value)) {
    return false;
  }
  if (!Array.isArray(value.categoryIds)) {
    return false;
  }
  if (!value.categoryIds.every((id: unknown) => typeof id === "string" && id.trim())) {
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

export function isCapabilityOwnershipOwnerMapSection(
  value: unknown,
): value is CapabilityOwnershipOwnerMapSection {
  if (!isRecord(value)) {
    return false;
  }
  if (!isNonEmptyStringField(value, "id")) {
    return false;
  }
  if (!isNonEmptyStringField(value, "label")) {
    return false;
  }
  if (!Array.isArray(value.domainIds)) {
    return false;
  }
  if (!Array.isArray(value.groupIds)) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  if (!(Array.isArray(value.surfaces) && value.surfaces.every(isCapabilityOwnershipSurface))) {
    return false;
  }
  if (!isOptionalStringField(value, "owner")) {
    return false;
  }
  if (!isOptionalStringField(value, "responsibility")) {
    return false;
  }
  if (!isStringArrayField(value, "tags")) {
    return false;
  }
  return true;
}

export function isCapabilityOwnershipOwnerMap(
  value: unknown,
): value is CapabilityOwnershipOwnerMap {
  if (!isRecord(value)) {
    return false;
  }
  if (
    !(Array.isArray(value.sections) && value.sections.every(isCapabilityOwnershipOwnerMapSection))
  ) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  return true;
}

export function isCapabilityOwnershipOwnerMapMatrixRow(
  value: unknown,
): value is CapabilityOwnershipOwnerMapMatrixRow {
  if (!isRecord(value)) {
    return false;
  }
  if (!isNonEmptyStringField(value, "id")) {
    return false;
  }
  if (!isNonEmptyStringField(value, "label")) {
    return false;
  }
  if (!isOptionalStringField(value, "owner")) {
    return false;
  }
  if (!isOptionalStringField(value, "responsibility")) {
    return false;
  }
  if (!isNonEmptyStringArrayField(value, "domainIds")) {
    return false;
  }
  if (!isNonEmptyStringArrayField(value, "groupIds")) {
    return false;
  }
  if (!isNonEmptyStringArrayField(value, "segmentIds")) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  if (!isStringArrayField(value, "tags")) {
    return false;
  }
  return true;
}

export function isCapabilityOwnershipOwnerMapMatrix(
  value: unknown,
): value is CapabilityOwnershipOwnerMapMatrix {
  if (!isRecord(value)) {
    return false;
  }
  if (!Array.isArray(value.segmentIds)) {
    return false;
  }
  if (!value.segmentIds.every((id: unknown) => typeof id === "string" && id.trim())) {
    return false;
  }
  if (!(Array.isArray(value.rows) && value.rows.every(isCapabilityOwnershipOwnerMapMatrixRow))) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  return true;
}

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

export function isCapabilityOwnershipStackMap(
  value: unknown,
): value is CapabilityOwnershipStackMap {
  if (!isRecord(value)) {
    return false;
  }
  if (!Array.isArray(value.segmentIds)) {
    return false;
  }
  if (!value.segmentIds.every((id: unknown) => typeof id === "string" && id.trim())) {
    return false;
  }
  if (!(Array.isArray(value.segments) && value.segments.every(isCapabilityOwnershipSegment))) {
    return false;
  }
  if (!isCapabilityOwnershipStackSummary(value.summary)) {
    return false;
  }
  if (value.mcpSummary !== undefined && !isCapabilityOwnershipMcpSurfaceSummary(value.mcpSummary)) {
    return false;
  }
  return true;
}

export function isCapabilityOwnershipStackEntry(
  value: unknown,
): value is CapabilityOwnershipStackEntry {
  if (!isRecord(value)) {
    return false;
  }
  if (!isNonEmptyStringField(value, "id")) {
    return false;
  }
  if (!isNonEmptyStringField(value, "label")) {
    return false;
  }
  if (!isOptionalStringField(value, "owner")) {
    return false;
  }
  if (!isOptionalStringField(value, "responsibility")) {
    return false;
  }
  if (!isNonEmptyStringArrayField(value, "segmentIds")) {
    return false;
  }
  if (!isNonEmptyStringArrayField(value, "domainIds")) {
    return false;
  }
  if (!isCapabilityOwnershipFocusMap(value.map)) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  if (!isStringArrayField(value, "tags")) {
    return false;
  }
  return true;
}
