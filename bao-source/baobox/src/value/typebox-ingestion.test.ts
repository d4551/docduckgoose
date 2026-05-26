import { describe, expect, test } from "bun:test";
import { Type as ElysiaType } from "@sinclair/typebox";
import Type from "typebox";
import { Compile, CompileCached } from "../compile/index.js";
import type { Static } from "../type/static-types.js";
import { Check } from "./check.js";
import { Parse, TryParse } from "./parse.js";

describe("TypeBox ingestion", () => {
  test("checks TypeBox v1 object schemas", () => {
    const user = Type.Object(
      {
        id: Type.String(),
        age: Type.Optional(Type.Number()),
      },
      { additionalProperties: false },
    );

    const valid: Static<typeof user> = { id: "usr_1" };

    expect(Check(user, valid)).toBe(true);
    expect(Check(user, { id: "usr_1", extra: true })).toBe(false);
    expect(TryParse(user, { id: "usr_1", age: "42" }).success).toBe(true);
  });

  test("checks Elysia TypeBox object schemas", () => {
    const user = ElysiaType.Object(
      {
        id: ElysiaType.String(),
        age: ElysiaType.Optional(ElysiaType.Number()),
      },
      { additionalProperties: false },
    );

    const valid: Static<typeof user> = { id: "usr_1" };

    expect(Check(user, valid)).toBe(true);
    expect(Check(user, { id: "usr_1", extra: true })).toBe(false);
    expect(Parse(user, { id: "usr_1" })).toEqual({ id: "usr_1" });
  });

  test("compiles TypeBox v1 unions", () => {
    const userOrCount = Type.Union([
      Type.Object({ id: Type.String() }, { additionalProperties: false }),
      Type.Object({ count: Type.Number() }, { additionalProperties: false }),
    ]);
    const validator = Compile(userOrCount);

    expect(validator.check({ id: "usr_1" })).toBe(true);
    expect(validator.Check({ id: "usr_1" })).toBe(true);
    expect(validator.check({ count: 3 })).toBe(true);
    expect(validator.check({ id: "usr_1", count: 3 })).toBe(false);
  });

  test("compiles TypeBox v1 arrays through the Bun fast path", () => {
    const users = Type.Array(Type.Object({ id: Type.String() }, { additionalProperties: false }));
    const validator = Compile(users);

    expect(validator.check([{ id: "usr_1" }])).toBe(true);
    expect(validator.check([{ id: "usr_1", extra: true }])).toBe(false);
    expect(validator.IsAccelerated()).toBe(true);
  });

  test("reuses compiled TypeBox validators by schema and context", () => {
    const schema = Type.Object({ id: Type.String() });

    expect(CompileCached(schema)).toBe(CompileCached(schema));
  });
});
