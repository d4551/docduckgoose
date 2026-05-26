/**
 * Drone mission planner schemas.
 *
 * Defines contract-first TypeBox schemas for compiling mission plans from
 * landmark/recipe inputs and exporting them to interoperable mission formats.
 *
 * @shared/schemas/drone-mission-planner
 */

import {
  DRONE_MISSION_PLANNER_DEFAULTS,
  DRONE_MISSION_PLANNER_LIMITS,
  DRONE_POLICY_DEFAULTS,
} from "@baohaus/bao-config/drone.defaults";
import type {
  InferOptionalKeys,
  Static,
  TArray,
  TInteger,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TString,
  TTuple,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
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
export const DroneMissionPlannerOrderingSchema: TUnion<
  [TLiteral<"user" | "steamline" | "tsp">, ...TLiteral<"user" | "steamline" | "tsp">[]]
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
export const DroneMissionPlannerAltitudeModeSchema: TUnion<
  [TLiteral<"amsl" | "agl" | "relative">, ...TLiteral<"amsl" | "agl" | "relative">[]]
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
export const DroneMissionPlannerShootModeSchema: TUnion<
  [TLiteral<"hover" | "continuous" | "timed">, ...TLiteral<"hover" | "continuous" | "timed">[]]
> = stringEnum(DRONE_MISSION_PLANNER_SHOOT_MODES, {});

/** Supported mission export formats for planner outputs. */
export const DRONE_MISSION_PLANNER_EXPORT_FORMATS: readonly [
  "qgc-plan-json",
  "litchi-csv",
  "mavlink-wpl",
  "dji-wpml",
  "geojson",
  "yaml",
  "usd-ascii",
  "flatbuffers-binary",
] = [
  "qgc-plan-json",
  "litchi-csv",
  "mavlink-wpl",
  "dji-wpml",
  "geojson",
  "yaml",
  "usd-ascii",
  "flatbuffers-binary",
] as const;
/** Inferred type from the mission planner export format schema. */
export type DroneMissionPlannerExportFormat = (typeof DRONE_MISSION_PLANNER_EXPORT_FORMATS)[number];

/** TypeBox schema for mission planner export format. */
export const DroneMissionPlannerExportFormatSchema: TUnion<
  [
    TLiteral<
      | "qgc-plan-json"
      | "litchi-csv"
      | "mavlink-wpl"
      | "dji-wpml"
      | "geojson"
      | "yaml"
      | "usd-ascii"
      | "flatbuffers-binary"
    >,
    ...TLiteral<
      | "qgc-plan-json"
      | "litchi-csv"
      | "mavlink-wpl"
      | "dji-wpml"
      | "geojson"
      | "yaml"
      | "usd-ascii"
      | "flatbuffers-binary"
    >[],
  ]
> = stringEnum(DRONE_MISSION_PLANNER_EXPORT_FORMATS, {});

/** TypeBox schema for a local-frame NED point tuple. */
export const DroneMissionPlannerNedPointSchema: TTuple<[]> = TypeExports.Tuple(
  [TypeExports.Number(), TypeExports.Number(), TypeExports.Number()],
  {},
);

/** Inferred type from the planner NED point schema. */
export type DroneMissionPlannerNedPoint = [number, number, number];

/** TypeBox schema for a geodetic WGS84 point. */
export const DroneMissionPlannerWgs84PointSchema: TObject<
  {
    readonly latitude: TNumber;
    readonly longitude: TNumber;
    readonly altitudeM: TNumber;
  },
  "latitude" | "longitude" | "altitudeM",
  never
> = TypeExports.Object(
  {
    latitude: TypeExports.Number({ minimum: -90, maximum: 90 }),
    longitude: TypeExports.Number({ minimum: -180, maximum: 180 }),
    altitudeM: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner WGS84 point schema. */
export type DroneMissionPlannerWgs84Point = Static<typeof DroneMissionPlannerWgs84PointSchema>;

/** TypeBox schema for a photo definition in a recipe. */
export const DroneMissionPlannerPhotoSchema: TObject<
  {
    readonly name: TString;
    readonly rangeM: TNumber;
    readonly azimuthDeg: TNumber;
    readonly elevationDeg: TNumber;
    readonly poiOffsetLocal: TOptional<TTuple<[]>>;
    readonly targetGsdCmPerPx: TOptional<TNumber>;
  },
  "name" | "rangeM" | "azimuthDeg" | "elevationDeg",
  InferOptionalKeys<{
    readonly name: TString;
    readonly rangeM: TNumber;
    readonly azimuthDeg: TNumber;
    readonly elevationDeg: TNumber;
    readonly poiOffsetLocal: TOptional<TTuple<[]>>;
    readonly targetGsdCmPerPx: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    rangeM: TypeExports.Number({ exclusiveMinimum: 0 }),
    azimuthDeg: TypeExports.Number({ minimum: -180, maximum: 180 }),
    elevationDeg: TypeExports.Number({ minimum: -90, maximum: 90 }),
    poiOffsetLocal: TypeExports.Optional(DroneMissionPlannerNedPointSchema),
    targetGsdCmPerPx: TypeExports.Optional(TypeExports.Number({ exclusiveMinimum: 0 })),
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
export const DroneMissionPlannerRecipeSchema: TObject<
  {
    readonly type: TString;
    readonly description: TOptional<TString>;
    readonly photos: TArray<
      TObject<
        {
          readonly name: TString;
          readonly rangeM: TNumber;
          readonly azimuthDeg: TNumber;
          readonly elevationDeg: TNumber;
          readonly poiOffsetLocal: TOptional<TTuple<[]>>;
          readonly targetGsdCmPerPx: TOptional<TNumber>;
        },
        "name" | "rangeM" | "azimuthDeg" | "elevationDeg",
        InferOptionalKeys<{
          readonly name: TString;
          readonly rangeM: TNumber;
          readonly azimuthDeg: TNumber;
          readonly elevationDeg: TNumber;
          readonly poiOffsetLocal: TOptional<TTuple<[]>>;
          readonly targetGsdCmPerPx: TOptional<TNumber>;
        }>
      >
    >;
  },
  "photos" | "type",
  "description"
> = TypeExports.Object(
  {
    type: TypeExports.String({ minLength: 1 }),
    description: TypeExports.Optional(TypeExports.String()),
    photos: TypeExports.Array(DroneMissionPlannerPhotoSchema, { minItems: 1 }),
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
export const DroneMissionPlannerLandmarkSchema: TObject<
  {
    readonly name: TString;
    readonly type: TString;
    readonly positionNed: TTuple<[]>;
    readonly orientationRpyDeg: TTuple<[]>;
  },
  "name" | "type" | "positionNed" | "orientationRpyDeg",
  never
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    type: TypeExports.String({ minLength: 1 }),
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
export const DroneMissionPlannerCameraModelSchema: TObject<
  {
    readonly sensorWidthMm: TNumber;
    readonly focalLengthMm: TNumber;
    readonly imageWidthPx: TInteger;
  },
  "sensorWidthMm" | "focalLengthMm" | "imageWidthPx",
  never
> = TypeExports.Object(
  {
    sensorWidthMm: TypeExports.Number({ exclusiveMinimum: 0 }),
    focalLengthMm: TypeExports.Number({ exclusiveMinimum: 0 }),
    imageWidthPx: TypeExports.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner camera model schema. */
export type DroneMissionPlannerCameraModel = Static<typeof DroneMissionPlannerCameraModelSchema>;

/** TypeBox schema for mission origin datum (WGS84). */
export const DroneMissionPlannerDatumSchema: TObject<
  {
    readonly latitude: TNumber;
    readonly longitude: TNumber;
    readonly altitudeM: TNumber;
  },
  "latitude" | "longitude" | "altitudeM",
  never
> = TypeExports.Object(
  {
    latitude: TypeExports.Number({ minimum: -90, maximum: 90 }),
    longitude: TypeExports.Number({ minimum: -180, maximum: 180 }),
    altitudeM: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner datum schema. */
export type DroneMissionPlannerDatum = Static<typeof DroneMissionPlannerDatumSchema>;

/** TypeBox schema for optional geofence checks during planning. */
export const DroneMissionPlannerGeofenceSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(TypeExports.Boolean({ default: true })),
    polygons: TypeExports.Array(DroneGeofencePolygonSchema, { minItems: 1 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner geofence schema. */
export type DroneMissionPlannerGeofence = Static<typeof DroneMissionPlannerGeofenceSchema>;

/** TypeBox schema for mission planner compile request payload. */
export const DroneMissionPlannerRequestSchema = TypeExports.Object(
  {
    name: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    description: TypeExports.Optional(TypeExports.String()),
    landmarks: TypeExports.Array(DroneMissionPlannerLandmarkSchema, { minItems: 1 }),
    recipes: TypeExports.Array(DroneMissionPlannerRecipeSchema, { minItems: 1 }),
    ordering: TypeExports.Optional(DroneMissionPlannerOrderingSchema),
    altitudeMode: TypeExports.Optional(DroneMissionPlannerAltitudeModeSchema),
    datum: TypeExports.Optional(DroneMissionPlannerDatumSchema),
    geofence: TypeExports.Optional(DroneMissionPlannerGeofenceSchema),
    camera: TypeExports.Optional(DroneMissionPlannerCameraModelSchema),
    targetGsdCmPerPx: TypeExports.Optional(TypeExports.Number({ exclusiveMinimum: 0 })),
    minSafeDistanceM: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    maxRangeM: TypeExports.Optional(TypeExports.Number({ exclusiveMinimum: 0 })),
    minInterWaypointDistanceM: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    defaultShootMode: TypeExports.Optional(DroneMissionPlannerShootModeSchema),
    defaultHoverDurationS: TypeExports.Optional(TypeExports.Number({ exclusiveMinimum: 0 })),
    defaultWaypointHoldTimeS: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    defaultWaypointSpeedMps: TypeExports.Optional(
      TypeExports.Number({
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
export const DroneMissionPlannerWaypointPoiPairSchema = TypeExports.Object(
  {
    photoName: TypeExports.String({ minLength: 1 }),
    landmarkName: TypeExports.String({ minLength: 1 }),
    landmarkType: TypeExports.String({ minLength: 1 }),
    waypointNed: DroneMissionPlannerNedPointSchema,
    poiNed: DroneMissionPlannerNedPointSchema,
    headingDeg: TypeExports.Number(),
    gimbalPitchDeg: TypeExports.Number(),
    shootMode: DroneMissionPlannerShootModeSchema,
    hoverDurationS: TypeExports.Optional(TypeExports.Number({ exclusiveMinimum: 0 })),
    waypointWgs84: TypeExports.Optional(DroneMissionPlannerWgs84PointSchema),
    poiWgs84: TypeExports.Optional(DroneMissionPlannerWgs84PointSchema),
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
export const DroneMissionPlannerBoundsSummarySchema: TObject<
  {
    readonly minNorthM: TNumber;
    readonly maxNorthM: TNumber;
    readonly minEastM: TNumber;
    readonly maxEastM: TNumber;
    readonly minDownM: TNumber;
    readonly maxDownM: TNumber;
  },
  "minNorthM" | "maxNorthM" | "minEastM" | "maxEastM" | "minDownM" | "maxDownM",
  never
> = TypeExports.Object(
  {
    minNorthM: TypeExports.Number(),
    maxNorthM: TypeExports.Number(),
    minEastM: TypeExports.Number(),
    maxEastM: TypeExports.Number(),
    minDownM: TypeExports.Number(),
    maxDownM: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner bounds summary schema. */
export type DroneMissionPlannerBoundsSummary = Static<
  typeof DroneMissionPlannerBoundsSummarySchema
>;

/** TypeBox schema for planner altitude-range summary. */
export const DroneMissionPlannerAltitudeRangeSchema: TObject<
  { readonly minUpM: TNumber; readonly maxUpM: TNumber },
  "minUpM" | "maxUpM",
  never
> = TypeExports.Object(
  {
    minUpM: TypeExports.Number(),
    maxUpM: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner altitude-range summary schema. */
export type DroneMissionPlannerAltitudeRange = Static<
  typeof DroneMissionPlannerAltitudeRangeSchema
>;

/** TypeBox schema for planner mission summary. */
export const DroneMissionPlannerSummarySchema = TypeExports.Object(
  {
    waypointCount: TypeExports.Integer({ minimum: 0 }),
    uniqueLandmarks: TypeExports.Integer({ minimum: 0 }),
    uniqueTypes: TypeExports.Integer({ minimum: 0 }),
    boundingBoxNed: TypeExports.Union([DroneMissionPlannerBoundsSummarySchema, TypeExports.Null()]),
    totalPathDistanceM: TypeExports.Number({ minimum: 0 }),
    altitudeRangeM: TypeExports.Union([DroneMissionPlannerAltitudeRangeSchema, TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner mission summary schema. */
export type DroneMissionPlannerSummary = Static<typeof DroneMissionPlannerSummarySchema>;

/** TypeBox schema for geofence violations discovered during planning. */
export const DroneMissionPlannerGeofenceViolationSchema: TObject<
  {
    readonly index: TInteger;
    readonly latitude: TNumber;
    readonly longitude: TNumber;
    readonly polygonId: TOptional<TString>;
  },
  "index" | "latitude" | "longitude",
  "polygonId"
> = TypeExports.Object(
  {
    index: TypeExports.Integer({ minimum: 0 }),
    latitude: TypeExports.Number({ minimum: -90, maximum: 90 }),
    longitude: TypeExports.Number({ minimum: -180, maximum: 180 }),
    polygonId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner geofence violation schema. */
export type DroneMissionPlannerGeofenceViolation = Static<
  typeof DroneMissionPlannerGeofenceViolationSchema
>;

/** TypeBox schema for compiled mission plan payload. */
export const DroneMissionPlannerCompileResultSchema = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    description: TypeExports.String(),
    ordering: DroneMissionPlannerOrderingSchema,
    altitudeMode: DroneMissionPlannerAltitudeModeSchema,
    datum: TypeExports.Union([DroneMissionPlannerDatumSchema, TypeExports.Null()]),
    pairs: TypeExports.Array(DroneMissionPlannerWaypointPoiPairSchema),
    summary: DroneMissionPlannerSummarySchema,
    droneMission: TypeExports.Union([DroneMissionSchema, TypeExports.Null()]),
    policyEvaluation: TypeExports.Union([DronePolicyEvaluationSchema, TypeExports.Null()]),
    geofenceViolations: TypeExports.Array(DroneMissionPlannerGeofenceViolationSchema),
    warnings: TypeExports.Array(TypeExports.String({ minLength: 1 })),
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
export const DroneMissionPlannerCompileResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: DroneMissionPlannerCompileResultSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner compile response schema. */
export type DroneMissionPlannerCompileResponse = Static<
  typeof DroneMissionPlannerCompileResponseSchema
>;

/** TypeBox schema for mission planner export request payload. */
export const DroneMissionPlannerExportRequestSchema = TypeExports.Object(
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
export const DroneMissionPlannerExportResultSchema = TypeExports.Object(
  {
    format: DroneMissionPlannerExportFormatSchema,
    fileName: TypeExports.String({ minLength: 1 }),
    contentType: TypeExports.String({ minLength: 1 }),
    content: TypeExports.String(),
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
export const DroneMissionPlannerExportResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: DroneMissionPlannerExportResultSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the planner export response schema. */
export type DroneMissionPlannerExportResponse = Static<
  typeof DroneMissionPlannerExportResponseSchema
>;

/** Mission planner defaults exposed to request validators and UI builders. */
export const DroneMissionPlannerDefaultsSchema: TObject<
  {
    readonly holdTimeS: TNumber;
    readonly speedMps: TNumber;
    readonly namePrefix: TString;
    readonly minSafeDistanceM: TNumber;
    readonly maxRangeM: TNumber;
    readonly minInterWaypointDistanceM: TNumber;
  },
  | "minSafeDistanceM"
  | "maxRangeM"
  | "minInterWaypointDistanceM"
  | "holdTimeS"
  | "speedMps"
  | "namePrefix",
  never
> = TypeExports.Object(
  {
    holdTimeS: TypeExports.Number({ minimum: 0 }),
    speedMps: TypeExports.Number({ minimum: 0 }),
    namePrefix: TypeExports.String({ minLength: 1 }),
    minSafeDistanceM: TypeExports.Number({ minimum: 0 }),
    maxRangeM: TypeExports.Number({ exclusiveMinimum: 0 }),
    minInterWaypointDistanceM: TypeExports.Number({ minimum: 0 }),
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
