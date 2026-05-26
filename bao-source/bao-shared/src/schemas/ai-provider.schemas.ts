/**
 * Shared AI provider schemas.
 *
 * Centralizes provider-key unions used across contracts so request/response
 * schemas stay DRY and consistent.
 *
 * @shared/schemas/ai-provider
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * AI provider key schema (request payloads may include `auto`).
 */
export const AiProviderKeySchema: Type.TUnion<
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
    | Type.TLiteral<"auto">
  )[]
> = Type.Union(
  [
    Type.Literal("auto"),
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

/** Inferred type from the AiProviderKey schema. */
export type AiProviderKey = Static<typeof AiProviderKeySchema>;
