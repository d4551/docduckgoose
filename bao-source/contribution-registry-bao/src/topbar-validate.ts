import { TOPBAR_SLOTS, type TopbarRegistration, type TopbarSlotId } from "./topbar.ts";

type BoundaryRecord = Readonly<Record<string, unknown>>;

const TOPBAR_SLOT_IDS: ReadonlySet<TopbarSlotId> = new Set(
  Object.values(TOPBAR_SLOTS).map((slot) => slot.id),
);

function isRecord(value: unknown): value is BoundaryRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(candidate: BoundaryRecord, field: string): boolean {
  const value = candidate[field];
  return typeof value === "string" && value.length > 0;
}

function isOptionalString(candidate: BoundaryRecord, field: string): boolean {
  const value = candidate[field];
  return value === undefined || typeof value === "string";
}

function isFiniteNumber(candidate: BoundaryRecord, field: string): boolean {
  const value = candidate[field];
  return typeof value === "number" && Number.isFinite(value);
}

function isKnownTopbarSlot(candidate: BoundaryRecord): boolean {
  const value = candidate.slot;
  if (typeof value !== "string") {
    return false;
  }
  for (const slotId of TOPBAR_SLOT_IDS) {
    if (slotId === value) {
      return true;
    }
  }
  return false;
}

export function isTopbarRegistration(value: unknown): value is TopbarRegistration {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value, "id") &&
    isNonEmptyString(value, "extensionId") &&
    isKnownTopbarSlot(value) &&
    isFiniteNumber(value, "position") &&
    isNonEmptyString(value, "labelKey") &&
    isOptionalString(value, "tooltipKey") &&
    isOptionalString(value, "href") &&
    isOptionalString(value, "badgeKey") &&
    isOptionalString(value, "iconName") &&
    isOptionalString(value, "iconSvg") &&
    isOptionalString(value, "featureFlag") &&
    isOptionalString(value, "requiredRole") &&
    isOptionalString(value, "capabilityRef")
  );
}
