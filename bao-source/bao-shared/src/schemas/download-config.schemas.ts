/**
 * Download handling configuration schemas.
 *
 * Defines TypeBox schemas for download buffer limits and cache control
 * settings used by server-side download handlers.
 *
 * @shared/schemas/download-config
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Numeric config value for download settings (literal or env-resolved string).
 */
export const DownloadNumericSchema: Type.TUnion<(Type.TString | Type.TNumber)[]> = Type.Union(
  [Type.Number(), Type.String({ minLength: 1 })],
  {},
);

/**
 * Boolean config value for download settings (literal or env-resolved string).
 */
export const DownloadBooleanSchema: Type.TUnion<(Type.TBoolean | Type.TString)[]> = Type.Union(
  [Type.Boolean(), Type.String({ minLength: 1 })],
  {},
);

/**
 * Cache-Control header configuration for downloads.
 */
export const DownloadCacheControlSchema: Type.TObject<
  { readonly stream: Type.TString; readonly file: Type.TString },
  "stream" | "file",
  never
> = Type.Object(
  {
    stream: Type.String({ minLength: 1 }),
    file: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

/**
 * Bounds range for numeric download settings.
 */
export const DownloadBoundsSchema: Type.TObject<
  {
    readonly min: Type.TUnion<(Type.TString | Type.TNumber)[]>;
    readonly max: Type.TUnion<(Type.TString | Type.TNumber)[]>;
  },
  "min" | "max",
  never
> = Type.Object(
  {
    min: DownloadNumericSchema,
    max: DownloadNumericSchema,
  },
  { additionalProperties: false },
);

/**
 * Download progress monitoring configuration schema.
 */
export const DownloadMonitoringSchema: Type.TObject<
  {
    readonly enabled: Type.TUnion<(Type.TString | Type.TBoolean)[]>;
    readonly flushIntervalMs: Type.TUnion<(Type.TString | Type.TNumber)[]>;
    readonly stallTimeoutMs: Type.TUnion<(Type.TString | Type.TNumber)[]>;
    readonly stallCheckIntervalMs: Type.TUnion<(Type.TString | Type.TNumber)[]>;
  },
  "enabled" | "flushIntervalMs" | "stallTimeoutMs" | "stallCheckIntervalMs",
  never
> = Type.Object(
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
export const DownloadMonitoringBoundsSchema: Type.TObject<
  {
    readonly flushIntervalMs: Type.TObject<
      {
        readonly min: Type.TUnion<(Type.TString | Type.TNumber)[]>;
        readonly max: Type.TUnion<(Type.TString | Type.TNumber)[]>;
      },
      "min" | "max",
      never
    >;
    readonly stallTimeoutMs: Type.TObject<
      {
        readonly min: Type.TUnion<(Type.TString | Type.TNumber)[]>;
        readonly max: Type.TUnion<(Type.TString | Type.TNumber)[]>;
      },
      "min" | "max",
      never
    >;
    readonly stallCheckIntervalMs: Type.TObject<
      {
        readonly min: Type.TUnion<(Type.TString | Type.TNumber)[]>;
        readonly max: Type.TUnion<(Type.TString | Type.TNumber)[]>;
      },
      "min" | "max",
      never
    >;
  },
  "flushIntervalMs" | "stallTimeoutMs" | "stallCheckIntervalMs",
  never
> = Type.Object(
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
export const DownloadConfigSchema = Type.Object(
  {
    maxBufferBytes: DownloadNumericSchema,
    cacheControl: DownloadCacheControlSchema,
    monitoring: Type.Optional(DownloadMonitoringSchema),
    bounds: Type.Object(
      {
        maxBufferBytes: DownloadBoundsSchema,
        monitoring: Type.Optional(DownloadMonitoringBoundsSchema),
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
