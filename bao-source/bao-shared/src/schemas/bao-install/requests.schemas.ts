/**
 * `.bao` install request schemas.
 *
 * Request bodies for install and validate flows across local archives, remote
 * archives, and registry references.
 *
 * @shared/schemas/bao-install/requests
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { BAO_MANIFEST_PATH_PATTERN, BAO_MANIFEST_URL_PATTERN } from "./core.schemas.ts";

/**
 * Supported request source shapes for installing `.bao`.
 */
export const BaoInstallRequestBodySchema = Type.Union(
  [
    Type.Object(
      {
        archivePath: Type.String({
          minLength: 1,
          pattern: BAO_MANIFEST_PATH_PATTERN,
          description: "Local path to a `.bao` archive file.",
        }),
      },
      { additionalProperties: false, description: "Install from a local `.bao` archive path." },
    ),
    Type.Object(
      {
        archiveUrl: Type.String({
          format: "uri",
          pattern: BAO_MANIFEST_URL_PATTERN,
          description: "Remote URL for a `.bao` archive.",
        }),
      },
      { additionalProperties: false, description: "Install from a remote `.bao` archive URL." },
    ),
    Type.Object(
      {
        registryName: Type.String({
          minLength: 1,
          description: "Package name in the .bao registry.",
        }),
        registryVersion: Type.Optional(
          Type.String({ minLength: 1, description: "Version constraint." }),
        ),
      },
      { additionalProperties: false, description: "Install from .bao registry by package name." },
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
export const BaoInstallValidateRequestBodySchema: Type.TUnion<
  (
    | Type.TObject<{ readonly archivePath: Type.TString }, "archivePath", never>
    | Type.TObject<{ readonly archiveUrl: Type.TString }, "archiveUrl", never>
    | Type.TObject<
        {
          readonly registryName: Type.TString;
          readonly registryVersion: Type.TOptional<Type.TString>;
        },
        "registryName",
        "registryVersion"
      >
  )[]
> = Type.Union(
  [
    Type.Object(
      {
        archivePath: Type.String({
          minLength: 1,
          pattern: BAO_MANIFEST_PATH_PATTERN,
          description: "Local path to a `.bao` archive file.",
        }),
      },
      { additionalProperties: false, description: "Validate a local `.bao` archive path." },
    ),
    Type.Object(
      {
        archiveUrl: Type.String({
          format: "uri",
          pattern: BAO_MANIFEST_URL_PATTERN,
          description: "Remote URL for a `.bao` archive.",
        }),
      },
      { additionalProperties: false, description: "Validate a remote `.bao` archive URL." },
    ),
    Type.Object(
      {
        registryName: Type.String({
          minLength: 1,
          description: "Package name in the .bao registry.",
        }),
        registryVersion: Type.Optional(
          Type.String({ minLength: 1, description: "Version constraint." }),
        ),
      },
      {
        additionalProperties: false,
        description: "Validate a .bao registry package by name.",
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
export const BaoInstallValidateRequestSchema: Type.TObject<
  {
    readonly request: Type.TUnion<
      (
        | Type.TObject<{ readonly archivePath: Type.TString }, "archivePath", never>
        | Type.TObject<{ readonly archiveUrl: Type.TString }, "archiveUrl", never>
        | Type.TObject<
            {
              readonly registryName: Type.TString;
              readonly registryVersion: Type.TOptional<Type.TString>;
            },
            "registryName",
            "registryVersion"
          >
      )[]
    >;
  },
  "request",
  never
> = Type.Object(
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
export const BaoInstallRequestSchema = Type.Object(
  {
    request: BaoInstallRequestBodySchema,
    idempotencyKey: Type.Optional(
      Type.String({ minLength: 1, description: "Optional idempotency key for safe retry/replay." }),
    ),
    correlationId: Type.Optional(
      Type.String({ minLength: 1, description: "Optional caller correlation id." }),
    ),
  },
  { additionalProperties: false },
);

/**
 * `.bao` install request type.
 */
export type BaoInstallRequestV1 = Static<typeof BaoInstallRequestSchema>;
