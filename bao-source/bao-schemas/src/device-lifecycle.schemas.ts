/**
 * Device lifecycle schemas.
 *
 * Contract-first schemas for device enrollment and provisioning flows.
 *
 * @shared/schemas/device-lifecycle.ts
 */

import type {
  InferOptionalKeys,
  Static,
  TBoolean,
  TLiteral,
  TNull,
  TObject,
  TOptional,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { JsonObjectSchema } from "./json.schemas.ts";

/**
 * Device identifier bundle schema.
 */
export const DeviceLifecycleIdentifiersSchema = TypeExports.Object(
  {
    vendorId: TypeExports.Optional(TypeExports.String()),
    productId: TypeExports.Optional(TypeExports.String()),
    serialNumber: TypeExports.Optional(TypeExports.String()),
    macAddress: TypeExports.Optional(TypeExports.String()),
    ipAddress: TypeExports.Optional(TypeExports.String()),
    hostname: TypeExports.Optional(TypeExports.String()),
    urn: TypeExports.Optional(TypeExports.String()),
    hardwareRevision: TypeExports.Optional(TypeExports.String()),
    interfaceClass: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * Device connection payload schema.
 */
export const DeviceLifecycleConnectionSchema: TObject<
  {
    readonly protocol: TOptional<TString>;
    readonly params: TOptional<TObject<Record<string, never>, never, never>>;
  },
  never,
  InferOptionalKeys<{
    readonly protocol: TOptional<TString>;
    readonly params: TOptional<TObject<Record<string, never>, never, never>>;
  }>
> = TypeExports.Object(
  {
    protocol: TypeExports.Optional(TypeExports.String()),
    params: TypeExports.Optional(JsonObjectSchema),
  },
  { additionalProperties: false },
);

/**
 * Device discovery payload schema.
 */
export const DeviceLifecycleDiscoverySchema: TObject<
  {
    readonly source: TOptional<TString>;
    readonly metadata: TOptional<TObject<Record<string, never>, never, never>>;
    readonly bunbuddyId: TOptional<TString>;
  },
  never,
  InferOptionalKeys<{
    readonly source: TOptional<TString>;
    readonly metadata: TOptional<TObject<Record<string, never>, never, never>>;
    readonly bunbuddyId: TOptional<TString>;
  }>
> = TypeExports.Object(
  {
    source: TypeExports.Optional(TypeExports.String()),
    metadata: TypeExports.Optional(JsonObjectSchema),
    bunbuddyId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/**
 * Device lifecycle base payload schema (shared fields).
 */
export const DeviceLifecyclePayloadSchema = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    deviceType: TypeExports.String({ minLength: 1 }),
    transport: TypeExports.String({ minLength: 1 }),
    status: TypeExports.Optional(TypeExports.String()),
    identifiers: TypeExports.Optional(DeviceLifecycleIdentifiersSchema),
    connection: TypeExports.Optional(DeviceLifecycleConnectionSchema),
    capabilities: TypeExports.Optional(JsonObjectSchema),
    specifications: TypeExports.Optional(JsonObjectSchema),
    discovery: TypeExports.Optional(DeviceLifecycleDiscoverySchema),
    isSimulated: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

const DeviceLifecycleRequestMetaSchema = TypeExports.Object(
  {
    deviceId: TypeExports.String({ minLength: 1 }),
    idempotencyKey: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

const DeviceLifecyclePayloadOptionalSchema = TypeExports.Object(
  {
    name: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    deviceType: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    transport: TypeExports.Optional(TypeExports.String({ minLength: 1 })),
    status: TypeExports.Optional(TypeExports.String()),
    identifiers: TypeExports.Optional(DeviceLifecycleIdentifiersSchema),
    connection: TypeExports.Optional(DeviceLifecycleConnectionSchema),
    capabilities: TypeExports.Optional(JsonObjectSchema),
    specifications: TypeExports.Optional(JsonObjectSchema),
    discovery: TypeExports.Optional(DeviceLifecycleDiscoverySchema),
    isSimulated: TypeExports.Optional(TypeExports.Boolean()),
  },
  { additionalProperties: false },
);

/**
 * Device enrollment request schema.
 */
export const DeviceLifecycleEnrollRequestSchema = TypeExports.Options(
  TypeExports.Composite([DeviceLifecycleRequestMetaSchema, DeviceLifecyclePayloadSchema]),
  {
    additionalProperties: false,
  },
);

/** Inferred type from the DeviceLifecycleEnrollRequest schema. */
export type DeviceLifecycleEnrollRequest = Static<typeof DeviceLifecycleEnrollRequestSchema>;

/**
 * Device provisioning request schema.
 */
export const DeviceLifecycleProvisionRequestSchema = TypeExports.Options(
  TypeExports.Composite([DeviceLifecycleRequestMetaSchema, DeviceLifecyclePayloadOptionalSchema]),
  {
    additionalProperties: false,
  },
);

/** Inferred type from the DeviceLifecycleProvisionRequest schema. */
export type DeviceLifecycleProvisionRequest = Static<typeof DeviceLifecycleProvisionRequestSchema>;

/**
 * Device lifecycle action schema.
 */
export const DeviceLifecycleActionSchema: TUnion<(TLiteral<"enroll"> | TLiteral<"provision">)[]> =
  TypeExports.Union([TypeExports.Literal("enroll"), TypeExports.Literal("provision")], {
    description: "Device lifecycle action type",
  });

/** Inferred type from the DeviceLifecycleAction schema. */
export type DeviceLifecycleAction = Static<typeof DeviceLifecycleActionSchema>;

/**
 * Device lifecycle summary schema.
 */
export const DeviceLifecycleDeviceSummarySchema: TObject<
  {
    readonly id: TString;
    readonly name: TString;
    readonly deviceType: TString;
    readonly transport: TString;
    readonly status: TUnion<(TString | TNull)[]>;
  },
  "status" | "id" | "name" | "deviceType" | "transport",
  never
> = TypeExports.Object(
  {
    id: TypeExports.String(),
    name: TypeExports.String(),
    deviceType: TypeExports.String(),
    transport: TypeExports.String(),
    status: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
  },
  { additionalProperties: false },
);

/** Inferred type from the DeviceLifecycleDeviceSummary schema. */
export type DeviceLifecycleDeviceSummary = Static<typeof DeviceLifecycleDeviceSummarySchema>;

/**
 * Device lifecycle response schema.
 */
export const DeviceLifecycleResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly action: TUnion<(TLiteral<"enroll"> | TLiteral<"provision">)[]>;
    readonly queued: TBoolean;
    readonly jobId: TUnion<(TString | TNull)[]>;
    readonly device: TUnion<
      (
        | TNull
        | TObject<
            {
              readonly id: TString;
              readonly name: TString;
              readonly deviceType: TString;
              readonly transport: TString;
              readonly status: TUnion<(TString | TNull)[]>;
            },
            "status" | "name" | "deviceType" | "transport" | "id",
            never
          >
      )[]
    >;
    readonly timestamp: TString;
    readonly correlationId: TOptional<TString>;
  },
  "ok" | "jobId" | "device" | "action" | "queued" | "timestamp",
  "correlationId"
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    action: DeviceLifecycleActionSchema,
    queued: TypeExports.Boolean(),
    jobId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    device: TypeExports.Union([DeviceLifecycleDeviceSummarySchema, TypeExports.Null()]),
    timestamp: TypeExports.String({ format: "date-time" }),
    correlationId: TypeExports.Optional(TypeExports.String()),
  },
  { additionalProperties: false },
);

/** Inferred type from the DeviceLifecycleResponse schema. */
export type DeviceLifecycleResponse = Static<typeof DeviceLifecycleResponseSchema>;
