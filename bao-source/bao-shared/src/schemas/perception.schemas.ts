/**
 * Perception (ROS2) shared schemas.
 *
 * Canonical baobox schemas for the Perception bunbuddy and its Elysia proxy routes.
 * These schemas prevent contract drift between:
 * - Perception bunbuddy (Bun/Elysia)
 * - Server API proxy (Bun/Elysia)
 * - HTML client (Eden treaty)
 *
 * @shared/schemas/perception
 */

import type { Static, TSchema } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Perception camera calibration information (sensor_msgs/CameraInfo subset).
 */
export const PerceptionCameraInfoSchema = Type.Object(
  {
    height: Type.Number(),
    width: Type.Number(),
    distortion_model: Type.String(),
    d: Type.Array(Type.Number()),
    k: Type.Array(Type.Number()),
    r: Type.Array(Type.Number()),
    p: Type.Array(Type.Number()),
    binning_x: Type.Optional(Type.Number()),
    binning_y: Type.Optional(Type.Number()),
    roi: Type.Optional(
      Type.Object(
        {
          x_offset: Type.Number(),
          y_offset: Type.Number(),
          height: Type.Number(),
          width: Type.Number(),
          do_rectify: Type.Boolean(),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link PerceptionCameraInfoSchema}.
 */
export type PerceptionCameraInfo = Static<typeof PerceptionCameraInfoSchema>;

/**
 * Perception capabilities feature flags schema.
 */
export const PerceptionCapabilitiesFeaturesSchema = Type.Object(
  {
    ros2Available: Type.Boolean(),
    cvInteropAvailable: Type.Boolean(),
    pclAvailable: Type.Boolean(),
    visionMsgsAvailable: Type.Boolean(),
    visionBunBuddyAvailable: Type.Boolean(),
    processReady: Type.Boolean(),
    simulation: Type.Boolean(),
    imageRectification: Type.Boolean(),
    objectDetection2D: Type.Boolean(),
    objectDetection3D: Type.Boolean(),
    pointCloudFiltering: Type.Boolean(),
    pointCloudAlignment: Type.Boolean(),
    meshReconstruction: Type.Boolean(),
    depthToLaserScan: Type.Boolean(),
    segmentation: Type.Boolean(),
    websocketStreaming: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link PerceptionCapabilitiesFeaturesSchema}.
 */
export type PerceptionCapabilitiesFeatures = Static<typeof PerceptionCapabilitiesFeaturesSchema>;

/**
 * Perception capabilities response schema (bunbuddy payload).
 */
export const PerceptionCapabilitiesResponseSchema = Type.Object(
  {
    status: Type.Union([Type.Literal("ok"), Type.Literal("degraded")]),
    service: Type.String(),
    version: Type.String(),
    features: PerceptionCapabilitiesFeaturesSchema,
    libraries: Type.Record(Type.String(), Type.String()),
    endpoints: Type.Array(Type.String()),
    contracts: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Object(
          {
            method: Type.String(),
            path: Type.String(),
          },
          { additionalProperties: false },
        ),
      ),
    ),
    operations: Type.Optional(Type.Record(Type.String(), Type.String())),
    notes: Type.Array(Type.String()),
    timestamp: Type.String(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link PerceptionCapabilitiesResponseSchema}.
 */
export type PerceptionCapabilitiesResponse = Static<typeof PerceptionCapabilitiesResponseSchema>;

/**
 * Perception health response schema (bunbuddy payload).
 */
export const PerceptionHealthResponseSchema = Type.Object(
  {
    status: Type.Union([Type.Literal("ok"), Type.Literal("degraded"), Type.Literal("error")]),
    service: Type.String(),
    version: Type.String(),
    ros2_available: Type.Boolean(),
    cv_interop_available: Type.Boolean(),
    pcl_available: Type.Boolean(),
    vision_msgs_available: Type.Boolean(),
    simulation: Type.Boolean(),
    process_status: Type.Union([
      Type.Literal("running"),
      Type.Literal("stopped"),
      Type.Literal("error"),
    ]),
    capabilities: PerceptionCapabilitiesResponseSchema,
    timestamp: Type.String(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link PerceptionHealthResponseSchema}.
 */
export type PerceptionHealthResponse = Static<typeof PerceptionHealthResponseSchema>;

/**
 * Standard API `ok:true` envelope schema with required `data`.
 *
 * @param dataSchema - Schema for the nested `data` payload.
 * @param id - Optional $id for the resulting schema.
 * @returns baobox schema for `{ ok:true, data:T, timestamp:string, ... }`.
 */
export function createApiOkDataSchema<TDataSchema extends TSchema>(
  dataSchema: TDataSchema,
): ReturnType<typeof Type.Object> {
  return Type.Object(
    {
      ok: Type.Literal(true),
      message: Type.Optional(Type.String()),
      data: dataSchema,
      count: Type.Optional(Type.Number()),
      hasMore: Type.Optional(Type.Boolean()),
      timestamp: Type.String(),
    },
    {
      additionalProperties: JsonValueSchema,
    },
  );
}

/**
 * Server API response schema for `/api/v1/perception/capabilities`.
 */
export const PerceptionCapabilitiesApiResponseSchema = createApiOkDataSchema(
  PerceptionCapabilitiesResponseSchema,
);

/**
 * TypeScript type for {@link PerceptionCapabilitiesApiResponseSchema}.
 */
export type PerceptionCapabilitiesApiResponse = Static<
  typeof PerceptionCapabilitiesApiResponseSchema
>;

/**
 * Server API response schema for `/api/v1/perception/health`.
 */
export const PerceptionHealthApiResponseSchema = createApiOkDataSchema(
  PerceptionHealthResponseSchema,
);

/**
 * TypeScript type for {@link PerceptionHealthApiResponseSchema}.
 */
export type PerceptionHealthApiResponse = Static<typeof PerceptionHealthApiResponseSchema>;

/**
 * Generic perception bunbuddy payload schema for dynamic operation responses.
 *
 * Used by proxy routes that forward structured JSON objects from the perception
 * bunbuddy (metrics, diagnostics, image, point-cloud, and depth operations).
 */
export const PerceptionProxyPayloadSchema: Type.TRecord<Type.TString, Type.TUnknown> = Type.Record(
  Type.String(),
  JsonValueSchema,
  {
    description: "Dynamic JSON object payload returned by perception bunbuddy operations",
  },
);

/**
 * TypeScript type for {@link PerceptionProxyPayloadSchema}.
 */
export type PerceptionProxyPayload = Static<typeof PerceptionProxyPayloadSchema>;

/**
 * Server API response schema for perception proxy operation endpoints.
 */
export const PerceptionProxyApiResponseSchema = createApiOkDataSchema(PerceptionProxyPayloadSchema);

/**
 * TypeScript type for {@link PerceptionProxyApiResponseSchema}.
 */
export type PerceptionProxyApiResponse = Static<typeof PerceptionProxyApiResponseSchema>;

/**
 * Perception snapshot payload returned by the server.
 *
 * This bundles the health + capabilities payloads into a single fetch so clients can
 * SSR-hydrate deterministically without duplicating parallel requests.
 */
export const PerceptionSnapshotResponseSchema = Type.Object(
  {
    health: PerceptionHealthResponseSchema,
    capabilities: PerceptionCapabilitiesResponseSchema,
    fetchedAt: Type.String(),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link PerceptionSnapshotResponseSchema}.
 */
export type PerceptionSnapshotResponse = Static<typeof PerceptionSnapshotResponseSchema>;

/**
 * Server API response schema for the perception snapshot endpoint.
 */
export const PerceptionSnapshotApiResponseSchema = createApiOkDataSchema(
  PerceptionSnapshotResponseSchema,
);

/**
 * TypeScript type for {@link PerceptionSnapshotApiResponseSchema}.
 */
export type PerceptionSnapshotApiResponse = Static<typeof PerceptionSnapshotApiResponseSchema>;
