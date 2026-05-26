/**
 * Network discovery schemas.
 *
 * Defines TypeBox schemas for network discovery protocol availability
 * and discovery responses across ONVIF, mDNS, and SSDP endpoints.
 *
 * @shared/schemas/network-discovery.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TArray,
  TBoolean,
  TLiteral,
  TNull,
  TNumber,
  TObject,
  TOptional,
  TRecord,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { QueueJobContextSchema } from "./queue-context.schemas.ts";

// Request Payloads

/**
 * Schema for network discovery request payloads.
 */
export const NetworkDiscoveryRequestSchema: TObject<
  {
    readonly timeoutMs: TOptional<TUnion<(TString | TNumber)[]>>;
    readonly serviceType: TOptional<TString>;
    readonly searchTarget: TOptional<TString>;
    readonly persist: TOptional<TUnion<(TString | TBoolean)[]>>;
    readonly idempotencyKey: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly timeoutMs: TOptional<TUnion<(TString | TNumber)[]>>;
    readonly serviceType: TOptional<TString>;
    readonly searchTarget: TOptional<TString>;
    readonly persist: TOptional<TUnion<(TString | TBoolean)[]>>;
    readonly idempotencyKey: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    timeoutMs: TypeExports.Optional(
      TypeExports.Union([TypeExports.Number(), TypeExports.String()]),
    ),
    serviceType: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    searchTarget: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    persist: TypeExports.Optional(TypeExports.Union([TypeExports.Boolean(), TypeExports.String()])),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryRequest schema. */
export type NetworkDiscoveryRequest = Static<typeof NetworkDiscoveryRequestSchema>;

// Protocol Status

/**
 * Schema for protocol availability status.
 */
export const NetworkDiscoveryProtocolStatusSchema: TObject<
  {
    readonly available: TBoolean;
    readonly name: TString;
    readonly description: TString;
    readonly package: TString;
    readonly notes: TOptional<TArray<TString>>;
  },
  "description" | "available" | "name" | "package",
  "notes"
> = TypeExports.Object(
  {
    available: TypeExports.Boolean(),
    name: TypeExports.String({ minLength: 1 }),
    description: TypeExports.String({ minLength: 1 }),
    package: TypeExports.String({ minLength: 1 }),
    notes: TypeExports.Optional(TypeExports.Array(TypeExports.String())),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryProtocolStatus schema. */
export type NetworkDiscoveryProtocolStatus = Static<typeof NetworkDiscoveryProtocolStatusSchema>;

/**
 * Schema for protocol availability counts.
 */
export const NetworkDiscoveryProtocolCountSchema: TObject<
  { readonly available: TBoolean; readonly count: TNumber },
  "available" | "count",
  never
> = TypeExports.Object(
  {
    available: TypeExports.Boolean(),
    count: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryProtocolCount schema. */
export type NetworkDiscoveryProtocolCount = Static<typeof NetworkDiscoveryProtocolCountSchema>;

/**
 * Schema for protocol availability response.
 */
export const NetworkDiscoveryProtocolsResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    data: TypeExports.Object(
      {
        onvif: NetworkDiscoveryProtocolStatusSchema,
        mdns: NetworkDiscoveryProtocolStatusSchema,
        ssdp: NetworkDiscoveryProtocolStatusSchema,
      },
      { additionalProperties: false },
    ),
    allAvailable: TypeExports.Boolean(),
    timestamp: TypeExports.String({ format: "date-time" }),
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
export const NetworkDiscoveryTimingSchema: TObject<
  { readonly durationMs: TNumber; readonly timeoutMs: TNumber },
  "durationMs" | "timeoutMs",
  never
> = TypeExports.Object(
  {
    durationMs: TypeExports.Number({ minimum: 0 }),
    timeoutMs: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryTiming schema. */
export type NetworkDiscoveryTiming = Static<typeof NetworkDiscoveryTimingSchema>;

/**
 * Schema for persistence stats payloads.
 */
export const NetworkDiscoveryPersistenceStatsSchema: TObject<
  {
    readonly persisted: TNumber;
    readonly errors: TArray<TString>;
    readonly queued: TOptional<TBoolean>;
    readonly jobId: TOptional<TUnion<(TString | TNull)[]>>;
  },
  "errors" | "persisted",
  InferOptionalKeys<{
    readonly persisted: TNumber;
    readonly errors: TArray<TString>;
    readonly queued: TOptional<TBoolean>;
    readonly jobId: TOptional<TUnion<(TString | TNull)[]>>;
  }>
> = TypeExports.Object(
  {
    persisted: TypeExports.Number({ minimum: 0 }),
    errors: TypeExports.Array(TypeExports.String()),
    queued: TypeExports.Optional(TypeExports.Boolean()),
    jobId: TypeExports.Optional(
      TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    ),
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
export const NetworkDiscoveryOnvifDeviceSchema: TObject<
  {
    readonly id: TString;
    readonly name: TString;
    readonly hostname: TString;
    readonly port: TNumber;
    readonly path: TString;
    readonly urn: TString;
    readonly xaddrs: TArray<TString>;
    readonly protocol: TLiteral<"onvif">;
    readonly source: TLiteral<"onvif-discovery">;
    readonly timestamp: TString;
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
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String(),
    hostname: TypeExports.String({ minLength: 1 }),
    port: TypeExports.Number({ minimum: 0 }),
    path: TypeExports.String(),
    urn: TypeExports.String(),
    xaddrs: TypeExports.Array(TypeExports.String()),
    protocol: TypeExports.Literal("onvif"),
    source: TypeExports.Literal("onvif-discovery"),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryOnvifDevice schema. */
export type NetworkDiscoveryOnvifDevice = Static<typeof NetworkDiscoveryOnvifDeviceSchema>;

/**
 * Schema for mDNS service payloads.
 */
export const NetworkDiscoveryMdnsServiceSchema: TObject<
  {
    readonly id: TString;
    readonly name: TString;
    readonly host: TString;
    readonly port: TNumber;
    readonly type: TString;
    readonly protocol: TUnion<(TLiteral<"tcp"> | TLiteral<"udp">)[]>;
    readonly txt: TRecord<TString, TString>;
    readonly addresses: TArray<TString>;
    readonly source: TLiteral<"mdns-discovery">;
    readonly timestamp: TString;
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
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    name: TypeExports.String(),
    host: TypeExports.String({ minLength: 1 }),
    port: TypeExports.Number({ minimum: 0 }),
    type: TypeExports.String({ minLength: 1 }),
    protocol: TypeExports.Union([TypeExports.Literal("tcp"), TypeExports.Literal("udp")]),
    txt: TypeExports.Record(TypeExports.String(), TypeExports.String()),
    addresses: TypeExports.Array(TypeExports.String()),
    source: TypeExports.Literal("mdns-discovery"),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryMdnsService schema. */
export type NetworkDiscoveryMdnsService = Static<typeof NetworkDiscoveryMdnsServiceSchema>;

/**
 * Schema for SSDP device payloads.
 */
export const NetworkDiscoverySsdpDeviceSchema: TObject<
  {
    readonly id: TString;
    readonly location: TString;
    readonly server: TOptional<TString>;
    readonly usn: TString;
    readonly st: TString;
    readonly address: TString;
    readonly port: TNumber;
    readonly source: TLiteral<"ssdp-discovery">;
    readonly timestamp: TString;
  },
  "source" | "id" | "location" | "usn" | "st" | "address" | "port" | "timestamp",
  "server"
> = TypeExports.Object(
  {
    id: TypeExports.String({ minLength: 1 }),
    location: TypeExports.String({ minLength: 1 }),
    server: TypeExports.Optional(TypeExports.String()),
    usn: TypeExports.String({ minLength: 1 }),
    st: TypeExports.String({ minLength: 1 }),
    address: TypeExports.String({ minLength: 1 }),
    port: TypeExports.Number({ minimum: 0 }),
    source: TypeExports.Literal("ssdp-discovery"),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoverySsdpDevice schema. */
export type NetworkDiscoverySsdpDevice = Static<typeof NetworkDiscoverySsdpDeviceSchema>;

// Persistence Jobs

/**
 * Schema for network discovery persistence jobs.
 */
export const NetworkDiscoveryPersistJobSchema = TypeExports.Object(
  {
    requestedAt: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    request: TypeExports.Optional(NetworkDiscoveryRequestSchema),
    results: TypeExports.Object(
      {
        onvif: TypeExports.Array(NetworkDiscoveryOnvifDeviceSchema),
        mdns: TypeExports.Array(NetworkDiscoveryMdnsServiceSchema),
        ssdp: TypeExports.Array(NetworkDiscoverySsdpDeviceSchema),
      },
      { additionalProperties: false },
    ),
    __context: TypeExports.Optional(QueueJobContextSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryPersistJob schema. */
export type NetworkDiscoveryPersistJob = Static<typeof NetworkDiscoveryPersistJobSchema>;

// Discovery Responses

/**
 * Schema for discovery response payloads.
 */
export const NetworkDiscoveryFullResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    data: TypeExports.Object(
      {
        onvif: TypeExports.Array(NetworkDiscoveryOnvifDeviceSchema),
        mdns: TypeExports.Array(NetworkDiscoveryMdnsServiceSchema),
        ssdp: TypeExports.Array(NetworkDiscoverySsdpDeviceSchema),
        totalCount: TypeExports.Number({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    protocols: TypeExports.Object(
      {
        onvif: NetworkDiscoveryProtocolCountSchema,
        mdns: NetworkDiscoveryProtocolCountSchema,
        ssdp: NetworkDiscoveryProtocolCountSchema,
      },
      { additionalProperties: false },
    ),
    timing: NetworkDiscoveryTimingSchema,
    errors: TypeExports.Array(TypeExports.String()),
    timestamp: TypeExports.String({ format: "date-time" }),
    persistence: TypeExports.Optional(NetworkDiscoveryPersistenceStatsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryFullResponse schema. */
export type NetworkDiscoveryFullResponse = Static<typeof NetworkDiscoveryFullResponseSchema>;

/**
 * Schema for ONVIF-only discovery responses.
 */
export const NetworkDiscoveryOnvifResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    data: TypeExports.Object(
      {
        devices: TypeExports.Array(NetworkDiscoveryOnvifDeviceSchema),
        count: TypeExports.Number({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
    timing: NetworkDiscoveryTimingSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    persistence: TypeExports.Optional(NetworkDiscoveryPersistenceStatsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryOnvifResponse schema. */
export type NetworkDiscoveryOnvifResponse = Static<typeof NetworkDiscoveryOnvifResponseSchema>;

/**
 * Schema for mDNS discovery responses.
 */
export const NetworkDiscoveryMdnsResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    data: TypeExports.Object(
      {
        services: TypeExports.Array(NetworkDiscoveryMdnsServiceSchema),
        count: TypeExports.Number({ minimum: 0 }),
        serviceType: TypeExports.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    timing: NetworkDiscoveryTimingSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    persistence: TypeExports.Optional(NetworkDiscoveryPersistenceStatsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryMdnsResponse schema. */
export type NetworkDiscoveryMdnsResponse = Static<typeof NetworkDiscoveryMdnsResponseSchema>;

/**
 * Schema for camera mDNS discovery responses.
 */
export const NetworkDiscoveryCameraResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    data: TypeExports.Object(
      {
        services: TypeExports.Array(NetworkDiscoveryMdnsServiceSchema),
        count: TypeExports.Number({ minimum: 0 }),
        serviceTypes: TypeExports.Array(TypeExports.String({ minLength: 1 })),
      },
      { additionalProperties: false },
    ),
    timing: NetworkDiscoveryTimingSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    persistence: TypeExports.Optional(NetworkDiscoveryPersistenceStatsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryCameraResponse schema. */
export type NetworkDiscoveryCameraResponse = Static<typeof NetworkDiscoveryCameraResponseSchema>;

/**
 * Schema for SSDP discovery responses.
 */
export const NetworkDiscoverySsdpResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    data: TypeExports.Object(
      {
        devices: TypeExports.Array(NetworkDiscoverySsdpDeviceSchema),
        count: TypeExports.Number({ minimum: 0 }),
        searchTarget: TypeExports.String({ minLength: 1 }),
      },
      { additionalProperties: false },
    ),
    timing: NetworkDiscoveryTimingSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
    persistence: TypeExports.Optional(NetworkDiscoveryPersistenceStatsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoverySsdpResponse schema. */
export type NetworkDiscoverySsdpResponse = Static<typeof NetworkDiscoverySsdpResponseSchema>;

/**
 * Schema for categorized discovery responses.
 */
export const NetworkDiscoveryCategorizedResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    data: TypeExports.Object(
      {
        cameras: TypeExports.Array(
          TypeExports.Object(
            {
              id: TypeExports.String({ minLength: 1 }),
              name: TypeExports.String(),
              hostname: TypeExports.String({ minLength: 1 }),
              port: TypeExports.Number({ minimum: 0 }),
              protocol: TypeExports.Literal("onvif"),
              source: TypeExports.Literal("network-onvif"),
              xaddrs: TypeExports.Array(TypeExports.String()),
              timestamp: TypeExports.String({ format: "date-time" }),
            },
            { additionalProperties: false },
          ),
        ),
        rtspServices: TypeExports.Array(NetworkDiscoveryMdnsServiceSchema),
        httpServices: TypeExports.Array(NetworkDiscoveryMdnsServiceSchema),
        mediaDevices: TypeExports.Array(NetworkDiscoverySsdpDeviceSchema),
        otherServices: TypeExports.Array(NetworkDiscoveryMdnsServiceSchema),
        counts: TypeExports.Object(
          {
            cameras: TypeExports.Number({ minimum: 0 }),
            rtspServices: TypeExports.Number({ minimum: 0 }),
            httpServices: TypeExports.Number({ minimum: 0 }),
            mediaDevices: TypeExports.Number({ minimum: 0 }),
            otherServices: TypeExports.Number({ minimum: 0 }),
            total: TypeExports.Number({ minimum: 0 }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    raw: TypeExports.Object(
      {
        onvif: TypeExports.Array(NetworkDiscoveryOnvifDeviceSchema),
        mdns: TypeExports.Array(NetworkDiscoveryMdnsServiceSchema),
        ssdp: TypeExports.Array(NetworkDiscoverySsdpDeviceSchema),
      },
      { additionalProperties: false },
    ),
    timing: NetworkDiscoveryTimingSchema,
    errors: TypeExports.Array(TypeExports.String()),
    timestamp: TypeExports.String({ format: "date-time" }),
    persistence: TypeExports.Optional(NetworkDiscoveryPersistenceStatsSchema),
  },
  { additionalProperties: false },
);

/** Inferred type from the NetworkDiscoveryCategorizedResponse schema. */
export type NetworkDiscoveryCategorizedResponse = Static<
  typeof NetworkDiscoveryCategorizedResponseSchema
>;
