/**
 * Robotics default configuration values.
 *
 * Provides safe defaults for robotics policy, motion planning, localization,
 * and telemetry capture/replay when per-environment overrides are not supplied.
 *
 * @shared/config/robotics-defaults
 */

import type { RoboticsLocalizationSource } from "@baohaus/bao-schemas/robotics-localization.schemas";
import type { RoboticsSafetyPolicy } from "@baohaus/bao-schemas/robotics-policy.schemas";

const FULL_TURN_RADIANS: number = Math.PI;

/** Default joint orientation limits for robotic arm safety. */
export const ROBOTICS_DEFAULT_ORIENTATION_LIMITS: {
  readonly roll: { readonly min: number; readonly max: number };
  readonly pitch: { readonly min: number; readonly max: number };
  readonly yaw: { readonly min: number; readonly max: number };
} = {
  roll: { min: -FULL_TURN_RADIANS, max: FULL_TURN_RADIANS },
  pitch: { min: -FULL_TURN_RADIANS, max: FULL_TURN_RADIANS },
  yaw: { min: -FULL_TURN_RADIANS, max: FULL_TURN_RADIANS },
} as const;

/** Default workspace boundary limits (meters) for robotic operations. */
export const ROBOTICS_DEFAULT_WORKSPACE_BOUNDS: {
  readonly min: { readonly x: -10; readonly y: -10; readonly z: -10 };
  readonly max: { readonly x: 10; readonly y: 10; readonly z: 10 };
  readonly frameId: "map";
} = {
  min: { x: -10, y: -10, z: -10 },
  max: { x: 10, y: 10, z: 10 },
  frameId: "map",
} as const;

/** Default velocity limits for robotic motion (rad/s, m/s). */
export const ROBOTICS_DEFAULT_VELOCITY_LIMITS: {
  readonly linear: { readonly x: 1; readonly y: 1; readonly z: 1 };
  readonly angular: { readonly x: 1; readonly y: 1; readonly z: 1 };
} = {
  linear: { x: 1, y: 1, z: 1 },
  angular: { x: 1, y: 1, z: 1 },
} as const;

/** Default robotics safety policy configuration. */
export const ROBOTICS_POLICY_DEFAULTS: RoboticsSafetyPolicy = {
  enabled: true,
  jointLimits: [],
  workspaceBounds: { ...ROBOTICS_DEFAULT_WORKSPACE_BOUNDS },
  orientationBounds: { ...ROBOTICS_DEFAULT_ORIENTATION_LIMITS },
  velocityLimits: { ...ROBOTICS_DEFAULT_VELOCITY_LIMITS },
  keepoutZones: [],
  allowedFrames: ["map", "base_link", "world"],
};

/** Default localization source for position tracking. */
export const ROBOTICS_DEFAULT_LOCALIZATION_SOURCE: RoboticsLocalizationSource = {
  type: "ros2ws",
  topic: "/amcl_pose",
  frameId: "map",
};

/** Default motion planning configuration. */
export const ROBOTICS_MOTION_DEFAULTS: {
  readonly sampleIntervalMs: 100;
  readonly maxDurationMs: 10000;
  readonly maxPoints: 200;
  readonly maxVelocity: 1;
} = {
  sampleIntervalMs: 100,
  maxDurationMs: 10_000,
  maxPoints: 200,
  maxVelocity: 1,
} as const;

/** Default localization query parameters. */
export const ROBOTICS_LOCALIZATION_DEFAULTS: {
  readonly enabled: true;
  readonly source: { type: "ros2ws" | "native" | "simulation" | "external" } & {
    topic?: string | undefined;
    frameId?: string | undefined;
  };
  readonly maxAgeMs: 5000;
  readonly staleAfterMs: 2000;
} = {
  enabled: true,
  source: ROBOTICS_DEFAULT_LOCALIZATION_SOURCE,
  maxAgeMs: 5_000,
  staleAfterMs: 2_000,
} as const;

/** Default telemetry collection configuration. */
export const ROBOTICS_TELEMETRY_DEFAULTS: {
  readonly captureEnabled: true;
  readonly captureIntervalMs: 5000;
  readonly maxSamples: 1000;
  readonly replayRate: 1;
  readonly replayRateMin: 0.1;
  readonly list: { readonly defaultLimit: 100; readonly maxLimit: 500 };
} = {
  captureEnabled: true,
  captureIntervalMs: 5_000,
  maxSamples: 1_000,
  replayRate: 1,
  replayRateMin: 0.1,
  list: {
    defaultLimit: 100,
    maxLimit: 500,
  },
} as const;

/** Default pagination for mission list queries. */
export const ROBOTICS_MISSION_LIST_DEFAULTS: { readonly defaultLimit: 25; readonly maxLimit: 200 } =
  {
    defaultLimit: 25,
    maxLimit: 200,
  } as const;

/** Default device count limits for robotics summary. */
export const ROBOTICS_SUMMARY_DEVICE_LIMIT_DEFAULTS: {
  readonly defaultLimit: 100;
  readonly maxLimit: 500;
} = {
  defaultLimit: 100,
  maxLimit: 500,
} as const;

/** Min/max bounds for robotics summary device limits. */
export const ROBOTICS_SUMMARY_DEVICE_LIMIT_BOUNDS: {
  readonly defaultLimit: { readonly min: 0; readonly max: 500 };
  readonly maxLimit: { readonly min: 1; readonly max: 2000 };
} = {
  defaultLimit: {
    min: 0,
    max: 500,
  },
  maxLimit: {
    min: 1,
    max: 2000,
  },
} as const;

/** Default robotics fleet summary configuration. */
export const ROBOTICS_SUMMARY_DEFAULTS: {
  readonly includeBunBuddySnapshot: true;
  readonly deviceLimit: { readonly defaultLimit: 100; readonly maxLimit: 500 };
  readonly deviceLimitBounds: {
    readonly defaultLimit: { readonly min: 0; readonly max: 500 };
    readonly maxLimit: { readonly min: 1; readonly max: 2000 };
  };
} = {
  includeBunBuddySnapshot: true,
  deviceLimit: ROBOTICS_SUMMARY_DEVICE_LIMIT_DEFAULTS,
  deviceLimitBounds: ROBOTICS_SUMMARY_DEVICE_LIMIT_BOUNDS,
} as const;
