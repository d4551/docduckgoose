/**
 * Hardware policy schemas.
 *
 * Defines contract-first policy and lifecycle schemas for hardware governance.
 *
 * @shared/schemas/hardware-policy.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { BunBuddyKindSchema } from "./bunbuddy.schemas.ts";
import { SplatbaoWidthHeightSchema } from "./splatbao-perception.schemas.ts";

const HardwarePolicyIdListSchema = Type.Object(
  {
    vendorIds: Type.Array(Type.String()),
    productIds: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

/**
 * Hardware policy status tokens.
 */
export const HARDWARE_POLICY_STATUSES: readonly [
  "healthy",
  "degraded",
  "blocked",
  "disabled",
  "unknown",
] = ["healthy", "degraded", "blocked", "disabled", "unknown"] as const;

/** Inferred type from the HardwarePolicyStatus schema. */
export type HardwarePolicyStatus = (typeof HARDWARE_POLICY_STATUSES)[number];

/**
 * Hardware policy status schema.
 */
export const HardwarePolicyStatusSchema: Type.TUnion<
  [
    Type.TLiteral<"healthy" | "degraded" | "blocked" | "disabled" | "unknown">,
    ...Type.TLiteral<"healthy" | "degraded" | "blocked" | "disabled" | "unknown">[],
  ]
> = stringEnum(HARDWARE_POLICY_STATUSES, {
  description: "Hardware policy status token",
});

/**
 * BunBuddy health status schema for policy snapshots.
 */
export const HardwarePolicyBunBuddyStatusSchema: Type.TUnion<
  (Type.TLiteral<"healthy"> | Type.TLiteral<"degraded"> | Type.TLiteral<"unreachable">)[]
> = Type.Union(
  [Type.Literal("healthy"), Type.Literal("degraded"), Type.Literal("unreachable")],
  {},
);

/**
 * BunBuddy status summary used in policy snapshots.
 */
export const HardwarePolicyBunBuddySourceSchema = Type.Object(
  {
    kind: BunBuddyKindSchema,
    status: HardwarePolicyBunBuddyStatusSchema,
    baseUrl: Type.Union([Type.String(), Type.Null()]),
    features: Type.Record(Type.String(), Type.Boolean()),
    notes: Type.Array(Type.String()),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Hardware industrial gateway policy schema.
 */
export const HardwareIndustrialPolicySchema = Type.Object(
  {
    enabled: Type.Boolean(),
    status: HardwarePolicyStatusSchema,
    reasons: Type.Array(Type.String()),
    protocols: Type.Object({
      modbus: Type.Boolean(),
      opcua: Type.Boolean(),
      bacnet: Type.Boolean(),
    }),
    limits: Type.Object({
      timeoutMs: Type.Integer({ minimum: 0 }),
      maxPayloadBytes: Type.Integer({ minimum: 0 }),
      maxConcurrent: Type.Integer({ minimum: 1 }),
    }),
    sources: Type.Array(BunBuddyKindSchema),
  },
  { additionalProperties: false },
);

/**
 * Hardware USB/HID policy schema.
 */
export const HardwareUsbPolicySchema = Type.Object(
  {
    enabled: Type.Boolean(),
    status: HardwarePolicyStatusSchema,
    reasons: Type.Array(Type.String()),
    timeoutMs: Type.Integer({ minimum: 0 }),
    allowHid: Type.Boolean(),
    allowStorage: Type.Boolean(),
    maxDevices: Type.Integer({ minimum: 0 }),
    allowlist: HardwarePolicyIdListSchema,
    denylist: HardwarePolicyIdListSchema,
    sources: Type.Array(BunBuddyKindSchema),
  },
  { additionalProperties: false },
);

/**
 * Hardware MQTT ingestion policy schema.
 */
export const HardwareMqttPolicySchema = Type.Object(
  {
    enabled: Type.Boolean(),
    status: HardwarePolicyStatusSchema,
    reasons: Type.Array(Type.String()),
    timeoutMs: Type.Integer({ minimum: 0 }),
    qos: Type.Integer({ minimum: 0, maximum: 2 }),
    retain: Type.Boolean(),
    maxPayloadBytes: Type.Integer({ minimum: 0 }),
    maxInFlight: Type.Integer({ minimum: 1 }),
    brokers: Type.Array(Type.String()),
    topics: Type.Array(Type.String()),
    sources: Type.Array(BunBuddyKindSchema),
  },
  { additionalProperties: false },
);

/**
 * Hardware imaging policy schema.
 */
const HardwareImagingSubPolicySchema = Type.Object(
  {
    enabled: Type.Boolean(),
    status: HardwarePolicyStatusSchema,
    reasons: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

const HardwareImagingQualityPolicySchema = Type.Object(
  {
    ...HardwareImagingSubPolicySchema.properties,
    enforceOnCapture: Type.Boolean(),
    includeFocus: Type.Boolean(),
    includeEdges: Type.Boolean(),
    edgeThreshold: Type.Number(),
    thresholds: Type.Object(
      {
        minQualityScore: Type.Number(),
        minFocusScore: Type.Number(),
        minContrast: Type.Number(),
        minBrightness: Type.Number(),
        maxBrightness: Type.Number(),
        maxDarkRatio: Type.Number(),
        maxBrightRatio: Type.Number(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

const HardwareImagingPreprocessPolicySchema = Type.Object(
  {
    ...HardwareImagingSubPolicySchema.properties,
    maxOps: Type.Integer({ minimum: 0 }),
    allowedOps: Type.Array(Type.String()),
    defaultPipelineId: Type.Union([Type.String(), Type.Null()]),
    pipelineIds: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

const HardwareImagingCalibrationPolicySchema = Type.Object(
  {
    ...HardwareImagingSubPolicySchema.properties,
    minSamples: Type.Integer({ minimum: 0 }),
    pattern: Type.String(),
    patternSize: Type.Object(
      {
        width: Type.Integer({ minimum: 1 }),
        height: Type.Integer({ minimum: 1 }),
      },
      { additionalProperties: false },
    ),
    squareSizeMm: Type.Number(),
  },
  { additionalProperties: false },
);

const HardwareImagingRectifyPolicySchema = Type.Object(
  {
    ...HardwareImagingSubPolicySchema.properties,
    defaultAlpha: Type.Number(),
  },
  { additionalProperties: false },
);

const HardwareImagingSyncCapturePolicySchema = Type.Object(
  {
    ...HardwareImagingSubPolicySchema.properties,
    maxDevices: Type.Integer({ minimum: 1 }),
    timeoutMs: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

const HardwareImagingAssetsPolicySchema = Type.Object(
  {
    ...HardwareImagingSubPolicySchema.properties,
    includeDataUrl: Type.Boolean(),
    retentionDays: Type.Integer({ minimum: 0 }),
    job: Type.Object(
      {
        enabled: Type.Boolean(),
        singletonSeconds: Type.Integer({ minimum: 0 }),
        idempotencyTtlSeconds: Type.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/** TypeBox schema for HardwareImagingPolicySchema. */
export const HardwareImagingPolicySchema = Type.Object(
  {
    enabled: Type.Boolean(),
    status: HardwarePolicyStatusSchema,
    reasons: Type.Array(Type.String()),
    captureTimeoutMs: Type.Integer({ minimum: 0 }),
    previewTimeoutMs: Type.Integer({ minimum: 0 }),
    maxPayloadBytes: Type.Integer({ minimum: 0 }),
    maxResolution: SplatbaoWidthHeightSchema,
    sources: Type.Array(BunBuddyKindSchema),
    quality: HardwareImagingQualityPolicySchema,
    preprocess: HardwareImagingPreprocessPolicySchema,
    calibration: HardwareImagingCalibrationPolicySchema,
    rectify: HardwareImagingRectifyPolicySchema,
    syncCapture: HardwareImagingSyncCapturePolicySchema,
    assets: HardwareImagingAssetsPolicySchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for hardware imaging policies.
 */
export type HardwareImagingPolicy = Static<typeof HardwareImagingPolicySchema>;

/**
 * Hardware device lifecycle policy schema.
 */
export const HardwareLifecyclePolicySchema: Type.TObject<
  {
    readonly enabled: Type.TBoolean;
    readonly status: Type.TUnion<
      [
        Type.TLiteral<"unknown" | "healthy" | "degraded" | "disabled" | "blocked">,
        ...Type.TLiteral<"unknown" | "healthy" | "degraded" | "disabled" | "blocked">[],
      ]
    >;
    readonly reasons: Type.TArray<Type.TString>;
    readonly statusOnEnroll: Type.TString;
    readonly statusOnProvision: Type.TString;
    readonly requireEnrollmentToken: Type.TBoolean;
    readonly idempotencyTtlSeconds: Type.TInteger;
    readonly job: Type.TObject<
      { readonly enabled: Type.TBoolean; readonly singletonSeconds: Type.TInteger },
      "enabled" | "singletonSeconds",
      never
    >;
  },
  | "enabled"
  | "status"
  | "reasons"
  | "job"
  | "idempotencyTtlSeconds"
  | "statusOnEnroll"
  | "statusOnProvision"
  | "requireEnrollmentToken",
  never
> = Type.Object(
  {
    enabled: Type.Boolean(),
    status: HardwarePolicyStatusSchema,
    reasons: Type.Array(Type.String()),
    statusOnEnroll: Type.String(),
    statusOnProvision: Type.String(),
    requireEnrollmentToken: Type.Boolean(),
    idempotencyTtlSeconds: Type.Integer({ minimum: 0 }),
    job: Type.Object({
      enabled: Type.Boolean(),
      singletonSeconds: Type.Integer({ minimum: 0 }),
    }),
  },
  { additionalProperties: false },
);

/**
 * Hardware policy snapshot schema.
 */
export const HardwarePolicySnapshotSchema = Type.Object(
  {
    timestamp: Type.String({ format: "date-time" }),
    policies: Type.Object({
      industrialGateway: HardwareIndustrialPolicySchema,
      usbHid: HardwareUsbPolicySchema,
      mqttIngestion: HardwareMqttPolicySchema,
      imagingPipeline: HardwareImagingPolicySchema,
      deviceLifecycle: HardwareLifecyclePolicySchema,
    }),
    sources: Type.Object({
      bunbuddies: Type.Array(HardwarePolicyBunBuddySourceSchema),
    }),
  },
  { additionalProperties: false },
);

/** Inferred type from the HardwarePolicySnapshot schema. */
export type HardwarePolicySnapshot = Static<typeof HardwarePolicySnapshotSchema>;

/**
 * Hardware policy snapshot response schema.
 */
export const HardwarePolicySnapshotResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    data: HardwarePolicySnapshotSchema,
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the HardwarePolicySnapshotResponse schema. */
export type HardwarePolicySnapshotResponse = Static<typeof HardwarePolicySnapshotResponseSchema>;
