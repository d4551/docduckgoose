/**
 * Hardware state event envelope schemas.
 *
 * Shared between EventEmitter (in-process), Wrapture FlatBuffers (cross-process),
 * and BaoDown hardware nodes.
 *
 * @packageDocumentation
 */

import type { Static, TLiteral, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum";

/** Hardware event kinds (aligns with FlatBuffer HardwareEventKindV1 enum). */
export const HARDWARE_EVENT_KINDS: readonly [
  "state-change",
  "sensor-reading",
  "command-sent",
  "command-result",
  "calibration-update",
  "health-transition",
] = [
  "state-change",
  "sensor-reading",
  "command-sent",
  "command-result",
  "calibration-update",
  "health-transition",
] as const;

/** Hardware event kind type. */
export type HardwareEventKind = (typeof HARDWARE_EVENT_KINDS)[number];

/** Hardware event kind schema. */
export const HardwareEventKindSchema: TUnion<
  [
    TLiteral<
      | "state-change"
      | "sensor-reading"
      | "command-sent"
      | "command-result"
      | "calibration-update"
      | "health-transition"
    >,
    ...TLiteral<
      | "state-change"
      | "sensor-reading"
      | "command-sent"
      | "command-result"
      | "calibration-update"
      | "health-transition"
    >[],
  ]
> = stringEnum(HARDWARE_EVENT_KINDS, {});

/** Hardware state event envelope (shared between EventEmitter, FlatBuffers, and BaoDown). */
export const HardwareStateEventSchema = TypeExports.Object(
  {
    deviceId: TypeExports.String({ minLength: 1, description: "Device identifier" }),
    eventKind: HardwareEventKindSchema,
    status: TypeExports.Optional(TypeExports.String({ description: "Current device status" })),
    previousStatus: TypeExports.Optional(
      TypeExports.String({ description: "Previous device status" }),
    ),
    healthScore: TypeExports.Optional(
      TypeExports.Number({ minimum: 0, maximum: 1, description: "Health score 0.0-1.0" }),
    ),
    metric: TypeExports.Optional(
      TypeExports.String({ description: "Sensor metric name (for sensor-reading events)" }),
    ),
    valueFloat: TypeExports.Optional(
      TypeExports.Number({ description: "Numeric sensor/command value" }),
    ),
    valueString: TypeExports.Optional(
      TypeExports.String({ description: "String sensor/command value" }),
    ),
    unit: TypeExports.Optional(TypeExports.String({ description: "Measurement unit" })),
    quality: TypeExports.Optional(
      TypeExports.Integer({ minimum: 0, maximum: 100, description: "Data quality 0-100" }),
    ),
    command: TypeExports.Optional(
      TypeExports.String({ description: "Command name (for command events)" }),
    ),
    acknowledged: TypeExports.Optional(
      TypeExports.Boolean({ description: "Whether command was acknowledged" }),
    ),
    reason: TypeExports.Optional(
      TypeExports.String({ description: "Reason for state transition" }),
    ),
    correlationId: TypeExports.Optional(
      TypeExports.String({ description: "Correlation ID for request tracing" }),
    ),
    latencyMs: TypeExports.Optional(
      TypeExports.Integer({ minimum: 0, description: "Operation latency in milliseconds" }),
    ),
    timestamp: TypeExports.String({ format: "date-time", description: "ISO 8601 event timestamp" }),
    metadataJson: TypeExports.Optional(
      TypeExports.String({ description: "Arbitrary metadata as JSON string" }),
    ),
  },
  { additionalProperties: false },
);

/** Hardware state event type. */
export type HardwareStateEvent = Static<typeof HardwareStateEventSchema>;
