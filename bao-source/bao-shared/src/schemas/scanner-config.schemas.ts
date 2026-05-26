/**
 * Scanner configuration schemas for config validation.
 *
 * Defines TypeBox schemas for scanner-bunbuddy timeout configuration and bounds
 * to validate config.json values at runtime in contract tests.
 *
 * @shared/schemas/scanner-config.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Scanner timeout numeric config value (literal or env-resolved string).
 */
export const ScannerTimeoutNumericSchema: Type.TUnion<(Type.TString | Type.TNumber)[]> = Type.Union(
  [Type.Number(), Type.String({ minLength: 1 })],
  {},
);

/**
 * Scanner bunbuddy timeout configuration schema.
 */
export const ScannerBunBuddyTimeoutConfigSchema = Type.Object(
  {
    getTimeoutMs: ScannerTimeoutNumericSchema,
    postTimeoutMs: ScannerTimeoutNumericSchema,
    rawTimeoutMs: ScannerTimeoutNumericSchema,
    previewStreamTimeoutMs: Type.Optional(ScannerTimeoutNumericSchema),
    previewSnapshotTimeoutMs: Type.Optional(ScannerTimeoutNumericSchema),
    downloadTimeoutMs: Type.Optional(ScannerTimeoutNumericSchema),
    deviceSyncTimeoutMs: Type.Optional(ScannerTimeoutNumericSchema),
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
export const ScannerTimeoutBoundsSchema: Type.TObject<
  {
    readonly min: Type.TUnion<(Type.TString | Type.TNumber)[]>;
    readonly max: Type.TUnion<(Type.TString | Type.TNumber)[]>;
  },
  "min" | "max",
  never
> = Type.Object(
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
export const ScannerBunBuddyTimeoutBoundsConfigSchema = Type.Object(
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
export const ScannerConfigSchema = Type.Object(
  {
    bunbuddy: Type.Object(
      {
        timeouts: ScannerBunBuddyTimeoutConfigSchema,
        bounds: Type.Object(
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
