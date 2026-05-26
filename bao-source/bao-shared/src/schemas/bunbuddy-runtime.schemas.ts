/**
 * BunBuddy runtime configuration schemas.
 *
 * Defines TypeBox schemas for bunbuddy runtime config validation.
 *
 * @shared/schemas/bunbuddy-runtime
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * BunBuddy runtime list value (array or CSV string).
 */
export const BunBuddyRuntimeListSchema: Type.TUnion<(Type.TString | Type.TArray<Type.TString>)[]> =
  Type.Union([Type.Array(Type.String({ minLength: 1 })), Type.String()], {});

/**
 * BunBuddy runtime boolean config value (literal or env-resolved string).
 */
export const BunBuddyRuntimeBooleanSchema: Type.TUnion<(Type.TBoolean | Type.TString)[]> =
  Type.Union([Type.Boolean(), Type.String({ minLength: 1 })], {});

/**
 * BunBuddy runtime numeric config value (literal or env-resolved string).
 */
export const BunBuddyRuntimeNumericSchema: Type.TUnion<(Type.TNumber | Type.TString)[]> =
  Type.Union([Type.Number(), Type.String({ minLength: 1 })], {});

/**
 * BunBuddy runtime image overrides.
 */
export const BunBuddyRuntimeImageConfigSchema: Type.TObject<
  { readonly bun: Type.TOptional<Type.TString>; readonly node: Type.TOptional<Type.TString> },
  never,
  Type.InferOptionalKeys<{
    readonly bun: Type.TOptional<Type.TString>;
    readonly node: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    bun: Type.Optional(Type.String()),
    node: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy OpenAPI export runtime settings.
 */
export const BunBuddyRuntimeOpenApiConfigSchema: Type.TObject<
  {
    readonly readinessTimeoutMs: Type.TUnion<(Type.TNumber | Type.TString)[]>;
    readonly readinessIntervalMs: Type.TUnion<(Type.TNumber | Type.TString)[]>;
    readonly fetchTimeoutMs: Type.TUnion<(Type.TNumber | Type.TString)[]>;
    readonly healthContractKey: Type.TString;
  },
  "readinessTimeoutMs" | "readinessIntervalMs" | "fetchTimeoutMs" | "healthContractKey",
  never
> = Type.Object(
  {
    readinessTimeoutMs: BunBuddyRuntimeNumericSchema,
    readinessIntervalMs: BunBuddyRuntimeNumericSchema,
    fetchTimeoutMs: BunBuddyRuntimeNumericSchema,
    healthContractKey: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy runtime configuration schema.
 */
export const BunBuddyRuntimeConfigSchema = Type.Object(
  {
    bunCli: Type.Optional(Type.String()),
    pythonCli: Type.Optional(Type.String()),
    pythonArgs: Type.Optional(BunBuddyRuntimeListSchema),
    pythonVenvPaths: Type.Optional(BunBuddyRuntimeListSchema),
    pythonEnvVars: Type.Optional(BunBuddyRuntimeListSchema),
    pythonCandidates: Type.Optional(BunBuddyRuntimeListSchema),
    nodeAllowlist: Type.Optional(BunBuddyRuntimeListSchema),
    images: Type.Optional(BunBuddyRuntimeImageConfigSchema),
    openapi: Type.Optional(BunBuddyRuntimeOpenApiConfigSchema),
    mode: Type.Optional(Type.String({ minLength: 1 })),
    detach: Type.Optional(BunBuddyRuntimeBooleanSchema),
    logDir: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy runtime configuration.
 */
export type BunBuddyRuntimeConfig = Static<typeof BunBuddyRuntimeConfigSchema>;
