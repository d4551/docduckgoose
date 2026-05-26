/**
 * Robotics Motion Planning Contract v1
 *
 * Defines the versioned contract for robotics trajectory planning.
 *
 * @shared/contracts/versions/v1/robotics-motion
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  RoboticsTrajectoryPlanRequestSchema,
  RoboticsTrajectoryPlanResponseSchema,
} from "../../../schemas/robotics-motion.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for robotics motion planning.
 */
export const CONTRACT_NAME = "robotics-motion-plan";

/**
 * Request schema for robotics motion planning.
 */
export const RoboticsMotionPlanRequestV1: typeof RoboticsTrajectoryPlanRequestSchema =
  RoboticsTrajectoryPlanRequestSchema;

/**
 * Response schema for robotics motion planning.
 */
export const RoboticsMotionPlanResponseV1: typeof RoboticsTrajectoryPlanResponseSchema =
  RoboticsTrajectoryPlanResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for robotics motion planning endpoint.
 */
export const RoboticsMotionPlanErrorV1 = Type.Object(
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
 * Robotics motion planning contract definition.
 */
export const RoboticsMotionPlanContractV1 = {
  version: CONTRACT_VERSION,
  name: CONTRACT_NAME,
  request: RoboticsMotionPlanRequestV1,
  response: RoboticsMotionPlanResponseV1,
  errors: RoboticsMotionPlanErrorV1,
} as const satisfies VersionedContractV1;
