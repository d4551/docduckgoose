/**
 * Shared FHIR response payload types.
 *
 * Centralizes response shapes for FHIR API endpoints shared across
 * Elysia routes and Eden consumers backed by Baofire.
 *
 * @packageDocumentation
 */

/**
 * Payload returned by the FHIR status endpoint.
 */
export interface FhirStatusPayload {
  /** True when the FHIR integration is available. */
  available: boolean;
  /** Optional error message when unavailable. */
  error?: string;
}

/**
 * Payload returned by the FHIR patient search endpoint.
 */
export interface FhirPatientSearchPayload {
  /** Total number of matching patients. */
  total: number;
  /** Raw patient resources returned by Baofire-backed search. */
  patients: Record<string, unknown>[];
}

/**
 * Payload returned by the FHIR patient detail endpoint.
 */
export interface FhirPatientDetailPayload {
  /** Raw patient resource returned by Baofire-backed read. */
  patient: Record<string, unknown>;
}
