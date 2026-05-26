/**
 * BaoComposer standalone capability profile.
 *
 * Derives a reusable profile from a `.bao` manifest so CLI, runtime, Registry,
 * and Forge surfaces report standalone readiness from the same contract.
 *
 * @packageDocumentation
 */

import { BAO_COMPOSER_STANDALONE_CONTRACT_ENDPOINTS } from "@baohaus/bao-constants/api-paths";
import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoInstallTargetBase } from "@baohaus/bao-schemas/bao-install/targets.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

const TARGET_KIND_CAPABILITIES = new Map<string, string>([
  ["bao-package", "bao package"],
  ["mcp-provider", "mcp provider"],
  ["baodown-flow", "automation flow"],
  ["baodown-node", "automation node"],
  ["ai-model", "ai runtime"],
  ["bao-runtime-workload", ".bao Runtime workload"],
  ["elysia-plugin", "web api plugin"],
  ["htmx-extension", "htmx ui extension"],
  ["better-auth-extension", "auth extension"],
  ["prisma-extension", "database extension"],
  ["flatbuffer-schema", "flatbuffer schema"],
  ["hardware-driver", "hardware driver"],
  ["bun-plugin", "bun plugin"],
  ["config-overlay", "config overlay"],
  ["oci-image", "oci image"],
  ["usd-scene", "usd scene"],
  ["ui-component-kit", "ui component kit"],
]);

const AUTOMATION_KINDS = new Set(["baodown-flow", "baodown-node"]);
const AI_RUNTIME_KINDS = new Set(["ai-model", "bao-runtime-workload"]);
const WEB_RUNTIME_KINDS = new Set([
  "elysia-plugin",
  "htmx-extension",
  "better-auth-extension",
  "prisma-extension",
]);
const STANDALONE_KINDS = new Set(["bao-runtime-workload", "mcp-provider"]);

export const BaoComposerTargetKindCountSchema = Type.Object(
  {
    kind: Type.String({ minLength: 1 }),
    count: Type.Integer({ minimum: 0 }),
  },
  { additionalProperties: false },
);

export const BaoComposerMcpProviderProfileSchema = Type.Object(
  {
    target: Type.String({ minLength: 1 }),
    providerId: Type.String({ minLength: 1 }),
    tools: Type.Array(Type.String({ minLength: 1 })),
    entrypoint: Type.String(),
    connectionHint: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export const BaoComposerStandaloneProfileSchema = Type.Object(
  {
    identity: Type.Object(
      {
        name: Type.String({ minLength: 1 }),
        version: Type.String({ minLength: 1 }),
        checksum: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
      },
      { additionalProperties: false },
    ),
    installable: Type.Boolean(),
    standaloneReady: Type.Boolean(),
    targetSummary: Type.Object(
      {
        total: Type.Integer({ minimum: 0 }),
        countsByKind: Type.Array(BaoComposerTargetKindCountSchema),
        orderedTargetIds: Type.Array(Type.String({ minLength: 1 })),
      },
      { additionalProperties: false },
    ),
    capabilities: Type.Array(Type.String({ minLength: 1 })),
    mcpProviders: Type.Array(BaoComposerMcpProviderProfileSchema),
    automation: Type.Array(Type.String({ minLength: 1 })),
    aiRuntime: Type.Array(Type.String({ minLength: 1 })),
    webRuntime: Type.Array(Type.String({ minLength: 1 })),
    standaloneEndpoints: Type.Array(Type.String({ minLength: 1 })),
    standaloneTargets: Type.Array(Type.String({ minLength: 1 })),
    integrationWarnings: Type.Array(Type.String({ minLength: 1 })),
    otherTargets: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export type BaoComposerTargetKindCount = Static<typeof BaoComposerTargetKindCountSchema>;
export type BaoComposerMcpProviderProfile = Static<typeof BaoComposerMcpProviderProfileSchema>;
export type BaoComposerStandaloneProfile = Static<typeof BaoComposerStandaloneProfileSchema>;

function sortedCounts(counts: ReadonlyMap<string, number>): BaoComposerTargetKindCount[] {
  return [...counts.entries()]
    .map(([kind, count]) => ({ kind, count }))
    .sort((left, right) => left.kind.localeCompare(right.kind));
}

function targetKindIds(
  targets: readonly BaoInstallTargetBase[],
  kinds: ReadonlySet<string>,
): string[] {
  return targets.filter((target) => kinds.has(target.kind)).map((target) => target.target);
}

function mcpProviderProfile(target: BaoInstallTargetBase): BaoComposerMcpProviderProfile | null {
  if (target.kind !== "mcp-provider" || target.providerId === undefined) {
    return null;
  }
  return {
    target: target.target,
    providerId: target.providerId,
    tools: (target.tools ?? []).map((tool) => tool.name),
    entrypoint: target.entrypoint ?? "",
    connectionHint: `bao-composer:<draft-or-artifact-id>:${target.providerId}`,
  };
}

function collectMcpProviders(
  targets: readonly BaoInstallTargetBase[],
): BaoComposerMcpProviderProfile[] {
  const providers: BaoComposerMcpProviderProfile[] = [];
  for (const target of targets) {
    const provider = mcpProviderProfile(target);
    if (provider !== null) {
      providers.push(provider);
    }
  }
  return providers;
}

function collectCapabilities(targets: readonly BaoInstallTargetBase[]): string[] {
  const capabilities = new Set<string>();
  for (const target of targets) {
    const capability = TARGET_KIND_CAPABILITIES.get(target.kind);
    if (capability !== undefined) {
      capabilities.add(capability);
    }
  }
  return [...capabilities].sort((left, right) => left.localeCompare(right));
}

function collectOtherTargets(targets: readonly BaoInstallTargetBase[]): string[] {
  return targets
    .filter((target) => !TARGET_KIND_CAPABILITIES.has(target.kind))
    .map((target) => target.target)
    .sort((left, right) => left.localeCompare(right));
}

function collectStandaloneEndpoints(targets: readonly BaoInstallTargetBase[]): string[] {
  const endpointSet = new Set<string>();
  for (const target of targets) {
    if (target.kind === "bao-runtime-workload") {
      for (const endpoint of BAO_COMPOSER_STANDALONE_CONTRACT_ENDPOINTS) {
        endpointSet.add(endpoint);
      }
    }
    if (target.healthcheck?.readinessPath !== undefined) {
      endpointSet.add(target.healthcheck.readinessPath);
    }
    if (target.healthcheck?.livenessPath !== undefined) {
      endpointSet.add(target.healthcheck.livenessPath);
    }
  }
  return [...endpointSet].sort((left, right) => left.localeCompare(right));
}

function collectIntegrationWarnings(params: {
  readonly manifest: BaoManifest;
  readonly mcpProviders: readonly BaoComposerMcpProviderProfile[];
  readonly standaloneEndpoints: readonly string[];
  readonly standaloneTargets: readonly string[];
}): string[] {
  const warnings: string[] = [];
  if (params.manifest.targets.length === 0) {
    warnings.push("Manifest has no install targets.");
  }
  if (params.standaloneTargets.length > 0 && params.standaloneEndpoints.length === 0) {
    warnings.push("Standalone targets do not expose health, capability, or docs endpoints.");
  }
  if (params.mcpProviders.some((provider) => provider.entrypoint.length === 0)) {
    warnings.push("At least one MCP provider is missing an entrypoint.");
  }
  return warnings;
}

export function deriveBaoComposerStandaloneProfile(
  manifest: BaoManifest,
): BaoComposerStandaloneProfile {
  const counts = new Map<string, number>();
  for (const target of manifest.targets) {
    counts.set(target.kind, (counts.get(target.kind) ?? 0) + 1);
  }

  const mcpProviders = collectMcpProviders(manifest.targets);
  const standaloneEndpoints = collectStandaloneEndpoints(manifest.targets);
  const standaloneTargets = targetKindIds(manifest.targets, STANDALONE_KINDS);
  const integrationWarnings = collectIntegrationWarnings({
    manifest,
    mcpProviders,
    standaloneEndpoints,
    standaloneTargets,
  });

  return {
    identity: {
      name: manifest.metadata.name,
      version: manifest.metadata.version,
      checksum: manifest.metadata.checksum?.value ?? null,
    },
    installable: manifest.targets.length > 0,
    standaloneReady: standaloneTargets.length > 0 && integrationWarnings.length === 0,
    targetSummary: {
      total: manifest.targets.length,
      countsByKind: sortedCounts(counts),
      orderedTargetIds: manifest.targets.map((target) => target.target),
    },
    capabilities: collectCapabilities(manifest.targets),
    mcpProviders,
    automation: targetKindIds(manifest.targets, AUTOMATION_KINDS),
    aiRuntime: targetKindIds(manifest.targets, AI_RUNTIME_KINDS),
    webRuntime: targetKindIds(manifest.targets, WEB_RUNTIME_KINDS),
    standaloneEndpoints,
    standaloneTargets,
    integrationWarnings,
    otherTargets: collectOtherTargets(manifest.targets),
  };
}
