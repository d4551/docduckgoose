import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

export const OperationalReportTypeSchema = TypeExports.Union(
  [
    TypeExports.Literal("depreciation-summary"),
    TypeExports.Literal("asset-summary"),
    TypeExports.Literal("predictions-summary"),
    TypeExports.Literal("utilisation-summary"),
    TypeExports.Literal("executive-summary"),
    TypeExports.Literal("estate-operational-picture"),
    TypeExports.Literal("strategic-decision-intelligence"),
    TypeExports.Literal("work-order-throughput"),
    TypeExports.Literal("purchase-order-aging"),
    TypeExports.Literal("customer-order-funnel"),
    TypeExports.Literal("invoice-aging"),
    TypeExports.Literal("rfq-conversion"),
  ],
  { description: "Operational report types harvested from RockeTrodeo reporting." },
);

export type OperationalReportType = Static<typeof OperationalReportTypeSchema>;

export const OperationalAssetPostureSchema = TypeExports.Union(
  [
    TypeExports.Literal("under"),
    TypeExports.Literal("watch"),
    TypeExports.Literal("optimal"),
    TypeExports.Literal("over"),
  ],
  { description: "Operational utilisation posture bucket." },
);

export type OperationalAssetPosture = Static<typeof OperationalAssetPostureSchema>;

export const OperationalAssetSummarySchema = TypeExports.Object(
  {
    assetCount: TypeExports.Number({ minimum: 0 }),
    averageUtilisationPercent: TypeExports.Number({ minimum: 0, maximum: 100 }),
    highRiskAssetCount: TypeExports.Number({ minimum: 0 }),
    openWorkOrderCount: TypeExports.Number({ minimum: 0 }),
    overdueTaskCount: TypeExports.Number({ minimum: 0 }),
    criticalPredictionCount: TypeExports.Number({ minimum: 0 }),
    replacementExposure: TypeExports.Number({ minimum: 0 }),
  },
  { additionalProperties: false },
);

export type OperationalAssetSummary = Static<typeof OperationalAssetSummarySchema>;

export const FinanceCurrencyMixRowSchema = TypeExports.Object(
  {
    currency: TypeExports.String({ minLength: 3, maxLength: 3 }),
    openInvoiceAmount: TypeExports.Number(),
    settledReceiptAmount: TypeExports.Number(),
    openInvoiceCount: TypeExports.Number({ minimum: 0 }),
    settledReceiptCount: TypeExports.Number({ minimum: 0 }),
    totalDocumentCount: TypeExports.Number({ minimum: 0 }),
    documentSharePercent: TypeExports.Number({ minimum: 0, maximum: 100 }),
    isOperationalCurrency: TypeExports.Boolean(),
  },
  { additionalProperties: false },
);

export type FinanceCurrencyMixRow = Static<typeof FinanceCurrencyMixRowSchema>;

export const FinanceIntelligenceSnapshotSchema = TypeExports.Object(
  {
    generatedAt: TypeExports.String({ format: "date-time" }),
    scopeLabel: TypeExports.String({ minLength: 1 }),
    periodLabel: TypeExports.String({ minLength: 1 }),
    operationalCurrency: TypeExports.String({ minLength: 3, maxLength: 3 }),
    totalOpenInvoiceCount: TypeExports.Number({ minimum: 0 }),
    totalSettledReceiptCount: TypeExports.Number({ minimum: 0 }),
    totalDocumentCount: TypeExports.Number({ minimum: 0 }),
    currencyRows: TypeExports.Array(FinanceCurrencyMixRowSchema),
  },
  { additionalProperties: false },
);

export type FinanceIntelligenceSnapshot = Static<typeof FinanceIntelligenceSnapshotSchema>;

export const CommercialDocumentKindSchema = TypeExports.Union(
  [
    TypeExports.Literal("rfq"),
    TypeExports.Literal("customer-order"),
    TypeExports.Literal("purchase-order"),
    TypeExports.Literal("invoice"),
    TypeExports.Literal("work-order"),
  ],
  { description: "Commercial document kinds imported from RockeTrodeo." },
);

export type CommercialDocumentKind = Static<typeof CommercialDocumentKindSchema>;

export const TaskAssignmentRecommendationSchema = TypeExports.Object(
  {
    taskCardId: TypeExports.String({ minLength: 1 }),
    assigneeId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    crewId: TypeExports.Union([TypeExports.String({ minLength: 1 }), TypeExports.Null()]),
    confidence: TypeExports.Number({ minimum: 0, maximum: 1 }),
    reasonCode: TypeExports.Union([
      TypeExports.Literal("assignee-continuity"),
      TypeExports.Literal("assignee-load"),
      TypeExports.Literal("crew-capacity"),
      TypeExports.Literal("crew-escalation"),
      TypeExports.Literal("no-match"),
    ]),
  },
  { additionalProperties: false },
);

export type TaskAssignmentRecommendation = Static<typeof TaskAssignmentRecommendationSchema>;
