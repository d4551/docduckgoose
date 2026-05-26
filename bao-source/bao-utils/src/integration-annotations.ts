/**
 * Integration annotation alignment mapping helpers.
 *
 * Converts integration context annotation payloads into canonical annotation
 * alignment map responses for shared UI hydration.
 *
 * @baohaus/bao-utils/integration-annotations
 */

import type { AnnotationAlignmentMapResponse } from "@baohaus/bao-schemas/annotation-alignment.schemas";
import type { ChatIntegrationAnnotationsContext } from "@baohaus/bao-schemas/integration-annotations.schemas";

/**
 * Build an annotation alignment map response from an integration context payload.
 *
 * @param context - Integration annotation alignment context.
 * @returns Annotation alignment map response or null when the payload is missing.
 */
export function buildAnnotationAlignmentMapFromIntegrationContext(
  context: ChatIntegrationAnnotationsContext | null | undefined,
): AnnotationAlignmentMapResponse | null {
  if (!context) {
    return null;
  }
  if (!(Array.isArray(context.sources) && Array.isArray(context.providers))) {
    return null;
  }
  const errors = context.errors ?? [];
  return {
    ok: true,
    sources: context.sources,
    providers: context.providers,
    summary: context.summary,
    ...(context.ownership ? { ownership: context.ownership } : {}),
    ...(context.ownershipErrors ? { ownershipErrors: context.ownershipErrors } : {}),
    ...(context.ownershipTimestamp ? { ownershipTimestamp: context.ownershipTimestamp } : {}),
    timestamp: context.timestamp,
    ...(errors.length > 0 ? { errors } : {}),
  };
}
