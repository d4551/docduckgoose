/**
 * Minimal AppConfig schema for optional runtime validation.
 *
 * Used when APP_CONFIG_VALIDATE=true to catch gross structural errors
 * (e.g. root is not an object). Full validation is not performed.
 *
 * @shared/schemas/app-config
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Minimal app config schema (config/config.json root shape).
 *
 * Validates that the root is an object. Individual sections use
 * `Type.Optional(Type.Unknown())` — accepts any runtime value but
 * types as `unknown` in TypeScript, forcing callers to narrow before use.
 */
export const AppConfigSchema = Type.Object(
  {
    system: Type.Optional(Type.Unknown()),
    systemIntegration: Type.Optional(Type.Unknown()),
    server: Type.Optional(Type.Unknown()),
    auth: Type.Optional(Type.Unknown()),
    setupWizard: Type.Optional(Type.Unknown()),
    mcp: Type.Optional(Type.Unknown()),
    database: Type.Optional(Type.Unknown()),
    asciiAudit: Type.Optional(Type.Unknown()),
    tsdocPolicy: Type.Optional(Type.Unknown()),
  },
  {
    description: "Minimal app config root (config/config.json)",
    additionalProperties: true,
  },
);
