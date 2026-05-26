import type { TSchema } from "../type/base-types.js";

/** A pipeline stage that transforms a value */
export type PipelineStage = (schema: TSchema, value: unknown) => unknown;

/** Create a composable pipeline of value transformation stages */
export function Pipeline(
  stages: readonly PipelineStage[],
): (schema: TSchema, value: unknown) => unknown {
  return (schema: TSchema, value: unknown): unknown => {
    let result = value;
    for (const stage of stages) {
      result = stage(schema, result);
    }
    return result;
  };
}
