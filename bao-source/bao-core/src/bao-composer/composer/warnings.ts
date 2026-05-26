import type { BaoManifest } from "@baohaus/bao-schemas/bao-install/manifest.schemas";
import type { BaoComposerValidationIssue } from "../bao-composer-fragments-catalog";

interface BaoComposerGpuRequirement {
  readonly resourceKey?: string;
  readonly count?: number;
}

type BaoComposerWarningTarget = BaoManifest["targets"][number];

function readStringList(target: BaoComposerWarningTarget, key: string): readonly string[] {
  const value = Reflect.get(target, key);
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}

function readGpuRequirement(target: BaoComposerWarningTarget): BaoComposerGpuRequirement | null {
  const resourcesValue = Reflect.get(target, "resources");
  if (typeof resourcesValue !== "object" || resourcesValue === null) {
    return null;
  }
  const gpuValue = Reflect.get(resourcesValue, "gpu");
  if (typeof gpuValue !== "object" || gpuValue === null) {
    return null;
  }
  const resourceKey = Reflect.get(gpuValue, "resourceKey");
  const count = Reflect.get(gpuValue, "count");
  return {
    ...(typeof resourceKey === "string" ? { resourceKey } : {}),
    ...(typeof count === "number" ? { count } : {}),
  };
}

function buildGpuWarning(target: BaoComposerWarningTarget): BaoComposerValidationIssue | null {
  const gpuValue = readGpuRequirement(target);
  if (!gpuValue) {
    return null;
  }

  const resourceKey = typeof gpuValue.resourceKey === "string" ? gpuValue.resourceKey : "gpu";
  const count = typeof gpuValue.count === "number" ? gpuValue.count : 1;
  return {
    path: `targets[${target.target}]`,
    message: `Workload "${target.target}" requires GPU capacity (${resourceKey} x ${count}).`,
    severity: "warning",
  };
}

function buildHostPlatformWarning(
  target: BaoComposerWarningTarget,
): BaoComposerValidationIssue | null {
  const hostPlatformsValue = readStringList(target, "hostPlatforms");
  if (hostPlatformsValue.length === 0) {
    return null;
  }

  return {
    path: `targets[${target.target}]`,
    message: `Workload "${target.target}" is constrained to host platforms: ${hostPlatformsValue.join(", ")}.`,
    severity: "warning",
  };
}

function buildProviderWarning(target: BaoComposerWarningTarget): BaoComposerValidationIssue | null {
  const providersValue = readStringList(target, "providers");
  if (providersValue.length === 0) {
    return null;
  }

  return {
    path: `targets[${target.target}]`,
    message: `Workload "${target.target}" targets providers: ${providersValue.join(", ")}.`,
    severity: "warning",
  };
}

function buildTargetWarnings(target: BaoComposerWarningTarget): BaoComposerValidationIssue[] {
  if (target.kind !== "bao-runtime-workload") {
    return [];
  }

  return [
    buildGpuWarning(target),
    buildHostPlatformWarning(target),
    buildProviderWarning(target),
  ].filter((warning): warning is BaoComposerValidationIssue => warning !== null);
}

export function buildWarnings(manifest: BaoManifest): BaoComposerValidationIssue[] {
  return manifest.targets.flatMap((target) => buildTargetWarnings(target));
}
