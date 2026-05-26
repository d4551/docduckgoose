/**
 * Shared setup environment file materialization.
 *
 * Ensures setup-owned workflows can start from a clean checkout by copying the
 * canonical env template into the local override file when no env file exists.
 *
 * @packageDocumentation
 */

import { mkdir } from "./bun-fs";
import { path } from "./bun-path";

/**
 * Minimal env-file contract consumed by setup/configure/bootstrap flows.
 */
export interface SetupEnvironmentFilesConfig {
  /** Relative or absolute primary env file path. */
  primary: string;
  /** Relative or absolute local env file path. */
  local: string;
  /** Relative or absolute primary env template path. */
  example: string;
  /** Optional fallback env template path. */
  exampleFallback: string | null;
}

/**
 * Result emitted after setup env file materialization.
 */
export interface EnsureSetupEnvironmentFilesResult {
  /** Absolute primary env file path. */
  primaryPath: string;
  /** Absolute local env file path. */
  localPath: string;
  /** Absolute path to the env file that now satisfies setup preconditions. */
  activePath: string;
  /** Whether `.env.local` was created during this call. */
  created: boolean;
  /** Template path used to create `.env.local`, when created. */
  templatePath: string | null;
}

/**
 * Resolve a repository-relative or absolute path to an absolute filesystem path.
 *
 * @param repositoryRoot - Repository root used for relative paths.
 * @param filePath - Relative or absolute file path.
 * @returns Absolute path.
 */
function resolveAbsolutePath(repositoryRoot: string, filePath: string): string {
  return path.isAbsolute(filePath) ? filePath : path.resolve(repositoryRoot, filePath);
}

/**
 * Ensure setup workflows have an env file to read from.
 *
 * When neither `.env` nor `.env.local` exists, this materializes `.env.local`
 * from `env.example` or the configured fallback template.
 *
 * @param params - Repository root plus canonical env-file locations.
 * @returns Resolved env-file state after materialization.
 * @throws When no source env template exists.
 */
export async function ensureSetupEnvironmentFilesExist(params: {
  repositoryRoot: string;
  envFiles: SetupEnvironmentFilesConfig;
}): Promise<EnsureSetupEnvironmentFilesResult> {
  const primaryPath = resolveAbsolutePath(params.repositoryRoot, params.envFiles.primary);
  const localPath = resolveAbsolutePath(params.repositoryRoot, params.envFiles.local);
  const examplePath = resolveAbsolutePath(params.repositoryRoot, params.envFiles.example);
  const fallbackTemplatePath = params.envFiles.exampleFallback
    ? resolveAbsolutePath(params.repositoryRoot, params.envFiles.exampleFallback)
    : null;

  const [primaryExists, localExists] = await Promise.all([
    Bun.file(primaryPath).exists(),
    Bun.file(localPath).exists(),
  ]);

  if (primaryExists || localExists) {
    return {
      primaryPath,
      localPath,
      activePath: primaryExists ? primaryPath : localPath,
      created: false,
      templatePath: null,
    };
  }

  const exampleExists = await Bun.file(examplePath).exists();
  const fallbackExists = fallbackTemplatePath
    ? await Bun.file(fallbackTemplatePath).exists()
    : false;
  const templatePath = exampleExists
    ? examplePath
    : fallbackExists && fallbackTemplatePath
      ? fallbackTemplatePath
      : null;

  if (!templatePath) {
    const fallbackHint = fallbackTemplatePath ? ` or ${fallbackTemplatePath}` : "";
    throw new Error(
      `No setup env template found. Expected ${examplePath}${fallbackHint} before local bootstrap.`,
    );
  }

  await mkdir(path.dirname(localPath), { recursive: true });
  await Bun.write(localPath, await Bun.file(templatePath).text());

  return {
    primaryPath,
    localPath,
    activePath: localPath,
    created: true,
    templatePath,
  };
}
