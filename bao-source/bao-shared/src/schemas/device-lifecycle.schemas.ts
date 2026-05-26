/**
 * Device lifecycle schemas.
 *
 * Contract-first schemas for device enrollment and provisioning flows.
 *
 * @shared/schemas/device-lifecycle.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";

/**
 * Device identifier bundle schema.
 */
export const DeviceLifecycleIdentifiersSchema = Type.Object(
  {
    vendorId: Type.Optional(Type.String()),
    productId: Type.Optional(Type.String()),
    serialNumber: Type.Optional(Type.String()),
    macAddress: Type.Optional(Type.String()),
    ipAddress: Type.Optional(Type.String()),
    hostname: Type.Optional(Type.String()),
    urn: Type.Optional(Type.String()),
    hardwareRevision: Type.Optional(Type.String()),
    interfaceClass: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * Device connection payload schema.
 */
export const DeviceLifecycleConnectionSchema: Type.TObject<
  {
    readonly protocol: Type.TOptional<Type.TString>;
    readonly params: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly protocol: Type.TOptional<Type.TString>;
    readonly params: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
  }>
> = Type.Object(
  {
    protocol: Type.Optional(Type.String()),
    params: Type.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/**
 * Device discovery payload schema.
 */
export const DeviceLifecycleDiscoverySchema: Type.TObject<
  {
    readonly source: Type.TOptional<Type.TString>;
    readonly metadata: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
    readonly bunbuddyId: Type.TOptional<Type.TString>;
  },
  never,
  Type.InferOptionalKeys<{
    readonly source: Type.TOptional<Type.TString>;
    readonly metadata: Type.TOptional<Type.TObject<Record<string, never>, never, never>>;
    readonly bunbuddyId: Type.TOptional<Type.TString>;
  }>
> = Type.Object(
  {
    source: Type.Optional(Type.String()),
    metadata: Type.Optional(JsonObjectSchema),
    bunbuddyId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * Device lifecycle base payload schema (shared fields).
 */
export const DeviceLifecyclePayloadSchema = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    deviceType: Type.String({ minLength: 1 }),
    transport: Type.String({ minLength: 1 }),
    status: Type.Optional(Type.String()),
    identifiers: Type.Optional(DeviceLifecycleIdentifiersSchema),
    connection: Type.Optional(DeviceLifecycleConnectionSchema),
    capabilities: Type.Optional(JsonObjectSchema),
    specifications: Type.Optional(JsonObjectSchema),
    discovery: Type.Optional(DeviceLifecycleDiscoverySchema),
    isSimulated: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

const DeviceLifecycleRequestMetaSchema = Type.Object(
  {
    deviceId: Type.String({ minLength: 1 }),
    idempotencyKey: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

const DeviceLifecyclePayloadOptionalSchema = Type.Object(
  {
    name: Type.Optional(Type.String({ minLength: 1 })),
    deviceType: Type.Optional(Type.String({ minLength: 1 })),
    transport: Type.Optional(Type.String({ minLength: 1 })),
    status: Type.Optional(Type.String()),
    identifiers: Type.Optional(DeviceLifecycleIdentifiersSchema),
    connection: Type.Optional(DeviceLifecycleConnectionSchema),
    capabilities: Type.Optional(JsonObjectSchema),
    specifications: Type.Optional(JsonObjectSchema),
    discovery: Type.Optional(DeviceLifecycleDiscoverySchema),
    isSimulated: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Device enrollment request schema.
 */
export const DeviceLifecycleEnrollRequestSchema = Type.Options(
  Type.Composite([DeviceLifecycleRequestMetaSchema, DeviceLifecyclePayloadSchema]),
  {
    additionalProperties: false,
  },
);

/** Inferred type from the DeviceLifecycleEnrollRequest schema. */
export type DeviceLifecycleEnrollRequest = Static<typeof DeviceLifecycleEnrollRequestSchema>;

/**
 * Device provisioning request schema.
 */
export const DeviceLifecycleProvisionRequestSchema = Type.Options(
  Type.Composite([DeviceLifecycleRequestMetaSchema, DeviceLifecyclePayloadOptionalSchema]),
  {
    additionalProperties: false,
  },
);

/** Inferred type from the DeviceLifecycleProvisionRequest schema. */
export type DeviceLifecycleProvisionRequest = Static<typeof DeviceLifecycleProvisionRequestSchema>;

/**
 * Device lifecycle action schema.
 */
export const DeviceLifecycleActionSchema: Type.TUnion<
  (Type.TLiteral<"enroll"> | Type.TLiteral<"provision">)[]
> = Type.Union([Type.Literal("enroll"), Type.Literal("provision")], {
  description: "Device lifecycle action type",
});

/** Inferred type from the DeviceLifecycleAction schema. */
export type DeviceLifecycleAction = Static<typeof DeviceLifecycleActionSchema>;

/**
 * Device lifecycle summary schema.
 */
export const DeviceLifecycleDeviceSummarySchema: Type.TObject<
  {
    readonly id: Type.TString;
    readonly name: Type.TString;
    readonly deviceType: Type.TString;
    readonly transport: Type.TString;
    readonly status: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "status" | "id" | "name" | "deviceType" | "transport",
  never
> = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    deviceType: Type.String(),
    transport: Type.String(),
    status: Type.Union([Type.String(), Type.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the DeviceLifecycleDeviceSummary schema. */
export type DeviceLifecycleDeviceSummary = Static<typeof DeviceLifecycleDeviceSummarySchema>;

/**
 * Device lifecycle response schema.
 */
export const DeviceLifecycleResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly action: Type.TUnion<(Type.TLiteral<"enroll"> | Type.TLiteral<"provision">)[]>;
    readonly queued: Type.TBoolean;
    readonly jobId: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly device: Type.TUnion<
      (
        | Type.TNull
        | Type.TObject<
            {
              readonly id: Type.TString;
              readonly name: Type.TString;
              readonly deviceType: Type.TString;
              readonly transport: Type.TString;
              readonly status: Type.TUnion<(Type.TString | Type.TNull)[]>;
            },
            "status" | "name" | "deviceType" | "transport" | "id",
            never
          >
      )[]
    >;
    readonly timestamp: Type.TString;
    readonly correlationId: Type.TOptional<Type.TString>;
  },
  "ok" | "jobId" | "device" | "action" | "queued" | "timestamp",
  "correlationId"
> = Type.Object(
  {
    ok: Type.Literal(true),
    action: DeviceLifecycleActionSchema,
    queued: Type.Boolean(),
    jobId: Type.Union([Type.String(), Type.Null()]),
    device: Type.Union([DeviceLifecycleDeviceSummarySchema, Type.Null()]),
    timestamp: Type.String({ format: "date-time" }),
    correlationId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the DeviceLifecycleResponse schema. */
export type DeviceLifecycleResponse = Static<typeof DeviceLifecycleResponseSchema>;
