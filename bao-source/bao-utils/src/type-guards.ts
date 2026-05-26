/**
 * Centralized Type Guards Utility.
 *
 * Consolidates all type checking functions (type predicates) from across the codebase.
 * Type guards use TypeScript's `is` keyword to provide runtime type checking with
 * compile-time type narrowing. Categories include:
 *
 * - Model type guards (AiModel, etc.)
 * - Device type guards (Device, DeviceStatusType)
 * - Environment type guards
 * - Object type guards (record checking)
 * - Health/Status type guards
 * - API response validation type guards
 *
 * @baohaus/bao-utils/type-guards
 */

import { readEnvStringOrNull } from "@baohaus/bao-config/env";
import { STATUS } from "@baohaus/bao-constants/status-unified";
import type { Device, DeviceStatusType } from "@baohaus/bao-schemas/device.schemas";
import type { UnknownRecord } from "@baohaus/bao-types/common";
import type { HealthAdapterStatus, HealthServiceStatusResponse } from "@baohaus/bao-types/health";
import type { AiModel } from "@baohaus/bao-types/models";
import {
  isErrorResponse as isErrorResponseShared,
  isListResponse as isListResponseShared,
  isPaginatedResponse as isPaginatedResponseShared,
  isSuccessResponse as isSuccessResponseShared,
  isValidationError as isValidationErrorShared,
} from "@baohaus/bao-types/responses";
import { toResultSync } from "./async-result";
import { getEnvArray } from "./env.js";

const EMAIL_RE: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ICON_NAME_RE: RegExp = /^[a-z0-9-]+$/i;
const TG_CAMEL_CASE_RE: RegExp = /^[a-z][a-zA-Z0-9]*$/;
const TG_PASCAL_CASE_RE: RegExp = /^[A-Z][a-zA-Z0-9]*$/;
const TG_KEBAB_CASE_RE: RegExp = /^[a-z][a-z0-9-]*$/;
const TG_SNAKE_CASE_RE: RegExp = /^[a-z][a-z0-9_]*$/;
const TG_SCREAMING_SNAKE_RE: RegExp = /^[A-Z][A-Z0-9_]*$/;
const HTTP_TOO_MANY = 429;
const HTTP_UNAVAILABLE = 503;
const HTTP_GATEWAY_TIMEOUT = 504;

/** Device status type re-export used by status-related type guards. */
export type { DeviceStatusType };

// PRIMITIVE TYPE GUARDS

/**
 * Check if a value is a non-empty string (after trimming whitespace).
 * Consolidated from: bunbuddy-docs-contracts, scanner-realtime-relay.service,
 * logger.service, mcp-provider.adapter, ai-provider.service.
 *
 * @param value - Value to check.
 * @returns True when value is a string with at least one non-whitespace character.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// MODEL TYPE GUARDS

/**
 * Check if a model is downloaded and ready for offline use
 * Consolidated from: src/utils/modelHelpers.ts
 *
 * @param model - Model object with offline_ready and storage_path fields
 * @returns True if model is downloaded and ready for offline use
 */
export function isModelOfflineReady(model: unknown): model is AiModel & { offline_ready: true } {
  if (!isRecord(model)) {
    return false;
  }

  return Boolean(
    model.offline_ready === true ||
      model.offline_ready === 1 ||
      model.storage_path ||
      model.storagePath,
  );
}

/**
 * Check if a model is a HuggingFace model
 * Consolidated from: src/utils/modelHelpers.ts
 *
 * @param model - Model object to check
 * @returns True if model is from HuggingFace
 */
export function isHuggingFaceModel(model: unknown): model is AiModel & { provider: "huggingface" } {
  if (!isRecord(model)) {
    return false;
  }
  const provider = typeof model.provider === "string" ? model.provider.toLowerCase() : "";
  const id = typeof model.id === "string" ? model.id : "";
  return provider === "huggingface" || provider.includes("hugging face") || id.includes("/");
}

/**
 * Check if a model ID represents an offline model
 * Consolidated from: src/config/offline-models.ts
 *
 * @param modelId - Model ID string to check
 * @returns True if the model is configured as an offline model
 */
export function isOfflineModel(modelId: unknown): modelId is string {
  if (typeof modelId !== "string") {
    return false;
  }

  const normalized = normalizeModelId(modelId);
  if (!normalized) {
    return false;
  }

  const registry = resolveOfflineModelRegistry();
  if (registry.ids.has(normalized)) {
    return true;
  }
  if (registry.idsLower.has(normalized.toLowerCase())) {
    return true;
  }

  const normalizedLower = normalized.toLowerCase();
  return registry.prefixes.some((prefix) => normalizedLower.startsWith(prefix));
}

/**
 * Normalize a model identifier for registry matching.
 *
 * @param modelId - Raw model identifier.
 * @returns Normalized model identifier.
 */
function normalizeModelId(modelId: string): string {
  return modelId.trim();
}

/**
 * Resolve the offline model registry from environment configuration.
 *
 * @returns Registry of exact IDs and prefix matchers.
 */
function resolveOfflineModelRegistry(): {
  ids: Set<string>;
  idsLower: Set<string>;
  prefixes: string[];
} {
  const ids = getEnvArray("AI_OFFLINE_MODEL_IDS");
  const prefixes = getEnvArray("AI_OFFLINE_MODEL_PREFIXES");

  const normalizedIds = ids.map((value) => normalizeModelId(value)).filter(Boolean);
  const normalizedPrefixes = prefixes
    .map((value) => normalizeModelId(value).toLowerCase())
    .filter(Boolean);

  return {
    ids: new Set(normalizedIds),
    idsLower: new Set(normalizedIds.map((value) => value.toLowerCase())),
    prefixes: normalizedPrefixes,
  };
}

/**
 * Check if a model is in the "loaded" or "active" state
 *
 * @param model - Model object to check
 * @returns True if model is loaded/active
 */
export function isModelActive(model: unknown): model is AiModel & { loaded: true } {
  if (!isRecord(model)) {
    return false;
  }
  return model.loaded === true;
}

// DEVICE TYPE GUARDS

/**
 * Check if a device is online/connected
 * Consolidated from: src/core/stores/hardwarePanel.ts
 *
 * @param device - Device object to check
 * @returns True if device is online
 */
export function isDeviceOnline(
  device: unknown,
): device is Device & { status: typeof STATUS.CONNECTED | typeof STATUS.READY } {
  if (!isRecord(device)) {
    return false;
  }
  return (
    device.status === STATUS.CONNECTED ||
    device.status === STATUS.READY ||
    device.connected === true
  );
}

/**
 * Check if a device status is valid
 * Consolidated from: src/config/devices.unified.ts
 *
 * @param status - Status string to validate
 * @returns True if status is a valid DeviceStatus
 */
export function isValidDeviceStatus(status: unknown): status is DeviceStatusType {
  if (typeof status !== "string") {
    return false;
  }

  const validStatuses: readonly string[] = [
    STATUS.CONNECTED,
    STATUS.DISCONNECTED,
    STATUS.DETECTED,
    STATUS.STANDBY,
    STATUS.READY,
    STATUS.ERROR,
    STATUS.OFFLINE,
    STATUS.UNKNOWN,
  ] as const;

  return validStatuses.includes(status);
}

/**
 * Check if a device has a specific capability
 * Consolidated from: src/config/devices.unified.ts
 *
 * @param capability - Capability string to validate
 * @returns True if capability is valid
 */
export function isValidCapability(capability: unknown): capability is string {
  return typeof capability === "string" && capability.length > 0;
}

/**
 * Check if a device is a connected/active device
 *
 * @param device - Device object to check
 * @returns True if device is connected
 */
export function isConnectedDevice(device: unknown): device is Device & { connected: true } {
  if (!isRecord(device)) {
    return false;
  }
  return device.connected === true || device.status === STATUS.CONNECTED;
}

// ENVIRONMENT TYPE GUARDS

/**
 * Check if running in browser environment
 * Consolidated from: src/shared/utils/common.ts
 *
 * @returns True if running in browser
 */
export function isBrowser(): boolean {
  const browserWindow = Reflect.get(globalThis, "window");
  const browserDocument = Reflect.get(globalThis, "document");
  return (
    typeof browserWindow === "object" &&
    browserWindow !== null &&
    typeof browserDocument === "object" &&
    browserDocument !== null
  );
}

/**
 * Check if running in browser runtime (not Tauri desktop app)
 * Consolidated from: src/shared/utils/common.ts, src/adapters/DatabaseAdapterFactory.ts
 *
 * @returns True if running in browser, false if running in Tauri
 */
export function isBrowserRuntime(): boolean {
  const browserWindow = Reflect.get(globalThis, "window");
  if (typeof browserWindow !== "object" || browserWindow === null) {
    return false;
  }
  return !Object.hasOwn(browserWindow, "__TAURI__");
}

/**
 * Check if running in Node.js environment
 * Consolidated from: src/adapters/DatabaseAdapterFactory.ts
 *
 * @returns True if running in Node.js
 */
export function isNode(): boolean {
  return (
    typeof process !== "undefined" && process.versions != null && process.versions.node != null
  );
}

/**
 * Check if running in test environment
 * Consolidated from: src/adapters/http-utils.ts
 *
 * @returns True if in Bun test environment
 */
export function isTestEnv(): boolean {
  return readEnvStringOrNull("NODE_ENV") === "test" || readEnvStringOrNull("BUN_TEST") === "1";
}

/**
 * Check if running in development mode
 * Consolidated from: src/services/systemStatus.service.ts
 *
 * @returns True if in development mode
 */
export function isDevMode(): boolean {
  return readEnvStringOrNull("NODE_ENV") === "development";
}

// OBJECT TYPE GUARDS

/**
 * Check if a value is a plain object (not array, null, or other types)
 * Consolidated from: src/config/index.ts, src/features/pathology/services/storyboard.service.ts
 *
 * @param value - Value to check
 * @returns True if value is a plain object
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

/**
 * Check if a value is a record (object with string keys)
 * Consolidated from: src/core/stores/system.ts
 *
 * @param value - Value to check
 * @returns True if value is a Record
 */
export function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Check if a value is an object with a callable property at the given key.
 * Uses Record for safe property access instead of duck casts.
 *
 * @param value - Value to check
 * @param key - Property name
 * @returns True when the property exists and is a function
 */
export function hasCallable(value: unknown, key: string): boolean {
  if (!isRecord(value)) {
    return false;
  }
  return typeof value[key] === "function";
}

/**
 * Check if a value is an object with callable properties at all given keys.
 *
 * @param value - Value to check
 * @param keys - Property names
 * @returns True when all properties exist and are functions
 */
export function hasCallables(value: unknown, ...keys: string[]): boolean {
  return keys.every((key) => hasCallable(value, key));
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * Consolidated from: src/shared/utils/common.ts
 *
 * @param value - Value to check
 * @returns True if value is considered empty
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true;
  }
  if (typeof value === "string") {
    return value.trim().length === 0;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return false;
}

// HEALTH/STATUS TYPE GUARDS

/**
 * Type guard to validate HealthServiceStatusResponse
 * Consolidated from: src/types/health.ts
 *
 * @param value - Value to validate
 * @returns True if value is a valid HealthServiceStatusResponse
 */
export function isHealthServiceStatusResponse(
  value: unknown,
): value is HealthServiceStatusResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as HealthServiceStatusResponse;

  // Validate configuration object exists
  if (!response.configuration || typeof response.configuration !== "object") {
    return false;
  }

  // Validate adapters object exists
  return !(!response.adapters || typeof response.adapters !== "object");
}

/**
 * Type guard to validate HealthAdapterStatus
 * Consolidated from: src/types/health.ts
 *
 * @param value - Value to validate
 * @returns True if value is a valid HealthAdapterStatus
 */
export function isHealthAdapterStatus(value: unknown): value is HealthAdapterStatus {
  if (!value || typeof value !== "object") {
    return false;
  }

  const adapter = value as HealthAdapterStatus;

  // Validate required status field
  if (
    !(
      adapter.status &&
      [STATUS.HEALTHY, "unhealthy", STATUS.DEGRADED, STATUS.UNKNOWN].includes(adapter.status)
    )
  ) {
    return false;
  }

  // Validate provider field (required)
  return typeof adapter.provider === "string";
}

// ERROR TYPE GUARDS

/**
 * Check if an error is retryable (network errors, timeouts, etc.)
 * Consolidated from: src/services/huggingface/errorHandler.ts
 *
 * @param error - Error object to check
 * @returns True if error is retryable
 */
export function isRetryableError(error: unknown): boolean {
  if (!isRecord(error)) {
    return false;
  }

  // Network errors
  if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT" || error.code === "ENOTFOUND") {
    return true;
  }

  // HTTP status codes that are retryable
  if (
    error.status === HTTP_TOO_MANY ||
    error.status === HTTP_UNAVAILABLE ||
    error.status === HTTP_GATEWAY_TIMEOUT
  ) {
    return true;
  }

  // Specific error messages
  const message = typeof error.message === "string" ? error.message.toLowerCase() : "";
  if (
    message.includes("timeout") ||
    message.includes("network") ||
    message.includes("econnreset") ||
    message.includes("rate limit")
  ) {
    return true;
  }

  return false;
}

/**
 * Check if an error is recoverable (routing errors, etc.)
 * Consolidated from: src/core/router/guards/error-recovery.ts
 *
 * @param error - Error to check
 * @returns True if error is recoverable
 */
function isRecoverableError(error: Error): boolean {
  if (!error) {
    return false;
  }

  const recoverablePatterns = ["navigation", "route", "redirect", STATUS.CANCELLED];

  const message = error.message?.toLowerCase() || "";
  return recoverablePatterns.some((pattern) => message.includes(pattern));
}

/**
 * Check if an error is router-related
 * Consolidated from: src/core/router/guards/error-recovery.ts
 *
 * @param error - Error to check
 * @returns True if error is router-related
 */
export function isRouterRelatedError(error: unknown): boolean {
  if (!isRecord(error)) {
    return false;
  }

  const message = typeof error.message === "string" ? error.message : "";
  return (
    error.name === "NavigationDuplicated" ||
    error.type === "NavigationDuplicated" ||
    message.includes("navigation") ||
    message.includes("route")
  );
}

// VALIDATION TYPE GUARDS

/**
 * Check if a string is a valid email address
 * Consolidated from: src/shared/utils/validation.ts
 *
 * @param email - String to validate
 * @returns True if email is valid
 */
export function isValidEmail(email: unknown): email is string {
  if (typeof email !== "string") {
    return false;
  }

  return EMAIL_RE.test(email);
}

/**
 * Check if a string is a valid URL
 * Consolidated from: src/shared/utils/validation.ts
 *
 * @param url - String to validate
 * @returns True if URL is valid
 */
export function isValidUrl(url: unknown): url is string {
  if (typeof url !== "string") {
    return false;
  }

  const result = toResultSync(() => new URL(url));
  return result.ok;
}

/**
 * Check if a string is a valid icon name
 * Consolidated from: src/shared/utils/icon-registry.ts
 *
 * @param name - Icon name to validate
 * @returns True if icon name is valid
 */
export function isValidIconName(name: unknown): name is string {
  if (typeof name !== "string") {
    return false;
  }

  // Basic validation - non-empty string with alphanumeric and hyphens
  return ICON_NAME_RE.test(name);
}

// STRING CASE TYPE GUARDS

/**
 * Check if a string is in camelCase
 * Consolidated from: src/shared/utils/naming-conventions.ts
 *
 * @param string_ - String to check
 * @returns True if string is camelCase
 */
export function isCamelCase(string_: unknown): string_ is string {
  if (typeof string_ !== "string") {
    return false;
  }
  return TG_CAMEL_CASE_RE.test(string_);
}

/**
 * Check if a string is in PascalCase
 * Consolidated from: src/shared/utils/naming-conventions.ts
 *
 * @param string_ - String to check
 * @returns True if string is PascalCase
 */
export function isPascalCase(string_: unknown): string_ is string {
  if (typeof string_ !== "string") {
    return false;
  }
  return TG_PASCAL_CASE_RE.test(string_);
}

/**
 * Check if a string is in kebab-case
 * Consolidated from: src/shared/utils/naming-conventions.ts
 *
 * @param string_ - String to check
 * @returns True if string is kebab-case
 */
export function isKebabCase(string_: unknown): string_ is string {
  if (typeof string_ !== "string") {
    return false;
  }
  return TG_KEBAB_CASE_RE.test(string_);
}

/**
 * Check if a string is in snake_case
 * Consolidated from: src/shared/utils/naming-conventions.ts
 *
 * @param string_ - String to check
 * @returns True if string is snake_case
 */
export function isSnakeCase(string_: unknown): string_ is string {
  if (typeof string_ !== "string") {
    return false;
  }
  return TG_SNAKE_CASE_RE.test(string_);
}

/**
 * Check if a string is in SCREAMING_SNAKE_CASE
 * Consolidated from: src/shared/utils/naming-conventions.ts
 *
 * @param string_ - String to check
 * @returns True if string is SCREAMING_SNAKE_CASE
 */
export function isScreamingSnakeCase(string_: unknown): string_ is string {
  if (typeof string_ !== "string") {
    return false;
  }
  return TG_SCREAMING_SNAKE_RE.test(string_);
}

// API RESPONSE TYPE GUARDS

/**
 * Type guard to check if an API response is successful.
 */
export const isSuccessResponse: typeof isSuccessResponseShared = isSuccessResponseShared;

/**
 * Type guard to check if an API response is an error.
 */
export const isErrorResponse: typeof isErrorResponseShared = isErrorResponseShared;

/**
 * Type guard to check if a response is paginated.
 */
export const isPaginatedResponse: typeof isPaginatedResponseShared = isPaginatedResponseShared;

/**
 * Type guard to check if a response is a simple list response.
 */
export const isListResponse: typeof isListResponseShared = isListResponseShared;

/**
 * Type guard to check if a response is a validation error.
 *
 * Alias for `@baohaus/bao-types/responses.isValidationError` to keep a stable import
 * path for existing callers.
 */
export const isValidationErrorResponse: typeof isValidationErrorShared = isValidationErrorShared;

/**
 * Type guard to check if a value is a valid API envelope (has ok property).
 *
 * @param value - The value to check
 * @returns True if value has an ok property (boolean)
 */
export function isApiEnvelope(value: unknown): value is { ok: boolean } {
  if (!isRecord(value)) {
    return false;
  }
  return typeof value.ok === "boolean";
}

// UTILITY EXPORTS

/**
 * All type guards exported as a single object for convenience
 */
export const TypeGuards: Record<string, (...args: never[]) => unknown> = {
  // Primitive guards
  isNonEmptyString,

  // Model guards
  isModelOfflineReady,
  isHuggingFaceModel,
  isOfflineModel,
  isModelActive,

  // Device guards
  isDeviceOnline,
  isValidDeviceStatus,
  isValidCapability,
  isConnectedDevice,

  // Environment guards
  isBrowser,
  isBrowserRuntime,
  isNode,
  isTestEnv,
  isDevMode,

  // Object guards
  isPlainObject,
  isRecord,
  hasCallable,
  hasCallables,
  isEmpty,

  // Health/Status guards
  isHealthServiceStatusResponse,
  isHealthAdapterStatus,

  // Error guards
  isRetryableError,
  isRecoverableError,
  isRouterRelatedError,

  // Validation guards
  isValidEmail,
  isValidUrl,
  isValidIconName,

  // String case guards
  isCamelCase,
  isPascalCase,
  isKebabCase,
  isSnakeCase,
  isScreamingSnakeCase,

  // API response guards
  isSuccessResponse,
  isErrorResponse,
  isPaginatedResponse,
  isListResponse,
  isValidationErrorResponse,
  isApiEnvelope,
};
