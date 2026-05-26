import { toResultAsync } from "@baohaus/bao-utils/async-result";
import { mkdir } from "@baohaus/bao-utils/bun-fs";
import { dirname, resolve } from "@baohaus/bao-utils/bun-path";
import ts from "typescript";

const packageRoot = resolve(import.meta.dir, "..");
const sourceEntrypoint = resolve(packageRoot, "src", "utils", "bao-control-plane-platform.ts");
const mode = Bun.argv[2];

function createCompilerOptions(): ts.CompilerOptions {
  return {
    declaration: true,
    declarationMap: false,
    emitDeclarationOnly: true,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    outDir: resolve(packageRoot, "dist"),
    rootDir: resolve(packageRoot, "src"),
    skipLibCheck: true,
    strict: true,
    target: ts.ScriptTarget.ESNext,
  };
}

function createDiagnosticHost(): ts.FormatDiagnosticsHost {
  return {
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => packageRoot,
    getNewLine: () => ts.sys.newLine,
  };
}

function formatDiagnostics(diagnostics: readonly ts.Diagnostic[]): string {
  return ts.formatDiagnosticsWithColorAndContext(diagnostics, createDiagnosticHost());
}

function createProgramWithOptionalHost(host?: ts.CompilerHost): ts.Program {
  return ts.createProgram([sourceEntrypoint], createCompilerOptions(), host);
}

function collectDiagnostics(
  program: ts.Program,
  emitDiagnostics: readonly ts.Diagnostic[] = [],
): readonly ts.Diagnostic[] {
  return [...ts.getPreEmitDiagnostics(program), ...emitDiagnostics];
}

function typecheckSharedPackage(): void {
  const program = createProgramWithOptionalHost();
  const diagnostics = collectDiagnostics(program);
  if (diagnostics.length > 0) {
    throw new Error(formatDiagnostics(diagnostics));
  }
}

export async function emitSharedDeclarations(): Promise<void> {
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
    await Bun.write(fileName, content);
  }
}

async function run(): Promise<void> {
  if (mode === "typecheck") {
    typecheckSharedPackage();
    return;
  }

  if (mode === "emit-declarations") {
    await emitSharedDeclarations();
    return;
  }

  throw new Error('Expected mode "typecheck" or "emit-declarations" for shared typescript-package');
}

if (import.meta.main) {
  const result = await toResultAsync(run());
  if (!result.ok) {
    const message = result.error instanceof Error ? result.error.message : String(result.error);
    await Bun.write(Bun.stderr, `${message}\n`);
    process.exitCode = 1;
  }
}
