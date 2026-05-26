/**
 * Wrapture centralized defaults.
 *
 * Env-backed defaults used when unified config overrides are missing.
 *
 * @shared/config/wrapture-defaults
 */

import { readEnvStringOrNull } from "@baohaus/bao-config/env";
import { WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "@baohaus/bao-wrapture/defaults";
import { parseStrictBoolean } from "./env-boolean";

/**
 * Resolve env value from runtime environment abstractions.
 *
 * @param key - Environment variable key.
 * @returns Value from the canonical env accessor, or undefined.
 */
function getEnv(key: string): string | undefined {
  return readEnvStringOrNull(key) ?? undefined;
}

/**
 * Default Wrapture config keys derived from env.
 */
export const WRAPTURE_ENV_DEFAULTS: {
  readonly enabled: boolean;
  readonly realtimeEnabled: boolean;
  readonly typedTelemetry: boolean;
  readonly baodownRedisFullEvent: boolean;
  readonly perceptionBinary: boolean;
  readonly maxDecodeBytes: 1048576;
} = {
  enabled: parseStrictBoolean(getEnv("WRAPTURE_ENABLED"), true),
  realtimeEnabled: parseStrictBoolean(getEnv("WRAPTURE_REALTIME_ENABLED"), true),
  typedTelemetry: parseStrictBoolean(getEnv("WRAPTURE_REALTIME_TYPED_TELEMETRY"), true),
  baodownRedisFullEvent: parseStrictBoolean(getEnv("WRAPTURE_BAODOWN_REDIS_FULL_EVENT"), false),
  perceptionBinary: parseStrictBoolean(getEnv("WRAPTURE_PERCEPTION_BINARY_ENABLED"), true),
  maxDecodeBytes: WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
} as const;
