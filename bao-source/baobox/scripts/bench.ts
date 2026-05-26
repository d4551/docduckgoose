import { Compile } from "../compile/index.js";
import { Intersect, Union } from "../type/combinator-core.js";
import { Array as Arr, Object as Obj } from "../type/containers.js";
import { Boolean as TBoolean, Number as TNumber, String as TString } from "../type/primitives.js";
import { Check } from "../value/check.js";
import { Clean } from "../value/clean.js";
import { Clone } from "../value/clone.js";
import { Convert } from "../value/convert.js";
import { Create } from "../value/create.js";
import { Default } from "../value/default.js";
import { Parse } from "../value/parse.js";
import { Repair } from "../value/repair.js";

const ITERATIONS = 10_000;

const stringSchema = TString();
const numberSchema = TNumber();
const objectSchema = Obj({ id: TString(), count: TNumber(), active: TBoolean() });
const arraySchema = Arr(TNumber());
const nestedSchema = Obj({
  items: Arr(Obj({ name: TString(), value: TNumber() })),
});

interface BenchResult {
  name: string;
  opsPerSec: number;
  totalMs: number;
}

function bench(name: string, fn: () => void): BenchResult {
  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    fn();
  }
  const elapsed = performance.now() - start;
  return {
    name,
    opsPerSec: Math.round((ITERATIONS / elapsed) * 1000),
    totalMs: Math.round(elapsed * 100) / 100,
  };
}

const results: BenchResult[] = [];

const objectValue = { id: "abc", count: 42, active: true };
const arrayValue = [1, 2, 3, 4, 5];
const nestedValue = {
  items: [
    { name: "a", value: 1 },
    { name: "b", value: 2 },
  ],
};

results.push(bench("Check(String)", () => Check(stringSchema, "hello")));
results.push(bench("Check(Number)", () => Check(numberSchema, 42)));
results.push(bench("Check(Object)", () => Check(objectSchema, objectValue)));
results.push(bench("Check(Array)", () => Check(arraySchema, arrayValue)));
results.push(bench("Check(Nested)", () => Check(nestedSchema, nestedValue)));
results.push(bench("Parse(Object)", () => Parse(objectSchema, objectValue)));
results.push(bench("Create(Object)", () => Create(objectSchema)));
results.push(bench("Clean(Object)", () => Clean(objectSchema, objectValue)));
results.push(bench("Convert(String)", () => Convert(TString(), 42)));
results.push(bench("Default(Object)", () => Default(objectSchema, objectValue)));
results.push(bench("Repair(Object)", () => Repair(objectSchema, objectValue)));
results.push(bench("Clone(Object)", () => Clone(objectValue)));

const compiledObject = Compile(objectSchema);
results.push(bench("Compiled:Check(Object)", () => compiledObject.check(objectValue)));
results.push(
  bench("Compiled:IsAccelerated", () => {
    compiledObject.IsAccelerated();
  }),
);

results.push(
  bench("Union(Object|Array)", () => {
    Check(Union([objectSchema, arraySchema]), objectValue);
  }),
);
results.push(
  bench("Intersect(A&B)", () => {
    const A = Obj({ x: TNumber() });
    const B = Obj({ y: TString() });
    Check(Intersect([A, B]), { x: 1, y: "hello" });
  }),
);

const maxNameLen = Math.max(...results.map((r) => r.name.length));
for (const result of results) {
  const label = result.name.padEnd(maxNameLen);
  process.stdout.write(
    `${label}  ${String(result.opsPerSec).padStart(10)} ops/s  (${result.totalMs}ms)\n`,
  );
}

if (compiledObject.IsAccelerated()) {
  process.stdout.write("\nJIT acceleration: ENABLED\n");
} else {
  process.stdout.write("\nJIT acceleration: FALLBACK (CSP or unsupported)\n");
}
