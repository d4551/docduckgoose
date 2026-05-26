import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { isPlainObject, parseJsonSafe, readStringField } from "@baohaus/bao-json-safe";
import type { BaoInstallTargetRecord } from "@baohaus/bao-sdk/install-target-handler";
import { getGooseWordInstallHandlerRegistry } from "./install-handler-registry.ts";

const readGovernanceTargets = (packageDir: string): readonly BaoInstallTargetRecord[] => {
  const governancePath = join(packageDir, "bao-governance.json");
  if (!existsSync(governancePath)) {
    return [];
  }
  const parsed = parseJsonSafe(readFileSync(governancePath, "utf8"));
  if (parsed.ok === false || !isPlainObject(parsed.value)) {
    return [];
  }
  const targetsValue = Reflect.get(parsed.value, "targets");
  if (!Array.isArray(targetsValue)) {
    return [];
  }
  const records: BaoInstallTargetRecord[] = [];
  for (const item of targetsValue) {
    if (!isPlainObject(item)) {
      continue;
    }
    const kind = readStringField(item, "kind");
    if (kind !== "native-mobile-shell") {
      continue;
    }
    records.push(item as BaoInstallTargetRecord);
  }
  return records;
};

export const installNativeMobileShellFromPackage = async (packageDir: string): Promise<number> => {
  const handler = getGooseWordInstallHandlerRegistry().get("native-mobile-shell");
  if (handler === undefined) {
    return 0;
  }
  let count = 0;
  for (const target of readGovernanceTargets(packageDir)) {
    const result = await handler.install(target);
    if (result.ok) {
      count += 1;
    }
  }
  return count;
};
