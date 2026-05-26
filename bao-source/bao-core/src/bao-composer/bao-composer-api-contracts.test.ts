import { describe, expect, test } from "bun:test";
import { Check } from "@baohaus/baobox/value";
import {
  BaoComposerCatalogResponseSchema,
  BaoComposerContextResponseSchema,
  BaoComposerDraftInputBodySchema,
  BaoComposerGenerateResponseSchema,
  BaoComposerResearchRequestSchema,
  BaoComposerStandaloneProfileResponseSchema,
} from "./bao-composer-api-contracts";
import { buildBaoComposerCatalog, buildBaoComposerManifest } from "./bao-composer-builder";
import { buildBaoComposerContextSnapshot } from "./bao-composer-context";
import type { BaoComposerDraftV1 } from "./bao-composer-drafts-messages";
import type { BaoComposerResolvedConfig } from "./bao-composer-identity";
import type { BaoComposerExecutionV1 } from "./bao-composer-preview-execution";
import { deriveBaoComposerStandaloneProfile } from "./bao-composer-standalone-profile";

const TEST_BAO_COMPOSER_CONFIG: BaoComposerResolvedConfig = {
  defaultPreset: "full-stack",
  defaultManifestVersion: "0.1.0",
  defaultOutputDirectory: "dist/bao-composer",
  defaultOutputMode: "repo",
  defaultMcpProviderModule: "@baohaus/bao-core/bao-composer/addons/secure-mcp-provider",
  defaultAutomationFlowDefinition: "flows/bao-composer.baodown.bao",
  defaultAiModel: null,
  defaultAiProvider: null,
};

function createDraftSnapshot(): BaoComposerDraftV1 {
  return {
    id: "11111111-1111-4111-8111-111111111111",
    name: "bao-composer-full-stack-container",
    intentMode: "recipe-first",
    goal: null,
    preset: "full-stack",
    recipeIds: [],
    features: ["vision", "mcp-provider"],
    outputMode: "repo",
    outputPath: "dist/bao-composer/bao-composer-full-stack-container.bao",
    manifestName: "bao-composer-full-stack-container",
    manifestVersion: "0.1.0",
    description: "",
    aiModel: null,
    aiProvider: null,
    mcpProviderModule: "@baohaus/bao-core/bao-composer/addons/secure-mcp-provider",
    automationFlowDefinition: "flows/bao-composer.baodown.bao",
    schemaRef: "",
    sourceId: "",
    importedTargets: [],
    baoImportProvenance: null,
    createdAt: "2026-03-18T00:00:00.000Z",
    updatedAt: "2026-03-18T00:00:00.000Z",
  };
}

describe(".bao Composer API contracts", () => {
  test("validates catalog success envelopes from the canonical catalog builder", () => {
    const payload = { ok: true, data: buildBaoComposerCatalog() };

    expect(Check(BaoComposerCatalogResponseSchema, payload)).toBe(true);
  });

  test("validates draft input and research requests used by the REST plugin", () => {
    expect(Check(BaoComposerDraftInputBodySchema, { preset: "full-stack" })).toBe(true);
    expect(
      Check(BaoComposerResearchRequestSchema, {
        topic: ".bao Composer capability research",
        tags: ["bao-composer", "bao"],
        maxCandidates: 2,
      }),
    ).toBe(true);
  });

  test("validates context and standalone profile success envelopes", () => {
    const buildResult = buildBaoComposerManifest(
      {
        preset: "full-stack",
        outputMode: "repo",
        outputPath: "dist/bao-composer/bao-composer-full-stack-container.bao",
        name: "bao-composer-full-stack-container",
      },
      TEST_BAO_COMPOSER_CONFIG,
    );
    if (!buildResult.ok) {
      throw new Error(buildResult.message);
    }
    const context = buildBaoComposerContextSnapshot({
      draftId: "11111111-1111-4111-8111-111111111111",
      createdAt: "2026-03-18T00:00:00.000Z",
      sources: [
        {
          sourceKind: "user-intent",
          sourceId: "11111111-1111-4111-8111-111111111111",
          label: ".bao Composer draft",
          observedAt: "2026-03-18T00:00:00.000Z",
        },
      ],
      signals: [
        {
          sourceKind: "user-intent",
          sourceId: "11111111-1111-4111-8111-111111111111",
          confidence: 0.8,
          observedAt: "2026-03-18T00:00:00.000Z",
          summary: ".bao Composer draft context.",
        },
      ],
    });

    expect(Check(BaoComposerContextResponseSchema, { ok: true, data: context })).toBe(true);
    expect(
      Check(BaoComposerStandaloneProfileResponseSchema, {
        ok: true,
        data: deriveBaoComposerStandaloneProfile(buildResult.value.manifest),
      }),
    ).toBe(true);
  });

  test("validates generated artifact response envelopes from .bao Composer builder output", () => {
    const buildResult = buildBaoComposerManifest(
      {
        preset: "full-stack",
        outputMode: "repo",
        outputPath: "dist/bao-composer/bao-composer-full-stack-container.bao",
        name: "bao-composer-full-stack-container",
      },
      TEST_BAO_COMPOSER_CONFIG,
    );
    if (!buildResult.ok) {
      throw new Error(buildResult.message);
    }
    const draft = createDraftSnapshot();
    const execution: BaoComposerExecutionV1 = {
      id: "33333333-3333-4333-8333-333333333333",
      draftId: draft.id,
      artifactId: "22222222-2222-4222-8222-222222222222",
      contextSnapshotId: null,
      status: "generated",
      phase: "generate",
      baoInstallRunId: null,
      baoDownDefinitionId: null,
      baoDownRunId: null,
      baoImportProvenance: null,
      createdAt: "2026-03-18T00:00:00.000Z",
      updatedAt: "2026-03-18T00:00:00.000Z",
    };
    const payload = {
      ok: true,
      data: {
        draft,
        preview: {
          manifest: buildResult.value.manifest,
          sourceFragments: buildResult.value.sourceFragments,
          importedTargets: buildResult.value.importedTargets,
          selectedRecipes: buildResult.value.selectedRecipes,
          validationErrors: buildResult.value.validation.issues,
          mergeConflicts: buildResult.value.validation.mergeConflicts,
          warnings: buildResult.value.validation.warnings,
          installPlan: {
            manifestName: buildResult.value.manifest.metadata.name,
            manifestVersion: buildResult.value.manifest.metadata.version,
            checksum: buildResult.value.validation.checksum,
            steps: [],
          },
          checksum: buildResult.value.validation.checksum,
          outputPolicy: {
            outputMode: buildResult.value.outputMode,
            outputPath: buildResult.value.outputPath,
            schemaRef: null,
            sourceId: null,
          },
          baoImportProvenance: null,
        },
        artifact: {
          id: "22222222-2222-4222-8222-222222222222",
          draftId: draft.id,
          checksum: buildResult.value.validation.checksum,
          manifest: buildResult.value.manifest,
          sourceFragments: buildResult.value.sourceFragments,
          importedTargets: buildResult.value.importedTargets,
          selectedRecipeIds: buildResult.value.selectedRecipes.map((recipe) => recipe.id),
          outputPolicy: {
            outputMode: buildResult.value.outputMode,
            outputPath: buildResult.value.outputPath,
            schemaRef: null,
            sourceId: null,
          },
          baoImportProvenance: null,
          createdAt: "2026-03-18T00:00:00.000Z",
        },
        execution,
      },
    };

    expect(Check(BaoComposerGenerateResponseSchema, payload)).toBe(true);
  });
});
