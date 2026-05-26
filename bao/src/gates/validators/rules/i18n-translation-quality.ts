import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ValidatorContext } from "../context.ts";
import { EN_PARITY_ALLOWLIST, EN_PARITY_THRESHOLDS } from "../i18n-english-parity-allowlist.ts";

const RELATIVE_PATH_PATTERN = /^\.\//;

function flattenStrings(value: object, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value)) {
    const nextKey = prefix.length > 0 ? `${prefix}.${key}` : key;
    if (typeof entry === "string") {
      out[nextKey] = entry;
    } else if (typeof entry === "object" && entry !== null) {
      Object.assign(out, flattenStrings(entry, nextKey));
    }
  }
  return out;
}

export const i18nTranslationQuality = async (ctx: ValidatorContext): Promise<void> => {
  const localeModules = ctx.config.localeModules;
  if (!localeModules || localeModules.length < 2) {
    return;
  }

  const root = process.cwd();
  const loaded = await Promise.all(
    localeModules.map(async (mod) => {
      const absolutePath = mod.importPath.startsWith("/")
        ? mod.importPath
        : `${root}/${mod.importPath.replace(RELATIVE_PATH_PATTERN, "")}`;
      const module = await import(absolutePath);
      const localeData = mod.localeKey ? module[mod.localeKey] : (module.default ?? module);
      return { name: mod.name, localeData };
    }),
  );

  const enEntry = loaded.find((e) => e.name === "en");
  if (enEntry === undefined) {
    return;
  }

  const enFlat = flattenStrings(enEntry.localeData);
  const enKeys = Object.keys(enFlat);
  const messages: string[] = [];

  for (const entry of loaded) {
    if (entry.name === "en") {
      continue;
    }
    if (entry.name === "de" || entry.name === "fr") {
      const overlayPath = join(root, "../shared/i18n-overlays", `${entry.name}.json`);
      if (!existsSync(overlayPath)) {
        continue;
      }
    }
    const targetFlat = flattenStrings(entry.localeData);

    let parityCount = 0;
    const paritySamples: string[] = [];
    for (const key of enKeys) {
      if (EN_PARITY_ALLOWLIST.has(key)) {
        continue;
      }
      const enVal = enFlat[key];
      const locVal = targetFlat[key];
      if (enVal !== undefined && locVal === enVal) {
        parityCount += 1;
        if (paritySamples.length < 5) {
          paritySamples.push(key);
        }
      }
    }

    const threshold = EN_PARITY_THRESHOLDS[entry.name] ?? 40;
    if (parityCount > threshold) {
      messages.push(
        `${entry.name}: ${String(parityCount)} English-parity keys (max ${String(threshold)}); samples: ${paritySamples.join(", ")}`,
      );
    }
  }

  if (messages.length > 0) {
    ctx.fail(messages.join("\n"));
  }
};
