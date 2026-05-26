/**
 * Shared HTTP response envelope helpers used by API routes and adapters when a
 * downstream dependency is unavailable.
 *
 */

import { t } from "./i18n";

/** Discriminator code for the database-unavailable envelope. */
export const DATABASE_UNAVAILABLE_ENVELOPE_CODE = "SERVICE_UNAVAILABLE" as const;

/** Shape of the database-unavailable envelope returned by API routes. */
export type DatabaseUnavailableEnvelope = Readonly<{
  ok: false;
  error: string;
  code: typeof DATABASE_UNAVAILABLE_ENVELOPE_CODE;
}>;

/** JSON envelope returned when the database is unavailable. */
export const createDatabaseUnavailableEnvelope = (): DatabaseUnavailableEnvelope => ({
  ok: false,
  error: t("system.databaseUnavailable"),
  code: DATABASE_UNAVAILABLE_ENVELOPE_CODE,
});
