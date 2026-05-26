/**
 * Bao-namespaced OpenTelemetry metrics API surface.
 *
 * Upstream: @opentelemetry/api@1.9.1
 *
 * Bao implementation packages import metrics primitives from this submodule so
 * direct upstream version churn stays contained in `@baohaus/otel-api-bao`.
 *
 * @packageDocumentation
 */

export type {
  Attributes,
  AttributeValue,
  Counter,
  Histogram,
  Meter,
  MeterOptions,
  MeterProvider,
  MetricOptions,
  Observable,
  ObservableCallback,
  ObservableCounter,
  ObservableGauge,
  ObservableResult,
  UpDownCounter,
} from "@opentelemetry/api";
export { metrics, ValueType } from "@opentelemetry/api";

/** Upstream package/version mirrored by this submodule. */
export const UPSTREAM_PACKAGE = "@opentelemetry/api@1.9.1" as const;
