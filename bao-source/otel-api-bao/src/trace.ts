/**
 * @baohaus/otel-api-bao/trace
 *
 * Bao-namespaced re-export seam for OpenTelemetry trace API.
 * Upstream: @opentelemetry/api@1.9.1
 *
 * Impl-path consumers in the Bao monorepo MUST import OTel trace symbols from
 * this submodule. Direct `@opentelemetry/api` imports are forbidden in impl
 * paths by the governance allowlist (root CLAUDE.md).
 */

export type {
  Attributes,
  AttributeValue,
  Link,
  Span,
  SpanAttributes,
  SpanAttributeValue,
  SpanContext,
  SpanOptions,
  SpanStatus,
  TimeInput,
  Tracer,
  TracerProvider,
} from "@opentelemetry/api";
export {
  context,
  SpanKind,
  SpanStatusCode,
  TraceFlags,
  trace,
} from "@opentelemetry/api";

export const PACKAGE_NAME = "@baohaus/otel-api-bao" as const;
export const UPSTREAM_PACKAGE = "@opentelemetry/api@1.9.1" as const;
