import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getErrorMessage, toResultSync } from "@baohaus/bao-utils/async-result";
import { type AppBuildFailureCode, isAppBuildFailureCode } from "../contracts/flow-contracts";

type JsonScalar = string | number | boolean | null;
type JsonValue = JsonScalar | JsonRecord | readonly JsonValue[];
type JsonRecord = { readonly [key: string]: JsonValue };

/** Stable build platform identifier for canonical app-build matrix reports. */
export type AppBuildPlatform = "android" | "ios" | "desktop";

/** Terminal status emitted by the canonical app-build matrix. */
export type AppBuildMatrixStatus = "pass" | "fail" | "delegated" | "pending";

/** Schema version emitted by canonical app-build matrix reports. */
export const APP_BUILD_MATRIX_REPORT_SCHEMA_VERSION = "1.0" as const;

/** Default repository-relative directory for app-build matrix artifacts. */
export const APP_BUILD_MATRIX_REPORT_DIRECTORY = ".artifacts/app-builds" as const;

/** Stable file name for the latest app-build matrix snapshot. */
export const APP_BUILD_MATRIX_LATEST_REPORT_FILE = "latest.json" as const;

/** Stable file name for a single app-build matrix run report. */
export const APP_BUILD_MATRIX_RUN_REPORT_FILE = "build-report.json" as const;

/** Per-platform build result row in the canonical app-build matrix report. */
export interface AppBuildPlatformReport {
  readonly platform: AppBuildPlatform;
  readonly status: AppBuildMatrixStatus;
  readonly message: string;
  readonly logPath: string;
  readonly failureCode?: AppBuildFailureCode;
  readonly failureMessage?: string;
  readonly artifactPath?: string;
  readonly artifactSha256?: string;
}

/** Typed per-platform rows emitted by the canonical app-build matrix. */
export interface AppBuildMatrixPlatforms {
  readonly android: AppBuildPlatformReport;
  readonly ios: AppBuildPlatformReport;
  readonly desktop: AppBuildPlatformReport;
}

/** Typed report written by the canonical app-build matrix owner. */
export interface AppBuildMatrixReport {
  readonly schemaVersion: typeof APP_BUILD_MATRIX_REPORT_SCHEMA_VERSION;
  readonly generatedAt: string;
  readonly correlationId: string;
  readonly host: {
    readonly os: string;
  };
  readonly platforms: AppBuildMatrixPlatforms;
}

/** Typed result returned when reading a canonical app-build matrix report from disk. */
export type AppBuildMatrixReportReadResult =
  | {
      readonly ok: true;
      readonly data: AppBuildMatrixReport;
      readonly path: string;
    }
  | {
      readonly ok: false;
      readonly reason: "missing" | "invalid";
      readonly message: string;
      readonly path: string;
    };

function isJsonRecord(value: JsonValue | undefined): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAppBuildPlatform(value: JsonValue | undefined): value is AppBuildPlatform {
  return value === "android" || value === "ios" || value === "desktop";
}

function isAppBuildMatrixStatus(value: JsonValue | undefined): value is AppBuildMatrixStatus {
  return value === "pass" || value === "fail" || value === "delegated" || value === "pending";
}

function isNonEmptyString(value: JsonValue | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseRequiredPlatformReportFields(
  value: JsonRecord,
  expectedPlatform: AppBuildPlatform,
): Pick<AppBuildPlatformReport, "logPath" | "message" | "platform" | "status"> | null {
  const platform = value.platform;
  const status = value.status;
  const message = value.message;
  const logPath = value.logPath;

  if (
    !isAppBuildPlatform(platform) ||
    platform !== expectedPlatform ||
    !isAppBuildMatrixStatus(status) ||
    !isNonEmptyString(message) ||
    !isNonEmptyString(logPath)
  ) {
    return null;
  }

  return { platform, status, message, logPath };
}

function parseOptionalFailureCode(
  value: JsonValue | undefined,
): AppBuildFailureCode | null | undefined {
  if (value === undefined) {
    return undefined;
  }
  return typeof value === "string" && isAppBuildFailureCode(value) ? value : null;
}

function parseOptionalStringField(value: JsonValue | undefined): string | null | undefined {
  if (value === undefined) {
    return undefined;
  }
  return isNonEmptyString(value) ? value : null;
}

function parseOptionalPlatformReportFields(
  value: JsonRecord,
): Omit<AppBuildPlatformReport, "logPath" | "message" | "platform" | "status"> | null {
  const failureCode = parseOptionalFailureCode(value.failureCode);
  const failureMessage = parseOptionalStringField(value.failureMessage);
  const artifactPath = parseOptionalStringField(value.artifactPath);
  const artifactSha256 = parseOptionalStringField(value.artifactSha256);

  if (
    failureCode === null ||
    failureMessage === null ||
    artifactPath === null ||
    artifactSha256 === null
  ) {
    return null;
  }

  return {
    ...(failureCode ? { failureCode } : {}),
    ...(failureMessage ? { failureMessage } : {}),
    ...(artifactPath ? { artifactPath } : {}),
    ...(artifactSha256 ? { artifactSha256 } : {}),
  };
}

function parseJsonDocument(
  raw: string,
): { ok: true; data: JsonValue } | { ok: false; message: string } {
  const result = toResultSync(() => JSON.parse(raw) as JsonValue);
  if (!result.ok) {
    const message = getErrorMessage(result.error);
    return { ok: false, message: `Invalid JSON payload: ${message}` };
  }
  return { ok: true, data: result.value };
}

function parsePlatformReport(
  value: JsonValue | undefined,
  expectedPlatform: AppBuildPlatform,
): AppBuildPlatformReport | null {
  if (!isJsonRecord(value)) {
    return null;
  }

  const requiredFields = parseRequiredPlatformReportFields(value, expectedPlatform);
  if (requiredFields === null) {
    return null;
  }

  const optionalFields = parseOptionalPlatformReportFields(value);
  if (optionalFields === null) {
    return null;
  }

  return {
    ...requiredFields,
    ...optionalFields,
  };
}

function parseAppBuildMatrixReportDocument(document: JsonValue): AppBuildMatrixReport | null {
  if (!isJsonRecord(document)) {
    return null;
  }

  const schemaVersion = document.schemaVersion;
  const generatedAt = document.generatedAt;
  const correlationId = document.correlationId;
  const host = document.host;
  const platforms = document.platforms;
  if (
    schemaVersion !== APP_BUILD_MATRIX_REPORT_SCHEMA_VERSION ||
    typeof generatedAt !== "string" ||
    generatedAt.trim().length === 0 ||
    typeof correlationId !== "string" ||
    correlationId.trim().length === 0 ||
    !isJsonRecord(host) ||
    typeof host.os !== "string" ||
    host.os.trim().length === 0 ||
    !isJsonRecord(platforms)
  ) {
    return null;
  }

  const android = parsePlatformReport(platforms.android, "android");
  const ios = parsePlatformReport(platforms.ios, "ios");
  const desktop = parsePlatformReport(platforms.desktop, "desktop");
  if (!(android && ios && desktop)) {
    return null;
  }

  return {
    schemaVersion: APP_BUILD_MATRIX_REPORT_SCHEMA_VERSION,
    generatedAt,
    correlationId,
    host: { os: host.os },
    platforms: {
      android,
      ios,
      desktop,
    },
  };
}

/** Build a deterministic canonical app-build matrix report from per-platform results. */
export function createAppBuildMatrixReport(
  correlationId: string,
  hostOs: string,
  platforms: AppBuildMatrixPlatforms,
  generatedAt: string = new Date().toISOString(),
): AppBuildMatrixReport {
  return {
    schemaVersion: APP_BUILD_MATRIX_REPORT_SCHEMA_VERSION,
    generatedAt,
    correlationId,
    host: { os: hostOs },
    platforms,
  };
}

/** Detect whether any platform in the matrix ended in a terminal failure state. */
export function hasFailedAppBuildMatrix(report: AppBuildMatrixReport): boolean {
  return Object.values(report.platforms).some((platform) => platform.status === "fail");
}

/** Resolve the canonical app-build report directory for a repository root. */
export function resolveAppBuildMatrixReportDirectory(
  repoRoot: string,
  reportRoot?: string,
): string {
  const normalizedOverride = reportRoot?.trim() ?? "";
  return normalizedOverride.length > 0
    ? normalizedOverride
    : resolve(repoRoot, APP_BUILD_MATRIX_REPORT_DIRECTORY);
}

/** Resolve the canonical latest app-build report path for a repository root. */
export function resolveLatestAppBuildMatrixReportPath(
  repoRoot: string,
  reportRoot?: string,
): string {
  return resolve(
    resolveAppBuildMatrixReportDirectory(repoRoot, reportRoot),
    APP_BUILD_MATRIX_LATEST_REPORT_FILE,
  );
}

/** Resolve the canonical per-run app-build report path for a run directory. */
export function resolveRunAppBuildMatrixReportPath(runDirectory: string): string {
  return resolve(runDirectory, APP_BUILD_MATRIX_RUN_REPORT_FILE);
}

/** Read and validate a canonical app-build matrix report from an absolute file path. */
export function readAppBuildMatrixReport(reportPath: string): AppBuildMatrixReportReadResult {
  if (!existsSync(reportPath)) {
    return {
      ok: false,
      reason: "missing",
      message: "App-build matrix report does not exist.",
      path: reportPath,
    };
  }

  const decoded = parseJsonDocument(readFileSync(reportPath, "utf-8"));
  if (!decoded.ok) {
    return {
      ok: false,
      reason: "invalid",
      message: decoded.message,
      path: reportPath,
    };
  }

  const report = parseAppBuildMatrixReportDocument(decoded.data);
  if (!report) {
    return {
      ok: false,
      reason: "invalid",
      message: "App-build matrix report does not match the canonical schema.",
      path: reportPath,
    };
  }

  return {
    ok: true,
    data: report,
    path: reportPath,
  };
}

/** Read and validate the latest canonical app-build matrix report for a repository root. */
export function readLatestAppBuildMatrixReport(
  repoRoot: string,
  reportRoot?: string,
): AppBuildMatrixReportReadResult {
  return readAppBuildMatrixReport(resolveLatestAppBuildMatrixReportPath(repoRoot, reportRoot));
}
