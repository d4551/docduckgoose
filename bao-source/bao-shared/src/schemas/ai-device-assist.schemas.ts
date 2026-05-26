/**
 * AI device assistant schemas.
 *
 * Defines contract-first schemas for the AI device assistant endpoint
 * (`POST /api/v1/ai/devices/assist`).
 *
 * @shared/schemas/ai-device-assist
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { AiProviderKeySchema } from "./ai-provider.schemas.ts";
import { AiProviderHealthKeySchema } from "./ai-provider-health.schemas.ts";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Supported device assistant prompt keys.
 */
export const AiDeviceAssistPromptKeySchema: Type.TUnion<
  (Type.TLiteral<"DIAGNOSTICS_ASSISTANT"> | Type.TLiteral<"CAPTURE_OPTIMIZER">)[]
> = Type.Union([Type.Literal("DIAGNOSTICS_ASSISTANT"), Type.Literal("CAPTURE_OPTIMIZER")], {});

/**
 * Device assistant include flags for context hydration.
 */
export const AiDeviceAssistIncludeSchema: Type.TObject<
  {
    readonly devices: Type.TOptional<Type.TBoolean>;
    readonly bunbuddies: Type.TOptional<Type.TBoolean>;
    readonly events: Type.TOptional<Type.TBoolean>;
    readonly mcp: Type.TOptional<Type.TBoolean>;
    readonly integration: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly devices: Type.TOptional<Type.TBoolean>;
    readonly bunbuddies: Type.TOptional<Type.TBoolean>;
    readonly events: Type.TOptional<Type.TBoolean>;
    readonly mcp: Type.TOptional<Type.TBoolean>;
    readonly integration: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    devices: Type.Optional(Type.Boolean()),
    bunbuddies: Type.Optional(Type.Boolean()),
    events: Type.Optional(Type.Boolean()),
    mcp: Type.Optional(Type.Boolean()),
    integration: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * AI usage accounting metadata.
 */
export const AiUsageSchema: Type.TObject<
  {
    readonly promptTokens: Type.TNumber;
    readonly completionTokens: Type.TNumber;
    readonly totalTokens: Type.TNumber;
  },
  "promptTokens" | "completionTokens" | "totalTokens",
  never
> = Type.Object(
  {
    promptTokens: Type.Number({ minimum: 0 }),
    completionTokens: Type.Number({ minimum: 0 }),
    totalTokens: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * Request schema for the AI device assistant endpoint.
 */
export const AiDeviceAssistRequestSchema = Type.Object(
  {
    prompt: Type.String({ minLength: 1, maxLength: 12_000 }),
    system: Type.Optional(Type.String({ maxLength: 8_000 })),
    deviceId: Type.Optional(Type.String()),
    promptKey: Type.Optional(AiDeviceAssistPromptKeySchema),
    include: Type.Optional(AiDeviceAssistIncludeSchema),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 200 })),
    provider: Type.Optional(AiProviderKeySchema),
    model: Type.Optional(Type.String({ maxLength: 255 })),
    maxTokens: Type.Optional(Type.Integer({ minimum: 1, maximum: 16_384 })),
    temperature: Type.Optional(Type.Number({ minimum: 0, maximum: 2 })),
    topP: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
    stop: Type.Optional(
      Type.Array(Type.String({ maxLength: 200 }), {
        maxItems: 10,
        description: "Stop sequences that end generation when matched.",
      }),
    ),
    idempotencyKey: Type.Optional(
      Type.String({ minLength: 1, description: "Idempotency key for replay-safe requests." }),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the AiDeviceAssistRequest schema. */
export type AiDeviceAssistRequest = Static<typeof AiDeviceAssistRequestSchema>;

/**
 * Context serialization strategy used for prompt budgets.
 */
export const ContextSerializationStrategySchema: Type.TUnion<
  (
    | Type.TLiteral<"full">
    | Type.TLiteral<"fallback">
    | Type.TLiteral<"minimal">
    | Type.TLiteral<"empty">
  )[]
> = Type.Union(
  [Type.Literal("full"), Type.Literal("fallback"), Type.Literal("minimal"), Type.Literal("empty")],
  {},
);

/**
 * Context metadata returned by the device assistant endpoint.
 */
export const AiDeviceAssistContextMetaSchema: Type.TObject<
  {
    readonly truncated: Type.TBoolean;
    readonly originalLength: Type.TNumber;
    readonly maxLength: Type.TNumber;
    readonly strategy: Type.TUnion<
      (
        | Type.TLiteral<"full">
        | Type.TLiteral<"fallback">
        | Type.TLiteral<"minimal">
        | Type.TLiteral<"empty">
      )[]
    >;
    readonly serializedLength: Type.TNumber;
  },
  "maxLength" | "truncated" | "originalLength" | "strategy" | "serializedLength",
  never
> = Type.Object(
  {
    truncated: Type.Boolean(),
    originalLength: Type.Number({ minimum: 0 }),
    maxLength: Type.Number({ minimum: 0 }),
    strategy: ContextSerializationStrategySchema,
    serializedLength: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * AI device assistant success payload schema.
 */
export const AiDeviceAssistResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    provider: AiProviderHealthKeySchema,
    requestId: Type.String({ minLength: 1 }),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
    cached: Type.Optional(Type.Boolean()),
    timestamp: Type.String({ minLength: 1 }),
    data: Type.Object(
      {
        text: Type.String(),
        usage: Type.Union([AiUsageSchema, Type.Null()]),
        model: Type.Union([Type.String(), Type.Null()]),
        offlineMode: Type.Boolean(),
        offlineReason: Type.Union([Type.String(), Type.Null()]),
        structured: Type.Union([JsonValueSchema, Type.Null()]),
        structuredErrors: Type.Union([JsonValueSchema, Type.Null()]),
      },
      { additionalProperties: false },
    ),
    context: JsonValueSchema,
    promptKey: AiDeviceAssistPromptKeySchema,
    contextMeta: AiDeviceAssistContextMetaSchema,
  },
  { additionalProperties: false },
);

/** Inferred type from the AiDeviceAssistResponse schema. */
export type AiDeviceAssistResponse = Static<typeof AiDeviceAssistResponseSchema>;
