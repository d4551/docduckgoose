/**
 * Canonical port resolution contracts.
 *
 * Shared domain models for deterministic port assignment and manifest snapshots.
 */

/**
 * Port ownership role used for reserved-range policy checks.
 */
export type PortRole =
  | "core"
  | "bunbuddy"
  | "infrastructure"
  | "monitoring"
  | "storage"
  | "health"
  | "ai";

/**
 * Port specification for one service.
 */
export interface PortSpec {
  /** Canonical service key. */
  readonly service: string;
  /** Logical ownership role. */
  readonly role: PortRole;
  /** Default port from canonical defaults. */
  readonly defaultPort: number;
  /** Ordered environment override keys. */
  readonly envKeys: readonly string[];
}

/**
 * Input for deterministic port resolution.
 */
export interface PortResolveInput {
  /** Canonical service key or alias. */
  readonly serviceName: string;
  /** Optional deterministic env overrides. */
  readonly envOverrides?: Record<string, string | undefined>;
  /** Optional manifest snapshot for manifest-source lookups. */
  readonly manifest?: PortManifestSnapshot | null;
  /** Optional preferred candidate to try before fallback sources. */
  readonly preferredPort?: number;
}

/**
 * Collision descriptor for two services sharing the same assigned port.
 */
export interface PortCollision {
  /** First service involved in a collision. */
  readonly serviceA: string;
  /** Second service involved in a collision. */
  readonly serviceB: string;
  /** Duplicate port value. */
  readonly port: number;
}

/**
 * Severity level for port allocation diagnostics.
 *
 * - `error`: Hard failure — the port assignment is invalid and must be fixed.
 * - `warning`: Advisory — the assignment works but violates a best-practice policy.
 */
export type PortAllocationSeverity = "error" | "warning";

/**
 * Typed port allocation diagnostic.
 */
export interface PortAllocationError {
  /** Stable machine-readable error code. */
  readonly code:
    | "unknown_service"
    | "invalid_port"
    | "port_collision"
    | "reserved_range_violation"
    | "missing_default";
  /**
   * Severity level.
   *
   * - `error`: blocks artifact writing (invalid port, collision, unknown service).
   * - `warning`: logged but does not block (range policy hint).
   */
  readonly severity: PortAllocationSeverity;
  /** Human-readable failure message. */
  readonly message: string;
  /** Optional service context. */
  readonly service?: string;
}

/**
 * Canonical manifest snapshot stored in `run/ports.json`.
 */
export interface PortManifestSnapshot {
  /** Manifest schema version. */
  readonly schemaVersion: number;
  /** Resolver implementation version. */
  readonly resolverVersion: string;
  /** Source writer identifier (e.g. configure, port-manager). */
  readonly assignedBy: string;
  /** ISO timestamp when resolved. */
  readonly resolvedAt: string;
  /** Canonical service assignments; numeric or rich entry with `port`. */
  readonly services: Record<string, number | { readonly port: number }>;
}

/**
 * Deterministic resolution output for one service.
 */
export interface PortResolveResult {
  /** Canonical service key (when resolvable). */
  readonly service: string;
  /** Final assigned port value (undefined when unresolved). */
  readonly port: number | undefined;
  /** Resolution source selected by precedence. */
  readonly source: "preferred" | "env" | "manifest" | "default" | "unknown";
  /** Stable fingerprint derived from canonical service+port assignments. */
  readonly fingerprint: string;
  /** Detected collision set for the active resolution set. */
  readonly collisions: readonly PortCollision[];
  /** Typed resolution/allocation errors. */
  readonly errors: readonly PortAllocationError[];
}
