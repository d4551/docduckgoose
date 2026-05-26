/**
 * Integration ownership mapping helpers.
 *
 * Converts integration context ownership payloads into canonical capability
 * ownership map responses for shared UI hydration.
 *
 * @shared/utils/integration-ownership
 */

import type { CapabilityOwnershipMapResponse } from "@baohaus/bao-schemas/capability-ownership/responses";
import type { ChatIntegrationOwnershipContext } from "../schemas/integration-ownership.schemas";

function buildOptionalOwnershipFields(
  context: ChatIntegrationOwnershipContext,
): Partial<CapabilityOwnershipMapResponse> {
  const errors = context.errors ?? [];
  return {
    ...(context.mcpSurfaces ? { mcpSurfaces: context.mcpSurfaces } : {}),
    ...(context.categoryMap ? { categoryMap: context.categoryMap } : {}),
    ...(context.ownerMap ? { ownerMap: context.ownerMap } : {}),
    ...(context.ownerMapMatrix ? { ownerMapMatrix: context.ownerMapMatrix } : {}),
    ...(context.coverage ? { coverage: context.coverage } : {}),
    ...(context.matrix ? { matrix: context.matrix } : {}),
    ...(context.stacks ? { stacks: context.stacks } : {}),
    ...(context.highlights ? { highlights: context.highlights } : {}),
    ...(context.focus ? { focus: context.focus } : {}),
    ...(errors.length > 0 ? { errors } : {}),
    ...(context.metadata ? { metadata: context.metadata } : {}),
    ...(context.focusMap ? { focusMap: context.focusMap } : {}),
  };
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
  if (!context) {
    return null;
  }
  if (!(Array.isArray(context.groups) && Array.isArray(context.segments))) {
    return null;
  }
  return {
    ok: true,
    groups: context.groups,
    domains: context.domains,
    surfaces: context.surfaces,
    segments: context.segments,
    stackMap: context.stackMap,
    summary: context.summary,
    timestamp: context.timestamp,
    ...buildOptionalOwnershipFields(context),
  };
}
