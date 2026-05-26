/**
 * Runtime validator for palette-entry-group contribution registrations.
 *
 * Self-contained — no cross-package narrowing dependency. Submodule
 * subpath only — `@baohaus/contribution-registry-bao/palette-entry-group-validate`.
 *
 * @packageDocumentation
 */
import {
  PALETTE_ENTRY_KINDS,
  type PaletteEntryGroupRegistration,
  type PaletteEntryKind,
} from "./palette-entry-group.ts";

type BoundaryRecord = Readonly<Record<string, unknown>>;

export const PALETTE_ENTRY_KIND_IDS: ReadonlySet<PaletteEntryKind> = new Set(
  Object.values(PALETTE_ENTRY_KINDS),
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

function isPaletteHeadingKey(candidate: BoundaryRecord): boolean {
  const value = candidate.headingKey;
  return typeof value === "string" && value.startsWith("palette.");
}

function isPaletteEntryKindValue(value: unknown): value is PaletteEntryKind {
  if (typeof value !== "string") {
    return false;
  }
  for (const kind of PALETTE_ENTRY_KIND_IDS) {
    if (kind === value) {
      return true;
    }
  }
  return false;
}

function isPaletteEntrySpec(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value, "id") &&
    isPaletteEntryKindValue(value.kind) &&
    isNonEmptyString(value, "labelKey") &&
    isNonEmptyString(value, "actionUrl")
  );
}

function hasEntriesArray(candidate: BoundaryRecord): boolean {
  const entries = candidate.entries;
  if (!Array.isArray(entries) || entries.length === 0) {
    return false;
  }
  return entries.every(isPaletteEntrySpec);
}

export function isPaletteEntryGroupRegistration(
  value: unknown,
): value is PaletteEntryGroupRegistration {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value, "id") &&
    isNonEmptyString(value, "extensionId") &&
    isPaletteHeadingKey(value) &&
    isFiniteNumber(value, "position") &&
    hasEntriesArray(value)
  );
}
