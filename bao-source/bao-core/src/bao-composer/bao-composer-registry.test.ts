import { describe, expect, test } from "bun:test";
import { BaoManifestSchema } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import { Check } from "@baohaus/baobox/value";
import {
  buildBaoComposerPublicRecipeCatalog,
  resolveBaoComposerRecipe,
  resolveBaoComposerRecipeRegistry,
} from "./bao-composer-registry";

const EXPECTED_RECIPE_COUNT = 41;
const EXPECTED_EXAMPLE_COUNT = 6;
const EXPECTED_ADDON_COUNT = 19;
const EXPECTED_RUNTIME_COUNT = 16;

const DELETED_SOURCE_FRAGMENTS = [
  `artifacts/bao/${"examples"}`,
  `apps/${"bunbuddies"}`,
  `@baohaus/${"legacy-composer"}`,
  `legacy-composer-${"default-model"}`,
] as const;

const EXPECTED_PACKAGE_MODULES = [
  "@baohaus/bao-core/bao-composer/examples/better-auth-extension",
  "@baohaus/bao-core/bao-composer/examples/elysia-plugin",
  "@baohaus/bao-core/bao-composer/examples/htmx-extension",
  "@baohaus/bao-core/bao-composer/examples/prisma-extension",
  "@baohaus/bao-core/bao-composer/examples/secure-mcp-provider",
  "@baohaus/bao-core/bao-composer/addons/secure-mcp-provider",
] as const;

const EXPECTED_ADDON_IDS = [
  "addon:ai-model",
  "addon:bao-archive-authoring",
  "addon:baodown-flow",
  "addon:happydumpling",
  "addon:secure-mcp-provider",
  "foundation:elysia-csrf-protection",
  "foundation:elysia-error-handler",
  "foundation:elysia-i18n-context",
  "foundation:elysia-managed-polling",
  "foundation:elysia-openapi-docs",
  "foundation:elysia-request-context",
  "foundation:elysia-session-purge",
  "foundation:elysia-sse",
  "foundation:elysia-static-assets",
  "foundation:htmx-ext-focus-panel",
  "foundation:htmx-ext-layout-controls",
  "foundation:htmx-ext-progress-indicator",
  "foundation:htmx-ext-server-toast",
  "foundation:htmx-ext-shared",
] as const;

const EXPECTED_RECIPE_IDS = [
  "addon:ai-model",
  "addon:bao-archive-authoring",
  "addon:baodown-flow",
  "addon:happydumpling",
  "addon:secure-mcp-provider",
  "bao-runtime:basler",
  "bao-runtime:ble",
  "bao-runtime:dimsum",
  "bao-runtime:drone",
  "bao-runtime:gaussian",
  "bao-runtime:industrial",
  "bao-runtime:iot",
  "bao-runtime:lighting",
  "bao-runtime:perception",
  "bao-runtime:printer",
  "bao-runtime:robotics",
  "bao-runtime:rpa",
  "bao-runtime:scanner",
  "bao-runtime:scoutdumpling",
  "bao-runtime:usb",
  "bao-runtime:vision",
  "example:bao-package",
  "example:better-auth-extension",
  "example:elysia-plugin",
  "example:htmx-extension",
  "example:prisma-extension",
  "example:secure-mcp-provider",
  "foundation:elysia-csrf-protection",
  "foundation:elysia-error-handler",
  "foundation:elysia-i18n-context",
  "foundation:elysia-managed-polling",
  "foundation:elysia-openapi-docs",
  "foundation:elysia-request-context",
  "foundation:elysia-session-purge",
  "foundation:elysia-sse",
  "foundation:elysia-static-assets",
  "foundation:htmx-ext-focus-panel",
  "foundation:htmx-ext-layout-controls",
  "foundation:htmx-ext-progress-indicator",
  "foundation:htmx-ext-server-toast",
  "foundation:htmx-ext-shared",
] as const;

describe(".bao Composer canonical recipe registry", () => {
  test("publishes the complete decomposed .bao Composer recipe surface", () => {
    const catalog = buildBaoComposerPublicRecipeCatalog();
    const examples = catalog.filter((recipe) => recipe.category === "example");
    const addons = catalog.filter((recipe) => recipe.category === "addon");
    const runtimeRecipes = catalog.filter((recipe) => recipe.category === "runtime");

    expect(catalog).toHaveLength(EXPECTED_RECIPE_COUNT);
    expect(examples).toHaveLength(EXPECTED_EXAMPLE_COUNT);
    expect(addons).toHaveLength(EXPECTED_ADDON_COUNT);
    expect(runtimeRecipes).toHaveLength(EXPECTED_RUNTIME_COUNT);
    expect(catalog.map((recipe) => recipe.id).sort()).toEqual([...EXPECTED_RECIPE_IDS]);
    expect(addons.map((recipe) => recipe.id).sort()).toEqual([...EXPECTED_ADDON_IDS]);
  });

  test("does not publish deleted pre-decomposition source paths", () => {
    const serializedRegistry = JSON.stringify(resolveBaoComposerRecipeRegistry());

    for (const fragment of DELETED_SOURCE_FRAGMENTS) {
      expect(serializedRegistry).not.toContain(fragment);
    }
  });

  test("keeps package-owned .bao Composer extension modules importable through exports", async () => {
    for (const moduleId of EXPECTED_PACKAGE_MODULES) {
      expect(await import(moduleId)).toBeTruthy();
    }
  });

  test("keeps package-owned extension modules aligned with recipe target shapes", async () => {
    const betterAuthExtension = await import(
      "@baohaus/bao-core/bao-composer/examples/better-auth-extension"
    );
    const elysiaPlugin = await import("@baohaus/bao-core/bao-composer/examples/elysia-plugin");
    const htmxExtension = await import("@baohaus/bao-core/bao-composer/examples/htmx-extension");
    const prismaExtension = await import(
      "@baohaus/bao-core/bao-composer/examples/prisma-extension"
    );
    const exampleMcpProvider = await import(
      "@baohaus/bao-core/bao-composer/examples/secure-mcp-provider"
    );
    const addonMcpProvider = await import(
      "@baohaus/bao-core/bao-composer/addons/secure-mcp-provider"
    );

    expect(betterAuthExtension.default.id).toBe("bao-composer-better-auth-example");
    expect(elysiaPlugin.default).toEqual([]);
    expect(htmxExtension.default).toEqual([]);
    expect(prismaExtension.default()).toEqual({ name: "bao-composer-prisma-example" });
    expect(exampleMcpProvider.providers).toEqual([
      {
        id: "bao-composer-secure-provider-example",
        displayName: ".bao Composer Secure Provider Example",
      },
    ]);
    expect(addonMcpProvider.providers).toEqual([
      {
        id: "bao-composer-secure-provider",
        displayName: ".bao Composer Secure Provider",
      },
    ]);
  });

  test("keeps the BaoDown add-on recipe backed by a real package-owned flow file", async () => {
    const baodownRecipe = resolveBaoComposerRecipe("addon:baodown-flow");
    const baodownManifest = JSON.stringify(baodownRecipe?.manifest);
    const flowFile = Bun.file(new URL("./addons/baodown-flow.json", import.meta.url));

    expect(baodownRecipe?.targetKinds).toEqual(["baodown-flow"]);
    expect(baodownManifest).toContain(
      "../bao-source/bao-core/src/bao-composer/addons/baodown-flow.json",
    );
    expect(await flowFile.exists()).toBe(true);
  });

  test("keeps .bao Runtime recipe manifests aligned with the install target schema", () => {
    for (const recipeId of EXPECTED_RECIPE_IDS.filter((recipeId) =>
      recipeId.startsWith("bao-runtime:"),
    )) {
      const recipe = resolveBaoComposerRecipe(recipeId);

      expect(recipe?.manifest.metadata.name).toBeTruthy();
      expect(recipe?.sourceKind).toBe("bao-runtime-workload");
      expect(recipe?.targetKinds).not.toContain("bunbuddy-contract");
      expect(recipe?.targetKinds).toContain("bao-runtime-workload");
      expect(Check(BaoManifestSchema, recipe?.manifest)).toBe(true);
    }
  });

  test("keeps .bao archive authoring target shape canonical", () => {
    const archiveAuthoringRecipe = resolveBaoComposerRecipe("addon:bao-archive-authoring");
    const archiveAuthoringManifest = JSON.stringify(archiveAuthoringRecipe?.manifest);

    expect(archiveAuthoringRecipe?.featureAliases).toEqual(["bao-archive-authoring"]);
    expect(archiveAuthoringManifest).toContain('"section":"bao-archive-authoring"');
    expect(archiveAuthoringManifest).toContain('"overlay"');
    expect(archiveAuthoringManifest).toContain('"mode":"archive-authoring"');
    expect(archiveAuthoringManifest).not.toContain("archive-job");
    expect(archiveAuthoringManifest).not.toContain('"scope"');
    expect(archiveAuthoringManifest).not.toContain('"values"');
  });
});
