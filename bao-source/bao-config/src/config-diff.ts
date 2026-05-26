import { createHash } from "node:crypto";
import type { ConfigValue, PlatformEnvironment } from "./governance-overrides";

export type ConfigSnapshot = Readonly<Record<string, ConfigValue>>;

export type ConfigVersionStatus = "DRAFT" | "PENDING_APPROVAL" | "ACTIVE" | "ROLLED_BACK";

export type ConfigVersionRecord = Readonly<{
  id: string;
  environment: PlatformEnvironment;
  version: number;
  configHash: string;
  configPayload: ConfigSnapshot;
  promotedBy: string | null;
  promotedAt: Date | null;
  approvedBy: string | null;
  approvedAt: Date | null;
  status: ConfigVersionStatus;
  rollbackOf: string | null;
  notes: string | null;
  createdAt: Date;
}>;

export type ConfigVersionDraft = Readonly<{
  environment: PlatformEnvironment;
  version: number;
  configHash: string;
  configPayload: ConfigSnapshot;
  status: "DRAFT";
  notes: string | null;
}>;

export type ConfigDiffAction = "added" | "removed" | "changed";

export type ConfigDiffEntry = Readonly<{
  key: string;
  action: ConfigDiffAction;
  oldValue?: ConfigValue;
  newValue?: ConfigValue;
}>;

function stableConfigValue(value: ConfigValue): string {
  if (Array.isArray(value)) {
    return `[${value.map((entry) => stableConfigValue(entry)).join(",")}]`;
  }
  if (isConfigRecord(value)) {
    const keys = Object.keys(value).sort();
    const entries = keys.map((key) => `${JSON.stringify(key)}:${stableConfigValue(value[key])}`);
    return `{${entries.join(",")}}`;
  }
  return JSON.stringify(value);
}

function isConfigRecord(value: ConfigValue): value is { readonly [key: string]: ConfigValue } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function computeConfigHash(payload: ConfigSnapshot): string {
  const keys = Object.keys(payload).sort();
  const stablePayload = `{${keys
    .map((key) => `${JSON.stringify(key)}:${stableConfigValue(payload[key])}`)
    .join(",")}}`;
  return createHash("sha256").update(stablePayload).digest("hex");
}

export function createConfigVersionDraft(fields: {
  environment: PlatformEnvironment;
  configPayload: ConfigSnapshot;
  latestVersion: number | null;
  notes?: string;
}): ConfigVersionDraft {
  return {
    environment: fields.environment,
    version: (fields.latestVersion ?? 0) + 1,
    configHash: computeConfigHash(fields.configPayload),
    configPayload: fields.configPayload,
    status: "DRAFT",
    notes: fields.notes ?? null,
  };
}

export function diffConfigVersions(
  previous: ConfigSnapshot,
  current: ConfigSnapshot,
): readonly ConfigDiffEntry[] {
  const allKeys = [...new Set([...Object.keys(previous), ...Object.keys(current)])].sort();
  const diffs: ConfigDiffEntry[] = [];

  for (const key of allKeys) {
    const previousHasKey = key in previous;
    const currentHasKey = key in current;

    if (!previousHasKey && currentHasKey) {
      diffs.push({ key, action: "added", newValue: current[key] });
    } else if (previousHasKey && !currentHasKey) {
      diffs.push({ key, action: "removed", oldValue: previous[key] });
    } else if (stableConfigValue(previous[key]) !== stableConfigValue(current[key])) {
      diffs.push({
        key,
        action: "changed",
        oldValue: previous[key],
        newValue: current[key],
      });
    }
  }

  return diffs;
}
