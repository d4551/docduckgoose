/**
 * Capability impact TypeScript types and runtime guards.
 *
 * Provides types derived from capability impact schemas and runtime guards
 * for validation in shared clients.
 *
 * @shared/types/capability-impact.ts
 */

import type { CapabilityImpactResponse } from "@baohaus/bao-schemas/capability-impact.schemas";
import {
  isCapabilityOwnershipCategoryMap,
  isCapabilityOwnershipDomain,
  isCapabilityOwnershipMcpSurface,
  isCapabilityOwnershipSegment,
  isCapabilityOwnershipSummary,
  isCapabilityOwnershipSurface,
} from "./capability-ownership.ts";
import { isRecord } from "./internal/record.js";

function isNonEmptyTrimmedString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalRecord(value: unknown): value is Record<string, unknown> | undefined {
  return value === undefined || isRecord(value);
}

function isOptionalTrimmedString(value: unknown): value is string | undefined {
  return value === undefined || (typeof value === "string" && value.trim().length > 0);
}

function hasOptionalArrayOf<T>(
  value: unknown,
  validate: (item: unknown) => item is T,
): value is T[] {
  return value === undefined || (Array.isArray(value) && value.every(validate));
}

function hasCapabilityImpactCollections(value: Record<string, unknown>): boolean {
  return (
    Array.isArray(value.domains) &&
    value.domains.every(isCapabilityOwnershipDomain) &&
    Array.isArray(value.segments) &&
    value.segments.every(isCapabilityOwnershipSegment) &&
    Array.isArray(value.surfaces) &&
    value.surfaces.every(isCapabilityOwnershipSurface)
  );
}

function hasCapabilityImpactOptionals(value: Record<string, unknown>): boolean {
  return (
    hasOptionalArrayOf(value.mcpSurfaces, isCapabilityOwnershipMcpSurface) &&
    (value.categoryMap === undefined || isCapabilityOwnershipCategoryMap(value.categoryMap)) &&
    isCapabilityOwnershipSummary(value.summary) &&
    isNonEmptyTrimmedString(value.timestamp) &&
    isOptionalTrimmedString(value.correlationId) &&
    (value.errors === undefined || Array.isArray(value.errors)) &&
    isOptionalRecord(value.metadata)
  );
}

/**
 * Shared capability impact request/response contracts.
 */
export type {
  CapabilityImpactRequest,
  CapabilityImpactResponse,
} from "@baohaus/bao-schemas/capability-impact.schemas";

/**
 * Runtime guard for {@link CapabilityImpactResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches impact response structure.
 */
export function isCapabilityImpactResponse(value: unknown): value is CapabilityImpactResponse {
  return (
    isRecord(value) &&
    value.ok === true &&
    hasCapabilityImpactCollections(value) &&
    hasCapabilityImpactOptionals(value)
  );
}
