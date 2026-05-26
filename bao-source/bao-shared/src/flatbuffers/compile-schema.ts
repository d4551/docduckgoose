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
import { DEFAULT_TIMEOUTS, resolveTimeout } from "../constants/timeouts";
import { runBunCommand } from "../utils/bun-exec";
import { readdir } from "../utils/bun-fs";
import { basename, dirname, join, resolve } from "../utils/bun-path";

/** Default `.fbs` schema directory. */
export const DEFAULT_SCHEMA_DIR: string = resolve(import.meta.dir, "../../flatbuffers");

/** Default output directory for generated TypeScript files. */
export const DEFAULT_OUTPUT_DIR: string = resolve(import.meta.dir, "../generated/flatbuffers");
const DEFAULT_FLATC_TIMEOUT_MS: number = resolveTimeout("processStartupMs");
const FLATBUF_BAO_BUILDER_SUBPATH = "@baohaus/flatbuf-bao/builder";
const FLATBUF_BAO_CONSTANTS_SUBPATH = "@baohaus/flatbuf-bao/constants";
const FLATBUF_BAO_READER_SUBPATH = "@baohaus/flatbuf-bao/reader";

// Symbols emitted by `flatc --ts --gen-object-api --gen-mutable`. Anything
// referenced as `flatbuffers.X` in generated code must appear in one of the
// two lists; the post-processor rewrites the namespace import + every
// qualified reference into the matching named-import surface.
const BUILDER_VALUE_SYMBOLS: readonly string[] = ["Builder"];
const BUILDER_TYPE_SYMBOLS: readonly string[] = ["IGeneratedObject", "Offset"];
const CONSTANT_SYMBOLS: readonly string[] = [
  "FILE_IDENTIFIER_LENGTH",
  "SIZEOF_INT",
  "SIZEOF_SHORT",
  "SIZE_PREFIX_LENGTH",
];
const READER_VALUE_SYMBOLS: readonly string[] = ["ByteBuffer", "Encoding"];
const READER_TYPE_SYMBOLS: readonly string[] = ["IUnpackableObject", "Table"];

const UPSTREAM_NAMESPACE_IMPORT_PATTERN =
  /^\s*import\s+(?:type\s+)?\*\s+as\s+flatbuffers\s+from\s+['"]flatbuffers(?:\/mjs\/flatbuffers\.js)?['"];\s*$/gm;
const BAO_FLATBUF_IMPORT_PATTERN =
  /^\s*import\s+(?:type\s+)?\{\s*([^}]+)\s*\}\s+from\s+['"]@baohaus\/flatbuf-bao\/(builder|constants|reader)['"];\s*$/gm;
const FLATBUFFERS_QUALIFIED_REFERENCE =
  /(?<=^|[\s(<=,:[|&;?])flatbuffers\.([A-Za-z_][A-Za-z0-9_]*)/gm;

interface FlatbufImportSymbols {
  readonly builderTypes: Set<string>;
  readonly builderValues: Set<string>;
  readonly constants: Set<string>;
  readonly readerTypes: Set<string>;
  readonly readerValues: Set<string>;
}

function createFlatbufImportSymbols(): FlatbufImportSymbols {
  return {
    builderTypes: new Set<string>(),
    builderValues: new Set<string>(),
    constants: new Set<string>(),
    readerTypes: new Set<string>(),
    readerValues: new Set<string>(),
  };
}

function addFlatbufImportSymbol(symbols: FlatbufImportSymbols, symbol: string): void {
  if (BUILDER_VALUE_SYMBOLS.includes(symbol)) {
    symbols.builderValues.add(symbol);
  } else if (BUILDER_TYPE_SYMBOLS.includes(symbol)) {
    symbols.builderTypes.add(symbol);
  } else if (CONSTANT_SYMBOLS.includes(symbol)) {
    symbols.constants.add(symbol);
  } else if (READER_VALUE_SYMBOLS.includes(symbol)) {
    symbols.readerValues.add(symbol);
  } else if (READER_TYPE_SYMBOLS.includes(symbol)) {
    symbols.readerTypes.add(symbol);
  }
}

function collectReferencedSymbols(content: string): FlatbufImportSymbols {
  const symbols = createFlatbufImportSymbols();
  for (const match of content.matchAll(FLATBUFFERS_QUALIFIED_REFERENCE)) {
    const symbol = match[1];
    if (symbol !== undefined) {
      addFlatbufImportSymbol(symbols, symbol);
    }
  }
  return symbols;
}

function collectExistingBaoFlatbufImports(content: string): FlatbufImportSymbols {
  const symbols = createFlatbufImportSymbols();
  for (const match of content.matchAll(BAO_FLATBUF_IMPORT_PATTERN)) {
    const specifierList = match[1];
    if (specifierList === undefined) {
      continue;
    }
    for (const rawSpecifier of specifierList.split(",")) {
      const symbol = rawSpecifier.trim().split(/\s+as\s+/u)[0];
      if (symbol !== undefined && symbol.length > 0) {
        addFlatbufImportSymbol(symbols, symbol);
      }
    }
  }
  return symbols;
}

function mergeFlatbufImportSymbols(
  target: FlatbufImportSymbols,
  source: FlatbufImportSymbols,
): FlatbufImportSymbols {
  for (const symbol of source.builderTypes) {
    target.builderTypes.add(symbol);
  }
  for (const symbol of source.builderValues) {
    target.builderValues.add(symbol);
  }
  for (const symbol of source.constants) {
    target.constants.add(symbol);
  }
  for (const symbol of source.readerTypes) {
    target.readerTypes.add(symbol);
  }
  for (const symbol of source.readerValues) {
    target.readerValues.add(symbol);
  }
  return target;
}

function hasFlatbufImportSymbols(symbols: FlatbufImportSymbols): boolean {
  return (
    symbols.builderTypes.size > 0 ||
    symbols.builderValues.size > 0 ||
    symbols.constants.size > 0 ||
    symbols.readerTypes.size > 0 ||
    symbols.readerValues.size > 0
  );
}

function sortedSymbols(symbols: Set<string>): string[] {
  return Array.from(symbols).sort();
}

function buildNamedImportLines(symbols: FlatbufImportSymbols): string {
  const lines: string[] = [];
  const builderValues = sortedSymbols(symbols.builderValues);
  const builderTypes = sortedSymbols(symbols.builderTypes);
  const constants = sortedSymbols(symbols.constants);
  const readerValues = sortedSymbols(symbols.readerValues);
  const readerTypes = sortedSymbols(symbols.readerTypes);

  if (builderValues.length > 0) {
    lines.push(`import { ${builderValues.join(", ")} } from '${FLATBUF_BAO_BUILDER_SUBPATH}';`);
  }
  if (builderTypes.length > 0) {
    lines.push(`import type { ${builderTypes.join(", ")} } from '${FLATBUF_BAO_BUILDER_SUBPATH}';`);
  }
  if (constants.length > 0) {
    lines.push(`import { ${constants.join(", ")} } from '${FLATBUF_BAO_CONSTANTS_SUBPATH}';`);
  }
  if (readerValues.length > 0) {
    lines.push(`import { ${readerValues.join(", ")} } from '${FLATBUF_BAO_READER_SUBPATH}';`);
  }
  if (readerTypes.length > 0) {
    lines.push(`import type { ${readerTypes.join(", ")} } from '${FLATBUF_BAO_READER_SUBPATH}';`);
  }
  return lines.join("\n");
}

function injectFlatbufImports(content: string, importBlock: string): string {
  const generatedComment = "// automatically generated by the FlatBuffers compiler, do not modify";
  if (content.startsWith(generatedComment)) {
    const firstNewline = content.indexOf("\n");
    if (firstNewline !== -1) {
      const header = content.slice(0, firstNewline + 1);
      const body = content.slice(firstNewline + 1).replace(/^\n+/u, "");
      return `${header}${importBlock}\n${body}`;
    }
  }
  return `${importBlock}\n${content.replace(/^\n+/u, "")}`;
}

/**
 * Rewrite generated FlatBuffers imports to the Bao runtime
 * (`@baohaus/flatbuf-bao`). Generated files emit:
 *
 *   import * as flatbuffers from 'flatbuffers/mjs/flatbuffers.js';
 *   ... flatbuffers.Builder ... flatbuffers.ByteBuffer ...
 *
 * The post-processor transforms each file to use named imports from the
 * Bao submodule subpaths:
 *
 *   import { Builder, Offset } from '@baohaus/flatbuf-bao/builder';
 *   import { ByteBuffer, Encoding } from '@baohaus/flatbuf-bao/reader';
 *   ... Builder ... ByteBuffer ...
 *
 * This is part of the schema-compile pipeline; generated impl-path code
 * never imports the upstream `flatbuffers` package directly.
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
    const referenced = mergeFlatbufImportSymbols(
      collectReferencedSymbols(content),
      collectExistingBaoFlatbufImports(content),
    );
    if (!hasFlatbufImportSymbols(referenced)) {
      continue;
    }

    const namedImports = buildNamedImportLines(referenced);
    const importsRemoved = content
      .replace(UPSTREAM_NAMESPACE_IMPORT_PATTERN, "")
      .replace(BAO_FLATBUF_IMPORT_PATTERN, "");
    const referencesRewritten = importsRemoved.replace(
      FLATBUFFERS_QUALIFIED_REFERENCE,
      (_match, symbol: string) => symbol,
    );
    const rewritten = injectFlatbufImports(referencesRewritten, namedImports);

    if (rewritten !== content) {
      await Bun.write(absolutePath, rewritten);
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
