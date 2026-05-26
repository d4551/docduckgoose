/**
 * Naming Conventions Utility.
 *
 * Enforces consistent naming patterns across the codebase. This module provides:
 *
 * - File naming pattern validation (components, services, utils)
 * - Variable and function naming convention checks
 * - Naming suggestion generation for violations
 * - Batch validation for multiple items
 *
 * @baohaus/bao-utils/naming-conventions
 */

const CAMEL_CASE_RE: RegExp = /^[a-z][a-zA-Z0-9]*$/;
const PASCAL_CASE_RE: RegExp = /^[A-Z][a-zA-Z0-9]*$/;
const KEBAB_CASE_RE: RegExp = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
const SNAKE_CASE_RE: RegExp = /^[a-z][a-z0-9]*(_[a-z0-9]+)*$/;
const SCREAMING_SNAKE_RE: RegExp = /^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$/;
const WORD_BOUNDARY_RE: RegExp = /[-_\s]+(.)?/g;
const FIRST_CHAR_RE: RegExp = /^./;

/**
 * Lazy-loaded TypeScript module reference.
 *
 * The `typescript` package is only needed by AST-analysis functions
 * (generateNamingReport, findNamingViolations). String conversion helpers
 * (toKebabCase, toCamelCase, etc.) do not require it. Lazy loading avoids
 * a hard dependency on typescript in production container builds where it is
 * not installed.
 */
let _ts: typeof import("typescript") | null = null;

async function loadTypescript(): Promise<typeof import("typescript")> {
  if (_ts) {
    return _ts;
  }
  _ts = await import("typescript");
  return _ts;
}

function getTs(): typeof import("typescript") {
  if (!_ts) {
    throw new Error("TypeScript module not loaded. Call loadTypescript() before AST operations.");
  }
  return _ts;
}

/**
 * Type definitions
 */
interface ValidationItem {
  name: string;
  type: string;
}

interface ValidationResult {
  name: string;
  type: string;
  isValid: boolean;
  suggestion: string | null;
}

interface FileItem {
  path: string;
  name: string;
  type?: string;
  content?: string;
}

interface NamingViolation {
  type: string;
  name: string;
  line?: number;
  suggestion: string;
}

interface FileViolationReport {
  file: string;
  violations: NamingViolation[];
}

interface NamingReport {
  totalFiles: number;
  violations: FileViolationReport[];
  suggestions: unknown[];
  summary: {
    variables: number;
    functions: number;
    classes: number;
    files: number;
    css: number;
  };
}

interface ScriptBlock {
  code: string;
  startLine: number;
  scriptKind: number;
}

/**
 * Naming convention rules
 */
export const conventions: {
  variables: string;
  functions: string;
  classes: string;
  interfaces: string;
  types: string;
  enums: string;
  enumValues: string;
  constants: string;
  privateFields: string;
  componentFiles: string;
  serviceFiles: string;
  utilFiles: string;
  testFiles: string;
  directories: string;
  cssClasses: string;
  cssIds: string;
  cssVariables: string;
  components: string;
  props: string;
  events: string;
  slots: string;
  endpoints: string;
  queryParams: string;
  headers: string;
  tables: string;
  columns: string;
  indexes: string;
} = {
  // JavaScript/TypeScript
  variables: "camelCase", // myVariable
  functions: "camelCase", // myFunction()
  classes: "PascalCase", // MyClass
  interfaces: "PascalCase", // IMyInterface or MyInterface
  types: "PascalCase", // MyType
  enums: "PascalCase", // MyEnum
  enumValues: "SCREAMING_SNAKE", // MY_ENUM_VALUE
  constants: "SCREAMING_SNAKE", // MY_CONSTANT
  privateFields: "_camelCase", // _privateField

  // Files and directories
  componentFiles: "PascalCase", // MyComponent.ts
  serviceFiles: "camelCase", // myService.js
  utilFiles: "kebab-case", // my-util.js
  testFiles: "kebab-case.test", // my-component.test.js
  directories: "kebab-case", // my-directory/

  // CSS/SCSS
  cssClasses: "kebab-case", // .my-class
  cssIds: "kebab-case", // #my-id
  cssVariables: "kebab-case", // --my-variable

  // Template specific
  components: "PascalCase", // <MyComponent />
  props: "camelCase", // myProp
  events: "kebab-case", // @my-event
  slots: "kebab-case", // #my-slot

  // API/HTTP
  endpoints: "kebab-case", // /api/my-endpoint
  queryParams: "snake_case", // ?my_param=value
  headers: "Kebab-Case", // My-Header

  // Database
  tables: "snake_case", // my_table
  columns: "snake_case", // my_column
  indexes: "idx_snake_case", // idx_my_index
};

/**
 * Check whether a string matches camelCase.
 *
 * @param string_ - Value to validate.
 * @returns True when the value is camelCase.
 */
export function isCamelCase(string_: string): boolean {
  return CAMEL_CASE_RE.test(string_);
}

/**
 * Check whether a string matches PascalCase.
 *
 * @param string_ - Value to validate.
 * @returns True when the value is PascalCase.
 */
export function isPascalCase(string_: string): boolean {
  return PASCAL_CASE_RE.test(string_);
}

/**
 * Check whether a string matches kebab-case.
 *
 * @param string_ - Value to validate.
 * @returns True when the value is kebab-case.
 */
export function isKebabCase(string_: string): boolean {
  return KEBAB_CASE_RE.test(string_);
}

/**
 * Check whether a string matches snake_case.
 *
 * @param string_ - Value to validate.
 * @returns True when the value is snake_case.
 */
export function isSnakeCase(string_: string): boolean {
  return SNAKE_CASE_RE.test(string_);
}

/**
 * Check whether a string matches SCREAMING_SNAKE_CASE.
 *
 * @param string_ - Value to validate.
 * @returns True when the value is SCREAMING_SNAKE_CASE.
 */
export function isScreamingSnakeCase(string_: string): boolean {
  return SCREAMING_SNAKE_RE.test(string_);
}

/**
 * Convert a string to camelCase.
 *
 * @param string_ - Value to convert.
 * @returns camelCase representation.
 */
export function toCamelCase(string_: string): string {
  return string_
    .replace(WORD_BOUNDARY_RE, (_: string, char: string) => (char ? char.toUpperCase() : ""))
    .replace(FIRST_CHAR_RE, (char: string) => char.toLowerCase());
}

/**
 * Convert a string to PascalCase.
 *
 * @param string_ - Value to convert.
 * @returns PascalCase representation.
 */
export function toPascalCase(string_: string): string {
  return string_
    .replace(WORD_BOUNDARY_RE, (_: string, char: string) => (char ? char.toUpperCase() : ""))
    .replace(FIRST_CHAR_RE, (char: string) => char.toUpperCase());
}

/**
 * Convert a string to kebab-case.
 *
 * @param string_ - Value to convert.
 * @returns kebab-case representation.
 */
export function toKebabCase(string_: string): string {
  return string_
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/**
 * Convert a string to snake_case.
 *
 * @param string_ - Value to convert.
 * @returns snake_case representation.
 */
export function toSnakeCase(string_: string): string {
  return string_
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();
}

/**
 * Convert a string to SCREAMING_SNAKE_CASE.
 *
 * @param string_ - Value to convert.
 * @returns SCREAMING_SNAKE_CASE representation.
 */
export function toScreamingSnakeCase(string_: string): string {
  return toSnakeCase(string_).toUpperCase();
}

/**
 * Validate a name against configured conventions.
 *
 * @param name - Name to validate.
 * @param [type='variable'] - Convention group (variable, function, class, etc.).
 * @returns True when the name adheres to conventions.
 */
export function validateVariableName(name: string, type = "variable"): boolean {
  const convention =
    (conventions as Record<string, string>)[resolveConventionKey(type)] || conventions.variables;

  switch (convention) {
    case "camelCase":
      return isCamelCase(name);
    case "PascalCase":
      return isPascalCase(name);
    case "kebab-case":
      return isKebabCase(name);
    case "snake_case":
      return isSnakeCase(name);
    case "SCREAMING_SNAKE":
      return isScreamingSnakeCase(name);
    case "_camelCase":
      return name.startsWith("_") && isCamelCase(name.substring(1));
    default:
      return true;
  }
}

/**
 * Get a suggested name based on the configured convention.
 *
 * @param name - Name to convert.
 * @param [type='variable'] - Convention group (variable, function, class, etc.).
 * @returns Suggested name following the convention.
 */
export function getSuggestedName(name: string, type = "variable"): string {
  const convention =
    (conventions as Record<string, string>)[resolveConventionKey(type)] || conventions.variables;

  switch (convention) {
    case "camelCase":
      return toCamelCase(name);
    case "PascalCase":
      return toPascalCase(name);
    case "kebab-case":
      return toKebabCase(name);
    case "snake_case":
      return toSnakeCase(name);
    case "SCREAMING_SNAKE":
      return toScreamingSnakeCase(name);
    case "_camelCase":
      return `_${toCamelCase(name)}`;
    default:
      return name;
  }
}

/**
 * Resolve the convention key for a given type.
 *
 * @param type - Convention type (variable, class, etc.).
 * @returns Key to look up in conventions.
 */
function resolveConventionKey(type: string): string {
  if (type === "class") {
    return "classes";
  }
  return `${type}s`;
}

/**
 * Validate a file name based on its file type convention.
 *
 * @param fileName - File name to validate.
 * @param fileType - Convention type (component, service, util, test).
 * @returns True when the file name conforms to the convention.
 */
export function validateFileName(fileName: string, fileType: string): boolean {
  const extension = fileName.split(".").pop() || "";
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf("."));

  switch (fileType) {
    case "component":
      return isPascalCase(nameWithoutExtension) && extension === "ts";
    case "service":
      return isCamelCase(nameWithoutExtension) && ["js", "ts"].includes(extension);
    case "util":
      return isKebabCase(nameWithoutExtension) && ["js", "ts"].includes(extension);
    case "test":
      return nameWithoutExtension.endsWith(".test") || nameWithoutExtension.endsWith(".spec");
    default:
      return true;
  }
}

/**
 * Get a suggested file name based on file type convention.
 *
 * @param fileName - File name to normalize.
 * @param fileType - Convention type (component, service, util).
 * @returns Suggested file name with extension preserved.
 */
export function getSuggestedFileName(fileName: string, fileType: string): string {
  const extension = fileName.split(".").pop() || "";
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf("."));

  let suggestedName: string;

  switch (fileType) {
    case "component":
      suggestedName = toPascalCase(nameWithoutExtension);
      break;
    case "service":
      suggestedName = toCamelCase(nameWithoutExtension);
      break;
    case "util":
      suggestedName = toKebabCase(nameWithoutExtension);
      break;
    default:
      suggestedName = nameWithoutExtension;
  }

  return `${suggestedName}.${extension}`;
}

/**
 * Validate a CSS class name against kebab-case conventions.
 *
 * @param className - CSS class name to validate.
 * @returns True when the class name conforms to kebab-case.
 */
export function validateCssClassName(className: string): boolean {
  return isKebabCase(className) || className.split(" ").every((cls) => isKebabCase(cls));
}

/**
 * Validate API endpoint path segments against kebab-case conventions.
 *
 * @param path - Endpoint path to validate.
 * @returns True when all path segments conform.
 */
export function validateEndpoint(path: string): boolean {
  const segments = path.split("/").filter((s) => s && !s.startsWith(":"));
  return segments.every((segment) => isKebabCase(segment));
}

/**
 * Validate a list of names and return results with suggestions.
 *
 * @param items - Name/type pairs to validate.
 * @returns Validation results with suggestions.
 */
export function validateNames(items: ValidationItem[]): ValidationResult[] {
  const results: ValidationResult[] = [];

  for (const item of items) {
    const { name, type } = item;
    const isValid = validateVariableName(name, type);
    const suggestion = isValid ? null : getSuggestedName(name, type);

    results.push({
      name,
      type,
      isValid,
      suggestion,
    });
  }

  return results;
}

/**
 * Auto-fix naming in a code string for basic JavaScript/TypeScript patterns.
 *
 * @param code - Source code to normalize.
 * @param [language='javascript'] - Language hint for basic parsing.
 * @returns Updated code with normalized names.
 */
export function autoFixNaming(code: string, language = "javascript"): string {
  let fixed = code;

  if (language === "javascript" || language === "typescript") {
    // Fix variable declarations
    fixed = fixed.replace(
      /(?:let|const|var)\s+([A-Z_][A-Za-z0-9_]*)/g,
      (match: string, name: string) => {
        if (isScreamingSnakeCase(name)) {
          // Keep constants as SCREAMING_SNAKE_CASE
          return match;
        }
        const suggested = toCamelCase(name);
        // Debug logging removed - use external logging if needed
        return match.replace(name, suggested);
      },
    );

    // Fix function names
    fixed = fixed.replace(/function\s+([A-Z_][A-Za-z0-9_]*)/g, (match: string, name: string) => {
      const suggested = toCamelCase(name);
      // Debug logging removed - use external logging if needed
      return match.replace(name, suggested);
    });
  }

  // Return the fixed code
  return fixed;
}

/**
 * Generate a naming convention report for files.
 *
 * Requires the TypeScript compiler module. Call this function only in
 * environments where `typescript` is installed (development, CI).
 *
 * @param files - File metadata to analyze.
 * @returns Naming convention report.
 */
export async function generateNamingReport(files: FileItem[]): Promise<NamingReport> {
  await loadTypescript();
  const report: NamingReport = {
    totalFiles: files.length,
    violations: [],
    suggestions: [],
    summary: {
      variables: 0,
      functions: 0,
      classes: 0,
      files: 0,
      css: 0,
    },
  };

  for (const file of files) {
    const fileViolations: NamingViolation[] = [];

    // Check file name
    const fileType = getFileType(file.path);
    if (!validateFileName(file.name, fileType)) {
      fileViolations.push({
        type: "file",
        name: file.name,
        suggestion: getSuggestedFileName(file.name, fileType),
      });
      report.summary.files++;
    }

    if (file.content) {
      // Check for naming violations in content
      const violations = findNamingViolations(file.content, file.type);
      fileViolations.push(...violations);

      // Update summary
      for (const v of violations) {
        const summaryKey = resolveSummaryKey(v.type);
        if (summaryKey) {
          report.summary[summaryKey]++;
        }
      }
    }

    if (fileViolations.length > 0) {
      report.violations.push({
        file: file.path,
        violations: fileViolations,
      });
    }
  }

  return report;
}

/**
 * Map a violation type to a summary key.
 *
 * @param type - Violation type.
 * @returns Summary key or null when unsupported.
 */
function resolveSummaryKey(type: string): keyof NamingReport["summary"] | null {
  switch (type) {
    case "variable":
    case "constant":
    case "privateField":
      return "variables";
    case "function":
      return "functions";
    case "class":
      return "classes";
    case "file":
      return "files";
    case "css":
      return "css";
    default:
      return null;
  }
}

/**
 * Resolve file type from a file path.
 *
 * @param path - File path to inspect.
 * @returns File type identifier.
 */
function getFileType(path: string): string {
  if (path.includes("/components/") || path.includes("/templates/")) {
    return "component";
  }
  if (path.includes("/services/")) {
    return "service";
  }
  if (path.includes("/utils/")) {
    return "util";
  }
  if (path.includes(".test.") || path.includes(".spec.")) {
    return "test";
  }
  return "other";
}

/**
 * Find naming violations in code content (regex-based heuristic).
 *
 * @param content - Source code to inspect.
 * @param _fileType - Optional file type hint (unused).
 * @returns List of naming violations.
 */
function findNamingViolations(
  content: string,
  _fileType: string | undefined,
  filePath?: string,
): NamingViolation[] {
  const tsModule = getTs();
  const blocks = resolveScriptBlocks(content, filePath);
  if (!blocks.length) {
    return [];
  }

  const violations: NamingViolation[] = [];
  for (const block of blocks) {
    if (!block.code.trim()) {
      continue;
    }
    const sourceFile = tsModule.createSourceFile(
      filePath ?? "naming-report.ts",
      block.code,
      tsModule.ScriptTarget.Latest,
      true,
      block.scriptKind,
    );
    violations.push(...collectNamingViolations(sourceFile, block.startLine));
  }

  return violations;
}

/**
 * Resolve script blocks for a given file payload.
 *
 * @param content - Raw file content.
 * @param [filePath] - File path to infer language.
 * @returns Script blocks to analyze.
 */
function resolveScriptBlocks(content: string, filePath?: string): ScriptBlock[] {
  return [
    {
      code: content,
      startLine: 1,
      scriptKind: resolveScriptKind(filePath),
    },
  ];
}

/**
 * Extract script blocks from a file.
 *
/**
 * Resolve the TypeScript script kind for a file.
 *
 * @param filePath - File path for extension inference.
 * @param lang - Optional language override.
 * @returns Script kind for the parser.
 */
function resolveScriptKind(filePath?: string, lang?: string): number {
  const tsModule = getTs();
  const extension = filePath?.split(".").pop() ?? "";
  const normalized = (lang ?? extension).toLowerCase();
  switch (normalized) {
    case "tsx":
      return tsModule.ScriptKind.TSX;
    case "jsx":
      return tsModule.ScriptKind.JSX;
    case "js":
      return tsModule.ScriptKind.JS;
    default:
      return tsModule.ScriptKind.TS;
  }
}

/**
 * Collect naming violations from a TypeScript source file.
 *
 * @param sourceFile - Parsed source file.
 * @param lineOffset - 1-based line offset for the original file.
 * @returns Violations discovered in the source file.
 */
function collectNamingViolations(
  sourceFile: import("typescript").SourceFile,
  lineOffset: number,
): NamingViolation[] {
  const tsModule = getTs();
  const violations: NamingViolation[] = [];

  function recordViolation(type: string, name: string, node: import("typescript").Node): void {
    if (validateVariableName(name, type)) {
      return;
    }
    violations.push({
      type,
      name,
      line: resolveLineNumber(sourceFile, node, lineOffset),
      suggestion: getSuggestedName(name, type),
    });
  }

  function recordVariableDeclaration(
    name: import("typescript").Identifier,
    initializer: import("typescript").Expression | undefined,
    isConst: boolean,
  ): void {
    const isFunctionInitializer = isFunctionLikeInit(tsModule, initializer);
    const baseType = isFunctionInitializer ? "function" : isConst ? "constant" : "variable";
    const resolvedType = resolveNameConventionType(baseType, name.text);
    recordViolation(resolvedType, name.text, name);
  }

  function recordFunctionDeclaration(node: import("typescript").FunctionDeclaration): void {
    if (!node.name) {
      return;
    }
    const resolvedType = resolveNameConventionType("function", node.name.text);
    recordViolation(resolvedType, node.name.text, node.name);
  }

  function recordClassDeclaration(node: import("typescript").ClassDeclaration): void {
    if (!node.name) {
      return;
    }
    recordViolation("class", node.name.text, node.name);
  }

  function visitNode(node: import("typescript").Node): void {
    if (tsModule.isVariableDeclaration(node) && tsModule.isIdentifier(node.name)) {
      const isConst =
        tsModule.isVariableDeclarationList(node.parent) &&
        (node.parent.flags & tsModule.NodeFlags.Const) !== 0;
      recordVariableDeclaration(node.name, node.initializer, isConst);
    }
    if (tsModule.isFunctionDeclaration(node)) {
      recordFunctionDeclaration(node);
    }
    if (tsModule.isClassDeclaration(node)) {
      recordClassDeclaration(node);
    }
    tsModule.forEachChild(node, visitNode);
  }

  visitNode(sourceFile);
  return violations;
}

/**
 * Determine if a variable initializer is a function-like expression.
 */
function isFunctionLikeInit(
  tsModule: typeof import("typescript"),
  initializer: import("typescript").Expression | undefined,
): boolean {
  if (!initializer) {
    return false;
  }
  return tsModule.isArrowFunction(initializer) || tsModule.isFunctionExpression(initializer);
}

/**
 * Resolve a naming convention type based on identifier hints.
 *
 * @param baseType - Base naming type.
 * @param name - Identifier name.
 * @returns Resolved naming convention type.
 */
function resolveNameConventionType(baseType: string, name: string): string {
  if (name.startsWith("_") && (baseType === "variable" || baseType === "function")) {
    return "privateField";
  }
  return baseType;
}

/**
 * Resolve a 1-based line number for a node.
 *
 * @param sourceFile - Parsed source file.
 * @param node - AST node.
 * @param lineOffset - 1-based line offset for the original file.
 * @returns Resolved line number.
 */
function resolveLineNumber(
  sourceFile: import("typescript").SourceFile,
  node: import("typescript").Node,
  lineOffset: number,
): number {
  const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  return lineOffset + line;
}
