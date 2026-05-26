/**
 * `bao.lock` lock file schemas.
 *
 * Defines the schema for the `bao.lock` file that tracks installed package
 * state, enabling deterministic installs and integrity verification.
 *
 * @shared/schemas/bao-lock
 */

import type {
  InferOptionalKeys,
  Static,
  TObject,
  TOptional,
  TRecord,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

// Lock file version

/**
 * Current `bao.lock` schema version.
 */
export const BAO_LOCK_VERSION: 1 = 1 as const;

/**
 * Schema for the `bao.lock` version field.
 */
function buildBaoLockVersionSchema(): ReturnType<typeof TypeExports.Literal> {
  return TypeExports.Literal(BAO_LOCK_VERSION, {
    description: "Schema version of the bao.lock file.",
  });
}
/** TypeBox schema for the current `bao.lock` version. */
export const BaoLockVersionSchema: ReturnType<typeof buildBaoLockVersionSchema> =
  buildBaoLockVersionSchema();

/**
 * TypeScript type for the lock file version.
 */
export type BaoLockVersion = Static<typeof BaoLockVersionSchema>;

// Lock entry (single installed package)

/**
 * Schema for a single installed package entry within the lock file.
 */
export const BaoLockEntrySchema: TObject<
  {
    readonly version: TString;
    readonly integrity: TOptional<TString>;
    readonly source: TOptional<TString>;
    readonly installedAt: TString;
    readonly dependencies: TOptional<TRecord<TString, TString>>;
  },
  "version" | "installedAt",
  InferOptionalKeys<{
    readonly version: TString;
    readonly integrity: TOptional<TString>;
    readonly source: TOptional<TString>;
    readonly installedAt: TString;
    readonly dependencies: TOptional<TRecord<TString, TString>>;
  }>
> = TypeExports.Object(
  {
    version: TypeExports.String({
      minLength: 1,
      description: "Resolved version of the installed package.",
    }),
    integrity: TypeExports.Optional(
      TypeExports.String({
        description: "Integrity hash (e.g. sha256 digest) for verifying the installed artifact.",
      }),
    ),
    source: TypeExports.Optional(
      TypeExports.String({
        description: "Origin URI or path from which the package was resolved.",
      }),
    ),
    installedAt: TypeExports.String({
      description: "ISO 8601 timestamp of when this entry was installed or last updated.",
    }),
    dependencies: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.String(), {
        description: "Resolved dependency name-to-version map for this package.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "A single resolved package entry in the bao.lock file.",
  },
);

/**
 * TypeScript type for a single lock file entry.
 */
export type BaoLockEntry = Static<typeof BaoLockEntrySchema>;

// Lock file root

/**
 * Schema for the `bao.lock` file.
 *
 * Contains the lock version, generation timestamp, and a record of all
 * installed packages keyed by package name.
 */
function buildBaoLockSchema(): ReturnType<typeof TypeExports.Object> {
  return TypeExports.Object(
    {
      lockVersion: BaoLockVersionSchema,
      generatedAt: TypeExports.String({
        description: "ISO 8601 timestamp of when the lock file was last generated.",
      }),
      packages: TypeExports.Record(TypeExports.String(), BaoLockEntrySchema, {
        description: "Map of installed package names to their resolved lock entries.",
      }),
    },
    {
      additionalProperties: false,
      description: "Root schema for the bao.lock file.",
    },
  );
}
/** TypeBox schema for the root `bao.lock` document. */
export const BaoLockSchema: ReturnType<typeof buildBaoLockSchema> = buildBaoLockSchema();

/**
 * TypeScript type for the `bao.lock` file.
 */
export type BaoLock = Static<typeof BaoLockSchema>;
