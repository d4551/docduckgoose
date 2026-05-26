/**
 * MCP runtime (external server) config + metadata schemas.
 *
 * These schemas describe optional configuration for external MCP server processes used
 * during local development and tooling, along with the sanitized metadata we expose in
 * capability ownership payloads (no env values).
 *
 * @shared/schemas/mcp-runtime
 */

import type {
  InferOptionalKeys,
  Static,
  TObject,
  TOptional,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

const BooleanConfigValueSchema = TypeExports.Union(
  [TypeExports.Boolean(), TypeExports.String({ minLength: 1 })],
  {},
);

/**
 * Schema for MCP runtime ownership defaults (applied to all external MCP servers unless overridden).
 */
export const McpRuntimeOwnershipDefaultsSchema: TObject<
  {
    readonly defaultGroupId: TOptional<TString>;
    readonly defaultDomainId: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly defaultGroupId: TOptional<TString>;
    readonly defaultDomainId: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    defaultGroupId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    defaultDomainId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Schema for MCP runtime config (`config/config.json` -> `mcp.runtime` section).
 */
export const McpRuntimeConfigSchema = TypeExports.Object(
  {
    enabled: TypeExports.Optional(BooleanConfigValueSchema),
    configPath: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    ownership: TypeExports.Optional(McpRuntimeOwnershipDefaultsSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link McpRuntimeConfigSchema}.
 */
export type McpRuntimeConfigInput = Static<typeof McpRuntimeConfigSchema>;

/**
 * Schema for a sanitized ownership hint attached to external MCP server metadata.
 */
export const McpRuntimeServerOwnershipSchema: TObject<
  {
    readonly groupId: TOptional<TString>;
    readonly domainId: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly groupId: TOptional<TString>;
    readonly domainId: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    groupId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    domainId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link McpRuntimeServerOwnershipSchema}.
 */
export type McpRuntimeServerOwnership = Static<typeof McpRuntimeServerOwnershipSchema>;

/**
 * Schema for external MCP server metadata surfaced in capability ownership responses.
 *
 * @remarks
 * This intentionally omits env *values* to avoid leaking secrets; only env keys are included.
 */
export const McpRuntimeServerMetadataSchema = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    label: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    type: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    command: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    args: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    restartPolicy: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    autoStart: TypeExports.Optional(TypeExports.Boolean()),
    envKeys: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),
    ownership: TypeExports.Optional(McpRuntimeServerOwnershipSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link McpRuntimeServerMetadataSchema}.
 */
export type McpRuntimeServerMetadata = Static<typeof McpRuntimeServerMetadataSchema>;
