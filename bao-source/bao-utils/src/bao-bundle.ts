/**
 * Bun.build() wrapper for bundling self-contained `.bao` extension modules.
 *
 * Inlines all imports except `@baohaus/bao-sdk` (the host contract) so that
 * `.bao` archives contain everything they need to run without workspace
 * module resolution.
 *
 * @module @baohaus/bao-utils/bao-bundle
 */

/** Result from a bundle operation. */
export interface BaoBundleResult {
  ok: boolean;
  outputPath: string;
  outputBytes: number;
  logs: string[];
}

/** Options for bundling a `.bao` extension module. */
export interface BaoBundleOptions {
  /** Absolute path to the entry point TypeScript file. */
  entrypoint: string;
  /** Output directory for the bundled file. */
  outdir: string;
  /** Packages to keep external (not bundled). Default: ['@baohaus/bao-sdk']. */
  external?: string[];
  /** Bundle target. Default: 'bun'. */
  target?: "bun" | "browser";
  /** Whether to include source maps. Default: true. */
  sourcemap?: boolean;
  /** Module format. Default: 'esm'. */
  format?: "esm";
}

const DEFAULT_EXTERNAL = ["@baohaus/bao-sdk"] as const;

/**
 * Bundle a `.bao` extension module entry point into a single self-contained file.
 *
 * Uses `Bun.build()` to inline all dependencies except the host SDK contract,
 * producing a portable ESM module that can be loaded without workspace resolution.
 *
 * @param options - Bundle configuration.
 * @returns Bundle result with output path and diagnostics.
 */
export async function bundleBaoExtensionModule(
  options: BaoBundleOptions,
): Promise<BaoBundleResult> {
  const external = options.external ?? [...DEFAULT_EXTERNAL];
  const target = options.target ?? "bun";
  const sourcemap = options.sourcemap ?? true;

  const buildPromise = Bun.build({
    entrypoints: [options.entrypoint],
    outdir: options.outdir,
    target,
    format: options.format ?? "esm",
    sourcemap: sourcemap ? "external" : "none",
    external,
    minify: false,
  });

  const buildAttempt = await buildPromise.then(
    (value) => ({ ok: true as const, value }),
    (error: unknown) => ({ ok: false as const, error }),
  );

  if (!buildAttempt.ok) {
    const msg =
      buildAttempt.error instanceof Error ? buildAttempt.error.message : String(buildAttempt.error);
    return { ok: false, outputPath: "", outputBytes: 0, logs: [msg] };
  }

  const buildResult = buildAttempt.value;

  const logs = buildResult.logs.map((log) => String(log));

  if (!buildResult.success) {
    return {
      ok: false,
      outputPath: "",
      outputBytes: 0,
      logs,
    };
  }

  const outputFile = buildResult.outputs[0];
  if (!outputFile) {
    return {
      ok: false,
      outputPath: "",
      outputBytes: 0,
      logs: [...logs, "Build succeeded but produced no output files."],
    };
  }

  return {
    ok: true,
    outputPath: outputFile.path,
    outputBytes: outputFile.size,
    logs,
  };
}

/**
 * Verify that a bundled module has no unresolved imports to workspace packages.
 *
 * Scans the output for residual `@baohaus/` imports that should have been inlined.
 * The only allowed external is `@baohaus/bao-sdk`.
 *
 * @param bundledSource - Bundled JavaScript source text.
 * @param allowedExternal - Package prefixes that are allowed to remain external.
 * @returns Array of unresolved import specifiers (empty = clean).
 */
export function verifyBundleIsolation(
  bundledSource: string,
  allowedExternal: readonly string[] = DEFAULT_EXTERNAL,
): string[] {
  const importPattern = /from\s+['"](@baohaus\/[^'"]+)['"]/g;
  const violations: string[] = [];

  for (const match of bundledSource.matchAll(importPattern)) {
    const specifier = match[1];
    if (specifier && !allowedExternal.some((ext) => specifier.startsWith(ext))) {
      violations.push(specifier);
    }
  }

  return violations;
}
