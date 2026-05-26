/**
 * Basler-bunbuddy contracts (schemas + types).
 *
 * Canonical TypeBox schemas for the basler-bunbuddy `/capabilities` snapshot and
 * per-camera capture requests consumed by the platform imager pipeline.
 *
 * @shared/schemas/basler-bunbuddy.schemas.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { ImagerImageFormatSchema } from "./imager-source.schemas.ts";

/**
 * Basler-bunbuddy capture configuration advertised in `/capabilities`.
 */
export const BaslerBunBuddyCaptureConfigSchema = TypeExports.Object(
  {
    supportedFormats: TypeExports.Optional(TypeExports.Array(ImagerImageFormatSchema)),
  },
  { additionalProperties: true },
);

/**
 * Basler-bunbuddy runtime configuration block inside `/capabilities`.
 */
export const BaslerBunBuddyRuntimeConfigSchema = TypeExports.Object(
  {
    capture: TypeExports.Optional(BaslerBunBuddyCaptureConfigSchema),
  },
  { additionalProperties: true },
);

/**
 * Basler-bunbuddy `/capabilities` response snapshot.
 */
export const BaslerBunBuddyCapabilitiesSnapshotSchema = TypeExports.Object(
  {
    status: TypeExports.Union([TypeExports.Literal("ok"), TypeExports.Literal("degraded")]),
    service: TypeExports.String({ minLength: 1 }),
    version: TypeExports.String({ minLength: 1 }),
    features: TypeExports.Record(TypeExports.String(), TypeExports.Boolean()),
    endpoints: TypeExports.Array(TypeExports.String()),
    libraries: TypeExports.Record(TypeExports.String(), TypeExports.String()),
    notes: TypeExports.Array(TypeExports.String()),
    config: TypeExports.Optional(BaslerBunBuddyRuntimeConfigSchema),
    timestamp: TypeExports.String(),
  },
  { additionalProperties: true },
);

/**
 * Basler-bunbuddy per-camera capture request body.
 */
export const BaslerBunBuddyCaptureRequestSchema = TypeExports.Object(
  {
    format: TypeExports.Optional(ImagerImageFormatSchema),
    quality: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 100 })),
    width: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
    height: TypeExports.Optional(TypeExports.Integer({ minimum: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the BaslerBunBuddyCapabilitiesSnapshot schema. */
export type BaslerBunBuddyCapabilitiesSnapshot = Static<
  typeof BaslerBunBuddyCapabilitiesSnapshotSchema
>;

/** Inferred type from the BaslerBunBuddyCaptureRequest schema. */
export type BaslerBunBuddyCaptureRequest = Static<typeof BaslerBunBuddyCaptureRequestSchema>;
