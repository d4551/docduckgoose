/**
 * MAVLink Protocol Schemas
 *
 * Defines TypeBox schemas for MAVLink message types and protocol constants.
 * Provides type-safe representations of common MAVLink messages.
 *
 * @shared/schemas/mavlink.ts
 *
 * @remarks
 * These schemas are based on MAVLink v2 common.xml message definitions.
 * Message IDs and field layouts follow the official MAVLink specification.
 *
 * @see https://mavlink.io/en/messages/common.html
 *
 * @example
 * ```typescript
 * import { MAV_AUTOPILOT, MAV_TYPE } from '@baohaus/bao-schemas/mavlink.constants.ts';
 * import { HeartbeatSchema } from '@baohaus/bao-schemas/mavlink.messages.ts';
 * import type { Heartbeat, SysStatus } from '@baohaus/bao-schemas/mavlink.messages.ts';
 *
 * const heartbeat: Heartbeat = {
 *   type: MAV_TYPE.QUADROTOR, *   autopilot: MAV_AUTOPILOT.ARDUPILOTMEGA, *   baseMode: 129, *   customMode: 0, *   systemStatus: 4, *   mavlinkVersion: 3, * };
 * ```
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

const DEG_E7_SCALE = 1e7;
const MM_PER_METER = 1000;
const CMS_PER_MPS = 100;

// MAVLink Message IDs

/**
 * Common MAVLink message IDs.
 *
 * @remarks
 * Subset of message IDs used in vehicle control and telemetry.
 */
export const MAVLINK_MSG_ID = {
  HEARTBEAT: 0,
  SYS_STATUS: 1,
  SYSTEM_TIME: 2,
  PING: 4,
  PARAM_VALUE: 22,
  PARAM_SET: 23,
  GPS_RAW_INT: 24,
  SCALED_IMU: 26,
  RAW_IMU: 27,
  SCALED_PRESSURE: 29,
  ATTITUDE: 30,
  ATTITUDE_QUATERNION: 31,
  LOCAL_POSITION_NED: 32,
  GLOBAL_POSITION_INT: 33,
  RC_CHANNELS_SCALED: 34,
  RC_CHANNELS_RAW: 35,
  SERVO_OUTPUT_RAW: 36,
  MISSION_ITEM: 39,
  MISSION_REQUEST: 40,
  MISSION_CURRENT: 42,
  MISSION_COUNT: 44,
  MISSION_ITEM_REACHED: 46,
  MISSION_ACK: 47,
  NAV_CONTROLLER_OUTPUT: 62,
  RC_CHANNELS: 65,
  MISSION_ITEM_INT: 73,
  VFR_HUD: 74,
  COMMAND_INT: 75,
  COMMAND_LONG: 76,
  COMMAND_ACK: 77,
  OPTICAL_FLOW: 100,
  OPTICAL_FLOW_RAD: 106,
  DISTANCE_SENSOR: 132,
  BATTERY_STATUS: 147,
  AUTOPILOT_VERSION: 148,
  ESTIMATOR_STATUS: 230,
  VIBRATION: 241,
  HOME_POSITION: 242,
  EXTENDED_SYS_STATE: 245,
  STATUSTEXT: 253,
} as const;

/**
 * Type-safe MAVLink message ID.
 */
export type MavlinkMsgId = (typeof MAVLINK_MSG_ID)[keyof typeof MAVLINK_MSG_ID];

// MAV_TYPE Enum

/**
 * MAV_TYPE enumeration.
 *
 * @remarks
 * Defines vehicle type categories.
 */
export const MAV_TYPE = {
  GENERIC: 0,
  FIXED_WING: 1,
  QUADROTOR: 2,
  COAXIAL: 3,
  HELICOPTER: 4,
  ANTENNA_TRACKER: 5,
  GCS: 6,
  AIRSHIP: 7,
  FREE_BALLOON: 8,
  ROCKET: 9,
  GROUND_ROVER: 10,
  SURFACE_BOAT: 11,
  SUBMARINE: 12,
  HEXAROTOR: 13,
  OCTOROTOR: 14,
  TRICOPTER: 15,
  FLAPPING_WING: 16,
  KITE: 17,
  ONBOARD_CONTROLLER: 18,
  VTOL_TAILSITTER_DUOROTOR: 19,
  VTOL_TAILSITTER_QUADROTOR: 20,
  VTOL_TILTROTOR: 21,
  VTOL_FIXEDROTOR: 22,
  VTOL_TAILSITTER: 23,
  VTOL_RESERVED4: 24,
  VTOL_RESERVED5: 25,
  GIMBAL: 26,
  ADSB: 27,
  PARAFOIL: 28,
  DODECAROTOR: 29,
  CAMERA: 30,
  CHARGING_STATION: 31,
  FLARM: 32,
  SERVO: 33,
  ODID: 34,
  DECAROTOR: 35,
  BATTERY: 36,
  PARACHUTE: 37,
  LOG: 38,
  OSD: 39,
  IMU: 40,
  GPS: 41,
  WINCH: 42,
} as const;

/**
 * Type-safe MAV_TYPE.
 */
export type MavType = (typeof MAV_TYPE)[keyof typeof MAV_TYPE];

// MAV_AUTOPILOT Enum

/**
 * MAV_AUTOPILOT enumeration.
 *
 * @remarks
 * Identifies autopilot firmware.
 */
export const MAV_AUTOPILOT: {
  readonly GENERIC: 0;
  readonly RESERVED: 1;
  readonly SLUGS: 2;
  readonly ARDUPILOTMEGA: 3;
  readonly OPENPILOT: 4;
  readonly GENERIC_WAYPOINTS_ONLY: 5;
  readonly GENERIC_WAYPOINTS_AND_SIMPLE_NAVIGATION_ONLY: 6;
  readonly GENERIC_MISSION_FULL: 7;
  readonly INVALID: 8;
  readonly PPZ: 9;
  readonly UDB: 10;
  readonly FP: 11;
  readonly PX4: 12;
  readonly SMACCMPILOT: 13;
  readonly AUTOQUAD: 14;
  readonly ARMAZILA: 15;
  readonly AEROB: 16;
  readonly ASLUAV: 17;
  readonly SMARTAP: 18;
  readonly AIRRAILS: 19;
  readonly REFLEX: 20;
} = {
  GENERIC: 0,
  RESERVED: 1,
  SLUGS: 2,
  ARDUPILOTMEGA: 3,
  OPENPILOT: 4,
  GENERIC_WAYPOINTS_ONLY: 5,
  GENERIC_WAYPOINTS_AND_SIMPLE_NAVIGATION_ONLY: 6,
  GENERIC_MISSION_FULL: 7,
  INVALID: 8,
  PPZ: 9,
  UDB: 10,
  FP: 11,
  PX4: 12,
  SMACCMPILOT: 13,
  AUTOQUAD: 14,
  ARMAZILA: 15,
  AEROB: 16,
  ASLUAV: 17,
  SMARTAP: 18,
  AIRRAILS: 19,
  REFLEX: 20,
} as const;

/**
 * Type-safe MAV_AUTOPILOT.
 */
export type MavAutopilot = (typeof MAV_AUTOPILOT)[keyof typeof MAV_AUTOPILOT];

// MAV_STATE Enum

/**
 * MAV_STATE enumeration.
 *
 * @remarks
 * System status states.
 */
export const MAV_STATE: {
  readonly UNINIT: 0;
  readonly BOOT: 1;
  readonly CALIBRATING: 2;
  readonly STANDBY: 3;
  readonly ACTIVE: 4;
  readonly CRITICAL: 5;
  readonly EMERGENCY: 6;
  readonly POWEROFF: 7;
  readonly FLIGHT_TERMINATION: 8;
} = {
  UNINIT: 0,
  BOOT: 1,
  CALIBRATING: 2,
  STANDBY: 3,
  ACTIVE: 4,
  CRITICAL: 5,
  EMERGENCY: 6,
  POWEROFF: 7,
  FLIGHT_TERMINATION: 8,
} as const;

/**
 * Type-safe MAV_STATE.
 */
export type MavState = (typeof MAV_STATE)[keyof typeof MAV_STATE];

// MAV_MODE_FLAG Enum

/**
 * MAV_MODE_FLAG bitmask.
 *
 * @remarks
 * Flags in base_mode field of HEARTBEAT.
 */
export const MAV_MODE_FLAG: {
  readonly CUSTOM_MODE_ENABLED: 1;
  readonly TEST_ENABLED: 2;
  readonly AUTO_ENABLED: 4;
  readonly GUIDED_ENABLED: 8;
  readonly STABILIZE_ENABLED: 16;
  readonly HIL_ENABLED: 32;
  readonly MANUAL_INPUT_ENABLED: 64;
  readonly SAFETY_ARMED: 128;
} = {
  CUSTOM_MODE_ENABLED: 0x01,
  TEST_ENABLED: 0x02,
  AUTO_ENABLED: 0x04,
  GUIDED_ENABLED: 0x08,
  STABILIZE_ENABLED: 0x10,
  HIL_ENABLED: 0x20,
  MANUAL_INPUT_ENABLED: 0x40,
  SAFETY_ARMED: 0x80,
} as const;

/**
 * Type-safe MAV_MODE_FLAG.
 */
export type MavModeFlag = (typeof MAV_MODE_FLAG)[keyof typeof MAV_MODE_FLAG];

// MAV_CMD Enum (subset)

/**
 * MAV_CMD enumeration (common subset).
 *
 * @remarks
 * Command IDs for COMMAND_LONG and COMMAND_INT messages.
 */
export const MAV_CMD = {
  NAV_WAYPOINT: 16,
  NAV_LOITER_UNLIM: 17,
  NAV_LOITER_TURNS: 18,
  NAV_LOITER_TIME: 19,
  NAV_RETURN_TO_LAUNCH: 20,
  NAV_LAND: 21,
  NAV_TAKEOFF: 22,
  NAV_LAND_LOCAL: 23,
  NAV_TAKEOFF_LOCAL: 24,
  NAV_FOLLOW: 25,
  NAV_CONTINUE_AND_CHANGE_ALT: 30,
  NAV_LOITER_TO_ALT: 31,
  DO_SET_MODE: 176,
  DO_JUMP: 177,
  DO_CHANGE_SPEED: 178,
  DO_SET_HOME: 179,
  DO_SET_PARAMETER: 180,
  DO_SET_RELAY: 181,
  DO_REPEAT_RELAY: 182,
  DO_SET_SERVO: 183,
  DO_REPEAT_SERVO: 184,
  DO_CONTROL_VIDEO: 200,
  DO_SET_ROI: 201,
  DO_DIGICAM_CONTROL: 203,
  DO_MOUNT_CONTROL: 205,
  DO_SET_CAM_TRIGG_DIST: 206,
  DO_FENCE_ENABLE: 207,
  DO_PARACHUTE: 208,
  DO_MOTOR_TEST: 209,
  DO_INVERTED_FLIGHT: 210,
  DO_GRIPPER: 211,
  DO_AUTOTUNE_ENABLE: 212,
  NAV_SET_YAW_SPEED: 213,
  DO_SET_CAM_TRIGG_INTERVAL: 214,
  DO_MOUNT_CONTROL_QUAT: 220,
  DO_GUIDED_MASTER: 221,
  DO_GUIDED_LIMITS: 222,
  DO_ENGINE_CONTROL: 223,
  DO_SET_MISSION_CURRENT: 224,
  DO_LAST: 240,
  PREFLIGHT_CALIBRATION: 241,
  PREFLIGHT_SET_SENSOR_OFFSETS: 242,
  PREFLIGHT_UAVCAN: 243,
  PREFLIGHT_STORAGE: 245,
  PREFLIGHT_REBOOT_SHUTDOWN: 246,
  COMPONENT_ARM_DISARM: 400,
  GET_HOME_POSITION: 410,
  REQUEST_MESSAGE: 512,
  REQUEST_AUTOPILOT_CAPABILITIES: 520,
  REQUEST_CAMERA_INFORMATION: 521,
  SET_MESSAGE_INTERVAL: 511,
  IMAGE_START_CAPTURE: 2000,
  IMAGE_STOP_CAPTURE: 2001,
  VIDEO_START_CAPTURE: 2500,
  VIDEO_STOP_CAPTURE: 2501,
  VIDEO_START_STREAMING: 2502,
  VIDEO_STOP_STREAMING: 2503,
} as const;

/**
 * Type-safe MAV_CMD.
 */
export type MavCmd = (typeof MAV_CMD)[keyof typeof MAV_CMD];

// MAV_RESULT Enum

/**
 * MAV_RESULT enumeration.
 *
 * @remarks
 * Command acknowledgment result codes.
 */
export const MAV_RESULT: {
  readonly ACCEPTED: 0;
  readonly TEMPORARILY_REJECTED: 1;
  readonly DENIED: 2;
  readonly UNSUPPORTED: 3;
  readonly FAILED: 4;
  readonly IN_PROGRESS: 5;
  readonly CANCELLED: 6;
  readonly COMMAND_LONG_ONLY: 7;
  readonly COMMAND_INT_ONLY: 8;
  readonly COMMAND_UNSUPPORTED_MAV_FRAME: 9;
} = {
  ACCEPTED: 0,
  TEMPORARILY_REJECTED: 1,
  DENIED: 2,
  UNSUPPORTED: 3,
  FAILED: 4,
  IN_PROGRESS: 5,
  CANCELLED: 6,
  COMMAND_LONG_ONLY: 7,
  COMMAND_INT_ONLY: 8,
  COMMAND_UNSUPPORTED_MAV_FRAME: 9,
} as const;

/**
 * Type-safe MAV_RESULT.
 */
export type MavResult = (typeof MAV_RESULT)[keyof typeof MAV_RESULT];

// MAVLink Message Schemas

/**
 * HEARTBEAT message schema (msg 0).
 *
 * @remarks
 * Sent at 1Hz to indicate system presence and capabilities.
 */
export const HeartbeatSchema: Type.TObject<
  {
    readonly type: Type.TInteger;
    readonly autopilot: Type.TInteger;
    readonly baseMode: Type.TInteger;
    readonly customMode: Type.TInteger;
    readonly systemStatus: Type.TInteger;
    readonly mavlinkVersion: Type.TInteger;
  },
  "type" | "autopilot" | "baseMode" | "customMode" | "systemStatus" | "mavlinkVersion",
  never
> = Type.Object(
  {
    type: Type.Integer({ description: "MAV_TYPE enum" }),
    autopilot: Type.Integer({ description: "MAV_AUTOPILOT enum" }),
    baseMode: Type.Integer({ description: "MAV_MODE_FLAG bitmask" }),
    customMode: Type.Integer({ description: "Autopilot-specific mode" }),
    systemStatus: Type.Integer({ description: "MAV_STATE enum" }),
    mavlinkVersion: Type.Integer({ description: "MAVLink version" }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for HEARTBEAT message.
 */
export type Heartbeat = Static<typeof HeartbeatSchema>;

/**
 * SYS_STATUS message schema (msg 1).
 *
 * @remarks
 * System status including battery, CPU load, and sensor health.
 */
export const SysStatusSchema = Type.Object(
  {
    onboardControlSensorsPresent: Type.Integer({ description: "Sensors present bitmask" }),
    onboardControlSensorsEnabled: Type.Integer({ description: "Sensors enabled bitmask" }),
    onboardControlSensorsHealth: Type.Integer({ description: "Sensors health bitmask" }),
    load: Type.Integer({ minimum: 0, maximum: 1000, description: "CPU load (0.1%)" }),
    voltageBattery: Type.Integer({ description: "Battery voltage in mV" }),
    currentBattery: Type.Integer({ description: "Battery current in 10mA" }),
    batteryRemaining: Type.Integer({
      minimum: -1,
      maximum: 100,
      description: "Battery remaining %",
    }),
    dropRateComm: Type.Optional(Type.Integer({ description: "Comm drop rate" })),
    errorsComm: Type.Optional(Type.Integer({ description: "Comm errors" })),
    errorsCount1: Type.Optional(Type.Integer()),
    errorsCount2: Type.Optional(Type.Integer()),
    errorsCount3: Type.Optional(Type.Integer()),
    errorsCount4: Type.Optional(Type.Integer()),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for SYS_STATUS message.
 */
export type SysStatus = Static<typeof SysStatusSchema>;

/**
 * GPS_RAW_INT message schema (msg 24).
 *
 * @remarks
 * Raw GPS position data in integer format.
 */
export const GpsRawIntSchema = Type.Object(
  {
    timeUsec: Type.Integer({ description: "Timestamp (UNIX microseconds)" }),
    fixType: Type.Integer({ minimum: 0, maximum: 6, description: "GPS_FIX_TYPE" }),
    lat: Type.Integer({ description: "Latitude (degE7)" }),
    lon: Type.Integer({ description: "Longitude (degE7)" }),
    alt: Type.Integer({ description: "Altitude MSL (mm)" }),
    eph: Type.Integer({ description: "HDOP (cm)" }),
    epv: Type.Integer({ description: "VDOP (cm)" }),
    vel: Type.Integer({ description: "Ground speed (cm/s)" }),
    cog: Type.Integer({ description: "Course over ground (cdeg)" }),
    satellitesVisible: Type.Integer({ description: "Number of satellites" }),
    altEllipsoid: Type.Optional(Type.Integer({ description: "Altitude above WGS84 (mm)" })),
    hAcc: Type.Optional(Type.Integer({ description: "Horizontal accuracy (mm)" })),
    vAcc: Type.Optional(Type.Integer({ description: "Vertical accuracy (mm)" })),
    velAcc: Type.Optional(Type.Integer({ description: "Speed accuracy (mm/s)" })),
    hdgAcc: Type.Optional(Type.Integer({ description: "Heading accuracy (degE5)" })),
    yaw: Type.Optional(Type.Integer({ description: "Yaw from GPS (cdeg)" })),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for GPS_RAW_INT message.
 */
export type GpsRawInt = Static<typeof GpsRawIntSchema>;

/**
 * ATTITUDE message schema (msg 30).
 *
 * @remarks
 * Vehicle attitude (roll, pitch, yaw) in radians.
 */
export const AttitudeSchema: Type.TObject<
  {
    readonly timeBootMs: Type.TInteger;
    readonly roll: Type.TNumber;
    readonly pitch: Type.TNumber;
    readonly yaw: Type.TNumber;
    readonly rollspeed: Type.TNumber;
    readonly pitchspeed: Type.TNumber;
    readonly yawspeed: Type.TNumber;
  },
  "yaw" | "timeBootMs" | "roll" | "pitch" | "rollspeed" | "pitchspeed" | "yawspeed",
  never
> = Type.Object(
  {
    timeBootMs: Type.Integer({ description: "Timestamp (ms since boot)" }),
    roll: Type.Number({ description: "Roll angle (rad)" }),
    pitch: Type.Number({ description: "Pitch angle (rad)" }),
    yaw: Type.Number({ description: "Yaw angle (rad)" }),
    rollspeed: Type.Number({ description: "Roll rate (rad/s)" }),
    pitchspeed: Type.Number({ description: "Pitch rate (rad/s)" }),
    yawspeed: Type.Number({ description: "Yaw rate (rad/s)" }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for ATTITUDE message.
 */
export type Attitude = Static<typeof AttitudeSchema>;

/**
 * GLOBAL_POSITION_INT message schema (msg 33).
 *
 * @remarks
 * Fused GPS and IMU position estimate.
 */
export const GlobalPositionIntSchema: Type.TObject<
  {
    readonly timeBootMs: Type.TInteger;
    readonly lat: Type.TInteger;
    readonly lon: Type.TInteger;
    readonly alt: Type.TInteger;
    readonly relativeAlt: Type.TInteger;
    readonly vx: Type.TInteger;
    readonly vy: Type.TInteger;
    readonly vz: Type.TInteger;
    readonly hdg: Type.TInteger;
  },
  "timeBootMs" | "lat" | "lon" | "alt" | "relativeAlt" | "vx" | "vy" | "vz" | "hdg",
  never
> = Type.Object(
  {
    timeBootMs: Type.Integer({ description: "Timestamp (ms since boot)" }),
    lat: Type.Integer({ description: "Latitude (degE7)" }),
    lon: Type.Integer({ description: "Longitude (degE7)" }),
    alt: Type.Integer({ description: "Altitude MSL (mm)" }),
    relativeAlt: Type.Integer({ description: "Altitude above ground (mm)" }),
    vx: Type.Integer({ description: "Ground X speed (cm/s)" }),
    vy: Type.Integer({ description: "Ground Y speed (cm/s)" }),
    vz: Type.Integer({ description: "Ground Z speed (cm/s)" }),
    hdg: Type.Integer({ description: "Heading (cdeg)" }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for GLOBAL_POSITION_INT message.
 */
export type GlobalPositionInt = Static<typeof GlobalPositionIntSchema>;

/**
 * RAW_IMU message schema (msg 27).
 *
 * @remarks
 * Raw accelerometer, gyroscope, and magnetometer readings.
 */
export const RawImuSchema = Type.Object(
  {
    timeUsec: Type.Integer({ description: "Timestamp (UNIX microseconds)" }),
    xacc: Type.Integer({ description: "X acceleration (mG)" }),
    yacc: Type.Integer({ description: "Y acceleration (mG)" }),
    zacc: Type.Integer({ description: "Z acceleration (mG)" }),
    xgyro: Type.Integer({ description: "X angular speed (mrad/s)" }),
    ygyro: Type.Integer({ description: "Y angular speed (mrad/s)" }),
    zgyro: Type.Integer({ description: "Z angular speed (mrad/s)" }),
    xmag: Type.Integer({ description: "X magnetic field (mT)" }),
    ymag: Type.Integer({ description: "Y magnetic field (mT)" }),
    zmag: Type.Integer({ description: "Z magnetic field (mT)" }),
    id: Type.Optional(Type.Integer({ description: "IMU ID" })),
    temperature: Type.Optional(Type.Integer({ description: "Temperature (cdegC)" })),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for RAW_IMU message.
 */
export type RawImu = Static<typeof RawImuSchema>;

/**
 * SCALED_PRESSURE message schema (msg 29).
 *
 * @remarks
 * Barometer readings with temperature.
 */
export const ScaledPressureSchema: Type.TObject<
  {
    readonly timeBootMs: Type.TInteger;
    readonly pressAbs: Type.TNumber;
    readonly pressDiff: Type.TNumber;
    readonly temperature: Type.TInteger;
    readonly temperaturePressDiff: Type.TOptional<Type.TInteger>;
  },
  "timeBootMs" | "temperature" | "pressAbs" | "pressDiff",
  "temperaturePressDiff"
> = Type.Object(
  {
    timeBootMs: Type.Integer({ description: "Timestamp (ms since boot)" }),
    pressAbs: Type.Number({ description: "Absolute pressure (hPa)" }),
    pressDiff: Type.Number({ description: "Differential pressure (hPa)" }),
    temperature: Type.Integer({ description: "Temperature (cdegC)" }),
    temperaturePressDiff: Type.Optional(
      Type.Integer({ description: "Diff pressure temp (cdegC)" }),
    ),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for SCALED_PRESSURE message.
 */
export type ScaledPressure = Static<typeof ScaledPressureSchema>;

/**
 * DISTANCE_SENSOR message schema (msg 132).
 *
 * @remarks
 * Rangefinder/distance sensor reading.
 */
export const DistanceSensorSchema = Type.Object(
  {
    timeBootMs: Type.Integer({ description: "Timestamp (ms since boot)" }),
    minDistance: Type.Integer({ description: "Minimum distance (cm)" }),
    maxDistance: Type.Integer({ description: "Maximum distance (cm)" }),
    currentDistance: Type.Integer({ description: "Current distance (cm)" }),
    type: Type.Integer({ description: "Sensor type" }),
    id: Type.Integer({ description: "Sensor ID" }),
    orientation: Type.Integer({ description: "MAV_SENSOR_ORIENTATION" }),
    covariance: Type.Integer({ description: "Measurement covariance (cm²)" }),
    horizontalFov: Type.Optional(Type.Number({ description: "Horizontal FOV (rad)" })),
    verticalFov: Type.Optional(Type.Number({ description: "Vertical FOV (rad)" })),
    quaternion: Type.Optional(
      Type.Array(Type.Number(), { description: "Sensor orientation quaternion" }),
    ),
    signalQuality: Type.Optional(Type.Integer({ description: "Signal quality (0-100)" })),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for DISTANCE_SENSOR message.
 */
export type DistanceSensor = Static<typeof DistanceSensorSchema>;

/**
 * COMMAND_LONG message schema (msg 76).
 *
 * @remarks
 * Command message for vehicle control.
 */
export const CommandLongSchema: Type.TObject<
  {
    readonly targetSystem: Type.TInteger;
    readonly targetComponent: Type.TInteger;
    readonly command: Type.TInteger;
    readonly confirmation: Type.TInteger;
    readonly param1: Type.TNumber;
    readonly param2: Type.TNumber;
    readonly param3: Type.TNumber;
    readonly param4: Type.TNumber;
    readonly param5: Type.TNumber;
    readonly param6: Type.TNumber;
    readonly param7: Type.TNumber;
  },
  | "targetSystem"
  | "targetComponent"
  | "command"
  | "confirmation"
  | "param1"
  | "param2"
  | "param3"
  | "param4"
  | "param5"
  | "param6"
  | "param7",
  never
> = Type.Object(
  {
    targetSystem: Type.Integer({ description: "Target system ID" }),
    targetComponent: Type.Integer({ description: "Target component ID" }),
    command: Type.Integer({ description: "MAV_CMD enum" }),
    confirmation: Type.Integer({ description: "Confirmation counter" }),
    param1: Type.Number({ description: "Parameter 1" }),
    param2: Type.Number({ description: "Parameter 2" }),
    param3: Type.Number({ description: "Parameter 3" }),
    param4: Type.Number({ description: "Parameter 4" }),
    param5: Type.Number({ description: "Parameter 5 (X)" }),
    param6: Type.Number({ description: "Parameter 6 (Y)" }),
    param7: Type.Number({ description: "Parameter 7 (Z)" }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for COMMAND_LONG message.
 */
export type CommandLong = Static<typeof CommandLongSchema>;

/**
 * COMMAND_ACK message schema (msg 77).
 *
 * @remarks
 * Acknowledgment of COMMAND_LONG or COMMAND_INT.
 */
export const CommandAckSchema: Type.TObject<
  {
    readonly command: Type.TInteger;
    readonly result: Type.TInteger;
    readonly progress: Type.TOptional<Type.TInteger>;
    readonly resultParam2: Type.TOptional<Type.TInteger>;
    readonly targetSystem: Type.TOptional<Type.TInteger>;
    readonly targetComponent: Type.TOptional<Type.TInteger>;
  },
  "command" | "result",
  Type.InferOptionalKeys<{
    readonly command: Type.TInteger;
    readonly result: Type.TInteger;
    readonly progress: Type.TOptional<Type.TInteger>;
    readonly resultParam2: Type.TOptional<Type.TInteger>;
    readonly targetSystem: Type.TOptional<Type.TInteger>;
    readonly targetComponent: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    command: Type.Integer({ description: "MAV_CMD enum that was acknowledged" }),
    result: Type.Integer({ description: "MAV_RESULT enum" }),
    progress: Type.Optional(Type.Integer({ description: "Progress (0-100)" })),
    resultParam2: Type.Optional(Type.Integer({ description: "Additional result" })),
    targetSystem: Type.Optional(Type.Integer({ description: "Target system ID" })),
    targetComponent: Type.Optional(Type.Integer({ description: "Target component ID" })),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for COMMAND_ACK message.
 */
export type CommandAck = Static<typeof CommandAckSchema>;

/**
 * ESTIMATOR_STATUS message schema (msg 230).
 *
 * @remarks
 * EKF estimator status for flight safety monitoring.
 */
export const EstimatorStatusSchema: Type.TObject<
  {
    readonly timeUsec: Type.TInteger;
    readonly flags: Type.TInteger;
    readonly velRatio: Type.TNumber;
    readonly posHorizRatio: Type.TNumber;
    readonly posVertRatio: Type.TNumber;
    readonly magRatio: Type.TNumber;
    readonly haglRatio: Type.TNumber;
    readonly tasRatio: Type.TNumber;
    readonly posHorizAccuracy: Type.TNumber;
    readonly posVertAccuracy: Type.TNumber;
  },
  | "timeUsec"
  | "flags"
  | "velRatio"
  | "posHorizRatio"
  | "posVertRatio"
  | "magRatio"
  | "haglRatio"
  | "tasRatio"
  | "posHorizAccuracy"
  | "posVertAccuracy",
  never
> = Type.Object(
  {
    timeUsec: Type.Integer({ description: "Timestamp (UNIX microseconds)" }),
    flags: Type.Integer({ description: "ESTIMATOR_STATUS_FLAGS bitmask" }),
    velRatio: Type.Number({ description: "Velocity innovation test ratio" }),
    posHorizRatio: Type.Number({ description: "Horizontal position test ratio" }),
    posVertRatio: Type.Number({ description: "Vertical position test ratio" }),
    magRatio: Type.Number({ description: "Magnetometer test ratio" }),
    haglRatio: Type.Number({ description: "Height above terrain test ratio" }),
    tasRatio: Type.Number({ description: "True airspeed test ratio" }),
    posHorizAccuracy: Type.Number({ description: "Horizontal position accuracy (m)" }),
    posVertAccuracy: Type.Number({ description: "Vertical position accuracy (m)" }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for ESTIMATOR_STATUS message.
 */
export type EstimatorStatus = Static<typeof EstimatorStatusSchema>;

/**
 * VIBRATION message schema (msg 241).
 *
 * @remarks
 * Vibration monitoring for mechanical health.
 */
export const VibrationSchema: Type.TObject<
  {
    readonly timeUsec: Type.TInteger;
    readonly vibrationX: Type.TNumber;
    readonly vibrationY: Type.TNumber;
    readonly vibrationZ: Type.TNumber;
    readonly clipping0: Type.TInteger;
    readonly clipping1: Type.TInteger;
    readonly clipping2: Type.TInteger;
  },
  "timeUsec" | "vibrationX" | "vibrationY" | "vibrationZ" | "clipping0" | "clipping1" | "clipping2",
  never
> = Type.Object(
  {
    timeUsec: Type.Integer({ description: "Timestamp (UNIX microseconds)" }),
    vibrationX: Type.Number({ description: "Vibration level X" }),
    vibrationY: Type.Number({ description: "Vibration level Y" }),
    vibrationZ: Type.Number({ description: "Vibration level Z" }),
    clipping0: Type.Integer({ description: "Accelerometer 0 clipping count" }),
    clipping1: Type.Integer({ description: "Accelerometer 1 clipping count" }),
    clipping2: Type.Integer({ description: "Accelerometer 2 clipping count" }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for VIBRATION message.
 */
export type Vibration = Static<typeof VibrationSchema>;

// Helper Functions

/**
 * Check if vehicle is armed based on base_mode.
 *
 * @param baseMode - base_mode field from HEARTBEAT.
 * @returns True if vehicle is armed.
 */
export function isArmed(baseMode: number): boolean {
  return (baseMode & MAV_MODE_FLAG.SAFETY_ARMED) !== 0;
}

/**
 * Check if custom mode is enabled.
 *
 * @param baseMode - base_mode field from HEARTBEAT.
 * @returns True if custom mode is enabled.
 */
export function isCustomModeEnabled(baseMode: number): boolean {
  return (baseMode & MAV_MODE_FLAG.CUSTOM_MODE_ENABLED) !== 0;
}

/**
 * Convert latitude from degE7 to degrees.
 *
 * @param latE7 - Latitude in degE7.
 * @returns Latitude in degrees.
 */
export function latFromE7(latE7: number): number {
  return latE7 / DEG_E7_SCALE;
}

/**
 * Convert longitude from degE7 to degrees.
 *
 * @param lonE7 - Longitude in degE7.
 * @returns Longitude in degrees.
 */
export function lonFromE7(lonE7: number): number {
  return lonE7 / DEG_E7_SCALE;
}

/**
 * Convert altitude from millimeters to meters.
 *
 * @param altMm - Altitude in millimeters.
 * @returns Altitude in meters.
 */
export function altFromMm(altMm: number): number {
  return altMm / MM_PER_METER;
}

/**
 * Convert velocity from cm/s to m/s.
 *
 * @param velCms - Velocity in cm/s.
 * @returns Velocity in m/s.
 */
export function velFromCms(velCms: number): number {
  return velCms / CMS_PER_MPS;
}

/**
 * Convert heading from centidegrees to degrees.
 *
 * @param hdgCdeg - Heading in centidegrees.
 * @returns Heading in degrees.
 */
export function hdgFromCdeg(hdgCdeg: number): number {
  return hdgCdeg / CMS_PER_MPS;
}
