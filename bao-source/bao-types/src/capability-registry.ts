/**
 * Capability Registry TypeScript types and runtime guards.
 *
 * Re-exports types from schemas and guards from split module.
 * @baohaus/bao-types/capability-registry
 */

import {
  CAPABILITY_EVENT_TYPES,
  CAPABILITY_KINDS,
  CAPABILITY_STATUSES,
  type CapabilityEventType,
  type CapabilityKind,
  type CapabilityStatus,
} from "@baohaus/bao-schemas/capability-registry.schemas";

export type {
  CapabilityAuth,
  CapabilityByResponsibilityResponse,
  CapabilityContracts,
  CapabilityDependency,
  CapabilityDiscoveryRequest,
  CapabilityDiscoveryResponse,
  CapabilityEntry,
  CapabilityError,
  CapabilityEvent,
  CapabilityEventType,
  CapabilityHealthcheck,
  CapabilityHealthResponse,
  CapabilityKind,
  CapabilityLimits,
  CapabilityListResponse,
  CapabilityObservability,
  CapabilityRegistrationRequest,
  CapabilityStatus,
} from "@baohaus/bao-schemas/capability-registry.schemas";

export function isCapabilityKind(value: unknown): value is CapabilityKind {
  return typeof value === "string" && CAPABILITY_KINDS.includes(value as CapabilityKind);
}

export function isCapabilityStatus(value: unknown): value is CapabilityStatus {
  return typeof value === "string" && CAPABILITY_STATUSES.includes(value as CapabilityStatus);
}

export function isCapabilityEventType(value: unknown): value is CapabilityEventType {
  return typeof value === "string" && CAPABILITY_EVENT_TYPES.includes(value as CapabilityEventType);
}

export type {
  CapabilityDiscoveryOptions,
  CapabilityEventHandler,
  CapabilityFilterOptions,
  CapabilityRegistrationOptions,
} from "./capability-registry-guards";
export {
  isCapabilityEntry,
  isCapabilityEvent,
  isCapabilityHealthResponse,
  isCapabilityListResponse,
  isCapabilityRegistrationRequest,
} from "./capability-registry-guards";
