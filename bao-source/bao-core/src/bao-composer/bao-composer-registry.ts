/**
 * .bao Composer canonical recipe registry.
 *
 * Builds .bao Composer recipes from the canonical .bao Runtime workload registry and
 * package-owned example/add-on recipe manifests.
 *
 * @baohaus/bao-core/bao-composer/bao-composer-registry
 */

import { BAO_MANIFEST_SCHEMA_VERSION } from "@baohaus/bao-schemas/bao-install/core.schemas";
import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type {
  BunBuddyDeploymentDescriptor,
  BunBuddyDeploymentRegistry,
} from "@baohaus/bao-schemas/bao-runtime-workload.schemas";
import type { JsonValue } from "@baohaus/bao-schemas/json.schemas";
import {
  buildBunBuddyWorkloadRegistry,
  validateBunBuddyWorkloadRegistry,
} from "@baohaus/bao-utils/bunbuddy-workload-registry";
import { canonicalizeJsonValue } from "@baohaus/bao-utils/stable-json";
import { getBunBuddyWorkloadConfig } from "@baohaus/bunbuddy-shared/bunbuddy-contracts";
import capabilityMatrix from "../generated/capability-matrix.generated.json";
import type { BaoComposerRecipeV1 } from "./bao-composer-fragments-catalog";
import type {
  BaoComposerFeatureId,
  BaoComposerRecipeCategory,
  BaoComposerRecipeId,
} from "./bao-composer-identity";

type BaoComposerRecipeManifest = BaoManifest;
type BaoComposerManifestTarget = BaoManifest["targets"][number];
interface BaoComposerRecipeTarget {
  readonly kind: BaoComposerManifestTarget["kind"];
  readonly target: string;
  readonly [key: string]: unknown;
}
const BAO_COMPOSER_RECIPE_SOURCE_OWNER =
  "@baohaus/bao-core/bao-composer/bao-composer-registry" as const;
const BAO_COMPOSER_BAODOWN_FLOW_DEFINITION_PATH =
  "../bao-source/bao-core/src/bao-composer/addons/baodown-flow.json" as const;

interface BaoComposerResolvedRecipe extends BaoComposerRecipeV1 {
  readonly manifest: BaoComposerRecipeManifest;
}

interface BaoComposerRecipeTargetDescriptor {
  readonly kind: string;
  readonly target: string;
}

interface BaoComposerManifestRecipeDescriptor {
  readonly id: BaoComposerRecipeId;
  readonly label: string;
  readonly description: string;
  readonly category: BaoComposerRecipeCategory;
  readonly sourcePath: string;
  readonly featureAliases: readonly string[];
  readonly targets: readonly BaoComposerRecipeTarget[];
}

function toBaoComposerManifestTarget(target: BaoComposerRecipeTarget): BaoComposerManifestTarget {
  const normalizedTarget = Object.fromEntries(
    Object.entries(structuredClone(target)).filter(([key]) => key !== "accessPolicy"),
  );

  return {
    ...normalizedTarget,
    kind: target.kind,
    target: target.target,
  };
}

const BUNBUDDY_WORKLOADS_SOURCE_PATH =
  "@baohaus/bunbuddy-shared/bunbuddy-contracts#getBunBuddyWorkloadConfig" as const;

function toPackageRecipeSource(recipeId: BaoComposerRecipeId): string {
  return `${BAO_COMPOSER_RECIPE_SOURCE_OWNER}#${recipeId}`;
}

const MANIFEST_RECIPE_DESCRIPTORS = [
  {
    id: "example:bao-package",
    label: ".bao package example",
    description: ".bao Composer package recipe for a first-party .bao package target.",
    category: "example",
    sourcePath: toPackageRecipeSource("example:bao-package"),
    featureAliases: [],
    targets: [
      {
        kind: "config-overlay",
        target: "example.bao-package",
        section: "bao-composer",
        overlay: {
          packageManager: "bun",
          runtime: "bun",
        },
      },
    ],
  },
  {
    id: "example:better-auth-extension",
    label: "Better Auth extension example",
    description: ".bao Composer recipe for registering a Better Auth extension.",
    category: "example",
    sourcePath: toPackageRecipeSource("example:better-auth-extension"),
    featureAliases: [],
    targets: [
      {
        kind: "better-auth-extension",
        target: "auth.bao-composer.better-auth-extension",
        provider: "@baohaus/bao-core/bao-composer/examples/better-auth-extension",
      },
    ],
  },
  {
    id: "example:elysia-plugin",
    label: "Elysia plugin example",
    description: ".bao Composer recipe for registering an Elysia plugin.",
    category: "example",
    sourcePath: toPackageRecipeSource("example:elysia-plugin"),
    featureAliases: [],
    targets: [
      {
        kind: "elysia-plugin",
        target: "http.bao-composer.elysia-plugin",
        plugin: "@baohaus/bao-core/bao-composer/examples/elysia-plugin",
        enabled: true,
      },
    ],
  },
  {
    id: "example:htmx-extension",
    label: "HTMX extension example",
    description: ".bao Composer recipe for registering an HTMX extension.",
    category: "example",
    sourcePath: toPackageRecipeSource("example:htmx-extension"),
    featureAliases: [],
    targets: [
      {
        kind: "htmx-extension",
        target: "ui.bao-composer.htmx-extension",
        extension: "@baohaus/bao-core/bao-composer/examples/htmx-extension",
        route: "authenticated",
      },
    ],
  },
  {
    id: "example:prisma-extension",
    label: "Prisma extension example",
    description: ".bao Composer recipe for registering a Prisma extension.",
    category: "example",
    sourcePath: toPackageRecipeSource("example:prisma-extension"),
    featureAliases: [],
    targets: [
      {
        kind: "prisma-extension",
        target: "data.bao-composer.prisma-extension",
        extension: "@baohaus/bao-core/bao-composer/examples/prisma-extension",
        requiresApply: true,
      },
    ],
  },
  {
    id: "example:secure-mcp-provider",
    label: "Secure MCP provider example",
    description: ".bao Composer recipe for a secured MCP provider target.",
    category: "example",
    sourcePath: toPackageRecipeSource("example:secure-mcp-provider"),
    featureAliases: [],
    targets: [
      {
        kind: "mcp-provider",
        target: "mcp.bao-composer.secure-provider-example",
        providerId: "bao-composer-secure-provider-example",
        mcpProtocolVersion: "2025-06-18",
        entrypoint: "@baohaus/bao-core/bao-composer/examples/secure-mcp-provider",
        tools: [
          {
            name: "bao-composer-example",
            description: "Example secured .bao Composer MCP tool.",
          },
        ],
      },
    ],
  },
  {
    id: "addon:secure-mcp-provider",
    label: "Secure MCP provider",
    description: ".bao Composer add-on for registering a secured MCP provider.",
    category: "addon",
    sourcePath: toPackageRecipeSource("addon:secure-mcp-provider"),
    featureAliases: ["mcp-provider"],
    targets: [
      {
        kind: "mcp-provider",
        target: "mcp.bao-composer.secure-provider",
        providerId: "bao-composer-secure-provider",
        mcpProtocolVersion: "2025-06-18",
        entrypoint: "@baohaus/bao-core/bao-composer/addons/secure-mcp-provider",
        tools: [
          {
            name: "bao-composer-secure-tool",
            description: "Secured .bao Composer MCP provider tool.",
          },
        ],
      },
    ],
  },
  {
    id: "addon:happydumpling",
    label: "Happydumpling overlay",
    description: ".bao Composer add-on for Happydumpling reference documentation surfaces.",
    category: "addon",
    sourcePath: toPackageRecipeSource("addon:happydumpling"),
    featureAliases: ["happydumpling"],
    targets: [
      {
        kind: "config-overlay",
        target: "docs.bao-composer.happydumpling",
        section: "happydumpling",
        overlay: {
          enabled: true,
          surface: "reference",
        },
      },
    ],
  },
  {
    id: "addon:baodown-flow",
    label: "BaoDown flow",
    description: ".bao Composer add-on for a BaoDown bootstrap flow.",
    category: "addon",
    sourcePath: toPackageRecipeSource("addon:baodown-flow"),
    featureAliases: ["baodown-flow"],
    targets: [
      {
        kind: "baodown-flow",
        target: "flow.bao-composer.bootstrap",
        definition: BAO_COMPOSER_BAODOWN_FLOW_DEFINITION_PATH,
      },
    ],
  },
  {
    id: "addon:ai-model",
    label: "AI model",
    description: ".bao Composer add-on for registering an AI model target.",
    category: "addon",
    sourcePath: toPackageRecipeSource("addon:ai-model"),
    featureAliases: ["ai-model"],
    targets: [
      {
        kind: "ai-model",
        target: "ai.bao-composer.model",
      },
    ],
  },
  {
    id: "addon:bao-archive-authoring",
    label: ".bao archive authoring",
    description: ".bao Composer add-on for .bao archive authoring workflow metadata.",
    category: "addon",
    sourcePath: toPackageRecipeSource("addon:bao-archive-authoring"),
    featureAliases: ["bao-archive-authoring"],
    targets: [
      {
        kind: "config-overlay",
        target: "archive-authoring.bao-composer.bao-archive-authoring",
        section: "bao-archive-authoring",
        overlay: {
          enabled: true,
          mode: "archive-authoring",
        },
      },
    ],
  },
  {
    id: "foundation:htmx-ext-shared",
    label: "HTMX foundation: shared lifecycle helpers",
    description:
      "Registers the @baohaus/htmx-ext-foundation-bao shared HTMX surface (getHtmx, escapeHtml, resolveExtensionElement) for bao-first interactive UIs.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:htmx-ext-shared"),
    featureAliases: ["htmx-extension"],
    targets: [
      {
        kind: "htmx-extension",
        target: "ui.bao-composer.htmx-ext-foundation.shared",
        extension: "@baohaus/htmx-ext-foundation-bao/shared",
        route: "authenticated",
      },
    ],
  },
  {
    id: "foundation:htmx-ext-focus-panel",
    label: "HTMX foundation: focus-panel",
    description:
      "Registers @baohaus/htmx-ext-foundation-bao/focus-panel — moves keyboard focus into the swapped panel on htmx:afterSwap for a11y.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:htmx-ext-focus-panel"),
    featureAliases: ["htmx-extension"],
    targets: [
      {
        kind: "htmx-extension",
        target: "ui.bao-composer.htmx-ext-foundation.focus-panel",
        extension: "@baohaus/htmx-ext-foundation-bao/focus-panel",
        route: "authenticated",
      },
    ],
  },
  {
    id: "foundation:htmx-ext-server-toast",
    label: "HTMX foundation: server-toast",
    description:
      "Registers @baohaus/htmx-ext-foundation-bao/server-toast — renders DaisyUI toasts from HX-Trigger showToast payloads. Consumes canonical icons-bao + bao-constants/timeouts.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:htmx-ext-server-toast"),
    featureAliases: ["htmx-extension"],
    targets: [
      {
        kind: "htmx-extension",
        target: "ui.bao-composer.htmx-ext-foundation.server-toast",
        extension: "@baohaus/htmx-ext-foundation-bao/server-toast",
        route: "authenticated",
      },
    ],
  },
  {
    id: "foundation:htmx-ext-progress-indicator",
    label: "HTMX foundation: progress-indicator",
    description:
      "Registers @baohaus/htmx-ext-foundation-bao/progress-indicator — drives loading indicator + template-cloned panel + aria-busy across htmx lifecycle.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:htmx-ext-progress-indicator"),
    featureAliases: ["htmx-extension"],
    targets: [
      {
        kind: "htmx-extension",
        target: "ui.bao-composer.htmx-ext-foundation.progress-indicator",
        extension: "@baohaus/htmx-ext-foundation-bao/progress-indicator",
        route: "authenticated",
      },
    ],
  },
  {
    id: "foundation:htmx-ext-layout-controls",
    label: "HTMX foundation: layout-controls",
    description:
      "Registers @baohaus/htmx-ext-foundation-bao/layout-controls — drawer toggles, form HTMX defaults (hx-sync, hx-disabled-elt), CSRF wiring via canonical auth-bao/csrf, busy-state ARIA across request lifecycle.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:htmx-ext-layout-controls"),
    featureAliases: ["htmx-extension"],
    targets: [
      {
        kind: "htmx-extension",
        target: "ui.bao-composer.htmx-ext-foundation.layout-controls",
        extension: "@baohaus/htmx-ext-foundation-bao/layout-controls",
        route: "authenticated",
      },
    ],
  },
  {
    id: "foundation:elysia-sse",
    label: "Elysia foundation: SSE utilities",
    description:
      "Registers @baohaus/elysia-plugins-foundation-bao/sse-plugin — sse.event/ping/comment wire helpers decorated onto the Elysia context.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:elysia-sse"),
    featureAliases: ["elysia-plugin"],
    targets: [
      {
        kind: "elysia-plugin",
        target: "http.bao-composer.elysia-foundation.sse",
        plugin: "@baohaus/elysia-plugins-foundation-bao/sse-plugin",
        enabled: true,
      },
    ],
  },
  {
    id: "foundation:elysia-i18n-context",
    label: "Elysia foundation: i18n context",
    description:
      "Registers @baohaus/elysia-plugins-foundation-bao/i18n-context — re-export of canonical createI18nPlugin from tangyuan-i18n/elysia.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:elysia-i18n-context"),
    featureAliases: ["elysia-plugin"],
    targets: [
      {
        kind: "elysia-plugin",
        target: "http.bao-composer.elysia-foundation.i18n-context",
        plugin: "@baohaus/elysia-plugins-foundation-bao/i18n-context",
        enabled: true,
      },
    ],
  },
  {
    id: "foundation:elysia-session-purge",
    label: "Elysia foundation: session purge",
    description:
      "Registers @baohaus/elysia-plugins-foundation-bao/session-purge-plugin — periodic session purge lifecycle on onStart/onStop.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:elysia-session-purge"),
    featureAliases: ["elysia-plugin"],
    targets: [
      {
        kind: "elysia-plugin",
        target: "http.bao-composer.elysia-foundation.session-purge",
        plugin: "@baohaus/elysia-plugins-foundation-bao/session-purge-plugin",
        enabled: true,
      },
    ],
  },
  {
    id: "foundation:elysia-csrf-protection",
    label: "Elysia foundation: CSRF protection",
    description:
      "Registers @baohaus/elysia-plugins-foundation-bao/csrf-protection — guard factory consuming canonical auth-bao/csrf cookie/header/body constants.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:elysia-csrf-protection"),
    featureAliases: ["elysia-plugin"],
    targets: [
      {
        kind: "elysia-plugin",
        target: "http.bao-composer.elysia-foundation.csrf-protection",
        plugin: "@baohaus/elysia-plugins-foundation-bao/csrf-protection",
        enabled: true,
      },
    ],
  },
  {
    id: "foundation:elysia-managed-polling",
    label: "Elysia foundation: managed polling",
    description:
      "Registers @baohaus/elysia-plugins-foundation-bao/managed-polling-plugin — Elysia adapter over bao-utils/managed-polling-lifecycle.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:elysia-managed-polling"),
    featureAliases: ["elysia-plugin"],
    targets: [
      {
        kind: "elysia-plugin",
        target: "http.bao-composer.elysia-foundation.managed-polling",
        plugin: "@baohaus/elysia-plugins-foundation-bao/managed-polling-plugin",
        enabled: true,
      },
    ],
  },
  {
    id: "foundation:elysia-request-context",
    label: "Elysia foundation: request context",
    description:
      "Registers @baohaus/elysia-plugins-foundation-bao/request-context — correlation-ID propagation + request-completion structured logging.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:elysia-request-context"),
    featureAliases: ["elysia-plugin"],
    targets: [
      {
        kind: "elysia-plugin",
        target: "http.bao-composer.elysia-foundation.request-context",
        plugin: "@baohaus/elysia-plugins-foundation-bao/request-context",
        enabled: true,
      },
    ],
  },
  {
    id: "foundation:elysia-error-handler",
    label: "Elysia foundation: error handler",
    description:
      "Registers @baohaus/elysia-plugins-foundation-bao/error-handler — framework-error → bao envelope factory with correlation-ID propagation.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:elysia-error-handler"),
    featureAliases: ["elysia-plugin"],
    targets: [
      {
        kind: "elysia-plugin",
        target: "http.bao-composer.elysia-foundation.error-handler",
        plugin: "@baohaus/elysia-plugins-foundation-bao/error-handler",
        enabled: true,
      },
    ],
  },
  {
    id: "foundation:elysia-openapi-docs",
    label: "Elysia foundation: OpenAPI docs",
    description:
      "Registers @baohaus/elysia-plugins-foundation-bao/openapi-docs — caller-supplied metadata wrapper over @elysiajs/openapi.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:elysia-openapi-docs"),
    featureAliases: ["elysia-plugin"],
    targets: [
      {
        kind: "elysia-plugin",
        target: "http.bao-composer.elysia-foundation.openapi-docs",
        plugin: "@baohaus/elysia-plugins-foundation-bao/openapi-docs",
        enabled: true,
      },
    ],
  },
  {
    id: "foundation:elysia-static-assets",
    label: "Elysia foundation: static assets",
    description:
      "Registers @baohaus/elysia-plugins-foundation-bao/static-assets — mount-driven Bun.file() serving with path-traversal guards via canonical bao-utils/safe-decode-uri.",
    category: "addon",
    sourcePath: toPackageRecipeSource("foundation:elysia-static-assets"),
    featureAliases: ["elysia-plugin"],
    targets: [
      {
        kind: "elysia-plugin",
        target: "http.bao-composer.elysia-foundation.static-assets",
        plugin: "@baohaus/elysia-plugins-foundation-bao/static-assets",
        enabled: true,
      },
    ],
  },
] as const satisfies readonly BaoComposerManifestRecipeDescriptor[];

const FEATURE_RECIPE_MAP: Record<BaoComposerFeatureId, readonly BaoComposerRecipeId[]> = {
  vision: ["bao-runtime:vision"],
  perception: ["bao-runtime:perception"],
  gaussian: ["bao-runtime:gaussian"],
  rpa: ["bao-runtime:rpa"],
  scoutdumpling: ["bao-runtime:scoutdumpling"],
  happydumpling: ["addon:happydumpling"],
  "mcp-provider": ["addon:secure-mcp-provider"],
  "baodown-flow": ["addon:baodown-flow"],
  "ai-model": ["addon:ai-model"],
  "bao-archive-authoring": ["addon:bao-archive-authoring"],
} as const;

const capabilityMatrixProviders: readonly unknown[] = Array.isArray(capabilityMatrix.mcp?.providers)
  ? capabilityMatrix.mcp.providers
  : [];

const CAPABILITY_MATRIX_PROVIDERS: Set<string> = new Set<string>(
  capabilityMatrixProviders.filter((provider): provider is string => typeof provider === "string"),
);

function createCanonicalManifest(input: {
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly sourcePath: string;
  readonly targets: readonly BaoComposerRecipeTarget[];
}): BaoManifest {
  return {
    schemaVersion: BAO_MANIFEST_SCHEMA_VERSION,
    metadata: {
      name: input.name,
      version: input.version,
      description: input.description,
      source: input.sourcePath,
    },
    description: input.description,
    targets: input.targets.map(toBaoComposerManifestTarget),
  };
}

function readRecipeManifestName(manifest: BaoComposerRecipeManifest): string {
  return manifest.metadata.name;
}

function readRecipeManifestDescription(manifest: BaoComposerRecipeManifest): string {
  return manifest.metadata.description ?? manifest.description ?? manifest.metadata.name;
}

function readRecipeManifestTargets(
  manifest: BaoComposerRecipeManifest,
): readonly BaoComposerRecipeTargetDescriptor[] {
  return manifest.targets.map((target) => ({
    kind: target.kind,
    target: target.target,
  }));
}

function buildBaoRuntimeManifest(params: {
  readonly descriptor: BunBuddyDeploymentDescriptor;
  readonly registryVersion: string;
}): BaoManifest {
  const { descriptor, registryVersion } = params;
  const sourcePath = `${BUNBUDDY_WORKLOADS_SOURCE_PATH}#bunbuddies.${descriptor.kind}`;
  const description =
    descriptor.notes[0] ?? `Canonical .bao Composer recipe for ${descriptor.kind}.`;

  return createCanonicalManifest({
    name: descriptor.serviceName,
    version: registryVersion,
    description,
    sourcePath,
    targets: [
      structuredClone(descriptor.workload),
      {
        kind: "oci-image",
        target: descriptor.ociTarget,
        image: descriptor.ociImage,
        context: descriptor.buildContext,
        containerfile: descriptor.containerfile,
        platforms: [...descriptor.workload.imagePlatforms],
        architectures: [...descriptor.workload.hostArchitectures],
      },
    ],
  });
}

function readBunBuddyWorkloads(): BunBuddyDeploymentRegistry {
  const parsedRegistry = getBunBuddyWorkloadConfig();

  return buildBunBuddyWorkloadRegistry(
    validateBunBuddyWorkloadRegistry(parsedRegistry, BUNBUDDY_WORKLOADS_SOURCE_PATH),
  ).getConfig();
}

function buildRecipeCapabilityTags(
  manifest: BaoComposerRecipeManifest,
  descriptor: BunBuddyDeploymentDescriptor | null,
): string[] {
  const tags = new Set<string>(["bao-composer"]);
  for (const target of readRecipeManifestTargets(manifest)) {
    tags.add(`target:${target.kind}`);
  }

  if (descriptor) {
    tags.add("category:runtime");
    tags.add(`bao-runtime:${descriptor.kind}`);
    for (const provider of descriptor.workload.providers) {
      tags.add(`provider:${provider}`);
    }
    for (const hostPlatform of descriptor.workload.hostPlatforms) {
      tags.add(`host:${hostPlatform}`);
    }
  }

  if (readRecipeManifestTargets(manifest).some((target) => target.kind === "mcp-provider")) {
    tags.add("system:mcp");
    for (const provider of CAPABILITY_MATRIX_PROVIDERS) {
      tags.add(`mcp:${provider}`);
    }
  }

  return [...tags].sort((left, right) => left.localeCompare(right));
}

function createBaoRuntimeRecipe(params: {
  readonly descriptor: BunBuddyDeploymentDescriptor;
  readonly registryVersion: string;
}): BaoComposerResolvedRecipe {
  const { descriptor, registryVersion } = params;
  const manifest = buildBaoRuntimeManifest({ descriptor, registryVersion });
  const sourcePath = `${BUNBUDDY_WORKLOADS_SOURCE_PATH}#bunbuddies.${descriptor.kind}`;
  return {
    id: `bao-runtime:${descriptor.kind}`,
    label: `${descriptor.serviceName}`,
    description:
      manifest.metadata.description ??
      descriptor.notes[0] ??
      `Canonical .bao Composer recipe for ${descriptor.kind}.`,
    category: "runtime",
    sourceKind: "bao-runtime-workload",
    sourcePath,
    manifestName: manifest.metadata.name,
    bunbuddyKind: descriptor.kind,
    featureAliases: [descriptor.kind],
    targetIds: [...manifest.targets.map((target) => target.target)],
    targetKinds: [...new Set(manifest.targets.map((target) => target.kind))].sort((left, right) =>
      left.localeCompare(right),
    ),
    capabilityTags: buildRecipeCapabilityTags(manifest, descriptor),
    manifest,
  };
}

function createManifestRecipe(
  descriptor: BaoComposerManifestRecipeDescriptor,
): BaoComposerResolvedRecipe {
  const manifest = createCanonicalManifest({
    name: descriptor.label,
    version: "0.1.0",
    description: descriptor.description,
    sourcePath: descriptor.sourcePath,
    targets: descriptor.targets,
  });
  const targets = readRecipeManifestTargets(manifest);
  return {
    id: descriptor.id,
    label: readRecipeManifestName(manifest),
    description: readRecipeManifestDescription(manifest) ?? descriptor.id,
    category: descriptor.category,
    sourceKind: "docs-example",
    sourcePath: descriptor.sourcePath,
    manifestName: readRecipeManifestName(manifest),
    featureAliases: [...descriptor.featureAliases],
    targetIds: [...targets.map((target) => target.target)],
    targetKinds: [...new Set(targets.map((target) => target.kind))].sort((left, right) =>
      left.localeCompare(right),
    ),
    capabilityTags: buildRecipeCapabilityTags(manifest, null),
    manifest,
  };
}

function buildRecipeRegistry(): readonly BaoComposerResolvedRecipe[] {
  const bunbuddyWorkloads = readBunBuddyWorkloads();
  const descriptors = Object.values(bunbuddyWorkloads.bunbuddies);
  const baoRuntimeRecipes = descriptors
    .sort((left, right) => left.kind.localeCompare(right.kind))
    .map((descriptor) =>
      createBaoRuntimeRecipe({ descriptor, registryVersion: bunbuddyWorkloads.version }),
    );

  const allRecipes: BaoComposerResolvedRecipe[] = [
    ...baoRuntimeRecipes,
    ...MANIFEST_RECIPE_DESCRIPTORS.map((descriptor) => createManifestRecipe(descriptor)),
  ];
  return allRecipes.sort((left, right) => left.id.localeCompare(right.id));
}

const RECIPE_REGISTRY: readonly BaoComposerResolvedRecipe[] = buildRecipeRegistry();

/**
 * Resolve the full canonical .bao Composer recipe registry.
 *
 * @returns Immutable .bao Composer recipe registry.
 */
export function resolveBaoComposerRecipeRegistry(): readonly BaoComposerResolvedRecipe[] {
  return RECIPE_REGISTRY;
}

/**
 * Resolve one canonical .bao Composer recipe.
 *
 * @param recipeId - Stable recipe identifier.
 * @returns Recipe or null when unavailable.
 */
export function resolveBaoComposerRecipe(recipeId: string): BaoComposerResolvedRecipe | null {
  return resolveBaoComposerRecipeRegistry().find((recipe) => recipe.id === recipeId) ?? null;
}

/**
 * Resolve the default recipe ids for a public .bao Composer feature.
 *
 * @param featureId - Public .bao Composer feature identifier.
 * @returns Stable recipe identifiers.
 */
export function resolveBaoComposerFeatureRecipeIds(
  featureId: BaoComposerFeatureId,
): readonly BaoComposerRecipeId[] {
  return FEATURE_RECIPE_MAP[featureId];
}

/**
 * Resolve a public .bao Composer recipe list stripped of embedded manifests.
 *
 * @returns Public .bao Composer recipe catalog.
 */
export function buildBaoComposerPublicRecipeCatalog(): readonly BaoComposerRecipeV1[] {
  return resolveBaoComposerRecipeRegistry().map(({ manifest: _, ...recipe }) => ({
    ...recipe,
    featureAliases: [...recipe.featureAliases],
    targetIds: [...recipe.targetIds],
    targetKinds: [...recipe.targetKinds],
    capabilityTags: [...recipe.capabilityTags],
  }));
}

/**
 * Normalize a JSON value into a canonical string for .bao Composer merge checks.
 *
 * @param value - Candidate JSON payload.
 * @returns Canonical JSON string.
 */
export function canonicalizeBaoComposerJson(value: JsonValue): string {
  return JSON.stringify(canonicalizeJsonValue(value));
}
