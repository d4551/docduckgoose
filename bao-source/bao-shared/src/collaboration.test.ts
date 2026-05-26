/**
 * Unit tests for the shared collaboration surface contracts.
 */

import { describe, expect, it } from "bun:test";
import {
  type CollaborationSurfaceScope,
  EMPTY_ASSISTANT_TARGETS,
  MAX_AI_TRANSCRIPT_MESSAGES,
  MAX_MESSAGE_LENGTH,
  MAX_MESSAGE_MENTIONS,
  MAX_PREVIEW_LENGTH,
  MAX_THREAD_MESSAGES,
  SURFACE_BY_SCOPE,
  SURFACE_DESCRIPTION_KEY,
  SURFACE_TITLE_KEY,
} from "./collaboration";

describe("collaboration surface contracts", () => {
  it("maps every supported scope to its canonical surface value", () => {
    expect(SURFACE_BY_SCOPE.internal).toBe("INTERNAL");
    expect(SURFACE_BY_SCOPE.portal).toBe("PORTAL");
    expect(SURFACE_BY_SCOPE.public).toBe("PUBLIC");
  });

  it("provides title and description translation keys for every scope", () => {
    const scopes: readonly CollaborationSurfaceScope[] = ["internal", "portal", "public"];
    for (const scope of scopes) {
      expect(SURFACE_TITLE_KEY[scope]).toBe(`chat.workspace.${scope}Title`);
      expect(SURFACE_DESCRIPTION_KEY[scope]).toBe(`chat.workspace.${scope}Description`);
    }
  });

  it("exposes consistent message and thread limits", () => {
    expect(MAX_MESSAGE_LENGTH).toBe(2_000);
    expect(MAX_MESSAGE_MENTIONS).toBe(8);
    expect(MAX_PREVIEW_LENGTH).toBe(120);
    expect(MAX_THREAD_MESSAGES).toBe(24);
    expect(MAX_AI_TRANSCRIPT_MESSAGES).toBe(10);
  });

  it("starts with a fully-null assistant targets snapshot", () => {
    expect(EMPTY_ASSISTANT_TARGETS).toEqual({
      automationDefinitionId: null,
      reportPackId: null,
      savedReportId: null,
      mlExperimentId: null,
    });
  });
});
