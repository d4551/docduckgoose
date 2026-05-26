/**
 * Shared Tailwind CLI execution helpers.
 *
 * Centralizes the canonical Tailwind CSS build command so production asset
 * builds and Bun serve adapters execute the same Tailwind engine.
 *
 * @packageDocumentation
 */

import { readEnvVar } from "@baohaus/bao-config/env";
import { DEFAULT_TIMEOUTS } from "@baohaus/bao-constants/timeouts";
import { type BunExecResult, runBunCommand } from "./bun-exec";
import { exists } from "./bun-fs";
import { path } from "./bun-path";

/**
 * Input options for a Tailwind CLI stylesheet build.
 */
export interface TailwindCliBuildOptions {
  /** Absolute or cwd-relative input stylesheet path. */
  inputPath: string;
  /** Absolute or cwd-relative output stylesheet path. */
  outputPath: string;
  /** Working directory used for package resolution. */
  cwd: string;
  /** When true, pass `--minify` to Tailwind CLI. */
  minify?: boolean;
  /** Optional process timeout override. */
  timeoutMs?: number;
  /** Optional captured output size override. */
  maxBufferBytes?: number;
}

const TAILWIND_NODE_MODULES_LAYOUTS = ["libs/happydumpling/node_modules", "node_modules"] as const;

type ResolvedTailwindCliLocation = {
  entryPath: string;
  nodeModulesDir: string;
};

function buildTailwindCliCandidatesForRoot(rootPath: string): ResolvedTailwindCliLocation[] {
  const candidates: ResolvedTailwindCliLocation[] = [];
  for (const layout of TAILWIND_NODE_MODULES_LAYOUTS) {
    const nodeModulesDir = path.join(rootPath, layout);
    candidates.push({
      entryPath: path.join(nodeModulesDir, "@tailwindcss/cli/dist/index.mjs"),
      nodeModulesDir,
    });
    candidates.push({
      entryPath: path.join(nodeModulesDir, ".bin/tailwindcss"),
      nodeModulesDir,
    });
  }
  return candidates;
}

function buildAncestorChain(startPath: string): readonly string[] {
  const roots: string[] = [];
  let currentPath = path.resolve(startPath);
  for (;;) {
    roots.push(currentPath);
    const parentPath = path.dirname(currentPath);
    if (parentPath === currentPath) {
      return roots;
    }
    currentPath = parentPath;
  }
}

function resolveTailwindCandidateRoots(callerRoots: readonly string[] = []): readonly string[] {
  const dedupedRoots = new Set<string>();
  const roots: string[] = [];
  for (const startPath of [...callerRoots, process.cwd(), import.meta.dir]) {
    for (const rootPath of buildAncestorChain(startPath)) {
      if (dedupedRoots.has(rootPath)) {
        continue;
      }
      dedupedRoots.add(rootPath);
      roots.push(rootPath);
    }
  }
  return roots;
}

/**
 * Return canonical Tailwind CLI resolution candidates for both source and
 * bundled runtimes.
 *
 * Source execution can resolve relative to `import.meta.dir`, while bundled
 * preview/runtime execution needs `process.cwd()` because the compiled dist tree
 * no longer mirrors `libs/shared/src`.
 *
 * @returns Ordered Tailwind CLI resolution candidates.
 */
function resolveTailwindCliCandidates(
  callerRoots: readonly string[] = [],
): readonly ResolvedTailwindCliLocation[] {
  return resolveTailwindCandidateRoots(callerRoots).flatMap((rootPath) =>
    buildTailwindCliCandidatesForRoot(rootPath),
  );
}

/**
 * Resolve the repo-owned Tailwind CLI location and its matching node_modules
 * root.
 *
 * @returns Tailwind CLI entry path plus matching node_modules directory.
 */
async function resolveTailwindCliLocation(
  callerRoots: readonly string[] = [],
): Promise<ResolvedTailwindCliLocation> {
  for (const candidate of resolveTailwindCliCandidates(callerRoots)) {
    if (await exists(candidate.entryPath)) {
      return candidate;
    }
  }

  const checkedPaths = resolveTailwindCliCandidates(callerRoots).map(
    (candidate) => candidate.entryPath,
  );
  throw new Error(
    `Tailwind CLI was not found in the workspace toolchain. Checked: ${checkedPaths.join(", ")}.`,
  );
}

/**
 * Resolve the repo-owned Tailwind CLI entrypoint for all build callers.
 *
 * @returns Absolute CLI entry path under the repo-managed toolchain.
 */
async function resolveTailwindCliEntryPath(callerRoots: readonly string[] = []): Promise<string> {
  const resolvedLocation = await resolveTailwindCliLocation(callerRoots);
  return resolvedLocation.entryPath;
}

/**
 * Build environment overrides so Tailwind CSS imports resolve through the
 * repo-owned frontend toolchain even for temporary fixture directories.
 *
 * @param nodeModulesDir - Matching node_modules root for the resolved CLI.
 * @returns Environment overrides for Tailwind CLI subprocesses.
 */
function resolveTailwindCliEnvironment(nodeModulesDir: string): Record<string, string> {
  const nodePath = readEnvVar("NODE_PATH")?.trim();
  const segments = [nodeModulesDir, ...(nodePath ? [nodePath] : [])];
  const environment: Record<string, string> = {
    NODE_PATH: segments.join(path.delimiter),
  };
  const pathValue = readEnvVar("PATH")?.trim();
  if (pathValue) {
    environment.PATH = pathValue;
  }
  return environment;
}

/**
 * Build the canonical Tailwind CLI command vector.
 *
 * @param options - Tailwind CLI build options.
 * @returns Command vector suitable for {@link runBunCommand}.
 */
export async function buildTailwindCliCommand(
  options: Pick<TailwindCliBuildOptions, "inputPath" | "outputPath" | "minify"> &
    Partial<Pick<TailwindCliBuildOptions, "cwd">>,
): Promise<string[]> {
  const cliEntryPath = await resolveTailwindCliEntryPath(options.cwd ? [options.cwd] : []);
  return [
    Bun.which("bun") ?? process.execPath,
    cliEntryPath,
    "-i",
    options.inputPath,
    "-o",
    options.outputPath,
    ...(options.minify ? ["--minify"] : []),
  ];
}

/**
 * Execute the canonical Tailwind CLI stylesheet build.
 *
 * @param options - Tailwind CLI build options.
 * @returns Guarded subprocess result envelope.
 */
export async function runTailwindCliBuild(
  options: TailwindCliBuildOptions,
): Promise<BunExecResult> {
  const callerRoots = [options.cwd];
  const resolvedLocation = await resolveTailwindCliLocation(callerRoots);
  const cmd = await buildTailwindCliCommand(options);
  return await runBunCommand({
    cmd,
    cwd: options.cwd,
    env: resolveTailwindCliEnvironment(resolvedLocation.nodeModulesDir),
    timeoutMs: options.timeoutMs ?? DEFAULT_TIMEOUTS.frontendBuildMs,
    maxBufferBytes: options.maxBufferBytes ?? DEFAULT_TIMEOUTS.commandOutputCaptureChars,
    stdout: "pipe",
    stderr: "pipe",
  });
}

/**
 * Format a Tailwind CLI subprocess failure into deterministic diagnostics.
 *
 * @param result - Guarded subprocess result from {@link runTailwindCliBuild}.
 * @returns Human-readable failure summary.
 */
export function formatTailwindCliFailure(result: BunExecResult): string {
  const messages: string[] = [];

  if (result.timedOut) {
    messages.push("Tailwind CLI timed out before completing.");
  }
  if (result.aborted) {
    messages.push("Tailwind CLI was aborted before completing.");
  }
  if (result.exitCode !== 0) {
    messages.push(`Tailwind CLI exited with code ${result.exitCode}.`);
  }
  if (result.stderr.trim().length > 0) {
    messages.push(`stderr:\n${result.stderr.trim()}`);
  }
  if (result.stdout.trim().length > 0) {
    messages.push(`stdout:\n${result.stdout.trim()}`);
  }

  return messages.join("\n\n") || "Tailwind CLI failed without diagnostics.";
}
