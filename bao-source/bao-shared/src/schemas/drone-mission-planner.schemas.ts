/**
 * Drone mission planner schemas.
 *
 * Defines contract-first TypeBox schemas for compiling mission plans from
 * landmark/recipe inputs and exporting them to interoperable mission formats.
 *
 * @shared/schemas/drone-mission-planner
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  DRONE_MISSION_PLANNER_DEFAULTS,
  DRONE_MISSION_PLANNER_LIMITS,
  DRONE_POLICY_DEFAULTS,
} from "../config/drone.defaults.ts";
import { stringEnum } from "./baobox-enum.ts";
import {
  DroneGeofencePolygonSchema,
  type DroneMission,
  DroneMissionSchema,
  type DronePolicyEvaluation,
  DronePolicyEvaluationSchema,
} from "./drone-ops.schemas.ts";

/** Ordering strategies supported by the mission planner. */
export const DRONE_MISSION_PLANNER_ORDERINGS: readonly ["user", "steamline", "tsp"] = [
  "user",
  "steamline",
  "tsp",
] as const;
/** Inferred type from the planner ordering schema. */
export type DroneMissionPlannerOrdering = (typeof DRONE_MISSION_PLANNER_ORDERINGS)[number];

/** TypeBox schema for mission planner ordering. */
export const DroneMissionPlannerOrderingSchema: Type.TUnion<
  [Type.TLiteral<"user" | "steamline" | "tsp">, ...Type.TLiteral<"user" | "steamline" | "tsp">[]]
> = stringEnum(DRONE_MISSION_PLANNER_ORDERINGS, {});

/** Altitude interpretation modes for mission exports. */
export const DRONE_MISSION_PLANNER_ALTITUDE_MODES: readonly ["amsl", "agl", "relative"] = [
  "amsl",
  "agl",
  "relative",
] as const;
/** Inferred type from the mission planner altitude mode schema. */
export type DroneMissionPlannerAltitudeMode = (typeof DRONE_MISSION_PLANNER_ALTITUDE_MODES)[number];

/** TypeBox schema for mission planner altitude mode. */
export const DroneMissionPlannerAltitudeModeSchema: Type.TUnion<
  [Type.TLiteral<"amsl" | "agl" | "relative">, ...Type.TLiteral<"amsl" | "agl" | "relative">[]]
> = stringEnum(DRONE_MISSION_PLANNER_ALTITUDE_MODES, {});

/** Capture behavior modes for each generated waypoint pair. */
export const DRONE_MISSION_PLANNER_SHOOT_MODES: readonly ["hover", "continuous", "timed"] = [
  "hover",
  "continuous",
  "timed",
] as const;
/** Inferred type from the mission planner shoot mode schema. */
export type DroneMissionPlannerShootMode = (typeof DRONE_MISSION_PLANNER_SHOOT_MODES)[number];

/** TypeBox schema for mission planner shoot mode. */
export const DroneMissionPlannerShootModeSchema: Type.TUnion<
  [
    Type.TLiteral<"hover" | "continuous" | "timed">,
    ...Type.TLiteral<"hover" | "continuous" | "timed">[],
  ]
> = stringEnum(DRONE_MISSION_PLANNER_SHOOT_MODES, {});

/** Supported mission export formats for planner outputs. */
export const DRONE_MISSION_PLANNER_EXPORT_FORMATS: readonly ["qgc-plan-json", "litchi-csv"] = [
  "qgc-plan-json",
  "litchi-csv",
] as const;
/** Inferred type from the mission planner export format schema. */
export type DroneMissionPlannerExportFormat = (typeof DRONE_MISSION_PLANNER_EXPORT_FORMATS)[number];

/** TypeBox schema for mission planner export format. */
export const DroneMissionPlannerExportFormatSchema: Type.TUnion<
  [
    Type.TLiteral<"qgc-plan-json" | "litchi-csv">,
    ...Type.TLiteral<"qgc-plan-json" | "litchi-csv">[],
  ]
> = stringEnum(DRONE_MISSION_PLANNER_EXPORT_FORMATS, {});

/** TypeBox schema for a local-frame NED point tuple. */
export const DroneMissionPlannerNedPointSchema: Type.TTuple<[]> = Type.Tuple(
  [Type.Number(), Type.Number(), Type.Number()],
  {},
);

/** Inferred type from the planner NED point schema. */
export type DroneMissionPlannerNedPoint = [number, number, number];

/** TypeBox schema for a geodetic WGS84 point. */
export const DroneMissionPlannerWgs84PointSchema: Type.TObject<
  {
    readonly latitude: Type.TNumber;
    readonly longitude: Type.TNumber;
    readonly altitudeM: Type.TNumber;
  },
  "latitude" | "longitude" | "altitudeM",
  never
> = Type.Object(
  {
    latitude: Type.Number({ minimum: -90, maximum: 90 }),
    longitude: Type.Number({ minimum: -180, maximum: 180 }),
    altitudeM: Type.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner WGS84 point schema. */
export type DroneMissionPlannerWgs84Point = Static<typeof DroneMissionPlannerWgs84PointSchema>;

/** TypeBox schema for a photo definition in a recipe. */
export const DroneMissionPlannerPhotoSchema: Type.TObject<
  {
    readonly name: Type.TString;
    readonly rangeM: Type.TNumber;
    readonly azimuthDeg: Type.TNumber;
    readonly elevationDeg: Type.TNumber;
    readonly poiOffsetLocal: Type.TOptional<Type.TTuple<[]>>;
    readonly targetGsdCmPerPx: Type.TOptional<Type.TNumber>;
  },
  "name" | "rangeM" | "azimuthDeg" | "elevationDeg",
  Type.InferOptionalKeys<{
    readonly name: Type.TString;
    readonly rangeM: Type.TNumber;
    readonly azimuthDeg: Type.TNumber;
    readonly elevationDeg: Type.TNumber;
    readonly poiOffsetLocal: Type.TOptional<Type.TTuple<[]>>;
    readonly targetGsdCmPerPx: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    rangeM: Type.Number({ exclusiveMinimum: 0 }),
    azimuthDeg: Type.Number({ minimum: -180, maximum: 180 }),
    elevationDeg: Type.Number({ minimum: -90, maximum: 90 }),
    poiOffsetLocal: Type.Optional(DroneMissionPlannerNedPointSchema),
    targetGsdCmPerPx: Type.Optional(Type.Number({ exclusiveMinimum: 0 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner photo schema. */
export type DroneMissionPlannerPhoto = {
  name: string;
  rangeM: number;
  azimuthDeg: number;
  elevationDeg: number;
  poiOffsetLocal?: DroneMissionPlannerNedPoint;
  targetGsdCmPerPx?: number;
};

/** TypeBox schema for a recipe grouped by landmark type. */
export const DroneMissionPlannerRecipeSchema: Type.TObject<
  {
    readonly type: Type.TString;
    readonly description: Type.TOptional<Type.TString>;
    readonly photos: Type.TArray<
      Type.TObject<
        {
          readonly name: Type.TString;
          readonly rangeM: Type.TNumber;
          readonly azimuthDeg: Type.TNumber;
          readonly elevationDeg: Type.TNumber;
          readonly poiOffsetLocal: Type.TOptional<Type.TTuple<[]>>;
          readonly targetGsdCmPerPx: Type.TOptional<Type.TNumber>;
        },
        "name" | "rangeM" | "azimuthDeg" | "elevationDeg",
        Type.InferOptionalKeys<{
          readonly name: Type.TString;
          readonly rangeM: Type.TNumber;
          readonly azimuthDeg: Type.TNumber;
          readonly elevationDeg: Type.TNumber;
          readonly poiOffsetLocal: Type.TOptional<Type.TTuple<[]>>;
          readonly targetGsdCmPerPx: Type.TOptional<Type.TNumber>;
        }>
      >
    >;
  },
  "photos" | "type",
  "description"
> = Type.Object(
  {
    type: Type.String({ minLength: 1 }),
    description: Type.Optional(Type.String()),
    photos: Type.Array(DroneMissionPlannerPhotoSchema, { minItems: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner recipe schema. */
export type DroneMissionPlannerRecipe = {
  type: string;
  description?: string;
  photos: DroneMissionPlannerPhoto[];
};

/** TypeBox schema for a single landmark with local NED pose. */
export const DroneMissionPlannerLandmarkSchema: Type.TObject<
  {
    readonly name: Type.TString;
    readonly type: Type.TString;
    readonly positionNed: Type.TTuple<[]>;
    readonly orientationRpyDeg: Type.TTuple<[]>;
  },
  "name" | "type" | "positionNed" | "orientationRpyDeg",
  never
> = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    type: Type.String({ minLength: 1 }),
    positionNed: DroneMissionPlannerNedPointSchema,
    orientationRpyDeg: DroneMissionPlannerNedPointSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the planner landmark schema. */
export type DroneMissionPlannerLandmark = {
  name: string;
  type: string;
  positionNed: DroneMissionPlannerNedPoint;
  orientationRpyDeg: DroneMissionPlannerNedPoint;
};

/** TypeBox schema for planner camera model configuration. */
export const DroneMissionPlannerCameraModelSchema: Type.TObject<
  {
    readonly sensorWidthMm: Type.TNumber;
    readonly focalLengthMm: Type.TNumber;
    readonly imageWidthPx: Type.TInteger;
  },
  "sensorWidthMm" | "focalLengthMm" | "imageWidthPx",
  never
> = Type.Object(
  {
    sensorWidthMm: Type.Number({ exclusiveMinimum: 0 }),
    focalLengthMm: Type.Number({ exclusiveMinimum: 0 }),
    imageWidthPx: Type.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner camera model schema. */
export type DroneMissionPlannerCameraModel = Static<typeof DroneMissionPlannerCameraModelSchema>;

/** TypeBox schema for mission origin datum (WGS84). */
export const DroneMissionPlannerDatumSchema: Type.TObject<
  {
    readonly latitude: Type.TNumber;
    readonly longitude: Type.TNumber;
    readonly altitudeM: Type.TNumber;
  },
  "latitude" | "longitude" | "altitudeM",
  never
> = Type.Object(
  {
    latitude: Type.Number({ minimum: -90, maximum: 90 }),
    longitude: Type.Number({ minimum: -180, maximum: 180 }),
    altitudeM: Type.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner datum schema. */
export type DroneMissionPlannerDatum = Static<typeof DroneMissionPlannerDatumSchema>;

/** TypeBox schema for optional geofence checks during planning. */
export const DroneMissionPlannerGeofenceSchema = Type.Object(
  {
    enabled: Type.Optional(Type.Boolean({ default: true })),
    polygons: Type.Array(DroneGeofencePolygonSchema, { minItems: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner geofence schema. */
export type DroneMissionPlannerGeofence = Static<typeof DroneMissionPlannerGeofenceSchema>;

/** TypeBox schema for mission planner compile request payload. */
export const DroneMissionPlannerRequestSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ minLength: 1 })),
    description: Type.Optional(Type.String()),
    landmarks: Type.Array(DroneMissionPlannerLandmarkSchema, { minItems: 1 }),
    recipes: Type.Array(DroneMissionPlannerRecipeSchema, { minItems: 1 }),
    ordering: Type.Optional(DroneMissionPlannerOrderingSchema),
    altitudeMode: Type.Optional(DroneMissionPlannerAltitudeModeSchema),
    datum: Type.Optional(DroneMissionPlannerDatumSchema),
    geofence: Type.Optional(DroneMissionPlannerGeofenceSchema),
    camera: Type.Optional(DroneMissionPlannerCameraModelSchema),
    targetGsdCmPerPx: Type.Optional(Type.Number({ exclusiveMinimum: 0 })),
    minSafeDistanceM: Type.Optional(Type.Number({ minimum: 0 })),
    maxRangeM: Type.Optional(Type.Number({ exclusiveMinimum: 0 })),
    minInterWaypointDistanceM: Type.Optional(Type.Number({ minimum: 0 })),
    defaultShootMode: Type.Optional(DroneMissionPlannerShootModeSchema),
    defaultHoverDurationS: Type.Optional(Type.Number({ exclusiveMinimum: 0 })),
    defaultWaypointHoldTimeS: Type.Optional(Type.Number({ minimum: 0 })),
    defaultWaypointSpeedMps: Type.Optional(
      Type.Number({
        minimum: 0,
        maximum: DRONE_POLICY_DEFAULTS.limits.maxHorizontalSpeedMps,
      }),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner request schema. */
export type DroneMissionPlannerRequest = {
  name?: string;
  description?: string;
  landmarks: DroneMissionPlannerLandmark[];
  recipes: DroneMissionPlannerRecipe[];
  ordering?: DroneMissionPlannerOrdering;
  altitudeMode?: DroneMissionPlannerAltitudeMode;
  datum?: DroneMissionPlannerDatum;
  geofence?: DroneMissionPlannerGeofence;
  camera?: DroneMissionPlannerCameraModel;
  targetGsdCmPerPx?: number;
  minSafeDistanceM?: number;
  maxRangeM?: number;
  minInterWaypointDistanceM?: number;
  defaultShootMode?: DroneMissionPlannerShootMode;
  defaultHoverDurationS?: number;
  defaultWaypointHoldTimeS?: number;
  defaultWaypointSpeedMps?: number;
};

/** TypeBox schema for a compiled waypoint/POI pair. */
export const DroneMissionPlannerWaypointPoiPairSchema = Type.Object(
  {
    photoName: Type.String({ minLength: 1 }),
    landmarkName: Type.String({ minLength: 1 }),
    landmarkType: Type.String({ minLength: 1 }),
    waypointNed: DroneMissionPlannerNedPointSchema,
    poiNed: DroneMissionPlannerNedPointSchema,
    headingDeg: Type.Number(),
    gimbalPitchDeg: Type.Number(),
    shootMode: DroneMissionPlannerShootModeSchema,
    hoverDurationS: Type.Optional(Type.Number({ exclusiveMinimum: 0 })),
    waypointWgs84: Type.Optional(DroneMissionPlannerWgs84PointSchema),
    poiWgs84: Type.Optional(DroneMissionPlannerWgs84PointSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the compiled waypoint/POI pair schema. */
export type DroneMissionPlannerWaypointPoiPair = {
  photoName: string;
  landmarkName: string;
  landmarkType: string;
  waypointNed: DroneMissionPlannerNedPoint;
  poiNed: DroneMissionPlannerNedPoint;
  headingDeg: number;
  gimbalPitchDeg: number;
  shootMode: DroneMissionPlannerShootMode;
  hoverDurationS?: number;
  waypointWgs84?: DroneMissionPlannerWgs84Point;
  poiWgs84?: DroneMissionPlannerWgs84Point;
};

/** TypeBox schema for planner mission bounds summary. */
export const DroneMissionPlannerBoundsSummarySchema: Type.TObject<
  {
    readonly minNorthM: Type.TNumber;
    readonly maxNorthM: Type.TNumber;
    readonly minEastM: Type.TNumber;
    readonly maxEastM: Type.TNumber;
    readonly minDownM: Type.TNumber;
    readonly maxDownM: Type.TNumber;
  },
  "minNorthM" | "maxNorthM" | "minEastM" | "maxEastM" | "minDownM" | "maxDownM",
  never
> = Type.Object(
  {
    minNorthM: Type.Number(),
    maxNorthM: Type.Number(),
    minEastM: Type.Number(),
    maxEastM: Type.Number(),
    minDownM: Type.Number(),
    maxDownM: Type.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner bounds summary schema. */
export type DroneMissionPlannerBoundsSummary = Static<
  typeof DroneMissionPlannerBoundsSummarySchema
>;

/** TypeBox schema for planner altitude-range summary. */
export const DroneMissionPlannerAltitudeRangeSchema: Type.TObject<
  { readonly minUpM: Type.TNumber; readonly maxUpM: Type.TNumber },
  "minUpM" | "maxUpM",
  never
> = Type.Object(
  {
    minUpM: Type.Number(),
    maxUpM: Type.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner altitude-range summary schema. */
export type DroneMissionPlannerAltitudeRange = Static<
  typeof DroneMissionPlannerAltitudeRangeSchema
>;

/** TypeBox schema for planner mission summary. */
export const DroneMissionPlannerSummarySchema = Type.Object(
  {
    waypointCount: Type.Integer({ minimum: 0 }),
    uniqueLandmarks: Type.Integer({ minimum: 0 }),
    uniqueTypes: Type.Integer({ minimum: 0 }),
    boundingBoxNed: Type.Union([DroneMissionPlannerBoundsSummarySchema, Type.Null()]),
    totalPathDistanceM: Type.Number({ minimum: 0 }),
    altitudeRangeM: Type.Union([DroneMissionPlannerAltitudeRangeSchema, Type.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner mission summary schema. */
export type DroneMissionPlannerSummary = Static<typeof DroneMissionPlannerSummarySchema>;

/** TypeBox schema for geofence violations discovered during planning. */
export const DroneMissionPlannerGeofenceViolationSchema: Type.TObject<
  {
    readonly index: Type.TInteger;
    readonly latitude: Type.TNumber;
    readonly longitude: Type.TNumber;
    readonly polygonId: Type.TOptional<Type.TString>;
  },
  "index" | "latitude" | "longitude",
  "polygonId"
> = Type.Object(
  {
    index: Type.Integer({ minimum: 0 }),
    latitude: Type.Number({ minimum: -90, maximum: 90 }),
    longitude: Type.Number({ minimum: -180, maximum: 180 }),
    polygonId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner geofence violation schema. */
export type DroneMissionPlannerGeofenceViolation = Static<
  typeof DroneMissionPlannerGeofenceViolationSchema
>;

/** TypeBox schema for compiled mission plan payload. */
export const DroneMissionPlannerCompileResultSchema = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    description: Type.String(),
    ordering: DroneMissionPlannerOrderingSchema,
    altitudeMode: DroneMissionPlannerAltitudeModeSchema,
    datum: Type.Union([DroneMissionPlannerDatumSchema, Type.Null()]),
    pairs: Type.Array(DroneMissionPlannerWaypointPoiPairSchema),
    summary: DroneMissionPlannerSummarySchema,
    droneMission: Type.Union([DroneMissionSchema, Type.Null()]),
    policyEvaluation: Type.Union([DronePolicyEvaluationSchema, Type.Null()]),
    geofenceViolations: Type.Array(DroneMissionPlannerGeofenceViolationSchema),
    warnings: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner compile result schema. */
export type DroneMissionPlannerCompileResult = {
  name: string;
  description: string;
  ordering: DroneMissionPlannerOrdering;
  altitudeMode: DroneMissionPlannerAltitudeMode;
  datum: DroneMissionPlannerDatum | null;
  pairs: DroneMissionPlannerWaypointPoiPair[];
  summary: DroneMissionPlannerSummary;
  droneMission: DroneMission | null;
  policyEvaluation: DronePolicyEvaluation | null;
  geofenceViolations: DroneMissionPlannerGeofenceViolation[];
  warnings: string[];
};

/** TypeBox schema for mission planner compile API response envelope. */
export const DroneMissionPlannerCompileResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: DroneMissionPlannerCompileResultSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner compile response schema. */
export type DroneMissionPlannerCompileResponse = Static<
  typeof DroneMissionPlannerCompileResponseSchema
>;

/** TypeBox schema for mission planner export request payload. */
export const DroneMissionPlannerExportRequestSchema = Type.Object(
  {
    format: DroneMissionPlannerExportFormatSchema,
    request: DroneMissionPlannerRequestSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the planner export request schema. */
export type DroneMissionPlannerExportRequest = {
  format: DroneMissionPlannerExportFormat;
  request: DroneMissionPlannerRequest;
};

/** TypeBox schema for mission planner export artifact payload. */
export const DroneMissionPlannerExportResultSchema = Type.Object(
  {
    format: DroneMissionPlannerExportFormatSchema,
    fileName: Type.String({ minLength: 1 }),
    contentType: Type.String({ minLength: 1 }),
    content: Type.String(),
    compile: DroneMissionPlannerCompileResultSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the planner export result schema. */
export type DroneMissionPlannerExportResult = {
  format: DroneMissionPlannerExportFormat;
  fileName: string;
  contentType: string;
  content: string;
  compile: DroneMissionPlannerCompileResult;
};

/** TypeBox schema for mission planner export API response envelope. */
export const DroneMissionPlannerExportResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: DroneMissionPlannerExportResultSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner export response schema. */
export type DroneMissionPlannerExportResponse = Static<
  typeof DroneMissionPlannerExportResponseSchema
>;

/** Mission planner defaults exposed to request validators and UI builders. */
export const DroneMissionPlannerDefaultsSchema: Type.TObject<
  {
    readonly holdTimeS: Type.TNumber;
    readonly speedMps: Type.TNumber;
    readonly namePrefix: Type.TString;
    readonly minSafeDistanceM: Type.TNumber;
    readonly maxRangeM: Type.TNumber;
    readonly minInterWaypointDistanceM: Type.TNumber;
  },
  | "minSafeDistanceM"
  | "maxRangeM"
  | "minInterWaypointDistanceM"
  | "holdTimeS"
  | "speedMps"
  | "namePrefix",
  never
> = Type.Object(
  {
    holdTimeS: Type.Number({ minimum: 0 }),
    speedMps: Type.Number({ minimum: 0 }),
    namePrefix: Type.String({ minLength: 1 }),
    minSafeDistanceM: Type.Number({ minimum: 0 }),
    maxRangeM: Type.Number({ exclusiveMinimum: 0 }),
    minInterWaypointDistanceM: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Runtime defaults payload for mission planner endpoints. */
export const DRONE_MISSION_PLANNER_DEFAULTS_PAYLOAD: {
  readonly holdTimeS: 2;
  readonly speedMps: 5;
  readonly namePrefix: "Mission";
  readonly minSafeDistanceM: 1;
  readonly maxRangeM: 50;
  readonly minInterWaypointDistanceM: 0.5;
} = {
  holdTimeS: DRONE_MISSION_PLANNER_DEFAULTS.holdTimeS,
  speedMps: DRONE_MISSION_PLANNER_DEFAULTS.speedMps,
  namePrefix: DRONE_MISSION_PLANNER_DEFAULTS.namePrefix,
  minSafeDistanceM: DRONE_MISSION_PLANNER_DEFAULTS.minSafeDistanceM,
  maxRangeM: DRONE_MISSION_PLANNER_DEFAULTS.maxRangeM,
  minInterWaypointDistanceM: DRONE_MISSION_PLANNER_DEFAULTS.minInterWaypointDistanceM,
} as const;

/** Safety limits payload for mission planner surfaces. */
export const DRONE_MISSION_PLANNER_LIMITS_PAYLOAD: {
  readonly minWaypoints: 1;
  readonly maxWaypoints: 12;
} = {
  minWaypoints: DRONE_MISSION_PLANNER_LIMITS.minWaypoints,
  maxWaypoints: DRONE_MISSION_PLANNER_LIMITS.maxWaypoints,
} as const;
