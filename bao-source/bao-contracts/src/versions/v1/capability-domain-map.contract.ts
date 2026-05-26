/**
 * Cross-domain capability map contracts v1.
 *
 * Defines the versioned contracts for the capability domain map surface
 * that maps owners across local AI, XR/USD, MCP, and device/driver stacks.
 *
 * @shared/contracts/versions/v1/capability-domain-map
 */

import { CAPABILITY_DOMAIN_MAP_REFRESH_IDEMPOTENCY_KEY_MAX_LENGTH } from "@baohaus/bao-constants/capability-domain-map";
import { CapabilityDomainMapResponseSchema } from "@baohaus/bao-schemas/capability-domain-map.schemas";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { buildErrorEnvelopeSchema, type VersionedContractV1 } from "./error-envelope.contract";

/**
 * Contract version identifier.
 */
export const CONTRACT_VERSION = "1.0.0";

/**
 * Contract name for the domain map read endpoint.
 */
export const MAP_CONTRACT_NAME = "capability-domain-map";

/**
 * Contract name for the domain map refresh endpoint.
 */
export const REFRESH_CONTRACT_NAME = "capability-domain-map-refresh";

/**
 * Request schema for domain map read (query parameters).
 */
export const CapabilityDomainMapRequestV1: Type.TObject<
  {
    readonly domains: Type.TOptional<Type.TString>;
    readonly includeEdges: Type.TOptional<Type.TBoolean>;
    readonly includeBunBuddyStatus: Type.TOptional<Type.TBoolean>;
    readonly includeBaoRuntime: Type.TOptional<Type.TBoolean>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly domains: Type.TOptional<Type.TString>;
    readonly includeEdges: Type.TOptional<Type.TBoolean>;
    readonly includeBunBuddyStatus: Type.TOptional<Type.TBoolean>;
    readonly includeBaoRuntime: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    domains: Type.Optional(
      Type.String({
        description: 'Comma-separated domain filter (e.g. "drone,robotics,training")',
      }),
    ),
    includeEdges: Type.Optional(
      Type.Boolean({ description: "Include integration edges in response", default: true }),
    ),
    includeBunBuddyStatus: Type.Optional(
      Type.Boolean({ description: "Include live bunbuddy health checks", default: false }),
    ),
    includeBaoRuntime: Type.Optional(
      Type.Boolean({ description: "Include BaoControlPlane runtime summary", default: false }),
    ),
  },
  { additionalProperties: false },
);

/**
 * Response schema for domain map read.
 */
export const CapabilityDomainMapResponseV1: typeof CapabilityDomainMapResponseSchema =
  CapabilityDomainMapResponseSchema;

/**
 * Request schema for domain map refresh.
 */
export const CapabilityDomainMapRefreshRequestV1: Type.TObject<
  {
    readonly force: Type.TOptional<Type.TBoolean>;
    readonly includeEdges: Type.TOptional<Type.TBoolean>;
    readonly includeBunBuddyStatus: Type.TOptional<Type.TBoolean>;
    readonly includeBaoRuntime: Type.TOptional<Type.TBoolean>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly force: Type.TOptional<Type.TBoolean>;
    readonly includeEdges: Type.TOptional<Type.TBoolean>;
    readonly includeBunBuddyStatus: Type.TOptional<Type.TBoolean>;
    readonly includeBaoRuntime: Type.TOptional<Type.TBoolean>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    force: Type.Optional(Type.Boolean({ description: "Force refresh all domain statuses" })),
    includeEdges: Type.Optional(
      Type.Boolean({
        description: "Include integration edges in refreshed response",
      }),
    ),
    includeBunBuddyStatus: Type.Optional(
      Type.Boolean({
        description: "Include live bunbuddy health checks in refreshed response",
      }),
    ),
    includeBaoRuntime: Type.Optional(
      Type.Boolean({
        description: "Include BaoControlPlane runtime summary in refreshed response",
      }),
    ),
    idempotencyKey: Type.Optional(
      Type.String({
        minLength: 1,
        maxLength: CAPABILITY_DOMAIN_MAP_REFRESH_IDEMPOTENCY_KEY_MAX_LENGTH,
        description: "Optional idempotency key for refresh requests",
      }),
    ),
  },
  { additionalProperties: false },
);

/**
 * Response schema for domain map refresh (same shape as read).
 */
export const CapabilityDomainMapRefreshResponseV1: typeof CapabilityDomainMapResponseSchema =
  CapabilityDomainMapResponseSchema;

/**
 * Standard error envelope for API responses.
 */
const ErrorEnvelopeV1: ReturnType<typeof buildErrorEnvelopeSchema> = buildErrorEnvelopeSchema();

/**
 * Error schema for domain map read endpoint.
 */
export const CapabilityDomainMapErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Error schema for domain map refresh endpoint.
 */
export const CapabilityDomainMapRefreshErrorV1 = Type.Object(
  {
    400: ErrorEnvelopeV1,
    401: ErrorEnvelopeV1,
    403: ErrorEnvelopeV1,
    429: ErrorEnvelopeV1,
    500: ErrorEnvelopeV1,
    503: ErrorEnvelopeV1,
  },
  { additionalProperties: false },
);

/**
 * Domain map read contract definition.
 */
export const CapabilityDomainMapContractV1 = {
  version: CONTRACT_VERSION,
  name: MAP_CONTRACT_NAME,
  request: CapabilityDomainMapRequestV1,
  response: CapabilityDomainMapResponseV1,
  errors: CapabilityDomainMapErrorV1,
} as const satisfies VersionedContractV1;

/**
 * Domain map refresh contract definition.
 */
export const CapabilityDomainMapRefreshContractV1 = {
  version: CONTRACT_VERSION,
  name: REFRESH_CONTRACT_NAME,
  request: CapabilityDomainMapRefreshRequestV1,
  response: CapabilityDomainMapRefreshResponseV1,
  errors: CapabilityDomainMapRefreshErrorV1,
} as const satisfies VersionedContractV1;
