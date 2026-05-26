/**
 * Scanner configuration schemas for config validation.
 *
 * Defines TypeBox schemas for scanner-bunbuddy timeout configuration and bounds
 * to validate config.json values at runtime in contract tests.
 *
 * @shared/schemas/scanner-config.ts
 */

import type { Static, TNumber, TObject, TString, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Scanner timeout numeric config value (literal or env-resolved string).
 */
export const ScannerTimeoutNumericSchema: TUnion<(TString | TNumber)[]> = TypeExports.Union(
  [TypeExports.Number(), TypeExports.String({ minLength: 1 })],
  {},
);

/**
 * Scanner bunbuddy timeout configuration schema.
 */
export const ScannerBunBuddyTimeoutConfigSchema = TypeExports.Object(
  {
    getTimeoutMs: ScannerTimeoutNumericSchema,
    postTimeoutMs: ScannerTimeoutNumericSchema,
    rawTimeoutMs: ScannerTimeoutNumericSchema,
    previewStreamTimeoutMs: TypeExports.Optional(ScannerTimeoutNumericSchema),
    previewSnapshotTimeoutMs: TypeExports.Optional(ScannerTimeoutNumericSchema),
    downloadTimeoutMs: TypeExports.Optional(ScannerTimeoutNumericSchema),
    deviceSyncTimeoutMs: TypeExports.Optional(ScannerTimeoutNumericSchema),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for scanner bunbuddy timeout config.
 */
export type ScannerBunBuddyTimeoutConfig = Static<typeof ScannerBunBuddyTimeoutConfigSchema>;

/**
 * Scanner timeout bounds schema.
 */
export const ScannerTimeoutBoundsSchema: TObject<
  {
    readonly min: TUnion<(TString | TNumber)[]>;
    readonly max: TUnion<(TString | TNumber)[]>;
  },
  "min" | "max",
  never
> = TypeExports.Object(
  {
    min: ScannerTimeoutNumericSchema,
    max: ScannerTimeoutNumericSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for scanner timeout bounds.
 */
export type ScannerTimeoutBounds = Static<typeof ScannerTimeoutBoundsSchema>;

/**
 * Scanner bunbuddy timeout bounds configuration schema.
 */
export const ScannerBunBuddyTimeoutBoundsConfigSchema = TypeExports.Object(
  {
    getTimeoutMs: ScannerTimeoutBoundsSchema,
    postTimeoutMs: ScannerTimeoutBoundsSchema,
    rawTimeoutMs: ScannerTimeoutBoundsSchema,
    previewStreamTimeoutMs: ScannerTimeoutBoundsSchema,
    previewSnapshotTimeoutMs: ScannerTimeoutBoundsSchema,
    downloadTimeoutMs: ScannerTimeoutBoundsSchema,
    deviceSyncTimeoutMs: ScannerTimeoutBoundsSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for scanner bunbuddy timeout bounds config.
 */
export type ScannerBunBuddyTimeoutBoundsConfig = Static<
  typeof ScannerBunBuddyTimeoutBoundsConfigSchema
>;

/**
 * Scanner configuration schema.
 */
export const ScannerConfigSchema = TypeExports.Object(
  {
    bunbuddy: TypeExports.Object(
      {
        timeouts: ScannerBunBuddyTimeoutConfigSchema,
        bounds: TypeExports.Object(
          {
            timeouts: ScannerBunBuddyTimeoutBoundsConfigSchema,
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for scanner configuration.
 */
export type ScannerConfig = Static<typeof ScannerConfigSchema>;
