/**
 * Shared utilities for annotation UI consistency.
 *
 * Provides helper functions for working with annotation types, including:
 * - Provider-specific color mapping for visual differentiation
 * - DaisyUI badge class resolution for annotation types
 * - Type guards and normalization for annotation type values
 * - Subject reference validation for subjectType/subjectId pairs
 *
 * @example
 * ```typescript
 * // Get provider color for styling
 * const color = providerColor('azure'); // '#3b82f6'
 *
 * // Get badge class for annotation
 * const badgeClass = getAnnotationBadgeClass('tumor'); // 'badge-error'
 *
 * // Validate annotation type
 * if (isAnnotationType(value)) {
 *   // value is now typed as AnnotationType
 * }
 * ```
 */

import {
  ANNOTATION_CONTEXT_TYPES,
  ANNOTATION_TYPES,
  type AnnotationContextType,
  type AnnotationType,
  COORDINATE_SPACE_TYPES,
  type CoordinateSpaceType,
  type UsdAnnotationProperties,
} from "@baohaus/bao-types/annotations";
import { PROVIDER_COLOR_TOKENS } from "./provider-color-tokens";

const annotationTypeValues: Set<unknown> = new Set<AnnotationType>(Object.values(ANNOTATION_TYPES));
const coordinateSpaceValues: Set<unknown> = new Set<CoordinateSpaceType>(
  Object.values(COORDINATE_SPACE_TYPES),
);
const twoDCoordinateSpaces: Set<unknown> = new Set<CoordinateSpaceType>([
  COORDINATE_SPACE_TYPES.NORMALIZED_IMAGE,
  COORDINATE_SPACE_TYPES.PIXEL_IMAGE,
  COORDINATE_SPACE_TYPES.VIEWPORT,
  COORDINATE_SPACE_TYPES.CANVAS,
]);
const threeDCoordinateSpaces: Set<unknown> = new Set<CoordinateSpaceType>([
  COORDINATE_SPACE_TYPES.WORLD,
  COORDINATE_SPACE_TYPES.MODEL_LOCAL,
  COORDINATE_SPACE_TYPES.USD_PRIM_PATH,
]);

/**
 * Gets the color associated with a specific provider.
 *
 * @param provider - The name of the provider (e.g., 'azure', 'huggingface').
 * @returns The color string for the provider, or the default token fallback.
 */
export function providerColor(provider: string | null | undefined): string {
  const key = String(provider ?? "").toLowerCase();
  const map: Record<string, keyof typeof PROVIDER_COLOR_TOKENS> = {
    azure: "azure",
    "azure-ai": "azure",
    "ms-azure": "azure",
    huggingface: "huggingface",
    hf: "huggingface",
  };
  const token = map[key] ? PROVIDER_COLOR_TOKENS[map[key]] : PROVIDER_COLOR_TOKENS.default;
  return token.fallback;
}

/**
 * Gets the CSS badge class for a specific annotation type.
 *
 * @param type - The type of annotation (e.g., 'tumor', 'normal').
 * @returns The DaisyUI badge class string.
 */
export function getAnnotationBadgeClass(type: string): string {
  const mapping: Record<string, string> = {
    tumor: "badge-error",
    normal: "badge-success",
    necrosis: "badge-secondary",
    vessel: "badge-warning",
    mitosis: "badge-primary",
    roi: "badge-info",
  };
  return mapping[type] || "badge-ghost";
}

/**
 * Check whether a value is a valid annotation type.
 *
 * @param value - Candidate annotation type.
 * @returns True when the value is a supported annotation type.
 */
export function isAnnotationType(value: unknown): value is AnnotationType {
  return typeof value === "string" && (annotationTypeValues as ReadonlySet<string>).has(value);
}

/**
 * Normalize an annotation type value into a supported annotation type.
 *
 * @param value - Candidate annotation type.
 * @param fallback - Fallback annotation type.
 * @returns Normalized annotation type.
 */
export function normalizeAnnotationType(
  value: unknown,
  fallback: AnnotationType = ANNOTATION_TYPES.POINT,
): AnnotationType {
  if (isAnnotationType(value)) {
    return value;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (isAnnotationType(normalized)) {
      return normalized;
    }
  }
  return fallback;
}

/**
 * Check whether a value is a valid coordinate space type.
 *
 * @param value - Candidate coordinate space.
 * @returns True when the value is a supported coordinate space.
 */
export function isCoordinateSpaceType(value: unknown): value is CoordinateSpaceType {
  return typeof value === "string" && (coordinateSpaceValues as ReadonlySet<string>).has(value);
}

/**
 * Validate coordinate space compatibility for a given annotation context.
 *
 * @param contextType - Annotation context type.
 * @param coordinateSpace - Coordinate space to validate.
 * @returns True when the coordinate space is valid for the context.
 */
export function isCoordinateSpaceCompatible(
  contextType: AnnotationContextType,
  coordinateSpace: CoordinateSpaceType,
): boolean {
  if (contextType === ANNOTATION_CONTEXT_TYPES.CONTEXT_2D) {
    return twoDCoordinateSpaces.has(coordinateSpace);
  }
  return threeDCoordinateSpaces.has(coordinateSpace);
}

/**
 * Normalize a coordinate space string into a canonical enum value.
 *
 * @param value - Candidate coordinate space.
 * @param fallback - Fallback coordinate space when normalization fails.
 * @returns Normalized coordinate space or fallback.
 */
export function normalizeCoordinateSpace(
  value: unknown,
  fallback: CoordinateSpaceType | null = null,
): CoordinateSpaceType | null {
  if (isCoordinateSpaceType(value)) {
    return value;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) {
      return fallback;
    }
    const normalized = trimmed.toUpperCase();
    if ((coordinateSpaceValues as ReadonlySet<string>).has(normalized)) {
      return normalized as CoordinateSpaceType;
    }
  }
  return fallback;
}

/**
 * USD prim path pattern validation.
 *
 * Matches paths like "/World", "/World/Model", "/World/Model/Mesh_001".
 */
const USD_PRIM_PATH_PATTERN = /^\/[a-zA-Z_][a-zA-Z0-9_]*(?:\/[a-zA-Z_][a-zA-Z0-9_]*)*$/;

/**
 * Validate a USD prim path format.
 *
 * @param path - Prim path to validate.
 * @returns True when the path matches USD prim path rules.
 */
export function isValidUsdPrimPath(path: string): boolean {
  if (!path || typeof path !== "string") {
    return false;
  }
  return USD_PRIM_PATH_PATTERN.test(path);
}

/**
 * Validate USD annotation properties for prim-path requirements.
 *
 * @param properties - USD annotation properties payload.
 * @returns Error message when invalid; otherwise null.
 */
export function validateUsdAnnotationProperties(
  properties: object | null | undefined,
): string | null {
  if (!properties) {
    return "USD annotations require properties with primPath";
  }

  if (!("primPath" in properties)) {
    return "USD annotations require a valid primPath property";
  }

  const primPath = properties.primPath;
  if (typeof primPath !== "string" || !primPath.trim()) {
    return "USD annotations require a valid primPath property";
  }

  if (!isValidUsdPrimPath(primPath)) {
    return `Invalid USD prim path format: ${primPath}`;
  }

  return null;
}

/**
 * Split USD annotation keys from metadata while preserving remaining metadata fields.
 *
 * @param metadata - Metadata that may include USD prim path keys.
 * @returns USD properties and cleaned metadata (if any).
 */
export function splitUsdAnnotationMetadata(metadata?: Record<string, unknown> | null): {
  usdProperties?: UsdAnnotationProperties;
  metadata?: Record<string, unknown>;
} {
  if (!metadata) {
    return {};
  }

  const nextMetadata = { ...metadata };
  const primPath = typeof nextMetadata.primPath === "string" ? nextMetadata.primPath : undefined;
  if (primPath === undefined) {
    const result: {
      usdProperties?: UsdAnnotationProperties;
      metadata?: Record<string, unknown>;
    } = {};
    if (Object.keys(nextMetadata).length > 0) {
      result.metadata = nextMetadata;
    }
    return result;
  }

  const usdProperties: UsdAnnotationProperties = { primPath };
  if (typeof nextMetadata.customDataKey === "string" && nextMetadata.customDataKey.trim()) {
    usdProperties.customDataKey = nextMetadata.customDataKey;
  }
  if (typeof nextMetadata.usdAssetId === "string" && nextMetadata.usdAssetId.trim()) {
    usdProperties.usdAssetId = nextMetadata.usdAssetId;
  }

  nextMetadata.primPath = undefined;
  nextMetadata.customDataKey = undefined;
  nextMetadata.usdAssetId = undefined;

  const result: {
    usdProperties?: UsdAnnotationProperties;
    metadata?: Record<string, unknown>;
  } = { usdProperties };
  if (Object.keys(nextMetadata).length > 0) {
    result.metadata = nextMetadata;
  }
  return result;
}

/**
 * Validate that subjectType and subjectId are provided together.
 *
 * @param subjectType - Optional subject type.
 * @param subjectId - Optional subject identifier.
 * @param options - Optional validation options.
 * @returns Error message when invalid, otherwise null.
 */
export function validateSubjectPair(
  subjectType?: string | null,
  subjectId?: string | null,
  options: { requireBothWhenDefined?: boolean } = {},
): string | null {
  const subjectTypeProvided = subjectType !== undefined;
  const subjectIdProvided = subjectId !== undefined;
  if (options.requireBothWhenDefined && subjectTypeProvided !== subjectIdProvided) {
    return "subjectType and subjectId must be provided together";
  }

  const resolvedType = subjectType ?? null;
  const resolvedId = subjectId ?? null;
  if ((resolvedType && !resolvedId) || (!resolvedType && resolvedId)) {
    return "subjectType and subjectId must be provided together";
  }
  return null;
}
