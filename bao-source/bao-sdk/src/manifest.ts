/**
 * `.bao` manifest types — pure TypeScript interfaces.
 *
 * These interfaces mirror the current Baohaus archive contract without
 * pulling in runtime schema dependencies.
 *
 * @module @baohaus/bao-sdk/manifest
 */

import type { BaoInstallTargetKind } from "./target-kinds.ts";

export const BAO_MANIFEST_SCHEMA_VERSION: 1 = 1 as const;
export const BAO_MANIFEST_SPEC_REVISION: "2026-04-19" = "2026-04-19" as const;
export const BAO_ARCHIVE_MEDIA_TYPE: "application/vnd.baohaus.bao.archive.v1+tar" =
  "application/vnd.baohaus.bao.archive.v1+tar" as const;
export const BAO_MANIFEST_FORMAT_KIND: "archive" = "archive" as const;
export const BAO_MANIFEST_ENCODING: "json" = "json" as const;

/** Checksum metadata for verifying installed `.bao` artifacts. */
export interface BaoInstallChecksum {
  algorithm: "sha256" | "sha1";
  value: string;
}

/** Signature metadata for manifest/target verification. */
export interface BaoInstallSignature {
  algorithm: "ed25519" | "cosign" | "rsa";
  value: string;
  keyId?: string;
}

export interface BaoManifestPerson {
  name: string;
  email?: string;
  url?: string;
}

export interface BaoManifestRepository {
  type: "git";
  url: string;
  commit?: string;
  tag?: string;
  subdir?: string;
}

export interface BaoManifestContact {
  security?: string;
  support?: string;
}

/** Environment variable declaration in a manifest. */
export interface BaoManifestEnvironmentVar {
  name: string;
  required: boolean;
  sensitive: boolean;
  description?: string;
}

/** Healthcheck configuration for runtime services. */
export interface BaoTargetHealthcheck {
  readinessPath?: string;
  livenessPath?: string;
  port?: number;
  initialDelaySeconds?: number;
  periodSeconds?: number;
}

/** Lifecycle behaviour hints for the installer. */
export interface BaoManifestLifecycle {
  hotInstallable: boolean;
  restartRequired: boolean;
}

export interface BaoManifestIdentity {
  packageId: string;
  name: string;
  displayName: string;
  version: string;
  description: string;
  summary?: string;
  homepage?: string;
  repository?: BaoManifestRepository;
  packageOrigin?: "workspace" | "external" | "generated";
  maturity?: "experimental" | "beta" | "stable" | "deprecated";
  license: string;
  licenseFiles?: string[];
  authors: BaoManifestPerson[];
  owners: BaoManifestPerson[];
  maintainers?: BaoManifestPerson[];
  contact?: BaoManifestContact;
  manifestId?: string;
  sourceEntryPath?: string;
}

export interface BaoManifestRuntimeEngines {
  bun: string;
  bunLockVersion?: string;
}

export interface BaoManifestSandboxing {
  profile: "strict" | "relaxed" | "none";
  seccomp?: string;
}

export interface BaoManifestRuntime {
  engines: BaoManifestRuntimeEngines;
  compatibility?: Record<string, string>;
  platforms: string[];
  architectures: string[];
  capabilities?: string[];
  sandboxing?: BaoManifestSandboxing;
}

/** MCP provider metadata for discovery. */
export interface BaoMcpProviderMetadata {
  description?: string;
  docsPath?: string;
  tags?: string[];
  attributes?: Record<string, boolean | number | string>;
}

/** Target-level environment variable declaration. */
export interface BaoTargetEnvironmentVar {
  name: string;
  description?: string;
  required?: boolean;
  default?: string;
  sensitive?: boolean;
}

/** Target-level dependency declaration for install graph ordering. */
export interface BaoTargetDependency {
  target: string;
  required?: boolean;
  minVersion?: string;
}

/** Base target declaration within a canonical `.bao` manifest. */
export interface BaoInstallTargetBase {
  id: string;
  kind: BaoInstallTargetKind;
  target: string;
  mcpMetadata?: BaoMcpProviderMetadata;
  before?: string[];
  after?: string[];
  interface?: Record<string, unknown>;
  capabilities?: string[];
  lifecycle?: Record<string, unknown>;
  healthcheck?: BaoTargetHealthcheck;
  environment?: BaoTargetEnvironmentVar[];
  checksum?: BaoInstallChecksum;
  signature?: BaoInstallSignature;
  dependencies?: BaoTargetDependency[];
  /** Targets are open-ended; target handlers add kind-specific fields. */
  [key: string]: unknown;
}

/** Manifest-level dependency declaration. */
export interface BaoManifestDependency {
  name: string;
  version?: string;
  requestedVersion?: string;
  resolvedVersion?: string;
  kind?: BaoInstallTargetKind;
  required?: boolean;
  source?: "registry" | "bundled" | "peer";
  integrity?: string;
  reason?: string;
  targetId?: string;
  platforms?: string[];
}

/** Canonical `.bao` archive manifest. */
export interface BaoManifest {
  $schema?: string;
  schemaVersion: typeof BAO_MANIFEST_SCHEMA_VERSION;
  specRevision: typeof BAO_MANIFEST_SPEC_REVISION;
  mediaType: typeof BAO_ARCHIVE_MEDIA_TYPE;
  formatKind: typeof BAO_MANIFEST_FORMAT_KIND;
  manifestEncoding: typeof BAO_MANIFEST_ENCODING;
  identity: BaoManifestIdentity;
  runtime: BaoManifestRuntime;
  targets: BaoInstallTargetBase[];
  configuration?: Record<string, unknown>;
  dependencies?: BaoManifestDependency[];
  payload: Record<string, unknown>;
  surfaces: Record<string, unknown>;
  exports?: Record<string, unknown>;
  observability?: Record<string, unknown>;
  security: Record<string, unknown>;
  compliance?: Record<string, unknown>;
  integrity: Record<string, unknown>;
  release: Record<string, unknown>;
  archive: Record<string, unknown>;
  build: Record<string, unknown>;
  distribution?: Record<string, unknown>;
  documentation?: Record<string, unknown>;
  testing?: Record<string, unknown>;
  i18n?: Record<string, unknown>;
  governance?: Record<string, unknown>;
  extension?: Record<string, unknown>;
}
