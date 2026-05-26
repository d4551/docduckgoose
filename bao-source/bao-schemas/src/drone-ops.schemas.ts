/**
 * Drone operational schemas.
 *
 * Defines TypeBox schemas for geofencing, rally points, RTK corrections,
 * offboard control, flight logging, and video fusion configuration.
 *
 * @shared/schemas/drone-ops.ts
 */

import {
  DRONE_MISSION_PLANNER_LIMITS,
  DRONE_POLICY_DEFAULTS,
} from "@baohaus/bao-config/drone.defaults";
import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { GpsFixTypeSchema } from "./sensor.schemas.ts";

// Geofence

/** Allowed geofence breach actions for drone safety policy. */
export const DRONE_GEOFENCE_ACTIONS: readonly ["return", "hold", "land", "report"] = [
  "return",
  "hold",
  "land",
  "report",
] as const;
/** Inferred type from the DroneGeofenceAction schema. */
export type DroneGeofenceAction = (typeof DRONE_GEOFENCE_ACTIONS)[number];

/** TypeBox schema for DroneGeofenceActionSchema. */
export const DroneGeofenceActionSchema: TUnion<
  (TLiteral<"return"> | TLiteral<"hold"> | TLiteral<"land"> | TLiteral<"report">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("return"),
    TypeExports.Literal("hold"),
    TypeExports.Literal("land"),
    TypeExports.Literal("report"),
  ],
  {},
);

/** TypeBox schema for DroneGeofencePointSchema. */
export const DroneGeofencePointSchema: TObject<
  {
    readonly latitude: TNumber;
    readonly longitude: TNumber;
    readonly altitudeM: TOptional<TNumber>;
  },
  "latitude" | "longitude",
  "altitudeM"
> = TypeExports.Object(
  {
    latitude: TypeExports.Number({ minimum: -90, maximum: 90, description: "Latitude (deg)" }),
    longitude: TypeExports.Number({ minimum: -180, maximum: 180, description: "Longitude (deg)" }),
    altitudeM: TypeExports.Optional(TypeExports.Number({ description: "Altitude (meters)" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneGeofencePoint schema. */
export type DroneGeofencePoint = Static<typeof DroneGeofencePointSchema>;

/** TypeBox schema for DroneGeofencePolygonSchema. */
export const DroneGeofencePolygonSchema = TypeExports.Object(
  {
    id: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    points: TypeExports.Array(DroneGeofencePointSchema, { minItems: 3 }),
    minAltitudeM: TypeExports.Optional(TypeExports.Number()),
    maxAltitudeM: TypeExports.Optional(TypeExports.Number()),
    action: TypeExports.Optional(DroneGeofenceActionSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneGeofencePolygon schema. */
export type DroneGeofencePolygon = Static<typeof DroneGeofencePolygonSchema>;

/** TypeBox schema for DroneGeofenceConfigSchema. */
export const DroneGeofenceConfigSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    polygons: TypeExports.Array(DroneGeofencePolygonSchema),
    minAltitudeM: TypeExports.Optional(TypeExports.Number()),
    maxAltitudeM: TypeExports.Optional(TypeExports.Number()),
    maxDistanceM: TypeExports.Optional(TypeExports.Number()),
    defaultAction: TypeExports.Optional(DroneGeofenceActionSchema),
    updatedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneGeofenceConfig schema. */
export type DroneGeofenceConfig = Static<typeof DroneGeofenceConfigSchema>;

// Rally Points

/** TypeBox schema for DroneRallyPointSchema. */
export const DroneRallyPointSchema: TObject<
  {
    readonly id: TOptional<TString>;
    readonly latitude: TNumber;
    readonly longitude: TNumber;
    readonly altitudeM: TNumber;
    readonly loiterRadiusM: TOptional<TNumber>;
    readonly acceptanceRadiusM: TOptional<TNumber>;
  },
  "latitude" | "longitude" | "altitudeM",
  InferOptionalKeys<{
    readonly id: TOptional<TString>;
    readonly latitude: TNumber;
    readonly longitude: TNumber;
    readonly altitudeM: TNumber;
    readonly loiterRadiusM: TOptional<TNumber>;
    readonly acceptanceRadiusM: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    id: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    latitude: TypeExports.Number({ minimum: -90, maximum: 90 }),
    longitude: TypeExports.Number({ minimum: -180, maximum: 180 }),
    altitudeM: TypeExports.Number(),
    loiterRadiusM: TypeExports.Optional(TypeExports.Number()),
    acceptanceRadiusM: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneRallyPoint schema. */
export type DroneRallyPoint = Static<typeof DroneRallyPointSchema>;

/** TypeBox schema for DroneRallyPointsConfigSchema. */
export const DroneRallyPointsConfigSchema: TObject<
  {
    readonly enabled: TBoolean;
    readonly points: TArray<
      TObject<
        {
          readonly id: TOptional<TString>;
          readonly latitude: TNumber;
          readonly longitude: TNumber;
          readonly altitudeM: TNumber;
          readonly loiterRadiusM: TOptional<TNumber>;
          readonly acceptanceRadiusM: TOptional<TNumber>;
        },
        "latitude" | "longitude" | "altitudeM",
        InferOptionalKeys<{
          readonly id: TOptional<TString>;
          readonly latitude: TNumber;
          readonly longitude: TNumber;
          readonly altitudeM: TNumber;
          readonly loiterRadiusM: TOptional<TNumber>;
          readonly acceptanceRadiusM: TOptional<TNumber>;
        }>
      >
    >;
    readonly updatedAt: TOptional<TString>;
  },
  "points" | "enabled",
  "updatedAt"
> = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    points: TypeExports.Array(DroneRallyPointSchema),
    updatedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneRallyPointsConfig schema. */
export type DroneRallyPointsConfig = Static<typeof DroneRallyPointsConfigSchema>;

// RTK Corrections

/** Supported RTK correction data formats. */
export const DRONE_RTK_FORMATS: readonly ["rtcm2", "rtcm3"] = ["rtcm2", "rtcm3"] as const;
/** Inferred type from the DroneRtkFormat schema. */
export type DroneRtkFormat = (typeof DRONE_RTK_FORMATS)[number];

/** TypeBox schema for DroneRtkFormatSchema. */
export const DroneRtkFormatSchema: TUnion<(TLiteral<"rtcm2"> | TLiteral<"rtcm3">)[]> =
  TypeExports.Union([TypeExports.Literal("rtcm2"), TypeExports.Literal("rtcm3")], {});

/** TypeBox schema for DroneRtkCorrectionSchema. */
export const DroneRtkCorrectionSchema: TObject<
  {
    readonly format: TUnion<(TLiteral<"rtcm2"> | TLiteral<"rtcm3">)[]>;
    readonly data: TString;
    readonly timestamp: TOptional<TString>;
  },
  "format" | "data",
  "timestamp"
> = TypeExports.Object(
  {
    format: DroneRtkFormatSchema,
    data: TypeExports.String({ minLength: 1, description: "Base64-encoded RTCM payload" }),
    timestamp: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneRtkCorrection schema. */
export type DroneRtkCorrection = Static<typeof DroneRtkCorrectionSchema>;

/** TypeBox schema for DroneRtkStatusSchema. */
export const DroneRtkStatusSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    lastCorrectionAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    ageMs: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    fixType: TypeExports.Optional(GpsFixTypeSchema),
    source: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneRtkStatus schema. */
export type DroneRtkStatus = Static<typeof DroneRtkStatusSchema>;

// Offboard Control

/** Coordinate reference frames for offboard control commands. */
export const DRONE_OFFBOARD_FRAMES: readonly ["ned", "body"] = ["ned", "body"] as const;
/** Inferred type from the DroneOffboardFrame schema. */
export type DroneOffboardFrame = (typeof DRONE_OFFBOARD_FRAMES)[number];

/** TypeBox schema for DroneOffboardFrameSchema. */
export const DroneOffboardFrameSchema: TUnion<(TLiteral<"ned"> | TLiteral<"body">)[]> =
  TypeExports.Union([TypeExports.Literal("ned"), TypeExports.Literal("body")], {});

/** TypeBox schema for DroneOffboardPositionSetpointSchema. */
export const DroneOffboardPositionSetpointSchema: TObject<
  {
    readonly type: TLiteral<"position">;
    readonly latitude: TNumber;
    readonly longitude: TNumber;
    readonly altitudeM: TNumber;
    readonly yawDeg: TOptional<TNumber>;
  },
  "type" | "latitude" | "longitude" | "altitudeM",
  "yawDeg"
> = TypeExports.Object(
  {
    type: TypeExports.Literal("position"),
    latitude: TypeExports.Number({ minimum: -90, maximum: 90 }),
    longitude: TypeExports.Number({ minimum: -180, maximum: 180 }),
    altitudeM: TypeExports.Number(),
    yawDeg: TypeExports.Optional(TypeExports.Number()),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneOffboardVelocitySetpointSchema. */
export const DroneOffboardVelocitySetpointSchema: TObject<
  {
    readonly type: TLiteral<"velocity">;
    readonly frame: TOptional<TUnion<(TLiteral<"ned"> | TLiteral<"body">)[]>>;
    readonly vx: TNumber;
    readonly vy: TNumber;
    readonly vz: TNumber;
    readonly yawRateDeg: TOptional<TNumber>;
  },
  "type" | "vx" | "vy" | "vz",
  InferOptionalKeys<{
    readonly type: TLiteral<"velocity">;
    readonly frame: TOptional<TUnion<(TLiteral<"ned"> | TLiteral<"body">)[]>>;
    readonly vx: TNumber;
    readonly vy: TNumber;
    readonly vz: TNumber;
    readonly yawRateDeg: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    type: TypeExports.Literal("velocity"),
    frame: TypeExports.Optional(DroneOffboardFrameSchema),
    vx: TypeExports.Number({ description: "Velocity X (m/s)" }),
    vy: TypeExports.Number({ description: "Velocity Y (m/s)" }),
    vz: TypeExports.Number({ description: "Velocity Z (m/s)" }),
    yawRateDeg: TypeExports.Optional(TypeExports.Number({ description: "Yaw rate (deg/s)" })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneOffboardAttitudeSetpointSchema. */
export const DroneOffboardAttitudeSetpointSchema: TObject<
  {
    readonly type: TLiteral<"attitude">;
    readonly rollDeg: TNumber;
    readonly pitchDeg: TNumber;
    readonly yawDeg: TNumber;
    readonly thrust: TNumber;
  },
  "type" | "rollDeg" | "pitchDeg" | "yawDeg" | "thrust",
  never
> = TypeExports.Object(
  {
    type: TypeExports.Literal("attitude"),
    rollDeg: TypeExports.Number(),
    pitchDeg: TypeExports.Number(),
    yawDeg: TypeExports.Number(),
    thrust: TypeExports.Number({ minimum: 0, maximum: 1 }),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneOffboardSetpointSchema. */
export const DroneOffboardSetpointSchema = TypeExports.Union(
  [
    DroneOffboardPositionSetpointSchema,
    DroneOffboardVelocitySetpointSchema,
    DroneOffboardAttitudeSetpointSchema,
  ],
  {},
);

/** Inferred type from the DroneOffboardSetpoint schema. */
export type DroneOffboardSetpoint = Static<typeof DroneOffboardSetpointSchema>;

/** TypeBox schema for DroneOffboardStatusSchema. */
export const DroneOffboardStatusSchema: TObject<
  {
    readonly active: TBoolean;
    readonly mode: TOptional<TString>;
    readonly lastSetpointAt: TOptional<TString>;
    readonly frame: TOptional<TUnion<(TLiteral<"ned"> | TLiteral<"body">)[]>>;
    readonly source: TOptional<TString>;
    readonly lastError: TOptional<TString>;
  },
  "active",
  InferOptionalKeys<{
    readonly active: TBoolean;
    readonly mode: TOptional<TString>;
    readonly lastSetpointAt: TOptional<TString>;
    readonly frame: TOptional<TUnion<(TLiteral<"ned"> | TLiteral<"body">)[]>>;
    readonly source: TOptional<TString>;
    readonly lastError: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    active: TypeExports.Boolean(),
    mode: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    lastSetpointAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    frame: TypeExports.Optional(DroneOffboardFrameSchema),
    source: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    lastError: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneOffboardStatus schema. */
export type DroneOffboardStatus = Static<typeof DroneOffboardStatusSchema>;

// Mission Planning

/** TypeBox schema for DroneMissionWaypointSchema. */
export const DroneMissionWaypointSchema: TObject<
  {
    readonly latitude: TNumber;
    readonly longitude: TNumber;
    readonly altitude: TNumber;
    readonly holdTime: TOptional<TNumber>;
    readonly speed: TOptional<TNumber>;
  },
  "latitude" | "longitude" | "altitude",
  InferOptionalKeys<{
    readonly latitude: TNumber;
    readonly longitude: TNumber;
    readonly altitude: TNumber;
    readonly holdTime: TOptional<TNumber>;
    readonly speed: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    latitude: TypeExports.Number({ minimum: -90, maximum: 90 }),
    longitude: TypeExports.Number({ minimum: -180, maximum: 180 }),
    altitude: TypeExports.Number(),
    holdTime: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    speed: TypeExports.Optional(
      TypeExports.Number({
        minimum: 0,
        maximum: DRONE_POLICY_DEFAULTS.limits.maxHorizontalSpeedMps,
      }),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneMissionWaypoint schema. */
export type DroneMissionWaypoint = Static<typeof DroneMissionWaypointSchema>;

/** TypeBox schema for DroneMissionSchema. */
export const DroneMissionSchema: TObject<
  {
    readonly waypoints: TArray<
      TObject<
        {
          readonly latitude: TNumber;
          readonly longitude: TNumber;
          readonly altitude: TNumber;
          readonly holdTime: TOptional<TNumber>;
          readonly speed: TOptional<TNumber>;
        },
        "latitude" | "longitude" | "altitude",
        InferOptionalKeys<{
          readonly latitude: TNumber;
          readonly longitude: TNumber;
          readonly altitude: TNumber;
          readonly holdTime: TOptional<TNumber>;
          readonly speed: TOptional<TNumber>;
        }>
      >
    >;
    readonly autoStart: TOptional<TBoolean>;
  },
  "waypoints",
  "autoStart"
> = TypeExports.Object(
  {
    waypoints: TypeExports.Array(DroneMissionWaypointSchema, {
      minItems: DRONE_MISSION_PLANNER_LIMITS.minWaypoints,
      maxItems: DRONE_MISSION_PLANNER_LIMITS.maxWaypoints,
    }),
    autoStart: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneMission schema. */
export type DroneMission = Static<typeof DroneMissionSchema>;

// Flight Logs

/** Possible flight log recording statuses. */
export const DRONE_LOG_STATUSES: readonly ["recording", "stopped"] = [
  "recording",
  "stopped",
] as const;
/** Inferred type from the DroneLogStatus schema. */
export type DroneLogStatus = (typeof DRONE_LOG_STATUSES)[number];

/** TypeBox schema for DroneLogStatusSchema. */
export const DroneLogStatusSchema: TUnion<
  [TLiteral<"recording" | "stopped">, ...TLiteral<"recording" | "stopped">[]]
> = stringEnum(DRONE_LOG_STATUSES, {});

/** TypeBox schema for DroneLogSessionSchema. */
export const DroneLogSessionSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    deviceId: TypeExports.String({ minLength: 1 }),
    status: DroneLogStatusSchema,
    startedAt: TypeExports.String({ format: "date-time" }),
    stoppedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    sizeBytes: TypeExports.Number({ minimum: 0 }),
    recordCount: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    format: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    label: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneLogSession schema. */
export type DroneLogSession = Static<typeof DroneLogSessionSchema>;

/** TypeBox schema for DroneLogListResponseSchema. */
export const DroneLogListResponseSchema = TypeExports.Object(
  {
    sessions: TypeExports.Array(DroneLogSessionSchema),
    activeSessionId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    retentionHours: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    maxSessions: TypeExports.Optional(TypeExports.Number({ minimum: 1 })),
    maxBytes: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneLogListResponse schema. */
export type DroneLogListResponse = Static<typeof DroneLogListResponseSchema>;

/** TypeBox schema for DroneLogStartRequestSchema. */
export const DroneLogStartRequestSchema: TObject<
  {
    readonly label: TOptional<TString>;
    readonly metadata: TOptional<TRecord<TString, TUnknown>>;
  },
  never,
  InferOptionalKeys<{
    readonly label: TOptional<TString>;
    readonly metadata: TOptional<TRecord<TString, TUnknown>>;
  }>
> = TypeExports.Object(
  {
    label: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneLogStartRequest schema. */
export type DroneLogStartRequest = Static<typeof DroneLogStartRequestSchema>;

/** TypeBox schema for DroneLogExportRequestSchema. */
export const DroneLogExportRequestSchema: TObject<
  {
    readonly deviceId: TString;
    readonly sessionId: TString;
    readonly format: TOptional<TString>;
    readonly idempotencyKey: TOptional<TString>;
  },
  "deviceId" | "sessionId",
  InferOptionalKeys<{
    readonly deviceId: TString;
    readonly sessionId: TString;
    readonly format: TOptional<TString>;
    readonly idempotencyKey: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    deviceId: TypeExports.String({ minLength: 1 }),
    sessionId: TypeExports.String({ minLength: 1 }),
    format: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneLogExportRequest schema. */
export type DroneLogExportRequest = Static<typeof DroneLogExportRequestSchema>;

/** TypeBox schema for DroneLogExportResultSchema. */
export const DroneLogExportResultSchema: TObject<
  {
    readonly fileName: TString;
    readonly sizeBytes: TNumber;
    readonly contentType: TString;
    readonly storage: TOptional<
      TObject<
        {
          readonly provider: TString;
          readonly bucket: TString;
          readonly key: TString;
          readonly url: TOptional<TString>;
        },
        "provider" | "bucket" | "key",
        "url"
      >
    >;
  },
  "fileName" | "sizeBytes" | "contentType",
  "storage"
> = TypeExports.Object(
  {
    fileName: TypeExports.String({ minLength: 1 }),
    sizeBytes: TypeExports.Number({ minimum: 0 }),
    contentType: TypeExports.String({ minLength: 1 }),
    storage: TypeExports.Optional(
      TypeExports.Object(
        {
          provider: TypeExports.String({ minLength: 1 }),
          bucket: TypeExports.String({ minLength: 1 }),
          key: TypeExports.String({ minLength: 1 }),
          url: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneLogExportResult schema. */
export type DroneLogExportResult = Static<typeof DroneLogExportResultSchema>;

/** TypeBox schema for DroneLogExportResponseSchema. */
export const DroneLogExportResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    queued: TypeExports.Boolean(),
    jobId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    deviceId: TypeExports.String({ minLength: 1 }),
    sessionId: TypeExports.String({ minLength: 1 }),
    export: TypeExports.Optional(DroneLogExportResultSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneLogExportResponse schema. */
export type DroneLogExportResponse = Static<typeof DroneLogExportResponseSchema>;

// Video Fusion

/** Available video fusion overlay types for drone feeds. */
export const DRONE_FUSION_OVERLAYS: readonly [
  "telemetry",
  "detections",
  "geofence",
  "rally",
  "rtk",
] = ["telemetry", "detections", "geofence", "rally", "rtk"] as const;
/** Inferred type from the DroneFusionOverlay schema. */
export type DroneFusionOverlay = (typeof DRONE_FUSION_OVERLAYS)[number];

/** TypeBox schema for DroneFusionOverlaySchema. */
export const DroneFusionOverlaySchema: TUnion<
  (
    | TLiteral<"telemetry">
    | TLiteral<"detections">
    | TLiteral<"geofence">
    | TLiteral<"rally">
    | TLiteral<"rtk">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("telemetry"),
    TypeExports.Literal("detections"),
    TypeExports.Literal("geofence"),
    TypeExports.Literal("rally"),
    TypeExports.Literal("rtk"),
  ],
  {},
);

/** TypeBox schema for DroneVideoFusionConfigSchema. */
export const DroneVideoFusionConfigSchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    overlays: TypeExports.Array(DroneFusionOverlaySchema),
    telemetryRateHz: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    maxLatencyMs: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    xrExperienceId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    usdAssetId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    updatedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneVideoFusionConfig schema. */
export type DroneVideoFusionConfig = Static<typeof DroneVideoFusionConfigSchema>;

/** TypeBox schema for DroneVideoFusionStatusSchema. */
export const DroneVideoFusionStatusSchema = TypeExports.Object(
  {
    active: TypeExports.Boolean(),
    config: DroneVideoFusionConfigSchema,
    lastUpdatedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneVideoFusionStatus schema. */
export type DroneVideoFusionStatus = Static<typeof DroneVideoFusionStatusSchema>;

// Safety Policy

/** TypeBox schema for DroneSafetyLimitsSchema. */
export const DroneSafetyLimitsSchema: TObject<
  {
    readonly minAltitudeM: TOptional<TNumber>;
    readonly maxAltitudeM: TOptional<TNumber>;
    readonly maxHorizontalSpeedMps: TOptional<TNumber>;
    readonly maxVerticalSpeedMps: TOptional<TNumber>;
    readonly maxYawRateDegS: TOptional<TNumber>;
  },
  never,
  InferOptionalKeys<{
    readonly minAltitudeM: TOptional<TNumber>;
    readonly maxAltitudeM: TOptional<TNumber>;
    readonly maxHorizontalSpeedMps: TOptional<TNumber>;
    readonly maxVerticalSpeedMps: TOptional<TNumber>;
    readonly maxYawRateDegS: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    minAltitudeM: TypeExports.Optional(TypeExports.Number()),
    maxAltitudeM: TypeExports.Optional(TypeExports.Number()),
    maxHorizontalSpeedMps: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    maxVerticalSpeedMps: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    maxYawRateDegS: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneSafetyLimits schema. */
export type DroneSafetyLimits = Static<typeof DroneSafetyLimitsSchema>;

/** TypeBox schema for DroneSafetyPolicySchema. */
export const DroneSafetyPolicySchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    geofence: DroneGeofenceConfigSchema,
    rallyPoints: DroneRallyPointsConfigSchema,
    limits: DroneSafetyLimitsSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneSafetyPolicy schema. */
export type DroneSafetyPolicy = Static<typeof DroneSafetyPolicySchema>;

// Policy Evaluation

/** Severity levels for drone safety policy violations. */
export const DRONE_POLICY_SEVERITIES: readonly ["error", "warning"] = ["error", "warning"] as const;
/** Inferred type from the DronePolicySeverity schema. */
export type DronePolicySeverity = (typeof DRONE_POLICY_SEVERITIES)[number];

/** TypeBox schema for DronePolicySeveritySchema. */
export const DronePolicySeveritySchema: TUnion<
  [TLiteral<"error" | "warning">, ...TLiteral<"error" | "warning">[]]
> = stringEnum(DRONE_POLICY_SEVERITIES, {});

/** TypeBox schema for DronePolicyViolationSchema. */
export const DronePolicyViolationSchema = TypeExports.Object(
  {
    code: TypeExports.String({ minLength: 1 }),
    message: TypeExports.String({ minLength: 1 }),
    severity: DronePolicySeveritySchema,
    field: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    context: TypeExports.Optional(
      TypeExports.Object(
        {
          waypointIndex: TypeExports.Optional(TypeExports.Number({ minimum: 1 })),
          polygonId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
          action: TypeExports.Optional(DroneGeofenceActionSchema),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

// Movement Commands (HTTP/WS)

/** TypeBox schema for DroneMovementCommandVelocitySchema. */
export const DroneMovementCommandVelocitySchema: TObject<
  {
    readonly type: TLiteral<"velocity">;
    readonly vx: TNumber;
    readonly vy: TNumber;
    readonly vz: TNumber;
    readonly yawRate: TOptional<TNumber>;
    readonly duration: TOptional<TNumber>;
  },
  "type" | "vx" | "vy" | "vz",
  InferOptionalKeys<{
    readonly type: TLiteral<"velocity">;
    readonly vx: TNumber;
    readonly vy: TNumber;
    readonly vz: TNumber;
    readonly yawRate: TOptional<TNumber>;
    readonly duration: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    type: TypeExports.Literal("velocity"),
    vx: TypeExports.Number(),
    vy: TypeExports.Number(),
    vz: TypeExports.Number(),
    yawRate: TypeExports.Optional(TypeExports.Number()),
    duration: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneMovementCommandPositionSchema. */
export const DroneMovementCommandPositionSchema: TObject<
  {
    readonly type: TLiteral<"position">;
    readonly latitude: TNumber;
    readonly longitude: TNumber;
    readonly altitude: TOptional<TNumber>;
    readonly yaw: TOptional<TNumber>;
    readonly duration: TOptional<TNumber>;
  },
  "type" | "latitude" | "longitude",
  InferOptionalKeys<{
    readonly type: TLiteral<"position">;
    readonly latitude: TNumber;
    readonly longitude: TNumber;
    readonly altitude: TOptional<TNumber>;
    readonly yaw: TOptional<TNumber>;
    readonly duration: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    type: TypeExports.Literal("position"),
    latitude: TypeExports.Number({ minimum: -90, maximum: 90 }),
    longitude: TypeExports.Number({ minimum: -180, maximum: 180 }),
    altitude: TypeExports.Optional(TypeExports.Number()),
    yaw: TypeExports.Optional(TypeExports.Number()),
    duration: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneMovementCommandAttitudeSchema. */
export const DroneMovementCommandAttitudeSchema: TObject<
  {
    readonly type: TLiteral<"attitude">;
    readonly roll: TNumber;
    readonly pitch: TNumber;
    readonly yaw: TNumber;
    readonly throttle: TNumber;
    readonly duration: TOptional<TNumber>;
  },
  "type" | "yaw" | "roll" | "pitch" | "throttle",
  "duration"
> = TypeExports.Object(
  {
    type: TypeExports.Literal("attitude"),
    roll: TypeExports.Number(),
    pitch: TypeExports.Number(),
    yaw: TypeExports.Number(),
    throttle: TypeExports.Number({ minimum: 0, maximum: 1 }),
    duration: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneMovementCommandRcSchema. */
export const DroneMovementCommandRcSchema: TObject<
  {
    readonly type: TLiteral<"rc">;
    readonly roll: TNumber;
    readonly pitch: TNumber;
    readonly yaw: TNumber;
    readonly throttle: TNumber;
    readonly duration: TOptional<TNumber>;
  },
  "type" | "roll" | "pitch" | "yaw" | "throttle",
  "duration"
> = TypeExports.Object(
  {
    type: TypeExports.Literal("rc"),
    roll: TypeExports.Number({ minimum: -1, maximum: 1 }),
    pitch: TypeExports.Number({ minimum: -1, maximum: 1 }),
    yaw: TypeExports.Number({ minimum: -1, maximum: 1 }),
    throttle: TypeExports.Number({ minimum: -1, maximum: 1 }),
    duration: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneMovementCommandSchema. */
export const DroneMovementCommandSchema = TypeExports.Union(
  [
    DroneMovementCommandVelocitySchema,
    DroneMovementCommandPositionSchema,
    DroneMovementCommandAttitudeSchema,
    DroneMovementCommandRcSchema,
  ],
  {},
);

/** Inferred type from the DroneMovementCommand schema. */
export type DroneMovementCommand = Static<typeof DroneMovementCommandSchema>;

/** Inferred type from the DronePolicyViolation schema. */
export type DronePolicyViolation = Static<typeof DronePolicyViolationSchema>;

/** TypeBox schema for DronePolicyEvaluationSchema. */
export const DronePolicyEvaluationSchema = TypeExports.Object(
  {
    allowed: TypeExports.Boolean(),
    violations: TypeExports.Array(DronePolicyViolationSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the DronePolicyEvaluation schema. */
export type DronePolicyEvaluation = Static<typeof DronePolicyEvaluationSchema>;
