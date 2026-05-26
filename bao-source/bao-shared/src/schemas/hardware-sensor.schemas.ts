/**
 * Generic hardware sensor reading schemas.
 *
 * Extends the existing `createSensorReadingSchema()` pattern from `sensor.schemas.ts`
 * for generic BunBuddy metrics that are not domain-specific (GPS, IMU, barometer).
 *
 * @packageDocumentation
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas";

/** Generic hardware sensor data (non-domain-specific). */
export const HardwareGenericSensorDataSchema = Type.Object(
  {
    value: Type.Union([Type.Number(), Type.String(), Type.Boolean(), Type.Null()], {
      description: "Scalar sensor value",
    }),
    unit: Type.Union([Type.String(), Type.Null()], {
      description: 'Measurement unit (e.g. "°C", "mm", "lux")',
    }),
    precision: Type.Optional(
      Type.Number({ minimum: 0, description: "Decimal precision of the value" }),
    ),
    range: Type.Optional(
      Type.Object(
        {
          min: Type.Number({ description: "Minimum valid value" }),
          max: Type.Number({ description: "Maximum valid value" }),
        },
        { description: "Valid range for this sensor metric" },
      ),
    ),
    metadata: Type.Optional(JsonObjectSchema),
  },
  { additionalProperties: true },
);

/** Generic hardware sensor reading (wraps SensorReading pattern). */
export const HardwareGenericSensorReadingSchema = Type.Object(
  {
    timestamp: Type.String({ format: "date-time", description: "ISO 8601 reading timestamp" }),
    sensorId: Type.String({ minLength: 1, description: "Unique sensor identifier" }),
    deviceId: Type.String({ minLength: 1, description: "Device that owns this sensor" }),
    metric: Type.String({
      minLength: 1,
      description: 'Metric name (e.g. "temperature", "pressure")',
    }),
    data: HardwareGenericSensorDataSchema,
    quality: Type.Number({
      minimum: 0,
      maximum: 100,
      description: "Data quality percentage 0-100",
    }),
    valid: Type.Boolean({ description: "Whether the reading is valid" }),
    source: Type.Optional(Type.String({ description: "Source identifier (e.g. BunBuddy kind)" })),
    bunbuddyKind: Type.Optional(
      Type.String({ description: "BunBuddy kind that produced this reading" }),
    ),
  },
  { additionalProperties: true },
);

/** Generic hardware sensor data type. */
export type HardwareGenericSensorData = Static<typeof HardwareGenericSensorDataSchema>;

/** Generic hardware sensor reading type. */
export type HardwareGenericSensorReading = Static<typeof HardwareGenericSensorReadingSchema>;
