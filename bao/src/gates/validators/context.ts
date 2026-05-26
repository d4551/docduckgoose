/// <reference types="bun" />
/**
 * Validator context factory. Creates file-collection helpers, match runners,
 * and violation reporters scoped to a repo root with configurable ignore patterns.
 *
 * Each consumer repo calls `createValidatorContext(root, config)` from its
 * `scripts/validate.ts` and passes the result to `createRules(ctx, config)`.
 */

const WINDOWS_DRIVE_PATTERN = /^\/[A-Za-z]:\//u;
const SRC_FILE_PATTERN = /src\/.*\.ts$/;
const ROOT_TS_FILE_PATTERN = /^[^/]+\.ts$/;
const SCRIPT_TS_FILE_PATTERN = /scripts\/.*\.ts$/;
const CLIENT_TS_PATTERN = /src\/(?:client|http\/client)\/.*\.ts$/;
const BROWSER_ASSETS_PATTERN = /browser-assets\/.*\.ts$/;
const PUBLIC_JS_PATTERN = /public\/.*\.js$/;
const HTML_FILES_PATTERN =
  /src\/(?:server\/html|http\/templates|http\/html|domains\/[^/]+\/http\/html)\/.*\.ts$/;
const TEST_FILE_PATTERN = /(?:^|\/)(?:__tests__\/.*|tests?\/.*|.*\.(?:test|spec)\.ts)$/;
const GENERATED_FILE_PATTERN =
  /(?:^|\/)(?:dist|\.generated|\.bao-build|coverage|artifacts)\/|\.generated\.ts$/;
const DEFAULT_IGNORE_SEGMENTS = [
  ".bao-build/",
  ".generated/",
  "coverage/",
  "dist/",
  "node_modules",
  "public/vendor/",
  "public/fonts/",
] as const;
const REPOSITORY_SCAN_DIRECTORIES = [
  "src",
  "scripts",
  "test",
  "tests",
  "public",
  "hooks",
  "docs",
  "browser-assets",
  "prisma",
  "config",
] as const;

function toPlatformPath(url: URL): string {
  const pathname = decodeURIComponent(url.pathname);
  return WINDOWS_DRIVE_PATTERN.test(pathname) ? pathname.slice(1) : pathname;
}

// .bao-first subtask 3 type safety: eradicate ingress casts (strict, no lazy escapes).
const flattenKeys = (value: object, prefix = ""): string[] =>
  Object.entries(value).flatMap(([key, entry]) => {
    const nextKey = prefix.length > 0 ? `${prefix}.${key}` : key;

    if (typeof entry === "string") {
      return [nextKey];
    }

    if (typeof entry === "object" && entry !== null) {
      return flattenKeys(entry, nextKey);
    }

    return [nextKey];
  });

interface ShellContract {
  readonly path: string;
  readonly relatedPaths?: readonly string[];
  readonly required: readonly (readonly [needle: string, label: string])[];
}

interface ValidatorConfig {
  readonly maxFileLines?: number;
  /** Max physical lines from opening line through closing `}` of each matched function (default 80). */
  readonly maxFunctionLines?: number;
  /** Max formal parameters per matched function (default 5). */
  readonly maxFunctionParams?: number;
  /** Max `{` block nesting depth inside function bodies (default 4). */
  readonly maxNestedBlockDepth?: number;
  /**
   * Token/keyword-weighted complexity estimate inside function bodies (default 15).
   * Biome `noExcessiveCognitiveComplexity` remains the AST source of truth where applicable.
   */
  readonly maxEstimatedCognitiveComplexity?: number;
  readonly localeModules?: readonly {
    readonly name: string;
    readonly importPath: string;
    readonly localeKey?: string;
  }[];
  readonly shellSeoContracts?: readonly ShellContract[];
  readonly shellAccessibilityContracts?: readonly ShellContract[];
  readonly allowedDirectEnvAccessFiles?: ReadonlySet<string>;
  readonly allowedClientStorageFiles?: ReadonlySet<string>;
  readonly allowedClientStorageKeys?: ReadonlySet<string>;
  readonly allowedUnknownIngressFiles?: ReadonlySet<string>;
  readonly routeExclusionPath?: string;
  readonly routeSourcePattern?: RegExp;
  readonly monolithFilePattern?: RegExp;
  readonly forbidPendingPublishLocks?: boolean;
  readonly ignorePatterns?: readonly string[];
  /** Paths whose exports are public API (consumed by external repos). Dead-export check skips these. */
  readonly deadExportIgnorePrefixes?: readonly string[];
  /** Paths that are the centralized client API layer — raw fetch is their purpose. */
  readonly allowedClientFetchFiles?: ReadonlySet<string>;
  /**
   * Locale `name` used as the parity reference (default first entry in `localeModules`).
   * When set and present in `localeModules`, key parity is checked against that module's keys.
   */
  readonly i18nParityReferenceLocaleName?: string;
}

interface ValidatorContext {
  readonly trackedFiles: readonly string[];
  readonly readFile: (path: string) => Promise<string>;
  readonly collectFiles: (pattern: RegExp) => string[];
  readonly fail: (message: string) => never;
  readonly findAllMatches: (pattern: RegExp, paths: readonly string[]) => Promise<string[]>;
  readonly flattenKeys: (value: object, prefix?: string) => string[];
  readonly failAll: (matches: readonly string[], label: string) => void;
  readonly srcFiles: () => string[];
  readonly policyTsFiles: () => string[];
  readonly clientCodeFiles: () => string[];
  readonly htmlFiles: () => string[];
  readonly config: Required<
    Pick<
      ValidatorConfig,
      | "maxFileLines"
      | "allowedDirectEnvAccessFiles"
      | "allowedClientStorageFiles"
      | "allowedUnknownIngressFiles"
    >
  > &
    ValidatorConfig;
}

const createValidatorContext = async (
  root: string,
  targetRule: string,
  config: ValidatorConfig = {},
): Promise<ValidatorContext> => {
  const rootUrl = new URL(`file://${root.endsWith("/") ? root : `${root}/`}`);
  const ignoreSegments = [
    ...DEFAULT_IGNORE_SEGMENTS,
    ...(config.ignorePatterns ?? []),
  ] as readonly string[];

  const collectTrackedFiles = async (): Promise<string[]> => {
    const trackedFiles: string[] = [];
    const rootPath = toPlatformPath(rootUrl);
    for (const dir of REPOSITORY_SCAN_DIRECTORIES) {
      for await (const path of new Bun.Glob(`${dir}/**/*`).scan({
        cwd: rootPath,
        onlyFiles: true,
      })) {
        trackedFiles.push(path.replaceAll("\\", "/"));
      }
    }
    for await (const path of new Bun.Glob("*.{ts,tsx,js,jsx,json,md,css}").scan({
      cwd: rootPath,
      onlyFiles: true,
    })) {
      trackedFiles.push(path.replaceAll("\\", "/"));
    }
    for await (const path of new Bun.Glob("bao.lock").scan({
      cwd: rootPath,
      onlyFiles: true,
    })) {
      trackedFiles.push(path.replaceAll("\\", "/"));
    }
    return trackedFiles;
  };

  const trackedFiles = (await collectTrackedFiles())
    .filter((line) => !line.includes("/._"))
    .filter((line) => ignoreSegments.every((segment) => !line.includes(segment)));

  const readFile = (path: string): Promise<string> => Bun.file(new URL(path, rootUrl)).text();

  const collectFiles = (pattern: RegExp): string[] =>
    trackedFiles.filter((path) => pattern.test(path));

  const fail = (message: string): never => {
    throw new Error(`${targetRule}: ${message}`);
  };

  const findAllMatches = async (pattern: RegExp, paths: readonly string[]): Promise<string[]> => {
    const matches: string[] = [];

    for (const path of paths) {
      const contents = await readFile(path);

      if (pattern.test(contents)) {
        matches.push(path);
      }
    }

    return matches;
  };

  const failAll = (matches: readonly string[], label: string): void => {
    if (matches.length > 0) {
      fail(`${label}:\n  ${matches.join("\n  ")}`);
    }
  };

  const uniquePaths = (paths: ReadonlyArray<readonly string[]>): string[] => [
    ...new Set(paths.flat()),
  ];

  const srcFiles = (): string[] =>
    collectFiles(SRC_FILE_PATTERN)
      .filter((path) => !path.startsWith("src/generated/prisma/"))
      .filter((path) => !path.endsWith(".d.ts"))
      .filter((path) => !TEST_FILE_PATTERN.test(path))
      .filter((path) => !GENERATED_FILE_PATTERN.test(path));

  const policyTsFiles = (): string[] =>
    uniquePaths([
      srcFiles(),
      collectFiles(SCRIPT_TS_FILE_PATTERN).filter((path) => !TEST_FILE_PATTERN.test(path)),
      collectFiles(ROOT_TS_FILE_PATTERN).filter((path) => !TEST_FILE_PATTERN.test(path)),
    ]);

  const clientCodeFiles = (): string[] =>
    uniquePaths([
      collectFiles(CLIENT_TS_PATTERN),
      collectFiles(BROWSER_ASSETS_PATTERN),
      collectFiles(PUBLIC_JS_PATTERN),
    ]).filter((path) => !(TEST_FILE_PATTERN.test(path) || GENERATED_FILE_PATTERN.test(path)));

  const htmlFiles = (): string[] =>
    collectFiles(HTML_FILES_PATTERN).filter(
      (path) => !(TEST_FILE_PATTERN.test(path) || GENERATED_FILE_PATTERN.test(path)),
    );

  const maxFileLines = config.maxFileLines ?? 1000;
  const allowedDirectEnvAccessFiles =
    config.allowedDirectEnvAccessFiles ?? new Set(["prisma.config.ts", "src/config/env.ts"]);
  const allowedClientStorageFiles =
    config.allowedClientStorageFiles ??
    new Set(["browser-assets/theme-persistence.ts", "public/theme-persistence.js"]);
  const allowedClientStorageKeys = config.allowedClientStorageKeys ?? new Set(["baohaus:theme"]);
  const allowedUnknownIngressFiles = config.allowedUnknownIngressFiles ?? new Set<string>();

  return {
    trackedFiles,
    readFile,
    collectFiles,
    fail,
    findAllMatches,
    flattenKeys,
    failAll,
    srcFiles,
    policyTsFiles,
    clientCodeFiles,
    htmlFiles,
    config: {
      maxFileLines,
      allowedDirectEnvAccessFiles,
      allowedClientStorageFiles,
      allowedClientStorageKeys,
      allowedUnknownIngressFiles,
      ...config,
    },
  };
};

export type { ShellContract, ValidatorConfig, ValidatorContext };
export { createValidatorContext };
