/** Import path rewriting rules for TypeBox to baobox migration */

interface ImportTransform {
  from: RegExp;
  to: string;
}

const IMPORT_TRANSFORMS: ImportTransform[] = [
  { from: /['"]@sinclair\/typebox['"]/, to: "'@baohaus/baobox'" },
  { from: /['"]@sinclair\/typebox\/value['"]/, to: "'@baohaus/baobox/value'" },
  { from: /['"]@sinclair\/typebox\/compiler['"]/, to: "'@baohaus/baobox/compile'" },
  { from: /['"]@sinclair\/typebox\/compile['"]/, to: "'@baohaus/baobox/compile'" },
  { from: /['"]@sinclair\/typebox\/type['"]/, to: "'@baohaus/baobox'" },
  { from: /['"]@sinclair\/typebox\/errors['"]/, to: "'@baohaus/baobox/error/errors'" },
  { from: /['"]@sinclair\/typebox\/error['"]/, to: "'@baohaus/baobox/error/errors'" },
  { from: /['"]@sinclair\/typebox\/system['"]/, to: "'@baohaus/baobox/system/system'" },
  { from: /['"]@sinclair\/typebox\/format['"]/, to: "'@baohaus/baobox/format/format'" },
  { from: /['"]@sinclair\/typebox\/guard['"]/, to: "'@baohaus/baobox/guard/guard'" },
  { from: /['"]typebox['"]/, to: "'@baohaus/baobox'" },
  { from: /['"]typebox\/value['"]/, to: "'@baohaus/baobox/value'" },
  { from: /['"]typebox\/compile['"]/, to: "'@baohaus/baobox/compile'" },
  { from: /['"]typebox\/type['"]/, to: "'@baohaus/baobox'" },
  { from: /['"]typebox\/schema['"]/, to: "'@baohaus/baobox/schema/schema'" },
  { from: /['"]typebox\/error['"]/, to: "'@baohaus/baobox/error/errors'" },
  { from: /['"]typebox\/system['"]/, to: "'@baohaus/baobox/system/system'" },
  { from: /['"]typebox\/format['"]/, to: "'@baohaus/baobox/format/format'" },
  { from: /['"]typebox\/guard['"]/, to: "'@baohaus/baobox/guard/guard'" },
];

const TYPEBOX_IMPORT_SPECIFIER =
  /(?:\bfrom\s*|\bimport\s*\(\s*)['"](?:@sinclair\/typebox|typebox)(?:\/[^'"]*)?['"]|^\s*import\s+['"](?:@sinclair\/typebox|typebox)(?:\/[^'"]*)?['"]/g;

export interface TransformResult {
  line: string;
  changed: boolean;
  note?: string;
}

function isInsideQuotedString(line: string, index: number): boolean {
  let quote: '"' | "'" | "`" | undefined;
  let escaped = false;

  for (let i = 0; i < index; i++) {
    const character = line[i];
    if (character === undefined) {
      continue;
    }

    if (escaped) {
      escaped = false;
      continue;
    }

    if (character === "\\") {
      escaped = true;
      continue;
    }

    if (quote !== undefined) {
      if (character === quote) {
        quote = undefined;
      }
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
    }
  }

  return quote !== undefined;
}

function hasTransformableTypeBoxImportSpecifier(line: string): boolean {
  TYPEBOX_IMPORT_SPECIFIER.lastIndex = 0;
  let match = TYPEBOX_IMPORT_SPECIFIER.exec(line);
  while (match !== null) {
    if (!isInsideQuotedString(line, match.index)) {
      return true;
    }
    match = TYPEBOX_IMPORT_SPECIFIER.exec(line);
  }
  return false;
}

export function hasTypeBoxImportDeclaration(content: string): boolean {
  return content.split("\n").some((line) => hasTransformableTypeBoxImportSpecifier(line));
}

export function transformImport(line: string): TransformResult {
  if (!hasTransformableTypeBoxImportSpecifier(line)) {
    return { line, changed: false };
  }

  for (const rule of IMPORT_TRANSFORMS) {
    if (rule.from.test(line)) {
      return {
        line: line.replace(rule.from, rule.to),
        changed: true,
      };
    }
  }
  return { line, changed: false };
}
