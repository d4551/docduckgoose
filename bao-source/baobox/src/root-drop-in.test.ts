import { describe, expect, test } from "bun:test";
import TypeCompilerDefault, { Compile as CompileFromSubpath } from "./compile/index.js";
import Type, {
  Compile,
  Literal,
  Object as ObjectSchema,
  Record,
  RecordKey,
  RecordKeyAsPattern,
  RecordValue,
  Script,
  type Static,
  String as StringSchema,
  Value,
} from "./index.js";
import ValueDefault, {
  IsOptionalUndefined,
  UnionPrioritySort,
  UnionScoreSelect,
} from "./value/index.js";

describe("root TypeBox replacement surface", () => {
  test("supports default and named builder imports", () => {
    const user = Type.Object({
      id: Type.String(),
      email: Type.Optional(Type.String({ format: "email" })),
    });
    const named = ObjectSchema({ id: StringSchema() });
    const valid: Static<typeof user> = { id: "usr_1" };

    expect(Value.Check(user, valid)).toBe(true);
    expect(Value.Check(named, { id: "usr_1" })).toBe(true);
    const validator = Compile(user);

    expect(validator.check({ id: "usr_1", email: "ada@example.com" })).toBe(true);
    expect(validator.Check({ id: "usr_1", email: "ada@example.com" })).toBe(true);
    expect(validator.Type()).toBe(user);
    expect(validator.Code()).toBe(validator.code);
    expect(validator.Context()).toBe(validator.context);
    expect(validator.IsAccelerated()).toBe(validator.isAccelerated);
  });

  test("exposes TypeBox root helpers through baobox implementations", () => {
    const record = Record(StringSchema(), Type.Number());
    const scripted = Script("{ id: string }");

    expect(RecordKey(record)).toEqual(StringSchema());
    expect(RecordValue(record)).toEqual(Type.Number());
    expect(RecordKeyAsPattern(record)).toBe("^.*$");
    expect(Value.Check(scripted, { id: "usr_1" })).toBe(true);
    expect(typeof Type.Extends).toBe("function");
    expect(typeof Type.Instantiate).toBe("function");
  });

  test("supports documented default subpath imports", () => {
    const user = Type.Object({ id: Type.String() });

    expect(TypeCompilerDefault).toBe(CompileFromSubpath);
    expect(TypeCompilerDefault(user).Check({ id: "usr_1" })).toBe(true);
    expect(ValueDefault.Check(user, { id: "usr_1" })).toBe(true);
  });

  test("exposes value subpath selection helpers", () => {
    const alpha = Type.Object({ type: Literal("alpha"), name: Type.String() });
    const beta = Type.Object({ type: Literal("beta"), count: Type.Number() });
    const union = Type.Union([alpha, beta]);
    const optionalName = Type.Optional(Type.String());

    expect(IsOptionalUndefined(optionalName, "name", { name: undefined })).toBe(true);
    expect(UnionPrioritySort([Type.Unknown(), Type.String()])[0]).toEqual(Type.String());
    expect(UnionScoreSelect({}, union, { type: "beta", count: 1 })).toBe(beta);
  });
});
