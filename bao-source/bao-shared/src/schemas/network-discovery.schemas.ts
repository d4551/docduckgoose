/**
 * Network discovery schemas.
 *
 * Defines TypeBox schemas for network discovery protocol availability
 * and discovery responses across ONVIF, mDNS, and SSDP endpoints.
 *
 * @shared/schemas/network-discovery.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { QueueJobContextSchema } from "./queue-context.schemas.ts";

// Request Payloads

/**
 * Schema for network discovery request payloads.
 */
export const NetworkDiscoveryRequestSchema: Type.TObject<
  {
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly timeoutMs: Type.TOptional<Type.TUnion<(Type.TString | Type.TNumber)[]>>;
    readonly serviceType: Type.TOptional<Type.TString>;
    readonly searchTarget: Type.TOptional<Type.TString>;
    readonly persist: Type.TOptional<Type.TUnion<(Type.TString | Type.TBoolean)[]>>;
    readonly idempotencyKey: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    timeoutMs: Type.Optional(Type.Union([Type.Number(), Type.String()])),
    serviceType: Type.Optional(Type.String({ minLength: 1 })),
    searchTarget: Type.Optional(Type.String({ minLength: 1 })),
    persist: Type.Optional(Type.Union([Type.Boolean(), Type.String()])),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryRequest schema. */
export type NetworkDiscoveryRequest = Static<typeof NetworkDiscoveryRequestSchema>;

// Protocol Status

/**
 * Schema for protocol availability status.
 */
export const NetworkDiscoveryProtocolStatusSchema: Type.TObject<
  {
    readonly available: Type.TBoolean;
    readonly name: Type.TString;
    readonly description: Type.TString;
    readonly package: Type.TString;
    readonly notes: Type.TOptional<Type.TArray<Type.TString>>;
  },
  "description" | "available" | "name" | "package",
  "notes"
> = Type.Object(
  {
    available: Type.Boolean(),
    name: Type.String({ minLength: 1 }),
    description: Type.String({ minLength: 1 }),
    package: Type.String({ minLength: 1 }),
    notes: Type.Optional(Type.Array(Type.String())),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryProtocolStatus schema. */
export type NetworkDiscoveryProtocolStatus = Static<typeof NetworkDiscoveryProtocolStatusSchema>;

/**
 * Schema for protocol availability counts.
 */
export const NetworkDiscoveryProtocolCountSchema: Type.TObject<
  { readonly available: Type.TBoolean; readonly count: Type.TNumber },
  "available" | "count",
  never
> = Type.Object(
  {
    available: Type.Boolean(),
    count: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryProtocolCount schema. */
export type NetworkDiscoveryProtocolCount = Static<typeof NetworkDiscoveryProtocolCountSchema>;

/**
 * Schema for protocol availability response.
 */
export const NetworkDiscoveryProtocolsResponseSchema = Type.Object(
  {
    ok: Type.Boolean(),
    data: Type.Object(
      {
        onvif: NetworkDiscoveryProtocolStatusSchema,
        mdns: NetworkDiscoveryProtocolStatusSchema,
        ssdp: NetworkDiscoveryProtocolStatusSchema,
      },
      { additionalProperties: false },
    ),
    allAvailable: Type.Boolean(),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryProtocolsResponse schema. */
export type NetworkDiscoveryProtocolsResponse = Static<
  typeof NetworkDiscoveryProtocolsResponseSchema
>;

// Discovery Payloads

/**
 * Schema for discovery timing payloads.
 */
export const NetworkDiscoveryTimingSchema: Type.TObject<
  { readonly durationMs: Type.TNumber; readonly timeoutMs: Type.TNumber },
  "durationMs" | "timeoutMs",
  never
> = Type.Object(
  {
    durationMs: Type.Number({ minimum: 0 }),
    timeoutMs: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryTiming schema. */
export type NetworkDiscoveryTiming = Static<typeof NetworkDiscoveryTimingSchema>;

/**
 * Schema for persistence stats payloads.
 */
export const NetworkDiscoveryPersistenceStatsSchema: Type.TObject<
  {
    readonly persisted: Type.TNumber;
    readonly errors: Type.TArray<Type.TString>;
    readonly queued: Type.TOptional<Type.TBoolean>;
    readonly jobId: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
  },
  "errors" | "persisted",
  Type.InferOptionalKeys<{
    readonly persisted: Type.TNumber;
    readonly errors: Type.TArray<Type.TString>;
    readonly queued: Type.TOptional<Type.TBoolean>;
    readonly jobId: Type.TOptional<Type.TUnion<(Type.TString | Type.TNull)[]>>;
  }>
> = Type.Object(
  {
    persisted: Type.Number({ minimum: 0 }),
    errors: Type.Array(Type.String()),
    queued: Type.Optional(Type.Boolean()),
    jobId: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryPersistenceStats schema. */
export type NetworkDiscoveryPersistenceStats = Static<
  typeof NetworkDiscoveryPersistenceStatsSchema
>;

/**
 * Schema for ONVIF device payloads.
 */
export const NetworkDiscoveryOnvifDeviceSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly name: Type.TString;
    readonly hostname: Type.TString;
    readonly port: Type.TNumber;
    readonly path: Type.TString;
    readonly urn: Type.TString;
    readonly xaddrs: Type.TArray<Type.TString>;
    readonly protocol: Type.TLiteral<"onvif">;
    readonly source: Type.TLiteral<"onvif-discovery">;
    readonly timestamp: Type.TString;
  },
  | "xaddrs"
  | "protocol"
  | "source"
  | "id"
  | "name"
  | "hostname"
  | "port"
  | "path"
  | "urn"
  | "timestamp",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String(),
    hostname: Type.String({ minLength: 1 }),
    port: Type.Number({ minimum: 0 }),
    path: Type.String(),
    urn: Type.String(),
    xaddrs: Type.Array(Type.String()),
    protocol: Type.Literal("onvif"),
    source: Type.Literal("onvif-discovery"),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryOnvifDevice schema. */
export type NetworkDiscoveryOnvifDevice = Static<typeof NetworkDiscoveryOnvifDeviceSchema>;

/**
 * Schema for mDNS service payloads.
 */
export const NetworkDiscoveryMdnsServiceSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly name: Type.TString;
    readonly host: Type.TString;
    readonly port: Type.TNumber;
    readonly type: Type.TString;
    readonly protocol: Type.TUnion<(Type.TLiteral<"tcp"> | Type.TLiteral<"udp">)[]>;
    readonly txt: Type.TRecord<Type.TString, Type.TString>;
    readonly addresses: Type.TArray<Type.TString>;
    readonly source: Type.TLiteral<"mdns-discovery">;
    readonly timestamp: Type.TString;
  },
  | "protocol"
  | "txt"
  | "addresses"
  | "source"
  | "id"
  | "name"
  | "host"
  | "port"
  | "type"
  | "timestamp",
  never
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    name: Type.String(),
    host: Type.String({ minLength: 1 }),
    port: Type.Number({ minimum: 0 }),
    type: Type.String({ minLength: 1 }),
    protocol: Type.Union([Type.Literal("tcp"), Type.Literal("udp")]),
    txt: Type.Record(Type.String(), Type.String()),
    addresses: Type.Array(Type.String()),
    source: Type.Literal("mdns-discovery"),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryMdnsService schema. */
export type NetworkDiscoveryMdnsService = Static<typeof NetworkDiscoveryMdnsServiceSchema>;

/**
 * Schema for SSDP device payloads.
 */
export const NetworkDiscoverySsdpDeviceSchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly location: Type.TString;
    readonly server: Type.TOptional<Type.TString>;
    readonly usn: Type.TString;
    readonly st: Type.TString;
    readonly address: Type.TString;
    readonly port: Type.TNumber;
    readonly source: Type.TLiteral<"ssdp-discovery">;
    readonly timestamp: Type.TString;
  },
  "source" | "id" | "location" | "usn" | "st" | "address" | "port" | "timestamp",
  "server"
> = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    location: Type.String({ minLength: 1 }),
    server: Type.Optional(Type.String()),
    usn: Type.String({ minLength: 1 }),
    st: Type.String({ minLength: 1 }),
    address: Type.String({ minLength: 1 }),
    port: Type.Number({ minimum: 0 }),
    source: Type.Literal("ssdp-discovery"),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoverySsdpDevice schema. */
export type NetworkDiscoverySsdpDevice = Static<typeof NetworkDiscoverySsdpDeviceSchema>;

// Persistence Jobs

/**
 * Schema for network discovery persistence jobs.
 */
export const NetworkDiscoveryPersistJobSchema = Type.Object(
  {
    requestedAt: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String({ minLength: 1 })),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
    request: Type.Optional(NetworkDiscoveryRequestSchema),
    results: Type.Object(
      {
        onvif: Type.Array(NetworkDiscoveryOnvifDeviceSchema),
        mdns: Type.Array(NetworkDiscoveryMdnsServiceSchema),
        ssdp: Type.Array(NetworkDiscoverySsdpDeviceSchema),
      },
      { additionalProperties: false },
    ),
    __context: Type.Optional(QueueJobContextSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryPersistJob schema. */
export type NetworkDiscoveryPersistJob = Static<typeof NetworkDiscoveryPersistJobSchema>;

// Discovery Responses

/**
 * Schema for discovery response payloads.
 */
export const NetworkDiscoveryFullResponseSchema = Type.Object(
  {
    ok: Type.Boolean(),
    data: Type.Object(
      {
        onvif: Type.Array(NetworkDiscoveryOnvifDeviceSchema),
        mdns: Type.Array(NetworkDiscoveryMdnsServiceSchema),
        ssdp: Type.Array(NetworkDiscoverySsdpDeviceSchema),
        totalCount: Type.Number({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    protocols: Type.Object(
      {
        onvif: NetworkDiscoveryProtocolCountSchema,
        mdns: NetworkDiscoveryProtocolCountSchema,
        ssdp: NetworkDiscoveryProtocolCountSchema,
      },
      { additionalProperties: false },
    ),
    timing: NetworkDiscoveryTimingSchema,
    errors: Type.Array(Type.String()),
    timestamp: Type.String({ format: "date-time" }),
    persistence: Type.Optional(NetworkDiscoveryPersistenceStatsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryFullResponse schema. */
export type NetworkDiscoveryFullResponse = Static<typeof NetworkDiscoveryFullResponseSchema>;

/**
 * Schema for ONVIF-only discovery responses.
 */
export const NetworkDiscoveryOnvifResponseSchema = Type.Object(
  {
    ok: Type.Boolean(),
    data: Type.Object(
      {
        devices: Type.Array(NetworkDiscoveryOnvifDeviceSchema),
        count: Type.Number({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    timing: NetworkDiscoveryTimingSchema,
    timestamp: Type.String({ format: "date-time" }),
    persistence: Type.Optional(NetworkDiscoveryPersistenceStatsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryOnvifResponse schema. */
export type NetworkDiscoveryOnvifResponse = Static<typeof NetworkDiscoveryOnvifResponseSchema>;

/**
 * Schema for mDNS discovery responses.
 */
export const NetworkDiscoveryMdnsResponseSchema = Type.Object(
  {
    ok: Type.Boolean(),
    data: Type.Object(
      {
        services: Type.Array(NetworkDiscoveryMdnsServiceSchema),
        count: Type.Number({ minimum: 0 }),
        serviceType: Type.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    timing: NetworkDiscoveryTimingSchema,
    timestamp: Type.String({ format: "date-time" }),
    persistence: Type.Optional(NetworkDiscoveryPersistenceStatsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryMdnsResponse schema. */
export type NetworkDiscoveryMdnsResponse = Static<typeof NetworkDiscoveryMdnsResponseSchema>;

/**
 * Schema for camera mDNS discovery responses.
 */
export const NetworkDiscoveryCameraResponseSchema = Type.Object(
  {
    ok: Type.Boolean(),
    data: Type.Object(
      {
        services: Type.Array(NetworkDiscoveryMdnsServiceSchema),
        count: Type.Number({ minimum: 0 }),
        serviceTypes: Type.Array(Type.String({ minLength: 1 })),
      },
      { additionalProperties: false },
    ),
    timing: NetworkDiscoveryTimingSchema,
    timestamp: Type.String({ format: "date-time" }),
    persistence: Type.Optional(NetworkDiscoveryPersistenceStatsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryCameraResponse schema. */
export type NetworkDiscoveryCameraResponse = Static<typeof NetworkDiscoveryCameraResponseSchema>;

/**
 * Schema for SSDP discovery responses.
 */
export const NetworkDiscoverySsdpResponseSchema = Type.Object(
  {
    ok: Type.Boolean(),
    data: Type.Object(
      {
        devices: Type.Array(NetworkDiscoverySsdpDeviceSchema),
        count: Type.Number({ minimum: 0 }),
        searchTarget: Type.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    timing: NetworkDiscoveryTimingSchema,
    timestamp: Type.String({ format: "date-time" }),
    persistence: Type.Optional(NetworkDiscoveryPersistenceStatsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoverySsdpResponse schema. */
export type NetworkDiscoverySsdpResponse = Static<typeof NetworkDiscoverySsdpResponseSchema>;

/**
 * Schema for categorized discovery responses.
 */
export const NetworkDiscoveryCategorizedResponseSchema = Type.Object(
  {
    ok: Type.Boolean(),
    data: Type.Object(
      {
        cameras: Type.Array(
          Type.Object(
            {
              id: Type.String({ minLength: 1 }),
              name: Type.String(),
              hostname: Type.String({ minLength: 1 }),
              port: Type.Number({ minimum: 0 }),
              protocol: Type.Literal("onvif"),
              source: Type.Literal("network-onvif"),
              xaddrs: Type.Array(Type.String()),
              timestamp: Type.String({ format: "date-time" }),
            },
            { additionalProperties: false },
          ),
        ),
        rtspServices: Type.Array(NetworkDiscoveryMdnsServiceSchema),
        httpServices: Type.Array(NetworkDiscoveryMdnsServiceSchema),
        mediaDevices: Type.Array(NetworkDiscoverySsdpDeviceSchema),
        otherServices: Type.Array(NetworkDiscoveryMdnsServiceSchema),
        counts: Type.Object(
          {
            cameras: Type.Number({ minimum: 0 }),
            rtspServices: Type.Number({ minimum: 0 }),
            httpServices: Type.Number({ minimum: 0 }),
            mediaDevices: Type.Number({ minimum: 0 }),
            otherServices: Type.Number({ minimum: 0 }),
            total: Type.Number({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    raw: Type.Object(
      {
        onvif: Type.Array(NetworkDiscoveryOnvifDeviceSchema),
        mdns: Type.Array(NetworkDiscoveryMdnsServiceSchema),
        ssdp: Type.Array(NetworkDiscoverySsdpDeviceSchema),
      },
      { additionalProperties: false },
    ),
    timing: NetworkDiscoveryTimingSchema,
    errors: Type.Array(Type.String()),
    timestamp: Type.String({ format: "date-time" }),
    persistence: Type.Optional(NetworkDiscoveryPersistenceStatsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryCategorizedResponse schema. */
export type NetworkDiscoveryCategorizedResponse = Static<
  typeof NetworkDiscoveryCategorizedResponseSchema
>;
