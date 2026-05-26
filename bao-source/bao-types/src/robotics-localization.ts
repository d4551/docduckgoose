/**
 * Robotics localization types.
 *
 * Provides TypeScript types derived from robotics localization schemas.
 *
 * @shared/types/robotics-localization.ts
 */

import type {
  RoboticsLocalizationControlRequest,
  RoboticsLocalizationControlResponse,
  RoboticsLocalizationPose,
  RoboticsLocalizationSource,
  RoboticsLocalizationStatus,
  RoboticsLocalizationStatusResponse,
} from "@baohaus/bao-schemas/robotics-localization.schemas";

/** Inferred type from the RoboticsLocalizationSourceType schema. */
export type RoboticsLocalizationSourceType = RoboticsLocalizationSource;
/** Inferred type from the RoboticsLocalizationPoseType schema. */
export type RoboticsLocalizationPoseType = RoboticsLocalizationPose;
/** Inferred type from the RoboticsLocalizationStatusType schema. */
export type RoboticsLocalizationStatusType = RoboticsLocalizationStatus;
/** Inferred type from the RoboticsLocalizationStatusResponseType schema. */
export type RoboticsLocalizationStatusResponseType = RoboticsLocalizationStatusResponse;
/** Inferred type from the RoboticsLocalizationControlRequestType schema. */
export type RoboticsLocalizationControlRequestType = RoboticsLocalizationControlRequest;
/** Inferred type from the RoboticsLocalizationControlResponseType schema. */
export type RoboticsLocalizationControlResponseType = RoboticsLocalizationControlResponse;
