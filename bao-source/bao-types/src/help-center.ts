/**
 * Shared Help Center response types.
 *
 * @packageDocumentation
 */

import type { HelpCenterContent } from "@baohaus/bao-config/help-center-content";

/**
 * Help Center knowledge base response payload.
 */
export type HelpCenterContentResponse =
  | {
      ok: true;
      content: HelpCenterContent;
      updatedAt: string;
    }
  | {
      ok: false;
      error: string;
      code?: string;
    };
