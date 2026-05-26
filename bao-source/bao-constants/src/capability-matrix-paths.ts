/**
 * Canonical paths for capability matrix scanner (relative to repo root).
 *
 * Single source of truth for generate-capability-matrix.ts and related tooling.
 *
 * @shared/constants/capability-matrix-paths
 */

/** Generated capability matrix artifact path. */
export const CAPABILITY_MATRIX_ARTIFACT_PATH: "agentiflow/capability-matrix.generated.json" =
  "agentiflow/capability-matrix.generated.json" as const;
