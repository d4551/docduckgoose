/**
 * Domain module contract primitives.
 *
 * These types are used to describe any runtime module (BunBuddy, pipeline, server
 * plugin, or service) with a shared shape suitable for lifecycle orchestration,
 * capability publication, and dependency planning.
 */

import { sha256Hex } from "@baohaus/bao-utils/canonical/bao-manifest-checksum";

const ROUTE_METHOD_PATH_RE: RegExp = /^(\w+)\s+(\/\S*)$/u;
const DEFAULT_PROBE_TIMEOUT_MS = 1000;

/**
 * Supported module kinds across runtime boundaries.
 */
export type DomainModuleKind =
  | "bunbuddy"
  | "pipeline"
  | "plugin"
  | "service"
  | "hardware"
  | (string & {});

/**
 * Canonical health values exposed by module contracts.
 */
export type HealthState = "unknown" | "healthy" | "degraded" | "unavailable" | "unhealthy";

/**
 * Supported transport protocols for module contracts.
 */
export type ModuleTransportProtocol = "http" | "websocket" | "grpc" | "memory" | "stdio";

/**
 * HTTP methods used by route descriptors.
 */
export type DomainHttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD"
  | "TRACE"
  | "CONNECT"
  | (string & {});

/**
 * Route metadata for contract publication.
 */
export interface DomainRouteDescriptor {
  /** HTTP method used by the route. */
  method: DomainHttpMethod;
  /** Route path relative to module root. */
  path: string;
}

/**
 * Capability details advertised by a module contract.
 */
export interface CapabilityDescriptor {
  /** Capability identifier. */
  capabilityId: string;
  /** Human-readable capability name. */
  name: string;
  /** Human-readable capability description. */
  description: string;
  /** Optional semantic version of the capability contract. */
  version?: string;
}

/**
 * Probe that can be run to evaluate module readiness / liveness.
 */
export interface ModuleHealthProbeDescriptor {
  /** Probe identifier. */
  probeId: string;
  /** Probe endpoint path. */
  endpoint: string;
  /** Probe method. */
  method: DomainHttpMethod;
  /** Whether a failed probe is terminal for module readiness. */
  critical: boolean;
  /** Probe timeout in milliseconds. */
  timeoutMs: number;
}

/**
 * Health profile depth for module probes.
 */
export type HealthProfile = "minimal" | "standard" | "full";

/**
 * Module health contract.
 */
export interface DomainModuleHealthDescriptor {
  /** Current module health state. */
  state: HealthState;
  /** Human-readable reason for the current state. */
  reason?: string;
  /** Optional list of module health probes. */
  probes: readonly ModuleHealthProbeDescriptor[];
  /** Probe depth: minimal (single liveness), standard (liveness+readiness), full (detailed). */
  healthProfile?: HealthProfile;
}

/**
 * Startup contract for ordered orchestration.
 */
export interface ModuleStartupDescriptor {
  /** Relative order index for startup scheduling. */
  order: number;
  /** Grace period in milliseconds before startup is considered failed. */
  timeoutMs: number;
  /** Whether startup must wait for dependency modules. */
  requiresDependencies: boolean;
}

/**
 * Shutdown contract for graceful termination.
 */
export interface ModuleShutdownDescriptor {
  /** Relative order index for shutdown scheduling. */
  order: number;
  /** Grace period in milliseconds before shutdown is considered failed. */
  timeoutMs: number;
}

/**
 * Content-type negotiation hints for transport.
 */
export interface TransportNegotiation {
  /** Accept header value for format negotiation (e.g. application/x-flatbuffers). */
  acceptHeader?: string;
  /** Query param key for format negotiation (e.g. format). */
  queryParam?: string;
}

/**
 * Transport shape for contracts to support mixed runtimes.
 */
export interface ModuleTransportProfile {
  /** Transport protocol. */
  protocol: ModuleTransportProtocol;
  /** Base mount path exposed by the module. */
  basePath: string;
  /** Optional host. */
  host?: string;
  /** Optional port. */
  port?: number;
  /** Optional docs UI path. */
  docsPath?: string;
  /** Optional OpenAPI path. */
  openApiPath?: string;
  /** Optional transport profile for contract tooling and generated bindings. */
  transportProfile?: {
    /** Adapter or transport name for diagnostics and observability. */
    name: string;
    /** Optional schema reference for validation and docs tooling. */
    schema?: unknown;
    /** Optional encoder function name used by generated tooling. */
    encoder?: string;
    /** Optional decoder function name used by generated tooling. */
    decoder?: string;
    /** Content-types supported by this transport profile. */
    contentTypes?: readonly string[];
  };
  /** Optional content-type negotiation for binary/custom formats. */
  negotiation?: TransportNegotiation;
}

/**
 * Module lifecycle hooks and observability context.
 */
export interface ModuleLifecycleContext {
  /** Contract used during lifecycle operations. */
  module: DomainModuleDescriptor;
}

/**
 * Optional module hooks used by hosts.
 */
export interface ModuleLifecycleHooks {
  /** Called before module routes and contracts are composed. */
  startup?: (context: ModuleLifecycleContext) => void | Promise<void>;
  /** Called when module is ready to serve traffic. */
  ready?: (context: ModuleLifecycleContext) => void | Promise<void>;
  /** Called before shutdown sequence or tear-down. */
  shutdown?: (context: ModuleLifecycleContext) => void | Promise<void>;
  /** Called when a module is being uninstalled via .bao uninstall. */
  unload?: (context: ModuleLifecycleContext) => void | Promise<void>;
  /** Called when module emits a problem (severity, message). */
  emitProblem?: (severity: "info" | "warn" | "error", message: string) => void;
}

/**
 * Input shape for building canonical module descriptors.
 */
export interface DomainModuleDescriptorInput {
  /** Module unique identifier. */
  moduleId: string;
  /** Module kind (bunbuddy, pipeline, plugin, etc.). */
  kind: DomainModuleKind;
  /** Module version (semver). Prefer moduleVersion for new code. */
  version: string;
  /** Canonical module version; overrides version when provided. */
  moduleVersion?: string;
  /** Human-readable summary. */
  description: string;
  /** Ordered dependency module identifiers. */
  dependencies?: readonly string[];
  /** Capabilities this module publishes. */
  capabilities?: readonly CapabilityDescriptor[];
  /** Advertised routes for transport discovery. */
  routes?: readonly DomainRouteDescriptor[];
  /** Transport profile for runtime transport metadata. */
  transport: ModuleTransportProfile;
  /** Health contract snapshot. */
  health?: Partial<DomainModuleHealthDescriptor>;
  /** Startup descriptor for orchestration. */
  startup?: Partial<ModuleStartupDescriptor>;
  /** Shutdown descriptor for orchestration. */
  shutdown?: Partial<ModuleShutdownDescriptor>;
  /** Optional schema descriptor for module-specific config. */
  configSchema?: unknown;
  /** Optional transport negotiation overrides. */
  transportNegotiation?: TransportNegotiation;
}

/**
 * Runtime-only extensions excluded from fingerprinting.
 * Used by hosts for readiness checks and problem emission.
 */
export interface ModuleRuntimeExtensions {
  /** Returns true when module is ready to serve traffic. */
  ready?: () => boolean | Promise<boolean>;
  /** Emit a problem (severity, message) for observability. */
  emitProblem?: (severity: string, message: string) => void;
  /** Optional lifecycle hooks for startup, ready, shutdown, and unload. */
  lifecycleHooks?: ModuleLifecycleHooks;
}

/**
 * Canonical module descriptor published across control planes.
 */
export interface DomainModuleDescriptor {
  /** Module unique identifier. */
  moduleId: string;
  /** Module kind. */
  kind: DomainModuleKind;
  /** Module version (semver). Alias for moduleVersion. */
  version: string;
  /** Canonical module version; same as version. */
  moduleVersion: string;
  /** Human-readable summary. */
  description: string;
  /** Ordered dependency module identifiers. */
  dependencies: readonly string[];
  /** Published capabilities. */
  capabilities: readonly CapabilityDescriptor[];
  /** Advertised routes. */
  routes: readonly DomainRouteDescriptor[];
  /** Transport profile. */
  transport: ModuleTransportProfile;
  /** Health contract snapshot. */
  health: DomainModuleHealthDescriptor;
  /** Startup details. */
  startup: ModuleStartupDescriptor;
  /** Shutdown details. */
  shutdown: ModuleShutdownDescriptor;
  /** Optional module config schema. */
  configSchema?: unknown;
  /** Deterministic serialized descriptor fingerprint. */
  contractFingerprint: string;
  /** Runtime-only extensions (excluded from fingerprint). */
  runtimeExtensions?: ModuleRuntimeExtensions;
}

/**
 * Result for dependency graph resolution.
 */
export interface DomainDependencyGraph {
  /** Module ids included in graph. */
  modules: readonly string[];
  /** Adjacency list with dependency edges. */
  adjacency: Readonly<Record<string, readonly string[]>>;
  /** Computed startup order. */
  order: readonly string[];
  /** Reported cycles when dependency resolution fails. */
  cycles: readonly string[][];
  /** Reported missing dependencies when resolution fails. */
  missingDependencies: Readonly<Record<string, readonly string[]>>;
}

/**
 * Dependency resolution result.
 */
export type DomainModuleDependencyResolution =
  | { ok: true; graph: DomainDependencyGraph }
  | { ok: false; graph: DomainDependencyGraph; message: string };

/** Default startup ordering value for domain module descriptors. */
export const DEFAULT_STARTUP_ORDER = 100;
/** Default shutdown ordering value for domain module descriptors. */
export const DEFAULT_SHUTDOWN_ORDER = 100;
/** Default startup timeout for domain module descriptors. */
export const DEFAULT_STARTUP_TIMEOUT_MS = 30_000;
/** Default shutdown timeout for domain module descriptors. */
export const DEFAULT_SHUTDOWN_TIMEOUT_MS = 30_000;
const DEFAULT_HTTP_METHOD: DomainHttpMethod = "GET";
const MIN_TIMEOUT_MS = 100;

/**
 * Keep deterministic route descriptor formatting.
 *
 * @param value - Route candidate string.
 * @returns Parsed route descriptor.
 */
function resolveDomainRouteFromString(value: string): DomainRouteDescriptor {
  const trimmed = value.trim();
  if (!trimmed) {
    return { method: DEFAULT_HTTP_METHOD, path: "/" };
  }

  const parsed = trimmed.match(ROUTE_METHOD_PATH_RE);
  if (!parsed) {
    return {
      method: DEFAULT_HTTP_METHOD,
      path: trimmed.startsWith("/") ? trimmed : `/${trimmed}`,
    };
  }

  const rawMethod = parsed[1]?.toUpperCase() ?? DEFAULT_HTTP_METHOD;
  const method = normalizeHttpMethod(rawMethod);
  const path = normalizeRoutePath(parsed[2] ?? "/");
  return { method, path };
}

/**
 * Normalize arbitrary strings while preserving stable ordering semantics.
 *
 * @param values - Candidate values.
 * @returns Sorted and de-duplicated strings.
 */
function normalizeOrderedStringList(values: readonly string[]): string[] {
  const normalized = values
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value) => value.length > 0);
  return [...new Set(normalized)].sort((left, right) => left.localeCompare(right, "en"));
}

/**
 * Normalize an HTTP method with fallback to GET.
 *
 * @param value - Candidate method.
 * @returns Normalized method.
 */
function normalizeHttpMethod(value: string): DomainHttpMethod {
  const upper = value.trim().toUpperCase();
  // DomainHttpMethod includes (string & {}), so any string satisfies it.
  const normalized: DomainHttpMethod = upper || DEFAULT_HTTP_METHOD;
  return normalized;
}

/**
 * Normalize API paths for route descriptors.
 *
 * @param value - Candidate path.
 * @returns Normalized route path.
 */
function normalizeRoutePath(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "/";
  }
  if (trimmed === "*") {
    return trimmed;
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

/**
 * Normalize probe definitions into deterministic output.
 *
 * @param probes - Candidate probes.
 * @param moduleId - Module identity for generated ids.
 * @returns Normalized probes sorted deterministically.
 */
function normalizeHealthProbes(
  probes: readonly ModuleHealthProbeDescriptor[],
  moduleId: string,
): ModuleHealthProbeDescriptor[] {
  const normalized = probes
    .map((probe, index) => {
      const method = normalizeHttpMethod(probe?.method ?? DEFAULT_HTTP_METHOD);
      const endpoint = normalizeRoutePath(probe?.endpoint ?? "/health");
      const timeoutMs = Number.isFinite(probe?.timeoutMs)
        ? Math.max(MIN_TIMEOUT_MS, Math.floor(probe?.timeoutMs))
        : DEFAULT_PROBE_TIMEOUT_MS;
      const critical = Boolean(probe?.critical);
      const fallbackProbeId = `${moduleId}:${method}:${endpoint}:${index}`;
      const candidateProbeId = typeof probe?.probeId === "string" ? probe?.probeId.trim() : "";
      return {
        probeId: candidateProbeId || fallbackProbeId,
        endpoint,
        method,
        critical,
        timeoutMs,
      };
    })
    .filter((probe) => probe.endpoint.length > 0);

  normalized.sort((left, right) => {
    if (left.endpoint === right.endpoint) {
      if (left.method === right.method) {
        return left.probeId.localeCompare(right.probeId, "en");
      }
      return left.method.localeCompare(right.method, "en");
    }
    return left.endpoint.localeCompare(right.endpoint, "en");
  });

  return normalized;
}

/**
 * Normalize a contract transport profile.
 *
 * @param transport - Candidate transport profile.
 * @returns Normalized transport profile.
 */
function normalizeTransportProfile(
  transport: ModuleTransportProfile,
  negotiation?: TransportNegotiation,
): ModuleTransportProfile {
  const base: ModuleTransportProfile = {
    protocol: transport.protocol,
    basePath: transport.basePath.trim() || "/",
  };
  const host = normalizeOptionalTransportValue(transport.host);
  if (host !== undefined) {
    base.host = host;
  }
  const port = normalizeTransportPort(transport.port);
  if (port !== undefined) {
    base.port = port;
  }
  const docsPath = normalizeOptionalTransportValue(transport.docsPath);
  if (docsPath !== undefined) {
    base.docsPath = docsPath;
  }
  const openApiPath = normalizeOptionalTransportValue(transport.openApiPath);
  if (openApiPath !== undefined) {
    base.openApiPath = openApiPath;
  }
  const normalizedNegotiation = normalizeTransportNegotiation(negotiation ?? transport.negotiation);
  if (normalizedNegotiation !== undefined) {
    base.negotiation = normalizedNegotiation;
  }
  return base;
}

function normalizeOptionalTransportValue(value: string | undefined): string | undefined {
  return value?.trim() || undefined;
}

function normalizeTransportPort(port: number | undefined): number | undefined {
  if (port == null || Number.isFinite(port) === false) {
    return undefined;
  }

  return Math.max(1, Math.floor(port));
}

function normalizeTransportNegotiation(
  negotiation: TransportNegotiation | undefined,
): TransportNegotiation | undefined {
  if (negotiation === undefined) {
    return undefined;
  }

  const acceptHeader = normalizeOptionalTransportValue(negotiation.acceptHeader);
  const queryParam = normalizeOptionalTransportValue(negotiation.queryParam);
  if (acceptHeader === undefined && queryParam === undefined) {
    return undefined;
  }

  return {
    ...(acceptHeader === undefined ? {} : { acceptHeader }),
    ...(queryParam === undefined ? {} : { queryParam }),
  };
}

/**
 * Sort routes into canonical deterministic order.
 *
 * @param routes - Route descriptors.
 * @returns Deterministic route descriptor list.
 */
function normalizeDomainRouteList(
  routes: readonly DomainRouteDescriptor[],
): DomainRouteDescriptor[] {
  const normalized = routes
    .map((route) => ({
      method: normalizeHttpMethod(route.method),
      path: normalizeRoutePath(route.path),
    }))
    .filter((route) => route.path.length > 0);

  const byKey = new Map<string, DomainRouteDescriptor>();
  for (const route of normalized) {
    byKey.set(`${route.method}\u0000${route.path}`, route);
  }

  return [...byKey.values()].sort((left, right) => {
    if (left.path === right.path) {
      return left.method.localeCompare(right.method, "en");
    }
    return left.path.localeCompare(right.path, "en");
  });
}

/**
 * Create a stable snapshot of a descriptor for fingerprinting.
 *
 * @param descriptor - Descriptor to serialize (contractFingerprint/runtimeExtensions excluded by caller).
 * @returns Stable JSON representation.
 */
function toStableSnapshot(
  descriptor: Omit<DomainModuleDescriptor, "contractFingerprint" | "runtimeExtensions">,
): string {
  return JSON.stringify(sortObjectRecursively(descriptor));
}

/**
 * Recursively sort object keys for stable stringification.
 *
 * @param input - Unknown JSON-like input.
 * @returns Deterministic clone with ordered keys.
 */
/**
 * Runtime guard for Record<string, unknown> shape.
 *
 * @param value - Candidate value.
 * @returns True when value is a non-null, non-array object.
 */
function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sortObjectRecursively(input: unknown): unknown {
  if (Array.isArray(input)) {
    return input.map(sortObjectRecursively);
  }
  if (!isPlainRecord(input)) {
    return input;
  }

  const entries = Object.entries(input)
    .sort(([left], [right]) => left.localeCompare(right, "en"))
    .map(([key, value]) => [key, sortObjectRecursively(value)]);

  return Object.fromEntries(entries);
}

/**
 * Build a canonical module descriptor from input contracts.
 *
 * @param input - Module descriptor input.
 * @returns Canonicalized domain module descriptor.
 */
/** Validate required fields on a domain module descriptor input, returning the validated moduleId and version. */
function validateDomainModuleInput(input: DomainModuleDescriptorInput): {
  moduleId: string;
  versionValue: string;
} {
  const moduleId = input.moduleId.trim();
  if (!moduleId) {
    throw new Error("Domain module id must be a non-empty string");
  }
  const versionValue = (input.moduleVersion ?? input.version).trim();
  if (!versionValue) {
    throw new Error(`Domain module "${moduleId}" is missing a version`);
  }
  if (!input.description.trim()) {
    throw new Error(`Domain module "${moduleId}" is missing a description`);
  }
  if (!input.kind) {
    throw new Error(`Domain module "${moduleId}" is missing a kind`);
  }
  if (input.transport.protocol.trim().length === 0) {
    throw new Error(`Domain module "${moduleId}" is missing a transport protocol`);
  }
  return { moduleId, versionValue };
}

/** Resolve a timeout from optional input, clamped to a minimum. */
function resolveTimeoutMs(raw: number | undefined, defaultMs: number): number {
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return Math.max(MIN_TIMEOUT_MS, Math.floor(raw));
  }
  return defaultMs;
}

/** Normalize and filter capabilities from raw input. */
function normalizeCapabilities(
  raw: DomainModuleDescriptorInput["capabilities"],
): DomainModuleDescriptor["capabilities"] {
  return (raw ?? [])
    .map((capability) => ({
      capabilityId: capability.capabilityId.trim(),
      name: capability.name.trim(),
      description: capability.description.trim(),
      ...(capability.version ? { version: capability.version.trim() } : {}),
    }))
    .filter(
      (capability) =>
        capability.capabilityId.length > 0 &&
        capability.name.length > 0 &&
        capability.description.length > 0,
    );
}

/**
 * Normalize raw module inputs into a fully-validated {@link DomainModuleDescriptor}.
 *
 * Applies route normalization, capability validation, and version coercion so that
 * downstream consumers can trust the descriptor's shape without re-validating.
 *
 * @param input - Unvalidated descriptor input.
 * @returns A validated descriptor safe for registry insertion.
 */
export function createDomainModuleDescriptor(
  input: DomainModuleDescriptorInput,
): DomainModuleDescriptor {
  const { moduleId, versionValue } = validateDomainModuleInput(input);

  const normalizedRoutes = normalizeDomainRouteList(input.routes ?? []);
  const capabilities = normalizeCapabilities(input.capabilities);

  const healthProbes = normalizeHealthProbes(input.health?.probes ?? [], moduleId);
  const health: DomainModuleHealthDescriptor = {
    state: input.health?.state ?? "unknown",
    probes: healthProbes,
    healthProfile: input.health?.healthProfile ?? "standard",
  };
  const reason = input.health?.reason?.trim();
  if (reason) {
    health.reason = reason;
  }

  const startup: ModuleStartupDescriptor = {
    order: input.startup?.order ?? DEFAULT_STARTUP_ORDER,
    timeoutMs: resolveTimeoutMs(input.startup?.timeoutMs, DEFAULT_STARTUP_TIMEOUT_MS),
    requiresDependencies: input.startup?.requiresDependencies ?? false,
  };

  const shutdown: ModuleShutdownDescriptor = {
    order: input.shutdown?.order ?? DEFAULT_SHUTDOWN_ORDER,
    timeoutMs: resolveTimeoutMs(input.shutdown?.timeoutMs, DEFAULT_SHUTDOWN_TIMEOUT_MS),
  };

  const descriptor: DomainModuleDescriptor = {
    moduleId,
    kind: input.kind,
    version: versionValue,
    moduleVersion: versionValue,
    description: input.description.trim(),
    dependencies: normalizeOrderedStringList(input.dependencies ?? []),
    capabilities,
    routes: normalizedRoutes,
    transport: normalizeTransportProfile(input.transport, input.transportNegotiation),
    health,
    startup,
    shutdown,
    configSchema: input.configSchema,
    contractFingerprint: "",
  };

  return {
    ...descriptor,
    contractFingerprint: resolveDomainModuleContractFingerprint(descriptor),
  };
}

/**
 * Resolve deterministic contract fingerprint for module descriptors.
 *
 * Uses the shared Bao SHA-256 helper for compact, collision-resistant fingerprints.
 *
 * @param descriptor - Domain module descriptor.
 * @returns Deterministic SHA-256 hex fingerprint.
 */
export function resolveDomainModuleContractFingerprint(descriptor: DomainModuleDescriptor): string {
  const { contractFingerprint: _ignore, runtimeExtensions: _runtime, ...payload } = descriptor;
  const stable = toStableSnapshot(payload);
  return sha256Hex(stable);
}

/**
 * Resolve domain routes from raw `METHOD /path` contract data.
 *
 * @param routes - Contract routes like `GET /health`.
 * @returns Normalized route descriptor list.
 */
export function resolveDomainRoutesFromContractRoutes(
  routes: readonly string[],
): DomainRouteDescriptor[] {
  return normalizeDomainRouteList(routes.map(resolveDomainRouteFromString));
}

/**
 * Resolve module startup order with cycle/missing dependency detection.
 *
 * @param modules - Candidate module descriptors.
 * @returns Ordered startup result with cycle and missing dependency diagnostics.
 */
export function resolveDomainModuleDependencyOrder(
  modules: readonly DomainModuleDescriptor[],
): DomainModuleDependencyResolution {
  const moduleMap = new Map<string, DomainModuleDescriptor>(
    modules
      .filter((item) => typeof item.moduleId === "string" && item.moduleId.trim().length > 0)
      .map((item) => [item.moduleId, item]),
  );
  const adjacency: Record<string, readonly string[]> = {};
  const missingDependencies: Record<string, string[]> = {};
  const visitState = new Map<string, "visiting" | "visited">();
  const order: string[] = [];
  const cycles: string[][] = [];

  const visit = (moduleId: string, lineage: string[]): void => {
    if (visitState.get(moduleId) === "visited") {
      return;
    }

    if (visitState.get(moduleId) === "visiting") {
      const cycleStart = lineage.indexOf(moduleId);
      if (cycleStart >= 0) {
        cycles.push([...lineage.slice(cycleStart), moduleId]);
      }
      return;
    }

    const descriptor = moduleMap.get(moduleId);
    if (!descriptor) {
      return;
    }

    visitState.set(moduleId, "visiting");

    const dependencies = normalizeOrderedStringList(descriptor.dependencies);
    adjacency[moduleId] = dependencies;

    for (const dependency of dependencies) {
      if (!moduleMap.has(dependency)) {
        const missing = missingDependencies[moduleId] ?? [];
        missing.push(dependency);
        missingDependencies[moduleId] = normalizeOrderedStringList(missing);
        continue;
      }
      visit(dependency, [...lineage, moduleId]);
    }

    visitState.set(moduleId, "visited");
    order.push(moduleId);
  };

  const moduleIds = normalizeOrderedStringList([...moduleMap.keys()]);
  for (const moduleId of moduleIds) {
    visit(moduleId, []);
  }

  const hasErrors = cycles.length > 0 || Object.keys(missingDependencies).length > 0;

  const graph: DomainDependencyGraph = {
    modules: moduleIds,
    adjacency,
    order: hasErrors ? [] : order,
    cycles,
    missingDependencies,
  };

  if (!hasErrors) {
    return {
      ok: true,
      graph,
    };
  }

  return {
    ok: false,
    graph,
    message: "Module dependency graph contains cycles or missing dependencies.",
  };
}
