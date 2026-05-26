/**
 * Shared hardware bunbuddy contracts (schemas + types).
 *
 * Defines canonical payload shapes for bunbuddy services (USB/BLE/Lighting/Basler/Printer/Industrial/IoT/Scanner/Drone/Robotics/Perception/RPA/Vision/Gaussian/Scoutdumpling)
 * so the server and bunbuddies can share a single source of truth for discovery payloads.
 *
 * @shared/schemas/bunbuddy.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { BUNBUDDY_KINDS, type BunBuddyKind } from "./generated/bunbuddy-kinds.generated.ts";

export { BUNBUDDY_KINDS, type BunBuddyKind };

/**
 * Lookup set for supported bunbuddy kinds.
 */
export const BUNBUDDY_KIND_SET: Set<BunBuddyKind> = new Set(BUNBUDDY_KINDS);

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
 * Canonical bunbuddy kind schema.
 */
export const BunBuddyKindSchema: Type.TUnion<
  [
    Type.TLiteral<
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
    ...Type.TLiteral<
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
export const BunBuddyDiscoverySchema: Type.TObject<
  {
    readonly transport: Type.TString;
    readonly source: Type.TUnion<
      [
        Type.TLiteral<
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
        ...Type.TLiteral<
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
    readonly timestamp: Type.TString;
    readonly metadata: Type.TOptional<Type.TRecord<Type.TString, Type.TUnknown>>;
  },
  "transport" | "source" | "timestamp",
  "metadata"
> = Type.Object(
  {
    transport: Type.String({ minLength: 1 }),
    source: BunBuddyKindSchema,
    timestamp: Type.String({ minLength: 1 }),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
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
export const BunBuddyDeviceSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    type: BunBuddyDeviceTypeSchema,
    connected: Type.Boolean(),
    discovery: BunBuddyDiscoverySchema,

    vendorId: Type.Optional(Type.String({ minLength: 1 })),
    productId: Type.Optional(Type.String({ minLength: 1 })),
    serialNumber: Type.Optional(Type.String({ minLength: 1 })),
    macAddress: Type.Optional(Type.String({ minLength: 1 })),
    ipAddress: Type.Optional(Type.String({ minLength: 1 })),
    hostname: Type.Optional(Type.String({ minLength: 1 })),
    urn: Type.Optional(Type.String({ minLength: 1 })),

    manufacturer: Type.Optional(Type.String()),
    product: Type.Optional(Type.String()),
    hardwareRevision: Type.Optional(Type.String({ minLength: 1 })),
    interfaceClass: Type.Optional(Type.String({ minLength: 1 })),
    serviceUuids: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),

    capabilities: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    simulated: Type.Optional(Type.Boolean()),
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
export const BunBuddyListMetaSchema: Type.TObject<
  {
    readonly cached: Type.TBoolean;
    readonly total: Type.TInteger;
    readonly simulation: Type.TOptional<Type.TBoolean>;
  },
  "cached" | "total",
  "simulation"
> = Type.Object(
  {
    cached: Type.Boolean(),
    total: Type.Integer({ minimum: 0 }),
    simulation: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: true },
);

/**
 * Canonical bunbuddy list response.
 */
export const BunBuddyListResponseSchema = Type.Object(
  {
    devices: Type.Array(BunBuddyDeviceSchema),
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
export const BunBuddyHealthSchema = Type.Object(
  {
    status: Type.Union([Type.Literal("ok"), Type.Literal("degraded")]),
    service: Type.String({ minLength: 1 }),
    version: Type.String({ minLength: 1 }),
    simulation: Type.Optional(Type.Boolean()),
    host: Type.Optional(Type.Unknown()),
    guidance: Type.Optional(Type.Array(Type.String())),
    capabilities: Type.Optional(Type.Unknown()),
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
export const BunBuddyCapacityMetricSchema: Type.TObject<
  {
    readonly used: Type.TOptional<Type.TNumber>;
    readonly total: Type.TOptional<Type.TNumber>;
    readonly utilizationPct: Type.TOptional<Type.TNumber>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly used: Type.TOptional<Type.TNumber>;
    readonly total: Type.TOptional<Type.TNumber>;
    readonly utilizationPct: Type.TOptional<Type.TNumber>;
  }>
> = Type.Object(
  {
    used: Type.Optional(Type.Number({ minimum: 0 })),
    total: Type.Optional(Type.Number({ minimum: 0 })),
    utilizationPct: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
  },
  { additionalProperties: true },
);

/**
 * Canonical concurrency capacity schema for bunbuddies.
 */
export const BunBuddyCapacityConcurrencySchema: Type.TObject<
  {
    readonly inFlight: Type.TOptional<Type.TInteger>;
    readonly max: Type.TOptional<Type.TInteger>;
    readonly queueDepth: Type.TOptional<Type.TInteger>;
    readonly maxQueueDepth: Type.TOptional<Type.TInteger>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly inFlight: Type.TOptional<Type.TInteger>;
    readonly max: Type.TOptional<Type.TInteger>;
    readonly queueDepth: Type.TOptional<Type.TInteger>;
    readonly maxQueueDepth: Type.TOptional<Type.TInteger>;
  }>
> = Type.Object(
  {
    inFlight: Type.Optional(Type.Integer({ minimum: 0 })),
    max: Type.Optional(Type.Integer({ minimum: 0 })),
    queueDepth: Type.Optional(Type.Integer({ minimum: 0 })),
    maxQueueDepth: Type.Optional(Type.Integer({ minimum: 0 })),
  },
  { additionalProperties: true },
);

/**
 * Canonical bunbuddy capacity summary (throughput + resource utilization).
 */
export const BunBuddyCapacitySchema = Type.Object(
  {
    concurrency: Type.Optional(BunBuddyCapacityConcurrencySchema),
    cpu: Type.Optional(BunBuddyCapacityMetricSchema),
    memory: Type.Optional(BunBuddyCapacityMetricSchema),
    gpu: Type.Optional(BunBuddyCapacityMetricSchema),
    throughputPerMinute: Type.Optional(Type.Number({ minimum: 0 })),
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
export const BunBuddyCapabilitiesSchema = Type.Object(
  {
    status: Type.Union([Type.Literal("ok"), Type.Literal("degraded")]),
    service: Type.String({ minLength: 1 }),
    version: Type.String({ minLength: 1 }),
    features: Type.Record(Type.String(), Type.Boolean()),
    protocols: Type.Optional(
      Type.Array(
        Type.Union([
          Type.String({ minLength: 1 }),
          Type.Object(
            {
              protocol: Type.String({ minLength: 1 }),
              available: Type.Boolean(),
              name: Type.Optional(Type.String({ minLength: 1 })),
              version: Type.Optional(Type.String({ minLength: 1 })),
            },
            { additionalProperties: false },
          ),
        ]),
      ),
    ),
    endpoints: Type.Array(Type.String({ minLength: 1 })),
    libraries: Type.Optional(
      Type.Record(Type.String(), Type.String(), {
        description: "Dependency/library versions reported by the bunbuddy",
      }),
    ),
    capacity: Type.Optional(BunBuddyCapacitySchema),
    notes: Type.Optional(Type.Array(Type.String())),
    timestamp: Type.Optional(Type.String({ minLength: 1 })),
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
export const BunBuddyCircuitStateSchema: Type.TUnion<
  [
    Type.TLiteral<"closed" | "open" | "half_open">,
    ...Type.TLiteral<"closed" | "open" | "half_open">[],
  ]
> = stringEnum(CIRCUIT_STATES, {
  description: "Circuit breaker state",
});

/**
 * Circuit breaker configuration schema.
 */
export const BunBuddyCircuitBreakerConfigSchema: Type.TObject<
  {
    readonly failureThreshold: Type.TInteger;
    readonly recoveryTimeout: Type.TInteger;
    readonly successThreshold: Type.TInteger;
    readonly failureWindow: Type.TInteger;
  },
  "failureThreshold" | "recoveryTimeout" | "successThreshold" | "failureWindow",
  never
> = Type.Object(
  {
    failureThreshold: Type.Integer({
      minimum: 1,
      description: "Number of failures before opening circuit",
    }),
    recoveryTimeout: Type.Integer({
      minimum: 1000,
      description: "Time in ms before attempting recovery",
    }),
    successThreshold: Type.Integer({
      minimum: 1,
      description: "Number of successes in half_open to close circuit",
    }),
    failureWindow: Type.Integer({
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
export const BunBuddyCircuitSchema: Type.TObject<
  {
    readonly state: Type.TUnion<
      [
        Type.TLiteral<"closed" | "open" | "half_open">,
        ...Type.TLiteral<"closed" | "open" | "half_open">[],
      ]
    >;
    readonly failures: Type.TInteger;
    readonly successes: Type.TInteger;
    readonly lastFailure: Type.TUnion<(Type.TInteger | Type.TNull)[]>;
    readonly lastSuccess: Type.TUnion<(Type.TInteger | Type.TNull)[]>;
    readonly openedAt: Type.TUnion<(Type.TInteger | Type.TNull)[]>;
    readonly failureTimestamps: Type.TArray<Type.TInteger>;
    readonly lastError: Type.TUnion<(Type.TString | Type.TNull)[]>;
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
> = Type.Object(
  {
    state: BunBuddyCircuitStateSchema,
    failures: Type.Integer({ minimum: 0, description: "Current failure count within window" }),
    successes: Type.Integer({ minimum: 0, description: "Success count in half_open state" }),
    lastFailure: Type.Union([Type.Integer(), Type.Null()], {
      description: "Timestamp of last failure (Unix ms)",
    }),
    lastSuccess: Type.Union([Type.Integer(), Type.Null()], {
      description: "Timestamp of last success (Unix ms)",
    }),
    openedAt: Type.Union([Type.Integer(), Type.Null()], {
      description: "Timestamp when circuit was opened (Unix ms)",
    }),
    failureTimestamps: Type.Array(Type.Integer(), {
      description: "Rolling window of failure timestamps",
    }),
    lastError: Type.Union([Type.String(), Type.Null()], {
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
export const BunBuddyHealthStatusSchema = Type.Object(
  {
    bunbuddy: BunBuddyKindSchema,
    state: BunBuddyCircuitStateSchema,
    available: Type.Boolean({ description: "Whether the bunbuddy can accept requests" }),
    failureCount: Type.Integer({ minimum: 0, description: "Current failure count" }),
    lastFailure: Type.Union([Type.String({ format: "date-time" }), Type.Null()], {
      description: "ISO timestamp of last failure",
    }),
    lastSuccess: Type.Union([Type.String({ format: "date-time" }), Type.Null()], {
      description: "ISO timestamp of last success",
    }),
    lastError: Type.Union([Type.String(), Type.Null()], {
      description: "Most recent error message",
    }),
    nextAttemptAt: Type.Union([Type.String({ format: "date-time" }), Type.Null()], {
      description: "ISO timestamp when next recovery attempt will be made (when circuit is open)",
    }),
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
export const BunBuddyHealthSummarySchema: Type.TObject<
  {
    readonly total: Type.TInteger;
    readonly healthy: Type.TInteger;
    readonly degraded: Type.TInteger;
    readonly unavailable: Type.TInteger;
    readonly timestamp: Type.TString;
  },
  "total" | "healthy" | "degraded" | "unavailable" | "timestamp",
  never
> = Type.Object(
  {
    total: Type.Integer({ minimum: 0, description: "Total number of bunbuddies" }),
    healthy: Type.Integer({ minimum: 0, description: "Number of bunbuddies with closed circuits" }),
    degraded: Type.Integer({
      minimum: 0,
      description: "Number of bunbuddies in half_open recovery state",
    }),
    unavailable: Type.Integer({
      minimum: 0,
      description: "Number of bunbuddies with open circuits",
    }),
    timestamp: Type.String({ format: "date-time", description: "Snapshot timestamp" }),
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
export const BunBuddyWsNumericSchema: Type.TUnion<(Type.TNumber | Type.TString)[]> = Type.Union(
  [Type.Number(), Type.String({ minLength: 1 })],
  {},
);

/**
 * BunBuddy WS realtime relay configuration schema.
 */
export const BunBuddyRealtimeRelayConfigSchema: Type.TObject<
  {
    readonly maxReconnectAttempts: Type.TUnion<(Type.TNumber | Type.TString)[]>;
    readonly reconnectDelayMs: Type.TUnion<(Type.TNumber | Type.TString)[]>;
  },
  "maxReconnectAttempts" | "reconnectDelayMs",
  never
> = Type.Object(
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
export const BunBuddyRealtimeRelayBoundsSchema: Type.TObject<
  {
    readonly min: Type.TUnion<(Type.TNumber | Type.TString)[]>;
    readonly max: Type.TUnion<(Type.TNumber | Type.TString)[]>;
  },
  "min" | "max",
  never
> = Type.Object(
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
export const BunBuddyRealtimeRelayBoundsConfigSchema: Type.TObject<
  {
    readonly maxReconnectAttempts: Type.TObject<
      {
        readonly min: Type.TUnion<(Type.TNumber | Type.TString)[]>;
        readonly max: Type.TUnion<(Type.TNumber | Type.TString)[]>;
      },
      "min" | "max",
      never
    >;
    readonly reconnectDelayMs: Type.TObject<
      {
        readonly min: Type.TUnion<(Type.TNumber | Type.TString)[]>;
        readonly max: Type.TUnion<(Type.TNumber | Type.TString)[]>;
      },
      "min" | "max",
      never
    >;
  },
  "maxReconnectAttempts" | "reconnectDelayMs",
  never
> = Type.Object(
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
export const BunBuddyWsConfigSchema = Type.Object(
  {
    defaults: Type.Object(
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
