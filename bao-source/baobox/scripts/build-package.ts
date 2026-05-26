import { type SpawnSyncReturns, spawnSync } from "node:child_process";
import { rm } from "node:fs/promises";
import { distRoot, entrypoints, packageRoot } from "./package-build-config.ts";
import { emitBaoboxDeclarations } from "./typescript-package.ts";

function assertBuildStep(step: string, result: SpawnSyncReturns<Buffer>): void {
  if (result.status === 0) {
    return;
  }

  throw new Error(`${step} failed with exit code ${result.status ?? result.signal}`);
}

await rm(distRoot, { recursive: true, force: true });

for (const entrypoint of entrypoints) {
  assertBuildStep(
    `Bun bundle build ${entrypoint}`,
    spawnSync(
      "bun",
      ["build", "--target=bun", "--root", "src", "--outdir", "dist", "--sourcemap", entrypoint],
      {
        cwd: packageRoot,
        stdio: ["ignore", "pipe", "inherit"],
      },
    ),
  );
}

await emitBaoboxDeclarations();
