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

import type { Static, TRecord, TSchema, TString, TUnknown } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Perception camera calibration information (sensor_msgs/CameraInfo subset).
 */
export const PerceptionCameraInfoSchema = TypeExports.Object(
  {
    height: TypeExports.Number(),
    width: TypeExports.Number(),
    distortion_model: TypeExports.String(),
    d: TypeExports.Array(TypeExports.Number()),
    k: TypeExports.Array(TypeExports.Number()),
    r: TypeExports.Array(TypeExports.Number()),
    p: TypeExports.Array(TypeExports.Number()),
    binning_x: TypeExports.Optional(TypeExports.Number()),
    binning_y: TypeExports.Optional(TypeExports.Number()),
    roi: TypeExports.Optional(
      TypeExports.Object(
        {
          x_offset: TypeExports.Number(),
          y_offset: TypeExports.Number(),
          height: TypeExports.Number(),
          width: TypeExports.Number(),
          do_rectify: TypeExports.Boolean(),
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
export const PerceptionCapabilitiesFeaturesSchema = TypeExports.Object(
  {
    ros2Available: TypeExports.Boolean(),
    cvInteropAvailable: TypeExports.Boolean(),
    pclAvailable: TypeExports.Boolean(),
    visionMsgsAvailable: TypeExports.Boolean(),
    visionBunBuddyAvailable: TypeExports.Boolean(),
    processReady: TypeExports.Boolean(),
    simulation: TypeExports.Boolean(),
    imageRectification: TypeExports.Boolean(),
    objectDetection2D: TypeExports.Boolean(),
    objectDetection3D: TypeExports.Boolean(),
    pointCloudFiltering: TypeExports.Boolean(),
    pointCloudAlignment: TypeExports.Boolean(),
    meshReconstruction: TypeExports.Boolean(),
    depthToLaserScan: TypeExports.Boolean(),
    segmentation: TypeExports.Boolean(),
    websocketStreaming: TypeExports.Boolean(),
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
export const PerceptionCapabilitiesResponseSchema = TypeExports.Object(
  {
    status: TypeExports.Union([TypeExports.Literal("ok"), TypeExports.Literal("degraded")]),
    service: TypeExports.String(),
    version: TypeExports.String(),
    features: PerceptionCapabilitiesFeaturesSchema,
    libraries: TypeExports.Record(TypeExports.String(), TypeExports.String()),
    endpoints: TypeExports.Array(TypeExports.String()),
    contracts: TypeExports.Optional(
      TypeExports.Record(
        TypeExports.String(),
        TypeExports.Object(
          {
            method: TypeExports.String(),
            path: TypeExports.String(),
          },
          { additionalProperties: false },
        ),
      ),
    ),
    operations: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.String()),
    ),
    notes: TypeExports.Array(TypeExports.String()),
    timestamp: TypeExports.String(),
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
export const PerceptionHealthResponseSchema = TypeExports.Object(
  {
    status: TypeExports.Union([
      TypeExports.Literal("ok"),
      TypeExports.Literal("degraded"),
      TypeExports.Literal("error"),
    ]),
    service: TypeExports.String(),
    version: TypeExports.String(),
    ros2_available: TypeExports.Boolean(),
    cv_interop_available: TypeExports.Boolean(),
    pcl_available: TypeExports.Boolean(),
    vision_msgs_available: TypeExports.Boolean(),
    simulation: TypeExports.Boolean(),
    process_status: TypeExports.Union([
      TypeExports.Literal("running"),
      TypeExports.Literal("stopped"),
      TypeExports.Literal("error"),
    ]),
    capabilities: PerceptionCapabilitiesResponseSchema,
    timestamp: TypeExports.String(),
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
): ReturnType<typeof TypeExports.Object> {
  return TypeExports.Object(
    {
      ok: TypeExports.Literal(true),
      message: TypeExports.Optional(TypeExports.String()),
      data: dataSchema,
      count: TypeExports.Optional(TypeExports.Number()),
      hasMore: TypeExports.Optional(TypeExports.Boolean()),
      timestamp: TypeExports.String(),
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
export const PerceptionProxyPayloadSchema: TRecord<TString, TUnknown> = TypeExports.Record(
  TypeExports.String(),
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
export const PerceptionSnapshotResponseSchema = TypeExports.Object(
  {
    health: PerceptionHealthResponseSchema,
    capabilities: PerceptionCapabilitiesResponseSchema,
    fetchedAt: TypeExports.String(),
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
