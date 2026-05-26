/**
 * AI device assistant config schemas.
 *
 * Defines contract-first schemas for device assistant policy/config hydration
 * (`GET /api/v1/ai/devices/assist/config`).
 *
 * @shared/schemas/ai-device-assist-config
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { AiDeviceAssistPromptKeySchema } from "./ai-device-assist.schemas.ts";

/**
 * Default include policy for device assistant context hydration.
 */
export const AiDeviceAssistIncludeDefaultsSchema: Type.TObject<
  {
    readonly devices: Type.TBoolean;
    readonly bunbuddies: Type.TBoolean;
    readonly mcp: Type.TBoolean;
    readonly eventsWhenDeviceId: Type.TBoolean;
    readonly eventsWhenNoDeviceId: Type.TBoolean;
    readonly integrationDefault: Type.TBoolean;
  },
  | "devices"
  | "bunbuddies"
  | "mcp"
  | "eventsWhenDeviceId"
  | "eventsWhenNoDeviceId"
  | "integrationDefault",
  never
> = Type.Object(
  {
    devices: Type.Boolean(),
    bunbuddies: Type.Boolean(),
    mcp: Type.Boolean(),
    eventsWhenDeviceId: Type.Boolean(),
    eventsWhenNoDeviceId: Type.Boolean(),
    integrationDefault: Type.Boolean(),
  },
  { additionalProperties: false },
);

/**
 * Generic bounded integer config shape.
 */
export const AiDeviceAssistBoundedIntSchema: Type.TObject<
  { readonly default: Type.TInteger; readonly min: Type.TInteger; readonly max: Type.TInteger },
  "default" | "min" | "max",
  never
> = Type.Object(
  {
    default: Type.Integer({ minimum: 1 }),
    min: Type.Integer({ minimum: 1 }),
    max: Type.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Device assistant redaction policy.
 */
export const AiDeviceAssistRedactionConfigSchema: Type.TObject<
  { readonly enabled: Type.TBoolean; readonly maxDepth: Type.TInteger },
  "enabled" | "maxDepth",
  never
> = Type.Object(
  {
    enabled: Type.Boolean(),
    maxDepth: Type.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Device assistant idempotency cache configuration.
 */
export const AiDeviceAssistIdempotencyConfigSchema: Type.TObject<
  { readonly ttlMs: Type.TInteger; readonly maxEntries: Type.TInteger },
  "ttlMs" | "maxEntries",
  never
> = Type.Object(
  {
    ttlMs: Type.Integer({ minimum: 0 }),
    maxEntries: Type.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Device assistant config snapshot schema.
 */
export const AiDeviceAssistConfigSchema = Type.Object(
  {
    contextMaxChars: Type.Integer({ minimum: 0 }),
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
export const AiDeviceAssistConfigResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    timestamp: Type.String({ minLength: 1 }),
    data: AiDeviceAssistConfigSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the AiDeviceAssistConfigResponse schema. */
export type AiDeviceAssistConfigResponse = Static<typeof AiDeviceAssistConfigResponseSchema>;
