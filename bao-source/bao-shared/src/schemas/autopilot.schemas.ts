/**
 * Autopilot and Flight Mode Schemas
 *
 * Defines TypeBox schemas for autopilot identification, flight modes, and capabilities.
 * Supports PX4, ArduPilot, and generic autopilot systems.
 *
 * @shared/schemas/autopilot.ts
 *
 * @remarks
 * Flight mode mappings are based on:
 * - PX4: PX4-Autopilot/src/modules/commander custom modes
 * - ArduPilot: ardupilot/ArduCopter/mode.h, ardupilot/ArduPlane/mode.h
 *
 * @example
 * ```typescript
 * import { AutopilotInfoSchema, ARDUPILOT_COPTER_MODES } from '@baohaus/bao-schemas/autopilot.ts';
 * import type { AutopilotInfo, FlightMode } from '@baohaus/bao-schemas/autopilot.ts';
 *
 * const autopilot: AutopilotInfo = {
 *   type: 'ardupilot', *   mavType: 2, *   autopilot: 3, *   version: '4.4.0', *   capabilities: 0xFFFF, * };
 * ```
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";

/** MAVLink MAV_TYPE enum values. */
const MAV_TYPE_FIXED_WING = 1;
const MAV_TYPE_QUADROTOR = 2;
const MAV_TYPE_COAXIAL = 3;
const MAV_TYPE_GROUND_ROVER = 10;
const MAV_TYPE_SURFACE_BOAT = 11;
const MAV_TYPE_SUBMARINE = 12;
const MAV_TYPE_HEXAROTOR = 13;
const MAV_TYPE_OCTOROTOR = 14;
const MAV_TYPE_TRICOPTER = 15;
const MAV_TYPE_VTOL_START = 19;
const MAV_TYPE_VTOL_END = 24;
const MAV_TYPE_KEEL_BOAT = 27;

// Autopilot Types

/**
 * Supported autopilot firmware types.
 *
 * @remarks
 * Detected from MAVLink HEARTBEAT autopilot field (MAV_AUTOPILOT enum).
 */
export const AUTOPILOT_TYPES: readonly ["px4", "ardupilot", "generic"] = [
  "px4",
  "ardupilot",
  "generic",
] as const;

/**
 * Type-safe autopilot type enumeration.
 */
export type AutopilotType = (typeof AUTOPILOT_TYPES)[number];

/**
 * Autopilot type schema.
 */
export const AutopilotTypeSchema: Type.TUnion<
  [
    Type.TLiteral<"px4" | "ardupilot" | "generic">,
    ...Type.TLiteral<"px4" | "ardupilot" | "generic">[],
  ]
> = stringEnum(AUTOPILOT_TYPES, {});

/**
 * MAV_AUTOPILOT enum to AutopilotType mapping.
 *
 * @remarks
 * From MAVLink common.xml:
 * - 0: MAV_AUTOPILOT_GENERIC
 * - 3: MAV_AUTOPILOT_ARDUPILOTMEGA
 * - 12: MAV_AUTOPILOT_PX4
 */
export const MAV_AUTOPILOT_MAP: Record<number, AutopilotType> = {
  0: "generic",
  3: "ardupilot",
  12: "px4",
};

// Vehicle Classes

/**
 * High-level vehicle classification.
 *
 * @remarks
 * Derived from MAV_TYPE enum categories.
 */
export const VEHICLE_CLASSES: readonly [
  "multirotor",
  "fixed-wing",
  "vtol",
  "rover",
  "boat",
  "submarine",
] = ["multirotor", "fixed-wing", "vtol", "rover", "boat", "submarine"] as const;

/**
 * Type-safe vehicle class enumeration.
 */
export type VehicleClass = (typeof VEHICLE_CLASSES)[number];

/**
 * Vehicle class schema.
 */
export const VehicleClassSchema: Type.TUnion<
  [
    Type.TLiteral<"multirotor" | "fixed-wing" | "vtol" | "rover" | "boat" | "submarine">,
    ...Type.TLiteral<"multirotor" | "fixed-wing" | "vtol" | "rover" | "boat" | "submarine">[],
  ]
> = stringEnum(VEHICLE_CLASSES, {});

// Flight Modes

/**
 * Unified flight mode enumeration.
 *
 * @remarks
 * Normalized flight modes that work across PX4 and ArduPilot.
 * Both autopilots map their custom modes to these canonical modes.
 */
export const FLIGHT_MODES: readonly [
  "STABILIZE",
  "ACRO",
  "ALT_HOLD",
  "AUTO",
  "GUIDED",
  "LOITER",
  "RTL",
  "LAND",
  "POSHOLD",
  "MANUAL",
  "OFFBOARD",
  "CIRCLE",
  "DRIFT",
  "SPORT",
  "FLIP",
  "AUTOTUNE",
  "BRAKE",
  "THROW",
  "AVOID_ADSB",
  "GUIDED_NOGPS",
  "SMART_RTL",
  "FLOWHOLD",
  "FOLLOW",
  "ZIGZAG",
  "SYSTEMID",
  "AUTOROTATE",
  "AUTO_RTL",
  "RATTITUDE",
  "UNKNOWN",
] = [
  "STABILIZE",
  "ACRO",
  "ALT_HOLD",
  "AUTO",
  "GUIDED",
  "LOITER",
  "RTL",
  "LAND",
  "POSHOLD",
  "MANUAL",
  "OFFBOARD",
  "CIRCLE",
  "DRIFT",
  "SPORT",
  "FLIP",
  "AUTOTUNE",
  "BRAKE",
  "THROW",
  "AVOID_ADSB",
  "GUIDED_NOGPS",
  "SMART_RTL",
  "FLOWHOLD",
  "FOLLOW",
  "ZIGZAG",
  "SYSTEMID",
  "AUTOROTATE",
  "AUTO_RTL",
  "RATTITUDE",
  "UNKNOWN",
] as const;

/**
 * Type-safe flight mode enumeration.
 */
export type FlightMode = (typeof FLIGHT_MODES)[number];

/**
 * Flight mode schema.
 */
export const FlightModeSchema: Type.TUnion<
  [
    Type.TLiteral<
      | "STABILIZE"
      | "ACRO"
      | "ALT_HOLD"
      | "AUTO"
      | "GUIDED"
      | "LOITER"
      | "RTL"
      | "LAND"
      | "POSHOLD"
      | "MANUAL"
      | "OFFBOARD"
      | "CIRCLE"
      | "DRIFT"
      | "SPORT"
      | "FLIP"
      | "AUTOTUNE"
      | "BRAKE"
      | "THROW"
      | "AVOID_ADSB"
      | "GUIDED_NOGPS"
      | "SMART_RTL"
      | "FLOWHOLD"
      | "FOLLOW"
      | "ZIGZAG"
      | "SYSTEMID"
      | "AUTOROTATE"
      | "AUTO_RTL"
      | "RATTITUDE"
      | "UNKNOWN"
    >,
    ...Type.TLiteral<
      | "STABILIZE"
      | "ACRO"
      | "ALT_HOLD"
      | "AUTO"
      | "GUIDED"
      | "LOITER"
      | "RTL"
      | "LAND"
      | "POSHOLD"
      | "MANUAL"
      | "OFFBOARD"
      | "CIRCLE"
      | "DRIFT"
      | "SPORT"
      | "FLIP"
      | "AUTOTUNE"
      | "BRAKE"
      | "THROW"
      | "AVOID_ADSB"
      | "GUIDED_NOGPS"
      | "SMART_RTL"
      | "FLOWHOLD"
      | "FOLLOW"
      | "ZIGZAG"
      | "SYSTEMID"
      | "AUTOROTATE"
      | "AUTO_RTL"
      | "RATTITUDE"
      | "UNKNOWN"
    >[],
  ]
> = stringEnum(FLIGHT_MODES, {});

// ArduPilot Mode Mappings

/**
 * ArduPilot Copter custom_mode to FlightMode mapping.
 *
 * @remarks
 * From ardupilot/ArduCopter/mode.h Mode::Number enum.
 */
export const ARDUPILOT_COPTER_MODES: Record<number, FlightMode> = {
  0: "STABILIZE",
  1: "ACRO",
  2: "ALT_HOLD",
  3: "AUTO",
  4: "GUIDED",
  5: "LOITER",
  6: "RTL",
  7: "CIRCLE",
  9: "LAND",
  11: "DRIFT",
  13: "SPORT",
  14: "FLIP",
  15: "AUTOTUNE",
  16: "POSHOLD",
  17: "BRAKE",
  18: "THROW",
  19: "AVOID_ADSB",
  20: "GUIDED_NOGPS",
  21: "SMART_RTL",
  22: "FLOWHOLD",
  23: "FOLLOW",
  24: "ZIGZAG",
  25: "SYSTEMID",
  26: "AUTOROTATE",
  27: "AUTO_RTL",
};

/**
 * ArduPilot Plane custom_mode to FlightMode mapping.
 *
 * @remarks
 * From ardupilot/ArduPlane/mode.h Mode::Number enum.
 */
export const ARDUPILOT_PLANE_MODES: Record<number, FlightMode> = {
  0: "MANUAL",
  1: "CIRCLE",
  2: "STABILIZE",
  5: "ACRO",
  10: "AUTO",
  11: "RTL",
  12: "LOITER",
  15: "GUIDED",
  17: "AUTOTUNE",
};

/**
 * ArduPilot Rover custom_mode to FlightMode mapping.
 *
 * @remarks
 * From ardupilot/Rover/mode.h Mode::Number enum.
 */
export const ARDUPILOT_ROVER_MODES: Record<number, FlightMode> = {
  0: "MANUAL",
  1: "ACRO",
  3: "STABILIZE",
  4: "ALT_HOLD",
  10: "AUTO",
  11: "RTL",
  12: "SMART_RTL",
  15: "GUIDED",
  16: "LOITER",
  19: "FOLLOW",
};

// PX4 Mode Mappings

/**
 * PX4 main mode bits.
 *
 * @remarks
 * From PX4-Autopilot/src/modules/commander/px4_custom_mode.h.
 * Main mode is stored in bits 16-23 of custom_mode.
 */
export const PX4_MAIN_MODES: {
  readonly MANUAL: 65536;
  readonly ALTCTL: 131072;
  readonly POSCTL: 196608;
  readonly AUTO: 262144;
  readonly ACRO: 327680;
  readonly OFFBOARD: 393216;
  readonly STABILIZED: 458752;
  readonly RATTITUDE: 524288;
} = {
  MANUAL: 0x10000,
  ALTCTL: 0x20000,
  POSCTL: 0x30000,
  AUTO: 0x40000,
  ACRO: 0x50000,
  OFFBOARD: 0x60000,
  STABILIZED: 0x70000,
  RATTITUDE: 0x80000,
} as const;

/**
 * PX4 auto sub-mode bits.
 *
 * @remarks
 * Sub-mode is stored in bits 0-7 of custom_mode when main mode is AUTO.
 */
export const PX4_AUTO_SUBMODES: {
  readonly READY: 1;
  readonly TAKEOFF: 2;
  readonly LOITER: 3;
  readonly MISSION: 4;
  readonly RTL: 5;
  readonly LAND: 6;
  readonly FOLLOW_TARGET: 8;
  readonly PRECLAND: 9;
} = {
  READY: 1,
  TAKEOFF: 2,
  LOITER: 3,
  MISSION: 4,
  RTL: 5,
  LAND: 6,
  FOLLOW_TARGET: 8,
  PRECLAND: 9,
} as const;

/**
 * PX4 custom_mode to FlightMode mapping.
 *
 * @remarks
 * Maps PX4 custom mode values to canonical flight modes.
 */
export const PX4_MODE_MAP: Record<number, FlightMode> = {
  // Main modes
  [PX4_MAIN_MODES.MANUAL]: "MANUAL",
  [PX4_MAIN_MODES.ALTCTL]: "ALT_HOLD",
  [PX4_MAIN_MODES.POSCTL]: "POSHOLD",
  [PX4_MAIN_MODES.ACRO]: "ACRO",
  [PX4_MAIN_MODES.OFFBOARD]: "OFFBOARD",
  [PX4_MAIN_MODES.STABILIZED]: "STABILIZE",
  [PX4_MAIN_MODES.RATTITUDE]: "RATTITUDE",
  // Auto sub-modes (AUTO main mode + sub-mode)
  [PX4_MAIN_MODES.AUTO | PX4_AUTO_SUBMODES.READY]: "AUTO",
  [PX4_MAIN_MODES.AUTO | PX4_AUTO_SUBMODES.TAKEOFF]: "GUIDED",
  [PX4_MAIN_MODES.AUTO | PX4_AUTO_SUBMODES.LOITER]: "LOITER",
  [PX4_MAIN_MODES.AUTO | PX4_AUTO_SUBMODES.MISSION]: "AUTO",
  [PX4_MAIN_MODES.AUTO | PX4_AUTO_SUBMODES.RTL]: "RTL",
  [PX4_MAIN_MODES.AUTO | PX4_AUTO_SUBMODES.LAND]: "LAND",
  [PX4_MAIN_MODES.AUTO | PX4_AUTO_SUBMODES.FOLLOW_TARGET]: "FOLLOW",
  [PX4_MAIN_MODES.AUTO | PX4_AUTO_SUBMODES.PRECLAND]: "LAND",
};

// Autopilot Capabilities

/**
 * Autopilot capabilities schema.
 *
 * @remarks
 * Based on MAVLink MAV_PROTOCOL_CAPABILITY flags from AUTOPILOT_VERSION message.
 */
export const AutopilotCapabilitiesSchema: Type.TObject<
  {
    readonly supportsOffboard: Type.TBoolean;
    readonly supportsMission: Type.TBoolean;
    readonly supportsGeofence: Type.TBoolean;
    readonly supportsRallyPoints: Type.TBoolean;
    readonly supportsFtp: Type.TBoolean;
    readonly supportsParamFloat: Type.TBoolean;
    readonly supportsParamUnion: Type.TBoolean;
    readonly supportsSetActuatorTarget: Type.TBoolean;
    readonly supportsFlightTermination: Type.TBoolean;
    readonly supportsCompassCalibration: Type.TBoolean;
  },
  | "supportsOffboard"
  | "supportsMission"
  | "supportsGeofence"
  | "supportsRallyPoints"
  | "supportsFtp"
  | "supportsParamFloat"
  | "supportsParamUnion"
  | "supportsSetActuatorTarget"
  | "supportsFlightTermination"
  | "supportsCompassCalibration",
  never
> = Type.Object(
  {
    supportsOffboard: Type.Boolean({ description: "Supports offboard control mode" }),
    supportsMission: Type.Boolean({ description: "Supports mission upload/download" }),
    supportsGeofence: Type.Boolean({ description: "Supports geofence configuration" }),
    supportsRallyPoints: Type.Boolean({ description: "Supports rally point configuration" }),
    supportsFtp: Type.Boolean({ description: "Supports MAVLink FTP" }),
    supportsParamFloat: Type.Boolean({ description: "Supports float parameters" }),
    supportsParamUnion: Type.Boolean({ description: "Supports union parameters" }),
    supportsSetActuatorTarget: Type.Boolean({ description: "Supports direct actuator control" }),
    supportsFlightTermination: Type.Boolean({ description: "Supports flight termination command" }),
    supportsCompassCalibration: Type.Boolean({
      description: "Supports onboard compass calibration",
    }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for autopilot capabilities.
 */
export type AutopilotCapabilities = Static<typeof AutopilotCapabilitiesSchema>;

// Autopilot Info

/**
 * Autopilot identification and configuration schema.
 *
 * @remarks
 * Extracted from MAVLink HEARTBEAT and AUTOPILOT_VERSION messages.
 */
export const AutopilotInfoSchema = Type.Object(
  {
    type: AutopilotTypeSchema,
    mavType: Type.Integer({ description: "MAV_TYPE enum value" }),
    autopilot: Type.Integer({ description: "MAV_AUTOPILOT enum value" }),
    version: Type.Optional(Type.String({ description: "Firmware version string" })),
    capabilities: Type.Optional(Type.Integer({ description: "MAV_PROTOCOL_CAPABILITY bitmask" })),
    customModeMapping: Type.Optional(
      Type.Record(Type.Number(), FlightModeSchema, {
        description: "Custom mode to FlightMode mapping",
      }),
    ),
    vehicleClass: Type.Optional(VehicleClassSchema),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for autopilot info.
 */
export type AutopilotInfo = Static<typeof AutopilotInfoSchema>;

// Parameter Value Schema

/**
 * Parameter data types.
 */
export const PARAMETER_TYPES: readonly ["float", "int", "string"] = [
  "float",
  "int",
  "string",
] as const;

/**
 * Type-safe parameter type enumeration.
 */
export type ParameterType = (typeof PARAMETER_TYPES)[number];

/**
 * Parameter type schema.
 */
export const ParameterTypeSchema: Type.TUnion<
  [Type.TLiteral<"string" | "float" | "int">, ...Type.TLiteral<"string" | "float" | "int">[]]
> = stringEnum(PARAMETER_TYPES, {});

/**
 * Vehicle parameter value schema.
 *
 * @remarks
 * Represents a single parameter from the autopilot parameter system.
 */
export const ParameterValueSchema = Type.Object(
  {
    name: Type.String({
      minLength: 1,
      maxLength: 16,
      description: "Parameter name (max 16 chars)",
    }),
    value: Type.Union([Type.Number(), Type.String()], { description: "Parameter value" }),
    type: ParameterTypeSchema,
    min: Type.Optional(Type.Number({ description: "Minimum allowed value" })),
    max: Type.Optional(Type.Number({ description: "Maximum allowed value" })),
    default: Type.Optional(Type.Number({ description: "Default value" })),
    description: Type.Optional(Type.String({ description: "Parameter description" })),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for parameter value.
 */
export type ParameterValue = Static<typeof ParameterValueSchema>;

// Helper Functions

/**
 * Detect autopilot type from MAV_AUTOPILOT enum value.
 *
 * @param mavAutopilot - MAV_AUTOPILOT enum value from HEARTBEAT.
 * @returns Detected autopilot type.
 */
export function detectAutopilotType(mavAutopilot: number): AutopilotType {
  return MAV_AUTOPILOT_MAP[mavAutopilot] ?? "generic";
}

/**
 * Get flight mode mapping for autopilot type and vehicle class.
 *
 * @param autopilotType - The autopilot firmware type.
 * @param vehicleClass - The vehicle class (multirotor, fixed-wing, rover).
 * @returns Mode mapping dictionary.
 */
export function getModeMappingForAutopilot(
  autopilotType: AutopilotType,
  vehicleClass: VehicleClass = "multirotor",
): Record<number, FlightMode> {
  if (autopilotType === "px4") {
    return PX4_MODE_MAP;
  }

  if (autopilotType === "ardupilot") {
    switch (vehicleClass) {
      case "fixed-wing":
        return ARDUPILOT_PLANE_MODES;
      case "rover":
        return ARDUPILOT_ROVER_MODES;
      default:
        return ARDUPILOT_COPTER_MODES;
    }
  }

  // Generic autopilot - return ArduPilot copter modes as default
  return ARDUPILOT_COPTER_MODES;
}

/**
 * Parse PX4 custom mode into main mode and sub-mode.
 *
 * @param customMode - PX4 custom_mode value.
 * @returns Main mode and sub-mode values.
 */
export function parsePx4CustomMode(customMode: number): { mainMode: number; subMode: number } {
  const mainMode = customMode & 0xff0000;
  const subMode = customMode & 0x0000ff;
  return { mainMode, subMode };
}

/**
 * Determine vehicle class from MAV_TYPE.
 *
 * @param mavType - MAV_TYPE enum value.
 * @returns Vehicle class or undefined if unknown.
 */
export function vehicleClassFromMavType(mavType: number): VehicleClass | undefined {
  // Multirotors: quadrotor, hexarotor, octorotor, tricopter, coaxial
  const multirotorTypes: readonly number[] = [
    MAV_TYPE_QUADROTOR,
    MAV_TYPE_HEXAROTOR,
    MAV_TYPE_OCTOROTOR,
    MAV_TYPE_TRICOPTER,
    MAV_TYPE_COAXIAL,
  ];
  if (multirotorTypes.includes(mavType)) {
    return "multirotor";
  }
  if (mavType === MAV_TYPE_FIXED_WING) {
    return "fixed-wing";
  }
  if (mavType >= MAV_TYPE_VTOL_START && mavType <= MAV_TYPE_VTOL_END) {
    return "vtol";
  }
  const roverTypes: readonly number[] = [MAV_TYPE_GROUND_ROVER, MAV_TYPE_SURFACE_BOAT];
  if (roverTypes.includes(mavType)) {
    return "rover";
  }
  if (mavType === MAV_TYPE_SUBMARINE) {
    return "boat";
  }
  if (mavType === MAV_TYPE_KEEL_BOAT) {
    return "submarine";
  }
  let vehicleClass: VehicleClass | undefined;
  return vehicleClass;
}
