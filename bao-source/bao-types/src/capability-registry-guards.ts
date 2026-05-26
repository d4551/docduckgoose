/**
 * Capability registry entry, event, list, registration guards + utility types.
 * Extracted from capability-registry.ts to keep module size under 400 lines.
 */

import { BUNBUDDY_KINDS, type BunBuddyKind } from "@baohaus/bao-schemas/bunbuddy.schemas";
import {
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
} from "@baohaus/bao-schemas/capability-registry.schemas";
import { isRecord } from "./internal/record.js";

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((e) => typeof e === "string");
}

function isOptionalType(
  record: Record<string, unknown>,
  key: string,
  expectedType: string,
): boolean {
  return record[key] === undefined || typeof record[key] === expectedType;
}

function isNonEmptyString(record: Record<string, unknown>, key: string): boolean {
  const val = record[key];
  return typeof val === "string" && val.trim().length > 0;
}

function isValidContractErrors(errors: unknown): boolean {
  if (!Array.isArray(errors)) return false;
  for (const error of errors) {
    if (!isRecord(error)) return false;
    if (!isOptionalType(error, "code", "string")) return false;
    if (!isOptionalType(error, "status", "number")) return false;
    if (!isOptionalType(error, "description", "string")) return false;
  }
  return true;
}

function isValidContractAuth(auth: unknown): boolean {
  if (!isRecord(auth) || typeof auth.required !== "boolean") return false;
  if (auth.schemes !== undefined && !isStringArray(auth.schemes)) return false;
  if (auth.scopes !== undefined && !isRecord(auth.scopes)) return false;
  if (auth.audiences !== undefined && !isStringArray(auth.audiences)) return false;
  return true;
}

const LIMITS_NUMBER_KEYS: readonly string[] = [
  "timeoutMs",
  "maxPayloadBytes",
  "maxConcurrency",
  "requestsPerMinute",
  "burst",
] as const;

function isValidContractLimits(limits: unknown): boolean {
  if (!isRecord(limits)) return false;
  return LIMITS_NUMBER_KEYS.every((key) => isOptionalType(limits, key, "number"));
}

function isValidContractObservability(observability: unknown): boolean {
  if (!isRecord(observability)) return false;
  if (typeof observability.traces !== "boolean") return false;
  if (typeof observability.metrics !== "boolean") return false;
  if (typeof observability.logs !== "boolean") return false;
  if (!isOptionalType(observability, "correlation", "boolean")) return false;
  if (observability.attributes !== undefined && !isRecord(observability.attributes)) return false;
  return true;
}

function isCapabilityKind(value: unknown): value is CapabilityKind {
  return typeof value === "string" && CAPABILITY_KINDS.includes(value as CapabilityKind);
}

function isCapabilityStatus(value: unknown): value is CapabilityStatus {
  return typeof value === "string" && CAPABILITY_STATUSES.includes(value as CapabilityStatus);
}

function isCapabilityEventType(value: unknown): value is CapabilityEventType {
  return typeof value === "string" && CAPABILITY_STATUSES.includes(value as CapabilityStatus);
}

function isCapabilityDependency(value: unknown): value is CapabilityDependency {
  if (!isRecord(value)) return false;
  if (typeof value.capabilityId !== "string" || !value.capabilityId.trim()) return false;
  if (typeof value.required !== "boolean") return false;
  if (value.minVersion !== undefined && typeof value.minVersion !== "string") return false;
  return true;
}

function isCapabilityHealthcheck(value: unknown): value is CapabilityHealthcheck {
  if (!isRecord(value)) return false;
  if (value.endpoint !== undefined && typeof value.endpoint !== "string") return false;
  if (value.interval !== undefined && typeof value.interval !== "number") return false;
  if (value.timeout !== undefined && typeof value.timeout !== "number") return false;
  return true;
}

function isCapabilityContracts(value: unknown): value is CapabilityContracts {
  return (
    isRecord(value) &&
    isStringArray(value.endpoints) &&
    (value.inputSchemas === undefined || isRecord(value.inputSchemas)) &&
    (value.outputSchemas === undefined || isRecord(value.outputSchemas)) &&
    (value.events === undefined || isStringArray(value.events)) &&
    (value.errors === undefined || isValidContractErrors(value.errors)) &&
    (value.auth === undefined || isValidContractAuth(value.auth)) &&
    (value.limits === undefined || isValidContractLimits(value.limits)) &&
    (value.observability === undefined || isValidContractObservability(value.observability))
  );
}

function isValidBunbuddyKind(value: Record<string, unknown>): boolean {
  if (value.bunbuddyKind === undefined) return true;
  return (
    typeof value.bunbuddyKind === "string" &&
    BUNBUDDY_KINDS.includes(value.bunbuddyKind as BunBuddyKind)
  );
}

const CAPABILITY_ENTRY_STRING_FIELDS: readonly string[] = [
  "id",
  "name",
  "owner",
  "responsibility",
  "version",
  "registeredAt",
] as const;

function isByKindAggregate(value: Record<string, unknown>): boolean {
  return CAPABILITY_KINDS.every((kind) => typeof value[kind] === "number");
}

export function isCapabilityEntry(value: unknown): value is CapabilityEntry {
  if (!isRecord(value)) return false;
  if (!CAPABILITY_ENTRY_STRING_FIELDS.every((f) => isNonEmptyString(value, f))) return false;
  if (!isCapabilityKind(value.kind)) return false;
  if (!isCapabilityContracts(value.contracts)) return false;
  if (!(Array.isArray(value.dependencies) && value.dependencies.every(isCapabilityDependency)))
    return false;
  if (!isCapabilityStatus(value.status)) return false;
  if (value.healthcheck !== undefined && !isCapabilityHealthcheck(value.healthcheck)) return false;
  if (!isValidBunbuddyKind(value)) return false;
  if (!isOptionalType(value, "baseUrl", "string")) return false;
  if (!isOptionalType(value, "lastHealthCheck", "string")) return false;
  if (value.metadata !== undefined && !isRecord(value.metadata)) return false;
  return true;
}

export function isCapabilityEvent(value: unknown): value is CapabilityEvent {
  if (!isRecord(value)) return false;
  if (!isCapabilityEventType(value.type)) return false;
  if (typeof value.capabilityId !== "string" || !value.capabilityId.trim()) return false;
  if (typeof value.timestamp !== "string" || !value.timestamp.trim()) return false;
  if (value.capability !== undefined && !isCapabilityEntry(value.capability)) return false;
  if (value.previousStatus !== undefined && !isCapabilityStatus(value.previousStatus)) return false;
  if (value.newStatus !== undefined && !isCapabilityStatus(value.newStatus)) return false;
  if (value.correlationId !== undefined && typeof value.correlationId !== "string") return false;
  return true;
}

export function isCapabilityListResponse(value: unknown): value is CapabilityListResponse {
  if (!isRecord(value)) return false;
  if (value.ok !== true) return false;
  if (!Array.isArray(value.capabilities)) return false;
  if (!value.capabilities.every(isCapabilityEntry)) return false;
  if (typeof value.total !== "number" || !Number.isInteger(value.total)) return false;
  if (typeof value.timestamp !== "string" || !value.timestamp.trim()) return false;
  if (!isRecord(value.byKind)) return false;
  if (!isByKindAggregate(value.byKind)) return false;
  if (!isRecord(value.byStatus)) return false;
  return true;
}

export function isCapabilityHealthResponse(value: unknown): value is CapabilityHealthResponse {
  if (!isRecord(value)) return false;
  if (typeof value.ok !== "boolean") return false;
  if (value.status !== "healthy" && value.status !== "degraded" && value.status !== "unhealthy")
    return false;
  if (!isRecord(value.summary)) return false;
  if (typeof value.timestamp !== "string" || !value.timestamp.trim()) return false;
  if (!Array.isArray(value.capabilities)) return false;
  return true;
}

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
    if (!Array.isArray(value.dependencies)) return false;
    if (!value.dependencies.every(isCapabilityDependency)) return false;
  }
  if (value.healthcheck !== undefined && !isCapabilityHealthcheck(value.healthcheck)) return false;
  return true;
}

export function isCapabilityRegistrationRequest(
  value: unknown,
): value is CapabilityRegistrationRequest {
  if (!isRecord(value)) return false;
  return hasRequiredRegistrationFields(value) && hasValidOptionalRegistrationFields(value);
}

export type CapabilityEventHandler = (event: CapabilityEvent) => void | Promise<void>;

export interface CapabilityRegistrationOptions {
  skipHealthCheck?: boolean;
  allowOverride?: boolean;
  correlationId?: string;
}

export interface CapabilityDiscoveryOptions {
  bunbuddyKinds?: BunBuddyKind[] | undefined;
  includePlugins?: boolean | undefined;
  force?: boolean | undefined;
  timeout?: number | undefined;
  correlationId?: string | undefined;
}

export interface CapabilityFilterOptions {
  kind?: CapabilityKind | undefined;
  status?: CapabilityStatus | CapabilityStatus[] | undefined;
  owner?: string | undefined;
  responsibility?: string | undefined;
  bunbuddyKind?: string | undefined;
}
