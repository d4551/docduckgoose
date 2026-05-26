/**
 * Download handling configuration schemas.
 *
 * Defines TypeBox schemas for download buffer limits and cache control
 * settings used by server-side download handlers.
 *
 * @shared/schemas/download-config
 */

import type { Static, TBoolean, TNumber, TObject, TString, TUnion } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Numeric config value for download settings (literal or env-resolved string).
 */
export const DownloadNumericSchema: TUnion<(TString | TNumber)[]> = TypeExports.Union(
  [TypeExports.Number(), TypeExports.String({ minLength: 1 })],
  {},
);

/**
 * Boolean config value for download settings (literal or env-resolved string).
 */
export const DownloadBooleanSchema: TUnion<(TBoolean | TString)[]> = TypeExports.Union(
  [TypeExports.Boolean(), TypeExports.String({ minLength: 1 })],
  {},
);

/**
 * Cache-Control header configuration for downloads.
 */
export const DownloadCacheControlSchema: TObject<
  { readonly stream: TString; readonly file: TString },
  "stream" | "file",
  never
> = TypeExports.Object(
  {
    stream: TypeExports.String({ minLength: 1 }),
    file: TypeExports.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Bounds range for numeric download settings.
 */
export const DownloadBoundsSchema: TObject<
  {
    readonly min: TUnion<(TString | TNumber)[]>;
    readonly max: TUnion<(TString | TNumber)[]>;
  },
  "min" | "max",
  never
> = TypeExports.Object(
  {
    min: DownloadNumericSchema,
    max: DownloadNumericSchema,
  },
  { additionalProperties: false },
);

/**
 * Download progress monitoring configuration schema.
 */
export const DownloadMonitoringSchema: TObject<
  {
    readonly enabled: TUnion<(TString | TBoolean)[]>;
    readonly flushIntervalMs: TUnion<(TString | TNumber)[]>;
    readonly stallTimeoutMs: TUnion<(TString | TNumber)[]>;
    readonly stallCheckIntervalMs: TUnion<(TString | TNumber)[]>;
  },
  "enabled" | "flushIntervalMs" | "stallTimeoutMs" | "stallCheckIntervalMs",
  never
> = TypeExports.Object(
  {
    enabled: DownloadBooleanSchema,
    flushIntervalMs: DownloadNumericSchema,
    stallTimeoutMs: DownloadNumericSchema,
    stallCheckIntervalMs: DownloadNumericSchema,
  },
  { additionalProperties: false },
);

/**
 * Bounds range for download monitoring configuration.
 */
export const DownloadMonitoringBoundsSchema: TObject<
  {
    readonly flushIntervalMs: TObject<
      {
        readonly min: TUnion<(TString | TNumber)[]>;
        readonly max: TUnion<(TString | TNumber)[]>;
      },
      "min" | "max",
      never
    >;
    readonly stallTimeoutMs: TObject<
      {
        readonly min: TUnion<(TString | TNumber)[]>;
        readonly max: TUnion<(TString | TNumber)[]>;
      },
      "min" | "max",
      never
    >;
    readonly stallCheckIntervalMs: TObject<
      {
        readonly min: TUnion<(TString | TNumber)[]>;
        readonly max: TUnion<(TString | TNumber)[]>;
      },
      "min" | "max",
      never
    >;
  },
  "flushIntervalMs" | "stallTimeoutMs" | "stallCheckIntervalMs",
  never
> = TypeExports.Object(
  {
    flushIntervalMs: DownloadBoundsSchema,
    stallTimeoutMs: DownloadBoundsSchema,
    stallCheckIntervalMs: DownloadBoundsSchema,
  },
  { additionalProperties: false },
);

/**
 * Download configuration schema.
 */
export const DownloadConfigSchema = TypeExports.Object(
  {
    maxBufferBytes: DownloadNumericSchema,
    cacheControl: DownloadCacheControlSchema,
    monitoring: TypeExports.Optional(DownloadMonitoringSchema),
    bounds: TypeExports.Object(
      {
        maxBufferBytes: DownloadBoundsSchema,
        monitoring: TypeExports.Optional(DownloadMonitoringBoundsSchema),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for download configuration.
 */
export type DownloadConfig = Static<typeof DownloadConfigSchema>;
