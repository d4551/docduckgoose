import { rm } from "@baohaus/bao-utils/bun-fs";
import { resolve } from "@baohaus/bao-utils/bun-path";
import { emitSharedDeclarations } from "./typescript-package.ts";

const packageRoot = resolve(import.meta.dir, "..");
const distRoot = resolve(packageRoot, "dist");

function assertBuildStep(step: string, result: ReturnType<typeof Bun.spawnSync>): void {
  if (result.exitCode === 0) {
    return;
  }

  throw new Error(`${step} failed with exit code ${result.exitCode}`);
}

await rm(distRoot, { recursive: true, force: true });

await emitSharedDeclarations();

assertBuildStep(
  "Bun bundle build",
  Bun.spawnSync(
    [
      "bun",
      "build",
      "--target=bun",
      "--root",
      "src",
      "--outdir",
      "dist",
      "src/utils/bao-control-plane-platform.ts",
    ],
    {
      cwd: packageRoot,
      stdout: "inherit",
      stderr: "inherit",
    },
  ),
);
