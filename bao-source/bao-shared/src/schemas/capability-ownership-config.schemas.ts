/**
 * Capability ownership config schemas.
 *
 * Defines a contract-first schema for the `capabilityOwnership` section in `config/config.json`.
 * The server normalizes and applies additional semantic validation, but this schema provides a
 * stable structural contract and prevents accidental config drift.
 *
 * @shared/schemas/capability-ownership-config
 */

import { CapabilityOwnershipKindSchema } from "@baohaus/bao-schemas/capability-ownership/enums";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

const BooleanConfigValueSchema = Type.Union([Type.Boolean(), Type.String({ minLength: 1 })], {});

const NumberConfigValueSchema = Type.Union([Type.Number(), Type.String({ minLength: 1 })], {});

const StringArrayOrCsvSchema = Type.Union(
  [Type.Array(Type.String({ minLength: 1 })), Type.String({ minLength: 1 })],
  {},
);

const KindArrayOrCsvSchema = Type.Union(
  [Type.Array(CapabilityOwnershipKindSchema), Type.String()],
  {},
);

const BoundSchema = Type.Object(
  {
    min: NumberConfigValueSchema,
    max: NumberConfigValueSchema,
  },
  { additionalProperties: false },
);

const CapabilityOwnershipJobConfigSchema = Type.Object(
  {
    enabled: Type.Optional(BooleanConfigValueSchema),
    singletonSeconds: Type.Optional(NumberConfigValueSchema),
    scheduleMs: Type.Optional(NumberConfigValueSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipBoundsConfigSchema = Type.Object(
  {
    cacheTtlMs: BoundSchema,
    idempotencyTtlMs: BoundSchema,
    deviceInventory: Type.Optional(
      Type.Object(
        {
          limit: BoundSchema,
        },
        { additionalProperties: false },
      ),
    ),
    job: Type.Object(
      {
        singletonSeconds: BoundSchema,
        scheduleMs: BoundSchema,
      },
      { additionalProperties: false },
    ),
    mcpSurfaces: Type.Optional(
      Type.Object(
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

const CapabilityOwnershipGroupConfigSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    rollupOf: Type.Optional(StringArrayOrCsvSchema),
    kinds: Type.Optional(KindArrayOrCsvSchema),
    capabilityIds: Type.Optional(StringArrayOrCsvSchema),
    bunbuddyKinds: Type.Optional(StringArrayOrCsvSchema),
    libraryCategories: Type.Optional(StringArrayOrCsvSchema),
    driverKeys: Type.Optional(StringArrayOrCsvSchema),
    driverPackages: Type.Optional(StringArrayOrCsvSchema),
    driverScopes: Type.Optional(StringArrayOrCsvSchema),
    deviceTypes: Type.Optional(StringArrayOrCsvSchema),
    deviceSources: Type.Optional(StringArrayOrCsvSchema),
    deviceDriverPackages: Type.Optional(StringArrayOrCsvSchema),
    includeUnassigned: Type.Optional(BooleanConfigValueSchema),
    tags: Type.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipDeviceInventoryConfigSchema = Type.Object(
  {
    enabled: Type.Optional(BooleanConfigValueSchema),
    limit: Type.Optional(NumberConfigValueSchema),
    includeSimulated: Type.Optional(BooleanConfigValueSchema),
    statusMap: Type.Optional(
      Type.Union([Type.Record(Type.String({ minLength: 1 }), Type.String()), Type.String()]),
    ),
    statusFallback: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipPolicyConfigSchema = Type.Object(
  {
    ownerKinds: Type.Optional(KindArrayOrCsvSchema),
    responsibilityKinds: Type.Optional(KindArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipFocusConfigSchema = Type.Object(
  {
    segmentIds: Type.Optional(StringArrayOrCsvSchema),
    domainIds: Type.Optional(StringArrayOrCsvSchema),
    includeCategoryMap: Type.Optional(BooleanConfigValueSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipCoverageConfigSchema = Type.Object(
  {
    segmentIds: Type.Optional(StringArrayOrCsvSchema),
    domainIds: Type.Optional(StringArrayOrCsvSchema),
    kindOrder: Type.Optional(KindArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipDomainConfigSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    groupIds: Type.Optional(StringArrayOrCsvSchema),
    tags: Type.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipSegmentConfigSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    domainIds: Type.Optional(StringArrayOrCsvSchema),
    groupIds: Type.Optional(StringArrayOrCsvSchema),
    kinds: Type.Optional(KindArrayOrCsvSchema),
    matchTags: Type.Optional(StringArrayOrCsvSchema),
    requiredTags: Type.Optional(StringArrayOrCsvSchema),
    includeEntries: Type.Optional(BooleanConfigValueSchema),
    tags: Type.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipStackConfigSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    segmentIds: StringArrayOrCsvSchema,
    domainIds: Type.Optional(StringArrayOrCsvSchema),
    tags: Type.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipOwnerMapSectionConfigSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    domainIds: Type.Optional(StringArrayOrCsvSchema),
    groupIds: Type.Optional(StringArrayOrCsvSchema),
    tags: Type.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipOwnerMapConfigSchema = Type.Object(
  {
    sections: Type.Array(CapabilityOwnershipOwnerMapSectionConfigSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipMcpSurfaceDomainConfigSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    label: Type.String({ minLength: 1 }),
    groupId: Type.Optional(Type.String({ minLength: 1 })),
    owner: Type.Optional(Type.String({ minLength: 1 })),
    responsibility: Type.Optional(Type.String({ minLength: 1 })),
    resourceUriPrefixes: Type.Optional(StringArrayOrCsvSchema),
    templateUriPrefixes: Type.Optional(StringArrayOrCsvSchema),
    toolSources: Type.Optional(StringArrayOrCsvSchema),
    tags: Type.Optional(StringArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipMcpSurfacesConfigSchema = Type.Object(
  {
    enabled: Type.Optional(BooleanConfigValueSchema),
    maxResources: Type.Optional(NumberConfigValueSchema),
    maxTools: Type.Optional(NumberConfigValueSchema),
    maxTemplates: Type.Optional(NumberConfigValueSchema),
    errorSampleSize: Type.Optional(NumberConfigValueSchema),
    domains: Type.Optional(Type.Array(CapabilityOwnershipMcpSurfaceDomainConfigSchema)),
  },
  { additionalProperties: false },
);

const CapabilityOwnershipMatrixConfigSchema = Type.Object(
  {
    segmentIds: Type.Optional(StringArrayOrCsvSchema),
    kindOrder: Type.Optional(KindArrayOrCsvSchema),
  },
  { additionalProperties: false },
);

/**
 * Capability ownership config schema (`config/config.json` -> `capabilityOwnership` section).
 */
export const CapabilityOwnershipConfigSchema = Type.Object(
  {
    enabled: BooleanConfigValueSchema,
    cacheTtlMs: NumberConfigValueSchema,
    idempotencyTtlMs: NumberConfigValueSchema,
    driverVersionFallback: Type.Optional(Type.String()),
    bounds: CapabilityOwnershipBoundsConfigSchema,
    job: CapabilityOwnershipJobConfigSchema,
    capabilityTags: Type.Optional(
      Type.Union([
        Type.Record(Type.String({ minLength: 1 }), StringArrayOrCsvSchema),
        Type.String(),
      ]),
    ),
    groups: Type.Array(CapabilityOwnershipGroupConfigSchema),
    deviceInventory: Type.Optional(CapabilityOwnershipDeviceInventoryConfigSchema),
    policy: Type.Optional(CapabilityOwnershipPolicyConfigSchema),
    focus: Type.Optional(CapabilityOwnershipFocusConfigSchema),
    coverage: Type.Optional(CapabilityOwnershipCoverageConfigSchema),
    mcpSurfaces: Type.Optional(CapabilityOwnershipMcpSurfacesConfigSchema),
    domains: Type.Optional(Type.Array(CapabilityOwnershipDomainConfigSchema)),
    segments: Type.Optional(Type.Array(CapabilityOwnershipSegmentConfigSchema)),
    stacks: Type.Optional(Type.Array(CapabilityOwnershipStackConfigSchema)),
    matrix: Type.Optional(CapabilityOwnershipMatrixConfigSchema),
    stackMapSegments: Type.Optional(StringArrayOrCsvSchema),
    highlightSegments: Type.Optional(StringArrayOrCsvSchema),
    ownerMap: Type.Optional(CapabilityOwnershipOwnerMapConfigSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link CapabilityOwnershipConfigSchema}.
 */
export type CapabilityOwnershipConfigInput = Static<typeof CapabilityOwnershipConfigSchema>;
