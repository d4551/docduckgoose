/**
 * Shared host integration contract API for domain module registration and validation.
 *
 * Provides registerDomainModule, resolveLoadOrder, publishModuleContract, and
 * assertContractParity for use by server ModuleHostService, BunBuddy integration,
 * and contract tests.
 *
 * @shared/architecture/module-host
 */

import type { ModuleLifecycleEventEncodeInput } from "@baohaus/bao-wrapture/protocols/module-lifecycle";
import type { DomainModuleDescriptor } from "./domain-module.contract";
import type { ModuleContractRegistry } from "./module-contract-registry";

/**
 * Optional event publisher for module lifecycle events.
 * When provided, publishModuleContract will invoke this after registration.
 */
export type ModuleLifecycleEventPublisher = (
  input: ModuleLifecycleEventEncodeInput,
) => void | Promise<void>;

/**
 * Register a domain module descriptor in the registry.
 *
 * @param registry - Module contract registry.
 * @param descriptor - Canonical domain module descriptor.
 */
export function registerDomainModule(
  registry: ModuleContractRegistry,
  descriptor: DomainModuleDescriptor,
): void {
  registry.upsert(descriptor);
}

/**
 * Resolve the startup load order for all registered modules.
 *
 * @param registry - Module contract registry.
 * @returns Ordered module identifiers.
 * @throws Error when dependency resolution fails (cycles or missing dependencies).
 */
export function resolveLoadOrder(registry: ModuleContractRegistry): string[] {
  const result = registry.resolveDependencyOrder();
  if (!result.ok) {
    const cycles = result.graph.cycles.length
      ? ` cycles: ${result.graph.cycles.map((c) => c.join(" -> ")).join("; ")}`
      : "";
    const missing = Object.keys(result.graph.missingDependencies).length
      ? ` missing: ${JSON.stringify(result.graph.missingDependencies)}`
      : "";
    throw new Error(`Module dependency resolution failed: ${result.message}${cycles}${missing}`);
  }
  return [...result.graph.order];
}

/**
 * Register a module contract and optionally publish a lifecycle event.
 *
 * @param registry - Module contract registry.
 * @param descriptor - Canonical domain module descriptor.
 * @param publishEvent - Optional publisher for ModuleLifecycleEventV1.
 */
export async function publishModuleContract(
  registry: ModuleContractRegistry,
  descriptor: DomainModuleDescriptor,
  publishEvent?: ModuleLifecycleEventPublisher,
): Promise<void> {
  registry.upsert(descriptor);
  if (publishEvent) {
    await publishEvent({
      runId: `register-${descriptor.moduleId}-${Date.now()}`,
      moduleId: descriptor.moduleId,
      lifecycle: "registered",
      state: "success",
      healthState: descriptor.health?.state ?? "unknown",
      durationMs: 0,
      message: `Module ${descriptor.moduleId} registered`,
    });
  }
}

/**
 * Partial descriptor for parity assertion.
 * Only specified fields are checked.
 */
export type PartialDomainModuleDescriptor = Partial<
  Pick<
    DomainModuleDescriptor,
    | "moduleId"
    | "kind"
    | "version"
    | "moduleVersion"
    | "description"
    | "dependencies"
    | "routes"
    | "transport"
  >
> & { moduleId: string };

/** Check scalar field parity between expected and registered descriptors. */
function collectScalarParityErrors(
  exp: PartialDomainModuleDescriptor,
  registered: DomainModuleDescriptor,
): string[] {
  const errors: string[] = [];
  if (exp.kind != null && exp.kind !== registered.kind) {
    errors.push(
      `Module "${exp.moduleId}": kind mismatch expected=${exp.kind} actual=${registered.kind}`,
    );
  }
  if (exp.version != null && exp.version !== registered.version) {
    errors.push(
      `Module "${exp.moduleId}": version mismatch expected=${exp.version} actual=${registered.version}`,
    );
  }
  if (exp.moduleVersion != null && exp.moduleVersion !== registered.moduleVersion) {
    errors.push(
      `Module "${exp.moduleId}": moduleVersion mismatch expected=${exp.moduleVersion} actual=${registered.moduleVersion}`,
    );
  }
  if (exp.description != null && exp.description !== registered.description) {
    errors.push(`Module "${exp.moduleId}": description mismatch`);
  }
  if (exp.transport?.protocol != null && exp.transport.protocol !== registered.transport.protocol) {
    errors.push(
      `Module "${exp.moduleId}": transport.protocol mismatch expected=${exp.transport.protocol} actual=${registered.transport.protocol}`,
    );
  }
  return errors;
}

/** Check dependency parity between expected and registered descriptors. */
function collectDependencyParityErrors(
  exp: PartialDomainModuleDescriptor,
  registered: DomainModuleDescriptor,
): string[] {
  if (exp.dependencies == null) {
    return [];
  }
  const errors: string[] = [];
  const expSet = new Set(exp.dependencies);
  const regSet = new Set(registered.dependencies);
  const missing = [...expSet].filter((d) => !regSet.has(d));
  const extra = [...regSet].filter((d) => !expSet.has(d));
  if (missing.length > 0) {
    errors.push(`Module "${exp.moduleId}": missing dependencies ${missing.join(", ")}`);
  }
  if (extra.length > 0) {
    errors.push(`Module "${exp.moduleId}": unexpected dependencies ${extra.join(", ")}`);
  }
  return errors;
}

/** Check route parity between expected and registered descriptors. */
function collectRouteParityErrors(
  exp: PartialDomainModuleDescriptor,
  registered: DomainModuleDescriptor,
): string[] {
  if (exp.routes == null || exp.routes.length === 0) {
    return [];
  }
  const regRouteKeys = new Set(registered.routes.map((r) => `${r.method}\u0000${r.path}`));
  const missingRoutes = exp.routes.filter((r) => !regRouteKeys.has(`${r.method}\u0000${r.path}`));
  if (missingRoutes.length === 0) {
    return [];
  }
  return [
    `Module "${exp.moduleId}": missing routes ${missingRoutes.map((r) => `${r.method} ${r.path}`).join(", ")}`,
  ];
}

function collectParityErrorsForModule(
  exp: PartialDomainModuleDescriptor,
  registered: DomainModuleDescriptor,
): string[] {
  return [
    ...collectScalarParityErrors(exp, registered),
    ...collectDependencyParityErrors(exp, registered),
    ...collectRouteParityErrors(exp, registered),
  ];
}

/**
 * Assert that the registry contains descriptors matching the expected partials.
 *
 * @param registry - Module contract registry.
 * @param expected - Array of partial descriptors to match.
 * @throws Error with diagnostics when any expected descriptor is missing or incompatible.
 */
export function assertContractParity(
  registry: ModuleContractRegistry,
  expected: readonly PartialDomainModuleDescriptor[],
): void {
  const errors: string[] = [];
  for (const exp of expected) {
    const registered = registry.get(exp.moduleId);
    if (!registered) {
      errors.push(`Expected module "${exp.moduleId}" is not registered`);
      continue;
    }
    errors.push(...collectParityErrorsForModule(exp, registered));
  }
  if (errors.length > 0) {
    throw new Error(`Contract parity assertion failed:\n${errors.join("\n")}`);
  }
}
