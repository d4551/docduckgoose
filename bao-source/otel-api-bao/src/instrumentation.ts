/**
 * @baohaus/otel-api-bao/instrumentation
 *
 * Bao-namespaced re-export seam for OpenTelemetry instrumentation primitives.
 * Upstream: @opentelemetry/instrumentation@0.214.0
 */

export type {
  Instrumentation,
  InstrumentationConfig,
  InstrumentationModuleDefinition,
  InstrumentationModuleFile,
} from "@opentelemetry/instrumentation";
export {
  InstrumentationBase,
  InstrumentationNodeModuleDefinition,
  InstrumentationNodeModuleFile,
  registerInstrumentations,
} from "@opentelemetry/instrumentation";

export const PACKAGE_NAME = "@baohaus/otel-api-bao" as const;
export const UPSTREAM_PACKAGE = "@opentelemetry/instrumentation@0.214.0" as const;
