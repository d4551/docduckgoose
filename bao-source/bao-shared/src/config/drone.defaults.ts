/**
 * Drone default configuration values.
 *
 * Provides safe defaults for drone safety policy, offboard control,
 * RTK corrections, flight logging, and video fusion overlays.
 *
 * @shared/config/drone-defaults
 */

import { LOOPBACK_FALLBACK_HOST } from "../constants/loopback-hosts";

/** Default geofence configuration for drone safety boundaries. */
export const DRONE_GEOFENCE_DEFAULTS: {
  enabled: boolean;
  polygons: never[];
  minAltitudeM: number;
  maxAltitudeM: number;
  maxDistanceM: number;
  defaultAction: "return" | "hold" | "land" | "report";
} = {
  enabled: false,
  polygons: [],
  minAltitudeM: 0,
  maxAltitudeM: 120,
  maxDistanceM: 5000,
  defaultAction: "return" as "return" | "hold" | "land" | "report",
};

/** Default rally point configuration for emergency return positions. */
export const DRONE_RALLY_POINTS_DEFAULTS: { enabled: boolean; points: never[] } = {
  enabled: false,
  points: [],
};

/** Default drone safety policy (altitude limits, speed caps, geofence). */
export const DRONE_POLICY_DEFAULTS: {
  enabled: boolean;
  geofence: {
    enabled: boolean;
    polygons: never[];
    minAltitudeM: number;
    maxAltitudeM: number;
    maxDistanceM: number;
    defaultAction: "return" | "hold" | "land" | "report";
  };
  rallyPoints: { enabled: boolean; points: never[] };
  limits: {
    minAltitudeM: number;
    maxAltitudeM: number;
    maxHorizontalSpeedMps: number;
    maxVerticalSpeedMps: number;
    maxYawRateDegS: number;
  };
} = {
  enabled: true,
  geofence: { ...DRONE_GEOFENCE_DEFAULTS },
  rallyPoints: { ...DRONE_RALLY_POINTS_DEFAULTS },
  limits: {
    minAltitudeM: 0,
    maxAltitudeM: 120,
    maxHorizontalSpeedMps: 15,
    maxVerticalSpeedMps: 5,
    maxYawRateDegS: 90,
  },
};

/** Default takeoff parameters (altitude, speed, preflight checks). */
export const DRONE_TAKEOFF_DEFAULTS: { readonly altitudeM: 10 } = {
  /** Default takeoff altitude in meters (when a caller omits a target altitude). */
  altitudeM: 10,
} as const;

/**
 * Default MAVLink protocol settings for drone communication.
 *
 * Used by the drone-bunbuddy to provide safe defaults for MAVLink UDP transport when callers
 * omit host/port (for example, in SITL deployments where the bunbuddy is preconfigured by env).
 */
export const DRONE_UDP_HOST_DEFAULT: "127.0.0.1" = LOOPBACK_FALLBACK_HOST;

/**
 * Default MAVLink protocol settings for drone communication.
 *
 * `udpHost` intentionally defaults to loopback for local SITL/simulator workflows.
 */
export const DRONE_MAVLINK_DEFAULTS: { readonly udpHost: "127.0.0.1"; readonly udpPort: 14550 } = {
  /** Default UDP host for MAVLink connections. */
  udpHost: DRONE_UDP_HOST_DEFAULT,
  /** Default UDP port for MAVLink connections (common GCS port). */
  udpPort: 14550,
} as const;

/** Default offboard control mode settings. */
export const DRONE_OFFBOARD_DEFAULTS: {
  readonly enabled: true;
  readonly maxRateHz: 5;
  readonly maxStaleMs: 1500;
} = {
  enabled: true,
  maxRateHz: 5,
  maxStaleMs: 1500,
} as const;

/** Default sensor streaming configuration (intervals, enabled streams). */
export const DRONE_SENSOR_STREAM_DEFAULTS: {
  readonly defaultRateHz: 10;
  readonly minRateHz: 1;
  readonly maxRateHz: 100;
} = {
  /** Default sensor stream cadence for WebSocket subscribers. */
  defaultRateHz: 10,
  /** Minimum allowed sensor stream rate. */
  minRateHz: 1,
  /** Maximum allowed sensor stream rate. */
  maxRateHz: 100,
} as const;

/** Default RTK (Real-Time Kinematic) correction settings. */
export const DRONE_RTK_DEFAULTS: {
  readonly enabled: false;
  readonly maxAgeMs: 5000;
  readonly allowedFormats: readonly ["rtcm3"];
} = {
  enabled: false,
  maxAgeMs: 5000,
  allowedFormats: ["rtcm3"],
} as const;

/** Default flight log recording configuration. */
export const DRONE_LOG_DEFAULTS: {
  readonly enabled: true;
  readonly retentionHours: 24;
  readonly maxSessions: 50;
  readonly maxBytes: number;
  readonly format: "jsonl";
  readonly exportPrefix: "drone/logs";
  readonly rootDir: "run/drone-logs";
  readonly queue: {
    readonly priority: 6;
    readonly retryLimit: 2;
    readonly retryDelay: 5;
    readonly retryBackoff: true;
    readonly expireInSeconds: 900;
    readonly deadLetter: "drone-log-export-dlq";
    readonly singletonSeconds: 120;
  };
} = {
  enabled: true,
  retentionHours: 24,
  maxSessions: 50,
  maxBytes: 52428800,
  format: "jsonl",
  exportPrefix: "drone/logs",
  rootDir: "run/drone-logs",
  queue: {
    priority: 6,
    retryLimit: 2,
    retryDelay: 5,
    retryBackoff: true,
    expireInSeconds: 900,
    deadLetter: "drone-log-export-dlq",
    singletonSeconds: 120,
  },
} as const;

/** Default drone telemetry history query parameters. */
export const DRONE_HISTORY_DEFAULTS: {
  readonly telemetry: { readonly defaultLimit: 50; readonly maxLimit: 500 };
  readonly events: { readonly defaultLimit: 50; readonly maxLimit: 500 };
  readonly globalEvents: { readonly defaultLimit: 100; readonly maxLimit: 500 };
  readonly listBounds: {
    readonly defaultLimit: { readonly min: 1; readonly max: 500 };
    readonly maxLimit: { readonly min: 1; readonly max: 2000 };
  };
} = {
  telemetry: {
    defaultLimit: 50,
    maxLimit: 500,
  },
  events: {
    defaultLimit: 50,
    maxLimit: 500,
  },
  globalEvents: {
    defaultLimit: 100,
    maxLimit: 500,
  },
  listBounds: {
    defaultLimit: { min: 1, max: 500 },
    maxLimit: { min: 1, max: 2000 },
  },
} as const;

/**
 * Safety limits for the drone mission planner.
 *
 * These limits are used across UI, server validation, and bunbuddy safety checks
 * to avoid drift between mission planning surfaces.
 */
export const DRONE_MISSION_PLANNER_LIMITS: { readonly minWaypoints: 1; readonly maxWaypoints: 12 } =
  {
    /** Minimum waypoints required to submit a mission. */
    minWaypoints: 1,
    /** Maximum waypoints supported by the mission builder. */
    maxWaypoints: 12,
  } as const;

/** Default mission planner UI configuration values. */
export const DRONE_MISSION_PLANNER_DEFAULTS: {
  readonly holdTimeS: 2;
  readonly speedMps: 5;
  readonly namePrefix: "Mission";
  readonly minSafeDistanceM: 1;
  readonly maxRangeM: 50;
  readonly minInterWaypointDistanceM: 0.5;
  readonly defaultOrdering: "user";
  readonly defaultShootMode: "hover";
  readonly gimbalPitchRangeDeg: { readonly min: -90; readonly max: 30 };
  readonly qgc: {
    readonly cruiseSpeedMps: 15;
    readonly hoverSpeedMps: 5;
    readonly firmwareType: 12;
    readonly vehicleType: 2;
  };
  readonly litchi: {
    readonly curveSizeM: 0;
    readonly rotationDir: 0;
    readonly gimbalMode: 2;
    readonly actionType: 1;
    readonly actionParam: 0;
  };
} = {
  /** Default waypoint hold time in seconds. */
  holdTimeS: 2,
  /** Default waypoint speed in meters per second. */
  speedMps: 5,
  /** Default mission name prefix for bunbuddy adapter mapping. */
  namePrefix: "Mission",
  /** Minimum standoff distance from point-of-interest when generating waypoints. */
  minSafeDistanceM: 1,
  /** Maximum standoff range allowed for generated waypoint pairs. */
  maxRangeM: 50,
  /** Warn when consecutive generated waypoints are closer than this threshold. */
  minInterWaypointDistanceM: 0.5,
  /** Default ordering mode for generated mission pairs. */
  defaultOrdering: "user",
  /** Default capture mode for generated mission pairs. */
  defaultShootMode: "hover",
  /** Allowed gimbal pitch range for generated planner outputs. */
  gimbalPitchRangeDeg: {
    min: -90,
    max: 30,
  },
  /** QGroundControl export defaults. */
  qgc: {
    cruiseSpeedMps: 15,
    hoverSpeedMps: 5,
    firmwareType: 12,
    vehicleType: 2,
  },
  /** Litchi CSV export defaults. */
  litchi: {
    curveSizeM: 0,
    rotationDir: 0,
    gimbalMode: 2,
    actionType: 1,
    actionParam: 0,
  },
} as const;

/** Default telemetry history recorder settings. */
export const DRONE_HISTORY_RECORDER_DEFAULTS: {
  readonly enabled: true;
  readonly flushMs: 1500;
  readonly telemetryMinIntervalMs: 1000;
  readonly retentionDays: 7;
  readonly pruneEveryMs: number;
  readonly bounds: {
    readonly flushMs: { readonly min: 250; readonly max: 60000 };
    readonly telemetryMinIntervalMs: { readonly min: 100; readonly max: 60000 };
    readonly retentionDays: { readonly min: 1; readonly max: 90 };
    readonly pruneEveryMs: { readonly min: 60000; readonly max: 3600000 };
  };
} = {
  enabled: true,
  flushMs: 1500,
  telemetryMinIntervalMs: 1000,
  retentionDays: 7,
  pruneEveryMs: 360000,
  bounds: {
    flushMs: { min: 250, max: 60_000 },
    telemetryMinIntervalMs: { min: 100, max: 60_000 },
    retentionDays: { min: 1, max: 90 },
    pruneEveryMs: { min: 60_000, max: 3_600_000 },
  },
} as const;

/** Default video fusion overlay configuration. */
export const DRONE_VIDEO_FUSION_DEFAULTS: {
  enabled: boolean;
  overlays: Array<"telemetry" | "detections" | "geofence" | "rally" | "rtk">;
  telemetryRateHz: number;
  maxLatencyMs: number;
  xrExperienceId: undefined;
  usdAssetId: undefined;
} = {
  enabled: false,
  overlays: ["telemetry"] as Array<"telemetry" | "detections" | "geofence" | "rally" | "rtk">,
  telemetryRateHz: 5,
  maxLatencyMs: 1000,
  xrExperienceId: undefined,
  usdAssetId: undefined,
};
