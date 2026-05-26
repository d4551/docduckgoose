import type { ValidatorContext } from "../context.ts";

const RELATIVE_PATH_PATTERN = /^\.\//;

interface LocaleKeySet {
  readonly name: string;
  readonly keys: readonly string[];
}

const resolveReference = (
  keySets: readonly LocaleKeySet[],
  referenceName: string | undefined,
): LocaleKeySet | undefined => {
  if (referenceName) {
    const named = keySets.find((entry) => entry.name === referenceName);
    if (named) {
      return named;
    }
  }
  return keySets[0];
};

const diffAgainstReference = (reference: LocaleKeySet, target: LocaleKeySet): string[] => {
  const messages: string[] = [];
  const missingInTarget = reference.keys.filter((key) => !target.keys.includes(key));
  const missingInReference = target.keys.filter((key) => !reference.keys.includes(key));

  if (missingInTarget.length > 0) {
    messages.push(`missing in ${target.name}: ${missingInTarget.join(", ")}`);
  }
  if (missingInReference.length > 0) {
    messages.push(`missing in ${reference.name}: ${missingInReference.join(", ")}`);
  }
  return messages;
};

export const i18nParity = async (ctx: ValidatorContext): Promise<void> => {
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

  const keySets: LocaleKeySet[] = loaded.map((entry) => ({
    name: entry.name,
    keys: ctx.flattenKeys(entry.localeData),
  }));

  const reference = resolveReference(keySets, ctx.config.i18nParityReferenceLocaleName);
  if (!reference) {
    return;
  }

  const messages: string[] = [];

  for (let i = 1; i < keySets.length; i += 1) {
    const target = keySets[i];
    if (!target) {
      continue;
    }
    messages.push(...diffAgainstReference(reference, target));
  }

  if (messages.length > 0) {
    ctx.fail(messages.join("\n"));
  }
};
