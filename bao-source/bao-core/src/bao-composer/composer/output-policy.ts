import { dirname, isAbsolute, relative, resolve } from "@baohaus/bao-utils/bun-path";
import type { BaoComposerBuildRequest } from "../bao-composer-drafts-messages";
import {
  BAO_COMPOSER_OUTPUT_MODES,
  type BaoComposerResolvedConfig,
} from "../bao-composer-identity";
import type { BaoComposerOutputPolicyV1 } from "../bao-composer-preview-execution";
import { BAO_SCHEMA_PATH, REPOSITORY_ROOT } from "./constants";
import type { BaoComposerResult } from "./types";

function resolveManifestSchemaReference(outputPath: string): string {
  const schemaRef = relative(dirname(outputPath), BAO_SCHEMA_PATH);
  return schemaRef.startsWith(".") ? schemaRef : `./${schemaRef}`;
}

export function resolveOutputPolicy(
  request: BaoComposerBuildRequest,
  config: BaoComposerResolvedConfig,
): BaoComposerResult<BaoComposerOutputPolicyV1> {
  const outputMode = request.outputMode ?? config.defaultOutputMode;
  const rawOutputPath = request.outputPath.trim();
  if (outputMode === "repo") {
    if (isAbsolute(rawOutputPath)) {
      return {
        ok: false,
        message: "BaoComposer repo output mode requires a repository-relative output path.",
        details: {
          issues: [
            {
              path: "/outputPath",
              message: "Repository output paths must be relative to the repository root.",
              severity: "error",
            },
          ],
          allowedValues: BAO_COMPOSER_OUTPUT_MODES,
        },
      };
    }
    const outputPath = resolve(REPOSITORY_ROOT, rawOutputPath);
    const sourceId = relative(REPOSITORY_ROOT, outputPath);
    if (sourceId.length === 0 || sourceId.startsWith("..")) {
      return {
        ok: false,
        message: "BaoComposer repo output mode can only write within the repository root.",
        details: {
          issues: [
            {
              path: "/outputPath",
              message: "Repository output path escapes the repository root.",
              severity: "error",
            },
          ],
          outputPath,
        },
      };
    }
    return {
      ok: true,
      value: {
        outputMode,
        outputPath,
        schemaRef: resolveManifestSchemaReference(outputPath),
        sourceId,
      },
    };
  }
  if (!isAbsolute(rawOutputPath)) {
    return {
      ok: false,
      message: "BaoComposer external output mode requires an absolute output path.",
      details: {
        issues: [
          {
            path: "/outputPath",
            message: "External output paths must be absolute.",
            severity: "error",
          },
        ],
        allowedValues: BAO_COMPOSER_OUTPUT_MODES,
      },
    };
  }
  return {
    ok: true,
    value: {
      outputMode,
      outputPath: resolve(rawOutputPath),
      schemaRef: request.schemaRef?.trim() ? request.schemaRef.trim() : null,
      sourceId: request.sourceId?.trim() ? request.sourceId.trim() : null,
    },
  };
}
