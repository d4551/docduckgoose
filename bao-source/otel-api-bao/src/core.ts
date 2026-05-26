/**
 * @baohaus/otel-api-bao/core
 *
 * Bao-namespaced re-export seam for OpenTelemetry core ExportResult primitives.
 * Upstream: @opentelemetry/core@2.6.1
 */

export type { ExportResult } from "@opentelemetry/core";
export { ExportResultCode } from "@opentelemetry/core";

export const PACKAGE_NAME = "@baohaus/otel-api-bao" as const;
export const UPSTREAM_PACKAGE = "@opentelemetry/core@2.6.1" as const;
