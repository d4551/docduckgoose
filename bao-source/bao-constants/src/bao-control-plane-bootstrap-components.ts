/**
 * Typed BaoControlPlane bootstrap component inventory.
 *
 * Canonical registry of chart templates, bootstrap scripts, readiness checks,
 * and package validation tests. Used by package pipeline and rollout gate.
 *
 * @shared/constants/bao-control-plane-bootstrap-components
 */

import { DEFAULT_BAO_CONTROL_PLANE_PACKAGE_MANIFEST_PATH } from "./bao-control-plane-defaults";

/** Helm chart root for the platform package (derived from SSOT in bao-control-plane-defaults). */
export const BAO_CONTROL_PLANE_PACKAGE_CHART_ROOT: "infrastructure/packages/bao-runtime" =
  DEFAULT_BAO_CONTROL_PLANE_PACKAGE_MANIFEST_PATH;

/** Package CRD path. */
export const BAO_CONTROL_PLANE_PACKAGE_CRD_PATH: "infrastructure/crds/package.yaml" =
  "infrastructure/crds/package.yaml" as const;

/** Component inventory path (YAML). */
export const BAO_CONTROL_PLANE_COMPONENT_INVENTORY_PATH: "infrastructure/bao-control-plane/component-inventory.yaml" =
  "infrastructure/bao-control-plane/component-inventory.yaml" as const;

/** Bootstrap job component label. */
export const BAO_CONTROL_PLANE_BOOTSTRAP_JOB_COMPONENT: "migrations" = "migrations" as const;

/** Seed job component label. */
export const BAO_CONTROL_PLANE_SEED_JOB_COMPONENT: "seed" = "seed" as const;

/** Bootstrap component names that must align with Package CRD manifests. */
export const BAO_CONTROL_PLANE_BOOTSTRAP_COMPONENT_NAMES: readonly [
  "app",
  "postgres",
  "redis",
  "minio",
  "migrations",
  "seed",
  "backup",
  "backup-prune",
  "nginx",
] = [
  "app",
  "postgres",
  "redis",
  "minio",
  "migrations",
  "seed",
  "backup",
  "backup-prune",
  "nginx",
] as const;

/**
 * Canonical Bao control-plane bootstrap component name union derived from the shared component registry.
 */
export type BaoControlPlaneBootstrapComponentName =
  (typeof BAO_CONTROL_PLANE_BOOTSTRAP_COMPONENT_NAMES)[number];
