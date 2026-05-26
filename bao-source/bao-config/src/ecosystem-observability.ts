/**
 * Canonical ecosystem observability endpoint reader.
 *
 * Single seam consumed by registry / forge / Bao AI Gateway / bao-agent OTel SDK
 * initialization paths. Reads the ecosystem-wide `BAO_OBSERVABILITY_OTLP_ENDPOINT`
 * env var via the standard env-or-null helper so impl-path code never touches
 * `process.env` / `Bun.env` directly. The bao-runtime tracing module pairs with
 * this same env var so traces from every Baohaus surface land in the same
 * collector when the operator configures one.
 *
 * @packageDocumentation
 */

import { readEnvStringOrNull } from "./env";

/**
 * Resolve the configured OTLP traces endpoint for the Baohaus ecosystem.
 *
 * Accepts only absolute http(s) URLs. Returns `null` when the env var is
 * unset, empty, or carries an unsafe scheme so the caller can disable the
 * exporter cleanly without try/catch around URL parsing.
 *
 * Per-app SDK initializers (registry/forge/Bao AI Gateway) call this once at boot:
 *   const endpoint = resolveEcosystemOtlpTracesEndpoint();
 *   if (endpoint !== null) {
 *     // construct OTLPTraceExporter({ url: endpoint }) — see
 *     // @baohaus/otel-api-bao/exporter-trace-otlp-http for the allowlisted seam.
 *   }
 *
 * @returns Absolute OTLP traces endpoint URL or `null` when unconfigured.
 */
export function resolveEcosystemOtlpTracesEndpoint(): string | null {
  const raw = readEnvStringOrNull("BAO_OBSERVABILITY_OTLP_ENDPOINT");
  if (raw === null) {
    return null;
  }
  if (!raw.startsWith("http://") && !raw.startsWith("https://")) {
    return null;
  }
  return raw;
}

/**
 * Resolve the canonical Baohaus service-name attribute applied to every
 * OTLP exporter resource. Consumers pass this as the `service.name`
 * resource attribute so traces partition by source app in the bao-runtime
 * observability surface (`Source app` column on `/observability/traces`).
 *
 * @param productId - Canonical product id from {@link import('../../../bao-runtime/src/domains/system/services/bao-integration-roadmap.contract.ts').BaoIntegrationProductId} (e.g. `"bao-registry"`, `"bao-forge"`, `"bao-runtime"`).
 * @returns Service-name suitable for the OTel `service.name` resource attribute.
 */
export function buildEcosystemServiceName(productId: string): string {
  return `baohaus.${productId}`;
}
