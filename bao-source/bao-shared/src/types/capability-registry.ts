/**
 * Capability Registry TypeScript types and runtime guards.
 *
 * Provides TypeScript types derived from the capability registry schemas,
 * along with runtime type guards for validation.
 *
 * @shared/types/capability-registry.ts
 */

import { BUNBUDDY_KINDS, type BunBuddyKind } from "../schemas/bunbuddy.schemas.ts";
import {
  CAPABILITY_EVENT_TYPES,
  CAPABILITY_KINDS,
  CAPABILITY_STATUSES,
  type CapabilityContracts,
  type CapabilityDependency,
  type CapabilityEntry,
  type CapabilityEvent,
  type CapabilityEventType,
  type CapabilityHealthcheck,
  type CapabilityHealthResponse,
  type CapabilityKind,
  type CapabilityListResponse,
  type CapabilityRegistrationRequest,
  type CapabilityStatus,
} from "../schemas/capability-registry.schemas.ts";
import { isRecord } from "../utils/type-guards.ts";

/** Capability registry schema types re-exported for downstream consumers. */
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
} from "../schemas/capability-registry.schemas.ts";

// Runtime Type Guards

/**
 * Runtime guard for {@link CapabilityKind}.
 *
 * @param value - Candidate value.
 * @returns True when value is a valid capability kind.
 */
export function isCapabilityKind(value: unknown): value is CapabilityKind {
  return typeof value === "string" && CAPABILITY_KINDS.includes(value as CapabilityKind);
}

/**
 * Runtime guard for {@link CapabilityStatus}.
 *
 * @param value - Candidate value.
 * @returns True when value is a valid capability status.
 */
export function isCapabilityStatus(value: unknown): value is CapabilityStatus {
  return typeof value === "string" && CAPABILITY_STATUSES.includes(value as CapabilityStatus);
}

/**
 * Runtime guard for {@link CapabilityEventType}.
 *
 * @param value - Candidate value.
 * @returns True when value is a valid capability event type.
 */
export function isCapabilityEventType(value: unknown): value is CapabilityEventType {
  return typeof value === "string" && CAPABILITY_EVENT_TYPES.includes(value as CapabilityEventType);
}

/**
 * Runtime guard for {@link CapabilityDependency}.
 *
 * @param value - Candidate value.
 * @returns True when value matches CapabilityDependency structure.
 */
export function isCapabilityDependency(value: unknown): value is CapabilityDependency {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.capabilityId !== "string" || !value.capabilityId.trim()) {
    return false;
  }
  if (typeof value.required !== "boolean") {
    return false;
  }
  if (value.minVersion !== undefined && typeof value.minVersion !== "string") {
    return false;
  }
  return true;
}

/**
 * Validate that a value is a string array.
 *
 * @param value - Candidate value.
 * @returns True when value is an array of strings.
 */
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((e) => typeof e === "string");
}

/**
 * Validate an optional field is a specific type when present.
 *
 * @param record - Record containing the field.
 * @param key - Field name.
 * @param expectedType - Expected typeof result.
 * @returns True when field is absent or matches the expected type.
 */
function isOptionalType(
  record: Record<string, unknown>,
  key: string,
  expectedType: string,
): boolean {
  return record[key] === undefined || typeof record[key] === expectedType;
}

/**
 * Validate an optional field with a custom predicate when present.
 *
 * @param record - Record containing the field.
 * @param key - Field name.
 * @param validate - Predicate used when the field exists.
 * @returns True when field is absent or passes validation.
 */
function isOptionalField(
  record: Record<string, unknown>,
  key: string,
  validate: (value: unknown) => boolean,
): boolean {
  return record[key] === undefined || validate(record[key]);
}

/**
 * Validate the errors array within CapabilityContracts.
 *
 * @param errors - Candidate errors value.
 * @returns True when errors is a valid array of error descriptors.
 */
function isValidContractErrors(errors: unknown): boolean {
  if (!Array.isArray(errors)) {
    return false;
  }
  for (const error of errors) {
    if (!isRecord(error)) {
      return false;
    }
    if (!isOptionalType(error, "code", "string")) {
      return false;
    }
    if (!isOptionalType(error, "status", "number")) {
      return false;
    }
    if (!isOptionalType(error, "description", "string")) {
      return false;
    }
  }
  return true;
}

/**
 * Validate the auth section within CapabilityContracts.
 *
 * @param auth - Candidate auth value.
 * @returns True when auth matches the expected structure.
 */
function isValidContractAuth(auth: unknown): boolean {
  if (!isRecord(auth) || typeof auth.required !== "boolean") {
    return false;
  }
  if (auth.schemes !== undefined && !isStringArray(auth.schemes)) {
    return false;
  }
  if (auth.scopes !== undefined && !isRecord(auth.scopes)) {
    return false;
  }
  if (auth.audiences !== undefined && !isStringArray(auth.audiences)) {
    return false;
  }
  return true;
}

/** Keys expected to be optional numbers on a limits record. */
const LIMITS_NUMBER_KEYS: readonly string[] = [
  "timeoutMs",
  "maxPayloadBytes",
  "maxConcurrency",
  "requestsPerMinute",
  "burst",
] as const;

/**
 * Validate the limits section within CapabilityContracts.
 *
 * @param limits - Candidate limits value.
 * @returns True when limits matches the expected structure.
 */
function isValidContractLimits(limits: unknown): boolean {
  if (!isRecord(limits)) {
    return false;
  }
  return LIMITS_NUMBER_KEYS.every((key) => isOptionalType(limits, key, "number"));
}

/**
 * Validate the observability section within CapabilityContracts.
 *
 * @param observability - Candidate observability value.
 * @returns True when observability matches the expected structure.
 */
function isValidContractObservability(observability: unknown): boolean {
  if (!isRecord(observability)) {
    return false;
  }
  if (typeof observability.traces !== "boolean") {
    return false;
  }
  if (typeof observability.metrics !== "boolean") {
    return false;
  }
  if (typeof observability.logs !== "boolean") {
    return false;
  }
  if (!isOptionalType(observability, "correlation", "boolean")) {
    return false;
  }
  if (observability.attributes !== undefined && !isRecord(observability.attributes)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityContracts}.
 *
 * @param value - Candidate value.
 * @returns True when value matches CapabilityContracts structure.
 */
export function isCapabilityContracts(value: unknown): value is CapabilityContracts {
  if (!isRecord(value)) {
    return false;
  }

  return [
    isStringArray(value.endpoints),
    isOptionalField(value, "inputSchemas", isRecord),
    isOptionalField(value, "outputSchemas", isRecord),
    isOptionalField(value, "events", isStringArray),
    isOptionalField(value, "errors", isValidContractErrors),
    isOptionalField(value, "auth", isValidContractAuth),
    isOptionalField(value, "limits", isValidContractLimits),
    isOptionalField(value, "observability", isValidContractObservability),
  ].every(Boolean);
}

/**
 * Runtime guard for {@link CapabilityHealthcheck}.
 *
 * @param value - Candidate value.
 * @returns True when value matches CapabilityHealthcheck structure.
 */
export function isCapabilityHealthcheck(value: unknown): value is CapabilityHealthcheck {
  if (!isRecord(value)) {
    return false;
  }
  if (value.endpoint !== undefined && typeof value.endpoint !== "string") {
    return false;
  }
  if (value.interval !== undefined && typeof value.interval !== "number") {
    return false;
  }
  if (value.timeout !== undefined && typeof value.timeout !== "number") {
    return false;
  }
  return true;
}

/**
 * Assert that a record field is a non-empty string.
 *
 * @param record - Source record.
 * @param key - Field name.
 * @returns True when the field is a non-empty trimmed string.
 */
function isNonEmptyString(record: Record<string, unknown>, key: string): boolean {
  const val = record[key];
  return typeof val === "string" && val.trim().length > 0;
}

/** Required string fields on a CapabilityEntry. */
const CAPABILITY_ENTRY_STRING_FIELDS: readonly string[] = [
  "id",
  "name",
  "owner",
  "responsibility",
  "version",
  "registeredAt",
] as const;

/**
 * Validate the optional bunbuddyKind field.
 *
 * @param value - Record containing the field.
 * @returns True when valid or absent.
 */
function isValidBunbuddyKind(value: Record<string, unknown>): boolean {
  if (value.bunbuddyKind === undefined) {
    return true;
  }
  return (
    typeof value.bunbuddyKind === "string" &&
    BUNBUDDY_KINDS.includes(value.bunbuddyKind as BunBuddyKind)
  );
}

/**
 * Validate by-kind counters in a capability list response.
 *
 * @param value - Record containing by-kind counters.
 * @returns True when every configured capability kind has a numeric counter.
 */
function isByKindAggregate(value: Record<string, unknown>): boolean {
  return CAPABILITY_KINDS.every((kind) => typeof value[kind] === "number");
}

/**
 * Runtime guard for {@link CapabilityEntry}.
 *
 * @param value - Candidate value.
 * @returns True when value matches CapabilityEntry structure.
 */
export function isCapabilityEntry(value: unknown): value is CapabilityEntry {
  if (!isRecord(value)) {
    return false;
  }
  if (!CAPABILITY_ENTRY_STRING_FIELDS.every((f) => isNonEmptyString(value, f))) {
    return false;
  }
  if (!isCapabilityKind(value.kind)) {
    return false;
  }
  if (!isCapabilityContracts(value.contracts)) {
    return false;
  }
  if (!(Array.isArray(value.dependencies) && value.dependencies.every(isCapabilityDependency))) {
    return false;
  }
  if (!isCapabilityStatus(value.status)) {
    return false;
  }
  if (value.healthcheck !== undefined && !isCapabilityHealthcheck(value.healthcheck)) {
    return false;
  }
  if (!isValidBunbuddyKind(value)) {
    return false;
  }
  if (!isOptionalType(value, "baseUrl", "string")) {
    return false;
  }
  if (!isOptionalType(value, "lastHealthCheck", "string")) {
    return false;
  }
  if (value.metadata !== undefined && !isRecord(value.metadata)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityEvent}.
 *
 * @param value - Candidate value.
 * @returns True when value matches CapabilityEvent structure.
 */
export function isCapabilityEvent(value: unknown): value is CapabilityEvent {
  if (!isRecord(value)) {
    return false;
  }
  if (!isCapabilityEventType(value.type)) {
    return false;
  }
  if (typeof value.capabilityId !== "string" || !value.capabilityId.trim()) {
    return false;
  }
  if (typeof value.timestamp !== "string" || !value.timestamp.trim()) {
    return false;
  }
  if (value.capability !== undefined && !isCapabilityEntry(value.capability)) {
    return false;
  }
  if (value.previousStatus !== undefined && !isCapabilityStatus(value.previousStatus)) {
    return false;
  }
  if (value.newStatus !== undefined && !isCapabilityStatus(value.newStatus)) {
    return false;
  }
  if (value.correlationId !== undefined && typeof value.correlationId !== "string") {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityListResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches CapabilityListResponse structure.
 */
export function isCapabilityListResponse(value: unknown): value is CapabilityListResponse {
  if (!isRecord(value)) {
    return false;
  }
  if (value.ok !== true) {
    return false;
  }
  if (!Array.isArray(value.capabilities)) {
    return false;
  }
  if (!value.capabilities.every(isCapabilityEntry)) {
    return false;
  }
  if (typeof value.total !== "number" || !Number.isInteger(value.total)) {
    return false;
  }
  if (typeof value.timestamp !== "string" || !value.timestamp.trim()) {
    return false;
  }
  if (!isRecord(value.byKind)) {
    return false;
  }
  if (!isByKindAggregate(value.byKind)) {
    return false;
  }
  if (!isRecord(value.byStatus)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityHealthResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches CapabilityHealthResponse structure.
 */
export function isCapabilityHealthResponse(value: unknown): value is CapabilityHealthResponse {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.ok !== "boolean") {
    return false;
  }
  if (value.status !== "healthy" && value.status !== "degraded" && value.status !== "unhealthy") {
    return false;
  }
  if (!isRecord(value.summary)) {
    return false;
  }
  if (typeof value.timestamp !== "string" || !value.timestamp.trim()) {
    return false;
  }
  if (!Array.isArray(value.capabilities)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link CapabilityRegistrationRequest}.
 *
 * @param value - Candidate value.
 * @returns True when value matches CapabilityRegistrationRequest structure.
 */
function isNonEmptyStringValue(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasRequiredRegistrationFields(value: Record<string, unknown>): boolean {
  return (
    isNonEmptyStringValue(value.id) &&
    isNonEmptyStringValue(value.name) &&
    isCapabilityKind(value.kind) &&
    isNonEmptyStringValue(value.owner) &&
    isNonEmptyStringValue(value.responsibility) &&
    isNonEmptyStringValue(value.version) &&
    isCapabilityContracts(value.contracts)
  );
}

function hasValidOptionalRegistrationFields(value: Record<string, unknown>): boolean {
  if (value.dependencies !== undefined) {
    if (!Array.isArray(value.dependencies)) {
      return false;
    }
    if (!value.dependencies.every(isCapabilityDependency)) {
      return false;
    }
  }
  if (value.healthcheck !== undefined && !isCapabilityHealthcheck(value.healthcheck)) {
    return false;
  }
  return true;
}

/**
 * Runtime type guard for {@link CapabilityRegistrationRequest}.
 *
 * @param value - Value to narrow.
 * @returns True when `value` satisfies the registration request contract.
 */
export function isCapabilityRegistrationRequest(
  value: unknown,
): value is CapabilityRegistrationRequest {
  if (!isRecord(value)) {
    return false;
  }
  return hasRequiredRegistrationFields(value) && hasValidOptionalRegistrationFields(value);
}

// Utility Types

/**
 * Type for capability registry event handler.
 */
export type CapabilityEventHandler = (event: CapabilityEvent) => void | Promise<void>;

/**
 * Options for capability registration.
 */
export interface CapabilityRegistrationOptions {
  /** Skip health check after registration */
  skipHealthCheck?: boolean;
  /** Override existing capability if present */
  allowOverride?: boolean;
  /** Correlation ID for tracing */
  correlationId?: string;
}

/**
 * Options for capability discovery.
 */
export interface CapabilityDiscoveryOptions {
  /** Only discover specific bunbuddy kinds */
  bunbuddyKinds?: BunBuddyKind[];
  /** Include plugins in discovery */
  includePlugins?: boolean;
  /** Force refresh even if recently discovered */
  force?: boolean;
  /** Timeout for individual bunbuddy discovery (ms) */
  timeout?: number;
  /** Correlation ID for tracing */
  correlationId?: string;
}

/**
 * Filter options for capability queries.
 */
export interface CapabilityFilterOptions {
  /** Filter by capability kind */
  kind?: CapabilityKind;
  /** Filter by status */
  status?: CapabilityStatus | CapabilityStatus[];
  /** Filter by owner */
  owner?: string;
  /** Filter by responsibility (partial match) */
  responsibility?: string;
  /** Filter by bunbuddy kind (for bunbuddy capabilities) */
  bunbuddyKind?: BunBuddyKind;
}
