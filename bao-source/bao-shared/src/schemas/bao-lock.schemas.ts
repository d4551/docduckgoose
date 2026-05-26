/**
 * `bao.lock` lock file schemas.
 *
 * Defines the schema for the `bao.lock` file that tracks installed package
 * state, enabling deterministic installs and integrity verification.
 *
 * @shared/schemas/bao-lock
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

// Lock file version

/**
 * Current `bao.lock` schema version.
 */
export const BAO_LOCK_VERSION: 1 = 1 as const;

/**
 * Schema for the `bao.lock` version field.
 */
function buildBaoLockVersionSchema(): ReturnType<typeof Type.Literal> {
  return Type.Literal(BAO_LOCK_VERSION, {
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
export const BaoLockEntrySchema: Type.TObject<
  {
    readonly version: Type.TString;
    readonly integrity: Type.TOptional<Type.TString>;
    readonly source: Type.TOptional<Type.TString>;
    readonly installedAt: Type.TString;
    readonly dependencies: Type.TOptional<Type.TRecord<Type.TString, Type.TString>>;
  },
  "version" | "installedAt",
  Type.InferOptionalKeys<{
    readonly version: Type.TString;
    readonly integrity: Type.TOptional<Type.TString>;
    readonly source: Type.TOptional<Type.TString>;
    readonly installedAt: Type.TString;
    readonly dependencies: Type.TOptional<Type.TRecord<Type.TString, Type.TString>>;
  }>
> = Type.Object(
  {
    version: Type.String({
      minLength: 1,
      description: "Resolved version of the installed package.",
    }),
    integrity: Type.Optional(
      Type.String({
        description: "Integrity hash (e.g. sha256 digest) for verifying the installed artifact.",
      }),
    ),
    source: Type.Optional(
      Type.String({
        description: "Origin URI or path from which the package was resolved.",
      }),
    ),
    installedAt: Type.String({
      description: "ISO 8601 timestamp of when this entry was installed or last updated.",
    }),
    dependencies: Type.Optional(
      Type.Record(Type.String(), Type.String(), {
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
function buildBaoLockSchema(): ReturnType<typeof Type.Object> {
  return Type.Object(
    {
      lockVersion: BaoLockVersionSchema,
      generatedAt: Type.String({
        description: "ISO 8601 timestamp of when the lock file was last generated.",
      }),
      packages: Type.Record(Type.String(), BaoLockEntrySchema, {
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
