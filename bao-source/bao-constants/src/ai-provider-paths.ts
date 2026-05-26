/**
 * Shared AI provider endpoint paths.
 *
 * Centralizes provider-specific external API paths to keep server and client
 * aligned without hardcoded strings.
 *
 * @shared/constants/ai-provider-paths
 */

/**
 * NVIDIA NIM external API path constants.
 */
export const NIM_ENDPOINT_PATHS: {
  readonly healthReady: "/v1/health/ready";
  readonly healthReadyBare: "/health/ready";
  readonly healthLive: "/v1/health/live";
  readonly healthLiveBare: "/health/live";
  readonly metrics: "/v1/metrics";
  readonly chatCompletions: "/v1/chat/completions";
  readonly embeddings: "/v1/embeddings";
} = {
  /** Readiness probe path when base URL does not include `/v1`. */
  healthReady: "/v1/health/ready",
  /** Readiness probe path when base URL already includes `/v1`. */
  healthReadyBare: "/health/ready",
  /** Liveness probe path when base URL does not include `/v1`. */
  healthLive: "/v1/health/live",
  /** Liveness probe path when base URL already includes `/v1`. */
  healthLiveBare: "/health/live",
  /** Metrics endpoint for NIM services. */
  metrics: "/v1/metrics",
  /** OpenAI-compatible chat completions endpoint. */
  chatCompletions: "/v1/chat/completions",
  /** OpenAI-compatible embeddings endpoint. */
  embeddings: "/v1/embeddings",
} as const;

/**
 * Ollama external API path constants.
 */
export const OLLAMA_ENDPOINT_PATHS: {
  readonly chat: "/api/chat";
  readonly embeddings: "/api/embeddings";
  readonly tags: "/api/tags";
  readonly version: "/api/version";
} = {
  /** Ollama chat endpoint. */
  chat: "/api/chat",
  /** Ollama embedding endpoint. */
  embeddings: "/api/embeddings",
  /** Ollama tags listing endpoint (model catalog). */
  tags: "/api/tags",
  /** Ollama version probe endpoint. */
  version: "/api/version",
} as const;

/**
 * OpenAI external API path constants.
 */
export const OPENAI_ENDPOINT_PATHS: {
  readonly chatCompletions: "/chat/completions";
  readonly embeddings: "/embeddings";
  readonly models: "/models";
} = {
  /** Chat completions endpoint. */
  chatCompletions: "/chat/completions",
  /** Embeddings endpoint. */
  embeddings: "/embeddings",
  /** Models listing endpoint. */
  models: "/models",
} as const;

/**
 * Anthropic external API path constants.
 */
export const ANTHROPIC_ENDPOINT_PATHS: { readonly messages: "/messages" } = {
  /** Messages endpoint. */
  messages: "/messages",
} as const;

/**
 * Gemini external API path constants.
 */
export const GEMINI_ENDPOINT_PATHS: { readonly generateContentSuffix: ":generateContent" } = {
  /** Generate content suffix for model RPC endpoint. */
  generateContentSuffix: ":generateContent",
} as const;

/**
 * AWS Bedrock external API path constants.
 */
export const BEDROCK_ENDPOINT_PATHS: { readonly converse: "/model/{modelId}/converse" } = {
  /** Converse API path template (model ID is interpolated). */
  converse: "/model/{modelId}/converse",
} as const;

/**
 * Cohere external API path constants.
 */
export const COHERE_ENDPOINT_PATHS: { readonly chat: "/v2/chat" } = {
  /** Chat completions endpoint. */
  chat: "/v2/chat",
} as const;
