/**
 * BunBuddy capabilities configuration schemas.
 *
 * Defines TypeBox schemas for bunbuddy capability probe config validation.
 *
 * @shared/schemas/bunbuddy-capabilities-config
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * BunBuddy capabilities numeric config value (literal or env-resolved string).
 */
export const BunBuddyCapabilitiesNumericSchema: Type.TUnion<(Type.TString | Type.TNumber)[]> =
  Type.Union([Type.Number(), Type.String({ minLength: 1 })], {});

/**
 * BunBuddy capabilities boolean config value (literal or env-resolved string).
 */
export const BunBuddyCapabilitiesBooleanSchema: Type.TUnion<(Type.TBoolean | Type.TString)[]> =
  Type.Union([Type.Boolean(), Type.String({ minLength: 1 })], {});

/**
 * BunBuddy capabilities error config schema.
 */
export const BunBuddyCapabilitiesErrorConfigSchema: Type.TObject<
  {
    readonly code: Type.TString;
    readonly status: Type.TUnion<(Type.TString | Type.TNumber)[]>;
    readonly message: Type.TString;
  },
  "code" | "status" | "message",
  never
> = Type.Object(
  {
    code: Type.String({ minLength: 1 }),
    status: BunBuddyCapabilitiesNumericSchema,
    message: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capabilities error set schema.
 */
export const BunBuddyCapabilitiesErrorsConfigSchema: Type.TObject<
  {
    readonly invalidResponse: Type.TObject<
      {
        readonly code: Type.TString;
        readonly status: Type.TUnion<(Type.TString | Type.TNumber)[]>;
        readonly message: Type.TString;
      },
      "code" | "status" | "message",
      never
    >;
    readonly missingContract: Type.TObject<
      {
        readonly code: Type.TString;
        readonly status: Type.TUnion<(Type.TString | Type.TNumber)[]>;
        readonly message: Type.TString;
      },
      "code" | "status" | "message",
      never
    >;
  },
  "invalidResponse" | "missingContract",
  never
> = Type.Object(
  {
    invalidResponse: BunBuddyCapabilitiesErrorConfigSchema,
    missingContract: BunBuddyCapabilitiesErrorConfigSchema,
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capabilities bounds schema.
 */
export const BunBuddyCapabilitiesBoundsConfigSchema: Type.TObject<
  {
    readonly maxConcurrent: Type.TObject<
      {
        readonly min: Type.TUnion<(Type.TString | Type.TNumber)[]>;
        readonly max: Type.TUnion<(Type.TString | Type.TNumber)[]>;
      },
      "min" | "max",
      never
    >;
  },
  "maxConcurrent",
  never
> = Type.Object(
  {
    maxConcurrent: Type.Object(
      {
        min: BunBuddyCapabilitiesNumericSchema,
        max: BunBuddyCapabilitiesNumericSchema,
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capabilities validation config schema.
 */
export const BunBuddyCapabilitiesValidationConfigSchema: Type.TObject<
  {
    readonly enabled: Type.TUnion<(Type.TBoolean | Type.TString)[]>;
    readonly strict: Type.TUnion<(Type.TBoolean | Type.TString)[]>;
  },
  "enabled" | "strict",
  never
> = Type.Object(
  {
    enabled: BunBuddyCapabilitiesBooleanSchema,
    strict: BunBuddyCapabilitiesBooleanSchema,
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capabilities telemetry config schema.
 */
export const BunBuddyCapabilitiesTelemetryConfigSchema: Type.TObject<
  { readonly spanName: Type.TString },
  "spanName",
  never
> = Type.Object(
  {
    spanName: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capacity threshold schema.
 */
export const BunBuddyCapabilitiesCapacityThresholdSchema: Type.TObject<
  {
    readonly cpuUtilizationPct: Type.TUnion<(Type.TString | Type.TNumber)[]>;
    readonly memoryUtilizationPct: Type.TUnion<(Type.TString | Type.TNumber)[]>;
    readonly gpuUtilizationPct: Type.TUnion<(Type.TString | Type.TNumber)[]>;
    readonly concurrencyUtilizationPct: Type.TUnion<(Type.TString | Type.TNumber)[]>;
    readonly queueDepthUtilizationPct: Type.TUnion<(Type.TString | Type.TNumber)[]>;
  },
  | "cpuUtilizationPct"
  | "memoryUtilizationPct"
  | "gpuUtilizationPct"
  | "concurrencyUtilizationPct"
  | "queueDepthUtilizationPct",
  never
> = Type.Object(
  {
    cpuUtilizationPct: BunBuddyCapabilitiesNumericSchema,
    memoryUtilizationPct: BunBuddyCapabilitiesNumericSchema,
    gpuUtilizationPct: BunBuddyCapabilitiesNumericSchema,
    concurrencyUtilizationPct: BunBuddyCapabilitiesNumericSchema,
    queueDepthUtilizationPct: BunBuddyCapabilitiesNumericSchema,
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capacity bounds schema.
 */
export const BunBuddyCapabilitiesCapacityBoundsSchema: Type.TObject<
  {
    readonly utilizationPct: Type.TObject<
      {
        readonly min: Type.TUnion<(Type.TString | Type.TNumber)[]>;
        readonly max: Type.TUnion<(Type.TString | Type.TNumber)[]>;
      },
      "min" | "max",
      never
    >;
  },
  "utilizationPct",
  never
> = Type.Object(
  {
    utilizationPct: Type.Object(
      {
        min: BunBuddyCapabilitiesNumericSchema,
        max: BunBuddyCapabilitiesNumericSchema,
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capacity config schema.
 */
export const BunBuddyCapabilitiesCapacityConfigSchema = Type.Object(
  {
    thresholds: BunBuddyCapabilitiesCapacityThresholdSchema,
    bounds: BunBuddyCapabilitiesCapacityBoundsSchema,
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capabilities config schema.
 */
export const BunBuddyCapabilitiesConfigSchema = Type.Object(
  {
    timeoutMs: BunBuddyCapabilitiesNumericSchema,
    warnCooldownMs: BunBuddyCapabilitiesNumericSchema,
    maxConcurrent: BunBuddyCapabilitiesNumericSchema,
    bounds: BunBuddyCapabilitiesBoundsConfigSchema,
    capacity: BunBuddyCapabilitiesCapacityConfigSchema,
    validation: BunBuddyCapabilitiesValidationConfigSchema,
    telemetry: BunBuddyCapabilitiesTelemetryConfigSchema,
    errors: BunBuddyCapabilitiesErrorsConfigSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for bunbuddy capabilities config.
 */
export type BunBuddyCapabilitiesConfig = Static<typeof BunBuddyCapabilitiesConfigSchema>;
