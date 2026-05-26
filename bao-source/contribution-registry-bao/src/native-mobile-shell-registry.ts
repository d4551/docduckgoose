/**
 * Process-local native-mobile-shell contribution registry.
 *
 * @packageDocumentation
 */

import { createContributionRegistry, type RegisterResult } from "./registry.ts";
import {
  compareNativeMobileShellRegistrations,
  type NativeMobileShellRegistration,
} from "./native-mobile-shell.ts";

const store = createContributionRegistry<NativeMobileShellRegistration>(
  compareNativeMobileShellRegistrations,
);

export const nativeMobileShellRegistry: {
  readonly register: (registration: NativeMobileShellRegistration) => RegisterResult;
  readonly unregister: (id: string) => boolean;
  readonly unregisterByOwner: (extensionId: string) => number;
  readonly snapshot: () => readonly NativeMobileShellRegistration[];
  readonly size: () => number;
  readonly version: () => number;
  readonly resetForTests: () => void;
} = {
  register: (registration) => store.register(registration),
  unregister: (id) => store.unregister(id),
  unregisterByOwner: (extensionId) => store.unregisterByOwner(extensionId),
  snapshot: () => store.snapshot(),
  size: () => store.size(),
  version: () => store.version(),
  resetForTests: () => store.resetForTests(),
};
