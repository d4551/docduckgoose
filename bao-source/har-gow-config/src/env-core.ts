import path from "node:path";
import { CompileCached, type Validator } from "@baohaus/baobox/compile";
import type { TSchema } from "@baohaus/baobox/type/base-types";
import { Enum } from "@baohaus/baobox/type/combinator-core";
import {
  Boolean as BooleanSchema,
  Integer as IntegerSchema,
  String as StringSchema,
} from "@baohaus/baobox/type/primitives";
import type { Static } from "@baohaus/baobox/type/static-types";

const DEFAULT_PROOFBUN_RETENTION_DAYS = 30;
const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_SECOND = 1000;

export const DEFAULT_ASR_MAX_INPUT_BYTES = 8_388_608;
export const DEFAULT_BAO_BOSS_DLQ_RETENTION_DAYS = 14;
export const DEFAULT_BAO_BOSS_MAINTENANCE_INTERVAL_SECONDS = 120;
export const DEFAULT_BAO_BOSS_SCHEMA = "baoboss";
export const DEFAULT_BAO_BOSS_SHUTDOWN_GRACE_PERIOD_SECONDS = 30;
export const DEFAULT_BLOBAO_LOCAL_ROOT = ".cache/blobao";
export const DEFAULT_BONKBUN_THEME = "light";
export const DEFAULT_HOST = "0.0.0.0";
export const DEFAULT_PORT = 18420;
export const DEFAULT_PROOFBUN_RETENTION_MS =
  DEFAULT_PROOFBUN_RETENTION_DAYS *
  HOURS_PER_DAY *
  MINUTES_PER_HOUR *
  SECONDS_PER_MINUTE *
  MILLISECONDS_PER_SECOND;
export const DEFAULT_WORKFLOW_EXECUTE_RATE_LIMIT_PER_MINUTE = 0;
export const DEFAULT_AI_PROVIDERS_BAO_ANTHROPIC_MODEL = "claude-3-5-sonnet-latest";
export const DEFAULT_AI_PROVIDERS_BAO_CACHE_TTL_MS = 60_000;
export const DEFAULT_AI_PROVIDERS_BAO_GEMINI_MODEL = "gemini-2.0-flash";
export const DEFAULT_AI_PROVIDERS_BAO_HUGGINGFACE_MODEL = "google/flan-t5-large";
export const DEFAULT_AI_PROVIDERS_BAO_OPENAI_MODEL = "gpt-4o-mini";

export const DEFAULT_OPENAI_BASE_URL = "https://api.openai.com/v1";
export const DEFAULT_GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
export const DEFAULT_HUGGINGFACE_BASE_URL = "https://api-inference.huggingface.co/models";

export const LOOPBACK_HOST = "localhost";
export const LOOPBACK_IPV4 = "127.0.0.1";
export const LOOPBACK_CALLBACK_PATH = "/callback";

function createBooleanSchema() {
  return BooleanSchema();
}

function createHostSchema() {
  return StringSchema({ minLength: 1 });
}

function createNodeEnvironmentSchema() {
  return Enum(["development", "production", "test"]);
}

function createNonEmptyStringSchema() {
  return StringSchema({ minLength: 1 });
}

function createPositiveIntegerSchema() {
  return IntegerSchema({ minimum: 1 });
}

function createPortSchema() {
  return IntegerSchema({ minimum: 1, maximum: 65_535 });
}

export const booleanValidator: Validator<ReturnType<typeof createBooleanSchema>> = CompileCached(
  createBooleanSchema(),
);
export const hostValidator: Validator<ReturnType<typeof createHostSchema>> = CompileCached(
  createHostSchema(),
);
export const nodeEnvironmentValidator: Validator<ReturnType<typeof createNodeEnvironmentSchema>> =
  CompileCached(createNodeEnvironmentSchema());
export const nonEmptyStringValidator: Validator<ReturnType<typeof createNonEmptyStringSchema>> =
  CompileCached(createNonEmptyStringSchema());
export const portValidator: Validator<ReturnType<typeof createPortSchema>> = CompileCached(
  createPortSchema(),
);
export const positiveIntegerValidator: Validator<ReturnType<typeof createPositiveIntegerSchema>> =
  CompileCached(createPositiveIntegerSchema());

export type NodeEnvironmentName = Static<ReturnType<typeof createNodeEnvironmentSchema>>;
export type RuntimeEnvironment = Readonly<Record<string, string | undefined>>;

export function getRuntimeEnvironment(): RuntimeEnvironment {
  return Bun.env;
}

export function trimEnvironmentValue(raw: string | undefined): string | null {
  if (raw === undefined) {
    return null;
  }

  const trimmed = raw.trim();
  return trimmed.length === 0 ? null : trimmed;
}

export function parseOptionalEnvironmentValue<T extends TSchema>(
  validator: Validator<T>,
  raw: string | undefined,
): Static<T> | null {
  if (raw === undefined) {
    return null;
  }

  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const result = validator.TryParse(trimmed);
  return result.success ? result.value : null;
}

export function parsePort(raw: string | undefined): number {
  return parseOptionalEnvironmentValue(portValidator, raw) ?? DEFAULT_PORT;
}

export function parsePositiveInteger(
  raw: string | undefined,
  fallback: number,
  maxValue?: number,
): number {
  const parsed = parseOptionalEnvironmentValue(positiveIntegerValidator, raw) ?? fallback;
  return maxValue === undefined ? parsed : Math.min(parsed, maxValue);
}

export function getEnvironmentValue(
  name: string,
  env: RuntimeEnvironment = getRuntimeEnvironment(),
): string | null {
  return trimEnvironmentValue(env[name]);
}

export function getEnvironmentSnapshot(
  env: RuntimeEnvironment = getRuntimeEnvironment(),
): Readonly<Record<string, string>> {
  const snapshot: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    const trimmed = trimEnvironmentValue(value);
    if (trimmed !== null) {
      snapshot[key] = trimmed;
    }
  }

  return snapshot;
}

export function getEnvironmentEntries(
  env: RuntimeEnvironment = getRuntimeEnvironment(),
): readonly [string, string][] {
  return Object.entries(getEnvironmentSnapshot(env));
}

export function getHomeDirectory(env: RuntimeEnvironment = getRuntimeEnvironment()): string | null {
  return getEnvironmentValue("HOME", env);
}

export function getClaudeConfigHome(
  env: RuntimeEnvironment = getRuntimeEnvironment(),
): string | null {
  const explicitConfigHome = getEnvironmentValue("CLAUDE_CONFIG_HOME", env);
  if (explicitConfigHome !== null) {
    return explicitConfigHome;
  }

  const homeDirectory = getHomeDirectory(env);
  return homeDirectory === null ? null : path.join(homeDirectory, ".claude");
}

export function readTrimmedEnvironmentValue(
  name: string,
  env: RuntimeEnvironment = getRuntimeEnvironment(),
): string | null {
  return parseOptionalEnvironmentValue(nonEmptyStringValidator, env[name]);
}

export function readBooleanEnvironmentValue(
  name: string,
  fallback: boolean,
  env: RuntimeEnvironment = getRuntimeEnvironment(),
): boolean {
  return parseOptionalEnvironmentValue(booleanValidator, env[name]) ?? fallback;
}

export function readNodeEnvironment(
  env: RuntimeEnvironment = getRuntimeEnvironment(),
): NodeEnvironmentName {
  return parseOptionalEnvironmentValue(nodeEnvironmentValidator, env.NODE_ENV) ?? "development";
}
