/**
 * Minimal AppConfig schema for optional runtime validation.
 *
 * Used when APP_CONFIG_VALIDATE=true to catch gross structural errors
 * (e.g. root is not an object). Full validation is not performed.
 *
 * @shared/schemas/app-config
 */

import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Minimal app config schema (config/config.json root shape).
 *
 * Validates that the root is an object. Individual sections use
 * `TypeExports.Optional(TypeExports.Unknown())` — accepts any runtime value but
 * types as `unknown` in TypeScript, forcing callers to narrow before use.
 */
export const AppConfigSchema = TypeExports.Object(
  {
    system: TypeExports.Optional(TypeExports.Unknown()),
    systemIntegration: TypeExports.Optional(TypeExports.Unknown()),
    server: TypeExports.Optional(TypeExports.Unknown()),
    auth: TypeExports.Optional(TypeExports.Unknown()),
    setupWizard: TypeExports.Optional(TypeExports.Unknown()),
    mcp: TypeExports.Optional(TypeExports.Unknown()),
    database: TypeExports.Optional(TypeExports.Unknown()),
    asciiAudit: TypeExports.Optional(TypeExports.Unknown()),
    tsdocPolicy: TypeExports.Optional(TypeExports.Unknown()),
  },
  {
    description: "Minimal app config root (config/config.json)",
    additionalProperties: true,
  },
);
