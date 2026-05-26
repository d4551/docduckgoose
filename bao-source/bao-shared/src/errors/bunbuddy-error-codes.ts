/**
 * BunBuddy-specific API error codes and RFC 9457 metadata.
 *
 * Centralizes BunBuddy domain error codes so both shared and bunbuddy packages
 * consume the same canonical status/title mapping.
 *
 * @shared/errors/bunbuddy-error-codes
 */

import { HTTP_STATUS } from "../constants/http-status";
import { allErrorCodes, ErrorCode as SharedErrorCode } from "./error-codes";

/**
 * Known BunBuddy error codes.
 *
 * Using a frozen map keeps the values aligned with the shared API contract
 * without introducing enum alias indirection.
 */
export const BUNBUDDY_ERROR_CODES = {
  // Inherit shared platform-level codes
  AuthRequired: SharedErrorCode.AuthRequired,
  Forbidden: SharedErrorCode.Forbidden,
  ValidationError: SharedErrorCode.ValidationError,
  ResourceNotFound: SharedErrorCode.ResourceNotFound,
  Conflict: SharedErrorCode.Conflict,
  ServiceUnavailable: SharedErrorCode.ServiceUnavailable,
  FetchUnavailable: SharedErrorCode.FetchUnavailable,
  FetchInvalidResponse: SharedErrorCode.FetchInvalidResponse,
  QuotaExceeded: SharedErrorCode.QuotaExceeded,
  InternalError: SharedErrorCode.InternalError,

  // BunBuddy transport-level input validation
  InvalidJson: "INVALID_JSON",
  UnsupportedMediaType: "UNSUPPORTED_MEDIA_TYPE",
  BadRequest: "BAD_REQUEST",
  InvalidBody: "INVALID_BODY",

  // BunBuddy resource and device failures
  DeviceNotFound: "DEVICE_NOT_FOUND",
  DeviceError: "DEVICE_ERROR",
  DeviceUnavailable: "DEVICE_UNAVAILABLE",
  DeviceTimeout: "DEVICE_TIMEOUT",
  DeviceBusy: "DEVICE_BUSY",
  ConnectionFailed: "CONNECTION_FAILED",
  ProtocolError: "PROTOCOL_ERROR",

  // BunBuddy transport-level throttling
  RateLimited: "RATE_LIMITED",

  // BunBuddy environment states
  SimulationDisabled: "SIMULATION_DISABLED",
} as const;

/** Alias for BUNBUDDY_ERROR_CODES; use when you need both const object and type. */
export const BunBuddyErrorCode: typeof BUNBUDDY_ERROR_CODES = BUNBUDDY_ERROR_CODES;

/** Union type of all BunBuddy error code string values. */
export type BunBuddyErrorCode = (typeof BUNBUDDY_ERROR_CODES)[keyof typeof BUNBUDDY_ERROR_CODES];

/**
 * BunBuddy error codes that are also part of the shared API error contract.
 */
type SharedBunBuddyErrorCode = Extract<SharedErrorCode, BunBuddyErrorCode>;

/**
 * Default HTTP status for each BunBuddy error code.
 */
export const ERROR_CODE_STATUS: Record<BunBuddyErrorCode, number> = {
  [BunBuddyErrorCode.AuthRequired]: HTTP_STATUS.unauthorized,
  [BunBuddyErrorCode.Forbidden]: HTTP_STATUS.forbidden,
  [BunBuddyErrorCode.ValidationError]: HTTP_STATUS.unprocessableEntity,
  [BunBuddyErrorCode.InvalidJson]: HTTP_STATUS.badRequest,
  [BunBuddyErrorCode.InvalidBody]: HTTP_STATUS.badRequest,
  [BunBuddyErrorCode.UnsupportedMediaType]: HTTP_STATUS.unsupportedMediaType,
  [BunBuddyErrorCode.BadRequest]: HTTP_STATUS.badRequest,
  [BunBuddyErrorCode.ResourceNotFound]: HTTP_STATUS.notFound,
  [BunBuddyErrorCode.DeviceNotFound]: HTTP_STATUS.notFound,
  [BunBuddyErrorCode.Conflict]: HTTP_STATUS.conflict,
  [BunBuddyErrorCode.DeviceUnavailable]: HTTP_STATUS.serviceUnavailable,
  [BunBuddyErrorCode.DeviceError]: HTTP_STATUS.internalServerError,
  [BunBuddyErrorCode.DeviceTimeout]: HTTP_STATUS.gatewayTimeout,
  [BunBuddyErrorCode.DeviceBusy]: HTTP_STATUS.serviceUnavailable,
  [BunBuddyErrorCode.ConnectionFailed]: HTTP_STATUS.badGateway,
  [BunBuddyErrorCode.ProtocolError]: HTTP_STATUS.badGateway,
  [BunBuddyErrorCode.ServiceUnavailable]: HTTP_STATUS.serviceUnavailable,
  [BunBuddyErrorCode.FetchUnavailable]: HTTP_STATUS.serviceUnavailable,
  [BunBuddyErrorCode.FetchInvalidResponse]: HTTP_STATUS.badGateway,
  [BunBuddyErrorCode.QuotaExceeded]: HTTP_STATUS.tooManyRequests,
  [BunBuddyErrorCode.RateLimited]: HTTP_STATUS.tooManyRequests,
  [BunBuddyErrorCode.InternalError]: HTTP_STATUS.internalServerError,
  [BunBuddyErrorCode.SimulationDisabled]: HTTP_STATUS.forbidden,
};

/**
 * Default human-readable titles for each BunBuddy error code.
 */
export const ERROR_CODE_TITLES: Record<BunBuddyErrorCode, string> = {
  [BunBuddyErrorCode.AuthRequired]: "Authentication required",
  [BunBuddyErrorCode.Forbidden]: "Access denied",
  [BunBuddyErrorCode.ValidationError]: "Validation failed",
  [BunBuddyErrorCode.InvalidJson]: "Invalid JSON",
  [BunBuddyErrorCode.InvalidBody]: "Invalid request body",
  [BunBuddyErrorCode.UnsupportedMediaType]: "Unsupported media type",
  [BunBuddyErrorCode.BadRequest]: "Bad request",
  [BunBuddyErrorCode.ResourceNotFound]: "Resource not found",
  [BunBuddyErrorCode.DeviceNotFound]: "Device not found",
  [BunBuddyErrorCode.Conflict]: "Conflict",
  [BunBuddyErrorCode.DeviceUnavailable]: "Device unavailable",
  [BunBuddyErrorCode.DeviceError]: "Device error",
  [BunBuddyErrorCode.DeviceTimeout]: "Device timeout",
  [BunBuddyErrorCode.DeviceBusy]: "Device busy",
  [BunBuddyErrorCode.ConnectionFailed]: "Connection failed",
  [BunBuddyErrorCode.ProtocolError]: "Protocol error",
  [BunBuddyErrorCode.ServiceUnavailable]: "Service unavailable",
  [BunBuddyErrorCode.FetchUnavailable]: "Upstream service unavailable",
  [BunBuddyErrorCode.FetchInvalidResponse]: "Invalid upstream response",
  [BunBuddyErrorCode.QuotaExceeded]: "Quota exceeded",
  [BunBuddyErrorCode.RateLimited]: "Rate limited",
  [BunBuddyErrorCode.InternalError]: "Internal server error",
  [BunBuddyErrorCode.SimulationDisabled]: "Simulation disabled",
};

/**
 * Resolve the default status for a BunBuddy error code.
 *
 * @param code - BunBuddy error code.
 * @returns HTTP status.
 */
export function getStatusForCode(code: BunBuddyErrorCode | string): number {
  if (!isBunBuddyErrorCode(code)) {
    return HTTP_STATUS.internalServerError;
  }
  return ERROR_CODE_STATUS[code];
}

/**
 * Resolve the default title for a BunBuddy error code.
 *
 * @param code - BunBuddy error code.
 * @returns Human-readable title.
 */
export function getTitleForCode(code: BunBuddyErrorCode | string): string {
  if (!isBunBuddyErrorCode(code)) {
    return "Request failed";
  }
  return ERROR_CODE_TITLES[code];
}

/**
 * Type guard for BunBuddy-defined error codes.
 */
export function isBunBuddyErrorCode(value: BunBuddyErrorCode | string): value is BunBuddyErrorCode {
  return allBunBuddyErrorCodesSet.has(value);
}

/**
 * Enumerate all supported BunBuddy error codes.
 *
 * @returns Stable list of all BunBuddy error codes.
 */
export function allBunBuddyErrorCodes(): readonly BunBuddyErrorCode[] {
  const sharedCodes = allErrorCodes().filter((code): code is SharedBunBuddyErrorCode =>
    allBunBuddyErrorCodesSet.has(code),
  );
  const allErrorCodeValues = new Set<string>(allErrorCodes());
  const bunBuddyOnlyCodes = (
    Object.values(BunBuddyErrorCode) as readonly BunBuddyErrorCode[]
  ).filter((code) => !allErrorCodeValues.has(code));
  return [...sharedCodes, ...bunBuddyOnlyCodes];
}

/**
 * Fast membership check of BunBuddy-defined string codes.
 */
const allBunBuddyErrorCodesSet: Set<unknown> = new Set<string>(
  Object.values(BUNBUDDY_ERROR_CODES) as readonly string[],
);
