/**
 * Device command request/response envelope schemas.
 *
 * Provides TypeBox schemas for the command dispatch pattern used by BaoDown
 * `sendCommand` nodes and the unified hardware context plugin.
 *
 * @packageDocumentation
 */

import type {
  InferOptionalKeys,
  Static,
  TInteger,
  TObject,
  TOptional,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas";

/** Device command request envelope. */
export const HardwareDeviceCommandRequestSchema: TObject<
  {
    readonly deviceId: TString;
    readonly command: TString;
    readonly params: TOptional<TObject<Record<string, never>, never, never>>;
    readonly correlationId: TOptional<TString>;
    readonly timeoutMs: TOptional<TInteger>;
  },
  "deviceId" | "command",
  InferOptionalKeys<{
    readonly deviceId: TString;
    readonly command: TString;
    readonly params: TOptional<TObject<Record<string, never>, never, never>>;
    readonly correlationId: TOptional<TString>;
    readonly timeoutMs: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    deviceId: TypeExports.String({ minLength: 1, description: "Target device identifier" }),
    command: TypeExports.String({ minLength: 1, description: "Command name to execute" }),
    params: TypeExports.Optional(JsonObjectSchema),
    correlationId: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Correlation ID for request tracing" }),
    ),
    timeoutMs: TypeExports.Optional(
      TypeExports.Integer({
        minimum: 100,
        maximum: 30_000,
        description: "Command timeout in milliseconds",
      }),
    ),
  },
  { additionalProperties: false },
);

/** Device command response envelope. */
export const HardwareDeviceCommandResponseSchema = TypeExports.Object(
  {
    deviceId: TypeExports.String({ minLength: 1, description: "Responding device identifier" }),
    command: TypeExports.String({ minLength: 1, description: "Command that was executed" }),
    acknowledged: TypeExports.Boolean({ description: "Whether the command was acknowledged" }),
    result: TypeExports.Optional(JsonObjectSchema),
    error: TypeExports.Union([TypeExports.String(), TypeExports.Null()], {
      description: "Error message if command failed",
    }),
    latencyMs: TypeExports.Number({
      minimum: 0,
      description: "Round-trip latency in milliseconds",
    }),
    timestamp: TypeExports.String({
      format: "date-time",
      description: "ISO 8601 response timestamp",
    }),
    correlationId: TypeExports.Optional(
      TypeExports.String({ description: "Correlation ID from the request" }),
    ),
  },
  { additionalProperties: false },
);

/** Device command request type. */
export type HardwareDeviceCommandRequest = Static<typeof HardwareDeviceCommandRequestSchema>;

/** Device command response type. */
export type HardwareDeviceCommandResponse = Static<typeof HardwareDeviceCommandResponseSchema>;
