/**
 * Generic hardware sensor reading schemas.
 *
 * Extends the existing `createSensorReadingSchema()` pattern from `sensor.schemas.ts`
 * for generic BunBuddy metrics that are not domain-specific (GPS, IMU, barometer).
 *
 * @packageDocumentation
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas";

/** Generic hardware sensor data (non-domain-specific). */
export const HardwareGenericSensorDataSchema = TypeExports.Object(
  {
    value: TypeExports.Union(
      [TypeExports.Number(), TypeExports.String(), TypeExports.Boolean(), TypeExports.Null()],
      {
        description: "Scalar sensor value",
      },
    ),
    unit: TypeExports.Union([TypeExports.String(), TypeExports.Null()], {
      description: 'Measurement unit (e.g. "°C", "mm", "lux")',
    }),
    precision: TypeExports.Optional(
      TypeExports.Number({ minimum: 0, description: "Decimal precision of the value" }),
    ),
    range: TypeExports.Optional(
      TypeExports.Object(
        {
          min: TypeExports.Number({ description: "Minimum valid value" }),
          max: TypeExports.Number({ description: "Maximum valid value" }),
        },
        { description: "Valid range for this sensor metric" },
      ),
    ),
    metadata: TypeExports.Optional(JsonObjectSchema),
  },
  { additionalProperties: true },
);

/** Generic hardware sensor reading (wraps SensorReading pattern). */
export const HardwareGenericSensorReadingSchema = TypeExports.Object(
  {
    timestamp: TypeExports.String({
      format: "date-time",
      description: "ISO 8601 reading timestamp",
    }),
    sensorId: TypeExports.String({ minLength: 1, description: "Unique sensor identifier" }),
    deviceId: TypeExports.String({ minLength: 1, description: "Device that owns this sensor" }),
    metric: TypeExports.String({
      minLength: 1,
      description: 'Metric name (e.g. "temperature", "pressure")',
    }),
    data: HardwareGenericSensorDataSchema,
    quality: TypeExports.Number({
      minimum: 0,
      maximum: 100,
      description: "Data quality percentage 0-100",
    }),
    valid: TypeExports.Boolean({ description: "Whether the reading is valid" }),
    source: TypeExports.Optional(
      TypeExports.String({ description: "Source identifier (e.g. BunBuddy kind)" }),
    ),
    bunbuddyKind: TypeExports.Optional(
      TypeExports.String({ description: "BunBuddy kind that produced this reading" }),
    ),
  },
  { additionalProperties: true },
);

/** Generic hardware sensor data type. */
export type HardwareGenericSensorData = Static<typeof HardwareGenericSensorDataSchema>;

/** Generic hardware sensor reading type. */
export type HardwareGenericSensorReading = Static<typeof HardwareGenericSensorReadingSchema>;
