/**
 * Hardware state event envelope schemas.
 *
 * Shared between EventEmitter (in-process), Wrapture FlatBuffers (cross-process),
 * and BaoDown hardware nodes.
 *
 * @packageDocumentation
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
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
export const HardwareEventKindSchema: Type.TUnion<
  [
    Type.TLiteral<
      | "state-change"
      | "sensor-reading"
      | "command-sent"
      | "command-result"
      | "calibration-update"
      | "health-transition"
    >,
    ...Type.TLiteral<
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
export const HardwareStateEventSchema = Type.Object(
  {
    deviceId: Type.String({ minLength: 1, description: "Device identifier" }),
    eventKind: HardwareEventKindSchema,
    status: Type.Optional(Type.String({ description: "Current device status" })),
    previousStatus: Type.Optional(Type.String({ description: "Previous device status" })),
    healthScore: Type.Optional(
      Type.Number({ minimum: 0, maximum: 1, description: "Health score 0.0-1.0" }),
    ),
    metric: Type.Optional(
      Type.String({ description: "Sensor metric name (for sensor-reading events)" }),
    ),
    valueFloat: Type.Optional(Type.Number({ description: "Numeric sensor/command value" })),
    valueString: Type.Optional(Type.String({ description: "String sensor/command value" })),
    unit: Type.Optional(Type.String({ description: "Measurement unit" })),
    quality: Type.Optional(
      Type.Integer({ minimum: 0, maximum: 100, description: "Data quality 0-100" }),
    ),
    command: Type.Optional(Type.String({ description: "Command name (for command events)" })),
    acknowledged: Type.Optional(Type.Boolean({ description: "Whether command was acknowledged" })),
    reason: Type.Optional(Type.String({ description: "Reason for state transition" })),
    correlationId: Type.Optional(
      Type.String({ description: "Correlation ID for request tracing" }),
    ),
    latencyMs: Type.Optional(
      Type.Integer({ minimum: 0, description: "Operation latency in milliseconds" }),
    ),
    timestamp: Type.String({ format: "date-time", description: "ISO 8601 event timestamp" }),
    metadataJson: Type.Optional(Type.String({ description: "Arbitrary metadata as JSON string" })),
  },
  { additionalProperties: false },
);

/** Hardware state event type. */
export type HardwareStateEvent = Static<typeof HardwareStateEventSchema>;
