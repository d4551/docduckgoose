/**
 * Library Registry TypeScript types and runtime guards.
 *
 * Provides TypeScript types derived from library registry schemas,
 * along with runtime type guards for validation.
 *
 * @shared/types/library-registry.ts
 */

import { BUNBUDDY_KINDS, type BunBuddyKind } from "@baohaus/bao-schemas/bunbuddy.schemas";
import {
  LIBRARY_CATEGORIES,
  LIBRARY_SOURCES,
  LIBRARY_STATUSES,
  type LibraryCategory,
  type LibraryCoverageResponse,
  type LibraryDetailResponse,
  type LibraryEntry,
  type LibraryOverviewResponse,
  type LibraryOverviewSummary,
  type LibraryRegistryResponse,
  type LibrarySource,
  type LibraryStatus,
} from "@baohaus/bao-schemas/library-registry.schemas";
import { isRecord } from "./internal/record.js";

/** Library registry schema types re-exported for downstream consumers. */
export type {
  LibraryCategory,
  LibraryCoverageBucket,
  LibraryCoverageResponse,
  LibraryDetailResponse,
  LibraryEntry,
  LibraryOverviewResponse,
  LibraryOverviewSummary,
  LibraryRegistryRefreshRequest,
  LibraryRegistryResponse,
  LibrarySource,
  LibraryStatus,
} from "@baohaus/bao-schemas/library-registry.schemas";

/**
 * Runtime guard for {@link LibraryCategory}.
 *
 * @param value - Candidate value.
 * @returns True when value is a valid library category.
 */
export function isLibraryCategory(value: unknown): value is LibraryCategory {
  return typeof value === "string" && LIBRARY_CATEGORIES.includes(value as LibraryCategory);
}

/**
 * Runtime guard for {@link LibrarySource}.
 *
 * @param value - Candidate value.
 * @returns True when value is a valid library source.
 */
export function isLibrarySource(value: unknown): value is LibrarySource {
  return typeof value === "string" && LIBRARY_SOURCES.includes(value as LibrarySource);
}

/**
 * Runtime guard for {@link LibraryStatus}.
 *
 * @param value - Candidate value.
 * @returns True when value is a valid library status.
 */
export function isLibraryStatus(value: unknown): value is LibraryStatus {
  return typeof value === "string" && LIBRARY_STATUSES.includes(value as LibraryStatus);
}

function isTrimmedString(value: unknown): value is string {
  return typeof value === "string" && Boolean(value.trim());
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function hasNumericRecordValues<K extends string>(
  value: unknown,
  isKeyValid: (key: string) => key is K,
): value is Record<K, number> {
  if (!isRecord(value)) {
    return false;
  }
  for (const [key, count] of Object.entries(value)) {
    if (!isKeyValid(key)) {
      return false;
    }
    if (!isFiniteNumber(count)) {
      return false;
    }
  }
  return true;
}

function hasValidOptionalStringArray(value: Record<string, unknown>, key: string): boolean {
  return value[key] === undefined || isStringArray(value[key]);
}

function hasValidOptionalCategoryArray(value: Record<string, unknown>, key: string): boolean {
  const candidate = value[key];
  return (
    candidate === undefined || (Array.isArray(candidate) && candidate.every(isLibraryCategory))
  );
}

function hasValidOptionalObject(value: Record<string, unknown>, key: string): boolean {
  return value[key] === undefined || isRecord(value[key]);
}

function isValidBunBuddyKind(value: Record<string, unknown>): boolean {
  if (value.bunbuddyKind === undefined) {
    return true;
  }
  return (
    typeof value.bunbuddyKind === "string" &&
    BUNBUDDY_KINDS.includes(value.bunbuddyKind as BunBuddyKind)
  );
}

function isLibraryCoverageBucket(
  value: unknown,
): value is LibraryCoverageResponse["buckets"][number] {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isLibraryCategory(value.category) &&
    isTrimmedString(value.label) &&
    isFiniteNumber(value.total) &&
    isRecord(value.sources) &&
    hasNumericRecordValues(value.sources, isLibrarySource) &&
    isValidBucketsList(value.libraries) &&
    isValidBucketsList(value.missing)
  );
}

function isValidBucketsList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((name) => typeof name === "string");
}

/**
 * Runtime guard for {@link LibraryEntry}.
 *
 * @param value - Candidate value.
 * @returns True when value matches LibraryEntry structure.
 */
export function isLibraryEntry(value: unknown): value is LibraryEntry {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isTrimmedString(value.name) &&
    isTrimmedString(value.version) &&
    isLibrarySource(value.source) &&
    isTrimmedString(value.runtime) &&
    isLibraryStatus(value.status) &&
    isTrimmedString(value.lastSeen) &&
    isValidBunBuddyKind(value) &&
    hasValidOptionalStringArray(value, "endpoints") &&
    hasValidOptionalObject(value, "features") &&
    hasValidOptionalCategoryArray(value, "categories") &&
    hasValidOptionalStringArray(value, "notes") &&
    hasValidOptionalObject(value, "metadata")
  );
}

/**
 * Runtime guard for {@link LibraryRegistryResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches LibraryRegistryResponse structure.
 */
export function isLibraryRegistryResponse(value: unknown): value is LibraryRegistryResponse {
  if (!isRecord(value)) {
    return false;
  }
  if (value.ok !== true) {
    return false;
  }
  if (!(Array.isArray(value.items) && value.items.every(isLibraryEntry))) {
    return false;
  }
  if (!isFiniteNumber(value.count)) {
    return false;
  }
  if (!isTrimmedString(value.timestamp)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link LibraryDetailResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches LibraryDetailResponse structure.
 */
export function isLibraryDetailResponse(value: unknown): value is LibraryDetailResponse {
  if (!isRecord(value)) {
    return false;
  }
  if (value.ok !== true) {
    return false;
  }
  if (!isTrimmedString(value.name)) {
    return false;
  }
  if (!(Array.isArray(value.entries) && value.entries.every(isLibraryEntry))) {
    return false;
  }
  if (!isTrimmedString(value.timestamp)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link LibraryCoverageResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches LibraryCoverageResponse structure.
 */
export function isLibraryCoverageResponse(value: unknown): value is LibraryCoverageResponse {
  if (!isRecord(value)) {
    return false;
  }
  if (value.ok !== true) {
    return false;
  }
  return (
    Array.isArray(value.buckets) &&
    value.buckets.every(isLibraryCoverageBucket) &&
    isTrimmedString(value.timestamp)
  );
}

/**
 * Runtime guard for {@link LibraryOverviewSummary}.
 *
 * @param value - Candidate value.
 * @returns True when value matches LibraryOverviewSummary structure.
 */
export function isLibraryOverviewSummary(value: unknown): value is LibraryOverviewSummary {
  if (!isRecord(value)) {
    return false;
  }
  if (!isFiniteNumber(value.total)) {
    return false;
  }
  if (!isFiniteNumber(value.missingTotal)) {
    return false;
  }
  if (!(isRecord(value.bySource) && isRecord(value.byCategory))) {
    return false;
  }
  if (!hasNumericRecordValues(value.bySource, isLibrarySource)) {
    return false;
  }
  if (!hasNumericRecordValues(value.byCategory, isLibraryCategory)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link LibraryOverviewResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches LibraryOverviewResponse structure.
 */
export function isLibraryOverviewResponse(value: unknown): value is LibraryOverviewResponse {
  if (!isRecord(value)) {
    return false;
  }
  if (value.ok !== true) {
    return false;
  }
  if (!isLibraryRegistryResponse(value.registry)) {
    return false;
  }
  if (!isLibraryCoverageResponse(value.coverage)) {
    return false;
  }
  if (!isLibraryOverviewSummary(value.summary)) {
    return false;
  }
  if (!isTrimmedString(value.timestamp)) {
    return false;
  }
  return true;
}
