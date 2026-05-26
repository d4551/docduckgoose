/**
 * Hardware policy schemas.
 *
 * Defines contract-first policy and lifecycle schemas for hardware governance.
 *
 * @shared/schemas/hardware-policy.ts
 */

import type {
  Static,
  TArray,
  TBoolean,
  TInteger,
  TLiteral,
  TObject,
  TString,
  TUnion,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";
import { stringEnum } from "./baobox-enum.ts";
import { BunBuddyKindSchema } from "./bunbuddy.schemas.ts";
import { SplatbaoWidthHeightSchema } from "./splatbao-perception.schemas.ts";

const HardwarePolicyIdListSchema = TypeExports.Object(
  {
    vendorIds: TypeExports.Array(TypeExports.String()),
    productIds: TypeExports.Array(TypeExports.String()),
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
export const HardwarePolicyStatusSchema: TUnion<
  [
    TLiteral<"healthy" | "degraded" | "blocked" | "disabled" | "unknown">,
    ...TLiteral<"healthy" | "degraded" | "blocked" | "disabled" | "unknown">[],
  ]
> = stringEnum(HARDWARE_POLICY_STATUSES, {
  description: "Hardware policy status token",
});

/**
 * BunBuddy health status schema for policy snapshots.
 */
export const HardwarePolicyBunBuddyStatusSchema: TUnion<
  (
    | TLiteral<"healthy">
    | TLiteral<"degraded">
    | TLiteral<"unreachable">
    | TLiteral<"not-configured">
  )[]
> = TypeExports.Union(
  [
    TypeExports.Literal("healthy"),
    TypeExports.Literal("degraded"),
    TypeExports.Literal("unreachable"),
    TypeExports.Literal("not-configured"),
  ],
  {},
);

/**
 * BunBuddy status summary used in policy snapshots.
 */
export const HardwarePolicyBunBuddySourceSchema = TypeExports.Object(
  {
    kind: BunBuddyKindSchema,
    status: HardwarePolicyBunBuddyStatusSchema,
    baseUrl: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    features: TypeExports.Record(TypeExports.String(), TypeExports.Boolean()),
    notes: TypeExports.Array(TypeExports.String()),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Hardware industrial gateway policy schema.
 */
export const HardwareIndustrialPolicySchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    status: HardwarePolicyStatusSchema,
    reasons: TypeExports.Array(TypeExports.String()),
    protocols: TypeExports.Object({
      modbus: TypeExports.Boolean(),
      opcua: TypeExports.Boolean(),
      bacnet: TypeExports.Boolean(),
    }),
    limits: TypeExports.Object({
      timeoutMs: TypeExports.Integer({ minimum: 0 }),
      maxPayloadBytes: TypeExports.Integer({ minimum: 0 }),
      maxConcurrent: TypeExports.Integer({ minimum: 1 }),
    }),
    sources: TypeExports.Array(BunBuddyKindSchema),
  },
  { additionalProperties: false },
);

/**
 * Hardware USB/HID policy schema.
 */
export const HardwareUsbPolicySchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    status: HardwarePolicyStatusSchema,
    reasons: TypeExports.Array(TypeExports.String()),
    timeoutMs: TypeExports.Integer({ minimum: 0 }),
    allowHid: TypeExports.Boolean(),
    allowStorage: TypeExports.Boolean(),
    maxDevices: TypeExports.Integer({ minimum: 0 }),
    allowlist: HardwarePolicyIdListSchema,
    denylist: HardwarePolicyIdListSchema,
    sources: TypeExports.Array(BunBuddyKindSchema),
  },
  { additionalProperties: false },
);

/**
 * Hardware MQTT ingestion policy schema.
 */
export const HardwareMqttPolicySchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    status: HardwarePolicyStatusSchema,
    reasons: TypeExports.Array(TypeExports.String()),
    timeoutMs: TypeExports.Integer({ minimum: 0 }),
    qos: TypeExports.Integer({ minimum: 0, maximum: 2 }),
    retain: TypeExports.Boolean(),
    maxPayloadBytes: TypeExports.Integer({ minimum: 0 }),
    maxInFlight: TypeExports.Integer({ minimum: 1 }),
    brokers: TypeExports.Array(TypeExports.String()),
    topics: TypeExports.Array(TypeExports.String()),
    sources: TypeExports.Array(BunBuddyKindSchema),
  },
  { additionalProperties: false },
);

/**
 * Hardware imaging policy schema.
 */
const HardwareImagingSubPolicySchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    status: HardwarePolicyStatusSchema,
    reasons: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

const HardwareImagingQualityPolicySchema = TypeExports.Object(
  {
    ...HardwareImagingSubPolicySchema.properties,
    enforceOnCapture: TypeExports.Boolean(),
    includeFocus: TypeExports.Boolean(),
    includeEdges: TypeExports.Boolean(),
    edgeThreshold: TypeExports.Number(),
    thresholds: TypeExports.Object(
      {
        minQualityScore: TypeExports.Number(),
        minFocusScore: TypeExports.Number(),
        minContrast: TypeExports.Number(),
        minBrightness: TypeExports.Number(),
        maxBrightness: TypeExports.Number(),
        maxDarkRatio: TypeExports.Number(),
        maxBrightRatio: TypeExports.Number(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

const HardwareImagingPreprocessPolicySchema = TypeExports.Object(
  {
    ...HardwareImagingSubPolicySchema.properties,
    maxOps: TypeExports.Integer({ minimum: 0 }),
    allowedOps: TypeExports.Array(TypeExports.String()),
    defaultPipelineId: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    pipelineIds: TypeExports.Array(TypeExports.String()),
  },
  { additionalProperties: false },
);

const HardwareImagingCalibrationPolicySchema = TypeExports.Object(
  {
    ...HardwareImagingSubPolicySchema.properties,
    minSamples: TypeExports.Integer({ minimum: 0 }),
    pattern: TypeExports.String(),
    patternSize: TypeExports.Object(
      {
        width: TypeExports.Integer({ minimum: 1 }),
        height: TypeExports.Integer({ minimum: 1 }),
      },
      { additionalProperties: false },
    ),
    squareSizeMm: TypeExports.Number(),
  },
  { additionalProperties: false },
);

const HardwareImagingRectifyPolicySchema = TypeExports.Object(
  {
    ...HardwareImagingSubPolicySchema.properties,
    defaultAlpha: TypeExports.Number(),
  },
  { additionalProperties: false },
);

const HardwareImagingSyncCapturePolicySchema = TypeExports.Object(
  {
    ...HardwareImagingSubPolicySchema.properties,
    maxDevices: TypeExports.Integer({ minimum: 1 }),
    timeoutMs: TypeExports.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

const HardwareImagingAssetsPolicySchema = TypeExports.Object(
  {
    ...HardwareImagingSubPolicySchema.properties,
    includeDataUrl: TypeExports.Boolean(),
    retentionDays: TypeExports.Integer({ minimum: 0 }),
    job: TypeExports.Object(
      {
        enabled: TypeExports.Boolean(),
        singletonSeconds: TypeExports.Integer({ minimum: 0 }),
        idempotencyTtlSeconds: TypeExports.Integer({ minimum: 0 }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/** TypeBox schema for HardwareImagingPolicySchema. */
export const HardwareImagingPolicySchema = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    status: HardwarePolicyStatusSchema,
    reasons: TypeExports.Array(TypeExports.String()),
    captureTimeoutMs: TypeExports.Integer({ minimum: 0 }),
    previewTimeoutMs: TypeExports.Integer({ minimum: 0 }),
    maxPayloadBytes: TypeExports.Integer({ minimum: 0 }),
    maxResolution: SplatbaoWidthHeightSchema,
    sources: TypeExports.Array(BunBuddyKindSchema),
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
export const HardwareLifecyclePolicySchema: TObject<
  {
    readonly enabled: TBoolean;
    readonly status: TUnion<
      [
        TLiteral<"unknown" | "healthy" | "degraded" | "disabled" | "blocked">,
        ...TLiteral<"unknown" | "healthy" | "degraded" | "disabled" | "blocked">[],
      ]
    >;
    readonly reasons: TArray<TString>;
    readonly statusOnEnroll: TString;
    readonly statusOnProvision: TString;
    readonly requireEnrollmentToken: TBoolean;
    readonly idempotencyTtlSeconds: TInteger;
    readonly job: TObject<
      { readonly enabled: TBoolean; readonly singletonSeconds: TInteger },
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
> = TypeExports.Object(
  {
    enabled: TypeExports.Boolean(),
    status: HardwarePolicyStatusSchema,
    reasons: TypeExports.Array(TypeExports.String()),
    statusOnEnroll: TypeExports.String(),
    statusOnProvision: TypeExports.String(),
    requireEnrollmentToken: TypeExports.Boolean(),
    idempotencyTtlSeconds: TypeExports.Integer({ minimum: 0 }),
    job: TypeExports.Object({
      enabled: TypeExports.Boolean(),
      singletonSeconds: TypeExports.Integer({ minimum: 0 }),
    }),
  },
  { additionalProperties: false },
);

/**
 * Hardware policy snapshot schema.
 */
export const HardwarePolicySnapshotSchema = TypeExports.Object(
  {
    timestamp: TypeExports.String({ format: "date-time" }),
    policies: TypeExports.Object({
      industrialGateway: HardwareIndustrialPolicySchema,
      usbHid: HardwareUsbPolicySchema,
      mqttIngestion: HardwareMqttPolicySchema,
      imagingPipeline: HardwareImagingPolicySchema,
      deviceLifecycle: HardwareLifecyclePolicySchema,
    }),
    sources: TypeExports.Object({
      bunbuddies: TypeExports.Array(HardwarePolicyBunBuddySourceSchema),
    }),
  },
  { additionalProperties: false },
);

/** Inferred type from the HardwarePolicySnapshot schema. */
export type HardwarePolicySnapshot = Static<typeof HardwarePolicySnapshotSchema>;

/**
 * Hardware policy snapshot response schema.
 */
export const HardwarePolicySnapshotResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    data: HardwarePolicySnapshotSchema,
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/** Inferred type from the HardwarePolicySnapshotResponse schema. */
export type HardwarePolicySnapshotResponse = Static<typeof HardwarePolicySnapshotResponseSchema>;
