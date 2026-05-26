/**
 * BaoComposer validation, provenance, merge shapes, and public catalog objects.
 *
 * @baohaus/bao-core/bao-composer/bao-composer-fragments-catalog
 */

import { stringEnum } from "@baohaus/bao-schemas/baobox-enum";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";
import {
  BaoComposerAiProviderSchema,
  BaoComposerFeatureIdSchema,
  BaoComposerFeatureSectionSchema,
  BaoComposerOutputModeSchema,
  BaoComposerPresetIdSchema,
  BaoComposerRecipeCategorySchema,
  BaoComposerRecipeIdSchema,
  BaoComposerRecipeSourceKindSchema,
} from "./bao-composer-identity.ts";

/**
 * Canonical BaoComposer validation issue shape.
 */
export const BaoComposerValidationIssueSchema: Type.TObject<
  {
    readonly path: Type.TString;
    readonly message: Type.TString;
    readonly severity: Type.TUnion<
      [Type.TLiteral<"error" | "warning">, ...Type.TLiteral<"error" | "warning">[]]
    >;
  },
  "severity" | "path" | "message",
  never
> = Type.Object(
  {
    path: Type.String({ minLength: 1 }),
    message: Type.String({ minLength: 1 }),
    severity: stringEnum(["error", "warning"], {}),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer validation issue type.
 */
export type BaoComposerValidationIssue = Static<typeof BaoComposerValidationIssueSchema>;

/**
 * Canonical BaoComposer merge-conflict payload.
 */
export const BaoComposerMergeConflictSchema: Type.TObject<
  {
    readonly target: Type.TString;
    readonly existingRecipeId: Type.TString;
    readonly incomingRecipeId: Type.TString;
    readonly message: Type.TString;
  },
  "target" | "existingRecipeId" | "incomingRecipeId" | "message",
  never
> = Type.Object(
  {
    target: Type.String({ minLength: 1 }),
    existingRecipeId: BaoComposerRecipeIdSchema,
    incomingRecipeId: BaoComposerRecipeIdSchema,
    message: Type.String({ minLength: 1 }),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer merge-conflict type.
 */
export type BaoComposerMergeConflictV1 = Static<typeof BaoComposerMergeConflictSchema>;

/**
 * Canonical fragment provenance entry for composed manifests.
 */
export const BaoComposerSourceFragmentSchema: Type.TObject<
  {
    readonly recipeId: Type.TString;
    readonly sourceKind: Type.TUnion<
      [
        Type.TLiteral<"bao-runtime-workload" | "docs-example">,
        ...Type.TLiteral<"bao-runtime-workload" | "docs-example">[],
      ]
    >;
    readonly sourcePath: Type.TString;
    readonly manifestName: Type.TOptional<Type.TString>;
    readonly targetIds: Type.TArray<Type.TString>;
    readonly targetKinds: Type.TArray<Type.TString>;
  },
  "targetIds" | "targetKinds" | "recipeId" | "sourceKind" | "sourcePath",
  "manifestName"
> = Type.Object(
  {
    recipeId: BaoComposerRecipeIdSchema,
    sourceKind: BaoComposerRecipeSourceKindSchema,
    sourcePath: Type.String({ minLength: 1 }),
    manifestName: Type.Optional(Type.String({ minLength: 1 })),
    targetIds: Type.Array(Type.String({ minLength: 1 }), { minItems: 1 }),
    targetKinds: Type.Array(Type.String({ minLength: 1 }), { minItems: 1 }),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer source-fragment type.
 */
export type BaoComposerSourceFragmentV1 = Static<typeof BaoComposerSourceFragmentSchema>;

/**
 * `.bao` import provenance for manifests routed through BaoComposer.
 */
export const BaoComposerBaoImportProvenanceSchema: Type.TObject<
  {
    readonly source: Type.TUnion<
      [Type.TLiteral<"bao-archive-authoring">, ...Type.TLiteral<"bao-archive-authoring">[]]
    >;
    readonly jobId: Type.TString;
    readonly manifestChecksum: Type.TString;
    readonly sourceUrl: Type.TUnion<(Type.TString | Type.TNull)[]>;
    readonly sourcePath: Type.TUnion<(Type.TString | Type.TNull)[]>;
  },
  "source" | "sourceUrl" | "sourcePath" | "jobId" | "manifestChecksum",
  never
> = Type.Object(
  {
    source: stringEnum(["bao-archive-authoring"], {}),
    jobId: Type.String({ minLength: 1 }),
    manifestChecksum: Type.String({ minLength: 1 }),
    sourceUrl: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
    sourcePath: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer `.bao` import provenance type.
 */
export type BaoComposerBaoImportProvenanceV1 = Static<typeof BaoComposerBaoImportProvenanceSchema>;

/**
 * Public BaoComposer recipe contract.
 */
export const BaoComposerRecipeSchema = Type.Object(
  {
    id: BaoComposerRecipeIdSchema,
    label: Type.String({ minLength: 1 }),
    description: Type.String({ minLength: 1 }),
    category: BaoComposerRecipeCategorySchema,
    sourceKind: BaoComposerRecipeSourceKindSchema,
    sourcePath: Type.String({ minLength: 1 }),
    manifestName: Type.Optional(Type.String({ minLength: 1 })),
    bunbuddyKind: Type.Optional(Type.String({ minLength: 1 })),
    featureAliases: Type.Array(Type.String({ minLength: 1 })),
    targetIds: Type.Array(Type.String({ minLength: 1 }), { minItems: 1 }),
    targetKinds: Type.Array(Type.String({ minLength: 1 }), { minItems: 1 }),
    capabilityTags: Type.Array(Type.String({ minLength: 1 })),
  },
  {
    additionalProperties: false,
  },
);

/**
 * BaoComposer recipe type.
 */
export type BaoComposerRecipeV1 = Static<typeof BaoComposerRecipeSchema>;

/**
 * Public BaoComposer catalog preset contract.
 */
export const BaoComposerCatalogPresetSchema: Type.TObject<
  {
    readonly id: Type.TUnion<
      [
        Type.TLiteral<"full-stack" | "ai-lab" | "automation" | "research" | "custom">,
        ...Type.TLiteral<"full-stack" | "ai-lab" | "automation" | "research" | "custom">[],
      ]
    >;
    readonly features: Type.TArray<
      Type.TUnion<
        [
          Type.TLiteral<
            | "vision"
            | "perception"
            | "gaussian"
            | "rpa"
            | "scoutdumpling"
            | "happydumpling"
            | "mcp-provider"
            | "baodown-flow"
            | "ai-model"
            | "bao-archive-authoring"
          >,
          ...Type.TLiteral<
            | "vision"
            | "perception"
            | "gaussian"
            | "rpa"
            | "scoutdumpling"
            | "happydumpling"
            | "mcp-provider"
            | "baodown-flow"
            | "ai-model"
            | "bao-archive-authoring"
          >[],
        ]
      >
    >;
    readonly recipeIds: Type.TArray<Type.TString>;
  },
  "id" | "features" | "recipeIds",
  never
> = Type.Object(
  {
    id: BaoComposerPresetIdSchema,
    features: Type.Array(BaoComposerFeatureIdSchema),
    recipeIds: Type.Array(BaoComposerRecipeIdSchema),
  },
  {
    additionalProperties: false,
  },
);

/**
 * Public BaoComposer catalog preset type.
 */
export type BaoComposerCatalogPresetV1 = Static<typeof BaoComposerCatalogPresetSchema>;

/**
 * Public BaoComposer feature catalog entry.
 */
export const BaoComposerCatalogFeatureSchema = Type.Object(
  {
    id: BaoComposerFeatureIdSchema,
    section: BaoComposerFeatureSectionSchema,
    aliases: Type.Array(Type.String({ minLength: 1 })),
    presetMembership: Type.Array(BaoComposerPresetIdSchema),
    capabilityTags: Type.Array(Type.String({ minLength: 1 })),
    defaultRecipeIds: Type.Array(BaoComposerRecipeIdSchema),
  },
  {
    additionalProperties: false,
  },
);

/**
 * Public BaoComposer catalog feature type.
 */
export type BaoComposerCatalogFeatureV1 = Static<typeof BaoComposerCatalogFeatureSchema>;

/**
 * Public BaoComposer catalog schema.
 */
export const BaoComposerCatalogSchema = Type.Object(
  {
    presets: Type.Array(BaoComposerCatalogPresetSchema),
    features: Type.Array(BaoComposerCatalogFeatureSchema),
    recipes: Type.Array(BaoComposerRecipeSchema),
    outputModes: Type.Array(BaoComposerOutputModeSchema),
    aiProviders: Type.Array(BaoComposerAiProviderSchema),
  },
  {
    additionalProperties: false,
  },
);

/**
 * Public BaoComposer catalog type.
 */
export type BaoComposerCatalogV1 = Static<typeof BaoComposerCatalogSchema>;
