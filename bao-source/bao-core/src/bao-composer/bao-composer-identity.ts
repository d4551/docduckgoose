/**
 * .bao Composer identity tokens, preset/feature enums, and recipe id primitives.
 *
 * @baohaus/bao-core/bao-composer/bao-composer-identity
 */

import { stringEnum } from "@baohaus/bao-schemas/baobox-enum";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Supported BaoComposer preset identifiers.
 */
export const BAO_COMPOSER_PRESET_IDS: readonly [
  "full-stack",
  "ai-lab",
  "automation",
  "research",
  "custom",
] = ["full-stack", "ai-lab", "automation", "research", "custom"] as const;

/**
 * BaoComposer preset identifier type.
 */
export type BaoComposerPresetId = (typeof BAO_COMPOSER_PRESET_IDS)[number];

/**
 * Determine whether a value is a valid BaoComposer preset identifier.
 *
 * @param value - Candidate preset value.
 * @returns True when the value is a supported preset.
 */
export function isBaoComposerPresetId(
  value: string | null | undefined,
): value is BaoComposerPresetId {
  return (
    typeof value === "string" && (BAO_COMPOSER_PRESET_IDS as readonly string[]).includes(value)
  );
}

/**
 * BaoComposer preset identifier schema.
 */
export const BaoComposerPresetIdSchema: Type.TUnion<
  [
    Type.TLiteral<"full-stack" | "ai-lab" | "automation" | "research" | "custom">,
    ...Type.TLiteral<"full-stack" | "ai-lab" | "automation" | "research" | "custom">[],
  ]
> = stringEnum(BAO_COMPOSER_PRESET_IDS, {});

/**
 * Supported BaoComposer feature identifiers exposed to users.
 */
export const BAO_COMPOSER_FEATURE_SECTIONS: readonly ["core", "addon"] = ["core", "addon"] as const;

/**
 * BaoComposer feature section type.
 */
export type BaoComposerFeatureSection = (typeof BAO_COMPOSER_FEATURE_SECTIONS)[number];

/**
 * BaoComposer feature section schema.
 */
export const BaoComposerFeatureSectionSchema: Type.TUnion<
  [Type.TLiteral<"core" | "addon">, ...Type.TLiteral<"core" | "addon">[]]
> = stringEnum(BAO_COMPOSER_FEATURE_SECTIONS, {});

/**
 * Supported BaoComposer feature identifiers exposed to users.
 */
export const BAO_COMPOSER_FEATURE_IDS: readonly [
  "vision",
  "perception",
  "gaussian",
  "rpa",
  "scoutdumpling",
  "happydumpling",
  "mcp-provider",
  "baodown-flow",
  "ai-model",
  "bao-archive-authoring",
] = [
  "vision",
  "perception",
  "gaussian",
  "rpa",
  "scoutdumpling",
  "happydumpling",
  "mcp-provider",
  "baodown-flow",
  "ai-model",
  "bao-archive-authoring",
] as const;

/**
 * BaoComposer feature identifier type.
 */
export type BaoComposerFeatureId = (typeof BAO_COMPOSER_FEATURE_IDS)[number];

/**
 * Supported aliases for BaoComposer feature identifiers.
 */
export const BAO_COMPOSER_FEATURE_ALIASES: {
  readonly vision: "vision";
  readonly perception: "perception";
  readonly gaussian: "gaussian";
  readonly rpa: "rpa";
  readonly scoutdumpling: "scoutdumpling";
  readonly happydumpling: "happydumpling";
  readonly docs: "happydumpling";
  readonly "mcp-provider": "mcp-provider";
  readonly mcp: "mcp-provider";
  readonly "baodown-flow": "baodown-flow";
  readonly baodown: "baodown-flow";
  readonly flow: "baodown-flow";
  readonly "automation-flow": "baodown-flow";
  readonly "ai-model": "ai-model";
  readonly ai: "ai-model";
  readonly model: "ai-model";
  readonly "bao-archive-authoring": "bao-archive-authoring";
} = {
  vision: "vision",
  perception: "perception",
  gaussian: "gaussian",
  rpa: "rpa",
  scoutdumpling: "scoutdumpling",
  happydumpling: "happydumpling",
  docs: "happydumpling",
  "mcp-provider": "mcp-provider",
  mcp: "mcp-provider",
  "baodown-flow": "baodown-flow",
  baodown: "baodown-flow",
  flow: "baodown-flow",
  "automation-flow": "baodown-flow",
  "ai-model": "ai-model",
  ai: "ai-model",
  model: "ai-model",
  "bao-archive-authoring": "bao-archive-authoring",
} as const satisfies Record<string, BaoComposerFeatureId>;

/**
 * Determine whether a value is a valid BaoComposer feature identifier.
 *
 * @param value - Candidate feature value.
 * @returns True when the value is a supported BaoComposer feature id.
 */
export function isBaoComposerFeatureId(
  value: string | null | undefined,
): value is BaoComposerFeatureId {
  return (
    typeof value === "string" && (BAO_COMPOSER_FEATURE_IDS as readonly string[]).includes(value)
  );
}

/**
 * Resolve a user-facing BaoComposer feature token to its canonical feature id.
 *
 * @param value - Candidate feature id or alias.
 * @returns Canonical BaoComposer feature id when supported; otherwise null.
 */
export function resolveBaoComposerFeatureId(
  value: string | null | undefined,
): BaoComposerFeatureId | null {
  if (typeof value !== "string") {
    return null;
  }
  const normalized = value.trim().toLowerCase();
  if (normalized.length === 0) {
    return null;
  }
  const featureAliases: Readonly<Record<string, BaoComposerFeatureId>> =
    BAO_COMPOSER_FEATURE_ALIASES;
  return featureAliases[normalized] ?? null;
}

/**
 * BaoComposer feature identifier schema.
 */
export const BaoComposerFeatureIdSchema: Type.TUnion<
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
> = stringEnum(BAO_COMPOSER_FEATURE_IDS, {});

/**
 * Supported BaoComposer output modes.
 */
export const BAO_COMPOSER_OUTPUT_MODES: readonly ["repo", "external"] = [
  "repo",
  "external",
] as const;

/**
 * BaoComposer output mode type.
 */
export type BaoComposerOutputMode = (typeof BAO_COMPOSER_OUTPUT_MODES)[number];

/**
 * Determine whether a value is a valid BaoComposer output mode.
 *
 * @param value - Candidate output mode.
 * @returns True when the value is a supported BaoComposer output mode.
 */
export function isBaoComposerOutputMode(
  value: string | null | undefined,
): value is BaoComposerOutputMode {
  return (
    typeof value === "string" && (BAO_COMPOSER_OUTPUT_MODES as readonly string[]).includes(value)
  );
}

/**
 * BaoComposer output mode schema.
 */
export const BaoComposerOutputModeSchema: Type.TUnion<
  [Type.TLiteral<"repo" | "external">, ...Type.TLiteral<"repo" | "external">[]]
> = stringEnum(BAO_COMPOSER_OUTPUT_MODES, {});

/**
 * Supported AI provider tokens for optional `ai-model` targets.
 */
export const BAO_COMPOSER_AI_PROVIDERS: readonly ["huggingface", "onnx", "ramalama"] = [
  "huggingface",
  "onnx",
  "ramalama",
] as const;

/**
 * BaoComposer AI provider type.
 */
export type BaoComposerAiProvider = (typeof BAO_COMPOSER_AI_PROVIDERS)[number];

/**
 * Determine whether a value is a valid BaoComposer AI provider token.
 *
 * @param value - Candidate provider value.
 * @returns True when the value is a supported provider.
 */
export function isBaoComposerAiProvider(
  value: string | null | undefined,
): value is BaoComposerAiProvider {
  return (
    typeof value === "string" && (BAO_COMPOSER_AI_PROVIDERS as readonly string[]).includes(value)
  );
}

/**
 * BaoComposer AI provider schema.
 */
export const BaoComposerAiProviderSchema: Type.TUnion<
  [
    Type.TLiteral<"huggingface" | "onnx" | "ramalama">,
    ...Type.TLiteral<"huggingface" | "onnx" | "ramalama">[],
  ]
> = stringEnum(BAO_COMPOSER_AI_PROVIDERS, {});

/**
 * Resolved BaoComposer runtime configuration.
 */
export interface BaoComposerResolvedConfig {
  /** Default preset when the CLI caller omits one. */
  defaultPreset: BaoComposerPresetId;
  /** Default manifest version applied to generated manifests. */
  defaultManifestVersion: string;
  /** Default output directory for generated `.bao` files. */
  defaultOutputDirectory: string;
  /** Default output mode applied when callers omit one. */
  defaultOutputMode: BaoComposerOutputMode;
  /** Default MCP provider payload implementation path from the checked-in example archives. */
  defaultMcpProviderModule: string;
  /** Default BaoDown flow payload implementation path from the checked-in example archives. */
  defaultAutomationFlowDefinition: string;
  /** Optional default AI model identifier. */
  defaultAiModel: string | null;
  /** Optional default AI model provider. */
  defaultAiProvider: BaoComposerAiProvider | null;
}

/**
 * Supported BaoComposer draft entry modes.
 */
export const BAO_COMPOSER_DRAFT_INTENT_MODES: readonly ["recipe-first", "goal-first", "import"] = [
  "recipe-first",
  "goal-first",
  "import",
] as const;

/**
 * BaoComposer draft entry mode type.
 */
export type BaoComposerDraftIntentMode = (typeof BAO_COMPOSER_DRAFT_INTENT_MODES)[number];

/**
 * BaoComposer draft entry mode schema.
 */
export const BaoComposerDraftIntentModeSchema: Type.TUnion<
  [
    Type.TLiteral<"recipe-first" | "goal-first" | "import">,
    ...Type.TLiteral<"recipe-first" | "goal-first" | "import">[],
  ]
> = stringEnum(BAO_COMPOSER_DRAFT_INTENT_MODES, {});

/**
 * Supported BaoComposer recipe source kinds.
 */
export const BAO_COMPOSER_RECIPE_SOURCE_KINDS: readonly ["bao-runtime-workload", "docs-example"] = [
  "bao-runtime-workload",
  "docs-example",
] as const;

/**
 * BaoComposer recipe source kind type.
 */
export type BaoComposerRecipeSourceKind = (typeof BAO_COMPOSER_RECIPE_SOURCE_KINDS)[number];

/**
 * BaoComposer recipe source kind schema.
 */
export const BaoComposerRecipeSourceKindSchema: Type.TUnion<
  [
    Type.TLiteral<"bao-runtime-workload" | "docs-example">,
    ...Type.TLiteral<"bao-runtime-workload" | "docs-example">[],
  ]
> = stringEnum(BAO_COMPOSER_RECIPE_SOURCE_KINDS, {});

/**
 * Supported BaoComposer recipe categories.
 */
export const BAO_COMPOSER_RECIPE_CATEGORIES: readonly ["runtime", "addon", "example"] = [
  "runtime",
  "addon",
  "example",
] as const;

/**
 * BaoComposer recipe category type.
 */
export type BaoComposerRecipeCategory = (typeof BAO_COMPOSER_RECIPE_CATEGORIES)[number];

/**
 * BaoComposer recipe category schema.
 */
export const BaoComposerRecipeCategorySchema: Type.TUnion<
  [
    Type.TLiteral<"runtime" | "addon" | "example">,
    ...Type.TLiteral<"runtime" | "addon" | "example">[],
  ]
> = stringEnum(BAO_COMPOSER_RECIPE_CATEGORIES, {});

/**
 * Stable BaoComposer recipe identifier schema.
 */
export const BaoComposerRecipeIdSchema: Type.TString = Type.String({
  minLength: 1,
});

/**
 * Stable BaoComposer recipe identifier type.
 */
export type BaoComposerRecipeId = Static<typeof BaoComposerRecipeIdSchema>;
