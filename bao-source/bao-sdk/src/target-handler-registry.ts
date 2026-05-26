/**
 * Canonical `.bao` install target handler registry.
 *
 * Per-app singleton + DTO surface. The contract, result envelope,
 * narrowing record shape, and canonical helpers live in
 * `./install-target-handler`. Each handler imports the canonical
 * types directly from there; this module owns the registry class
 * + module-scoped cache helper so every Bao app (bao-runtime,
 * registry, forge, bao-ai-gateway) uses one canonical implementation
 * instead of redeclaring the lifecycle locally.
 *
 * Submodule subpath only — `@baohaus/bao-sdk/target-handler-registry`.
 *
 * @packageDocumentation
 */

import type { BaoInstallTargetHandlerContract } from "./install-target-handler.ts";

interface BaoTargetHandlerRegistryCache {
  value?: BaoTargetHandlerRegistry | undefined;
}

const registryCache: BaoTargetHandlerRegistryCache = {
  value: undefined,
};

/** DTO shape for target handler discovery responses. */
export interface BaoTargetHandlerListItem {
  kind: string;
  displayName: string;
  hotInstallable: boolean;
  retryable: boolean;
  abiVersion?: number;
  supportsReuse?: boolean;
}

/**
 * Runtime registry for `.bao` install target handlers.
 *
 * Target handlers register themselves at bootstrap. Core services
 * query the registry instead of maintaining hardcoded maps.
 */
export class BaoTargetHandlerRegistry {
  private readonly handlers = new Map<string, BaoInstallTargetHandlerContract>();

  register(handler: BaoInstallTargetHandlerContract): void {
    if (this.handlers.has(handler.kind)) {
      throw new Error(
        `BaoTargetHandlerRegistry: duplicate target handler kind "${handler.kind}" — each kind may only be registered once`,
      );
    }
    this.handlers.set(handler.kind, handler);
  }

  get(kind: string): BaoInstallTargetHandlerContract | undefined {
    return this.handlers.get(kind);
  }

  has(kind: string): boolean {
    return this.handlers.has(kind);
  }

  getAll(): readonly BaoInstallTargetHandlerContract[] {
    return [...this.handlers.values()];
  }

  getKinds(): readonly string[] {
    return [...this.handlers.keys()];
  }

  toHandlerListDto(): BaoTargetHandlerListItem[] {
    return [...this.handlers.values()].map((handler) => {
      return {
        kind: handler.kind,
        displayName: handler.displayName,
        hotInstallable: handler.hotInstallable,
        retryable: handler.retryable,
        ...(handler.abiVersion === undefined ? {} : { abiVersion: handler.abiVersion }),
        ...(handler.supportsReuse === undefined ? {} : { supportsReuse: handler.supportsReuse }),
      };
    });
  }

  get size(): number {
    return this.handlers.size;
  }
}

/**
 * Get the canonical process-wide target handler registry.
 *
 * @returns Global target handler registry instance.
 */
export function getBaoTargetHandlerRegistry(): BaoTargetHandlerRegistry {
  if (!registryCache.value) {
    registryCache.value = new BaoTargetHandlerRegistry();
  }
  return registryCache.value;
}
