import { NativeMobileShellTargetHandler } from "@baohaus/bao-install-handlers-bao/native-mobile-shell";
import { BaoTargetHandlerRegistry } from "@baohaus/bao-sdk/target-handler-registry";
import { gooseWordBaoInstallLogger } from "./bao-install-logger.ts";

let cachedRegistry: BaoTargetHandlerRegistry | null = null;

/**
 * Goose Word install-handler registry (native-mobile-shell wired; full 13-handler
 * factory cutover blocked until local contribution hosts align with
 * contribution-registry-bao registration shapes).
 */
export const getGooseWordInstallHandlerRegistry = (): BaoTargetHandlerRegistry => {
  if (cachedRegistry !== null) {
    return cachedRegistry;
  }
  const built = new BaoTargetHandlerRegistry();
  built.register(new NativeMobileShellTargetHandler(gooseWordBaoInstallLogger));
  cachedRegistry = built;
  return built;
};
