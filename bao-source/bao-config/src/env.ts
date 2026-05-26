import { parseStrictBoolean } from "@baohaus/bao-config/env-boolean";

export function readEnvVar(key: string): string | undefined {
  return Bun.env[key] ?? undefined;
}

export function hasEnvVar(key: string): boolean {
  return readEnvVar(key) !== undefined;
}

export function readEnvBoolean(key: string, fallback: boolean): boolean {
  return parseStrictBoolean(readEnvVar(key), fallback);
}

export function readEnvStringOrNull(key: string): string | null {
  const raw = readEnvVar(key);
  if (typeof raw !== "string") {
    return null;
  }

  const normalized = raw.trim();
  return normalized.length > 0 ? normalized : null;
}

export function readEnvCsv(key: string): string[] {
  const raw = readEnvVar(key);
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

export function getChildProcessEnv(): Record<string, string | undefined> {
  return { ...Bun.env };
}

export function getRuntimeEnv(): Record<string, string | undefined> {
  return Bun.env;
}

export function writeEnvVar(key: string, value: string): void {
  Bun.env[key] = value;
}

export function deleteEnvVar(key: string): void {
  delete Bun.env[key];
}

/**
 * Verify that every key in `required` is present in the runtime env. Returns
 * the list of missing keys. Intended for early-boot fail-fast checks.
 */
export function validateEnv(required: readonly string[] = []): readonly string[] {
  const missing: string[] = [];
  for (const key of required) {
    if (!hasEnvVar(key)) {
      missing.push(key);
    }
  }
  return missing;
}
