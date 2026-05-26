/**
 * Module contract registry for runtime module discovery and orchestration.
 *
 * Provides a centralized, in-process registry where domain modules publish
 * their canonical `DomainModuleDescriptor` for introspection, capability
 * discovery, dependency resolution, and health aggregation.
 *
 * @shared/architecture/module-contract-registry
 */

import { sha256Hex } from "@baohaus/bao-utils/canonical/bao-manifest-checksum";
import { createLogger } from "../logger";
import {
  DEFAULT_SHUTDOWN_ORDER,
  DEFAULT_SHUTDOWN_TIMEOUT_MS,
  DEFAULT_STARTUP_ORDER,
  DEFAULT_STARTUP_TIMEOUT_MS,
  type DomainModuleDependencyResolution,
  type DomainModuleDescriptor,
  type DomainModuleHealthDescriptor,
  type DomainModuleKind,
  type HealthState,
  type ModuleShutdownDescriptor,
  type ModuleStartupDescriptor,
  type ModuleTransportProtocol,
  resolveDomainModuleDependencyOrder,
} from "./domain-module.contract";

const logger: ReturnType<typeof createLogger> = createLogger("ModuleContractRegistry");

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
 * Snapshot of all registered module contracts at a point in time.
 */
export interface ModuleRegistrySnapshot {
  /** ISO timestamp when the snapshot was taken. */
  timestamp: string;
  /** Total number of registered modules. */
  count: number;
  /** Module descriptors keyed by moduleId. */
  modules: Readonly<Record<string, DomainModuleDescriptor>>;
  /** Computed dependency order (empty when cycles exist). */
  dependencyOrder: readonly string[];
  /** Deterministic fingerprint of the full registry state. */
  registryFingerprint: string;
}

/** Diagnostic code for registry validation. */
export type RegistryValidationDiagnosticCode =
  | "REGISTRY_E001" // moduleId empty
  | "REGISTRY_E002" // version empty
  | "REGISTRY_E003" // description empty
  | "REGISTRY_E004" // kind missing
  | "REGISTRY_E005" // contractFingerprint empty
  | "REGISTRY_E006" // transport.protocol missing
  | "REGISTRY_E007" // bunbuddy/service missing critical health probe
  | "REGISTRY_E008" // bunbuddy/service requiresDependencies but startup/shutdown not configured
  | "REGISTRY_E009" // unresolved required dependency
  | "REGISTRY_E011"; // bunbuddy missing /health probe

/**
 * Structured validation diagnostic with code and remediation hint.
 */
export interface ValidationDiagnostic {
  /** Diagnostic code. */
  code: RegistryValidationDiagnosticCode;
  /** Human-readable message. */
  message: string;
  /** Optional remediation hint. */
  remediation?: string;
}

/**
 * Validation result for a single module.
 */
export interface ModuleValidationResult {
  /** Module identifier. */
  moduleId: string;
  /** Whether validation passed. */
  ok: boolean;
  /** Validation diagnostics (plain string format). */
  diagnostics: readonly string[];
  /** Structured diagnostics with codes. */
  diagnosticDetails?: readonly ValidationDiagnostic[];
}

/**
 * Options for registry validation.
 */
export interface RegistryValidationOptions {
  /** When true, enforce stricter rules for bunbuddy/service kinds. */
  strict?: boolean;
}

/**
 * Registry validation summary.
 */
export interface RegistryValidationSummary {
  /** Whether all modules passed validation. */
  ok: boolean;
  /** Per-module results. */
  results: readonly ModuleValidationResult[];
  /** Dependency resolution result. */
  dependencyResolution: DomainModuleDependencyResolution;
}

/**
 * Event emitted when the registry state changes.
 */
export type ModuleRegistryEvent =
  | { type: "registered"; moduleId: string; descriptor: DomainModuleDescriptor }
  | { type: "unregistered"; moduleId: string }
  | { type: "updated"; moduleId: string; descriptor: DomainModuleDescriptor };

/**
 * Listener for registry change events.
 */
export type ModuleRegistryListener = (event: ModuleRegistryEvent) => void;

function resolveLifecycleDescriptors(descriptor: DomainModuleDescriptor): {
  health: DomainModuleHealthDescriptor;
  startup: ModuleStartupDescriptor;
  shutdown: ModuleShutdownDescriptor;
} {
  return {
    health: descriptor.health,
    startup: descriptor.startup,
    shutdown: descriptor.shutdown,
  };
}

function collectStrictDiagnostics(descriptor: DomainModuleDescriptor): {
  diagnostics: string[];
  diagnosticDetails: ValidationDiagnostic[];
} {
  const diagnostics: string[] = [];
  const diagnosticDetails: ValidationDiagnostic[] = [];
  const kind = descriptor.kind;
  if (kind !== "bunbuddy" && kind !== "service") {
    return { diagnostics, diagnosticDetails };
  }
  const lifecycle = resolveLifecycleDescriptors(descriptor);
  if (!lifecycle.health.probes.some((p) => p.critical)) {
    diagnostics.push("bunbuddy/service requires at least one critical health probe");
    diagnosticDetails.push({
      code: "REGISTRY_E007",
      message: "bunbuddy/service requires at least one critical health probe",
      remediation: "Add a health probe with critical: true to health.probes.",
    });
  }
  if (
    kind === "bunbuddy" &&
    !lifecycle.health.probes.some((p) => p.endpoint === "/health" || p.endpoint.endsWith("/health"))
  ) {
    diagnostics.push("bunbuddy requires a health probe targeting /health");
    diagnosticDetails.push({
      code: "REGISTRY_E011",
      message: "bunbuddy requires a health probe targeting /health",
      remediation: 'Add a probe with endpoint: "/health" to health.probes.',
    });
  }
  if (lifecycle.startup.requiresDependencies) {
    const defaultStartup =
      lifecycle.startup.order === DEFAULT_STARTUP_ORDER &&
      lifecycle.startup.timeoutMs === DEFAULT_STARTUP_TIMEOUT_MS;
    const defaultShutdown =
      lifecycle.shutdown.order === DEFAULT_SHUTDOWN_ORDER &&
      lifecycle.shutdown.timeoutMs === DEFAULT_SHUTDOWN_TIMEOUT_MS;
    if (defaultStartup && defaultShutdown) {
      diagnostics.push(
        "requiresDependencies=true but startup/shutdown use defaults; configure order/timeoutMs",
      );
      diagnosticDetails.push({
        code: "REGISTRY_E008",
        message: "requiresDependencies=true but startup/shutdown use defaults",
        remediation:
          "Configure startup.order, startup.timeoutMs, shutdown.order, shutdown.timeoutMs for dependency-aware orchestration.",
      });
    }
  }
  return { diagnostics, diagnosticDetails };
}

function validateSingleDescriptor(
  descriptor: DomainModuleDescriptor,
  strict: boolean,
): { diagnostics: string[]; diagnosticDetails: ValidationDiagnostic[] } {
  const diagnostics: string[] = [];
  const diagnosticDetails: ValidationDiagnostic[] = [];
  if (!descriptor.moduleId.trim()) {
    diagnostics.push("moduleId is empty");
    diagnosticDetails.push({
      code: "REGISTRY_E001",
      message: "moduleId is empty",
      remediation: "Provide a non-empty moduleId.",
    });
  }
  if (!descriptor.version.trim()) {
    diagnostics.push("version is empty");
    diagnosticDetails.push({
      code: "REGISTRY_E002",
      message: "version is empty",
      remediation: "Provide a semver version string.",
    });
  }
  if (!descriptor.description.trim()) {
    diagnostics.push("description is empty");
    diagnosticDetails.push({
      code: "REGISTRY_E003",
      message: "description is empty",
      remediation: "Provide a human-readable description.",
    });
  }
  if (!descriptor.kind) {
    diagnostics.push("kind is missing");
    diagnosticDetails.push({
      code: "REGISTRY_E004",
      message: "kind is missing",
      remediation: "Set kind to bunbuddy, pipeline, plugin, service, or hardware.",
    });
  }
  if (!descriptor.contractFingerprint) {
    diagnostics.push("contractFingerprint is empty");
    diagnosticDetails.push({
      code: "REGISTRY_E005",
      message: "contractFingerprint is empty",
      remediation: "Use createDomainModuleDescriptor to generate a valid fingerprint.",
    });
  }
  if (!descriptor.transport.protocol) {
    diagnostics.push("transport.protocol is missing");
    diagnosticDetails.push({
      code: "REGISTRY_E006",
      message: "transport.protocol is missing",
      remediation: "Set transport.protocol (e.g. http, websocket).",
    });
  }
  if (strict) {
    const strictResult = collectStrictDiagnostics(descriptor);
    diagnostics.push(...strictResult.diagnostics);
    diagnosticDetails.push(...strictResult.diagnosticDetails);
  }
  return { diagnostics, diagnosticDetails };
}

// Registry Implementation

/**
 * In-process module contract registry.
 *
 * Thread-safe within a single Bun process (single-threaded JS).
 * Listeners are invoked synchronously after state mutations.
 */
export class ModuleContractRegistry {
  private readonly modules = new Map<string, DomainModuleDescriptor>();
  private readonly listeners = new Set<ModuleRegistryListener>();
  private cachedOrder: readonly string[] | null = null;

  /**
   * Register a module contract descriptor.
   *
   * @param descriptor - Canonical module descriptor.
   * @throws Error if a module with the same id is already registered.
   */
  register(descriptor: DomainModuleDescriptor): void {
    if (!descriptor.moduleId || typeof descriptor.moduleId !== "string") {
      throw new Error("Cannot register module with empty or missing moduleId");
    }

    if (this.modules.has(descriptor.moduleId)) {
      throw new Error(
        `Module "${descriptor.moduleId}" is already registered. Use update() to replace.`,
      );
    }

    this.modules.set(descriptor.moduleId, Object.freeze({ ...descriptor }));
    this.cachedOrder = null;
    this.emit({ type: "registered", moduleId: descriptor.moduleId, descriptor });
  }

  /**
   * Update an existing module contract descriptor.
   *
   * @param descriptor - Updated canonical module descriptor.
   * @throws Error if the module is not registered.
   */
  update(descriptor: DomainModuleDescriptor): void {
    if (!this.modules.has(descriptor.moduleId)) {
      throw new Error(`Module "${descriptor.moduleId}" is not registered. Use register() first.`);
    }

    this.modules.set(descriptor.moduleId, Object.freeze({ ...descriptor }));
    this.cachedOrder = null;
    this.emit({ type: "updated", moduleId: descriptor.moduleId, descriptor });
  }

  /**
   * Register or update a module contract descriptor.
   *
   * @param descriptor - Canonical module descriptor.
   */
  upsert(descriptor: DomainModuleDescriptor): void {
    if (this.modules.has(descriptor.moduleId)) {
      this.update(descriptor);
    } else {
      this.register(descriptor);
    }
  }

  /**
   * Unregister a module by its identifier.
   *
   * @param moduleId - Module to remove.
   * @returns True if the module was found and removed.
   */
  unregister(moduleId: string): boolean {
    const existed = this.modules.delete(moduleId);
    if (existed) {
      this.cachedOrder = null;
      this.emit({ type: "unregistered", moduleId });
    }
    return existed;
  }

  /**
   * Retrieve a module descriptor by identifier.
   *
   * @param moduleId - Module identifier.
   * @returns Descriptor or null when not found.
   */
  get(moduleId: string): DomainModuleDescriptor | null {
    return this.modules.get(moduleId) ?? null;
  }

  /**
   * Check if a module is registered.
   *
   * @param moduleId - Module identifier.
   * @returns True if registered.
   */
  has(moduleId: string): boolean {
    return this.modules.has(moduleId);
  }

  /**
   * Retrieve all registered module descriptors.
   *
   * @returns Readonly array of all registered descriptors.
   */
  getAll(): readonly DomainModuleDescriptor[] {
    return [...this.modules.values()];
  }

  /**
   * Retrieve modules filtered by kind.
   *
   * @param kind - Module kind to filter by.
   * @returns Array of matching descriptors.
   */
  getByKind(kind: DomainModuleKind): readonly DomainModuleDescriptor[] {
    return [...this.modules.values()].filter((m) => m.kind === kind);
  }

  /**
   * Retrieve modules filtered by capability.
   *
   * @param capabilityId - Capability identifier to search for.
   * @returns Array of modules that advertise the given capability.
   */
  getByCapability(capabilityId: string): readonly DomainModuleDescriptor[] {
    return [...this.modules.values()].filter((m) =>
      m.capabilities.some((c) => c.capabilityId === capabilityId),
    );
  }

  /**
   * Retrieve modules filtered by transport protocol.
   *
   * @param protocol - Transport protocol to filter by (e.g. 'http', 'websocket', 'grpc').
   * @returns Array of modules using the given transport protocol.
   */
  getByTransport(protocol: ModuleTransportProtocol): readonly DomainModuleDescriptor[] {
    return [...this.modules.values()].filter((m) => m.transport.protocol === protocol);
  }

  /**
   * Retrieve modules filtered by health state.
   *
   * @param state - Health state to filter by.
   * @returns Array of modules in the given health state.
   */
  getByHealthState(state: HealthState): readonly DomainModuleDescriptor[] {
    return [...this.modules.values()].filter((m) => m.health.state === state);
  }

  /**
   * Retrieve modules that depend on the given module (reverse dependency lookup).
   *
   * @param moduleId - Module identifier to find dependents of.
   * @returns Array of modules that list moduleId in their dependencies.
   */
  getDependentsOf(moduleId: string): readonly DomainModuleDescriptor[] {
    return [...this.modules.values()].filter((m) => m.dependencies.includes(moduleId));
  }

  /**
   * Get the number of registered modules.
   *
   * @returns Module count.
   */
  get size(): number {
    return this.modules.size;
  }

  /**
   * Resolve dependency order for all registered modules.
   *
   * @returns Dependency resolution result.
   */
  resolveDependencyOrder(): DomainModuleDependencyResolution {
    return resolveDomainModuleDependencyOrder(this.getAll());
  }

  /**
   * Get the computed startup order.
   *
   * @returns Ordered module identifiers, or empty array if cycles exist.
   */
  getStartupOrder(): readonly string[] {
    if (this.cachedOrder === null) {
      const result = this.resolveDependencyOrder();
      this.cachedOrder = result.ok ? result.graph.order : [];
    }
    return this.cachedOrder;
  }

  /**
   * Get the computed shutdown order (reverse of startup order).
   *
   * Modules are shut down in reverse dependency order so that dependents
   * stop before their dependencies.
   *
   * @returns Ordered module identifiers for shutdown, or empty array if cycles exist.
   */
  getShutdownOrder(): readonly string[] {
    return [...this.getStartupOrder()].reverse();
  }

  /**
   * Validate all registered modules.
   *
   * Checks:
   * - Required fields are present
   * - Fingerprints are non-empty
   * - Dependency graph is valid
   * - (strict) bunbuddy/service: at least one critical health probe
   * - (strict) bunbuddy/service with requiresDependencies: startup/shutdown configured
   *
   * @param options - Optional validation options.
   * @returns Validation summary.
   */
  validate(options?: RegistryValidationOptions): RegistryValidationSummary {
    const strict = options?.strict ?? false;
    const results: ModuleValidationResult[] = [];
    for (const descriptor of this.modules.values()) {
      const { diagnostics, diagnosticDetails } = validateSingleDescriptor(descriptor, strict);
      results.push({
        moduleId: descriptor.moduleId,
        ok: diagnostics.length === 0,
        diagnostics,
        diagnosticDetails,
      });
    }
    const dependencyResolution = this.resolveDependencyOrder();
    let finalResults = results;
    if (!dependencyResolution.ok && strict) {
      const missingByModule = dependencyResolution.graph.missingDependencies;
      finalResults = results.map((r) => {
        const missing = missingByModule[r.moduleId];
        if (!missing || missing.length === 0) {
          return r;
        }
        const msg = `Unresolved required dependencies: ${missing.join(", ")}`;
        return {
          ...r,
          ok: false,
          diagnostics: [...r.diagnostics, msg],
          diagnosticDetails: [
            ...(r.diagnosticDetails ?? []),
            {
              code: "REGISTRY_E009" as const,
              message: msg,
              remediation: "Register missing dependency modules or remove from dependencies.",
            },
          ],
        };
      });
    }

    return {
      ok: finalResults.every((r) => r.ok) && dependencyResolution.ok,
      results: finalResults,
      dependencyResolution,
    };
  }

  /**
   * Create a deterministic snapshot of the registry state.
   *
   * @returns Frozen snapshot object.
   */
  snapshot(): ModuleRegistrySnapshot {
    const modules: Record<string, DomainModuleDescriptor> = {};
    const sortedIds = [...this.modules.keys()].sort((a, b) => a.localeCompare(b, "en"));

    for (const id of sortedIds) {
      const descriptor = this.modules.get(id);
      if (descriptor) {
        modules[id] = descriptor;
      }
    }

    const dependencyOrder = this.getStartupOrder();
    const registryFingerprint = this.computeFingerprint(modules);

    return Object.freeze({
      timestamp: new Date().toISOString(),
      count: this.modules.size,
      modules: Object.freeze(modules),
      dependencyOrder,
      registryFingerprint,
    });
  }

  /**
   * Subscribe to registry change events.
   *
   * @param listener - Callback invoked on state changes.
   * @returns Unsubscribe function.
   */
  subscribe(listener: ModuleRegistryListener): () => void {
    this.listeners.add(listener);
    return (): void => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Remove all registered modules and listeners.
   */
  clear(): void {
    this.modules.clear();
    this.listeners.clear();
    this.cachedOrder = null;
  }

  /**
   * Emit a registry event to all listeners.
   */
  private emit(event: ModuleRegistryEvent): void {
    for (const listener of this.listeners) {
      Promise.allSettled([
        new Promise<void>((resolve) => {
          resolve(listener(event));
        }),
      ]).then(([result]) => {
        if (result.status === "fulfilled") {
          return;
        }
        logger.warn(
          `Listener threw on "${event.type}" for module "${event.moduleId}": ${formatListenerError(result.reason)}`,
        );
      });
    }
  }

  /**
   * Compute deterministic SHA-256 fingerprint for a modules record.
   *
   * Uses the shared Bao SHA-256 helper for consistency with module-level fingerprinting.
   */
  private computeFingerprint(modules: Record<string, DomainModuleDescriptor>): string {
    const entries = Object.entries(modules).sort(([a], [b]) => a.localeCompare(b, "en"));
    const payload = entries
      .map(([id, descriptor]) => `${id}:${descriptor.contractFingerprint}\n`)
      .join("");
    return sha256Hex(payload);
  }
}

// Singleton

let globalRegistry: ModuleContractRegistry | null = null;

/**
 * Get the global module contract registry singleton.
 *
 * @returns Global registry instance.
 */
export function getModuleContractRegistry(): ModuleContractRegistry {
  if (!globalRegistry) {
    globalRegistry = new ModuleContractRegistry();
  }
  return globalRegistry;
}

/**
 * Reset the global module contract registry.
 *
 * Intended for test isolation only.
 */
export function resetModuleContractRegistry(): void {
  if (globalRegistry) {
    globalRegistry.clear();
  }
  globalRegistry = null;
}
