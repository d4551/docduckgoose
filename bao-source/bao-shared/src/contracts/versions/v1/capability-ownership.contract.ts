/**
 * Capability Ownership Contracts v1
 *
 * Defines the versioned contracts for capability ownership map and refresh endpoints.
 *
 * @shared/contracts/versions/v1/capability-ownership
 */

import {
  CapabilityOwnershipCoverageRequestSchema,
  CapabilityOwnershipFocusRequestSchema,
  CapabilityOwnershipMapRequestSchema,
  CapabilityOwnershipRefreshRequestSchema,
} from "@baohaus/bao-schemas/capability-ownership/requests";
import {
  CapabilityOwnershipCoverageResponseSchema,
  CapabilityOwnershipFocusResponseSchema,
  CapabilityOwnershipMapResponseSchema,
  CapabilityOwnershipRefreshResponseSchema,
} from "@baohaus/bao-schemas/capability-ownership/responses";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  CAPABILITY_OWNERSHIP_CONTRACT_VERSION as CAPABILITY_OWNERSHIP_CONTRACT_VERSION_VALUE,
  CAPABILITY_OWNERSHIP_COVERAGE_CONTRACT_NAME as CAPABILITY_OWNERSHIP_COVERAGE_CONTRACT_NAME_VALUE,
  CAPABILITY_OWNERSHIP_FOCUS_CONTRACT_NAME as CAPABILITY_OWNERSHIP_FOCUS_CONTRACT_NAME_VALUE,
  CAPABILITY_OWNERSHIP_MAP_CONTRACT_NAME as CAPABILITY_OWNERSHIP_MAP_CONTRACT_NAME_VALUE,
  CAPABILITY_OWNERSHIP_REFRESH_CONTRACT_NAME as CAPABILITY_OWNERSHIP_REFRESH_CONTRACT_NAME_VALUE,
} from "../../../constants/capability-ownership";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION: "1.0.0" = CAPABILITY_OWNERSHIP_CONTRACT_VERSION_VALUE;

/**
 * Contract version alias for shared exports.
 */
export const CAPABILITY_OWNERSHIP_CONTRACT_VERSION: "1.0.0" = CONTRACT_VERSION;

/**
 * Contract name for the ownership map endpoint.
 */
export const MAP_CONTRACT_NAME: "capability-ownership-map" =
  CAPABILITY_OWNERSHIP_MAP_CONTRACT_NAME_VALUE;

/**
 * Contract name alias for shared exports (map).
 */
export const CAPABILITY_OWNERSHIP_MAP_CONTRACT_NAME: "capability-ownership-map" = MAP_CONTRACT_NAME;

/**
 * Contract name for the ownership refresh endpoint.
 */
export const REFRESH_CONTRACT_NAME: "capability-ownership-refresh" =
  CAPABILITY_OWNERSHIP_REFRESH_CONTRACT_NAME_VALUE;

/**
 * Contract name for the ownership focus endpoint.
 */
export const FOCUS_CONTRACT_NAME: "capability-ownership-focus" =
  CAPABILITY_OWNERSHIP_FOCUS_CONTRACT_NAME_VALUE;

/**
 * Contract name for the ownership coverage endpoint.
 */
export const COVERAGE_CONTRACT_NAME: "capability-ownership-coverage" =
  CAPABILITY_OWNERSHIP_COVERAGE_CONTRACT_NAME_VALUE;

/**
 * Contract name alias for shared exports (refresh).
 */
export const CAPABILITY_OWNERSHIP_REFRESH_CONTRACT_NAME: "capability-ownership-refresh" =
  REFRESH_CONTRACT_NAME;

/**
 * Contract name alias for shared exports (focus).
 */
export const CAPABILITY_OWNERSHIP_FOCUS_CONTRACT_NAME: "capability-ownership-focus" =
  FOCUS_CONTRACT_NAME;

/**
 * Contract name alias for shared exports (coverage).
 */
export const CAPABILITY_OWNERSHIP_COVERAGE_CONTRACT_NAME: "capability-ownership-coverage" =
  COVERAGE_CONTRACT_NAME;

/**
 * Request schema for capability ownership map endpoint.
 */
export const CapabilityOwnershipMapRequestV1: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = CapabilityOwnershipMapRequestSchema;

/**
 * Request schema for capability ownership focus endpoint.
 */
export const CapabilityOwnershipFocusRequestV1: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = CapabilityOwnershipFocusRequestSchema;

/**
 * Request schema for capability ownership coverage endpoint.
 */
export const CapabilityOwnershipCoverageRequestV1: Type.TObject<
  { readonly refresh: Type.TOptional<Type.TBoolean> },
  never,
  "refresh"
> = CapabilityOwnershipCoverageRequestSchema;

/**
 * Response schema for capability ownership map endpoint.
 */
export const CapabilityOwnershipMapResponseV1: typeof CapabilityOwnershipMapResponseSchema =
  CapabilityOwnershipMapResponseSchema;

/**
 * Response schema for capability ownership focus endpoint.
 */
export const CapabilityOwnershipFocusResponseV1: typeof CapabilityOwnershipFocusResponseSchema =
  CapabilityOwnershipFocusResponseSchema;

/**
 * Response schema for capability ownership coverage endpoint.
 */
export const CapabilityOwnershipCoverageResponseV1: typeof CapabilityOwnershipCoverageResponseSchema =
  CapabilityOwnershipCoverageResponseSchema;

/**
 * Request schema for capability ownership refresh endpoint.
 */
export const CapabilityOwnershipRefreshRequestV1: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = CapabilityOwnershipRefreshRequestSchema;

/**
 * Response schema for capability ownership refresh endpoint.
 */
export const CapabilityOwnershipRefreshResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly queued: Type.TBoolean;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly refreshed: Type.TBoolean;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "ok" | "timestamp" | "queued" | "refreshed" | "jobId",
  "correlationId"
> = CapabilityOwnershipRefreshResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for capability ownership map failures.
 */
export const CapabilityOwnershipMapErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Error schema for capability ownership focus failures.
 */
export const CapabilityOwnershipFocusErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Error schema for capability ownership coverage failures.
 */
export const CapabilityOwnershipCoverageErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Error schema for capability ownership refresh failures.
 */
export const CapabilityOwnershipRefreshErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Capability ownership map contract definition (v1).
 */
export const CapabilityOwnershipMapContractV1 = {
  name: MAP_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: CapabilityOwnershipMapRequestV1,
  response: CapabilityOwnershipMapResponseV1,
  errors: CapabilityOwnershipMapErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Capability ownership focus contract definition (v1).
 */
export const CapabilityOwnershipFocusContractV1 = {
  name: FOCUS_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: CapabilityOwnershipFocusRequestV1,
  response: CapabilityOwnershipFocusResponseV1,
  errors: CapabilityOwnershipFocusErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Capability ownership coverage contract definition (v1).
 */
export const CapabilityOwnershipCoverageContractV1 = {
  name: COVERAGE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: CapabilityOwnershipCoverageRequestV1,
  response: CapabilityOwnershipCoverageResponseV1,
  errors: CapabilityOwnershipCoverageErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Capability ownership refresh contract definition (v1).
 */
export const CapabilityOwnershipRefreshContractV1 = {
  name: REFRESH_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: CapabilityOwnershipRefreshRequestV1,
  response: CapabilityOwnershipRefreshResponseV1,
  errors: CapabilityOwnershipRefreshErrorV1,
} as const satisfies VersionedContractV1;
