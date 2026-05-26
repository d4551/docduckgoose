/**
 * SplatBao waypoint and activity schemas.
 *
 * Defines contract-first TypeBox schemas for spatial waypoints,
 * waypoint activities (scan, inspect, capture, etc.), and waypoint routes.
 *
 * @shared/schemas/splatbao-waypoint-activity
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";
import { SplatbaoPose3DSchema } from "./splatbao-perception.schemas.ts";

// Waypoint status

/**
 * Waypoint execution status.
 */
export const SplatbaoWaypointStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"planned">
    | Type.TLiteral<"active">
    | Type.TLiteral<"completed">
    | Type.TLiteral<"skipped">
    | Type.TLiteral<"failed">
  )[]
> = Type.Union([
  Type.Literal("planned"),
  Type.Literal("active"),
  Type.Literal("completed"),
  Type.Literal("skipped"),
  Type.Literal("failed"),
]);

/** Type SplatbaoWaypointStatus. */
export type SplatbaoWaypointStatus = Static<typeof SplatbaoWaypointStatusSchema>;

// Waypoint

/**
 * Spatial waypoint record.
 */
export const SplatbaoWaypointSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    pose: SplatbaoPose3DSchema,
    frameId: Type.String({ minLength: 1 }),
    anchorId: Type.Optional(Type.String({ minLength: 1 })),
    sequenceIndex: Type.Integer({ minimum: 0 }),
    status: SplatbaoWaypointStatusSchema,
    estimatedDurationMs: Type.Optional(Type.Integer({ minimum: 0 })),
    metadata: Type.Optional(JsonObjectSchema),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoWaypoint. */
export type SplatbaoWaypoint = Static<typeof SplatbaoWaypointSchema>;

/**
 * Create waypoint request.
 */
export const SplatbaoWaypointCreateSchema = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    pose: SplatbaoPose3DSchema,
    frameId: Type.String({ minLength: 1 }),
    anchorId: Type.Optional(Type.String({ minLength: 1 })),
    sequenceIndex: Type.Integer({ minimum: 0 }),
    estimatedDurationMs: Type.Optional(Type.Integer({ minimum: 0 })),
    metadata: Type.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoWaypointCreate. */
export type SplatbaoWaypointCreate = Static<typeof SplatbaoWaypointCreateSchema>;

// Activity types

/**
 * Activity type for waypoint sub-tasks.
 */
export const SplatbaoActivityTypeSchema: Type.TUnion<
  (
    | Type.TLiteral<"capture">
    | Type.TLiteral<"scan">
    | Type.TLiteral<"inspect">
    | Type.TLiteral<"measure">
    | Type.TLiteral<"navigate">
  )[]
> = Type.Union([
  Type.Literal("capture"),
  Type.Literal("scan"),
  Type.Literal("inspect"),
  Type.Literal("measure"),
  Type.Literal("navigate"),
]);

/** Type SplatbaoActivityType. */
export type SplatbaoActivityType = Static<typeof SplatbaoActivityTypeSchema>;

/**
 * Activity execution status.
 */
export const SplatbaoActivityStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"pending">
    | Type.TLiteral<"in_progress">
    | Type.TLiteral<"completed">
    | Type.TLiteral<"failed">
    | Type.TLiteral<"cancelled">
  )[]
> = Type.Union([
  Type.Literal("pending"),
  Type.Literal("in_progress"),
  Type.Literal("completed"),
  Type.Literal("failed"),
  Type.Literal("cancelled"),
]);

/** Type SplatbaoActivityStatus. */
export type SplatbaoActivityStatus = Static<typeof SplatbaoActivityStatusSchema>;

// Activity

/**
 * Waypoint activity record.
 */
export const SplatbaoActivitySchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    waypointId: Type.String({ minLength: 1 }),
    activityType: SplatbaoActivityTypeSchema,
    status: SplatbaoActivityStatusSchema,
    startedAt: Type.Optional(Type.String({ format: "date-time" })),
    completedAt: Type.Optional(Type.String({ format: "date-time" })),
    result: Type.Optional(JsonObjectSchema),
    metadata: Type.Optional(JsonObjectSchema),
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoActivity. */
export type SplatbaoActivity = Static<typeof SplatbaoActivitySchema>;

/**
 * Create activity request.
 */
export const SplatbaoActivityCreateSchema: Type.TObject<
  {
    readonly waypointId: Type.TString;
    readonly activityType: Type.TUnion<
      (
        | Type.TLiteral<"capture">
        | Type.TLiteral<"scan">
        | Type.TLiteral<"inspect">
        | Type.TLiteral<"measure">
        | Type.TLiteral<"navigate">
      )[]
    >;
    readonly metadata: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
  },
  "waypointId" | "activityType",
  "metadata"
> = Type.Object(
  {
    waypointId: Type.String({ minLength: 1 }),
    activityType: SplatbaoActivityTypeSchema,
    metadata: Type.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoActivityCreate. */
export type SplatbaoActivityCreate = Static<typeof SplatbaoActivityCreateSchema>;

// Waypoint route

/**
 * Route status.
 */
export const SplatbaoRouteStatusSchema: Type.TUnion<
  (
    | Type.TLiteral<"completed">
    | Type.TLiteral<"cancelled">
    | Type.TLiteral<"draft">
    | Type.TLiteral<"active">
  )[]
> = Type.Union([
  Type.Literal("draft"),
  Type.Literal("active"),
  Type.Literal("completed"),
  Type.Literal("cancelled"),
]);

/** Type SplatbaoRouteStatus. */
export type SplatbaoRouteStatus = Static<typeof SplatbaoRouteStatusSchema>;

/**
 * Waypoint route record (ordered sequence of waypoints with activities).
 */
export const SplatbaoWaypointRouteSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String({ minLength: 1 }),
    waypoints: Type.Array(SplatbaoWaypointSchema),
    sessionId: Type.Optional(Type.String({ minLength: 1 })),
    totalDurationMs: Type.Optional(Type.Integer({ minimum: 0 })),
    status: SplatbaoRouteStatusSchema,
    metadata: Type.Optional(JsonObjectSchema),
    createdAt: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoWaypointRoute. */
export type SplatbaoWaypointRoute = Static<typeof SplatbaoWaypointRouteSchema>;
