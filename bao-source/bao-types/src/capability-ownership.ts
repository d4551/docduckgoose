/**
 * Capability ownership TypeScript types and runtime guards.
 *
 * Re-exports from domain-specific split modules.
 * @baohaus/bao-types/capability-ownership
 */

// Schema types re-exported for downstream consumers.
export type {
  CapabilityOwnershipCategory,
  CapabilityOwnershipCategoryMap,
  CapabilityOwnershipDeviceInventoryMetadata,
  CapabilityOwnershipDeviceInventorySource,
  CapabilityOwnershipDomain,
  CapabilityOwnershipEntry,
  CapabilityOwnershipEntryPolicy,
  CapabilityOwnershipError,
  CapabilityOwnershipFocus,
  CapabilityOwnershipFocusMap,
  CapabilityOwnershipGroup,
  CapabilityOwnershipHighlights,
  CapabilityOwnershipKind,
  CapabilityOwnershipMapEntryLimit,
  CapabilityOwnershipMapLimits,
  CapabilityOwnershipMapMetadata,
  CapabilityOwnershipMapRequest,
  CapabilityOwnershipMapResponse,
  CapabilityOwnershipMapSegmentLimit,
  CapabilityOwnershipMatrix,
  CapabilityOwnershipMatrixCell,
  CapabilityOwnershipMatrixRow,
  CapabilityOwnershipMcpResource,
  CapabilityOwnershipMcpResourceMetadata,
  CapabilityOwnershipMcpSurface,
  CapabilityOwnershipMcpSurfaceSummary,
  CapabilityOwnershipOwnerMap,
  CapabilityOwnershipOwnerMapMatrix,
  CapabilityOwnershipOwnerMapMatrixRow,
  CapabilityOwnershipOwnerMapSection,
  CapabilityOwnershipPolicyGroupSummary,
  CapabilityOwnershipPolicyStats,
  CapabilityOwnershipPolicySummary,
  CapabilityOwnershipRefreshRequest,
  CapabilityOwnershipRefreshResponse,
  CapabilityOwnershipSegment,
  CapabilityOwnershipSegmentSummary,
  CapabilityOwnershipSource,
  CapabilityOwnershipStackEntry,
  CapabilityOwnershipStackMap,
  CapabilityOwnershipStackSummary,
  CapabilityOwnershipStatus,
  CapabilityOwnershipSummary,
  CapabilityOwnershipSurface,
  CapabilityOwnershipSurfaceSummary,
} from "@baohaus/bao-schemas/capability-ownership.schemas";

export {
  CAPABILITY_OWNERSHIP_DEVICE_INVENTORY_SOURCES,
  CAPABILITY_OWNERSHIP_KINDS,
  CAPABILITY_OWNERSHIP_STATUSES,
} from "@baohaus/bao-schemas/capability-ownership.schemas";

// Core guards
export {
  isCapabilityOwnershipDeviceInventorySource,
  isCapabilityOwnershipDomain,
  isCapabilityOwnershipEntry,
  isCapabilityOwnershipError,
  isCapabilityOwnershipFocus,
  isCapabilityOwnershipFocusMap,
  isCapabilityOwnershipGroup,
  isCapabilityOwnershipHighlights,
  isCapabilityOwnershipKind,
  isCapabilityOwnershipSegment,
  isCapabilityOwnershipSource,
  isCapabilityOwnershipStatus,
  isCapabilityOwnershipSummary,
  isCapabilityOwnershipSurface,
  isNonEmptyString,
  isNonNegativeNumber,
  isOptionalArrayOf,
  isOptionalBoolean,
  isOptionalString,
  isOptionalStringArray,
  isOptionalValue,
  isStringArray,
} from "./capability-ownership-guards-core";

// Map, category, stack, MCP surface, owner-map guards
export {
  isCapabilityOwnershipCategory,
  isCapabilityOwnershipCategoryMap,
  isCapabilityOwnershipMcpSurface,
  isCapabilityOwnershipMcpSurfaceSummary,
  isCapabilityOwnershipOwnerMap,
  isCapabilityOwnershipOwnerMapMatrix,
  isCapabilityOwnershipOwnerMapMatrixRow,
  isCapabilityOwnershipOwnerMapSection,
  isCapabilityOwnershipStackEntry,
  isCapabilityOwnershipStackMap,
  isCapabilityOwnershipStackSummary,
  isCapabilityOwnershipSurfaceSummary,
} from "./capability-ownership-guards-map";

// Matrix, policy, metadata, MCP resource guards
export {
  isCapabilityOwnershipDeviceInventoryMetadata,
  isCapabilityOwnershipMapEntryLimit,
  isCapabilityOwnershipMapLimits,
  isCapabilityOwnershipMapMetadata,
  isCapabilityOwnershipMapResponse,
  isCapabilityOwnershipMapSegmentLimit,
  isCapabilityOwnershipMatrix,
  isCapabilityOwnershipMatrixCell,
  isCapabilityOwnershipMatrixRow,
  isCapabilityOwnershipMcpResource,
  isCapabilityOwnershipMcpResourceMetadata,
  isCapabilityOwnershipPolicyGroupSummary,
  isCapabilityOwnershipPolicyStats,
  isCapabilityOwnershipPolicySummary,
} from "./capability-ownership-guards-policy";
