import type { TrustPolicy } from "./bao-manifest-signer.ts";

export interface ValidationContext {
  readonly trustPolicy?: TrustPolicy;
  readonly verifySignature?: boolean;
  readonly publicKeyResolver?: (keyId: string) => Promise<CryptoKey | null>;
  readonly installedRuntime?: {
    readonly bun: string;
    readonly compatibility?: Readonly<Record<string, string>>;
  };
}

export interface ValidationGateResult {
  readonly gate: number;
  readonly name: string;
  readonly valid: boolean;
  readonly issues: readonly string[];
}

export interface ValidationReport {
  readonly valid: boolean;
  readonly issues?: readonly string[];
  readonly resolvedInstallOrder?: readonly string[];
  readonly gates: readonly ValidationGateResult[];
}
