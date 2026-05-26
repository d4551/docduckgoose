/**
 * Device detection schemas.
 *
 * Shared TypeBox schemas for device detection request/response payloads.
 *
 * @shared/schemas/devices-detect.ts
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { DEFAULT_TIMEOUTS } from "../constants/timeouts.ts";
import { JsonObjectSchema, JsonValueSchema } from "./json.schemas.ts";

const QueryBooleanSchema = Type.Union([
  Type.Boolean(),
  Type.Literal("true"),
  Type.Literal("false"),
  Type.Literal("1"),
  Type.Literal("0"),
  Type.Literal("yes"),
  Type.Literal("no"),
  Type.Literal("on"),
  Type.Literal("off"),
]);

const QueryTimeoutSchema = Type.Union([
  Type.Integer({
    minimum: DEFAULT_TIMEOUTS.hardwareDiscoveryMinMs,
    maximum: DEFAULT_TIMEOUTS.hardwareDiscoveryMaxMs,
  }),
  Type.String({ pattern: "^[0-9]+$" }),
]);

/**
 * Device detection response schema.
 *
 * Success (ok: true): full detection result when bunbuddies respond.
 * When bunbuddies unreachable, API returns 503 with details.cached when cache available.
 */
export const DevicesDetectResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    message: Type.String(),
    hadErrors: Type.Optional(Type.Boolean()),
    data: Type.Object(
      {
        devices: Type.Array(JsonObjectSchema),
        count: Type.Number(),
        detectedAt: Type.String(),
        timeoutMs: Type.Number(),
      },
      { additionalProperties: JsonValueSchema },
    ),
    errors: Type.Optional(Type.Array(JsonValueSchema)),
    summary: Type.Optional(JsonValueSchema),
    timestamp: Type.String(),
    code: Type.Optional(Type.String()),
  },
  { additionalProperties: JsonValueSchema },
);

/**
 * Device discovery stream query schema.
 */
export const DevicesDetectStreamQuerySchema = Type.Object({
  timeoutMs: Type.Optional(QueryTimeoutSchema),
  persist: Type.Optional(QueryBooleanSchema),
  refresh: Type.Optional(QueryBooleanSchema),
});
