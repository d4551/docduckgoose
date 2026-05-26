/**
 * Unified Environment Variable Access
 *
 * Provides consistent environment variable access across client and server.
 * Uses lazy evaluation to prevent environment references from being bundled into client code.
 *
 * ARCHITECTURE:
 * - Client: Uses import.meta.env (set by bundler)
 * - Server: Uses runtime environment access (lazy) to avoid bundle issues
 *
 * For typed validation, prefer schema-first helpers (TypeBox / Elysia `t.*`) or lightweight checks in `libs/shared/src/validation`.
 */

/**
 * Environment detection - evaluated at module load time
 */
const IS_BROWSER: boolean = typeof window !== "undefined" && typeof document !== "undefined";

type ImportMetaWithEnv = ImportMeta & { env?: Record<string, string> };

import { isJsonGuardRecord } from "../types/json-guard.ts";

const isRecord = isJsonGuardRecord;

/**
 * Safely check if running in a Bun server context.
 *
 * @returns True when the Bun runtime is available.
 */
function isBunServer(): boolean {
  // Reflect.get prevents bundlers from statically analyzing `Bun`.
  return typeof globalThis !== "undefined" && typeof Reflect.get(globalThis, "Bun") !== "undefined";
}

/**
 * Get server-side environment variable from runtime context.
 *
 * Uses dynamic access to prevent bundlers from including environment internals.
 *
 * @param key - Environment variable name.
 * @returns Environment variable value, if set.
 */
function getServerEnv(key: string): string | undefined {
  if (!isBunServer()) {
    return;
  }
  // Reflect.get prevents bundlers from statically analyzing environment internals.
  const bun = Reflect.get(globalThis, "Bun");
  if (!isRecord(bun) || !isRecord(bun.env)) {
    return;
  }
  const value = bun.env[key];
  return typeof value === "string" ? value : undefined;
}

/**
 * Get browser-side environment variable (import.meta.env).
 *
 * @param key - Environment variable name.
 * @returns Environment variable value, if set.
 */
function getBrowserEnv(key: string): string | undefined {
  if (!IS_BROWSER) {
    return;
  }
  const env = (import.meta as ImportMetaWithEnv).env;
  if (!env) {
    return;
  }
  // Try BUN_PUBLIC_ prefixed version first, then direct name
  return env[`BUN_PUBLIC_${key}`] || env[key];
}

/**
 * Get all browser environment variables.
 *
 * @returns A shallow copy of browser environment variables.
 */
function getAllBrowserEnv(): Record<string, string> {
  if (!IS_BROWSER) {
    return {};
  }
  const env = (import.meta as ImportMetaWithEnv).env;
  return env ? { ...env } : {};
}

/**
 * Get environment variable with fallback
 * @param key - Environment variable name
 * @param [fallback=null] - Default value if variable not found
 * @returns Environment variable value or fallback
 */
export const getEnvVar: (key: string, fallback?: unknown) => unknown = (
  key: string,
  fallback: unknown = null,
): unknown => {
  // Client-side first (browser)
  if (IS_BROWSER) {
    const value = getBrowserEnv(key);
    if (value !== undefined) {
      return value;
    }
    return fallback;
  }

  // Server-side (Bun)
  const serverValue = getServerEnv(key);
  if (serverValue !== undefined) {
    return serverValue;
  }

  return fallback;
};

/**
 * Get array environment variable (comma-separated)
 * @param key - Environment variable name
 * @param [fallback=[] - ] - Default array
 * @returns Array of values
 */
export const getEnvArray: (key: string, fallback?: string[]) => string[] = (
  key: string,
  fallback: string[] = [],
): string[] => {
  const value = getEnvVar(key);
  if (!value) {
    return fallback;
  }
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item: string) => item.trim())
      .filter(Boolean);
  }
  return fallback;
};

/**
 * Check if running in production mode
 */
export const isProduction: () => boolean = (): boolean => {
  if (IS_BROWSER) {
    const env = getAllBrowserEnv();
    return env.PROD === "true" || env.MODE === "production";
  }
  const nodeEnv = String(getEnvVar("NODE_ENV", "")).toLowerCase();
  return nodeEnv.startsWith("prod");
};

/**
 * Check if running in test mode
 */
export const isTesting: () => boolean = (): boolean => {
  if (IS_BROWSER) {
    const env = getAllBrowserEnv();
    return env.MODE === "test";
  }
  return String(getEnvVar("NODE_ENV", "")).toLowerCase().startsWith("test");
};
