/**
 * SplatBao waypoint and activity schemas.
 *
 * Defines contract-first TypeBox schemas for spatial waypoints,
 * waypoint activities (scan, inspect, capture, etc.), and waypoint routes.
 *
 * @shared/schemas/splatbao-waypoint-activity
 */

import type { Static, TLiteral, TObject, TOptional, TString, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";
import { SplatbaoPose3DSchema } from "./splatbao-perception.schemas.ts";

// Waypoint status

/**
 * Waypoint execution status.
 */
export const SplatbaoWaypointStatusSchema: TUnion<
  (
    | TLiteral<"planned">
    | TLiteral<"active">
    | TLiteral<"completed">
    | TLiteral<"skipped">
    | TLiteral<"failed">
  )[]
> = TypeExports.Union([
  TypeExports.Literal("planned"),
  TypeExports.Literal("active"),
  TypeExports.Literal("completed"),
  TypeExports.Literal("skipped"),
  TypeExports.Literal("failed"),
]);

/** Type SplatbaoWaypointStatus. */
export type SplatbaoWaypointStatus = Static<typeof SplatbaoWaypointStatusSchema>;

// Waypoint

/**
 * Spatial waypoint record.
 */
export const SplatbaoWaypointSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    pose: SplatbaoPose3DSchema,
    frameId: TypeExports.String({ minLength: 1 }),
    anchorId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    sequenceIndex: TypeExports.Integer({ minimum: 0 }),
    status: SplatbaoWaypointStatusSchema,
    estimatedDurationMs: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    metadata: TypeExports.Optional(JsonObjectSchema),
    createdAt: TypeExports.String({ format: "date-time" }),
    updatedAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoWaypoint. */
export type SplatbaoWaypoint = Static<typeof SplatbaoWaypointSchema>;

/**
 * Create waypoint request.
 */
export const SplatbaoWaypointCreateSchema = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    pose: SplatbaoPose3DSchema,
    frameId: TypeExports.String({ minLength: 1 }),
    anchorId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    sequenceIndex: TypeExports.Integer({ minimum: 0 }),
    estimatedDurationMs: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    metadata: TypeExports.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoWaypointCreate. */
export type SplatbaoWaypointCreate = Static<typeof SplatbaoWaypointCreateSchema>;

// Activity types

/**
 * Activity type for waypoint sub-tasks.
 */
export const SplatbaoActivityTypeSchema: TUnion<
  (
    | TLiteral<"capture">
    | TLiteral<"scan">
    | TLiteral<"inspect">
    | TLiteral<"measure">
    | TLiteral<"navigate">
  )[]
> = TypeExports.Union([
  TypeExports.Literal("capture"),
  TypeExports.Literal("scan"),
  TypeExports.Literal("inspect"),
  TypeExports.Literal("measure"),
  TypeExports.Literal("navigate"),
]);

/** Type SplatbaoActivityType. */
export type SplatbaoActivityType = Static<typeof SplatbaoActivityTypeSchema>;

/**
 * Activity execution status.
 */
export const SplatbaoActivityStatusSchema: TUnion<
  (
    | TLiteral<"pending">
    | TLiteral<"in_progress">
    | TLiteral<"completed">
    | TLiteral<"failed">
    | TLiteral<"cancelled">
  )[]
> = TypeExports.Union([
  TypeExports.Literal("pending"),
  TypeExports.Literal("in_progress"),
  TypeExports.Literal("completed"),
  TypeExports.Literal("failed"),
  TypeExports.Literal("cancelled"),
]);

/** Type SplatbaoActivityStatus. */
export type SplatbaoActivityStatus = Static<typeof SplatbaoActivityStatusSchema>;

// Activity

/**
 * Waypoint activity record.
 */
export const SplatbaoActivitySchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    waypointId: TypeExports.String({ minLength: 1 }),
    activityType: SplatbaoActivityTypeSchema,
    status: SplatbaoActivityStatusSchema,
    startedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    completedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    result: TypeExports.Optional(JsonObjectSchema),
    metadata: TypeExports.Optional(JsonObjectSchema),
    createdAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoActivity. */
export type SplatbaoActivity = Static<typeof SplatbaoActivitySchema>;

/**
 * Create activity request.
 */
export const SplatbaoActivityCreateSchema: TObject<
  {
    readonly waypointId: TString;
    readonly activityType: TUnion<
      (
        | TLiteral<"capture">
        | TLiteral<"scan">
        | TLiteral<"inspect">
        | TLiteral<"measure">
        | TLiteral<"navigate">
      )[]
    >;
    readonly metadata: TOptional<TObject<Record<string, never>, never, never>>;
  },
  "waypointId" | "activityType",
  "metadata"
> = TypeExports.Object(
  {
    waypointId: TypeExports.String({ minLength: 1 }),
    activityType: SplatbaoActivityTypeSchema,
    metadata: TypeExports.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/** Type SplatbaoActivityCreate. */
export type SplatbaoActivityCreate = Static<typeof SplatbaoActivityCreateSchema>;

// Waypoint route

/**
 * Route status.
 */
export const SplatbaoRouteStatusSchema: TUnion<
  (TLiteral<"completed"> | TLiteral<"cancelled"> | TLiteral<"draft"> | TLiteral<"active">)[]
> = TypeExports.Union([
  TypeExports.Literal("draft"),
  TypeExports.Literal("active"),
  TypeExports.Literal("completed"),
  TypeExports.Literal("cancelled"),
]);

/** Type SplatbaoRouteStatus. */
export type SplatbaoRouteStatus = Static<typeof SplatbaoRouteStatusSchema>;

/**
 * Waypoint route record (ordered sequence of waypoints with activities).
 */
export const SplatbaoWaypointRouteSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String({ minLength: 1 }),
    waypoints: TypeExports.Array(SplatbaoWaypointSchema),
    sessionId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    totalDurationMs: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    status: SplatbaoRouteStatusSchema,
    metadata: TypeExports.Optional(JsonObjectSchema),
    createdAt: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Type SplatbaoWaypointRoute. */
export type SplatbaoWaypointRoute = Static<typeof SplatbaoWaypointRouteSchema>;
