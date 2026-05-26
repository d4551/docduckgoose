/**
 * Runtime validator for sidebar contribution registrations.
 *
 * Companion to `./sidebar` — the TypeScript shape (`SidebarRegistration`)
 * lives in the same package as the runtime validator so any consumer
 * (registry, bao-runtime, forge, bao-ai-gateway) imports both from one
 * canonical surface and the per-app re-implementations the install
 * dispatchers used to carry are eliminated.
 *
 * Validator is self-contained — no cross-package narrowing helper
 * dependency. The boundary-input shape is the standard JSON-decoded
 * `unknown` an HTTP handler or `.bao` archive ingest emits.
 *
 * Submodule subpath only — `@baohaus/contribution-registry-bao/sidebar-validate`.
 *
 * @packageDocumentation
 */
import { SIDEBAR_SECTIONS, type SidebarRegistration, type SidebarSectionId } from "./sidebar.ts";

type BoundaryRecord = Readonly<Record<string, unknown>>;

/** Set of canonical section identifiers, derived from the canonical taxonomy. */
export const SIDEBAR_SECTION_IDS: ReadonlySet<SidebarSectionId> = new Set(
  Object.values(SIDEBAR_SECTIONS).map((section) => section.id),
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

function isNavLabelKey(candidate: BoundaryRecord): boolean {
  const value = candidate.labelKey;
  return typeof value === "string" && value.startsWith("nav.");
}

function isKnownSidebarSection(candidate: BoundaryRecord): boolean {
  const value = candidate.section;
  if (typeof value !== "string") {
    return false;
  }
  for (const sectionId of SIDEBAR_SECTION_IDS) {
    if (sectionId === value) {
      return true;
    }
  }
  return false;
}

/**
 * Validate that a candidate value satisfies the {@link SidebarRegistration}
 * shape. Returns a TypeScript type-predicate so callers narrow without
 * top-type casts.
 *
 * @param value - Candidate registration record.
 * @returns True when the value is a valid registration descriptor.
 */
export function isSidebarRegistration(value: unknown): value is SidebarRegistration {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value, "id") &&
    isNonEmptyString(value, "extensionId") &&
    isKnownSidebarSection(value) &&
    isFiniteNumber(value, "position") &&
    isNavLabelKey(value) &&
    isNonEmptyString(value, "href")
  );
}
