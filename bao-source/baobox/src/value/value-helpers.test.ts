import { StandardSchemaV1 } from "../standard/index.js";
import { Union } from "../type/combinator-core.js";
import { Object as ObjectSchema } from "../type/containers.js";
import {
  Boolean as BooleanSchema,
  Integer,
  Literal,
  String as StringSchema,
} from "../type/primitives.js";
import { Convert } from "./convert.js";
import { Diff } from "./diff.js";
import { Hash } from "./hash.js";
import { Patch } from "./patch.js";
import { Pipeline } from "./pipeline.js";

describe("baobox value helpers", () => {
  test("diff emits escaped JSON Pointer paths and patch applies them", () => {
    const current = { "a/b": { "~key": 1 } };
    const next = { "a/b": { "~key": 2 } };

    const edits = Diff(current, next);

    expect(edits).toEqual([{ type: "update", path: "/a~1b/~0key", value: 2 }]);
    expect(Patch(current, edits)).toEqual(next);
  });

  test("patch applies root replacement edits", () => {
    expect(Patch({ stale: true }, [{ type: "update", path: "", value: ["fresh"] }])).toEqual([
      "fresh",
    ]);
  });

  test("patch applies multiple array deletes without index drift", () => {
    const current = ["first", "second", "third"];
    const next: string[] = [];

    expect(Diff(current, next)).toEqual([
      { type: "delete", path: "/2" },
      { type: "delete", path: "/1" },
      { type: "delete", path: "/0" },
    ]);
    expect(Patch(current, Diff(current, next))).toEqual(next);
  });

  test("convert integer rejects partial numeric text", () => {
    expect(Convert(Integer(), "12px")).toBe("12px");
    expect(Convert(Integer(), "12")).toBe(12);
  });

  test("convert union preserves an already valid branch", () => {
    const schema = Union([StringSchema(), BooleanSchema()]);

    expect(Convert(schema, true)).toBe(true);
    expect(Convert(schema, 1)).toBe("1");
  });

  test("standard schema union validation preserves the matching object branch", () => {
    const schema = Union([
      ObjectSchema({
        ok: Literal(true),
        value: StringSchema(),
      }),
      ObjectSchema({
        ok: Literal(false),
        error: StringSchema(),
      }),
    ]);

    expect(
      StandardSchemaV1(schema)["~standard"].validate({
        ok: false,
        error: "expected failure",
      }),
    ).toEqual({
      value: {
        ok: false,
        error: "expected failure",
      },
    });
  });

  test("hash handles cyclic structures deterministically", () => {
    const left: { readonly name: string; self?: object } = { name: "left" };
    left.self = left;
    const right: { readonly name: string; self?: object } = { name: "left" };
    right.self = right;

    expect(Hash(left)).toBe(Hash(right));
  });

  test("pipeline accepts readonly stages and composes them in order", () => {
    const stages = [(_schema, value) => `${value}-a`, (_schema, value) => `${value}-b`] as const;
    const pipeline = Pipeline(stages);

    expect(pipeline(StringSchema(), "root")).toBe("root-a-b");
  });
});
