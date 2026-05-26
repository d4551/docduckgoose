/**
 * XR Contracts v1
 *
 * Defines versioned contracts for XR sessions, reviews, composition, and ingest.
 *
 * @shared/contracts/versions/v1/xr
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { XrCompositionPlanResponseSchema } from "../../../schemas/xr-composition.schemas";
import {
  XrReviewCreateRequestSchema,
  XrReviewListRequestSchema,
  XrReviewListResponseSchema,
  XrReviewResponseSchema,
} from "../../../schemas/xr-review.schemas";
import {
  XrIngestResponseSchema,
  XrIngestScanRequestSchema,
  XrInputProfileResponseSchema,
  XrSessionCloseRequestSchema,
  XrSessionCreateRequestSchema,
  XrSessionEventCreateRequestSchema,
  XrSessionEventKindSchema,
  XrSessionEventListResponseSchema,
  XrSessionEventResponseSchema,
  XrSessionJoinRequestSchema,
  XrSessionLeaveRequestSchema,
  XrSessionListRequestSchema,
  XrSessionListResponseSchema,
  XrSessionParticipantResponseSchema,
  XrSessionResponseSchema,
} from "../../../schemas/xr-session.schemas";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract names.
 */
export const SESSIONS_LIST_CONTRACT_NAME = "xr-sessions-list";
/** Contract name for XR session creation. */
export const SESSIONS_CREATE_CONTRACT_NAME = "xr-sessions-create";
/** Contract name for XR session detail retrieval. */
export const SESSIONS_DETAIL_CONTRACT_NAME = "xr-sessions-detail";
/** Contract name for joining an XR session. */
export const SESSIONS_JOIN_CONTRACT_NAME = "xr-sessions-join";
/** Contract name for leaving an XR session. */
export const SESSIONS_LEAVE_CONTRACT_NAME = "xr-sessions-leave";
/** Contract name for closing an XR session. */
export const SESSIONS_CLOSE_CONTRACT_NAME = "xr-sessions-close";
/** Contract name for listing XR session events. */
export const SESSION_EVENTS_LIST_CONTRACT_NAME = "xr-session-events-list";
/** Contract name for creating XR session events. */
export const SESSION_EVENTS_CREATE_CONTRACT_NAME = "xr-session-events-create";
/** Contract name for listing XR input device profiles. */
export const INPUT_PROFILES_LIST_CONTRACT_NAME = "xr-input-profiles-list";
/** Contract name for XR composition plan retrieval. */
export const COMPOSITION_PLAN_CONTRACT_NAME = "xr-composition-plan";
/** Contract name for listing XR experience reviews. */
export const REVIEWS_LIST_CONTRACT_NAME = "xr-reviews-list";
/** Contract name for creating XR experience reviews. */
export const REVIEWS_CREATE_CONTRACT_NAME = "xr-reviews-create";
/** Contract name for ingesting a 3D scan into an XR experience. */
export const INGEST_SCAN_CONTRACT_NAME = "xr-ingest-scan";
/** Contract name for ingesting autonomy telemetry into an XR session. */
export const INGEST_AUTONOMY_TELEMETRY_CONTRACT_NAME = "xr-ingest-autonomy-telemetry";

/**
 * Request schema for XR sessions list.
 */
export const XrSessionsListRequestV1: Type.TObject<
  {
    readonly experienceId: Type.TOptional<Type.TString>;
    readonly status: Type.TOptional<
      Type.TUnion<(Type.TLiteral<"active"> | Type.TLiteral<"paused"> | Type.TLiteral<"closed">)[]>
    >;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly experienceId: Type.TOptional<Type.TString>;
    readonly status: Type.TOptional<
      Type.TUnion<(Type.TLiteral<"active"> | Type.TLiteral<"paused"> | Type.TLiteral<"closed">)[]>
    >;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  }>
> = XrSessionListRequestSchema;

/**
 * Response schema for XR sessions list.
 */
export const XrSessionsListResponseV1: typeof XrSessionListResponseSchema =
  XrSessionListResponseSchema;

/**
 * Request schema for XR session creation.
 */
export const XrSessionsCreateRequestV1: typeof XrSessionCreateRequestSchema =
  XrSessionCreateRequestSchema;

/**
 * Response schema for XR session creation.
 */
export const XrSessionsCreateResponseV1: typeof XrSessionResponseSchema = XrSessionResponseSchema;

/**
 * Request schema for XR session detail.
 */
export const XrSessionsDetailRequestV1: Type.TObject<
  { readonly sessionId: Type.TString },
  "sessionId",
  never
> = Type.Object(
  {
    sessionId: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Response schema for XR session detail.
 */
export const XrSessionsDetailResponseV1: typeof XrSessionResponseSchema = XrSessionResponseSchema;

/**
 * Request schema for XR session join.
 */
export const XrSessionsJoinRequestV1: Type.TObject<
  {
    readonly role: Type.TOptional<
      Type.TUnion<
        (Type.TLiteral<"host"> | Type.TLiteral<"participant"> | Type.TLiteral<"observer">)[]
      >
    >;
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly sessionId: Type.TString;
  },
  "sessionId",
  Type.InferOptionalKeys<{
    readonly role: Type.TOptional<
      Type.TUnion<
        (Type.TLiteral<"host"> | Type.TLiteral<"participant"> | Type.TLiteral<"observer">)[]
      >
    >;
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly sessionId: Type.TString;
  }>
> = Type.Object(
  {
    sessionId: Type.String({ minLength: 1 }),
    ...XrSessionJoinRequestSchema.properties,
  },
  { additionalProperties: false },
);

/**
 * Response schema for XR session join.
 */
export const XrSessionsJoinResponseV1: typeof XrSessionParticipantResponseSchema =
  XrSessionParticipantResponseSchema;

/**
 * Request schema for XR session leave.
 */
export const XrSessionsLeaveRequestV1: Type.TObject<
  {
    readonly userId: Type.TOptional<Type.TString>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly sessionId: Type.TString;
  },
  "sessionId",
  Type.InferOptionalKeys<{
    readonly userId: Type.TOptional<Type.TString>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly sessionId: Type.TString;
  }>
> = Type.Object(
  {
    sessionId: Type.String({ minLength: 1 }),
    ...XrSessionLeaveRequestSchema.properties,
  },
  { additionalProperties: false },
);

/**
 * Response schema for XR session leave.
 */
export const XrSessionsLeaveResponseV1: typeof XrSessionParticipantResponseSchema =
  XrSessionParticipantResponseSchema;

/**
 * Request schema for XR session close.
 */
export const XrSessionsCloseRequestV1: Type.TObject<
  {
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly sessionId: Type.TString;
  },
  "sessionId",
  Type.InferOptionalKeys<{
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
    readonly sessionId: Type.TString;
  }>
> = Type.Object(
  {
    sessionId: Type.String({ minLength: 1 }),
    ...XrSessionCloseRequestSchema.properties,
  },
  { additionalProperties: false },
);

/**
 * Response schema for XR session close.
 */
export const XrSessionsCloseResponseV1: typeof XrSessionResponseSchema = XrSessionResponseSchema;

/**
 * Request schema for XR session event list.
 */
export const XrSessionEventsListRequestV1: Type.TObject<
  {
    readonly sessionId: Type.TString;
    readonly kind: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"telemetry">
          | Type.TLiteral<"input">
          | Type.TLiteral<"annotation">
          | Type.TLiteral<"review">
          | Type.TLiteral<"performance">
          | Type.TLiteral<"system">
        )[]
      >
    >;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  },
  "sessionId",
  Type.InferOptionalKeys<{
    readonly sessionId: Type.TString;
    readonly kind: Type.TOptional<
      Type.TUnion<
        (
          | Type.TLiteral<"telemetry">
          | Type.TLiteral<"input">
          | Type.TLiteral<"annotation">
          | Type.TLiteral<"review">
          | Type.TLiteral<"performance">
          | Type.TLiteral<"system">
        )[]
      >
    >;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    sessionId: Type.String({ minLength: 1 }),
    kind: Type.Optional(XrSessionEventKindSchema),
    limit: Type.Optional(Type.Integer({ minimum: 1 })),
    offset: Type.Optional(Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/**
 * Response schema for XR session event list.
 */
export const XrSessionEventsListResponseV1: typeof XrSessionEventListResponseSchema =
  XrSessionEventListResponseSchema;

/**
 * Request schema for XR session event create.
 */
export const XrSessionEventsCreateRequestV1 = Type.Object(
  {
    sessionId: Type.String({ minLength: 1 }),
    ...XrSessionEventCreateRequestSchema.properties,
  },
  { additionalProperties: false },
);

/**
 * Response schema for XR session event create.
 */
export const XrSessionEventsCreateResponseV1: typeof XrSessionEventResponseSchema =
  XrSessionEventResponseSchema;

/**
 * Request schema for XR input profile list.
 */
export const XrInputProfilesListRequestV1: Type.TObject<
  {
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly refresh: Type.TOptional<Type.TBoolean>;
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    refresh: Type.Optional(Type.Boolean()),
    timeoutMs: Type.Optional(Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/**
 * Response schema for XR input profile list.
 */
export const XrInputProfilesListResponseV1: typeof XrInputProfileResponseSchema =
  XrInputProfileResponseSchema;

/**
 * Request schema for XR composition plan.
 */
export const XrCompositionPlanRequestV1: Type.TObject<{ readonly id: Type.TString }, "id", never> =
  Type.Object(
    {
      id: Type.String({ minLength: 1 }),
    },
    { additionalProperties: false },
  );

/**
 * Response schema for XR composition plan.
 */
export const XrCompositionPlanResponseV1: typeof XrCompositionPlanResponseSchema =
  XrCompositionPlanResponseSchema;

/**
 * Request schema for XR review list.
 */
export const XrReviewsListRequestV1: Type.TObject<
  {
    readonly sessionId: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
    readonly id: Type.TString;
  },
  "id",
  Type.InferOptionalKeys<{
    readonly sessionId: Type.TOptional<Type.TString>;
    readonly limit: Type.TOptional<Type.TInteger>;
    readonly offset: Type.TOptional<Type.TInteger>;
    readonly id: Type.TString;
  }>
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    ...XrReviewListRequestSchema.properties,
  },
  { additionalProperties: false },
);

/**
 * Response schema for XR review list.
 */
export const XrReviewsListResponseV1: typeof XrReviewListResponseSchema =
  XrReviewListResponseSchema;

/**
 * Request schema for XR review create.
 */
export const XrReviewsCreateRequestV1 = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    ...XrReviewCreateRequestSchema.properties,
  },
  { additionalProperties: false },
);

/**
 * Response schema for XR review create.
 */
export const XrReviewsCreateResponseV1: typeof XrReviewResponseSchema = XrReviewResponseSchema;

/**
 * Request schema for XR ingest scan.
 */
export const XrIngestScanRequestV1 = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    ...XrIngestScanRequestSchema.properties,
  },
  { additionalProperties: false },
);

/**
 * Response schema for XR ingest scan.
 */
export const XrIngestScanResponseV1: typeof XrIngestResponseSchema = XrIngestResponseSchema;

const XrIngestAutonomyTelemetryCommonRequestV1: Record<
  string,
  ReturnType<typeof Type.String | typeof Type.Optional>
> = {
  since: Type.Optional(Type.String({ format: "date-time" })),
  until: Type.Optional(Type.String({ format: "date-time" })),
  limit: Type.Optional(Type.Integer({ minimum: 1 })),
  usdName: Type.Optional(Type.String({ minLength: 1 })),
  usdFormat: Type.Optional(Type.String({ minLength: 1 })),
  role: Type.Optional(Type.String({ minLength: 1 })),
  displayOrder: Type.Optional(Type.Number()),
  transform: XrIngestScanRequestSchema.properties.transform,
  metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
};

/**
 * Request schema for XR ingest autonomy telemetry.
 */
export const XrIngestAutonomyTelemetryRequestV1 = Type.Union(
  [
    Type.Object(
      {
        id: Type.String({ minLength: 1 }),
        source: Type.Literal("robotics"),
        robotId: Type.String({ minLength: 1 }),
        ...XrIngestAutonomyTelemetryCommonRequestV1,
      },
      { additionalProperties: false },
    ),
    Type.Object(
      {
        id: Type.String({ minLength: 1 }),
        source: Type.Literal("drone"),
        vehicleId: Type.String({ minLength: 1 }),
        ...XrIngestAutonomyTelemetryCommonRequestV1,
      },
      { additionalProperties: false },
    ),
  ],
  { additionalProperties: false },
);

/**
 * Response schema for XR ingest autonomy telemetry.
 */
export const XrIngestAutonomyTelemetryResponseV1: typeof XrIngestResponseSchema =
  XrIngestResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * XR error schema helper.
 */
const XrErrorSchema = Type.Object(
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
 * XR sessions list contract definition (v1).
 */
export const XrSessionsListContractV1 = {
  name: SESSIONS_LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrSessionsListRequestV1,
  response: XrSessionsListResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR sessions create contract definition (v1).
 */
export const XrSessionsCreateContractV1 = {
  name: SESSIONS_CREATE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrSessionsCreateRequestV1,
  response: XrSessionsCreateResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR sessions detail contract definition (v1).
 */
export const XrSessionsDetailContractV1 = {
  name: SESSIONS_DETAIL_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrSessionsDetailRequestV1,
  response: XrSessionsDetailResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR sessions join contract definition (v1).
 */
export const XrSessionsJoinContractV1 = {
  name: SESSIONS_JOIN_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrSessionsJoinRequestV1,
  response: XrSessionsJoinResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR sessions leave contract definition (v1).
 */
export const XrSessionsLeaveContractV1 = {
  name: SESSIONS_LEAVE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrSessionsLeaveRequestV1,
  response: XrSessionsLeaveResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR sessions close contract definition (v1).
 */
export const XrSessionsCloseContractV1 = {
  name: SESSIONS_CLOSE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrSessionsCloseRequestV1,
  response: XrSessionsCloseResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR session events list contract definition (v1).
 */
export const XrSessionEventsListContractV1 = {
  name: SESSION_EVENTS_LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrSessionEventsListRequestV1,
  response: XrSessionEventsListResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR session events create contract definition (v1).
 */
export const XrSessionEventsCreateContractV1 = {
  name: SESSION_EVENTS_CREATE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrSessionEventsCreateRequestV1,
  response: XrSessionEventsCreateResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR input profiles list contract definition (v1).
 */
export const XrInputProfilesListContractV1 = {
  name: INPUT_PROFILES_LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrInputProfilesListRequestV1,
  response: XrInputProfilesListResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR composition plan contract definition (v1).
 */
export const XrCompositionPlanContractV1 = {
  name: COMPOSITION_PLAN_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrCompositionPlanRequestV1,
  response: XrCompositionPlanResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR reviews list contract definition (v1).
 */
export const XrReviewsListContractV1 = {
  name: REVIEWS_LIST_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrReviewsListRequestV1,
  response: XrReviewsListResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR reviews create contract definition (v1).
 */
export const XrReviewsCreateContractV1 = {
  name: REVIEWS_CREATE_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrReviewsCreateRequestV1,
  response: XrReviewsCreateResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR ingest scan contract definition (v1).
 */
export const XrIngestScanContractV1 = {
  name: INGEST_SCAN_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrIngestScanRequestV1,
  response: XrIngestScanResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;

/**
 * XR ingest autonomy telemetry contract definition (v1).
 */
export const XrIngestAutonomyTelemetryContractV1 = {
  name: INGEST_AUTONOMY_TELEMETRY_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: XrIngestAutonomyTelemetryRequestV1,
  response: XrIngestAutonomyTelemetryResponseV1,
  errors: XrErrorSchema,
} as const satisfies VersionedContractV1;
