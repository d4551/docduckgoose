import type { ValidatorContext } from "../context.ts";
import { checkStateContract, collectRouteContents, hasSkeleton } from "../helpers.ts";

const DEFAULT_ROUTE_SOURCE_PATTERN = /src\/server\/html\/routes\/.*\.routes\.ts$/;
const DATA_PAGE_PATTERN = /\b(?:buildHtmlPageModel|fetchHtmlApiResult|fetchEndpointSnapshot)\b/;

export const pageStateContracts = async (ctx: ValidatorContext): Promise<void> => {
  const routePattern = ctx.config.routeSourcePattern ?? DEFAULT_ROUTE_SOURCE_PATTERN;
  const routeFiles = ctx.collectFiles(routePattern);
  const violations: string[] = [];

  for (const path of routeFiles) {
    const contents = await collectRouteContents(path, ctx.trackedFiles, ctx.readFile);
    const needsContract =
      hasSkeleton(contents) ||
      contents.includes('hx-trigger="load"') ||
      DATA_PAGE_PATTERN.test(contents);

    if (needsContract) {
      const missing = checkStateContract(contents);

      if (missing.length > 0) {
        violations.push(`${path} missing: ${missing.join(", ")}`);
      }
    }
  }

  ctx.failAll(violations, "state contract violations");
};
