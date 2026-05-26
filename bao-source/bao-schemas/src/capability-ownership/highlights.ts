/**
 * Capability ownership highlights schema.
 *
 * @shared/schemas/capability-ownership/highlights.ts
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Schema for ownership highlight segment metadata.
 */
export const CapabilityOwnershipHighlightsSchema: Type.TObject<
  { readonly segments: Type.TArray<Type.TString> },
  "segments",
  never
> = Type.Object(
  {
    segments: Type.Array(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

/**
 * TypeScript type for ownership highlight payloads.
 */
export type CapabilityOwnershipHighlights = Static<typeof CapabilityOwnershipHighlightsSchema>;
