/**
 * Network Discovery Contracts v1
 *
 * Defines versioned contracts for network discovery protocol availability
 * and scan endpoints (ONVIF, mDNS, SSDP).
 *
 * @shared/contracts/versions/v1/network-discovery
 */

import {
  NetworkDiscoveryCameraResponseSchema,
  NetworkDiscoveryCategorizedResponseSchema,
  NetworkDiscoveryFullResponseSchema,
  NetworkDiscoveryMdnsResponseSchema,
  NetworkDiscoveryOnvifResponseSchema,
  NetworkDiscoveryProtocolsResponseSchema,
  NetworkDiscoveryRequestSchema,
  NetworkDiscoverySsdpResponseSchema,
} from "@baohaus/bao-schemas/network-discovery.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract names.
 */
export const PROTOCOLS_CONTRACT_NAME = "network-discovery-protocols";
/** Contract name for full multi-protocol network discovery scan. */
export const FULL_CONTRACT_NAME = "network-discovery-full";
/** Contract name for ONVIF device discovery. */
export const ONVIF_CONTRACT_NAME = "network-discovery-onvif";
/** Contract name for mDNS/Bonjour service discovery. */
export const MDNS_CONTRACT_NAME = "network-discovery-mdns";
/** Contract name for SSDP device discovery. */
export const SSDP_CONTRACT_NAME = "network-discovery-ssdp";
/** Contract name for network camera discovery. */
export const CAMERAS_CONTRACT_NAME = "network-discovery-cameras";
/** Contract name for categorized network discovery results. */
export const CATEGORIZED_CONTRACT_NAME = "network-discovery-categorized";

/**
 * Request schema for protocol availability endpoint.
 */
export const NetworkDiscoveryProtocolsRequestV1: Type.TObject<
  Record<string, never>,
  never,
  never
> = Type.Object({}, { additionalProperties: false });

/**
 * Response schema for protocol availability endpoint.
 */
export const NetworkDiscoveryProtocolsResponseV1: typeof NetworkDiscoveryProtocolsResponseSchema =
  NetworkDiscoveryProtocolsResponseSchema;

/**
 * Request schema for full network discovery.
 */
export const NetworkDiscoveryFullRequestV1: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = NetworkDiscoveryRequestSchema;

/**
 * Response schema for full network discovery.
 */
export const NetworkDiscoveryFullResponseV1: typeof NetworkDiscoveryFullResponseSchema =
  NetworkDiscoveryFullResponseSchema;

/**
 * Request schema for ONVIF discovery.
 */
export const NetworkDiscoveryOnvifRequestV1: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = NetworkDiscoveryRequestSchema;

/**
 * Response schema for ONVIF discovery.
 */
export const NetworkDiscoveryOnvifResponseV1: typeof NetworkDiscoveryOnvifResponseSchema =
  NetworkDiscoveryOnvifResponseSchema;

/**
 * Request schema for mDNS discovery.
 */
export const NetworkDiscoveryMdnsRequestV1: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = NetworkDiscoveryRequestSchema;

/**
 * Response schema for mDNS discovery.
 */
export const NetworkDiscoveryMdnsResponseV1: typeof NetworkDiscoveryMdnsResponseSchema =
  NetworkDiscoveryMdnsResponseSchema;

/**
 * Request schema for SSDP discovery.
 */
export const NetworkDiscoverySsdpRequestV1: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = NetworkDiscoveryRequestSchema;

/**
 * Response schema for SSDP discovery.
 */
export const NetworkDiscoverySsdpResponseV1: typeof NetworkDiscoverySsdpResponseSchema =
  NetworkDiscoverySsdpResponseSchema;

/**
 * Request schema for camera discovery (mDNS).
 */
export const NetworkDiscoveryCamerasRequestV1: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = NetworkDiscoveryRequestSchema;

/**
 * Response schema for camera discovery (mDNS).
 */
export const NetworkDiscoveryCamerasResponseV1: typeof NetworkDiscoveryCameraResponseSchema =
  NetworkDiscoveryCameraResponseSchema;

/**
 * Request schema for categorized discovery.
 */
export const NetworkDiscoveryCategorizedRequestV1: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = NetworkDiscoveryRequestSchema;

/**
 * Response schema for categorized discovery.
 */
export const NetworkDiscoveryCategorizedResponseV1: typeof NetworkDiscoveryCategorizedResponseSchema =
  NetworkDiscoveryCategorizedResponseSchema;

/**
 * Standard error envelope for API responses (contract mirror).
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for protocol availability endpoint.
 */
export const NetworkDiscoveryProtocolsErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Error schema for full discovery endpoint.
 */
export const NetworkDiscoveryFullErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Error schema for ONVIF discovery endpoint.
 */
export const NetworkDiscoveryOnvifErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Error schema for mDNS discovery endpoint.
 */
export const NetworkDiscoveryMdnsErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Error schema for SSDP discovery endpoint.
 */
export const NetworkDiscoverySsdpErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Error schema for camera discovery endpoint.
 */
export const NetworkDiscoveryCamerasErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Error schema for categorized discovery endpoint.
 */
export const NetworkDiscoveryCategorizedErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    404: ErrorEnvelopeV1,
    409: ErrorEnvelopeV1,
    422: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    502: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Network discovery protocol availability contract definition (v1).
 */
export const NetworkDiscoveryProtocolsContractV1 = {
  version: CONTRACT_VERSION,
  name: PROTOCOLS_CONTRACT_NAME,
  request: NetworkDiscoveryProtocolsRequestV1,
  response: NetworkDiscoveryProtocolsResponseV1,
  errors: NetworkDiscoveryProtocolsErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Network discovery full scan contract definition (v1).
 */
export const NetworkDiscoveryFullContractV1 = {
  version: CONTRACT_VERSION,
  name: FULL_CONTRACT_NAME,
  request: NetworkDiscoveryFullRequestV1,
  response: NetworkDiscoveryFullResponseV1,
  errors: NetworkDiscoveryFullErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Network discovery ONVIF scan contract definition (v1).
 */
export const NetworkDiscoveryOnvifContractV1 = {
  version: CONTRACT_VERSION,
  name: ONVIF_CONTRACT_NAME,
  request: NetworkDiscoveryOnvifRequestV1,
  response: NetworkDiscoveryOnvifResponseV1,
  errors: NetworkDiscoveryOnvifErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Network discovery mDNS scan contract definition (v1).
 */
export const NetworkDiscoveryMdnsContractV1 = {
  version: CONTRACT_VERSION,
  name: MDNS_CONTRACT_NAME,
  request: NetworkDiscoveryMdnsRequestV1,
  response: NetworkDiscoveryMdnsResponseV1,
  errors: NetworkDiscoveryMdnsErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Network discovery SSDP scan contract definition (v1).
 */
export const NetworkDiscoverySsdpContractV1 = {
  version: CONTRACT_VERSION,
  name: SSDP_CONTRACT_NAME,
  request: NetworkDiscoverySsdpRequestV1,
  response: NetworkDiscoverySsdpResponseV1,
  errors: NetworkDiscoverySsdpErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Network discovery camera scan contract definition (v1).
 */
export const NetworkDiscoveryCamerasContractV1 = {
  version: CONTRACT_VERSION,
  name: CAMERAS_CONTRACT_NAME,
  request: NetworkDiscoveryCamerasRequestV1,
  response: NetworkDiscoveryCamerasResponseV1,
  errors: NetworkDiscoveryCamerasErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Network discovery categorized scan contract definition (v1).
 */
export const NetworkDiscoveryCategorizedContractV1 = {
  version: CONTRACT_VERSION,
  name: CATEGORIZED_CONTRACT_NAME,
  request: NetworkDiscoveryCategorizedRequestV1,
  response: NetworkDiscoveryCategorizedResponseV1,
  errors: NetworkDiscoveryCategorizedErrorV1,
} as const satisfies VersionedContractV1;
