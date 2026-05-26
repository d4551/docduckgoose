/**
 * Hardware summary schemas.
 *
 * Defines contract-first schemas for the aggregated hardware summary payload
 * used by dashboard and integration UIs.
 *
 * @shared/schemas/hardware-summary
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { BunBuddyCapabilitiesSnapshotsResponseSchema } from "./bunbuddy-capability-snapshot.schemas.ts";

/**
 * Generic hardware status envelope schema.
 */
export const HardwareStatusEnvelopeSchema = Type.Object(
  {
    ok: Type.Boolean(),
    timestamp: Type.Optional(Type.String({ minLength: 1 })),
    error: Type.Optional(Type.String({ minLength: 1 })),
    baseUrl: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
    code: Type.Optional(Type.String({ minLength: 1 })),
    message: Type.Optional(Type.String({ minLength: 1 })),
    count: Type.Optional(Type.Integer({ minimum: 0 })),
    data: Type.Optional(Type.Unknown()),
    status: Type.Optional(Type.Unknown()),
    services: Type.Optional(Type.Unknown()),
    latest: Type.Optional(Type.Unknown()),
    devices: Type.Optional(Type.Unknown()),
    dicom: Type.Optional(Type.Unknown()),
    details: Type.Optional(Type.Unknown()),
    errors: Type.Optional(Type.Array(Type.Unknown())),
  },
  {
    additionalProperties: true,
    description: "Generic hardware status envelope",
  },
);

/**
 * Request schema for the hardware summary endpoint.
 */
export const HardwareSummaryRequestSchema: Type.TObject<
  { readonly timeoutMs: Type.TOptional<Type.TInteger> },
  never,
  "timeoutMs"
> = Type.Object(
  {
    timeoutMs: Type.Optional(Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: false },
);

/**
 * Response schema for the hardware summary endpoint.
 */
export const HardwareSummaryResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: Type.Object(
      {
        lighting: Type.Union([HardwareStatusEnvelopeSchema, Type.Null()]),
        imager: Type.Union([HardwareStatusEnvelopeSchema, Type.Null()]),
        calibration: Type.Union([HardwareStatusEnvelopeSchema, Type.Null()]),
        footpedal: Type.Union([HardwareStatusEnvelopeSchema, Type.Null()]),
        dicom: Type.Union([HardwareStatusEnvelopeSchema, Type.Null()]),
        bunbuddies: Type.Union([BunBuddyCapabilitiesSnapshotsResponseSchema, Type.Null()]),
      },
      { additionalProperties: false },
    ),
    errors: Type.Array(Type.String()),
    timestamp: Type.String({ minLength: 1 }),
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
