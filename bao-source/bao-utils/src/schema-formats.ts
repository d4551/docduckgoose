/**
 * Shared baobox schema format registry utilities.
 *
 * Registers common string formats used across build-time and runtime schema
 * validation so every process validates the same `format` contracts.
 */

import { formatRegistry } from "@baohaus/baobox/shared/registries";

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/u;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/u;

let formatsRegistered = false;

/**
 * Register common baobox schema string formats once per process.
 */
export function registerSchemaFormats(): void {
  if (formatsRegistered) {
    return;
  }

  registerFormat("email", (value) => EMAIL_REGEX.test(value));
  registerFormat("date-time", (value) => Number.isFinite(Date.parse(value)));
  registerFormat("date", (value) => DATE_REGEX.test(value) && Number.isFinite(Date.parse(value)));
  registerFormat("uuid", (value) => UUID_REGEX.test(value));

  formatsRegistered = true;
}

/**
 * Register a schema format unless the process has already registered it.
 *
 * @param format - Format name to register.
 * @param check - Predicate used for runtime validation.
 */
function registerFormat(format: string, check: (value: string) => boolean): void {
  if (formatRegistry.has(format)) {
    return;
  }
  formatRegistry.set(format, check);
}
