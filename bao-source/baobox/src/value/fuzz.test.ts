import { describe, expect, test } from "bun:test";
import { Intersect, Optional, Union } from "../type/combinator-core.js";
import { Array as Arr, Object as Obj } from "../type/containers.js";
import { Boolean as TBool, Number as TNum, String as TStr } from "../type/primitives.js";
import { Check } from "./check.js";
import { Clean } from "./clean.js";
import { Clone } from "./clone.js";
import { Create } from "./create.js";
import { Default } from "./default.js";
import { Equal } from "./equal.js";
import { Parse } from "./parse.js";

const stringSchema = TStr();
const numberSchema = TNum();
const boolSchema = TBool();
const objectSchema = Obj({ name: TStr(), age: TNum() });
const arraySchema = Arr(TNum());
const nestedSchema = Obj({
  items: Arr(Obj({ key: TStr(), val: TNum() })),
});
const unionSchema = Union([TStr(), TNum()]);
const intersectSchema = Intersect([Obj({ x: TNum() }), Obj({ y: TStr() })]);
const optionalSchema = Optional(TStr());

const schemas = [
  stringSchema,
  numberSchema,
  boolSchema,
  objectSchema,
  arraySchema,
  nestedSchema,
  unionSchema,
  intersectSchema,
  optionalSchema,
];

describe("fuzz: round-trip", () => {
  for (const schema of schemas) {
    test(`Create → Parse round-trip validates`, () => {
      const created = Create(schema);
      const result = Parse(schema, created);
      expect(result).toBeDefined();
    });

    test(`Create → Check passes`, () => {
      const created = Create(schema);
      expect(Check(schema, created)).toBe(true);
    });
  }
});

describe("fuzz: idempotence", () => {
  test("Clean is idempotent", () => {
    const value = { name: "test", age: 25, extra: "remove-me" };
    const cleaned1 = Clean(objectSchema, value);
    const cleaned2 = Clean(objectSchema, cleaned1);
    expect(Equal(cleaned1)).toEqual(Equal(cleaned2));
  });

  test("Clone produces independent copy", () => {
    const value = { name: "test", age: 25 };
    const cloned = Clone(value);
    expect(cloned).toEqual(value);
    cloned.name = "changed";
    expect(value.name).toBe("test");
  });

  test("Default round-trip passes Check", () => {
    const created = Create(objectSchema);
    const defaulted = Default(objectSchema, created);
    expect(Check(objectSchema, defaulted)).toBe(true);
  });
});

describe("fuzz: deep nesting", () => {
  test("50 levels of nested Object validation", () => {
    let schema: Record<string, unknown> = { type: "object", properties: {} };
    for (let i = 0; i < 50; i++) {
      schema = { type: "object", properties: { nested: schema } };
    }
    const created = Create(schema);
    expect(() => Check(schema, created)).not.toThrow();
  });
});
