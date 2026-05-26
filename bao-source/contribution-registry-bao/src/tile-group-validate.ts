/**
 * Runtime validator for tile-group contribution registrations.
 *
 * Self-contained — no cross-package narrowing dependency. Submodule
 * subpath only — `@baohaus/contribution-registry-bao/tile-group-validate`.
 *
 * @packageDocumentation
 */
import {
  TILE_GROUP_WIDTHS,
  type TileGroupRegistration,
  type TileGroupWidth,
} from "./tile-group.ts";

type BoundaryRecord = Readonly<Record<string, unknown>>;

export const TILE_GROUP_WIDTH_IDS: ReadonlySet<TileGroupWidth> = new Set(
  Object.values(TILE_GROUP_WIDTHS),
);

function isRecord(value: unknown): value is BoundaryRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(candidate: BoundaryRecord, field: string): boolean {
  const value = candidate[field];
  return typeof value === "string" && value.length > 0;
}

function isFiniteNumber(candidate: BoundaryRecord, field: string): boolean {
  const value = candidate[field];
  return typeof value === "number" && Number.isFinite(value);
}

function isTileWidthValue(value: unknown): value is TileGroupWidth {
  if (typeof value !== "string") {
    return false;
  }
  for (const width of TILE_GROUP_WIDTH_IDS) {
    if (width === value) {
      return true;
    }
  }
  return false;
}

function isTileLabelKey(candidate: BoundaryRecord): boolean {
  const value = candidate.labelKey;
  return typeof value === "string" && value.startsWith("dashboard.");
}

function isTileSpec(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value, "id") &&
    isTileLabelKey(value) &&
    isTileWidthValue(value.width) &&
    isNonEmptyString(value, "renderUrl")
  );
}

function hasTilesArray(candidate: BoundaryRecord): boolean {
  const tiles = candidate.tiles;
  if (!Array.isArray(tiles) || tiles.length === 0) {
    return false;
  }
  return tiles.every(isTileSpec);
}

export function isTileGroupRegistration(value: unknown): value is TileGroupRegistration {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value, "id") &&
    isNonEmptyString(value, "extensionId") &&
    isNonEmptyString(value, "dashboardId") &&
    isFiniteNumber(value, "position") &&
    hasTilesArray(value)
  );
}
