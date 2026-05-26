/**
 * Minimal OCI distribution registry v2 client helpers (Bun-native).
 *
 * Used by BaoControlPlane validators to verify that promoted artifacts exist in the registry:
 * - OCI package manifests (Package CRD sources)
 * - Container image manifests / multi-arch indices
 *
 * Implements Bearer token flow via `WWW-Authenticate` challenges and supports Basic auth.
 *
 * @baohaus/bao-utils/oci-registry
 */

import {
  OCI_IMAGE_INDEX_MEDIA_TYPE,
  OCI_IMAGE_MANIFEST_MEDIA_TYPE,
} from "@baohaus/bao-constants/container-runtime";
import { DEFAULT_HEALTHCHECK_RETRY_CONFIG } from "@baohaus/bao-constants/retries";
import { resolveTimeout } from "@baohaus/bao-constants/timeouts";
import { getErrorMessage, toResult, toResultAsync, toResultSync } from "./async-result";
import { fetchWithRetry } from "./http-client";
import { ensureUrlWithScheme } from "./url-scheme";

const WHITESPACE_RE: RegExp = /\s+/;
const LEADING_SLASHES_RE: RegExp = /^\/+/;
const TRAILING_SLASHES_RE: RegExp = /\/+$/;
const OCI_HTTP_TIMEOUT = 408;
const OCI_HTTP_TOO_MANY = 429;
const OCI_HTTP_INTERNAL = 500;
const OCI_HTTP_BAD_GATEWAY = 502;
const OCI_HTTP_UNAVAILABLE = 503;
const OCI_HTTP_GATEWAY_TIMEOUT = 504;
const OCI_HTTP_UNAUTHORIZED = 401;

/**
 * Registry authentication inputs.
 */
export type OciRegistryAuth = {
  /** Username for Basic auth or token exchange. */
  username: string | null;
  /** Password for Basic auth or token exchange. */
  password: string | null;
  /** Pre-issued Bearer token (preferred when available). */
  token: string | null;
};

/**
 * OCI manifest media types that represent multi-arch indices.
 */
export const OCI_MULTIARCH_MEDIA_TYPES: readonly ["application/vnd.oci.image.index.v1+json"] = [
  OCI_IMAGE_INDEX_MEDIA_TYPE,
] as const;

/**
 * Result of fetching an OCI manifest.
 */
export type OciManifestFetchResult = {
  ok: boolean;
  status: number;
  manifest: Record<string, unknown> | null;
  raw: string | null;
  error: string | null;
};

/**
 * Retry configuration for registry requests.
 */
export type OciRegistryRetryConfig = {
  /** Maximum attempts (including initial attempt). */
  maxAttempts: number;
  /** Base delay between attempts (ms). */
  baseDelayMs: number;
  /** Maximum delay cap (ms). */
  maxDelayMs: number;
};

type WwwAuthenticateChallenge = {
  scheme: "Bearer" | "Basic" | "Unknown";
  params: Record<string, string>;
};

/**
 * Typed error used to trigger retries for retryable HTTP statuses.
 */
export class OciRegistryHttpStatusError extends Error {
  /** HTTP status code returned by the registry. */
  readonly status: number;

  /**
   * @param status - HTTP status code.
   * @param message - Optional message override.
   */
  constructor(status: number, message?: string) {
    super(message ?? `HTTP ${status}`);
    this.name = "OciRegistryHttpStatusError";
    this.status = status;
  }
}

function normalizeOptionalString(value: unknown): string | null {
  const normalized = typeof value === "string" ? value.trim() : String(value ?? "").trim();
  return normalized ? normalized : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function encodeBasicAuth(username: string, password: string): string {
  const text = `${username}:${password}`;
  const encoded = Buffer.from(text, "utf8").toString("base64");
  return `Basic ${encoded}`;
}

function parseWwwAuthenticate(value: string | null): WwwAuthenticateChallenge | null {
  const header = normalizeOptionalString(value);
  if (!header) {
    return null;
  }

  const [schemeRaw, ...rest] = header.split(WHITESPACE_RE);
  const scheme = (schemeRaw ?? "").trim();
  const paramsText = rest.join(" ").trim();
  const params: Record<string, string> = Object.create(null);

  const re = /([a-zA-Z][a-zA-Z0-9_-]*)="([^"]*)"/g;
  for (const match of paramsText.matchAll(re)) {
    const key = (match[1] ?? "").trim();
    const val = match[2] ?? "";
    if (key) {
      params[key] = val;
    }
  }

  if (scheme.toLowerCase() === "bearer") {
    return { scheme: "Bearer", params };
  }
  if (scheme.toLowerCase() === "basic") {
    return { scheme: "Basic", params };
  }
  return { scheme: "Unknown", params };
}

function normalizeRegistryBaseUrl(registry: string): string {
  const trimmed = registry.trim().replace(TRAILING_SLASHES_RE, "");
  if (!trimmed) {
    return "";
  }
  return ensureUrlWithScheme(trimmed, "https");
}

function normalizeRetryConfig(
  retry?: Partial<OciRegistryRetryConfig>,
): Required<OciRegistryRetryConfig> {
  const fallback = DEFAULT_HEALTHCHECK_RETRY_CONFIG;
  return {
    maxAttempts:
      Number.isFinite(retry?.maxAttempts) && (retry?.maxAttempts ?? 0) > 0
        ? (retry?.maxAttempts as number)
        : fallback.maxAttempts,
    baseDelayMs:
      Number.isFinite(retry?.baseDelayMs) && (retry?.baseDelayMs ?? 0) > 0
        ? (retry?.baseDelayMs as number)
        : fallback.baseDelayMs,
    maxDelayMs:
      Number.isFinite(retry?.maxDelayMs) && (retry?.maxDelayMs ?? 0) > 0
        ? (retry?.maxDelayMs as number)
        : fallback.maxDelayMs,
  };
}

function combineSignals(timeoutMs: number, upstream?: AbortSignal): AbortSignal | undefined {
  const signals: AbortSignal[] = [];
  if (upstream) {
    signals.push(upstream);
  }
  if (timeoutMs > 0) {
    signals.push(AbortSignal.timeout(timeoutMs));
  }
  if (signals.length === 0) {
    return;
  }
  if (signals.length === 1) {
    return signals[0];
  }
  return AbortSignal.any(signals);
}

async function fetchBearerToken(params: {
  realm: string;
  service: string | null;
  scope: string | null;
  auth: OciRegistryAuth;
  insecure: boolean;
  timeoutMs: number;
  retry: Required<OciRegistryRetryConfig>;
  signal?: AbortSignal;
}): Promise<string | null> {
  const url = new URL(params.realm);
  if (params.service) {
    url.searchParams.set("service", params.service);
  }
  if (params.scope) {
    url.searchParams.set("scope", params.scope);
  }

  const headers: Record<string, string> = {};
  if (params.auth.token) {
    headers.Authorization = `Bearer ${params.auth.token}`;
  } else if (params.auth.username && params.auth.password) {
    headers.Authorization = encodeBasicAuth(params.auth.username, params.auth.password);
  }

  const combined = combineSignals(params.timeoutMs, params.signal);
  const resp = await fetchWithRetry(
    url.toString(),
    {
      method: "GET",
      headers,
      ...(combined != null && { signal: combined }),
      ...(params.insecure ? { tls: { rejectUnauthorized: false } } : {}),
    },
    {
      timeoutMs: params.timeoutMs,
      maxAttempts: params.retry.maxAttempts,
      baseDelayMs: params.retry.baseDelayMs,
      maxDelayMs: params.retry.maxDelayMs,
      retryOnStatus: true,
      retryStatusCodes: [
        OCI_HTTP_TIMEOUT,
        OCI_HTTP_TOO_MANY,
        OCI_HTTP_INTERNAL,
        OCI_HTTP_BAD_GATEWAY,
        OCI_HTTP_UNAVAILABLE,
        OCI_HTTP_GATEWAY_TIMEOUT,
      ],
    },
  );

  if (!resp.ok) {
    return null;
  }
  const jsonResult = await toResult(() => resp.json() as Promise<unknown>);
  if (!jsonResult.ok) {
    return null;
  }

  const record = isRecord(jsonResult.value) ? jsonResult.value : null;
  const token =
    normalizeOptionalString(record?.token) ?? normalizeOptionalString(record?.access_token);
  return token;
}

type ManifestAuthContext = {
  repository: string;
  auth: OciRegistryAuth;
  insecure: boolean;
  timeoutMs: number;
  retry: Required<OciRegistryRetryConfig>;
  signal?: AbortSignal;
};

function doManifestRequest(
  params: {
    url: string;
    headers: Record<string, string>;
    timeoutMs: number;
    insecure: boolean;
  },
  attemptSignal?: AbortSignal,
  extraHeaders?: Record<string, string>,
): Promise<Response> {
  const combined = combineSignals(params.timeoutMs, attemptSignal);
  return fetchWithRetry(
    params.url,
    {
      method: "GET",
      headers: { ...params.headers, ...(extraHeaders ?? {}) },
      ...(combined != null && { signal: combined }),
      ...(params.insecure ? { tls: { rejectUnauthorized: false } } : {}),
    },
    {
      timeoutMs: params.timeoutMs,
      retryOnStatus: true,
    },
  );
}

async function resolveBearerToken(
  response: Response,
  context: ManifestAuthContext,
): Promise<string | null> {
  const challenge = parseWwwAuthenticate(response.headers.get("www-authenticate"));
  if (challenge?.scheme !== "Bearer") {
    return null;
  }

  const realm = normalizeOptionalString(challenge.params.realm);
  if (!realm) {
    return null;
  }

  const service = normalizeOptionalString(challenge.params.service);
  const scope =
    normalizeOptionalString(challenge.params.scope) ?? `repository:${context.repository}:pull`;

  return await fetchBearerToken({
    realm,
    service,
    scope,
    auth: context.auth,
    insecure: context.insecure,
    timeoutMs: context.timeoutMs,
    retry: context.retry,
    signal: context.signal,
  });
}

async function fetchManifestResponse(
  request: (
    requestSignal?: AbortSignal,
    extraHeaders?: Record<string, string>,
  ) => Promise<Response>,
  challengeContext: ManifestAuthContext,
  authSignal?: AbortSignal,
): Promise<Response> {
  const response = await request(authSignal);
  if (response.status !== OCI_HTTP_UNAUTHORIZED) {
    return response;
  }

  const token = await resolveBearerToken(response, challengeContext);
  if (!token) {
    return response;
  }

  const retryResponse = await request(authSignal, { Authorization: `Bearer ${token}` });
  return retryResponse;
}

type FetchOciManifestParams = {
  registry: string;
  repository: string;
  reference: string;
  accept?: string[];
  auth?: Partial<OciRegistryAuth>;
  insecure?: boolean;
  /** Per-attempt request timeout (ms). Defaults to `resolveTimeout('apiRequestMs')`. */
  timeoutMs?: number;
  /** Retry policy override (defaults to DEFAULT_HEALTHCHECK_RETRY_CONFIG). */
  retry?: Partial<OciRegistryRetryConfig>;
  signal?: AbortSignal;
};

type PreparedManifestRequest = {
  request: (
    attemptSignal?: AbortSignal,
    extraHeaders?: Record<string, string>,
  ) => Promise<Response>;
  challengeContext: ManifestAuthContext;
};

function createMissingManifestCoordinatesResult(): OciManifestFetchResult {
  return {
    ok: false,
    status: 0,
    manifest: null,
    raw: null,
    error: "Missing registry/repository/reference.",
  };
}

function normalizeManifestAuth(auth?: Partial<OciRegistryAuth>): OciRegistryAuth {
  return {
    username: normalizeOptionalString(auth?.username ?? null),
    password: normalizeOptionalString(auth?.password ?? null),
    token: normalizeOptionalString(auth?.token ?? null),
  };
}

function buildManifestRequestHeaders(
  accept: readonly string[],
  auth: OciRegistryAuth,
): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: accept.join(", "),
  };

  if (auth.token) {
    headers.Authorization = `Bearer ${auth.token}`;
    return headers;
  }

  if (auth.username && auth.password) {
    headers.Authorization = encodeBasicAuth(auth.username, auth.password);
  }

  return headers;
}

function prepareManifestRequest(params: FetchOciManifestParams): PreparedManifestRequest | null {
  const registryBaseUrl = normalizeRegistryBaseUrl(params.registry);
  const repository = params.repository.trim().replace(LEADING_SLASHES_RE, "");
  const reference = params.reference.trim();
  if (!(registryBaseUrl && repository && reference)) {
    return null;
  }

  const insecure = Boolean(params.insecure);
  const timeoutMs = resolveTimeout("apiRequestMs", params.timeoutMs);
  const retry = normalizeRetryConfig(params.retry);
  const auth = normalizeManifestAuth(params.auth);
  const accept = params.accept ?? [OCI_IMAGE_INDEX_MEDIA_TYPE, OCI_IMAGE_MANIFEST_MEDIA_TYPE];
  const url = `${registryBaseUrl}/v2/${repository}/manifests/${encodeURIComponent(reference)}`;
  const headers = buildManifestRequestHeaders(accept, auth);

  return {
    request: (
      attemptSignal?: AbortSignal,
      extraHeaders?: Record<string, string>,
    ): Promise<Response> =>
      doManifestRequest(
        {
          url,
          headers,
          timeoutMs,
          insecure,
        },
        attemptSignal ?? params.signal,
        extraHeaders,
      ),
    challengeContext: {
      repository,
      auth,
      insecure,
      timeoutMs,
      retry,
      signal: params.signal,
    },
  };
}

async function runManifestRequest(
  prepared: PreparedManifestRequest,
  signal?: AbortSignal,
): Promise<{ ok: true; response: Response } | { ok: false; error: string }> {
  const manifestResult = await toResult(() =>
    fetchManifestResponse(prepared.request, prepared.challengeContext, signal),
  );
  if (!manifestResult.ok) {
    return {
      ok: false,
      error: getErrorMessage(manifestResult.error),
    };
  }

  return {
    ok: true,
    response: manifestResult.value,
  };
}

function isManifestRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function parseManifestPayload(raw: string): Record<string, unknown> | null {
  const parseResult = toResultSync(() => {
    const parsed: unknown = JSON.parse(raw);
    return parsed;
  });
  if (!(parseResult.ok && isManifestRecord(parseResult.value))) {
    return null;
  }

  return parseResult.value;
}

async function buildManifestFetchResult(resp: Response): Promise<OciManifestFetchResult> {
  const status = resp.status;
  const rawResult = await toResultAsync(resp.text());
  const raw = rawResult.ok ? rawResult.value : "";
  if (!resp.ok) {
    return {
      ok: false,
      status,
      manifest: null,
      raw: raw || null,
      error: `Registry returned HTTP ${status}`,
    };
  }

  return {
    ok: true,
    status,
    manifest: parseManifestPayload(raw),
    raw: raw || null,
    error: null,
  };
}

/**
 * Fetch an OCI distribution registry manifest for a repository reference.
 *
 * @param params - Registry coordinates and auth.
 * @param params.registry - Registry host or base URL (e.g. `registry.gitlab.com`).
 * @param params.repository - Repository path (e.g. `group/project/server`).
 * @param params.reference - Tag or digest (e.g. `1.0.0` or `sha256:...`).
 * @param params.accept - Accept header values (defaults to OCI media types).
 * @param params.auth - Optional auth payload.
 * @param params.insecure - Allow insecure TLS (not recommended).
 * @param params.signal - Optional abort signal.
 * @returns Fetch result including status, manifest JSON (when parsable), and error text.
 */
export async function fetchOciManifest(
  params: FetchOciManifestParams,
): Promise<OciManifestFetchResult> {
  const prepared = prepareManifestRequest(params);
  if (!prepared) {
    return createMissingManifestCoordinatesResult();
  }

  const manifestResult = await runManifestRequest(prepared, params.signal);
  if (!manifestResult.ok) {
    return {
      ok: false,
      status: 0,
      manifest: null,
      raw: null,
      error: manifestResult.error,
    };
  }

  return buildManifestFetchResult(manifestResult.response);
}

/**
 * Determine whether a manifest JSON represents a multi-arch index.
 *
 * @param manifest - Parsed manifest JSON.
 * @returns True when manifest is an OCI index.
 */
export function isMultiArchManifest(manifest: Record<string, unknown> | null): boolean {
  if (!manifest) {
    return false;
  }

  const mediaType = normalizeOptionalString(manifest.mediaType) ?? "";
  if (OCI_MULTIARCH_MEDIA_TYPES.some((value) => value === mediaType)) {
    return true;
  }

  // Some registries omit mediaType but still return `manifests` for indices/lists.
  return Array.isArray(manifest.manifests);
}
