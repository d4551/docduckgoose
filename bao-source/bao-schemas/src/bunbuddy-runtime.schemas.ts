/**
 * BunBuddy runtime configuration schemas.
 *
 * Defines TypeBox schemas for bunbuddy runtime config validation.
 *
 * @shared/schemas/bunbuddy-runtime
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TNumber,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * BunBuddy runtime list value (array or CSV string).
 */
export const BunBuddyRuntimeListSchema: TUnion<(TString | TArray<TString>)[]> = TypeExports.Union(
  [TypeExports.Array(TypeExports.String({ minLength: 1 })), TypeExports.String()],
  {},
);

/**
 * BunBuddy runtime boolean config value (literal or env-resolved string).
 */
export const BunBuddyRuntimeBooleanSchema: TUnion<(TBoolean | TString)[]> = TypeExports.Union(
  [TypeExports.Boolean(), TypeExports.String({ minLength: 1 })],
  {},
);

/**
 * BunBuddy runtime numeric config value (literal or env-resolved string).
 */
export const BunBuddyRuntimeNumericSchema: TUnion<(TNumber | TString)[]> = TypeExports.Union(
  [TypeExports.Number(), TypeExports.String({ minLength: 1 })],
  {},
);

/**
 * BunBuddy runtime image overrides.
 */
export const BunBuddyRuntimeImageConfigSchema: TObject<
  { readonly bun: TOptional<TString>; readonly node: TOptional<TString> },
  never,
  InferOptionalKeys<{
    readonly bun: TOptional<TString>;
    readonly node: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    bun: TypeExports.Optional(TypeExports.String()),
    node: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy OpenAPI export runtime settings.
 */
export const BunBuddyRuntimeOpenApiConfigSchema: TObject<
  {
    readonly readinessTimeoutMs: TUnion<(TNumber | TString)[]>;
    readonly readinessIntervalMs: TUnion<(TNumber | TString)[]>;
    readonly fetchTimeoutMs: TUnion<(TNumber | TString)[]>;
    readonly healthContractKey: TString;
  },
  "readinessTimeoutMs" | "readinessIntervalMs" | "fetchTimeoutMs" | "healthContractKey",
  never
> = TypeExports.Object(
  {
    readinessTimeoutMs: BunBuddyRuntimeNumericSchema,
    readinessIntervalMs: BunBuddyRuntimeNumericSchema,
    fetchTimeoutMs: BunBuddyRuntimeNumericSchema,
    healthContractKey: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy runtime configuration schema.
 */
export const BunBuddyRuntimeConfigSchema = TypeExports.Object(
  {
    bunCli: TypeExports.Optional(TypeExports.String()),
    pythonCli: TypeExports.Optional(TypeExports.String()),
    pythonArgs: TypeExports.Optional(BunBuddyRuntimeListSchema),
    pythonVenvPaths: TypeExports.Optional(BunBuddyRuntimeListSchema),
    pythonEnvVars: TypeExports.Optional(BunBuddyRuntimeListSchema),
    pythonCandidates: TypeExports.Optional(BunBuddyRuntimeListSchema),
    nodeAllowlist: TypeExports.Optional(BunBuddyRuntimeListSchema),
    images: TypeExports.Optional(BunBuddyRuntimeImageConfigSchema),
    openapi: TypeExports.Optional(BunBuddyRuntimeOpenApiConfigSchema),
    mode: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    detach: TypeExports.Optional(BunBuddyRuntimeBooleanSchema),
    logDir: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy runtime configuration.
 */
export type BunBuddyRuntimeConfig = Static<typeof BunBuddyRuntimeConfigSchema>;
