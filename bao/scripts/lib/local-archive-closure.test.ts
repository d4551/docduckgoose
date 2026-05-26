import { describe, expect, test } from "bun:test";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  formatLocalArchiveClosureFailures,
  validateLocalArchiveClosure,
} from "./local-archive-closure.ts";

const fixtureRoot = new URL("../../.bao-build/local-archive-closure-fixtures/", import.meta.url);

const ensureDirectory = (url: URL): void => {
  mkdirSync(fileURLToPath(url), { recursive: true });
};

const createFixtureDirectory = (name: string): URL => {
  const root = new URL(`${name}-${crypto.randomUUID()}/`, fixtureRoot);
  ensureDirectory(root);
  return root;
};

const writeArchive = async (
  root: URL,
  archiveName: string,
  dependencies: readonly string[],
): Promise<void> => {
  const sourceRoot = new URL(`${archiveName}.src/`, root);
  ensureDirectory(sourceRoot);
  await Bun.write(
    new URL("manifest.json", sourceRoot),
    JSON.stringify({
      dependencies: dependencies.map((name) => ({
        name,
      })),
      targets: [],
    }),
  );
  const result = Bun.spawnSync(
    [
      "tar",
      "-cf",
      fileURLToPath(new URL(archiveName, root)),
      "-C",
      fileURLToPath(sourceRoot),
      "manifest.json",
    ],
    {
      stdout: "pipe",
      stderr: "pipe",
    },
  );
  if (result.exitCode !== 0) {
    throw new Error(new TextDecoder().decode(result.stderr).trim());
  }
};

describe("local archive closure", () => {
  test("reports missing Baohaus dependency archives", async () => {
    const root = createFixtureDirectory("missing");
    await writeArchive(root, "app.bao", ["@baohaus/missing-lib"]);

    const report = await validateLocalArchiveClosure(fileURLToPath(root));

    expect(formatLocalArchiveClosureFailures(report)).toEqual([
      `${root.pathname.split("/").filter(Boolean).at(-1)}/app.bao: @baohaus/missing-lib requires missing-lib.bao`,
    ]);
  });

  test("accepts closed local archive sets", async () => {
    const root = createFixtureDirectory("closed");
    await writeArchive(root, "app.bao", ["@baohaus/lib"]);
    await writeArchive(root, "lib.bao", []);

    const report = await validateLocalArchiveClosure(fileURLToPath(root));

    expect(report.missingDependencies).toEqual([]);
  });
});
