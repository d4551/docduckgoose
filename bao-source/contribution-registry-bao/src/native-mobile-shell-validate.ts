/**
 * Runtime validator for native-mobile-shell contribution registrations.
 *
 * @packageDocumentation
 */

import {
  NATIVE_MOBILE_SHELL_PLATFORMS,
  NATIVE_MOBILE_SHELL_SERVER_MODES,
  type NativeMobileShellPlatform,
  type NativeMobileShellRegistration,
  type NativeMobileShellServerMode,
} from "./native-mobile-shell.ts";

type BoundaryRecord = Readonly<Record<string, unknown>>;

function isRecord(value: unknown): value is BoundaryRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(candidate: BoundaryRecord, field: string): boolean {
  const value = candidate[field];
  return typeof value === "string" && value.length > 0;
}

function isPlatform(value: unknown): value is NativeMobileShellPlatform {
  return (
    typeof value === "string" &&
    (NATIVE_MOBILE_SHELL_PLATFORMS as readonly string[]).includes(value)
  );
}

function isServerMode(value: unknown): value is NativeMobileShellServerMode {
  return (
    typeof value === "string" &&
    (NATIVE_MOBILE_SHELL_SERVER_MODES as readonly string[]).includes(value)
  );
}

function isLoopbackPort(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 65535;
}

export function isNativeMobileShellRegistration(
  value: unknown,
): value is NativeMobileShellRegistration {
  if (!isRecord(value)) {
    return false;
  }
  if (value.kind !== "native-mobile-shell") {
    return false;
  }
  if (!isNonEmptyString(value, "id") || !isNonEmptyString(value, "extensionId")) {
    return false;
  }
  if (!isPlatform(value.platform)) {
    return false;
  }
  if (!isServerMode(value.serverMode)) {
    return false;
  }
  if (!isNonEmptyString(value, "loopbackHost") || !isLoopbackPort(value.loopbackPort)) {
    return false;
  }
  if (!isNonEmptyString(value, "healthPath") || !isNonEmptyString(value, "iconSetRef")) {
    return false;
  }
  if (value.dataDirEnvKey !== "GOOSE_WORD_DATA_DIR") {
    return false;
  }
  if (value.offlineCapable !== true) {
    return false;
  }
  const binary = value.binaryAssetRef;
  if (binary !== undefined && (typeof binary !== "string" || binary.length === 0)) {
    return false;
  }
  if (value.platform === "android" && (typeof binary !== "string" || binary.length === 0)) {
    return false;
  }
  return true;
}
