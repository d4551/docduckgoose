/**
 * Runtime validator for api-group contribution registrations.
 *
 * Self-contained — no cross-package narrowing dependency. Submodule
 * subpath only — `@baohaus/contribution-registry-bao/api-group-validate`.
 *
 * @packageDocumentation
 */
import { API_GROUP_METHODS, type ApiGroupMethod, type ApiGroupRegistration } from "./api-group.ts";

type BoundaryRecord = Readonly<Record<string, unknown>>;

/** Set of canonical API HTTP-method identifiers. */
export const API_GROUP_METHOD_IDS: ReadonlySet<ApiGroupMethod> = new Set(
  Object.values(API_GROUP_METHODS),
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

function isApiLabelKey(candidate: BoundaryRecord): boolean {
  const value = candidate.labelKey;
  return typeof value === "string" && value.startsWith("api.");
}

function isApiMethodValue(value: unknown): value is ApiGroupMethod {
  if (typeof value !== "string") {
    return false;
  }
  for (const method of API_GROUP_METHOD_IDS) {
    if (method === value) {
      return true;
    }
  }
  return false;
}

function isApiRoutePathString(value: unknown): boolean {
  return typeof value === "string" && value.startsWith("/");
}

function isApiRouteSpec(value: unknown): boolean {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value, "id") &&
    isApiMethodValue(value.method) &&
    isApiRoutePathString(value.path) &&
    isNonEmptyString(value, "summaryKey")
  );
}

function hasRoutesArray(candidate: BoundaryRecord): boolean {
  const routes = candidate.routes;
  if (!Array.isArray(routes) || routes.length === 0) {
    return false;
  }
  return routes.every(isApiRouteSpec);
}

/**
 * Validate that a candidate value satisfies the {@link ApiGroupRegistration} shape.
 */
export function isApiGroupRegistration(value: unknown): value is ApiGroupRegistration {
  if (!isRecord(value)) {
    return false;
  }
  return (
    isNonEmptyString(value, "id") &&
    isNonEmptyString(value, "extensionId") &&
    isNonEmptyString(value, "serviceId") &&
    isApiLabelKey(value) &&
    isNonEmptyString(value, "baseUrl") &&
    isFiniteNumber(value, "position") &&
    hasRoutesArray(value)
  );
}
