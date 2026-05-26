/**
 * Graph integrity violation contracts.
 *
 * @packageDocumentation
 */

/**
 * Dependency-cycle violation payload.
 */
export interface GraphCycleViolation {
  kind: "cycle";
  cycleId: string;
  path: string[];
  message: string;
}

/**
 * Layer-direction violation payload.
 */
export interface GraphLayerViolation {
  kind: "layer";
  ruleId: string;
  source: string;
  target: string;
  importSpecifier: string;
  message: string;
}

/**
 * Canonical graph-integrity violation envelope.
 */
export type GraphViolation = GraphCycleViolation | GraphLayerViolation;
