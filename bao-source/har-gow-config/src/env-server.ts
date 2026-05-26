import path from "node:path";
import {
  DEFAULT_ASR_MAX_INPUT_BYTES,
  DEFAULT_HOST,
  DEFAULT_WORKFLOW_EXECUTE_RATE_LIMIT_PER_MINUTE,
  getRuntimeEnvironment,
  hostValidator,
  type NodeEnvironmentName,
  parseOptionalEnvironmentValue,
  parsePort,
  parsePositiveInteger,
  positiveIntegerValidator,
  type RuntimeEnvironment,
  readBooleanEnvironmentValue,
  readNodeEnvironment,
  readTrimmedEnvironmentValue,
} from "./env-core.js";

const WORKFLOW_EXECUTE_RATE_LIMIT_MAX = 10_000;
const ASR_MAX_INPUT_BYTES_LIMIT_MEBIBYTES = 48;
const KIBIBYTES_PER_MEBIBYTE = 1024;
const BYTES_PER_KIBIBYTE = 1024;
const BYTES_PER_MEBIBYTE = KIBIBYTES_PER_MEBIBYTE * BYTES_PER_KIBIBYTE;
const ASR_MAX_INPUT_BYTES_LIMIT = ASR_MAX_INPUT_BYTES_LIMIT_MEBIBYTES * BYTES_PER_MEBIBYTE;

function readCorsOrigins(env: RuntimeEnvironment = getRuntimeEnvironment()): string[] | null {
  const raw = env.NAVI_CORS_ORIGINS;
  if (typeof raw !== "string") {
    return null;
  }

  const values = raw
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
  return values.length > 0 ? values : null;
}

export function getServerListenConfig(): { host: string; port: number } {
  const env = getRuntimeEnvironment();
  return {
    host: parseOptionalEnvironmentValue(hostValidator, env.HOST) ?? DEFAULT_HOST,
    port: parsePort(env.PORT),
  };
}

export function getWorkflowHttpAllowPrivateNetworkTargets(): boolean {
  return readBooleanEnvironmentValue("NAVI_WORKFLOW_HTTP_ALLOW_PRIVATE", false);
}

export function getOpenApiEnabled(): boolean {
  return readBooleanEnvironmentValue("NAVI_OPENAPI_ENABLED", true);
}

export function getCorsAllowedOrigins(): string[] | null {
  return readCorsOrigins();
}

export function getWorkflowExecuteBearerToken(): string | null {
  return readTrimmedEnvironmentValue("NAVI_WORKFLOW_EXECUTE_TOKEN");
}

export function getWorkflowExecuteRateLimitPerMinute(): number {
  const raw = getRuntimeEnvironment().NAVI_WORKFLOW_EXECUTE_RPM;
  if (raw === undefined || raw.trim().length === 0) {
    return DEFAULT_WORKFLOW_EXECUTE_RATE_LIMIT_PER_MINUTE;
  }

  const result = positiveIntegerValidator.TryParse(raw.trim());
  if (!result.success) {
    return DEFAULT_WORKFLOW_EXECUTE_RATE_LIMIT_PER_MINUTE;
  }

  return Math.min(result.value, WORKFLOW_EXECUTE_RATE_LIMIT_MAX);
}

export function getWorkflowRateLimitTrustForwardedFor(): boolean {
  return readBooleanEnvironmentValue("NAVI_RATE_LIMIT_TRUST_FORWARDED_FOR", true);
}

export function getAsrModelId(): string {
  return readTrimmedEnvironmentValue("NAVI_ASR_MODEL") ?? "Xenova/whisper-tiny.en";
}

export function getAsrCacheDir(): string {
  return (
    readTrimmedEnvironmentValue("NAVI_TRANSFORMERS_CACHE") ??
    path.join(process.cwd(), ".cache", "transformers")
  );
}

export function getAsrMaxInputBytes(): number {
  const env = getRuntimeEnvironment();
  return parsePositiveInteger(
    env.NAVI_ASR_MAX_BYTES,
    DEFAULT_ASR_MAX_INPUT_BYTES,
    ASR_MAX_INPUT_BYTES_LIMIT,
  );
}

export function getRuntimeEnvironmentName(): NodeEnvironmentName {
  return readNodeEnvironment();
}

export function isProductionEnvironment(): boolean {
  return readNodeEnvironment() === "production";
}

export function getOpenAiApiKey(): string | null {
  return readTrimmedEnvironmentValue("OPENAI_API_KEY");
}

export function getGeminiApiKey(): string | null {
  return readTrimmedEnvironmentValue("GEMINI_API_KEY");
}

export function getAnthropicApiKey(): string | null {
  return readTrimmedEnvironmentValue("ANTHROPIC_API_KEY");
}

export function getAnthropicAuthToken(): string | null {
  return readTrimmedEnvironmentValue("ANTHROPIC_AUTH_TOKEN");
}

export function getHuggingFaceToken(): string | null {
  return readTrimmedEnvironmentValue("HUGGINGFACE_TOKEN");
}

export function getApiConfig(): {
  corsOrigins: string[] | null;
  host: string;
  port: number;
  openApiEnabled: boolean;
} {
  const listenConfig = getServerListenConfig();
  return {
    corsOrigins: getCorsAllowedOrigins(),
    host: listenConfig.host,
    openApiEnabled: getOpenApiEnabled(),
    port: listenConfig.port,
  };
}

export function getAsrConfig(): {
  cacheDir: string;
  maxInputBytes: number;
  modelId: string;
} {
  return {
    cacheDir: getAsrCacheDir(),
    maxInputBytes: getAsrMaxInputBytes(),
    modelId: getAsrModelId(),
  };
}

export function getWorkflowExecuteConfig(): {
  allowPrivateTargets: boolean;
  bearerToken: string | null;
  rateLimitPerMinute: number;
  trustForwardedFor: boolean;
} {
  return {
    allowPrivateTargets: getWorkflowHttpAllowPrivateNetworkTargets(),
    bearerToken: getWorkflowExecuteBearerToken(),
    rateLimitPerMinute: getWorkflowExecuteRateLimitPerMinute(),
    trustForwardedFor: getWorkflowRateLimitTrustForwardedFor(),
  };
}

export function getProviderConfig(): {
  anthropicApiKey: string | null;
  geminiApiKey: string | null;
  huggingFaceToken: string | null;
  openAiApiKey: string | null;
} {
  return {
    anthropicApiKey: getAnthropicApiKey(),
    geminiApiKey: getGeminiApiKey(),
    huggingFaceToken: getHuggingFaceToken(),
    openAiApiKey: getOpenAiApiKey(),
  };
}
