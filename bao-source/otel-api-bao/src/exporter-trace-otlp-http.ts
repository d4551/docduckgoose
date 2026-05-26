/**
 * @baohaus/otel-api-bao/exporter-trace-otlp-http
 *
 * Bao-namespaced re-export seam for OpenTelemetry OTLP HTTP exporter.
 * Upstream: @opentelemetry/exporter-trace-otlp-http@0.214.0
 */

export { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

export const PACKAGE_NAME = "@baohaus/otel-api-bao" as const;
export const UPSTREAM_PACKAGE = "@opentelemetry/exporter-trace-otlp-http@0.214.0" as const;
