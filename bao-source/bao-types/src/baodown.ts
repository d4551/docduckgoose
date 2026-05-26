/**
 * Vault-native flows (BaoDown) shared types.
 *
 * DTOs and enums shared between server and client for BaoDown definitions, versions,
 * runs, events, and validation (editor + runtime contract).
 *
 * @shared/types/baodown
 */

import type {
  BaoDownGraph,
  BaoDownGraphSchemaVersion,
  BaoDownNodeOutput,
  BaoDownRunContext,
  BaoDownRunEvent,
  BaoDownRunEventKind,
  BaoDownRunStatus,
  BaoDownTrigger,
} from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";

/** Canonical BaoDown run status string union (e.g. 'pending', 'running', 'completed'). */
export type { BaoDownRunStatus } from "@baohaus/bao-schemas/baodown/baodown-flow.schemas";

// Enums

/**
 * BaoDown trigger kind (stored inside run context/trigger payloads).
 */
export type BaoDownTriggerKind =
  import("@baohaus/bao-schemas/baodown/baodown-flow.schemas").BaoDownTriggerKind;

/**
 * BaoDown trigger type discriminator (stored on BaoDown run records).
 */
export type BaoDownTriggerType = "MANUAL" | "SCHEDULE" | "API" | "WEBHOOK";

/**
 * BaoDown run event kind.
 */
export type BaoDownEventKind = BaoDownRunEventKind;

// Validation

/**
 * Validation issue level.
 */
export type BaoDownValidationIssueLevel = "error" | "warning";

/**
 * Validation issue for a BaoDown graph.
 */
export interface BaoDownValidationIssue {
  level: BaoDownValidationIssueLevel;
  code: string;
  message: string;
  nodeId?: string;
  edgeIndex?: number;
  path?: string;
}

/**
 * Validation result returned by BaoDown validation endpoints.
 */
export interface BaoDownValidationResult {
  valid: boolean;
  issues: BaoDownValidationIssue[];
}

// Definition / Version DTOs

/**
 * BaoDown definition list item (stable identity across versions).
 */
export interface BaoDownDefinitionListItem {
  id: string;
  name: string;
  description: string | null;
  tags: string[];
  publishedVersionId: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Full BaoDown definition details.
 */
export interface BaoDownDefinition extends BaoDownDefinitionListItem {
  owner: Record<string, unknown> | null;
}

/**
 * Payload for creating a BaoDown definition.
 */
export interface BaoDownDefinitionCreatePayload {
  name: string;
  description?: string;
  tags?: string[];
  owner?: Record<string, unknown> | null;
}

/**
 * Payload for updating a BaoDown definition.
 */
export interface BaoDownDefinitionUpdatePayload {
  name?: string;
  description?: string | null;
  tags?: string[];
  owner?: Record<string, unknown> | null;
}

/**
 * BaoDown version DTO.
 */
export interface BaoDownVersion {
  id: string;
  definitionId: string;
  version: number;
  schemaVersion: BaoDownGraphSchemaVersion;
  graph: BaoDownGraph;
  validation: BaoDownValidationResult | null;
  createdAt: string;
  createdBy: string | null;
}

/**
 * Payload for creating a new BaoDown version.
 */
export interface BaoDownVersionCreatePayload {
  schemaVersion: BaoDownGraphSchemaVersion;
  graph: BaoDownGraph;
}

// Run DTOs

/**
 * BaoDown run DTO.
 */
export interface BaoDownRun {
  id: string;
  definitionId: string;
  versionId: string;
  status: BaoDownRunStatus;
  triggerType: BaoDownTriggerType;
  trigger: BaoDownTrigger;
  triggerContext: BaoDownRunContext;
  startedAt: string | null;
  finishedAt: string | null;
  correlationId: string | null;
  requestId: string | null;
  idempotencyKey: string | null;
}

/**
 * Payload for starting a BaoDown run.
 */
export interface BaoDownRunStartPayload {
  trigger: BaoDownTrigger;
  context: BaoDownRunContext;
}

/**
 * BaoDown run event DTO.
 */
export type BaoDownEvent = BaoDownRunEvent;

// Node Output Contract

/**
 * Node handler output type re-exported for convenience.
 *
 * - **Single-port nodes**: return a raw `JsonValue` (or `undefined`).
 * - **Multi-port nodes**: return `Record<portId, JsonValue | undefined>`.
 *
 * @see {@link import('../schemas/baodown/baodown-flow.schemas').BaoDownNodeOutputSchema}
 */
export type { BaoDownNodeOutput };

/**
 * Documentation-only contract for BaoDown node handlers.
 *
 * Node handler implementations must conform to this shape. The executor calls
 * each handler with a context object containing resolved inputs and expects
 * a {@link BaoDownNodeOutput} return value.
 *
 * @remarks
 * This type is intentionally **not generic** — production handlers are registered
 * in `baodown-node-registry.service.ts` and validated at graph compilation time.
 * Keeping this simple avoids over-abstraction while documenting the expected contract.
 *
 * @example
 * ```ts
 * const myHandler: BaoDownNodeHandlerContract = async (ctx) => {
 *   const input = ctx.inputs['data'];
 *   return { result: transform(input) };
 * };
 * ```
 */
export type BaoDownNodeHandlerContract = (ctx: {
  inputs: Record<string, unknown>;
  config: Record<string, unknown>;
  signal: AbortSignal;
}) => Promise<BaoDownNodeOutput>;
