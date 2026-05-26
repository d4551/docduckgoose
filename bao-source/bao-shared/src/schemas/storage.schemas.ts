/**
 * Storage dashboard schemas shared between server and client.
 *
 * Defines storage quota and statistics payloads for system dashboard contracts.
 *
 * @shared/schemas/storage.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Storage quota snapshot schema.
 */
export const StorageQuotaSchema: Type.TObject<
  {
    readonly usageGB: Type.TNumber;
    readonly quotaGB: Type.TNumber;
    readonly percentage: Type.TNumber;
  },
  "usageGB" | "quotaGB" | "percentage",
  never
> = Type.Object(
  {
    usageGB: Type.Number({ minimum: 0 }),
    quotaGB: Type.Number({ minimum: 0 }),
    percentage: Type.Number({ minimum: 0, maximum: 100 }),
  },
  { additionalProperties: false },
);

/**
 * Storage store statistics schema.
 */
export const StorageStoreStatsSchema: Type.TObject<
  { readonly name: Type.TString; readonly count: Type.TNumber; readonly size: Type.TNumber },
  "name" | "count" | "size",
  never
> = Type.Object(
  {
    name: Type.String({ minLength: 1 }),
    count: Type.Number({ minimum: 0 }),
    size: Type.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

/**
 * Storage statistics schema.
 */
export const StorageStatisticsSchema: Type.TObject<
  {
    readonly totalRecords: Type.TNumber;
    readonly stores: Type.TArray<
      Type.TObject<
        { readonly name: Type.TString; readonly count: Type.TNumber; readonly size: Type.TNumber },
        "name" | "count" | "size",
        never
      >
    >;
  },
  "stores" | "totalRecords",
  never
> = Type.Object(
  {
    totalRecords: Type.Number({ minimum: 0 }),
    stores: Type.Array(StorageStoreStatsSchema),
  },
  { additionalProperties: false },
);

/**
 * Storage dashboard data schema.
 */
export const StorageDashboardSchema: Type.TObject<
  {
    readonly quota: Type.TObject<
      {
        readonly usageGB: Type.TNumber;
        readonly quotaGB: Type.TNumber;
        readonly percentage: Type.TNumber;
      },
      "usageGB" | "quotaGB" | "percentage",
      never
    >;
    readonly statistics: Type.TObject<
      {
        readonly totalRecords: Type.TNumber;
        readonly stores: Type.TArray<
          Type.TObject<
            {
              readonly name: Type.TString;
              readonly count: Type.TNumber;
              readonly size: Type.TNumber;
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
> = Type.Object(
  {
    quota: StorageQuotaSchema,
    statistics: StorageStatisticsSchema,
  },
  { additionalProperties: false },
);

/**
 * Storage dashboard response schema.
 */
export const StorageDashboardResponseSchema: Type.TObject<
  {
    readonly ok: Type.TBoolean;
    readonly storage: Type.TObject<
      {
        readonly quota: Type.TObject<
          {
            readonly usageGB: Type.TNumber;
            readonly quotaGB: Type.TNumber;
            readonly percentage: Type.TNumber;
          },
          "usageGB" | "quotaGB" | "percentage",
          never
        >;
        readonly statistics: Type.TObject<
          {
            readonly totalRecords: Type.TNumber;
            readonly stores: Type.TArray<
              Type.TObject<
                {
                  readonly name: Type.TString;
                  readonly count: Type.TNumber;
                  readonly size: Type.TNumber;
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
> = Type.Object(
  {
    ok: Type.Boolean(),
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
