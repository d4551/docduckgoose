/**
 * Runtime extension descriptor types.
 *
 * Shared by `.bao` install runtime registry, HTMX route
 * extension loader, and Elysia plugin extension loader.
 *
 * @module @baohaus/bao-sdk/extension
 */

import type {
  BaoExtensionLifecyclePolicy,
  BaoExtensionModuleSource,
  BaoRuntimeExtensionPosition,
  BaoRuntimeExtensionRouteScope,
  BaoRuntimeExtensionScope,
} from "./target-kinds.ts";

/** Canonical runtime extension module descriptor. */
export interface BaoExtensionModuleDescriptor {
  extensionId: string;
  source: BaoExtensionModuleSource;
  runtimeScope: BaoRuntimeExtensionScope;
  targetKind: string;
  targetId: string;
  moduleId: string;
  manifestName?: string;
  before?: string[];
  after?: string[];
  manifestTargetIndex?: number;
  routeScope?: BaoRuntimeExtensionRouteScope;
  lifecyclePolicy?: BaoExtensionLifecyclePolicy;
  position?: BaoRuntimeExtensionPosition;
  priority?: number;
  installedAt?: string;
}
