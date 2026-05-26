import type { ValidatorContext } from "../context.ts";
import { findDeadExportsInFile } from "../helpers.ts";
import { SOURCE_FILE_PATTERN } from "../patterns.ts";

export const noDeadExports = async (ctx: ValidatorContext): Promise<void> => {
  const ignorePrefixes = ctx.config.deadExportIgnorePrefixes ?? [];
  const exportFiles = ctx
    .srcFiles()
    .filter((path) => !ignorePrefixes.some((prefix) => path.startsWith(prefix)));
  const allProjectFiles = ctx.collectFiles(SOURCE_FILE_PATTERN);
  const allContents = await Promise.all(allProjectFiles.map((p) => ctx.readFile(p)));
  const exportContents = await Promise.all(exportFiles.map((p) => ctx.readFile(p)));

  const violations = exportFiles.flatMap((path, i) => {
    const content = exportContents[i];
    if (content === undefined) {
      return [];
    }
    return findDeadExportsInFile(path, content, allProjectFiles, allContents);
  });

  ctx.failAll(violations, "exports with no imports elsewhere");
};
