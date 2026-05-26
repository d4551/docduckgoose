/**
 * Shared XR session types derived from schemas.
 *
 * @shared/types/xr-session.ts
 */

import type {
  XrIngestAutonomyTelemetryRequestSchema,
  XrIngestResponseSchema,
  XrIngestScanRequestSchema,
  XrInputProfileResponseSchema,
  XrInputProfileSchema,
  XrSessionCloseRequestSchema,
  XrSessionCreateRequestSchema,
  XrSessionEventCreateRequestSchema,
  XrSessionEventKindSchema,
  XrSessionEventListRequestSchema,
  XrSessionEventListResponseSchema,
  XrSessionEventResponseSchema,
  XrSessionEventSchema,
  XrSessionJoinRequestSchema,
  XrSessionLeaveRequestSchema,
  XrSessionListRequestSchema,
  XrSessionListResponseSchema,
  XrSessionParticipantResponseSchema,
  XrSessionParticipantRoleSchema,
  XrSessionParticipantSchema,
  XrSessionResponseSchema,
  XrSessionSchema,
  XrSessionStatusSchema,
} from "@baohaus/bao-schemas/xr-session.schemas";
import type { Static } from "@baohaus/baobox/elysia";

/** Inferred type from the XrSessionStatus schema. */
export type XrSessionStatus = Static<typeof XrSessionStatusSchema>;
/** Inferred type from the XrSessionParticipantRole schema. */
export type XrSessionParticipantRole = Static<typeof XrSessionParticipantRoleSchema>;
/** Inferred type from the XrSessionEventKind schema. */
export type XrSessionEventKind = Static<typeof XrSessionEventKindSchema>;
/** Inferred type from the XrInputProfile schema. */
export type XrInputProfile = Static<typeof XrInputProfileSchema>;
/** Inferred type from the XrSessionParticipant schema. */
export type XrSessionParticipant = Static<typeof XrSessionParticipantSchema>;
/** Inferred type from the XrSessionEvent schema. */
export type XrSessionEvent = Static<typeof XrSessionEventSchema>;
/** Inferred type from the XrSession schema. */
export type XrSession = Static<typeof XrSessionSchema>;
/** Inferred type from the XrSessionCreateRequest schema. */
export type XrSessionCreateRequest = Static<typeof XrSessionCreateRequestSchema>;
/** Inferred type from the XrSessionListRequest schema. */
export type XrSessionListRequest = Static<typeof XrSessionListRequestSchema>;
/** Inferred type from the XrSessionJoinRequest schema. */
export type XrSessionJoinRequest = Static<typeof XrSessionJoinRequestSchema>;
/** Inferred type from the XrSessionLeaveRequest schema. */
export type XrSessionLeaveRequest = Static<typeof XrSessionLeaveRequestSchema>;
/** Inferred type from the XrSessionCloseRequest schema. */
export type XrSessionCloseRequest = Static<typeof XrSessionCloseRequestSchema>;
/** Inferred type from the XrSessionEventCreateRequest schema. */
export type XrSessionEventCreateRequest = Static<typeof XrSessionEventCreateRequestSchema>;
/** Inferred type from the XrSessionEventListRequest schema. */
export type XrSessionEventListRequest = Static<typeof XrSessionEventListRequestSchema>;
/** Inferred type from the XrIngestScanRequest schema. */
export type XrIngestScanRequest = Static<typeof XrIngestScanRequestSchema>;
/** Inferred type from the XrIngestAutonomyTelemetryRequest schema. */
export type XrIngestAutonomyTelemetryRequest = Static<
  typeof XrIngestAutonomyTelemetryRequestSchema
>;
/** Inferred type from the XrSessionResponse schema. */
export type XrSessionResponse = Static<typeof XrSessionResponseSchema>;
/** Inferred type from the XrSessionListResponse schema. */
export type XrSessionListResponse = Static<typeof XrSessionListResponseSchema>;
/** Inferred type from the XrSessionParticipantResponse schema. */
export type XrSessionParticipantResponse = Static<typeof XrSessionParticipantResponseSchema>;
/** Inferred type from the XrSessionEventListResponse schema. */
export type XrSessionEventListResponse = Static<typeof XrSessionEventListResponseSchema>;
/** Inferred type from the XrSessionEventResponse schema. */
export type XrSessionEventResponse = Static<typeof XrSessionEventResponseSchema>;
/** Inferred type from the XrIngestResponse schema. */
export type XrIngestResponse = Static<typeof XrIngestResponseSchema>;
/** Inferred type from the XrInputProfileResponse schema. */
export type XrInputProfileResponse = Static<typeof XrInputProfileResponseSchema>;
