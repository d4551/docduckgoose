/**
 * OpenUSD Annotation Round-trip Contract v1
 *
 * Defines versioned contracts for USD annotation round-trip payloads.
 *
 * @shared/contracts/versions/v1/usd-annotations
 */

import { UsdAnnotationRoundTripSchema } from "@baohaus/bao-schemas/usd-annotations.schemas";
import type { VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name.
 */
export const ROUNDTRIP_CONTRACT_NAME = "usd-annotation-roundtrip";

/**
 * Request schema for USD annotation round-trip payloads.
 */
export const UsdAnnotationRoundTripRequestV1: typeof UsdAnnotationRoundTripSchema =
  UsdAnnotationRoundTripSchema;

/**
 * Response schema for USD annotation round-trip payloads.
 *
 * This contract models a round-trip boundary where the payload is serialized into
 * USD `customData` and later re-hydrated. The response schema mirrors the request.
 */
export const UsdAnnotationRoundTripResponseV1: typeof UsdAnnotationRoundTripSchema =
  UsdAnnotationRoundTripSchema;

/**
 * USD annotation round-trip contract definition (v1).
 */
export const UsdAnnotationRoundTripContractV1 = {
  name: ROUNDTRIP_CONTRACT_NAME,
  version: CONTRACT_VERSION,
  request: UsdAnnotationRoundTripRequestV1,
  response: UsdAnnotationRoundTripResponseV1,
} as const satisfies VersionedContractV1;
