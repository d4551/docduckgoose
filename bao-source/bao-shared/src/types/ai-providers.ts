/**
 * AI provider taxonomy and display metadata.
 *
 * Centralizes provider keys, labels, and UI helpers so every page uses
 * the same lexicon and display conventions.
 *
 * @shared/types/ai-providers.ts
 */

/**
 * AI provider keys supported across the platform.
 */
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
  | "onnx"
  | "local";

/**
 * AI provider keys that always resolve to a concrete backend provider.
 */
export type AiProviderKeyResolved = Exclude<AiProviderKey, "auto">;

/**
 * Display metadata for AI providers.
 */
export interface AiProviderMetadata {
  /** Canonical provider key. */
  key: AiProviderKey;
  /** Full display label. */
  label: string;
  /** Short display label for compact UI. */
  shortLabel: string;
  /** Iconify icon identifier. */
  icon: string;
  /** DaisyUI badge class for provider badges. */
  badgeClass: string;
  /** Tailwind text class for provider accents. */
  textClass: string;
}

/**
 * Ordered provider keys for UI iteration.
 */
export const AI_PROVIDER_KEYS: readonly [
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
  "onnx",
  "local",
] = [
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
  "onnx",
  "local",
] as const satisfies readonly AiProviderKey[];

/**
 * Providers that support unified model search.
 */
export type AiUnifiedSearchProvider = Extract<
  AiProviderKey,
  "huggingface" | "nim" | "ollama" | "ramalama"
>;

/**
 * Ordered provider keys for unified model search workflows.
 */
export const AI_UNIFIED_SEARCH_PROVIDER_KEYS: readonly [
  "huggingface",
  "nim",
  "ollama",
  "ramalama",
] = [
  "huggingface",
  "nim",
  "ollama",
  "ramalama",
] as const satisfies readonly AiUnifiedSearchProvider[];

/**
 * Provider metadata lookup table.
 */
export const AI_PROVIDER_METADATA: Record<AiProviderKey, AiProviderMetadata> = {
  auto: {
    key: "auto",
    label: "Auto (Best Available)",
    shortLabel: "Auto",
    icon: "lucide--sparkles",
    badgeClass: "badge-primary",
    textClass: "text-primary",
  },
  openai: {
    key: "openai",
    label: "OpenAI",
    shortLabel: "OpenAI",
    icon: "simple-icons--openai",
    badgeClass: "badge-success",
    textClass: "text-success",
  },
  anthropic: {
    key: "anthropic",
    label: "Anthropic",
    shortLabel: "Anthropic",
    icon: "simple-icons--anthropic",
    badgeClass: "badge-warning",
    textClass: "text-warning",
  },
  gemini: {
    key: "gemini",
    label: "Google Gemini",
    shortLabel: "Gemini",
    icon: "simple-icons--googlegemini",
    badgeClass: "badge-info",
    textClass: "text-info",
  },
  deepseek: {
    key: "deepseek",
    label: "DeepSeek",
    shortLabel: "DeepSeek",
    icon: "simple-icons--deepseek",
    badgeClass: "badge-primary",
    textClass: "text-primary",
  },
  azure: {
    key: "azure",
    label: "Azure OpenAI",
    shortLabel: "Azure",
    icon: "simple-icons--microsoftazure",
    badgeClass: "badge-info",
    textClass: "text-info",
  },
  bedrock: {
    key: "bedrock",
    label: "AWS Bedrock",
    shortLabel: "Bedrock",
    icon: "simple-icons--amazonaws",
    badgeClass: "badge-warning",
    textClass: "text-warning",
  },
  copilot: {
    key: "copilot",
    label: "GitHub Copilot",
    shortLabel: "Copilot",
    icon: "simple-icons--githubcopilot",
    badgeClass: "badge-secondary",
    textClass: "text-secondary",
  },
  github: {
    key: "github",
    label: "GitHub Models",
    shortLabel: "GitHub",
    icon: "simple-icons--github",
    badgeClass: "badge-neutral",
    textClass: "text-base-content",
  },
  groq: {
    key: "groq",
    label: "Groq",
    shortLabel: "Groq",
    icon: "simple-icons--groq",
    badgeClass: "badge-accent",
    textClass: "text-accent",
  },
  together: {
    key: "together",
    label: "Together AI",
    shortLabel: "Together",
    icon: "lucide--layers",
    badgeClass: "badge-info",
    textClass: "text-info",
  },
  fireworks: {
    key: "fireworks",
    label: "Fireworks AI",
    shortLabel: "Fireworks",
    icon: "lucide--flame",
    badgeClass: "badge-error",
    textClass: "text-error",
  },
  mistral: {
    key: "mistral",
    label: "Mistral AI",
    shortLabel: "Mistral",
    icon: "simple-icons--mistral",
    badgeClass: "badge-warning",
    textClass: "text-warning",
  },
  cohere: {
    key: "cohere",
    label: "Cohere",
    shortLabel: "Cohere",
    icon: "lucide--message-circle",
    badgeClass: "badge-success",
    textClass: "text-success",
  },
  xai: {
    key: "xai",
    label: "xAI (Grok)",
    shortLabel: "xAI",
    icon: "simple-icons--x",
    badgeClass: "badge-neutral",
    textClass: "text-base-content",
  },
  cerebras: {
    key: "cerebras",
    label: "Cerebras",
    shortLabel: "Cerebras",
    icon: "lucide--cpu",
    badgeClass: "badge-accent",
    textClass: "text-accent",
  },
  perplexity: {
    key: "perplexity",
    label: "Perplexity",
    shortLabel: "Perplexity",
    icon: "lucide--search",
    badgeClass: "badge-info",
    textClass: "text-info",
  },
  sambanova: {
    key: "sambanova",
    label: "SambaNova",
    shortLabel: "SambaNova",
    icon: "lucide--zap",
    badgeClass: "badge-success",
    textClass: "text-success",
  },
  openrouter: {
    key: "openrouter",
    label: "OpenRouter",
    shortLabel: "OpenRouter",
    icon: "lucide--git-branch",
    badgeClass: "badge-primary",
    textClass: "text-primary",
  },
  lmstudio: {
    key: "lmstudio",
    label: "LM Studio",
    shortLabel: "LMStudio",
    icon: "lucide--monitor",
    badgeClass: "badge-secondary",
    textClass: "text-secondary",
  },
  huggingface: {
    key: "huggingface",
    label: "Hugging Face",
    shortLabel: "HF",
    icon: "simple-icons--huggingface",
    badgeClass: "badge-warning",
    textClass: "text-warning",
  },
  nim: {
    key: "nim",
    label: "NVIDIA NIM",
    shortLabel: "NIM",
    icon: "simple-icons--nvidia",
    badgeClass: "badge-success",
    textClass: "text-success",
  },
  ollama: {
    key: "ollama",
    label: "Ollama",
    shortLabel: "Ollama",
    icon: "simple-icons--ollama",
    badgeClass: "badge-secondary",
    textClass: "text-secondary",
  },
  ramalama: {
    key: "ramalama",
    label: "RamaLama",
    shortLabel: "RamaLama",
    icon: "lucide--box",
    badgeClass: "badge-info",
    textClass: "text-info",
  },
  onnx: {
    key: "onnx",
    label: "ONNX Runtime",
    shortLabel: "ONNX",
    icon: "simple-icons--onnx",
    badgeClass: "badge-accent",
    textClass: "text-accent",
  },
  local: {
    key: "local",
    label: "Local Model",
    shortLabel: "Local",
    icon: "lucide--hard-drive",
    badgeClass: "badge-neutral",
    textClass: "text-base-content",
  },
};

/**
 * Canonical default model ids per provider where model selection is required.
 */
export const AI_PROVIDER_MODEL_DEFAULTS: { readonly huggingface: "facebook/detr-resnet-50" } = {
  huggingface: "facebook/detr-resnet-50",
} as const;

/**
 * Determine if a value is a provider key that supports unified model search.
 *
 * @param value - Candidate provider value.
 * @returns True when value matches a unified search provider.
 */
export function isAiUnifiedSearchProvider(value: unknown): value is AiUnifiedSearchProvider {
  if (typeof value !== "string") {
    return false;
  }
  return (AI_UNIFIED_SEARCH_PROVIDER_KEYS as readonly string[]).includes(value);
}

/**
 * Determine if a value is a recognized AI provider key.
 *
 * @param value - Candidate provider value.
 * @returns True when the value matches a known provider key.
 */
export function isAiProviderKey(value: unknown): value is AiProviderKey {
  if (typeof value !== "string") {
    return false;
  }
  return Object.hasOwn(AI_PROVIDER_METADATA, value);
}

/**
 * Normalize a provider input to a canonical key.
 *
 * @param value - Provider input value.
 * @returns Canonical provider key (defaults to `auto`).
 */
export function normalizeAiProviderKey(value: unknown): AiProviderKey {
  if (typeof value !== "string") {
    return "auto";
  }
  const normalized = value.trim().toLowerCase();
  return isAiProviderKey(normalized) ? normalized : "auto";
}

/**
 * Resolve provider metadata with a safe fallback.
 *
 * @param value - Provider input.
 * @returns Metadata for the normalized provider key.
 */
export function resolveAiProviderMetadata(value: unknown): AiProviderMetadata {
  const key = normalizeAiProviderKey(value);
  return AI_PROVIDER_METADATA[key];
}
