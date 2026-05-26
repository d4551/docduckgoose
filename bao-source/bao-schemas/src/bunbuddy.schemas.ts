/**
 * Shared hardware bunbuddy contracts (schemas + types).
 *
 * Defines canonical payload shapes for bunbuddy services (USB/BLE/Lighting/Basler/Printer/Industrial/IoT/Scanner/Drone/Robotics/Perception/RPA/Vision/Gaussian/Scoutdumpling)
 * so the server and bunbuddies can share a single source of truth for discovery payloads.
 *
 * @shared/schemas/bunbuddy.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
  TUnknown,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { BUNBUDDY_KINDS, type BunBuddyKind } from "./generated/bunbuddy-kinds.generated.ts";

export { BUNBUDDY_KINDS, type BunBuddyKind };

const SCOUTDUMPLING_BUNBUDDY_KIND = "scoutdumpling" satisfies BunBuddyKind;

/**
 * Hardware-facing bunbuddy kinds (excludes research-only workloads).
 */
export const BUNBUDDY_HARDWARE_KINDS: readonly BunBuddyKind[] = BUNBUDDY_KINDS.filter(
  (kind) => kind !== SCOUTDUMPLING_BUNBUDDY_KIND,
);

/**
 * Lookup set for supported bunbuddy kinds.
 */
export const BUNBUDDY_KIND_SET: Set<BunBuddyKind> = new Set(BUNBUDDY_KINDS);

/**
 * Lookup set for hardware bunbuddy kinds.
 */
export const BUNBUDDY_HARDWARE_KIND_SET: Set<BunBuddyKind> = new Set(BUNBUDDY_HARDWARE_KINDS);

/**
 * Determine whether a value is a supported bunbuddy kind.
 *
 * @param value - Candidate value to check.
 * @returns True when the value is a valid {@link BunBuddyKind}.
 */
export function isBunBuddyKind(value: string | null | undefined): value is BunBuddyKind {
  if (!value) {
    return false;
  }
  return BUNBUDDY_KIND_SET.has(value as BunBuddyKind);
}

/**
 * Determine whether a value is a hardware bunbuddy kind.
 *
 * @param value - Candidate value to check.
 * @returns True when the value is a hardware {@link BunBuddyKind}.
 */
export function isHardwareBunBuddyKind(value: string | null | undefined): value is BunBuddyKind {
  return isBunBuddyKind(value) && value !== SCOUTDUMPLING_BUNBUDDY_KIND;
}

/**
 * Canonical bunbuddy kind schema.
 */
export const BunBuddyKindSchema: TUnion<
  [
    TLiteral<
      | "basler"
      | "ble"
      | "dimsum"
      | "drone"
      | "gaussian"
      | "industrial"
      | "iot"
      | "lighting"
      | "perception"
      | "printer"
      | "robotics"
      | "rpa"
      | "scanner"
      | "scoutdumpling"
      | "usb"
      | "vision"
    >,
    ...TLiteral<
      | "basler"
      | "ble"
      | "dimsum"
      | "drone"
      | "gaussian"
      | "industrial"
      | "iot"
      | "lighting"
      | "perception"
      | "printer"
      | "robotics"
      | "rpa"
      | "scanner"
      | "scoutdumpling"
      | "usb"
      | "vision"
    >[],
  ]
> = stringEnum(BUNBUDDY_KINDS, {});

/**
 * Canonical bunbuddy device types.
 *
 * @remarks
 * This vocabulary is intentionally aligned to what the server stores in Prisma (`Device.deviceType`)
 * and what the device classifier already emits. BunBuddies may include additional metadata fields,
 * but `type` should remain within this controlled vocabulary.
 */
export const BUNBUDDY_DEVICE_TYPES: readonly [
  "camera",
  "depth-camera",
  "tracking-camera",
  "xr-headset",
  "imager",
  "basler",
  "lighting",
  "printer",
  "barcode-scanner",
  "environmental-sensor",
  "modbus-device",
  "sensor",
  "controller",
  "microphone",
  "speaker",
  "headset",
  "footpedal",
  "hid",
  "serial",
  "usb",
  "ble",
  "network",
  "3d-scanner",
  "turntable",
  "quadcopter",
  "hexacopter",
  "octocopter",
  "fixed-wing",
  "rc-car",
  "ground-rover",
  "drone",
  "robot",
  "other",
] = [
  "camera",
  "depth-camera",
  "tracking-camera",
  "xr-headset",
  "imager",
  "basler",
  "lighting",
  "printer",
  "barcode-scanner",
  "environmental-sensor",
  "modbus-device",
  "sensor",
  "controller",
  "microphone",
  "speaker",
  "headset",
  "footpedal",
  "hid",
  "serial",
  "usb",
  "ble",
  "network",
  "3d-scanner",
  "turntable",
  "quadcopter",
  "hexacopter",
  "octocopter",
  "fixed-wing",
  "rc-car",
  "ground-rover",
  "drone",
  "robot",
  "other",
] as const;

/**
 * Type-safe bunbuddy device type enumeration.
 */
export type BunBuddyDeviceType = (typeof BUNBUDDY_DEVICE_TYPES)[number];

/**
 * Canonical bunbuddy device type schema.
 */
export const BunBuddyDeviceTypeSchema = stringEnum(BUNBUDDY_DEVICE_TYPES, {});

/**
 * Canonical discovery metadata published on every bunbuddy device entry.
 */
export const BunBuddyDiscoverySchema: TObject<
  {
    readonly transport: TString;
    readonly source: TUnion<
      [
        TLiteral<
          | "basler"
          | "lighting"
          | "printer"
          | "usb"
          | "ble"
          | "drone"
          | "dimsum"
          | "gaussian"
          | "industrial"
          | "iot"
          | "perception"
          | "robotics"
          | "rpa"
          | "scanner"
          | "scoutdumpling"
          | "vision"
        >,
        ...TLiteral<
          | "basler"
          | "lighting"
          | "printer"
          | "usb"
          | "ble"
          | "drone"
          | "dimsum"
          | "gaussian"
          | "industrial"
          | "iot"
          | "perception"
          | "robotics"
          | "rpa"
          | "scanner"
          | "scoutdumpling"
          | "vision"
        >[],
      ]
    >;
    readonly timestamp: TString;
    readonly metadata: TOptional<TRecord<TString, TUnknown>>;
  },
  "transport" | "source" | "timestamp",
  "metadata"
> = TypeExports.Object(
  {
    transport: TypeExports.String({ minLength: 1 }),
    source: BunBuddyKindSchema,
    timestamp: TypeExports.String({ minLength: 1 }),
    metadata: TypeExports.Optional(TypeExports.Record(TypeExports.String(), TypeExports.Unknown())),
  },
  { additionalProperties: true },
);

/**
 * Canonical device entry emitted by bunbuddies.
 *
 * @remarks
 * BunBuddies are allowed to include additional properties, but the canonical fields below
 * must be present and consistently typed.
 */
export const BunBuddyDeviceSchema = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    type: BunBuddyDeviceTypeSchema,
    connected: TypeExports.Boolean(),
    discovery: BunBuddyDiscoverySchema,

    vendorId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    productId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    serialNumber: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    macAddress: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    ipAddress: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    hostname: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    urn: TypeExports.Optional(TypeExports.String({ minLength: 1 })),

    manufacturer: TypeExports.Optional(TypeExports.String()),
    product: TypeExports.Optional(TypeExports.String()),
    hardwareRevision: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    interfaceClass: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    serviceUuids: TypeExports.Optional(TypeExports.Array(TypeExports.String({ minLength: 1 }))),

    capabilities: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.Unknown()),
    ),
    simulated: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for canonical bunbuddy devices.
 */
export type BunBuddyDevice = Static<typeof BunBuddyDeviceSchema>;

/**
 * Canonical list response metadata.
 */
export const BunBuddyListMetaSchema: TObject<
  {
    readonly cached: TBoolean;
    readonly total: TInteger;
    readonly simulation: TOptional<TBoolean>;
  },
  "cached" | "total",
  "simulation"
> = TypeExports.Object(
  {
    cached: TypeExports.Boolean(),
    total: TypeExports.Integer({ minimum: 0 }),
    simulation: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: true },
);

/**
 * Canonical bunbuddy list response.
 */
export const BunBuddyListResponseSchema = TypeExports.Object(
  {
    devices: TypeExports.Array(BunBuddyDeviceSchema),
    meta: BunBuddyListMetaSchema,
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for canonical list responses.
 */
export type BunBuddyListResponse = Static<typeof BunBuddyListResponseSchema>;

/**
 * Canonical bunbuddy health response (minimum contract).
 */
export const BunBuddyHealthSchema = TypeExports.Object(
  {
    status: TypeExports.Union([TypeExports.Literal("ok"), TypeExports.Literal("degraded")]),
    service: TypeExports.String({ minLength: 1 }),
    version: TypeExports.String({ minLength: 1 }),
    simulation: TypeExports.Optional(TypeExports.Boolean()),
    host: TypeExports.Optional(TypeExports.Unknown()),
    guidance: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
    capabilities: TypeExports.Optional(TypeExports.Unknown()),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for canonical bunbuddy health.
 */
export type BunBuddyHealth = Static<typeof BunBuddyHealthSchema>;

/**
 * Canonical resource/capacity metric schema for bunbuddies.
 */
export const BunBuddyCapacityMetricSchema: TObject<
  {
    readonly used: TOptional<TNumber>;
    readonly total: TOptional<TNumber>;
    readonly utilizationPct: TOptional<TNumber>;
  },
  never,
  InferOptionalKeys<{
    readonly used: TOptional<TNumber>;
    readonly total: TOptional<TNumber>;
    readonly utilizationPct: TOptional<TNumber>;
  }>
> = TypeExports.Object(
  {
    used: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    total: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
    utilizationPct: TypeExports.Optional(TypeExports.Number({ minimum: 0, maximum: 100 })),
  },
  { additionalProperties: true },
);

/**
 * Canonical concurrency capacity schema for bunbuddies.
 */
export const BunBuddyCapacityConcurrencySchema: TObject<
  {
    readonly inFlight: TOptional<TInteger>;
    readonly max: TOptional<TInteger>;
    readonly queueDepth: TOptional<TInteger>;
    readonly maxQueueDepth: TOptional<TInteger>;
  },
  never,
  InferOptionalKeys<{
    readonly inFlight: TOptional<TInteger>;
    readonly max: TOptional<TInteger>;
    readonly queueDepth: TOptional<TInteger>;
    readonly maxQueueDepth: TOptional<TInteger>;
  }>
> = TypeExports.Object(
  {
    inFlight: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    max: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    queueDepth: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
    maxQueueDepth: TypeExports.Optional(TypeExports.Integer({ minimum: 0 })),
  },
  { additionalProperties: true },
);

/**
 * Canonical bunbuddy capacity summary (throughput + resource utilization).
 */
export const BunBuddyCapacitySchema = TypeExports.Object(
  {
    concurrency: TypeExports.Optional(BunBuddyCapacityConcurrencySchema),
    cpu: TypeExports.Optional(BunBuddyCapacityMetricSchema),
    memory: TypeExports.Optional(BunBuddyCapacityMetricSchema),
    gpu: TypeExports.Optional(BunBuddyCapacityMetricSchema),
    throughputPerMinute: TypeExports.Optional(TypeExports.Number({ minimum: 0 })),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for canonical bunbuddy capacity.
 */
export type BunBuddyCapacity = Static<typeof BunBuddyCapacitySchema>;

/**
 * Canonical bunbuddy capabilities response (minimum contract).
 */
export const BunBuddyCapabilitiesSchema = TypeExports.Object(
  {
    status: TypeExports.Union([TypeExports.Literal("ok"), TypeExports.Literal("degraded")]),
    service: TypeExports.String({ minLength: 1 }),
    version: TypeExports.String({ minLength: 1 }),
    features: TypeExports.Record(TypeExports.String(), TypeExports.Boolean()),
    protocols: TypeExports.Optional(
      TypeExports.Array(
        TypeExports.Union([
          TypeExports.String({ minLength: 1 }),
          TypeExports.Object(
            {
              protocol: TypeExports.String({ minLength: 1 }),
              available: TypeExports.Boolean(),
              name: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
              version: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
            },
            { additionalProperties: false },
          ),
        ]),
      ),
    ),
    endpoints: TypeExports.Array(TypeExports.String({ minLength: 1 })),
    libraries: TypeExports.Optional(
      TypeExports.Record(TypeExports.String(), TypeExports.String(), {
        description: "Dependency/library versions reported by the bunbuddy",
      }),
    ),
    capacity: TypeExports.Optional(BunBuddyCapacitySchema),
    notes: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
    timestamp: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: true },
);

/**
 * TypeScript type for canonical bunbuddy capabilities.
 */
export type BunBuddyCapabilities = Static<typeof BunBuddyCapabilitiesSchema>;

// Circuit Breaker Schemas

/**
 * Circuit breaker state values.
 */
export const CIRCUIT_STATES: readonly ["closed", "open", "half_open"] = [
  "closed",
  "open",
  "half_open",
] as const;

/**
 * Type-safe circuit state enumeration.
 */
export type BunBuddyCircuitState = (typeof CIRCUIT_STATES)[number];

/**
 * Circuit state schema for OpenAPI documentation.
 */
export const BunBuddyCircuitStateSchema: TUnion<
  [TLiteral<"closed" | "open" | "half_open">, ...TLiteral<"closed" | "open" | "half_open">[]]
> = stringEnum(CIRCUIT_STATES, {
  description: "Circuit breaker state",
});

/**
 * Circuit breaker configuration schema.
 */
export const BunBuddyCircuitBreakerConfigSchema: TObject<
  {
    readonly failureThreshold: TInteger;
    readonly recoveryTimeout: TInteger;
    readonly successThreshold: TInteger;
    readonly failureWindow: TInteger;
  },
  "failureThreshold" | "recoveryTimeout" | "successThreshold" | "failureWindow",
  never
> = TypeExports.Object(
  {
    failureThreshold: TypeExports.Integer({
      minimum: 1,
      description: "Number of failures before opening circuit",
    }),
    recoveryTimeout: TypeExports.Integer({
      minimum: 1000,
      description: "Time in ms before attempting recovery",
    }),
    successThreshold: TypeExports.Integer({
      minimum: 1,
      description: "Number of successes in half_open to close circuit",
    }),
    failureWindow: TypeExports.Integer({
      minimum: 1000,
      description: "Time window in ms for failure counting",
    }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for circuit breaker configuration.
 */
export type BunBuddyCircuitBreakerConfig = Static<typeof BunBuddyCircuitBreakerConfigSchema>;

/**
 * BunBuddy circuit state data schema.
 */
export const BunBuddyCircuitSchema: TObject<
  {
    readonly state: TUnion<
      [TLiteral<"closed" | "open" | "half_open">, ...TLiteral<"closed" | "open" | "half_open">[]]
    >;
    readonly failures: TInteger;
    readonly successes: TInteger;
    readonly lastFailure: TUnion<(TInteger | TNull)[]>;
    readonly lastSuccess: TUnion<(TInteger | TNull)[]>;
    readonly openedAt: TUnion<(TInteger | TNull)[]>;
    readonly failureTimestamps: TArray<TInteger>;
    readonly lastError: TUnion<(TString | TNull)[]>;
  },
  | "lastFailure"
  | "lastSuccess"
  | "openedAt"
  | "failureTimestamps"
  | "lastError"
  | "state"
  | "failures"
  | "successes",
  never
> = TypeExports.Object(
  {
    state: BunBuddyCircuitStateSchema,
    failures: TypeExports.Integer({
      minimum: 0,
      description: "Current failure count within window",
    }),
    successes: TypeExports.Integer({ minimum: 0, description: "Success count in half_open state" }),
    lastFailure: TypeExports.Union([TypeExports.Integer(), TypeExports.Null()], {
      description: "Timestamp of last failure (Unix ms)",
    }),
    lastSuccess: TypeExports.Union([TypeExports.Integer(), TypeExports.Null()], {
      description: "Timestamp of last success (Unix ms)",
    }),
    openedAt: TypeExports.Union([TypeExports.Integer(), TypeExports.Null()], {
      description: "Timestamp when circuit was opened (Unix ms)",
    }),
    failureTimestamps: TypeExports.Array(TypeExports.Integer(), {
      description: "Rolling window of failure timestamps",
    }),
    lastError: TypeExports.Union([TypeExports.String(), TypeExports.Null()], {
      description: "Most recent error message",
    }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy circuit state.
 */
export type BunBuddyCircuit = Static<typeof BunBuddyCircuitSchema>;

/**
 * BunBuddy health status schema for API responses.
 */
export const BunBuddyHealthStatusSchema = TypeExports.Object(
  {
    bunbuddy: BunBuddyKindSchema,
    state: BunBuddyCircuitStateSchema,
    available: TypeExports.Boolean({ description: "Whether the bunbuddy can accept requests" }),
    failureCount: TypeExports.Integer({ minimum: 0, description: "Current failure count" }),
    lastFailure: TypeExports.Union(
      [TypeExports.String({ format: "date-time" }), TypeExports.Null()],
      {
        description: "ISO timestamp of last failure",
      },
    ),
    lastSuccess: TypeExports.Union(
      [TypeExports.String({ format: "date-time" }), TypeExports.Null()],
      {
        description: "ISO timestamp of last success",
      },
    ),
    lastError: TypeExports.Union([TypeExports.String(), TypeExports.Null()], {
      description: "Most recent error message",
    }),
    nextAttemptAt: TypeExports.Union(
      [TypeExports.String({ format: "date-time" }), TypeExports.Null()],
      {
        description: "ISO timestamp when next recovery attempt will be made (when circuit is open)",
      },
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy health status.
 */
export type BunBuddyHealthStatus = Static<typeof BunBuddyHealthStatusSchema>;

/**
 * BunBuddy health summary schema for quick status checks.
 */
export const BunBuddyHealthSummarySchema: TObject<
  {
    readonly total: TInteger;
    readonly healthy: TInteger;
    readonly degraded: TInteger;
    readonly unavailable: TInteger;
    readonly timestamp: TString;
  },
  "total" | "healthy" | "degraded" | "unavailable" | "timestamp",
  never
> = TypeExports.Object(
  {
    total: TypeExports.Integer({ minimum: 0, description: "Total number of bunbuddies" }),
    healthy: TypeExports.Integer({
      minimum: 0,
      description: "Number of bunbuddies with closed circuits",
    }),
    degraded: TypeExports.Integer({
      minimum: 0,
      description: "Number of bunbuddies in half_open recovery state",
    }),
    unavailable: TypeExports.Integer({
      minimum: 0,
      description: "Number of bunbuddies with open circuits",
    }),
    timestamp: TypeExports.String({ format: "date-time", description: "Snapshot timestamp" }),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy health summary.
 */
export type BunBuddyHealthSummary = Static<typeof BunBuddyHealthSummarySchema>;

/**
 * BunBuddy WS config numeric value (literal or env-resolved string).
 */
export const BunBuddyWsNumericSchema: TUnion<(TNumber | TString)[]> = TypeExports.Union(
  [TypeExports.Number(), TypeExports.String({ minLength: 1 })],
  {},
);

/**
 * BunBuddy WS realtime relay configuration schema.
 */
export const BunBuddyRealtimeRelayConfigSchema: TObject<
  {
    readonly maxReconnectAttempts: TUnion<(TNumber | TString)[]>;
    readonly reconnectDelayMs: TUnion<(TNumber | TString)[]>;
  },
  "maxReconnectAttempts" | "reconnectDelayMs",
  never
> = TypeExports.Object(
  {
    maxReconnectAttempts: BunBuddyWsNumericSchema,
    reconnectDelayMs: BunBuddyWsNumericSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy WS realtime relay config.
 */
export type BunBuddyRealtimeRelayConfig = Static<typeof BunBuddyRealtimeRelayConfigSchema>;

/**
 * BunBuddy WS realtime relay bounds schema.
 */
export const BunBuddyRealtimeRelayBoundsSchema: TObject<
  {
    readonly min: TUnion<(TNumber | TString)[]>;
    readonly max: TUnion<(TNumber | TString)[]>;
  },
  "min" | "max",
  never
> = TypeExports.Object(
  {
    min: BunBuddyWsNumericSchema,
    max: BunBuddyWsNumericSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy WS realtime relay bounds.
 */
export type BunBuddyRealtimeRelayBounds = Static<typeof BunBuddyRealtimeRelayBoundsSchema>;

/**
 * BunBuddy WS realtime relay bounds configuration schema.
 */
export const BunBuddyRealtimeRelayBoundsConfigSchema: TObject<
  {
    readonly maxReconnectAttempts: TObject<
      {
        readonly min: TUnion<(TNumber | TString)[]>;
        readonly max: TUnion<(TNumber | TString)[]>;
      },
      "min" | "max",
      never
    >;
    readonly reconnectDelayMs: TObject<
      {
        readonly min: TUnion<(TNumber | TString)[]>;
        readonly max: TUnion<(TNumber | TString)[]>;
      },
      "min" | "max",
      never
    >;
  },
  "maxReconnectAttempts" | "reconnectDelayMs",
  never
> = TypeExports.Object(
  {
    maxReconnectAttempts: BunBuddyRealtimeRelayBoundsSchema,
    reconnectDelayMs: BunBuddyRealtimeRelayBoundsSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy WS realtime relay bounds config.
 */
export type BunBuddyRealtimeRelayBoundsConfig = Static<
  typeof BunBuddyRealtimeRelayBoundsConfigSchema
>;

/**
 * BunBuddy WS config schema for runtime configuration.
 */
export const BunBuddyWsConfigSchema = TypeExports.Object(
  {
    defaults: TypeExports.Object(
      {
        drone: BunBuddyRealtimeRelayConfigSchema,
        scanner: BunBuddyRealtimeRelayConfigSchema,
      },
      { additionalProperties: false },
    ),
    bounds: BunBuddyRealtimeRelayBoundsConfigSchema,
    drone: BunBuddyRealtimeRelayConfigSchema,
    scanner: BunBuddyRealtimeRelayConfigSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy WS config.
 */
export type BunBuddyWsConfig = Static<typeof BunBuddyWsConfigSchema>;
