/**
 * Three.js capabilities response types.
 *
 * Provides a Three.js "capabilities snapshot" for UI and AI clients.
 *
 * @shared/types/three-capabilities.ts
 */

import type { ThreeIntegrationSummary } from "./three-integration.ts";

/**
 * Three.js API capabilities payload (server-reported).
 */
export interface ThreeApiCapabilities extends ThreeIntegrationSummary {
  /** Overall status of Three.js API features. */
  status: "ok" | "degraded";
  /** Service identifier (e.g. `three-api`). */
  service: string;
  /** Server version string. */
  version: string;
  /** Boolean feature flags describing the Three.js API surface. */
  features: Record<string, boolean>;
  /** Documented endpoint surface for operators. */
  endpointList: string[];
  /** Operator-facing notes/warnings. */
  notes?: string[];
}

/**
 * API v1 response wrapper for Three.js capabilities.
 */
export interface ThreeApiCapabilitiesResponse {
  ok: true;
  data: ThreeApiCapabilities;
  timestamp: string;
}
