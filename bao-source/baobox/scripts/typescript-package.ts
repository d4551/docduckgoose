import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import ts from "typescript";
import {
  createCompilerOptions,
  createDiagnosticHost,
  entrypoints,
} from "./package-build-config.ts";

const mode = process.argv[2];
const rootNames = entrypoints.map((entrypoint) => resolve(import.meta.dir, "..", entrypoint));

function formatDiagnostics(diagnostics: readonly ts.Diagnostic[]): string {
  return ts.formatDiagnosticsWithColorAndContext(diagnostics, createDiagnosticHost());
}

function createProgramWithOptionalHost(host?: ts.CompilerHost): ts.Program {
  return ts.createProgram(rootNames, createCompilerOptions(), host);
}

function collectDiagnostics(
  program: ts.Program,
  emitDiagnostics: readonly ts.Diagnostic[] = [],
): readonly ts.Diagnostic[] {
  return [...ts.getPreEmitDiagnostics(program), ...emitDiagnostics];
}

async function typecheckBaoboxSources(): Promise<void> {
  const program = createProgramWithOptionalHost();
  const diagnostics = collectDiagnostics(program);
  if (diagnostics.length === 0) {
    return;
  }

  throw new Error(formatDiagnostics(diagnostics));
}

export async function emitBaoboxDeclarations(): Promise<void> {
  const compilerHost = ts.createCompilerHost(createCompilerOptions());
  const emittedFiles = new Map<string, string>();
  compilerHost.writeFile = (fileName, content) => {
    emittedFiles.set(fileName, content);
  };

  const program = createProgramWithOptionalHost(compilerHost);
  const emitResult = program.emit(undefined, undefined, undefined, true);
  const diagnostics = collectDiagnostics(program, emitResult.diagnostics);
  if (diagnostics.length > 0) {
    throw new Error(formatDiagnostics(diagnostics));
  }

  for (const [fileName, content] of emittedFiles) {
    await mkdir(dirname(fileName), { recursive: true });
    await writeFile(fileName, content);
  }
}

async function run(): Promise<void> {
  if (mode === "typecheck") {
    await typecheckBaoboxSources();
    return;
  }

  if (mode === "emit-declarations") {
    await emitBaoboxDeclarations();
    return;
  }

  throw new Error(
    'Expected mode "typecheck" or "emit-declarations" for scripts/typescript-package.ts',
  );
}

if (import.meta.main) {
  await run();
}
