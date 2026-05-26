import { join } from "node:path";
import { REPO_ROOT } from "./constants.ts";
import { isJsonObject, type JsonValue, readJsonFile } from "./fs.ts";
import type { ReadmeOverrideEntry, ReadmeOverridesFile } from "./readme-contract.ts";

const OVERRIDES_PATH = join(REPO_ROOT, "bao", "data", "readme-overrides.json");

function readReadmeOverrideEntry(value: JsonValue | undefined): ReadmeOverrideEntry | undefined {
  if (!isJsonObject(value)) {
    return undefined;
  }
  const stringFields = ["overview", "eli5", "mermaid", "manual"] as const;
  for (const field of stringFields) {
    const entry = value[field];
    if (entry !== undefined && typeof entry !== "string") {
      return undefined;
    }
  }
  const arrayFields = [
    "owns",
    "consumes",
    "neverOwns",
    "inScope",
    "dependencies",
    "outOfScope",
  ] as const;
  const stringArrays: Partial<Record<(typeof arrayFields)[number], string[]>> = {};
  for (const field of arrayFields) {
    const entry = value[field];
    if (entry === undefined) {
      continue;
    }
    if (!Array.isArray(entry)) {
      return undefined;
    }
    const items: string[] = [];
    for (const item of entry) {
      if (typeof item !== "string") {
        return undefined;
      }
      items.push(item);
    }
    stringArrays[field] = items;
  }
  const entry: ReadmeOverrideEntry = {};
  if (typeof value.overview === "string") entry.overview = value.overview;
  if (typeof value.eli5 === "string") entry.eli5 = value.eli5;
  if (typeof value.mermaid === "string") entry.mermaid = value.mermaid;
  if (typeof value.manual === "string") entry.manual = value.manual;
  if (stringArrays.inScope !== undefined) entry.inScope = stringArrays.inScope;
  if (stringArrays.dependencies !== undefined) entry.dependencies = stringArrays.dependencies;
  if (stringArrays.outOfScope !== undefined) entry.outOfScope = stringArrays.outOfScope;
  if (stringArrays.owns !== undefined) entry.owns = stringArrays.owns;
  if (stringArrays.consumes !== undefined) entry.consumes = stringArrays.consumes;
  if (stringArrays.neverOwns !== undefined) entry.neverOwns = stringArrays.neverOwns;
  return entry;
}

function readReadmeOverridesFromJson(
  value: JsonValue | undefined,
): ReadmeOverridesFile | undefined {
  if (!(isJsonObject(value) && isJsonObject(value.packages))) {
    return undefined;
  }
  const packages: Record<string, ReadmeOverrideEntry> = {};
  for (const [key, entry] of Object.entries(value.packages)) {
    const parsed = readReadmeOverrideEntry(entry);
    if (parsed === undefined) {
      return undefined;
    }
    packages[key] = parsed;
  }
  return { packages };
}

export async function loadReadmeOverrides(): Promise<ReadmeOverridesFile> {
  const file = Bun.file(OVERRIDES_PATH);
  if (!(await file.exists())) {
    return { packages: {} };
  }
  const value = await readJsonFile(OVERRIDES_PATH);
  const parsed = readReadmeOverridesFromJson(value);
  if (parsed === undefined) {
    throw new Error(`${OVERRIDES_PATH} has an invalid shape`);
  }
  return parsed;
}

export function resolveOverride(
  overrides: ReadmeOverridesFile,
  id: string,
  packageName: string,
): ReadmeOverrideEntry | undefined {
  return (
    overrides.packages[id] ??
    overrides.packages[packageName] ??
    overrides.packages[packageName.replace(/^@baohaus\//, "")]
  );
}
