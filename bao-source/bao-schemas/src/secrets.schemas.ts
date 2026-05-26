/**
 * Secrets runtime schemas.
 *
 * Defines TypeBox schemas for secret status snapshots used by container
 * runtime automation and configuration tooling.
 *
 * @shared/schemas/secrets
 */

import type {
  Static,
  TArray,
  TBoolean,
  TLiteral,
  TObject,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Secret resolution source schema.
 */
export const SecretStatusSourceSchema: TUnion<
  (TLiteral<"env"> | TLiteral<"file"> | TLiteral<"mount"> | TLiteral<"missing">)[]
> = TypeExports.Union(
  [
    TypeExports.Literal("env"),
    TypeExports.Literal("file"),
    TypeExports.Literal("mount"),
    TypeExports.Literal("missing"),
  ],
  {},
);

/**
 * TypeScript type for secret resolution sources.
 */
export type SecretStatusSource = Static<typeof SecretStatusSourceSchema>;

/**
 * Secret policy evaluation schema.
 */
export const SecretPolicyStatusSchema: TObject<
  { readonly ok: TBoolean; readonly issues: TArray<TString> },
  "issues" | "ok",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    issues: TypeExports.Array(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for secret policy evaluation.
 */
export type SecretPolicyStatus = Static<typeof SecretPolicyStatusSchema>;

/**
 * Secret status entry schema.
 */
export const SecretStatusSchema: TObject<
  {
    readonly name: TString;
    readonly envVar: TString;
    readonly fileName: TString;
    readonly required: TBoolean;
    readonly present: TBoolean;
    readonly unconfigured: TBoolean;
    readonly source: TUnion<
      (TLiteral<"env"> | TLiteral<"file"> | TLiteral<"mount"> | TLiteral<"missing">)[]
    >;
    readonly policy: TObject<
      { readonly ok: TBoolean; readonly issues: TArray<TString> },
      "issues" | "ok",
      never
    >;
  },
  "name" | "envVar" | "fileName" | "required" | "present" | "unconfigured" | "source" | "policy",
  never
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    envVar: TypeExports.String({ minLength: 1 }),
    fileName: TypeExports.String({ minLength: 1 }),
    required: TypeExports.Boolean(),
    present: TypeExports.Boolean(),
    unconfigured: TypeExports.Boolean(),
    source: SecretStatusSourceSchema,
    policy: SecretPolicyStatusSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for secret status entries.
 */
export type SecretStatus = Static<typeof SecretStatusSchema>;

/**
 * Secrets Kubernetes configuration schema.
 */
export const SecretsKubernetesConfigSchema: TObject<
  {
    readonly namespace: TString;
    readonly secretName: TString;
    readonly fileName: TString;
    readonly outputDir: TString;
  },
  "fileName" | "namespace" | "secretName" | "outputDir",
  never
> = TypeExports.Object(
  {
    namespace: TypeExports.String({ minLength: 1 }),
    secretName: TypeExports.String({ minLength: 1 }),
    fileName: TypeExports.String({ minLength: 1 }),
    outputDir: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for secrets Kubernetes config.
 */
export type SecretsKubernetesConfig = Static<typeof SecretsKubernetesConfigSchema>;

/**
 * Secrets runtime summary schema.
 */
export const SecretsRuntimeSummarySchema = TypeExports.Object(
  {
    directory: TypeExports.String({ minLength: 1 }),
    mountDir: TypeExports.String({ minLength: 1 }),
    strict: TypeExports.Boolean(),
    allowGeneration: TypeExports.Boolean(),
    autoHydrate: TypeExports.Boolean(),
    kubernetes: SecretsKubernetesConfigSchema,
    requiredCount: TypeExports.Number({ minimum: 0 }),
    missingCount: TypeExports.Number({ minimum: 0 }),
    unconfiguredCount: TypeExports.Number({ minimum: 0 }),
    policyFailureCount: TypeExports.Number({ minimum: 0 }),
    entries: TypeExports.Array(SecretStatusSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for secrets runtime summaries.
 */
export type SecretsRuntimeSummary = Static<typeof SecretsRuntimeSummarySchema>;
