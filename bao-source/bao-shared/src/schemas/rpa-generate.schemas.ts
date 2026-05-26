/**
 * RPA workflow generation schemas.
 *
 * Structured output schema for AI-generated Robot Framework code.
 * Enables contract-first validation and library allowlist enforcement.
 *
 * @shared/schemas/rpa-generate
 */

import type { Static } from "@baohaus/baobox/elysia";
import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * Schema for AI-generated Robot Framework workflow output.
 *
 * Used by the RPA AI generator to parse and validate AI responses.
 * Libraries must be in the allowlist from GET /api/v1/rpa/libraries.
 */
export const RpaGenerateResponseSchema: Type.TObject<
  {
    readonly code: Type.TString;
    readonly libraries: Type.TArray<Type.TString>;
    readonly variables: Type.TRecord<Type.TString, Type.TString>;
  },
  "code" | "libraries" | "variables",
  never
> = Type.Object(
  {
    code: Type.String({
      minLength: 1,
      description: "Robot Framework code (full test suite or keyword block)",
    }),
    libraries: Type.Array(Type.String(), {
      description: "Names of Robot Framework libraries used (must be in allowlist)",
    }),
    variables: Type.Record(Type.String(), Type.String(), {
      description: "Variable definitions as key-value pairs for Robot Framework",
    }),
  },
  {
    title: "RPA Generate Response",
    description: "AI-generated Robot Framework workflow with code, libraries, and variables",
  },
);

/**
 * Type for validated RPA generate response.
 */
export type RpaGenerateResponse = Static<typeof RpaGenerateResponseSchema>;
