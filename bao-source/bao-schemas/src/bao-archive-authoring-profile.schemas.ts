import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

export const BaoArchiveAuthoringSigningKeyPolicySchema = TypeExports.Object(
  {
    requireConfiguredKeyInProduction: TypeExports.Boolean(),
    allowEphemeralKeyInLocal: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

export const BaoArchiveAuthoringProfileSchema = TypeExports.Object(
  {
    profileVersion: TypeExports.Literal(1),
    publisherId: TypeExports.String({ minLength: 1 }),
    organizationName: TypeExports.String({ minLength: 1 }),
    packageScope: TypeExports.String({ minLength: 1 }),
    registryNamespace: TypeExports.String({ minLength: 1 }),
    ociNamespace: TypeExports.String({ minLength: 1 }),
    urnNamespace: TypeExports.String({ minLength: 1 }),
    sourcePrefix: TypeExports.String({ minLength: 1 }),
    generatedByLabel: TypeExports.String({ minLength: 1 }),
    targetStackLabel: TypeExports.String({ minLength: 1 }),
    sdkSurfaceLabel: TypeExports.String({ minLength: 1 }),
    builderId: TypeExports.String({ minLength: 1 }),
    toolVendor: TypeExports.String({ minLength: 1 }),
    purlNamespace: TypeExports.String({ minLength: 1 }),
    spdxDocumentNamespacePrefix: TypeExports.String({ minLength: 1 }),
    sbomSerialNumberPrefix: TypeExports.String({ minLength: 1 }),
    vexAuthor: TypeExports.String({ minLength: 1 }),
    trustPolicyName: TypeExports.String({ minLength: 1 }),
    transparencyLogUrl: TypeExports.String({ minLength: 1 }),
    helpBaseUrl: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    signingKeyPolicy: BaoArchiveAuthoringSigningKeyPolicySchema,
  },
  { additionalProperties: false },
);

export type BaoArchiveAuthoringProfileV1 = Static<typeof BaoArchiveAuthoringProfileSchema>;

export const BAO_ARCHIVE_AUTHORING_DEFAULT_PROFILE = {
  profileVersion: 1,
  publisherId: "baohaus",
  organizationName: "Baohaus",
  packageScope: "@baohaus",
  registryNamespace: "baohaus",
  ociNamespace: "baohaus",
  urnNamespace: "urn:baohaus:bao-archive-authoring",
  sourcePrefix: "pkg:baohaus",
  generatedByLabel: ".bao archive authoring",
  targetStackLabel: "Baohaus stack",
  sdkSurfaceLabel: "Baohaus SDK surface",
  builderId: "bao-archive-authoring",
  toolVendor: "Baohaus",
  purlNamespace: "baohaus",
  spdxDocumentNamespacePrefix: "urn:baohaus:bao-archive-authoring:spdx",
  sbomSerialNumberPrefix: "urn:baohaus:bao-archive-authoring",
  vexAuthor: "Baohaus .bao archive authoring",
  trustPolicyName: "Baohaus .bao archive authoring trust policy",
  transparencyLogUrl: "https://rekor.sigstore.dev",
  helpBaseUrl: null,
  signingKeyPolicy: {
    requireConfiguredKeyInProduction: true,
    allowEphemeralKeyInLocal: true,
  },
} as const satisfies BaoArchiveAuthoringProfileV1;
