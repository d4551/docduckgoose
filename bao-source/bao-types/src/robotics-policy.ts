/**
 * Robotics policy types.
 *
 * Provides TypeScript types derived from robotics policy schemas.
 *
 * @shared/types/robotics-policy.ts
 */

import type {
  RoboticsSafetyCheckRequest,
  RoboticsSafetyCheckResponse,
  RoboticsSafetyPolicy,
  RoboticsSafetyViolation,
} from "@baohaus/bao-schemas/robotics-policy.schemas";

/** Inferred type from the RoboticsSafetyPolicyType schema. */
export type RoboticsSafetyPolicyType = RoboticsSafetyPolicy;
/** Inferred type from the RoboticsSafetyViolationType schema. */
export type RoboticsSafetyViolationType = RoboticsSafetyViolation;
/** Inferred type from the RoboticsSafetyCheckRequestType schema. */
export type RoboticsSafetyCheckRequestType = RoboticsSafetyCheckRequest;
/** Inferred type from the RoboticsSafetyCheckResponseType schema. */
export type RoboticsSafetyCheckResponseType = RoboticsSafetyCheckResponse;
