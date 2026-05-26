/**
 * AI service alignment types and runtime guards.
 *
 * Provides TypeScript types derived from AI service alignment schemas,
 * along with runtime guards for validation.
 *
 * @shared/types/ai-service-alignment.ts
 */

import {
  AI_SERVICE_ALIGNMENT_SURFACES,
  type AiServiceAlignmentCoverage,
  type AiServiceAlignmentError,
  type AiServiceAlignmentMapResponse,
  type AiServiceAlignmentProvider,
  type AiServiceAlignmentService,
  type AiServiceAlignmentSummary,
  type AiServiceAlignmentSurface,
} from "@baohaus/bao-schemas/ai-service-alignment.schemas";
import { AI_PROVIDER_KEYS, type AiProviderKeyResolved } from "./ai-providers.ts";
import { isAnnotationAlignmentIntent } from "./annotation-alignment.ts";
import {
  isCapabilityOwnershipError,
  isCapabilityOwnershipFocusMap,
} from "./capability-ownership.ts";
import { isRecord } from "./internal/record.js";

/** AI service alignment schema types re-exported for downstream consumers. */
export type {
  AiServiceAlignmentCoverage,
  AiServiceAlignmentError,
  AiServiceAlignmentMapRequest,
  AiServiceAlignmentMapResponse,
  AiServiceAlignmentProvider,
  AiServiceAlignmentRefreshRequest,
  AiServiceAlignmentRefreshResponse,
  AiServiceAlignmentService,
  AiServiceAlignmentSummary,
  AiServiceAlignmentSurface,
} from "@baohaus/bao-schemas/ai-service-alignment.schemas";

const ALIGNMENT_PROVIDER_KEYS: string[] = AI_PROVIDER_KEYS.filter(
  (key): key is AiProviderKeyResolved => key !== "auto",
);

const stringArrayKeys: readonly string[] = [
  "libraries",
  "libraryCategories",
  "plugins",
  "bunbuddies",
  "drivers",
  "driverPackages",
  "devices",
  "deviceSources",
  "deviceDriverPackages",
  "mcpDomains",
] as const;

type StringArrayKey = (typeof stringArrayKeys)[number];

function isNonEmptyTrimmedString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalNonEmptyTrimmedString(value: unknown): value is string | undefined {
  return value === undefined || isNonEmptyTrimmedString(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

function hasRecord(value: unknown): value is Record<string, unknown> {
  return isRecord(value);
}

function hasOptionalValidatedCollection<T>(
  record: Record<string, unknown>,
  key: string,
  validate: (candidate: unknown) => candidate is T,
): boolean {
  const candidate = record[key];
  return candidate === undefined || (isStringArray(candidate) && candidate.every(validate));
}

function hasRequiredValidatedCollection<T>(
  record: Record<string, unknown>,
  key: string,
  validate: (candidate: unknown) => candidate is T,
): boolean {
  const candidate = record[key];
  return isStringArray(candidate) && candidate.every(validate);
}

function isValidCoverageArray(record: Record<string, unknown>, key: string): boolean {
  const candidate = record[key];
  return isStringArray(candidate);
}

function isCoverageCollectionKey(key: string): key is StringArrayKey {
  return (stringArrayKeys as readonly string[]).includes(key);
}

function hasOptionalCoverageArrays(record: Record<string, unknown>): boolean {
  return Object.keys(record)
    .filter((key) => isCoverageCollectionKey(key))
    .every((key) => isStringArray(record[key]));
}

/**
 * Runtime guard for {@link AiServiceAlignmentSurface}.
 *
 * @param value - Candidate value.
 * @returns True when value is a valid alignment surface.
 */
export function isAiServiceAlignmentSurface(value: unknown): value is AiServiceAlignmentSurface {
  return (
    typeof value === "string" &&
    (AI_SERVICE_ALIGNMENT_SURFACES as readonly string[]).includes(value)
  );
}

/**
 * Runtime guard for AI service alignment provider keys.
 *
 * @param value - Candidate value.
 * @returns True when value is a valid provider key.
 */
export function isAiServiceAlignmentProviderKey(value: unknown): value is AiProviderKeyResolved {
  return (
    typeof value === "string" && (ALIGNMENT_PROVIDER_KEYS as readonly string[]).includes(value)
  );
}

/**
 * Runtime guard for {@link AiServiceAlignmentProvider}.
 *
 * @param value - Candidate value.
 * @returns True when value matches provider metadata.
 */
export function isAiServiceAlignmentProvider(value: unknown): value is AiServiceAlignmentProvider {
  if (!isRecord(value)) {
    return false;
  }
  if (!isAiServiceAlignmentProviderKey(value.key)) {
    return false;
  }
  if (
    !(
      Array.isArray(value.features) &&
      value.features.every((item: unknown) => typeof item === "string")
    )
  ) {
    return false;
  }
  if (
    !(
      Array.isArray(value.libraries) &&
      value.libraries.every((item: unknown) => typeof item === "string")
    )
  ) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link AiServiceAlignmentCoverage}.
 *
 * @param value - Candidate value.
 * @returns True when value matches service coverage structure.
 */
export function isAiServiceAlignmentCoverage(value: unknown): value is AiServiceAlignmentCoverage {
  if (!isRecord(value)) {
    return false;
  }
  return (
    hasOptionalCoverageArrays(value) &&
    stringArrayKeys.every((key) => isValidCoverageArray(value, key))
  );
}

/**
 * Runtime guard for {@link AiServiceAlignmentService}.
 *
 * @param value - Candidate value.
 * @returns True when value matches service alignment structure.
 */
export function isAiServiceAlignmentService(value: unknown): value is AiServiceAlignmentService {
  if (!hasRecord(value)) {
    return false;
  }
  if (!isNonEmptyTrimmedString(value.id)) {
    return false;
  }
  if (!isNonEmptyTrimmedString(value.label)) {
    return false;
  }
  if (!isOptionalNonEmptyTrimmedString(value.description)) {
    return false;
  }
  if (value.intent !== undefined && !isAnnotationAlignmentIntent(value.intent)) {
    return false;
  }
  if (!hasRequiredValidatedCollection(value, "surfaces", isAiServiceAlignmentSurface)) {
    return false;
  }
  if (!hasRequiredValidatedCollection(value, "providers", isAiServiceAlignmentProviderKey)) {
    return false;
  }
  if (!isAiServiceAlignmentCoverage(value.coverage)) {
    return false;
  }

  const fields: Array<keyof AiServiceAlignmentService & string> = [
    "ownershipGroupId",
    "ownershipDomainId",
    "owner",
    "responsibility",
  ];
  if (!fields.every((field) => isOptionalNonEmptyTrimmedString(value[field]))) {
    return false;
  }

  if (!hasOptionalValidatedCollection(value, "ownershipSegmentIds", isNonEmptyTrimmedString)) {
    return false;
  }
  if (!hasOptionalValidatedCollection(value, "tags", isNonEmptyTrimmedString)) {
    return false;
  }
  if (value.metadata !== undefined && !isRecord(value.metadata)) {
    return false;
  }

  return true;
}

/**
 * Runtime guard for {@link AiServiceAlignmentSummary}.
 *
 * @param value - Candidate value.
 * @returns True when value matches alignment summary structure.
 */
export function isAiServiceAlignmentSummary(value: unknown): value is AiServiceAlignmentSummary {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.services !== "number" || !Number.isFinite(value.services)) {
    return false;
  }
  if (typeof value.providers !== "number" || !Number.isFinite(value.providers)) {
    return false;
  }
  if (!isRecord(value.byIntent)) {
    return false;
  }
  if (!isRecord(value.bySurface)) {
    return false;
  }
  if (value.bySegment !== undefined && !isRecord(value.bySegment)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link AiServiceAlignmentError}.
 *
 * @param value - Candidate value.
 * @returns True when value matches alignment error structure.
 */
export function isAiServiceAlignmentError(value: unknown): value is AiServiceAlignmentError {
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
 * Runtime guard for {@link AiServiceAlignmentMapResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches alignment map response structure.
 */
export function isAiServiceAlignmentMapResponse(
  value: unknown,
): value is AiServiceAlignmentMapResponse {
  if (!hasRecord(value)) {
    return false;
  }
  if (value.ok !== true) {
    return false;
  }

  if (!hasRequiredValidatedCollection(value, "services", isAiServiceAlignmentService)) {
    return false;
  }
  if (!hasRequiredValidatedCollection(value, "providers", isAiServiceAlignmentProvider)) {
    return false;
  }

  if (!isAiServiceAlignmentSummary(value.summary)) {
    return false;
  }
  if (!isNonEmptyTrimmedString(value.timestamp)) {
    return false;
  }
  if (!isOptionalNonEmptyTrimmedString(value.correlationId)) {
    return false;
  }
  if (value.ownership !== undefined && !isCapabilityOwnershipFocusMap(value.ownership)) {
    return false;
  }
  if (!hasOptionalValidatedCollection(value, "ownershipErrors", isCapabilityOwnershipError)) {
    return false;
  }
  if (!hasOptionalValidatedCollection(value, "errors", isAiServiceAlignmentError)) {
    return false;
  }
  if (value.metadata !== undefined && !isRecord(value.metadata)) {
    return false;
  }
  return true;
}
