/**
 * AI-bun contract schema.
 */

import { TypeExports as Type } from "@baohaus/baobox/elysia";

/**
 * AI-bun contract name.
 */
export const AI_BUN_CONTRACT_NAME = "ai-bun-config";

/**
 * AI-bun contract version.
 */
export const AI_BUN_CONTRACT_VERSION = "v1";

/**
 * AI-bun config response schema.
 */
export const AiBunConfigResponseSchema = Type.Object(
  {
    ok: Type.Literal(true),
    config: Type.Object(
      {
        offline: Type.Object(
          {
            enabled: Type.Boolean(),
            modelIds: Type.Array(Type.String({ minLength: 1 })),
            modelPrefixes: Type.Array(Type.String({ minLength: 1 })),
            modelsDir: Type.String({ minLength: 1 }),
            allowRemoteModels: Type.Boolean(),
          },
          { additionalProperties: false },
        ),
        system: Type.Object(
          {
            enabled: Type.Boolean(),
            runtime: Type.Union([
              Type.Literal("ollama"),
              Type.Literal("ramalama"),
              Type.Literal("hf-local"),
            ]),
            modelId: Type.String({ minLength: 1 }),
            storagePath: Type.String({ minLength: 1 }),
            ggufFileName: Type.Union([Type.String({ minLength: 1 }), Type.Null()]),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);
