/**
 * `.bao` archive manifest schemas.
 *
 * Canonical archive manifest metadata, dependency, and guard definitions.
 *
 * @shared/schemas/bao-install/manifest
 */

import type { Static, TBoolean, TObject, TOptional, TString } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value/check";
import { BaoInstallChecksumSchema, BaoInstallSignatureSchema } from "./artifact.schemas.ts";
import { BAO_MANIFEST_SCHEMA_VERSION } from "./core.schemas.ts";
import {
  type BaoInstallTargetBase,
  BaoInstallTargetBaseSchema,
  BaoTargetHealthcheckSchema,
} from "./targets.schemas.ts";

const BAO_JSON_SCHEMA_KEY = "$schema" as const;

/** Metadata schema for the top-level `.bao` archive manifest descriptor. */
export const BaoManifestMetadataSchema = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1, description: "Human-readable manifest name." }),
    version: TypeExports.String({
      minLength: 1,
      description: "Manifest version string (semver recommended).",
    }),
    description: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Optional description to show in install UX.",
      }),
    ),
    source: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Source identifier for signed or remote manifests.",
      }),
    ),
    minSchemaVersion: TypeExports.Optional(
      TypeExports.Integer({
        minimum: BAO_MANIFEST_SCHEMA_VERSION,
        description:
          "Minimum schema version required to fully process this manifest. Tooling should reject manifests whose minSchemaVersion exceeds the tool's supported version.",
      }),
    ),
    checksum: TypeExports.Optional(BaoInstallChecksumSchema),
    signature: TypeExports.Optional(BaoInstallSignatureSchema),
    environment: TypeExports.Optional(
      TypeExports.Array(
        TypeExports.Object({
          name: TypeExports.String({ minLength: 1, description: "Environment variable name." }),
          required: TypeExports.Boolean({
            default: false,
            description: "Whether the var must be set.",
          }),
          sensitive: TypeExports.Boolean({
            default: false,
            description: "Whether the value contains secrets (redacted in logs).",
          }),
          description: TypeExports.Optional(
            TypeExports.String({ description: "Human-readable description of the variable." }),
          ),
        }),
        { description: "Environment variables consumed by this package." },
      ),
    ),
    healthcheck: TypeExports.Optional(BaoTargetHealthcheckSchema),
    lifecycle: TypeExports.Optional(
      TypeExports.Object(
        {
          hotInstallable: TypeExports.Boolean({
            default: false,
            description: "Whether this module can be installed without a server restart.",
          }),
          restartRequired: TypeExports.Boolean({
            default: false,
            description: "Whether installation requires a full server restart.",
          }),
        },
        { description: "Lifecycle behaviour hints for the installer." },
      ),
    ),
    sourceRepository: TypeExports.Optional(
      TypeExports.Union(
        [
          TypeExports.Object(
            {
              kind: TypeExports.Literal("forge"),
              namespace: TypeExports.String({
                minLength: 1,
                description: "Forge namespace (owner) slug.",
              }),
              slug: TypeExports.String({
                minLength: 1,
                description: "Forge repository slug.",
              }),
            },
            { additionalProperties: false },
          ),
        ],
        {
          description:
            "Pointer to the canonical source repository for this manifest. `kind` is a discriminated literal so future repository hosts can be added without breaking consumers. Renderers in registry + forge use this to compose cross-app deep links via the canonical URL helpers in @baohaus/bao-config/ecosystem-urls.",
        },
      ),
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for `.bao` manifest metadata.
 */
export type BaoManifestMetadata = Static<typeof BaoManifestMetadataSchema>;

/**
 * Schema for a single `.bao` manifest dependency declaration.
 *
 * Dependencies express inter-package relationships so the installer can
 * resolve and order installs correctly.
 */
export const BaoManifestDependencySchema: TObject<
  {
    readonly name: TString;
    readonly version: TOptional<TString>;
    readonly required: TBoolean;
  },
  "required" | "name",
  "version"
> = TypeExports.Object(
  {
    name: TypeExports.String({
      minLength: 1,
      description: "Package or module name of the dependency.",
    }),
    version: TypeExports.Optional(
      TypeExports.String({ description: "Semver range or exact version constraint." }),
    ),
    required: TypeExports.Boolean({
      default: true,
      description: "Whether this dependency must be present for install to succeed.",
    }),
  },
  {
    additionalProperties: false,
    description: "A single dependency declaration within a `.bao` manifest.",
  },
);

/**
 * TypeScript type for a single `.bao` manifest dependency.
 */
export type BaoManifestDependency = Static<typeof BaoManifestDependencySchema>;

/**
 * Canonical `.bao` archive manifest schema.
 */
export const BaoArchiveManifestSchema = TypeExports.Object(
  {
    [BAO_JSON_SCHEMA_KEY]: TypeExports.Optional(
      TypeExports.String({
        description: "JSON Schema URL for IDE validation; not used at runtime.",
      }),
    ),
    schemaVersion: TypeExports.Literal(BAO_MANIFEST_SCHEMA_VERSION),
    metadata: BaoManifestMetadataSchema,
    description: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Optional manifest-level description." }),
    ),
    dependencies: TypeExports.Optional(
      TypeExports.Array(BaoManifestDependencySchema, {
        description: "Other `.bao` packages this manifest depends on.",
      }),
    ),
    targets: TypeExports.Array(BaoInstallTargetBaseSchema, {
      minItems: 1,
      description: "Execution targets declared by this `.bao` manifest.",
    }),
  },
  {
    additionalProperties: false,
    description: "Schema for canonical `.bao` archive manifests.",
  },
);

/**
 * Canonical `.bao` archive manifest type.
 *
 * Derived from `BaoArchiveManifestSchema` for the structural envelope, then
 * the `targets` field is replaced with the open `BaoInstallTargetBase[]` so
 * extension adapters can attach kind-specific properties (matching the
 * runtime `additionalProperties: true` on `BaoInstallTargetBaseSchema`).
 * Single source of truth for manifest fields; no duplicated contract.
 */
export type BaoArchiveManifest = Omit<Static<typeof BaoArchiveManifestSchema>, "targets"> & {
  targets: BaoInstallTargetBase[];
};

/**
 * Canonical `.bao` manifest schema.
 */
export const BaoManifestSchema = BaoArchiveManifestSchema;

/**
 * Canonical `.bao` manifest type.
 */
export type BaoManifest = BaoArchiveManifest;

/**
 * Determine whether a runtime value satisfies the canonical `.bao` manifest shape.
 *
 * @param value - Runtime candidate to validate.
 * @returns True when the value conforms to the sole supported manifest schema.
 */
export function isBaoManifest(value: unknown): value is BaoManifest {
  return Check(BaoManifestSchema, value);
}
