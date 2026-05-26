import { BAO_ARCHIVE_MEDIA_TYPE } from "@baohaus/bao-schemas/bao/bao-archive.contract";
import type { ValidatorContext } from "../context.ts";

const SCANNED_TEXT_FILE_PATTERN = /\.(?:ts|tsx|js|jsx|json|md|html|xml|txt|kt|kts)$/;
const TEST_FILE_PATTERN = /(?:^|\/)(?:__tests__\/|tests?\/|.*\.(?:test|spec)\.ts$)/;
const LEGACY_ARCHIVE_MEDIA_PATTERN =
  /application\/vnd\.baohaus\.bao\.v1\+tar|application\/vnd\.baohaus\.bao\.archive\.v0\+tar/;
const LEGACY_FORMAT_KIND_PATTERN = /formatKind["']?\s*:\s*["']archive["']/;
const LEGACY_ARCHIVE_JOB_TERM = `bao-${String.fromCharCode(99, 111, 110, 118, 101, 114, 115, 105, 111, 110)}`;
const BACKTICK = String.fromCharCode(96);
const NON_CANONICAL_ARCHIVE_PATH_PATTERN = new RegExp(
  `dist\\/${LEGACY_ARCHIVE_JOB_TERM}\\/[^"'${BACKTICK}\\s)]*\\.bao|(?:^|["'${BACKTICK}\\s])(?:\\.{0,2}\\/|dist\\/)[^"'${BACKTICK}\\s)]*\\.bao\\.(?!json\\b)[^"'${BACKTICK}\\s)]*`,
);
const NON_CANONICAL_SOURCE_METADATA_PATTERN = /\.bao\/|\.bao\.lock/;
const LEGACY_CATALOG_EXPORT_PATTERN = new RegExp(`"\\.\\/${LEGACY_ARCHIVE_JOB_TERM}\\.schemas"`);
const LEGACY_DOCS_VOCABULARY_PATTERN = new RegExp(
  `"tools-${String.fromCharCode(115, 104, 105, 109)}"`,
);
const LEGACY_SMILECLUB_TOKEN = String.fromCharCode(115, 109, 105, 108, 101, 99, 108, 117, 98);
const LEGACY_PACKAGES_SRC_TOKEN = `packages-${String.fromCharCode(115, 114, 99)}`;
const LEGACY_PACKAGES_PIRATEBAO_TOKEN = `packages/${String.fromCharCode(
  112,
  105,
  114,
  97,
  116,
  101,
  98,
  97,
  111,
)}-main`;
const LEGACY_VAULT_BAO_PATH = `platform/forge/vault-${String.fromCharCode(98, 97, 111)}`;
const LEGACY_VAULT_BAO_TOKEN = `vault-${String.fromCharCode(98, 97, 111)}`;
const LEGACY_VAULT_BAO_NAME = `Vault ${String.fromCharCode(66, 97, 111)}`;
const LEGACY_PANTRY_PAO_PATH = `platform/registry/pantry-${String.fromCharCode(112, 97, 111)}`;
const LEGACY_ARCHIVE_JOBS_TOKEN = `bao-archive-${String.fromCharCode(106, 111, 98, 115)}`;
const LEGACY_RAW_GITHUB_HOST = `raw.${String.fromCharCode(
  103,
  105,
  116,
  104,
  117,
  98,
  117,
  115,
  101,
  114,
  99,
  111,
  110,
  116,
  101,
  110,
  116,
)}.com`;
const LEGACY_VAULT_PACKAGE_NAMESPACE = `@baohaus/${String.fromCharCode(118, 97, 117, 108, 116)}-`;
const LEGACY_VAULT_PACKAGE_ID_PATTERN = `${String.fromCharCode(118, 97, 117, 108, 116)}-(?:core|runtime|server|ssh|worker)`;
const LEGACY_VAULT_ASSET_PATTERN = `${String.fromCharCode(118, 97, 117, 108, 116)}-(?:app|theme|bao)`;
const LEGACY_VAULT_SCHEMA_PATTERN = `${String.fromCharCode(118, 97, 117, 108, 116)}_baoboss`;
const GITHUB_RAW_PATH_PATTERN = /github\.com\/[^"'`\s)]+\/raw(?:\/|$)/;
const LEGACY_PACKAGE_NAMING_PATTERNS = [
  new RegExp(LEGACY_RAW_GITHUB_HOST),
  GITHUB_RAW_PATH_PATTERN,
  new RegExp(`github\\.com/d4551/${LEGACY_SMILECLUB_TOKEN}`),
  new RegExp(`${LEGACY_PACKAGES_SRC_TOKEN}/`),
  new RegExp(LEGACY_PACKAGES_PIRATEBAO_TOKEN),
  new RegExp(LEGACY_VAULT_PACKAGE_NAMESPACE),
  new RegExp(LEGACY_VAULT_PACKAGE_ID_PATTERN),
  new RegExp(LEGACY_VAULT_BAO_PATH),
  new RegExp(LEGACY_VAULT_BAO_TOKEN),
  new RegExp(LEGACY_VAULT_BAO_NAME),
  new RegExp(LEGACY_VAULT_ASSET_PATTERN),
  new RegExp(LEGACY_VAULT_SCHEMA_PATTERN),
  /vault-(?:page-meta|shell-fragment)/,
  new RegExp(LEGACY_PANTRY_PAO_PATH),
  new RegExp(`verify-${LEGACY_SMILECLUB_TOKEN}`),
  new RegExp(
    `loadCanonical${String.fromCharCode(83)}${LEGACY_SMILECLUB_TOKEN.slice(1)}ArchiveSigningKey`,
  ),
  new RegExp(`"${LEGACY_ARCHIVE_JOBS_TOKEN}"\\s*:\\s*\\{`),
  new RegExp(LEGACY_ARCHIVE_JOBS_TOKEN),
  new RegExp(`baoArchive${String.fromCharCode(74, 111, 98, 115)}`),
  new RegExp(`bao-composer-feature-${LEGACY_ARCHIVE_JOBS_TOKEN}`),
  new RegExp(`conversion\\.bao-composer\\.${LEGACY_ARCHIVE_JOBS_TOKEN}`),
] as const;
const GOVERNANCE_MEDIA_TYPE_PATTERN = /"mediaType"\s*:\s*"(?<mediaType>[^"]+)"/;
const PENDING_PUBLISH_PATTERN = /"resolvedFrom"\s*:\s*"pending-publish"/;
const NULL_TRUST_FIELD_PATTERN = /"(?:ociDigest|integrity|signature)"\s*:\s*null/;

const hasRetiredPackageNaming = (contents: string): boolean =>
  LEGACY_PACKAGE_NAMING_PATTERNS.some((pattern) => pattern.test(contents));

interface TextPolicyCheck {
  readonly label: string;
  readonly test: (contents: string) => boolean;
}

const TEXT_POLICY_CHECKS: readonly TextPolicyCheck[] = [
  {
    label: "retired Bao archive media type",
    test: (contents) => LEGACY_ARCHIVE_MEDIA_PATTERN.test(contents),
  },
  {
    label: "retired formatKind archive",
    test: (contents) => LEGACY_FORMAT_KIND_PATTERN.test(contents),
  },
  {
    label: "non-canonical .bao path token",
    test: (contents) => NON_CANONICAL_ARCHIVE_PATH_PATTERN.test(contents),
  },
  {
    label: "non-canonical .bao metadata path",
    test: (contents) => NON_CANONICAL_SOURCE_METADATA_PATTERN.test(contents),
  },
  {
    label: "retired catalog export",
    test: (contents) => LEGACY_CATALOG_EXPORT_PATTERN.test(contents),
  },
  {
    label: "retired docs vocabulary",
    test: (contents) => LEGACY_DOCS_VOCABULARY_PATTERN.test(contents),
  },
  { label: "retired package naming", test: hasRetiredPackageNaming },
];

const isScannedPolicyFile = (path: string): boolean =>
  SCANNED_TEXT_FILE_PATTERN.test(path) && !TEST_FILE_PATTERN.test(path);

const collectTextPolicyViolationsForFile = (path: string, contents: string): string[] =>
  TEXT_POLICY_CHECKS.filter((check) => check.test(contents)).map(
    (check) => `${path}: ${check.label}`,
  );

const collectTextPolicyViolations = async (ctx: ValidatorContext): Promise<string[]> => {
  const violations: string[] = [];
  for (const path of ctx.collectFiles(SCANNED_TEXT_FILE_PATTERN).filter(isScannedPolicyFile)) {
    const contents = await ctx.readFile(path);
    violations.push(...collectTextPolicyViolationsForFile(path, contents));
  }
  return violations;
};

const collectGovernanceViolations = async (ctx: ValidatorContext): Promise<string[]> => {
  const violations: string[] = [];
  for (const path of ctx.trackedFiles.filter((candidate) =>
    candidate.endsWith("bao-governance.json"),
  )) {
    const contents = await ctx.readFile(path);
    const mediaType = contents.match(GOVERNANCE_MEDIA_TYPE_PATTERN)?.groups?.mediaType;
    if (mediaType !== BAO_ARCHIVE_MEDIA_TYPE) {
      violations.push(`${path}: mediaType must be canonical mediaType ${BAO_ARCHIVE_MEDIA_TYPE}`);
    }
  }
  return violations;
};

const collectLockViolations = async (ctx: ValidatorContext): Promise<string[]> => {
  const violations: string[] = [];
  if (ctx.config.forbidPendingPublishLocks !== true) {
    return violations;
  }
  for (const path of ctx.trackedFiles.filter((candidate) => candidate.endsWith("bao.lock"))) {
    const contents = await ctx.readFile(path);
    if (PENDING_PUBLISH_PATTERN.test(contents)) {
      violations.push(`${path}: pending-publish is forbidden in release artifacts`);
    }
    if (NULL_TRUST_FIELD_PATTERN.test(contents)) {
      violations.push(`${path}: ociDigest, integrity, and signature are required`);
    }
  }
  return violations;
};

export const baoArchivePolicy = async (ctx: ValidatorContext): Promise<void> => {
  ctx.failAll(
    [
      ...(await collectTextPolicyViolations(ctx)),
      ...(await collectGovernanceViolations(ctx)),
      ...(await collectLockViolations(ctx)),
    ],
    ".bao archive policy violations",
  );
};
