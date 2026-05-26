/**
 * Robotics motion planning types.
 *
 * Provides TypeScript types derived from robotics motion schemas.
 *
 * @shared/types/robotics-motion.ts
 */

import type {
  RoboticsJointCommand,
  RoboticsPoseCommand,
  RoboticsTrajectoryPlan,
  RoboticsTrajectoryPlanRequest,
  RoboticsTrajectoryPlanResponse,
  RoboticsTrajectoryPoint,
  RoboticsVelocityCommand,
} from "@baohaus/bao-schemas/robotics-motion.schemas";

/** Inferred type from the RoboticsJointCommandType schema. */
export type RoboticsJointCommandType = RoboticsJointCommand;
/** Inferred type from the RoboticsPoseCommandType schema. */
export type RoboticsPoseCommandType = RoboticsPoseCommand;
/** Inferred type from the RoboticsVelocityCommandType schema. */
export type RoboticsVelocityCommandType = RoboticsVelocityCommand;
/** Inferred type from the RoboticsTrajectoryPointType schema. */
export type RoboticsTrajectoryPointType = RoboticsTrajectoryPoint;
/** Inferred type from the RoboticsTrajectoryPlanType schema. */
export type RoboticsTrajectoryPlanType = RoboticsTrajectoryPlan;
/** Inferred type from the RoboticsTrajectoryPlanRequestType schema. */
export type RoboticsTrajectoryPlanRequestType = RoboticsTrajectoryPlanRequest;
/** Inferred type from the RoboticsTrajectoryPlanResponseType schema. */
export type RoboticsTrajectoryPlanResponseType = RoboticsTrajectoryPlanResponse;
