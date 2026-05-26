/**
 * `.bao` archive source-resolution contract.
 *
 * Shared request, policy, source, and result shapes for resolving archive bytes
 * from local paths, remote URLs, or `.bao` registry references.
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { BAO_ARCHIVE_DIGEST_PATTERN } from "./core.schemas.ts";
import type { BaoManifest } from "./manifest.schemas.ts";

export const BaoArchiveSourceSchema = TypeExports.Union(
  [
    TypeExports.Object(
      {
        kind: TypeExports.Literal("registry"),
        value: TypeExports.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    TypeExports.Object(
      {
        kind: TypeExports.Literal("path"),
        value: TypeExports.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    TypeExports.Object(
      {
        kind: TypeExports.Literal("url"),
        value: TypeExports.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    TypeExports.Object(
      {
        kind: TypeExports.Literal("cas"),
        value: TypeExports.String({ pattern: BAO_ARCHIVE_DIGEST_PATTERN }),
      },
      { additionalProperties: false },
    ),
  ],
  { description: "Resolved `.bao` archive source identity." },
);

export type BaoArchiveSource = Static<typeof BaoArchiveSourceSchema>;

export const BaoArchiveSourcePolicySchema = TypeExports.Object(
  {
    allowRemoteUrls: TypeExports.Boolean(),
    allowedLocalRoots: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    allowedRemoteHosts: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    requireBaoExtensionForLocalPath: TypeExports.Boolean(),
    requireBaoExtensionForRemoteUrl: TypeExports.Boolean(),
    registryDefaultNamespace: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  {
    additionalProperties: false,
    description: "Security policy for `.bao` archive source resolution.",
  },
);

export interface BaoArchiveSourcePolicy {
  readonly allowRemoteUrls: boolean;
  readonly allowedLocalRoots: readonly string[];
  readonly allowedRemoteHosts: readonly string[];
  readonly requireBaoExtensionForLocalPath: boolean;
  readonly requireBaoExtensionForRemoteUrl: boolean;
  readonly registryDefaultNamespace?: string;
}

export const BaoArchiveSourceRequestSchema = TypeExports.Object(
  {
    archivePath: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    archiveUrl: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    archiveDigest: TypeExports.Optional(
      TypeExports.String({ pattern: BAO_ARCHIVE_DIGEST_PATTERN }),
    ),
    registryNamespace: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    registryName: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    registryVersion: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  {
    additionalProperties: false,
    description: "Source request for resolving a `.bao` archive.",
  },
);

export interface BaoArchiveSourceRequest {
  readonly archivePath?: string | undefined;
  readonly archiveUrl?: string | undefined;
  readonly archiveDigest?: string | undefined;
  readonly registryNamespace?: string | undefined;
  readonly registryName?: string | undefined;
  readonly registryVersion?: string | undefined;
}

export interface ResolveBaoArchiveFailure {
  readonly ok: false;
  readonly code: string;
  readonly error: string;
}

export type ResolveBaoArchiveResult =
  | {
      readonly ok: true;
      readonly source: BaoArchiveSource;
      readonly archiveBytes: Uint8Array;
      readonly manifest: BaoManifest;
    }
  | ResolveBaoArchiveFailure;
