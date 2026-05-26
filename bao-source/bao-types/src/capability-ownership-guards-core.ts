/**
 * Capability ownership base guards — Kind, Status, Error, Source, Entry, Group, Domain,
 * Focus, FocusMap, Summary, Segment, Highlights, Surface.
 * Extracted from capability-ownership.ts to keep module size under 400 lines.
 */

import {
  CAPABILITY_OWNERSHIP_DEVICE_INVENTORY_SOURCES,
  CAPABILITY_OWNERSHIP_KINDS,
  CAPABILITY_OWNERSHIP_STATUSES,
  type CapabilityOwnershipDeviceInventorySource,
  type CapabilityOwnershipDomain,
  type CapabilityOwnershipEntry,
  type CapabilityOwnershipError,
  type CapabilityOwnershipFocus,
  type CapabilityOwnershipFocusMap,
  type CapabilityOwnershipGroup,
  type CapabilityOwnershipHighlights,
  type CapabilityOwnershipKind,
  type CapabilityOwnershipSegment,
  type CapabilityOwnershipSource,
  type CapabilityOwnershipStatus,
  type CapabilityOwnershipSummary,
  type CapabilityOwnershipSurface,
} from "@baohaus/bao-schemas/capability-ownership.schemas";
import { isRecord } from "./internal/record.js";

export function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

export function isOptionalBoolean(value: unknown): value is boolean | undefined {
  return value === undefined || typeof value === "boolean";
}

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

export function isOptionalStringArray(value: unknown): value is string[] | undefined {
  return value === undefined || isStringArray(value);
}

export function isOptionalValue<T>(
  value: unknown,
  guard: (candidate: unknown) => candidate is T,
): value is T | undefined {
  return value === undefined || guard(value);
}

export function isOptionalArrayOf<T>(
  value: unknown,
  guard: (candidate: unknown) => candidate is T,
): value is T[] | undefined {
  return value === undefined || (Array.isArray(value) && value.every((entry) => guard(entry)));
}

export function isCapabilityOwnershipKind(value: unknown): value is CapabilityOwnershipKind {
  return (
    typeof value === "string" &&
    CAPABILITY_OWNERSHIP_KINDS.includes(value as CapabilityOwnershipKind)
  );
}

export function isCapabilityOwnershipDeviceInventorySource(
  value: unknown,
): value is CapabilityOwnershipDeviceInventorySource {
  return (
    typeof value === "string" &&
    CAPABILITY_OWNERSHIP_DEVICE_INVENTORY_SOURCES.includes(
      value as CapabilityOwnershipDeviceInventorySource,
    )
  );
}

export function isCapabilityOwnershipStatus(value: unknown): value is CapabilityOwnershipStatus {
  return (
    typeof value === "string" &&
    CAPABILITY_OWNERSHIP_STATUSES.includes(value as CapabilityOwnershipStatus)
  );
}

export function isCapabilityOwnershipError(value: unknown): value is CapabilityOwnershipError {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.scope !== "string" || !value.scope.trim()) {
    return false;
  }
  if (typeof value.message !== "string" || !value.message.trim()) {
    return false;
  }
  if (value.code !== undefined && typeof value.code !== "string") {
    return false;
  }
  if (value.details !== undefined && !isRecord(value.details)) {
    return false;
  }
  return true;
}

type CapabilityOwnershipSourceLibrary = NonNullable<CapabilityOwnershipSource["library"]>;
type CapabilityOwnershipSourceDriver = NonNullable<CapabilityOwnershipSource["driver"]>;
type CapabilityOwnershipSourceDevice = NonNullable<CapabilityOwnershipSource["device"]>;

function isCapabilityOwnershipSourceLibrary(
  value: unknown,
): value is CapabilityOwnershipSourceLibrary {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value.name) &&
    isNonEmptyString(value.source) &&
    isNonEmptyString(value.runtime)
  );
}

function isCapabilityOwnershipSourceDriver(
  value: unknown,
): value is CapabilityOwnershipSourceDriver {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value.key) &&
    isNonEmptyString(value.packageName) &&
    isNonEmptyString(value.scope)
  );
}

function isCapabilityOwnershipSourceDevice(
  value: unknown,
): value is CapabilityOwnershipSourceDevice {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.deviceType) &&
    isOptionalString(value.status) &&
    isOptionalString(value.transport) &&
    isOptionalString(value.driverPackage) &&
    isOptionalString(value.driverStatus) &&
    isOptionalString(value.driverVersion) &&
    isOptionalString(value.discoverySource) &&
    isOptionalString(value.bunbuddyId) &&
    isOptionalString(value.lastSeen) &&
    isOptionalBoolean(value.isSimulated)
  );
}

export function isCapabilityOwnershipSource(value: unknown): value is CapabilityOwnershipSource {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isCapabilityOwnershipKind(value.kind) &&
    isOptionalString(value.capabilityId) &&
    isOptionalString(value.bunbuddyKind) &&
    isOptionalValue(value.library, isCapabilityOwnershipSourceLibrary) &&
    isOptionalValue(value.driver, isCapabilityOwnershipSourceDriver) &&
    isOptionalValue(value.device, isCapabilityOwnershipSourceDevice)
  );
}

export function isCapabilityOwnershipEntry(value: unknown): value is CapabilityOwnershipEntry {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.name) &&
    isCapabilityOwnershipKind(value.kind) &&
    isNonEmptyString(value.owner) &&
    isNonEmptyString(value.responsibility) &&
    isNonEmptyString(value.version) &&
    isCapabilityOwnershipStatus(value.status) &&
    isRecord(value.contracts) &&
    Array.isArray(value.dependencies) &&
    isCapabilityOwnershipSource(value.source) &&
    isNonEmptyString(value.observedAt) &&
    isOptionalStringArray(value.tags) &&
    (value.policy === undefined || isRecord(value.policy)) &&
    (value.metadata === undefined || isRecord(value.metadata))
  );
}

export function isCapabilityOwnershipGroup(value: unknown): value is CapabilityOwnershipGroup {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.id !== "string" || !value.id.trim()) {
    return false;
  }
  if (typeof value.label !== "string" || !value.label.trim()) {
    return false;
  }
  if (!Array.isArray(value.entries)) {
    return false;
  }
  if (!isRecord(value.summary)) {
    return false;
  }
  if (value.owner !== undefined && typeof value.owner !== "string") {
    return false;
  }
  if (value.responsibility !== undefined && typeof value.responsibility !== "string") {
    return false;
  }
  if (value.tags !== undefined) {
    if (
      !(Array.isArray(value.tags) && value.tags.every((tag: unknown) => typeof tag === "string"))
    ) {
      return false;
    }
  }
  return true;
}

export function isCapabilityOwnershipDomain(value: unknown): value is CapabilityOwnershipDomain {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.id !== "string" || !value.id.trim()) {
    return false;
  }
  if (typeof value.label !== "string" || !value.label.trim()) {
    return false;
  }
  if (!Array.isArray(value.groupIds)) {
    return false;
  }
  if (!isRecord(value.summary)) {
    return false;
  }
  if (value.owner !== undefined && typeof value.owner !== "string") {
    return false;
  }
  if (value.responsibility !== undefined && typeof value.responsibility !== "string") {
    return false;
  }
  if (value.tags !== undefined) {
    if (
      !(Array.isArray(value.tags) && value.tags.every((tag: unknown) => typeof tag === "string"))
    ) {
      return false;
    }
  }
  return true;
}

export function isCapabilityOwnershipFocus(value: unknown): value is CapabilityOwnershipFocus {
  if (!isRecord(value)) {
    return false;
  }
  if (!Array.isArray(value.segmentIds)) {
    return false;
  }
  if (!value.segmentIds.every((id: unknown) => typeof id === "string" && id.trim())) {
    return false;
  }
  if (!Array.isArray(value.domainIds)) {
    return false;
  }
  if (!value.domainIds.every((id: unknown) => typeof id === "string" && id.trim())) {
    return false;
  }
  return true;
}

export function isCapabilityOwnershipFocusMap(
  value: unknown,
): value is CapabilityOwnershipFocusMap {
  if (!isRecord(value)) {
    return false;
  }
  if (!isCapabilityOwnershipFocus(value.focus)) {
    return false;
  }
  if (!(Array.isArray(value.segments) && value.segments.every(isCapabilityOwnershipSegment))) {
    return false;
  }
  if (!(Array.isArray(value.domains) && value.domains.every(isCapabilityOwnershipDomain))) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  return true;
}

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

export function isCapabilityOwnershipHighlights(
  value: unknown,
): value is CapabilityOwnershipHighlights {
  if (!isRecord(value)) {
    return false;
  }
  if (!Array.isArray(value.segments)) {
    return false;
  }
  if (
    !value.segments.every(
      (segment: unknown) => typeof segment === "string" && segment.trim().length,
    )
  ) {
    return false;
  }
  if (!isCapabilityOwnershipSummary(value.summary)) {
    return false;
  }
  return true;
}

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
