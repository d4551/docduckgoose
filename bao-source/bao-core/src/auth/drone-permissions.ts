/**
 * Drone control permission constants.
 *
 * These permission tokens are intended to be used as explicit, auditable
 * authorization gates for high-risk UAV/vehicle operations (arm, takeoff,
 * mission upload/start, offboard).
 *
 * The server enforces these tokens at the API boundary (in addition to CASL
 * ability checks) so UI, server, and operators have a shared vocabulary for
 * authorization and auditing.
 *
 * @shared/auth/drone-permissions
 */

/** DRONE_CONTROL_PERMISSIONS constant. */
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

/** Inferred type from the DroneControlPermission schema. */
export type DroneControlPermission =
  (typeof DRONE_CONTROL_PERMISSIONS)[keyof typeof DRONE_CONTROL_PERMISSIONS];
