/**
 * Drone operations types.
 *
 * Provides TypeScript types derived from drone operations schemas.
 *
 * @shared/types/drone-ops.ts
 */

import type {
  DroneGeofenceConfig,
  DroneLogExportRequest,
  DroneLogExportResponse,
  DroneLogExportResult,
  DroneLogListResponse,
  DroneLogSession,
  DroneLogStartRequest,
  DroneOffboardSetpoint,
  DroneOffboardStatus,
  DronePolicyEvaluation,
  DronePolicyViolation,
  DroneRallyPointsConfig,
  DroneRtkCorrection,
  DroneRtkStatus,
  DroneSafetyPolicy,
  DroneVideoFusionConfig,
  DroneVideoFusionStatus,
} from "@baohaus/bao-schemas/drone-ops.schemas";

/** Inferred type from the DroneGeofenceConfigType schema. */
export type DroneGeofenceConfigType = DroneGeofenceConfig;
/** Inferred type from the DroneRallyPointsConfigType schema. */
export type DroneRallyPointsConfigType = DroneRallyPointsConfig;
/** Inferred type from the DroneRtkCorrectionType schema. */
export type DroneRtkCorrectionType = DroneRtkCorrection;
/** Inferred type from the DroneRtkStatusType schema. */
export type DroneRtkStatusType = DroneRtkStatus;
/** Inferred type from the DroneOffboardSetpointType schema. */
export type DroneOffboardSetpointType = DroneOffboardSetpoint;
/** Inferred type from the DroneOffboardStatusType schema. */
export type DroneOffboardStatusType = DroneOffboardStatus;
/** Inferred type from the DroneLogSessionType schema. */
export type DroneLogSessionType = DroneLogSession;
/** Inferred type from the DroneLogListResponseType schema. */
export type DroneLogListResponseType = DroneLogListResponse;
/** Inferred type from the DroneLogStartRequestType schema. */
export type DroneLogStartRequestType = DroneLogStartRequest;
/** Inferred type from the DroneLogExportRequestType schema. */
export type DroneLogExportRequestType = DroneLogExportRequest;
/** Inferred type from the DroneLogExportResultType schema. */
export type DroneLogExportResultType = DroneLogExportResult;
/** Inferred type from the DroneLogExportResponseType schema. */
export type DroneLogExportResponseType = DroneLogExportResponse;
/** Inferred type from the DroneVideoFusionConfigType schema. */
export type DroneVideoFusionConfigType = DroneVideoFusionConfig;
/** Inferred type from the DroneVideoFusionStatusType schema. */
export type DroneVideoFusionStatusType = DroneVideoFusionStatus;
/** Inferred type from the DroneSafetyPolicyType schema. */
export type DroneSafetyPolicyType = DroneSafetyPolicy;
/** Inferred type from the DronePolicyViolationType schema. */
export type DronePolicyViolationType = DronePolicyViolation;
/** Inferred type from the DronePolicyEvaluationType schema. */
export type DronePolicyEvaluationType = DronePolicyEvaluation;
