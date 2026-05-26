/**
 * `.bao` install artifact schemas.
 *
 * Shared checksum, signature, payload, and Bao package inventory schemas.
 *
 * @shared/schemas/bao-install/artifact
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { BaoArchivePlatformIdSchema, type BaoArchivePlatformIdValue } from "./core.schemas.ts";

/** Checksum metadata schema used to verify installed `.bao` artifacts. */
export const BaoInstallChecksumSchema: TObject<
  {
    readonly algorithm: TUnion<(TLiteral<"sha256"> | TLiteral<"sha1">)[]>;
    readonly value: TString;
  },
  "algorithm" | "value",
  never
> = TypeExports.Object(
  {
    algorithm: TypeExports.Union([TypeExports.Literal("sha256"), TypeExports.Literal("sha1")], {
      description: "Supported checksum algorithm.",
    }),
    value: TypeExports.String({
      minLength: 8,
      description: "Checksum digest for deterministic verification.",
    }),
  },
  {
    additionalProperties: false,
    description: "Checksum metadata for installed artifacts.",
  },
);

/**
 * Generic checksum metadata for deterministic dependency validation.
 */
export type BaoInstallChecksum = Static<typeof BaoInstallChecksumSchema>;

/**
 * Generic signature metadata for deterministic verification and trust checks.
 */
export const BaoInstallSignatureSchema: TObject<
  {
    readonly algorithm: TUnion<(TLiteral<"ed25519"> | TLiteral<"rsa"> | TLiteral<"cosign">)[]>;
    readonly value: TString;
    readonly keyId: TOptional<TString>;
    readonly transparencyLog: TOptional<TString>;
  },
  "algorithm" | "value",
  "keyId" | "transparencyLog"
> = TypeExports.Object(
  {
    algorithm: TypeExports.Union(
      [TypeExports.Literal("ed25519"), TypeExports.Literal("rsa"), TypeExports.Literal("cosign")],
      {
        description: "Signature algorithm.",
      },
    ),
    value: TypeExports.String({
      minLength: 16,
      description: "Raw signature or base-encoded signature payload.",
    }),
    keyId: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Optional key identifier for signature validation.",
      }),
    ),
    transparencyLog: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Transparency log inclusion proof or entry URL for signed manifests.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "Signature metadata for manifest/target verification.",
  },
);

/**
 * Generic signature metadata for deterministic verification and trust checks.
 */
export type BaoInstallSignature = Static<typeof BaoInstallSignatureSchema>;

/**
 * `.bao` dependency declaration.
 */
export const BaoInstallDependencySchema: TObject<
  {
    readonly target: TString;
    readonly required: TOptional<TBoolean>;
    readonly minVersion: TOptional<TString>;
  },
  "target",
  InferOptionalKeys<{
    readonly target: TString;
    readonly required: TOptional<TBoolean>;
    readonly minVersion: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    target: TypeExports.String({
      minLength: 1,
      description: "Target identifier this dependency points to.",
    }),
    required: TypeExports.Optional(
      TypeExports.Boolean({
        default: true,
        description: "Whether this dependency blocks installation when missing.",
      }),
    ),
    minVersion: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Optional minimum semantic version constraint.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "Target-level dependency declaration used for install graph ordering.",
  },
);

/**
 * TypeScript type for `.bao` dependency declaration.
 */
export type BaoInstallDependency = Static<typeof BaoInstallDependencySchema>;

/**
 * Shared ordering hints used by all target types.
 */
export const BaoInstallTargetOrderingSchema: TObject<
  {
    readonly before: TOptional<TArray<TString>>;
    readonly after: TOptional<TArray<TString>>;
  },
  never,
  InferOptionalKeys<{
    readonly before: TOptional<TArray<TString>>;
    readonly after: TOptional<TArray<TString>>;
  }>
> = TypeExports.Object(
  {
    before: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Targets that should run before this target.",
      }),
    ),
    after: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Targets that should run after this target.",
      }),
    ),
  },
  {},
);

/**
 * Archive payload file inventory entry.
 */
export const BaoArchivePayloadFileSchema: TObject<
  {
    readonly path: TString;
    readonly sizeBytes: TInteger;
    readonly checksum: TOptional<
      TObject<
        {
          readonly algorithm: TUnion<(TLiteral<"sha256"> | TLiteral<"sha1">)[]>;
          readonly value: TString;
        },
        "algorithm" | "value",
        never
      >
    >;
    readonly sha256: TOptional<TString>;
    readonly executable: TOptional<TBoolean>;
  },
  "path" | "sizeBytes",
  InferOptionalKeys<{
    readonly path: TString;
    readonly sizeBytes: TInteger;
    readonly checksum: TOptional<
      TObject<
        {
          readonly algorithm: TUnion<(TLiteral<"sha256"> | TLiteral<"sha1">)[]>;
          readonly value: TString;
        },
        "algorithm" | "value",
        never
      >
    >;
    readonly sha256: TOptional<TString>;
    readonly executable: TOptional<TBoolean>;
  }>
> = TypeExports.Object(
  {
    path: TypeExports.String({
      minLength: 1,
      description: "Relative file path beneath the payload root.",
    }),
    sizeBytes: TypeExports.Integer({
      minimum: 0,
      description: "Serialized file size in bytes.",
    }),
    checksum: TypeExports.Optional(BaoInstallChecksumSchema),
    sha256: TypeExports.Optional(
      TypeExports.String({
        minLength: 64,
        maxLength: 64,
        pattern: "^[a-f0-9]{64}$",
        description: "Canonical SHA-256 hex digest for per-file payload validation.",
      }),
    ),
    executable: TypeExports.Optional(
      TypeExports.Boolean({
        description: "Whether the file should be materialized with executable semantics.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "Canonical file inventory entry for `.bao` archive payloads.",
  },
);

/**
 * Shared payload metadata stored on Bao package targets.
 */
export const BaoArchiveSharedPayloadSchema = TypeExports.Object(
  {
    files: TypeExports.Array(BaoArchivePayloadFileSchema, {
      description: "Shared payload files materialized for every platform.",
    }),
    entrypoints: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Shared Bun entrypoint files exposed by the package bundle.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "Shared `.bao` payload metadata.",
  },
);

/**
 * Shared payload metadata stored on Bao package targets.
 */
export interface BaoArchivePayloadFile {
  path: string;
  sizeBytes: number;
  checksum?: BaoInstallChecksum;
  sha256?: string;
  executable?: boolean;
}

/**
 * Shared payload metadata stored on Bao package targets.
 */
export interface BaoArchiveSharedPayload {
  files: BaoArchivePayloadFile[];
  entrypoints?: string[];
}

/**
 * Platform-specific payload metadata stored on Bao package targets.
 */
export const BaoArchivePlatformPayloadSchema = TypeExports.Object(
  {
    platformId: BaoArchivePlatformIdSchema,
    files: TypeExports.Array(BaoArchivePayloadFileSchema, {
      description: "Platform-specific files materialized for the matching platform slice.",
    }),
  },
  {
    additionalProperties: false,
    description: "Platform-specific Bao payload metadata.",
  },
);

/**
 * Platform-specific payload metadata stored on Bao package targets.
 */
export interface BaoArchivePlatformPayload {
  platformId: BaoArchivePlatformIdValue;
  files: BaoArchivePayloadFile[];
}

/**
 * Surface classification for a Bao package conversion.
 */
export const BaoPackageSurfaceSchema: TObject<
  {
    readonly esm: TBoolean;
    readonly cjs: TBoolean;
    readonly bin: TBoolean;
    readonly nativeAddon: TBoolean;
    readonly postinstall: TBoolean;
  },
  "esm" | "cjs" | "bin" | "nativeAddon" | "postinstall",
  never
> = TypeExports.Object(
  {
    esm: TypeExports.Boolean(),
    cjs: TypeExports.Boolean(),
    bin: TypeExports.Boolean(),
    nativeAddon: TypeExports.Boolean(),
    postinstall: TypeExports.Boolean(),
  },
  {
    additionalProperties: false,
    description: "Classified runtime surfaces for a converted Bao package.",
  },
);

/**
 * Surface classification for a Bao package conversion.
 */
export interface BaoPackageSurface {
  esm: boolean;
  cjs: boolean;
  bin: boolean;
  nativeAddon: boolean;
  postinstall: boolean;
}

/**
 * Exact dependency lock entry for a converted Bao package graph.
 */
export const BaoPackageDependencyLockSchema: TObject<
  {
    readonly name: TString;
    readonly version: TString;
    readonly dependencies: TOptional<TArray<TString>>;
  },
  "name" | "version",
  "dependencies"
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1, description: "Resolved package name." }),
    version: TypeExports.String({ minLength: 1, description: "Resolved exact package version." }),
    dependencies: TypeExports.Optional(
      TypeExports.Array(TypeExports.String({ minLength: 1 }), {
        description: "Resolved transitive dependency package names for this node.",
      }),
    ),
  },
  {
    additionalProperties: false,
    description: "Exact dependency lock entry for Bao runtime graphs.",
  },
);

/**
 * Exact dependency lock entry for a converted Bao package graph.
 */
export interface BaoPackageDependencyLock {
  name: string;
  version: string;
  dependencies?: string[];
}
