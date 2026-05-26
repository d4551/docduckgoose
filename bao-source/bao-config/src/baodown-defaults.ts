/**
 * BaoDown centralized defaults.
 *
 * Centralizes BaoDown defaults used by both:
 * - Server runtime config normalization (`apps/server/services/baodown/baodown-config.service.ts`)
 * - HTML UI runtime config defaults (`apps/server/templates/`)
 *
 * This keeps all "safe defaults" in one place while still allowing per-environment
 * overrides via env/unified config layers.
 *
 * @shared/config/baodown-defaults
 */

import { MS_PER_HOUR, MS_PER_MINUTE, SECONDS_PER_HOUR } from "@baohaus/bao-constants/time";
/**
 * Public (client-visible) BaoDown defaults used in runtime config.
 */
export const BAODOWN_PUBLIC_RUNTIME_DEFAULTS = {
  /**
   * Editor and trigger defaults for new definitions/schedules.
   */
  defaults: {
    /** Default cron expression for new schedules. */
    scheduleCronExpr: "@hourly",
    /** Default timezone for new schedules. */
    scheduleTimezone: "UTC",
    /** Default enabled flag for new schedules. */
    scheduleIsActive: true,
    /** Default enabled flag for new webhooks. */
    webhookIsActive: true,
    /** Default scaffold node positions in the graph editor. */
    defaultGraph: {
      triggerPosition: { x: 80, y: 80 },
      endPosition: { x: 420, y: 80 },
    },
  },
  /**
   * Dashboard query defaults.
   */
  dashboard: {
    /** Default list limit for definition listing in BaoDown dashboards. */
    definitionListLimit: 200,
    /** Maximum allowed list limit for definition listing in BaoDown dashboards. */
    definitionListLimitMax: 200,
    /** Default list limit for run listing in BaoDown dashboards. */
    runListLimit: 50,
    /** Maximum allowed list limit for run listing in BaoDown dashboards. */
    runListLimitMax: 200,
  },
  /**
   * SSE run event UI defaults (client caching/storage).
   */
  runEvents: {
    /** Storage key prefix for persisted run event cursors. */
    storageKeyPrefix: "baodown-run:",
    /** Maximum number of run events to retain in memory in the UI. */
    maxEvents: 250,
    /** Cookie defaults for persisted run event cursors. */
    cookie: {
      /** Cookie max age (seconds) for replay cursor persistence. */
      maxAgeSeconds: SECONDS_PER_HOUR,
      /** SameSite policy for replay cursor cookies. */
      sameSite: "lax",
      /** Secure flag for replay cursor cookies. */
      secure: false,
      /** Cookie path for replay cursor cookies. */
      path: "/",
    },
  },
  /**
   * Diff UI bounds when comparing graphs.
   */
  diff: {
    /** Maximum number of diff paths to show before truncation. */
    maxPaths: 250,
    /** Maximum nested depth for diff traversal. */
    maxDepth: 8,
  },
  /**
   * Integration snapshot caching defaults.
   *
   * Controls stale-while-revalidate behavior for `/api/v1/baodown/integration`.
   */
  integration: {
    /** Time in milliseconds after which the snapshot should be revalidated in the background. */
    snapshotStaleTimeMs: 30_000,
  },
} as const;

const BAODOWN_COOKIE_SAMESITE_VALUES: Set<unknown> = new Set(["lax", "strict", "none"]);
const BAODOWN_ZERO_UUID_SEGMENTS: readonly string[] = [
  "00000000",
  "0000",
  "0000",
  "0000",
  "000000000000",
] as const;

/**
 * Default system actor UUID for BaoDown-originated RPA executions.
 */
export const BAODOWN_DEFAULT_TRIGGERED_BY_UUID: string = BAODOWN_ZERO_UUID_SEGMENTS.join("-");

/** Default PostgreSQL LISTEN/NOTIFY channel for BaoDown cross-replica wakeups. */
export const BAODOWN_PG_NOTIFY_CHANNEL_DEFAULT = "baodown_run_events";

/**
 * Cookie SameSite policy supported by BaoDown replay cursor persistence.
 */
export type BaoDownCookieSameSite = "lax" | "strict" | "none";

/**
 * BaoDown public runtime configuration.
 */
export interface BaoDownPublicRuntimeConfig {
  /** Editor and trigger defaults for new definitions/schedules. */
  defaults: {
    /** Default cron expression for new schedules. */
    scheduleCronExpr: string;
    /** Default timezone for new schedules. */
    scheduleTimezone: string;
    /** Default enabled flag for new schedules. */
    scheduleIsActive: boolean;
    /** Default enabled flag for new webhooks. */
    webhookIsActive: boolean;
    /** Default scaffold node positions in the graph editor. */
    defaultGraph: {
      triggerPosition: { x: number; y: number };
      endPosition: { x: number; y: number };
    };
  };
  /** Dashboard query defaults. */
  dashboard: {
    /** Default list limit for definition listing in BaoDown dashboards. */
    definitionListLimit: number;
    /** Default list limit for run listing in BaoDown dashboards. */
    runListLimit: number;
  };
  /** SSE run event UI defaults (client caching/storage). */
  runEvents: {
    /** Storage key prefix for persisted run event cursors. */
    storageKeyPrefix: string;
    /** Maximum number of run events to retain in memory in the UI. */
    maxEvents: number;
    /** Cookie defaults for persisted run event cursors. */
    cookie: {
      /** Cookie max age (seconds) for replay cursor persistence. */
      maxAgeSeconds: number;
      /** SameSite policy for replay cursor cookies. */
      sameSite: BaoDownCookieSameSite;
      /** Secure flag for replay cursor cookies. */
      secure: boolean;
      /** Cookie path for replay cursor cookies. */
      path: string;
    };
  };
  /** Diff UI bounds when comparing graphs. */
  diff: {
    /** Maximum number of diff paths to show before truncation. */
    maxPaths: number;
    /** Maximum nested depth for diff traversal. */
    maxDepth: number;
  };
  /** Integration snapshot caching defaults. */
  integration: {
    /** Time in milliseconds after which the snapshot should be revalidated in the background. */
    snapshotStaleTimeMs: number;
  };
}

/**
 * Resolve an integer environment value with a safe fallback.
 *
 * @param rawValue - Raw env value.
 * @param fallback - Fallback integer.
 * @returns Parsed integer.
 */
function resolveIntegerEnv(rawValue: string | undefined, fallback: number): number {
  if (!rawValue?.trim()) {
    return fallback;
  }
  const parsed = Number(rawValue);
  if (Number.isInteger(parsed) && parsed >= 0) {
    return parsed;
  }
  return fallback;
}

/**
 * Resolve a boolean environment value with a safe fallback.
 *
 * @param rawValue - Raw env value.
 * @param fallback - Fallback boolean.
 * @returns Parsed boolean.
 */
function resolveBooleanEnv(rawValue: string | undefined, fallback: boolean): boolean {
  if (!rawValue?.trim()) {
    return fallback;
  }
  return isTruthy(rawValue);
}

/**
 * Resolve a string environment value with a safe fallback.
 *
 * @param rawValue - Raw env value.
 * @param fallback - Fallback string.
 * @returns Parsed string.
 */
function resolveStringEnv(rawValue: string | undefined, fallback: string): string {
  if (typeof rawValue !== "string") {
    return fallback;
  }
  const trimmed = rawValue.trim();
  return trimmed ? trimmed : fallback;
}

/**
 * Runtime guard for BaoDownCookieSameSite set membership.
 *
 * @param value - Candidate string value.
 * @returns True when value is a valid SameSite policy.
 */
function isBaoDownCookieSameSite(value: string): value is BaoDownCookieSameSite {
  return BAODOWN_COOKIE_SAMESITE_VALUES.has(value);
}

/**
 * Resolve SameSite cookie policy from environment overrides.
 *
 * @param rawValue - Raw env value.
 * @param fallback - Fallback SameSite value.
 * @returns Normalized SameSite value.
 */
function resolveSameSiteEnv(
  rawValue: string | undefined,
  fallback: BaoDownCookieSameSite,
): BaoDownCookieSameSite {
  if (typeof rawValue !== "string") {
    return fallback;
  }
  const trimmed = rawValue.trim().toLowerCase();
  if (!trimmed) {
    return fallback;
  }
  if (isBaoDownCookieSameSite(trimmed)) {
    return trimmed;
  }
  return fallback;
}

/**
 * Checks if an environment variable value represents a truthy state.
 * Strict coercion: only "true" (case-insensitive) per AGENTS.md.
 *
 * @param value - Environment variable value.
 * @returns True if value is exactly "true", false otherwise.
 */
function isTruthy(value: string | undefined): boolean {
  if (!value) {
    return false;
  }
  return value.trim().toLowerCase() === "true";
}

/**
 * Resolve BaoDown public runtime config for HTML UI from environment overrides.
 *
 * @param env - Runtime environment map.
 * @returns Normalized BaoDown public runtime config.
 */
export function resolveBaoDownPublicRuntimeConfig(
  env: Record<string, string | undefined>,
): BaoDownPublicRuntimeConfig {
  return {
    defaults: {
      scheduleCronExpr:
        env.APP_PUBLIC_BAODOWN_DEFAULT_SCHEDULE_CRON_EXPR ??
        BAODOWN_PUBLIC_RUNTIME_DEFAULTS.defaults.scheduleCronExpr,
      scheduleTimezone:
        env.APP_PUBLIC_BAODOWN_DEFAULT_SCHEDULE_TIMEZONE ??
        BAODOWN_PUBLIC_RUNTIME_DEFAULTS.defaults.scheduleTimezone,
      scheduleIsActive: isTruthy(
        env.APP_PUBLIC_BAODOWN_DEFAULT_SCHEDULE_IS_ACTIVE ??
          String(BAODOWN_PUBLIC_RUNTIME_DEFAULTS.defaults.scheduleIsActive),
      ),
      webhookIsActive: isTruthy(
        env.APP_PUBLIC_BAODOWN_DEFAULT_WEBHOOK_IS_ACTIVE ??
          String(BAODOWN_PUBLIC_RUNTIME_DEFAULTS.defaults.webhookIsActive),
      ),
      defaultGraph: {
        triggerPosition: {
          x: resolveIntegerEnv(
            env.APP_PUBLIC_BAODOWN_DEFAULT_GRAPH_TRIGGER_X,
            BAODOWN_PUBLIC_RUNTIME_DEFAULTS.defaults.defaultGraph.triggerPosition.x,
          ),
          y: resolveIntegerEnv(
            env.APP_PUBLIC_BAODOWN_DEFAULT_GRAPH_TRIGGER_Y,
            BAODOWN_PUBLIC_RUNTIME_DEFAULTS.defaults.defaultGraph.triggerPosition.y,
          ),
        },
        endPosition: {
          x: resolveIntegerEnv(
            env.APP_PUBLIC_BAODOWN_DEFAULT_GRAPH_END_X,
            BAODOWN_PUBLIC_RUNTIME_DEFAULTS.defaults.defaultGraph.endPosition.x,
          ),
          y: resolveIntegerEnv(
            env.APP_PUBLIC_BAODOWN_DEFAULT_GRAPH_END_Y,
            BAODOWN_PUBLIC_RUNTIME_DEFAULTS.defaults.defaultGraph.endPosition.y,
          ),
        },
      },
    },
    dashboard: {
      definitionListLimit: Math.min(
        BAODOWN_PUBLIC_RUNTIME_DEFAULTS.dashboard.definitionListLimitMax,
        Math.max(
          1,
          resolveIntegerEnv(
            env.APP_PUBLIC_BAODOWN_DASHBOARD_DEFINITION_LIST_LIMIT,
            BAODOWN_PUBLIC_RUNTIME_DEFAULTS.dashboard.definitionListLimit,
          ),
        ),
      ),
      runListLimit: Math.min(
        BAODOWN_PUBLIC_RUNTIME_DEFAULTS.dashboard.runListLimitMax,
        Math.max(
          1,
          resolveIntegerEnv(
            env.APP_PUBLIC_BAODOWN_DASHBOARD_RUN_LIST_LIMIT,
            BAODOWN_PUBLIC_RUNTIME_DEFAULTS.dashboard.runListLimit,
          ),
        ),
      ),
    },
    runEvents: {
      storageKeyPrefix:
        env.APP_PUBLIC_BAODOWN_RUN_EVENTS_STORAGE_KEY_PREFIX ??
        BAODOWN_PUBLIC_RUNTIME_DEFAULTS.runEvents.storageKeyPrefix,
      maxEvents: Math.max(
        1,
        resolveIntegerEnv(
          env.APP_PUBLIC_BAODOWN_RUN_EVENTS_MAX_EVENTS,
          BAODOWN_PUBLIC_RUNTIME_DEFAULTS.runEvents.maxEvents,
        ),
      ),
      cookie: {
        maxAgeSeconds: Math.max(
          0,
          resolveIntegerEnv(
            env.APP_PUBLIC_BAODOWN_RUN_EVENTS_COOKIE_MAX_AGE_SECONDS,
            BAODOWN_PUBLIC_RUNTIME_DEFAULTS.runEvents.cookie.maxAgeSeconds,
          ),
        ),
        sameSite: resolveSameSiteEnv(
          env.APP_PUBLIC_BAODOWN_RUN_EVENTS_COOKIE_SAME_SITE,
          BAODOWN_PUBLIC_RUNTIME_DEFAULTS.runEvents.cookie.sameSite,
        ),
        secure: resolveBooleanEnv(
          env.APP_PUBLIC_BAODOWN_RUN_EVENTS_COOKIE_SECURE,
          BAODOWN_PUBLIC_RUNTIME_DEFAULTS.runEvents.cookie.secure,
        ),
        path: resolveStringEnv(
          env.APP_PUBLIC_BAODOWN_RUN_EVENTS_COOKIE_PATH,
          BAODOWN_PUBLIC_RUNTIME_DEFAULTS.runEvents.cookie.path,
        ),
      },
    },
    diff: {
      maxPaths: Math.max(
        1,
        resolveIntegerEnv(
          env.APP_PUBLIC_BAODOWN_DIFF_MAX_PATHS,
          BAODOWN_PUBLIC_RUNTIME_DEFAULTS.diff.maxPaths,
        ),
      ),
      maxDepth: Math.max(
        0,
        resolveIntegerEnv(
          env.APP_PUBLIC_BAODOWN_DIFF_MAX_DEPTH,
          BAODOWN_PUBLIC_RUNTIME_DEFAULTS.diff.maxDepth,
        ),
      ),
    },
    integration: {
      snapshotStaleTimeMs: Math.max(
        0,
        resolveIntegerEnv(
          env.APP_PUBLIC_BAODOWN_INTEGRATION_SNAPSHOT_STALE_TIME_MS,
          BAODOWN_PUBLIC_RUNTIME_DEFAULTS.integration.snapshotStaleTimeMs,
        ),
      ),
    },
  };
}

/**
 * Server-side BaoDown defaults used when unified config/env overrides are missing.
 */
export const BAODOWN_SERVER_DEFAULTS = {
  rpaTriggeredBy: BAODOWN_DEFAULT_TRIGGERED_BY_UUID,
  pgNotify: {
    channel: BAODOWN_PG_NOTIFY_CHANNEL_DEFAULT,
  },
  sse: {
    pollIntervalMs: 250,
    idleTimeoutMs: 30_000,
    maxBatchSize: 250,
    redisNotify: {
      enabled: true,
      channel: "baodown:sse:wakeup",
    },
  },
  execution: {
    maxRunTimeMs: MS_PER_HOUR,
    nodeTimeoutMs: MS_PER_MINUTE,
    maxNodeDelayMs: 300_000,
    nodeMaxAttempts: 3,
    cancellationPollIntervalMs: 250,
    nodeRetryBaseDelayMs: 250,
    nodeRetryMaxDelayMs: 5_000,
    nodeRetryJitterRatio: 0.2,
    maxConcurrentNodes: 4,
    eventWriteQueueMax: 2_000,
    eventWriteMaxAttempts: 5,
  },
  queue: {
    singletonSeconds: 60,
  },
  triggers: {
    scheduler: {
      enabled: true,
      pollIntervalMs: 10_000,
      maxSchedulesPerPoll: 25,
      /** Maximum concurrent runs per schedule (0 = unlimited). */
      maxConcurrentRunsPerSchedule: 0,
    },
    webhook: {
      enabled: true,
      secretLength: 40,
      endpointKeyLength: 32,
      replayWindowMs: 300_000,
      requireTimestamp: true,
      requireNonce: true,
      nonceCacheMaxEntries: 10_000,
    },
  },
  retention: {
    enabled: true,
    runRetentionDays: 90,
    eventRetentionDays: 30,
    batchSize: 500,
    singletonSeconds: 3_600,
  },
  workers: {
    runBatchSize: 1,
    scheduleTickBatchSize: 1,
    cleanupBatchSize: 5,
  },
  capabilities: {
    /**
     * Capability requirement mapping for BaoDown node types.
     *
     * When a node type starts with one of these prefixes, the corresponding capability
     * must be registered and healthy/degraded for the node to execute successfully.
     */
    nodeTypeCapabilityMap: [
      // Plugin capabilities use the Elysia plugin registry name, e.g. `plugin:api:v1:pipelines`.
      { prefix: "integration.pipeline.", capabilityId: "plugin:api:v1:pipelines" },
      { prefix: "integration.ai.", capabilityId: "plugin:api:v1:ai" },
      { prefix: "integration.training.", capabilityId: "plugin:api:v1:training" },
      { prefix: "integration.hardware.", capabilityId: "plugin:api:v1:hardware" },
      { prefix: "integration.storage.", capabilityId: "plugin:api:v1:storage" },
      { prefix: "integration.notification.", capabilityId: "plugin:api:v1:notifications" },
      { prefix: "integration.clinical.baofire.", capabilityId: "plugin:baofire:fhir" },
      { prefix: "integration.clinical.dimsum.", capabilityId: "bunbuddy:dimsum" },

      // BunBuddy-backed integrations should gate on the bunbuddy capability itself.
      { prefix: "integration.rpa.", capabilityId: "bunbuddy:rpa" },
      { prefix: "integration.robotics.", capabilityId: "bunbuddy:robotics" },
      { prefix: "integration.vehicle.", capabilityId: "bunbuddy:robotics" },
      { prefix: "integration.drone.", capabilityId: "bunbuddy:drone" },
      { prefix: "integration.uav.", capabilityId: "bunbuddy:drone" },
    ],
  },
} as const;
