/**
 * `.bao` install artifact schemas.
 *
 * Shared checksum, signature, payload, and Bao package inventory schemas.
 *
 * @shared/schemas/bao-install/artifact
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { BaoArchivePlatformIdSchema, type BaoArchivePlatformIdValue } from "./core.schemas.ts";

/** Checksum metadata schema used to verify installed `.bao` artifacts. */
export const BaoInstallChecksumSchema: Type.TObject<
  {
    readonly algorithm: Type.TUnion<(Type.TLiteral<"sha256"> | Type.TLiteral<"sha1">)[]>;
    readonly value: Type.TString;
  },
  "algorithm" | "value",
  never
> = Type.Object(
  {
    algorithm: Type.Union([Type.Literal("sha256"), Type.Literal("sha1")], {
      description: "Supported checksum algorithm.",
    }),
    value: Type.String({
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
export const BaoInstallSignatureSchema: Type.TObject<
  {
    readonly algorithm: Type.TUnion<(Type.TLiteral<"ed25519"> | Type.TLiteral<"cosign">)[]>;
    readonly value: Type.TString;
    readonly keyId: Type.TOptional<Type.TString>;
    readonly transparencyLog: Type.TOptional<Type.TString>;
  },
  "algorithm" | "value",
  "keyId" | "transparencyLog"
> = Type.Object(
  {
    algorithm: Type.Union([Type.Literal("ed25519"), Type.Literal("cosign")], {
      description: "Signature algorithm.",
    }),
    value: Type.String({
      minLength: 16,
      description: "Raw signature or base-encoded signature payload.",
    }),
    keyId: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Optional key identifier for signature validation.",
      }),
    ),
    transparencyLog: Type.Optional(
      Type.String({
        minLength: 1,
        description: "Optional transparency log inclusion proof or checkpoint reference.",
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
export const BaoInstallDependencySchema: Type.TObject<
  {
    readonly target: Type.TString;
    readonly required: Type.TOptional<Type.TBoolean>;
    readonly minVersion: Type.TOptional<Type.TString>;
  },
  "target",
  Type.InferOptionalKeys<{
    readonly target: Type.TString;
    readonly required: Type.TOptional<Type.TBoolean>;
    readonly minVersion: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    target: Type.String({
      minLength: 1,
      description: "Target identifier this dependency points to.",
    }),
    required: Type.Optional(
      Type.Boolean({
        default: true,
        description: "Whether this dependency blocks installation when missing.",
      }),
    ),
    minVersion: Type.Optional(
      Type.String({ minLength: 1, description: "Optional minimum semantic version constraint." }),
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
export const BaoInstallTargetOrderingSchema: Type.TObject<
  {
    readonly before: Type.TOptional<Type.TArray<Type.TString>>;
    readonly after: Type.TOptional<Type.TArray<Type.TString>>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly before: Type.TOptional<Type.TArray<Type.TString>>;
    readonly after: Type.TOptional<Type.TArray<Type.TString>>;
  }>
> = Type.Object(
  {
    before: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        description: "Targets that should run before this target.",
      }),
    ),
    after: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
        description: "Targets that should run after this target.",
      }),
    ),
  },
  {},
);

/**
 * Archive payload file inventory entry.
 */
export const BaoArchivePayloadFileSchema: Type.TObject<
  {
    readonly path: Type.TString;
    readonly sizeBytes: Type.TInteger;
    readonly checksum: Type.TOptional<
      Type.TObject<
        {
          readonly algorithm: Type.TUnion<(Type.TLiteral<"sha256"> | Type.TLiteral<"sha1">)[]>;
          readonly value: Type.TString;
        },
        "algorithm" | "value",
        never
      >
    >;
    readonly sha256: Type.TOptional<Type.TString>;
    readonly executable: Type.TOptional<Type.TBoolean>;
  },
  "path" | "sizeBytes",
  Type.InferOptionalKeys<{
    readonly path: Type.TString;
    readonly sizeBytes: Type.TInteger;
    readonly checksum: Type.TOptional<
      Type.TObject<
        {
          readonly algorithm: Type.TUnion<(Type.TLiteral<"sha256"> | Type.TLiteral<"sha1">)[]>;
          readonly value: Type.TString;
        },
        "algorithm" | "value",
        never
      >
    >;
    readonly sha256: Type.TOptional<Type.TString>;
    readonly executable: Type.TOptional<Type.TBoolean>;
  }>
> = Type.Object(
  {
    path: Type.String({
      minLength: 1,
      description: "Relative file path beneath the payload root.",
    }),
    sizeBytes: Type.Integer({
      minimum: 0,
      description: "Serialized file size in bytes.",
    }),
    checksum: Type.Optional(BaoInstallChecksumSchema),
    sha256: Type.Optional(
      Type.String({
        minLength: 64,
        maxLength: 64,
        pattern: "^[a-f0-9]{64}$",
        description: "Canonical SHA-256 hex digest for per-file payload validation.",
      }),
    ),
    executable: Type.Optional(
      Type.Boolean({
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
export const BaoArchiveSharedPayloadSchema = Type.Object(
  {
    files: Type.Array(BaoArchivePayloadFileSchema, {
      description: "Shared payload files materialized for every platform.",
    }),
    entrypoints: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
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
export const BaoArchivePlatformPayloadSchema = Type.Object(
  {
    platformId: BaoArchivePlatformIdSchema,
    files: Type.Array(BaoArchivePayloadFileSchema, {
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
export const BaoPackageSurfaceSchema: Type.TObject<
  {
    readonly esm: Type.TBoolean;
    readonly cjs: Type.TBoolean;
    readonly bin: Type.TBoolean;
    readonly nativeAddon: Type.TBoolean;
    readonly postinstall: Type.TBoolean;
  },
  "esm" | "cjs" | "bin" | "nativeAddon" | "postinstall",
  never
> = Type.Object(
  {
    esm: Type.Boolean(),
    cjs: Type.Boolean(),
    bin: Type.Boolean(),
    nativeAddon: Type.Boolean(),
    postinstall: Type.Boolean(),
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
export const BaoPackageDependencyLockSchema: Type.TObject<
  {
    readonly name: Type.TString;
    readonly version: Type.TString;
    readonly dependencies: Type.TOptional<Type.TArray<Type.TString>>;
  },
  "name" | "version",
  "dependencies"
> = Type.Object(
  {
    name: Type.String({ minLength: 1, description: "Resolved package name." }),
    version: Type.String({ minLength: 1, description: "Resolved exact package version." }),
    dependencies: Type.Optional(
      Type.Array(Type.String({ minLength: 1 }), {
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
