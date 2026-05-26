/**
 * @baohaus/otel-api-bao/context
 *
 * Bao-namespaced re-export seam for OpenTelemetry context + propagation APIs.
 * Upstream:
 *   - context, propagation: @opentelemetry/api@1.9.1
 *   - W3CTraceContextPropagator: @opentelemetry/core@2.6.1
 */

export type {
  Context,
  ContextManager,
  TextMapGetter,
  TextMapPropagator,
  TextMapSetter,
} from "@opentelemetry/api";
export { context, createContextKey, propagation, ROOT_CONTEXT } from "@opentelemetry/api";
export { W3CTraceContextPropagator } from "@opentelemetry/core";

export const PACKAGE_NAME = "@baohaus/otel-api-bao" as const;
export const UPSTREAM_PACKAGE = "@opentelemetry/api@1.9.1" as const;
