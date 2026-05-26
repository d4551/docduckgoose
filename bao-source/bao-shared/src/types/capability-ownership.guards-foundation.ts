/**
 * Foundation capability-ownership runtime guards: enums, records, source, and entry.
 *
 * @shared/types/capability-ownership.guards-foundation
 */

import type { CapabilityOwnershipDomain } from "@baohaus/bao-schemas/capability-ownership/domain";
import type {
  CapabilityOwnershipEntry,
  CapabilityOwnershipEntryPolicy,
} from "@baohaus/bao-schemas/capability-ownership/entry";
import {
  CAPABILITY_OWNERSHIP_KINDS,
  CAPABILITY_OWNERSHIP_STATUSES,
  type CapabilityOwnershipKind,
  type CapabilityOwnershipStatus,
} from "@baohaus/bao-schemas/capability-ownership/enums";
import type { CapabilityOwnershipError } from "@baohaus/bao-schemas/capability-ownership/errors";
import type { CapabilityOwnershipFocus } from "@baohaus/bao-schemas/capability-ownership/focus";
import type { CapabilityOwnershipGroup } from "@baohaus/bao-schemas/capability-ownership/group";
import {
  CAPABILITY_OWNERSHIP_DEVICE_INVENTORY_SOURCES,
  type CapabilityOwnershipDeviceInventoryMetadata,
  type CapabilityOwnershipDeviceInventorySource,
  type CapabilityOwnershipMapEntryLimit,
  type CapabilityOwnershipMapLimits,
  type CapabilityOwnershipMapMetadata,
  type CapabilityOwnershipMapSegmentLimit,
  type CapabilityOwnershipMcpResourceMetadata,
  type CapabilityOwnershipPolicyGroupSummary,
  type CapabilityOwnershipPolicyStats,
  type CapabilityOwnershipPolicySummary,
} from "@baohaus/bao-schemas/capability-ownership/metadata";
import type { CapabilityOwnershipSource } from "@baohaus/bao-schemas/capability-ownership/source";
import {
  isNonEmptyString,
  isNonNegativeNumber,
  isOptionalBoolean,
  isOptionalString,
  isOptionalStringArray,
  isOptionalValue,
  isRecord,
} from "./capability-ownership.guards-helpers";

type CapabilityOwnershipSourceLibrary = NonNullable<CapabilityOwnershipSource["library"]>;
type CapabilityOwnershipSourceDriver = NonNullable<CapabilityOwnershipSource["driver"]>;
type CapabilityOwnershipSourceDevice = NonNullable<CapabilityOwnershipSource["device"]>;

/**
 * Runtime guard for {@link CapabilityOwnershipKind}.
 */
export function isCapabilityOwnershipKind(value: unknown): value is CapabilityOwnershipKind {
  return (
    typeof value === "string" &&
    CAPABILITY_OWNERSHIP_KINDS.includes(value as CapabilityOwnershipKind)
  );
}

/**
 * Runtime guard for {@link CapabilityOwnershipDeviceInventorySource}.
 */
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

/**
 * Runtime guard for {@link CapabilityOwnershipStatus}.
 */
export function isCapabilityOwnershipStatus(value: unknown): value is CapabilityOwnershipStatus {
  return (
    typeof value === "string" &&
    CAPABILITY_OWNERSHIP_STATUSES.includes(value as CapabilityOwnershipStatus)
  );
}

/**
 * Runtime guard for {@link CapabilityOwnershipError}.
 */
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

/**
 * Runtime guard for ownership source library metadata.
 */
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

/**
 * Runtime guard for ownership source driver metadata.
 */
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

/**
 * Runtime guard for ownership source device metadata.
 */
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

/**
 * Runtime guard for {@link CapabilityOwnershipSource}.
 */
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

/**
 * Runtime guard for {@link CapabilityOwnershipEntryPolicy}.
 */
export function isCapabilityOwnershipEntryPolicy(
  value: unknown,
): value is CapabilityOwnershipEntryPolicy {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.ownerOverridden !== "boolean") {
    return false;
  }
  if (typeof value.responsibilityOverridden !== "boolean") {
    return false;
  }
  if (value.groupId !== undefined && typeof value.groupId !== "string") {
    return false;
  }
  if (value.groupLabel !== undefined && typeof value.groupLabel !== "string") {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipPolicyStats}.
 */
export function isCapabilityOwnershipPolicyStats(
  value: unknown,
): value is CapabilityOwnershipPolicyStats {
  if (!isRecord(value)) {
    return false;
  }
  const totals = [
    value.total,
    value.overridden,
    value.ownerOverrides,
    value.responsibilityOverrides,
  ];
  return totals.every((entry) => typeof entry === "number" && Number.isFinite(entry) && entry >= 0);
}

/**
 * Runtime guard for {@link CapabilityOwnershipPolicyGroupSummary}.
 */
export function isCapabilityOwnershipPolicyGroupSummary(
  value: unknown,
): value is CapabilityOwnershipPolicyGroupSummary {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.id !== "string" || !value.id.trim()) {
    return false;
  }
  if (typeof value.label !== "string" || !value.label.trim()) {
    return false;
  }
  return isCapabilityOwnershipPolicyStats(value.stats);
}

/**
 * Runtime guard for {@link CapabilityOwnershipPolicySummary}.
 */
export function isCapabilityOwnershipPolicySummary(
  value: unknown,
): value is CapabilityOwnershipPolicySummary {
  if (!isRecord(value)) {
    return false;
  }
  if (!isCapabilityOwnershipPolicyStats(value.total)) {
    return false;
  }
  if (!isRecord(value.byKind)) {
    return false;
  }
  for (const [key, entry] of Object.entries(value.byKind)) {
    if (!isCapabilityOwnershipKind(key)) {
      return false;
    }
    if (!isCapabilityOwnershipPolicyStats(entry)) {
      return false;
    }
  }
  if (!Array.isArray(value.byGroup)) {
    return false;
  }
  if (!value.byGroup.every(isCapabilityOwnershipPolicyGroupSummary)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipMapSegmentLimit}.
 */
export function isCapabilityOwnershipMapSegmentLimit(
  value: unknown,
): value is CapabilityOwnershipMapSegmentLimit {
  if (!isRecord(value)) {
    return false;
  }
  if (!isNonNegativeNumber(value.limit)) {
    return false;
  }
  if (!isNonNegativeNumber(value.available)) {
    return false;
  }
  if (!isNonNegativeNumber(value.selected)) {
    return false;
  }
  if (typeof value.truncated !== "boolean") {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipMapEntryLimit}.
 */
export function isCapabilityOwnershipMapEntryLimit(
  value: unknown,
): value is CapabilityOwnershipMapEntryLimit {
  if (!isRecord(value)) {
    return false;
  }
  if (!isNonNegativeNumber(value.limit)) {
    return false;
  }
  if (typeof value.truncated !== "boolean") {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipMapLimits}.
 */
export function isCapabilityOwnershipMapLimits(
  value: unknown,
): value is CapabilityOwnershipMapLimits {
  if (!isRecord(value)) {
    return false;
  }
  if (!isCapabilityOwnershipMapSegmentLimit(value.segments)) {
    return false;
  }
  if (!isCapabilityOwnershipMapEntryLimit(value.entries)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipMcpResourceMetadata}.
 */
export function isCapabilityOwnershipMcpResourceMetadata(
  value: unknown,
): value is CapabilityOwnershipMcpResourceMetadata {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.uri !== "string" || !value.uri.trim()) {
    return false;
  }
  if (typeof value.name !== "string" || !value.name.trim()) {
    return false;
  }
  if (value.title !== undefined && typeof value.title !== "string") {
    return false;
  }
  if (value.description !== undefined && typeof value.description !== "string") {
    return false;
  }
  if (value.mimeType !== undefined && typeof value.mimeType !== "string") {
    return false;
  }
  if (value.allowRefresh !== undefined && typeof value.allowRefresh !== "boolean") {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipDeviceInventoryMetadata}.
 */
export function isCapabilityOwnershipDeviceInventoryMetadata(
  value: unknown,
): value is CapabilityOwnershipDeviceInventoryMetadata {
  if (!isRecord(value)) {
    return false;
  }
  if (!isCapabilityOwnershipDeviceInventorySource(value.source)) {
    return false;
  }
  if (!isNonNegativeNumber(value.count)) {
    return false;
  }
  if (!isNonNegativeNumber(value.limit)) {
    return false;
  }
  if (typeof value.includeSimulated !== "boolean") {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipMapMetadata}.
 */
export function isCapabilityOwnershipMapMetadata(
  value: unknown,
): value is CapabilityOwnershipMapMetadata {
  if (!isRecord(value)) {
    return false;
  }
  if (value.disabled !== undefined && typeof value.disabled !== "boolean") {
    return false;
  }
  if (value.mcp !== undefined && !isCapabilityOwnershipMcpResourceMetadata(value.mcp)) {
    return false;
  }
  if (value.policy !== undefined && !isCapabilityOwnershipPolicySummary(value.policy)) {
    return false;
  }
  if (value.limits !== undefined && !isCapabilityOwnershipMapLimits(value.limits)) {
    return false;
  }
  if (
    value.deviceInventory !== undefined &&
    !isCapabilityOwnershipDeviceInventoryMetadata(value.deviceInventory)
  ) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipEntry}.
 */
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
    isOptionalValue(value.policy, isCapabilityOwnershipEntryPolicy) &&
    isOptionalValue(value.metadata, isCapabilityOwnershipMapMetadata)
  );
}

/**
 * Runtime guard for {@link CapabilityOwnershipGroup}.
 */
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
    if (!(Array.isArray(value.tags) && value.tags.every((tag) => typeof tag === "string"))) {
      return false;
    }
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipDomain}.
 */
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
    if (!(Array.isArray(value.tags) && value.tags.every((tag) => typeof tag === "string"))) {
      return false;
    }
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityOwnershipFocus}.
 */
export function isCapabilityOwnershipFocus(value: unknown): value is CapabilityOwnershipFocus {
  if (!isRecord(value)) {
    return false;
  }
  if (!Array.isArray(value.segmentIds)) {
    return false;
  }
  if (!value.segmentIds.every((id) => typeof id === "string" && id.trim())) {
    return false;
  }
  if (!Array.isArray(value.domainIds)) {
    return false;
  }
  if (!value.domainIds.every((id) => typeof id === "string" && id.trim())) {
    return false;
  }
  return true;
}
