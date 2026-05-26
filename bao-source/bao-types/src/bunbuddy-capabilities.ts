/**
 * Aggregated bunbuddy capability snapshot types.
 *
 * Defines the API payload shape returned by the server-side aggregated bunbuddy capability endpoint.
 * This is distinct from the canonical per-bunbuddy `/capabilities` contract in
 * `@baohaus/bao-schemas/bunbuddy.schemas.ts` because it aggregates multiple sources and decorates
 * results with URLs, docs references, and normalized feature maps.
 *
 * @shared/types/bunbuddy-capabilities.ts
 */

import type { BunBuddyKind } from "@baohaus/bao-schemas/bunbuddy.schemas";
import {
  BunBuddyCapabilitiesSnapshotsResponseSchema,
  BunBuddyCapabilitySnapshotSchema,
  BunBuddyDocsInfoSchema,
} from "@baohaus/bao-schemas/bunbuddy-capability-snapshot.schemas";
import type { Static } from "@baohaus/baobox/elysia";
import { Check } from "@baohaus/baobox/value";
import { isRecord } from "./internal/record.js";

/**
 * BunBuddy documentation endpoints and references.
 */
export type BunBuddyDocsInfo = Static<typeof BunBuddyDocsInfoSchema>;

/**
 * Normalized bunbuddy capability snapshot (aggregated by the server).
 */
export type BunBuddyCapabilitySnapshot = Static<typeof BunBuddyCapabilitySnapshotSchema>;

/**
 * API response returned by the aggregated bunbuddy capabilities endpoint.
 */
export type BunBuddyCapabilitiesSnapshotsResponse = Static<
  typeof BunBuddyCapabilitiesSnapshotsResponseSchema
>;

/**
 * High-level capability roles to separate bunbuddy responsibilities.
 */
export type BunBuddyCapabilityRole =
  | "control"
  | "capture"
  | "analysis"
  | "automation"
  | "navigation"
  | "infrastructure";

const BUNBUDDY_CAPABILITY_ROLES: BunBuddyCapabilityRole[] = [
  "control",
  "capture",
  "analysis",
  "automation",
  "navigation",
  "infrastructure",
];

/**
 * Node in the bunbuddy capability graph.
 */
export interface BunBuddyCapabilityNode {
  source: BunBuddyKind;
  role: BunBuddyCapabilityRole;
  status: "healthy" | "degraded" | "unreachable" | "not-configured";
  features: Record<string, boolean>;
  endpoints: string[];
  notes: string[];
}

/**
 * Edge between two bunbuddies representing a coordinated capability path.
 */
export interface BunBuddyCapabilityEdge {
  from: BunBuddyKind;
  to: BunBuddyKind;
  reason: string;
  requirements: string[];
  missing: string[];
  active: boolean;
}

/**
 * BunBuddy capability graph payload.
 */
export interface BunBuddyCapabilityGraph {
  nodes: BunBuddyCapabilityNode[];
  edges: BunBuddyCapabilityEdge[];
}

/**
 * API response returned by the bunbuddy capability graph endpoint.
 */
export interface BunBuddyCapabilityGraphResponse {
  ok: true;
  data: BunBuddyCapabilityGraph;
  timestamp: string;
}

/**
 * Runtime guard for {@link BunBuddyDocsInfo}.
 *
 * @param value - Candidate value.
 * @returns True when value matches {@link BunBuddyDocsInfo}.
 */
export function isBunBuddyDocsInfo(value: unknown): value is BunBuddyDocsInfo {
  return Check(BunBuddyDocsInfoSchema, value);
}

/**
 * Runtime guard for {@link BunBuddyCapabilitySnapshot}.
 *
 * @param value - Candidate value.
 * @returns True when value matches {@link BunBuddyCapabilitySnapshot}.
 */
export function isBunBuddyCapabilitySnapshot(value: unknown): value is BunBuddyCapabilitySnapshot {
  if (!isRecord(value)) {
    return false;
  }
  return Check(BunBuddyCapabilitySnapshotSchema, value);
}

/**
 * Runtime guard for {@link BunBuddyCapabilitiesSnapshotsResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches {@link BunBuddyCapabilitiesSnapshotsResponse}.
 */
export function isBunBuddyCapabilitiesSnapshotsResponse(
  value: unknown,
): value is BunBuddyCapabilitiesSnapshotsResponse {
  if (!isRecord(value)) {
    return false;
  }
  return Check(BunBuddyCapabilitiesSnapshotsResponseSchema, value);
}

/**
 * Runtime guard for {@link BunBuddyCapabilityRole}.
 *
 * @param value - Candidate value.
 * @returns True when value matches {@link BunBuddyCapabilityRole}.
 */
export function isBunBuddyCapabilityRole(value: unknown): value is BunBuddyCapabilityRole {
  return (
    typeof value === "string" && (BUNBUDDY_CAPABILITY_ROLES as readonly string[]).includes(value)
  );
}

/**
 * Runtime guard for {@link BunBuddyCapabilityNode}.
 *
 * @param value - Candidate value.
 * @returns True when value matches {@link BunBuddyCapabilityNode}.
 */
export function isBunBuddyCapabilityNode(value: unknown): value is BunBuddyCapabilityNode {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.source !== "string" || !value.source.trim()) {
    return false;
  }
  if (!isBunBuddyCapabilityRole(value.role)) {
    return false;
  }
  if (
    value.status !== "healthy" &&
    value.status !== "degraded" &&
    value.status !== "unreachable" &&
    value.status !== "not-configured"
  ) {
    return false;
  }
  if (!isRecord(value.features)) {
    return false;
  }
  for (const featureValue of Object.values(value.features)) {
    if (typeof featureValue !== "boolean") {
      return false;
    }
  }
  if (
    !(
      Array.isArray(value.endpoints) &&
      value.endpoints.every((entry: unknown) => typeof entry === "string")
    )
  ) {
    return false;
  }
  if (
    !(
      Array.isArray(value.notes) && value.notes.every((entry: unknown) => typeof entry === "string")
    )
  ) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link BunBuddyCapabilityEdge}.
 *
 * @param value - Candidate value.
 * @returns True when value matches {@link BunBuddyCapabilityEdge}.
 */
export function isBunBuddyCapabilityEdge(value: unknown): value is BunBuddyCapabilityEdge {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.from !== "string" || !value.from.trim()) {
    return false;
  }
  if (typeof value.to !== "string" || !value.to.trim()) {
    return false;
  }
  if (typeof value.reason !== "string") {
    return false;
  }
  if (
    !(
      Array.isArray(value.requirements) &&
      value.requirements.every((entry: unknown) => typeof entry === "string")
    )
  ) {
    return false;
  }
  if (
    !(
      Array.isArray(value.missing) &&
      value.missing.every((entry: unknown) => typeof entry === "string")
    )
  ) {
    return false;
  }
  if (typeof value.active !== "boolean") {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link BunBuddyCapabilityGraph}.
 *
 * @param value - Candidate value.
 * @returns True when value matches {@link BunBuddyCapabilityGraph}.
 */
export function isBunBuddyCapabilityGraph(value: unknown): value is BunBuddyCapabilityGraph {
  if (!isRecord(value)) {
    return false;
  }
  if (!(Array.isArray(value.nodes) && value.nodes.every(isBunBuddyCapabilityNode))) {
    return false;
  }
  if (!(Array.isArray(value.edges) && value.edges.every(isBunBuddyCapabilityEdge))) {
    return false;
  }
  return true;
}

/**
 * Runtime guard for {@link BunBuddyCapabilityGraphResponse}.
 *
 * @param value - Candidate value.
 * @returns True when value matches {@link BunBuddyCapabilityGraphResponse}.
 */
export function isBunBuddyCapabilityGraphResponse(
  value: unknown,
): value is BunBuddyCapabilityGraphResponse {
  if (!isRecord(value)) {
    return false;
  }
  if (value.ok !== true) {
    return false;
  }
  if (typeof value.timestamp !== "string" || !value.timestamp.trim()) {
    return false;
  }
  return isBunBuddyCapabilityGraph(value.data);
}
