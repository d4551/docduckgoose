/**
 * Canonical `.bao` service authorization client.
 *
 * Single typed caller used by sibling services (forge, registry, Bao AI Gateway,
 * bao-registry) to delegate capability decisions to bao-runtime. Lives in
 * `bao-utils` so the request/response contract is sourced exactly once
 * from `@baohaus/bao-schemas/bao-authz.schemas`, and so each consumer
 * provides its own configured origin/headers/logger without
 * re-implementing fetch wiring.
 *
 * Two header modes are supported:
 *   - `bearer`: server-to-server with a service-credential bearer token.
 *   - `forwarded`: proxy-mode that forwards the caller's session headers
 *     (cookie, authorization, etc.) — used by services that act on behalf
 *     of a logged-in user (e.g. Bao AI Gateway).
 *
 * - Uses the canonical `API_PATHS.baoAuthzCheck` route — no inline literals.
 * - Decodes responses with the shared `BaoAuthzCheckResponseSchema`.
 * - Fail-closed on transport, status, schema, or timeout failures.
 * - No `try/catch`; errors are folded through `toResultAsync`.
 *
 * @baohaus/bao-utils/bao-authz-client
 */

import { API_PATHS } from "@baohaus/bao-constants/api-paths";
import {
  type BaoAuthzAction,
  type BaoAuthzCheckResponse,
  BaoAuthzCheckResponseSchema,
  type BaoAuthzService,
} from "@baohaus/bao-schemas/bao-authz.schemas";
import { Value } from "@baohaus/baobox/elysia";
import { toResultAsync } from "./async-result.ts";

const DEFAULT_TIMEOUT_MS = 1500;
const SERVICE_HEADER = "x-bao-service";
const TRAILING_SLASH_PATTERN = /\/+$/u;

export interface BaoAuthzClientLogger {
  readonly warn: (message: string, fields?: Readonly<Record<string, string>>) => void;
}

export type BaoAuthzFetch = (
  input: Request | string | URL,
  init?: RequestInit,
) => Promise<Response>;

interface CommonClientConfig {
  readonly origin: string;
  readonly service: BaoAuthzService;
  readonly logger: BaoAuthzClientLogger;
  readonly timeoutMs?: number;
  readonly fetchImpl?: BaoAuthzFetch;
}

export interface BaoAuthzBearerConfig extends CommonClientConfig {
  readonly mode: "bearer";
  readonly serviceToken: string;
}

export interface BaoAuthzForwardedConfig extends CommonClientConfig {
  readonly mode: "forwarded";
  readonly buildHeaders: () => Headers;
}

export type BaoAuthzClientConfig = BaoAuthzBearerConfig | BaoAuthzForwardedConfig;

export interface BaoAuthzClientInput {
  readonly action: BaoAuthzAction;
  readonly actorId?: string;
  readonly resource?: string;
  readonly correlationId?: string;
}

export interface BaoAuthzDecision {
  readonly allowed: boolean;
  readonly reason: string;
  readonly status: 200 | 401 | 403 | 502 | 503;
}

const denied = (status: 401 | 403 | 502 | 503, reason: string): BaoAuthzDecision => ({
  allowed: false,
  reason,
  status,
});

const allowed = (reason: string): BaoAuthzDecision => ({
  allowed: true,
  reason,
  status: 200,
});

const trimTrailingSlash = (value: string): string => value.replace(TRAILING_SLASH_PATTERN, "");

const buildBearerHeaders = (
  serviceToken: string,
  service: BaoAuthzService,
  correlationId?: string,
): Headers => {
  const headers = new Headers({
    accept: "application/json",
    "content-type": "application/json",
    authorization: `Bearer ${serviceToken}`,
    [SERVICE_HEADER]: service,
  });
  if (correlationId !== undefined) {
    headers.set("x-correlation-id", correlationId);
  }
  return headers;
};

const buildHeadersForRequest = (
  config: BaoAuthzClientConfig,
  correlationId: string | undefined,
): Headers => {
  if (config.mode === "bearer") {
    return buildBearerHeaders(config.serviceToken, config.service, correlationId);
  }
  const headers = config.buildHeaders();
  if (!headers.has("accept")) {
    headers.set("accept", "application/json");
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  if (!headers.has(SERVICE_HEADER)) {
    headers.set(SERVICE_HEADER, config.service);
  }
  return headers;
};

interface RawAuthzResult {
  readonly status: number;
  readonly payload: BaoAuthzCheckResponse | null;
}

const sendAuthzCheck = async (
  fetchImpl: BaoAuthzFetch,
  url: string,
  headers: Headers,
  body: string,
  signal: AbortSignal,
): Promise<RawAuthzResult | null> => {
  const responseResult = await toResultAsync(
    fetchImpl(url, {
      method: "POST",
      signal,
      headers,
      body,
    }),
  );
  if (!responseResult.ok) {
    return null;
  }
  const response = responseResult.value;
  const payloadResult = await toResultAsync(response.json());
  if (!payloadResult.ok) {
    return { status: response.status, payload: null };
  }
  if (!Value.Check(BaoAuthzCheckResponseSchema, payloadResult.value)) {
    return { status: response.status, payload: null };
  }
  return {
    status: response.status,
    payload: Value.Decode(BaoAuthzCheckResponseSchema, payloadResult.value),
  };
};

const buildRequestBody = (service: BaoAuthzService, input: BaoAuthzClientInput): string =>
  JSON.stringify({
    service,
    action: input.action,
    ...(input.resource === undefined ? {} : { resource: input.resource }),
    ...(input.correlationId === undefined ? {} : { correlationId: input.correlationId }),
  });

const isConfigured = (config: BaoAuthzClientConfig): boolean => {
  if (config.origin.length === 0) {
    return false;
  }
  if (config.mode === "bearer") {
    return config.serviceToken.length > 0;
  }
  return true;
};

/**
 * Issue a `.bao` authorization check against bao-runtime.
 *
 * Returns `{ allowed: false, reason }` when configuration is missing,
 * the request fails, the response is malformed, or bao-runtime denies.
 */
export const callBaoAuthzCheck = async (
  config: BaoAuthzClientConfig,
  input: BaoAuthzClientInput,
): Promise<BaoAuthzDecision> => {
  if (!isConfigured(config)) {
    return denied(503, "bao-runtime authz not configured");
  }
  const origin = trimTrailingSlash(config.origin);

  const controller = new AbortController();
  const timeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const timeoutHandle = setTimeout(() => controller.abort(), timeoutMs);

  const url = `${origin}${API_PATHS.baoAuthzCheck}`;
  const body = buildRequestBody(config.service, input);
  const headers = buildHeadersForRequest(config, input.correlationId);
  const result = await sendAuthzCheck(
    config.fetchImpl ?? fetch,
    url,
    headers,
    body,
    controller.signal,
  ).finally(() => clearTimeout(timeoutHandle));

  if (result === null) {
    config.logger.warn("bao-runtime authz request failed", {
      service: config.service,
      action: input.action,
    });
    return denied(503, "bao-runtime authz unreachable");
  }
  if (result.status === 401) {
    return denied(401, "bao-runtime authz unauthenticated");
  }
  if (result.status !== 200) {
    return denied(503, `bao-runtime authz status ${result.status}`);
  }
  if (result.payload === null) {
    return denied(502, "bao-runtime authz response invalid");
  }
  if (!result.payload.allowed) {
    return denied(403, result.payload.reason ?? "capability-denied");
  }
  if (
    input.actorId !== undefined &&
    result.payload.subject !== null &&
    result.payload.subject.id !== input.actorId
  ) {
    config.logger.warn("bao-runtime authz subject mismatch", {
      service: config.service,
      action: input.action,
      expected: input.actorId,
      actual: result.payload.subject.id,
    });
  }
  return allowed("bao-runtime-allowed");
};
