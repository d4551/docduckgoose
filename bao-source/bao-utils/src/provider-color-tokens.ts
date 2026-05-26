/**
 * Provider accent tokens used by shared annotation utilities.
 */

export interface ColorTokenDefinition {
  cssVar: string;
  fallback: string;
}

export const PROVIDER_COLOR_TOKENS = {
  azure: {
    cssVar: "--bao-info",
    fallback: "#3b82f6",
  },
  huggingface: {
    cssVar: "--bao-warning",
    fallback: "#f59e0b",
  },
  default: {
    cssVar: "--bao-success",
    fallback: "#10b981",
  },
} as const satisfies Record<string, ColorTokenDefinition>;
