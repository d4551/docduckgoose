import { Value } from "@baohaus/baobox/value";

const { Check, Errors } = Value;

export interface TypeBoxValidationError {
  readonly path?: string;
  readonly message?: string;
}

type TypeBoxChecker = (value: unknown) => boolean;
type TypeBoxErrors = (value: unknown) => Iterable<TypeBoxValidationError>;

function isTypeBoxSchemaLike(schema: object): boolean {
  return "~kind" in schema || "type" in schema || "properties" in schema;
}

export function getTypeBoxChecker(schema: object): TypeBoxChecker | null {
  if (!isTypeBoxSchemaLike(schema)) {
    return null;
  }
  return (value: unknown) => {
    const result: unknown = Check(schema as Parameters<typeof Check>[0], value);
    return result === true;
  };
}

export function getTypeBoxErrorIterator(schema: object): TypeBoxErrors | null {
  if (!isTypeBoxSchemaLike(schema)) {
    return null;
  }
  return function* (value: unknown): Iterable<TypeBoxValidationError> {
    const iterator = Errors(schema as Parameters<typeof Errors>[0], value);
    for (const error of iterator) {
      const path = typeof error?.path === "string" ? error.path : undefined;
      const message = typeof error?.message === "string" ? error.message : undefined;
      yield {
        ...(path === undefined ? {} : { path }),
        ...(message === undefined ? {} : { message }),
      };
    }
  };
}
