/**
 * Capability domain map API config schemas.
 *
 * Defines a contract-first schema for the `capabilityDomainMap` section in
 * `config/config.json`.
 *
 * @shared/schemas/capability-domain-map-api-config
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

const BooleanConfigValueSchema = TypeExports.Union(
  [TypeExports.Boolean(), TypeExports.String({ minLength: 1 })],
  {},
);

const NumberConfigValueSchema = TypeExports.Union(
  [TypeExports.Number({ minimum: 0 }), TypeExports.String({ minLength: 1 })],
  {},
);

const CapabilityDomainMapApiBoundSchema = TypeExports.Object(
  {
    min: NumberConfigValueSchema,
    max: NumberConfigValueSchema,
  },
  { additionalProperties: false },
);

const CapabilityDomainMapApiRateLimitSchema = TypeExports.Object(
  {
    requestsPerWindow: NumberConfigValueSchema,
    windowSeconds: NumberConfigValueSchema,
    burstCapacity: NumberConfigValueSchema,
    maxConcurrent: NumberConfigValueSchema,
  },
  { additionalProperties: false },
);

const CapabilityDomainMapApiRateLimitBoundsSchema = TypeExports.Object(
  {
    requestsPerWindow: CapabilityDomainMapApiBoundSchema,
    windowSeconds: CapabilityDomainMapApiBoundSchema,
    burstCapacity: CapabilityDomainMapApiBoundSchema,
    maxConcurrent: CapabilityDomainMapApiBoundSchema,
  },
  { additionalProperties: false },
);

const CapabilityDomainMapApiReadDefaultsSchema = TypeExports.Object(
  {
    includeEdges: TypeExports.Optional(BooleanConfigValueSchema),
    includeBunBuddyStatus: TypeExports.Optional(BooleanConfigValueSchema),
    includeBaoRuntime: TypeExports.Optional(BooleanConfigValueSchema),
  },
  { additionalProperties: false },
);

const CapabilityDomainMapApiRefreshDefaultsSchema = TypeExports.Object(
  {
    includeEdges: TypeExports.Optional(BooleanConfigValueSchema),
    includeBunBuddyStatus: TypeExports.Optional(BooleanConfigValueSchema),
    includeBaoRuntime: TypeExports.Optional(BooleanConfigValueSchema),
  },
  { additionalProperties: false },
);

const CapabilityDomainMapApiRefreshJobSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(BooleanConfigValueSchema),
    singletonSeconds: TypeExports.Optional(NumberConfigValueSchema),
    scheduleMs: TypeExports.Optional(NumberConfigValueSchema),
  },
  { additionalProperties: false },
);

const CapabilityDomainMapApiRefreshSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(BooleanConfigValueSchema),
    idempotencyTtlMs: TypeExports.Optional(NumberConfigValueSchema),
    idempotencyKeyMaxLength: TypeExports.Optional(NumberConfigValueSchema),
    readTelemetrySpanName: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    telemetrySpanName: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    defaults: TypeExports.Optional(CapabilityDomainMapApiRefreshDefaultsSchema),
    job: TypeExports.Optional(CapabilityDomainMapApiRefreshJobSchema),
  },
  { additionalProperties: false },
);

const CapabilityDomainMapApiRefreshBoundsSchema = TypeExports.Object(
  {
    idempotencyTtlMs: CapabilityDomainMapApiBoundSchema,
    idempotencyKeyMaxLength: CapabilityDomainMapApiBoundSchema,
    singletonSeconds: CapabilityDomainMapApiBoundSchema,
    scheduleMs: CapabilityDomainMapApiBoundSchema,
  },
  { additionalProperties: false },
);

/**
 * Capability domain map API config schema (`config/config.json` -> `capabilityDomainMap`).
 */
export const CapabilityDomainMapApiConfigSchema = TypeExports.Object(
  {
    rateLimit: CapabilityDomainMapApiRateLimitSchema,
    rateLimitBounds: CapabilityDomainMapApiRateLimitBoundsSchema,
    readDefaults: TypeExports.Optional(CapabilityDomainMapApiReadDefaultsSchema),
    refresh: TypeExports.Optional(CapabilityDomainMapApiRefreshSchema),
    refreshBounds: CapabilityDomainMapApiRefreshBoundsSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link CapabilityDomainMapApiConfigSchema}.
 */
export type CapabilityDomainMapApiConfigInput = Static<typeof CapabilityDomainMapApiConfigSchema>;
