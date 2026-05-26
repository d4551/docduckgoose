/**
 * AI provider taxonomy and display metadata.
 * @baohaus/bao-types/ai-providers
 */

import { AI_PROVIDER_METADATA } from "./ai-provider-metadata";

export type AiProviderKey =
  | "auto"
  | "openai"
  | "anthropic"
  | "gemini"
  | "deepseek"
  | "azure"
  | "bedrock"
  | "copilot"
  | "github"
  | "groq"
  | "together"
  | "fireworks"
  | "mistral"
  | "cohere"
  | "xai"
  | "cerebras"
  | "perplexity"
  | "sambanova"
  | "openrouter"
  | "lmstudio"
  | "huggingface"
  | "nim"
  | "ollama"
  | "ramalama"
  | "minimax"
  | "minimaxcn"
  | "glm"
  | "moonshot"
  | "qwen"
  | "yi"
  | "deepinfra"
  | "novita"
  | "hyperbolic"
  | "doubao"
  | "oaicompat"
  | "anthcompat"
  | "onnx"
  | "local";

export type AiProviderKeyResolved = Exclude<AiProviderKey, "auto">;

export interface AiProviderMetadata {
  key: AiProviderKey;
  label: string;
  shortLabel: string;
  icon: string;
  badgeClass: string;
  textClass: string;
}

export const AI_PROVIDER_KEYS: readonly AiProviderKey[] = [
  "auto",
  "openai",
  "anthropic",
  "gemini",
  "deepseek",
  "azure",
  "bedrock",
  "copilot",
  "github",
  "groq",
  "together",
  "fireworks",
  "mistral",
  "cohere",
  "xai",
  "cerebras",
  "perplexity",
  "sambanova",
  "openrouter",
  "lmstudio",
  "huggingface",
  "nim",
  "ollama",
  "ramalama",
  "minimax",
  "minimaxcn",
  "glm",
  "moonshot",
  "qwen",
  "yi",
  "deepinfra",
  "novita",
  "hyperbolic",
  "doubao",
  "oaicompat",
  "anthcompat",
  "onnx",
  "local",
] as const;

export type AiUnifiedSearchProvider = Extract<
  AiProviderKey,
  "huggingface" | "nim" | "ollama" | "ramalama"
>;

export const AI_UNIFIED_SEARCH_PROVIDER_KEYS: readonly AiUnifiedSearchProvider[] = [
  "huggingface",
  "nim",
  "ollama",
  "ramalama",
] as const;

export { AI_PROVIDER_METADATA } from "./ai-provider-metadata";

export const AI_PROVIDER_MODEL_DEFAULTS: { readonly huggingface: "facebook/detr-resnet-50" } = {
  huggingface: "facebook/detr-resnet-50",
} as const;

export function isAiUnifiedSearchProvider(value: unknown): value is AiUnifiedSearchProvider {
  if (typeof value !== "string") return false;
  return (AI_UNIFIED_SEARCH_PROVIDER_KEYS as readonly string[]).includes(value);
}

export function isAiProviderKey(value: unknown): value is AiProviderKey {
  return typeof value === "string" && (AI_PROVIDER_KEYS as readonly string[]).includes(value);
}

export function isAiProviderKeyResolved(value: unknown): value is AiProviderKeyResolved {
  return isAiProviderKey(value) && value !== "auto";
}

export function normalizeAiProviderKey(value: unknown): AiProviderKey {
  if (typeof value !== "string") return "auto";
  const normalized = value.trim().toLowerCase();
  return isAiProviderKey(normalized) ? normalized : "auto";
}

export function resolveAiProviderMetadata(value: unknown): AiProviderMetadata {
  const key = normalizeAiProviderKey(value);
  return AI_PROVIDER_METADATA[key];
}
