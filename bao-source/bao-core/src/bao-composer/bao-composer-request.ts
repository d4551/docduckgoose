/**
 * Shared BaoComposer request normalization helpers.
 *
 * Keeps CLI and SSR request handling aligned before manifest build.
 *
 * @baohaus/bao-core/bao-composer/bao-composer-request
 */

import { buildBaoComposerCatalog, deriveBaoComposerManifestName } from "./bao-composer-builder";
import {
  BAO_COMPOSER_FEATURE_IDS,
  type BaoComposerFeatureId,
  type BaoComposerPresetId,
  type BaoComposerResolvedConfig,
  isBaoComposerPresetId,
} from "./bao-composer-identity";

/**
 * Canonical string-based BaoComposer input values shared by the CLI and SSR form.
 */
export interface BaoComposerNormalizedInputValues {
  readonly preset: string;
  readonly outputMode: string;
  readonly outputPath: string;
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly goal: string;
  readonly features: readonly string[];
  readonly aiModel: string;
  readonly aiProvider: string;
  readonly mcpProviderModule: string;
  readonly automationFlowDefinition: string;
  readonly schemaRef: string;
  readonly sourceId: string;
}

/**
 * Raw BaoComposer request-like input used before validation.
 */
export interface BaoComposerInputLike {
  readonly preset?: string | null;
  readonly outputMode?: string | null;
  readonly outputPath?: string | null;
  readonly name?: string | null;
  readonly version?: string | null;
  readonly description?: string | null;
  readonly goal?: string | null;
  readonly features?: readonly string[] | null;
  readonly aiModel?: string | null;
  readonly aiProvider?: string | null;
  readonly mcpProviderModule?: string | null;
  readonly automationFlowDefinition?: string | null;
  readonly schemaRef?: string | null;
  readonly sourceId?: string | null;
}

/**
 * Inputs that implicitly enable optional BaoComposer features.
 */
export interface BaoComposerImplicitFeatureInputs {
  readonly aiModel?: string | null;
  readonly aiProvider?: string | null;
  readonly mcpProviderModule?: string | null;
  readonly automationFlowDefinition?: string | null;
}

function normalizeOptionalString(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

/**
 * Resolve the default repository-relative output path for a preset.
 *
 * @param preset - Preset identifier.
 * @param config - Runtime config.
 * @returns Repository-relative output path.
 */
export function resolveBaoComposerDefaultOutputPath(
  preset: string,
  config: BaoComposerResolvedConfig,
): string {
  const resolvedPreset: BaoComposerPresetId = isBaoComposerPresetId(preset)
    ? preset
    : config.defaultPreset;
  return `${config.defaultOutputDirectory}/${deriveBaoComposerManifestName(resolvedPreset)}.bao`;
}

/**
 * Build the default BaoComposer UI values for the configured preset.
 *
 * Optional add-on fields are only prefilled when their matching feature is
 * active in the preset.
 *
 * @param config - Runtime config.
 * @returns Initial form values.
 */
export function buildDefaultBaoComposerInputValues(
  config: BaoComposerResolvedConfig,
): BaoComposerNormalizedInputValues {
  const defaultPreset = config.defaultPreset;
  const defaultPresetFeatures =
    buildBaoComposerCatalog().presets.find((preset: { id: string }) => preset.id === defaultPreset)
      ?.features ?? [];
  const selectedFeatures = new Set<BaoComposerFeatureId>(defaultPresetFeatures);

  return {
    preset: defaultPreset,
    outputMode: config.defaultOutputMode,
    outputPath:
      config.defaultOutputMode === "repo"
        ? resolveBaoComposerDefaultOutputPath(defaultPreset, config)
        : "",
    name: deriveBaoComposerManifestName(defaultPreset),
    version: config.defaultManifestVersion,
    description: "",
    goal: "",
    features: defaultPresetFeatures,
    aiModel: selectedFeatures.has("ai-model") && config.defaultAiModel ? config.defaultAiModel : "",
    aiProvider:
      selectedFeatures.has("ai-model") && config.defaultAiProvider ? config.defaultAiProvider : "",
    mcpProviderModule: selectedFeatures.has("mcp-provider") ? config.defaultMcpProviderModule : "",
    automationFlowDefinition: selectedFeatures.has("baodown-flow")
      ? config.defaultAutomationFlowDefinition
      : "",
    schemaRef: "",
    sourceId: "",
  };
}

/**
 * Normalize raw BaoComposer inputs into stable string values before validation.
 *
 * Unlike the initial UI defaults, optional feature fields stay blank when they
 * are not explicitly supplied.
 *
 * @param input - Raw request-like input.
 * @param config - Runtime config.
 * @returns Normalized input values.
 */
export function normalizeBaoComposerInputValues(
  input: BaoComposerInputLike,
  config: BaoComposerResolvedConfig,
): BaoComposerNormalizedInputValues {
  const preset = normalizeOptionalString(input.preset) || config.defaultPreset;
  const outputMode = normalizeOptionalString(input.outputMode) || config.defaultOutputMode;
  const outputPath =
    normalizeOptionalString(input.outputPath) ||
    (outputMode === "repo" ? resolveBaoComposerDefaultOutputPath(preset, config) : "");

  return {
    preset,
    outputMode,
    outputPath,
    name: normalizeOptionalString(input.name),
    version: normalizeOptionalString(input.version) || config.defaultManifestVersion,
    description: normalizeOptionalString(input.description),
    goal: normalizeOptionalString(input.goal),
    features:
      input.features?.map((feature) => feature.trim()).filter((feature) => feature.length > 0) ??
      [],
    aiModel: normalizeOptionalString(input.aiModel),
    aiProvider: normalizeOptionalString(input.aiProvider),
    mcpProviderModule: normalizeOptionalString(input.mcpProviderModule),
    automationFlowDefinition: normalizeOptionalString(input.automationFlowDefinition),
    schemaRef: normalizeOptionalString(input.schemaRef),
    sourceId: normalizeOptionalString(input.sourceId),
  };
}

/**
 * Apply implicit feature activation from populated optional target fields.
 *
 * @param features - Explicitly selected features.
 * @param values - Optional target fields.
 * @returns Ordered unique features in canonical BaoComposer order.
 */
export function applyBaoComposerImplicitFeatures(
  features: readonly BaoComposerFeatureId[],
  values: BaoComposerImplicitFeatureInputs,
): BaoComposerFeatureId[] {
  const selected = new Set<BaoComposerFeatureId>(features);
  if (
    normalizeOptionalString(values.aiModel).length > 0 ||
    normalizeOptionalString(values.aiProvider).length > 0
  ) {
    selected.add("ai-model");
  }
  if (normalizeOptionalString(values.mcpProviderModule).length > 0) {
    selected.add("mcp-provider");
  }
  if (normalizeOptionalString(values.automationFlowDefinition).length > 0) {
    selected.add("baodown-flow");
  }

  return BAO_COMPOSER_FEATURE_IDS.filter((featureId) => selected.has(featureId));
}
