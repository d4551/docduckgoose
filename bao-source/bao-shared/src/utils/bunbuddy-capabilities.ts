/**
 * Shared BunBuddy capabilities payload builders.
 *
 * These helpers provide a canonical capability shape and deterministic status
 * calculation shared by all bunbuddy implementations.
 *
 * @shared/utils/bunbuddy-capabilities
 */

/**
 * Capability lifecycle status.
 */
export type CapabilityStatus = "ok" | "degraded" | "unavailable";

/**
 * Capability endpoint metadata.
 */
export interface EndpointInfo {
  /** HTTP method + route (for example `GET /devices`). */
  route: string;
  /** Optional endpoint description. */
  description?: string;
  /** Whether the endpoint requires authorization. */
  requiresAuth?: boolean;
}

/**
 * Supported transport protocol metadata.
 */
export interface ProtocolInfo {
  /** Transport protocol identifier. */
  protocol: string;
  /** Human-readable protocol name. */
  name: string;
  /** Indicates protocol availability at runtime. */
  available: boolean;
  /** Optional protocol version string. */
  version?: string;
}

/**
 * Device metadata returned in capability payloads.
 */
export interface DeviceInfo {
  /** Device identifier. */
  id: string;
  /** Human-friendly device name. */
  name: string;
  /** Device type vocabulary. */
  type: string;
  /** Current transport connection state. */
  status: "connected" | "disconnected" | "error";
}

/**
 * Cache metadata for capability results.
 */
export interface CacheInfo {
  /** Cache TTL in milliseconds. */
  cacheTtlMs: number;
  /** Cache age in milliseconds or `null` when not available. */
  cacheAgeMs: number | null;
  /** Last cache refresh timestamp (ISO-8601) or `null`. */
  lastScanTime: string | null;
  /** Cached item count. */
  cachedCount: number;
}

/**
 * Capacity utilization sample.
 */
export interface CapacityMetric {
  /** Used capacity in the same units as `total`. */
  used?: number;
  /** Total capacity in the same units as `used`. */
  total?: number;
  /** Derived utilization percentage. */
  utilizationPct?: number;
}

/**
 * Concurrency and queue utilization sample.
 */
export interface CapacityConcurrency {
  /** In-flight request count. */
  inFlight?: number;
  /** Maximum concurrent operations supported. */
  max?: number;
  /** Current queue depth. */
  queueDepth?: number;
  /** Maximum queue depth capacity. */
  maxQueueDepth?: number;
}

/**
 * Capacity summary reported by bunbuddies.
 */
export interface CapacityInfo {
  /** Concurrency metrics. */
  concurrency?: CapacityConcurrency;
  /** CPU usage snapshot. */
  cpu?: CapacityMetric;
  /** Memory usage snapshot. */
  memory?: CapacityMetric;
  /** GPU usage snapshot. */
  gpu?: CapacityMetric;
  /** Throughput in events per minute. */
  throughputPerMinute?: number;
}

/**
 * Arbitrary capability configuration metadata.
 */
export type ConfigInfo = Record<string, unknown>;

/**
 * BunBuddy capability payload returned by `/capabilities`.
 */
export interface CapabilitiesPayload {
  /** Computed capability status. */
  status: CapabilityStatus;
  /** BunBuddy service name. */
  service: string;
  /** Service version string. */
  version: string;
  /** Feature switches exposed by the service. */
  features: Record<string, boolean>;
  /** Library inventory. */
  libraries?: Record<string, string>;
  /** Public endpoints advertised by the service. */
  endpoints: (string | EndpointInfo)[];
  /** Supported protocol list. */
  protocols?: ProtocolInfo[];
  /** Connected devices. */
  devices?: DeviceInfo[];
  /** Human-readable notes. */
  notes: string[];
  /** Cache metadata. */
  cache?: CacheInfo;
  /** Capacity metrics. */
  capacity?: CapacityInfo;
  /** Additional config snapshot. */
  config?: ConfigInfo;
  /** Response timestamp. */
  timestamp: string;
}

/**
 * Inputs for creating a capability payload.
 */
export interface CapabilitiesOptions {
  /** Service name. */
  service: string;
  /** Service version. */
  version: string;
  /** Feature toggles. */
  features?: Record<string, boolean>;
  /** Library inventory map. */
  libraries?: Record<string, string>;
  /** Public endpoint declarations. */
  endpoints?: readonly string[] | EndpointInfo[];
  /** Supported protocols. */
  protocols?: ProtocolInfo[];
  /** Device list. */
  devices?: DeviceInfo[];
  /** Informational notes. */
  notes?: string[];
  /** Cache metadata. */
  cache?: CacheInfo;
  /** Capacity metrics. */
  capacity?: CapacityInfo;
  /** Additional configuration metadata. */
  config?: ConfigInfo;
  /** Explicit status override. */
  status?: CapabilityStatus;
}

/**
 * Inputs for the capabilities plugin factory.
 */
export interface CapabilitiesPluginOptions {
  /** Service name. */
  service: string;
  /** Service version. */
  version: string;
  /** Static feature map or lazy factory. */
  features?: Record<string, boolean> | (() => Record<string, boolean>);
  /** Static library map or lazy factory. */
  libraries?: Record<string, string> | (() => Record<string, string>);
  /** Endpoint definitions (static only). */
  endpoints?: readonly string[] | EndpointInfo[];
  /** Static protocol metadata or lazy factory. */
  protocols?: ProtocolInfo[] | (() => ProtocolInfo[]);
  /** Device list provider (function only). */
  devices?: () => DeviceInfo[];
  /** Static or lazy notes. */
  notes?: string[] | (() => string[]);
  /** Optional cache metadata provider. */
  cache?: () => {
    cacheTtlMs: number;
    cacheAgeMs: number | null;
    lastScanTime: string | null;
    cachedCount: number;
  };
  /** Capacity provider (static or lazy). */
  capacity?: CapacityInfo | (() => CapacityInfo);
  /** Config provider (static or lazy). */
  config?: ConfigInfo | (() => ConfigInfo);
  /** Path for capabilities endpoint. */
  path?: string;
}

/**
 * Compute aggregate capability status.
 *
 * @param features - Feature map.
 * @param protocols - Protocol list.
 * @returns Computed capability status.
 */
export function computeCapabilityStatus(
  features?: Record<string, boolean>,
  protocols?: ProtocolInfo[],
): CapabilityStatus {
  const featureValues = features ? Object.values(features) : [];
  const allFeaturesEnabled = featureValues.every(Boolean);

  const allProtocolsAvailable = protocols
    ? protocols.every((protocol) => protocol.available)
    : true;
  const anyProtocolAvailable = protocols ? protocols.some((protocol) => protocol.available) : true;

  if (!anyProtocolAvailable && protocols && protocols.length > 0) {
    return "unavailable";
  }

  if (!(allFeaturesEnabled && allProtocolsAvailable)) {
    return "degraded";
  }

  return "ok";
}

/**
 * Create notes for unavailable protocols.
 *
 * @param protocols - Protocol definitions.
 * @returns User-facing notes.
 */
export function createProtocolNotes(protocols: ProtocolInfo[]): string[] {
  return protocols
    .filter((protocol) => !protocol.available)
    .map((protocol) => `${protocol.name} unavailable`);
}

/**
 * Create notes for disabled feature flags.
 *
 * @param features - Feature map.
 * @returns User-facing notes.
 */
export function createFeatureNotes(features: Record<string, boolean>): string[] {
  return Object.entries(features)
    .filter(([, enabled]) => !enabled)
    .map(([name]) => `${name} disabled`);
}

/**
 * Normalize static-vs-lazy values used by the plugin factory.
 *
 * @param valueOrFn - A value or function.
 * @returns Concrete value.
 */
export function resolveCapabilitiesValue<T>(valueOrFn: T | (() => T)): T {
  return typeof valueOrFn === "function" ? (valueOrFn as () => T)() : valueOrFn;
}

/**
 * Build a BunBuddy capabilities payload using deterministic defaults.
 *
 * @param options - Capability payload options.
 * @returns Normalized capabilities payload.
 */
export function createCapabilitiesPayload(options: CapabilitiesOptions): CapabilitiesPayload {
  const {
    service,
    version,
    features = {},
    libraries,
    endpoints = [],
    protocols,
    devices,
    notes = [],
    cache,
    capacity,
    config,
    status,
  } = options;

  const computedStatus = status ?? computeCapabilityStatus(features, protocols);
  const mutableEndpoints: (string | EndpointInfo)[] = [...endpoints];

  return {
    status: computedStatus,
    service,
    version,
    features,
    libraries,
    endpoints: mutableEndpoints,
    protocols,
    devices,
    notes,
    cache,
    capacity,
    config,
    timestamp: new Date().toISOString(),
  };
}
