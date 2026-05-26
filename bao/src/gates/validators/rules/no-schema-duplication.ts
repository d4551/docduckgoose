import type { ValidatorContext } from "../context.ts";

/** Only ORM/database schema files — domain validation schemas are not sprawl. */
const ORM_SCHEMA_PATTERN = /schema\.prisma$/;

export const noSchemaDuplication = (ctx: ValidatorContext): void => {
  const schemaFiles = ctx.collectFiles(ORM_SCHEMA_PATTERN);

  if (schemaFiles.length > 1) {
    ctx.fail(
      `unexpected ORM schema sprawl (${schemaFiles.length} files): ${schemaFiles.join(", ")}`,
    );
  }
};
