/**
 * @baohaus/otel-api-bao/sdk-trace
 *
 * Bao-namespaced re-export seam for OpenTelemetry SDK trace primitives.
 * Upstream: @opentelemetry/sdk-trace-base@2.6.1, @opentelemetry/resources@2.6.1
 */

export type { Resource } from "@opentelemetry/resources";
export { resourceFromAttributes } from "@opentelemetry/resources";
export type {
  ReadableSpan,
  SpanExporter,
  SpanProcessor,
  TracerConfig,
} from "@opentelemetry/sdk-trace-base";
export {
  BasicTracerProvider,
  BatchSpanProcessor,
  ConsoleSpanExporter,
  InMemorySpanExporter,
  NoopSpanProcessor,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";

export const PACKAGE_NAME = "@baohaus/otel-api-bao" as const;
export const UPSTREAM_PACKAGE = "@opentelemetry/sdk-trace-base@2.6.1" as const;
