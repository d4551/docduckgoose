/**
 * Hardware summary schemas.
 *
 * Defines contract-first schemas for the aggregated hardware summary payload
 * used by dashboard and integration UIs.
 *
 * @shared/schemas/hardware-summary
 */

import type { Static, TInteger, TObject, TOptional } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { BunBuddyCapabilitiesSnapshotsResponseSchema } from "./bunbuddy-capability-snapshot.schemas.ts";

/**
 * Generic hardware status envelope schema.
 */
export const HardwareStatusEnvelopeSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    timestamp: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    error: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    baseUrl: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
    code: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    message: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    count: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    data: TypeExports.Optional(TypeExports.Unknown()),
    status: TypeExports.Optional(TypeExports.Unknown()),
    services: TypeExports.Optional(TypeExports.Unknown()),
    latest: TypeExports.Optional(TypeExports.Unknown()),
    devices: TypeExports.Optional(TypeExports.Unknown()),
    dicom: TypeExports.Optional(TypeExports.Unknown()),
    details: TypeExports.Optional(TypeExports.Unknown()),
    errors: TypeExports.Optional(TypeExports.Array(TypeExports.Unknown())),
  },
  {
    additionalProperties: true,
    description: "Generic hardware status envelope",
  },
);

/**
 * Request schema for the hardware summary endpoint.
 */
export const HardwareSummaryRequestSchema: TObject<
  { readonly timeoutMs: TOptional<TInteger> },
  never,
  "timeoutMs"
> = TypeExports.Object(
  {
    timeoutMs: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/**
 * Response schema for the hardware summary endpoint.
 */
export const HardwareSummaryResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: TypeExports.Object(
      {
        lighting: TypeExports.Union([HardwareStatusEnvelopeSchema, TypeExports.Null()]),
        imager: TypeExports.Union([HardwareStatusEnvelopeSchema, TypeExports.Null()]),
        calibration: TypeExports.Union([HardwareStatusEnvelopeSchema, TypeExports.Null()]),
        footpedal: TypeExports.Union([HardwareStatusEnvelopeSchema, TypeExports.Null()]),
        dicom: TypeExports.Union([HardwareStatusEnvelopeSchema, TypeExports.Null()]),
        bunbuddies: TypeExports.Union([
          BunBuddyCapabilitiesSnapshotsResponseSchema,
          TypeExports.Null(),
        ]),
      },
      { additionalProperties: false },
    ),
    errors: TypeExports.Array(TypeExports.String()),
    timestamp: TypeExports.String({ minLength: 1 }),
  },
  {
    additionalProperties: false,
    description: "Aggregated hardware summary response",
  },
);

/**
 * TypeScript types for hardware summary schemas.
 */
export type HardwareStatusEnvelope = Static<typeof HardwareStatusEnvelopeSchema>;
/** Inferred type from the HardwareSummaryRequest schema. */
export type HardwareSummaryRequest = Static<typeof HardwareSummaryRequestSchema>;
/** Inferred type from the HardwareSummaryResponse schema. */
export type HardwareSummaryResponse = Static<typeof HardwareSummaryResponseSchema>;
