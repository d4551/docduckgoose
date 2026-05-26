/**
 * `.bao` archive manifest schemas.
 *
 * Canonical archive manifest metadata, dependency, and guard definitions.
 *
 * @shared/schemas/bao-install/manifest
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value";
import { BaoInstallChecksumSchema, BaoInstallSignatureSchema } from "./artifact.schemas.ts";
import { BAO_MANIFEST_SCHEMA_VERSION } from "./core.schemas.ts";
import {
  type BaoInstallTargetBase,
  BaoInstallTargetBaseSchema,
  BaoTargetHealthcheckSchema,
} from "./targets.schemas.ts";

const BAO_JSON_SCHEMA_KEY = "$schema" as const;

/** Metadata schema for the top-level `.bao` archive manifest descriptor. */
export const BaoManifestMetadataSchema = Type.Object(
  {
    name: Type.String({ minLength: 1, description: "Human-readable manifest name." }),
    version: Type.String({
      minLength: 1,
      description: "Manifest version string (semver recommended).",
    }),
    description: Type.Optional(
      Type.String({ minLength: 1, description: "Optional description to show in install UX." }),
    ),
    source: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Source identifier for signed or remote manifests.",
      }),
    ),
    minSchemaVersion: Type.Optional(
      Type.Integer({
        minimum: BAO_MANIFEST_SCHEMA_VERSION,
        description:
          "Minimum schema version required to fully process this manifest. Tooling should reject manifests whose minSchemaVersion exceeds the tool's supported version.",
      }),
    ),
    checksum: Type.Optional(BaoInstallChecksumSchema),
    signature: Type.Optional(BaoInstallSignatureSchema),
    environment: Type.Optional(
      Type.Array(
        Type.Object({
          name: Type.String({ minLength: 1, description: "Environment variable name." }),
          required: Type.Boolean({ default: false, description: "Whether the var must be set." }),
          sensitive: Type.Boolean({
            default: false,
            description: "Whether the value contains secrets (redacted in logs).",
          }),
          description: Type.Optional(
            Type.String({ description: "Human-readable description of the variable." }),
          ),
        }),
        { description: "Environment variables consumed by this package." },
      ),
    ),
    healthcheck: Type.Optional(BaoTargetHealthcheckSchema),
    lifecycle: Type.Optional(
      Type.Object(
        {
          hotInstallable: Type.Boolean({
            default: false,
            description: "Whether this module can be installed without a server restart.",
          }),
          restartRequired: Type.Boolean({
            default: false,
            description: "Whether installation requires a full server restart.",
          }),
        },
        { description: "Lifecycle behaviour hints for the installer." },
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
export const BaoManifestDependencySchema: Type.TObject<
  {
    readonly name: Type.TString;
    readonly version: Type.TOptional<Type.TString>;
    readonly required: Type.TBoolean;
  },
  "required" | "name",
  "version"
> = Type.Object(
  {
    name: Type.String({ minLength: 1, description: "Package or module name of the dependency." }),
    version: Type.Optional(
      Type.String({ description: "Semver range or exact version constraint." }),
    ),
    required: Type.Boolean({
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
export const BaoArchiveManifestSchema = Type.Object(
  {
    [BAO_JSON_SCHEMA_KEY]: Type.Optional(
      Type.String({
        description: "JSON Schema URL for IDE validation; not used at runtime.",
      }),
    ),
    schemaVersion: Type.Literal(BAO_MANIFEST_SCHEMA_VERSION),
    metadata: BaoManifestMetadataSchema,
    description: Type.Optional(
      Type.String({ minLength: 1, description: "Optional manifest-level description." }),
    ),
    dependencies: Type.Optional(
      Type.Array(BaoManifestDependencySchema, {
        description: "Other `.bao` packages this manifest depends on.",
      }),
    ),
    targets: Type.Array(BaoInstallTargetBaseSchema, {
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
 */
export interface BaoArchiveManifest {
  [BAO_JSON_SCHEMA_KEY]?: string;
  schemaVersion: typeof BAO_MANIFEST_SCHEMA_VERSION;
  metadata: BaoManifestMetadata;
  description?: string;
  dependencies?: BaoManifestDependency[];
  targets: BaoInstallTargetBase[];
}

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
