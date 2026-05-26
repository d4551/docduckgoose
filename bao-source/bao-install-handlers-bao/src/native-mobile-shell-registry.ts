/**
 * @baohaus/bao-install-handlers-bao/native-mobile-shell-registry
 *
 * Re-exports canonical registry from contribution-registry-bao.
 */

export type {
  NativeMobileShellPlatform,
  NativeMobileShellRegistration,
  NativeMobileShellServerMode,
} from "@baohaus/contribution-registry-bao/native-mobile-shell";
export {
  NATIVE_MOBILE_SHELL_PLATFORMS,
  NATIVE_MOBILE_SHELL_SERVER_MODES,
} from "@baohaus/contribution-registry-bao/native-mobile-shell";
export { nativeMobileShellRegistry } from "@baohaus/contribution-registry-bao/native-mobile-shell-registry";
