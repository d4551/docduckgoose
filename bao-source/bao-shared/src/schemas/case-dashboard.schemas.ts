/**
 * Shared case dashboard schemas.
 *
 * Canonical contracts for case statistics and recent-case dashboard payloads.
 * These schemas are consumed by both Elysia route responses and htmx/HTML clients.
 *
 * @shared/schemas/case-dashboard
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Case activity aggregate item for dashboard trend charts.
 */
export const CaseStatsRecentActivityItemSchema: Type.TObject<
  { readonly date: Type.TString; readonly created: Type.TNumber; readonly completed: Type.TNumber },
  "date" | "created" | "completed",
  never
> = Type.Object(
  {
    date: Type.String(),
    created: Type.Number(),
    completed: Type.Number(),
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
export const CaseStatsResponseSchema: Type.TObject<
  {
    readonly ok: Type.TLiteral<true>;
    readonly totalCases: Type.TNumber;
    readonly byStatus: Type.TRecord<Type.TString, Type.TNumber>;
    readonly byPriority: Type.TRecord<Type.TString, Type.TNumber>;
    readonly byWorkflowState: Type.TRecord<Type.TString, Type.TNumber>;
    readonly recentActivity: Type.TOptional<
      Type.TArray<
        Type.TObject<
          {
            readonly date: Type.TString;
            readonly created: Type.TNumber;
            readonly completed: Type.TNumber;
          },
          "date" | "created" | "completed",
          never
        >
      >
    >;
  },
  "ok" | "byStatus" | "byPriority" | "byWorkflowState" | "totalCases",
  "recentActivity"
> = Type.Object(
  {
    ok: Type.Literal(true),
    totalCases: Type.Number(),
    byStatus: Type.Record(Type.String(), Type.Number()),
    byPriority: Type.Record(Type.String(), Type.Number()),
    byWorkflowState: Type.Record(Type.String(), Type.Number()),
    recentActivity: Type.Optional(Type.Array(CaseStatsRecentActivityItemSchema)),
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
export const RecentCaseItemSchema = Type.Object(
  {
    id: Type.String(),
    caseId: Type.String(),
    accessionNumber: Type.Union([Type.String(), Type.Null()]),
    patientName: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    specimenType: Type.String(),
    status: Type.String(),
    workflowState: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    updatedAt: Type.Optional(Type.String({ format: "date-time" })),
    createdAt: Type.String({ format: "date-time" }),
    imageCount: Type.Number(),
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
export const RecentCasesResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    items: Type.Array(RecentCaseItemSchema),
    timestamp: Type.String({ format: "date-time" }),
  },
  { additionalProperties: false },
);

/**
 * Inferred type from the recent cases response schema.
 */
export type RecentCasesResponse = Static<typeof RecentCasesResponseSchema>;
