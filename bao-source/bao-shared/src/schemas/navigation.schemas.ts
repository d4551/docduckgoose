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

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
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
export const NavigationStateSchema: Type.TUnion<
  [
    Type.TLiteral<"idle" | "navigating" | "succeeded" | "failed" | "canceled" | "recovering">,
    ...Type.TLiteral<"idle" | "navigating" | "succeeded" | "failed" | "canceled" | "recovering">[],
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
export const FrameIdSchema: Type.TString = Type.String({ minLength: 1 });

// Geometry Types

/**
 * 2D pose schema (x, y, yaw).
 *
 * @remarks
 * Simplified pose for 2D navigation on a plane.
 */
export const Pose2DSchema: Type.TObject<
  { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly yaw: Type.TNumber },
  "x" | "y" | "yaw",
  never
> = Type.Object(
  {
    x: Type.Number({ description: "X position in meters" }),
    y: Type.Number({ description: "Y position in meters" }),
    yaw: Type.Number({ description: "Yaw angle in radians" }),
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
export const Position3DSchema: Type.TObject<
  { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
  "x" | "y" | "z",
  never
> = Type.Object(
  {
    x: Type.Number({ description: "X position in meters" }),
    y: Type.Number({ description: "Y position in meters" }),
    z: Type.Number({ description: "Z position in meters" }),
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
export const QuaternionSchema: Type.TObject<
  {
    readonly w: Type.TNumber;
    readonly x: Type.TNumber;
    readonly y: Type.TNumber;
    readonly z: Type.TNumber;
  },
  "w" | "x" | "y" | "z",
  never
> = Type.Object(
  {
    w: Type.Number({ description: "W component" }),
    x: Type.Number({ description: "X component" }),
    y: Type.Number({ description: "Y component" }),
    z: Type.Number({ description: "Z component" }),
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
export const Pose3DSchema: Type.TObject<
  {
    readonly position: Type.TObject<
      { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly orientation: Type.TObject<
      {
        readonly w: Type.TNumber;
        readonly x: Type.TNumber;
        readonly y: Type.TNumber;
        readonly z: Type.TNumber;
      },
      "x" | "y" | "z" | "w",
      never
    >;
  },
  "position" | "orientation",
  never
> = Type.Object(
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
export const HeaderSchema: Type.TObject<
  {
    readonly frameId: Type.TString;
    readonly stamp: Type.TOptional<
      Type.TObject<
        { readonly sec: Type.TInteger; readonly nanosec: Type.TInteger },
        "sec" | "nanosec",
        never
      >
    >;
  },
  "frameId",
  "stamp"
> = Type.Object(
  {
    frameId: Type.String({ minLength: 1, description: "Coordinate frame ID" }),
    stamp: Type.Optional(
      Type.Object({
        sec: Type.Integer({ description: "Seconds since epoch" }),
        nanosec: Type.Integer({ description: "Nanoseconds component" }),
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
export const PoseStampedSchema: Type.TObject<
  {
    readonly header: Type.TObject<
      {
        readonly frameId: Type.TString;
        readonly stamp: Type.TOptional<
          Type.TObject<
            { readonly sec: Type.TInteger; readonly nanosec: Type.TInteger },
            "sec" | "nanosec",
            never
          >
        >;
      },
      "frameId",
      "stamp"
    >;
    readonly pose: Type.TObject<
      {
        readonly position: Type.TObject<
          { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
          "x" | "y" | "z",
          never
        >;
        readonly orientation: Type.TObject<
          {
            readonly w: Type.TNumber;
            readonly x: Type.TNumber;
            readonly y: Type.TNumber;
            readonly z: Type.TNumber;
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
> = Type.Object(
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
export const NavigationGoalSchema: Type.TObject<
  {
    readonly x: Type.TNumber;
    readonly y: Type.TNumber;
    readonly yaw: Type.TNumber;
    readonly frameId: Type.TOptional<Type.TString>;
    readonly behaviorTree: Type.TOptional<Type.TString>;
  },
  "x" | "y" | "yaw",
  Type.InferOptionalKeys<{
    readonly x: Type.TNumber;
    readonly y: Type.TNumber;
    readonly yaw: Type.TNumber;
    readonly frameId: Type.TOptional<Type.TString>;
    readonly behaviorTree: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    x: Type.Number({ description: "Target X position in meters" }),
    y: Type.Number({ description: "Target Y position in meters" }),
    yaw: Type.Number({ description: "Target yaw angle in radians" }),
    frameId: Type.Optional(Type.String({ default: "map", description: "Coordinate frame ID" })),
    behaviorTree: Type.Optional(Type.String({ description: "Custom behavior tree XML path" })),
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
export const WaypointSchema: Type.TObject<
  {
    readonly id: Type.TOptional<Type.TInteger>;
    readonly x: Type.TNumber;
    readonly y: Type.TNumber;
    readonly yaw: Type.TOptional<Type.TNumber>;
    readonly holdTime: Type.TOptional<Type.TNumber>;
    readonly speed: Type.TOptional<Type.TNumber>;
  },
  "x" | "y",
  Type.InferOptionalKeys<{
    readonly id: Type.TOptional<Type.TInteger>;
    readonly x: Type.TNumber;
    readonly y: Type.TNumber;
    readonly yaw: Type.TOptional<Type.TNumber>;
    readonly holdTime: Type.TOptional<Type.TNumber>;
    readonly speed: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    id: Type.Optional(Type.Integer({ minimum: 0, description: "Waypoint index" })),
    x: Type.Number({ description: "X position in meters" }),
    y: Type.Number({ description: "Y position in meters" }),
    yaw: Type.Optional(Type.Number({ description: "Yaw angle in radians" })),
    holdTime: Type.Optional(
      Type.Number({ minimum: 0, description: "Hold time at waypoint in seconds" }),
    ),
    speed: Type.Optional(Type.Number({ minimum: 0, description: "Target speed in m/s" })),
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
export const NavigationFeedbackSchema = Type.Object(
  {
    currentPose: Pose2DSchema,
    distanceRemaining: Type.Number({ minimum: 0, description: "Distance to goal in meters" }),
    estimatedTimeRemaining: Type.Number({
      minimum: 0,
      description: "Estimated time to goal in seconds",
    }),
    numberOfRecoveries: Type.Integer({ minimum: 0, description: "Recovery behavior count" }),
    navigationTime: Type.Optional(
      Type.Number({ minimum: 0, description: "Time navigating in seconds" }),
    ),
    speed: Type.Optional(Type.Number({ minimum: 0, description: "Current speed in m/s" })),
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
export const NavigationResultSchema: Type.TObject<
  {
    readonly success: Type.TBoolean;
    readonly error: Type.TOptional<Type.TString>;
    readonly totalTime: Type.TNumber;
    readonly distanceTraveled: Type.TOptional<Type.TNumber>;
    readonly finalPose: Type.TOptional<
      Type.TObject<
        { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly yaw: Type.TNumber },
        "x" | "y" | "yaw",
        never
      >
    >;
  },
  "success" | "totalTime",
  Type.InferOptionalKeys<{
    readonly success: Type.TBoolean;
    readonly error: Type.TOptional<Type.TString>;
    readonly totalTime: Type.TNumber;
    readonly distanceTraveled: Type.TOptional<Type.TNumber>;
    readonly finalPose: Type.TOptional<
      Type.TObject<
        { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly yaw: Type.TNumber },
        "x" | "y" | "yaw",
        never
      >
    >;
  }>
> = Type.Object(
  {
    success: Type.Boolean({ description: "Whether navigation succeeded" }),
    error: Type.Optional(Type.String({ description: "Error message if failed" })),
    totalTime: Type.Number({ minimum: 0, description: "Total navigation time in seconds" }),
    distanceTraveled: Type.Optional(
      Type.Number({ minimum: 0, description: "Distance traveled in meters" }),
    ),
    finalPose: Type.Optional(Pose2DSchema),
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
export const PathSchema = Type.Object(
  {
    header: HeaderSchema,
    poses: Type.Array(PoseStampedSchema, { description: "Sequence of poses" }),
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
export const CostmapMetadataSchema: Type.TObject<
  {
    readonly resolution: Type.TNumber;
    readonly width: Type.TInteger;
    readonly height: Type.TInteger;
    readonly originX: Type.TNumber;
    readonly originY: Type.TNumber;
    readonly originYaw: Type.TOptional<Type.TNumber>;
  },
  "resolution" | "width" | "height" | "originX" | "originY",
  "originYaw"
> = Type.Object(
  {
    resolution: Type.Number({ minimum: 0, description: "Map resolution in meters/cell" }),
    width: Type.Integer({ minimum: 0, description: "Map width in cells" }),
    height: Type.Integer({ minimum: 0, description: "Map height in cells" }),
    originX: Type.Number({ description: "Origin X position" }),
    originY: Type.Number({ description: "Origin Y position" }),
    originYaw: Type.Optional(Type.Number({ description: "Origin yaw angle" })),
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
export const CostmapSchema: Type.TObject<
  {
    readonly metadata: Type.TObject<
      {
        readonly resolution: Type.TNumber;
        readonly width: Type.TInteger;
        readonly height: Type.TInteger;
        readonly originX: Type.TNumber;
        readonly originY: Type.TNumber;
        readonly originYaw: Type.TOptional<Type.TNumber>;
      },
      "resolution" | "width" | "height" | "originX" | "originY",
      "originYaw"
    >;
    readonly data: Type.TArray<Type.TInteger>;
    readonly timestamp: Type.TOptional<Type.TString>;
  },
  "data" | "metadata",
  "timestamp"
> = Type.Object(
  {
    metadata: CostmapMetadataSchema,
    data: Type.Array(Type.Integer({ minimum: 0, maximum: 255 }), {
      description: "Flattened costmap data (row-major)",
    }),
    timestamp: Type.Optional(Type.String({ description: "ISO 8601 timestamp" })),
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
export const TwistSchema: Type.TObject<
  {
    readonly linear: Type.TObject<
      { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
      "x" | "y" | "z",
      never
    >;
    readonly angular: Type.TObject<
      { readonly x: Type.TNumber; readonly y: Type.TNumber; readonly z: Type.TNumber },
      "x" | "y" | "z",
      never
    >;
  },
  "linear" | "angular",
  never
> = Type.Object(
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
export const OdometrySchema = Type.Object(
  {
    header: HeaderSchema,
    childFrameId: Type.String({ description: "Child frame ID (usually base_link)" }),
    pose: Pose3DSchema,
    twist: TwistSchema,
    poseCovariance: Type.Optional(
      Type.Array(Type.Number(), { description: "6x6 pose covariance matrix (row-major)" }),
    ),
    twistCovariance: Type.Optional(
      Type.Array(Type.Number(), { description: "6x6 twist covariance matrix (row-major)" }),
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
export const NavigationStatusSchema = Type.Object(
  {
    state: NavigationStateSchema,
    currentGoal: Type.Optional(NavigationGoalSchema),
    feedback: Type.Optional(NavigationFeedbackSchema),
    lastResult: Type.Optional(NavigationResultSchema),
    plannerActive: Type.Boolean({ description: "Whether planner server is active" }),
    controllerActive: Type.Boolean({ description: "Whether controller server is active" }),
    recoveryActive: Type.Boolean({ description: "Whether recovery server is active" }),
    timestamp: Type.String({ description: "ISO 8601 timestamp" }),
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
