/**
 * Runtime validator for UI asset-pack contribution registrations.
 *
 * @packageDocumentation
 */

import {
  UI_ASSET_PACK_COLOR_SCHEMES,
  UI_ASSET_PACK_DENSITY_LEVELS,
  UI_ASSET_PACK_KINDS,
  UI_ASSET_PACK_MOTION_PROFILES,
  UI_ASSET_PACK_TOKEN_CATEGORIES,
  type UiAssetPackRegistration,
} from "./ui-asset-pack.ts";

type BoundaryRecord = Readonly<Record<string, unknown>>;

const COLOR_SCHEMES: ReadonlySet<string> = new Set(UI_ASSET_PACK_COLOR_SCHEMES);
const MOTION_PROFILES: ReadonlySet<string> = new Set(UI_ASSET_PACK_MOTION_PROFILES);
const DENSITY_LEVELS: ReadonlySet<string> = new Set(UI_ASSET_PACK_DENSITY_LEVELS);
const TOKEN_CATEGORIES: ReadonlySet<string> = new Set(UI_ASSET_PACK_TOKEN_CATEGORIES);

function isRecord(value: unknown): value is BoundaryRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(candidate: BoundaryRecord, field: string): boolean {
  const value = candidate[field];
  return typeof value === "string" && value.length > 0;
}

function fieldIsOneOf(
  candidate: BoundaryRecord,
  field: string,
  values: ReadonlySet<string>,
): boolean {
  const value = candidate[field];
  return typeof value === "string" && values.has(value);
}

function hasStylesheet(candidate: BoundaryRecord): boolean {
  const value = candidate.stylesheet;
  return typeof value === "string" && value.length > 0 && value.endsWith(".css");
}

function hasTokenCategories(candidate: BoundaryRecord): boolean {
  const value = candidate.categories;
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((entry) => typeof entry === "string" && TOKEN_CATEGORIES.has(entry))
  );
}

function isBaseAssetPackRegistration(value: unknown): value is BoundaryRecord {
  return (
    isRecord(value) &&
    isNonEmptyString(value, "id") &&
    isNonEmptyString(value, "extensionId") &&
    hasStylesheet(value)
  );
}

export function isUiAssetPackRegistration(value: unknown): value is UiAssetPackRegistration {
  if (!isBaseAssetPackRegistration(value)) {
    return false;
  }
  switch (value.kind) {
    case UI_ASSET_PACK_KINDS.themePack:
      return (
        isNonEmptyString(value, "themeId") &&
        fieldIsOneOf(value, "colorScheme", COLOR_SCHEMES) &&
        isNonEmptyString(value, "daisyUiVersionRange")
      );
    case UI_ASSET_PACK_KINDS.designTokens:
      return isNonEmptyString(value, "tokenSetId") && hasTokenCategories(value);
    case UI_ASSET_PACK_KINDS.motionPreset:
      return (
        isNonEmptyString(value, "presetId") &&
        fieldIsOneOf(value, "profile", MOTION_PROFILES) &&
        value.respectsReducedMotion === true
      );
    case UI_ASSET_PACK_KINDS.densityPreset:
      return isNonEmptyString(value, "presetId") && fieldIsOneOf(value, "density", DENSITY_LEVELS);
    default:
      return false;
  }
}
