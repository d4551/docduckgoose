import { BAO_MANIFEST_SCHEMA_VERSION } from "@baohaus/bao-schemas/bao-install/core.schemas";
import { resolve } from "@baohaus/bao-utils/bun-path";
import type { BaoComposerPresetId } from "../bao-composer-identity";
import type { BaoComposerFeatureDefinition, BaoComposerPresetRecipe } from "./types";

/**
 * Canonical preset definitions used when composing BaoComposer manifests.
 */
export const BAO_COMPOSER_PRESET_RECIPES: Record<BaoComposerPresetId, BaoComposerPresetRecipe> = {
  "full-stack": {
    features: [
      "vision",
      "perception",
      "gaussian",
      "rpa",
      "scoutdumpling",
      "happydumpling",
      "mcp-provider",
      "baodown-flow",
    ],
  },
  "ai-lab": { features: ["vision", "perception", "gaussian"] },
  automation: { features: ["rpa", "mcp-provider", "baodown-flow"] },
  research: { features: ["scoutdumpling", "mcp-provider"] },
  custom: { features: [] },
};

export const REPOSITORY_ROOT: string = resolve(import.meta.dir, "../../../..");
export const BAO_SCHEMA_PATH: string = resolve(
  REPOSITORY_ROOT,
  "schemas",
  `bao-manifest-v${BAO_MANIFEST_SCHEMA_VERSION}.schema.json`,
);

export const FEATURE_DEFINITIONS: readonly BaoComposerFeatureDefinition[] = [
  {
    id: "vision",
    section: "core",
    aliases: ["vision"],
  },
  {
    id: "perception",
    section: "core",
    aliases: ["perception"],
  },
  {
    id: "gaussian",
    section: "core",
    aliases: ["gaussian"],
  },
  {
    id: "rpa",
    section: "core",
    aliases: ["rpa"],
  },
  {
    id: "scoutdumpling",
    section: "core",
    aliases: ["scoutdumpling"],
  },
  {
    id: "happydumpling",
    section: "addon",
    aliases: ["happydumpling", "docs"],
  },
  {
    id: "mcp-provider",
    section: "addon",
    aliases: ["mcp-provider", "mcp"],
  },
  {
    id: "baodown-flow",
    section: "addon",
    aliases: ["baodown-flow", "baodown", "flow", "automation-flow"],
  },
  {
    id: "ai-model",
    section: "addon",
    aliases: ["ai-model", "ai", "model"],
  },
  {
    id: "bao-archive-authoring",
    section: "addon",
    aliases: ["bao-archive-authoring"],
  },
] as const;
