/**
 * @baohaus/otel-api-bao/baggage
 *
 * Bao-namespaced re-export seam for OpenTelemetry baggage API.
 * Upstream: @opentelemetry/api@1.9.1
 */

export type { Baggage, BaggageEntry, BaggageEntryMetadata } from "@opentelemetry/api";
export { baggageEntryMetadataFromString } from "@opentelemetry/api";

export const PACKAGE_NAME = "@baohaus/otel-api-bao" as const;
export const UPSTREAM_PACKAGE = "@opentelemetry/api@1.9.1" as const;
