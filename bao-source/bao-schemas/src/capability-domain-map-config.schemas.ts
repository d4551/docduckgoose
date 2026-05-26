/**
 * Capability domain map config schemas.
 *
 * Defines a contract-first schema for the `capabilities.domainMap` section in `config/config.json`.
 * The server normalizes and applies additional semantic validation, but this schema provides a
 * stable structural contract and prevents accidental config drift.
 *
 * @shared/schemas/capability-domain-map-config
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { BunBuddyKindSchema } from "./bunbuddy.schemas.ts";
import { CapabilityDomainSchema } from "./capability-domain-map.schemas.ts";

const BooleanConfigValueSchema = TypeExports.Union(
  [TypeExports.Boolean(), TypeExports.String({ minLength: 1 })],
  {},
);

const NumberConfigValueSchema = TypeExports.Union(
  [TypeExports.Number({ minimum: 0 }), TypeExports.String({ minLength: 1 })],
  {},
);

const StringArrayOrCsvSchema = TypeExports.Union(
  [TypeExports.Array(TypeExports.String({ minLength: 1 })), TypeExports.String({ minLength: 1 })],
  {},
);

const DomainIntegrationRelationSchema = TypeExports.Union(
  [
    TypeExports.Literal("data-provider"),
    TypeExports.Literal("model-consumer"),
    TypeExports.Literal("control-plane"),
    TypeExports.Literal("pipeline-stage"),
    TypeExports.Literal("mcp-exposure"),
    TypeExports.Literal("telemetry-sink"),
  ],
  {
    description: "Cross-domain integration relation type",
  },
);

const CapabilityDomainMapEdgeConfigSchema = TypeExports.Object(
  {
    source: CapabilityDomainSchema,
    target: CapabilityDomainSchema,
    relation: DomainIntegrationRelationSchema,
    active: TypeExports.Optional(BooleanConfigValueSchema),
    description: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

const CapabilityDomainMapMcpSurfaceConfigSchema = TypeExports.Object(
  {
    toolCount: NumberConfigValueSchema,
    resourceCount: NumberConfigValueSchema,
    resourceUriPrefix: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

const CapabilityDomainMapTrainingLinkConfigSchema = TypeExports.Object(
  {
    supportsDataCapture: BooleanConfigValueSchema,
    supportsModelInference: BooleanConfigValueSchema,
  },
  { additionalProperties: false },
);

const CapabilityDomainMapDomainConfigSchema = TypeExports.Object(
  {
    id: CapabilityDomainSchema,
    label: TypeExports.String({ minLength: 1 }),
    enabled: TypeExports.Optional(BooleanConfigValueSchema),
    contractCount: NumberConfigValueSchema,
    endpointCount: NumberConfigValueSchema,
    bunbuddyKind: TypeExports.Optional(BunBuddyKindSchema),
    mcpSurface: TypeExports.Optional(CapabilityDomainMapMcpSurfaceConfigSchema),
    trainingLink: TypeExports.Optional(CapabilityDomainMapTrainingLinkConfigSchema),
    queueNames: TypeExports.Optional(StringArrayOrCsvSchema),
    configSection: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    ownershipDomainIds: TypeExports.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityDomainMapEnvironmentStackCompatibilityConfigSchema = TypeExports.Object(
  {
    stackId: TypeExports.String({ minLength: 1 }),
    platforms: TypeExports.Optional(StringArrayOrCsvSchema),
    architectures: TypeExports.Optional(StringArrayOrCsvSchema),
    reason: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  {
    additionalProperties: false,
  },
);

const CapabilityDomainMapEnvironmentPolicyConfigSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(BooleanConfigValueSchema),
    includeContainerHostCandidates: TypeExports.Optional(BooleanConfigValueSchema),
    stackCompatibility: TypeExports.Optional(
      TypeExports.Array(CapabilityDomainMapEnvironmentStackCompatibilityConfigSchema),
    ),
  },
  {
    additionalProperties: false,
  },
);

/**
 * Capability domain map config schema (`config/config.json` -> `capabilities.domainMap` section).
 */
export const CapabilityDomainMapConfigSchema = TypeExports.Object(
  {
    edges: TypeExports.Optional(TypeExports.Array(CapabilityDomainMapEdgeConfigSchema)),
    domains: TypeExports.Optional(TypeExports.Array(CapabilityDomainMapDomainConfigSchema)),
    ownerMatrixStackIds: TypeExports.Optional(StringArrayOrCsvSchema),
    environment: TypeExports.Optional(CapabilityDomainMapEnvironmentPolicyConfigSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link CapabilityDomainMapConfigSchema}.
 */
export type CapabilityDomainMapConfigInput = Static<typeof CapabilityDomainMapConfigSchema>;
