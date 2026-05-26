/**
 * AI provider health schemas.
 *
 * Defines the shared health response payloads for AI provider circuit breaker state
 * and failover recommendations.
 *
 * @shared/schemas/ai-provider-health.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Supported AI provider keys for health reporting.
 */
export const AiProviderHealthKeySchema: Type.TUnion<
  (
    | Type.TLiteral<"openai">
    | Type.TLiteral<"anthropic">
    | Type.TLiteral<"gemini">
    | Type.TLiteral<"deepseek">
    | Type.TLiteral<"azure">
    | Type.TLiteral<"bedrock">
    | Type.TLiteral<"copilot">
    | Type.TLiteral<"github">
    | Type.TLiteral<"groq">
    | Type.TLiteral<"together">
    | Type.TLiteral<"fireworks">
    | Type.TLiteral<"mistral">
    | Type.TLiteral<"cohere">
    | Type.TLiteral<"xai">
    | Type.TLiteral<"cerebras">
    | Type.TLiteral<"perplexity">
    | Type.TLiteral<"sambanova">
    | Type.TLiteral<"openrouter">
    | Type.TLiteral<"lmstudio">
    | Type.TLiteral<"huggingface">
    | Type.TLiteral<"nim">
    | Type.TLiteral<"ollama">
    | Type.TLiteral<"ramalama">
    | Type.TLiteral<"onnx">
    | Type.TLiteral<"local">
  )[]
> = Type.Union(
  [
    Type.Literal("openai"),
    Type.Literal("anthropic"),
    Type.Literal("gemini"),
    Type.Literal("deepseek"),
    Type.Literal("azure"),
    Type.Literal("bedrock"),
    Type.Literal("copilot"),
    Type.Literal("github"),
    Type.Literal("groq"),
    Type.Literal("together"),
    Type.Literal("fireworks"),
    Type.Literal("mistral"),
    Type.Literal("cohere"),
    Type.Literal("xai"),
    Type.Literal("cerebras"),
    Type.Literal("perplexity"),
    Type.Literal("sambanova"),
    Type.Literal("openrouter"),
    Type.Literal("lmstudio"),
    Type.Literal("huggingface"),
    Type.Literal("nim"),
    Type.Literal("ollama"),
    Type.Literal("ramalama"),
    Type.Literal("onnx"),
    Type.Literal("local"),
  ],
  {},
);

/**
 * Circuit breaker state schema.
 */
export const CircuitStateSchema: Type.TUnion<
  (Type.TLiteral<"closed"> | Type.TLiteral<"open"> | Type.TLiteral<"half_open">)[]
> = Type.Union([Type.Literal("closed"), Type.Literal("open"), Type.Literal("half_open")], {});

/**
 * Provider health status schema.
 */
export const ProviderHealthStatusSchema: Type.TObject<
  {
    readonly state: Type.TUnion<
      (Type.TLiteral<"closed"> | Type.TLiteral<"open"> | Type.TLiteral<"half_open">)[]
    >;
    readonly available: Type.TBoolean;
    readonly failureCount: Type.TNumber;
    readonly lastFailure: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly lastSuccess: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly nextAttemptAt: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "lastFailure" | "lastSuccess" | "nextAttemptAt" | "state" | "available" | "failureCount",
  never
> = Type.Object(
  {
    state: CircuitStateSchema,
    available: Type.Boolean(),
    failureCount: Type.Number({ minimum: 0 }),
    lastFailure: Type.Union([Type.String(), Type.Null()]),
    lastSuccess: Type.Union([Type.String(), Type.Null()]),
    nextAttemptAt: Type.Union([Type.String(), Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Providers health response schema.
 */
export const ProvidersHealthResponseSchema = Type.Object(
  {
    providers: Type.Object(
      {
        openai: ProviderHealthStatusSchema,
        anthropic: ProviderHealthStatusSchema,
        gemini: ProviderHealthStatusSchema,
        deepseek: ProviderHealthStatusSchema,
        azure: ProviderHealthStatusSchema,
        bedrock: ProviderHealthStatusSchema,
        copilot: ProviderHealthStatusSchema,
        github: ProviderHealthStatusSchema,
        groq: ProviderHealthStatusSchema,
        together: ProviderHealthStatusSchema,
        fireworks: ProviderHealthStatusSchema,
        mistral: ProviderHealthStatusSchema,
        cohere: ProviderHealthStatusSchema,
        xai: ProviderHealthStatusSchema,
        cerebras: ProviderHealthStatusSchema,
        perplexity: ProviderHealthStatusSchema,
        sambanova: ProviderHealthStatusSchema,
        openrouter: ProviderHealthStatusSchema,
        lmstudio: ProviderHealthStatusSchema,
        huggingface: ProviderHealthStatusSchema,
        nim: ProviderHealthStatusSchema,
        ollama: ProviderHealthStatusSchema,
        ramalama: ProviderHealthStatusSchema,
        onnx: ProviderHealthStatusSchema,
        local: ProviderHealthStatusSchema,
      },
      { additionalProperties: false },
    ),
    timestamp: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Failover summary schema.
 */
export const AiProviderFailoverSummarySchema = Type.Object(
  {
    available: Type.Boolean(),
    configuredProviders: Type.Number({ minimum: 0 }),
    providers: Type.Array(AiProviderHealthKeySchema),
  },
  { additionalProperties: false },
);

/**
 * AI provider health response schema.
 */
export const AiProviderHealthResponseSchema = Type.Object(
  {
    ok: Type.Boolean(),
    health: ProvidersHealthResponseSchema,
    failover: AiProviderFailoverSummarySchema,
    recommendedProvider: Type.Union([AiProviderHealthKeySchema, Type.Null()]),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for provider health status.
 */
export type ProviderHealthStatus = Static<typeof ProviderHealthStatusSchema>;

/**
 * TypeScript type for provider health response.
 */
export type ProvidersHealthResponse = Static<typeof ProvidersHealthResponseSchema>;

/**
 * TypeScript type for AI provider failover summary.
 */
export type AiProviderFailoverSummary = Static<typeof AiProviderFailoverSummarySchema>;

/**
 * TypeScript type for AI provider health response.
 */
export type AiProviderHealthResponse = Static<typeof AiProviderHealthResponseSchema>;
