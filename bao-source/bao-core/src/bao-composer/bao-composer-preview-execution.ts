/**
 * BaoComposer preview, artifacts, execution lifecycle, and combined improvement payloads.
 *
 * @baohaus/bao-core/bao-composer/bao-composer-preview-execution
 */

import { BaoManifestSchema } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import { BaoInstallPlanSchema } from "@baohaus/bao-schemas/bao-install/runtime.schemas";
import { BaoInstallTargetSchema } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import { stringEnum } from "@baohaus/bao-schemas/baobox-enum";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  BaoComposerDraftSchema,
  BaoComposerProposalSchema,
} from "./bao-composer-drafts-messages.ts";
import {
  BaoComposerBaoImportProvenanceSchema,
  BaoComposerMergeConflictSchema,
  BaoComposerRecipeSchema,
  BaoComposerSourceFragmentSchema,
  BaoComposerValidationIssueSchema,
} from "./bao-composer-fragments-catalog.ts";
import { BaoComposerOutputModeSchema, BaoComposerRecipeIdSchema } from "./bao-composer-identity.ts";
import {
  BaoComposerImprovementCycleSchema,
  BaoComposerImprovementDiffSchema,
  BaoComposerImprovementReadinessSchema,
  BaoComposerImprovementRecommendationSchema,
  BaoComposerImprovementResearchSchema,
  BaoComposerImprovementStatusSchema,
} from "./bao-composer-improvement.ts";

/**
 * Output policy resolved for one preview or artifact.
 */
export const BaoComposerOutputPolicySchema: Type.TObject<
  {
    readonly outputMode: Type.TUnion<
      [Type.TLiteral<"repo" | "external">, ...Type.TLiteral<"repo" | "external">[]]
    >;
    readonly outputPath: Type.TString;
    readonly schemaRef: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly sourceId: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "schemaRef" | "sourceId" | "outputMode" | "outputPath",
  never
> = Type.Object(
  {
    outputMode: BaoComposerOutputModeSchema,
    outputPath: Type.String({ minLength: 1 }),
    schemaRef: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    sourceId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer output policy type.
 */
export type BaoComposerOutputPolicyV1 = Static<typeof BaoComposerOutputPolicySchema>;

/**
 * Preview result for a composed BaoComposer manifest.
 */
export const BaoComposerPreviewSchema = Type.Object(
  {
    manifest: BaoManifestSchema,
    sourceFragments: Type.Array(BaoComposerSourceFragmentSchema),
    importedTargets: Type.Array(BaoInstallTargetSchema),
    selectedRecipes: Type.Array(BaoComposerRecipeSchema),
    validationErrors: Type.Array(BaoComposerValidationIssueSchema),
    mergeConflicts: Type.Array(BaoComposerMergeConflictSchema),
    warnings: Type.Array(BaoComposerValidationIssueSchema),
    installPlan: BaoInstallPlanSchema,
    checksum: Type.String({ minLength: 1 }),
    outputPolicy: BaoComposerOutputPolicySchema,
    baoImportProvenance: Type.Union([BaoComposerBaoImportProvenanceSchema, Type.Null()]),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer preview type.
 */
export type BaoComposerPreviewV1 = Static<typeof BaoComposerPreviewSchema>;

/**
 * Immutable generated BaoComposer artifact.
 */
export const BaoComposerArtifactSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    draftId: Type.String({ minLength: 1 }),
    checksum: Type.String({ minLength: 1 }),
    manifest: BaoManifestSchema,
    sourceFragments: Type.Array(BaoComposerSourceFragmentSchema),
    importedTargets: Type.Array(BaoInstallTargetSchema),
    selectedRecipeIds: Type.Array(BaoComposerRecipeIdSchema),
    outputPolicy: BaoComposerOutputPolicySchema,
    baoImportProvenance: Type.Union([BaoComposerBaoImportProvenanceSchema, Type.Null()]),
    createdAt: Type.String({ format: "date-time" }),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer artifact type.
 */
export type BaoComposerArtifactV1 = Static<typeof BaoComposerArtifactSchema>;

/**
 * Supported BaoComposer execution phases.
 */
export const BAO_COMPOSER_EXECUTION_PHASE_IDS: readonly [
  "preview",
  "improve",
  "generate",
  "install",
  "active",
  "failed",
] = ["preview", "improve", "generate", "install", "active", "failed"] as const;

/**
 * BaoComposer execution phase schema.
 */
export const BaoComposerExecutionPhaseSchema: Type.TUnion<
  [
    Type.TLiteral<"preview" | "improve" | "generate" | "install" | "active" | "failed">,
    ...Type.TLiteral<"preview" | "improve" | "generate" | "install" | "active" | "failed">[],
  ]
> = stringEnum(BAO_COMPOSER_EXECUTION_PHASE_IDS, {});

/**
 * BaoComposer execution phase type.
 */
export type BaoComposerExecutionPhase = Static<typeof BaoComposerExecutionPhaseSchema>;

/**
 * Supported BaoComposer execution statuses.
 */
export const BAO_COMPOSER_EXECUTION_STATUS_IDS: readonly [
  "ready",
  "generated",
  "queued",
  "active",
  "failed",
] = ["ready", "generated", "queued", "active", "failed"] as const;

/**
 * BaoComposer execution status schema.
 */
export const BaoComposerExecutionStatusSchema: Type.TUnion<
  [
    Type.TLiteral<"ready" | "generated" | "queued" | "active" | "failed">,
    ...Type.TLiteral<"ready" | "generated" | "queued" | "active" | "failed">[],
  ]
> = stringEnum(BAO_COMPOSER_EXECUTION_STATUS_IDS, {});

/**
 * BaoComposer execution status type.
 */
export type BaoComposerExecutionStatus = Static<typeof BaoComposerExecutionStatusSchema>;

/**
 * BaoComposer execution lifecycle record.
 */
export const BaoComposerExecutionSchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    draftId: Type.String({ minLength: 1 }),
    artifactId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    contextSnapshotId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    status: BaoComposerExecutionStatusSchema,
    phase: BaoComposerExecutionPhaseSchema,
    baoInstallRunId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    baoDownDefinitionId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    baoDownRunId: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    baoImportProvenance: Type.Union([BaoComposerBaoImportProvenanceSchema, Type.Null()]),
    preview: Type.Optional(BaoComposerPreviewSchema),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer execution type.
 */
export type BaoComposerExecutionV1 = Static<typeof BaoComposerExecutionSchema>;

/**
 * Combined research → propose → preview → diff payload for BaoComposer.
 */
export const BaoComposerImprovementSchema = Type.Object(
  {
    draft: BaoComposerDraftSchema,
    proposal: BaoComposerProposalSchema,
    preview: BaoComposerPreviewSchema,
    research: BaoComposerImprovementResearchSchema,
    diff: BaoComposerImprovementDiffSchema,
    cycle: BaoComposerImprovementCycleSchema,
    recommendations: Type.Array(BaoComposerImprovementRecommendationSchema),
    readiness: BaoComposerImprovementReadinessSchema,
    status: BaoComposerImprovementStatusSchema,
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer improvement response type.
 */
export type BaoComposerImprovementV1 = Static<typeof BaoComposerImprovementSchema>;
