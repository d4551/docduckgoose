import { toResultSync } from "@baohaus/bao-utils/async-result";

const FEDERATION_SERVICE_TOKEN_AUDIENCE_FIELD = "aud";
const FEDERATION_SERVICE_TOKEN_EXP_FIELD = "exp";
const FEDERATION_SERVICE_TOKEN_ISS_FIELD = "iss";

export const FEDERATION_SERVICE_TOKEN_MAX_FUTURE_SKEW_SECONDS = 300;
export const FEDERATION_SERVICE_TOKEN_DEFAULT_TTL_SECONDS = 60;

interface ServiceTokenPayload {
  readonly [FEDERATION_SERVICE_TOKEN_AUDIENCE_FIELD]: string;
  readonly [FEDERATION_SERVICE_TOKEN_EXP_FIELD]: number;
  readonly [FEDERATION_SERVICE_TOKEN_ISS_FIELD]: string;
}

export interface FederationServiceTokenAdmittance {
  readonly issuerPeerId: string;
  readonly expEpochSec: number;
}

function isIndexableObject(value: unknown): value is { readonly [k: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function base64UrlDecode(segment: string): Uint8Array | null {
  const padded = segment.padEnd(segment.length + ((4 - (segment.length % 4)) % 4), "=");
  const normalized = padded.replace(/-/gu, "+").replace(/_/gu, "/");
  const atobFn = (globalThis as { atob?: (s: string) => string }).atob;
  if (atobFn === undefined) {
    return null;
  }
  const decodedResult = toResultSync(() => atobFn(normalized));
  if (!decodedResult.ok) {
    return null;
  }
  const decoded = decodedResult.value;
  const bytes = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i += 1) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i] ?? 0);
  }
  const btoaFn = (globalThis as { btoa?: (s: string) => string }).btoa;
  if (btoaFn === undefined) {
    return "";
  }
  return btoaFn(binary).replace(/\+/gu, "-").replace(/\//gu, "_").replace(/=+$/gu, "");
}

function parsePayload(payloadBytes: Uint8Array): ServiceTokenPayload | null {
  const json = new TextDecoder().decode(payloadBytes);
  if (json.length === 0) {
    return null;
  }
  const parseResult = toResultSync(() => JSON.parse(json));
  if (!parseResult.ok) {
    return null;
  }
  const parsed = parseResult.value;
  if (!isIndexableObject(parsed)) {
    return null;
  }
  const aud = parsed[FEDERATION_SERVICE_TOKEN_AUDIENCE_FIELD];
  const exp = parsed[FEDERATION_SERVICE_TOKEN_EXP_FIELD];
  const iss = parsed[FEDERATION_SERVICE_TOKEN_ISS_FIELD];
  if (typeof aud !== "string" || typeof exp !== "number" || typeof iss !== "string") {
    return null;
  }
  return { aud, exp, iss };
}

function constantTimeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

function signPayload(payloadSegment: string, secret: string): Uint8Array {
  const hasher = new Bun.CryptoHasher("sha256", secret);
  hasher.update(payloadSegment);
  return new Uint8Array(hasher.digest());
}

export interface VerifyFederationServiceTokenInput {
  readonly authorizationHeader: string | null;
  readonly expectedAudience: string;
  readonly secret: string;
  readonly nowEpochSec?: number;
}

export async function verifyFederationServiceToken(
  input: VerifyFederationServiceTokenInput,
): Promise<FederationServiceTokenAdmittance | null> {
  if (input.secret.length === 0) {
    return null;
  }
  const header = input.authorizationHeader;
  if (header === null || header.length === 0) {
    return null;
  }
  const trimmed = header.trim();
  const lowerPrefix = trimmed.slice(0, 7).toLowerCase();
  if (lowerPrefix !== "bearer ") {
    return null;
  }
  const token = trimmed.slice(7).trim();
  if (token.length === 0) {
    return null;
  }
  const dot = token.indexOf(".");
  if (dot <= 0 || dot === token.length - 1) {
    return null;
  }
  const payloadSegment = token.slice(0, dot);
  const signatureSegment = token.slice(dot + 1);
  const payloadBytes = base64UrlDecode(payloadSegment);
  const signatureBytes = base64UrlDecode(signatureSegment);
  if (payloadBytes === null || signatureBytes === null) {
    return null;
  }
  const expectedBytes = signPayload(payloadSegment, input.secret);
  if (!constantTimeEqualBytes(expectedBytes, signatureBytes)) {
    return null;
  }
  const payload = parsePayload(payloadBytes);
  if (payload === null) {
    return null;
  }
  const nowEpochSec = input.nowEpochSec ?? Math.floor(Date.now() / 1000);
  if (payload.aud !== input.expectedAudience) {
    return null;
  }
  if (payload.exp <= nowEpochSec) {
    return null;
  }
  if (payload.exp > nowEpochSec + FEDERATION_SERVICE_TOKEN_MAX_FUTURE_SKEW_SECONDS) {
    return null;
  }
  return { issuerPeerId: payload.iss, expEpochSec: payload.exp };
}

export interface MintFederationServiceTokenInput {
  readonly audiencePeerId: string;
  readonly issuerPeerId: string;
  readonly secret: string;
  readonly expSecondsFromNow?: number;
}

export async function mintFederationServiceToken(
  input: MintFederationServiceTokenInput,
): Promise<string | null> {
  if (input.secret.length === 0) {
    return null;
  }
  const ttlSeconds = input.expSecondsFromNow ?? FEDERATION_SERVICE_TOKEN_DEFAULT_TTL_SECONDS;
  const cappedTtl = Math.min(ttlSeconds, FEDERATION_SERVICE_TOKEN_MAX_FUTURE_SKEW_SECONDS);
  const payload: ServiceTokenPayload = {
    [FEDERATION_SERVICE_TOKEN_AUDIENCE_FIELD]: input.audiencePeerId,
    [FEDERATION_SERVICE_TOKEN_EXP_FIELD]: Math.floor(Date.now() / 1000) + cappedTtl,
    [FEDERATION_SERVICE_TOKEN_ISS_FIELD]: input.issuerPeerId,
  };
  const payloadSegment = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const signatureBytes = signPayload(payloadSegment, input.secret);
  return `${payloadSegment}.${base64UrlEncode(signatureBytes)}`;
}
