import type { BaoInstallTargetBase } from "@baohaus/bao-schemas/bao-install/targets.schemas";

export const BASE_TARGET_KEYS = new Set<string>([
  "id",
  "kind",
  "target",
  "before",
  "after",
  "dependencies",
  "interface",
  "capabilities",
  "lifecycle",
  "mcpMetadata",
  "healthcheck",
  "environment",
  "accessPolicy",
  "checksum",
  "signature",
]);

export function extractTargetPayload(target: BaoInstallTargetBase): Record<string, unknown> {
  const payload: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(target)) {
    if (!BASE_TARGET_KEYS.has(key)) {
      payload[key] = value;
    }
  }

  return payload;
}
