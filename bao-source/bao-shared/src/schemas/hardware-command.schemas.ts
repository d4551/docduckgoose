/**
 * Device command request/response envelope schemas.
 *
 * Provides TypeBox schemas for the command dispatch pattern used by BaoDown
 * `sendCommand` nodes and the unified hardware context plugin.
 *
 * @packageDocumentation
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas";

/** Device command request envelope. */
export const HardwareDeviceCommandRequestSchema: Type.TObject<
  {
    readonly deviceId: Type.TString;
    readonly command: Type.TString;
    readonly params: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
    readonly correlationId: Type.TOptional<Type.TString>;
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
  },
  "deviceId" | "command",
  Type.InferOptionalKeys<{
    readonly deviceId: Type.TString;
    readonly command: Type.TString;
    readonly params: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
    readonly correlationId: Type.TOptional<Type.TString>;
    readonly timeoutMs: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    deviceId: Type.String({ minLength: 1, description: "Target device identifier" }),
    command: Type.String({ minLength: 1, description: "Command name to execute" }),
    params: Type.Optional(JsonObjectSchema),
    correlationId: Type.Optional(
      Type.String({ minLength: 1, description: "Correlation ID for request tracing" }),
    ),
    timeoutMs: Type.Optional(
      Type.Integer({
        minimum: 100,
        maximum: 30_000,
        description: "Command timeout in milliseconds",
      }),
    ),
  },
  { additionalProperties: false },
);

/** Device command response envelope. */
export const HardwareDeviceCommandResponseSchema = Type.Object(
  {
    deviceId: Type.String({ minLength: 1, description: "Responding device identifier" }),
    command: Type.String({ minLength: 1, description: "Command that was executed" }),
    acknowledged: Type.Boolean({ description: "Whether the command was acknowledged" }),
    result: Type.Optional(JsonObjectSchema),
    error: Type.Union([Type.String(), Type.Null()], {
      description: "Error message if command failed",
    }),
    latencyMs: Type.Number({ minimum: 0, description: "Round-trip latency in milliseconds" }),
    timestamp: Type.String({ format: "date-time", description: "ISO 8601 response timestamp" }),
    correlationId: Type.Optional(Type.String({ description: "Correlation ID from the request" })),
  },
  { additionalProperties: false },
);

/** Device command request type. */
export type HardwareDeviceCommandRequest = Static<typeof HardwareDeviceCommandRequestSchema>;

/** Device command response type. */
export type HardwareDeviceCommandResponse = Static<typeof HardwareDeviceCommandResponseSchema>;
