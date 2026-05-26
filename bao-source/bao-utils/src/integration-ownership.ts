/**
 * Integration ownership mapping helpers.
 *
 * Converts integration context ownership payloads into canonical capability
 * ownership map responses for shared UI hydration.
 *
 * @baohaus/bao-utils/integration-ownership
 */

import type {
  CapabilityOwnershipError,
  CapabilityOwnershipMapResponse,
} from "@baohaus/bao-schemas/capability-ownership.schemas";
import type { ChatIntegrationOwnershipContext } from "@baohaus/bao-schemas/integration-ownership.schemas";

function isOwnershipContextShape(
  context: ChatIntegrationOwnershipContext | null | undefined,
): context is ChatIntegrationOwnershipContext {
  return Boolean(context && Array.isArray(context.groups) && Array.isArray(context.segments));
}

function buildOptionalOwnershipMapFields(
  context: ChatIntegrationOwnershipContext,
  errors: readonly CapabilityOwnershipError[],
): Partial<CapabilityOwnershipMapResponse> {
  const optionalFields: Partial<CapabilityOwnershipMapResponse> = {};
  if (context.mcpSurfaces) {
    optionalFields.mcpSurfaces = context.mcpSurfaces;
  }
  if (context.categoryMap) {
    optionalFields.categoryMap = context.categoryMap;
  }
  if (context.ownerMap) {
    optionalFields.ownerMap = context.ownerMap;
  }
  if (context.ownerMapMatrix) {
    optionalFields.ownerMapMatrix = context.ownerMapMatrix;
  }
  if (context.coverage) {
    optionalFields.coverage = context.coverage;
  }
  if (context.matrix) {
    optionalFields.matrix = context.matrix;
  }
  if (context.stacks) {
    optionalFields.stacks = context.stacks;
  }
  if (context.highlights) {
    optionalFields.highlights = context.highlights;
  }
  if (context.focus) {
    optionalFields.focus = context.focus;
  }
  if (errors.length > 0) {
    optionalFields.errors = [...errors];
  }
  if (context.metadata) {
    optionalFields.metadata = context.metadata;
  }
  if (context.focusMap) {
    optionalFields.focusMap = context.focusMap;
  }
  return optionalFields;
}

/**
 * Build a capability ownership map response from an integration context payload.
 *
 * @param context - Integration ownership context.
 * @returns Capability ownership map response or null when the payload is missing.
 */
export function buildOwnershipMapFromIntegrationContext(
  context: ChatIntegrationOwnershipContext | null | undefined,
): CapabilityOwnershipMapResponse | null {
  if (!isOwnershipContextShape(context)) {
    return null;
  }
  const errors = context.errors ?? [];
  return {
    ok: true,
    groups: context.groups,
    domains: context.domains,
    surfaces: context.surfaces,
    ...(context.mcpSurfaces ? { mcpSurfaces: context.mcpSurfaces } : {}),
    ...(context.categoryMap ? { categoryMap: context.categoryMap } : {}),
    ...(context.ownerMap ? { ownerMap: context.ownerMap } : {}),
    ...(context.ownerMapMatrix ? { ownerMapMatrix: context.ownerMapMatrix } : {}),
    segments: context.segments,
    stackMap: context.stackMap,
    summary: context.summary,
    timestamp: context.timestamp,
    ...buildOptionalOwnershipMapFields(context, errors),
  };
}
