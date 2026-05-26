/**
 * RPA integration summary types.
 *
 * Defines shared RPA integration payloads for AI/XR/hardware clients.
 *
 * @shared/types/rpa-integration.ts
 */

import type { RpaIntegrationSummarySchema } from "@baohaus/bao-schemas/rpa.schemas";
import type { Static } from "@baohaus/baobox/elysia";

/**
 * RPA integration summary payload.
 */
export type RpaIntegrationSummary = Static<typeof RpaIntegrationSummarySchema>;
