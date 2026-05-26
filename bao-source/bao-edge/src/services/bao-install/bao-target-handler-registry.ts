import type { BaoInstallTarget } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type { BaoTargetSchemaHandler } from "@baohaus/bao-sdk/target-handler";

/**
 * Bao Edge registers manifest-validation schema handlers (declarative
 * port). The runtime install path is owned by separate installer registries
 * (see ward-wonton / style-shumai). The canonical `BaoTargetSchemaHandler`
 * port lives in `@baohaus/bao-sdk/target-handler` — single source of truth.
 */
export type BaoTargetHandler = BaoTargetSchemaHandler<BaoInstallTarget>;

const targetHandlers = new Map<string, BaoTargetHandler>();

export function registerTargetHandler(targetHandler: BaoTargetHandler): void {
  targetHandlers.set(targetHandler.kind, targetHandler);
}

export function getTargetHandler(kind: string): BaoTargetHandler | undefined {
  return targetHandlers.get(kind);
}

export function getRegisteredKinds(): string[] {
  return [...targetHandlers.keys()];
}

export function hasTargetHandler(kind: string): boolean {
  return targetHandlers.has(kind);
}
