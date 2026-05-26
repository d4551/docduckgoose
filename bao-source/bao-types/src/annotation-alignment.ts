/**
 * Annotation alignment types and runtime guards.
 *
 * Provides TypeScript types derived from annotation alignment schemas,
 * along with runtime guards for validation.
 *
 * @shared/types/annotation-alignment.ts
 */

import {
  ANNOTATION_ALIGNMENT_INTENTS,
  type AnnotationAlignmentError,
  type AnnotationAlignmentIntent,
  type AnnotationAlignmentMapResponse,
  type AnnotationAlignmentProvider,
  type AnnotationAlignmentSource,
  type AnnotationAlignmentSummary,
} from "@baohaus/bao-schemas/annotation-alignment.schemas";
import { AI_PROVIDER_KEYS, type AiProviderKeyResolved } from "./ai-providers.ts";
import {
  isCapabilityOwnershipError,
  isCapabilityOwnershipFocusMap,
} from "./capability-ownership.ts";
import { isRecord } from "./internal/record.js";

/** Annotation alignment schema types re-exported for downstream consumers. */
export type {
  AnnotationAlignmentContextType,
  AnnotationAlignmentCoordinateSpace,
  AnnotationAlignmentError,
  AnnotationAlignmentIntent,
  AnnotationAlignmentMapRequest,
  AnnotationAlignmentMapResponse,
  AnnotationAlignmentProvider,
  AnnotationAlignmentRefreshRequest,
  AnnotationAlignmentRefreshResponse,
  AnnotationAlignmentSource,
  AnnotationAlignmentSummary,
} from "@baohaus/bao-schemas/annotation-alignment.schemas";

const ALIGNMENT_PROVIDER_KEYS: string[] = AI_PROVIDER_KEYS.filter(
  (key): key is AiProviderKeyResolved => key !== "auto",
);

function isNonEmptyTrimmedString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalNonEmptyTrimmedString(value: unknown): value is string | undefined {
  return value === undefined || isNonEmptyTrimmedString(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item: unknown) => typeof item === "string");
}

function hasOptionalStringArray(value: unknown): value is string[] | undefined {
  return value === undefined || isStringArray(value);
}

function hasRecord(value: unknown): value is Record<string, unknown> {
  return isRecord(value);
}

function hasOptionalMetadata(value: unknown): value is Record<string, unknown> | undefined {
  return value === undefined || isRecord(value);
}

function hasOptionalValidatedCollection<T>(
  record: Record<string, unknown>,
  key: keyof AnnotationAlignmentSource | keyof AnnotationAlignmentMapResponse,
  validator: (candidate: unknown) => candidate is T,
): boolean {
  const candidate = record[key as string];
  return candidate === undefined || (Array.isArray(candidate) && candidate.every(validator));
}

function hasRequiredValidatedCollection<T>(
  record: Record<string, unknown>,
  key: keyof AnnotationAlignmentMapResponse | keyof AnnotationAlignmentSource,
  validator: (candidate: unknown) => candidate is T,
): boolean {
  const candidate = record[key as string];
  return Array.isArray(candidate) && candidate.every(validator);
}

/**
 * Runtime guard for {@link AnnotationAlignmentIntent}.
 *
 * @param value - Candidate value.
 * @returns True when value is a valid alignment intent.
 */
export function isAnnotationAlignmentIntent(value: unknown): value is AnnotationAlignmentIntent {
  return (
    typeof value === "string" && (ANNOTATION_ALIGNMENT_INTENTS as readonly string[]).includes(value)
  );
}

/**
 * Runtime guard for annotation alignment provider keys.
 *
 * @param value - Candidate value.
 * @returns True when value is a valid provider key.
 */
export function isAnnotationAlignmentProviderKey(value: unknown): value is AiProviderKeyResolved {
  return (
    typeof value === "string" && (ALIGNMENT_PROVIDER_KEYS as readonly string[]).includes(value)
  );
}

/**
 * Runtime guard for {@link AnnotationAlignmentProvider}.
 *
 * @param value - Candidate value.
 * @returns True when value matches provider metadata.
 */
export function isAnnotationAlignmentProvider(
  value: unknown,
): value is AnnotationAlignmentProvider {
  if (!isRecord(value)) {
    return false;
  }
  if (!isAnnotationAlignmentProviderKey(value.key)) {
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
 * Runtime guard for {@link AnnotationAlignmentSource}.
 *
 * @param value - Candidate value.
 * @returns True when value matches alignment source structure.
 */
export function isAnnotationAlignmentSource(value: unknown): value is AnnotationAlignmentSource {
  if (!hasRecord(value)) {
    return false;
  }
  if (!isNonEmptyTrimmedString(value.id)) {
    return false;
  }
  if (!isNonEmptyTrimmedString(value.label)) {
    return false;
  }
  if (!isNonEmptyTrimmedString(value.sourceKey)) {
    return false;
  }
  if (value.intent !== undefined && !isAnnotationAlignmentIntent(value.intent)) {
    return false;
  }
  if (!isNonEmptyTrimmedString(value.contextType)) {
    return false;
  }
  if (!isNonEmptyTrimmedString(value.coordinateSpace)) {
    return false;
  }

  if (!hasRequiredValidatedCollection(value, "providers", isAnnotationAlignmentProviderKey)) {
    return false;
  }
  if (!hasRequiredValidatedCollection(value, "metadataKeys", isNonEmptyTrimmedString)) {
    return false;
  }

  const ownershipStringKeys: Array<
    keyof AnnotationAlignmentSource &
      ("ownershipGroupId" | "ownershipDomainId" | "owner" | "responsibility")
  > = ["ownershipGroupId", "ownershipDomainId", "owner", "responsibility"];
  if (!ownershipStringKeys.every((key) => isOptionalNonEmptyTrimmedString(value[key]))) {
    return false;
  }

  if (!hasOptionalStringArray(value.ownershipSegmentIds)) {
    return false;
  }
  if (!hasOptionalStringArray(value.tags)) {
    return false;
  }
  if (!hasOptionalMetadata(value.metadata)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link AnnotationAlignmentSummary}.
 *
 * @param value - Candidate value.
 * @returns True when value matches alignment summary structure.
 */
export function isAnnotationAlignmentSummary(value: unknown): value is AnnotationAlignmentSummary {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.sources !== "number" || !Number.isFinite(value.sources)) {
    return false;
  }
  if (typeof value.providers !== "number" || !Number.isFinite(value.providers)) {
    return false;
  }
  if (!isRecord(value.byIntent)) {
    return false;
  }
  if (value.bySegment !== undefined && !isRecord(value.bySegment)) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link AnnotationAlignmentError}.
 *
 * @param value - Candidate value.
 * @returns True when value matches alignment error structure.
 */
export function isAnnotationAlignmentError(value: unknown): value is AnnotationAlignmentError {
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
 * Runtime guard for {@link AnnotationAlignmentMapResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches alignment map response structure.
 */
export function isAnnotationAlignmentMapResponse(
  value: unknown,
): value is AnnotationAlignmentMapResponse {
  if (!hasRecord(value)) {
    return false;
  }
  if (value.ok !== true) {
    return false;
  }
  if (!hasRequiredValidatedCollection(value, "sources", isAnnotationAlignmentSource)) {
    return false;
  }
  if (!hasRequiredValidatedCollection(value, "providers", isAnnotationAlignmentProvider)) {
    return false;
  }
  if (!isAnnotationAlignmentSummary(value.summary)) {
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
  if (value.ownershipTimestamp !== undefined && typeof value.ownershipTimestamp !== "string") {
    return false;
  }
  if (!hasOptionalValidatedCollection(value, "errors", isAnnotationAlignmentError)) {
    return false;
  }
  if (value.metadata !== undefined && !isRecord(value.metadata)) {
    return false;
  }
  return true;
}
