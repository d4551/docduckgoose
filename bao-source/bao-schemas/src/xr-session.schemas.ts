/**
 * XR session schemas.
 *
 * Defines TypeBox schemas for XR session orchestration, participants,
 * telemetry events, and ingest workflows.
 *
 * @shared/schemas/xr-session.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { DEVICE_TYPES } from "./device.schemas.ts";
import { enhancedSuccessWithDataSchema } from "./route-response-builders.ts";
import {
  XrDeviceClassSchema,
  XrRenderModeSchema,
  XrTransformSchema,
} from "./xr-runtime.schemas.ts";

/**
 * XR session status values.
 */
export const XrSessionStatusSchema: TUnion<
  (TLiteral<"active"> | TLiteral<"paused"> | TLiteral<"closed">)[]
> = TypeExports.Union(
  [TypeExports.Literal("active"), TypeExports.Literal("paused"), TypeExports.Literal("closed")],
  {
    description: "XR session lifecycle status",
  },
);

/** Inferred type from the XrSessionStatus schema. */
export type XrSessionStatus = Static<typeof XrSessionStatusSchema>;

/**
 * XR session participant roles.
 */
export const XrSessionParticipantRoleSchema: TUnion<
  (TLiteral<"host"> | TLiteral<"participant"> | TLiteral<"observer">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("host"),
    TypeExports.Literal("participant"),
    TypeExports.Literal("observer"),
  ],
  {
    description: "XR session participant role",
  },
);

/** Inferred type from the XrSessionParticipantRole schema. */
export type XrSessionParticipantRole = Static<typeof XrSessionParticipantRoleSchema>;

/**
 * XR session event kinds.
 */
export const XrSessionEventKindSchema: TUnion<
  (
    | TLiteral<"telemetry">
    | TLiteral<"input">
    | TLiteral<"annotation">
    | TLiteral<"review">
    | TLiteral<"performance">
    | TLiteral<"system">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("telemetry"),
    TypeExports.Literal("input"),
    TypeExports.Literal("annotation"),
    TypeExports.Literal("review"),
    TypeExports.Literal("performance"),
    TypeExports.Literal("system"),
  ],
  { description: "XR session event classification" },
);

/** Inferred type from the XrSessionEventKind schema. */
export type XrSessionEventKind = Static<typeof XrSessionEventKindSchema>;

/**
 * XR input profile describing a device/controller input layer.
 */
export const XrInputProfileSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    deviceId: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    deviceType: stringEnum(DEVICE_TYPES, {}),
    role: TypeExports.String({ minLength: 1 }),
    connected: TypeExports.Optional(TypeExports.Boolean()),
    lastSeen: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    capabilities: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Boolean()),
    ),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrInputProfile schema. */
export type XrInputProfile = Static<typeof XrInputProfileSchema>;

/**
 * XR session participant record.
 */
export const XrSessionParticipantSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    sessionId: TypeExports.String({ minLength: 1 }),
    userId: TypeExports.String({ minLength: 1 }),
    role: XrSessionParticipantRoleSchema,
    joinedAt: TypeExports.String({ format: "date-time" }),
    leftAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionParticipant schema. */
export type XrSessionParticipant = Static<typeof XrSessionParticipantSchema>;

/**
 * XR session event record.
 */
export const XrSessionEventSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    sessionId: TypeExports.String({ minLength: 1 }),
    kind: XrSessionEventKindSchema,
    payload: TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
    actorId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    createdAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionEvent schema. */
export type XrSessionEvent = Static<typeof XrSessionEventSchema>;

/**
 * XR session record.
 */
export const XrSessionSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    experienceId: TypeExports.String({ minLength: 1 }),
    status: XrSessionStatusSchema,
    mode: TypeExports.Optional(XrRenderModeSchema),
    deviceClass: TypeExports.Optional(XrDeviceClassSchema),
    createdBy: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
    closedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSession schema. */
export type XrSession = Static<typeof XrSessionSchema>;

/**
 * XR session create request payload.
 */
export const XrSessionCreateRequestSchema = TypeExports.Object(
  {
    experienceId: TypeExports.String({ minLength: 1 }),
    mode: TypeExports.Optional(XrRenderModeSchema),
    deviceClass: TypeExports.Optional(XrDeviceClassSchema),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionCreateRequest schema. */
export type XrSessionCreateRequest = Static<typeof XrSessionCreateRequestSchema>;

/**
 * XR session list request payload.
 */
export const XrSessionListRequestSchema: TObject<
  {
    readonly experienceId: TOptional<TString>;
    readonly status: TOptional<
      TUnion<(TLiteral<"active"> | TLiteral<"paused"> | TLiteral<"closed">)[]>
    >;
    readonly limit: TOptional<TInteger>;
    readonly offset: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly experienceId: TOptional<TString>;
    readonly status: TOptional<
      TUnion<(TLiteral<"active"> | TLiteral<"paused"> | TLiteral<"closed">)[]>
    >;
    readonly limit: TOptional<TInteger>;
    readonly offset: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    experienceId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    status: TypeExports.Optional(XrSessionStatusSchema),
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    offset: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionListRequest schema. */
export type XrSessionListRequest = Static<typeof XrSessionListRequestSchema>;

/**
 * XR session join request payload.
 */
export const XrSessionJoinRequestSchema: TObject<
  {
    readonly role: TOptional<
      TUnion<(TLiteral<"host"> | TLiteral<"participant"> | TLiteral<"observer">)[]>
    >;
    readonly metadata: TOptional<TRecord<TString, TUnknown>>;
    readonly idempotencyKey: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly role: TOptional<
      TUnion<(TLiteral<"host"> | TLiteral<"participant"> | TLiteral<"observer">)[]>
    >;
    readonly metadata: TOptional<TRecord<TString, TUnknown>>;
    readonly idempotencyKey: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    role: TypeExports.Optional(XrSessionParticipantRoleSchema),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionJoinRequest schema. */
export type XrSessionJoinRequest = Static<typeof XrSessionJoinRequestSchema>;

/**
 * XR session leave request payload.
 */
export const XrSessionLeaveRequestSchema: TObject<
  {
    readonly userId: TOptional<TString>;
    readonly idempotencyKey: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly userId: TOptional<TString>;
    readonly idempotencyKey: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    userId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionLeaveRequest schema. */
export type XrSessionLeaveRequest = Static<typeof XrSessionLeaveRequestSchema>;

/**
 * XR session close request payload.
 */
export const XrSessionCloseRequestSchema: TObject<
  {
    readonly metadata: TOptional<TRecord<TString, TUnknown>>;
    readonly idempotencyKey: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly metadata: TOptional<TRecord<TString, TUnknown>>;
    readonly idempotencyKey: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionCloseRequest schema. */
export type XrSessionCloseRequest = Static<typeof XrSessionCloseRequestSchema>;

/**
 * XR session event creation payload.
 */
export const XrSessionEventCreateRequestSchema = TypeExports.Object(
  {
    kind: XrSessionEventKindSchema,
    payload: TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
    actorId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionEventCreateRequest schema. */
export type XrSessionEventCreateRequest = Static<typeof XrSessionEventCreateRequestSchema>;

/**
 * XR session event list request payload.
 */
export const XrSessionEventListRequestSchema: TObject<
  {
    readonly kind: TOptional<
      TUnion<
        (
          | TLiteral<"telemetry">
          | TLiteral<"input">
          | TLiteral<"annotation">
          | TLiteral<"review">
          | TLiteral<"performance">
          | TLiteral<"system">
        )[]
      >
    >;
    readonly limit: TOptional<TInteger>;
    readonly offset: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly kind: TOptional<
      TUnion<
        (
          | TLiteral<"telemetry">
          | TLiteral<"input">
          | TLiteral<"annotation">
          | TLiteral<"review">
          | TLiteral<"performance">
          | TLiteral<"system">
        )[]
      >
    >;
    readonly limit: TOptional<TInteger>;
    readonly offset: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    kind: TypeExports.Optional(XrSessionEventKindSchema),
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    offset: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionEventListRequest schema. */
export type XrSessionEventListRequest = Static<typeof XrSessionEventListRequestSchema>;

/**
 * XR ingest from scan session payload.
 */
export const XrIngestScanRequestSchema = TypeExports.Object(
  {
    sessionId: TypeExports.String({ minLength: 1 }),
    usdName: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    usdFormat: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    role: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    displayOrder: TypeExports.Optional(TypeExports.Number()),
    transform: TypeExports.Optional(XrTransformSchema),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrIngestScanRequest schema. */
export type XrIngestScanRequest = Static<typeof XrIngestScanRequestSchema>;

/**
 * XR ingest from autonomy telemetry payload.
 *
 * Supports ingesting robotics + drone telemetry snapshots into XR experiences
 * by generating USD assets representing trajectories/overlays.
 */
export const XrIngestAutonomyTelemetryRequestSchema = TypeExports.Union(
  [
    TypeExports.Object(
      {
        source: TypeExports.Literal("robotics"),
        robotId: TypeExports.String({ minLength: 1 }),
        since: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
        until: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
        limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
        usdName: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
        usdFormat: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
        role: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
        displayOrder: TypeExports.Optional(TypeExports.Number()),
        transform: TypeExports.Optional(XrTransformSchema),
        metadata: TypeExports.Optional(
          TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
        ),
        idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1, maxLength: 128 })),
      },
      { additionalProperties: false },
    ),
    TypeExports.Object(
      {
        source: TypeExports.Literal("drone"),
        vehicleId: TypeExports.String({ minLength: 1 }),
        since: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
        until: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
        limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
        usdName: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
        usdFormat: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
        role: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
        displayOrder: TypeExports.Optional(TypeExports.Number()),
        transform: TypeExports.Optional(XrTransformSchema),
        metadata: TypeExports.Optional(
          TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
        ),
        idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1, maxLength: 128 })),
      },
      { additionalProperties: false },
    ),
  ],
  {},
);

/** Inferred type from the XrIngestAutonomyTelemetryRequest schema. */
export type XrIngestAutonomyTelemetryRequest = Static<
  typeof XrIngestAutonomyTelemetryRequestSchema
>;

/**
 * XR session response schema.
 */
export const XrSessionResponseDataSchema = TypeExports.Object(
  {
    session: XrSessionSchema,
    participants: TypeExports.Optional(TypeExports.Array(XrSessionParticipantSchema)),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionResponseData schema. */
export type XrSessionResponseData = Static<typeof XrSessionResponseDataSchema>;

/**
 * XR session response schema.
 */
export const XrSessionResponseSchema = enhancedSuccessWithDataSchema(XrSessionResponseDataSchema, {
  description: "XR session response envelope.",
});

/** Inferred type from the XrSessionResponse schema. */
export type XrSessionResponse = Static<typeof XrSessionResponseSchema>;

/**
 * XR session list response schema.
 */
export const XrSessionListResponseDataSchema = TypeExports.Object(
  {
    sessions: TypeExports.Array(XrSessionSchema),
    total: TypeExports.Integer({ minimum: 0 }),
    limit: TypeExports.Integer({ minimum: 1 }),
    offset: TypeExports.Integer({ minimum: 0 }),
    hasMore: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionListResponseData schema. */
export type XrSessionListResponseData = Static<typeof XrSessionListResponseDataSchema>;

/**
 * XR session list response schema.
 */
export const XrSessionListResponseSchema = enhancedSuccessWithDataSchema(
  XrSessionListResponseDataSchema,
  {
    description: "XR session list response envelope.",
  },
);

/** Inferred type from the XrSessionListResponse schema. */
export type XrSessionListResponse = Static<typeof XrSessionListResponseSchema>;

/**
 * XR session participant response schema.
 */
export const XrSessionParticipantResponseDataSchema = TypeExports.Object(
  {
    participant: XrSessionParticipantSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionParticipantResponseData schema. */
export type XrSessionParticipantResponseData = Static<
  typeof XrSessionParticipantResponseDataSchema
>;

/**
 * XR session participant response schema.
 */
export const XrSessionParticipantResponseSchema = enhancedSuccessWithDataSchema(
  XrSessionParticipantResponseDataSchema,
  {
    description: "XR session participant response envelope.",
  },
);

/** Inferred type from the XrSessionParticipantResponse schema. */
export type XrSessionParticipantResponse = Static<typeof XrSessionParticipantResponseSchema>;

/**
 * XR session event list response schema.
 */
export const XrSessionEventListResponseDataSchema = TypeExports.Object(
  {
    events: TypeExports.Array(XrSessionEventSchema),
    total: TypeExports.Integer({ minimum: 0 }),
    limit: TypeExports.Integer({ minimum: 1 }),
    offset: TypeExports.Integer({ minimum: 0 }),
    hasMore: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionEventListResponseData schema. */
export type XrSessionEventListResponseData = Static<typeof XrSessionEventListResponseDataSchema>;

/**
 * XR session event list response schema.
 */
export const XrSessionEventListResponseSchema = enhancedSuccessWithDataSchema(
  XrSessionEventListResponseDataSchema,
  {
    description: "XR session event list response envelope.",
  },
);

/** Inferred type from the XrSessionEventListResponse schema. */
export type XrSessionEventListResponse = Static<typeof XrSessionEventListResponseSchema>;

/**
 * XR session event response schema.
 */
export const XrSessionEventResponseDataSchema = TypeExports.Object(
  {
    event: XrSessionEventSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionEventResponseData schema. */
export type XrSessionEventResponseData = Static<typeof XrSessionEventResponseDataSchema>;

/**
 * XR session event response schema.
 */
export const XrSessionEventResponseSchema = enhancedSuccessWithDataSchema(
  XrSessionEventResponseDataSchema,
  {
    description: "XR session event response envelope.",
  },
);

/** Inferred type from the XrSessionEventResponse schema. */
export type XrSessionEventResponse = Static<typeof XrSessionEventResponseSchema>;

/**
 * XR ingest enqueue response schema.
 */
export const XrIngestResponseDataSchema: TObject<
  {
    readonly queued: TBoolean;
    readonly jobId: TUnion<(TString | TNull)[]>;
    readonly experienceId: TString;
  },
  "experienceId" | "jobId" | "queued",
  never
> = TypeExports.Object(
  {
    queued: TypeExports.Boolean(),
    jobId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    experienceId: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrIngestResponseData schema. */
export type XrIngestResponseData = Static<typeof XrIngestResponseDataSchema>;

/**
 * XR ingest enqueue response schema.
 */
export const XrIngestResponseSchema = enhancedSuccessWithDataSchema(XrIngestResponseDataSchema, {
  description: "XR ingest enqueue response envelope.",
});

/** Inferred type from the XrIngestResponse schema. */
export type XrIngestResponse = Static<typeof XrIngestResponseSchema>;

/**
 * XR input profile response schema.
 */
export const XrInputProfileResponseDataSchema = TypeExports.Object(
  {
    profiles: TypeExports.Array(XrInputProfileSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrInputProfileResponseData schema. */
export type XrInputProfileResponseData = Static<typeof XrInputProfileResponseDataSchema>;

/**
 * XR input profile response schema.
 */
export const XrInputProfileResponseSchema = enhancedSuccessWithDataSchema(
  XrInputProfileResponseDataSchema,
  {
    description: "XR input profile response envelope.",
  },
);

/** Inferred type from the XrInputProfileResponse schema. */
export type XrInputProfileResponse = Static<typeof XrInputProfileResponseSchema>;
