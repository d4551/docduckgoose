/**
 * AI device assistant config schemas.
 *
 * Defines contract-first schemas for device assistant policy/config hydration
 * (`GET /api/v1/ai/devices/assist/config`).
 *
 * @shared/schemas/ai-device-assist-config
 */

import type { Static, TBoolean, TInteger, TObject } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { AiDeviceAssistPromptKeySchema } from "./ai-device-assist.schemas.ts";

/**
 * Default include policy for device assistant context hydration.
 */
export const AiDeviceAssistIncludeDefaultsSchema: TObject<
  {
    readonly devices: TBoolean;
    readonly bunbuddies: TBoolean;
    readonly mcp: TBoolean;
    readonly eventsWhenDeviceId: TBoolean;
    readonly eventsWhenNoDeviceId: TBoolean;
    readonly integrationDefault: TBoolean;
  },
  | "devices"
  | "bunbuddies"
  | "mcp"
  | "eventsWhenDeviceId"
  | "eventsWhenNoDeviceId"
  | "integrationDefault",
  never
> = TypeExports.Object(
  {
    devices: TypeExports.Boolean(),
    bunbuddies: TypeExports.Boolean(),
    mcp: TypeExports.Boolean(),
    eventsWhenDeviceId: TypeExports.Boolean(),
    eventsWhenNoDeviceId: TypeExports.Boolean(),
    integrationDefault: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Generic bounded integer config shape.
 */
export const AiDeviceAssistBoundedIntSchema: TObject<
  { readonly default: TInteger; readonly min: TInteger; readonly max: TInteger },
  "default" | "min" | "max",
  never
> = TypeExports.Object(
  {
    default: TypeExports.Integer({ minimum: 1 }),
    min: TypeExports.Integer({ minimum: 1 }),
    max: TypeExports.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Device assistant redaction policy.
 */
export const AiDeviceAssistRedactionConfigSchema: TObject<
  { readonly enabled: TBoolean; readonly maxDepth: TInteger },
  "enabled" | "maxDepth",
  never
> = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    maxDepth: TypeExports.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Device assistant idempotency cache configuration.
 */
export const AiDeviceAssistIdempotencyConfigSchema: TObject<
  { readonly ttlMs: TInteger; readonly maxEntries: TInteger },
  "ttlMs" | "maxEntries",
  never
> = TypeExports.Object(
  {
    ttlMs: TypeExports.Integer({ minimum: 0 }),
    maxEntries: TypeExports.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Device assistant config snapshot schema.
 */
export const AiDeviceAssistConfigSchema = TypeExports.Object(
  {
    contextMaxChars: TypeExports.Integer({ minimum: 0 }),
    promptKeyDefault: AiDeviceAssistPromptKeySchema,
    includeDefaults: AiDeviceAssistIncludeDefaultsSchema,
    limit: AiDeviceAssistBoundedIntSchema,
    idempotency: AiDeviceAssistIdempotencyConfigSchema,
    redaction: AiDeviceAssistRedactionConfigSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the AiDeviceAssistConfig schema. */
export type AiDeviceAssistConfig = Static<typeof AiDeviceAssistConfigSchema>;

/**
 * Response schema for device assistant config snapshot requests.
 */
export const AiDeviceAssistConfigResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    timestamp: TypeExports.String({ minLength: 1 }),
    data: AiDeviceAssistConfigSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the AiDeviceAssistConfigResponse schema. */
export type AiDeviceAssistConfigResponse = Static<typeof AiDeviceAssistConfigResponseSchema>;
