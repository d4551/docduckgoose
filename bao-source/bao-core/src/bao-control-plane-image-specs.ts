/**
 * BaoControlPlane image build specifications shared across scripts, services, and control-plane
 * tooling.
 *
 * @packageDocumentation
 */

import type { BunBuddyDeploymentRegistry } from "@baohaus/bao-schemas/bao-runtime-workload.schemas";
import type {
  BaoControlPlaneContainerPlatform,
  BaoControlPlaneCpuArchitecture,
} from "@baohaus/bao-utils/bao-control-plane-platform";
import { parseBaoControlPlanePlatform } from "@baohaus/bao-utils/bao-control-plane-platform";
import {
  buildBunBuddyWorkloadRegistry,
  validateBunBuddyWorkloadRegistry,
} from "@baohaus/bao-utils/bunbuddy-workload-registry";
import { getBunBuddyWorkloadConfig } from "@baohaus/bunbuddy-shared/bunbuddy-contracts";

const TRAILING_SLASHES_RE: RegExp = /\/+$/u;
const BUNBUDDY_WORKLOADS_SOURCE_PATH =
  "@baohaus/bunbuddy-shared/bunbuddy-contracts#getBunBuddyWorkloadConfig" as const;

const DEFAULT_BAO_CONTROL_PLANE_IMAGE_SPEC_PLATFORMS: readonly ["linux/amd64", "linux/arm64"] = [
  "linux/amd64",
  "linux/arm64",
] as const;

/**
 * BaoControlPlane image build specification.
 */
interface BaoControlPlaneImageSpec {
  /** Logical name for logging and selection. */
  name: string;
  /** Repo-relative build context directory. */
  context: string;
  /** Repo-relative containerfile path. */
  containerfile: string;
  /** Image repository suffix (appended to registry prefix). */
  repository: string;
  /** Build profile tag for planner ordering and layer caching strategy. */
  buildProfile?: BaoControlPlaneBuildProfile;
  /** Supported publish platforms for the image artifact. */
  platforms?: readonly BaoControlPlaneContainerPlatform[];
}

/**
 * Build profile tag for planner ordering.
 *
 * - `base-immutable` — rarely changes, shared base layers (e.g. infrastructure).
 * - `runtime-only` — application runtime, changes with code deploys.
 * - `plugin-host` — bunbuddy sidecars that load external extensions.
 * - `headless` — lightweight headless sidecars with minimal dependencies.
 */
type BaoControlPlaneBuildProfile = "base-immutable" | "runtime-only" | "plugin-host" | "headless";

const BUNBUDDY_PLUGIN_HOST_COMPONENTS: Set<string> = new Set([
  "dimsum-bunbuddy",
  "drone-bunbuddy",
  "industrial-bunbuddy",
  "robotics-bunbuddy",
]);

function resolveImageRepositoryToken(ociImage: string): string {
  const normalized = ociImage.trim().replace(TRAILING_SLASHES_RE, "");
  const segments = normalized.split("/");
  return segments.at(-1) ?? normalized;
}

function resolveBunBuddyBuildProfile(serviceName: string): BaoControlPlaneBuildProfile {
  return BUNBUDDY_PLUGIN_HOST_COMPONENTS.has(serviceName) ? "plugin-host" : "headless";
}

function readBunBuddyWorkloadConfig(): BunBuddyDeploymentRegistry {
  const parsedRegistry = getBunBuddyWorkloadConfig();
  return buildBunBuddyWorkloadRegistry(
    validateBunBuddyWorkloadRegistry(parsedRegistry, BUNBUDDY_WORKLOADS_SOURCE_PATH),
  ).getConfig();
}

function buildBunBuddyImageSpecs(): readonly BaoControlPlaneImageSpec[] {
  const workloadConfig = readBunBuddyWorkloadConfig();
  const descriptors = Object.values(workloadConfig.bunbuddies);
  return descriptors.map((descriptor) => ({
    name: descriptor.moduleId,
    // BunBuddy Containerfiles are monorepo-root builds even when the checked-in
    // `.bao` manifests describe the service directory as the artifact source.
    // The local OCI builder therefore always executes them from the repository root.
    context: ".",
    containerfile: descriptor.containerfile,
    repository: resolveImageRepositoryToken(descriptor.ociImage),
    buildProfile: resolveBunBuddyBuildProfile(descriptor.serviceName),
    platforms: descriptor.workload.imagePlatforms,
  }));
}

/**
 * Resolve the effective platform list for an BaoControlPlane image spec.
 *
 * @param spec - Image spec contract.
 * @returns Canonical supported platform list.
 */
function resolveBaoControlPlaneImageSpecPlatforms(
  spec: BaoControlPlaneImageSpec,
): readonly BaoControlPlaneContainerPlatform[] {
  return spec.platforms ?? DEFAULT_BAO_CONTROL_PLANE_IMAGE_SPEC_PLATFORMS;
}

/**
 * Resolve the effective architecture list for an BaoControlPlane image spec.
 *
 * @param spec - Image spec contract.
 * @returns Canonical supported architecture list without duplicates.
 */
function resolveBaoControlPlaneImageSpecArchitectures(
  spec: BaoControlPlaneImageSpec,
): readonly BaoControlPlaneCpuArchitecture[] {
  const architectures = resolveBaoControlPlaneImageSpecPlatforms(spec).map(
    (platform) => parseBaoControlPlanePlatform(platform)?.architecture,
  );
  return [
    ...new Set(
      architectures.filter(
        (architecture): architecture is BaoControlPlaneCpuArchitecture =>
          architecture !== undefined,
      ),
    ),
  ];
}

/**
 * First-party image build specs for BaoControlPlane and BunBuddy.
 */
const BAO_CONTROL_PLANE_IMAGE_SPECS: readonly BaoControlPlaneImageSpec[] = [
  {
    name: "server",
    context: ".",
    containerfile: "apps/server/Containerfile",
    repository: "server",
    buildProfile: "runtime-only",
  },
  {
    name: "baofire",
    context: ".",
    containerfile: "infrastructure/baofire/fhir-service/Containerfile",
    repository: "baofire",
    buildProfile: "base-immutable",
  },
  ...buildBunBuddyImageSpecs(),
] as const;

/**
 * Minimal image set for local dev bootstrap (app + FHIR + DICOM health services).
 * Used when BAO_CONTROL_PLANE_LOCAL_DEV_IMAGES=true to avoid building all 17 images.
 */
const BAO_CONTROL_PLANE_LOCAL_DEV_IMAGES_MINIMAL: readonly string[] = [
  "server",
  "baofire",
  "dimsum-bunbuddy",
];

export type { BaoControlPlaneBuildProfile, BaoControlPlaneImageSpec };
export {
  BAO_CONTROL_PLANE_IMAGE_SPECS,
  BAO_CONTROL_PLANE_LOCAL_DEV_IMAGES_MINIMAL,
  DEFAULT_BAO_CONTROL_PLANE_IMAGE_SPEC_PLATFORMS,
  resolveBaoControlPlaneImageSpecArchitectures,
  resolveBaoControlPlaneImageSpecPlatforms,
};
