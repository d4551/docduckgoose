/**
 * Unit tests for shared API envelope helpers.
 */

import { describe, expect, it } from "bun:test";
import {
  createDatabaseUnavailableEnvelope,
  DATABASE_UNAVAILABLE_ENVELOPE_CODE,
} from "./api-envelopes";
import { registerLocale, runWithLocale } from "./i18n";
import { en } from "./i18n/en";

const TEST_LOCALE = "en-api-envelopes-test";
const SCOPED_DATABASE_UNAVAILABLE_MESSAGE = "Database offline for maintenance.";

describe("createDatabaseUnavailableEnvelope", () => {
  it("ships the canonical service-unavailable shape with the active locale message", () => {
    registerLocale(TEST_LOCALE, {
      ...en,
      "system.databaseUnavailable": SCOPED_DATABASE_UNAVAILABLE_MESSAGE,
    });

    const envelope = runWithLocale(TEST_LOCALE, () => createDatabaseUnavailableEnvelope());

    expect(envelope).toEqual({
      ok: false,
      error: SCOPED_DATABASE_UNAVAILABLE_MESSAGE,
      code: DATABASE_UNAVAILABLE_ENVELOPE_CODE,
    });
  });

  it("falls back to the bundled English message when no scoped locale is set", () => {
    const envelope = createDatabaseUnavailableEnvelope();
    expect(envelope.ok).toBe(false);
    expect(envelope.code).toBe(DATABASE_UNAVAILABLE_ENVELOPE_CODE);
    expect(envelope.error).toBe(en["system.databaseUnavailable"]);
  });
});
