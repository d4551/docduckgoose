/**
 * XR session schemas.
 *
 * Defines TypeBox schemas for XR session orchestration, participants,
 * telemetry events, and ingest workflows.
 *
 * @shared/schemas/xr-session.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
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
export const XrSessionStatusSchema: Type.TUnion<
  (Type.TLiteral<"active"> | Type.TLiteral<"paused"> | Type.TLiteral<"closed">)[]
> = Type.Union([Type.Literal("active"), Type.Literal("paused"), Type.Literal("closed")], {
  description: "XR session lifecycle status",
});

/** Inferred type from the XrSessionStatus schema. */
export type XrSessionStatus = Static<typeof XrSessionStatusSchema>;

/**
 * XR session participant roles.
 */
export const XrSessionParticipantRoleSchema: Type.TUnion<
  (Type.TLiteral<"host"> | Type.TLiteral<"participant"> | Type.TLiteral<"observer">)[]
> = Type.Union([Type.Literal("host"), Type.Literal("participant"), Type.Literal("observer")], {
  description: "XR session participant role",
});

/** Inferred type from the XrSessionParticipantRole schema. */
export type XrSessionParticipantRole = Static<typeof XrSessionParticipantRoleSchema>;

/**
 * XR session event kinds.
 */
export const XrSessionEventKindSchema: Type.TUnion<
  (
    | Type.TLiteral<"telemetry">
    | Type.TLiteral<"input">
    | Type.TLiteral<"annotation">
    | Type.TLiteral<"review">
    | Type.TLiteral<"performance">
    | Type.TLiteral<"system">
  )[]
> = Type.Union(
  [
    Type.Literal("telemetry"),
    Type.Literal("input"),
    Type.Literal("annotation"),
    Type.Literal("review"),
    Type.Literal("performance"),
    Type.Literal("system"),
  ],
  { description: "XR session event classification" },
);

/** Inferred type from the XrSessionEventKind schema. */
export type XrSessionEventKind = Static<typeof XrSessionEventKindSchema>;

/**
 * XR input profile describing a device/controller input layer.
 */
export const XrInputProfileSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    deviceId: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    deviceType: stringEnum(DEVICE_TYPES, {}),
    role: Type.String({ minLength: 1 }),
    connected: Type.Optional(Type.Boolean()),
    lastSeen: Type.Optional(Type.String({ format: "date-time" })),
    capabilities: Type.Optional(Type.Record(Type.String(), Type.Boolean())),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrInputProfile schema. */
export type XrInputProfile = Static<typeof XrInputProfileSchema>;

/**
 * XR session participant record.
 */
export const XrSessionParticipantSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    sessionId: Type.String({ minLength: 1 }),
    userId: Type.String({ minLength: 1 }),
    role: XrSessionParticipantRoleSchema,
    joinedAt: Type.String({ format: "date-time" }),
    leftAt: Type.Optional(Type.String({ format: "date-time" })),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionParticipant schema. */
export type XrSessionParticipant = Static<typeof XrSessionParticipantSchema>;

/**
 * XR session event record.
 */
export const XrSessionEventSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    sessionId: Type.String({ minLength: 1 }),
    kind: XrSessionEventKindSchema,
    payload: Type.Record(Type.String(), Type.Unknown()),
    actorId: Type.Optional(Type.String({ minLength: 1 })),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionEvent schema. */
export type XrSessionEvent = Static<typeof XrSessionEventSchema>;

/**
 * XR session record.
 */
export const XrSessionSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    experienceId: Type.String({ minLength: 1 }),
    status: XrSessionStatusSchema,
    mode: Type.Optional(XrRenderModeSchema),
    deviceClass: Type.Optional(XrDeviceClassSchema),
    createdBy: Type.Optional(Type.String({ minLength: 1 })),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
    closedAt: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSession schema. */
export type XrSession = Static<typeof XrSessionSchema>;

/**
 * XR session create request payload.
 */
export const XrSessionCreateRequestSchema = Type.Object(
  {
    experienceId: Type.String({ minLength: 1 }),
    mode: Type.Optional(XrRenderModeSchema),
    deviceClass: Type.Optional(XrDeviceClassSchema),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionCreateRequest schema. */
export type XrSessionCreateRequest = Static<typeof XrSessionCreateRequestSchema>;

/**
 * XR session list request payload.
 */
export const XrSessionListRequestSchema: Type.TObject<
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
> = Type.Object(
  {
    experienceId: Type.Optional(Type.String({ minLength: 1 })),
    status: Type.Optional(XrSessionStatusSchema),
    limit: Type.Optional(Type.Integer({ minimum: 1 })),
    offset: Type.Optional(Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionListRequest schema. */
export type XrSessionListRequest = Static<typeof XrSessionListRequestSchema>;

/**
 * XR session join request payload.
 */
export const XrSessionJoinRequestSchema: Type.TObject<
  {
    readonly role: Type.TOptional<
      Type.TUnion<
        (Type.TLiteral<"host"> | Type.TLiteral<"participant"> | Type.TLiteral<"observer">)[]
      >
    >;
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly role: Type.TOptional<
      Type.TUnion<
        (Type.TLiteral<"host"> | Type.TLiteral<"participant"> | Type.TLiteral<"observer">)[]
      >
    >;
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    role: Type.Optional(XrSessionParticipantRoleSchema),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionJoinRequest schema. */
export type XrSessionJoinRequest = Static<typeof XrSessionJoinRequestSchema>;

/**
 * XR session leave request payload.
 */
export const XrSessionLeaveRequestSchema: Type.TObject<
  {
    readonly userId: Type.TOptional<Type.TString>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly userId: Type.TOptional<Type.TString>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    userId: Type.Optional(Type.String({ minLength: 1 })),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionLeaveRequest schema. */
export type XrSessionLeaveRequest = Static<typeof XrSessionLeaveRequestSchema>;

/**
 * XR session close request payload.
 */
export const XrSessionCloseRequestSchema: Type.TObject<
  {
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionCloseRequest schema. */
export type XrSessionCloseRequest = Static<typeof XrSessionCloseRequestSchema>;

/**
 * XR session event creation payload.
 */
export const XrSessionEventCreateRequestSchema = Type.Object(
  {
    kind: XrSessionEventKindSchema,
    payload: Type.Record(Type.String(), Type.Unknown()),
    actorId: Type.Optional(Type.String({ minLength: 1 })),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionEventCreateRequest schema. */
export type XrSessionEventCreateRequest = Static<typeof XrSessionEventCreateRequestSchema>;

/**
 * XR session event list request payload.
 */
export const XrSessionEventListRequestSchema: Type.TObject<
  {
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
  never,
  Type.InferOptionalKeys<{
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
    kind: Type.Optional(XrSessionEventKindSchema),
    limit: Type.Optional(Type.Integer({ minimum: 1 })),
    offset: Type.Optional(Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the XrSessionEventListRequest schema. */
export type XrSessionEventListRequest = Static<typeof XrSessionEventListRequestSchema>;

/**
 * XR ingest from scan session payload.
 */
export const XrIngestScanRequestSchema = Type.Object(
  {
    sessionId: Type.String({ minLength: 1 }),
    usdName: Type.Optional(Type.String({ minLength: 1 })),
    usdFormat: Type.Optional(Type.String({ minLength: 1 })),
    role: Type.Optional(Type.String({ minLength: 1 })),
    displayOrder: Type.Optional(Type.Number()),
    transform: Type.Optional(XrTransformSchema),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
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
export const XrIngestAutonomyTelemetryRequestSchema = Type.Union(
  [
    Type.Object(
      {
        source: Type.Literal("robotics"),
        robotId: Type.String({ minLength: 1 }),
        since: Type.Optional(Type.String({ format: "date-time" })),
        until: Type.Optional(Type.String({ format: "date-time" })),
        limit: Type.Optional(Type.Integer({ minimum: 1 })),
        usdName: Type.Optional(Type.String({ minLength: 1 })),
        usdFormat: Type.Optional(Type.String({ minLength: 1 })),
        role: Type.Optional(Type.String({ minLength: 1 })),
        displayOrder: Type.Optional(Type.Number()),
        transform: Type.Optional(XrTransformSchema),
        metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
        idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
      },
      { additionalProperties: false },
    ),
    Type.Object(
      {
        source: Type.Literal("drone"),
        vehicleId: Type.String({ minLength: 1 }),
        since: Type.Optional(Type.String({ format: "date-time" })),
        until: Type.Optional(Type.String({ format: "date-time" })),
        limit: Type.Optional(Type.Integer({ minimum: 1 })),
        usdName: Type.Optional(Type.String({ minLength: 1 })),
        usdFormat: Type.Optional(Type.String({ minLength: 1 })),
        role: Type.Optional(Type.String({ minLength: 1 })),
        displayOrder: Type.Optional(Type.Number()),
        transform: Type.Optional(XrTransformSchema),
        metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
        idempotencyKey: Type.Optional(Type.String({ minLength: 1, maxLength: 128 })),
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
export const XrSessionResponseDataSchema = Type.Object(
  {
    session: XrSessionSchema,
    participants: Type.Optional(Type.Array(XrSessionParticipantSchema)),
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
export const XrSessionListResponseDataSchema = Type.Object(
  {
    sessions: Type.Array(XrSessionSchema),
    total: Type.Integer({ minimum: 0 }),
    limit: Type.Integer({ minimum: 1 }),
    offset: Type.Integer({ minimum: 0 }),
    hasMore: Type.Boolean(),
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
export const XrSessionParticipantResponseDataSchema = Type.Object(
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
export const XrSessionEventListResponseDataSchema = Type.Object(
  {
    events: Type.Array(XrSessionEventSchema),
    total: Type.Integer({ minimum: 0 }),
    limit: Type.Integer({ minimum: 1 }),
    offset: Type.Integer({ minimum: 0 }),
    hasMore: Type.Boolean(),
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
export const XrSessionEventResponseDataSchema = Type.Object(
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
export const XrIngestResponseDataSchema: Type.TObject<
  {
    readonly queued: Type.TBoolean;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly experienceId: Type.TString;
  },
  "experienceId" | "jobId" | "queued",
  never
> = Type.Object(
  {
    queued: Type.Boolean(),
    jobId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    experienceId: Type.String({ minLength: 1 }),
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
export const XrInputProfileResponseDataSchema = Type.Object(
  {
    profiles: Type.Array(XrInputProfileSchema),
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
