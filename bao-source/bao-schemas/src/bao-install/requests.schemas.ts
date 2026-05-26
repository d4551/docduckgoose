/**
 * `.bao` install request schemas.
 *
 * Request bodies for install and validate flows across local archives, remote
 * archives, and registry references.
 *
 * @shared/schemas/bao-install/requests
 */

import type { Static, TObject, TOptional, TString, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import {
  BAO_ARCHIVE_DIGEST_PATTERN,
  BAO_MANIFEST_PATH_PATTERN,
  BAO_MANIFEST_URL_PATTERN,
} from "./core.schemas.ts";

/**
 * Supported request source shapes for installing `.bao`.
 */
export const BaoInstallRequestBodySchema = TypeExports.Union(
  [
    TypeExports.Object(
      {
        archivePath: TypeExports.String({
          minLength: 1,
          pattern: BAO_MANIFEST_PATH_PATTERN,
          description: "Local path to a `.bao` archive file.",
        }),
      },
      { additionalProperties: false, description: "Install from a local `.bao` archive path." },
    ),
    TypeExports.Object(
      {
        archiveUrl: TypeExports.String({
          format: "uri",
          pattern: BAO_MANIFEST_URL_PATTERN,
          description: "Remote URL for a `.bao` archive.",
        }),
      },
      { additionalProperties: false, description: "Install from a remote `.bao` archive URL." },
    ),
    TypeExports.Object(
      {
        registryNamespace: TypeExports.Optional(
          TypeExports.String({
            minLength: 1,
            description: "Registry namespace containing the .bao package.",
          }),
        ),
        registryName: TypeExports.String({
          minLength: 1,
          description: "Package name in the .bao registry.",
        }),
        registryVersion: TypeExports.Optional(
          TypeExports.String({ minLength: 1, description: "Version constraint." }),
        ),
      },
      { additionalProperties: false, description: "Install from .bao registry by package name." },
    ),
    TypeExports.Object(
      {
        archiveDigest: TypeExports.String({
          pattern: BAO_ARCHIVE_DIGEST_PATTERN,
          description:
            "Content-addressed sha256 digest of the `.bao` archive. Resolved from blobao CAS.",
        }),
      },
      {
        additionalProperties: false,
        description: "Install from blobao content-addressed storage by sha256 digest.",
      },
    ),
  ],
  {
    description: "Accepted `.bao` install request payloads.",
  },
);

/**
 * TypeScript type for the install request payload.
 */
export type BaoInstallRequestBody = Static<typeof BaoInstallRequestBodySchema>;

/**
 * Supported request source shapes for validating `.bao` archives.
 */
export const BaoInstallValidateRequestBodySchema: TUnion<
  (
    | TObject<{ readonly archivePath: TString }, "archivePath", never>
    | TObject<{ readonly archiveUrl: TString }, "archiveUrl", never>
    | TObject<
        {
          readonly registryNamespace: TOptional<TString>;
          readonly registryName: TString;
          readonly registryVersion: TOptional<TString>;
        },
        "registryName",
        "registryNamespace" | "registryVersion"
      >
    | TObject<{ readonly archiveDigest: TString }, "archiveDigest", never>
  )[]
> = TypeExports.Union(
  [
    TypeExports.Object(
      {
        archivePath: TypeExports.String({
          minLength: 1,
          pattern: BAO_MANIFEST_PATH_PATTERN,
          description: "Local path to a `.bao` archive file.",
        }),
      },
      { additionalProperties: false, description: "Validate a local `.bao` archive path." },
    ),
    TypeExports.Object(
      {
        archiveUrl: TypeExports.String({
          format: "uri",
          pattern: BAO_MANIFEST_URL_PATTERN,
          description: "Remote URL for a `.bao` archive.",
        }),
      },
      { additionalProperties: false, description: "Validate a remote `.bao` archive URL." },
    ),
    TypeExports.Object(
      {
        registryNamespace: TypeExports.Optional(
          TypeExports.String({
            minLength: 1,
            description: "Registry namespace containing the .bao package.",
          }),
        ),
        registryName: TypeExports.String({
          minLength: 1,
          description: "Package name in the .bao registry.",
        }),
        registryVersion: TypeExports.Optional(
          TypeExports.String({ minLength: 1, description: "Version constraint." }),
        ),
      },
      {
        additionalProperties: false,
        description: "Validate a .bao registry package by name.",
      },
    ),
    TypeExports.Object(
      {
        archiveDigest: TypeExports.String({
          pattern: BAO_ARCHIVE_DIGEST_PATTERN,
          description:
            "Content-addressed sha256 digest of the `.bao` archive. Resolved from blobao CAS.",
        }),
      },
      {
        additionalProperties: false,
        description: "Validate a `.bao` archive resolved from blobao CAS by sha256 digest.",
      },
    ),
  ],
  {
    description: "Accepted `.bao` validation request payloads.",
  },
);

/**
 * TypeScript type for the validation request payload.
 */
export type BaoInstallValidateRequestBody = Static<typeof BaoInstallValidateRequestBodySchema>;

/**
 * `.bao` validate request.
 */
export const BaoInstallValidateRequestSchema: TObject<
  {
    readonly request: TUnion<
      (
        | TObject<{ readonly archivePath: TString }, "archivePath", never>
        | TObject<{ readonly archiveUrl: TString }, "archiveUrl", never>
        | TObject<
            {
              readonly registryNamespace: TOptional<TString>;
              readonly registryName: TString;
              readonly registryVersion: TOptional<TString>;
            },
            "registryName",
            "registryNamespace" | "registryVersion"
          >
        | TObject<{ readonly archiveDigest: TString }, "archiveDigest", never>
      )[]
    >;
  },
  "request",
  never
> = TypeExports.Object(
  {
    request: BaoInstallValidateRequestBodySchema,
  },
  {
    additionalProperties: false,
    description: "Request payload for `.bao` validation without install side effects.",
  },
);

/**
 * `.bao` validate request type.
 */
export type BaoInstallValidateRequestV1 = Static<typeof BaoInstallValidateRequestSchema>;

/**
 * `.bao` install request with optional idempotency key.
 */
export const BaoInstallRequestSchema = TypeExports.Object(
  {
    request: BaoInstallRequestBodySchema,
    idempotencyKey: TypeExports.Optional(
      TypeExports.String({
        minLength: 1,
        description: "Optional idempotency key for safe retry/replay.",
      }),
    ),
    correlationId: TypeExports.Optional(
      TypeExports.String({ minLength: 1, description: "Optional caller correlation id." }),
    ),
  },
  { additionalProperties: false },
);

/**
 * `.bao` install request type.
 */
export type BaoInstallRequestV1 = Static<typeof BaoInstallRequestSchema>;
