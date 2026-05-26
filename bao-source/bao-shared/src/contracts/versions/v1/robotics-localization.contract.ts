/**
 * Robotics Localization Contract v1
 *
 * Defines the versioned contracts for robotics localization status and control endpoints.
 *
 * @shared/contracts/versions/v1/robotics-localization
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  RoboticsLocalizationControlRequestSchema,
  RoboticsLocalizationControlResponseSchema,
  RoboticsLocalizationStatusResponseSchema,
} from "../../../schemas/robotics-localization.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for localization status.
 */
export const STATUS_CONTRACT_NAME = "robotics-localization-status";

/**
 * Contract name for localization control.
 */
export const CONTROL_CONTRACT_NAME = "robotics-localization-control";

/**
 * Request schema for localization status.
 */
export const RoboticsLocalizationStatusRequestV1: Type.TObject<
  { readonly deviceId: Type.TString },
  "deviceId",
  never
> = Type.Object(
  {
    deviceId: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Response schema for localization status.
 */
export const RoboticsLocalizationStatusResponseV1: typeof RoboticsLocalizationStatusResponseSchema =
  RoboticsLocalizationStatusResponseSchema;

/**
 * Request schema for localization control.
 */
export const RoboticsLocalizationControlRequestV1: Type.TObject<
  {
    readonly deviceId: Type.TString;
    readonly action: Type.TUnion<(Type.TLiteral<"start"> | Type.TLiteral<"stop">)[]>;
    readonly source: Type.TOptional<
      Type.TObject<
        {
          readonly type: Type.TUnion<
            (
              | Type.TLiteral<"ros2ws">
              | Type.TLiteral<"native">
              | Type.TLiteral<"simulation">
              | Type.TLiteral<"external">
            )[]
          >;
          readonly topic: Type.TOptional<Type.TString>;
          readonly frameId: Type.TOptional<Type.TString>;
        },
        "type",
        Type.InferOptionalKeys<{
          readonly type: Type.TUnion<
            (
              | Type.TLiteral<"ros2ws">
              | Type.TLiteral<"native">
              | Type.TLiteral<"simulation">
              | Type.TLiteral<"external">
            )[]
          >;
          readonly topic: Type.TOptional<Type.TString>;
          readonly frameId: Type.TOptional<Type.TString>;
        }>
      >
    >;
  },
  "deviceId" | "action",
  "source"
> = RoboticsLocalizationControlRequestSchema;

/**
 * Response schema for localization control.
 */
export const RoboticsLocalizationControlResponseV1: typeof RoboticsLocalizationControlResponseSchema =
  RoboticsLocalizationControlResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for localization status endpoint.
 */
export const RoboticsLocalizationStatusErrorV1 = Type.Object(
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
 * Error schema for localization control endpoint.
 */
export const RoboticsLocalizationControlErrorV1 = Type.Object(
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
 * Localization status contract definition.
 */
export const RoboticsLocalizationStatusContractV1 = {
  version: CONTRACT_VERSION,
  name: STATUS_CONTRACT_NAME,
  request: RoboticsLocalizationStatusRequestV1,
  response: RoboticsLocalizationStatusResponseV1,
  errors: RoboticsLocalizationStatusErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Localization control contract definition.
 */
export const RoboticsLocalizationControlContractV1 = {
  version: CONTRACT_VERSION,
  name: CONTROL_CONTRACT_NAME,
  request: RoboticsLocalizationControlRequestV1,
  response: RoboticsLocalizationControlResponseV1,
  errors: RoboticsLocalizationControlErrorV1,
} as const satisfies VersionedContractV1;
