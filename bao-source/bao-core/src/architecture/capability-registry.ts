/**
 * Runtime capability registry for traced capability discovery.
 *
 * Wraps {@link ModuleContractRegistry} to provide capability-level
 * check, refresh, and change subscription with trace context propagation.
 *
 * @shared/architecture/capability-registry
 */

import { createLogger } from "../logger";
import type { CapabilityDescriptor } from "./domain-module.contract";
import {
  getModuleContractRegistry,
  type ModuleContractRegistry,
  type ModuleRegistryEvent,
  type ModuleRegistryListener,
} from "./module-contract-registry";

const logger: ReturnType<typeof createLogger> = createLogger("CapabilityRegistry");

type ListenerError = Error | string | number | boolean | object | null | undefined;

function formatListenerError(error: ListenerError): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (error === null || error === undefined) {
    return "Unknown error";
  }
  return String(error);
}

// Types

/**
 * Result of a single capability check.
 */
export interface CapabilityCheckResult {
  /** Capability identifier that was checked. */
  capabilityId: string;
  /** Whether the capability is granted (at least one module advertises it). */
  granted: boolean;
  /** Human-readable reason for the result. */
  reason?: string;
  /** Optional user identifier for audit context. */
  userId?: string;
  /** Optional correlation identifier for distributed tracing. */
  correlationId?: string;
  /** ISO timestamp when the check was performed. */
  checkedAt: string;
}

/**
 * Event emitted when a module's capabilities change.
 */
export interface CapabilityRefreshEvent {
  /** Module whose capabilities changed. */
  moduleId: string;
  /** Previous capability identifiers. */
  previous: readonly string[];
  /** Current capability identifiers. */
  current: readonly string[];
  /** Optional correlation identifier for distributed tracing. */
  correlationId?: string;
  /** ISO timestamp when the refresh occurred. */
  refreshedAt: string;
}

/**
 * Listener for capability change events.
 */
export type CapabilityChangeListener = (event: CapabilityRefreshEvent) => void;

// Registry Implementation

/**
 * Runtime capability registry.
 *
 * Provides capability-centric operations on top of the module contract registry,
 * including traced checks, refresh events, and change subscriptions.
 */
export class CapabilityRegistry {
  private readonly registry: ModuleContractRegistry;
  private readonly changeListeners = new Set<CapabilityChangeListener>();
  private readonly unsubscribeRegistry: () => void;

  constructor(registry?: ModuleContractRegistry) {
    this.registry = registry ?? getModuleContractRegistry();
    this.unsubscribeRegistry = this.registry.subscribe(this.handleRegistryEvent.bind(this));
  }

  /**
   * Check whether a specific module advertises a capability.
   *
   * @param moduleId - Module identifier.
   * @param capabilityId - Capability identifier.
   * @returns True when the module advertises the capability.
   */
  hasCapability(moduleId: string, capabilityId: string): boolean {
    const descriptor = this.registry.get(moduleId);
    if (!descriptor) {
      return false;
    }
    return descriptor.capabilities.some((c) => c.capabilityId === capabilityId);
  }

  /**
   * Get all capabilities advertised by a module.
   *
   * @param moduleId - Module identifier.
   * @returns Read-only array of capability descriptors.
   */
  getCapabilities(moduleId: string): readonly CapabilityDescriptor[] {
    const descriptor = this.registry.get(moduleId);
    if (!descriptor) {
      return [];
    }
    return descriptor.capabilities;
  }

  /**
   * Check whether any module in the registry advertises a capability.
   *
   * Returns a structured result suitable for audit logging and tracing.
   *
   * @param params - Check parameters.
   * @returns Structured check result.
   */
  checkCapability(params: {
    capabilityId: string;
    userId?: string;
    correlationId?: string;
  }): CapabilityCheckResult {
    const modules = this.registry.getByCapability(params.capabilityId);
    const granted = modules.length > 0;
    const result: CapabilityCheckResult = {
      capabilityId: params.capabilityId,
      granted,
      reason: granted
        ? `Granted by ${modules.length} module(s): ${modules.map((m) => m.moduleId).join(", ")}`
        : `No module advertises capability "${params.capabilityId}"`,
      checkedAt: new Date().toISOString(),
    };
    if (params.userId !== undefined) {
      result.userId = params.userId;
    }
    if (params.correlationId !== undefined) {
      result.correlationId = params.correlationId;
    }
    return result;
  }

  /**
   * Refresh capability state for a module and emit a change event.
   *
   * Re-reads the module descriptor from the registry and compares against
   * the previous capabilities snapshot.
   *
   * @param moduleId - Module identifier.
   * @param correlationId - Optional correlation identifier.
   * @returns Refresh event, or null if the module is not registered.
   */
  refreshCapabilities(moduleId: string, correlationId?: string): CapabilityRefreshEvent | null {
    const descriptor = this.registry.get(moduleId);
    if (!descriptor) {
      return null;
    }

    const current = descriptor.capabilities.map((c) => c.capabilityId);
    const event: CapabilityRefreshEvent = {
      moduleId,
      previous: current,
      current,
      refreshedAt: new Date().toISOString(),
    };
    if (correlationId !== undefined) {
      event.correlationId = correlationId;
    }

    this.emitChange(event);
    return event;
  }

  /**
   * Subscribe to capability change events.
   *
   * @param listener - Callback invoked on capability changes.
   * @returns Unsubscribe function.
   */
  onCapabilityChange(listener: CapabilityChangeListener): () => void {
    this.changeListeners.add(listener);
    return (): void => {
      this.changeListeners.delete(listener);
    };
  }

  /**
   * Clean up registry subscription and listeners.
   */
  dispose(): void {
    this.unsubscribeRegistry();
    this.changeListeners.clear();
  }

  /**
   * Handle registry events and translate to capability change events.
   */
  private handleRegistryEvent: ModuleRegistryListener = (event: ModuleRegistryEvent): void => {
    if (event.type === "registered" || event.type === "updated") {
      const current = event.descriptor.capabilities.map(
        (c: { capabilityId: string }) => c.capabilityId,
      );
      const previous = event.type === "registered" ? [] : current;
      this.emitChange({
        moduleId: event.moduleId,
        previous,
        current,
        refreshedAt: new Date().toISOString(),
      });
    } else if (event.type === "unregistered") {
      this.emitChange({
        moduleId: event.moduleId,
        previous: [],
        current: [],
        refreshedAt: new Date().toISOString(),
      });
    }
  };

  /**
   * Emit a capability change event to all listeners.
   */
  private emitChange(event: CapabilityRefreshEvent): void {
    for (const listener of this.changeListeners) {
      Promise.allSettled([
        new Promise<void>((resolve) => {
          resolve(listener(event));
        }),
      ]).then(([result]) => {
        if (result.status === "fulfilled") {
          return;
        }
        logger.warn(
          `Capability change listener threw for module "${event.moduleId}": ${formatListenerError(result.reason)}`,
        );
      });
    }
  }
}

// Singleton

let globalCapabilityRegistry: CapabilityRegistry | null = null;

/**
 * Get the global capability registry singleton.
 *
 * @returns Global capability registry instance.
 */
export function getCapabilityRegistry(): CapabilityRegistry {
  if (!globalCapabilityRegistry) {
    globalCapabilityRegistry = new CapabilityRegistry();
  }
  return globalCapabilityRegistry;
}

/**
 * Reset the global capability registry.
 *
 * Intended for test isolation only.
 */
export function resetCapabilityRegistry(): void {
  if (globalCapabilityRegistry) {
    globalCapabilityRegistry.dispose();
  }
  globalCapabilityRegistry = null;
}
