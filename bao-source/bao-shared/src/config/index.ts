import { API_PATHS } from "@baohaus/bao-constants/api-paths";
import type { DeepPartial } from "@baohaus/bao-types/deep-partial";
import { getEnvVar } from "../utils/env";

const HTTP_SCHEME_RE: RegExp = /^https?:\/\//i;
const PROTOCOL_COLON_RE: RegExp = /:$/;
const DEFAULT_HTTP_PORT = 80;
const DEFAULT_HTTPS_PORT = 443;

/**
 * Interface RuntimePorts.
 */
export interface RuntimePorts {
  /**
   * Canonical API port (Elysia HTTP server).
   */
  api?: number;
  [key: string]: number | undefined;
}

/**
 * Interface RuntimeBaseUrls.
 */
export interface RuntimeBaseUrls {
  origin: string | null;
  api: string | null;
  apiBasePath: string;
  websocket: string | null;
}

/**
 * Interface RuntimeEnvironment.
 */
export interface RuntimeEnvironment {
  nodeEnv?: string;
  mode?: string;
}

/**
 * Interface RuntimeDatabaseSummary.
 */
export interface RuntimeDatabaseSummary {
  type?: string | null;
  host?: string | null;
  port?: number | null;
  database?: string | null;
  fallbackEnabled?: boolean;
}

/**
 * Interface RuntimeState.
 */
export interface RuntimeState {
  ports: RuntimePorts;
  baseUrls: RuntimeBaseUrls;
  environment: RuntimeEnvironment;
  database: RuntimeDatabaseSummary;
}

/**
 * Interface RuntimeStateUpdate.
 */
export interface RuntimeStateUpdate extends DeepPartial<RuntimeState> {}

/** DEFAULT_API_BASE_PATH configuration. */
export const DEFAULT_API_BASE_PATH: "/api" = API_PATHS.root;

/**
 * Attempt to read bundler-provided environment variables.
 *
 * @returns Import meta env or undefined.
 */
const getImportMetaEnv = (): Record<string, string | undefined> | undefined => import.meta.env;

/**
 * Remove trailing slashes from a URL-like string.
 *
 * @param value - Raw value.
 * @returns Normalized string.
 */
export const stripTrailingSlash: (value?: string | null) => string | null = (
  value?: string | null,
): string | null => {
  if (value == null) {
    return null;
  }
  if (value === "/") {
    return "/";
  }
  const trimmed = value.replace(/\/+$/g, "");
  return trimmed || value;
};

/**
 * Normalize an API base path or URL into a path-only value.
 *
 * @param value - Raw base path or URL.
 * @returns Normalized base path.
 */
export const normalizeApiBasePath: (value?: string | null) => string = (
  value?: string | null,
): string => {
  if (!value) {
    return DEFAULT_API_BASE_PATH;
  }
  const stringValue = String(value).trim();
  if (!stringValue) {
    return DEFAULT_API_BASE_PATH;
  }
  if (HTTP_SCHEME_RE.test(stringValue)) {
    const canParse =
      typeof URL !== "undefined" && typeof URL.canParse === "function" && URL.canParse(stringValue);
    if (!canParse) {
      return DEFAULT_API_BASE_PATH;
    }
    const parsed = new URL(stringValue);
    const pathname = parsed.pathname || "/";
    if (pathname === "/") {
      return pathname;
    }
    return pathname.replace(/\/+$/g, "") || "/";
  }
  const prefixed = stringValue.startsWith("/") ? stringValue : `/${stringValue}`;
  if (prefixed === "/") {
    return "/";
  }
  return prefixed.replace(/\/+$/g, "") || "/";
};

/**
 * Select the first finite numeric candidate.
 *
 * @param candidates - Candidate values to test.
 * @returns First finite number or null.
 */
export const toFiniteNumber: (...candidates: unknown[]) => number | null = (...candidates) => {
  for (const candidate of candidates) {
    if (candidate == null) {
      continue;
    }
    const value = typeof candidate === "number" ? candidate : Number(candidate);
    if (Number.isFinite(value)) {
      return value;
    }
  }
  return null;
};

/**
 * Coerce a value to a plain object when possible.
 *
 * @param value - Candidate value.
 * @returns Plain object or null.
 */
export const toPlainObject: (value: unknown) => Record<string, unknown> | null = (
  value: unknown,
): Record<string, unknown> | null => {
  if (isMergeableRecord(value)) {
    return value;
  }
  return null;
};

/**
 * Build an origin string from protocol, host, and port.
 *
 * @param protocol - Protocol (http/https).
 * @param host - Hostname.
 * @param port - Port number.
 * @returns Origin string or null.
 */
export const buildOriginFromParts: (
  protocol?: string,
  host?: string,
  port?: number | string | null,
) => string | null = (
  protocol?: string,
  host?: string,
  port?: number | string | null,
): string | null => {
  if (!(protocol && host)) {
    return null;
  }
  const sanitizedProtocol = protocol.replace(PROTOCOL_COLON_RE, "");
  const numericPort = typeof port === "string" ? Number.parseInt(port, 10) : port;
  const includePort =
    numericPort &&
    Number.isFinite(numericPort) &&
    !([DEFAULT_HTTP_PORT, DEFAULT_HTTPS_PORT] as readonly number[]).includes(numericPort);
  return `${sanitizedProtocol}://${host}${includePort ? `:${numericPort}` : ""}`;
};

/**
 * Create a runtime state snapshot with sane defaults.
 *
 * @param initial - Optional initial state override.
 * @returns Normalized runtime state.
 */
export const createRuntimeState: (initial?: RuntimeStateUpdate) => RuntimeState = (
  initial?: RuntimeStateUpdate,
): RuntimeState => {
  const envNodeEnv = getEnvVar("NODE_ENV");

  return {
    ports: {
      http: Number(initial?.ports?.http) || undefined,
      api: Number(initial?.ports?.api) || undefined,
      websocket: Number(initial?.ports?.websocket) || undefined,
      ...initial?.ports,
    },
    baseUrls: {
      origin: initial?.baseUrls?.origin ?? null,
      api:
        initial?.baseUrls?.api ?? (typeof window === "undefined" ? null : window.location.origin),
      apiBasePath: normalizeApiBasePath(initial?.baseUrls?.apiBasePath),
      websocket: initial?.baseUrls?.websocket ?? null,
    },
    environment: {
      nodeEnv:
        initial?.environment?.nodeEnv ?? (typeof envNodeEnv === "string" ? envNodeEnv : undefined),
      mode: initial?.environment?.mode ?? getImportMetaEnv()?.MODE,
      ...initial?.environment,
    },
    database: {
      type: initial?.database?.type ?? null,
      host: initial?.database?.host ?? null,
      port: initial?.database?.port ?? null,
      database: initial?.database?.database ?? null,
      fallbackEnabled: initial?.database?.fallbackEnabled ?? false,
    },
  };
};

/**
 * Merge a runtime state patch into a target state.
 *
 * @param target - Current runtime state.
 * @param patch - Patch to apply.
 * @returns Merged runtime state.
 */
export function mergeRuntimeState(target: RuntimeState, patch: RuntimeStateUpdate): RuntimeState {
  const next: RuntimeState = {
    ports: { ...target.ports, ...patch.ports },
    baseUrls: {
      ...target.baseUrls,
      ...patch.baseUrls,
      apiBasePath: patch.baseUrls?.apiBasePath
        ? normalizeApiBasePath(patch.baseUrls.apiBasePath)
        : target.baseUrls.apiBasePath,
    },
    environment: { ...target.environment, ...patch.environment },
    database: { ...target.database, ...patch.database },
  };
  return next;
}

/**
 * Determine whether a value is a mergeable object record.
 *
 * @param value - Candidate value.
 * @returns True when value is a plain object-like record.
 */
function isMergeableRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * Deep-merge two plain records.
 *
 * @param target - Target record.
 * @param source - Source record.
 * @returns Merged record.
 */
function deepMergeRecord(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  return deepMerge<Record<string, unknown>>(target, source);
}

/**
 * Deep-merge a partial object into a target.
 *
 * T - Target object type.
 * @param target - Target object.
 * @param source - Partial object patch.
 * @returns Merged object.
 */
export function deepMerge<T extends object>(target: T, source: DeepPartial<T>): T {
  // Both target and source are guarded as objects by the generic constraint.
  // We work through Record<string, unknown> views for safe key iteration.
  if (!isMergeableRecord(target)) {
    return target;
  }
  const output: Record<string, unknown> = { ...target };
  if (!isMergeableRecord(source)) {
    return output as T & Record<string, unknown>;
  }
  const sourceRecord: Record<string, unknown> = source;

  for (const key of Object.keys(sourceRecord)) {
    const value = sourceRecord[key];
    const current = output[key];

    if (isMergeableRecord(value) && isMergeableRecord(current)) {
      output[key] = deepMergeRecord(current, value);
    } else if (value !== undefined) {
      output[key] = value;
    }
  }
  // The spread of target preserves T's runtime shape; mutations above only
  // overwrote keys present in DeepPartial<T>. The return satisfies T.
  return output as T & Record<string, unknown>;
}
