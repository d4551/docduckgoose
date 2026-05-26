/**
 * MCP runtime (external server) config + metadata schemas.
 *
 * These schemas describe optional configuration for external MCP server processes used
 * during local development and tooling, along with the sanitized metadata we expose in
 * capability ownership payloads (no env values).
 *
 * @shared/schemas/mcp-runtime
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

const BooleanConfigValueSchema = Type.Union([Type.Boolean(), Type.String({ minLength: 1 })], {});

/**
 * Schema for MCP runtime ownership defaults (applied to all external MCP servers unless overridden).
 */
export const McpRuntimeOwnershipDefaultsSchema: Type.TObject<
  {
    readonly defaultGroupId: Type.TOptional<Type.TString>;
    readonly defaultDomainId: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly defaultGroupId: Type.TOptional<Type.TString>;
    readonly defaultDomainId: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    defaultGroupId: Type.Optional(Type.String({ minLength: 1 })),
    defaultDomainId: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * Schema for MCP runtime config (`config/config.json` -> `mcp.runtime` section).
 */
export const McpRuntimeConfigSchema = Type.Object(
  {
    enabled: Type.Optional(BooleanConfigValueSchema),
    configPath: Type.Optional(Type.String({ minLength: 1 })),
    ownership: Type.Optional(McpRuntimeOwnershipDefaultsSchema),
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
export const McpRuntimeServerOwnershipSchema: Type.TObject<
  {
    readonly groupId: Type.TOptional<Type.TString>;
    readonly domainId: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly groupId: Type.TOptional<Type.TString>;
    readonly domainId: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    groupId: Type.Optional(Type.String({ minLength: 1 })),
    domainId: Type.Optional(Type.String({ minLength: 1 })),
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
export const McpRuntimeServerMetadataSchema = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    label: Type.Optional(Type.String({ minLength: 1 })),
    type: Type.Optional(Type.String({ minLength: 1 })),
    command: Type.Optional(Type.String({ minLength: 1 })),
    args: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    restartPolicy: Type.Optional(Type.String({ minLength: 1 })),
    autoStart: Type.Optional(Type.Boolean()),
    envKeys: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
    ownership: Type.Optional(McpRuntimeServerOwnershipSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for {@link McpRuntimeServerMetadataSchema}.
 */
export type McpRuntimeServerMetadata = Static<typeof McpRuntimeServerMetadataSchema>;
