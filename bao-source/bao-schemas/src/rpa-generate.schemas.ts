/**
 * RPA workflow generation schemas.
 *
 * Structured output schema for AI-generated Robot Framework code.
 * Enables contract-first validation and library allowlist enforcement.
 *
 * @shared/schemas/rpa-generate
 */

import type { Static, TArray, TObject, TRecord, TString } from "@baohaus/baobox/elysia";
import { TypeExports } from "@baohaus/baobox/elysia";

/**
 * Schema for AI-generated Robot Framework workflow output.
 *
 * Used by the RPA AI generator to parse and validate AI responses.
 * Libraries must be in the allowlist from GET /api/v1/rpa/libraries.
 */
export const RpaGenerateResponseSchema: TObject<
  {
    readonly code: TString;
    readonly libraries: TArray<TString>;
    readonly variables: TRecord<TString, TString>;
  },
  "code" | "libraries" | "variables",
  never
> = TypeExports.Object(
  {
    code: TypeExports.String({
      minLength: 1,
      description: "Robot Framework code (full test suite or keyword block)",
    }),
    libraries: TypeExports.Array(TypeExports.String(), {
      description: "Names of Robot Framework libraries used (must be in allowlist)",
    }),
    variables: TypeExports.Record(TypeExports.String(), TypeExports.String(), {
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
