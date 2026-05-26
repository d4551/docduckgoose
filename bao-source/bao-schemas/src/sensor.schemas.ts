/**
 * Sensor Data Schemas
 *
 * Defines TypeBox schemas for sensor data from drones, vehicles, and robotics devices.
 * Based on PX4 uORB sensor messages and ArduPilot AP_HAL patterns.
 *
 * @shared/schemas/sensor.ts
 *
 * @remarks
 * These schemas are used across drone-bunbuddy and robotics-bunbuddy for consistent
 * sensor data representation. They align with MAVLink sensor messages and ROS2
 * sensor_msgs conventions.
 *
 * @example
 * ```typescript
 * import { GpsSensorDataSchema, ImuSensorDataSchema } from '@baohaus/bao-schemas/sensor.ts';
 * import type { GpsSensorData, ImuSensorData } from '@baohaus/bao-schemas/sensor.ts';
 *
 * const gpsReading: SensorReading<GpsSensorData> = {
 *   timestamp: new Date().toISOString(), *   sensorId: 'gps-0', *   data: { latitude: 37.7749, longitude: -122.4194, altitudeMsl: 10.5, ... }, *   quality: 95, *   valid: true, * };
 * ```
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TSchema,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";

// GPS Fix Types

/**
 * GPS fix quality levels.
 *
 * @remarks
 * Aligned with MAVLink GPS_FIX_TYPE enum and NMEA fix quality indicators.
 */
export const GPS_FIX_TYPES: readonly [
  "NO_FIX",
  "FIX_2D",
  "FIX_3D",
  "DGPS",
  "RTK_FLOAT",
  "RTK_FIXED",
] = ["NO_FIX", "FIX_2D", "FIX_3D", "DGPS", "RTK_FLOAT", "RTK_FIXED"] as const;

/**
 * Type-safe GPS fix type enumeration.
 */
export type GpsFixType = (typeof GPS_FIX_TYPES)[number];

/**
 * GPS fix type schema.
 */
export const GpsFixTypeSchema: TUnion<
  [
    TLiteral<"NO_FIX" | "FIX_2D" | "FIX_3D" | "DGPS" | "RTK_FLOAT" | "RTK_FIXED">,
    ...TLiteral<"NO_FIX" | "FIX_2D" | "FIX_3D" | "DGPS" | "RTK_FLOAT" | "RTK_FIXED">[],
  ]
> = stringEnum(GPS_FIX_TYPES, {});

// Rangefinder Orientations

/**
 * Rangefinder sensor orientations.
 *
 * @remarks
 * Aligned with MAVLink MAV_SENSOR_ORIENTATION enum subset for distance sensors.
 */
export const RANGEFINDER_ORIENTATIONS: readonly ["down", "forward", "up", "left", "right", "back"] =
  ["down", "forward", "up", "left", "right", "back"] as const;

/**
 * Type-safe rangefinder orientation enumeration.
 */
export type RangefinderOrientation = (typeof RANGEFINDER_ORIENTATIONS)[number];

/**
 * Rangefinder orientation schema.
 */
export const RangefinderOrientationSchema: TUnion<
  [
    TLiteral<"down" | "forward" | "up" | "left" | "right" | "back">,
    ...TLiteral<"down" | "forward" | "up" | "left" | "right" | "back">[],
  ]
> = stringEnum(RANGEFINDER_ORIENTATIONS, {});

// 3D Vector Schemas

/**
 * 3D vector schema (x, y, z).
 *
 * @remarks
 * Generic vector type used for accelerometer, gyroscope, magnetometer, and velocity data.
 */
export const Vector3DSchema: TObject<
  { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
  "x" | "y" | "z",
  never
> = TypeExports.Object(
  {
    x: TypeExports.Number(),
    y: TypeExports.Number(),
    z: TypeExports.Number(),
  },
  {},
);

/**
 * TypeScript type for 3D vectors.
 */
export type Vector3D = Static<typeof Vector3DSchema>;

/**
 * NED (North-East-Down) velocity vector schema.
 *
 * @remarks
 * Standard aerospace frame for velocity representation.
 */
export const VelocityNedSchema: TObject<
  { readonly north: TNumber; readonly east: TNumber; readonly down: TNumber },
  "north" | "east" | "down",
  never
> = TypeExports.Object(
  {
    north: TypeExports.Number({ description: "Velocity north in m/s" }),
    east: TypeExports.Number({ description: "Velocity east in m/s" }),
    down: TypeExports.Number({ description: "Velocity down in m/s" }),
  },
  {},
);

/**
 * TypeScript type for NED velocity.
 */
export type VelocityNed = Static<typeof VelocityNedSchema>;

// GPS Sensor Data

/**
 * GPS sensor data schema.
 *
 * @remarks
 * Based on MAVLink GPS_RAW_INT (msg 24) and GLOBAL_POSITION_INT (msg 33).
 * Includes position, velocity, and quality metrics.
 */
export const GpsSensorDataSchema = TypeExports.Object(
  {
    latitude: TypeExports.Number({ description: "Latitude in degrees" }),
    longitude: TypeExports.Number({ description: "Longitude in degrees" }),
    altitudeMsl: TypeExports.Number({ description: "Altitude above mean sea level in meters" }),
    altitudeAgl: TypeExports.Optional(
      TypeExports.Number({ description: "Altitude above ground level in meters" }),
    ),
    fixType: GpsFixTypeSchema,
    satellites: TypeExports.Integer({ minimum: 0, description: "Number of visible satellites" }),
    hdop: TypeExports.Number({ minimum: 0, description: "Horizontal dilution of precision" }),
    vdop: TypeExports.Number({ minimum: 0, description: "Vertical dilution of precision" }),
    velocity: TypeExports.Optional(VelocityNedSchema),
    courseOverGround: TypeExports.Optional(
      TypeExports.Number({ description: "Course over ground in degrees" }),
    ),
    speedOverGround: TypeExports.Optional(
      TypeExports.Number({ minimum: 0, description: "Speed over ground in m/s" }),
    ),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for GPS sensor data.
 */
export type GpsSensorData = Static<typeof GpsSensorDataSchema>;

// IMU Sensor Data

/**
 * IMU (Inertial Measurement Unit) sensor data schema.
 *
 * @remarks
 * Based on MAVLink RAW_IMU (msg 27) and SCALED_IMU (msg 26).
 * Contains accelerometer and gyroscope readings.
 */
export const ImuSensorDataSchema: TObject<
  {
    readonly accelerometer: TObject<
      { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly gyroscope: TObject<
      { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly temperature: TOptional<TNumber>;
  },
  "accelerometer" | "gyroscope",
  "temperature"
> = TypeExports.Object(
  {
    accelerometer: TypeExports.Object(
      {
        x: TypeExports.Number({ description: "X acceleration in m/s²" }),
        y: TypeExports.Number({ description: "Y acceleration in m/s²" }),
        z: TypeExports.Number({ description: "Z acceleration in m/s²" }),
      },
      { description: "Accelerometer readings in m/s²" },
    ),
    gyroscope: TypeExports.Object(
      {
        x: TypeExports.Number({ description: "X angular velocity in rad/s" }),
        y: TypeExports.Number({ description: "Y angular velocity in rad/s" }),
        z: TypeExports.Number({ description: "Z angular velocity in rad/s" }),
      },
      { description: "Gyroscope readings in rad/s" },
    ),
    temperature: TypeExports.Optional(TypeExports.Number({ description: "IMU temperature in °C" })),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for IMU sensor data.
 */
export type ImuSensorData = Static<typeof ImuSensorDataSchema>;

// Barometer Sensor Data

/**
 * Barometer sensor data schema.
 *
 * @remarks
 * Based on MAVLink SCALED_PRESSURE (msg 29).
 * Provides atmospheric pressure and derived altitude.
 */
export const BarometerSensorDataSchema: TObject<
  {
    readonly pressure: TNumber;
    readonly temperature: TNumber;
    readonly altitude: TNumber;
  },
  "temperature" | "pressure" | "altitude",
  never
> = TypeExports.Object(
  {
    pressure: TypeExports.Number({ minimum: 0, description: "Atmospheric pressure in Pascals" }),
    temperature: TypeExports.Number({ description: "Barometer temperature in °C" }),
    altitude: TypeExports.Number({ description: "Pressure altitude in meters" }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for barometer sensor data.
 */
export type BarometerSensorData = Static<typeof BarometerSensorDataSchema>;

// Magnetometer Sensor Data

/**
 * Magnetometer sensor data schema.
 *
 * @remarks
 * Based on MAVLink RAW_IMU magnetometer fields and MAG_CAL_REPORT.
 * Provides magnetic field strength and computed heading.
 */
export const MagnetometerSensorDataSchema: TObject<
  {
    readonly x: TNumber;
    readonly y: TNumber;
    readonly z: TNumber;
    readonly heading: TNumber;
    readonly declination: TOptional<TNumber>;
  },
  "x" | "y" | "z" | "heading",
  "declination"
> = TypeExports.Object(
  {
    x: TypeExports.Number({ description: "X magnetic field in Gauss" }),
    y: TypeExports.Number({ description: "Y magnetic field in Gauss" }),
    z: TypeExports.Number({ description: "Z magnetic field in Gauss" }),
    heading: TypeExports.Number({
      minimum: 0,
      maximum: 360,
      description: "Computed heading in degrees",
    }),
    declination: TypeExports.Optional(
      TypeExports.Number({ description: "Magnetic declination in degrees" }),
    ),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for magnetometer sensor data.
 */
export type MagnetometerSensorData = Static<typeof MagnetometerSensorDataSchema>;

// Rangefinder Sensor Data

/**
 * Rangefinder/distance sensor data schema.
 *
 * @remarks
 * Based on MAVLink DISTANCE_SENSOR (msg 132).
 * Supports multiple orientations for multi-directional sensing.
 */
export const RangefinderSensorDataSchema: TObject<
  {
    readonly distance: TNumber;
    readonly minRange: TNumber;
    readonly maxRange: TNumber;
    readonly orientation: TUnion<
      [
        TLiteral<"down" | "forward" | "up" | "left" | "right" | "back">,
        ...TLiteral<"down" | "forward" | "up" | "left" | "right" | "back">[],
      ]
    >;
    readonly signalQuality: TNumber;
  },
  "distance" | "minRange" | "maxRange" | "orientation" | "signalQuality",
  never
> = TypeExports.Object(
  {
    distance: TypeExports.Number({ minimum: 0, description: "Measured distance in meters" }),
    minRange: TypeExports.Number({ minimum: 0, description: "Minimum detectable range in meters" }),
    maxRange: TypeExports.Number({ minimum: 0, description: "Maximum detectable range in meters" }),
    orientation: RangefinderOrientationSchema,
    signalQuality: TypeExports.Number({
      minimum: 0,
      maximum: 100,
      description: "Signal quality 0-100%",
    }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for rangefinder sensor data.
 */
export type RangefinderSensorData = Static<typeof RangefinderSensorDataSchema>;

// Optical Flow Sensor Data

/**
 * Optical flow sensor data schema.
 *
 * @remarks
 * Based on MAVLink OPTICAL_FLOW (msg 100) and OPTICAL_FLOW_RAD (msg 106).
 * Used for velocity estimation when GPS is unavailable.
 */
export const OpticalFlowSensorDataSchema: TObject<
  {
    readonly flowX: TNumber;
    readonly flowY: TNumber;
    readonly quality: TInteger;
    readonly groundDistance: TOptional<TNumber>;
    readonly velocityX: TOptional<TNumber>;
    readonly velocityY: TOptional<TNumber>;
  },
  "flowX" | "flowY" | "quality",
  InferOptionalKeys<{
    readonly flowX: TNumber;
    readonly flowY: TNumber;
    readonly quality: TInteger;
    readonly groundDistance: TOptional<TNumber>;
    readonly velocityX: TOptional<TNumber>;
    readonly velocityY: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    flowX: TypeExports.Number({ description: "Angular flow rate about X axis in rad/s" }),
    flowY: TypeExports.Number({ description: "Angular flow rate about Y axis in rad/s" }),
    quality: TypeExports.Integer({
      minimum: 0,
      maximum: 255,
      description: "Optical flow quality 0-255",
    }),
    groundDistance: TypeExports.Optional(
      TypeExports.Number({ minimum: 0, description: "Distance to ground in meters" }),
    ),
    velocityX: TypeExports.Optional(
      TypeExports.Number({ description: "Computed X velocity in m/s" }),
    ),
    velocityY: TypeExports.Optional(
      TypeExports.Number({ description: "Computed Y velocity in m/s" }),
    ),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for optical flow sensor data.
 */
export type OpticalFlowSensorData = Static<typeof OpticalFlowSensorDataSchema>;

// Generic Sensor Reading Wrapper

/**
 * Generic sensor reading wrapper schema factory.
 *
 * @remarks
 * Provides metadata for any sensor reading including timestamp, sensor ID,
 * data quality, and validity flag.
 *
 * @param dataSchema - The TypeBox schema for the sensor data payload.
 * @param id - Optional schema $id override.
 * @returns TypeBox schema for sensor reading.
 */
export function createSensorReadingSchema<T extends TSchema>(
  dataSchema: T,
): ReturnType<typeof TypeExports.Object> {
  return TypeExports.Object(
    {
      timestamp: TypeExports.String({ minLength: 1, description: "ISO 8601 timestamp" }),
      sensorId: TypeExports.String({ minLength: 1, description: "Unique sensor identifier" }),
      data: dataSchema,
      quality: TypeExports.Number({ minimum: 0, maximum: 100, description: "Data quality 0-100%" }),
      valid: TypeExports.Boolean({ description: "Whether the reading is valid" }),
    },
    { additionalProperties: true },
  );
}

/**
 * GPS sensor reading schema.
 */
export const GpsSensorReadingSchema = createSensorReadingSchema(GpsSensorDataSchema);

/**
 * IMU sensor reading schema.
 */
export const ImuSensorReadingSchema: TObject<
  {
    readonly timestamp: TString;
    readonly sensorId: TString;
    readonly data: TObject<
      {
        readonly accelerometer: TObject<
          { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
          "x" | "y" | "z",
          never
        >;
        readonly gyroscope: TObject<
          { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
          "x" | "y" | "z",
          never
        >;
        readonly temperature: TOptional<TNumber>;
      },
      "accelerometer" | "gyroscope",
      "temperature"
    >;
    readonly quality: TNumber;
    readonly valid: TBoolean;
  },
  "timestamp" | "sensorId" | "data" | "quality" | "valid",
  never
> = createSensorReadingSchema(ImuSensorDataSchema);

/**
 * Barometer sensor reading schema.
 */
export const BarometerSensorReadingSchema: TObject<
  {
    readonly timestamp: TString;
    readonly sensorId: TString;
    readonly data: TObject<
      {
        readonly pressure: TNumber;
        readonly temperature: TNumber;
        readonly altitude: TNumber;
      },
      "temperature" | "pressure" | "altitude",
      never
    >;
    readonly quality: TNumber;
    readonly valid: TBoolean;
  },
  "timestamp" | "sensorId" | "data" | "quality" | "valid",
  never
> = createSensorReadingSchema(BarometerSensorDataSchema);

/**
 * Magnetometer sensor reading schema.
 */
export const MagnetometerSensorReadingSchema: TObject<
  {
    readonly timestamp: TString;
    readonly sensorId: TString;
    readonly data: TObject<
      {
        readonly x: TNumber;
        readonly y: TNumber;
        readonly z: TNumber;
        readonly heading: TNumber;
        readonly declination: TOptional<TNumber>;
      },
      "x" | "y" | "z" | "heading",
      "declination"
    >;
    readonly quality: TNumber;
    readonly valid: TBoolean;
  },
  "timestamp" | "sensorId" | "data" | "quality" | "valid",
  never
> = createSensorReadingSchema(MagnetometerSensorDataSchema);

/**
 * Rangefinder sensor reading schema.
 */
export const RangefinderSensorReadingSchema: TObject<
  {
    readonly timestamp: TString;
    readonly sensorId: TString;
    readonly data: TObject<
      {
        readonly distance: TNumber;
        readonly minRange: TNumber;
        readonly maxRange: TNumber;
        readonly orientation: TUnion<
          [
            TLiteral<"down" | "forward" | "up" | "left" | "right" | "back">,
            ...TLiteral<"down" | "forward" | "up" | "left" | "right" | "back">[],
          ]
        >;
        readonly signalQuality: TNumber;
      },
      "distance" | "minRange" | "maxRange" | "orientation" | "signalQuality",
      never
    >;
    readonly quality: TNumber;
    readonly valid: TBoolean;
  },
  "timestamp" | "sensorId" | "data" | "quality" | "valid",
  never
> = createSensorReadingSchema(RangefinderSensorDataSchema);

/**
 * Optical flow sensor reading schema.
 */
export const OpticalFlowSensorReadingSchema = createSensorReadingSchema(
  OpticalFlowSensorDataSchema,
);

/**
 * Generic sensor reading type.
 */
export interface SensorReading<T> {
  timestamp: string;
  sensorId: string;
  data: T;
  quality: number;
  valid: boolean;
}

/**
 * Typed GPS sensor reading.
 */
export type GpsSensorReading = SensorReading<GpsSensorData>;

/**
 * Typed IMU sensor reading.
 */
export type ImuSensorReading = SensorReading<ImuSensorData>;

/**
 * Typed barometer sensor reading.
 */
export type BarometerSensorReading = SensorReading<BarometerSensorData>;

/**
 * Typed magnetometer sensor reading.
 */
export type MagnetometerSensorReading = SensorReading<MagnetometerSensorData>;

/**
 * Typed rangefinder sensor reading.
 */
export type RangefinderSensorReading = SensorReading<RangefinderSensorData>;

/**
 * Typed optical flow sensor reading.
 */
export type OpticalFlowSensorReading = SensorReading<OpticalFlowSensorData>;

// Sensor Collection Schema

/**
 * Aggregated sensor data collection schema.
 *
 * @remarks
 * Used for telemetry snapshots containing all available sensor readings.
 */
export const SensorCollectionSchema = TypeExports.Object(
  {
    gps: TypeExports.Optional(GpsSensorReadingSchema),
    imu: TypeExports.Optional(ImuSensorReadingSchema),
    barometer: TypeExports.Optional(BarometerSensorReadingSchema),
    magnetometer: TypeExports.Optional(MagnetometerSensorReadingSchema),
    rangefinder: TypeExports.Optional(TypeExports.Array(RangefinderSensorReadingSchema)),
    opticalFlow: TypeExports.Optional(OpticalFlowSensorReadingSchema),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for sensor collection.
 */
export type SensorCollection = Static<typeof SensorCollectionSchema>;

// EKF Status Schema

/**
 * Extended Kalman Filter (EKF) status schema.
 *
 * @remarks
 * Based on MAVLink ESTIMATOR_STATUS (msg 230).
 * Provides state estimation health indicators.
 */
export const EkfStatusSchema: TObject<
  {
    readonly flags: TInteger;
    readonly velocityVariance: TNumber;
    readonly positionVariance: TNumber;
    readonly heightVariance: TNumber;
    readonly compassVariance: TNumber;
    readonly terrainAltVariance: TNumber;
  },
  | "flags"
  | "velocityVariance"
  | "positionVariance"
  | "heightVariance"
  | "compassVariance"
  | "terrainAltVariance",
  never
> = TypeExports.Object(
  {
    flags: TypeExports.Integer({ description: "EKF status flags bitmask" }),
    velocityVariance: TypeExports.Number({
      minimum: 0,
      description: "Velocity innovation variance",
    }),
    positionVariance: TypeExports.Number({
      minimum: 0,
      description: "Position innovation variance",
    }),
    heightVariance: TypeExports.Number({ minimum: 0, description: "Height innovation variance" }),
    compassVariance: TypeExports.Number({ minimum: 0, description: "Compass innovation variance" }),
    terrainAltVariance: TypeExports.Number({
      minimum: 0,
      description: "Terrain altitude variance",
    }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for EKF status.
 */
export type EkfStatus = Static<typeof EkfStatusSchema>;

// Vibration Data Schema

/**
 * Vibration data schema.
 *
 * @remarks
 * Based on MAVLink VIBRATION (msg 241).
 * Monitors mechanical vibration and accelerometer clipping.
 */
export const VibrationDataSchema: TObject<
  {
    readonly x: TNumber;
    readonly y: TNumber;
    readonly z: TNumber;
    readonly clipping: TArray<TInteger>;
  },
  "x" | "y" | "z" | "clipping",
  never
> = TypeExports.Object(
  {
    x: TypeExports.Number({ minimum: 0, description: "Vibration level X axis" }),
    y: TypeExports.Number({ minimum: 0, description: "Vibration level Y axis" }),
    z: TypeExports.Number({ minimum: 0, description: "Vibration level Z axis" }),
    clipping: TypeExports.Array(TypeExports.Integer({ minimum: 0 }), {
      description: "Clipping count per accelerometer",
    }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for vibration data.
 */
export type VibrationData = Static<typeof VibrationDataSchema>;

// ESC (Electronic Speed Controller) Telemetry Data

/**
 * Individual ESC status schema.
 *
 * @remarks
 * Based on MAVLink ESC_STATUS (msg 291) and ESC_INFO (msg 290).
 * Provides per-ESC health and performance metrics.
 */
export const EscStatusSchema = TypeExports.Object(
  {
    index: TypeExports.Integer({ minimum: 0, description: "ESC index (0-based)" }),
    rpm: TypeExports.Number({ minimum: 0, description: "Motor RPM" }),
    voltage: TypeExports.Number({ minimum: 0, description: "ESC input voltage in Volts" }),
    current: TypeExports.Number({ minimum: 0, description: "ESC current draw in Amps" }),
    temperature: TypeExports.Optional(TypeExports.Number({ description: "ESC temperature in °C" })),
    motorTemperature: TypeExports.Optional(
      TypeExports.Number({ description: "Motor temperature in °C" }),
    ),
    throttle: TypeExports.Number({
      minimum: 0,
      maximum: 100,
      description: "Throttle percentage 0-100",
    }),
    power: TypeExports.Number({ minimum: 0, description: "Power consumption in Watts" }),
    errors: TypeExports.Integer({ minimum: 0, description: "Error count" }),
    failures: TypeExports.Integer({ minimum: 0, description: "ESC failure flags bitmask" }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for individual ESC status.
 */
export type EscStatus = Static<typeof EscStatusSchema>;

/**
 * ESC telemetry data schema.
 *
 * @remarks
 * Based on MAVLink ESC_TELEMETRY_1_TO_4 (msg 11030) through ESC_TELEMETRY_9_TO_12 (msg 11032).
 * Aggregates telemetry from all ESCs on the vehicle.
 */
export const EscTelemetryDataSchema = TypeExports.Object(
  {
    escCount: TypeExports.Integer({ minimum: 1, maximum: 12, description: "Number of ESCs" }),
    escs: TypeExports.Array(EscStatusSchema, { description: "Per-ESC status data" }),
    totalCurrent: TypeExports.Number({ minimum: 0, description: "Total current draw in Amps" }),
    totalPower: TypeExports.Number({ minimum: 0, description: "Total power consumption in Watts" }),
    averageRpm: TypeExports.Number({ minimum: 0, description: "Average motor RPM" }),
    averageTemperature: TypeExports.Optional(
      TypeExports.Number({ description: "Average ESC temperature in °C" }),
    ),
    healthyCount: TypeExports.Integer({ minimum: 0, description: "Number of healthy ESCs" }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for ESC telemetry data.
 */
export type EscTelemetryData = Static<typeof EscTelemetryDataSchema>;

/**
 * ESC telemetry reading schema.
 */
export const EscTelemetryReadingSchema = createSensorReadingSchema(EscTelemetryDataSchema);

/**
 * Typed ESC telemetry reading.
 */
export type EscTelemetryReading = SensorReading<EscTelemetryData>;
