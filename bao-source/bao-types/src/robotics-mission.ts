/**
 * Robotics mission types.
 *
 * Provides TypeScript types derived from robotics mission schemas.
 *
 * @shared/types/robotics-mission.ts
 */

import type {
  RoboticsMission,
  RoboticsMissionCancelResponse,
  RoboticsMissionCreateRequest,
  RoboticsMissionCreateResponse,
  RoboticsMissionListRequest,
  RoboticsMissionListResponse,
  RoboticsMissionProgress,
  RoboticsMissionSpec,
  RoboticsMissionStatus,
  RoboticsMissionStatusResponse,
  RoboticsMissionStep,
} from "@baohaus/bao-schemas/robotics-mission.schemas";

/** Inferred type from the RoboticsMissionType schema. */
export type RoboticsMissionType = RoboticsMission;
/** Inferred type from the RoboticsMissionStatusType schema. */
export type RoboticsMissionStatusType = RoboticsMissionStatus;
/** Inferred type from the RoboticsMissionSpecType schema. */
export type RoboticsMissionSpecType = RoboticsMissionSpec;
/** Inferred type from the RoboticsMissionStepType schema. */
export type RoboticsMissionStepType = RoboticsMissionStep;
/** Inferred type from the RoboticsMissionCreateRequestType schema. */
export type RoboticsMissionCreateRequestType = RoboticsMissionCreateRequest;
/** Inferred type from the RoboticsMissionCreateResponseType schema. */
export type RoboticsMissionCreateResponseType = RoboticsMissionCreateResponse;
/** Inferred type from the RoboticsMissionListRequestType schema. */
export type RoboticsMissionListRequestType = RoboticsMissionListRequest;
/** Inferred type from the RoboticsMissionStatusResponseType schema. */
export type RoboticsMissionStatusResponseType = RoboticsMissionStatusResponse;
/** Inferred type from the RoboticsMissionListResponseType schema. */
export type RoboticsMissionListResponseType = RoboticsMissionListResponse;
/** Inferred type from the RoboticsMissionCancelResponseType schema. */
export type RoboticsMissionCancelResponseType = RoboticsMissionCancelResponse;
/** Inferred type from the RoboticsMissionProgressType schema. */
export type RoboticsMissionProgressType = RoboticsMissionProgress;
