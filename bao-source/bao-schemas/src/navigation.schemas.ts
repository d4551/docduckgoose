/**
 * Navigation Schemas
 *
 * Defines TypeBox schemas for ROS2 Navigation2 integration including goals,
 * paths, costmaps, and navigation feedback. Also includes common navigation
 * types used across drones and ground robots.
 *
 * @shared/schemas/navigation.ts
 *
 * @remarks
 * These schemas are based on:
 * - ROS2 Navigation2 (nav2_msgs)
 * - ROS2 geometry_msgs (Pose, PoseStamped, Path)
 * - ROS2 nav_msgs (OccupancyGrid, Path)
 *
 * @example
 * ```typescript
 * import { NavigationGoalSchema, PathSchema } from '@baohaus/bao-schemas/navigation.ts';
 * import type { NavigationGoal, Path } from '@baohaus/bao-schemas/navigation.ts';
 *
 * const goal: NavigationGoal = {
 *   x: 5.0, *   y: 3.0, *   yaw: 1.57, *   frameId: 'map', * };
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
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { Vector3DSchema } from "./sensor.schemas.ts";

// Navigation States

/**
 * Navigation execution states.
 *
 * @remarks
 * Based on Nav2 BT node status and action server states.
 */
export const NAVIGATION_STATES: readonly [
  "idle",
  "navigating",
  "succeeded",
  "failed",
  "canceled",
  "recovering",
] = ["idle", "navigating", "succeeded", "failed", "canceled", "recovering"] as const;

/**
 * Type-safe navigation state enumeration.
 */
export type NavigationState = (typeof NAVIGATION_STATES)[number];

/**
 * Navigation state schema.
 */
export const NavigationStateSchema: TUnion<
  [
    TLiteral<"idle" | "navigating" | "succeeded" | "failed" | "canceled" | "recovering">,
    ...TLiteral<"idle" | "navigating" | "succeeded" | "failed" | "canceled" | "recovering">[],
  ]
> = stringEnum(NAVIGATION_STATES, {});

// Coordinate Frame IDs

/**
 * Common coordinate frame IDs.
 *
 * @remarks
 * Standard ROS2 TF frame names used in navigation.
 */
export const FRAME_IDS: readonly ["map", "odom", "base_link", "base_footprint", "world"] = [
  "map",
  "odom",
  "base_link",
  "base_footprint",
  "world",
] as const;

/**
 * Type-safe frame ID enumeration.
 */
export type FrameId = (typeof FRAME_IDS)[number];

/**
 * Frame ID schema (allows custom frame IDs).
 */
export const FrameIdSchema: TString = TypeExports.String({ minLength: 1 });

// Geometry Types

/**
 * 2D pose schema (x, y, yaw).
 *
 * @remarks
 * Simplified pose for 2D navigation on a plane.
 */
export const Pose2DSchema: TObject<
  { readonly x: TNumber; readonly y: TNumber; readonly yaw: TNumber },
  "x" | "y" | "yaw",
  never
> = TypeExports.Object(
  {
    x: TypeExports.Number({ description: "X position in meters" }),
    y: TypeExports.Number({ description: "Y position in meters" }),
    yaw: TypeExports.Number({ description: "Yaw angle in radians" }),
  },
  {},
);

/**
 * TypeScript type for 2D pose.
 */
export type Pose2D = Static<typeof Pose2DSchema>;

/**
 * 3D position schema.
 *
 * @remarks
 * Based on geometry_msgs/Point.
 */
export const Position3DSchema: TObject<
  { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
  "x" | "y" | "z",
  never
> = TypeExports.Object(
  {
    x: TypeExports.Number({ description: "X position in meters" }),
    y: TypeExports.Number({ description: "Y position in meters" }),
    z: TypeExports.Number({ description: "Z position in meters" }),
  },
  {},
);

/**
 * TypeScript type for 3D position.
 */
export type Position3D = Static<typeof Position3DSchema>;

/**
 * Quaternion orientation schema.
 *
 * @remarks
 * Based on geometry_msgs/Quaternion.
 */
export const QuaternionSchema: TObject<
  {
    readonly w: TNumber;
    readonly x: TNumber;
    readonly y: TNumber;
    readonly z: TNumber;
  },
  "w" | "x" | "y" | "z",
  never
> = TypeExports.Object(
  {
    w: TypeExports.Number({ description: "W component" }),
    x: TypeExports.Number({ description: "X component" }),
    y: TypeExports.Number({ description: "Y component" }),
    z: TypeExports.Number({ description: "Z component" }),
  },
  {},
);

/**
 * TypeScript type for quaternion.
 */
export type Quaternion = Static<typeof QuaternionSchema>;

/**
 * Full 3D pose schema.
 *
 * @remarks
 * Based on geometry_msgs/Pose.
 */
export const Pose3DSchema: TObject<
  {
    readonly position: TObject<
      { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly orientation: TObject<
      {
        readonly w: TNumber;
        readonly x: TNumber;
        readonly y: TNumber;
        readonly z: TNumber;
      },
      "x" | "y" | "z" | "w",
      never
    >;
  },
  "position" | "orientation",
  never
> = TypeExports.Object(
  {
    position: Position3DSchema,
    orientation: QuaternionSchema,
  },
  {},
);

/**
 * TypeScript type for 3D pose.
 */
export type Pose3D = Static<typeof Pose3DSchema>;

/**
 * ROS2 header schema.
 *
 * @remarks
 * Based on std_msgs/Header.
 */
export const HeaderSchema: TObject<
  {
    readonly frameId: TString;
    readonly stamp: TOptional<
      TObject<{ readonly sec: TInteger; readonly nanosec: TInteger }, "sec" | "nanosec", never>
    >;
  },
  "frameId",
  "stamp"
> = TypeExports.Object(
  {
    frameId: TypeExports.String({ minLength: 1, description: "Coordinate frame ID" }),
    stamp: TypeExports.Optional(
      TypeExports.Object({
        sec: TypeExports.Integer({ description: "Seconds since epoch" }),
        nanosec: TypeExports.Integer({ description: "Nanoseconds component" }),
      }),
    ),
  },
  {},
);

/**
 * TypeScript type for header.
 */
export type Header = Static<typeof HeaderSchema>;

/**
 * Stamped pose schema.
 *
 * @remarks
 * Based on geometry_msgs/PoseStamped.
 */
export const PoseStampedSchema: TObject<
  {
    readonly header: TObject<
      {
        readonly frameId: TString;
        readonly stamp: TOptional<
          TObject<{ readonly sec: TInteger; readonly nanosec: TInteger }, "sec" | "nanosec", never>
        >;
      },
      "frameId",
      "stamp"
    >;
    readonly pose: TObject<
      {
        readonly position: TObject<
          { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
          "x" | "y" | "z",
          never
        >;
        readonly orientation: TObject<
          {
            readonly w: TNumber;
            readonly x: TNumber;
            readonly y: TNumber;
            readonly z: TNumber;
          },
          "x" | "y" | "z" | "w",
          never
        >;
      },
      "position" | "orientation",
      never
    >;
  },
  "header" | "pose",
  never
> = TypeExports.Object(
  {
    header: HeaderSchema,
    pose: Pose3DSchema,
  },
  {},
);

/**
 * TypeScript type for stamped pose.
 */
export type PoseStamped = Static<typeof PoseStampedSchema>;

// Navigation Goal

/**
 * Navigation goal schema.
 *
 * @remarks
 * Simplified navigation goal with optional behavior tree specification.
 * Compatible with nav2_msgs/action/NavigateToPose.
 */
export const NavigationGoalSchema: TObject<
  {
    readonly x: TNumber;
    readonly y: TNumber;
    readonly yaw: TNumber;
    readonly frameId: TOptional<TString>;
    readonly behaviorTree: TOptional<TString>;
  },
  "x" | "y" | "yaw",
  InferOptionalKeys<{
    readonly x: TNumber;
    readonly y: TNumber;
    readonly yaw: TNumber;
    readonly frameId: TOptional<TString>;
    readonly behaviorTree: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    x: TypeExports.Number({ description: "Target X position in meters" }),
    y: TypeExports.Number({ description: "Target Y position in meters" }),
    yaw: TypeExports.Number({ description: "Target yaw angle in radians" }),
    frameId: TypeExports.Optional(
      TypeExports.String({ default: "map", description: "Coordinate frame ID" }),
    ),
    behaviorTree: TypeExports.Optional(
      TypeExports.String({ description: "Custom behavior tree XML path" }),
    ),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for navigation goal.
 */
export type NavigationGoal = Static<typeof NavigationGoalSchema>;

// Waypoint

/**
 * Navigation waypoint schema.
 *
 * @remarks
 * Single waypoint for waypoint following. Compatible with
 * nav2_msgs/action/FollowWaypoints.
 */
export const WaypointSchema: TObject<
  {
    readonly id: TOptional<TInteger>;
    readonly x: TNumber;
    readonly y: TNumber;
    readonly yaw: TOptional<TNumber>;
    readonly holdTime: TOptional<TNumber>;
    readonly speed: TOptional<TNumber>;
  },
  "x" | "y",
  InferOptionalKeys<{
    readonly id: TOptional<TInteger>;
    readonly x: TNumber;
    readonly y: TNumber;
    readonly yaw: TOptional<TNumber>;
    readonly holdTime: TOptional<TNumber>;
    readonly speed: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    id: TypeExports.Optional(TypeExports.Integer({ minimum: 0, description: "Waypoint index" })),
    x: TypeExports.Number({ description: "X position in meters" }),
    y: TypeExports.Number({ description: "Y position in meters" }),
    yaw: TypeExports.Optional(TypeExports.Number({ description: "Yaw angle in radians" })),
    holdTime: TypeExports.Optional(
      TypeExports.Number({ minimum: 0, description: "Hold time at waypoint in seconds" }),
    ),
    speed: TypeExports.Optional(
      TypeExports.Number({ minimum: 0, description: "Target speed in m/s" }),
    ),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for waypoint.
 */
export type Waypoint = Static<typeof WaypointSchema>;

// Navigation Feedback

/**
 * Navigation feedback schema.
 *
 * @remarks
 * Real-time navigation progress information from Nav2 action server.
 */
export const NavigationFeedbackSchema = TypeExports.Object(
  {
    currentPose: Pose2DSchema,
    distanceRemaining: TypeExports.Number({
      minimum: 0,
      description: "Distance to goal in meters",
    }),
    estimatedTimeRemaining: TypeExports.Number({
      minimum: 0,
      description: "Estimated time to goal in seconds",
    }),
    numberOfRecoveries: TypeExports.Integer({ minimum: 0, description: "Recovery behavior count" }),
    navigationTime: TypeExports.Optional(
      TypeExports.Number({ minimum: 0, description: "Time navigating in seconds" }),
    ),
    speed: TypeExports.Optional(
      TypeExports.Number({ minimum: 0, description: "Current speed in m/s" }),
    ),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for navigation feedback.
 */
export type NavigationFeedback = Static<typeof NavigationFeedbackSchema>;

// Navigation Result

/**
 * Navigation result schema.
 *
 * @remarks
 * Final result from Nav2 action server after navigation completes.
 */
export const NavigationResultSchema: TObject<
  {
    readonly success: TBoolean;
    readonly error: TOptional<TString>;
    readonly totalTime: TNumber;
    readonly distanceTraveled: TOptional<TNumber>;
    readonly finalPose: TOptional<
      TObject<
        { readonly x: TNumber; readonly y: TNumber; readonly yaw: TNumber },
        "x" | "y" | "yaw",
        never
      >
    >;
  },
  "success" | "totalTime",
  InferOptionalKeys<{
    readonly success: TBoolean;
    readonly error: TOptional<TString>;
    readonly totalTime: TNumber;
    readonly distanceTraveled: TOptional<TNumber>;
    readonly finalPose: TOptional<
      TObject<
        { readonly x: TNumber; readonly y: TNumber; readonly yaw: TNumber },
        "x" | "y" | "yaw",
        never
      >
    >;
  }>
> = TypeExports.Object(
  {
    success: TypeExports.Boolean({ description: "Whether navigation succeeded" }),
    error: TypeExports.Optional(TypeExports.String({ description: "Error message if failed" })),
    totalTime: TypeExports.Number({ minimum: 0, description: "Total navigation time in seconds" }),
    distanceTraveled: TypeExports.Optional(
      TypeExports.Number({ minimum: 0, description: "Distance traveled in meters" }),
    ),
    finalPose: TypeExports.Optional(Pose2DSchema),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for navigation result.
 */
export type NavigationResult = Static<typeof NavigationResultSchema>;

// Path

/**
 * Navigation path schema.
 *
 * @remarks
 * Based on nav_msgs/Path. Represents a sequence of poses forming a path.
 */
export const PathSchema = TypeExports.Object(
  {
    header: HeaderSchema,
    poses: TypeExports.Array(PoseStampedSchema, { description: "Sequence of poses" }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for path.
 */
export type Path = Static<typeof PathSchema>;

// Costmap

/**
 * Costmap metadata schema.
 *
 * @remarks
 * Based on nav_msgs/MapMetaData.
 */
export const CostmapMetadataSchema: TObject<
  {
    readonly resolution: TNumber;
    readonly width: TInteger;
    readonly height: TInteger;
    readonly originX: TNumber;
    readonly originY: TNumber;
    readonly originYaw: TOptional<TNumber>;
  },
  "resolution" | "width" | "height" | "originX" | "originY",
  "originYaw"
> = TypeExports.Object(
  {
    resolution: TypeExports.Number({ minimum: 0, description: "Map resolution in meters/cell" }),
    width: TypeExports.Integer({ minimum: 0, description: "Map width in cells" }),
    height: TypeExports.Integer({ minimum: 0, description: "Map height in cells" }),
    originX: TypeExports.Number({ description: "Origin X position" }),
    originY: TypeExports.Number({ description: "Origin Y position" }),
    originYaw: TypeExports.Optional(TypeExports.Number({ description: "Origin yaw angle" })),
  },
  {},
);

/**
 * TypeScript type for costmap metadata.
 */
export type CostmapMetadata = Static<typeof CostmapMetadataSchema>;

/**
 * Costmap schema.
 *
 * @remarks
 * Based on nav2_msgs/msg/Costmap and nav_msgs/OccupancyGrid.
 * Data is a flattened array of cost values (0-254, 255 = unknown).
 */
export const CostmapSchema: TObject<
  {
    readonly metadata: TObject<
      {
        readonly resolution: TNumber;
        readonly width: TInteger;
        readonly height: TInteger;
        readonly originX: TNumber;
        readonly originY: TNumber;
        readonly originYaw: TOptional<TNumber>;
      },
      "resolution" | "width" | "height" | "originX" | "originY",
      "originYaw"
    >;
    readonly data: TArray<TInteger>;
    readonly timestamp: TOptional<TString>;
  },
  "data" | "metadata",
  "timestamp"
> = TypeExports.Object(
  {
    metadata: CostmapMetadataSchema,
    data: TypeExports.Array(TypeExports.Integer({ minimum: 0, maximum: 255 }), {
      description: "Flattened costmap data (row-major)",
    }),
    timestamp: TypeExports.Optional(TypeExports.String({ description: "ISO 8601 timestamp" })),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for costmap.
 */
export type Costmap = Static<typeof CostmapSchema>;

// Velocity Commands

/**
 * Twist/velocity command schema.
 *
 * @remarks
 * Based on geometry_msgs/Twist. Used for direct velocity control.
 */
export const TwistSchema: TObject<
  {
    readonly linear: TObject<
      { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly angular: TObject<
      { readonly x: TNumber; readonly y: TNumber; readonly z: TNumber },
      "x" | "y" | "z",
      never
    >;
  },
  "linear" | "angular",
  never
> = TypeExports.Object(
  {
    linear: Vector3DSchema,
    angular: Vector3DSchema,
  },
  {},
);

/**
 * TypeScript type for twist.
 */
export type Twist = Static<typeof TwistSchema>;

// Odometry

/**
 * Odometry schema.
 *
 * @remarks
 * Based on nav_msgs/Odometry. Provides pose and velocity estimation.
 */
export const OdometrySchema = TypeExports.Object(
  {
    header: HeaderSchema,
    childFrameId: TypeExports.String({ description: "Child frame ID (usually base_link)" }),
    pose: Pose3DSchema,
    twist: TwistSchema,
    poseCovariance: TypeExports.Optional(
      TypeExports.Array(TypeExports.Number(), {
        description: "6x6 pose covariance matrix (row-major)",
      }),
    ),
    twistCovariance: TypeExports.Optional(
      TypeExports.Array(TypeExports.Number(), {
        description: "6x6 twist covariance matrix (row-major)",
      }),
    ),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for odometry.
 */
export type Odometry = Static<typeof OdometrySchema>;

// Navigation Status

/**
 * Aggregated navigation status schema.
 *
 * @remarks
 * Combined status for monitoring navigation system health.
 */
export const NavigationStatusSchema = TypeExports.Object(
  {
    state: NavigationStateSchema,
    currentGoal: TypeExports.Optional(NavigationGoalSchema),
    feedback: TypeExports.Optional(NavigationFeedbackSchema),
    lastResult: TypeExports.Optional(NavigationResultSchema),
    plannerActive: TypeExports.Boolean({ description: "Whether planner server is active" }),
    controllerActive: TypeExports.Boolean({ description: "Whether controller server is active" }),
    recoveryActive: TypeExports.Boolean({ description: "Whether recovery server is active" }),
    timestamp: TypeExports.String({ description: "ISO 8601 timestamp" }),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for navigation status.
 */
export type NavigationStatus = Static<typeof NavigationStatusSchema>;

// Helper Functions

/**
 * Convert yaw angle to quaternion.
 *
 * @param yaw - Yaw angle in radians.
 * @returns Quaternion representing the yaw rotation.
 */
export function quaternionFromYaw(yaw: number): Quaternion {
  const halfYaw = yaw / 2;
  return {
    w: Math.cos(halfYaw),
    x: 0,
    y: 0,
    z: Math.sin(halfYaw),
  };
}

/**
 * Extract yaw from quaternion.
 *
 * @param q - Quaternion orientation.
 * @returns Yaw angle in radians.
 */
export function yawFromQuaternion(q: Quaternion): number {
  const sinYaw = 2 * (q.w * q.z + q.x * q.y);
  const cosYaw = 1 - 2 * (q.y * q.y + q.z * q.z);
  return Math.atan2(sinYaw, cosYaw);
}

/**
 * Calculate Euclidean distance between two 2D poses.
 *
 * @param a - First pose.
 * @param b - Second pose.
 * @returns Distance in meters.
 */
export function distance2D(a: Pose2D, b: Pose2D): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Convert Pose2D to NavigationGoal.
 *
 * @param pose - 2D pose.
 * @param frameId - Coordinate frame ID (default: 'map').
 * @returns Navigation goal.
 */
export function pose2DToGoal(pose: Pose2D, frameId = "map"): NavigationGoal {
  return {
    x: pose.x,
    y: pose.y,
    yaw: pose.yaw,
    frameId,
  };
}
