/**
 * Storage dashboard schemas shared between server and client.
 *
 * Defines storage quota and statistics payloads for system dashboard contracts.
 *
 * @shared/schemas/storage.ts
 */

import type { Static, TArray, TBoolean, TNumber, TObject, TString } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Storage quota snapshot schema.
 */
export const StorageQuotaSchema: TObject<
  {
    readonly usageGB: TNumber;
    readonly quotaGB: TNumber;
    readonly percentage: TNumber;
  },
  "usageGB" | "quotaGB" | "percentage",
  never
> = TypeExports.Object(
  {
    usageGB: TypeExports.Number({ minimum: 0 }),
    quotaGB: TypeExports.Number({ minimum: 0 }),
    percentage: TypeExports.Number({ minimum: 0, maximum: 100 }),
  },
  { additionalProperties: false },
);

/**
 * Storage store statistics schema.
 */
export const StorageStoreStatsSchema: TObject<
  { readonly name: TString; readonly count: TNumber; readonly size: TNumber },
  "name" | "count" | "size",
  never
> = TypeExports.Object(
  {
    name: TypeExports.String({ minLength: 1 }),
    count: TypeExports.Number({ minimum: 0 }),
    size: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * Storage statistics schema.
 */
export const StorageStatisticsSchema: TObject<
  {
    readonly totalRecords: TNumber;
    readonly stores: TArray<
      TObject<
        { readonly name: TString; readonly count: TNumber; readonly size: TNumber },
        "name" | "count" | "size",
        never
      >
    >;
  },
  "stores" | "totalRecords",
  never
> = TypeExports.Object(
  {
    totalRecords: TypeExports.Number({ minimum: 0 }),
    stores: TypeExports.Array(StorageStoreStatsSchema),
  },
  { additionalProperties: false },
);

/**
 * Storage dashboard data schema.
 */
export const StorageDashboardSchema: TObject<
  {
    readonly quota: TObject<
      {
        readonly usageGB: TNumber;
        readonly quotaGB: TNumber;
        readonly percentage: TNumber;
      },
      "usageGB" | "quotaGB" | "percentage",
      never
    >;
    readonly statistics: TObject<
      {
        readonly totalRecords: TNumber;
        readonly stores: TArray<
          TObject<
            {
              readonly name: TString;
              readonly count: TNumber;
              readonly size: TNumber;
            },
            "name" | "count" | "size",
            never
          >
        >;
      },
      "stores" | "totalRecords",
      never
    >;
  },
  "quota" | "statistics",
  never
> = TypeExports.Object(
  {
    quota: StorageQuotaSchema,
    statistics: StorageStatisticsSchema,
  },
  { additionalProperties: false },
);

/**
 * Storage dashboard response schema.
 */
export const StorageDashboardResponseSchema: TObject<
  {
    readonly ok: TBoolean;
    readonly storage: TObject<
      {
        readonly quota: TObject<
          {
            readonly usageGB: TNumber;
            readonly quotaGB: TNumber;
            readonly percentage: TNumber;
          },
          "usageGB" | "quotaGB" | "percentage",
          never
        >;
        readonly statistics: TObject<
          {
            readonly totalRecords: TNumber;
            readonly stores: TArray<
              TObject<
                {
                  readonly name: TString;
                  readonly count: TNumber;
                  readonly size: TNumber;
                },
                "name" | "count" | "size",
                never
              >
            >;
          },
          "stores" | "totalRecords",
          never
        >;
      },
      "quota" | "statistics",
      never
    >;
  },
  "ok" | "storage",
  never
> = TypeExports.Object(
  {
    ok: TypeExports.Boolean(),
    storage: StorageDashboardSchema,
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for storage quota snapshots.
 */
export type StorageQuota = Static<typeof StorageQuotaSchema>;

/**
 * TypeScript type for storage store stats.
 */
export type StorageStoreStats = Static<typeof StorageStoreStatsSchema>;

/**
 * TypeScript type for storage statistics.
 */
export type StorageStatistics = Static<typeof StorageStatisticsSchema>;

/**
 * TypeScript type for storage dashboard data.
 */
export type StorageDashboard = Static<typeof StorageDashboardSchema>;

/**
 * TypeScript type for storage dashboard response payloads.
 */
export type StorageDashboardResponse = Static<typeof StorageDashboardResponseSchema>;
