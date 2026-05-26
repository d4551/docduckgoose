/**
 * Shared Bun command construction helpers for setup-wizard flows.
 *
 * These helpers ensure setup-wizard script execution is driven from the same
 * resolved config across script and server entrypoints.
 *
 */

import { readEnvStringOrNull } from "@baohaus/bao-config/env";
import { path } from "./bun-path";
import { pathExistsSync } from "./path-exists";

const BUN_EXECUTABLE_RE: RegExp = /(?:^|[\\/])bun(?:\.exe)?$/i;
const SCRIPT_EXT_RE: RegExp = /\.(?:[cm]?[jt]s|[jt]sx)$/i;
const WHITESPACE_CHAR_RE: RegExp = /\s/;

type RunOptionWithValue = "--config" | "-c" | "--cwd" | "--eval" | "-e" | "--print" | "-p";

const BUN_EXECUTABLE_TOKENS: Set<unknown> = new Set(["bun", "bun.exe"]);
const WINDOWS_BUN_SHIM_SEGMENT: string = "\\appdata\\local\\temp\\bun-node-";

function isBunExecutablePath(candidate: string): boolean {
  return BUN_EXECUTABLE_RE.test(candidate);
}

/**
 * Detect Bun's transient Windows launcher paths created for nested Bun invocations.
 *
 * @param executablePath - Candidate Bun executable path.
 * @returns True when the path points at Bun's transient launcher location.
 */
export function isTemporaryWindowsBunShimPath(executablePath: string): boolean {
  return executablePath.trim().toLowerCase().includes(WINDOWS_BUN_SHIM_SEGMENT);
}

/**
 * Parse `where.exe` output into normalized executable candidates.
 *
 * @param stdout - Raw stdout emitted by `where.exe`.
 * @returns Trimmed executable candidates in discovery order.
 */
export function parseWhereExecutablePaths(stdout: string): string[] {
  return stdout
    .split(/\r?\n/g)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/**
 * Select the preferred Bun executable path from discovered candidates.
 *
 * @param executablePaths - Candidate executable paths.
 * @returns Preferred executable path or null when none are available.
 */
export function selectPreferredBunExecutablePath(
  executablePaths: readonly string[],
): string | null {
  const stablePath = executablePaths.find(
    (candidatePath) => !isTemporaryWindowsBunShimPath(candidatePath),
  );
  return stablePath ?? executablePaths[0] ?? null;
}

/**
 * Resolve the bunx CLI path from trusted installation roots before PATH fallback.
 *
 * @returns bunx executable path when discoverable.
 */
export function resolveBunxExecutablePath(): string {
  const bunInstall = readEnvStringOrNull("BUN_INSTALL");
  const home = readEnvStringOrNull("HOME");
  const candidates = [
    bunInstall ? path.join(bunInstall, "bin", "bunx") : null,
    home ? path.join(home, ".bun", "bin", "bunx") : null,
  ].filter((candidate): candidate is string => Boolean(candidate));

  for (const candidate of candidates) {
    if (isExistingExecutableCandidate(candidate)) {
      return candidate;
    }
  }

  const resolvedViaWhich = Bun.which("bunx");
  if (typeof resolvedViaWhich === "string" && resolvedViaWhich.trim()) {
    return resolvedViaWhich;
  }

  throw new Error("bunx CLI path missing; set BUN_INSTALL or ensure bunx is installed.");
}

type BunRuntime = typeof Bun & {
  execPath?: string;
};

/**
 * Recognize setup-wizard script references that must be resolved on disk.
 *
 * References with path separators or a supported JS/TS file extension are treated
 * as filesystem-backed scripts. Script aliases (for example `docs:build`) are not.
 */
export function isSetupWizardFilesystemScriptReference(script: string): boolean {
  return script.includes("/") || script.includes("\\") || SCRIPT_EXT_RE.test(script);
}

function getBunGlobal(): BunRuntime {
  return Bun as BunRuntime;
}

function isBunExecutableToken(value: string): boolean {
  return BUN_EXECUTABLE_TOKENS.has(value);
}

/**
 * Normalize Bun command invocations so that commands beginning with a Bun
 * executable token are resolved to the configured Bun CLI path.
 *
 * This keeps script and server process launches aligned to the same executable
 * resolution strategy.
 *
 * @param command - Raw process command tokens.
 * @returns Normalized command tokens with Bun executable path substituted when needed.
 */
export function normalizeBunCommandTokens(command: string[]): string[] {
  if (!command.length) {
    return [];
  }
  const [first, ...rest] = command;
  if (!isBunExecutableToken(first ?? "")) {
    return command;
  }
  return [resolveBunExecutablePath(), ...rest];
}

function isConfigToken(token: string): boolean {
  return token === "--config" || token === "-c" || token.startsWith("--config=");
}

function normalizeOptionalString(value: unknown): string | null {
  const normalized = String(value ?? "").trim();
  return normalized || null;
}

type CommandSplitState = {
  tokens: string[];
  current: string;
  inSingle: boolean;
  inDouble: boolean;
  escaping: boolean;
};

function pushCurrentCommandToken(state: CommandSplitState): void {
  if (state.current.length === 0) {
    return;
  }

  state.tokens.push(state.current);
  state.current = "";
}

function consumeEscapedCommandCharacter(state: CommandSplitState, char: string): boolean {
  if (!state.escaping) {
    return false;
  }

  state.current += char;
  state.escaping = false;
  return true;
}

function consumeCommandEscapeCharacter(state: CommandSplitState, char: string): boolean {
  if (char !== "\\") {
    return false;
  }

  if (state.inSingle) {
    state.current += char;
  } else {
    state.escaping = true;
  }

  return true;
}

function toggleSingleQuotedCommand(state: CommandSplitState, char: string): boolean {
  if (state.inDouble || char !== "'") {
    return false;
  }

  state.inSingle = !state.inSingle;
  return true;
}

function toggleDoubleQuotedCommand(state: CommandSplitState, char: string): boolean {
  if (state.inSingle || char !== '"') {
    return false;
  }

  state.inDouble = !state.inDouble;
  return true;
}

function consumeCommandWhitespace(state: CommandSplitState, char: string): boolean {
  if (state.inSingle || state.inDouble || !WHITESPACE_CHAR_RE.test(char)) {
    return false;
  }

  pushCurrentCommandToken(state);
  return true;
}

function splitCommandTokens(command: string): string[] {
  const normalizedCommand = command.trim();
  if (!normalizedCommand) {
    return [];
  }

  const state: CommandSplitState = {
    tokens: [],
    current: "",
    inSingle: false,
    inDouble: false,
    escaping: false,
  };

  for (const char of normalizedCommand) {
    if (consumeEscapedCommandCharacter(state, char)) {
      continue;
    }

    if (consumeCommandEscapeCharacter(state, char)) {
      continue;
    }

    if (toggleSingleQuotedCommand(state, char)) {
      continue;
    }

    if (toggleDoubleQuotedCommand(state, char)) {
      continue;
    }

    if (consumeCommandWhitespace(state, char)) {
      continue;
    }

    state.current += char;
  }

  if (state.escaping) {
    state.current += "\\";
  }

  pushCurrentCommandToken(state);

  return state.tokens;
}

function stripConfigOptions(tokens: string[]): string[] {
  const stripped: string[] = [];
  let skipNextToken = false;
  for (const token of tokens) {
    if (skipNextToken) {
      skipNextToken = false;
      continue;
    }

    if (token.length === 0) {
      continue;
    }

    if (token === "--config" || token === "-c") {
      skipNextToken = true;
      continue;
    }

    if (token.startsWith("--config=")) {
      continue;
    }

    stripped.push(token);
  }
  return stripped;
}

function injectBunConfigPath(tokens: string[], bunConfigPath?: string | null): string[] {
  const normalizedConfigPath = normalizeOptionalString(bunConfigPath);
  const sanitizedTokens = stripConfigOptions(tokens);
  if (!normalizedConfigPath) {
    return sanitizedTokens;
  }

  /**
   * Bun 1.3.11 command parsing for `bun run` is stable with the single-token
   * form `--config=<path>`. We enforce that canonical form here and remove any
   * pre-existing spaced/duplicate config args.
   *
   * This keeps setup-wizard execution deterministic regardless of current cwd.
   */
  return [`--config=${normalizedConfigPath}`, ...sanitizedTokens];
}

function splitRunOptions(tokens: string[]): { runOptions: string[]; rest: string[] } {
  let cursor = 0;
  const runOptions: string[] = [];

  while (cursor < tokens.length) {
    const token = tokens[cursor];
    if (token === undefined) {
      break;
    }
    if (!token.startsWith("-")) {
      break;
    }
    runOptions.push(token);

    const nextToken = tokens[cursor + 1];
    if (
      isRunOptionWithValue(token) &&
      !token.includes("=") &&
      cursor + 1 < tokens.length &&
      !isConfigToken(nextToken ?? "")
    ) {
      if (nextToken !== undefined) {
        runOptions.push(nextToken);
      }
      cursor += 2;
      continue;
    }

    cursor += 1;
  }

  return {
    runOptions,
    rest: tokens.slice(cursor),
  };
}

function isRunOptionWithValue(token: string): boolean {
  return (
    ["--config", "-c", "--cwd", "--eval", "-e", "--print", "-p"] as RunOptionWithValue[]
  ).includes(token as RunOptionWithValue);
}

function stripExecutableToken(tokens: string[]): string[] {
  return tokens[0] === "bun" || tokens[0] === "bun.exe" ? tokens.slice(1) : tokens;
}

function isExistingExecutableCandidate(candidate: string): boolean {
  const trimmed = candidate.trim();
  const isPathLike = trimmed.includes("/") || trimmed.includes("\\");
  if (isPathLike) {
    return pathExistsSync(trimmed);
  }
  return Bun.which(trimmed) !== null;
}

function resolvePreferredWindowsBunExecutablePath(): string | null {
  if (process.platform !== "win32") {
    return null;
  }

  const whereResult = Bun.spawnSync(["where.exe", "bun"], {
    stdout: "pipe",
    stderr: "pipe",
  });
  if (whereResult.exitCode !== 0) {
    return null;
  }

  return selectPreferredBunExecutablePath(
    parseWhereExecutablePaths(new TextDecoder().decode(whereResult.stdout)),
  );
}

function resolveFirstBunExecutableCandidate(
  candidates: readonly (string | null | undefined)[],
  options?: { skipTemporaryWindowsBunShim?: boolean },
): string | null {
  for (const candidate of candidates) {
    if (typeof candidate !== "string") {
      continue;
    }

    const trimmed = candidate.trim();
    if (!(trimmed && isBunExecutablePath(trimmed))) {
      continue;
    }

    if (options?.skipTemporaryWindowsBunShim && isTemporaryWindowsBunShimPath(trimmed)) {
      continue;
    }

    if (isExistingExecutableCandidate(trimmed)) {
      return trimmed;
    }
  }

  return null;
}

/**
 * Resolve the Bun binary path used by setup-wizard runtime commands.
 *
 * @returns Absolute or process-local Bun executable path.
 */
export function resolveBunExecutablePath(): string {
  const bunCli = readEnvStringOrNull("BUN_CLI");
  const bunBin = readEnvStringOrNull("BUN_BIN");
  const bunInstall = readEnvStringOrNull("BUN_INSTALL");
  const bunGlobal = getBunGlobal();
  const preferredConfiguredPath = resolveFirstBunExecutableCandidate([
    bunCli,
    bunBin,
    bunInstall ? path.join(bunInstall, "bin", "bun") : null,
  ]);
  if (preferredConfiguredPath) {
    return preferredConfiguredPath;
  }

  const preferredWindowsBunPath = resolvePreferredWindowsBunExecutablePath();
  if (preferredWindowsBunPath && isExistingExecutableCandidate(preferredWindowsBunPath)) {
    return preferredWindowsBunPath;
  }

  const runtimePath = resolveFirstBunExecutableCandidate(
    [Bun.argv[0], bunGlobal.execPath, process.execPath],
    {
      skipTemporaryWindowsBunShim: process.platform === "win32",
    },
  );
  if (runtimePath) {
    return runtimePath;
  }

  const resolvedViaWhich = Bun.which("bun");
  if (typeof resolvedViaWhich === "string" && isBunExecutablePath(resolvedViaWhich)) {
    return resolvedViaWhich;
  }
  throw new Error("Bun CLI path missing; set BUN_CLI or BUN_BIN.");
}

/**
 * Resolve a Bun argument list for a setup-wizard command.
 *
 * The caller supplies the target script and script-level args; this function
 * applies the configured base command and Bun config path to produce a final
 * deterministic argument list starting after the Bun executable.
 *
 * - honors the `SETUP_WIZARD_AUTO_COMMAND` equivalent string (or any Bun command
 *   with optional pre-run and post-run flags),
 * - replaces any configured base-script token with the requested script,
 * - strips explicit `--config` flags from synthesized setup command chains
 *   and relies on cwd-based bunfig discovery.
 *
 * @param options - Script, flags, and optional base command config.
 * @returns Bun CLI args (excluding executable path).
 */
export function resolveSetupWizardBunCommandArgs(options: {
  command: string | null | undefined;
  bunConfigPath?: string | null;
  script: string;
  scriptArgs?: string[];
}): string[] {
  const command = normalizeOptionalString(options.command);
  const script = normalizeOptionalString(options.script);
  const scriptArgs = options.scriptArgs ?? [];

  if (!script) {
    throw new Error("setup-wizard bun command resolution requires a non-empty script name");
  }

  if (!command) {
    return injectBunConfigPath(["run", script, ...scriptArgs], options.bunConfigPath);
  }

  const tokens = splitCommandTokens(command);
  const normalizedTokens = stripExecutableToken(tokens);
  if (normalizedTokens.length === 0) {
    return injectBunConfigPath(["run", script, ...scriptArgs], options.bunConfigPath);
  }

  const runIndex = normalizedTokens.indexOf("run");
  if (runIndex < 0) {
    return injectBunConfigPath(
      [...normalizedTokens, "run", script, ...scriptArgs],
      options.bunConfigPath,
    );
  }

  const preRunArgs = normalizedTokens.slice(0, runIndex);
  const rawRunArgs = normalizedTokens.slice(runIndex + 1);
  const { runOptions, rest } = splitRunOptions(rawRunArgs);

  const scriptReplacement = rest.length > 0 ? rest.slice(1) : [];
  const composed = [
    ...preRunArgs,
    "run",
    ...runOptions,
    script,
    ...scriptArgs,
    ...scriptReplacement,
  ];

  return injectBunConfigPath(composed, options.bunConfigPath);
}
