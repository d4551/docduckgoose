/**
 * Capability domain map constants.
 *
 * Centralizes contract/config limits for capability-domain-map APIs so route
 * validation, config normalization, and queue orchestration stay aligned.
 *
 * @shared/constants/capability-domain-map
 */

/**
 * Maximum idempotency key length accepted by capability-domain-map refresh APIs.
 */
export const CAPABILITY_DOMAIN_MAP_REFRESH_IDEMPOTENCY_KEY_MAX_LENGTH = 128;

/**
 * Canonical capability domain-map error codes emitted by server resolvers.
 */
export const CAPABILITY_DOMAIN_MAP_ERROR_CODE: {
  readonly ownerMatrixStacksUnknown: "OWNER_MATRIX_STACKS_UNKNOWN";
  readonly domainOwnershipIdsUnknown: "DOMAIN_OWNERSHIP_IDS_UNKNOWN";
  readonly ownershipSnapshotUnavailable: "OWNERSHIP_SNAPSHOT_UNAVAILABLE";
  readonly baoRuntimeUnavailable: "BAO_RUNTIME_UNAVAILABLE";
  readonly ownerStackCompatibilityStacksUnknown: "OWNER_STACK_COMPATIBILITY_STACKS_UNKNOWN";
  readonly ownerStackCompatibilityUnsupported: "OWNER_STACK_COMPATIBILITY_UNSUPPORTED";
} = {
  ownerMatrixStacksUnknown: "OWNER_MATRIX_STACKS_UNKNOWN",
  domainOwnershipIdsUnknown: "DOMAIN_OWNERSHIP_IDS_UNKNOWN",
  ownershipSnapshotUnavailable: "OWNERSHIP_SNAPSHOT_UNAVAILABLE",
  baoRuntimeUnavailable: "BAO_RUNTIME_UNAVAILABLE",
  ownerStackCompatibilityStacksUnknown: "OWNER_STACK_COMPATIBILITY_STACKS_UNKNOWN",
  ownerStackCompatibilityUnsupported: "OWNER_STACK_COMPATIBILITY_UNSUPPORTED",
} as const;

/**
 * Ordered list of known capability domain-map error codes.
 */
export const CAPABILITY_DOMAIN_MAP_ERROR_CODES: readonly (
  | "OWNER_MATRIX_STACKS_UNKNOWN"
  | "DOMAIN_OWNERSHIP_IDS_UNKNOWN"
  | "OWNERSHIP_SNAPSHOT_UNAVAILABLE"
  | "BAO_RUNTIME_UNAVAILABLE"
  | "OWNER_STACK_COMPATIBILITY_STACKS_UNKNOWN"
  | "OWNER_STACK_COMPATIBILITY_UNSUPPORTED"
)[] = Object.freeze(Object.values(CAPABILITY_DOMAIN_MAP_ERROR_CODE));

/**
 * TypeScript type for known capability domain-map error codes.
 */
export type CapabilityDomainMapErrorCode = (typeof CAPABILITY_DOMAIN_MAP_ERROR_CODES)[number];

/**
 * Severity class assigned to capability domain-map error codes.
 */
export type CapabilityDomainMapErrorSeverity = "partial" | "degraded" | "unknown";

const CAPABILITY_DOMAIN_MAP_ERROR_SEVERITY_BY_CODE: Record<
  CapabilityDomainMapErrorCode,
  Exclude<CapabilityDomainMapErrorSeverity, "unknown">
> = {
  [CAPABILITY_DOMAIN_MAP_ERROR_CODE.ownerMatrixStacksUnknown]: "partial",
  [CAPABILITY_DOMAIN_MAP_ERROR_CODE.domainOwnershipIdsUnknown]: "partial",
  [CAPABILITY_DOMAIN_MAP_ERROR_CODE.ownershipSnapshotUnavailable]: "degraded",
  [CAPABILITY_DOMAIN_MAP_ERROR_CODE.baoRuntimeUnavailable]: "degraded",
  [CAPABILITY_DOMAIN_MAP_ERROR_CODE.ownerStackCompatibilityStacksUnknown]: "partial",
  [CAPABILITY_DOMAIN_MAP_ERROR_CODE.ownerStackCompatibilityUnsupported]: "degraded",
};

/**
 * Determine whether a value is a known capability domain-map error code.
 *
 * @param value - Candidate error code value.
 * @returns True when the value matches a known domain-map error code.
 */
export function isCapabilityDomainMapErrorCode(
  value: string,
): value is CapabilityDomainMapErrorCode {
  return (CAPABILITY_DOMAIN_MAP_ERROR_CODES as readonly string[]).includes(value);
}

/**
 * Resolve severity for a capability domain-map error code.
 *
 * @param code - Candidate domain-map error code.
 * @returns Error severity bucket.
 */
export function resolveCapabilityDomainMapErrorSeverity(
  code: string | undefined,
): CapabilityDomainMapErrorSeverity {
  if (!(code && isCapabilityDomainMapErrorCode(code))) {
    return "unknown";
  }
  return CAPABILITY_DOMAIN_MAP_ERROR_SEVERITY_BY_CODE[code];
}

/**
 * Minimum idempotency TTL bound for capability-domain-map refresh jobs.
 */
export const CAPABILITY_DOMAIN_MAP_REFRESH_IDEMPOTENCY_TTL_MIN_MS = 1000;

/**
 * Maximum idempotency TTL bound for capability-domain-map refresh jobs.
 */
export const CAPABILITY_DOMAIN_MAP_REFRESH_IDEMPOTENCY_TTL_MAX_MS = 600_000;

/**
 * Minimum singleton window bound for capability-domain-map refresh jobs.
 */
export const CAPABILITY_DOMAIN_MAP_REFRESH_SINGLETON_MIN_SECONDS = 1;

/**
 * Maximum singleton window bound for capability-domain-map refresh jobs.
 */
export const CAPABILITY_DOMAIN_MAP_REFRESH_SINGLETON_MAX_SECONDS = 3600;

/**
 * Minimum schedule interval bound for capability-domain-map refresh jobs.
 */
export const CAPABILITY_DOMAIN_MAP_REFRESH_SCHEDULE_MIN_MS = 0;

/**
 * Maximum schedule interval bound for capability-domain-map refresh jobs.
 */
export const CAPABILITY_DOMAIN_MAP_REFRESH_SCHEDULE_MAX_MS = 3_600_000;
