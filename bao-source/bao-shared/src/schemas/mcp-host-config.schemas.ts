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

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value";
import { JsonValueSchema } from "./json.schemas.ts";

/**
 * Supported restart policies for MCP server processes.
 */
export const McpServerRestartPolicySchema: Type.TUnion<
  (Type.TLiteral<"always"> | Type.TLiteral<"on-failure"> | Type.TLiteral<"never">)[]
> = Type.Union([Type.Literal("always"), Type.Literal("on-failure"), Type.Literal("never")], {
  description: "Restart policy for MCP server processes managed by local tooling.",
});

/**
 * TypeScript type for {@link McpServerRestartPolicySchema}.
 */
export type McpServerRestartPolicy = Static<typeof McpServerRestartPolicySchema>;

/**
 * Host-level MCP server config entry used by `.mcp.json`.
 */
export const McpHostServerConfigSchema = Type.Object(
  {
    type: Type.Optional(Type.String({ description: "MCP server transport type (e.g. stdio)." })),
    command: Type.String({ minLength: 1, description: "Executable command to spawn." }),
    args: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), { description: "Command args." }),
    ),
    env: Type.Optional(
      Type.Record(Type.String({ minLength: 1 }), Type.String(), {
        description: "Environment variables to pass to the MCP server.",
      }),
    ),
    restartPolicy: Type.Optional(McpServerRestartPolicySchema),
    autoStart: Type.Optional(Type.Boolean({ description: "Whether to auto-start this server." })),
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
export const McpHostConfigSchema = Type.Object(
  {
    mcpServers: Type.Record(Type.String({ minLength: 1 }), McpHostServerConfigSchema, {
      description: "Map of MCP server names to server config entries.",
    }),
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
