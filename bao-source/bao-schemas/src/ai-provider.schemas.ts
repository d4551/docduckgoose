/**
 * Shared AI provider schemas.
 *
 * Centralizes provider-key unions used across contracts so request/response
 * schemas stay DRY and consistent.
 *
 * @shared/schemas/ai-provider
 */

import type { Static, TLiteral, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * AI provider key schema (request payloads may include `auto`).
 */
export const AiProviderKeySchema: TUnion<
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
    | TLiteral<"auto">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("auto"),
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

/** Inferred type from the AiProviderKey schema. */
export type AiProviderKey = Static<typeof AiProviderKeySchema>;
