import { t } from "@baohaus/baobox/elysia";
import type { Static } from "@baohaus/baobox/type/static-types";

export const BAO_ARCHIVE_MEDIA_TYPE = "application/vnd.baohaus.bao.archive.v1+tar";
export const BAO_MANIFEST_SCHEMA_VERSION = 1 as const;
export const BAO_MANIFEST_FILE_IDENTIFIER = "BMv1" as const;
export const BAO_SPEC_REVISION = "2026-04-19" as const;

export const BAO_FORMAT_KINDS = ["archive", "manifest", "governance", "binary-index"] as const;

export const BAO_MANIFEST_ENCODINGS = ["json"] as const;

export const PLATFORM_IDS = [
  "darwin-arm64",
  "darwin-x64",
  "linux-arm64",
  "linux-x64",
  "linux-musl-arm64",
  "linux-musl-x64",
  "windows-arm64",
  "windows-x64",
  "freebsd-x64",
] as const;
export type PlatformId = (typeof PLATFORM_IDS)[number];

export const ARCHITECTURES = ["arm64", "x64"] as const;

export const TARGET_KINDS = [
  "bao-package",
  "htmx-extension",
  "prisma-extension",
  "better-auth-extension",
  "elysia-plugin",
  "baodown-node",
  "mcp-provider",
  "bun-plugin",
  "flatbuffer-schema",
  "hardware-driver",
  "ai-model",
  "baodown-flow",
  "bunbuddy-contract",
  "bao-runtime-workload",
  "config-overlay",
  "oci-image",
  "usd-scene",
  "ui-component-kit",
  "theme-pack",
  "design-tokens",
  "motion-preset",
  "density-preset",
  "sidebar",
  "nav",
  "settings-tab",
  "palette-entry-group",
  "api-group",
  "tile-group",
  "topbar",
] as const;
export type TargetKind = (typeof TARGET_KINDS)[number];

export const UPGRADE_STRATEGIES = ["in-place", "blue-green", "canary"] as const;

export const SANDBOX_PROFILES = ["strict", "relaxed", "none"] as const;

export const PROBE_TYPES = ["http", "tcp", "exec"] as const;

export const RELEASE_CHANNELS = ["stable", "beta", "alpha", "canary", "dev"] as const;

export const DATA_CLASSIFICATIONS = ["public", "internal", "confidential", "restricted"] as const;

export const PII_HANDLING = ["none", "pseudonymized", "encrypted"] as const;

export const SIGNATURE_ALGORITHMS = ["ed25519", "rsa", "cosign"] as const;
export type SignatureAlgorithm = (typeof SIGNATURE_ALGORITHMS)[number];

export const DEPENDENCY_SOURCES = ["registry", "bundled", "peer"] as const;
export const PACKAGE_ORIGINS = ["workspace", "external", "generated"] as const;
export const MATURITY_LEVELS = ["experimental", "beta", "stable", "deprecated"] as const;
export const REPRODUCIBILITY_MODES = ["strict", "relaxed"] as const;
export const ARCHIVE_COMPRESSION_FORMATS = ["none", "gzip", "zstd"] as const;
export const SECRET_SOURCES = ["env", "vault", "file", "kms"] as const;

export const INSTALL_ORDERS = ["pre", "main", "post"] as const;

export const SEMVER_PATTERN = "^\\d+\\.\\d+\\.\\d+(?:-[0-9A-Za-z.-]+)?(?:\\+[0-9A-Za-z.-]+)?$";
export const PACKAGE_NAME_PATTERN = "^@[a-z0-9][a-z0-9-]*\\/[a-z0-9][a-z0-9-]*$";
export const SHA256_HEX_PATTERN = "^[0-9a-f]{64}$";
export const SHA256_PREFIXED_PATTERN = "^sha256-[A-Za-z0-9+/=]+$";
export const SRI_INTEGRITY_PATTERN = "^sha256-[A-Za-z0-9+/=]+$";
export const GIT_COMMIT_PATTERN = "^[0-9a-f]{40}$";
export const ENV_VAR_NAME_PATTERN = "^[A-Z_][A-Z0-9_]*$";

function literalUnion<const T extends readonly string[]>(
  values: T,
): [ReturnType<typeof t.Literal>, ...ReturnType<typeof t.Literal>[]] {
  return values.map((value) => t.Literal(value)) as [
    ReturnType<typeof t.Literal>,
    ...ReturnType<typeof t.Literal>[],
  ];
}

export const platformIdSchema = t.Union(literalUnion(PLATFORM_IDS));
export const architectureSchema = t.Union(literalUnion(ARCHITECTURES));
export const targetKindSchema = t.Union(literalUnion(TARGET_KINDS));
export const upgradeStrategySchema = t.Union(literalUnion(UPGRADE_STRATEGIES));
export const sandboxProfileSchema = t.Union(literalUnion(SANDBOX_PROFILES));
export const probeTypeSchema = t.Union(literalUnion(PROBE_TYPES));
export const releaseChannelSchema = t.Union(literalUnion(RELEASE_CHANNELS));
export const piiHandlingSchema = t.Union(literalUnion(PII_HANDLING));
export const signatureAlgorithmSchema = t.Union(literalUnion(SIGNATURE_ALGORITHMS));
export const dependencySourceSchema = t.Union(literalUnion(DEPENDENCY_SOURCES));
export const packageOriginSchema = t.Union(literalUnion(PACKAGE_ORIGINS));
export const maturityLevelSchema = t.Union(literalUnion(MATURITY_LEVELS));
export const reproducibilityModeSchema = t.Union(literalUnion(REPRODUCIBILITY_MODES));
export const archiveCompressionFormatSchema = t.Union(literalUnion(ARCHIVE_COMPRESSION_FORMATS));
export const secretSourceSchema = t.Union(literalUnion(SECRET_SOURCES));
export const manifestEncodingSchema = t.Union(literalUnion(BAO_MANIFEST_ENCODINGS));
export const installOrderSchema = t.Union(literalUnion(INSTALL_ORDERS));

export const personSchema = t.Object(
  {
    name: t.String({ minLength: 1 }),
    email: t.Optional(t.String({ format: "email" })),
    url: t.Optional(t.String({ format: "uri" })),
  },
  { additionalProperties: false },
);

export const repositorySchema = t.Object(
  {
    type: t.Literal("git"),
    url: t.String({ format: "uri" }),
    commit: t.Optional(t.String({ pattern: GIT_COMMIT_PATTERN })),
    tag: t.Optional(t.String({ minLength: 1 })),
    subdir: t.Optional(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const contactSchema = t.Object(
  {
    security: t.Optional(t.String({ format: "email" })),
    support: t.Optional(t.String({ format: "email" })),
  },
  { additionalProperties: false },
);

export const identitySchema = t.Object(
  {
    packageId: t.String({ minLength: 1 }),
    name: t.String({ pattern: PACKAGE_NAME_PATTERN }),
    displayName: t.String({ minLength: 1 }),
    version: t.String({ pattern: SEMVER_PATTERN }),
    description: t.String({ minLength: 1 }),
    summary: t.Optional(t.String({ maxLength: 80 })),
    homepage: t.Optional(t.String({ format: "uri" })),
    repository: t.Optional(repositorySchema),
    packageOrigin: packageOriginSchema,
    maturity: maturityLevelSchema,
    license: t.String({ minLength: 1 }),
    licenseFiles: t.Optional(t.Array(t.String({ minLength: 1 }))),
    authors: t.Array(personSchema, { minItems: 1 }),
    owners: t.Array(personSchema, { minItems: 1 }),
    maintainers: t.Optional(t.Array(personSchema)),
    contact: t.Optional(contactSchema),
    manifestId: t.Optional(t.String({ minLength: 1 })),
    sourceEntryPath: t.Optional(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const enginesSchema = t.Object(
  {
    bun: t.String({ minLength: 1 }),
    bunLockVersion: t.Optional(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const sandboxingSchema = t.Object(
  {
    profile: sandboxProfileSchema,
    seccomp: t.Optional(t.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export const runtimeSchema = t.Object(
  {
    engines: enginesSchema,
    compatibility: t.Optional(t.Record(t.String({ minLength: 1 }), t.String({ minLength: 1 }))),
    platforms: t.Array(platformIdSchema, { minItems: 1 }),
    architectures: t.Array(architectureSchema, { minItems: 1 }),
    capabilities: t.Optional(t.Array(t.String({ minLength: 1 }))),
    sandboxing: t.Optional(sandboxingSchema),
  },
  { additionalProperties: false },
);
export type Runtime = Static<typeof runtimeSchema>;

export const dependencySchema = t.Object(
  {
    name: t.String({ minLength: 1 }),
    version: t.Optional(t.String({ minLength: 1 })),
    requestedVersion: t.Optional(t.String({ minLength: 1 })),
    resolvedVersion: t.Optional(t.String({ minLength: 1 })),
    kind: t.Optional(targetKindSchema),
    required: t.Optional(t.Boolean()),
    source: t.Optional(dependencySourceSchema),
    integrity: t.Optional(t.String({ pattern: SRI_INTEGRITY_PATTERN })),
    reason: t.Optional(t.String({ minLength: 1 })),
    targetId: t.Optional(t.String({ minLength: 1 })),
    platforms: t.Optional(t.Array(platformIdSchema)),
  },
  { additionalProperties: false },
);
export type Dependency = Static<typeof dependencySchema>;
