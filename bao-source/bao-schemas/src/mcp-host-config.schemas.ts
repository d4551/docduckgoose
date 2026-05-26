/**
 * MCP host configuration schemas.
 *
 * Defines the `.mcp.json` configuration shape used to register MCP servers for
 * local development and tooling (for example, `context7` and `daisyui-blueprint`).
 *
 * This is distinct from the API-facing MCP schemas under `mcp.schemas.ts`.
 *
 * @shared/schemas/mcp-host-config
 */

import type { Static, TLiteral, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Supported restart policies for MCP server processes.
 */
export const McpServerRestartPolicySchema: TUnion<
  (TLiteral<"always"> | TLiteral<"on-failure"> | TLiteral<"never">)[]
> = TypeExports.Union(
  [TypeExports.Literal("always"), TypeExports.Literal("on-failure"), TypeExports.Literal("never")],
  {
    description: "Restart policy for MCP server processes managed by local tooling.",
  },
);

/**
 * TypeScript type for {@link McpServerRestartPolicySchema}.
 */
export type McpServerRestartPolicy = Static<typeof McpServerRestartPolicySchema>;

/**
 * Host-level MCP server config entry used by `.mcp.json`.
 */
export const McpHostServerConfigSchema = TypeExports.Object(
  {
    type: TypeExports.Optional(
      TypeExports.String({ description: "MCP server transport type (e.g. stdio)." }),
    ),
    command: TypeExports.String({ minLength: 1, description: "Executable command to spawn." }),
    args: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), { description: "Command args." }),
    ),
    env: TypeExports.Optional(
      TypeExports.Record(TypeExports.String({ minLength: 1 }), TypeExports.String(), {
        description: "Environment variables to pass to the MCP server.",
      }),
    ),
    restartPolicy: TypeExports.Optional(McpServerRestartPolicySchema),
    autoStart: TypeExports.Optional(
      TypeExports.Boolean({ description: "Whether to auto-start this server." }),
    ),
  },
  {
    description: "MCP server config entry used by `.mcp.json`.",
    additionalProperties: JsonValueSchema,
  },
);

/**
 * TypeScript type for {@link McpHostServerConfigSchema}.
 */
export type McpHostServerConfig = Static<typeof McpHostServerConfigSchema>;

/**
 * Host-level MCP config used by `.mcp.json`.
 */
export const McpHostConfigSchema = TypeExports.Object(
  {
    mcpServers: TypeExports.Record(
      TypeExports.String({ minLength: 1 }),
      McpHostServerConfigSchema,
      {
        description: "Map of MCP server names to server config entries.",
      },
    ),
  },
  {
    description: "Host-level MCP server registry configuration (`.mcp.json`).",
    additionalProperties: JsonValueSchema,
  },
);

/**
 * TypeScript type for {@link McpHostConfigSchema}.
 */
export type McpHostConfig = Static<typeof McpHostConfigSchema>;

/**
 * Runtime type guard for {@link McpHostConfig}.
 *
 * @param value - Candidate value.
 * @returns True when the value conforms to {@link McpHostConfigSchema}.
 */
export function isMcpHostConfig(value: unknown): value is McpHostConfig {
  return Check(McpHostConfigSchema, value);
}
