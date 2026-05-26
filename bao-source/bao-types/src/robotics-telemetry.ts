/**
 * Robotics telemetry types.
 *
 * Provides TypeScript types derived from robotics telemetry schemas.
 *
 * @shared/types/robotics-telemetry.ts
 */

import type {
  RoboticsTelemetryCaptureRequest,
  RoboticsTelemetryCaptureResponse,
  RoboticsTelemetryListRequest,
  RoboticsTelemetryListResponse,
  RoboticsTelemetryPayload,
  RoboticsTelemetryReplayRequest,
  RoboticsTelemetryReplayResponse,
  RoboticsTelemetrySample,
} from "@baohaus/bao-schemas/robotics-telemetry.schemas";

/** Inferred type from the RoboticsTelemetryPayloadType schema. */
export type RoboticsTelemetryPayloadType = RoboticsTelemetryPayload;
/** Inferred type from the RoboticsTelemetrySampleType schema. */
export type RoboticsTelemetrySampleType = RoboticsTelemetrySample;
/** Inferred type from the RoboticsTelemetryCaptureRequestType schema. */
export type RoboticsTelemetryCaptureRequestType = RoboticsTelemetryCaptureRequest;
/** Inferred type from the RoboticsTelemetryCaptureResponseType schema. */
export type RoboticsTelemetryCaptureResponseType = RoboticsTelemetryCaptureResponse;
/** Inferred type from the RoboticsTelemetryListRequestType schema. */
export type RoboticsTelemetryListRequestType = RoboticsTelemetryListRequest;
/** Inferred type from the RoboticsTelemetryListResponseType schema. */
export type RoboticsTelemetryListResponseType = RoboticsTelemetryListResponse;
/** Inferred type from the RoboticsTelemetryReplayRequestType schema. */
export type RoboticsTelemetryReplayRequestType = RoboticsTelemetryReplayRequest;
/** Inferred type from the RoboticsTelemetryReplayResponseType schema. */
export type RoboticsTelemetryReplayResponseType = RoboticsTelemetryReplayResponse;
