/**
 * Device detection schemas.
 *
 * Shared TypeBox schemas for device detection request/response payloads.
 *
 * @shared/schemas/devices-detect.ts
 */

import { DEFAULT_TIMEOUTS } from "@baohaus/bao-constants/timeouts";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema, JsonValueSchema } from "./json.schemas.ts";

const QueryBooleanSchema = TypeExports.Union([
  TypeExports.Boolean(),
  TypeExports.Literal("true"),
  TypeExports.Literal("false"),
  TypeExports.Literal("1"),
  TypeExports.Literal("0"),
  TypeExports.Literal("yes"),
  TypeExports.Literal("no"),
  TypeExports.Literal("on"),
  TypeExports.Literal("off"),
]);

const QueryTimeoutSchema = TypeExports.Union([
  TypeExports.Integer({
    minimum: DEFAULT_TIMEOUTS.hardwareDiscoveryMinMs,
    maximum: DEFAULT_TIMEOUTS.hardwareDiscoveryMaxMs,
  }),
  TypeExports.String({ pattern: "^[0-9]+$" }),
]);

/**
 * Device detection response schema.
 *
 * Success (ok: true): full detection result when bunbuddies respond.
 * When bunbuddies unreachable, API returns 503 with details.cached when cache available.
 */
export const DevicesDetectResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    message: TypeExports.String(),
    hadErrors: TypeExports.Optional(TypeExports.Boolean()),
    data: TypeExports.Object(
      {
        devices: TypeExports.Array(JsonObjectSchema),
        count: TypeExports.Number(),
        detectedAt: TypeExports.String(),
        timeoutMs: TypeExports.Number(),
      },
      { additionalProperties: JsonValueSchema },
    ),
    errors: TypeExports.Optional(TypeExports.Array(JsonValueSchema)),
    summary: TypeExports.Optional(JsonValueSchema),
    timestamp: TypeExports.String(),
    code: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: JsonValueSchema },
);

/**
 * Device discovery stream query schema.
 */
export const DevicesDetectStreamQuerySchema = TypeExports.Object({
  timeoutMs: TypeExports.Optional(QueryTimeoutSchema),
  persist: TypeExports.Optional(QueryBooleanSchema),
  refresh: TypeExports.Optional(QueryBooleanSchema),
});
