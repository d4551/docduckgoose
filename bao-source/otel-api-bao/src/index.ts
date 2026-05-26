/**
 * @baohaus/otel-api-bao
 *
 * Bao-namespaced re-export seam for OpenTelemetry primitives.
 * Impl-path consumers MUST import from submodule subpaths
 * (`./trace`, `./context`, `./baggage`, `./sdk-trace`, `./instrumentation`,
 * `./core`, `./exporter-trace-otlp-http`).
 *
 * This module file intentionally exposes only package metadata and contains
 * no aggregator re-exports — submodules are the public surface.
 */

export const PACKAGE_NAME = "@baohaus/otel-api-bao" as const;
export const UPSTREAM_PACKAGE = "@opentelemetry/api@1.9.1" as const;
