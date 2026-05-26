/**
 * Canonical native-mobile-shell contribution registration shapes.
 *
 * @packageDocumentation
 */

import type { BaseContributionRegistration } from "./base-contribution.ts";

export const NATIVE_MOBILE_SHELL_PLATFORMS = ["android", "ios"] as const;
export type NativeMobileShellPlatform = (typeof NATIVE_MOBILE_SHELL_PLATFORMS)[number];

export const NATIVE_MOBILE_SHELL_SERVER_MODES = ["embedded"] as const;
export type NativeMobileShellServerMode = (typeof NATIVE_MOBILE_SHELL_SERVER_MODES)[number];

export type NativeMobileShellRegistration = BaseContributionRegistration & {
  readonly kind: "native-mobile-shell";
  readonly platform: NativeMobileShellPlatform;
  readonly serverMode: NativeMobileShellServerMode;
  readonly loopbackHost: string;
  readonly loopbackPort: number;
  readonly healthPath: string;
  readonly dataDirEnvKey: "GOOSE_WORD_DATA_DIR";
  readonly binaryAssetRef?: string;
  readonly iconSetRef: string;
  readonly offlineCapable: true;
};

export function compareNativeMobileShellRegistrations(
  a: NativeMobileShellRegistration,
  b: NativeMobileShellRegistration,
): number {
  if (a.platform !== b.platform) {
    return a.platform.localeCompare(b.platform);
  }
  return a.id.localeCompare(b.id);
}
