/**
 * Drone operational schemas.
 *
 * Defines TypeBox schemas for geofencing, rally points, RTK corrections,
 * offboard control, flight logging, and video fusion configuration.
 *
 * @shared/schemas/drone-ops.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { DRONE_MISSION_PLANNER_LIMITS, DRONE_POLICY_DEFAULTS } from "../config/drone.defaults.ts";
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
export const DroneGeofenceActionSchema: Type.TUnion<
  (
    | Type.TLiteral<"return">
    | Type.TLiteral<"hold">
    | Type.TLiteral<"land">
    | Type.TLiteral<"report">
  )[]
> = Type.Union(
  [Type.Literal("return"), Type.Literal("hold"), Type.Literal("land"), Type.Literal("report")],
  {},
);

/** TypeBox schema for DroneGeofencePointSchema. */
export const DroneGeofencePointSchema: Type.TObject<
  {
    readonly latitude: Type.TNumber;
    readonly longitude: Type.TNumber;
    readonly altitudeM: Type.TOptional<Type.TNumber>;
  },
  "latitude" | "longitude",
  "altitudeM"
> = Type.Object(
  {
    latitude: Type.Number({ minimum: -90, maximum: 90, description: "Latitude (deg)" }),
    longitude: Type.Number({ minimum: -180, maximum: 180, description: "Longitude (deg)" }),
    altitudeM: Type.Optional(Type.Number({ description: "Altitude (meters)" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneGeofencePoint schema. */
export type DroneGeofencePoint = Static<typeof DroneGeofencePointSchema>;

/** TypeBox schema for DroneGeofencePolygonSchema. */
export const DroneGeofencePolygonSchema = Type.Object(
  {
    id: Type.Optional(Type.String({ minLength: 1 })),
    points: Type.Array(DroneGeofencePointSchema, { minItems: 3 }),
    minAltitudeM: Type.Optional(Type.Number()),
    maxAltitudeM: Type.Optional(Type.Number()),
    action: Type.Optional(DroneGeofenceActionSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneGeofencePolygon schema. */
export type DroneGeofencePolygon = Static<typeof DroneGeofencePolygonSchema>;

/** TypeBox schema for DroneGeofenceConfigSchema. */
export const DroneGeofenceConfigSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    polygons: Type.Array(DroneGeofencePolygonSchema),
    minAltitudeM: Type.Optional(Type.Number()),
    maxAltitudeM: Type.Optional(Type.Number()),
    maxDistanceM: Type.Optional(Type.Number()),
    defaultAction: Type.Optional(DroneGeofenceActionSchema),
    updatedAt: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneGeofenceConfig schema. */
export type DroneGeofenceConfig = Static<typeof DroneGeofenceConfigSchema>;

// Rally Points

/** TypeBox schema for DroneRallyPointSchema. */
export const DroneRallyPointSchema: Type.TObject<
  {
    readonly id: Type.TOptional<Type.TString>;
    readonly latitude: Type.TNumber;
    readonly longitude: Type.TNumber;
    readonly altitudeM: Type.TNumber;
    readonly loiterRadiusM: Type.TOptional<Type.TNumber>;
    readonly acceptanceRadiusM: Type.TOptional<Type.TNumber>;
  },
  "latitude" | "longitude" | "altitudeM",
  Type.InferOptionalKeys<{
    readonly id: Type.TOptional<Type.TString>;
    readonly latitude: Type.TNumber;
    readonly longitude: Type.TNumber;
    readonly altitudeM: Type.TNumber;
    readonly loiterRadiusM: Type.TOptional<Type.TNumber>;
    readonly acceptanceRadiusM: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    id: Type.Optional(Type.String({ minLength: 1 })),
    latitude: Type.Number({ minimum: -90, maximum: 90 }),
    longitude: Type.Number({ minimum: -180, maximum: 180 }),
    altitudeM: Type.Number(),
    loiterRadiusM: Type.Optional(Type.Number()),
    acceptanceRadiusM: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneRallyPoint schema. */
export type DroneRallyPoint = Static<typeof DroneRallyPointSchema>;

/** TypeBox schema for DroneRallyPointsConfigSchema. */
export const DroneRallyPointsConfigSchema: Type.TObject<
  {
    readonly enabled: Type.TBoolean;
    readonly points: Type.TArray<
      Type.TObject<
        {
          readonly id: Type.TOptional<Type.TString>;
          readonly latitude: Type.TNumber;
          readonly longitude: Type.TNumber;
          readonly altitudeM: Type.TNumber;
          readonly loiterRadiusM: Type.TOptional<Type.TNumber>;
          readonly acceptanceRadiusM: Type.TOptional<Type.TNumber>;
        },
        "latitude" | "longitude" | "altitudeM",
        Type.InferOptionalKeys<{
          readonly id: Type.TOptional<Type.TString>;
          readonly latitude: Type.TNumber;
          readonly longitude: Type.TNumber;
          readonly altitudeM: Type.TNumber;
          readonly loiterRadiusM: Type.TOptional<Type.TNumber>;
          readonly acceptanceRadiusM: Type.TOptional<Type.TNumber>;
        }>
      >
    >;
    readonly updatedAt: Type.TOptional<Type.TString>;
  },
  "points" | "enabled",
  "updatedAt"
> = Type.Object(
  {
    enabled: Type.Boolean(),
    points: Type.Array(DroneRallyPointSchema),
    updatedAt: Type.Optional(Type.String({ format: "date-time" })),
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
export const DroneRtkFormatSchema: Type.TUnion<
  (Type.TLiteral<"rtcm2"> | Type.TLiteral<"rtcm3">)[]
> = Type.Union([Type.Literal("rtcm2"), Type.Literal("rtcm3")], {});

/** TypeBox schema for DroneRtkCorrectionSchema. */
export const DroneRtkCorrectionSchema: Type.TObject<
  {
    readonly format: Type.TUnion<(Type.TLiteral<"rtcm2"> | Type.TLiteral<"rtcm3">)[]>;
    readonly data: Type.TString;
    readonly timestamp: Type.TOptional<Type.TString>;
  },
  "format" | "data",
  "timestamp"
> = Type.Object(
  {
    format: DroneRtkFormatSchema,
    data: Type.String({ minLength: 1, description: "Base64-encoded RTCM payload" }),
    timestamp: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneRtkCorrection schema. */
export type DroneRtkCorrection = Static<typeof DroneRtkCorrectionSchema>;

/** TypeBox schema for DroneRtkStatusSchema. */
export const DroneRtkStatusSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    lastCorrectionAt: Type.Optional(Type.String({ format: "date-time" })),
    ageMs: Type.Optional(Type.Number({ minimum: 0 })),
    fixType: Type.Optional(GpsFixTypeSchema),
    source: Type.Optional(Type.String({ minLength: 1 })),
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
export const DroneOffboardFrameSchema: Type.TUnion<
  (Type.TLiteral<"ned"> | Type.TLiteral<"body">)[]
> = Type.Union([Type.Literal("ned"), Type.Literal("body")], {});

/** TypeBox schema for DroneOffboardPositionSetpointSchema. */
export const DroneOffboardPositionSetpointSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"position">;
    readonly latitude: Type.TNumber;
    readonly longitude: Type.TNumber;
    readonly altitudeM: Type.TNumber;
    readonly yawDeg: Type.TOptional<Type.TNumber>;
  },
  "type" | "latitude" | "longitude" | "altitudeM",
  "yawDeg"
> = Type.Object(
  {
    type: Type.Literal("position"),
    latitude: Type.Number({ minimum: -90, maximum: 90 }),
    longitude: Type.Number({ minimum: -180, maximum: 180 }),
    altitudeM: Type.Number(),
    yawDeg: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneOffboardVelocitySetpointSchema. */
export const DroneOffboardVelocitySetpointSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"velocity">;
    readonly frame: Type.TOptional<Type.TUnion<(Type.TLiteral<"ned"> | Type.TLiteral<"body">)[]>>;
    readonly vx: Type.TNumber;
    readonly vy: Type.TNumber;
    readonly vz: Type.TNumber;
    readonly yawRateDeg: Type.TOptional<Type.TNumber>;
  },
  "type" | "vx" | "vy" | "vz",
  Type.InferOptionalKeys<{
    readonly type: Type.TLiteral<"velocity">;
    readonly frame: Type.TOptional<Type.TUnion<(Type.TLiteral<"ned"> | Type.TLiteral<"body">)[]>>;
    readonly vx: Type.TNumber;
    readonly vy: Type.TNumber;
    readonly vz: Type.TNumber;
    readonly yawRateDeg: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    type: Type.Literal("velocity"),
    frame: Type.Optional(DroneOffboardFrameSchema),
    vx: Type.Number({ description: "Velocity X (m/s)" }),
    vy: Type.Number({ description: "Velocity Y (m/s)" }),
    vz: Type.Number({ description: "Velocity Z (m/s)" }),
    yawRateDeg: Type.Optional(Type.Number({ description: "Yaw rate (deg/s)" })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneOffboardAttitudeSetpointSchema. */
export const DroneOffboardAttitudeSetpointSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"attitude">;
    readonly rollDeg: Type.TNumber;
    readonly pitchDeg: Type.TNumber;
    readonly yawDeg: Type.TNumber;
    readonly thrust: Type.TNumber;
  },
  "type" | "rollDeg" | "pitchDeg" | "yawDeg" | "thrust",
  never
> = Type.Object(
  {
    type: Type.Literal("attitude"),
    rollDeg: Type.Number(),
    pitchDeg: Type.Number(),
    yawDeg: Type.Number(),
    thrust: Type.Number({ minimum: 0, maximum: 1 }),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneOffboardSetpointSchema. */
export const DroneOffboardSetpointSchema = Type.Union(
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
export const DroneOffboardStatusSchema: Type.TObject<
  {
    readonly active: Type.TBoolean;
    readonly mode: Type.TOptional<Type.TString>;
    readonly lastSetpointAt: Type.TOptional<Type.TString>;
    readonly frame: Type.TOptional<Type.TUnion<(Type.TLiteral<"ned"> | Type.TLiteral<"body">)[]>>;
    readonly source: Type.TOptional<Type.TString>;
    readonly lastError: Type.TOptional<Type.TString>;
  },
  "active",
  Type.InferOptionalKeys<{
    readonly active: Type.TBoolean;
    readonly mode: Type.TOptional<Type.TString>;
    readonly lastSetpointAt: Type.TOptional<Type.TString>;
    readonly frame: Type.TOptional<Type.TUnion<(Type.TLiteral<"ned"> | Type.TLiteral<"body">)[]>>;
    readonly source: Type.TOptional<Type.TString>;
    readonly lastError: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    active: Type.Boolean(),
    mode: Type.Optional(Type.String({ minLength: 1 })),
    lastSetpointAt: Type.Optional(Type.String({ format: "date-time" })),
    frame: Type.Optional(DroneOffboardFrameSchema),
    source: Type.Optional(Type.String({ minLength: 1 })),
    lastError: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneOffboardStatus schema. */
export type DroneOffboardStatus = Static<typeof DroneOffboardStatusSchema>;

// Mission Planning

/** TypeBox schema for DroneMissionWaypointSchema. */
export const DroneMissionWaypointSchema: Type.TObject<
  {
    readonly latitude: Type.TNumber;
    readonly longitude: Type.TNumber;
    readonly altitude: Type.TNumber;
    readonly holdTime: Type.TOptional<Type.TNumber>;
    readonly speed: Type.TOptional<Type.TNumber>;
  },
  "latitude" | "longitude" | "altitude",
  Type.InferOptionalKeys<{
    readonly latitude: Type.TNumber;
    readonly longitude: Type.TNumber;
    readonly altitude: Type.TNumber;
    readonly holdTime: Type.TOptional<Type.TNumber>;
    readonly speed: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    latitude: Type.Number({ minimum: -90, maximum: 90 }),
    longitude: Type.Number({ minimum: -180, maximum: 180 }),
    altitude: Type.Number(),
    holdTime: Type.Optional(Type.Number({ minimum: 0 })),
    speed: Type.Optional(
      Type.Number({
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
export const DroneMissionSchema: Type.TObject<
  {
    readonly waypoints: Type.TArray<
      Type.TObject<
        {
          readonly latitude: Type.TNumber;
          readonly longitude: Type.TNumber;
          readonly altitude: Type.TNumber;
          readonly holdTime: Type.TOptional<Type.TNumber>;
          readonly speed: Type.TOptional<Type.TNumber>;
        },
        "latitude" | "longitude" | "altitude",
        Type.InferOptionalKeys<{
          readonly latitude: Type.TNumber;
          readonly longitude: Type.TNumber;
          readonly altitude: Type.TNumber;
          readonly holdTime: Type.TOptional<Type.TNumber>;
          readonly speed: Type.TOptional<Type.TNumber>;
        }>
      >
    >;
    readonly autoStart: Type.TOptional<Type.TBoolean>;
  },
  "waypoints",
  "autoStart"
> = Type.Object(
  {
    waypoints: Type.Array(DroneMissionWaypointSchema, {
      minItems: DRONE_MISSION_PLANNER_LIMITS.minWaypoints,
      maxItems: DRONE_MISSION_PLANNER_LIMITS.maxWaypoints,
    }),
    autoStart: Type.Optional(Type.Boolean()),
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
export const DroneLogStatusSchema: Type.TUnion<
  [Type.TLiteral<"recording" | "stopped">, ...Type.TLiteral<"recording" | "stopped">[]]
> = stringEnum(DRONE_LOG_STATUSES, {});

/** TypeBox schema for DroneLogSessionSchema. */
export const DroneLogSessionSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    deviceId: Type.String({ minLength: 1 }),
    status: DroneLogStatusSchema,
    startedAt: Type.String({ format: "date-time" }),
    stoppedAt: Type.Optional(Type.String({ format: "date-time" })),
    sizeBytes: Type.Number({ minimum: 0 }),
    recordCount: Type.Optional(Type.Number({ minimum: 0 })),
    format: Type.Optional(Type.String({ minLength: 1 })),
    label: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneLogSession schema. */
export type DroneLogSession = Static<typeof DroneLogSessionSchema>;

/** TypeBox schema for DroneLogListResponseSchema. */
export const DroneLogListResponseSchema = Type.Object(
  {
    sessions: Type.Array(DroneLogSessionSchema),
    activeSessionId: Type.Optional(Type.String({ minLength: 1 })),
    retentionHours: Type.Optional(Type.Number({ minimum: 0 })),
    maxSessions: Type.Optional(Type.Number({ minimum: 1 })),
    maxBytes: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneLogListResponse schema. */
export type DroneLogListResponse = Static<typeof DroneLogListResponseSchema>;

/** TypeBox schema for DroneLogStartRequestSchema. */
export const DroneLogStartRequestSchema: Type.TObject<
  {
    readonly label: Type.TOptional<Type.TString>;
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly label: Type.TOptional<Type.TString>;
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  }>
> = Type.Object(
  {
    label: Type.Optional(Type.String({ minLength: 1 })),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneLogStartRequest schema. */
export type DroneLogStartRequest = Static<typeof DroneLogStartRequestSchema>;

/** TypeBox schema for DroneLogExportRequestSchema. */
export const DroneLogExportRequestSchema: Type.TObject<
  {
    readonly deviceId: Type.TString;
    readonly sessionId: Type.TString;
    readonly format: Type.TOptional<Type.TString>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  "deviceId" | "sessionId",
  Type.InferOptionalKeys<{
    readonly deviceId: Type.TString;
    readonly sessionId: Type.TString;
    readonly format: Type.TOptional<Type.TString>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    deviceId: Type.String({ minLength: 1 }),
    sessionId: Type.String({ minLength: 1 }),
    format: Type.Optional(Type.String({ minLength: 1 })),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneLogExportRequest schema. */
export type DroneLogExportRequest = Static<typeof DroneLogExportRequestSchema>;

/** TypeBox schema for DroneLogExportResultSchema. */
export const DroneLogExportResultSchema: Type.TObject<
  {
    readonly fileName: Type.TString;
    readonly sizeBytes: Type.TNumber;
    readonly contentType: Type.TString;
    readonly storage: Type.TOptional<
      Type.TObject<
        {
          readonly provider: Type.TString;
          readonly bucket: Type.TString;
          readonly key: Type.TString;
          readonly url: Type.TOptional<Type.TString>;
        },
        "provider" | "bucket" | "key",
        "url"
      >
    >;
  },
  "fileName" | "sizeBytes" | "contentType",
  "storage"
> = Type.Object(
  {
    fileName: Type.String({ minLength: 1 }),
    sizeBytes: Type.Number({ minimum: 0 }),
    contentType: Type.String({ minLength: 1 }),
    storage: Type.Optional(
      Type.Object(
        {
          provider: Type.String({ minLength: 1 }),
          bucket: Type.String({ minLength: 1 }),
          key: Type.String({ minLength: 1 }),
          url: Type.Optional(Type.String({ minLength: 1 })),
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
export const DroneLogExportResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    queued: Type.Boolean(),
    jobId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    deviceId: Type.String({ minLength: 1 }),
    sessionId: Type.String({ minLength: 1 }),
    export: Type.Optional(DroneLogExportResultSchema),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
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
export const DroneFusionOverlaySchema: Type.TUnion<
  (
    | Type.TLiteral<"telemetry">
    | Type.TLiteral<"detections">
    | Type.TLiteral<"geofence">
    | Type.TLiteral<"rally">
    | Type.TLiteral<"rtk">
  )[]
> = Type.Union(
  [
    Type.Literal("telemetry"),
    Type.Literal("detections"),
    Type.Literal("geofence"),
    Type.Literal("rally"),
    Type.Literal("rtk"),
  ],
  {},
);

/** TypeBox schema for DroneVideoFusionConfigSchema. */
export const DroneVideoFusionConfigSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    overlays: Type.Array(DroneFusionOverlaySchema),
    telemetryRateHz: Type.Optional(Type.Number({ minimum: 0 })),
    maxLatencyMs: Type.Optional(Type.Number({ minimum: 0 })),
    xrExperienceId: Type.Optional(Type.String({ minLength: 1 })),
    usdAssetId: Type.Optional(Type.String({ minLength: 1 })),
    updatedAt: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneVideoFusionConfig schema. */
export type DroneVideoFusionConfig = Static<typeof DroneVideoFusionConfigSchema>;

/** TypeBox schema for DroneVideoFusionStatusSchema. */
export const DroneVideoFusionStatusSchema = Type.Object(
  {
    active: Type.Boolean(),
    config: DroneVideoFusionConfigSchema,
    lastUpdatedAt: Type.Optional(Type.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneVideoFusionStatus schema. */
export type DroneVideoFusionStatus = Static<typeof DroneVideoFusionStatusSchema>;

// Safety Policy

/** TypeBox schema for DroneSafetyLimitsSchema. */
export const DroneSafetyLimitsSchema: Type.TObject<
  {
    readonly minAltitudeM: Type.TOptional<Type.TNumber>;
    readonly maxAltitudeM: Type.TOptional<Type.TNumber>;
    readonly maxHorizontalSpeedMps: Type.TOptional<Type.TNumber>;
    readonly maxVerticalSpeedMps: Type.TOptional<Type.TNumber>;
    readonly maxYawRateDegS: Type.TOptional<Type.TNumber>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly minAltitudeM: Type.TOptional<Type.TNumber>;
    readonly maxAltitudeM: Type.TOptional<Type.TNumber>;
    readonly maxHorizontalSpeedMps: Type.TOptional<Type.TNumber>;
    readonly maxVerticalSpeedMps: Type.TOptional<Type.TNumber>;
    readonly maxYawRateDegS: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    minAltitudeM: Type.Optional(Type.Number()),
    maxAltitudeM: Type.Optional(Type.Number()),
    maxHorizontalSpeedMps: Type.Optional(Type.Number({ minimum: 0 })),
    maxVerticalSpeedMps: Type.Optional(Type.Number({ minimum: 0 })),
    maxYawRateDegS: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the DroneSafetyLimits schema. */
export type DroneSafetyLimits = Static<typeof DroneSafetyLimitsSchema>;

/** TypeBox schema for DroneSafetyPolicySchema. */
export const DroneSafetyPolicySchema = Type.Object(
  {
    enabled: Type.Boolean(),
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
export const DronePolicySeveritySchema: Type.TUnion<
  [Type.TLiteral<"error" | "warning">, ...Type.TLiteral<"error" | "warning">[]]
> = stringEnum(DRONE_POLICY_SEVERITIES, {});

/** TypeBox schema for DronePolicyViolationSchema. */
export const DronePolicyViolationSchema = Type.Object(
  {
    code: Type.String({ minLength: 1 }),
    message: Type.String({ minLength: 1 }),
    severity: DronePolicySeveritySchema,
    field: Type.Optional(Type.String({ minLength: 1 })),
    context: Type.Optional(
      Type.Object(
        {
          waypointIndex: Type.Optional(Type.Number({ minimum: 1 })),
          polygonId: Type.Optional(Type.String({ minLength: 1 })),
          action: Type.Optional(DroneGeofenceActionSchema),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

// Movement Commands (HTTP/WS)

/** TypeBox schema for DroneMovementCommandVelocitySchema. */
export const DroneMovementCommandVelocitySchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"velocity">;
    readonly vx: Type.TNumber;
    readonly vy: Type.TNumber;
    readonly vz: Type.TNumber;
    readonly yawRate: Type.TOptional<Type.TNumber>;
    readonly duration: Type.TOptional<Type.TNumber>;
  },
  "type" | "vx" | "vy" | "vz",
  Type.InferOptionalKeys<{
    readonly type: Type.TLiteral<"velocity">;
    readonly vx: Type.TNumber;
    readonly vy: Type.TNumber;
    readonly vz: Type.TNumber;
    readonly yawRate: Type.TOptional<Type.TNumber>;
    readonly duration: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    type: Type.Literal("velocity"),
    vx: Type.Number(),
    vy: Type.Number(),
    vz: Type.Number(),
    yawRate: Type.Optional(Type.Number()),
    duration: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneMovementCommandPositionSchema. */
export const DroneMovementCommandPositionSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"position">;
    readonly latitude: Type.TNumber;
    readonly longitude: Type.TNumber;
    readonly altitude: Type.TOptional<Type.TNumber>;
    readonly yaw: Type.TOptional<Type.TNumber>;
    readonly duration: Type.TOptional<Type.TNumber>;
  },
  "type" | "latitude" | "longitude",
  Type.InferOptionalKeys<{
    readonly type: Type.TLiteral<"position">;
    readonly latitude: Type.TNumber;
    readonly longitude: Type.TNumber;
    readonly altitude: Type.TOptional<Type.TNumber>;
    readonly yaw: Type.TOptional<Type.TNumber>;
    readonly duration: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    type: Type.Literal("position"),
    latitude: Type.Number({ minimum: -90, maximum: 90 }),
    longitude: Type.Number({ minimum: -180, maximum: 180 }),
    altitude: Type.Optional(Type.Number()),
    yaw: Type.Optional(Type.Number()),
    duration: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneMovementCommandAttitudeSchema. */
export const DroneMovementCommandAttitudeSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"attitude">;
    readonly roll: Type.TNumber;
    readonly pitch: Type.TNumber;
    readonly yaw: Type.TNumber;
    readonly throttle: Type.TNumber;
    readonly duration: Type.TOptional<Type.TNumber>;
  },
  "type" | "yaw" | "roll" | "pitch" | "throttle",
  "duration"
> = Type.Object(
  {
    type: Type.Literal("attitude"),
    roll: Type.Number(),
    pitch: Type.Number(),
    yaw: Type.Number(),
    throttle: Type.Number({ minimum: 0, maximum: 1 }),
    duration: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneMovementCommandRcSchema. */
export const DroneMovementCommandRcSchema: Type.TObject<
  {
    readonly type: Type.TLiteral<"rc">;
    readonly roll: Type.TNumber;
    readonly pitch: Type.TNumber;
    readonly yaw: Type.TNumber;
    readonly throttle: Type.TNumber;
    readonly duration: Type.TOptional<Type.TNumber>;
  },
  "type" | "roll" | "pitch" | "yaw" | "throttle",
  "duration"
> = Type.Object(
  {
    type: Type.Literal("rc"),
    roll: Type.Number({ minimum: -1, maximum: 1 }),
    pitch: Type.Number({ minimum: -1, maximum: 1 }),
    yaw: Type.Number({ minimum: -1, maximum: 1 }),
    throttle: Type.Number({ minimum: -1, maximum: 1 }),
    duration: Type.Optional(Type.Number({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/** TypeBox schema for DroneMovementCommandSchema. */
export const DroneMovementCommandSchema = Type.Union(
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
export const DronePolicyEvaluationSchema = Type.Object(
  {
    allowed: Type.Boolean(),
    violations: Type.Array(DronePolicyViolationSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the DronePolicyEvaluation schema. */
export type DronePolicyEvaluation = Static<typeof DronePolicyEvaluationSchema>;
