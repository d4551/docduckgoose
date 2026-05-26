/**
 * Robotics Mission Contracts v1
 *
 * Defines the versioned contracts for robotics mission scheduling and status.
 *
 * @shared/contracts/versions/v1/robotics-mission
 */

import {
  RoboticsMissionCancelResponseSchema,
  RoboticsMissionCreateRequestSchema,
  RoboticsMissionCreateResponseSchema,
  RoboticsMissionListRequestSchema,
  RoboticsMissionListResponseSchema,
  RoboticsMissionStatusResponseSchema,
} from "@baohaus/bao-schemas/robotics-mission.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract names.
 */
export const CREATE_CONTRACT_NAME = "robotics-mission-create";
/** Contract name for listing robotics missions. */
export const LIST_CONTRACT_NAME = "robotics-mission-list";
/** Contract name for checking robotics mission status. */
export const STATUS_CONTRACT_NAME = "robotics-mission-status";
/** Contract name for cancelling a robotics mission. */
export const CANCEL_CONTRACT_NAME = "robotics-mission-cancel";

/**
 * Request schema for mission creation.
 */
export const RoboticsMissionCreateRequestV1: typeof RoboticsMissionCreateRequestSchema =
  RoboticsMissionCreateRequestSchema;

/**
 * Response schema for mission creation.
 */
export const RoboticsMissionCreateResponseV1: typeof RoboticsMissionCreateResponseSchema =
  RoboticsMissionCreateResponseSchema;

/**
 * Request schema for mission listing.
 */
export const RoboticsMissionListRequestV1: Type.TObject<
  {
    readonly status: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"queued">
          | Type.TLiteral<"running">
          | Type.TLiteral<"completed">
          | Type.TLiteral<"failed">
          | Type.TLiteral<"cancelled">
        )[]
      >
    >;
    readonly robotId: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly status: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"queued">
          | Type.TLiteral<"running">
          | Type.TLiteral<"completed">
          | Type.TLiteral<"failed">
          | Type.TLiteral<"cancelled">
        )[]
      >
    >;
    readonly robotId: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
  }>
> = RoboticsMissionListRequestSchema;

/**
 * Response schema for mission listing.
 */
export const RoboticsMissionListResponseV1: typeof RoboticsMissionListResponseSchema =
  RoboticsMissionListResponseSchema;

/**
 * Request schema for mission status.
 */
export const RoboticsMissionStatusRequestV1: Type.TObject<
  { readonly missionId: Type.TString },
  "missionId",
  never
> = Type.Object(
  {
    missionId: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Response schema for mission status.
 */
export const RoboticsMissionStatusResponseV1: typeof RoboticsMissionStatusResponseSchema =
  RoboticsMissionStatusResponseSchema;

/**
 * Request schema for mission cancel.
 */
export const RoboticsMissionCancelRequestV1: Type.TObject<
  { readonly missionId: Type.TString },
  "missionId",
  never
> = Type.Object(
  {
    missionId: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Response schema for mission cancel.
 */
export const RoboticsMissionCancelResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly missionId: Type.TString;
    readonly cancelled: Type.TBoolean;
    readonly timestamp: Type.TString;
  },
  "cancelled" | "ok" | "timestamp" | "missionId",
  never
> = RoboticsMissionCancelResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for mission create endpoint.
 */
export const RoboticsMissionCreateErrorV1 = Type.Object(
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
 * Error schema for mission list endpoint.
 */
export const RoboticsMissionListErrorV1 = Type.Object(
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
 * Error schema for mission status endpoint.
 */
export const RoboticsMissionStatusErrorV1 = Type.Object(
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
 * Error schema for mission cancel endpoint.
 */
export const RoboticsMissionCancelErrorV1 = Type.Object(
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
 * Mission create contract definition.
 */
export const RoboticsMissionCreateContractV1 = {
  version: CONTRACT_VERSION,
  name: CREATE_CONTRACT_NAME,
  request: RoboticsMissionCreateRequestV1,
  response: RoboticsMissionCreateResponseV1,
  errors: RoboticsMissionCreateErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Mission list contract definition.
 */
export const RoboticsMissionListContractV1 = {
  version: CONTRACT_VERSION,
  name: LIST_CONTRACT_NAME,
  request: RoboticsMissionListRequestV1,
  response: RoboticsMissionListResponseV1,
  errors: RoboticsMissionListErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Mission status contract definition.
 */
export const RoboticsMissionStatusContractV1 = {
  version: CONTRACT_VERSION,
  name: STATUS_CONTRACT_NAME,
  request: RoboticsMissionStatusRequestV1,
  response: RoboticsMissionStatusResponseV1,
  errors: RoboticsMissionStatusErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Mission cancel contract definition.
 */
export const RoboticsMissionCancelContractV1 = {
  version: CONTRACT_VERSION,
  name: CANCEL_CONTRACT_NAME,
  request: RoboticsMissionCancelRequestV1,
  response: RoboticsMissionCancelResponseV1,
  errors: RoboticsMissionCancelErrorV1,
} as const satisfies VersionedContractV1;
