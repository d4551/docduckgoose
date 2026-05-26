/**
 * BunBuddy Routing Contracts v1
 *
 * Defines the versioned contracts for bunbuddy routing status and refresh endpoints.
 *
 * @shared/contracts/versions/v1/bunbuddy-routing
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  BunBuddyRoutingRefreshRequestSchema,
  BunBuddyRoutingRefreshResponseSchema,
  BunBuddyRoutingStatusResponseSchema,
} from "../../../schemas/bunbuddy-routing.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for bunbuddy routing status endpoint.
 */
export const STATUS_CONTRACT_NAME = "bunbuddy-routing-status";

/**
 * Contract name for bunbuddy routing refresh endpoint.
 */
export const REFRESH_CONTRACT_NAME = "bunbuddy-routing-refresh";

/**
 * Contract name alias for shared exports (status).
 */
export const BUNBUDDY_ROUTING_STATUS_CONTRACT_NAME: "bunbuddy-routing-status" =
  STATUS_CONTRACT_NAME;

/**
 * Contract name alias for shared exports (refresh).
 */
export const BUNBUDDY_ROUTING_REFRESH_CONTRACT_NAME: "bunbuddy-routing-refresh" =
  REFRESH_CONTRACT_NAME;

/**
 * Request schema for bunbuddy routing status endpoint.
 */
export const BunBuddyRoutingStatusRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, { additionalProperties: false });

/**
 * Response schema for bunbuddy routing status endpoint.
 */
export const BunBuddyRoutingStatusResponseV1: typeof BunBuddyRoutingStatusResponseSchema =
  BunBuddyRoutingStatusResponseSchema;

/**
 * Request schema for bunbuddy routing refresh endpoint.
 */
export const BunBuddyRoutingRefreshRequestV1: Type.TObject<
  { readonly idempotencyKey: Type.TOptional<Type.TString> },
  never,
  "idempotencyKey"
> = BunBuddyRoutingRefreshRequestSchema;

/**
 * Response schema for bunbuddy routing refresh endpoint.
 */
export const BunBuddyRoutingRefreshResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly queued: Type.TBoolean;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly refreshed: Type.TBoolean;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "ok" | "timestamp" | "jobId" | "queued" | "refreshed",
  "correlationId"
> = BunBuddyRoutingRefreshResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for bunbuddy routing status failures.
 */
export const BunBuddyRoutingStatusErrorV1 = Type.Object(
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
 * Error schema for bunbuddy routing refresh failures.
 */
export const BunBuddyRoutingRefreshErrorV1 = Type.Object(
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
 * BunBuddy routing status contract definition (v1).
 */
export const BunBuddyRoutingStatusContractV1 = {
  name: STATUS_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: BunBuddyRoutingStatusRequestV1,
  response: BunBuddyRoutingStatusResponseV1,
  errors: BunBuddyRoutingStatusErrorV1,
} as const satisfies VersionedContractV1;

/**
 * BunBuddy routing refresh contract definition (v1).
 */
export const BunBuddyRoutingRefreshContractV1 = {
  name: REFRESH_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: BunBuddyRoutingRefreshRequestV1,
  response: BunBuddyRoutingRefreshResponseV1,
  errors: BunBuddyRoutingRefreshErrorV1,
} as const satisfies VersionedContractV1;
