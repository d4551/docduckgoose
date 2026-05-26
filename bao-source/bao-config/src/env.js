import { parseStrictBoolean } from "@baohaus/bao-config/env-boolean";
export function readEnvVar(key) {
  return Bun.env[key] ?? undefined;
}
export function hasEnvVar(key) {
  return readEnvVar(key) !== undefined;
}
export function readEnvBoolean(key, fallback) {
  return parseStrictBoolean(readEnvVar(key), fallback);
}
export function readEnvStringOrNull(key) {
  const raw = readEnvVar(key);
  if (typeof raw !== "string") {
    return null;
  }
  const normalized = raw.trim();
  return normalized.length > 0 ? normalized : null;
}
export function readEnvCsv(key) {
  const raw = readEnvVar(key);
  if (!raw) {
    return [];
  }
  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}
export function getChildProcessEnv() {
  return { ...Bun.env };
}
export function getRuntimeEnv() {
  return Bun.env;
}
export function writeEnvVar(key, value) {
  Bun.env[key] = value;
}
export function deleteEnvVar(key) {
  delete Bun.env[key];
}
/**
 * Verify that every key in `required` is present in the runtime env. Returns
 * the list of missing keys. Intended for early-boot fail-fast checks.
 */
export function validateEnv(required = []) {
  const missing = [];
  for (const key of required) {
    if (!hasEnvVar(key)) {
      missing.push(key);
    }
  }
  return missing;
}
