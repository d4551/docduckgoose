import type { ValidatorConfig } from "./src/gates/validators/context.ts";

export const validatorConfig = {
  maxFileLines: 1000,
  allowedDirectEnvAccessFiles: new Set([
    "prisma.config.ts",
    "src/config/env.ts",
    "scripts/lib/archive-signing-key-config.ts",
    "scripts/lib/bao-registry-config.ts",
    "scripts/validate-release-debt.ts",
  ]),
  allowedClientStorageFiles: new Set([
    "browser-assets/theme-persistence.ts",
    "public/theme-persistence.js",
  ]),
  routeExclusionPath: "src/config/routes.ts",
  deadExportIgnorePrefixes: ["src/fs.ts"],
} satisfies ValidatorConfig;
