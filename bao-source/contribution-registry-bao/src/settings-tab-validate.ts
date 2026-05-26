/**
 * Runtime validator for settings-tab contribution registrations.
 *
 * Self-contained — no cross-package narrowing dependency. Submodule
 * subpath only — `@baohaus/contribution-registry-bao/settings-tab-validate`.
 *
 * @packageDocumentation
 */
import {
  SETTINGS_TAB_SECTIONS,
  type SettingsTabRegistration,
  type SettingsTabSectionId,
} from "./settings-tab.ts";

type BoundaryRecord = Readonly<Record<string, unknown>>;

export const SETTINGS_TAB_SECTION_IDS: ReadonlySet<SettingsTabSectionId> = new Set(
  Object.values(SETTINGS_TAB_SECTIONS).map((section) => section.id),
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

function isSettingsLabelKey(candidate: BoundaryRecord): boolean {
  const value = candidate.labelKey;
  return typeof value === "string" && value.startsWith("settings.");
}

function isKnownSettingsTabSection(candidate: BoundaryRecord): boolean {
  const value = candidate.section;
  if (typeof value !== "string") {
    return false;
  }
  for (const sectionId of SETTINGS_TAB_SECTION_IDS) {
    if (sectionId === value) {
      return true;
    }
  }
  return false;
}

export function isSettingsTabRegistration(value: unknown): value is SettingsTabRegistration {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value, "id") &&
    isNonEmptyString(value, "extensionId") &&
    isKnownSettingsTabSection(value) &&
    isFiniteNumber(value, "position") &&
    isSettingsLabelKey(value) &&
    isNonEmptyString(value, "contentUrl")
  );
}
