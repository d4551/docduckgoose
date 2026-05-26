/**
 * Contract-first config schemas for BaoControlPlane deployments.
 *
 * These schemas validate that the *loaded* `config.json` (after template resolution)
 * contains the minimum fields required for BaoControlPlane Kubernetes-first operations.
 *
 * @shared/schemas/bao-control-plane-config-contract
 */

import { TypeExports } from "@baohaus/baobox/elysia";

const BoolLikeSchema = TypeExports.Union([TypeExports.Boolean(), TypeExports.String()], {
  description: "boolean|string",
});
const NumberLikeSchema = TypeExports.Union([TypeExports.Number(), TypeExports.String()], {
  description: "number|string",
});

/**
 * Minimal AppConfig contract for BaoControlPlane (Kubernetes-first).
 *
 * This is intentionally permissive (`additionalProperties: true`) so the config
 * can evolve without breaking contract tests, while still guaranteeing the
 * core BaoControlPlane blocks exist for runtime tooling.
 */
export const BaoControlPlaneConfigContractSchema = TypeExports.Object(
  {
    baoControlPlane: TypeExports.Object(
      {
        kubernetes: TypeExports.Object(
          {
            tokenPath: TypeExports.String({ minLength: 1 }),
            caPath: TypeExports.String({ minLength: 1 }),
            insecure: TypeExports.Optional(BoolLikeSchema),
            requestTimeoutMs: TypeExports.Optional(NumberLikeSchema),
          },
          { additionalProperties: true },
        ),
        package: TypeExports.Object(
          {
            manifestRoot: TypeExports.String(),
            valuesPath: TypeExports.String(),
            releaseName: TypeExports.String(),
            namespace: TypeExports.String(),
            ociRepository: TypeExports.Optional(TypeExports.String()),
          },
          { additionalProperties: true },
        ),
        status: TypeExports.Object(
          {
            cacheTtlMs: NumberLikeSchema,
            probeTimeoutMs: NumberLikeSchema,
          },
          { additionalProperties: true },
        ),
        runtime: TypeExports.Object(
          {
            cacheTtlMs: NumberLikeSchema,
            probeConcurrency: NumberLikeSchema,
            probeLatencyBudgetMs: NumberLikeSchema,
            rootDir: TypeExports.String({ minLength: 1 }),
          },
          { additionalProperties: true },
        ),
        images: TypeExports.Object(
          {
            backend: TypeExports.Union([
              TypeExports.Literal("oci-native"),
              TypeExports.Literal("auto"),
            ]),
            build: TypeExports.Object(
              {
                platforms: TypeExports.String({ minLength: 1 }),
                registryPrefix: TypeExports.String({ minLength: 1 }),
              },
              { additionalProperties: true },
            ),
          },
          { additionalProperties: true },
        ),
      },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);
