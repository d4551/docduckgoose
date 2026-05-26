/**
 * AI provider health schemas.
 *
 * Defines the shared health response payloads for AI provider circuit breaker state
 * and failover recommendations.
 *
 * @shared/schemas/ai-provider-health.ts
 */

import type {
  Static,
  TBoolean,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Supported AI provider keys for health reporting.
 */
export const AiProviderHealthKeySchema: TUnion<
  (
    | TLiteral<"openai">
    | TLiteral<"anthropic">
    | TLiteral<"gemini">
    | TLiteral<"deepseek">
    | TLiteral<"azure">
    | TLiteral<"bedrock">
    | TLiteral<"copilot">
    | TLiteral<"github">
    | TLiteral<"groq">
    | TLiteral<"together">
    | TLiteral<"fireworks">
    | TLiteral<"mistral">
    | TLiteral<"cohere">
    | TLiteral<"xai">
    | TLiteral<"cerebras">
    | TLiteral<"perplexity">
    | TLiteral<"sambanova">
    | TLiteral<"openrouter">
    | TLiteral<"lmstudio">
    | TLiteral<"huggingface">
    | TLiteral<"nim">
    | TLiteral<"ollama">
    | TLiteral<"ramalama">
    | TLiteral<"minimax">
    | TLiteral<"minimaxcn">
    | TLiteral<"glm">
    | TLiteral<"moonshot">
    | TLiteral<"qwen">
    | TLiteral<"yi">
    | TLiteral<"deepinfra">
    | TLiteral<"novita">
    | TLiteral<"hyperbolic">
    | TLiteral<"doubao">
    | TLiteral<"oaicompat">
    | TLiteral<"anthcompat">
    | TLiteral<"onnx">
    | TLiteral<"local">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("openai"),
    TypeExports.Literal("anthropic"),
    TypeExports.Literal("gemini"),
    TypeExports.Literal("deepseek"),
    TypeExports.Literal("azure"),
    TypeExports.Literal("bedrock"),
    TypeExports.Literal("copilot"),
    TypeExports.Literal("github"),
    TypeExports.Literal("groq"),
    TypeExports.Literal("together"),
    TypeExports.Literal("fireworks"),
    TypeExports.Literal("mistral"),
    TypeExports.Literal("cohere"),
    TypeExports.Literal("xai"),
    TypeExports.Literal("cerebras"),
    TypeExports.Literal("perplexity"),
    TypeExports.Literal("sambanova"),
    TypeExports.Literal("openrouter"),
    TypeExports.Literal("lmstudio"),
    TypeExports.Literal("huggingface"),
    TypeExports.Literal("nim"),
    TypeExports.Literal("ollama"),
    TypeExports.Literal("ramalama"),
    TypeExports.Literal("minimax"),
    TypeExports.Literal("minimaxcn"),
    TypeExports.Literal("glm"),
    TypeExports.Literal("moonshot"),
    TypeExports.Literal("qwen"),
    TypeExports.Literal("yi"),
    TypeExports.Literal("deepinfra"),
    TypeExports.Literal("novita"),
    TypeExports.Literal("hyperbolic"),
    TypeExports.Literal("doubao"),
    TypeExports.Literal("oaicompat"),
    TypeExports.Literal("anthcompat"),
    TypeExports.Literal("onnx"),
    TypeExports.Literal("local"),
  ],
  {},
);

/**
 * Circuit breaker state schema.
 */
export const CircuitStateSchema: TUnion<
  (TLiteral<"closed"> | TLiteral<"open"> | TLiteral<"half_open">)[]
> = TypeExports.Union(
  [TypeExports.Literal("closed"), TypeExports.Literal("open"), TypeExports.Literal("half_open")],
  {},
);

/**
 * Provider health status schema.
 */
export const ProviderHealthStatusSchema: TObject<
  {
    readonly state: TUnion<(TLiteral<"closed"> | TLiteral<"open"> | TLiteral<"half_open">)[]>;
    readonly available: TBoolean;
    readonly failureCount: TNumber;
    readonly lastFailure: TUnion<(TString | TNull)[]>;
    readonly lastSuccess: TUnion<(TString | TNull)[]>;
    readonly nextAttemptAt: TUnion<(TString | TNull)[]>;
  },
  "lastFailure" | "lastSuccess" | "nextAttemptAt" | "state" | "available" | "failureCount",
  never
> = TypeExports.Object(
  {
    state: CircuitStateSchema,
    available: TypeExports.Boolean(),
    failureCount: TypeExports.Number({ minimum: 0 }),
    lastFailure: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    lastSuccess: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    nextAttemptAt: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/**
 * Providers health response schema.
 */
export const ProvidersHealthResponseSchema = TypeExports.Object(
  {
    providers: TypeExports.Object(
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
        minimax: ProviderHealthStatusSchema,
        minimaxcn: ProviderHealthStatusSchema,
        glm: ProviderHealthStatusSchema,
        moonshot: ProviderHealthStatusSchema,
        qwen: ProviderHealthStatusSchema,
        yi: ProviderHealthStatusSchema,
        deepinfra: ProviderHealthStatusSchema,
        novita: ProviderHealthStatusSchema,
        hyperbolic: ProviderHealthStatusSchema,
        doubao: ProviderHealthStatusSchema,
        oaicompat: ProviderHealthStatusSchema,
        anthcompat: ProviderHealthStatusSchema,
        onnx: ProviderHealthStatusSchema,
        local: ProviderHealthStatusSchema,
      },
      { additionalProperties: false },
    ),
    timestamp: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Failover summary schema.
 */
export const AiProviderFailoverSummarySchema = TypeExports.Object(
  {
    available: TypeExports.Boolean(),
    configuredProviders: TypeExports.Number({ minimum: 0 }),
    providers: TypeExports.Array(AiProviderHealthKeySchema),
  },
  { additionalProperties: false },
);

/**
 * AI provider health response schema.
 */
export const AiProviderHealthResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    health: ProvidersHealthResponseSchema,
    failover: AiProviderFailoverSummarySchema,
    recommendedProvider: TypeExports.Union([AiProviderHealthKeySchema, TypeExports.Null()]),
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
