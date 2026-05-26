/**
 * Robotics Safety Policy Contract v1
 *
 * Defines the versioned contract for robotics safety policy checks.
 *
 * @shared/contracts/versions/v1/robotics-policy
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  RoboticsSafetyCheckRequestSchema,
  RoboticsSafetyCheckResponseSchema,
} from "../../../schemas/robotics-policy.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for robotics policy checks.
 */
export const CONTRACT_NAME = "robotics-policy-check";

/**
 * Request schema for robotics policy checks.
 */
export const RoboticsPolicyCheckRequestV1: Type.TObject<
  {
    readonly commandType: Type.TUnion<
      (Type.TLiteral<"joint"> | Type.TLiteral<"pose"> | Type.TLiteral<"velocity">)[]
    >;
    readonly payload: Type.TObject<Record<string, never>, never, never>;
    readonly deviceId: Type.TOptional<Type.TString>;
  },
  "commandType" | "payload",
  "deviceId"
> = RoboticsSafetyCheckRequestSchema;

/**
 * Response schema for robotics policy checks.
 */
export const RoboticsPolicyCheckResponseV1: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly allowed: Type.TBoolean;
    readonly violations: Type.TArray<
      Type.TObject<
        {
          readonly code: Type.TString;
          readonly message: Type.TString;
          readonly severity: Type.TUnion<(Type.TLiteral<"error"> | Type.TLiteral<"warning">)[]>;
          readonly field: Type.TOptional<Type.TString>;
        },
        "severity" | "code" | "message",
        "field"
      >
    >;
    readonly timestamp: Type.TString;
  },
  "ok" | "timestamp" | "violations" | "allowed",
  never
> = RoboticsSafetyCheckResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for robotics policy check endpoint.
 */
export const RoboticsPolicyCheckErrorV1 = Type.Object(
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
 * Robotics policy check contract definition.
 */
export const RoboticsPolicyCheckContractV1 = {
  version: CONTRACT_VERSION,
  name: CONTRACT_NAME,
  request: RoboticsPolicyCheckRequestV1,
  response: RoboticsPolicyCheckResponseV1,
  errors: RoboticsPolicyCheckErrorV1,
} as const satisfies VersionedContractV1;
