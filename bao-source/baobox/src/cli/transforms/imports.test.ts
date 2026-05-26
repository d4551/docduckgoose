import { describe, expect, test } from "bun:test";

import { hasTypeBoxImportDeclaration, transformImport } from "./imports.js";

describe("import transforms", () => {
  test("rewrites root TypeBox imports to baobox", () => {
    expect(transformImport('import { Object, String } from "@sinclair/typebox";')).toEqual({
      line: "import { Object, String } from '@baohaus/baobox';",
      changed: true,
    });
    expect(transformImport('import Type from "@sinclair/typebox";')).toEqual({
      line: "import Type from '@baohaus/baobox';",
      changed: true,
    });
    expect(transformImport('import Type, { type Static } from "typebox";')).toEqual({
      line: "import Type, { type Static } from '@baohaus/baobox';",
      changed: true,
    });
  });

  test("rewrites explicit TypeBox subpath imports", () => {
    expect(transformImport('import { Object, String } from "@sinclair/typebox/type";')).toEqual({
      line: "import { Object, String } from '@baohaus/baobox';",
      changed: true,
    });
    expect(transformImport('const module = await import("@sinclair/typebox/value");')).toEqual({
      line: "const module = await import('@baohaus/baobox/value');",
      changed: true,
    });
    expect(transformImport('import Value from "typebox/value";')).toEqual({
      line: "import Value from '@baohaus/baobox/value';",
      changed: true,
    });
  });

  test("does not rewrite ordinary strings", () => {
    expect(transformImport('return content.includes("@sinclair/typebox");')).toEqual({
      line: 'return content.includes("@sinclair/typebox");',
      changed: false,
    });
  });

  test("detects only real TypeBox imports", () => {
    expect(hasTypeBoxImportDeclaration('const text = "@sinclair/typebox";')).toBe(false);
    expect(hasTypeBoxImportDeclaration('const text = "typebox";')).toBe(false);
    expect(hasTypeBoxImportDeclaration('import { Type } from "@sinclair/typebox";')).toBe(true);
    expect(hasTypeBoxImportDeclaration('import Type from "typebox";')).toBe(true);
  });
});
