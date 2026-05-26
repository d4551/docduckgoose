import {
  areUint8ArraysEqual,
  isUint8ArrayBase64String,
  isUint8ArrayWithinBounds,
} from "../shared/bytes.js";
import { checkNumberConstraints, checkStringConstraints } from "../shared/format-validators.js";
import type { RuntimeContext } from "../shared/runtime-context.js";
import { isPlainRecord } from "../shared/runtime-guards.js";
import {
  schemaBooleanField,
  schemaBooleanOrSchemaField,
  schemaItem,
  schemaItemOrInner,
  schemaKind,
  schemaNumberField,
  schemaOptionalKeys,
  schemaPatternProperties,
  schemaProperties,
  schemaRequiredKeys,
  schemaSchemaField,
  schemaSchemaListField,
  schemaStringField,
  schemaUnknownField,
  schemaVariants,
} from "../shared/schema-access.js";
import type { TSchema } from "../type/base-types.js";

type FastCheck = (value: unknown) => boolean;
type FastStrategy = "bun-native" | "bun-native-const";

interface BunFastPathResult {
  fn: FastCheck;
  code: string;
  accelerated: boolean;
  strategy: FastStrategy;
}

interface BunFastPlan {
  fn: FastCheck;
  strategy: FastStrategy;
}

function validateCompiledObjectPlan(
  value: unknown,
  required: ReadonlySet<string>,
  optional: ReadonlySet<string>,
  propertyPlans: ReadonlyMap<string, BunFastPlan>,
  additionalProperties: boolean | TSchema | undefined,
): boolean {
  if (!isPlainRecord(value)) {
    return false;
  }

  for (const key of required) {
    if (!(optional.has(key) || key in value)) {
      return false;
    }
  }

  for (const [key, propertyValue] of Object.entries(value)) {
    const propertyPlan = propertyPlans.get(key);
    if (propertyPlan === undefined) {
      if (additionalProperties === false) {
        return false;
      }
      continue;
    }
    if (!propertyPlan.fn(propertyValue)) {
      return false;
    }
  }

  return true;
}

function mergeStrategy(...strategies: FastStrategy[]): FastStrategy {
  return strategies.includes("bun-native-const") ? "bun-native-const" : "bun-native";
}

function compilePrimitivePlan(schema: TSchema, context: RuntimeContext): BunFastPlan | null {
  switch (schemaKind(schema)) {
    case "String":
      return {
        fn: (value) => typeof value === "string" && checkStringConstraints(schema, value, context),
        strategy: "bun-native",
      };
    case "Number":
      return {
        fn: (value) =>
          typeof value === "number" &&
          (context.typeSystemPolicy.get().AllowNaN || Number.isFinite(value)) &&
          checkNumberConstraints(schema, value),
        strategy: "bun-native",
      };
    case "Integer":
      return {
        fn: (value) =>
          typeof value === "number" &&
          Number.isInteger(value) &&
          checkNumberConstraints(schema, value),
        strategy: "bun-native",
      };
    case "Boolean":
      return { fn: (value) => typeof value === "boolean", strategy: "bun-native" };
    case "Null":
      return { fn: (value) => value === null, strategy: "bun-native" };
    case "Literal":
      return {
        fn: (value) => value === schemaUnknownField(schema, "const"),
        strategy: "bun-native",
      };
    case "Unknown":
    case "Any":
    case "Unsafe":
      return { fn: () => true, strategy: "bun-native" };
    case "Never":
      return { fn: () => false, strategy: "bun-native" };
    case "Uint8Array": {
      const expected = schemaUnknownField(schema, "constBytes");
      const constBytes = expected instanceof Uint8Array ? expected : undefined;
      const minByteLength = schemaNumberField(schema, "minByteLength");
      const maxByteLength = schemaNumberField(schema, "maxByteLength");
      return {
        fn: (value) =>
          value instanceof Uint8Array &&
          isUint8ArrayWithinBounds(value, minByteLength, maxByteLength) &&
          (constBytes === undefined || areUint8ArraysEqual(value, constBytes)),
        strategy: constBytes === undefined ? "bun-native" : "bun-native-const",
      };
    }
    default:
      return null;
  }
}

/** Compile a fast-path plan for an Object schema. */
function compileObjectPlan(schema: TSchema, context: RuntimeContext): BunFastPlan | null {
  const additionalProperties = schemaBooleanOrSchemaField(schema, "additionalProperties");
  if (
    Object.keys(schemaPatternProperties(schema)).length > 0 ||
    typeof additionalProperties === "object"
  ) {
    return null;
  }
  const properties = schemaProperties(schema);
  if (
    Object.keys(schemaProperties(schema)).length === 0 &&
    schemaUnknownField(schema, "properties") === undefined
  ) {
    return null;
  }
  const propertyEntries = Object.entries(properties).map(
    ([key, propertySchema]) => [key, compilePlan(propertySchema, context)] as const,
  );
  if (propertyEntries.some(([, plan]) => plan === null)) {
    return null;
  }
  const propertyPlans = new Map(propertyEntries as Array<readonly [string, BunFastPlan]>);
  const required = new Set(
    schemaRequiredKeys(schema).length > 0 ? schemaRequiredKeys(schema) : Object.keys(properties),
  );
  const optional = new Set(schemaOptionalKeys(schema));
  return {
    fn: (value) =>
      validateCompiledObjectPlan(value, required, optional, propertyPlans, additionalProperties),
    strategy: mergeStrategy(...Array.from(propertyPlans.values(), (plan) => plan.strategy)),
  };
}

function compileCollectionPlan(schema: TSchema, context: RuntimeContext): BunFastPlan | null {
  switch (schemaKind(schema)) {
    case "Array": {
      const itemSchema = schemaSchemaField(schema, "items") ?? schemaItem(schema);
      if (itemSchema === undefined) {
        return null;
      }
      const itemPlan = compilePlan(itemSchema, context);
      if (itemPlan === null) {
        return null;
      }
      return {
        fn: (value) => Array.isArray(value) && value.every(itemPlan.fn),
        strategy: itemPlan.strategy,
      };
    }
    case "Tuple": {
      const itemPlans = schemaSchemaListField(schema, "items").map((entry) =>
        compilePlan(entry, context),
      );
      if (itemPlans.some((plan) => plan === null)) {
        return null;
      }
      const tuplePlans = itemPlans as BunFastPlan[];
      const minItems = schemaNumberField(schema, "minItems");
      const maxItems = schemaNumberField(schema, "maxItems");
      const additionalItems = schemaBooleanField(schema, "additionalItems");
      return {
        fn: (value) =>
          Array.isArray(value) &&
          (minItems === undefined || value.length >= minItems) &&
          (maxItems === undefined || value.length <= maxItems) &&
          value.length >= tuplePlans.length &&
          (additionalItems === true || value.length === tuplePlans.length) &&
          tuplePlans.every((plan, index) => plan.fn(value[index])),
        strategy: mergeStrategy(...tuplePlans.map((plan) => plan.strategy)),
      };
    }
    case "Object":
      return compileObjectPlan(schema, context);
    case "Union": {
      const variantPlans = schemaVariants(schema).map((entry) => compilePlan(entry, context));
      if (variantPlans.some((plan) => plan === null)) {
        return null;
      }
      const plans = variantPlans as BunFastPlan[];
      return {
        fn: (value) => plans.some((plan) => plan.fn(value)),
        strategy: mergeStrategy(...plans.map((plan) => plan.strategy)),
      };
    }
    case "Intersect": {
      const variantPlans = schemaVariants(schema).map((entry) => compilePlan(entry, context));
      if (variantPlans.some((plan) => plan === null)) {
        return null;
      }
      const plans = variantPlans as BunFastPlan[];
      return {
        fn: (value) => plans.every((plan) => plan.fn(value)),
        strategy: mergeStrategy(...plans.map((plan) => plan.strategy)),
      };
    }
    default:
      return null;
  }
}

/** Compile a fast-path plan for a Refine schema. */
function compileRefinePlan(schema: TSchema, context: RuntimeContext): BunFastPlan | null {
  if (schemaUnknownField(schema, "~uint8arrayCodec") === true) {
    const minByteLength = schemaNumberField(schema, "minByteLength");
    const maxByteLength = schemaNumberField(schema, "maxByteLength");
    const constBytes = schemaUnknownField(schema, "constBytes");
    const normalizedBytes = constBytes instanceof Uint8Array ? constBytes : undefined;
    const constBase64 = schemaStringField(schema, "constBase64");
    if (constBase64 !== undefined) {
      return {
        fn: (value) => typeof value === "string" && value === constBase64,
        strategy: "bun-native-const",
      };
    }
    return {
      fn: (value) =>
        isUint8ArrayBase64String(value, minByteLength, maxByteLength, normalizedBytes, constBase64),
      strategy: "bun-native",
    };
  }
  const itemPlan = compilePlan(schemaItem(schema) ?? schema, context);
  const refinementsValue = schemaUnknownField(schema, "~refine");
  const refinements = Array.isArray(refinementsValue)
    ? refinementsValue.filter(
        (entry): entry is { refine: (value: unknown) => boolean } =>
          typeof entry === "object" && entry !== null && typeof entry.refine === "function",
      )
    : undefined;
  if (itemPlan === null || refinements === undefined) {
    return null;
  }
  return {
    fn: (value) => itemPlan.fn(value) && refinements.every((entry) => entry.refine(value)),
    strategy:
      schemaUnknownField(schema, "constBytes") instanceof Uint8Array
        ? "bun-native-const"
        : itemPlan.strategy,
  };
}

function compileWrapperPlan(schema: TSchema, context: RuntimeContext): BunFastPlan | null {
  switch (schemaKind(schema)) {
    case "Optional":
    case "Readonly":
    case "Immutable":
    case "Codec":
    case "Decode":
    case "Encode": {
      const innerPlan = compilePlan(schemaItemOrInner(schema) ?? schema, context);
      if (innerPlan === null) {
        return null;
      }
      return {
        fn: (value) =>
          schemaKind(schema) === "Optional" && value === undefined ? true : innerPlan.fn(value),
        strategy: innerPlan.strategy,
      };
    }
    case "Refine":
      return compileRefinePlan(schema, context);
    default:
      return null;
  }
}

function compilePlan(schema: TSchema, context: RuntimeContext): BunFastPlan | null {
  return (
    compilePrimitivePlan(schema, context) ??
    compileCollectionPlan(schema, context) ??
    compileWrapperPlan(schema, context)
  );
}

export function compileBunFastPath(
  schema: TSchema,
  context: RuntimeContext,
): BunFastPathResult | null {
  const plan = compilePlan(schema, context);
  if (plan === null) {
    return null;
  }
  return {
    fn: plan.fn,
    code: `/* ${plan.strategy} validation fast path */`,
    accelerated: true,
    strategy: plan.strategy,
  };
}
