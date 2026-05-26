/**
 * Segments, maps, matrices, and map-response capability-ownership runtime guards.
 *
 * @shared/types/capability-ownership.guards-aggregates
 */

import type {
  CapabilityOwnershipFocus,
  CapabilityOwnershipFocusMap,
} from "@baohaus/bao-schemas/capability-ownership/focus";
import type {
  CapabilityOwnershipMatrix,
  CapabilityOwnershipMatrixCell,
  CapabilityOwnershipMatrixRow,
} from "@baohaus/bao-schemas/capability-ownership/matrix";
import type {
  CapabilityOwnershipOwnerMap,
  CapabilityOwnershipOwnerMapMatrix,
  CapabilityOwnershipOwnerMapMatrixRow,
  CapabilityOwnershipOwnerMapSection,
} from "@baohaus/bao-schemas/capability-ownership/owner-map";
import type {
  CapabilityOwnershipMapResponse,
  CapabilityOwnershipMcpResource,
} from "@baohaus/bao-schemas/capability-ownership/responses";
import type { CapabilityOwnershipSegment } from "@baohaus/bao-schemas/capability-ownership/segment";
import type { CapabilityOwnershipStackMap } from "@baohaus/bao-schemas/capability-ownership/stack";
import type { CapabilityOwnershipStackEntry } from "@baohaus/bao-schemas/capability-ownership/stack-entry";
import {
  isCapabilityOwnershipDomain,
  isCapabilityOwnershipEntry,
  isCapabilityOwnershipFocus as isCapabilityOwnershipFocusShape,
  isCapabilityOwnershipGroup,
  isCapabilityOwnershipKind,
} from "./capability-ownership.guards-foundation";
import {
  isNonEmptyString,
  isNonEmptyStringArrayField,
  isNonEmptyStringField,
  isOptionalArrayOf,
  isOptionalString,
  isOptionalStringArray,
  isOptionalStringField,
  isOptionalValue,
  isRecord,
  isStringArrayField,
} from "./capability-ownership.guards-helpers";
import {
  isCapabilityOwnershipCategoryMap,
  isCapabilityOwnershipHighlights,
  isCapabilityOwnershipMcpSurface,
  isCapabilityOwnershipMcpSurfaceSummary,
  isCapabilityOwnershipStackSummary,
  isCapabilityOwnershipSummary,
  isCapabilityOwnershipSurface,
} from "./capability-ownership.guards-surfaces";

/**
 * Runtime guard for {@link CapabilityOwnershipSegment}.
 */
export function isCapabilityOwnershipSegment(value: unknown): value is CapabilityOwnershipSegment {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.label) &&
    Array.isArray(value.groupIds) &&
    isCapabilityOwnershipSummary(value.summary) &&
    Array.isArray(value.surfaces) &&
    value.surfaces.every(isCapabilityOwnershipSurface) &&
    isOptionalString(value.owner) &&
    isOptionalString(value.responsibility) &&
    isOptionalStringArray(value.domainIds) &&
    isOptionalArrayOf(value.kinds, isCapabilityOwnershipKind) &&
    isOptionalArrayOf(value.entries, isCapabilityOwnershipEntry) &&
    isOptionalStringArray(value.tags)
  );
}

/**
 * Runtime guard for {@link CapabilityOwnershipFocus} (structural, same as foundation export name).
 * Uses foundation's focus guard — import alias avoids duplicate implementation.
 */
function isCapabilityOwnershipFocusValue(value: unknown): value is CapabilityOwnershipFocus {
  return isCapabilityOwnershipFocusShape(value);
}

/**
 * Runtime guard for {@link CapabilityOwnershipFocusMap}.
 */
export function isCapabilityOwnershipFocusMap(
  value: unknown,
): value is CapabilityOwnershipFocusMap {
  if (!isRecord(value)) {
    return false;
  }
  if (!isCapabilityOwnershipFocusValue(value.focus)) {
    return false;
  }
  if (!(Array.isArray(value.segments) && value.segments.every(isCapabilityOwnershipSegment))) {
    return false;
  }
  if (!(Array.isArray(value.domains) && value.domains.every(isCapabilityOwnershipDomain))) {
    return false;
  }
  if (!(Array.isArray(value.surfaces) && value.surfaces.every(isCapabilityOwnershipSurface))) {
    return false;
  }
  if (
    value.mcpSurfaces !== undefined &&
    !(Array.isArray(value.mcpSurfaces) && value.mcpSurfaces.every(isCapabilityOwnershipMcpSurface))
  ) {
    return false;
  }
  if (value.categoryMap !== undefined && !isCapabilityOwnershipCategoryMap(value.categoryMap)) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  return true;
}

/**
 * Runtime type guard for {@link CapabilityOwnershipOwnerMapSection}.
 */
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

/**
 * Runtime guard for {@link CapabilityOwnershipOwnerMap}.
 */
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

/**
 * Runtime guard for {@link CapabilityOwnershipOwnerMapMatrixRow}.
 */
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

/**
 * Runtime guard for {@link CapabilityOwnershipOwnerMapMatrix}.
 */
export function isCapabilityOwnershipOwnerMapMatrix(
  value: unknown,
): value is CapabilityOwnershipOwnerMapMatrix {
  if (!isRecord(value)) {
    return false;
  }
  if (!Array.isArray(value.segmentIds)) {
    return false;
  }
  if (!value.segmentIds.every((id) => typeof id === "string" && id.trim())) {
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

/**
 * Runtime guard for {@link CapabilityOwnershipStackMap}.
 */
export function isCapabilityOwnershipStackMap(
  value: unknown,
): value is CapabilityOwnershipStackMap {
  if (!isRecord(value)) {
    return false;
  }
  if (!Array.isArray(value.segmentIds)) {
    return false;
  }
  if (!value.segmentIds.every((id) => typeof id === "string" && id.trim())) {
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

/**
 * Runtime guard for {@link CapabilityOwnershipStackEntry}.
 */
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

/**
 * Runtime guard for {@link CapabilityOwnershipMatrixCell}.
 */
export function isCapabilityOwnershipMatrixCell(
  value: unknown,
): value is CapabilityOwnershipMatrixCell {
  if (!isRecord(value)) {
    return false;
  }
  if (!isCapabilityOwnershipKind(value.kind)) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  return true;
}

function isValidMatrixRowIdentity(value: Record<string, unknown>): boolean {
  if (typeof value.id !== "string" || !value.id.trim()) {
    return false;
  }
  if (typeof value.label !== "string" || !value.label.trim()) {
    return false;
  }
  if (value.owner !== undefined && typeof value.owner !== "string") {
    return false;
  }
  if (value.responsibility !== undefined && typeof value.responsibility !== "string") {
    return false;
  }
  return true;
}

function isValidMatrixRowCollections(value: Record<string, unknown>): boolean {
  if (!isOptionalStringArray(value.domainIds)) {
    return false;
  }
  if (!isOptionalStringArray(value.tags)) {
    return false;
  }
  if (!(Array.isArray(value.cells) && value.cells.every(isCapabilityOwnershipMatrixCell))) {
    return false;
  }
  return true;
}

/**
 * Runtime type guard for {@link CapabilityOwnershipMatrixRow}.
 */
export function isCapabilityOwnershipMatrixRow(
  value: unknown,
): value is CapabilityOwnershipMatrixRow {
  if (!isRecord(value)) {
    return false;
  }
  if (!isValidMatrixRowIdentity(value)) {
    return false;
  }
  if (!isValidMatrixRowCollections(value)) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipMatrix}.
 */
export function isCapabilityOwnershipMatrix(value: unknown): value is CapabilityOwnershipMatrix {
  if (!isRecord(value)) {
    return false;
  }
  if (!Array.isArray(value.segmentIds)) {
    return false;
  }
  if (!value.segmentIds.every((id) => typeof id === "string" && id.trim())) {
    return false;
  }
  if (!Array.isArray(value.kindOrder)) {
    return false;
  }
  if (!value.kindOrder.every((kind) => isCapabilityOwnershipKind(kind))) {
    return false;
  }
  if (!(Array.isArray(value.rows) && value.rows.every(isCapabilityOwnershipMatrixRow))) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipMapResponse}.
 */
export function isCapabilityOwnershipMapResponse(
  value: unknown,
): value is CapabilityOwnershipMapResponse {
  if (!isRecord(value)) {
    return false;
  }
  return (
    value.ok === true &&
    Array.isArray(value.groups) &&
    value.groups.every(isCapabilityOwnershipGroup) &&
    Array.isArray(value.domains) &&
    value.domains.every(isCapabilityOwnershipDomain) &&
    Array.isArray(value.surfaces) &&
    value.surfaces.every(isCapabilityOwnershipSurface) &&
    isOptionalArrayOf(value.mcpSurfaces, isCapabilityOwnershipMcpSurface) &&
    isOptionalValue(value.ownerMap, isCapabilityOwnershipOwnerMap) &&
    isOptionalValue(value.ownerMapMatrix, isCapabilityOwnershipOwnerMapMatrix) &&
    Array.isArray(value.segments) &&
    value.segments.every(isCapabilityOwnershipSegment) &&
    isOptionalValue(value.matrix, isCapabilityOwnershipMatrix) &&
    isCapabilityOwnershipStackMap(value.stackMap) &&
    isOptionalArrayOf(value.stacks, isCapabilityOwnershipStackEntry) &&
    isOptionalValue(value.highlights, isCapabilityOwnershipHighlights) &&
    isOptionalValue(value.focus, isCapabilityOwnershipFocusValue) &&
    isOptionalValue(value.focusMap, isCapabilityOwnershipFocusMap) &&
    isCapabilityOwnershipSummary(value.summary) &&
    isNonEmptyStringField(value, "timestamp") &&
    (value.errors === undefined || Array.isArray(value.errors)) &&
    (value.metadata === undefined || isRecord(value.metadata))
  );
}

function isValidMcpResourceRefresh(refresh: unknown): boolean {
  if (!isRecord(refresh)) {
    return false;
  }
  if (refresh.ok !== true) {
    return false;
  }
  if (typeof refresh.queued !== "boolean") {
    return false;
  }
  if (
    refresh.jobId !== null &&
    (typeof refresh.jobId !== "string" || !(refresh.jobId as string).trim())
  ) {
    return false;
  }
  if (typeof refresh.refreshed !== "boolean") {
    return false;
  }
  if (typeof refresh.timestamp !== "string" || !refresh.timestamp.trim()) {
    return false;
  }
  return true;
}

/**
 * Runtime type guard for {@link CapabilityOwnershipMcpResource}.
 */
export function isCapabilityOwnershipMcpResource(
  value: unknown,
): value is CapabilityOwnershipMcpResource {
  if (!isRecord(value)) {
    return false;
  }
  if (!isCapabilityOwnershipMapResponse(value.map)) {
    return false;
  }
  if (value.refresh !== undefined && !isValidMcpResourceRefresh(value.refresh)) {
    return false;
  }
  if (!isNonEmptyStringField(value, "timestamp")) {
    return false;
  }
  return true;
}
