/**
 * Relative path resolution for .bao manifest file references.
 *
 * Resolves relative paths ("./", "../") in target fields to absolute paths
 * based on a given base directory.
 */

import path from "node:path";
import type { BaoInstallTargetKind } from "@baohaus/bao-schemas/bao-install/core.schemas";
import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoInstallTarget } from "@baohaus/bao-schemas/bao-install/targets.schemas";

// Kind-to-fields mapping for file path references

const KIND_PATH_FIELDS: Readonly<Record<BaoInstallTargetKind, readonly string[]>> = {
  "elysia-plugin": ["plugin"],
  "htmx-extension": ["extension"],
  "prisma-extension": ["extension"],
  "better-auth-extension": ["provider", "configPath"],
  "mcp-provider": ["provider"],
  "bun-plugin": ["plugin"],
  "flatbuffer-schema": ["schemaPath", "outputDir"],
  "baodown-node": ["nodeModule"],
  "baodown-flow": ["definition"],
  "bunbuddy-contract": ["contract"],
  "usd-scene": ["scene"],
  "oci-image": ["context", "containerfile"],
  "hardware-driver": ["driverPackage"],
  "ai-model": [],
  "bao-package": [],
  "config-overlay": [],
  "bao-runtime-workload": [],
  "ui-component-kit": ["components.entrypoint"],
  "theme-pack": ["stylesheet"],
  "design-tokens": ["stylesheet"],
  "motion-preset": ["stylesheet"],
  "density-preset": ["stylesheet"],
  sidebar: ["sidebarModule"],
  nav: ["navModule"],
  topbar: ["topbarModule"],
  "settings-tab": ["settingsTabModule"],
  "palette-entry-group": ["paletteEntryGroupModule"],
  "api-group": ["apiGroupModule"],
  "tile-group": ["tileGroupModule"],
};

// Path helpers

function isRelativePath(value: string): boolean {
  return value.startsWith("./") || value.startsWith("../");
}

function resolveTargetPath(value: string, basePath: string): string {
  return isRelativePath(value) ? path.resolve(basePath, value) : value;
}

function resolveOptionalTargetPath(
  value: string | undefined,
  basePath: string,
): string | undefined {
  return value === undefined ? undefined : resolveTargetPath(value, basePath);
}

function resolveTargetPaths(target: BaoInstallTarget, basePath: string): BaoInstallTarget {
  switch (target.kind) {
    case "elysia-plugin":
    case "bun-plugin":
      return { ...target, plugin: resolveOptionalTargetPath(target.plugin, basePath) };
    case "htmx-extension":
    case "prisma-extension":
      return { ...target, extension: resolveOptionalTargetPath(target.extension, basePath) };
    case "better-auth-extension":
      return {
        ...target,
        provider: resolveOptionalTargetPath(target.provider, basePath),
        configPath: resolveOptionalTargetPath(target.configPath, basePath),
      };
    case "mcp-provider":
      return "provider" in target
        ? { ...target, provider: resolveOptionalTargetPath(target.provider, basePath) }
        : { ...target, entrypoint: resolveOptionalTargetPath(target.entrypoint, basePath) };
    case "flatbuffer-schema":
      return {
        ...target,
        schemaPath: resolveOptionalTargetPath(target.schemaPath, basePath),
        outputDir: resolveOptionalTargetPath(target.outputDir, basePath),
      };
    case "baodown-node":
      return { ...target, nodeModule: resolveOptionalTargetPath(target.nodeModule, basePath) };
    case "baodown-flow":
      return { ...target, definition: resolveOptionalTargetPath(target.definition, basePath) };
    case "bunbuddy-contract":
      return { ...target, contract: resolveOptionalTargetPath(target.contract, basePath) };
    case "usd-scene":
      return { ...target, scene: resolveOptionalTargetPath(target.scene, basePath) };
    case "oci-image":
      return {
        ...target,
        context: resolveOptionalTargetPath(target.context, basePath),
        containerfile: resolveOptionalTargetPath(target.containerfile, basePath),
      };
    case "hardware-driver":
      return {
        ...target,
        driverPackage: resolveOptionalTargetPath(target.driverPackage, basePath),
      };
    case "ui-component-kit":
      return {
        ...target,
        components: target.components?.map((component) => ({
          ...component,
          entrypoint: resolveTargetPath(component.entrypoint, basePath),
        })),
      };
    case "theme-pack":
    case "design-tokens":
    case "motion-preset":
    case "density-preset":
      if (typeof target.stylesheet !== "string") {
        return { ...target };
      }
      return { ...target, stylesheet: resolveTargetPath(target.stylesheet, basePath) };
    case "topbar":
      if (typeof target.topbarModule !== "string") {
        return { ...target };
      }
      return { ...target, topbarModule: resolveTargetPath(target.topbarModule, basePath) };
    case "settings-tab":
      if (typeof target.settingsTabModule !== "string") {
        return { ...target };
      }
      return {
        ...target,
        settingsTabModule: resolveTargetPath(target.settingsTabModule, basePath),
      };
    case "palette-entry-group":
      if (typeof target.paletteEntryGroupModule !== "string") {
        return { ...target };
      }
      return {
        ...target,
        paletteEntryGroupModule: resolveTargetPath(target.paletteEntryGroupModule, basePath),
      };
    case "api-group":
      if (typeof target.apiGroupModule !== "string") {
        return { ...target };
      }
      return { ...target, apiGroupModule: resolveTargetPath(target.apiGroupModule, basePath) };
    case "tile-group":
      if (typeof target.tileGroupModule !== "string") {
        return { ...target };
      }
      return { ...target, tileGroupModule: resolveTargetPath(target.tileGroupModule, basePath) };
    default:
      return { ...target };
  }
}

// Public API

export function resolveBaoManifestFileReferences(
  manifest: BaoManifest,
  basePath: string,
): BaoManifest {
  const [firstManifestTarget, ...remainingManifestTargets] = manifest.targets;
  if (firstManifestTarget === undefined) {
    return manifest;
  }
  const firstTarget =
    KIND_PATH_FIELDS[firstManifestTarget.kind].length === 0
      ? { ...firstManifestTarget }
      : resolveTargetPaths(firstManifestTarget, basePath);
  const remainingTargets = remainingManifestTargets.map((target: BaoInstallTarget) =>
    KIND_PATH_FIELDS[target.kind].length === 0
      ? { ...target }
      : resolveTargetPaths(target, basePath),
  );

  return {
    ...manifest,
    targets: [firstTarget, ...remainingTargets],
  };
}
