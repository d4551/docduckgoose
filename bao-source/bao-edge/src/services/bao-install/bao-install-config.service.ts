/**
 * Install configuration defaults and types for the .bao manifest system.
 *
 * Provides policy interfaces and factory for creating default install configs.
 */

export interface BaoSourcePolicy {
  allowRemoteUrls: boolean;
  requireBaoExtensionForLocalPath: boolean;
  allowedLocalRoots: string[];
  allowedRemoteHosts: string[];
}

export interface BaoTrustPolicy {
  requireManifestChecksum: boolean;
  requireManifestSignature: boolean;
  requireTargetChecksums: boolean;
  requireTargetSignatures: boolean;
  trustedPublicKeys: Record<string, string>;
}

export interface BaoTargetAllowlist {
  [kind: string]: string | undefined;
  _default?: string;
}

export interface BaoInstallConfig {
  sourcePolicy: BaoSourcePolicy;
  trustPolicy: BaoTrustPolicy;
  targetAllowlist: BaoTargetAllowlist;
  supportedSchemaVersion: number;
  registryBaseUrl?: string;
  registryDefaultNamespace: string;
}

export const DEFAULT_SOURCE_POLICY: Readonly<BaoSourcePolicy> = {
  allowRemoteUrls: false,
  requireBaoExtensionForLocalPath: true,
  allowedLocalRoots: [process.cwd()],
  allowedRemoteHosts: [],
};

export const DEFAULT_TRUST_POLICY: Readonly<BaoTrustPolicy> = {
  requireManifestChecksum: true,
  requireManifestSignature: false,
  requireTargetChecksums: false,
  requireTargetSignatures: false,
  trustedPublicKeys: {},
};

export const DEFAULT_TARGET_ALLOWLIST: Readonly<BaoTargetAllowlist> = {
  _default: "*",
};

export function createDefaultBaoInstallConfig(): BaoInstallConfig {
  return {
    sourcePolicy: { ...DEFAULT_SOURCE_POLICY },
    trustPolicy: { ...DEFAULT_TRUST_POLICY },
    targetAllowlist: { ...DEFAULT_TARGET_ALLOWLIST },
    supportedSchemaVersion: 1,
    registryDefaultNamespace: "baohaus",
  };
}
