/**
 * Wrapture configuration resolver.
 *
 * Reads from unified config `wrapture` section. Used by protocol modules to
 * decide feature flags and limits.
 *
 * Input shape is constrained at the caller boundary via `WraptureConfigInput`
 * (a recursive JSON-record union). Callers reading from JSON sources MUST
 * structurally normalize their payload to this shape before invoking
 * `resolveWraptureConfig` — the parse-and-validate step happens at the
 * config-loader edge, not inside this resolver.
 */

import { parseStrictBoolean } from "@baohaus/bao-config/env-boolean";
import { WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "./defaults";

/**
 * Resolved Wrapture configuration shape.
 */
export interface WraptureConfig {
  /** Master enable switch. */
  enabled: boolean;
  /** Realtime binary transport (drone, scanner). */
  realtime: { enabled: boolean; typedTelemetry: boolean };
  /** BaoDown Redis full-event mode. */
  baodown: { redisFullEventEnabled: boolean };
  /** Perception point cloud/mesh binary. */
  perception: { pointCloudMeshEnabled: boolean };
  /** Decode size limit (bytes) for untrusted input. */
  limits: { maxDecodeBytes: number };
  /** Builder pool tuning for high-frequency encode paths. */
  pool: {
    /** Maximum idle builders retained per capacity tier. */
    maxIdlePerTier: number;
    /** Whether to collect per-protocol encode/decode metrics. */
    metricsEnabled: boolean;
  };
}

/**
 * Recursive JSON-record value carried by the unified config layer.
 * Mirrors the parsed shape every config-source emits (`Bun.env`, JSON
 * files, registry payloads). Used as the typed input to the resolver
 * so each field accessor has a precise domain.
 */
export type WraptureConfigValue =
  | boolean
  | number
  | string
  | null
  | readonly WraptureConfigValue[]
  | WraptureConfigInput;

export interface WraptureConfigInput {
  readonly [key: string]: WraptureConfigValue;
}

/**
 * Default Wrapture config when section is missing.
 */
export const WRAPTURE_CONFIG_DEFAULTS: WraptureConfig = {
  enabled: true,
  realtime: { enabled: true, typedTelemetry: true },
  baodown: { redisFullEventEnabled: true },
  perception: { pointCloudMeshEnabled: true },
  limits: { maxDecodeBytes: WRAPTURE_DEFAULT_MAX_DECODE_BYTES },
  pool: { maxIdlePerTier: 8, metricsEnabled: true },
};

function isConfigRecord(value: WraptureConfigValue): value is WraptureConfigInput {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nestedRecord(value: WraptureConfigValue | undefined): WraptureConfigInput {
  return value !== undefined && isConfigRecord(value) ? value : {};
}

function toBool(value: WraptureConfigValue | undefined, def: boolean): boolean {
  if (typeof value === "boolean") {
    return parseStrictBoolean(value, def);
  }
  if (typeof value === "string") {
    return parseStrictBoolean(value, def);
  }
  return def;
}

function toNum(value: WraptureConfigValue | undefined, def: number): number {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    return Number.parseInt(value, 10) || def;
  }
  return def;
}

/**
 * Resolve Wrapture config from unified config.
 *
 * @param getSection - Optional accessor for the `wrapture` config
 *   section. Returns the resolved shape, a JSON record matching
 *   `WraptureConfigInput`, or `null` when the section is absent.
 * @returns Resolved Wrapture config.
 */
export function resolveWraptureConfig(
  getSection?: (section: "wrapture") => WraptureConfigInput | null,
): WraptureConfig {
  if (!getSection) {
    return WRAPTURE_CONFIG_DEFAULTS;
  }
  const raw = getSection("wrapture");
  if (raw === null) {
    return WRAPTURE_CONFIG_DEFAULTS;
  }
  const r: WraptureConfigInput = raw;
  const realtime = nestedRecord(r.realtime);
  const baodown = nestedRecord(r.baodown);
  const perception = nestedRecord(r.perception);
  const limits = nestedRecord(r.limits);
  const pool = nestedRecord(r.pool);
  return {
    enabled: toBool(r.enabled, WRAPTURE_CONFIG_DEFAULTS.enabled),
    realtime: {
      enabled: toBool(realtime.enabled, WRAPTURE_CONFIG_DEFAULTS.realtime.enabled),
      typedTelemetry: toBool(
        realtime.typedTelemetry,
        WRAPTURE_CONFIG_DEFAULTS.realtime.typedTelemetry,
      ),
    },
    baodown: {
      redisFullEventEnabled: toBool(
        baodown.redisFullEventEnabled,
        WRAPTURE_CONFIG_DEFAULTS.baodown.redisFullEventEnabled,
      ),
    },
    perception: {
      pointCloudMeshEnabled: toBool(
        perception.pointCloudMeshEnabled,
        WRAPTURE_CONFIG_DEFAULTS.perception.pointCloudMeshEnabled,
      ),
    },
    limits: {
      maxDecodeBytes: toNum(limits.maxDecodeBytes, WRAPTURE_CONFIG_DEFAULTS.limits.maxDecodeBytes),
    },
    pool: {
      maxIdlePerTier: toNum(pool.maxIdlePerTier, WRAPTURE_CONFIG_DEFAULTS.pool.maxIdlePerTier),
      metricsEnabled: toBool(pool.metricsEnabled, WRAPTURE_CONFIG_DEFAULTS.pool.metricsEnabled),
    },
  };
}
