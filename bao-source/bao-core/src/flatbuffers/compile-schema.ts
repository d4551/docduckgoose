/**
 * Shared FlatBuffers schema compilation utility.
 *
 * Provides the core `compileSchema()` function used by both the
 * `bun-flatbuffers-codegen` Bun plugin (build-time) and the
 * `FlatBufferSchemaAdapter` (`.bao` install-time).
 *
 * @packageDocumentation
 */

import { readEnvStringOrNull } from "@baohaus/bao-config/env";
import { DEFAULT_TIMEOUTS, resolveTimeout } from "@baohaus/bao-constants/timeouts";
import { runBunCommand } from "@baohaus/bao-utils/bun-exec";
import { readdir } from "@baohaus/bao-utils/bun-fs";
import { basename, dirname, join, resolve } from "@baohaus/bao-utils/bun-path";

/** Default `.fbs` schema directory. */
export const DEFAULT_SCHEMA_DIR: string = resolve(import.meta.dir, "../../flatbuffers");

/** Default output directory for generated TypeScript files. */
export const DEFAULT_OUTPUT_DIR: string = resolve(import.meta.dir, "../generated/flatbuffers");
const DEFAULT_FLATC_TIMEOUT_MS: number = resolveTimeout("processStartupMs");
const FLATBUFFERS_MJS_SPECIFIER = "flatbuffers/mjs/flatbuffers.js";

/**
 * Normalize generated FlatBuffers imports to the published ESM entrypoint.
 *
 * Biome's resolver does not accept the bare `flatbuffers` package directory in
 * this workspace, so generated files must import the concrete module path that
 * the package publishes.
 *
 * @param outputDir - Directory containing generated TypeScript files.
 */
export async function normalizeGeneratedFlatbuffersImports(outputDir: string): Promise<void> {
  const entries = await readdir(outputDir, { recursive: true });
  const generatedTsFiles = entries.filter(
    (entry): entry is string => typeof entry === "string" && entry.endsWith(".ts"),
  );

  for (const relativePath of generatedTsFiles) {
    const absolutePath = join(outputDir, relativePath);
    const file = Bun.file(absolutePath);
    if (!(await file.exists())) {
      continue;
    }

    const content = await file.text();
    const normalized = content
      .replaceAll("from 'flatbuffers'", `from '${FLATBUFFERS_MJS_SPECIFIER}'`)
      .replaceAll('from "flatbuffers"', `from "${FLATBUFFERS_MJS_SPECIFIER}"`);

    if (normalized !== content) {
      await Bun.write(absolutePath, normalized);
    }
  }
}

/**
 * Resolve the path to the `flatc` binary.
 *
 * Checks, in order: explicit override, `FLATC_PATH` env, then `flatc` on PATH.
 *
 * @param customPath - User-provided override path.
 * @returns Resolved binary path string.
 */
export function resolveFlatcPath(customPath?: string): string {
  if (customPath && Bun.file(customPath).size !== -1) {
    return customPath;
  }

  const envPath = readEnvStringOrNull("FLATC_PATH");
  if (envPath && Bun.file(envPath).size !== -1) {
    return envPath;
  }

  return "flatc";
}

/**
 * Result of a single schema compilation.
 */
export interface CompileSchemaResult {
  /** Whether compilation succeeded. */
  ok: boolean;
  /** Schema base name without `.fbs` extension. */
  schemaName: string;
  /** Standard error output from `flatc` (empty on success). */
  stderr: string;
  /** Process exit code. */
  exitCode: number;
}

/**
 * Compile a single `.fbs` schema to TypeScript via `flatc`.
 *
 * This function is the shared compilation core used by both the
 * `bun-flatbuffers-codegen` plugin and the `FlatBufferSchemaAdapter`.
 *
 * @param schemaPath - Absolute path to the `.fbs` file.
 * @param outputDir - Output directory for generated files.
 * @param flatcBin - Path to the `flatc` binary.
 * @param extraFlags - Additional `flatc` CLI flags.
 * @returns Compilation result with success/failure, stderr, and exit code.
 */
export async function compileSchema(
  schemaPath: string,
  outputDir: string,
  flatcBin: string,
  extraFlags: string[] = [],
): Promise<CompileSchemaResult> {
  const schemaName = basename(schemaPath, ".fbs");
  const includeDir = dirname(schemaPath);

  const args = [
    "--ts",
    "--gen-object-api",
    "--gen-mutable",
    "-o",
    outputDir,
    "-I",
    includeDir,
    ...extraFlags,
    schemaPath,
  ];

  const commandResult = await runBunCommand({
    cmd: [flatcBin, ...args],
    timeoutMs: DEFAULT_FLATC_TIMEOUT_MS,
    maxBufferBytes: DEFAULT_TIMEOUTS.commandOutputCaptureChars,
  });

  if (commandResult.exitCode === 0) {
    await normalizeGeneratedFlatbuffersImports(outputDir);
  }

  return {
    ok: commandResult.exitCode === 0,
    schemaName,
    stderr: commandResult.stderr.trim(),
    exitCode: commandResult.exitCode,
  };
}
