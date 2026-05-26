/**
 * Drone constants.
 *
 * Centralizes common drone-related constants to avoid duplicated literals.
 *
 * @shared/constants/drone
 */

/**
 * Connection states considered "connected" for drone devices.
 */
export const DRONE_CONNECTED_STATES: readonly ["connected", "armed", "flying"] = [
  "connected",
  "armed",
  "flying",
] as const;

/**
 * Supported connection state union for connected drone devices.
 */
export type DroneConnectedState = (typeof DRONE_CONNECTED_STATES)[number];

/**
 * Lookup set for connected drone device states.
 */
export const DRONE_CONNECTED_STATE_SET: Set<"connected" | "armed" | "flying"> =
  new Set<DroneConnectedState>(DRONE_CONNECTED_STATES);

/**
 * Normalize a raw connection state into a canonical connected state.
 *
 * @param value - Raw connection state string.
 * @returns Canonical connected state or null when not connected.
 */
export function normalizeDroneConnectedState(
  value: string | null | undefined,
): DroneConnectedState | null {
  if (!value) {
    return null;
  }
  const normalized = value.trim().toLowerCase();
  return DRONE_CONNECTED_STATES.find((state) => state === normalized) ?? null;
}

/**
 * Check whether a raw connection state represents a connected drone.
 *
 * @param value - Raw connection state string.
 * @returns True when the state indicates a connected drone.
 */
export function isDroneConnectedState(value: string | null | undefined): boolean {
  const normalized = normalizeDroneConnectedState(value);
  return normalized ? DRONE_CONNECTED_STATE_SET.has(normalized) : false;
}

/** Explicit permission tokens for high-risk UAV/vehicle operations. */
export const DRONE_CONTROL_PERMISSIONS = {
  ARM: "drone:arm",
  DISARM: "drone:disarm",
  TAKEOFF: "drone:takeoff",
  LAND: "drone:land",
  RTL: "drone:rtl",
  HOVER: "drone:hover",
  MODE: "drone:mode",
  GOTO: "drone:goto",
  VELOCITY: "drone:velocity",
  MOVE: "drone:move",
  MISSION_UPLOAD: "drone:mission:upload",
  MISSION_PLAN: "drone:mission:plan",
  MISSION_EXPORT: "drone:mission:export",
  MISSION_START: "drone:mission:start",
  MISSION_PAUSE: "drone:mission:pause",
  MISSION_RESUME: "drone:mission:resume",
  MISSION_CLEAR: "drone:mission:clear",
  OFFBOARD_START: "drone:offboard:start",
  OFFBOARD_STOP: "drone:offboard:stop",
  OFFBOARD_SETPOINT: "drone:offboard:setpoint",
  GIMBAL: "drone:gimbal",
  EMERGENCY_STOP: "drone:emergency-stop",
} as const;

export type DroneControlPermission =
  (typeof DRONE_CONTROL_PERMISSIONS)[keyof typeof DRONE_CONTROL_PERMISSIONS];
