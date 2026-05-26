/**
 * Secrets runtime schemas.
 *
 * Defines TypeBox schemas for secret status snapshots used by container
 * runtime automation and configuration tooling.
 *
 * @shared/schemas/secrets
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Secret resolution source schema.
 */
export const SecretStatusSourceSchema: Type.TUnion<
  (
    | Type.TLiteral<"env">
    | Type.TLiteral<"file">
    | Type.TLiteral<"mount">
    | Type.TLiteral<"missing">
  )[]
> = Type.Union(
  [Type.Literal("env"), Type.Literal("file"), Type.Literal("mount"), Type.Literal("missing")],
  {},
);

/**
 * TypeScript type for secret resolution sources.
 */
export type SecretStatusSource = Static<typeof SecretStatusSourceSchema>;

/**
 * Secret policy evaluation schema.
 */
export const SecretPolicyStatusSchema: Type.TObject<
  { readonly ok: Type.TBoolean; readonly issues: Type.TArray<Type.TString> },
  "issues" | "ok",
  never
> = Type.Object(
  {
    ok: Type.Boolean(),
    issues: Type.Array(Type.String({ minLength: 1 })),
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
export const SecretStatusSchema: Type.TObject<
  {
    readonly name: Type.TString;
    readonly envVar: Type.TString;
    readonly fileName: Type.TString;
    readonly required: Type.TBoolean;
    readonly present: Type.TBoolean;
    readonly unconfigured: Type.TBoolean;
    readonly source: Type.TUnion<
      (
        | Type.TLiteral<"env">
        | Type.TLiteral<"file">
        | Type.TLiteral<"mount">
        | Type.TLiteral<"missing">
      )[]
    >;
    readonly policy: Type.TObject<
      { readonly ok: Type.TBoolean; readonly issues: Type.TArray<Type.TString> },
      "issues" | "ok",
      never
    >;
  },
  "name" | "envVar" | "fileName" | "required" | "present" | "unconfigured" | "source" | "policy",
  never
> = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    envVar: Type.String({ minLength: 1 }),
    fileName: Type.String({ minLength: 1 }),
    required: Type.Boolean(),
    present: Type.Boolean(),
    unconfigured: Type.Boolean(),
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
export const SecretsKubernetesConfigSchema: Type.TObject<
  {
    readonly namespace: Type.TString;
    readonly secretName: Type.TString;
    readonly fileName: Type.TString;
    readonly outputDir: Type.TString;
  },
  "fileName" | "namespace" | "secretName" | "outputDir",
  never
> = Type.Object(
  {
    namespace: Type.String({ minLength: 1 }),
    secretName: Type.String({ minLength: 1 }),
    fileName: Type.String({ minLength: 1 }),
    outputDir: Type.String({ minLength: 1 }),
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
export const SecretsRuntimeSummarySchema = Type.Object(
  {
    directory: Type.String({ minLength: 1 }),
    mountDir: Type.String({ minLength: 1 }),
    strict: Type.Boolean(),
    allowGeneration: Type.Boolean(),
    autoHydrate: Type.Boolean(),
    kubernetes: SecretsKubernetesConfigSchema,
    requiredCount: Type.Number({ minimum: 0 }),
    missingCount: Type.Number({ minimum: 0 }),
    unconfiguredCount: Type.Number({ minimum: 0 }),
    policyFailureCount: Type.Number({ minimum: 0 }),
    entries: Type.Array(SecretStatusSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for secrets runtime summaries.
 */
export type SecretsRuntimeSummary = Static<typeof SecretsRuntimeSummarySchema>;
