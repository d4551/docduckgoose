import { t } from "@baohaus/baobox/elysia";
import type { Static } from "@baohaus/baobox/type/static-types";
import {
  archiveCompressionFormatSchema,
  DATA_CLASSIFICATIONS,
  ENV_VAR_NAME_PATTERN,
  GIT_COMMIT_PATTERN,
  installOrderSchema,
  personSchema,
  piiHandlingSchema,
  probeTypeSchema,
  releaseChannelSchema,
  reproducibilityModeSchema,
  SHA256_HEX_PATTERN,
  SHA256_PREFIXED_PATTERN,
  secretSourceSchema,
  signatureAlgorithmSchema,
  upgradeStrategySchema,
} from "./bao-install-primitives.schemas.ts";

export const probeSchema = t.Object(
  {
    type: probeTypeSchema,
    spec: t.Record(t.String({ minLength: 1 }), t.Unknown()),
  },
  { additionalProperties: false },
);

export const lifecycleSchema = t.Object(
  {
    hotInstallable: t.Boolean(),
    restartRequired: t.Boolean(),
    upgradeStrategy: upgradeStrategySchema,
    rollbackSupported: t.Boolean(),
    preInstall: t.Optional(t.String({ minLength: 1 })),
    postInstall: t.Optional(t.String({ minLength: 1 })),
    preUninstall: t.Optional(t.String({ minLength: 1 })),
    healthcheck: t.Optional(probeSchema),
    readiness: t.Optional(probeSchema),
    liveness: t.Optional(probeSchema),
  },
  { additionalProperties: false },
);

export const targetInterfaceSchema = t.Object(
  {
    openapi: t.Optional(t.String({ minLength: 1 })),
    asyncapi: t.Optional(t.String({ minLength: 1 })),
    typescript: t.Optional(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const envVariableSchema = t.Object(
  {
    name: t.String({ pattern: ENV_VAR_NAME_PATTERN }),
    required: t.Boolean(),
    sensitive: t.Boolean(),
    type: t.Union([
      t.Literal("string"),
      t.Literal("boolean"),
      t.Literal("number"),
      t.Literal("url"),
      t.Literal("json"),
    ]),
    default: t.Optional(t.String({ minLength: 1 })),
    description: t.Optional(t.String({ minLength: 1 })),
    enum: t.Optional(t.Array(t.String({ minLength: 1 }))),
    example: t.Optional(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const featureFlagSchema = t.Object(
  {
    name: t.String({ minLength: 1 }),
    default: t.Boolean(),
    description: t.Optional(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const secretSchema = t.Object(
  {
    name: t.String({ pattern: ENV_VAR_NAME_PATTERN }),
    source: secretSourceSchema,
    provider: t.Optional(t.String({ minLength: 1 })),
    path: t.Optional(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const configurationSchema = t.Object(
  {
    env: t.Optional(t.Array(envVariableSchema)),
    featureFlags: t.Optional(t.Array(featureFlagSchema)),
    secrets: t.Optional(t.Array(secretSchema)),
  },
  { additionalProperties: false },
);

export const fileEntrySchema = t.Object(
  {
    path: t.String({ minLength: 1 }),
    sha256: t.String({ pattern: SHA256_HEX_PATTERN }),
    sizeBytes: t.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

export const sharedPayloadSchema = t.Object(
  {
    files: t.Array(fileEntrySchema),
    entrypoints: t.Array(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const platformPayloadSchema = t.Object(
  {
    platformId: t.String({ minLength: 1 }),
    files: t.Array(fileEntrySchema),
    installOrder: t.Optional(installOrderSchema),
  },
  { additionalProperties: false },
);

export const bytecodePayloadSchema = t.Object(
  {
    files: t.Array(fileEntrySchema),
  },
  { additionalProperties: false },
);

export const wasmPayloadSchema = t.Object(
  {
    files: t.Array(fileEntrySchema),
  },
  { additionalProperties: false },
);

export const payloadSchema = t.Object(
  {
    shared: sharedPayloadSchema,
    platforms: t.Array(platformPayloadSchema),
    bytecode: t.Optional(bytecodePayloadSchema),
    wasm: t.Optional(wasmPayloadSchema),
  },
  { additionalProperties: false },
);

export const surfacesSchema = t.Object(
  {
    esm: t.Boolean(),
    cjs: t.Boolean(),
    bin: t.Boolean(),
    nativeAddon: t.Boolean(),
    postinstall: t.Boolean(),
    prisma: t.Boolean(),
    htmx: t.Boolean(),
    ssr: t.Boolean(),
  },
  { additionalProperties: false },
);
export type Surfaces = Static<typeof surfacesSchema>;

export const checksumSchema = t.Object(
  {
    algorithm: t.Literal("sha256"),
    value: t.String({ pattern: SHA256_HEX_PATTERN }),
    coveredFields: t.Array(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);
export type Checksum = Static<typeof checksumSchema>;

export const signatureSchema = t.Object(
  {
    algorithm: signatureAlgorithmSchema,
    value: t.String({ minLength: 1 }),
    keyId: t.String({ minLength: 1 }),
    sigstoreBundle: t.Optional(t.String({ minLength: 1 })),
    transparencyLog: t.Optional(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const attestationsSchema = t.Object(
  {
    slsa: t.String({ minLength: 1 }),
    sbomCycloneDx: t.String({ minLength: 1 }),
    sbomSpdx: t.String({ minLength: 1 }),
    vex: t.String({ minLength: 1 }),
    licenseScan: t.String({ minLength: 1 }),
    vulnScan: t.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const securitySchema = t.Object(
  {
    signature: signatureSchema,
    attestations: attestationsSchema,
    trustPolicy: t.String({ minLength: 1 }),
    dataClassification: t.Union(
      DATA_CLASSIFICATIONS.map((value) => t.Literal(value)) as [
        ReturnType<typeof t.Literal>,
        ...ReturnType<typeof t.Literal>[],
      ],
    ),
    piiHandling: t.Optional(piiHandlingSchema),
    contacts: t.Optional(t.Array(personSchema)),
  },
  { additionalProperties: false },
);
export type Security = Static<typeof securitySchema>;

export const complianceSchema = t.Object(
  {
    standards: t.Optional(t.Array(t.String({ minLength: 1 }))),
    regions: t.Optional(t.Array(t.String({ minLength: 1 }))),
    tags: t.Optional(t.Array(t.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

export const integritySchema = t.Object(
  {
    checksum: checksumSchema,
    merkleRoot: t.String({ pattern: SHA256_PREFIXED_PATTERN }),
    reproducible: t.Boolean(),
    buildEnvironment: t.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const deprecationSchema = t.Object(
  {
    deprecated: t.Boolean(),
    reason: t.Optional(t.String({ minLength: 1 })),
    replacement: t.Optional(t.String({ minLength: 1 })),
    sunsetDate: t.Optional(t.String({ format: "date-time" })),
  },
  { additionalProperties: false },
);

export const supportMatrixSchema = t.Object(
  {
    channels: t.Array(releaseChannelSchema),
    platforms: t.Array(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const releaseSchema = t.Object(
  {
    channel: releaseChannelSchema,
    releaseDate: t.String({ format: "date-time" }),
    supportMatrix: t.Optional(supportMatrixSchema),
    deprecation: t.Optional(deprecationSchema),
  },
  { additionalProperties: false },
);

export const distributionSchema = t.Object(
  {
    registry: t.Optional(t.String({ minLength: 1 })),
    ociRepository: t.Optional(t.String({ minLength: 1 })),
    packageId: t.Optional(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const archiveCompressionSchema = t.Object(
  {
    format: archiveCompressionFormatSchema,
    toolchain: t.Optional(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const archiveSchema = t.Object(
  {
    extension: t.String({ minLength: 1 }),
    compression: archiveCompressionSchema,
    memberOrder: t.Literal("lexicographic"),
    manifestJsonRequired: t.Boolean(),
    manifestBinIncluded: t.Boolean(),
    manifestBinParityRequired: t.Boolean(),
  },
  { additionalProperties: false },
);

export const buildGeneratorSchema = t.Object(
  {
    name: t.String({ minLength: 1 }),
    version: t.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const buildSchema = t.Object(
  {
    generator: buildGeneratorSchema,
    sourceCommit: t.String({ pattern: GIT_COMMIT_PATTERN }),
    sourceDirty: t.Boolean(),
    buildTimestamp: t.String({ format: "date-time" }),
    reproducibilityMode: reproducibilityModeSchema,
    createdBy: t.Optional(personSchema),
    builtBy: t.Optional(personSchema),
  },
  { additionalProperties: false },
);

export const documentationSchema = t.Object(
  {
    readme: t.Optional(t.String({ minLength: 1 })),
    changelog: t.Optional(t.String({ minLength: 1 })),
    api: t.Optional(t.String({ minLength: 1 })),
    examples: t.Optional(t.Array(t.String({ minLength: 1 }))),
    support: t.Optional(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const testingSchema = t.Object(
  {
    coverage: t.Optional(t.Number({ minimum: 0, maximum: 100 })),
    integration: t.Optional(t.Array(t.String({ minLength: 1 }))),
    e2e: t.Optional(t.Array(t.String({ minLength: 1 }))),
    fixtures: t.Optional(t.Array(t.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

export const i18nSchema = t.Object(
  {
    locales: t.Array(t.String({ minLength: 1 })),
    defaultLocale: t.String({ minLength: 1 }),
    rtl: t.Optional(t.Array(t.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

export const observabilitySchema = t.Object(
  {
    logs: t.Optional(t.String({ minLength: 1 })),
    metrics: t.Optional(t.String({ minLength: 1 })),
    traces: t.Optional(t.String({ minLength: 1 })),
    events: t.Optional(t.String({ minLength: 1 })),
    dashboards: t.Optional(t.Array(t.String({ minLength: 1 }))),
    alerts: t.Optional(t.Array(t.String({ minLength: 1 }))),
    logFormat: t.Optional(t.Literal("structured-json")),
  },
  { additionalProperties: false },
);

export const governanceSchema = t.Object(
  {
    codeReview: t.Optional(t.String({ minLength: 1 })),
    dco: t.Optional(t.String({ minLength: 1 })),
    owners: t.Optional(t.Array(t.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);

export const extensionSchema = t.Object(
  {
    before: t.Optional(t.Array(t.String({ minLength: 1 }))),
    after: t.Optional(t.Array(t.String({ minLength: 1 }))),
    replaces: t.Optional(t.Array(t.String({ minLength: 1 }))),
    supersedes: t.Optional(t.Array(t.String({ minLength: 1 }))),
  },
  { additionalProperties: false },
);
