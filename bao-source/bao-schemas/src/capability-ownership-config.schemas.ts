/**
 * Capability ownership config schemas.
 *
 * Defines a contract-first schema for the `capabilityOwnership` section in `config/config.json`.
 * The server normalizes and applies additional semantic validation, but this schema provides a
 * stable structural contract and prevents accidental config drift.
 *
 * @shared/schemas/capability-ownership-config
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { CapabilityOwnershipKindSchema } from "./capability-ownership.schemas.ts";

const BooleanConfigValueSchema = TypeExports.Union(
  [TypeExports.Boolean(), TypeExports.String({ minLength: 1 })],
  {},
);

const NumberConfigValueSchema = TypeExports.Union(
  [TypeExports.Number(), TypeExports.String({ minLength: 1 })],
  {},
);

const StringArrayOrCsvSchema = TypeExports.Union(
  [TypeExports.Array(TypeExports.String({ minLength: 1 })), TypeExports.String({ minLength: 1 })],
  {},
);

const KindArrayOrCsvSchema = TypeExports.Union(
  [TypeExports.Array(CapabilityOwnershipKindSchema), TypeExports.String()],
  {},
);

const BoundSchema = TypeExports.Object(
  {
    min: NumberConfigValueSchema,
    max: NumberConfigValueSchema,
  },
  { additionalProperties: false },
);

const CapabilityOwnershipJobConfigSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(BooleanConfigValueSchema),
    singletonSeconds: TypeExports.Optional(NumberConfigValueSchema),
    scheduleMs: TypeExports.Optional(NumberConfigValueSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipBoundsConfigSchema = TypeExports.Object(
  {
    cacheTtlMs: BoundSchema,
    idempotencyTtlMs: BoundSchema,
    deviceInventory: TypeExports.Optional(
      TypeExports.Object(
        {
          limit: BoundSchema,
        },
        { additionalProperties: false },
      ),
    ),
    job: TypeExports.Object(
      {
        singletonSeconds: BoundSchema,
        scheduleMs: BoundSchema,
      },
      { additionalProperties: false },
    ),
    mcpSurfaces: TypeExports.Optional(
      TypeExports.Object(
        {
          maxResources: BoundSchema,
          maxTools: BoundSchema,
          maxTemplates: BoundSchema,
          errorSampleSize: BoundSchema,
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipGroupConfigSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    rollupOf: TypeExports.Optional(StringArrayOrCsvSchema),
    kinds: TypeExports.Optional(KindArrayOrCsvSchema),
    capabilityIds: TypeExports.Optional(StringArrayOrCsvSchema),
    bunbuddyKinds: TypeExports.Optional(StringArrayOrCsvSchema),
    libraryCategories: TypeExports.Optional(StringArrayOrCsvSchema),
    driverKeys: TypeExports.Optional(StringArrayOrCsvSchema),
    driverPackages: TypeExports.Optional(StringArrayOrCsvSchema),
    driverScopes: TypeExports.Optional(StringArrayOrCsvSchema),
    deviceTypes: TypeExports.Optional(StringArrayOrCsvSchema),
    deviceSources: TypeExports.Optional(StringArrayOrCsvSchema),
    deviceDriverPackages: TypeExports.Optional(StringArrayOrCsvSchema),
    includeUnassigned: TypeExports.Optional(BooleanConfigValueSchema),
    tags: TypeExports.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipDeviceInventoryConfigSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(BooleanConfigValueSchema),
    limit: TypeExports.Optional(NumberConfigValueSchema),
    includeSimulated: TypeExports.Optional(BooleanConfigValueSchema),
    statusMap: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Record(TypeExports.String({ minLength: 1 }), TypeExports.String()),
        TypeExports.String(),
      ]),
    ),
    statusFallback: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipPolicyConfigSchema = TypeExports.Object(
  {
    ownerKinds: TypeExports.Optional(KindArrayOrCsvSchema),
    responsibilityKinds: TypeExports.Optional(KindArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipFocusConfigSchema = TypeExports.Object(
  {
    segmentIds: TypeExports.Optional(StringArrayOrCsvSchema),
    domainIds: TypeExports.Optional(StringArrayOrCsvSchema),
    includeCategoryMap: TypeExports.Optional(BooleanConfigValueSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipCoverageConfigSchema = TypeExports.Object(
  {
    segmentIds: TypeExports.Optional(StringArrayOrCsvSchema),
    domainIds: TypeExports.Optional(StringArrayOrCsvSchema),
    kindOrder: TypeExports.Optional(KindArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipDomainConfigSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    groupIds: TypeExports.Optional(StringArrayOrCsvSchema),
    tags: TypeExports.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipSegmentConfigSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    domainIds: TypeExports.Optional(StringArrayOrCsvSchema),
    groupIds: TypeExports.Optional(StringArrayOrCsvSchema),
    kinds: TypeExports.Optional(KindArrayOrCsvSchema),
    matchTags: TypeExports.Optional(StringArrayOrCsvSchema),
    requiredTags: TypeExports.Optional(StringArrayOrCsvSchema),
    includeEntries: TypeExports.Optional(BooleanConfigValueSchema),
    tags: TypeExports.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipStackConfigSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    segmentIds: StringArrayOrCsvSchema,
    domainIds: TypeExports.Optional(StringArrayOrCsvSchema),
    tags: TypeExports.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipOwnerMapSectionConfigSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    domainIds: TypeExports.Optional(StringArrayOrCsvSchema),
    groupIds: TypeExports.Optional(StringArrayOrCsvSchema),
    tags: TypeExports.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipOwnerMapConfigSchema = TypeExports.Object(
  {
    sections: TypeExports.Array(CapabilityOwnershipOwnerMapSectionConfigSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipMcpSurfaceDomainConfigSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    label: TypeExports.String({ minLength: 1 }),
    groupId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    owner: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    responsibility: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    resourceUriPrefixes: TypeExports.Optional(StringArrayOrCsvSchema),
    templateUriPrefixes: TypeExports.Optional(StringArrayOrCsvSchema),
    toolSources: TypeExports.Optional(StringArrayOrCsvSchema),
    tags: TypeExports.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipMcpSurfacesConfigSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(BooleanConfigValueSchema),
    maxResources: TypeExports.Optional(NumberConfigValueSchema),
    maxTools: TypeExports.Optional(NumberConfigValueSchema),
    maxTemplates: TypeExports.Optional(NumberConfigValueSchema),
    errorSampleSize: TypeExports.Optional(NumberConfigValueSchema),
    domains: TypeExports.Optional(
      TypeExports.Array(CapabilityOwnershipMcpSurfaceDomainConfigSchema),
    ),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipMatrixConfigSchema = TypeExports.Object(
  {
    segmentIds: TypeExports.Optional(StringArrayOrCsvSchema),
    kindOrder: TypeExports.Optional(KindArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

/**
 * Capability ownership config schema (`config/config.json` -> `capabilityOwnership` section).
 */
export const CapabilityOwnershipConfigSchema = TypeExports.Object(
  {
    enabled: BooleanConfigValueSchema,
    cacheTtlMs: NumberConfigValueSchema,
    idempotencyTtlMs: NumberConfigValueSchema,
    driverVersionFallback: TypeExports.Optional(TypeExports.String()),
    bounds: CapabilityOwnershipBoundsConfigSchema,
    job: CapabilityOwnershipJobConfigSchema,
    capabilityTags: TypeExports.Optional(
      TypeExports.Union([
        TypeExports.Record(TypeExports.String({ minLength: 1 }), StringArrayOrCsvSchema),
        TypeExports.String(),
      ]),
    ),
    groups: TypeExports.Array(CapabilityOwnershipGroupConfigSchema),
    deviceInventory: TypeExports.Optional(CapabilityOwnershipDeviceInventoryConfigSchema),
    policy: TypeExports.Optional(CapabilityOwnershipPolicyConfigSchema),
    focus: TypeExports.Optional(CapabilityOwnershipFocusConfigSchema),
    coverage: TypeExports.Optional(CapabilityOwnershipCoverageConfigSchema),
    mcpSurfaces: TypeExports.Optional(CapabilityOwnershipMcpSurfacesConfigSchema),
    domains: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipDomainConfigSchema)),
    segments: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipSegmentConfigSchema)),
    stacks: TypeExports.Optional(TypeExports.Array(CapabilityOwnershipStackConfigSchema)),
    matrix: TypeExports.Optional(CapabilityOwnershipMatrixConfigSchema),
    stackMapSegments: TypeExports.Optional(StringArrayOrCsvSchema),
    highlightSegments: TypeExports.Optional(StringArrayOrCsvSchema),
    ownerMap: TypeExports.Optional(CapabilityOwnershipOwnerMapConfigSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link CapabilityOwnershipConfigSchema}.
 */
export type CapabilityOwnershipConfigInput = Static<typeof CapabilityOwnershipConfigSchema>;
