/**
 * Shared case dashboard schemas.
 *
 * Canonical contracts for case statistics and recent-case dashboard payloads.
 * These schemas are consumed by both Elysia route responses and htmx/HTML clients.
 *
 * @shared/schemas/case-dashboard
 */

import type {
  Static,
  TArray,
  TLiteral,
  TNumber,
  TObject,
  TOptional,
  TRecord,
  TString,
} from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Case activity aggregate item for dashboard trend charts.
 */
export const CaseStatsRecentActivityItemSchema: TObject<
  { readonly date: TString; readonly created: TNumber; readonly completed: TNumber },
  "date" | "created" | "completed",
  never
> = TypeExports.Object(
  {
    date: TypeExports.String(),
    created: TypeExports.Number(),
    completed: TypeExports.Number(),
  },
  { additionalProperties: false },
);

/**
 * Inferred type from the case recent activity item schema.
 */
export type CaseStatsRecentActivityItem = Static<typeof CaseStatsRecentActivityItemSchema>;

/**
 * Case statistics payload returned by `GET /api/v1/cases/stats`.
 */
export const CaseStatsResponseSchema: TObject<
  {
    readonly ok: TLiteral<true>;
    readonly totalCases: TNumber;
    readonly byStatus: TRecord<TString, TNumber>;
    readonly byPriority: TRecord<TString, TNumber>;
    readonly byWorkflowState: TRecord<TString, TNumber>;
    readonly recentActivity: TOptional<
      TArray<
        TObject<
          {
            readonly date: TString;
            readonly created: TNumber;
            readonly completed: TNumber;
          },
          "date" | "created" | "completed",
          never
        >
      >
    >;
  },
  "ok" | "byStatus" | "byPriority" | "byWorkflowState" | "totalCases",
  "recentActivity"
> = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    totalCases: TypeExports.Number(),
    byStatus: TypeExports.Record(TypeExports.String(), TypeExports.Number()),
    byPriority: TypeExports.Record(TypeExports.String(), TypeExports.Number()),
    byWorkflowState: TypeExports.Record(TypeExports.String(), TypeExports.Number()),
    recentActivity: TypeExports.Optional(TypeExports.Array(CaseStatsRecentActivityItemSchema)),
  },
  { additionalProperties: false },
);

/**
 * Inferred type from the case statistics response schema.
 */
export type CaseStatsResponse = Static<typeof CaseStatsResponseSchema>;

/**
 * Recent case item returned by `GET /api/v1/cases/recent`.
 */
export const RecentCaseItemSchema = TypeExports.Object(
  {
    id: TypeExports.String(),
    caseId: TypeExports.String(),
    accessionNumber: TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    patientName: TypeExports.Optional(
      TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    ),
    specimenType: TypeExports.String(),
    status: TypeExports.String(),
    workflowState: TypeExports.Optional(
      TypeExports.Union([TypeExports.String(), TypeExports.Null()]),
    ),
    updatedAt: TypeExports.Optional(TypeExports.String({ format: "date-time" })),
    createdAt: TypeExports.String({ format: "date-time" }),
    imageCount: TypeExports.Number(),
  },
  { additionalProperties: true },
);

/**
 * Inferred type from the recent case item schema.
 */
export type RecentCaseItem = Static<typeof RecentCaseItemSchema>;

/**
 * Recent cases payload returned by `GET /api/v1/cases/recent`.
 */
export const RecentCasesResponseSchema = TypeExports.Object(
  {
    ok: TypeExports.Literal(true),
    items: TypeExports.Array(RecentCaseItemSchema),
    timestamp: TypeExports.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Inferred type from the recent cases response schema.
 */
export type RecentCasesResponse = Static<typeof RecentCasesResponseSchema>;
