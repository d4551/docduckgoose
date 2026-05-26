/**
 * Capability impact TypeScript types and runtime guards.
 *
 * Provides types derived from capability impact schemas and runtime guards
 * for validation in shared clients.
 *
 * @shared/types/capability-impact.ts
 */

import type { CapabilityImpactResponse } from "../schemas/capability-impact.schemas.ts";
import { isRecord } from "../utils/type-guards.ts";
import { isCapabilityOwnershipSegment } from "./capability-ownership.guards-aggregates.ts";
import { isCapabilityOwnershipDomain } from "./capability-ownership.guards-foundation.ts";
import {
  isCapabilityOwnershipCategoryMap,
  isCapabilityOwnershipMcpSurface,
  isCapabilityOwnershipSummary,
  isCapabilityOwnershipSurface,
} from "./capability-ownership.guards-surfaces.ts";

function isNonEmptyTrimmedString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalRecord(value: unknown): value is Record<string, unknown> | undefined {
  return value === undefined || isRecord(value);
}

function isOptionalTrimmedString(value: unknown): value is string | undefined {
  return value === undefined || (typeof value === "string" && value.trim().length > 0);
}

function isArrayOf<T>(value: unknown, validate: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(validate);
}

function hasOptionalArrayOf<T>(
  value: unknown,
  validate: (item: unknown) => item is T,
): value is T[] {
  return value === undefined || (Array.isArray(value) && value.every(validate));
}

function isOptionalValue<T>(
  value: unknown,
  validate: (item: unknown) => item is T,
): value is T | undefined {
  return value === undefined || validate(value);
}

/**
 * Shared capability impact request/response contracts.
 */
export type {
  CapabilityImpactRequest,
  CapabilityImpactResponse,
} from "../schemas/capability-impact.schemas.ts";

/**
 * Runtime guard for {@link CapabilityImpactResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches impact response structure.
 */
export function isCapabilityImpactResponse(value: unknown): value is CapabilityImpactResponse {
  if (!isRecord(value)) {
    return false;
  }

  return [
    value.ok === true,
    isArrayOf(value.domains, isCapabilityOwnershipDomain),
    isArrayOf(value.segments, isCapabilityOwnershipSegment),
    isArrayOf(value.surfaces, isCapabilityOwnershipSurface),
    hasOptionalArrayOf(value.mcpSurfaces, isCapabilityOwnershipMcpSurface),
    isOptionalValue(value.categoryMap, isCapabilityOwnershipCategoryMap),
    isCapabilityOwnershipSummary(value.summary),
    isNonEmptyTrimmedString(value.timestamp),
    isOptionalTrimmedString(value.correlationId),
    value.errors === undefined || Array.isArray(value.errors),
    isOptionalRecord(value.metadata),
  ].every(Boolean);
}
