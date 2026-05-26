/**
 * Canonical build output paths (relative to repo root).
 *
 * Single source of truth for scripts. tsconfig.node-modules.json declarationDir
 * must stay in sync with NODE_MODULES_TYPES_DIR.
 *
 * @shared/constants/build-paths
 */

/** Root build output directory. */
export const DIST_DIR: "dist" = "dist" as const;

/** Declaration output for tsconfig.node-modules (node_modules type-checking). */
export const NODE_MODULES_TYPES_DIR: "dist/node-modules-types" =
  `${DIST_DIR}/node-modules-types` as const;

/** Bao control-plane tooling output (kubeconfig, runtime reconciliation summaries). */
export const BAO_CONTROL_PLANE_DIST_DIR: "dist/bao-control-plane" =
  `${DIST_DIR}/bao-control-plane` as const;

/** Local-cluster summary artifact path (relative to repo root). */
export const BAO_CONTROL_PLANE_LOCAL_CLUSTER_SUMMARY_PATH: "dist/bao-control-plane/local-cluster-summary.json" =
  `${BAO_CONTROL_PLANE_DIST_DIR}/local-cluster-summary.json` as const;

/** Image-build summary artifact path (relative to repo root). */
export const BAO_CONTROL_PLANE_IMAGE_BUILD_SUMMARY_PATH: "dist/bao-control-plane/image-build-summary.json" =
  `${BAO_CONTROL_PLANE_DIST_DIR}/image-build-summary.json` as const;

/** Remote build session summary path (relative to repo root). */
export const BAO_RUNTIME_REMOTE_BUILD_SESSION_SUMMARY_PATH: "run/bao-runtime/remote-build-sessions.json" =
  "run/bao-runtime/remote-build-sessions.json" as const;

/** Package validation summary path (relative to repo root). */
export const BAO_CONTROL_PLANE_PACKAGE_VALIDATION_SUMMARY_PATH: "run/bao-control-plane/package-validation-summary.json" =
  "run/bao-control-plane/package-validation-summary.json" as const;

/** Bao control-plane k0s kubeconfig filename. */
export const BAO_CONTROL_PLANE_K0_KUBECONFIG_FILENAME: "k0.kubeconfig" = "k0.kubeconfig" as const;

/** Bao control-plane k3s kubeconfig filename. */
export const BAO_CONTROL_PLANE_K3_KUBECONFIG_FILENAME: "k3.kubeconfig" = "k3.kubeconfig" as const;

/** CI lint/audit baseline directory. */
export const CI_BASELINES_DIR: "config/ci-baselines" = "config/ci-baselines" as const;

/**
 * Resolve baseline file path by name.
 *
 * @param name - Baseline name without extension (e.g. 'user-journey-audit').
 * @returns Relative path to baseline JSON file.
 */
export function getBaselinePath(name: string): string {
  return `${CI_BASELINES_DIR}/${name}.baseline.json`;
}

/** Driver registry allowlist directory. */
export const DRIVER_REGISTRY_DEFAULT_DIR: "config/drivers" = "config/drivers" as const;

/** Robotics driver baseline filename. */
export const DRIVER_ROBOTICS_BASELINE: "robotics.json" = "robotics.json" as const;

/**
 * Prisma 7 generated client output (relative to apps/server).
 *
 * Must match schema.prisma generator output. Used by PRISMA_SKIP_GENERATE flow:
 * when true, a pre-generated client must exist at this path (e.g. from prior build or artifact).
 */
export const PRISMA_GENERATED_OUTPUT_DIR: "apps/server/prisma/generated" =
  "apps/server/prisma/generated" as const;

/** Default Happydumpling docs static assets dir (relative to repo root). */
export const HAPPYDUMPLING_DOCS_STATIC_DIR: "apps/docs/static" = "apps/docs/static" as const;

/** Default Happydumpling fonts dir (relative to repo root). */
export const HAPPYDUMPLING_DOCS_FONTS_DIR: "apps/docs/static/fonts" =
  "apps/docs/static/fonts" as const;
