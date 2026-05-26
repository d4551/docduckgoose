/**
 * AI device assistant schemas.
 *
 * Defines contract-first schemas for the AI device assistant endpoint
 * (`POST /api/v1/ai/devices/assist`).
 *
 * @shared/schemas/ai-device-assist
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { AiProviderKeySchema } from "./ai-provider.schemas.ts";
import { AiProviderHealthKeySchema } from "./ai-provider-health.schemas.ts";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Supported device assistant prompt keys.
 */
export const AiDeviceAssistPromptKeySchema: TUnion<
  (TLiteral<"DIAGNOSTICS_ASSISTANT"> | TLiteral<"CAPTURE_OPTIMIZER">)[]
> = TypeExports.Union(
  [TypeExports.Literal("DIAGNOSTICS_ASSISTANT"), TypeExports.Literal("CAPTURE_OPTIMIZER")],
  {},
);

/**
 * Device assistant include flags for context hydration.
 */
export const AiDeviceAssistIncludeSchema: TObject<
  {
    readonly devices: TOptional<TBoolean>;
    readonly bunbuddies: TOptional<TBoolean>;
    readonly events: TOptional<TBoolean>;
    readonly mcp: TOptional<TBoolean>;
    readonly integration: TOptional<TBoolean>;
  },
  never,
  InferOptionalKeys<{
    readonly devices: TOptional<TBoolean>;
    readonly bunbuddies: TOptional<TBoolean>;
    readonly events: TOptional<TBoolean>;
    readonly mcp: TOptional<TBoolean>;
    readonly integration: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    devices: TypeExports.Optional(TypeExports.Boolean()),
    bunbuddies: TypeExports.Optional(TypeExports.Boolean()),
    events: TypeExports.Optional(TypeExports.Boolean()),
    mcp: TypeExports.Optional(TypeExports.Boolean()),
    integration: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * AI usage accounting metadata.
 */
export const AiUsageSchema: TObject<
  {
    readonly promptTokens: TNumber;
    readonly completionTokens: TNumber;
    readonly totalTokens: TNumber;
  },
  "promptTokens" | "completionTokens" | "totalTokens",
  never
> = TypeExports.Object(
  {
    promptTokens: TypeExports.Number({ minimum: 0 }),
    completionTokens: TypeExports.Number({ minimum: 0 }),
    totalTokens: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * Request schema for the AI device assistant endpoint.
 */
export const AiDeviceAssistRequestSchema = TypeExports.Object(
  {
    prompt: TypeExports.String({ minLength: 1, maxLength: 12_000 }),
    system: TypeExports.Optional(TypeExports.String({ maxLength: 8_000 })),
    deviceId: TypeExports.Optional(TypeExports.String()),
    promptKey: TypeExports.Optional(AiDeviceAssistPromptKeySchema),
    include: TypeExports.Optional(AiDeviceAssistIncludeSchema),
    limit: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 200 })),
    provider: TypeExports.Optional(AiProviderKeySchema),
    model: TypeExports.Optional(TypeExports.String({ maxLength: 255 })),
    maxTokens: TypeExports.Optional(TypeExports.Integer({ minimum: 1, maximum: 16_384 })),
    temperature: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 2 })),
    topP: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 1 })),
    stop: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ maxLength: 200 }), {
        maxItems: 10,
        description: "Stop sequences that end generation when matched.",
      }),
    ),
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Idempotency key for replay-safe requests.",
      }),
    ),
  },
  { additionalProperties: false },
);

/** Inferred type from the AiDeviceAssistRequest schema. */
export type AiDeviceAssistRequest = Static<typeof AiDeviceAssistRequestSchema>;

/**
 * Context serialization strategy used for prompt budgets.
 */
export const ContextSerializationStrategySchema: TUnion<
  (TLiteral<"full"> | TLiteral<"fallback"> | TLiteral<"minimal"> | TLiteral<"empty">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("full"),
    TypeExports.Literal("fallback"),
    TypeExports.Literal("minimal"),
    TypeExports.Literal("empty"),
  ],
  {},
);

/**
 * Context metadata returned by the device assistant endpoint.
 */
export const AiDeviceAssistContextMetaSchema: TObject<
  {
    readonly truncated: TBoolean;
    readonly originalLength: TNumber;
    readonly maxLength: TNumber;
    readonly strategy: TUnion<
      (TLiteral<"full"> | TLiteral<"fallback"> | TLiteral<"minimal"> | TLiteral<"empty">)[]
    >;
    readonly serializedLength: TNumber;
  },
  "maxLength" | "truncated" | "originalLength" | "strategy" | "serializedLength",
  never
> = TypeExports.Object(
  {
    truncated: TypeExports.Boolean(),
    originalLength: TypeExports.Number({ minimum: 0 }),
    maxLength: TypeExports.Number({ minimum: 0 }),
    strategy: ContextSerializationStrategySchema,
    serializedLength: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * AI device assistant success payload schema.
 */
export const AiDeviceAssistResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    provider: AiProviderHealthKeySchema,
    requestId: TypeExports.String({ minLength: 1 }),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    cached: TypeExports.Optional(TypeExports.Boolean()),
    timestamp: TypeExports.String({ minLength: 1 }),
    data: TypeExports.Object(
      {
        text: TypeExports.String(),
        usage: TypeExports.Union([AiUsageSchema, TypeExports.Null()]),
        model: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        offlineMode: TypeExports.Boolean(),
        offlineReason: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
        structured: TypeExports.Union([JsonValueSchema, TypeExports.Null()]),
        structuredErrors: TypeExports.Union([JsonValueSchema, TypeExports.Null()]),
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
