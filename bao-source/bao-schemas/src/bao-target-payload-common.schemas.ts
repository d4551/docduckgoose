import { t } from "@baohaus/baobox/elysia";
import {
  architectureSchema,
  PACKAGE_NAME_PATTERN,
  platformIdSchema,
  SEMVER_PATTERN,
  type TargetKind,
} from "./bao-install-primitives.schemas.ts";
import { fileEntrySchema } from "./bao-install-sections.schemas.ts";

export const semverRangeSchema = t.String({ minLength: 1 });
export const nonEmptyString = t.String({ minLength: 1 });
export const posixPathSchema = t.String({ minLength: 1, pattern: "^[^\\0]+$" });
export const identifierSchema = t.String({ minLength: 1, pattern: "^[a-z0-9][a-z0-9-]*$" });

export {
  architectureSchema,
  fileEntrySchema,
  PACKAGE_NAME_PATTERN,
  platformIdSchema,
  SEMVER_PATTERN,
  type TargetKind,
};
