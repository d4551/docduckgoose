/**
 * BunBuddy capabilities configuration schemas.
 *
 * Defines TypeBox schemas for bunbuddy capability probe config validation.
 *
 * @shared/schemas/bunbuddy-capabilities-config
 */

import type { Static, TBoolean, TNumber, TObject, TString, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * BunBuddy capabilities numeric config value (literal or env-resolved string).
 */
export const BunBuddyCapabilitiesNumericSchema: TUnion<(TString | TNumber)[]> = TypeExports.Union(
  [TypeExports.Number(), TypeExports.String({ minLength: 1 })],
  {},
);

/**
 * BunBuddy capabilities boolean config value (literal or env-resolved string).
 */
export const BunBuddyCapabilitiesBooleanSchema: TUnion<(TBoolean | TString)[]> = TypeExports.Union(
  [TypeExports.Boolean(), TypeExports.String({ minLength: 1 })],
  {},
);

/**
 * BunBuddy capabilities error config schema.
 */
export const BunBuddyCapabilitiesErrorConfigSchema: TObject<
  {
    readonly code: TString;
    readonly status: TUnion<(TString | TNumber)[]>;
    readonly message: TString;
  },
  "code" | "status" | "message",
  never
> = TypeExports.Object(
  {
    code: TypeExports.String({ minLength: 1 }),
    status: BunBuddyCapabilitiesNumericSchema,
    message: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capabilities error set schema.
 */
export const BunBuddyCapabilitiesErrorsConfigSchema: TObject<
  {
    readonly invalidResponse: TObject<
      {
        readonly code: TString;
        readonly status: TUnion<(TString | TNumber)[]>;
        readonly message: TString;
      },
      "code" | "status" | "message",
      never
    >;
    readonly missingContract: TObject<
      {
        readonly code: TString;
        readonly status: TUnion<(TString | TNumber)[]>;
        readonly message: TString;
      },
      "code" | "status" | "message",
      never
    >;
  },
  "invalidResponse" | "missingContract",
  never
> = TypeExports.Object(
  {
    invalidResponse: BunBuddyCapabilitiesErrorConfigSchema,
    missingContract: BunBuddyCapabilitiesErrorConfigSchema,
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capabilities bounds schema.
 */
export const BunBuddyCapabilitiesBoundsConfigSchema: TObject<
  {
    readonly maxConcurrent: TObject<
      {
        readonly min: TUnion<(TString | TNumber)[]>;
        readonly max: TUnion<(TString | TNumber)[]>;
      },
      "min" | "max",
      never
    >;
  },
  "maxConcurrent",
  never
> = TypeExports.Object(
  {
    maxConcurrent: TypeExports.Object(
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
export const BunBuddyCapabilitiesValidationConfigSchema: TObject<
  {
    readonly enabled: TUnion<(TBoolean | TString)[]>;
    readonly strict: TUnion<(TBoolean | TString)[]>;
  },
  "enabled" | "strict",
  never
> = TypeExports.Object(
  {
    enabled: BunBuddyCapabilitiesBooleanSchema,
    strict: BunBuddyCapabilitiesBooleanSchema,
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capabilities telemetry config schema.
 */
export const BunBuddyCapabilitiesTelemetryConfigSchema: TObject<
  { readonly spanName: TString },
  "spanName",
  never
> = TypeExports.Object(
  {
    spanName: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capacity threshold schema.
 */
export const BunBuddyCapabilitiesCapacityThresholdSchema: TObject<
  {
    readonly cpuUtilizationPct: TUnion<(TString | TNumber)[]>;
    readonly memoryUtilizationPct: TUnion<(TString | TNumber)[]>;
    readonly gpuUtilizationPct: TUnion<(TString | TNumber)[]>;
    readonly concurrencyUtilizationPct: TUnion<(TString | TNumber)[]>;
    readonly queueDepthUtilizationPct: TUnion<(TString | TNumber)[]>;
  },
  | "cpuUtilizationPct"
  | "memoryUtilizationPct"
  | "gpuUtilizationPct"
  | "concurrencyUtilizationPct"
  | "queueDepthUtilizationPct",
  never
> = TypeExports.Object(
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
export const BunBuddyCapabilitiesCapacityBoundsSchema: TObject<
  {
    readonly utilizationPct: TObject<
      {
        readonly min: TUnion<(TString | TNumber)[]>;
        readonly max: TUnion<(TString | TNumber)[]>;
      },
      "min" | "max",
      never
    >;
  },
  "utilizationPct",
  never
> = TypeExports.Object(
  {
    utilizationPct: TypeExports.Object(
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
export const BunBuddyCapabilitiesCapacityConfigSchema = TypeExports.Object(
  {
    thresholds: BunBuddyCapabilitiesCapacityThresholdSchema,
    bounds: BunBuddyCapabilitiesCapacityBoundsSchema,
  },
  { additionalProperties: false },
);

/**
 * BunBuddy capabilities config schema.
 */
export const BunBuddyCapabilitiesConfigSchema = TypeExports.Object(
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
